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

const _color = [
  "bg-red-300",
  "bg-orange-300",
  "bg-yellow-300",
  "bg-lime-300",
  "bg-green-300",
  "bg-teal-300",
  "bg-cyan-300",
  "bg-sky-300",
  "bg-blue-300",
  "bg-indigo-300",
  "bg-violet-300",
  "bg-fuchsia-300",
];
