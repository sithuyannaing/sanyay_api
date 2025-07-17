import { faker } from "@faker-js/faker";
import bcrypt from "bcrypt";
import db from "../databases/db";

const postSeeder = async () => {
  try {
    await db.query(`CREATE TABLE posts (
        post_id INT NOT NULL AUTO_INCREMENT,
        content TEXT NOT NULL,
        user_id INT NOT NULL,
        created DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
        PRIMARY KEY (post_id),
        FOREIGN KEY (user_id) REFERENCES users (user_id) ON DELETE CASCADE
        );`);
    console.log("User Table created");
  } catch (error) {
    console.log(error);
  }
  console.log("---post seeding is started---");

  for (let i = 0; i <= 20; i++) {
    const content = faker.lorem.paragraph();
    const userId = faker.number.int({ min: 1, max: 10 });

    const data = {
      content: content,
      user_id: userId,
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
