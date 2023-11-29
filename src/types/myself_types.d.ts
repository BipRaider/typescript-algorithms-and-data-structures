declare namespace Express {
  export interface Request {
    user: {
      email: string;
      roles: string[];
      name: string;
    };
  }
}

declare module 'jwt' {
  interface JWT {
    [key: string]: {
      accessToken: string;
      refreshToken: string;
    };
  }
}
