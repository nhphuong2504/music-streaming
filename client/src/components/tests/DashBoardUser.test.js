import puppeteer from "puppeteer";
describe("App.js", () => {
let browser;
let page;
beforeAll(async () => {
browser = await puppeteer.launch();
page = await browser.newPage();
});
test("Unit test Dashboard User render", async () => {
    await page.goto("http://localhost:3000/dashboard/users");
    await page.waitForSelector("#dashBoardUser");
    });
afterAll(() => browser.close());
});