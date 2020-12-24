var express = require('express');
var router = express.Router();
// const { NameFilter, addKey } = require('../utils/index')
// const { progress } = require('../db/config')
const {
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
} = require('../createContent/index')
/* GET users listing. */

const executeList = [
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
]

let ZC_Status = true
router.get('/', async function(req, res, next) {
  if (ZC_Status) {
    ZC_Status = false
    setInterval(() => {
      executeList.forEach( fun => {
        setTimeout( () => {
          fun()
        },5000)
      })
    }, 3600000)
    res.json({data: '启动成功'});
  } else {
    res.json({data: '已经启动过了'});
  }
});

module.exports = router;
