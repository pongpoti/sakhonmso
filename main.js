import express from "express";
import process from "node:process";
import * as line from "@line/bot-sdk";
import axios from "axios";

const app = express();
const port = process.env.PORT || 3030;
const headers = {
  "Content-Type": "application/json",
  "Authorization": "Bearer " + Deno.env.get("CHANNEL_ACCESS_TOKEN"),
};

const config = {
  channelSecret: Deno.env.get("CHANNEL_SECRET"),
};
const client = new line.messagingApi.MessagingApiClient({
  channelAccessToken: Deno.env.get("CHANNEL_ACCESS_TOKEN"),
});

const color_array = [
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

const month_array = [
  "มกราคม",
  "กุมภาพันธ์",
  "มีนาคม",
  "เมษายน",
  "พฤษภาคม",
  "มิถุนายน",
  "กรกฎาคม",
  "สิงหาคม",
  "กันยายน",
  "ตุลาคม",
  "พฤศจิกายน",
  "ธันวาคม",
];

const month_iterator = [
  [[11, -1], [10, -1], [9, -1]],
  [[0, 0], [11, -1], [10, -1]],
  [[1, 0], [0, 0], [11, -1]],
  [[2, 0], [1, 0], [0, 0]],
  [[3, 0], [2, 0], [1, 0]],
  [[4, 0], [3, 0], [2, 0]],
  [[5, 0], [4, 0], [3, 0]],
  [[6, 0], [5, 0], [4, 0]],
  [[7, 0], [6, 0], [5, 0]],
  [[8, 0], [7, 0], [6, 0]],
  [[9, 0], [8, 0], [7, 0]],
  [[10, 0], [9, 0], [8, 0]],
];

app.use("/status", express.static("status"));
app.use("/external", express.static("external"));

app.listen(port, () => {
  console.log("server on..");
});

app.post("/line", line.middleware(config), (req, res) => {
  Promise
    .all(req.body.events.map((event) => {
      const userId = event.source.userId;
      axios.post(
        "https://api.line.me/v2/bot/chat/loading/start",
        {
          "chatId": userId,
        },
        {
          headers: headers,
        },
      )
        .then(() => {
          if (event.postback.data === "rm_status") {
            client.pushMessage({
              "to": userId,
              "messages": [
                {
                  "type": "flex",
                  "altText": "เลือกเดือนที่ต้องการ",
                  "contents": assembleLists(),
                },
              ],
            });
          } else if (event.postback.data === "rm_send") {
            client.pushMessage({
              "to": userId,
              "messages": [
                {
                  "type": "text",
                  "text": "บริการนี้ยังไม่เปิดใช้งาน",
                },
              ],
            });
          } else if (event.postback.data === "rm_sign") {
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
        })
        .catch((error) => console.error(error));
    }))
    .then((result) => res.json(result))
    .catch((error) => console.error(error));
});

function createList(i) {
  const month = (new Date()).getMonth();
  const year = (new Date()).getFullYear() + 543;
  const iterator = month_iterator[month];
  const name = month_array[iterator[i][0]] + " " + (year + iterator[i][1]);
  const color_hex = color_array[iterator[i][0]][1];
  const color_tw = color_array[iterator[i][0]][0];
  const date = (year + iterator[i][1]) + "_" + (iterator[i][0] + 1);
  const object = {
    "type": "box",
    "layout": "horizontal",
    "contents": [
      {
        "type": "box",
        "layout": "vertical",
        "contents": [
          {
            "type": "text",
            "text": name,
            "align": "center",
            "size": "lg",
            "style": "italic",
            "weight": "bold",
          },
        ],
        "backgroundColor": color_hex,
        "cornerRadius": "sm",
        "borderColor": color_hex,
        "borderWidth": "semi-bold",
        "flex": 3,
        "paddingAll": "md",
      },
      {
        "type": "box",
        "layout": "vertical",
        "contents": [
          {
            "type": "text",
            "text": "คลิก",
            "align": "center",
            "weight": "bold",
            "size": "lg",
            "color": "#312c85",
          },
        ],
        "backgroundColor": "#f5f5f5",
        "cornerRadius": "md",
        "offsetEnd": "md",
        "borderColor": "#312c85",
        "borderWidth": "semi-bold",
        "flex": 1,
        "paddingAll": "md",
        "action": {
          "type": "uri",
          "label": date,
          "uri": "https://liff.line.me/2008561527-a0xP1XmY?date=" + date +
            "&color=" + color_tw,
        },
      },
    ],
    "paddingBottom": "xxl",
    "paddingTop": "xxl",
  };
  return object;
}

function assembleLists() {
  const object = {
    "type": "bubble",
    "size": "mega",
    "header": {
      "type": "box",
      "layout": "vertical",
      "contents": [
        {
          "type": "box",
          "layout": "vertical",
          "contents": [
            {
              "type": "text",
              "text": "กรุณาเลือกเดือน",
              "align": "center",
              "color": "#FFFFFF",
              "size": "xxl",
              "margin": "md",
              "offsetBottom": "sm",
              "weight": "bold",
            },
            {
              "type": "text",
              "text": "สามารถดูได้ 3 เดือนย้อนหลัง",
              "color": "#ffffa0",
              "align": "center",
            },
          ],
        },
      ],
      "backgroundColor": "#1F627C",
      "paddingAll": "xxl",
    },
    "hero": {
      "type": "box",
      "layout": "vertical",
      "contents": [],
      "height": "5px",
      "backgroundColor": "#81A7AE",
    },
    "body": {
      "type": "box",
      "layout": "vertical",
      "contents": [
        createList(0),
        createList(1),
        createList(2),
      ],
    },
  };
  return object;
}
