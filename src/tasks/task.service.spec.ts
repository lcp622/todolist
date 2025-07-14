// tasks.service.spec.ts
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { NotFoundException } from '@nestjs/common';

describe('Servicio de Tareas', () => {
    let servicio: TasksService;

    beforeEach(() => {
        servicio = new TasksService();
    });

    it('debería crear y obtener una tarea', () => {
        const dto: CreateTaskDto = {
            title: 'Prueba de Tareas',
            description: 'Descripción de prueba',
            isDone: false,
        };

        const tarea = servicio.createTask(dto);
        const obtenida = servicio.getTaskById(tarea.id);

        expect(obtenida).toEqual(tarea);
    });

    it('debería lanzar NotFoundException cuando la tarea no existe', () => {
        expect(() => servicio.getTaskById(999)).toThrow(NotFoundException);
    });

    it('debería eliminar una tarea', () => {
        const tarea = servicio.createTask({
            title: 'Elimíname',
            description: 'Para ser eliminada',
            isDone: false,
        });

        servicio.deleteTask(tarea.id);
        expect(() => servicio.getTaskById(tarea.id)).toThrow(NotFoundException);
    });

    it('debería actualizar una tarea', () => {
        const tarea = servicio.createTask({
            title: 'Título viejo',
            description: 'Descripción vieja',
            isDone: false,
        });

        const actualizada = servicio.updateTask(tarea.id, {
            title: 'Título nuevo',
            isDone: true,
        });

        expect(actualizada.title).toBe('Título nuevo');
        expect(actualizada.description).toBe('Descripción vieja');
        expect(actualizada.isDone).toBe(true);
    });
});
