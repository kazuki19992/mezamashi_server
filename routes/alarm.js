var express = require('express');
var router = express.Router();
var moment = require('moment');
const { set } = require('../app');

// 設定時刻
let setAlarm = moment('07:30:00', 'HH:mm:ss');



// 停止したか
let stopFlg = false;

router.get('/', function(req, res, next) {

  //  現在時刻
  // const now = moment();
  const now = moment('8:30:01', 'HH:mm:ss');

  console.log(now.format('HH:mm:ss'));
  console.log(setAlarm.format('HH:mm:ss'));
  console.log(stopFlg);


  tmp = setAlarm.clone();
  tmp.add(1, 'h');
  if(now.isAfter(tmp)){
    // アラームから一時間たった後ならストップさせる
    stopFlg = true;
  }

  if(now >= setAlarm && !stopFlg){
    var param = {"alarm":"true", "now":now.format('HH:mm:ss'), "set":setAlarm.format('HH:mm:ss')};
    res.header('Content-Type', 'application/json; charset=utf-8')
    res.send(param);
  }else{
    var param = {"alarm":"false", "now":now.format('HH:mm:ss'), "set":setAlarm.format('HH:mm:ss')};
    res.header('Content-Type', 'application/json; charset=utf-8')
    res.send(param);
  }
});

router.get('/echo', function(req, res, next) {
  var param = {"setTime":setAlarm.format('HH:mm:ss')};
  res.header('Content-Type', 'application/json; charset=utf-8')
  res.send(param);
});

router.post('/stop', function(req, res, next) {
  console.log(req.body);
  // 停止する

  if(req.body.msg === "goodMng_stopPlz"){
    console.log('OK');
    stopFlg = true;
    var param = {"res":"success"};
    res.header('Content-Type', 'application/json; charset=utf-8')
    res.send(param);
  }else{
    console.log('NO');

    stopFlg = false;
    var param = {"res":"failure"};
    res.header('Content-Type', 'application/json; charset=utf-8')
    res.send(param);
  }
  console.log('stopFlg='+stopFlg);
});


router.post('/update', function(req, res, next) {
  console.log(req.body);
  // 設定時刻更新

  if(moment(req.body.time, 'HH:mm:ss').isValid()){
    console.log('timeUpdate');
    setAlarm = moment(req.body.time, 'HH:mm:ss')
    var param = {"res":"success"};
    res.header('Content-Type', 'application/json; charset=utf-8')
    res.send(param);
  }else{
    console.log('NO');

    stopFlg = false;
    var param = {"res":"failure"};
    res.header('Content-Type', 'application/json; charset=utf-8')
    res.send(param);
  }
  console.log('stopFlg='+stopFlg);
});

module.exports = router;