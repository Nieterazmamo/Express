const express = require('express');
const fs = require('fs');
const PORT = 3000;
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get('/', (req, res) => {

    const data = JSON.parse(fs.readFileSync('users.json', 'utf8'));
    res.send(`
        <h1>Lista użytkowników</h1>
        <p>${JSON.stringify(data)}</p>

        </br>
        <a href="/add">Dodaj użytkownika</a>
        
        `);


});

app.get('/add', (req, res) => {
    
    res.send(`
        
        <h1>Rejestracja</h1>

        <form method="POST" action="/add">

            <label for="nazwa">Nazwa:</label>
            <input type="text" id="nazwa" name="nazwa" required> </br></br>

            <label for="Password">Hasło:</label>
            <input type="password" id="Password" name="Password" required> </br></br>

            <label for="Wiek">Wiek:</label>
            <input type="number" id="Wiek" name="Wiek" required> </br></br>

            <button type="submit">Zarejestruj</button>
        </form>
        `)
    });

app.post('/add', (req, res) => {

    const { nazwa, Password, Wiek } = req.body;

    if (Number(Wiek) < 18 || Password.length < 8) {
        return res.status(400).send(`
            <h1>Błąd rejestracji!</h1>
            <p>Musisz mieć ukończone 18 lat, a hasło musi mieć co najmniej 8 znaków.</p>
            <a href="/add">Wróć do formularza</a>
        `);
    } else {

    
        const data = JSON.parse(fs.readFileSync('users.json', 'utf8'));
        data.push({id: data.length+1, ...req.body});
        fs.writeFileSync('users.json', JSON.stringify(data, null, 2));
        res.send(`
            
            <h1>Dodano użytkownika!</h1>

            <a href="/">Wyświetl listę użytkowników</a> | <a href="/add">Wróć do formularza</a>
            
            `);
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

