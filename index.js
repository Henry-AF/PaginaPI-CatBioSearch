import express, { urlencoded } from 'express'
import LadingPageController from './controllers/LandingPage.js'

const app = express();


app.use(express.json())
app.use(urlencoded({extended:true}))
app.set('view engine', 'ejs')
app.use(express.static('public'))

app.use('/landing',LadingPageController);

app.listen(3000, (error) => {
    if(error){
        console.log("Erro")
    }
    else{
        console.log(`Servidor rodando`);
    }
});


  