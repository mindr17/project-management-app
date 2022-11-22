export interface IFormSignIn {
  login: string;
  password: string;
}
export interface IParseToken {
  id: string;
  iat: number;
  login: string;
}

export interface IFormData {
  name: string;
  login: string;
  password: string;
}
