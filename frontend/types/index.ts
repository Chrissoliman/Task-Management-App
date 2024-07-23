export interface User {
  email: string;
  token: string;
}

export interface Task {
  _id: string;
  title: string;
  description: string;
  dueDate: string;
  completed: boolean;
  category: string;
}
