import { defineConfig } from "vite";
import path from "path";
import vue from '@vitejs/plugin-vue';
import VueSetupExtend from 'vite-plugin-vue-setup-extend'
import AutoImport from 'unplugin-auto-import/vite'
const resolve = (dir: string) => path.join(__dirname, dir)

export default defineConfig({
    base: "",
    plugins: [
      vue(),
      VueSetupExtend(),
      AutoImport({
        // 可以自定义文件生成的位置，默认是根目录下，使用ts的建议放src目录下
       dts: 'src/auto-imports.d.ts',
       imports: ['vue']
     })],
    resolve: {
      alias: {
        '@': resolve('src'),
        'comps': resolve('src/components'),
        'apis': resolve('src/apis'),
        'views': resolve('src/views'),
        'utils': resolve('src/utils'),
        'routes': resolve('src/routes'),
        'styles': resolve('src/styles')
      }
    },
    css: {
      // css预处理器
      preprocessorOptions: {
        scss: {
          charset: false,
          additionalData: '@import "@/assets/style/variables.scss";',
        },
      },
    },
    build: {
      target: 'modules',
      outDir: 'dist',
      assetsDir: 'assets',
      minify: 'terser' // 混淆器
    },
    server: {
        cors: true,
        open: true,
        proxy: {
          '/api': {
              target: 'http://192.168.99.223:3000',   //代理接口
              changeOrigin: true,
              rewrite: (path) => path.replace(/^\/api/, '')
          }
        }
    }
});