import { App } from 'vue'
import ebButton from './src/main.vue'

ebButton.install = (app: App): void => {
    app.component(ebButton.name, ebButton)
}
export default ebButton
