import express from "express";
import path from "node:path";
import process from "node:process";

const app = express();
const port = process.env.PORT || 3030;

app.use(express.static(path.join(import.meta.dirname, "public")));
app.use("/external", express.static("external"));

app.get("/get", (_, res) => {
  res.send("hi there");
});

app.listen(port, () => {
  console.log(".. 3030 ..");
});
