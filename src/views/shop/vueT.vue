<template>
    <div>
        哎，当前用户：{{name}}
        {{state}}
        {{loginName}}
    </div>
    <div class="red">{{doubleAge}}</div>
    <a-button type="primary" @click='changeName' danger>我是让他变傻的按钮</a-button>
</template>
<script lang="ts" setup>
    import { reactive, ref, toRefs, computed, watch } from "vue";
    import { useRoute, useRouter } from 'vue-router'
    // 必须先声明调用
    const route = useRoute()
    const router = useRouter()
    const color = reactive({
        color: 'red'
    })   
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
        router.push('/')
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

  // 7.props父子组件 父组件传入list
  import { PropType } from "vue";
  interface IProduct {
    id: number;
    title: string;
    price: number;
    inventory: number;
  }
  // 接收父组件传过来的值
  const props = defineProps({
    list: {
        type: Array as PropType<IProduct[]>,
        default: () => [],
    },
  });


  // 8.emit子传父
  // 子组件声明事件
  const emit = defineEmits(['updateName'])
  // 子组件触发函数
  const changeUpdateName = () => {
      // 执行
      emit('updateName', 'Tom')
  }
  // 父组件接收子组件触发的方法 子组件 @updateName='updateName'
  const updateName = (name:string) => {
      state.name = name
  }

</script>

<style scoped>
  .red {
    color: v-bind('color.color');
  } 
</style>