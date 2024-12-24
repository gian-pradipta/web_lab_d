<script setup>
import { onMounted, ref } from 'vue';
import Navbar from '../Navbar/Navbar.vue';
import { useRouter } from 'vue-router';
import NotificationModal from '../UI/modals/NotificationModal.vue';
import useQuestions from '../../hooks/useQuestions';
import QuestionListHelper from "./QuestionListHelper.js"


const {questions, isLoading, fetchQuestions, deleteQuestion, isError, errors} = useQuestions();
const title = ref("");
const message = ref("");
const popUp = ref(false);
const togglePopUp = () => {
    popUp.value = !popUp.value;
};

const refreshSource = new EventSource("http://localhost:8080/api/questions/refresh");
refreshSource.addEventListener("insert", (e) => {
    const body = JSON.parse(e.data);
    fetchQuestions();
})

refreshSource.addEventListener("delete", (e) => {
    // fetchQuestions();
})

onMounted(async () => {
    await fetchQuestions(); 
});

const numberOfQuestions = ref(12);
const addNumberOfQuestions = () => {
    numberOfQuestions.value += 8;
};

const router = useRouter();
const toAskQuestion = () => {
    router.push("/ask-question");
};

const deleteQuestionCard = async (id) => {
    await deleteQuestion(id);
    if (isError.value) {
        let errMessage = '';
        for (const error of errors.value)
            errMessage += `- ${error}`
        message.value = errMessage;
        popUp.value = true;
        title.value = "Error";
    } else {
        const i = questions.map((box) => box.id).indexOf(id);
        QuestionListHelper.removeBox(i);
    }
};
</script>
<template>
    <Navbar></Navbar>
    <NotificationModal @button-clicked="togglePopUp" :success="!isError" :title="title" :content="message" :open="popUp"></NotificationModal>
    <div class="text-center">
        <button  @click="toAskQuestion" class="btn btn-dark text-light ms-2" type="button">
            Ask a Question
        </button>
    </div>
    <div class="mt-3" style="min-height:90vh; background: linear-gradient(white, rgb(33, 37, 41))">
        <div>
            <div class="d-flex flex-wrap gap-3 justify-content-center" style="transition: all 3s ease-in-out;">
                <div v-for="question in questions.slice(0, numberOfQuestions)" data-bs-theme="dark" style="width: 300px; height: 150px; border-radius: 10px; transition: margin 3s ease-in-out, transform 3s ease-in-out;" class="box text-light bg-dark text-center" :id="question.id">
                    <div>
                        <div @click="(e) => {deleteQuestionCard(e.target.id)}" :key="question.id" :id="question.id" style="width: 10%; border-top-left-radius: 10px; cursor: pointer;" class="bg-secondary text-light p-1">x</div>
                    </div>
                    <div>
                        <h5><a href="/ask-question">{{ question.title }}</a></h5>
                        <h6 class="mb-2 text-muted">{{ question.name }}</h6>
                        <p>{{ question.body.length < 40 ? question.body : `${question.body.substring(0, 35)}...` }}</p>
                    </div>
                </div>
            </div> 
        </div>
        <div v-if="numberOfQuestions < questions.length" class="text-center mt-5" @click="addNumberOfQuestions">
            <button class="btn btn-primary" type="button">Load another</button>
        </div>
        <div v-if="isLoading" class="text-center">
            <div class="text-danger">Loading...</div>
        </div>
    </div>
</template>