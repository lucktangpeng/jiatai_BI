var express = require('express');
var router = express.Router();
const { NameFilter, addKey } = require('../utils/index')
const { progress } = require('../db/config')
/* GET home page. */

router.get('/', async function(req, res, next) {

  // 
  // setInterval()
  let template = {}
  // 注塑机 30台
  const data = await progress(`select * from zhuanchu where tagname like '%二楼\\注塑机30\\注塑机%'`)
  const DeviceKey = await progress(`use DB_JTCJ
  select NAME from syscolumns where id=object_id('CJ_zs') AND OBJECTPROPERTY(ID,'ISUSERTABLE')=1`)
  // 表的字段名
  let testNum = 0
  // 将库中的字段名添加到template中，并返回变量的总数
  testNum = addKey (DeviceKey, template, testNum)
  // 根据template中的key是循环选出对应的值，并赋值给template
  await NameFilter (template, data, testNum, (num) => {
    if (num < 10) {
      return `注塑机0${num}`
    } else {
      return `注塑机${num}`
    }
  }, (template, i) => {
    template.rs_no = `注塑机${i}`
  })
  res.json({ data: data});
});

module.exports = router;
