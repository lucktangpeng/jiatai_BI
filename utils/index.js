const day = require('dayjs')
// const { NameFilter, addKey } = require('../utils/index')
const { progress } = require('../db/config')
function sqlJion (template, maxNum) {
  let content = ''
  Object.keys(template).forEach( (key, index) => {
    if (index + 1 === maxNum) {
      content += `'${String(template[key])}'`
    } else {
      content += `'${String(template[key])}',`
    }
  })
  return content
}

async function NameFilter (template, data, maxNum, cb1, cb2, table, num=2) {
  let sumDevice = 2
  
  for (let i=1; i <= sumDevice; i++) {
    
    let deviceName = ''
    let status = false
    deviceName = cb1(i)
    // NameFilter (template, data, deviceName)
    Object.keys(template).forEach( name => {
      data.forEach( val => {
        let tagName = ''
        tagName = val.tagname.split('\\')[val.tagname.split('\\').length - num]
        // console.log(tagName,"tagname")
        // 获取最大机台数的数值
        let reg = /(\d+)/
        if (reg.test(tagName)) {
          deviceNum = RegExp.$1
          if (deviceNum > sumDevice) {
            sumDevice = Number(deviceNum)
          }
        }
        // console.log(tagName, 'tagName')
        // console.log(deviceName, 'deviceName')
        if (tagName === deviceName) {
          status = true
          if (val.tagname.split('\\')[val.tagname.split('\\').length - 1] === name) {
            template[name] = val.pv
          }
        }
      })
    })
    // console.log(`自动铆合机${i}`, template)
    if (!status) {
      continue
    }
    // 添加注塑机名称，和时间
    cb2(template, i)
    template.time = day(new Date()).format('YYYY-MM-DD HH:mm:ss')
    const content = sqlJion(template, maxNum)
    const start = `use DB_JTCJ
    insert into ${table} values(`
    const end = ')'
    const sqlValue = start + content + end
    console.log(sqlValue)
    await progress(sqlValue)
  }
}

function addKey (keyList, template, num) {
  keyList.forEach( key => {
    num += 1
    let name = key['NAME']
    template[name] = 0
  })
  return num
}

function Formatter (tagname, deviceName, formatterName, index) {
  const keylist = tagname.split('\\')
  if (keylist[keylist.length - index].indexOf(deviceName) !== -1) {
    keylist[keylist.length - index] = formatterName
    return keylist.join('\\')
  }
  return keylist.join('\\')
}

module.exports = {
  sqlJion,
  NameFilter,
  addKey,
  Formatter
}