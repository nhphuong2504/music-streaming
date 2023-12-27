import puppeteer from "puppeteer";
describe("App.js", () => {
let browser;
let page;
beforeAll(async () => {
browser = await puppeteer.launch();
page = await browser.newPage();
});
test("Unit test Dashboard render", async () => {
    await page.goto("http://localhost:3000/dashboard");
    await page.waitForSelector("#dashBoardUser");
    const text = await page.$eval("#dashBoardUser", (e) => e.textContent);
    expect(text).toContain("Users");
    });
afterAll(() => browser.close());
});