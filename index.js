import express, { urlencoded } from 'express';
import LandingPageController from './controllers/LandingPage.js';
import mongoose from 'mongoose';
import session from 'express-session';

const app = express();

// Conexão com o MongoDB
mongoose.connect("mongodb://localhost:27017/User", {
    // useNewUrlParser: true,   // Removido
    // useUnifiedTopology: true, // Removido
}).then(() => {
    console.log("Conectado ao MongoDB");
}).catch((error) => {
    console.error("Erro ao conectar ao MongoDB", error);
});

// Configuração do middleware de sessão
app.use(session({
    secret: "lojasecret",
    cookie: { maxAge: 36000000 },
    saveUninitialized: false,
    resave: false
}));

app.use(express.json());
app.use(urlencoded({ extended: true }));

app.set('view engine', 'ejs');
app.use(express.static('public'));


app.use('/', LandingPageController);

app.listen(5000, (error) => {
    if (error) {
        console.log("Erro ao iniciar o servidor", error);
    } else {
        console.log("Servidor rodando na porta 5000");
    }
});
