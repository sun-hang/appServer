const express = require('express');
const router = express.Router();
const Order = require('../../services/order');
const nodemailer = require('nodemailer');
let to = 'sun_fang@aliyun.com';
let fang = "836560138@qq.com";
let config = {
    host: 'smtp.qq.com',
    port: 465,
    auth: {
        user: '1844528595@qq.com',
        pass: "kthgwtcpfymzjjbb"
    }
}

let transporter = nodemailer.createTransport(config);
/**
 * page = -1为不分页查询
 * ctime = -1 为倒叙，1为正序
 * 根据是否删除 isDelete
 * 根据订单状态 state 0-未支付 1-已支付 2-已发货 3-已收货
 * 根据用户id进行查询
 */
router.get('/', async (req, res, next) => {
    let isDelete = req.query.isdelete || false;
    let state = +req.query.state || -1;
    let _id = req.query.id || '';
    let page = +req.query.page || -1;
    let size = +req.query.size || 10;
    let ctime = +req.query.ctime || -1;
    res.json(await Order.findByPage(page, size, state, isDelete, _id, ctime))
})

router.post('/', async (req, res, next) => {
    res.json(await Order.addOrder(req.body));
})

router.put('/:id', async (req, res, next) => {
    let _id = req.params.id;
    res.json(await Order.updataOrder(_id, req.body))
})

router.delete('/:id', async (req, res, next) => {
    let _id = req.params.id;
    res.json(await Order.removeOrder(_id))
})

module.exports = router;