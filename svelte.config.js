import preprocess from "svelte-preprocess";
import adapter from '@sveltejs/adapter-auto';

const config = {
  preprocess: [
    preprocess({
      postcss: true,
    }),
  ],
  kit: {
    adapter: adapter()
  }
}

export default config;
