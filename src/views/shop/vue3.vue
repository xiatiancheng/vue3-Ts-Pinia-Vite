


<template>
    <div>
        {{name}}
    </div>
</template>

<script setup lang="ts">
    import { reactive, ref, toRefs } from 'vue'
    // ref声明响应式数据，用于声明基本数据类型
    const name = ref('夏天')
    interface Student {
        name: string
        class?: string
        age: number
    }
    const student = reactive<Student>({ name: '夏天1', age: 16 })
    // or
    const student1: Student = reactive({ name: '夏天2', age: 16 })
    // or
    const student2 = reactive({ name: '夏天3', age: 16, class: 'cs' }) as Student
</script>

<style scoped>

</style>