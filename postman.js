async function insert(name, title, bod) {
    const resp = await fetch("http://localhost:8080/api/questions", {
        method: "POST",
        body: JSON.stringify({
            name: name,
            title: title,
            body: bod,
        }),
        headers: {
            'Content-Type': 'application/json',  // Content type is JSON
        },
    })
    const data = await resp.text();
    console.log(data);
}

async function getUsers() {
    const resp = await fetch("http://localhost:8080/api/users");
    const data = await resp.json();
    console.log(data);
}

async function getAllQuestions() {
    const resp = await fetch("http://localhost:8080/api/questions");
    const data = await resp.json();
    console.log(data);
}

async function deleteQuestion(id) {
    const resp = await fetch("http://localhost:8080/api/questions/" + id, {
        method: "DELETE"
    });
    const response = await resp.json();
    console.log(response);
}

async function getQuestion(id) {
    const resp = await fetch("http://localhost:8080/api/questions/" + id);
    const data = await resp.json();
    console.log(data);
}

async function insertAll() {
    for (let i = 0; i < 20; i++) 
        await insert("Anon", "Lorem", "Lorem Ipsum Dolor Si");
}

async function insertAnswer(question_id, bod) {
    const resp = await fetch("http://localhost:8080/api/answers", {
        method: "POST",
        body: JSON.stringify({
            question_id : question_id,
            body: bod,
        }),
        headers: {
            'Content-Type': 'application/json',  // Content type is JSON
        },
    })
    const data = await resp.text();
    console.log(data);
}
// getAllQuestions();
// getQuestion(104);
insertAnswer(1, "Salah ini");
// deleteQuestion(2);