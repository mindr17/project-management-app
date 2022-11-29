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
  tasks?: ITask[];
}

export interface InitialState {
  columns: IColumn[];
  tasks: ITask[];
}
