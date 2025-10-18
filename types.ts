// Fix: Provide full content for types.ts to resolve module errors.
export interface Program {
  title: string;
  startTime: string;
  endTime: string;
}

export interface Channel {
  id: string;
  name: string;
  logo: string;
  isLive: boolean;
  streamUrl: string;
  categoryId: string;
  currentProgram: Program;
  nextProgram: Program;
}

export interface Category {
  id: string;
  name: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  isAdmin: boolean;
}
