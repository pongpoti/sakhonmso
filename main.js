const express = require("express");
const path = require("node:path");

const app = express();
const port = process.env.PORT || 3030;

app.use(express.static(path.join(__dirname, "public")));
app.use("/external", express.static("external"));

app.get("/get", (req, res) => {
    res.send("hi there")
})

app.listen(port, () => {
    console.log(".. 3030 ..");
});