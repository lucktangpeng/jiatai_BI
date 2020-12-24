const { NameFilter, addKey, sqlJion, Formatter } = require('../utils/index')
const { progress } = require('../db/config')
const day = require('dayjs')



// let template = {}
// // 注塑机 30台
// const data = await progress(`select * from zhuanchu where tagname like '%二楼\\注塑机30\\注塑机%'`)
// const DeviceKey = await progress(`use DB_JTCJ
// select NAME from syscolumns where id=object_id('CJ_zs') AND OBJECTPROPERTY(ID,'ISUSERTABLE')=1`)
// console.log(data, 'data')
// // 表的字段名
// let testNum = 0
// // 将库中的字段名添加到template中，并返回变量的总数
// testNum = addKey (DeviceKey, template, testNum)
// // 根据template中的key是循环选出对应的值，并赋值给template
// await NameFilter (template, data, testNum, (num) => {
//   if (num < 10) {
//     return `注塑机0${num}`
//   } else {
//     return `注塑机${num}`
//   }
// }, (template, i) => {
//   template.rs_no = `注塑机${i}`
// })
// 自动铆合机
async function zs () {
  let template = {}
  // 注塑机 30台
  const data = await progress(`select * from zhuanchu where tagname like '%二楼\\注塑机30\\注塑机%'`)
  const DeviceKey = await progress(`use DB_JTCJ
  select NAME from syscolumns where id=object_id('CJ_zs') AND OBJECTPROPERTY(ID,'ISUSERTABLE')=1`)
  // console.log(data, 'data')
  // 表的字段名
  let testNum = 0
  // 将库中的字段名添加到template中，并返回变量的总数
  testNum = addKey (DeviceKey, template, testNum)
  console.log(DeviceKey)
  // 根据template中的key是循环选出对应的值，并赋值给template
  await NameFilter (template, data, testNum, (num) => {
    if (num < 10) {
      return `注塑机0${num}`
    } else {
      return `注塑机${num}`
    }
  }, (template, i) => {
    template.rs_no = `注塑机${i}`
  }, 'CJ_zs')
}


// 自动铆合机
async function zdmhj () {
  let template = {}
  const data = await progress(`select * from zhuanchu where tagname like '%三楼\\自动铆合机23\\自动铆合机%'`)
  const DeviceKey = await progress(`use DB_JTCJ
  select NAME from syscolumns where id=object_id('cj_pj') AND OBJECTPROPERTY(ID,'ISUSERTABLE')=1`)
  let testNum = 0
  // 将库中的字段名添加到template中，并返回变量的总数
  testNum = addKey (DeviceKey, template, testNum)
  await NameFilter (template, data, testNum, (num) => {
    if (num < 10) {
      return `自动铆合机0${num}`
    } else {
      return `自动铆合机${num}`
    }
  }, (template, i) => {
    template.rs_no = `自动铆合机${i}`
  }, 'cj_pj', 2)
}

async function lzq_zpx () {
  let template = {}
  const data = await progress(`select * from zhuanchu where tagname like '三楼\\连接器自动装配%\\连接器自动装配线%\\%a%\\%'`)
  const DeviceKey = await progress(`use DB_JTCJ
  select NAME from syscolumns where id=object_id('cj_lzq_zpx') AND OBJECTPROPERTY(ID,'ISUSERTABLE')=1`)
  let testNum = 0
  // 将库中的字段名添加到template中，并返回变量的总数
  testNum = addKey (DeviceKey, template, testNum)
  console.log(template)
  await NameFilter (template, data, testNum, (num) => {
    if (num < 10) {
      return `连接器自动装配线0${num}`
    } else {
      return `连接器自动装配线${num}`
    }
  }, (template, i) => {
    template.rs_no = `连接器自动装配线${i}`
  }, 'cj_lzq_zpx', 3)
}


// 电控柜 315
async function dkg1_315 () {
  let template = {}
  const data = await progress(`select * from zhuanchu where tagname like '%电控柜\\配电柜315%'`)
  const DeviceKey = await progress(`use DB_JTCJ
  select NAME from syscolumns where id=object_id('cj_dkg1_315') AND OBJECTPROPERTY(ID,'ISUSERTABLE')=1`)
  const contrastValue = {
    '900396a': 'czcjgdzt',//冲制车间供电状态
    '900404a': 'ygzdl',//有功总电量
    '900392a': 'slgdzt',//四楼供电状态
    '900393a': 'wlgdzt',//五楼供电状态
    '900394a': 'cfgdzt',//厨房供电状态
    '900395a': 'llcszxgdzt',//六楼测试中心供电状态
    '900397a': 'gnwd',//柜内温度
    '900398a': 'axdy',//A相电压
    '900399a': 'bxdy',//B相电压
    '900400a': 'cxdy',//C相电压
    '900401a': 'axdl',//A相电流
    '900402a': 'bxdl',//B相电流
    '900403a': 'cxdl',//C相电流
    '900535a': 'zrydl',//昨日用电量
    '900536a': 'syydl',//上月用电量
    '900537a': 'drssydl',//当日实时用电量
    '900538a': 'dyssydl',//当月实时用电量
    '900391a': 'kyjgdzt'//空压机供电状态
}

  let testNum = 0
  // 将库中的字段名添加到template中，并返回变量的总数
  testNum = addKey (DeviceKey, template, testNum)
  console.log(template)
  // 进行循环对template进行赋值
  data.forEach( item => {
    const tagName = item.tagname.split('\\')[item.tagname.split('\\').length - 1]
    template[contrastValue[`${tagName}`]] = item.pv
  })
  console.log(template)

  template.rs_no = `电控柜_315`
  template.time = day(new Date()).format('YYYY-MM-DD HH:mm:ss')
  const content = sqlJion(template, testNum)
  const start = `use DB_JTCJ
  insert into cj_dkg1_315 values(`
  const end = ')'
  const sqlValue = start + content + end
  console.log(sqlValue)
  await progress(sqlValue)
}

