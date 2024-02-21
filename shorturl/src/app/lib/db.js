import fs from 'fs';

export function getDB() {
    if (!fs.existsSync('./data/db.json')) {
        fs.writeFileSync('./data/db.json', '{}');
    }
    const data = fs.readFileSync('./data/db.json', 'utf8');
    return JSON.parse(data);
}

export function saveDB(data) {
    if (!fs.existsSync('./data/db.json')) {
        fs.writeFileSync('./data/db.json', '{}');
    }
    fs.writeFileSync('./data/db.json', JSON.stringify(data));
}
