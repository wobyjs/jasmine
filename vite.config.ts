import { defineConfig } from 'vite'
import path from 'path'
// import dts from 'vite-plugin-dts'

const config = defineConfig({
    build: {
        minify: false,
        lib: {
            entry: ["./src/jasmine.ts"],
            name: "woby-jasmine",
            formats: ['es', 'cjs'/*, 'umd'*/],
            fileName: (format: string, entryName: string) => `${entryName}.${format}.js`
        },
        sourcemap: true,
        rollupOptions: {
            external: ['react', 'react-dom', 'woby', 'woby/jsx-runtime', 'oby', "react/jsx-runtime", "react-dom/client"],
            output: {
                globals: {
                    'react': 'React',
                    'react-dom': 'ReactDOM',
                    'woby': 'woby',
                    'oby': 'oby',
                    "react/jsx-runtime": "jsxRuntime",
                    "react-dom/client": "client"
                }
            }
        },
    },
    esbuild: {
        jsx: 'automatic',
    },
    plugins: [
        // dts({ entryRoot: './src', outputDir: './dist/types', exclude: './nodes_modules' })
    ],
    resolve: {
        alias: {
            '~': path.resolve(__dirname, 'src'),
        },
    },
})



export default config
