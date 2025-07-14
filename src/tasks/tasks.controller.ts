
import {
    Controller,
    Get,
    Post,
    Delete,
    Put,
    Param,
    Query,
    Body,
    ParseIntPipe,
    UsePipes,
    ValidationPipe,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

@Controller('tasks')
export class TasksController {
    constructor(private readonly tasksService: TasksService) { }

    @Get()
    getTasks(@Query('isDone') isDone?: string) {
        const filterIsDone = isDone === undefined ? undefined : isDone === 'true';
        return this.tasksService.getAllTasks(filterIsDone);
    }

    @Get(':id')
    getTask(@Param('id', ParseIntPipe) id: number) {
        return this.tasksService.getTaskById(id);
    }

    @Post()
    @UsePipes(new ValidationPipe({ whitelist: true }))
    createTask(@Body() createDto: CreateTaskDto) {
        return this.tasksService.createTask(createDto);
    }

    @Delete(':id')
    deleteTask(@Param('id', ParseIntPipe) id: number) {
        this.tasksService.deleteTask(id);
        return { message: 'Tarea borrada con éxito' };
    }

    @Put(':id')
    @UsePipes(new ValidationPipe({ whitelist: true }))
    updateTask(
        @Param('id', ParseIntPipe) id: number,
        @Body() updateDto: UpdateTaskDto,
    ) {
        return this.tasksService.updateTask(id, updateDto);
    }
}
