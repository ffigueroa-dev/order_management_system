import 'dotenv/config';

const envs = {
  db_pass: process.env.DB_PASSWORD,
  db_name: process.env.DB_NAME,
  db_user: process.env.DB_USER,
  db_host: process.env.DB_HOST,
  db_port: process.env.DB_PORT,
  port: process.env.PORT
};

export default envs;
