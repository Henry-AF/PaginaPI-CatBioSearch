import express, { urlencoded } from 'express'
import LadingPageController from './controllers/LandingPage.js'

const app = express();


app.use(express.json())
app.use(urlencoded({extended:true}))
app.set('view engine', 'ejs')
app.use(express.static('public'))

app.use('/landing',LadingPageController);
app.use('/',LadingPageController);
app.use('/login',LadingPageController);

app.listen(4000, (error) => {
    if(error){
        console.log("Erro")
    }
    else{
        console.log(`Servidor rodando`);
    }
});


  