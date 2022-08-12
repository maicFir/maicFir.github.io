
import Ribbon from './Ribbon.vue'
import { defineClientConfig } from '@vuepress/client';
import { createApp } from 'vue';
const app = createApp({});
app.component('Ribbon', Ribbon);
export default defineClientConfig({
    setup() {
        // const app = createApp({});
        // app.component('Ribbon', Ribbon);
        console.log(1111);
        return {

        }
    }
})
