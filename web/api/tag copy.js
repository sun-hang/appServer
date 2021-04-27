const express = require('express');
const router = express.Router();
const tagSer = require('../../services/tag');

/**
 * 获取所有标签
 */
router.get('/', async (req, res, next) => {
    res.json(await tagSer.getData())
})

/**
 * 添加一条标签
 */
router.post('/', async (req, res, next) => {
    let tag = req.body.tag || '';
    res.json(await tagSer.addData(tag));
})

/**
 * 删除一条标签
 */
router.delete('/:id',async (req, res, next) => {
    let id = +req.params.id;
    res.json(await tagSer.removeData(id));
})

module.exports = router;