// 电控柜 630
async function dkg1_630 () {
  let template = {}
  const data = await progress(`select * from zhuanchu where tagname like '%电控柜\\配电柜630%'`)
  const DeviceKey = await progress(`use DB_JTCJ
  select NAME from syscolumns where id=object_id('cj_dkg1_630') AND OBJECTPROPERTY(ID,'ISUSERTABLE')=1`)
  const contrastValue = {
    '900406a': 'ktgd2zt',//空调供电2状态
    '900409a': 'bygzzt',//备用供电状态
    '900410a': 'rclgdzt',//热处理供电状态
    '900411a': 'gnwd',//柜内温度
    '900412a': 'axdy',//A相电压
    '900413a': 'bxdy',//B相电压
    '900414a': 'cxdy',//C相电压
    '900513a': 'zrydl',//昨日用电量
    '900416a': 'bxdl',//B相电流
    '900515a': 'drssydl',//当日实时用电量
    '900516a': 'dyssydl',//当月实时用电量
    '900405a': 'ktgd1zt',//空调供电1状态
    '900407a': 'slgdzt',//三楼供电状态
    '900408a': 'cfgdzt',//厨房供电状态
    '900418a': 'ygzdl',//有功总电量
    '900415a': 'axdl',//A相电流
    '900417a': 'cxdl',//C相电流
    '900514a': 'syydl'//上月用电量
}

  let testNum = 0
  // 将库中的字段名添加到template中，并返回变量的总数
  testNum = addKey (DeviceKey, template, testNum)
  console.log(template)
  // 进行循环对template进行赋值
  data.forEach( item => {
    const tagName = item.tagname.split('\\')[item.tagname.split('\\').length - 1]
    template[contrastValue[`${tagName}`]] = item.pv
  })
  console.log(template)

  template.rs_no = `电控柜_630`
  template.time = day(new Date()).format('YYYY-MM-DD HH:mm:ss')
  const content = sqlJion(template, testNum)
  const start = `use DB_JTCJ
  insert into cj_dkg1_630 values(`
  const end = ')'
  const sqlValue = start + content + end
  console.log(sqlValue)
  await progress(sqlValue)
}


// 电控柜 2
async function dkg2 () {
  let template = {}
  const data = await progress(`select * from zhuanchu where tagname like '%电控柜\\配电柜_2%'`)
  const DeviceKey = await progress(`use DB_JTCJ
  select NAME from syscolumns where id=object_id('cj_dkg2') AND OBJECTPROPERTY(ID,'ISUSERTABLE')=1`)
  const contrastValue = {
    '900314a': '30hzsjgdzt',//30号注塑机供电状态
    '900315a': '31hzsjgdzt',//31号注塑机供电状态
    '900317a': '18hzsjgdzt',//18号注塑机供电状态
    '900318a': '28hzsjgdzt',//28号注塑机供电状态
    '900320a': '15hzsjgdzt',//15号注塑机供电状态
    '900321a': 'xczssbgdzt',//行车煮水设备供电状态
    '900323a': 'gzfhxgdzt',//干燥房烘箱供电状态
    '900324a': '14hzsjgdzt',//14号注塑机供电状态
    '900325a': 'gnwd',//柜内温度
    '900327a': 'bxdy',//B相电压
    '900328a': 'cxdy',//C相电压
    '900329a': 'axdl',//A相电流
    '900330a': 'bxdl',//B相电流
    '900331a': 'cxdl',//C相电流
    '900390a': 'ygzdl',//有功总电量
    '900529a': 'syydl',//上月用电量
    '900530a': 'drssydl',//当日实时用电量
    '900531a': 'dyssydl',//当月实时用电量
    '900316a': '16hzsjgdzt',//16号注塑机供电状态
    '900319a': '17hzsjgdzt',//17号注塑机供电状态
    '900322a': 'lsjgdzt',//冷水机供电状态
    '900326a': 'axdy',//A相电压
    '900528a': 'zrydl'//昨日用电量
}

  let testNum = 0
  // 将库中的字段名添加到template中，并返回变量的总数
  testNum = addKey (DeviceKey, template, testNum)
  console.log(template)
  // 进行循环对template进行赋值
  data.forEach( item => {
    const tagName = item.tagname.split('\\')[item.tagname.split('\\').length - 1]
    template[contrastValue[`${tagName}`]] = item.pv
  })
  console.log(template)

  template.rs_no = `电控柜_2`
  template.time = day(new Date()).format('YYYY-MM-DD HH:mm:ss')
  const content = sqlJion(template, testNum)
  const start = `use DB_JTCJ
  insert into cj_dkg2 values(`
  const end = ')'
  const sqlValue = start + content + end
  console.log(sqlValue)
  await progress(sqlValue)
}


