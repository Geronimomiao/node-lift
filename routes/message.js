var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var messages = require('../models/message');

mongoose.connect('mongodb://127.0.0.1:27017/lift');

mongoose.connection.on("connected", function () {
    console.log("MongoDB Connected success")
})

mongoose.connection.on("error", function () {
    console.log("MongoDB Connected fail")
})

mongoose.connection.on("disconnected", function () {
    console.log("MongoDB Connected disconnected")
})

// 获取投诉信息
router.get('/1', (req, res, next) => {
    messages.find({type: 1}, function (err, doc) {
        if (err) {
            res.json({
                status: '1',
                msg: err.message
            })
        } else {
            res.json({
                status: '0',
                msg: '',
                result: {
                    count: doc.length,
                    list: doc
                }
            })
        }
    })
})

// 获取报修信息
router.get('/2', (req, res, next) => {
    messages.find({type: 2}, function (err, doc) {
        if (err) {
            res.json({
                status: '1',
                msg: err.message
            })
        } else {
            res.json({
                status: '0',
                msg: '',
                result: {
                    count: doc.length,
                    list: doc
                }
            })
        }
    })
})

// 插入数据
router.post('/insert', (req, res, next) => {
    var body = req.body
    messages.create({
        "type": body.type,
        "title": body.title,
        "message": body.message,
        "imgs": body.imgs,
        "status_code": body.status_code

    })
    res.send('ok')
})

// 更新数据(message 处理状况)
router.post('/update', (req, res) => {
    var id = req.body._id
    var status_code = req.body.status_code
    messages.findByIdAndUpdate(id,  { status_code: status_code }, function (err, msg) {
        if (err) return handleError(err);
        res.send('ok');
    });
})

// 删除数据接口
router.post('/delete', (req, res) => {
    var id = req.body._id
    messages.findOneAndRemove({_id: id}, (err) => {
        if (err) return handleError(err);
        res.send('ok');
    })
})

router.post('/login', (req, res, next) => {
    var body = req.body

    if (body.username === 'reddot' && body.password === 'reddot') {
        res.send('ok')
    } else {
        res.send('err')
    }
})



module.exports = router;
