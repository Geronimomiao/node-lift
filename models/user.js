var mongoose = require('mongoose')
var Schema = mongoose.Schema
var userSchema = new Schema({
    phoneNumber: {
        unique: true, // 防止用户反复注册
        type: String
    },
    verified: {
        type: Boolean,
        default: false
    },                // 校验用户是否注册成功
    verifyCode: String, // 短信验证码
    avatar: String, // 用户头像路径
    auth: {
        type: Boolean,
        default: false
    },               // 校验用户是否完成认证
    accessToken: String, // 用户的唯一凭证
    meta: {
        createAt: {
            type: Date,
            default: Date.now()
        },
        updateAt: {
            type: Date,
            default: Date.now()
        }
    },               // 用户的创建时间 修改时间
    password: String,
    nickname: String
})

module.exports = mongoose.model('User', userSchema)