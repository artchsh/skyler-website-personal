import { mkdir, readFile, writeFile } from "node:fs/promises";
import { chromium } from "playwright";

const captures = [
  ["manualeconomy", "home", "https://manualeconomy.kz/"],
  ["manualeconomy", "category-markets", "https://manualeconomy.kz/category/rynky/"],
  ["manualeconomy", "article", "https://manualeconomy.kz/kak-investory-reagirovali-na-pokupku-fortebank-bulata-utemuratova-nebolshogo-home-credit-bank/"],
  ["modernization", "home", "https://modernization.kz/ru/"],
  ["modernization", "projects", "https://modernization.kz/ru/projects"],
  ["modernization", "article", "https://modernization.kz/ru/news/v-aksu-obnovili-teplomagistral-stabilnoe-teplo-poluchat-jiteli-shesti"],
  ["zhasalash", "home", "https://zhasalash.kz/"],
  ["zhasalash", "category-analysis", "https://zhasalash.kz/categories/saraptama/"],
  ["zhasalash", "article", "https://zhasalash.kz/news/ulttik-kompaniya-basshilari-siyakiga-kashan-toyadi-32a0b5/"],
  ["nofake", "home", "https://nofake.kz/"],
  ["nofake", "category-analytics", "https://nofake.kz/category/analytics/"],
  ["nofake", "article", "https://nofake.kz/sozdali-dipfejk-za-minutu-pochemu-eto-dolzhno-bespokoit-kazahstan/"],
  ["nationalbusiness", "home", "https://nationalbusiness.kz/"],
  ["nationalbusiness", "category-economy", "https://nationalbusiness.kz/category/ekonomika/"],
  ["nationalbusiness", "article", "https://nationalbusiness.kz/news/ekonomist-obyasnil-pochemu-razdel-erg-vigoden-kazahstanu-f27200/"],
];

const selectedCaptures = captures.filter(([site, pageType]) =>
  (!process.env.CAPTURE_SITE || process.env.CAPTURE_SITE === site)
  && (!process.env.CAPTURE_PAGE || process.env.CAPTURE_PAGE === pageType),
);
const root = new URL("../public/portfolio/work/", import.meta.url);
const browser = await chromium.launch({ headless: true });
const results = [];

for (const [site, pageType, url] of selectedCaptures) {
  const directory = new URL(`${site}/`, root);
  await mkdir(directory, { recursive: true });
  const context = await browser.newContext({
    viewport: { width: 1920, height: 1080 },
    deviceScaleFactor: 1,
    locale: "ru-RU",
    colorScheme: "light",
  });
  const page = await context.newPage();
  const startedAt = Date.now();

  try {
    const response = await page.goto(url, { waitUntil: "domcontentloaded", timeout: 90_000 });
    await page.waitForLoadState("networkidle", { timeout: 15_000 }).catch(() => {});

    for (const label of [/^принять$/i, /^accept$/i, /^accept all$/i, /^согласен$/i, /^қабылдау$/i]) {
      const button = page.getByRole("button", { name: label }).first();
      if (await button.isVisible().catch(() => false)) {
        await button.click({ timeout: 2_000 }).catch(() => {});
        break;
      }
    }
    const noticeClose = page.getByRole("button", { name: /закрыть уведомление/i }).first();
    if (await noticeClose.isVisible().catch(() => false)) {
      await noticeClose.click({ timeout: 2_000 }).catch(() => {});
    }

    await page.evaluate(() => window.scrollTo(0, Math.min(650, document.documentElement.scrollHeight)));
    await page.waitForTimeout(800);
    await page.evaluate(() => window.scrollTo(0, 0));
    await page.waitForTimeout(2_200);

    const filename = `${pageType}-1920x1080.jpg`;
    await page.screenshot({
      path: new URL(filename, directory).pathname,
      type: "jpeg",
      quality: 92,
      fullPage: false,
    });

    results.push({
      site,
      pageType,
      requestedUrl: url,
      finalUrl: page.url(),
      status: response?.status() ?? null,
      title: await page.title(),
      description: await page.locator('meta[name="description"]').getAttribute("content").catch(() => null),
      generator: await page.locator('meta[name="generator"]').getAttribute("content").catch(() => null),
      screenshot: `/portfolio/work/${site}/${filename}`,
      viewport: "1920x1080",
      capturedAt: new Date().toISOString(),
      durationMs: Date.now() - startedAt,
    });
  } catch (error) {
    results.push({ site, pageType, requestedUrl: url, error: String(error), durationMs: Date.now() - startedAt });
  } finally {
    await context.close();
  }
}

await browser.close();
const manifestUrl = new URL("capture-manifest.json", root);
let manifest = results;
if (process.env.CAPTURE_SITE || process.env.CAPTURE_PAGE) {
  const previous = JSON.parse(await readFile(manifestUrl, "utf8").catch(() => "[]"));
  const replaced = new Set(results.map(({ site, pageType }) => `${site}:${pageType}`));
  manifest = [...previous.filter(({ site, pageType }) => !replaced.has(`${site}:${pageType}`)), ...results];
}
await writeFile(manifestUrl, `${JSON.stringify(manifest, null, 2)}\n`);
process.stdout.write(`${JSON.stringify(results, null, 2)}\n`);
