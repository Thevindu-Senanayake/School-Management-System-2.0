import { Socket } from "socket.io-client";

export type User = {
  userName: string;
  role: string;
  active: boolean;
  lastActive: Date;
  createdAt: Date;
  _id: string;
};

export type Credentials = {
  userName: string;
  password: string;
};

export type AttendanceType = {
  date: string;
  month: string;
  boys: number;
  girls: number;
  className: string;
  createdAt: Date;
  _id: string;
};

export type MarkAttendance = {
  boys: number;
  girls: number;
  className: string;
};

export interface Response {
  [key: string]: Array<AttendanceType>;
}

export type UpdateUser = {
  userName: string;
  role: "user" | "admin";
};

export interface Message {
  fromSelf: boolean;
  message: string;
  time: string;
}

export interface ISocket extends Socket {
  customEvent: (data: any) => void;
}

export type HandleSendMsg = {
  handleSendMsg: (
    e: React.FormEvent<HTMLFormElement>,
    msg: string,
    time: string
  ) => void;
};

export interface UserStatus {
  [key: string]: boolean;
}

export interface ContactProps {
  contacts: User[];
  changeChat: (chat: User) => void;
  status: UserStatus;
  searchQuery: string;
}
