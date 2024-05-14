import mongoose from "mongoose";

import User from "../models/userModel"

const user = mongoose.model("user", User)

class userService{
 
    Create(email, senha){
        const novoUser = new user({
                email : email,
                senha : senha
        })
        novoUser.save()
    }
}

export default new userService()