// 电控柜 3
async function dkg3 () {
  let template = {}
  const data = await progress(`select * from zhuanchu where tagname like '%电控柜\\配电柜_3楼%'`)
  const DeviceKey = await progress(`use DB_JTCJ
  select NAME from syscolumns where id=object_id('cj_dkg3') AND OBJECTPROPERTY(ID,'ISUSERTABLE')=1`)
  const contrastValue = {
    '895046a': 'axdy',//A相电压
    '895045a': 'gnwd',//柜内温度
    '895047a': 'bxdy',//B相电压
    '895048a': 'cxdy',//C相电压
    '895050a': 'bxdl',//B相电流
    '895051a': 'cxdl',//C相电流
    '895820a': 'ygzdl',//有功总电量
    '900558a': 'zrydl',//昨日用电量
    '900559a': 'syydl',//上月用电量
    '900560a': 'drssydl',//当日实时用电量
    '895031a': 'kg1zt',//开关1状态
    '895033a': 'kg3zt',//开关3状态
    '895034a': 'kg4zt',//开关4状态
    '895035a': 'kg5zt',//开关5状态
    '895036a': 'kg6zt',//开关6状态
    '895037a': 'kg7zt',//开关7状态
    '895038a': 'kg8zt',//开关8状态
    '895040a': 'kg10zt',//开关10状态
    '895041a': 'kg11zt',//开关11状态
    '895042a': 'kg12zt',//开关12状态
    '895044a': 'kg14zt',//开关14状态
    '895032a': 'kg2zt',//开关2状态
    '895039a': 'kg9zt',//开关9状态
    '895043a': 'kg13zt',//开关13状态
    '895049a': 'axdl',//A相电流
    '900561a': 'dyssydl'//当月实时用电量
}

  let testNum = 0
  // 将库中的字段名添加到template中，并返回变量的总数
  testNum = addKey (DeviceKey, template, testNum)
  console.log(template)
  // 进行循环对template进行赋值
  data.forEach( item => {
    const tagName = item.tagname.split('\\')[item.tagname.split('\\').length - 1]
    template[contrastValue[`${tagName}`]] = item.pv
  })
  console.log(template)

  template.rs_no = `电控柜_3`
  template.time = day(new Date()).format('YYYY-MM-DD HH:mm:ss')
  const content = sqlJion(template, testNum)
  const start = `use DB_JTCJ
  insert into cj_dkg3 values(`
  const end = ')'
  const sqlValue = start + content + end
  console.log(sqlValue)
  await progress(sqlValue)
}


// 电控柜 4
async function dkg4 () {
  let template = {}
  const data = await progress(`select * from zhuanchu where tagname like '%电控柜\\配电柜_4楼%'`)
  const DeviceKey = await progress(`use DB_JTCJ
  select NAME from syscolumns where id=object_id('cj_dkg4') AND OBJECTPROPERTY(ID,'ISUSERTABLE')=1`)
  const contrastValue = {
    '895006a': 'bxdl',//B相电流
    '895007a': 'cxdl',//C相电流
    '895818a': 'ygzdl',//有功总电量
    '895002a': 'axdy',//A相电压
    '894993a': 'kg7zt',//开关7状态
    '895001a': 'gnwd',//柜内温度
    '895005a': 'axdl',//A相电流
    '900552a': 'drssydl',//当日实时用电量
    '894987a': 'kg1zt',//开关1状态
    '894988a': 'kg2zt',//开关2状态
    '894989a': 'kg3zt',//开关3状态
    '894990a': 'kg4zt',//开关4状态
    '894994a': 'kg8zt',//开关8状态
    '894996a': 'kg10zt',//开关10状态
    '894997a': 'kg11zt',//开关11状态
    '895000a': 'kg14zt',//开关14状态
    '900553a': 'dyssydl',//当月实时用电量
    '894991a': 'kg5zt',//开关5状态
    '894992a': 'kg6zt',//开关6状态
    '894995a': 'kg9zt',//开关9状态
    '894998a': 'kg12zt',//开关12状态
    '894999a': 'kg13zt',//开关13状态
    '895003a': 'bxdy',//B相电压
    '895004a': 'cxdy',//C相电压
    '900550a': 'zrydl',//昨日用电量
    '900551a': 'syydl'//上月用电量
}

  let testNum = 0
  // 将库中的字段名添加到template中，并返回变量的总数
  testNum = addKey (DeviceKey, template, testNum)
  console.log(template)
  // 进行循环对template进行赋值
  data.forEach( item => {
    const tagName = item.tagname.split('\\')[item.tagname.split('\\').length - 1]
    template[contrastValue[`${tagName}`]] = item.pv
  })
  console.log(template)

  template.rs_no = `电控柜_4`
  template.time = day(new Date()).format('YYYY-MM-DD HH:mm:ss')
  const content = sqlJion(template, testNum)
  const start = `use DB_JTCJ
  insert into cj_dkg4 values(`
  const end = ')'
  const sqlValue = start + content + end
  console.log(sqlValue)
  await progress(sqlValue)
}

