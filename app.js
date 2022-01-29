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

  //*Using $$eval
  // const headlines = await page.$$eval(".fc-item__title", (headlines) => {
  //   return headlines.map((curr) =>
  //     curr.textContent
  //       //  Strip new line and tab spaces
  //       .replace(/(\r\n\t|\n|\r|\t)/gm, "")
  //       .trim()
  //   );
  // });

  //* using .evaluate
  // const headlines = await page.evaluate(() =>
  //   Array.from(document.querySelectorAll(".fc-item__title"), (e) => e.innerText)
  // );
  const headlines = await page.evaluate(() => {
    let results = [];
    let items = document.querySelectorAll(".fc-item__title");
    console.log(items);
    items.forEach((i) => {
      results.push({
        url: i.querySelector("a").href,
        text: i.innerText,
      });
    });
    return results;
  });

  res.send(headlines);

  // *Write local file, \r\n new line
  // await fs.writeFile("text.txt,", headlines.join("\r\n"));

  // const stringTitles = JSON.stringify(headlines);

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

//   await fs.writeFile("text.txt,", headlines.join("\r\n"));

//   await browser.close();
// }

// pup();

app.get("/table", async (req, res) => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  // await page.goto("https://libguides.webster.edu/c.php?g=98058&p=8023246");
  await page.goto("https://www.timeanddate.com/holidays/");

  const rawData = await page.evaluate(() => {
    let data = [];
    // let table = document.querySelector(
    //   "#s-lg-content-58625124 > table > tbody > tr:nth-child(1) > td:nth-child(1) > table > tbody"
    // );
    let table = document.querySelector(
      "body > div.main-content-div > div.main-content-div > main > div > section > article.table-data > section > table > tbody"
    );

    let date;
    for (let i = 1; i < table.rows.length; i++) {
      let objCells = table.rows.item(i).cells;
      let values = [];

      for (let j = 0; j < objCells.length; j++) {
        if (objCells.length > 3 && j === 0) {
          date = objCells.item(j).innerHTML;
        }
        let text = objCells.item(j).innerHTML;

        values.push(text);
      }
      let d = { date, values };
      data.push(d);
    }

    return data;
  });

  await browser.close();

  res.send(rawData);
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is serving on port ${PORT}`);
});
