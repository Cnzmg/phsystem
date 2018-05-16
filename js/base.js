jzm.toList = function(){    //管理员  渠道商
  $.ajax({
    url:httpJoin + "phone_operation_report",
    type:"POST",
    async:true,
    dataType:"JSON",
    data:{userToken:jzm.uncompilestr(_self.token),url:jzm.uncompilestr(_self.uri),userId:jzm.uncompilestr(_self.id),startTime:null,endTime:null}
  })
  .done(function(r) {
    stateCode.test(r.statusCode.status) ? jzm.Error(r) : (function(){
      $(".tag").html('<span>充值人数：'+ (r.rechargeInfo ? r.rechargeInfo.peopleNum : 0) +'</span><span>充值总额：'+ (r.rechargeInfo ? r.rechargeInfo.sumMoney : 0) +'</span>');
      var str = "",i = 0;
      for(; i < r.shopList.length; i ++){
        str += '<li style="border:1px solid #ccc;"><div>商户名：'+ r.shopList[i].adminName +'</div>'+
               '<div>机器数量：'+ r.shopList[i].machineCount +'</div>'+
               '<div>销售金额：'+ r.shopList[i].payMoney +'</div>'+
               '<div>销售数量：'+ r.shopList[i].payCount +'</div>'+
               '<div>商户Id：'+ r.shopList[i].adminID +'</div></li>';
      };
      $("#list").html(str || "无");
    })();
  })
  .fail(function(err) {
      jzm.Error(err);
  })
};
jzm.machinList = function(type){  //管理员  维修人员
  $.ajax({
    url:httpJoin + "phone_machine_info",
    type:"POST",
    async:true,
    dataType:"JSON",
    data:{userToken:jzm.uncompilestr(_self.token),url:jzm.uncompilestr(_self.uri),userId:jzm.uncompilestr(_self.id),startTime:null,endTime:null,type:type,page:1}
  })
  .done(function(r) {
    stateCode.test(r.statusCode.status) ? jzm.Error(r) : (type == 1 ? (function(){
      var str = "",i = 0;
      for(; i < r.machineShowList.length; i ++){
        str += '<li style="border:1px solid #ccc;"><div>商户名：'+ r.machineShowList[i].adminName +'</div>'+
               '<div>机器编号：'+ r.machineShowList[i].machineNumber +'</div>'+
               '<div>机器地址：'+ r.machineShowList[i].machineAddrDesc +'</div>'+
               '<div>SN号：'+ r.machineShowList[i].machineSn +'</div>'+
               '<div>在线状态：'+ r.machineShowList[i].onlineStatus +'</div>'+
               '<div>故障状态：'+ r.machineShowList[i].failureStatus +'</div>'+
               '<div>缺料状态：'+ r.machineShowList[i].materialStatus +'</div>'+
               '<div>维护人员：'+ r.machineShowList[i].maintainerName +'</div>'+
               '<div>维护人员手机号：'+ r.machineShowList[i].maintainerPhone +'</div>'+
               '<div>'+
                  '<a href="http://test.cbcoffee.cn/codetest/phsystem/atack_info.html?machineNumber='+r.machineShowList[i].machineNumber +'">查看详细</a>------'+
                  '<a href="http://test.cbcoffee.cn/codetest/phsystem/atack_message.html?machineNumber='+r.machineShowList[i].machineNumber +'">查看日志</a>'+
               '</div>'+
               '</li>';
      };
      $("#list").html(str || "无");
    })() : (function(){
      $(".tag").html('<span>离线数量：'+ r.offLineNum +'</span><span>故障数量：'+ r.faultNum  +'</span><span>缺料数量：'+ r.starvingNum  +'</span><span>机器总数：'+ r.machineCount  +'</span>');
    })() );
  })
  .fail(function(err) {
      jzm.Error(err);
  })

};
jzm.machinListInfo = function(){  //管理员 维修人员  设备状态详细信息
  $.ajax({
    url:httpJoin + "phone_machine_detail",
    type:"POST",
    async:true,
    dataType:"JSON",
    data:{userToken:jzm.uncompilestr(_self.token),url:jzm.uncompilestr(_self.uri),userId:jzm.uncompilestr(_self.id),machineNumber:jzm.getQueryString("machineNumber")}
  })
  .done(function(r) {
    stateCode.test(r.statusCode.status) ? jzm.Error(r) : (function(){
      var str = "";
      str += '<li style="border:1px solid #ccc;">'+
                 '<div>机器状态信息：</div>'+
                 '<div>锅炉温度：'+ r.machineStatus.boilerTemperature +'</div>'+
                 '<div>锅炉压力：'+ r.machineStatus.boilerPressure +'</div>'+
                 '<div>流量：'+ r.machineStatus.traffic +'</div>'+
                 '<div>机器状态：'+ r.machineStatus.machineStatus +'</div>'+
                 '<div>故障状态：'+ r.machineStatus.failureStatus +'</div>'+
                 '<div>开机运行时间：'+ r.machineStatus.bootTime +'</div>'+
                 '<div>累计时间：'+ r.machineStatus.cumulativeTime +'</div>'+
                 '<div>系统转接板固件版本号：'+ r.machineStatus.systemSwitchboardRevisionNumber +'</div>'+
                 '<div>冲泡器板固件版本号：'+ r.machineStatus.systemSwitchboardHardwareNumber +'</div>'+
                 '<div>冲泡器板硬件版本号：'+ r.machineStatus.burstBubbleBoardRevisionNumber +'</div>'+
                 '<div>系统转接板固件版本号：'+ r.machineStatus.burstBubbleBoardHardwareNumber +'</div>'+
                 '<div>传感器配置状态：'+ r.machineStatus.productAllowedStatus +'</div>'+
                 '<div>当前版本：'+ r.machineStatus.sensorStatus +'</div>'+
                 '<div>IO版固件版本号：'+ r.machineStatus.version +'</div>'+
                 '<div>IO版硬件版本号：'+ r.machineStatus.iofirmwareRevisionNumber +'</div>'+
                 '<div>CPU版固件版本号：'+ r.machineStatus.iohardwareNumber +'</div>'+
                 '<div>CPU版硬件版本号：'+ r.machineStatus.cpufirmwareRevisionNumber +'</div>'+

                 '<div>机器参数设置信息：</div>'+
                 '<div>热水温度：'+ r.machineConfig.hotWaterTemperature +'</div>'+
                 '<div>咖啡酿造压力设置：'+ r.machineConfig.coffeeBrewPressure +'</div>'+
                 '<div>自动清洗时间间隔：'+ r.machineConfig.automaticCleanTimeInterval +'</div>'+
                 '<div>冲泡器温度：'+ r.machineConfig.bubbleTemperature +'</div>'+
                 '<div>冲泡器挤饼力：'+ r.machineConfig.bubbleCrowdedCakeForce +'</div>'+
                 '<div>冲泡器挤饼时间：'+ r.machineConfig.bubbleCrowdedCakeTime +'</div>'+
                 '<div>冲泡器回程时间：'+ r.machineConfig.bubbleReturnTime +'</div>'+
                 '<div>冲泡器再挤时间：'+ r.machineConfig.bubbleReCrowdedTime +'</div>'+
                 '<div>托盘杯子检测阈值：'+ r.machineConfig.trayValue +'</div>'+
                 '<div>分杯器杯子检测阈值：'+ r.machineConfig.cupKispensor +'</div>'+
                 '<div>分杯失败后再分杯次数：'+ r.machineConfig.reCupNum +'</div>'+
                 '<div>齿轮泵停后延时时间：'+ r.machineConfig.gearPumpTime +'</div>'+
                 '<div>齿轮泵最大功率：'+ r.machineConfig.gearPumpMaxPower +'</div>'+
                 '<div>阀门开后搅拌器延时打开：'+ r.machineConfig.valveOpenAfterBlenderDelayTime +'</div>'+
                 '<div>停水后搅拌器延时停止：'+ r.machineConfig.freshWaterAfterBlenderDelayTime +'</div>'+
                 '<div>排风扇速度：'+ r.machineConfig.fanSpeed +'</div>'+
                 '<div>泡茶器空气泵速度：'+ r.machineConfig.teaInfuserAirPumpSpeed +'</div>'+
                 '<div>泡茶器出2断水间隔时间：'+ r.machineConfig.teaInfuserBetweenTime +'</div>'+
                 '<div>空气泵吹气时间：'+ r.machineConfig.airPumpGassingTime +'</div>'+
                 '<div>咖啡预冲泡水量比例：'+ r.machineConfig.coffeeWaterRatio +'</div>'+
                 '<div>咖啡预冲泡时间：'+ r.machineConfig.coffeeBrewTime +'</div>'+
                 '<div>开机是否清洗：'+ r.machineConfig.startUpWash +'</div>'+
                 '<div>紫外灯控制亮时间：'+ r.machineConfig.uvlampOpenTime +'</div>'+
                 '<div>紫外灯控制灭时间：'+ r.machineConfig.uvlampCloseTime +'</div>'+

                 '<div>料仓剩余量信息：</div>'+
                 '<div>料仓1（橙汁）：总量='+ r.canister[1] +"------ 剩余量="+ r.canister[0] +'</div>'+
                 '<div>料仓2（奶粉）：总量='+ r.canister[3] +"------ 剩余量="+ r.canister[2] +'</div>'+
                 '<div>料仓3（糖）：总量='+ r.canister[5] +"------ 剩余量="+ r.canister[4] +'</div>'+
                 '<div>料仓4（奶粉）：总量='+ r.canister[7] +"------ 剩余量="+ r.canister[6] +'</div>'+
                 '<div>料仓5（巧克力）：总量='+ r.canister[9] +"------ 剩余量="+ r.canister[8] +'</div>'+
                 '<div>料仓6（茶）：总量='+ r.canister[11] +"------ 剩余量="+ r.canister[10] +'</div>'+
                 '<div>料仓170（咖啡）：总量='+ r.canister[13] +"------ 剩余量="+ r.canister[12] +'</div>'+
             '</li>';
      $("#list").html(str || "无");
    })();
  })
  .fail(function(err) {
      jzm.Error(err);
  })

};
jzm.machinListMessage = function(){  //管理员 维修人员  设备故障详细信息
  $.ajax({
    url:httpJoin + "phone_machine_logs",
    type:"POST",
    async:true,
    dataType:"JSON",
    data:{userToken:jzm.uncompilestr(_self.token),url:jzm.uncompilestr(_self.uri),userId:jzm.uncompilestr(_self.id),machineNumber:jzm.getQueryString("machineNumber")}
  })
  .done(function(r) {
    stateCode.test(r.statusCode.status) ? jzm.Error(r) : (function(){
      var str = "",i = 0;
      for(; i < r.list.length; i++){

        str += '<li style="border:1px solid #ccc;">'+
                   '<div>故障内容：</div>'+
                   '<div>ID：------'+ r.list[i].mFId +'</div>'+
                   '<div>机器sn：------'+ r.list[i].machineSn +'</div>'+
                   '<div>故障内容：------'+ r.list[i].faultContent +'</div>'+
                   '<div>故障时间：------'+ jzm.getTimeStamp(r.list[i].faultTime).split(' ')[0] +'</div>'+
                   '<div>机器编号：------'+ r.list[i].machineNumber +'</div>'+
               '</li>';

      };
      $("#list").html(str || "无");
    })();
  })
  .fail(function(err) {
      jzm.Error(err);
  })

};
