import User from '../models/userModel.js';

const userService = {
    SelectOne: async (email) => {
        try {
            console.log(`Tentando encontrar usuário com email: ${email}`);
            const user = await User.findOne({ email });
            console.log(`Usuário encontrado: ${user}`);
            return user;
        } catch (err) {
            console.error(`Erro ao acessar o banco de dados: ${err.message}`);
            throw new Error(`Erro ao acessar o banco de dados: ${err.message}`);
        }
    },

    Create: async (email, password) => {
        try {
            console.log(`Criando novo usuário com email: ${email}`);
            const newUser = new User({ email, senha: password });
            await newUser.save();
            console.log(`Novo usuário criado: ${newUser}`);
        } catch (err) {
            console.error(`Erro ao criar o usuário: ${err.message}`);
            throw new Error(`Erro ao criar o usuário: ${err.message}`);
        }
    }
};

export default userService;
