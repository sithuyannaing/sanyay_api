import userSeeder from "./userSeeder";
import postSeeder from "./postSeeder";
import commentSeeder from "./commentSeeder";

const seed = async () => {
  try {
    await userSeeder();
    await postSeeder();
    await commentSeeder();
  } catch (error) {
    console.log(error);
  }
};
seed();
