declare global {
    namespace NodeJS {
      interface ProcessEnv {
        BASE_URL: string;
        SESSION_SECRET: string;
      }
    }
  }
  
  export const BASE_URL = process.env.BASE_URL;
  export const SESSION_SECRET = process.env.SESSION_SECRET;
  export const NODE_ENV = process.env.NODE_ENV;
  