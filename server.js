const express=require('express');
const hbs=require('hbs');
const fs=require('fs');

var app=express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');
// app.use(express.static(__dirname + '/public'));

app.use((req,res,next)=>{
  var now=new Date().toString();
  var log=`${now}: ${req.method} ${req.url}`;
//  console.log(`${now}: ${req.method} ${req.url}`);
  console.log(log);
  fs.appendFile('server.log',log + '\n', (err)=>{
    if(err){
      console.log('Unable to append to server.log.')
    }
  });
  next();
});

// app.use((req,res, next)=>{
//   res.render('maintenance.hbs', {
//     pageTitle: 'We will be right back',
//     message: 'The page is under maintenance'
//   });
// //  next();
// });

app.use(express.static(__dirname + '/public'));

hbs.registerHelper('getCurrentYear',()=>{
  return new Date().getFullYear()
//  return 'test';
});

hbs.registerHelper('screamIt',(text)=>{
  return text.toUpperCase()
});
// app.get('/', (req, res)=>{
// //  res.send('<h1>Hello express!</h1>');
// res.send({
//   name: 'Krishna',
//   likes: [
//     'cooking',
//     'reading'
//   ]
// });
// });

app.get('/', (req, res)=>{
//  res.send('<h1>Hello express!</h1>');
res.render('home.hbs', {
  pageTitle: 'Home Page',
  welcomeNote: 'Welcome to my website'
//  currentYear: new Date().getFullYear()
});
});

app.get('/about', (req,res)=>{
  //res.send('About Page');
  res.render('about.hbs', {
    pageTitle: 'About Page'
//    currentYear: new Date().getFullYear()
  });
});

app.get('/bad', (req,res)=>{
  res.send({
    errorMessage: 'This is a bad request'
  })
});

app.listen(3000,()=>{
  console.log('Server is up on port 3000');
});
