export type User = {
  id: number;

  username: string;
  password: string;
  email: string;

  firstSeen: Date;
  lastSeen: Date;

  isActive: boolean;
};
