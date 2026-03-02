const puppeteer = require('puppeteer');

const theme = process.argv[2] || 'space';
const outputPath = process.argv[3] || `/tmp/${theme}-theme.png`;

(async () => {
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();

    // Disable cache to get fresh CSS
    await page.setCacheEnabled(false);

    await page.setViewport({ width: 1400, height: 900 });

    // Navigate to the app
    await page.goto(`http://localhost:3002/index.html`, {
        waitUntil: 'networkidle0',
        timeout: 30000
    });

    // Wait for the visualization to load
    await page.waitForSelector('.node', { timeout: 10000 });

    // Apply the theme via the ThemeManager
    await page.evaluate((themeName) => {
        // Clear localStorage first to ensure we're applying fresh
        localStorage.removeItem('claude-viz-theme');
        localStorage.setItem('claude-viz-theme', themeName);

        // Apply theme via ThemeManager
        if (window.themeManager) {
            window.themeManager.setTheme(themeName);
        }

        // Also directly set the data-theme attribute
        document.documentElement.setAttribute('data-theme', themeName);
    }, theme);

    // Wait longer for animations and effects to initialize
    await new Promise(resolve => setTimeout(resolve, 3000));

    // Verify theme was applied
    const appliedTheme = await page.evaluate(() => {
        return document.documentElement.getAttribute('data-theme');
    });
    console.log(`Theme applied: ${appliedTheme}`);

    // Take screenshot
    await page.screenshot({ path: outputPath, fullPage: false });

    console.log(`Screenshot saved to ${outputPath}`);

    await browser.close();
})();
