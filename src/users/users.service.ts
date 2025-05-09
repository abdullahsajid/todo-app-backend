import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './schema/user.schema';
import { CreateUserDto } from './dto/user.dto';
import * as bcrypt from 'bcrypt';
import { LoginUserDto } from './dto/login.dto';

@Injectable()
export class UsersService {
  constructor(@InjectModel('user') private UserModel: Model<UserDocument>) {}

  async createUser(user: CreateUserDto): Promise<User> {
    const { name, email, password } = user;

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const newUser = new this.UserModel({
      name,
      email,
      password: hashedPassword,
    });
    return await newUser.save();
  }

  async loginUser(
    user: LoginUserDto,
  ): Promise<User | { message: string; status: number }> {
    const { email, password } = user;
    const foundUser = await this.UserModel.findOne({ email });
    if (!foundUser) {
      return { message: 'User not found', status: 404 };
    }
    const isMatch = await bcrypt.compare(password, foundUser.password);
    console.log('match',isMatch);
    if (!isMatch) {
      return { message: 'Invalid credentials', status: 401 };
    }
    return foundUser;
  }
}
