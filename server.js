const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const port = process.env.PORT || 3000;

let app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');

app.use((req, res, next) => {
  let now = new Date().toString();
  let log = `${now}: ${req.method} | ${req.originalUrl} | ${req.ip}`;
  console.log(log);
  fs.appendFile('request.log', log + '\n', (err) => {
    if (err)
      console.log(err);
    console.log('Logger updated...');
  });
  next();
});

// app.use((req, res, next) => {
//   res.render('maintenance.hbs', {
//     pageTitle: 'Maintenance',
//     message: 'We\'ll be back in a short while'
//   });
// });

app.use(express.static(__dirname + '/public'));

hbs.registerHelper('getCurrentYear', () => {
  return new Date().getFullYear();
});

hbs.registerHelper('screamIt', (text) => {
  return text.toUpperCase();
});

app.get('/', (req, res) => {
  res.render('home.hbs', {
    pageTitle: 'Home Page',
    message: 'welcome!',
  })
});

app.get('/about', (req, res) => {
  res.render('about.hbs', {
    pageTitle: 'About Page',
  });
});

app.get('/bad' , (req, res) => {
  res.send({
    errorCode: 404,
    message: 'Invalid request'
  });
});

app.get('/portfolio', (req, res) => {
  res.render('portfolio.hbs', {
    pageTitle: 'Welcome to our portfolio page!'
  });
});

app.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});
