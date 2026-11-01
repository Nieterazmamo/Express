const express = require('express');
const fs = require('fs');
const app = express();
const PORT = 3000;

app.get('/', (req, res) => {
    
    res.send(`
        
        <h1>Witamy</h1>

        <a href="/artykul/About">About</a> </br>
        <a href="/artykul/Contact">Contact</a> </br>
        <a href="/artykul/Home">Home</a> </br>

        `)

});

app.get('/artykul/:tytul', (req, res) => {
    const tytul = req.params.tytul; 
    const data = JSON.parse(fs.readFileSync('cms.json', 'utf8'));

    if (data[tytul]) {
        res.send(`
            <h1>${tytul}:</h1>
            <p>${data[tytul]}</p>
        `);
    } else {
        res.status(404).json({ blad: "Nie znaleziono takiej strony!" });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});