// 电控柜 5
async function dkg5 () {
  let template = {}
  const data = await progress(`select * from zhuanchu where tagname like '%电控柜\\配电柜_5楼%'`)
  const DeviceKey = await progress(`use DB_JTCJ
  select NAME from syscolumns where id=object_id('cj_dkg5') AND OBJECTPROPERTY(ID,'ISUSERTABLE')=1`)
  const contrastValue = {
    '895058a': 'kg6zt',//开关6状态
    '895065a': 'kg13zt',//开关13状态
    '895066a': 'kg14zt',//开关14状态
    '895068a': 'axdy',//A相电压
    '895069a': 'bxdy',//B相电压
    '895070a': 'cxdy',//C相电压
    '895071a': 'axdl',//A相电流
    '895072a': 'bxdl',//B相电流
    '895073a': 'cxdl',//C相电流
    '895821a': 'ygzdl',//有功总电量
    '900563a': 'syydl',//上月用电量
    '900564a': 'drssydl',//当日实时用电量
    '900565a': 'dyssydl',//当月实时用电量
    '895063a': 'kg11zt',//开关11状态
    '895064a': 'kg12zt',//开关12状态
    '895057a': 'kg5zt',//开关5状态
    '895067a': 'gnwd',//柜内温度
    '895053a': 'kg1zt',//开关1状态
    '895060a': 'kg8zt',//开关8状态
    '895054a': 'kg2zt',//开关2状态
    '895055a': 'kg3zt',//开关3状态
    '895056a': 'kg4zt',//开关4状态
    '895059a': 'kg7zt',//开关7状态
    '895061a': 'kg9zt',//开关9状态
    '895062a': 'kg10zt',//开关10状态
    '900562a': 'zrydl'//昨日用电量
}

  let testNum = 0
  // 将库中的字段名添加到template中，并返回变量的总数
  testNum = addKey (DeviceKey, template, testNum)
  console.log(template)
  // 进行循环对template进行赋值
  data.forEach( item => {
    const tagName = item.tagname.split('\\')[item.tagname.split('\\').length - 1]
    template[contrastValue[`${tagName}`]] = item.pv
  })
  console.log(template)

  template.rs_no = `电控柜_5`
  template.time = day(new Date()).format('YYYY-MM-DD HH:mm:ss')
  const content = sqlJion(template, testNum)
  const start = `use DB_JTCJ
  insert into cj_dkg5 values(`
  const end = ')'
  const sqlValue = start + content + end
  console.log(sqlValue)
  await progress(sqlValue)
}

// 一楼电阻炉
async function dzl_1 () {
  let template = {}
  const data = await progress(`select * from zhuanchu where tagname like '一楼\\电阻炉%'`)
  const DeviceKey = await progress(`use DB_JTCJ
  select NAME from syscolumns where id=object_id('cj_1_dzl') AND OBJECTPROPERTY(ID,'ISUSERTABLE')=1`)
  let testNum = 0
  // 将库中的字段名添加到template中，并返回变量的总数
  testNum = addKey (DeviceKey, template, testNum)
  console.log(template)
  await NameFilter (template, data, testNum, (num) => {
    return `电阻炉_${num}`
  }, (template, i) => {
    template.rs_no = `电阻炉${i}`
  }, 'cj_1_dzl', 2)
}

// 三楼连接器铆合机
async function xd_3 () {
  let template = {}
  const data = await progress(`select * from zhuanchu where tagname like '三楼\\连接器铆合机7\\连接器铆合机%'`)
  const DeviceKey = await progress(`use DB_JTCJ
  select NAME from syscolumns where id=object_id('cj_3_xd') AND OBJECTPROPERTY(ID,'ISUSERTABLE')=1`)
  let testNum = 0
  // 将库中的字段名添加到template中，并返回变量的总数
  testNum = addKey (DeviceKey, template, testNum)
  console.log(template)
  await NameFilter (template, data, testNum, (num) => {
    return `连接器铆合机${num}`
  }, (template, i) => {
    template.rs_no = `连接器铆合机${i}`
  }, 'cj_3_xd', 2)
}

// 3楼自动点胶机
async function pj_1 () {
  let template = {}
  const data = await progress(`select * from zhuanchu where tagname like '三楼\\自动点胶机6\\自动点胶机%'`)
  const DeviceKey = await progress(`use DB_JTCJ
  select NAME from syscolumns where id=object_id('cj_3_pj1') AND OBJECTPROPERTY(ID,'ISUSERTABLE')=1`)
  let testNum = 0
  // 将库中的字段名添加到template中，并返回变量的总数
  testNum = addKey (DeviceKey, template, testNum)
  await NameFilter (template, data, testNum, (num) => {
    return `自动点胶机0${num}`
  }, (template, i) => {
    template.rs_no = `自动点胶机${i}`
  }, 'cj_3_pj1', 2)
}

// 3楼连接器自动装配线
async function zpx_3 () {
  let template = {}
  const data = await progress(`select *from ZHUANCHU WHERE tagname LIKE'%三楼\\连接器自动装配线7\\连接器自动装配线%' AND tagname NOT LIKE'%变量%'`)
  const DeviceKey = await progress(`use DB_JTCJ
  select NAME from syscolumns where id=object_id('cj_3_zpx') AND OBJECTPROPERTY(ID,'ISUSERTABLE')=1`)
  let testNum = 0
  // 将库中的字段名添加到template中，并返回变量的总数
  testNum = addKey (DeviceKey, template, testNum)
  await NameFilter (template, data, testNum, (num) => {
    return `连接器自动装配线0${num}`
  }, (template, i) => {
    template.rs_no = `连接器自动装配线${i}`
  }, 'cj_3_zpx', 3)
}

// 3楼自动铆合机
async function pj_2 () {
  let template = {}
  const data = await progress(`select * from zhuanchu where tagname like '三楼\\自动铆合机23\\自动铆合机%'`)
  const DeviceKey = await progress(`use DB_JTCJ
  select NAME from syscolumns where id=object_id('cj_3_pj2') AND OBJECTPROPERTY(ID,'ISUSERTABLE')=1`)
  let testNum = 0
  // 将库中的字段名添加到template中，并返回变量的总数
  testNum = addKey (DeviceKey, template, testNum)
  await NameFilter (template, data, testNum, (num) => {
    if (num < 10) {
      return `自动铆合机0${num}`
    } else {
      return `自动铆合机${num}`
    }
    // return `连接器自动装配线0${num}`
  }, (template, i) => {
    template.rs_no = `自动铆合机${i}`
  }, 'cj_3_pj2', 2)
}

