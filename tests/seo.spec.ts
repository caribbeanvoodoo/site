import { test, expect } from "@playwright/test";
import { routes, musicPath, showPath, translatePath } from "../src/i18n/routes";
import { releases } from "../src/data/releases";
import { shows } from "../src/data/shows";
import { absolute, eventEntity } from "../src/lib/seo";
import { isPastShow, upcomingShows } from "../src/lib/events";

const allPaths: string[] = [
  ...Object.values(routes).flatMap((pair) => [pair.es, pair.en]),
  ...releases.flatMap((release) => [
    musicPath(release.slug, "es"),
    musicPath(release.slug, "en"),
  ]),
  ...shows.flatMap((show) => [
    showPath(show.slug, "es"),
    showPath(show.slug, "en"),
  ]),
];

test("every page exposes localized metadata, links and valid JSON-LD without JavaScript", async ({
  browser,
}) => {
  const context = await browser.newContext({ javaScriptEnabled: false });
  const page = await context.newPage();
  const titles = new Set();
  for (const path of allPaths) {
    const response = await page.goto(`http://127.0.0.1:4321${path}`, {
      waitUntil: "domcontentloaded",
    });
    expect(response?.status(), path).toBe(200);
    const en = path === "/en" || path.startsWith("/en/");
    await expect(page.locator("html")).toHaveAttribute(
      "lang",
      en ? "en" : "es-MX",
    );
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
      "href",
      absolute(path),
    );
    for (const [language, locale] of [
      ["es-MX", "es"],
      ["en", "en"],
      ["x-default", "es"],
    ] as const) {
      await expect(
        page.locator(`link[hreflang="${language}"]`),
      ).toHaveAttribute("href", absolute(translatePath(path, locale)));
    }
    await expect(page.locator("h1")).toHaveCount(1);
    const title = await page.title();
    expect(titles.has(title), title).toBe(false);
    titles.add(title);
    const graph = JSON.parse(
      await page.locator('script[type="application/ld+json"]').innerText(),
    );
    expect(
      graph["@graph"].some(
        (node: { "@type": string }) => node["@type"] === "MusicGroup",
      ),
    ).toBe(true);
    if (path.includes("kamikaze")) {
      await expect(page.locator('iframe[src*="xUW1N8X0d70"]')).toHaveCount(1);
      expect(
        graph["@graph"].find(
          (node: { "@type": string }) => node["@type"] === "VideoObject",
        ).uploadDate,
      ).toContain("2026-08-16");
    }
    if (path.includes("darkpsycho-metamorphosis")) {
      const album = graph["@graph"].find(
        (node: { "@type": string }) => node["@type"] === "MusicAlbum",
      );
      expect(album.datePublished).toBeUndefined();
      await expect(
        page.getByText(
          en ? "Upcoming concept album" : "Próximo álbum conceptual",
          { exact: true },
        ),
      ).toBeVisible();
    }
  }
  await context.close();
});

test("sitemap contains canonical localized URLs and honest modification dates", async ({
  request,
}) => {
  const response = await request.get("/sitemap.xml");
  expect(response.status()).toBe(200);
  const text = await response.text();
  const urls = [...text.matchAll(/<loc>(.*?)<\/loc>/g)].map((m) => m[1]);
  expect(urls.sort()).toEqual(allPaths.map(absolute).sort());
  expect(text).not.toContain("https://caribbeanvoodoo.mx");
  expect(text).toContain("2026-09-15");
  expect(await (await request.get("/robots.txt")).text()).toContain(
    "Sitemap: https://www.caribbeanvoodoo.mx/sitemap.xml",
  );
  for (const path of [
    "/musica/missing",
    "/en/music/missing",
    "/fechas/rockstar-fest-leon-oct-2026",
    "/en/shows/missing",
  ]) {
    expect((await request.get(path)).status()).toBe(404);
  }
});

