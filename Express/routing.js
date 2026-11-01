const express = require('express');
const fs = require('fs');
const app = express();
const PORT = 3000;

app.get('/', (req, res) => {
    
    res.send(`
        
        <h1>Dowiedz się więcej o każdym z nich</h1>

        <a href="/Fajar">Fajar</a> </br>
        <a href="/Sean">Sean</a> </br>
        <a href="/Kuroki">Kuroki</a> </br>
        <a href="/Jin-Feng">Jin-Feng</a> </br>
        <a href="/Yang">Yang</a> </br>

        `)

});

app.get('/:boss', (req, res) => {
    const boss = req.params.boss; 
    const data = JSON.parse(fs.readFileSync('sifu.json', 'utf8'));

    if (data[boss]) {
        res.send(`
            <h1>${boss}:</h1>
            <p>${data[boss]}</p>
        `);
    } else {
        res.status(404).json({ blad: "Nie znaleziono takiej strony!" });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});