import { Api } from "../api/ApiConfig";
import { ApiExcepition } from "../api/ApiException";


export interface ITarefa {
  id: number;
  title: string;
  state: boolean;
}

const getAll = async (): Promise<ITarefa[] | ApiExcepition> => {
  try {
    const { data } = await Api().get('/tarefas');
    return data;
  } catch (error: any) {
    return new ApiExcepition(error.message || 'Erro ao buscar os registros.');
  }
};

const getById = async (id: number): Promise<ITarefa | ApiExcepition> => {
  try {
    const { data } = await Api().get(`/tarefas/${id}`);
    return data;
  } catch (error: any) {
    return new ApiExcepition(error.message || 'Erro ao consultar o registro.');
  }
};

const create = async (dataToCreate: Omit<ITarefa, 'id'>): Promise<ITarefa | ApiExcepition> => {
  try {
    const { data } = await Api().post<any>('/tarefas', dataToCreate);
    return data;
  } catch (error: any) {
    return new ApiExcepition(error.message || 'Erro ao criar o registro.');
  }
};

const updateById = async (id: number, dataToUpdate: ITarefa): Promise<ITarefa | ApiExcepition> => {
  try {
    const { data } = await Api().put(`/tarefas/${id}`, dataToUpdate);
    return data;
  } catch (error: any) {
    return new ApiExcepition(error.message || 'Erro ao atualizar o registro.');
  }
};

const deleteById = async (id: number): Promise<undefined | ApiExcepition> => {
  try {
    await Api().delete(`/tarefas/${id}`);
    return undefined;
  } catch (error: any) {
    return new ApiExcepition(error.message || 'Erro ao apagar o registro.');
  }
};

export const TarefasService = {
  getAll,
  create,
  getById,
  updateById,
  deleteById,
};