import { ref } from 'vue';
import { QuestionTypes } from '../types/QuestionTypes';

export default function useQuestions() {
    const isLoading = ref<boolean>(false);
    const questions = ref<QuestionTypes.QuestionBody[]>([]);
    const isError = ref<boolean>(false);
    const errors = ref<string[]>([]);
    const fetchQuestions = async () => {
        isLoading.value = true;
        try {
            const resp = await fetch("http://localhost:8080/api/questions");
            const data = await resp.json();
            questions.value = data.data;
        } catch (error) {
            console.log(error);
            questions.value = [];
        }
        isLoading.value = false;
    };

    const postQuestion = async (bod : QuestionTypes.PostBody) => {
        isLoading.value = true;
        try {
            const resp = await fetch("http://localhost:8080/api/questions", {
                method: "POST",
                body: JSON.stringify(bod),
                headers: {
                    'Content-Type': 'application/json',
                },
            })
            const response : QuestionTypes.APIResponse = await resp.json();
            isError.value = !response.success;
            if (!response.success) {
                errors.value = response.errors;
            }
        } catch (error) {
            isError.value = true;
            errors.value = ['Gagal insert data'];
        } finally {
            isLoading.value = false;
        }
    }

    const deleteQuestion = async (id : number) => {
        isLoading.value = true;
        try {
            const resp = await fetch(`http://localhost:8080/api/questions/${id}`, {
                method: "DELETE",
            })
            const response : QuestionTypes.APIResponse = await resp.json();
            isError.value = !response.success;
            if (!response.success) {
                errors.value = response.errors;
            }

        } catch (error) {
            isError.value = true;
            errors.value = ['Gagal delete data'];
        } finally {
            isLoading.value = false;
        }
    }

    return {
        questions,
        isLoading,
        fetchQuestions,
        postQuestion,
        deleteQuestion,
        isError,
        errors
    };
    
}
