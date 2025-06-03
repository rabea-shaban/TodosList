export interface Todo {
  id: number;
  title: string;
  description: string;
  documentId?: string;
}

export interface UserData {
  jwt: string;
  user: {
    id: number;
    username?: string;
    email?: string;
  };
}

export interface ResponseData {
  todos: Todo[];
}
export interface IPropsModel {
  open: boolean;
  setOpen: (open: boolean) => void;
  refetch: () => void; // ✅ أضف هذا السطر
}

export interface IformData {
  id: number;
  documentId?: string;
  title: string;
  description: string;
}

export interface ILogin {
  identifier: string;
  password: string;
}
export interface IRegister {
  username: string;
  email: string;
  password: string;
}
export interface IChangePaswoord {
  currentPassword: string;
  password: string;
  passwordConfirmation: string;
}
