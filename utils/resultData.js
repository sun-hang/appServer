module.exports.resultObject = (data, msg) => {
    return {
        status: 200,
        result: data,
        msg
    }
}