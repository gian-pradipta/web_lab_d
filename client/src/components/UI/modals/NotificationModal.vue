<script setup>
import { computed, onMounted, ref, watch } from 'vue';

const props = defineProps(['title', 'content', 'open', 'success']);

const modal = ref("");
const closeModal = () => {
    modal.value.style.display = 'none';
}

const openModal = () => {
    modal.value.style.display = 'block';
}
onMounted(() => {
    if (props.open) openModal();
    else closeModal();
});

watch(()=> props.open, () => {
    if (props.open) openModal();
    else closeModal();
})

const classModal = computed(() => {
    if (props.success) return "title text-center text-light pt-3 pb-2 bg-success";
    else return "title text-center text-light pt-3 pb-2 bg-danger";
});

</script>
<template>
    <div ref="modal" class="notification-modal">
        <div :class="classModal">
            <h6>{{ props.title }}</h6>
        </div>
        <div class="content">
            {{ props.content }}
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
