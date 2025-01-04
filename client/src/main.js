import { createApp } from 'vue'
import App from './App.vue'
import { createRouter, createWebHistory } from 'vue-router'
import QuestionList from './components/QuestionList/QuestionList.vue'
import SingleQuestion from './components/SingleQuestion/SingleQuestion.vue'

const routes = [ 
    { path: "/", component: QuestionList },
    { path: "/:id", component: SingleQuestion }
]

const router = createRouter({
    history: createWebHistory(),
    routes
});
createApp(App)
    .use(router)
    .mount('#app')
