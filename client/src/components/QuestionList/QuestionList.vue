<script setup>
import useQuestions from '@/hooks/useQuestions';
import { onMounted, ref } from 'vue';
import Navbar from '../Navbar/Navbar.vue';
import { useRouter } from 'vue-router';
import NotificationModal from '../UI/modals/NotificationModal.vue';

const {questions, isLoading, fetchQuestions, deleteQuestion, isError, errors} = useQuestions();

const title = ref("");
const message = ref("");
const popUp = ref(false);
const togglePopUp = () => {
    popUp.value = !popUp.value;
};

const refreshSource = new EventSource("http://localhost:8080/api/questions/refresh");
refreshSource.addEventListener("insert", (e) => {
    console.log("Hello");
    fetchQuestions();
})

refreshSource.addEventListener("delete", (e) => {
    console.log("Hello");
    fetchQuestions();
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
        message.value = "Berhasil hapus data!";
        popUp.value = true;
        title.value = "Sukses";
        fetchQuestions();
    }
};
</script>
<template>
    <Navbar></Navbar>
    <NotificationModal @button-clicked="togglePopUp" :title="title" :content="message" :open="popUp"></NotificationModal>
    <div class="text-center">
        <button  @click="toAskQuestion" class="btn btn-primary ms-2" type="button">
            Ask a Question
        </button>
    </div>
    <div class="mt-3" style="min-height:90vh; background: linear-gradient(white, rgb(33, 37, 41))">
        <div class="container">
            <div class="row g-3">
                <div v-for="question in questions.slice(0, numberOfQuestions)" class="col-3">
                    <div class="card h-100" style="width: 18rem;">
                        <div class="text-end">
                            <button @click="(e) => {deleteQuestionCard(e.target.id)}" :key="question.id" :id="question.id" type="button" class="btn btn-danger w-25 text">(x)</button>
                        </div>
                        <div class="card-body">
                            <h5 class="card-title">{{ question.title }}</h5>
                            <h6 class="card-subtitle mb-2 text-muted">{{ question.name }}</h6>
                            <p class="card-text">{{ question.body }}</p>
                        </div>
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