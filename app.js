require("dotenv").config({ path: "./config.env" });
require("./mongo/mongoose");
//npm install puppeteer
const puppeteer = require("puppeteer");
//* this FS here will not take a call back and will return a promise, can be used with await
const fs = require("fs/promises");
const express = require("express");
const cors = require("cors");
const { type } = require("express/lib/response");
const app = express();

app.use(express.json());
app.use(cors());

app.get("/", async (req, res) => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto("https://www.theguardian.com/uk");

  //* this'll take a full page screenshot of the goto webpage
  // await page.screenshots({ path: "amazing.png", fullPage:true });

  // const headlines = await page.evaluate(() => {
  //   return Array.from(document.querySelectorAll(".fc-item__title")).map(
  //     (x) => x.textContent
  //   );
  // });
  // const headlines = await page.$$eval(".fc-item__title", (headlines) => {
  //   return headlines.map(
  //     (curr) =>
  //       curr.textContent
  //          Strip new line and tab spaces
  //         .replace(/(\r\n\t|\n|\r|\t)/gm, "")
  //         .trim()
  //     .jsonValue()
  //   );
  // });

  const headlines = await page.evaluate(() =>
    Array.from(document.querySelectorAll(".fc-item__title"), (e) => e.innerText)
  );

  res.send(headlines);

  // *Write local file, \r\n new line
  // await fs.writeFile("text.txt,", headlines.join("\r\n"));

  // const stringTitles = JSON.stringify(headlines);

  // const allTitles = headlines.map((line) => {
  //   line;
  // });
  // console.log(typeof allTitles, allTitles);
  // // res.send(typeof stringTitles);
  // await fs.writeFile("text.txt,", headlines.join("\r\n"));

  await browser.close();
});

// async function pup() {
//   const browser = await puppeteer.launch();
//   const page = await browser.newPage();
//   await page.goto("https://www.theguardian.com/uk");

//   //* this'll take a full page screenshot of the goto webpage
//   // await page.screenshots({ path: "amazing.png", fullPage:true });
//   const headlines = await page.evaluate(() => {
//     return Array.from(document.querySelectorAll(".fc-item__title")).map(
//       (x) => x.textContent
//     );
//   });
//   // ('.fc-item__title')

//   await fs.writeFile("text.txt,", headlines.join("\r\n"));

//   await browser.close();
// }

// pup();

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is serving on port ${PORT}`);
});
