const puppeteer = require('puppeteer');
const path = require('path');

const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

async function takeScreenshots() {
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();

    await page.setViewport({ width: 1400, height: 900 });

    const filePath = `file://${path.resolve(__dirname, 'index.html')}`;
    await page.goto(filePath, { waitUntil: 'networkidle0' });

    // Wait for page to fully render
    await delay(2000);

    const themes = ['space', 'dungeon', 'cyberpunk', 'forest', 'ocean'];

    for (const theme of themes) {
        // Set theme via localStorage and reload
        await page.evaluate((t) => {
            localStorage.setItem('claude-viz-theme', t);
        }, theme);

        await page.reload({ waitUntil: 'networkidle0' });
        await delay(1500);

        await page.screenshot({
            path: `screenshot-${theme}.png`,
            fullPage: false
        });

        console.log(`Screenshot saved: screenshot-${theme}.png`);
    }

    await browser.close();
    console.log('Done!');
}

takeScreenshots().catch(console.error);
