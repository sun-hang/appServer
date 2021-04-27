const express = require('express');
const router = express.Router();
const productSer = require('../../services/product');
const tagSer = require('../../services/tag');
/**
 * 根据搜索关键字分页获取所有商品
 */
router.get('/', async (req, res, next) => {
    let page = +req.query.page || 1;
    let size = +req.query.size || 5;
    let query = req.query.query;
    res.json(await productSer.getData(page, size, query));
})

/**
 * 添加一条商品
 */
router.post('/', async (req, res, next) => {
    let title = req.body.title || '';
    let price = +req.body.price || 0;
    let originPrice = req.body.originPrice;
    let srcs = req.body.srcs;
    let tag = req.body.tag;
    let tagRes = await tagSer.getOne(tag);
    if(tagRes.result.length < 1){
        tagSer.addData(tag);
    }
    res.json(await productSer.addData(title, price, originPrice, tag, srcs));
})

/**
 * 修改一条商品数据
 */
router.put('/:id', (req, res, next) => {

})

/**
 * 删除一条商品数据
 */
router.delete('/:id', async (req, res, next) => {
    let id = +req.params.id;
    res.json(await productSer.removeData(id));
})

module.exports = router;