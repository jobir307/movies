import { createApp } from 'vue'
import App from '@/App.vue'
import './index.css'
import UiComponents from '@/components/UI'

const app = createApp(App)


// Komponentlarni globallashtirish
UiComponents.map(component => {
    app.component(component.name, component)
})
app.mount('#app')
