const User = require('../models/user.model')
const bcrypt = require('bcrypt')
const APIError = require('../utils/errors')
const Response = require('../utils/response')
const login = async (req, res) => {
    console.log(req.body);
    return res.json(req.body)
}

const register = async (req, res) => {
    const {email} = req.body

    const userCheck = await User.findOne({email: email})
    if (userCheck) {
        throw new APIError("kullanımda olan bir email", 401)
    }
    req.body.password = await bcrypt.hash(req.body.password, 10)
    const newUser = new User(req.body)
    await newUser.save()
        .then((data) => {
            return new Response(data, "Kayıt işlemi başarılı.").created(res)
        }).catch(
            (err) => {
                throw new APIError("Kullanıcı Kayıt edilemedi!", 400)
            }
        )
}


module.exports = {login, register}