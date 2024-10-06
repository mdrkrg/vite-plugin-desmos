import { defineConfig } from 'vite'

export default defineConfig({
    test: {
        globals: true,
    },
    build: {
        lib: {
            entry: 'src/index.ts',
            name: 'MdItDesmos',
            formats: ['es', 'cjs'],
            fileName: (format) => format == 'es'
                ? `mdit-desmos.js`
                : `mdit-desmos.cjs`,
        },
        rollupOptions: {
            // Ensure that your library is compatible with other packages
            external: ['markdown-it'],
            output: {
                // Provide global variables to other scripts
                globals: {
                    'markdown-it': 'markdownIt'
                }
            },
        }
    }
})
