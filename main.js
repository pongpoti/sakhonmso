import express from "express";
import process from "node:process";
import * as line from "@line/bot-sdk";
import axios from "axios";

const app = express();
const port = process.env.PORT || 3030;
const headers = {
  "Content-Type": "application/json",
  "Authorization":
    "Bearer CfooTgPWPH5iXEy9g0a8yGbzFXqMEchsXbW35GI0SQmtYLJqQHX45FwqBuorTlUqlxvg817UnB9vcpWDykEs8gdJdtf97k0fvTWQigrdRCOMq4J4IZ1RTvrV+CE8Q61D92LyyNQ98sCdmdXBMZ+jgAdB04t89/1O/w1cDnyilFU=",
};

const config = {
  channelSecret: "fbd3ebe2ca4028a0af48b9b65ed870fa",
};
const client = new line.messagingApi.MessagingApiClient({
  channelAccessToken:
    "CfooTgPWPH5iXEy9g0a8yGbzFXqMEchsXbW35GI0SQmtYLJqQHX45FwqBuorTlUqlxvg817UnB9vcpWDykEs8gdJdtf97k0fvTWQigrdRCOMq4J4IZ1RTvrV+CE8Q61D92LyyNQ98sCdmdXBMZ+jgAdB04t89/1O/w1cDnyilFU=",
});

const _color = [
  ["bg-red-300", "#ffa2a2"],
  ["bg-orange-300", "#ffb86a"],
  ["bg-yellow-300", "#ffdf20"],
  ["bg-lime-300", "#bbf451"],
  ["bg-green-300", "#7bf1a8"],
  ["bg-teal-300", "#46ecd5"],
  ["bg-cyan-300", "#53eafd"],
  ["bg-sky-300", "#74d4ff"],
  ["bg-blue-300", "#8ec5ff"],
  ["bg-indigo-300", "#a3b3ff"],
  ["bg-violet-300", "#c4b4ff"],
  ["bg-fuchsia-300", "#f4a8ff"],
];

app.use("/status", express.static("status"));
app.use("/external", express.static("external"));

app.listen(port, () => {
  console.log(".. 3030 ..");
});

app.post("/line", line.middleware(config), (req, res) => {
  Promise
    .all(req.body.events.map(handleEvent))
    .then((result) => res.json(result))
    .catch((error) => console.error(error));
});

function handleEvent(event) {
  const data = event.postback.data;
  const userId = event.source.userId;
  loadAnimation(userId);
  if (data === "rm_status") {
    console.log("rm_status");
  } else if (data === "rm_send") {
    client.pushMessage({
      "to": userId,
      "messages": [
        {
          "type": "text",
          "text": "บริการนี้ยังไม่เปิดใช้งาน",
        },
      ],
    });
  } else if (data === "rm_sign") {
    client.pushMessage({
      "to": userId,
      "messages": [
        {
          "type": "text",
          "text": "บริการนี้ยังไม่เปิดใช้งาน",
        },
      ],
    });
  }
}

function loadAnimation(userId) {
  axios.post(
    "https://api.line.me/v2/bot/chat/loading/start",
    {
      "chatId": userId,
      "loadingSeconds": 5,
    },
    {
      headers: headers,
    },
  )
    .then()
    .catch((error) => console.error(error));
}
