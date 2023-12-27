import puppeteer from "puppeteer";
describe("App.js", () => {
let browser;
let page;
beforeAll(async () => {
browser = await puppeteer.launch();
page = await browser.newPage();
});
test("Unit test Home render", async () => {
await page.goto("http://localhost:3000");
await page.waitForSelector("#home");
});
afterAll(() => browser.close());
});