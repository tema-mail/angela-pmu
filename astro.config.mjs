import { defineConfig } from 'astro/config';
import preact from '@astrojs/preact';

// Боевого домена пока нет; на время показа – GitHub Pages (PUBLIC_SITE_URL и PUBLIC_BASE задаёт workflow).
const SITE = process.env.PUBLIC_SITE_URL || 'https://tema-mail.github.io';
const BASE = process.env.PUBLIC_BASE || '/';

export default defineConfig({
  site: SITE,
  base: BASE,
  integrations: [preact()],
  trailingSlash: 'ignore',
  build: { format: 'directory', inlineStylesheets: 'auto' },
  devToolbar: { enabled: false },
});
