> https://github.com/xiatiancheng/vue3-Ts-Pinia
## Pinia特点
1. 完整的 typescript 的支持；
2. 足够轻量，压缩后的体积只有1.6kb;
3. 去除 mutations，只有 state，getters，actions；
4. actions 支持同步和异步；
5. 没有模块嵌套，只有 store 的概念，store 之间可以自由使用，更好的代码分割；
6. 无需手动添加 store，store 一旦创建便会自动添加；

## 安装Pinia
> npm install pinia --save

## 3.新建 src/store 目录并在其下面创建 user.ts
```javascript
    import { defineStore } from 'pinia'

    export const useUserStore = defineStore({
    id: 'user', // id必填，且需要唯一
    state: () => {
        return {
            name: "夏天",
        }
    }
    })

```

## 4.vite.config.ts 我的配置
```javascript
    import { defineConfig } from "vite";
    import path from "path";
    import vue from '@vitejs/plugin-vue';

    const resolve = (dir: string) => path.join(__dirname, dir)

    export default defineConfig({
        base: "",
        plugins: [vue()],
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
```
## 4.安装依赖 否则 import path from "path"; 找不到模块 “path“ 或其相对应的类型声明
> npm install @types/node --save-dev 

## 5.src/components/HelloWorld.vue
```javascript
    <template>
        <div>{{ userStore.name }}</div>
    </template>

    <script lang="ts" setup>
        import { useUserStore } from "@/store/user";
        const userStore = useUserStore();
    </script>
```
### 1. computed 也可以获取userStore
```javascript
    <template>
        <div>{{ name }}</div>
    </template>

    <script lang="ts" setup>
        import { computed } from 'vue'
        const name = computed(() => userStore.name)
    </script>
```

### 2. 这样解构赋值也是ok的
```javascript
    <template>
     <div>{{name}}</div>
    </template>

    <script lang="ts" setup>
        import { storeToRefs } from 'pinia'
        import { useUserStore } from "@/store/user";
        const userStore = useUserStore();
        const { name } = storeToRefs(userStore)
    </script>
```

## 6. 在 tsconfig.json 文件中,新增，否则 "@/store/user"  找不到模块“@/store/user”或其相应的类型声明
```javascript
    {
        "compilerOptions": {
            "target": "esnext",
            "useDefineForClassFields": true,
            "module": "esnext",
            "moduleResolution": "node",
            "strict": true,
            "jsx": "preserve",
            "sourceMap": true,
            "resolveJsonModule": true,
            "esModuleInterop": true,
            "lib": ["esnext", "dom"],
            "baseUrl": ".",

            // 新增 解决@ 报错
            "paths": {
                "@/*": [
                    "src/*"
                ]
            }
            
        },
        "include": ["src/**/*.ts", "src/**/*.d.ts", "src/**/*.tsx", "src/**/*.vue"]
    }

```

## 7.好了 重启项目
[![启动项目]](https://s4.ax1x.com/2022/02/09/HGPtx0.png)]

## 8. 通过 actions 去修改 state，action 里可以直接通过 this 访问
```javascript
    import { defineStore } from "pinia";
    // defineStore 调用后返回一个函数，调用该函数获得 Store 实体
    export const useUserStore = defineStore({
        id: "user",
        // state: 返回对象的函数
        state: () => {
            return {
                name: "夏天",
            };
        },  
        actions: {
            // 在Vuex实现需要两步  1.定义mutations 2.提交mutations
            updateName(name:string) {
                this.name = name;
            },
            // action 支持 async/await 的语法，轻松应付异步处理的场景。
            async login(account, pwd) {
                const { data } = await api.login(account, pwd)
                return data
            }
        },
    });
```
## 9. src/components/HelloWorld.vue中 修改state
### 0. 通过actions来修改
```javascript
    <template>
        <div>{{name}}</div>
    </template>

    <script lang="ts" setup>
        import { storeToRefs } from 'pinia'
        import { useUserStore } from "@/store/user";
        const userStore = useUserStore();
        const { name } = storeToRefs(userStore)
        // 修改夏天为叮叮咚
        userStore.updateName('叮叮咚')
    </script>
```
### 1. 最简单的方式
```javascript
    userStore.name = "夏天的故事"
```
### 2. $patch一个函数 适合批量
```javascript
    userStore.$patch((state:any) => {
        state.name = "朝闻道"
    })
```

## 10. getters
```javascript
import { defineStore } from "pinia";
import { otherState } from "@/store/otherState.ts";
// defineStore 调用后返回一个函数，调用该函数获得 Store 实体
export const useUserStore = defineStore({
  id: "user",
  state: () => {
    return {
      name: "夏天",
      count: 0,
    };
  },
  // 类似组件的 computed, 用来封装计算属性，有缓存的功能
  getters: {
    // 函数接受一个可选参数 state 状态对象
    countPlus10(state) {
      console.log("countPlus调用了");
      return state.count + 10;
    },
    // 如果getters 中使用了this不接受state参数，则必须手动指定返回值的类型，否则无法推导出来
    countPlus20(): number {
      return this.count + 10;
    },

    // 获取其它 Getter， 直接通过 this
    countOtherPlus() {
      return this.countPlus20;
    },

    // 使用其它 Store
    otherStoreCount(state) {
      // 这里是其他的 Store，调用获取 Store，就和在 setup 中一样
      const otherStore = useOtherStore();
      return otherStore.count;
    },
  },
  actions: {
    // 在Vuex实现需要两步  1.定义mutations 2.提交mutations
    updateName(name: string) {
      this.name = name;
    },
  },
});

```
> 使用  userStore.countPlus10

## 11. 插件 pinia-plugin-persist 可以辅助实现数据持久化功能。

> npm i pinia-plugin-persist --save
### 1.在 store/user.ts里开启数据缓存
```javascript
  // 开启数据缓存
  persist: {
    enabled: true,
    strategies: [
        {
          storage: localStorage, // 只持久存储name和age到localStorage
          paths: ['name']
        }
      ]
  },
```
[![开启数据缓存]](https://s4.ax1x.com/2022/02/09/HGN7Mq.png)]


