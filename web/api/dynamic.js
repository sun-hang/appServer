const express = require('express');
const router = express.Router();
const dynamicSer = require('../../services/dynamic');

/**
 * 分页获取所有动态
 */
router.get('/', async (req, res, next) => {
    let page = +req.query.page || 1;
    let size = +req.query.size || 5;
    res.json(await dynamicSer.getData(page, size));
})

/**
 * 添加一条动态
 */
router.post('/', async (req, res, next) => {
    let content = req.body.content || '';
    let ctime = req.body.ctime || Date.now() + '';
    res.json(await dynamicSer.addData(content, ctime));
})

/**
 *修改一条动态
 */
// router.put('/:id', (req, res, next) => {

// })

/**
 * 删除一条数据
 */
router.delete('/:id', async (req, res, next) => {
    let id = +req.params.id;
    res.json(await dynamicSer.removeData(id));
})

module.exports = router;