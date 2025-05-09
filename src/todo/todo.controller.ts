import { 
    Controller, 
    Get, 
    Post, 
    Body,
    Param,
    Delete,
    Put,
    UseGuards,
    Patch,
    Req,
  } from '@nestjs/common';
  import { TodoService } from './todo.service';
  import { CreateTodoDto } from './dto/create-todo.dto';
  import { UpdateTodoDto } from './dto/update-todo.dto';
  import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
  import { Request } from 'express';
  
  @Controller('todos')
  @UseGuards(JwtAuthGuard)
  export class TodoController {
    constructor(private readonly todoService: TodoService) {}
  
    @Get()
    findAll(@Req() req: Request | any) {
      return this.todoService.findAll(req.user['userId']);
    }
  
    @Get(':id')
    findOne(@Param('id') id: string, @Req() req: Request| any) {
      return this.todoService.findOne(id, req.user['userId']);
    }
  
    @Post()
    create(@Body() createTodoDto: CreateTodoDto, @Req() req: Request | any) {
      return this.todoService.create(createTodoDto, req.user['userId']);
    }
  
    @Put(':id')
    update(
      @Param('id') id: string,
      @Body() updateTodoDto: UpdateTodoDto,
      @Req() req: Request| any,
    ) {
      return this.todoService.update(id, updateTodoDto, req.user['userId']);
    }
  
    @Patch(':id/toggle')
    toggleComplete(@Param('id') id: string, @Req() req: Request| any) {
      return this.todoService.toggleComplete(id, req.user['userId']);
    }
  
    @Delete(':id')
    remove(@Param('id') id: string, @Req() req: Request| any) {
      return this.todoService.remove(id, req.user['userId']);
    }
  }