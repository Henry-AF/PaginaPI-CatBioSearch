
import express, { urlencoded } from 'express';
import LandingPageController from './controllers/LandingPage.js';
import mongoose from "mongoose";

const app = express();

mongoose.connect("mongodb://localhost:27017/User", {
    useNewUrlParser: true,
}).then(() => {
    console.log("Conectado ao MongoDB");
}).catch((error) => {
    console.error("Erro ao conectar ao MongoDB", error);
});

app.use(express.json());
app.use(urlencoded({ extended: true }));

app.set('view engine', 'ejs');
app.use(express.static('public'));

app.use('/landing', LandingPageController);
app.use('/', LandingPageController);
app.use('/login', LandingPageController);

app.listen(4000, (error) => {
    if (error) {
        console.log("Erro ao iniciar o servidor", error);
    } else {
        console.log("Servidor rodando na porta 4000");
    }
});
