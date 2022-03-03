// import { App } from "vue";
// import ebButton from "./ebButton";

// // 所有组件列表
// const components = [ebButton];
// const install = (app: App): void => {
//   components.map((component) => app.component(component.name, component));
// };

// export { ebButton };
// export default install;



import ebButton from "./ebButton";
import {App} from 'vue'

interface GlobalCom{
    components:string[]
}
console.log(ebButton)
const comps = [ebButton];//全局的组件信息
console.log(comps)
export default{
    install(app:App<Element>,options:GlobalCom){
        console.log(app);//当前的app实例
        console.log(options);//传入的自定义信息
        options.components.forEach((comp:string) => {
            const tempCom = comps.find(item => item.name === comp);//通过组件名找到对应的组件
            tempCom && app.component(tempCom.name,tempCom);//如果存在，注册当前组件
            console.log(tempCom)
        });
    }
}

