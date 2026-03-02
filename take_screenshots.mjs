
import { chromium } from 'playwright';
import fs from 'fs';
import path from 'path';

async function run() {
    const browser = await chromium.launch();
    const page = await browser.newPage();

    // Set viewport to mobile size for better appearance
    await page.setViewportSize({ width: 375, height: 812 });

    const screenshotDir = path.join(process.cwd(), 'screen_shot');
    if (!fs.existsSync(screenshotDir)) {
        fs.mkdirSync(screenshotDir);
    }

    const variants = Array.from({ length: 14 }, (_, i) => i + 1);

    for (const variant of variants) {
        console.log(`Taking screenshot for variant ${variant}...`);
        await page.goto(`http://localhost:3001/?welcome=${variant}`, { waitUntil: 'networkidle' });
        // Wait a bit for animations to settle
        await page.waitForTimeout(2000);
        await page.screenshot({ path: path.join(screenshotDir, `welcome_variant_${variant}.png`) });
    }

    await browser.close();
    console.log('All screenshots taken successfully!');
}

run().catch(err => {
    console.error(err);
    process.exit(1);
});
