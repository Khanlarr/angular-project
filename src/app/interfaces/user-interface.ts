export interface User {
  id: string;
  name: string;
  surname: string;
  email: string;
  number: string;
}

export enum ModalType {
  EDIT = 'edit',
  ADD = 'add',
}
