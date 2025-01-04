<script setup>
import { ref } from 'vue';
import useQuestions from '@/hooks/useQuestions';

const name = ref("");
const title = ref("");
const body = ref("");

const { postQuestion, isError, errors} = useQuestions();

const clearInputs = () => {
    name.value.value = "";
    title.value.value = "";
    body.value.value = "";
}
const submitQuestion = async (e) => {
    const bod = {
        name: name.value.value,
        title: title.value.value,
        body: body.value.value,
    }
    await postQuestion(bod);
    clearInputs();
};

</script>

<template>
    <div class="pt-3" style="height: inherit; background: linear-gradient(white, rgb(33, 37, 41));">
            <h3 class="text-center">Ask A New Question!</h3>
        <div class="d-flex">
            <div class="container">
                <div v-if="isError">
                    <span style="color: red">{{ errors[0] }}</span>
                </div>
                <div>
                    <h4>Name</h4>
                    <input ref="name" type="text" class="col-12" placeholder="Name" required>
                </div>
                <div>
                    <h4>Title</h4>
                    <input ref="title" type="text" class="col-12" placeholder="Title" required>
                </div>
                <div>
                    <h4>Description</h4>
                    <textarea required ref="body" type="text" class="col-12" style="height: 200px;"></textarea>
                </div>
                <div class="d-flex justify-content-center">
                    <button @click="submitQuestion" type="button" class="me-3 text-light btn btn-dark">Submit</button>
                    <button @click="$emit('cancelClicked')" type="button" class="btn btn-secondary">Cancel</button>
                </div>
            </div>
        </div>
    </div>
</template>
