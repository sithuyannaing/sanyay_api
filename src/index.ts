import express from "express";
import config from "./databases/config";
import content from "./routes/content";
import user from "./routes/user";

const app = express();
const port = config.port;
app.use(express.json());
app.use("/", user);
app.use("/content", content);

app.listen(port, () => {
  console.log(`server is listening on Port ${port}`);
});

//will add graceful shudown later below
