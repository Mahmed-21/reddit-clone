export interface User {
    id: number;
    username: string;
    email: string;
    passwordHash: Uint8Array;
    passwordSalt: Uint8Array;
  }