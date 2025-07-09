import { Controller, Get, Post, Param, Body, Query } from '@nestjs/common';
import { TasksService } from './tasks.service';

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  // TODO: Implement GET /tasks
  // TODO: Implement GET /tasks/:id
  // TODO: Implement POST /tasks
}
