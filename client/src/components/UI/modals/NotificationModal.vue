<script setup>
import { onMounted, ref, watch, watchEffect } from 'vue';

const props = defineProps(['title', 'content', 'open']);
const content = ref(props.content);
const title = ref(props.title);
const open = ref(props.open);

const modal = ref("");
const closeModal = () => {
    modal.value.style.display = 'none';
}

const openModal = () => {
    modal.value.style.display = 'block';
}
watch(() => props.content, (first, second) => {
    content.value = first;
});
watch(() => props.title, (first, second) => {
    title.value = first;
});

onMounted(() => {
    if (open.value) openModal();
    else closeModal();
});

watch(()=> props.open, (first, second) => {
    open.value = first;
    if (open.value) openModal();
    else closeModal();
})

</script>
<template>
    <div ref="modal" class="notification-modal">
        <div class="title text-center pt-3 pb-2">
            <h6>{{ title }}</h6>
        </div>
        <div class="content">
            {{ content }}
        </div>
        <div class="option">
            <button type="button" @click="$emit('buttonClicked')" class="btn btn-primary">OK</button>
        </div>
    </div>
</template>

<style scoped>
    .title {
        border-bottom: 1px solid rgb(184, 177, 177);
    }
    .notification-modal {
        top: 0;
        transform: translate(35vw, 5vh);
        width: 30vw;
        background-color: white;
        position: fixed;
        border: 1px solid rgb(184, 177, 177);
        border-radius: 6px;
        z-index: 1000;
    }
    .content {
        padding: 5px;
        padding-top: 10px; 
        padding-bottom: 10px;
        /* border-bottom: 1px solid rgb(184, 177, 177); */
    }
    .option {
        text-align: right;
        padding: 8px 0;
        padding-right: 20px;
    }


</style>