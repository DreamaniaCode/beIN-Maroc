// FIX: Implemented missing type definitions for User, Program, Channel, and Category.
export interface User {
  id: string;
  name: string;
  email: string;
  isAdmin: boolean;
}

export interface Program {
  title: string;
  startTime: string; // e.g., "10:00 AM"
  endTime: string;   // e.g., "11:00 AM"
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
