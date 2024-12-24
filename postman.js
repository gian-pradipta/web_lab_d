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

async function insertAll() {
    for (let i = 0; i < 20; i++) 
        await insert("Anon", "Lorem", "Lorem Ipsum Dolor Si");
}
// getAllQuestions();
insertAll();
// deleteQuestion(2);