// 3楼自动铆合机
async function pj_3 () {
  let template = {}
  const data = await progress(`select *from ZHUANCHU WHERE tagname LIKE '%三楼\\自动铆合机23\\自动铆合机%' 
  AND tagname NOT LIKE'%变量%'AND tagname NOT LIKE'%19%'AND tagname NOT LIKE'%27%'
  AND tagname NOT LIKE'%28%'`)
  const DeviceKey = await progress(`use DB_JTCJ
  select NAME from syscolumns where id=object_id('cj_3_pj3') AND OBJECTPROPERTY(ID,'ISUSERTABLE')=1`)
  let testNum = 0
  // 将库中的字段名添加到template中，并返回变量的总数
  testNum = addKey (DeviceKey, template, testNum)
  await NameFilter (template, data, testNum, (num) => {
    if (num < 10) {
      return `自动铆合机0${num}`
    } else {
      return `自动铆合机${num}`
    }
    // return `连接器自动装配线0${num}`
  }, (template, i) => {
    template.rs_no = `自动铆合机${i}`
  }, 'cj_3_pj3', 2)
}

// 4楼镭雕机
async function ldj () {
  let template = {}
  const data = await progress(`select * from zhuanchu where tagname like '四楼\\KSD368_5检验包装区3\\%'`)
  const DeviceKey = await progress(`use DB_JTCJ
  select NAME from syscolumns where id=object_id('cj_ldj') AND OBJECTPROPERTY(ID,'ISUSERTABLE')=1`)
  let testNum = 0
  // 将库中的字段名添加到template中，并返回变量的总数
  testNum = addKey (DeviceKey, template, testNum)
  await NameFilter (template, data, testNum, (num) => {
    // if (num < 10) {
    //   return `自动铆合机0${num}`
    // } else {
    //   return `自动铆合机${num}`
    // }
    return `线${num}_镭雕机`
  }, (template, i) => {
    template.rs_no = `线${i}_镭雕机`
  }, 'cj_ldj', 2)
}

// 4楼  ksd368_5自动装配线1
async function zpx_yy () {
  let template = {}
  const data = await progress(`SELECT * FROM 
  (SELECT * FROM ZHUANCHU WHERE TAGNAME LIKE '%四楼\\KSD368_5自动装配线11\\KSD368_5自动装配线10号\\机号10_b\\%'
  UNION ALL
  SELECT * FROM ZHUANCHU WHERE TAGNAME LIKE '%四楼\\KSD368_5自动装配线11\\KSD368_5自动装配线4号\\机号4_b\\%'
  UNION ALL
  SELECT * FROM ZHUANCHU WHERE TAGNAME LIKE '%四楼\\KSD368_5自动装配线11\\KSD368_5自动装配线7号\\机号7_b\\%'
  UNION ALL
  SELECT * FROM ZHUANCHU WHERE TAGNAME LIKE '%四楼\\KSD368_5自动装配线11\\KSD368_5自动装配线8号\\机号8_b\\%'
  UNION ALL
  SELECT * FROM ZHUANCHU WHERE TAGNAME LIKE '%四楼\\KSD368_5自动装配线11\\KSD368_5自动装配线9号\\机号9_b\\%'
  )AA`)
  const DeviceKey = await progress(`use DB_JTCJ
  select NAME from syscolumns where id=object_id('cj_4_zpx_yy') AND OBJECTPROPERTY(ID,'ISUSERTABLE')=1`)
  let testNum = 0
  // 将库中的字段名添加到template中，并返回变量的总数
  testNum = addKey (DeviceKey, template, testNum)
  await NameFilter (template, data, testNum, (num) => {
    // if (num < 10) {
    //   return `自动铆合机0${num}`
    // } else {
    //   return `自动铆合机${num}`
    // }
    return `KSD368_5自动装配线${num}号`
  }, (template, i) => {
    template.rs_no = `KSD368_5自动装配线${i}号`
  }, 'cj_4_zpx_yy', 3)
}

// 4楼  ksd368_5自动装配线2
async function zpx_zz () {
  let template = {}
  const data = await progress(`SELECT * FROM 
  (SELECT * FROM ZHUANCHU WHERE TAGNAME LIKE '%四楼\\KSD368_5自动装配线11\\KSD368_5自动装配线1号\\机号1%'
  UNION ALL
  SELECT * FROM ZHUANCHU WHERE TAGNAME LIKE '%四楼\\KSD368_5自动装配线11\\KSD368_5自动装配线2号\\机号2%'
  UNION ALL
  SELECT * FROM ZHUANCHU WHERE TAGNAME LIKE '%四楼\\KSD368_5自动装配线11\\KSD368_5自动装配线3号\\机号3%'
  UNION ALL
  SELECT * FROM ZHUANCHU WHERE TAGNAME LIKE '%四楼\\KSD368_5自动装配线11\\KSD368_5自动装配线5号\\机号5%'
  UNION ALL
  SELECT * FROM ZHUANCHU WHERE TAGNAME LIKE '%四楼\\KSD368_5自动装配线11\\KSD368_5自动装配线6号\\机号6%'
  UNION ALL
  SELECT * FROM ZHUANCHU WHERE TAGNAME LIKE '%四楼\\KSD368_5自动装配线11\\KSD688_K自动装配机%'
  )AA`)
  const DeviceKey = await progress(`use DB_JTCJ
  select NAME from syscolumns where id=object_id('cj_4_zpx_zz') AND OBJECTPROPERTY(ID,'ISUSERTABLE')=1`)
  let testNum = 0
  // 将库中的字段名添加到template中，并返回变量的总数
  testNum = addKey (DeviceKey, template, testNum)
  await NameFilter (template, data, testNum, (num) => {
    // if (num < 10) {
    //   return `自动铆合机0${num}`
    // } else {
    //   return `自动铆合机${num}`
    // }
    return `KSD368_5自动装配线${num}号`
  }, (template, i) => {
    template.rs_no = `KSD368_5自动装配线${i}号`
  }, 'cj_4_zpx_zz', 3)
}

