import { defineConfig } from "vite";
import { ViteEjsPlugin } from "vite-plugin-ejs";
import path from "path";


export default defineConfig ({
    base: "/fullstack-f8-zoom/",
    root: "src",
    publicDir: "../public",
    build: {
        outDir: "../dist",
        emptyOutDir: true,
        rollupOptions: {
            input: {
                index: path.resolve(__dirname, "src/index.html"),
                about: path.resolve(__dirname, "src/about.html"),
            },
        },
    },
    plugins: [ViteEjsPlugin()],
})