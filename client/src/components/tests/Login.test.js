import puppeteer from "puppeteer";
describe("App.js", () => {
let browser;
let page;
beforeAll(async () => {
browser = await puppeteer.launch();
page = await browser.newPage();
});
test("Unit test Login render", async () => {
    await page.goto("http://localhost:3000/login");
    await page.waitForSelector("#googleButton ");
    });
afterAll(() => browser.close());
});