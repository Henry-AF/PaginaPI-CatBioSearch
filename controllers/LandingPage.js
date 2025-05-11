import { Router } from "express";
import bcrypt from 'bcrypt';
import userService from '../services/UserServices.js';

const router = Router();

router.get('/', (req, res) => {
    res.render('landing/home');
});

router.get('/cadastro', (req, res) => {
    res.render('cadastro/cadastro');
});

router.post("/authenticate", (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    userService.SelectOne(email).then(user => {
        if (user) {
            const correct = bcrypt.compareSync(password, user.senha);

            if (correct) {
                req.session.user = {
                    id: user._id,
                    email: user.email
                };
                res.redirect("/");
            } else {
                res.status(401).send("Senha incorreta. <a href='/login'>Tente novamente</a>");
            }
        } else {
            res.status(404).send("Usuário não encontrado. <a href='/cadastro'>Cadastre-se</a>");
        }
    }).catch(err => {
        console.error(`Erro ao acessar o banco de dados: ${err.message}`);
        res.status(500).send(`Erro ao acessar o banco de dados: ${err.message}`);
    });
});

router.post("/createUser", (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    userService.SelectOne(email).then(user => {
        if (!user) {
            const salt = bcrypt.genSaltSync(10);
            const hash = bcrypt.hashSync(password, salt);
            userService.Create(email, hash).then(() => {
                res.redirect("/login");
            }).catch(err => {
                res.status(500).send(`Erro ao criar o usuário: ${err.message}`);
            });
        } else {
            res.send(`Usuario já cadastrado! <br><a href="/cadastro">Tentar Novamente</a>`);
        }
    }).catch(err => {
        res.status(500).send(`Erro ao acessar o banco de dados: ${err.message}`);
    });
});

router.get('/login', (req, res) => {
    res.render('login/login');
});

export default router;
