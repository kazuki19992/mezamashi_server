var express = require('express');
var router = express.Router();
var moment = require('moment');

// 設定時刻
let setAlarm = moment('07:30:00', 'HH:mm:ss');



// 停止したか
let stopFlg = false;

router.get('/', function(req, res, next) {

  //  現在時刻
  const now = moment();
  console.log(now.format('HH:mm:ss'));
  console.log(setAlarm.format('HH:mm:ss'));
  console.log(stopFlg);

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

router.get('/hello', function(req, res, next) {
  var param = {"result":"Hello World !"};
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