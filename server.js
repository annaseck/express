const express = require('express');
const app = express();
const port = 4000;

app.set('view engine', 'ejs')

// Middleware pour vérifier les heures ouvrables
const checkWorkingHours = (req, res, next) => {
    const now = new Date();
    const day = now.getDay();
    const hour = now.getHours();

    if (day >= 1 && day <= 5 && hour >= 9 && hour < 17) {
        next();
    } else {
        res.send('L\'application web est disponible uniquement pendant les heures ouvrables (du lundi au vendredi, de 9h à 17h).');
    }
};

app.use(express.static(__dirname + '/public'));

app.use(checkWorkingHours);
app.get('/index', (req, res) => {
    res.status(200).render('index');
});
app.get('/service', (req, res) => {
    const services = ['service 1', 'service 2', 'service 3', 'service 4']
    res.status(200).render('service', {services});
});
app.get('/contact', (req, res) => {
    res.status(200).render('contact');
});
app.get('/', (req, res) => {
    res.redirect('index');
});

app.listen(port, () => {
  console.log('The server is running, ' +
      ' please, open your browser at http://localhost:%s', 
      port);
});
