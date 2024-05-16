import mongoose from "mongoose";
import User from "../models/userModel.js" 

const user = mongoose.model("user", User)

class userService {
    Create(email, senha) {
        const novoUser = new user({ // Usar o modelo importado diretamente
            email: email,
            senha: senha
        });
        novoUser.save();
    }

    SelectOne(email) {
        return user.findOne({ email: email }); // Usar o modelo importado diretamente
    }
}

export default new userService();
