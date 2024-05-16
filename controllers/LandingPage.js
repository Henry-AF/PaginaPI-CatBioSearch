import { Router } from "express";
import bcrypt from 'bcrypt'
import express from 'express'
const app = express() 
import userService from '../services/UserServices.js'
const router = Router()
import session from "express-session"


app.use(session({
    secret: "lojasecret",
    cookie: {maxAge: 36000000},
    saveUninitialized: false,
    resave: false
}))

router.get('/', (req,res)=>{
    res.render('landing/home')
})

router.get('/cadastro', (req, res) => {
    res.render('cadastro/cadastro')
})


//ROTA DE AUTENTICAÇÃO
router.post("/authenticate", (req,res) => {
    const email = req.body.email
    const password = req.body.password
    //BUSCA O USUARIO NO BANCO
    userService.SelectOne(email).then(user => {
        //SE O USUARIO EXISTIR
        if (user != undefined){
            //VALIDAR SENHA
            const correct = bcrypt.compareSync(password, user.password)


            //SE A SENHA FOR VÁLIDA
            if (correct){
                //AUTORIZAR O LOGIN 
                req.session.user = {
                    id : user._id,
                    email : user.email
                }
                res.send(`Usuário logado: <br> ID: ${req.session.user['id']} <br> E-mail: ${req.session.user['email']}`)
            }
        }
    })
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