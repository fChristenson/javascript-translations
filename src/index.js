const express = require("express");
const app = express();
const path = require("path");

// languages
/* 
  I have found that the easiest way to maintain translations
  over time is to scope each translation file to the page level
  and give each translation a unique key.
  
  DO NOT try to reuse translations unless you are 100% sure that
  the reused text is the EXACT same for every situation, trust me
  when I say that the same word has different meanings and tone
  for every language and context.
*/
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
  const { q, page } = req.query;

  switch (q) {
    case "sv":
      return getSwedishTranslations(page, res);

    default:
      return getEnglishTranslations(page, res);
  }
});

const getSwedishTranslations = (page, res) => {
  switch (page) {
    case "home":
      return res.json(homeSwedish);

    default:
      return res.json(page2Swedish);
  }
};

const getEnglishTranslations = (page, res) => {
  switch (page) {
    case "home":
      return res.json(homeEnglish);

    default:
      return res.json(page2English);
  }
};

module.exports = app;