// 4楼  温控器自动制造线
async function wkq_4 () {
  let template = {}
  const data = await progress(`select * from zhuanchu where tagname like '四楼\\温控器自动制造线15\\线号%'`)
  const DeviceKey = await progress(`use DB_JTCJ
  select NAME from syscolumns where id=object_id('cj_4_wkq') AND OBJECTPROPERTY(ID,'ISUSERTABLE')=1`)
  /*
     {
       机号d : 线号15
     }
  */
  let testNum = 0
  data.forEach( item => {
    // item.tagname = Formatter(item.tagname, '机号d', '线号15', 2)
    const keylist = item.tagname.split('\\')
    if (keylist.length > 4) {
      console.log()
      keylist.splice(3, 1)
    }
    item.tagname = keylist.join('\\')
  })
  // console.log(data)
  // 将库中的字段名添加到template中，并返回变量的总数
  testNum = addKey (DeviceKey, template, testNum)
  await NameFilter (template, data, testNum, (num) => {
    // if (num < 10) {
    //   return `自动铆合机0${num}`
    // } else {
    //   return `自动铆合机${num}`
    // }
    return `线号${num}`
  }, (template, i) => {
    template.rs_no = `温控器自动制造线${i}`
  }, 'cj_4_wkq', 2)
}

// 4楼  自动装配线568_BK_3
async function bk_4 () {
  let template = {}
  const data = await progress(`select * from zhuanchu where tagname like '四楼\\自动装配线568_BK_3\\线号%'`)
  const DeviceKey = await progress(`use DB_JTCJ
  select NAME from syscolumns where id=object_id('cj_4_bk') AND OBJECTPROPERTY(ID,'ISUSERTABLE')=1`)
  let testNum = 0
  // 将库中的字段名添加到template中，并返回变量的总数
  testNum = addKey (DeviceKey, template, testNum)
  await NameFilter (template, data, testNum, (num) => {
    // if (num < 10) {
    //   return `自动铆合机0${num}`
    // } else {
    //   return `自动铆合机${num}`
    // }
    return `线号${num}`
  }, (template, i) => {
    template.rs_no = `温控器自动制造线${i}`
  }, 'cj_4_bk', 3)
}


// 4楼  自动装配线688_P
async function p688_4 () {
  let template = {}
  const data = await progress(`select * from zhuanchu where tagname like '四楼\\自动装配线688_P\\自动688_P装配机%'`)
  const DeviceKey = await progress(`use DB_JTCJ
  select NAME from syscolumns where id=object_id('cj_4_688p') AND OBJECTPROPERTY(ID,'ISUSERTABLE')=1`)
  let testNum = 0
  // 将库中的字段名添加到template中，并返回变量的总数
  testNum = addKey (DeviceKey, template, testNum)
  await NameFilter (template, data, testNum, (num) => {
    // if (num < 10) {
    //   return `自动铆合机0${num}`
    // } else {
    //   return `自动铆合机${num}`
    // }
    return `自动688_P装配机${num}号`
  }, (template, i) => {
    template.rs_no = `自动688_P装配机${i}`
  }, 'cj_4_688p', 2)
}


// 5楼  自动点焊机2\自动点焊机
async function dh2_5 () {
  let template = {}
  const data = await progress(`select * from zhuanchu where tagname like '五楼\\自动点焊机2\\自动点焊机%'`)
  const DeviceKey = await progress(`use DB_JTCJ
  select NAME from syscolumns where id=object_id('cj_5_dh2') AND OBJECTPROPERTY(ID,'ISUSERTABLE')=1`)
  let testNum = 0
  // 将库中的字段名添加到template中，并返回变量的总数
  testNum = addKey (DeviceKey, template, testNum)
  await NameFilter (template, data, testNum, (num) => {
    if (num < 10) {
      return `自动点焊机0${num}`
    } else {
      return `自动点焊机${num}`
    }
    // return `自动点焊机${num}`
  }, (template, i) => {
    template.rs_no = `自动点焊机${i}`
  }, 'cj_5_dh2', 2)
}


// 5楼  自动点焊机\自动点焊机
async function dh9_5 () {
  let template = {}
  const data = await progress(`select * from zhuanchu where tagname like '五楼\\自动点焊区\\自动点焊机%'`)
  const DeviceKey = await progress(`use DB_JTCJ
  select NAME from syscolumns where id=object_id('cj_5_dh9') AND OBJECTPROPERTY(ID,'ISUSERTABLE')=1`)
  let testNum = 0
  // 将库中的字段名添加到template中，并返回变量的总数
  testNum = addKey (DeviceKey, template, testNum)
  await NameFilter (template, data, testNum, (num) => {
    // if (num < 10) {
    //   return `自动点焊机0${num}`
    // } else {
    //   return `自动点焊机${num}`
    // }
    return `自动点焊机${num}号`
  }, (template, i) => {
    template.rs_no = `自动点焊机${i}`
  }, 'cj_5_dh9', 2)
}

