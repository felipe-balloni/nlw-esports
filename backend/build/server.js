import express from 'express';
const app = express();
app.get('/ads', (request, response) => {
    response.json([
        { id: 1, name: 'John Doe' },
        { id: 2, name: 'Jane Doe' },
        { id: 3, name: 'John Smith' },
        { id: 4, name: 'Jane Smith' },
    ]);
});
app.listen(3000, () => {
    console.log('Listening on port 3000');
});
