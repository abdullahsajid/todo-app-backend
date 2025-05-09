import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TodoService } from './todo.service';
import { TodoSchema } from './schema/todo.schema';
import { TodoController } from './todo.controller';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'todo', schema: TodoSchema }]),
  ],
  controllers: [TodoController],
  providers: [TodoService],
  exports: [TodoService],
})
export class TodoModule {}