// 5楼  自动点焊机\自动点焊机
async function lsj_5 () {
  let template = {}
  const data = await progress(`select * from zhuanchu where tagname like '五楼\\自动调节螺丝机3\\自动调节螺丝机%'`)
  const DeviceKey = await progress(`use DB_JTCJ
  select NAME from syscolumns where id=object_id('cj_5_lsj') AND OBJECTPROPERTY(ID,'ISUSERTABLE')=1`)
  let testNum = 0
  // 将库中的字段名添加到template中，并返回变量的总数
  testNum = addKey (DeviceKey, template, testNum)
  await NameFilter (template, data, testNum, (num) => {
    if (num < 10) {
      return `自动调节螺丝机0${num}`
    } else {
      return `自动调节螺丝机${num}`
    }
    // return `自动点焊机${num}号`
  }, (template, i) => {
    template.rs_no = `自动调节螺丝机${i}`
  }, 'cj_5_lsj', 2)
}

// 5楼  自动点焊机\自动点焊机
async function lsq_5 () {
  let template = {}
  const data = await progress(`select * from zhuanchu where tagname like '五楼\\自动流水区\\自动流水机%'`)
  const DeviceKey = await progress(`use DB_JTCJ
  select NAME from syscolumns where id=object_id('cj_5_lsq') AND OBJECTPROPERTY(ID,'ISUSERTABLE')=1`)
  let testNum = 0
  // 将库中的字段名添加到template中，并返回变量的总数
  testNum = addKey (DeviceKey, template, testNum)
  await NameFilter (template, data, testNum, (num) => {
    // if (num < 10) {
    //   return `自动流水机1号${num}`
    // } else {
    //   return `自动调节螺丝机${num}`
    // }
    return `自动流水机${num}号`
  }, (template, i) => {
    template.rs_no = `自动流水机${i}`
  }, 'cj_5_lsq', 2)
}

// 5楼  水壶寿命测试机
async function csj_6 () {
  let template = {}
  const data = await progress(`select * from zhuanchu where tagname like '六楼\\水壶寿命测试机4\\%工位水壶寿命测试机%'`)
  const DeviceKey = await progress(`use DB_JTCJ
  select NAME from syscolumns where id=object_id('cj_6_csj') AND OBJECTPROPERTY(ID,'ISUSERTABLE')=1`)
  let testNum = 0
  console.log(data)
  // 关系对应
  /* 
    {
      六工位水壶寿命测试机1 : 水壶寿命测试机1
      六工位水壶寿命测试机2 : 水壶寿命测试机2
      三工位水壶寿命测试机  : 水壶寿命测试机3
      四工位水壶寿命测试机  : 水壶寿命测试机4
    }
  */
  data.forEach( item => {
    const keylist = item.tagname.split('\\')
    if (keylist[2].indexOf('六工位水壶寿命测试机1') !== -1) {
      keylist[2] = '水壶寿命测试机1'
      item.tagname = keylist.join('\\')
    }
    if (keylist[2].indexOf('六工位水壶寿命测试机2') !== -1) {
      keylist[2] = '水壶寿命测试机2'
      item.tagname = keylist.join('\\')
    }
    if (keylist[2].indexOf('三工位水壶寿命测试机') !== -1) {
      keylist[2] = '水壶寿命测试机3'
      item.tagname = keylist.join('\\')
    }
    if (keylist[2].indexOf('四工位水壶寿命测试机') !== -1) {
      keylist[2] = '水壶寿命测试机4'
      item.tagname = keylist.join('\\')
    }
  })
  // 将库中的字段名添加到template中，并返回变量的总数
  testNum = addKey (DeviceKey, template, testNum)
  await NameFilter (template, data, testNum, (num) => {
    // if (num < 10) {
    //   return `自动流水机1号${num}`
    // } else {
    //   return `自动调节螺丝机${num}`
    // }
    return `水壶寿命测试机${num}`
  }, (template, i) => {
    template.rs_no = `水壶寿命测试机${i}`
  }, 'cj_6_csj', 2)
}


// 四楼  轴芯铆合区
async function mhj_4 () {
  let template = {}
  const data = await progress(`SELECT * FROM (
    select * from zhuanchu where tagname like '四楼\\轴芯铆合区5%'
    UNION ALL
    select * FROM ZHUANCHU WHERE TAGNAME LIKE '四楼\\温控器自动制造线15\\线号1\\轴芯1号自动机%')A
    WHERE TAGNAME  NOT LIKE '%变%'`)
  const DeviceKey = await progress(`use DB_JTCJ
  select NAME from syscolumns where id=object_id('cj_4_mhj') AND OBJECTPROPERTY(ID,'ISUSERTABLE')=1`)
  let testNum = 0
  /* 
    {
      轴芯368_5自动机1号 : 轴芯自动机1号
      轴芯368_5自动机2号 : 轴芯自动机2号
      轴芯688_6自动机1号 : 轴芯自动机3号
      轴芯688_6自动机2号 : 轴芯自动机4号
      轴芯688_6自动机3号 : 轴芯自动机5号
      轴芯688_A自动机1号 : 轴芯自动机6号
      轴芯688_A自动机2号 : 轴芯自动机7号
      轴芯1号自动机      : 轴芯自动机8号
    }
  */
  // console.log(data)
  data.forEach( item => {
    item.tagname = Formatter(item.tagname, '轴芯368_5自动机1号', '轴芯自动机1号', 2)
    item.tagname = Formatter(item.tagname, '轴芯368_5自动机2号', '轴芯自动机2号', 2)
    item.tagname = Formatter(item.tagname, '轴芯688_6自动机1号', '轴芯自动机3号', 2)
    item.tagname = Formatter(item.tagname, '轴芯688_6自动机2号', '轴芯自动机4号', 2)
    item.tagname = Formatter(item.tagname, '轴芯688_6自动机3号', '轴芯自动机5号', 2)
    item.tagname = Formatter(item.tagname, '轴芯688_A自动机1号', '轴芯自动机6号', 2)
    item.tagname = Formatter(item.tagname, '轴芯688_A自动机2号', '轴芯自动机7号', 2)
    item.tagname = Formatter(item.tagname, '轴芯1号自动机', '轴芯自动机8号', 2)
  })
  // console.log(data)
  // 将库中的字段名添加到template中，并返回变量的总数
  testNum = addKey (DeviceKey, template, testNum)
  await NameFilter (template, data, testNum, (num) => {
    // if (num < 10) {
    //   return `自动点焊机0${num}`
    // } else {
    //   return `自动点焊机${num}`
    // }
    return `轴芯自动机${num}号`
  }, (template, i) => {
    template.rs_no = `轴芯自动机${i}`
  }, 'cj_4_mhj', 2)
}


