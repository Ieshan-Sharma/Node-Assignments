const express= require('express');
const  passport  = require('passport');
const session = require('express-session')
const PORT = 5000
require('./auth')

function isLoggedIn(req,res,next){
    req.user ? next(): res.sendStatus(401);
} 

const app = express();
app.use(express.urlencoded({extended:true}));
app.use(session({secret:'cats'}));
app.use(passport.initialize());
app.use(passport.session())

app.get("/",(req,res)=>{
    res.send('<a href="/auth/google">Authenticate With Google</a>')
})

app.get("/auth/google",
    passport.authenticate('google',{scope:['email','profile']})
)

app.get("/google/callback",
passport.authenticate('google',{
    successRedirect:"/protected",
    failureRedirect: "/auth/failure",
})
);

app.get("/auth/failure",(req,res)=>{
res.send("something went wrong..")
})

app.get("/protected",isLoggedIn,(req,res)=>{
    res.send("Hello! This is Passport")
})



app.listen(PORT,()=>{
    console.log(`Running on ${PORT}`);
})