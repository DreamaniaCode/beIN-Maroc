export interface User {
  id: string;
  name: string;
  email: string;
  isAdmin: boolean;
}

export interface Program {
  title: string;
  startTime: string; // "HH:mm" format
  endTime: string;   // "HH:mm" format
  description?: string;
}

export interface Channel {
  id: string;
  name: string;
  description: string;
  logo: string; // URL to the logo
  isLive: boolean;
  streamUrl: string; // URL for the video stream
  categoryIds: string[];
  currentProgram: Program;
  nextProgram: Program;
}

export interface Category {
  id: string;
  name: string;
}
