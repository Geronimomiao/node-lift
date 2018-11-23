var express = require('express');
var router = express.Router();


// 获取七牛云上传图片 token
var qiniu = require('qiniu')
var config = require('../config/config')

qiniu.conf.ACCESS_KEY = config.qiniu.AK
qiniu.conf.SECRET_KEY = config.qiniu.SK

// 上传空间名
var bucket = 'reddot'
// 上传后 返回一个 token 值 传给客户端
function uptoken(bucket, key) {
    var putPolicy = new qiniu.rs.PutPolicy({scope: bucket+":"+key});
    return putPolicy.uploadToken();
}

router.post('/getToken', (req, res) => {
    var key = req.body.key
    if (!key) {
        res.json({
            status: 1,
            msg: 'can not find key',
            result: ''
        })
    }
    var token = uptoken(bucket, key)
    res.json({
        status: 0,
        msg: '',
        result: token
    })
})

module.exports = router;
