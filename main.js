import express from "express";
import process from "node:process";
import * as line from "@line/bot-sdk";
import axios from "axios";

const app = express();
const port = process.env.PORT || 3030;
const config = {
  channelSecret: "fbd3ebe2ca4028a0af48b9b65ed870fa",
};
const client = new line.messagingApi.MessagingApiClient({
  channelAccessToken:
    "CfooTgPWPH5iXEy9g0a8yGbzFXqMEchsXbW35GI0SQmtYLJqQHX45FwqBuorTlUqlxvg817UnB9vcpWDykEs8gdJdtf97k0fvTWQigrdRCOMq4J4IZ1RTvrV+CE8Q61D92LyyNQ98sCdmdXBMZ+jgAdB04t89/1O/w1cDnyilFU=",
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
    .then(() => console.log("loadAnimation(), userId : " + userId))
    .catch((error) => console.error(error));
}
