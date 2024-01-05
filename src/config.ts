import { ConfigType, registerAs } from "@nestjs/config";
export const  CONFIG_NAME = 'vars_config';
export type ConfigVars = ConfigType<typeof Vars>;
export const Vars = registerAs(CONFIG_NAME, () =>
  Object.freeze({
    env: process.env.NODE_ENV,
    db: {
      name: process.env.DB_NAME,
      port: Number(process.env.DB_PORT),
      password: process.env.DB_PASSWORD,
      user:process.env.DB_USER,
      host:process.env.DB_HOST,
      ssl: process.env.SSL
    },
    jwt: {
      password: process.env.JWT_PASSWORD
    },
    cloudinary:{
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
      api_key: process.env.CLOUDINARY_API_KEY, 
      api_secret: process.env.CLOUDINARY_API_SECRET
    }
  }),
);