test("event dates honor the venue timezone and gate rich data on confirmed fields", () => {
  const show = shows[2];
  expect(isPastShow(show, Date.parse("2026-08-30T04:59:59Z"))).toBe(false);
  expect(isPastShow(show, Date.parse("2026-08-30T05:00:00Z"))).toBe(true);
  expect(upcomingShows(shows, Date.parse("2026-09-15T12:00:00Z"))).toHaveLength(
    0,
  );
  const future = { ...show, startDateTime: "2099-08-29T20:00:00-05:00" };
  expect(upcomingShows([future], Date.now())).toHaveLength(1);
  expect(
    upcomingShows([{ ...future, status: "cancelled" }], Date.now()),
  ).toHaveLength(0);
  expect(
    eventEntity(
      { ...future, fullAddress: undefined },
      "es",
      "/fechas/test",
      Date.now(),
    ),
  ).toBeNull();
  expect(
    eventEntity({ ...future, timeTBA: true }, "es", "/fechas/test", Date.now()),
  ).toBeNull();
  const entity = eventEntity(future, "es", "/fechas/test", Date.now());
  expect(entity?.startDate).toBe(future.startDateTime);
  expect(entity?.offers).toBeUndefined();
  expect(
    eventEntity(
      { ...future, cover: 100, ticketUrl: "https://example.com/tickets" },
      "es",
      "/fechas/test",
      Date.now(),
    )?.offers?.price,
  ).toBe(100);
  expect(
    eventEntity(
      show,
      "es",
      showPath(show.slug, "es"),
      Date.parse("2026-09-15"),
    ),
  ).toBeNull();
});

test("mobile language navigation, focus, reduced motion and signup validation", async ({
  page,
}) => {
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  let subscribeCalls = 0;
  await page.route("**/api/subscribe", async (route) => {
    subscribeCalls++;
    await route.abort();
  });
  await page.setViewportSize({ width: 390, height: 844 });
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  await expect(page.locator(".cvBreathe")).toHaveCSS("animation-name", "none");
  await page.keyboard.press("Tab");
  const outline = await page
    .locator(":focus")
    .evaluate((node) => getComputedStyle(node).outlineStyle);
  expect(outline).toBe("solid");
  await page.getByRole("link", { name: "EN", exact: true }).click();
  await expect(page).toHaveURL(/\/en$/);
  await expect(page.locator("html")).toHaveAttribute("lang", "en");
  await page.reload();
  await expect(
    page.getByText(
      "Caribbean Voodoo is a psychedelic rock band from Tulum, Mexico.",
      { exact: true },
    ),
  ).toBeVisible();
  await expect(page.locator("#fechas")).toContainText("New dates coming soon");
  await page.getByRole("button", { name: "Join", exact: true }).click();
  await expect(
    page.getByText("Enter a valid email", { exact: true }),
  ).toBeVisible();
  expect(subscribeCalls).toBe(0);
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= innerWidth,
    ),
  ).toBe(true);
  await page.goto("/en/music/kamikaze");
  await page.getByRole("link", { name: "ES", exact: true }).click();
  await expect(page).toHaveURL(/\/musica\/kamikaze$/);
  expect(errors).toEqual([]);
});

test("all internal destinations exist and archived shows have no reservation CTA", async ({
  page,
  request,
}) => {
  const destinations = new Set<string>();
  for (const path of allPaths) {
    await page.goto(path, { waitUntil: "domcontentloaded" });
    for (const href of await page
      .locator('a[href^="/"]')
      .evaluateAll((links) =>
        links.map((link) => link.getAttribute("href")!),
      )) {
      destinations.add(href.split("#")[0] || "/");
    }
  }
  for (const url of destinations)
    expect((await request.get(url)).status(), url).toBe(200);
  await page.goto("/fechas/karunna-leon-ago-2026");
  await expect(page.getByText("Archivo · Esta fecha ya pasó.")).toBeVisible();
  await expect(
    page.getByRole("link", { name: "Reserva tu lugar" }),
  ).toHaveCount(0);
});

test("signup success persists through reload and switching languages", async ({
  page,
}) => {
  let calls = 0;
  await page.route("**/api/subscribe", async (route) => {
    calls++;
    expect(route.request().postDataJSON()).toMatchObject({
      email: "seo-test@example.invalid",
      consent: true,
    });
    await route.fulfill({
      status: 200,
      contentType: "application/json",
      body: '{"ok":true}',
    });
  });
  await page.goto("/");
  await page.locator('input[name="email"]').fill("seo-test@example.invalid");
  await page.locator('input[name="consent"]').check();
  await page.getByRole("button", { name: "Unirme", exact: true }).click();
  await expect(page.getByRole("status")).toContainText(
    "Ya eres de los nuestros",
  );
  await page.reload();
  await expect(page.getByRole("status")).toBeVisible();
  await page.getByRole("link", { name: "EN", exact: true }).click();
  await expect(page.getByRole("status")).toContainText("You're one of us now");
  expect(calls).toBe(1);
});

test("narrow screens do not overflow", async ({ page }) => {
  await page.setViewportSize({ width: 320, height: 844 });
  for (const path of [
    "/",
    "/en",
    "/en/music/darkpsycho-metamorphosis",
    "/en/press",
  ]) {
    await page.goto(path, { waitUntil: "domcontentloaded" });
    await page.evaluate(() => document.fonts.ready);
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth,
      ),
      path,
    ).toBe(true);
  }
});
