export interface ITask {
  _id: string;
  title: string;
  order: number;
  description: string;
  userId: string;
  boardId: string;
  columnId: string;
  users: string[];
}

export interface IColumn {
  _id: string;
  title: string;
  order: number;
  boardId: string;
  tasks: ITask[];
}

export interface InitialState {
  columns: IColumn[];
  tasks: ITask[];
  isLoading: boolean;
}

export interface IBoardCreateColumn {
  boardId: string;
  newParams: {
    title: string;
    order: number;
  };
}

export interface IParamsBoardIdAndColumnId {
  boardId: string;
  columnId: string;
}

export interface IParamsUpdateColumnById {
  boardId: string;
  columnId: string;
  newParams: {
    title: string;
    order: number;
  };
}

export interface IListOfNewParams {
  _id: string;
  order: number;
}

export interface IListOfNewColumns {
  title: string;
  order: number;
  boardId: string;
}

export interface newTaskParams {
  title: string;
  order: number;
  description: string;
  userId: string;
  users: string[];
}
export interface ITaskParameters {
  boardId: string;
  columnId: string;
  taskId?: string;
  newTaskParams?: newTaskParams;
}

export interface ITaskListParams {
  _id: string;
  order: number;
  columnId: string;
}
