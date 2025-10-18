
export interface Category {
  id: string;
  name: string;
}

export interface Program {
  title: string;
  startTime: string;
  endTime: string;
}

export interface Channel {
  id: string;
  name: string;
  logo: string;
  streamUrl: string;
  categoryIds: string[];
  isLive: boolean;
  currentProgram: Program;
  nextProgram: Program;
}

export interface User {
  id: string;
  name: string;
  email: string;
}
