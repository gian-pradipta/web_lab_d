import { createApp } from 'vue'
import App from './App.vue'
import { createRouter, createWebHistory } from 'vue-router'
import QuestionList from './components/QuestionList/QuestionList.vue'
import AskQuestion from './components/AskQuestions/AskQuestion.vue'

const routes = [ 
    { path: "/", redirect: "/ask-question" },
    { path: "/ask-question", component: AskQuestion },
    { path: "/question-list", component: QuestionList }
]

const router = createRouter({
    history: createWebHistory(),
    routes
});
createApp(App)
    .use(router)
    .mount('#app')
