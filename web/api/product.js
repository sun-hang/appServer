const express = require('express');
const router = express.Router();
const productSer = require('../../services/product');
/**
 * 根据搜索关键字分页获取所有商品
 */
router.get('/', async (req, res, next) => {
    const queryObj = {};
    const pagerObj = {};
    const sortObj = {};
    if (req.query.page) {
        pagerObj.page = +req.query.page;
        pagerObj.size = req.query.size ? +req.query.size : 10;
    }

    if(req.query.query){
        queryObj.query = req.query.query;
    }

    if (req.query.tag) {
        queryObj.tag = req.query.tag;
    }

    if (req.query.productName) {
        queryObj.productName = req.query.productName;
    }

    if (req.query.start) {
        queryObj.currentPric = {
            start: +req.query.start,
            end: req.query.end ? +req.query.end : Number.MAX_SAFE_INTEGER
        }
    }

    if (req.query.ctime) {
        sortObj.ctime = +req.query.ctime;
    }

    if (req.query.currentPric) {
        sortObj.currentPric = +req.query.currentPric;
    }

    if (req.query.originPric) {
        sortObj.originPric = +req.query.originPric;
    }

    res.json(await productSer.findAndByPage(queryObj, pagerObj, sortObj));
})

/**
 * 根据状态查询商品 state 大于-1 进行状态查询  等于-1 查询所有的状态
 */
router.get('/state', async (req, res, next) => {
    let state = +req.query.state;
    let page = +req.query.page || 1;
    let size = +req.query.size || 10;
    let ctime = +req.query.ctime
    res.json(await productSer.findState(state, page, size, ctime));
})

/**
 * 获取单个商品
 */
router.get('/:id', async (req, res, next) => {
    let _id = req.params.id;
    const result = await productSer.findOne(_id);
    res.json({ result })
})

/**
 * 添加一条商品
 */
router.post('/', async (req, res, next) => {
    res.json(await productSer.insert(req.body));
})

/**
 * 修改一条商品数据
 */
router.put('/:id', async (req, res, next) => {
    // id不是数字
    let id = req.params.id;
    res.json(await productSer.updata(id, req.body));
})

/**
 * 删除一条商品数据
 */
router.delete('/:id', async (req, res, next) => {
    let id = req.params.id;
    res.json(await productSer.remove(id));
})

module.exports = router;


/*
{
    "productName":"迪奥999",
    "originPric":200,
    "currentPric":120,
    "imgs":["/123.jpg","234.jpg"],
    "tag":"迪奥,口红",
    "stock":20,
    "options":[{"name":"色号","child":["999","888","777"]},{"name":"大小","child":["大","中","小"]}],
    "optionsDetail":[{"type":"999-大","price":120,"total":2}]
}
*/