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

insert("Gian Lagi", "Pacar", "Bagaimana cara mendapatkan pacar yang baru lagi?");