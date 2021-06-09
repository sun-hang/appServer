const express = require('express');
const resultFuncs = require('../../utils/resultData')
const multer = require('multer');
const jimp = require('jimp');
const fs = require('fs');
const router = express.Router();
const path = require('path');


const mark = async (waterPath, originPath, targetPath, proportion = 3, marginProportion = 0.01) => {
    const [water, origin] = await Promise.all([jimp.read(waterPath), jimp.read(originPath)]);
    const curProportion = origin.bitmap.width / water.bitmap.width;
    water.scale(curProportion / proportion);
    const top = (origin.bitmap.height - water.bitmap.height) / 2;
    const left = (origin.bitmap.width - water.bitmap.width) / 2;
    origin.composite(water, left, top, {
        mode: jimp.BLEND_SOURCE_OVER,
        opacitySource: 0.3
    })
    await origin.write(targetPath);
}

/**
 * 图片存储的配置
 */
let storage = multer.diskStorage({
    destination(req, file, cd) {
        cd(null, path.resolve(__dirname, '../../public'));
    },
    filename(req, file, callback) {
        let ext = path.extname(file.originalname);
        callback(null, path.basename(file.originalname, ext) + Date.now() + (Math.floor(Math.random() * 100)) + ext);
    }
})

/**
 * 图片的解析中间件
 */
const uploadImage = multer({
    storage
    // limits: {
    //     fields: 10,
    //     fileSize: 1024 * 1024 * 1000
    // }
})

/**
 * 上传图片接口
 */
router.post('/', uploadImage.array('image', 10), async (req, res, next) => {
    // console.log(req.files);
    let files = req.files;
    let result = [];
    files = await Promise.all(files.map(async (item) => {
        await mark(path.resolve(__dirname, '../../public/2.jpg'), path.resolve(__dirname, '../../public/' + item.filename), path.resolve(__dirname, '../../public/f' + item.filename))
        await fs.promises.unlink(path.resolve(__dirname, '../../public/' + item.filename));
        item.filename = 'f' + item.filename;
        result.push(item.filename);
        return item;
    }))
    res.json(resultFuncs.resultObject(result, '图片上传成功'));
}) 

module.exports = router;