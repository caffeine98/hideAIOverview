import { defineConfig } from 'wxt';

// See https://wxt.dev/api/reference/wxt/interfaces/inlineconfig.html
export default defineConfig({
    srcDir: 'src',
    manifest: {
        name: 'HAIO - Hide AI Overview',
        description: 'Never get spoiled by AI Overview again. HAIO hides the AI Overview by default. Users can toggle between hidden and visible.',
        permissions: ['storage'],
    },
});
