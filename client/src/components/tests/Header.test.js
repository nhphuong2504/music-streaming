import puppeteer from "puppeteer";
describe("App.js", () => {
let browser;
let page;
beforeAll(async () => {
browser = await puppeteer.launch();
page = await browser.newPage();
});
test("Unit test Header render", async () => {
    await page.goto("http://localhost:3000");
    await page.waitForSelector("#header");
    const text = await page.$eval("#artist", (e) => e.textContent);
    expect(text).toContain("Artists");
    });
afterAll(() => browser.close());
});