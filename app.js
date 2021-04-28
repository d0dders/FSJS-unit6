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
    if(data.projects[req.params.id]){
        res.render('project', {project: data.projects[req.params.id]});
    } else {
        const err = new Error("Whatever you're looking for, it isn't here!");
        err.status = 404;
        throw err;
    }
});

/**
 * For testing error handling
 */
 app.use('/500', (req, res, next) => {
    const err = new Error();
    next(err);
})

/**
 * Handle requests to unexpected routes
 */
app.use((req, res, next) => {
    const err = new Error("Whatever you're looking for, it isn't here!");
    err.status = 404;
    next(err);
});

app.use((err, req, res, next) => {
    err.status = err.status || 500;
    err.message = err.message || "Something unexpected happened. Please try again";
    res.status(err.status);
    console.error(`${err.status}: ${err.message}`);
    if(err.status === 404){
        res.render('page-not-found', {err});
    } else {
        res.render('error', {err});
    }
});

app.listen(port, () => {
    console.log(`App listening port ${port}`)
});