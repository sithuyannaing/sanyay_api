import mysql from "mysql2/promise";
import config from "./config";

const query = async (sql: string, params?: any) => {
  const connection = await mysql.createConnection(config.db);
  const [result] = await connection.query(sql, params);
  return result;
};

export default {
  query,
};
