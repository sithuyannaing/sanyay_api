import mysql from "mysql2/promise";
import config from "./config";

const query = async (sql: string, params?: any) => {
  try {
    const connection = await mysql.createConnection(config.db);
    const [result] = await connection.query(sql, params);
    return result;
  } catch (err) {
    console.log("Connection Failed", err);
  }
};

export default {
  query,
};
