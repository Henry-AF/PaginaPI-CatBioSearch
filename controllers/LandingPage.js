import { Router } from "express";
import bcrypt from 'bcrypt'
import userService from '../services/UserServices.js'
const router = Router()

router.get('/', (req,res)=>{
    res.render('landing/home')
})

router.get('/cadastro', (req, res) => {
    res.render('cadastro/cadastro')
})

router.post("/createUser", (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    userService.SelectOne(email).then(user => {
        if (!user) {
            const salt = bcrypt.genSaltSync(10);
            const hash = bcrypt.hashSync(password, salt);
            userService.Create(email, hash);
            res.redirect("/login");
        } else {
            res.send(`Usuario já cadastrado! <br><a href="/cadastro">Tentar Novamente</a>`);
        }
    }).catch(err => {
        res.status(500).send(`Erro ao acessar o banco de dados: ${err.message}`);
    });
});

router.get('/login', (req,res)=> {
    res.render('login/login')
})

export default router