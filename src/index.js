const express = require("express");
const app = express();
const path = require("path");

// languages
const homeSwedish = require("./public/translations/home/sv.json");
const homeEnglish = require("./public/translations/home/en.json");

const page2Swedish = require("./public/translations/page2/sv.json");
const page2English = require("./public/translations/page2/en.json");

app.use(express.static(path.join(__dirname, "public")));

// if we used a render engine we would use the translation files
// to render the correct language, using the same data on the
// server and the client, reuse ftw
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.get("/page2", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "page2.html"));
});

app.get("/lang", (req, res) => {
  switch (req.query.q) {
    case "sv":
      switch (req.query.page) {
        case "home":
          return res.json(homeSwedish);

        default:
          return res.json(page2Swedish);
      }

    default:
      switch (req.query.page) {
        case "home":
          return res.json(homeEnglish);

        default:
          return res.json(page2English);
      }
  }
});

module.exports = app;