// 5楼  KSD688_5检测自动机
async function jc_5 () {
  let template = {}
  const data = await progress(`SELECT * FROM ZHUANCHU WHERE TAGNAME LIKE '%五楼\\KSD688检测自动机4\\%'AND tagname NOT LIKE'%变量%'`)
  const DeviceKey = await progress(`use DB_JTCJ
  select NAME from syscolumns where id=object_id('cj_5_jc') AND OBJECTPROPERTY(ID,'ISUSERTABLE')=1`)
  let testNum = 0
  /*
    {
      KSD688_5检测自动机1号 : 检测自动机1号
      KSD688_6检测自动机2号 : 检测自动机2号
      KSD688_P检测自动机 : 检测自动机3号
      KSD688检测自动机3号 : 检测自动机4号
      通用型检测机5号 : 检测自动机5号
    }
  */
  data.forEach( item => {
    item.tagname = Formatter(item.tagname, 'KSD688_5检测自动机1号', '检测自动机1号', 2)
    item.tagname = Formatter(item.tagname, 'KSD688_6检测自动机2号', '检测自动机2号', 2)
    item.tagname = Formatter(item.tagname, 'KSD688_P检测自动机', '检测自动机3号', 2)
    item.tagname = Formatter(item.tagname, 'KSD688检测自动机3号', '检测自动机4号', 2)
    item.tagname = Formatter(item.tagname, '通用型检测机5号', '检测自动机5号', 2)
  })
  // 将库中的字段名添加到template中，并返回变量的总数
  testNum = addKey (DeviceKey, template, testNum)
  await NameFilter (template, data, testNum, (num) => {
    // if (num < 10) {
    //   return `检测自动机${num}号`
    // } else {
    //   return `自动调节螺丝机${num}`
    // }
    return `检测自动机${num}号`
  }, (template, i) => {
    template.rs_no = `检测自动机${i}号`
  }, 'cj_5_jc', 2)
}



// 三楼  KSD688组装机
async function ksd_3 () {
  let template = {}
  const data = await progress(`SELECT * FROM 
  (select * from zhuanchu where tagname like '%组装机%'
  union all
  select * FROM ZHUANCHU WHERE TAGNAME LIKE '%568_803%'
  union all
  SELECT * FROM ZHUANCHU WHERE TAGNAME LIKE '%三楼\\连接器自动装配机568k\\连接器自动装配机568k_01%')A
  WHERE TAGNAME NOT LIKE '%变%'`)
  const DeviceKey = await progress(`use DB_JTCJ
  select NAME from syscolumns where id=object_id('cj_3_ksd') AND OBJECTPROPERTY(ID,'ISUSERTABLE')=1`)
  let testNum = 0
    /*
    {
      KSD688_2组装机03 : KSD组装机1
      KSD688_3组装机02 : KSD组装机2
      KSD688_P组装机01 : KSD组装机3
      自动装配机568_803a : KSD组装机4
      自动装配机568_803b : KSD组装机5
      连接器自动装配机568k_01 : KSD组装机6
    }
  */
 data.forEach( item => {
  item.tagname = Formatter(item.tagname, 'KSD688_2组装机03', 'KSD组装机1', 2)
  item.tagname = Formatter(item.tagname, 'KSD688_3组装机02', 'KSD组装机2', 2)
  item.tagname = Formatter(item.tagname, 'KSD688_P组装机01', 'KSD组装机3', 2)
  item.tagname = Formatter(item.tagname, '自动装配机568_803a', 'KSD组装机4', 2)
  item.tagname = Formatter(item.tagname, '自动装配机568_803b', 'KSD组装机5', 2)
  item.tagname = Formatter(item.tagname, '连接器自动装配机568k_01', 'KSD组装机6', 2)
})
  // 将库中的字段名添加到template中，并返回变量的总数
  testNum = addKey (DeviceKey, template, testNum)
  await NameFilter (template, data, testNum, (num) => {
    // if (num < 10) {
    //   return `自动流水机1号${num}`
    // } else {
    //   return `自动调节螺丝机${num}`
    // }
    return `KSD组装机${num}`
  }, (template, i) => {
    template.rs_no = `KSD组装机${i}`
  }, 'cj_3_ksd', 2)
}


module.exports = {
  zdmhj,
  dkg1_315,
  dkg1_630,
  dkg2,
  dkg3,
  dkg4,
  dkg5,
  lzq_zpx,
  dzl_1,
  xd_3,
  pj_1,
  zpx_3,
  pj_2,
  pj_3,
  ldj,
  zpx_yy,
  zpx_zz,
  wkq_4,
  bk_4,
  p688_4,
  dh2_5,
  dh9_5,
  lsj_5,
  lsq_5,
  csj_6,
  mhj_4,
  jc_5,
  ksd_3,
  zs
}