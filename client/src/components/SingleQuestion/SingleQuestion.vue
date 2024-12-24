<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';
import useQuestions from '../../hooks/useQuestions';
import Navbar from '../Navbar/Navbar.vue';
import { useRoute, useRouter } from 'vue-router';
import { QuestionTypes } from '../../types/QuestionTypes';

const { fetchQuestion, errors, isError, questions } = useQuestions();
const route = useRoute();
const router = useRouter();

const id = Number(route.params.id);
const question  = computed(() =>{
    if (questions.value) return questions.value[0];
    else return null;
});
onMounted(() => {
    fetchQuestion(id);
    console.log(questions.value);
}); 

const goBack = () => {
    router.push("/"); 
}
</script>

<template>
    <Navbar></Navbar>
    <div v-if="question" class="d-flex flex-column align-items-center" style="background: linear-gradient(white, rgb(33, 37, 41)); min-height: 100vh;">
        <button @click="goBack" class="btn btn-dark text-light">Go Back</button>
        <h1>{{ question.title }}</h1>
        <h4 class="text-secondary">{{ question.name }}</h4>
        <p style="width: 50%; overflow-wrap: break-word;">{{ question.body }}</p>
        <div>
            <h6>Jawab: </h6>
            <textarea style="width: 50vw ;height: 200px"></textarea>
            <div class="text-left">
                <button class="btn btn-secondary" type="button">Submit</button>
            </div>
        </div>
        <h4 style="border-radius: 5px;" class="p-2 bg-dark text-light">Jawaban</h4>

    </div>
</template>