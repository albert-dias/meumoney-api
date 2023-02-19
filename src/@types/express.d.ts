
declare namespace Express {
  // eslint-disable-next-line @typescript-eslint/naming-convention
  export interface Request {
    user: {
      id: string;
      name: string;
      email: string;
      is_premium: number;
      is_admin: number;
      expires_premium: Date;
    };
  }
}