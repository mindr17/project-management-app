export interface IFormSignIn {
  login: string;
  password: string;
}

export interface IParseToken {
  exp: number;
  id: string;
  iat: number;
  login: string;
}

export interface IFormData {
  name: string;
  login: string;
  password: string;
}
