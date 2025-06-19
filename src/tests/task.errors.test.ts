import { taskResolvers } from '../graphql/resolvers/task.resolver';
import { Task } from '../models/Task';

jest.mock('../models/Task');

describe('Task Resolver - Error Cases', () => {
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

  describe('Authentication errors', () => {
    it('should throw error when creating a task without authentication', async () => {
      await expect(
        taskResolvers.Mutation.createTask(
          {},
          {
            title: 'Test Task',
            description: 'Test description',
            status: 'TODO',
            dueDate: new Date(),
          },
          { user: null }
        )
      ).rejects.toThrow('Authentication required');
    });

    it('should throw error when listing tasks without authentication', async () => {
      await expect(
        taskResolvers.Query.tasks({}, {}, { user: null })
      ).rejects.toThrow('Authentication required');
    });
  });

  describe('Not Found errors', () => {
    it('should throw error when fetching non-existent task', async () => {
      (Task.findOne as jest.Mock).mockResolvedValue(null);

      await expect(
        taskResolvers.Query.task({}, { id: 'nonexistent' }, { user: fakeUser })
      ).rejects.toThrow('Task not found');
    });

    it('should throw error when updating non-existent task', async () => {
      (Task.findOne as jest.Mock).mockResolvedValue(null);

      await expect(
        taskResolvers.Mutation.updateTask(
          {},
          {
            id: 'nonexistent',
            title: 'Updated Task',
            description: undefined,
            status: undefined,
            dueDate: undefined,
          },
          { user: fakeUser }
        )
      ).rejects.toThrow('Task not found');
    });

    it('should throw error when deleting non-existent task', async () => {
      (Task.findOneAndDelete as jest.Mock).mockResolvedValue(null);

      await expect(
        taskResolvers.Mutation.deleteTask(
          {},
          { id: 'nonexistent' },
          { user: fakeUser }
        )
      ).rejects.toThrow('Task not found');
    });
  });
});
