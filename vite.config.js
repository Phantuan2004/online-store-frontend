import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'
import fs from 'fs'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    {
      name: 'copy-vendor-js',
      apply: 'build',
      generateBundle() {
        const vendorPath = path.resolve(__dirname, 'src/assets/vendor/js')
        const destVendorPath = path.resolve(__dirname, 'dist/js/vendor')
        
        if (!fs.existsSync(destVendorPath)) {
          fs.mkdirSync(destVendorPath, { recursive: true })
        }
        
        // Copy vendor files
        if (fs.existsSync(vendorPath)) {
          fs.readdirSync(vendorPath).forEach(file => {
            const src = path.join(vendorPath, file)
            const dest = path.join(destVendorPath, file)
            if (fs.statSync(src).isFile()) {
              fs.copyFileSync(src, dest)
            }
          })
        }
        
        // Copy main.js files
        const mainJsFiles = [
          { src: path.resolve(__dirname, 'src/assets/user/js/main.js'), dest: path.resolve(__dirname, 'dist/js/main.js') },
          { src: path.resolve(__dirname, 'src/assets/admin/js/main.js'), dest: path.resolve(__dirname, 'dist/js/admin-main.js') }
        ]
        
        mainJsFiles.forEach(({ src, dest }) => {
          if (fs.existsSync(src)) {
            const destDir = path.dirname(dest)
            if (!fs.existsSync(destDir)) {
              fs.mkdirSync(destDir, { recursive: true })
            }
            fs.copyFileSync(src, dest)
          }
        })
      }
    },
    {
      name: 'transform-vendor-paths',
      apply: 'build',
      transformIndexHtml(html) {
        // Replace /src/assets/vendor/js/ with /js/vendor/
        let transformed = html.replace(/\/src\/assets\/vendor\/js\//g, '/js/vendor/')
        // Replace /src/assets/user/js/ with /js/
        transformed = transformed.replace(/\/src\/assets\/user\/js\//g, '/js/')
        return transformed
      }
    }
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      'assets': path.resolve(__dirname, './src/assets/user')
    }
  },
  build: {
    rollupOptions: {
      output: {
        assetFileNames: (assetInfo) => {
          if (!assetInfo.name) {
            return 'assets/[name]-[hash][extname]'
          }
          const info = assetInfo.name.split('.')
          const ext = info[info.length - 1]
          if (/png|jpe?g|gif|svg|webp|ico/.test(ext)) {
            return `images/[name]-[hash][extname]`
          } else if (/woff|woff2|eot|ttf|otf/.test(ext)) {
            return `fonts/[name]-[hash][extname]`
          }
          return `assets/[name]-[hash][extname]`
        }
      }
    }
  }
})
