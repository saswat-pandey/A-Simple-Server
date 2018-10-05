const express=require('express');
const hbs=require('hbs');
const fs=require('fs');

var app=express();
const port=process.env.PORT || 3000;
hbs.registerPartials(__dirname+'/views/partials');//takes the directory we want to keep/load the partials in

hbs.registerHelper("currYear",()=>new Date().getFullYear());//name of the helper as first arg,,,func to run as second


hbs.registerHelper("screamIt",(text)=>text.toUpperCase());

app.set('view engine','hbs');
app.use((req,res,next)=>{
  const now= new Date();
  const log=`${now}::${req.method}:::::${req.url}`;
  console.log(log);
  fs.appendFile("systemLog.log",log +'\n',(error)=>{
    if(error){
      console.log("An Error Occured:");
    }
  });
  next();
});//next: tell express when the middleware function is done

app.use((req,res,next)=>{
  res.render("maintainance.hbs",{
    pageTitle:"Maintainance Page",
    mntcMsg:"The site is currently under maintaince, please come back later"
  });
});


app.use(express.static(__dirname+'/public')); //__dirname...stores the path to the project directory
// Takes the middleware function to be used
app.get('/',(request,response)=>{
//  response.send('<h1>Hello Express</h1>');//responding to the request
// response.send({
//   name:'Saswat',
//   hobbies:[
//     'playing',
//     'writing',
//     'many more'
//   ]
// });

response.render("home.hbs",{
  pageTitle:'Home Page',
  welMsg:"Welcome to the home Page"
});
})//setting up  route handlers for http get request; the forst argument will be the url and the second argument will be the funtion to run

app.get('/bad',(req,res)=>{
  res.send({
    errorMsg:"Something Went Wrong,Please take a look"
  });
});


app.get('/about',(req,res)=>{
  //res.send("About Page");
  res.render('about.hbs',{
    pageTitle:"About Page"
  });//render allows us to render template set up with the view engine:2nd argument is th parameter
});

app.listen(port,()=>{
  console.log(`Sever is up on port ${port}`);
});//binds the application on a port ,essential for theprogtam to run..takes second argument...a msg when the server is up ad running
