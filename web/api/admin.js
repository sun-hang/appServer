const express = require('express');
const Admin = require('../../services/admin');
const router = express.Router();

router.get('/', async (req, res, next) => {
    let openId = req.query.openId || '';
    res.json(await Admin.findOne('', openId))
})

router.post('/', async (req, res, next) => {
    res.json(await Admin.addAdmin(req.body));
})

router.put('/:id', async (req, res, next) => {
    let _id = req.params.id;
    res.json(await Admin.updataAdmin(_id, req.body));
})

router.delete('/:id', async (req, res, next) => {
    let _id = req.params.id;
    res.json(await Admin.removeAdmin(_id))
})



module.exports = router;