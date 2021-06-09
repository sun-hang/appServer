const schedule = require('node-schedule');
const loggerSer = require('../services/logger');
const rule = new schedule.RecurrenceRule();
rule.second = 2;
rule.hour = 0;
rule.minute = 0

const job = schedule.scheduleJob(rule, function () {
    let target = new Date(new Date().setHours(0, 0, 0, 0)).getTime();
    loggerSer.add({
        time: target
    })
});