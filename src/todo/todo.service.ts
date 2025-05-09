import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Todo, TodoDocument } from './schema/todo.schema';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';

@Injectable()
export class TodoService {
  constructor(
    @InjectModel('todo') private todoModel: Model<TodoDocument>,
  ) {}

  async findAll(userId: string): Promise<Todo[]> {
    return this.todoModel.find({ user: userId }).exec();
  }

  async findOne(id: string, userId: string): Promise<Todo> {
    const todo = await this.todoModel.findOne({ _id: id, user: userId }).exec();
    
    if (!todo) {
      throw new NotFoundException(`Todo with ID ${id} not found`);
    }
    
    return todo;
  }

  async create(createTodoDto: CreateTodoDto, userId: string): Promise<Todo> {
    const newTodo = new this.todoModel({
      ...createTodoDto,
      user: userId,
    });
      
      console.log('Creating todo:', newTodo);
      console.log('User ID:', userId);
    
    return newTodo.save();
  }

  async update(id: string, updateTodoDto: UpdateTodoDto, userId: string): Promise<Todo> {
    const updatedTodo = await this.todoModel
      .findOneAndUpdate(
        { _id: id, user: userId },
        { $set: updateTodoDto },
        { new: true }
      )
      .exec();
    
    if (!updatedTodo) {
      throw new NotFoundException(`Todo with ID ${id} not found`);
    }
    
    return updatedTodo;
  }

  async toggleComplete(id: string, userId: string): Promise<Todo> {
    const todo = await this.findOne(id, userId);
    
    return this.update(id, { isCompleted: !todo.isCompleted }, userId);
  }

  async remove(id: string, userId: string): Promise<{ deleted: boolean }> {
    const result = await this.todoModel.deleteOne({ _id: id, user: userId }).exec();
    
    if (result.deletedCount === 0) {
      throw new NotFoundException(`Todo with ID ${id} not found`);
    }
    
    return { deleted: true };
  }
}