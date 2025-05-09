import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { TodoService } from 'src/todo/todo.service';
import { LoginUserDto } from 'src/users/dto/login.dto';
import { User } from 'src/users/schema/user.schema';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private todoService: TodoService
  ) {}

  async generateToken(user: User | any) {
    console.log('Generating token for user:', user);
    const payload: any = { sub: user._id };
    console.log('Payload for token:', payload);
    try {
      const token = await this.jwtService.sign(payload);
      return token;
    } catch (error) {
      console.log('Error generating token:', error);
      throw new Error('Failed to generate token');
    }
  }

  async login(loginUserDto: LoginUserDto) {
    const user: User | { message: string; status: number } | any =
      await this.usersService.loginUser(loginUserDto);
    if (user && user._id) {
      const token = await this.generateToken(user);
      return { user, token };
    }
  }

  async signup(createUserDto: any): Promise<any> {
    const user: any = await this.usersService.createUser(createUserDto);
    if (user && user._id) {
      const token = await this.generateToken(user);
      return { user, token };
    }
  }

  async createTodo(createTodoDto: any, userId: string): Promise<any> {
    const todo = await this.todoService.create(createTodoDto, userId);
    return todo;
  }
}
