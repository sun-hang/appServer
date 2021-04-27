const mockjs = require("mockjs");
const http = require('http');
const axios = require('axios').default;
const { json } = require("express");
const data = mockjs.mock({
    'data|400-500': [
        {
            "productName": '@cword(3, 5)',
            "originPric|200-500": 200,
            "currentPric|1-200": 120,
            "imgs|1-3": [
                "newZb9IkZLdAYiD312dd84e3fd4b256b37e2f6ee7b77f1a161233201379936.jpg",
                "newf9QlpPYK7pZP414edfea3507fcd7f399236d21c18ef0161233201398476.jpg",
                "newhvzvVJnyB2XX7df10e59c52057a3b72b79fcb1535f97161233201381488.jpg"
            ],
            "tag|1": ["迪奥,口红", '娇兰,面霜', '迪奥,眼霜', '阿玛尼,粉底液', '风诗悦吟,散粉'],
            "stock|1-30": 20,
            "options": [{ "name": "色号", "child": ["999", "888", "777"] }, { "name": "大小", "child": ["大", "中", "小"] }],
            "optionsDetail": [{ "type": "999-大", "price": 120, "total": 2 }]
        }
    ]
})

// console.log(data.data);






// data.data.forEach((element,index) => {
//     setTimeout(()=>{
const req = http.request("http://127.0.0.1:12307/api/product", {

    method: "POST",
    headers: {
        'Content-Type': 'application/json'
    }
}, (res) => {
    res.on('data', (data) => {
        console.log(data.toString());
    })

    // res.on('error', (err) => {
    //     console.log(err)
    // })

    res.on('end', () => {
        console.log('res end')
    })
})

req.write(JSON.stringify({
    data: data.data.splice(1, Math.floor(Math.random() * 100))
}))
req.end();
//     },index * 1);
// });



// console.log({data:data.data})
// console.log(JSON.stringify({data:data.data}))

// axios.post('http://127.0.0.1:12307/api/product', {
//     "productName": "迪奥999",
//     "originPric": 200,
//     "currentPric": 120,
//     "imgs": ["/123.jpg", "234.jpg"],
//     "tag": "迪奥,口红",
//     "stock": 20,
//     "options": [{ "name": "色号", "child": ["999", "888", "777"] }, { "name": "大小", "child": ["大", "中", "小"] }],
//     "optionsDetail": [{ "type": "999-大", "price": 120, "total": 2 }]
// }).then(res => {
//     console.log(res);
// }) 

// axios.get('http://127.0.0.1:12307/api/product').then(res =>{
//     console.log(res);
// }).catch(res =>{
//     console.log(res.toJSON())
// })