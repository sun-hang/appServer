const mongoose = require('mongoose');

/**
 * 用户信息部分
 */
const userInfoSchema = new mongoose.Schema({
    avatarUrl: { //头像
        type: String,
        required: true
    },
    city: { //城市
        type: String
    },
    province: { //省份
        type: String
    },
    country: { //国家
        type: String
    },
    gender: { //性别
        type: Number, // 0-未知，1-男,2-女
        default: 0,
        min: 0,
        max: 2
    },
    language: { //语言
        type: String
    },
    nickName: { //昵称
        type: String
    }
});

/**
 * 
 */
const addressSchema = new mongoose.Schema({
    province: { //省份
        type: String,
        required: true
    },
    city: { //城市
        type: String,
        required: true
    },
    county: { //区|县
        type: String,
        required: true
    },
    detail: { //详细地址
        type: String,
        required: true
    },
    userName: { //收件人姓名
        type: String,
        required: true
    },
    phone: { //收件人手机号
        type: String,
        required: true,
        match: /^1[345678]{1}\d{9}$/
    }
})

const adminSchema = new mongoose.Schema({
    opedId: { //小程序唯一标识
        type: String,
        required: true,
        unique: true
    },
    userInfo: { //用户信息
        type: userInfoSchema,
        default: null
    },
    address: { //用户收件地址数组
        type: [addressSchema],
        default: []
    }
})
module.exports.address = addressSchema;
module.exports.Admin = mongoose.model("Admin", adminSchema);