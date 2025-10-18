// types.ts

export interface Program {
  title: string;
  startTime: string;
  endTime: string;
}

export interface Channel {
  id: string;
  name: string;
  description?: string;
  logo: string;
  isLive: boolean;
  streamUrl: string;
  categoryIds: string[];
  currentProgram: Program;
  nextProgram: Program;
}

export interface User {
  id: string;
  name: string;
  email: string;
  isAdmin: boolean;
}

export interface Category {
  id: string;
  name: string;
}
