const express = require('express');
const fs = require('fs');

const config = require('../config');

const app = express();

function getDB() {
    if (!fs.existsSync('./db.json')) {
        fs.writeFileSync('./db.json', '{}');
    }
    const data = fs.readFileSync('./db.json', 'utf8');
    return JSON.parse(data);
}

function saveDB(data) {
    if (!fs.existsSync('./db.json')) {
        fs.writeFileSync('./db.json', '{}');
    }
    fs.writeFileSync('./db.json', JSON.stringify(data));
}

app.get('/', (req, res) => res.send('Url shortener'));

app.get('/short', (req, res) => {
    const db = getDB();
    const url = req.query.url;

    let i = 1;
    for (; db[i]; i++);
    db[i] = url;
    saveDB(db);

    res.status(201).json({
        message: `Url successfully shortened`,
        newurl: `${config.redirectUrl}${i}`
    });
});

app.get('/:id', (req, res) => {
    const db = getDB();
    const id = req.params.id;

    if (db[id]) {
        res.redirect(db[id]);
    } else {
        res.status(404).json({
            message: `Url not found`
        });
    }
});

app.listen(config.port, () => console.log(`App listening on port ${config.port}`));
