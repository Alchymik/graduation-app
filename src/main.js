import { createApp } from 'vue'
import App from './App'
import UIcomponents from "@/components/UI"
import router from '@/router/index.js'
import directives from '@/directives'
import store from '@/store/store.js'

const app = createApp(App);

UIcomponents.forEach((component) => {
    app.component(component.name, component)
});


directives.forEach((directive) => {
app.directive(directive.name, directive)
});

app
    .use(router)
    .use(store)
    .mount('#app')