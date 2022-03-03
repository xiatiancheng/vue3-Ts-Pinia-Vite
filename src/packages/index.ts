import { App } from "vue";
import ebButton from "./ebButton";

// 所有组件列表
const components = [ebButton];
const install = (app: App): void => {
  components.map((component) => app.component(component.name, component));
};

export { ebButton };
export default install;