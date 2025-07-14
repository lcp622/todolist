// tasks.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { Task } from './entities/task.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

@Injectable()
export class TasksService {
    private tasks: Task[] = [];
    private idCounter = 1;

    getAllTasks(isDone?: boolean): Task[] {
        if (isDone !== undefined) {
            return this.tasks.filter(task => task.isDone === isDone);
        }
        return this.tasks;
    }

    getTaskById(id: number): Task {
        const task = this.tasks.find(t => t.id === id);
        if (!task) throw new NotFoundException(`La tarea con el ID ${id} no existe`);
        return task;
    }

    createTask(createDto: CreateTaskDto): Task {
        const task = new Task();
        task.id = this.idCounter++;
        task.title = createDto.title;
        task.description = createDto.description;
        task.isDone = createDto.isDone;

        this.tasks.push(task);
        return task;
    }

    deleteTask(id: number): void {
        const index = this.tasks.findIndex(t => t.id === id);
        if (index === -1) throw new NotFoundException(`La tarea con el ID ${id} no existe`);
        this.tasks.splice(index, 1);
    }

    updateTask(id: number, updateDto: UpdateTaskDto): Task {
        const task = this.getTaskById(id);
        Object.assign(task, updateDto);
        return task;
    }
}
