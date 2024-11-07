export interface IUserLogin {
        email: string;
        password: string;
      }
      
      export interface IJwtPayload {
        id: string;
        email: string;
      }
      
      export interface IResponse {
        status: string;
        message: string;
        data?: any;
      }
      