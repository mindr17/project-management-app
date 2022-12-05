export interface IBoard {
  _id: string;
  title: string;
  owner: string;
  users: Array<string>;
}
export interface INewParams {
  title: string;
  owner: string;
  users: Array<string>;
}
