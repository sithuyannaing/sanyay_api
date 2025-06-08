import { faker } from "@faker-js/faker";
import bcrypt from "bcrypt";
import db from "../databases/db";

const userSeeder = async () => {
  try {
    await db.query(`CREATE TABLE IF NOT EXISTS users (
      id INT NOT NULL AUTO_INCREMENT,
      name VARCHAR(30) NOT NULL,
      username VARCHAR(30) NOT NULL UNIQUE,
      bio TEXT,
      password VARCHAR(100) NOT NULL,
      created DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
      PRIMARY KEY (id)
    );`);
    console.log("User Table created");
  } catch (error) {
    console.log(error);
  }
  const password = await bcrypt.hash("password", 10);
  console.log("---user seeding is started---");

  for (let i = 0; i < 10; i++) {
    const firstName = faker.person.firstName();
    const lastName = faker.person.lastName();
    const name = `${firstName} ${lastName}`;
    const username = `${firstName}${lastName}`.toLowerCase();
    const bio = faker.person.bio();

    const data = {
      name: name,
      username: username,
      bio: bio,
      password: password,
    };
    const result: any = await db.query(`INSERT INTO users SET ?`, data);
    let message = "Error in creating Record";
    if (result.affectedRows) {
      message = "Record created successfully";
      console.log(message);
    }
    console.log(message);
  }
};

export default userSeeder;
