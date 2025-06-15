import { faker } from "@faker-js/faker";
import bcrypt from "bcrypt";
import db from "../databases/db";

const postSeeder = async () => {
  try {
    await db.query(`CREATE TABLE IF NOT EXISTS posts (
        id INT NOT NULL AUTO_INCREMENT,
        content TEXT NOT NULL,
        userId INT NOT NULL,
        created DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
        PRIMARY KEY (id),
        CONSTRAINT fk_userPost FOREIGN KEY (userId) REFERENCES users (id) ON DELETE CASCADE
        );`);
    console.log("User Table created");
  } catch (error) {
    console.log(error);
  }
  console.log("---post seeding is started---");

  for (let i = 0; i <= 5; i++) {
    const content = faker.lorem.paragraph();
    const userId = faker.number.int({ min: 1, max: 10 });

    const data = {
      content: content,
      userId: userId,
    };
    const result: any = await db.query(`INSERT INTO posts SET ?`, data);
    let message = "Error in creating Record";
    if (result.affectedRows) {
      message = "Record created successfully";
      console.log(message);
    }
    //return { message };
    console.log(message);
  }
};

export default postSeeder;
