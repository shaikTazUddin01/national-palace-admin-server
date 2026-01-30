export interface IAuth {
  id?: string;
  name: string;
  email: string;
  number: number;
  password: string;
  role: "User" | "Admin" | "Agent";
  address: string;
  accountStatus?: "Pending" | "Active" | "Block" | "Verified" | "Reject";
}

export interface IDecodedUser {
  userId: string;
  email: string;
  number: number;
  name: string;
  role: "User" | "Admin" | "Agent";
  nid: string;
  iat: number;
  exp: number;
}

export enum TUser_Role {
  USER = "User",
  ADMIN = "Admin",
  Agent = "Agent",
}
