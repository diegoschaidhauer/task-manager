import { Task } from '../../models/Task';

export const taskResolvers = {
  Query: {
    tasks: async (_: any, { status }: any, { user }: any) => {
      if (!user) throw new Error('Not authenticated');
      const filter: any = { user: user.id };
      if (status) filter.status = status;
      return Task.find(filter);
    },

    task: async (_: any, { id }: any, { user }: any) => {
      if (!user) throw new Error('Not authenticated');
      const task = await Task.findOne({ _id: id, user: user.id });
      if (!task) throw new Error('Task not found');
      return task;
    }
  },

  Mutation: {
    createTask: async (_: any, { title, description, status, dueDate }: any, { user }: any) => {
      if (!user) throw new Error('Not authenticated');
      const task = await Task.create({
        title,
        description,
        status,
        dueDate,
        user: user.id
      });
      return task;
    },

    updateTask: async (_: any, { id, title, description, status, dueDate }: any, { user }: any) => {
      if (!user) throw new Error('Not authenticated');

      const task = await Task.findOne({ _id: id, user: user.id });
      if (!task) throw new Error('Task not found');

      if (title !== undefined) task.title = title;
      if (description !== undefined) task.description = description;
      if (status !== undefined) task.status = status;
      if (dueDate !== undefined) task.dueDate = dueDate;

      await task.save();
      return task;
    },

    deleteTask: async (_: any, { id }: any, { user }: any) => {
      if (!user) throw new Error('Not authenticated');
      const task = await Task.findOneAndDelete({ _id: id, user: user.id });
      return !!task;
    }
  }
};
