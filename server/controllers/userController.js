const ApiError = require('../error/ApiError')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const {User} = require('../models/models')
const {decode} = require("jsonwebtoken");
const jwt_decode = require('jwt-decode')

const generateJwt = (id,email,name) => {
    return jwt.sign(
        {id, email, name},
        process.env.SECRET_KEY,
        {expiresIn: '24h'}
    )
}

class UserController {
    async registration(req, res, next) {
        const {email, password, name} = req.body

        if(!email || !password) {
            return next(ApiError.badRequest("Некоректный email или пароль"))
        }

        const candidate = await User.findOne({where: {email}})

        if(candidate){
            return next(ApiError.badRequest("Пользователь с таким email уже существует"))
        }

        const hashPassword = await bcrypt.hash(password, 5)
        const user = await User.create({email, name, password: hashPassword})
        const token = generateJwt(user.id, user.email, user.name)
        return res.json({token})
    }

    async login(req,res, next) {
        const {email, password} = req.body
        const user = await User.findOne({where: {email}})
        if(!user){
            return next(ApiError.badRequest("Пользователь не найден"))
        }
        let comparePassword = bcrypt.compare(password, user.password)
        if(!comparePassword){
            return next(ApiError.badRequest("Указан неверный пароль"))
        }
        const token = generateJwt(user.id, user.email, user.name)
        return res.json({token})

    }

    async check(req,res) {
        const user = jwt_decode(generateJwt(req.user.id, req.user.email, req.user.name))
        return res.json({user})
    }
}

module.exports = new UserController()