export type UserType = {
  id: number;

  username: string;
  password: string;
  email: string;

  emailVerified: boolean;

  firstSeen: Date;
  lastSeen: Date;
  isActive: boolean;
};
