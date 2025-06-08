import { faker } from "@faker-js/faker";
import db from "../databases/db";

const commentSeeder = async () => {
  try {
    await db.query(`CREATE TABLE IF NOT EXISTS comments (
    id INT NOT NULL AUTO_INCREMENT,
    content TEXT NOT NULL,
    userId INT NOT NULL,
    postId INT NOT NULL,
    created DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (id),
    FOREIGN KEY (userId) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (postId) REFERENCES posts(id) ON DELETE CASCADE
  );`);
    console.log("User Table created");
  } catch (error) {
    console.log(error);
  }
  console.log("---comment seeding is started---");

  for (let i = 0; i <= 5; i++) {
    const content = faker.lorem.paragraph();
    const userId = faker.number.int({ min: 1, max: 10 });
    const postId = faker.number.int({ min: 1, max: 20 });

    const data = {
      content: content,
      userId: userId,
      postId: postId,
    };
    const result: any = await db.query(`INSERT INTO comments SET ?`, data);
    let message = "Error in creating Record";
    if (result.affectedRows) {
      message = "Record created successfully";
      console.log(message);
    }
    console.log(message);
  }
};
export default commentSeeder;
