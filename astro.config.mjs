import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';

// https://astro.build/config
export default defineConfig({
  site: 'https://travellingseniors.com.au',
  integrations: [
    tailwind({
      applyBaseStyles: false,
    }),
  ],
});
