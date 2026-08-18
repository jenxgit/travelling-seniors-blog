import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';

// https://astro.build/config
export default defineConfig({
  site: 'https://travellingsenior.example.com',
  integrations: [
    tailwind({
      applyBaseStyles: false,
    }),
  ],
});
