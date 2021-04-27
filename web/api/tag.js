const express = require('express');
const router = express.Router();
const tagSer = require('../../services/tag');

/**
 * 获取所有标签
 */
router.get('/', async (req, res, next) => {
    res.json(await tagSer.find())
})

/**
 * 添加一条标签
 */
router.post('/', async (req, res, next) => {
    res.json(await tagSer.insert(req.body));
})
/**
 * 修改一条标签
 */
 router.put('/:id', async (req, res, next) => {
    let id = req.params.id;
    res.json(await tagSer.updata(id,req.body));
})

/**
 * 删除一条标签
 */
router.delete('/:id', async (req, res, next) => {
    let id = req.params.id;
    res.json(await tagSer.remove(id));
})

module.exports = router;