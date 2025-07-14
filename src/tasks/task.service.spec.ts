// tasks.service.spec.ts
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { NotFoundException } from '@nestjs/common';

describe('TasksService', () => {
    let service: TasksService;

    beforeEach(() => {
        service = new TasksService();
    });

    it('should create and retrieve a task', () => {
        const dto: CreateTaskDto = {
            title: 'Test task',
            description: 'Test description',
            isDone: false,
        };

        const task = service.createTask(dto);
        const fetched = service.getTaskById(task.id);

        expect(fetched).toEqual(task);
    });

    it('should throw NotFoundException when task does not exist', () => {
        expect(() => service.getTaskById(999)).toThrow(NotFoundException);
    });

    it('should delete a task', () => {
        const task = service.createTask({
            title: 'Delete me',
            description: 'To be deleted',
            isDone: false,
        });

        service.deleteTask(task.id);
        expect(() => service.getTaskById(task.id)).toThrow(NotFoundException);
    });

    it('should update a task', () => {
        const task = service.createTask({
            title: 'Old Title',
            description: 'Old Desc',
            isDone: false,
        });

        const updated = service.updateTask(task.id, {
            title: 'New Title',
            isDone: true,
        });

        expect(updated.title).toBe('New Title');
        expect(updated.description).toBe('Old Desc');
        expect(updated.isDone).toBe(true);
    });
});
