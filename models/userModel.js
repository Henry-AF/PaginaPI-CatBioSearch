import mongoose from 'mongoose'

const User = new mongoose.Schema({
    email: String,
    senha : String
})

export default User 