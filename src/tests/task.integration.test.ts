import { taskResolvers } from '../graphql/resolvers/task.resolver';
import { Task } from '../models/Task';

jest.mock('../models/Task');

describe('Task Resolvers - Integration with Mocks', () => {
  const fakeUser = { id: 'user123' };
  const fakeTask = {
    id: 'task123',
    title: 'Test Task',
    description: 'Test description',
    status: 'TODO',
    dueDate: new Date(),
    user: 'user123',
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('createTask', () => {
    it('should create a task successfully', async () => {
      (Task.create as jest.Mock).mockResolvedValue(fakeTask);

      const result = await taskResolvers.Mutation.createTask(
        {},
        {
          title: 'Test Task',
          description: 'Test description',
          status: 'TODO',
          dueDate: new Date(),
        },
        { user: fakeUser }
      );

      expect(Task.create).toHaveBeenCalledWith({
        title: 'Test Task',
        description: 'Test description',
        status: 'TODO',
        dueDate: expect.any(Date),
        user: 'user123',
      });

      expect(result).toEqual(fakeTask);
    });
  });

  describe('tasks', () => {
    it('should return a list of tasks', async () => {
      (Task.find as jest.Mock).mockResolvedValue([fakeTask]);

      const result = await taskResolvers.Query.tasks({}, {}, { user: fakeUser });

      expect(Task.find).toHaveBeenCalledWith({ user: 'user123' });
      expect(result).toEqual([fakeTask]);
    });
  });

  describe('task', () => {
    it('should return a single task by ID', async () => {
      (Task.findOne as jest.Mock).mockResolvedValue(fakeTask);

      const result = await taskResolvers.Query.task(
        {},
        { id: 'task123' },
        { user: fakeUser }
      );

      expect(Task.findOne).toHaveBeenCalledWith({ _id: 'task123', user: 'user123' });
      expect(result).toEqual(fakeTask);
    });
  });

  describe('updateTask', () => {
    it('should update a task', async () => {
      const saveMock = jest.fn().mockResolvedValue({
        ...fakeTask,
        title: 'Updated Task',
      });

      (Task.findOne as jest.Mock).mockResolvedValue({
        ...fakeTask,
        save: saveMock,
      });

      const result = await taskResolvers.Mutation.updateTask(
        {},
        {
          id: 'task123',
          title: 'Updated Task',
          description: undefined,
          status: undefined,
          dueDate: undefined,
        },
        { user: fakeUser }
      );

      expect(Task.findOne).toHaveBeenCalledWith({ _id: 'task123', user: 'user123' });
      expect(saveMock).toHaveBeenCalled();
      expect(result.title).toBe('Updated Task');
    });
  });

  describe('deleteTask', () => {
    it('should delete a task', async () => {
      (Task.findOneAndDelete as jest.Mock).mockResolvedValue(fakeTask);

      const result = await taskResolvers.Mutation.deleteTask(
        {},
        { id: 'task123' },
        { user: fakeUser }
      );

      expect(Task.findOneAndDelete).toHaveBeenCalledWith({
        _id: 'task123',
        user: 'user123',
      });
      expect(result).toBe(true);
    });
  });
});
