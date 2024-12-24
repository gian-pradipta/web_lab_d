<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import Navbar from '../Navbar/Navbar.vue';
import useQuestions from '@/hooks/useQuestions';
import NotificationModal from '../UI/modals/NotificationModal.vue';

const name = ref("");
const title = ref("");
const body = ref("");
const router = useRouter();

const modalTitle = ref("");
const message = ref("");
const popUp = ref(false);
const togglePopUp = () => {
    popUp.value = !popUp.value;
}

const { postQuestion, isError, isLoading, errors} = useQuestions();
const submitQuestion = async (e) => {
    const bod = {
        name: name.value.value,
        title: title.value.value,
        body: body.value.value,
    }
    await postQuestion(bod);
    if (isError.value) {
        let errMessage = '';
        for (const error of errors.value)
            errMessage += `- ${error}`
        message.value = errMessage;
        modalTitle.value = "Error";
        popUp.value = true;
    } else {
        message.value = "Berhasil insert data!";
        popUp.value = true;
        modalTitle.value = "Sukses";
        cancelQuestion();
    }
};

const cancelQuestion= () => {
    name.value.value = "";
    body.value.value = "";
    title.value.value = "";
};

const toQuestionList = () => {
    router.push("/question-list");
}
</script>

<template>
    <Navbar></Navbar>
    <NotificationModal @button-clicked="togglePopUp" v-bind="{ title: modalTitle, content: message, open: popUp, success: !isError }"></NotificationModal>
    <div class="text-center">
        <button  @click="toQuestionList" class="btn btn-dark text-light ms-2" type="button">
            Question List
        </button>
    </div>
    <div class="mt-3" style="min-height:90vh; background: linear-gradient(white, rgb(33, 37, 41));">
            <h3 class="text-center">Ask A New Question!</h3>
        <div class="d-flex">
            <div class="container">
                <div class="row"><div class="col"><div class="p-3"></div></div></div>
                <div class="row">
                    <div class="col-3"></div>
                    <div class="col-3">
                        <h4>Name</h4>
                    </div>
                    <div class="col-3">
                        <input ref="name" type="text" class="col-12" placeholder="Name" required>
                    </div>
                    <div class="col-1"></div>
                </div>
                <div class="row">
                    <div class="col-3"></div>
                    <div class="col-3">
                        <h4>Title</h4>
                    </div>
                    <div class="col-3">
                        <input ref="title" type="text" class="col-12" placeholder="Title" required>
                    </div>
                    <div class="col-1"></div>
                </div>
                <div class="row">
                    <div class="col-3"></div>
                    <div class="col-3">
                        <h4>Description</h4>
                    </div>
                    <div class="col-3">
                        <textarea required ref="body" type="text" class="col-12" style="height: 100px;"></textarea>
                    </div>
                    <div class="col-1"></div>
                </div>
                <div class="row mt-5">
                    <div class="col"></div>
                    <div class="col-2">
                        <button @click="submitQuestion" type="button" class="me-3 text-light btn btn-dark">Submit</button>
                        <button @click="cancelQuestion" type="button" class="btn btn-secondary">Cancel</button>
                    </div>
                    <div class="col"></div>
                </div>
            </div>
        </div>
    </div>
</template>
