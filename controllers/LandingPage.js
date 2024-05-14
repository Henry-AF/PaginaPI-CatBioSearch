import { Router } from "express";
const router = Router()

router.get('/', (req,res)=>{
    res.render('landing/home')
})

router.get('/cadastro', (req, res) => {
    res.render('cadastro/cadastro')
})

router.get('/login', (req,res)=> {
    res.render('login/login')
})

export default router