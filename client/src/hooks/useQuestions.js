import { ref, onMounted } from 'vue';

export default function useQuestions() {
    
    const isLoading = ref(false);
    const questions = ref([]);
    const isError = ref(false);
    const errors = ref([]);
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

    const postQuestion = async (bod) => {
        isLoading.value = true;
        try {
            const resp = await fetch("http://localhost:8080/api/questions", {
                method: "POST",
                body: JSON.stringify(bod),
                headers: {
                    'Content-Type': 'application/json',
                },
            })
            const response = await resp.json();
            if (response.status != 200) {
                isError.value = true;
                errors.value = response.errors;
            }
        } catch (error) {
            isError.value = true;
            errors.value = ['Gagal insert data'];
        } finally {
            isLoading.value = false;
        }
    }

    const deleteQuestion = async (id) => {
        isLoading.value = true;
        try {
            const resp = await fetch("http://localhost:8080/api/questions/" + id, {
                method: "DELETE",
            })
            const response = await resp.json();
            if (response.status != 200) {
                isError.value = true;
                errors.value = response.errors;
            } else {
                isError.value = false;
                errors.value = [];
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
