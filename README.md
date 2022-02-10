> https://github.com/xiatiancheng/vue3-Ts-Pinia

Vue3 + Ts + Vite + Pinias


```javascript
<template>
    <div>
        哎，当前用户：{{name}}
        {{state}}
        {{loginName}}
    </div>
    <div>{{doubleAge}}</div>
    <a-button type="primary" @click='changeName' danger>我是让他变傻的按钮</a-button>
</template>
<script lang="ts" setup>
    import { reactive, ref, toRefs, computed, watch } from "vue";
    // 1.ref声明响应式数据，用于声明基本数据类型
    const age = ref(20);
    const name = ref("夏天");
    name.value = 'Tom'

    // 2.reactive声明响应式数据，用于声明引用数据类型
    const state = reactive({
        name: '夏天1111',
        sex: '男',
        age: 20
    })
    state.name = '夏天2222'
    // 3.使用toRefs解构 这里重命名name
    const {name: loginName, sex} = toRefs(state) // template可直接使用{{loginName}}、{{sex}}

    // 4.声明method方法
    const changeName = () => {
        state.name = '夏天傻'
    }

    // 5.通过计算属性computed获得
    const doubleAge = computed(() => age.value * 2)
    console.log(doubleAge.value) // 40
    // doubleAge.value++ // 报错只读属性

    //带有 get 和 set 函数的对象来创建一个可写的 ref 对象
    //默认情况下我们只是使用了computer中的gettter属性，只有 getter
    //只有当computed监测的值变化的时候，也就是我下面例子中的fullName变化的时候，set才回被调用
    const doubleAge2 = computed({
        get: () => age.value * 2,
        set: val => {
            age.value = val / 2
        }
    })
    doubleAge2.value = 20
    console.log(age.value) // 10


  // 6.监听
  watch(() => state.age,(newVal, oldVal) => {
      console.log(state.age)
      console.log(`watch监听变化前的数据：${oldVal}`)
      console.log(`watch监听变化后的数据：${newVal}`)
    },
    {
      immediate: true, // 立即执行
      deep: true // 深度监听
    }
  )

</script>
```

## 2.props父传子
1. 父组件
```javascript
<template>
  <child name='xiatian'/>  
</template>

<script setup>
  // 引入子组件(组件自动注册)
  import child from './child.vue'
</script>
```
2. 子组件
```javascript
<template>
  <span>{{props.name}}</span>
  // 可省略【props.】
  <span>{{name}}</span>
</template>

<script setup>
  // defineProps在<script setup>中自动可用，无需导入

  // 声明props
  const props = defineProps({
    name: {
      type: String,
      default: ''
    }
  })  
</script>
```

## 3.emit子传父
1. 父组件
```javascript
<template>
  <child :name='state.name' @updateName='updateName'/>  
</template>

<script setup>
  import { reactive } from 'vue'
  // 引入子组件
  import child from './child.vue'

  const state = reactive({
    name: 'xiatian'
  })
  
  // 接收子组件触发的方法
  const updateName = (name) => {
    state.name = name
  }
</script>
```
2. 子组件
```javascript
<template>
  <span>{{props.name}}</span>
  // 可省略【props.】
  <span>{{name}}</span>
  <button @click='changeName'>更名</button>
</template>

<script setup>
  // 声明props
  const props = defineProps({
    name: {
      type: String,
      default: ''
    }
  }) 
  // 声明事件
  const emit = defineEmits(['updateName'])
  
  const changeName = () => {
    // 执行
    emit('updateName', '夏天222')
  }
</script>
```

## 4. v-model
1. 父组件
```javascript
<template>
  <!-- v-model:modelValue简写为v-model -->
  <!-- 可绑定多个v-model-->
  <child
    v-model="state.name"
    v-model:age="state.age"
  />
</template>

<script setup>
  import { reactive } from 'vue'
  // 引入子组件
  import child from './child.vue'

  const state = reactive({
    name: 'Jerry',
    age: 20
  })
</script>
```
2. 子组件
```javascript
<template>
  <span @click="changeInfo">我叫{{ modelValue }}，今年{{ age }}岁</span>
</template>

<script setup>
  defineProps({
    modelValue: String,
    age: Number
  })

  const emit = defineEmits(['update:modelValue', 'update:age'])
  const changeInfo = () => {
    // 触发父组件值更新
    emit('update:modelValue', 'Tom')
    emit('update:age', 30)
  }
</script>

```

## 5. nextTick
```javascript
<script setup>
  import { nextTick } from 'vue'
	
  nextTick(() => {
    // ...
  })
</script>
```

