const sql = require('mssql') //声明插件
// mes数据库信息
const config = {
    user: 'sa',
    password: 'Txts@1911',
    server: "www.tangp.top",
    port: 10010,
    database: 'DB_SCADA',
    "options": {
        "encrypt": false,
        "enableArithAbort": true
    }
}
// 备份一份
// const config = {
//     user: 'sa',
//     password: 'Txts@1911',
//     server: '192.168.8.11',
//     database: 'DB_SCADA',
//     "options": {
//         "encrypt": false,
//         "enableArithAbort": true
//     }
// }

// const config_db = {
//     user: 'sa',
//     password: 'Txts@1911',
//     server: '192.168.8.11',
//     database: 'DB_JTCJ',
//     "options": {
//         "encrypt": false,
//         "enableArithAbort": true
//     }
// }


async function progress(sql_read) {
    try {
        await sql.connect(config)
        let test = await sql.query(sql_read)
        return test.recordset
    }
    catch (err) {
        console.log(err)
    }
}

// async function progress_db(sql_read) {
//     try {
//         await sql.connect(config_db)
//         let test = await sql.query(sql_read)
//         return test.recordset
//     }
//     catch (err) {
//         console.log(err)
//     }
// }


module.exports = {
  progress,
//   progress_db
}