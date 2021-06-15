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
 * 用于发送邮件给店小二
 * @param {*} item 
 * @returns 
 */
async function sendMessage(item) {
    let text = `用户名称：【${item.nickName}】 \r\n`;
    let list = item.products;
    let totalCount = 0;
    let totalPrice = 0;
    for (let i = 0; i < list.length; i++) {
        totalCount += list[i].type.count;
        totalPrice += list[i].type.total;
        text += `商品名称：【${list[i].productName}】  标签：【${list[i].tag}】 购买规格：【${list[i].type.name}】  购买数量：【${list[i].type.count}】   价格：【${list[i].type.price}】  总计：【￥${list[i].type.total}】\n`
    }
    text += `总计【${totalCount}件】  总价格：【${totalPrice}】元 \n 收件人：【${item.address.userName}】 \n 手机号：【${item.address.phone}】 \n  收件地址：【${item.address.province + item.address.city + item.address.county + item.address.detail}】`
    let msg = {
        from: "来自你家猪猪<1844528595@qq.com>",
        subject: "来自客户的订单",
        to: fang,
        text
    }
    let res = await transporter.sendMail(msg);
    return res;
}
/**
 * page = -1为不分页查询
 * ctime = -1 为倒叙，1为正序
 * 根据是否删除 isDelete 0为删除 1为未删除 为传输不带此条件
 * 根据订单状态 state 0-未支付 1-已支付 2-已发货 3-已收货
 * 根据用户id进行查询
 */
router.get('/', async (req, res, next) => {
    let isDelete = +req.query.isdelete || 0;
    let state = -1;
    if (req.query.state != undefined) {
        state = +req.query.state;
    }
    let _id = req.query.id || '';
    let page = +req.query.page || -1;
    let size = +req.query.size || 10;
    let ctime = +req.query.ctime || -1;
    res.json(await Order.findByPage(page, size, state, isDelete, _id, ctime))
})

router.get('/id', async (req, res, next) => {
    let id = req.query.id;
    res.json(await Order.findOne(id));
})

router.post('/', async (req, res, next) => {
    let result = await sendMessage(req.body);
    console.log(result)
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