## 6.子组件ref变量和defineExpose
> 如果要调用子组件的数据，需要先在子组件显示的暴露出来，就是由 defineExpose 来完成。
1. 父组件
```javascript
<template>
  <child ref='childRef'/>  
</template>

<script setup>
  import { ref, nextTick } from 'vue'
  // 引入子组件
  import child from './child.vue'

  // 子组件ref
  const childRef = ref()
  
  // nextTick
  nextTick(() => {
    // 获取子组件name
    console.log(childRef.value.name)
    // 执行子组件方法
    childRef.value.changeName()
  })
</script>

2. 子组件
```
```javascript
<template>
  <span>{{state.name}}</span>
</template>

<script setup>
  import { reactive, toRefs } from 'vue'
  // 声明state
  const state = reactive({
    name: 'xiatian'
  }) 
	
  // 将方法、变量暴露给父组件使用，父组件才可通过ref API拿到子组件暴露的数据
  defineExpose({
    // 解构state
    ...toRefs(state),
    // 声明方法
    changeName () {
      state.name = 'Tom'
    }
  })
</script>
```

## 7. 插槽slot
1. 父组件
```javascript
<template>
  <child>
    <!-- 匿名插槽 -->
    <span>我是默认插槽</span>
    <!-- 具名插槽 -->
    <template #title>
      <h1>我是具名插槽</h1>
      <h1>我是具名插槽</h1>
      <h1>我是具名插槽</h1>
    </template>
    <!-- 作用域插槽 -->
    <template #footer="{ scope }">
      <footer>作用域插槽——姓名：{{ scope.name }}，年龄{{ scope.age }}</footer>
    </template>
  </child> 
</template>

<script setup>
  // 引入子组件
  import child from './child.vue'
</script>
```
2. 子组件
```javascript
<template>
  <!-- 匿名插槽 -->
  <slot/>
  <!-- 具名插槽 -->
  <slot name='title'/>
  <!-- 作用域插槽  -->
  <slot name="footer" :scope="state" />
</template>

<script setup>
  import { useSlots, reactive } from 'vue'
  const state = reactive({
    name: '张三',
    age: '25岁'
  })
  
</script>
```

## 8. 路由useRoute和useRouter
```javascript
<script setup>
  import { useRoute, useRouter } from 'vue-router'
	
  // 必须先声明调用
  const route = useRoute()
  const router = useRouter()
	
  // 路由信息
  console.log(route.query)

  // 路由跳转
  router.push('/newPage')
  router.push({path:"/newPage",query:{id:"2"}})
</script>
```

## 9. 路由导航守卫
```javascript
<script setup>
  import { onBeforeRouteLeave, onBeforeRouteUpdate } from 'vue-router'
	
  // 添加一个导航守卫，在当前组件将要离开时触发。
  onBeforeRouteLeave((to, from, next) => {
    next()
  })

  // 添加一个导航守卫，在当前组件更新时触发。
  // 在当前路由改变，但是该组件被复用时调用。
  onBeforeRouteUpdate((to, from, next) => {
    next()
  })
</script>
```

## 10. 生命周期
| Option API | setup中 |
| :----: | :----: |
| beforeCreate | 不需要 |
| created | 不需要 | 
| beforeMount | onBeforeMount |
| mounted | onMounted | 
| beforeUpdate | onBeforeUpdate |
| updated | onUpdated | 
| beforeUnmount | onBeforeUnmount |
| unmounted | onUnmounted | 
| errorCaptured | onErrorCaptured |
| renderTracked | onRenderTracked | 
| renderTriggered | onRenderTriggered |
| activated | onActivated | 
| deactivated | onDeactivated | 


## 11. CSS变量注入
```javascript
<template>
  <span>xiatian</span>  
</template>

<script setup>
  import { reactive } from 'vue'

  const state = reactive({
    color: 'red'
  })
</script>
  
<style scoped>
  span {
    // 使用v-bind绑定state中的变量
    color: v-bind('state.color');
  }  
</style>

```

## 12. 对 await 的支持
> 不必再配合 async 就可以直接使用 await 了，这种情况下，组件的 setup 会自动变成 async setup 。
```javascript
    <script setup>
        const post = await fetch('/api').then(() => {})
    </script>
```

## 13. provide和inject
1. 父组件
```javascript
<template>
  <child/>
</template>

<script setup>
  import { provide } from 'vue'
  import { ref, watch } from 'vue'
  // 引入子组件
  import child from './child.vue'

  let name = ref('夏天')
  // 声明provide
  provide('provideState', {
    name,
    changeName: () => {
      name.value = '夏天111'
    }
  })

  // 监听name改变
  watch(name, () => {
    console.log(`name变成了${name}`)
    setTimeout(() => {
      console.log(name.value) // 夏天111
    }, 1000)
  })
</script>
```
2. 子组件
```javascript
<script setup>
  import { inject } from 'vue'
	// 注入
  const provideState = inject('provideState')
  
  // 子组件触发name改变
  provideState.changeName()
</script>
```

## 14. Vue3中使用echarts
```javascript
    // 安装
    cnpm i echarts --save

    // 组件内引入
    import * as echarts from 'echarts'
```