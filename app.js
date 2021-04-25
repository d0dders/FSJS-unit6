const express = require('express');
const port = 3000;
const data = require('./data.json');

const app = express();
app.set('view engine', 'pug');
app.use('/static', express.static('public'));

app.get('/', (req, res) => {
    res.render('index', { projects: data.projects });
});

app.get('/about', (req, res) => {
    res.render('about');
});

app.get('/project/:id', (req, res) => {
    res.render('project', {project: data.projects[req.params.id]});
});

app.listen(port, () => {
    console.log(`App listening port ${port}`)
});