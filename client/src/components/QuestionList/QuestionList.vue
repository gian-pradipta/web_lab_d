<script setup>
import { onMounted, ref, watch } from 'vue';
import Navbar from '../Navbar/Navbar.vue';
import NotificationModal from '../UI/modals/NotificationModal.vue';
import useQuestions from '../../hooks/useQuestions';
import QuestionListHelper from "./QuestionListHelper.js"
import AskQuestion from '../AskQuestions/AskQuestion.vue';


const {questions, isLoading, fetchQuestions, deleteQuestion, isError, errors} = useQuestions();
const title = ref("");
const message = ref("");
const popUp = ref(false);
const togglePopUp = () => {
    popUp.value = !popUp.value;
};

const refreshSource = new EventSource("http://localhost:8080/api/questions/logs");
refreshSource.addEventListener("insert", async (e) => {
    const body = JSON.parse(e.data);
    const newQuestion = body.inserted_data;
    questions.value.unshift(newQuestion);
    QuestionListHelper.insertBox();
})

refreshSource.addEventListener("delete", (e) => {
    const body = JSON.parse(e.data);
    const id = body.last_id;
    const i = questions.value.map((box) => box.id).indexOf(Number(id));
        console.log(questions.value.map((box) => box.id));
        console.log(id);
        QuestionListHelper.removeBox(i);
        setTimeout(() => {
            questions.value.splice(i, 1);
            console.log(questions.value);
    }, 300);
})



onMounted(async () => {
    await fetchQuestions(); 
});

const numberOfQuestions = ref(12);
const addNumberOfQuestions = () => {
    numberOfQuestions.value += 8;
};

const isAskQuestion = ref(false);
const questionBox = ref(null);
const toggleAskQuestion = () => {
    isAskQuestion.value = !isAskQuestion.value;
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
    }
};
</script>
<template>
    <Navbar></Navbar>
    <div v-if="isAskQuestion" ref="questionBox" style="width: 50% ; position: fixed; top: 0; transform: translate(50%, 20%); border: 1px solid black; padding: 0; border-radius: 5px; z-index: 10;">
        <AskQuestion @cancel-clicked="() => {isAskQuestion = false}"></AskQuestion> 
    </div>
    <NotificationModal @button-clicked="togglePopUp" :success="!isError" :title="title" :content="message" :open="popUp"></NotificationModal>
    <div class="text-center">
        <button  @click="toggleAskQuestion" class="btn btn-dark text-light ms-2" type="button">
            Ask a Question
        </button>
    </div>
    <div class="mt-3" style="min-height:90vh; background: linear-gradient(white, rgb(33, 37, 41))">
        <div>
            <div class="d-flex flex-wrap gap-3 justify-content-center" style="transition: all 0.3s ease-in-out;">
                <div v-for="question in questions.slice(0, numberOfQuestions)" data-bs-theme="dark" style="width: 300px; height: 200px; border-radius: 10px; transition: margin 0.3s ease-in-out, transform 0.3s ease-in-out;" class="box text-light bg-dark text-center" :id="question.id">
                    <div>
                        <div @click="(e) => {deleteQuestionCard(e.target.id)}" :key="question.id" :id="question.id" style="width: 10%; border-top-left-radius: 10px; cursor: pointer;" class="bg-secondary text-light p-1">x</div>
                    </div>
                    <div style="white-space: normal; overflow: auto; word-wrap: break-word;">
                        <h5><a :href="`/${question.id}`">{{ question.title.length < 35 ? question.title : `${question.title.substring(0, 32)}...` }}</a></h5>
                        <h6 class="mb-2 text-muted">{{ question.name.length < 45 ? question.name : `${question.name.substring(0, 42)}...` }}</h6>
                        <p>{{ question.body.length < 130 ? question.body : `${question.body.substring(0, 127)}...` }}</p>
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