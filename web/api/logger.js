const express = require('express');
const loggerSer = require('../../services/logger');
const router = express.Router();

/**
 * 查
 */
router.get('/', async (req, res, next) => {
    let result;
    if (req.query.time) {
        result = await loggerSer.findOne(+req.query.time)
    }

    if (req.query.start && req.query.end) {
        result = await loggerSer.findMany(+req.query.start, +req.query.end)
    }

    res.json(result);
})

/**
 * 增
 */
router.post('/', async (req, res, next) => {
    try {
        res.json(await loggerSer.add(req.body))
    } catch (error) {
        next(new Error(error.message))
    }
})

/**
 * 改
 */
router.put('/:id', async (req, res, next) => {
    let _id = req.params.id;
    try {
        res.json(await loggerSer.updata(_id, req.body))
    } catch (error) {
        next(new Error(error.message))
    }
})

/**
 * 删
 */
router.delete('/:id', async (req, res, next) => {
    let id = req.params.id;
    res.json(await loggerSer.del(id))
})


module.exports = router;