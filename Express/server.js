const express = require('express');
const fs = require('fs');
const app = express();
const PORT = 3000;

app.get('/produkty', (req, res) => {
    const data = JSON.parse(fs.readFileSync('produkty.json', 'utf8'));
    res.json(data);

});

app.get('/produkty/:kategoria', (req, res) => {
    const kategoria = req.params.kategoria; 
    const data = JSON.parse(fs.readFileSync('produkty.json', 'utf8'));

    if (data[kategoria]) {
        res.json({
            [kategoria]: data[kategoria]
        });
    } else {
        res.status(404).json({ blad: "Nie znaleziono takiej kategorii produktów!" });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}/produkty`);
});