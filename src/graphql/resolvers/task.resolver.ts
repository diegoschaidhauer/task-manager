import { Task } from '../../models/Task';

/**
 * Resolvers GraphQL para operações de tarefas.
 */
export const taskResolvers = {
  Query: {
    /**
     * Lista as tarefas do usuário autenticado.
     * @param {string} [status] - Filtro por status opcional.
     * @returns {Task[]} Lista de tarefas.
     */
    tasks: async (_: any, { status }: any, { user }: any) => {
      if (!user) throw new Error('Authentication required');
      const filter: any = { user: user.id };
      if (status) filter.status = status;
      return Task.find(filter);
    },

    /**
     * Retorna uma tarefa específica pelo ID.
     * @param {string} id - ID da tarefa.
     * @returns {Task} Dados da tarefa.
     */
    task: async (_: any, { id }: any, { user }: any) => {
      if (!user) throw new Error('Authentication required');
      const task = await Task.findOne({ _id: id, user: user.id });
      if (!task) throw new Error('Task not found');
      return task;
    }
  },

  Mutation: {
    /**
     * Cria uma nova tarefa.
     * @param {string} title - Título da tarefa.
     * @param {string} description - Descrição da tarefa.
     * @param {string} status - Status da tarefa.
     * @param {string} dueDate - Data de vencimento.
     * @returns {Task} Tarefa criada.
     */
    createTask: async (_: any, { title, description, status, dueDate }: any, { user }: any) => {
      if (!user) throw new Error('Authentication required');
      const task = await Task.create({
        title,
        description,
        status,
        dueDate,
        user: user.id
      });
      return task;
    },

    /**
     * Atualiza uma tarefa existente.
     * @param {string} id - ID da tarefa.
     * @param {string} title - Novo título.
     * @param {string} description - Nova descrição.
     * @param {string} status - Novo status.
     * @param {string} dueDate - Nova data de vencimento.
     * @returns {Task} Tarefa atualizada.
     */
    updateTask: async (_: any, { id, title, description, status, dueDate }: any, { user }: any) => {
      if (!user) throw new Error('Authentication required');

      const task = await Task.findOne({ _id: id, user: user.id });
      if (!task) throw new Error('Task not found');

      if (title !== undefined) task.title = title;
      if (description !== undefined) task.description = description;
      if (status !== undefined) task.status = status;
      if (dueDate !== undefined) task.dueDate = dueDate;

      await task.save();
      return task;
    },

    /**
     * Deleta uma tarefa existente.
     * @param {string} id - ID da tarefa.
     * @returns {boolean} True se deletado com sucesso.
     */
    deleteTask: async (_: any, { id }: any, { user }: any) => {
      if (!user) throw new Error('Authentication required');
      const task = await Task.findOneAndDelete({ _id: id, user: user.id });
      if (!task) throw new Error('Task not found');
      return true;
    }
  }
};
