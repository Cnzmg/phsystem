// var shopList_arr = [];
var toList = true;
jzm.toList = function(startTimes,endTimes){    //管理员  渠道商
  if(toList){
    toList = false;
    $.ajax({
      url:httpJoin + "phone_operation_report",
      type:"POST",
      async:true,
      dataType:"JSON",
      data:{userToken:jzm.uncompilestr(_self.token),url:jzm.uncompilestr(_self.uri),userId:jzm.uncompilestr(_self.id),startTime:startTimes||null,endTime:endTimes||null,name:jzm.getQueryString('name')}
    })
    .done(function(r){
      console.log(r.statusCode.status)
      // console.log(r.statusCode.status)
      if(stateCode.test(r.statusCode.status)){
        // console.log(111)
        if(window.location.pathname=='/phsystem/index.html'){
            window.location.href = './fake_html/fake-index.html';
            // jzm.Error(r)
        }else{
          window.location.href = './fake_html/fake-channelShop.html';
          // window.location.pathname
        }
      }else if(r.statusCode.status==200){
        // console.log(111)
        if(window.location.pathname=='/phsystem/index.html'){
            window.location.href = './fake_html/fake-index.html';
        }else{
          window.location.href = './fake_html/fake-channelShop.html';
          // window.location.pathname
        }
      }else{
          console.log('111')
          $('#search').children('input').val('')
          if(r.roleId!=3){
             $("#tag").html('<li><span>充值人数:<span>'+ (r.rechargeInfo ? r.rechargeInfo.peopleNum : 0) + '</span></span></li>'+
            '<li><span>充值总额:<span>'+ (r.rechargeInfo ? r.rechargeInfo.sumMoney : 0) +'</span></span></li>');
          }else{
            $('.message').remove();
            // console.log()
             $('.benner-header').children('a').attr('href','./commercial.html?val='+r.shopList[0].adminID);
             $('.benner-footer').children('a').attr('href','./commercial.html?val='+r.shopList[0].adminID);
          }
        data(r. shopList)
        function data(shopList){
          // console.log(shopList)
          if(shopList!=null){
            // console.log(2222)
            // console.log($('#search').children('input').val())
            var str = "",str_c="",i = 0,payCount_Num=0,payMoney_Num=0,bestStr="",worstStr="";
            for(; i < shopList.length; i ++){
              // 销售总杯数
              payCount_Num+=shopList[i].payCount;
              // 销售额
              payMoney_Num+=Math.ceil(shopList[i].payMoney);
              // shopList_arr.push(shopList[i])
              // console.log(jzm.getQueryString('val'))
              if(shopList.length==1&&window.location.pathname=='/phsystem/maintenance_center.html'){
                $('.message').remove();
                // console.log(111111111111111)
                  jzm.machineBest(2,shopList[i].adminID,startTimes,endTimes)
              }   
               if($('#search').children('input').val()==shopList[i].adminName||$('#search').children('input').val()==shopList[i].adminID||jzm.getQueryString('val')==shopList[i].adminID){
                 // console.log(11111)
                str += '<div><a href="./commercial.html?val='+shopList[i].adminID+'&name='+shopList[i].adminName+'&machineCount='+shopList[i].machineCount+'&payCount='+shopList[i].payCount+'&payMoney='+shopList[i]. payMoney+'"><ul ><li><span></span><div>'+ shopList[i].adminName +'</div></li>'+
                       '<li><div style="width:33.3%;"><span id="machineCount-num">'+ shopList[i].machineCount +'</span><span>机器数量</span></div><div style="width:33.3%;"><div id="machineCount-left"></div><span>'+shopList[i].payCount+'</span><span>销售杯数</span></div><div style="width:33.3%;"><span>'+shopList[i]. payMoney+'</span><span>销售总额</span></div></li>'+
                      '</ul></a></div>';
                  
              // console.log(str)
               }else if(!$('#search').children('input').val()&&jzm.getQueryString('val')==null){
                str += '<div><a href="./commercial.html?val='+shopList[i].adminID+'&name='+shopList[i].adminName+'&machineCount='+shopList[i].machineCount+'&payCount='+shopList[i].payCount+'&payMoney='+shopList[i]. payMoney+'"><ul ><li><span></span><div>'+ shopList[i].adminName +'</div></li>'+
                     '<li><div style="width:33.3%;"><span>'+ shopList[i].machineCount +'</span><span>机器数量</span></div><div style="width:33.3%;"><div id="machineCount-left"></div><span>'+shopList[i].payCount+'</span><span>销售杯数</span></div><div style="width:33.3%;"><span>'+shopList[i]. payMoney+'</span><span>销售总额</span></div></li>'+
                    '</ul></a></div>';
               }
            };
            jzm.machinList(2,startTimes,endTimes)
              
            if(str==""){
              console.log('无此商户')
              $('.commercial-footer-data').remove()
              str = '<div><a href="#"><ul ><li><span></span><div>无此商户</div></li>'+
                 '<li><div style="width:33.3%;"><span id="machineCount-num">0</span><span>机器数量</span></div><div style="width:33.3%;"><div id="machineCount-left"></div><span>0</span><span>销售杯数</span></div><div style="width:33.3%;"><span>0.00</span><span>销售总额</span></div></li>'+
                '</ul></a></div>';
            }
          }else{
              console.log('无此商户')
              $('.message').remove();
              str = '<div><a href="#"><ul ><li><span></span><div>无此商户</div></li>'+
                   '<li><div style="width:33.3%;"><span id="machineCount-num">0</span><span>机器数量</span></div><div style="width:33.3%;"><div id="machineCount-left"></div><span>0</span><span>销售杯数</span></div><div style="width:33.3%;"><span>0.00</span><span>销售总额</span></div></li>'+
                  '</ul></a></div>';
          }
          $("#shop-list").html(str||"无");
          $('#money-msg').html(payMoney_Num);
          $('#cup-msg').html(payCount_Num);
          $('#startTime').val(startTimes||" ");
          $('#endTime').val(endTimes||" ");
        }
      }
      toList = true;    
    })
    .fail(function(err) {
        // jzm.Error(err);
        console.log(err)
        toList = true;    
    })
  }else{
    return false;
  }
};
//所有机器销售情况和商户机器销售情况
var machineBest = true;
jzm.machineBest = function(type,num,startTimes,endTimes){  //machine_best_or_worst
    // alert('toList')
    // console.log(startTimes)
    // console.log(endTimes)
    if(machineBest){
      machineBest = false;
      $.ajax({
        url:httpJoin + "machine_best_or_worst",
        type:"POST",
        async:true,
        dataType:"JSON",
        data:{userToken:jzm.uncompilestr(_self.token),url:jzm.uncompilestr(_self.uri),userId:jzm.uncompilestr(_self.id),startTime:startTimes||null,endTime:endTimes||null,name:null,adminID:num||jzm.getQueryString('val'),adminId:num||jzm.getQueryString('val'),type:type}//}
      })
      .done(function(r){
          console.log(r.soldList)
        if(stateCode.test(r.statusCode.status)){
          // jzm.Error(r)
          window.location.href = './fake_html/fake-index.html';
        }else if(r.statusCode.status==200){
           window.location.href = './fake_html/fake-index.html';
         }else if(type==1){
          // console.log(r)
          var bestStr="",worst_str="",best_str="";
          if(r.soldList==null){
            for(var i= 0;i<3;i++){
              bestStr+='<div style="color:#fff;"><a><div>'+0+'</div><div>No.'+0+'</div></a></div>'
  
              worstStr+='<div style="color:#fff;"><a><div>'+0+'</div><div>No.'+0+'</div></a></div>'
            }
          }else{
            if(r.soldList.length<6){
              console.log('机器台数少于6时候')
                for(var i=0;i<r.soldList.length;i++){
                if(r.soldList[0].num==r.soldList[i].num){
                  bestStr+='<li class="commercial-best first"><div><a href="./machine-sales-information.html?num='+r.soldList[i].machineNumber+'"><div>'+r.soldList[i].num+'</div><div>No.'+r.soldList[i].machineNumber+'</div></a></div></li>';
                }else if(r.soldList[r.soldList.length-1].num==r.soldList[i].num){
                  bestStr+='<li class="commercial-best last"><div><a href="./machine-sales-information.html?num='+r.soldList[i].machineNumber+'"><div>'+r.soldList[i].num+'</div><div>No.'+r.soldList[i].machineNumber+'</div></a></div></li>';
                }else{
                  bestStr+='<li class="commercial-best middle"><div><a href="./machine-sales-information.html?num='+r.soldList[i].machineNumber+'"><div>'+r.soldList[i].num+'</div><div>No.'+r.soldList[i].machineNumber+'</div></a></div></li>';
                }
              }
              $('#bestStr').html(bestStr||'无');
            }else{
              for(var i= 0;i<3;i++){
                // num+=r.worst[i].num
                // payCountNum.push(r.worst[i])
                best_str+='<div style="color:#fff;"><a href="./machine-sales-information.html?num='+r.soldList[i].machineNumber+'"><div>'+r.soldList[i].num+'</div><div>No.'+r.soldList[i].machineNumber+'</div></a></div>'
              }
              for(var i=r.soldList.length-3;i<r.soldList.length;i++){
                  worst_str+='<div style="color:#fff;"><a href="./machine-sales-information.html?num='+r.soldList[i].machineNumber+'"><div>'+r.soldList[i].num+'</div><div>No.'+r.soldList[i].machineNumber+'</div></a></div>'
              }
              $('#best').html(best_str||'无')
              $('#worst').html(worst_str||'无')
            }
            
          }
         
         }else{
            //  console.log(r)
              var str="",bestStr="",worstStr="",payCountNum=[],Arr=[];
              if(r.soldList==null){
                // console.log(1)
               return false;
              }else{
                for(var i=0;i<r.soldList.length;i++){
                  // 判断是否所有机器销售为0
                  if(r.soldList[i].num==0){
                      Arr.push(r.soldList[i])
                  }
                }
                // console.log(Arr.length==r.best.length)
                if(Arr.length==r.soldList.length){
                  console.log('全部机器销售为0')
                  for(var j=0;j<r.soldList.length;j++){
                    // console.log(1)
                     worstStr+='<li class="commercial-best last"><div><a href="./machine-sales-information.html?num='+r.soldList[j].machineNumber+'"><div>'+r.soldList[j].num+'</div><div>No.'+r.soldList[j].machineNumber+'</div></a></div></li>';
                  }
                  // console.log(worstStr)
                  $('#machine-info').html('<div class="commercial-footer-data"><ul class="commercial-footer-data-box" id="commercial">'+worstStr+'</ul></div>')
                  Arr=[];
                }else{
                  // console.log(111111111111111111111)
                  // 机器台数少于6时候
                  if(r.soldList.length<6){
                    console.log('机器台数少于6时候')
                     for(var i=0;i<r.soldList.length;i++){
                      if(r.soldList[0].num==r.soldList[i].num){
                        bestStr+='<li class="commercial-best first"><div><a href="./machine-sales-information.html?num='+r.soldList[i].machineNumber+'"><div>'+r.soldList[i].num+'</div><div>No.'+r.soldList[i].machineNumber+'</div></a></div></li>';
                      }else if(r.soldList[r.soldList.length-1].num==r.soldList[i].num){
                        bestStr+='<li class="commercial-best last"><div><a href="./machine-sales-information.html?num='+r.soldList[i].machineNumber+'"><div>'+r.soldList[i].num+'</div><div>No.'+r.soldList[i].machineNumber+'</div></a></div></li>';
                      }else{
                        bestStr+='<li class="commercial-best middle"><div><a href="./machine-sales-information.html?num='+r.soldList[i].machineNumber+'"><div>'+r.soldList[i].num+'</div><div>No.'+r.soldList[i].machineNumber+'</div></a></div></li>';
                      }
                    }
                  }else{
                    // console.log(r.best.length)
                   for(var i= 0;i<3;i++){
                      // num+=r.best[i].num
                      payCountNum.push(r.soldList[i])
                    }
                    // console.log(r.soldList.length-3)
                    // console.log(r.soldList.length)
                    for(var i= r.soldList.length-3;i<r.soldList.length;i++){
                      payCountNum.push(r.soldList[i])
                    }
                    // console.log(payCountNum)
                    for(var i=0;i<payCountNum.length;i++){
                      if(payCountNum[0].num==payCountNum[i].num){
                        bestStr+='<li class="commercial-best first"><div><a href="./machine-sales-information.html?num='+payCountNum[i].machineNumber+'"><div>'+payCountNum[i].num+'</div><div>No.'+payCountNum[i].machineNumber+'</div></a></div></li>';
                      }else if(payCountNum[payCountNum.length-1].num==payCountNum[i].num){
                        bestStr+='<li class="commercial-best last"><div><a href="./machine-sales-information.html?num='+payCountNum[i].machineNumber+'"><div>'+payCountNum[i].num+'</div><div>No.'+payCountNum[i].machineNumber+'</div></a></div></li>';
                      }else{
                        bestStr+='<li class="commercial-best middle"><div><a href="./machine-sales-information.html?num='+payCountNum[i].machineNumber+'"><div>'+payCountNum[i].num+'</div><div>No.'+payCountNum[i].machineNumber+'</div></a></div></li>';
                      }
                    }
                  }
                } 
              $('#machine-info').html('<div class="commercial-footer-data"><ul class="commercial-footer-data-box" id="commercial">'+bestStr+'</ul></div>')
             }
              $('.commercial-footer-data-box').html(bestStr||worstStr);
         }
         machineBest = true;
      })
      .fail(function(err) {
        machineBest = true;
          // jzm.Error(err);
      })
    }else{
      return false;
    }

};
var machinList = true;
jzm.machinList = function(type,startTimes,endTimes){  //管理员  维修人员
  var pageNum=1;
  if(machinList){
    paging(pageNum)
  }else{
    return false;
  }
  function paging(page){
    // console.log(1)
    // console.log(type)
    // console.log(page)
    $.ajax({
      url:httpJoin + "phone_machine_info",
      type:"POST",
      async:true,
      dataType:"JSON",
      data:{userToken:jzm.uncompilestr(_self.token),url:jzm.uncompilestr(_self.uri),userId:jzm.uncompilestr(_self.id),startTime:startTimes||null,endTime:endTimes||null,type:jzm.getQueryString("type")||type,page:page,onlineStatus:jzm.getQueryString("val")||null,failureStatus:jzm.getQueryString("val1")||null,materialStatus:jzm.getQueryString("val2")||null}
    })
    .done(function(r) {
      // console.log(1)
      // console.log(r)
      // console.log(r.statusCode.status)
      (stateCode.test(r.statusCode.status)&&type==1||r.statusCode.status==200&&type==1) ?  window.location.href = './fake_html/fake-atack.html' : (type == 1 ||jzm.getQueryString("type")==1 ? (function(){
        // console.log(1)
        // console.log(r.machineShowList)
        var str = "",i = 0,btn_num="",strState="";
        for(; i < r.machineShowList.length; i ++){
          // console.log(r.machineShowList[i].onlineStatus=='无'||'正常')
          if(r.machineShowList[i].onlineStatus=='无'||r.machineShowList[i].onlineStatus=='在线'){
             strState+='<span>在线状态：<span style="color:#2DCC70;">'+ r.machineShowList[i].onlineStatus +'</span></span>';
           }else{
             strState +='<span>在线状态：<span style="color:red;">'+ r.machineShowList[i].onlineStatus +'</span></span>';
           }
           if(r.machineShowList[i].failureStatus=='无'||r.machineShowList[i].failureStatus=='正常'){
             strState +='<span>故障状态：<span style="color:#2DCC70;">'+ r.machineShowList[i].failureStatus +'</span></span>';
           }else{
               strState +='<span>故障状态：<span style="color:red;">'+ r.machineShowList[i].failureStatus +'</span></span>';
           }
          if(r.machineShowList[i].materialStatus=='无'||r.machineShowList[i].materialStatus=='正常'){
             strState +='<span>缺料状态：<span style="color:#2DCC70;">'+ r.machineShowList[i].materialStatus +'</span></span>';
          }else{
             strState +='<span>缺料状态：<span style="color:red;">'+ r.machineShowList[i].materialStatus +'</span></span>';
          }
          str += '<div><ul><li>商户名：'+ r.machineShowList[i].adminName +'</li>'+
                 '<li>机器地址：'+ r.machineShowList[i].machineAddrDesc +'</li>'+
                 '<li class="number"><span>机器编号：<span style="font-weight:bold;">'+ r.machineShowList[i].machineNumber +'</span></span><span>SN号：<span style="font-weight:bold;">'+ r.machineShowList[i].machineSn +'</span></span></li>'+
                 '<li class="state">'+strState+'</li>'+
                 '<li class="personnel"><span>维护人员：<span style="color:blue;">'+ r.machineShowList[i].maintainerName +'</span></span><span>维护人员手机号：<span style="color:blue;">'+ r.machineShowList[i].maintainerPhone +'</span></span></li>'+
                 '<li class="last_a">'+
                    '<a href="./atack_info.html?machineNumber='+r.machineShowList[i].machineNumber +'">查看日志</a>'+
                    '<a href="./atack_message.html?machineNumber='+r.machineShowList[i].machineNumber +'">详细查看</a>'+
                 '</li>'+
                 '</ul></div>';
         strState = "";
        };

        $("#list").html(str || "无");

        if(r.pageCount>1){
           $('.pading').html('<button>上一页</button><ul class="btn-num"></ul><button>下一页</button>')
            for(var j=0;j<r.pageCount;j++){
            btn_num+='<button>'+(j+1)+'</button>';
          };
           $('.btn-num').html(btn_num);
          //分页按钮方法
          jzm.pageBtn(page,r.pageCount);

            // 分页按钮
          $('.btn-num').click(function(ev){
            var ev = ev || window.event;
            var target = ev.target || ev.srcElement;
            if(target.nodeName.toLowerCase() == 'button'){
              pageNum = target.innerHTML;
              paging(target.innerHTML)
              // alert(target.innerHTML)
              // console.log(target.innerHTML)
        　  }
        　});
          // 上一页
          $('.pading').children('button').eq(0).click(function(){
              if(pageNum>1){
                pageNum--;
                paging(pageNum);
              }else{
                paging(1);
              }
          });
          // 下一页
         $('.pading').children('button').eq(1).click(function(){
            if(pageNum<pageCount){
              pageNum++;
              paging(pageNum);
            }else{
              paging(pageCount);
            }
          });
          return pageCount=r.pageCount;
        }
      })() : (function(){
        if(stateCode.test(r.statusCode.status)||r.statusCode.status==200){
          // console.log()
          window.location.href = './fake_html/fake-index.html';
					//console.log(11111)
        }else{
          // 离线数量：
          $('#off_line_number').html('<span>'+r.offLineNum||0+'</span>')
          // 机器总数：
          $('#number_of_machines').html('<span>'+r.machineCount||0+'</span>')
          // 故障数量：
          $('#Number_of_faults').html('<span>'+r.faultNum||0+'</span>')
          // 缺料数量：
          $('#lack_of_quantity').html('<span>'+r.starvingNum||0+'</span>')
        }
        machinList = true;
        jzm.incident();
        // jzm.dateSearch();
      })() );
    })
    .fail(function(err) {
      machinList = true;
        jzm.Error(err);
    })
  };
};
jzm.machinListInfo = function(){  //管理员 维修人员  设备状态详细信息
  // alert('machinListInfo')
  $.ajax({
    url:httpJoin + "phone_machine_detail",
    type:"POST",
    async:true,
    dataType:"JSON",
    data:{userToken:jzm.uncompilestr(_self.token),url:jzm.uncompilestr(_self.uri),userId:jzm.uncompilestr(_self.id),machineNumber:jzm.getQueryString("machineNumber")}
  })
  .done(function(r) {
    // console.log(r)
    // alert('machinListInfo')
    (stateCode.test(r.statusCode.status)||r.statusCode.status==200) ?  window.location.href = './fake_html/fake-atack_info.html' : (function(){
      // jzm.machinList(1);
      // console.log(machineNumber)
      var str = "",strState="";
      if(r.machineStatus.machineStatus!='正常待机'){
        strState+='<div>机器状态：<span style="color:red;">'+ r.machineStatus.machineStatus +'</span></div>'
      }else{
        strState+='<div>机器状态：<span style="color:#2DCC70;">'+ r.machineStatus.machineStatus +'</span></div>'
      }
      if( r.machineStatus.failureStatus!='正常待机'){
         strState+='<div>故障状态：<span style="color:red;">'+ r.machineStatus.failureStatus +'</span></div>'
      }else{
          strState+='<div>故障状态：<span style="color:#2DCC70;">'+ r.machineStatus.failureStatus +'</span></div>'
      }
      if(r.machineStatus.productAllowedStatus!='0000'){
        strState+='<div>传感器配置状态：<span style="color:#2DCC70;">'+ r.machineStatus.productAllowedStatus +'</span></div>'
      }else{
        strState+='<div>传感器配置状态：<span style="color:red;">'+ r.machineStatus.productAllowedStatus +'</span></div>'
      }
      if(r.machineStatus.bootTime!='0秒'){
        strState+='<div>开机运行时间：<span style="color:#2DCC70;">'+ r.machineStatus.bootTime +'</span></div>'
      }else{
        strState+='<div>开机运行时间：<span style="color:red;">'+ r.machineStatus.bootTime +'</span></div>'
      }
      strState+='<div>累计时间：<span style="color:#2DCC70;">'+ r.machineStatus.cumulativeTime +'</span></div>';

      if(r.machineStatus.boilerTemperature!='0.0度'){        strState+='<div>锅炉温度：<span style="color:#2DCC70;">'+ r.machineStatus.boilerTemperature +'</span></div>'
      }else{
        strState+='<div>锅炉温度：<span style="color:red;">'+ r.machineStatus.boilerTemperature +'</span></div>'
      }
      if(r.machineStatus.boilerPressure!='0mbar'){
        strState+='<div>锅炉压力：<span style="color:#2DCC70;">'+ r.machineStatus.boilerPressure +'</span></div>'
      }else{
        strState+='<div>锅炉压力：<span style="color:red;">'+ r.machineStatus.boilerPressure +'</span></div>'
      }
      if(r.machineConfig.hotWaterTemperature!='0.0度'){
        strState+='<div>热水温度：<span style="color:#2DCC70;">'+ r.machineConfig.hotWaterTemperature +'</span></div>'
      }else{
        strState+='<div>热水温度：<span style="color:red;">'+ r.machineConfig.hotWaterTemperature +'</span></div>'
      }
      if(r.machineStatus.traffic=='0.0'){
        strState+='<div>流量：<span style="color:#2DCC70;">'+ r.machineStatus.traffic +'</span></div>'
      }else{
        strState+='<div>流量：<span style="color:red;">'+ r.machineStatus.traffic +'</span></div>'
      }
      str += '<li>'+
                '<div>'+
                   '<div>机器状态信息： <div class="version">当前版本：'+ r.machineStatus.version  +'</div></div>'+strState+'<div>'+
                 '</li>'+
                '<li>'+
                '<div>'+
                 '<div>料仓剩余量信息：</div>'+
                 '<div>料仓1(橙汁)：总量=<span style="color:blue;">'+ r.canister[1] +"</span>------ 剩余量=<span style="+'color:blue;'+">"+ r.canister[0] +'</span></div>'+
                 '<div>料仓2(奶粉)：总量=<span style="color:blue;">'+ r.canister[3] +"</span>------ 剩余量=<span style="+'color:blue;'+">"+ r.canister[2] +'</span></div>'+
                 '<div>料仓3(糖)：总量=<span style="color:blue;">'+ r.canister[5] +"</span>------ 剩余量=<span style="+'color:blue;'+">"+ r.canister[4] +'</span></div>'+
                 '<div>料仓4(奶粉)：总量=<span style="color:blue;">'+ r.canister[7] +"</span>------ 剩余量=<span style="+'color:blue;'+">"+ r.canister[6] +'</span></div>'+
                 '<div>料仓5(巧克力)：总量=<span style="color:blue;">'+ r.canister[9] +"</span>------ 剩余量=<span style="+'color:blue;'+">"+ r.canister[8] +'</span></div>'+
                 '<div>料仓6(茶)：总量=<span style="color:blue;">'+ r.canister[11] +"</span>------ 剩余量=<span style="+'color:blue;'+">"+ r.canister[10] +'</span></div>'+
                 '<div>料仓170(咖啡)：总量=<span style="color:blue;">'+ r.canister[13] +"</span>------ 剩余量=<span style="+'color:blue;'+">"+ r.canister[12] +'</span></div>'+
                 '<div>杯子：总量=<span style="color:blue;">'+ r.canister[15] +"</span>------ 剩余量=<span style="+'color:blue;'+">"+ r.canister[14] +'</span></div>'+
                 '</div>'+
                '</li>';
     
      $("#list").html(str || "无");
      strState="";
    })();
  })
  .fail(function(err) {
      jzm.Error(err);
  })
};
jzm.machinListMessage = function(){  //管理员 维修人员  设备故障详细信息
  // alert('machinListMessage')
  // console.log(num)
  $.ajax({
    url:httpJoin + "phone_machine_logs",
    type:"POST",
    async:true,
    dataType:"JSON",
    data:{userToken:jzm.uncompilestr(_self.token),url:jzm.uncompilestr(_self.uri),userId:jzm.uncompilestr(_self.id),machineNumber:jzm.getQueryString("machineNumber")}
  })
  .done(function(r) {
    // console.log(r)
    // console.log(r.list)
    // alert('machinListMessage')
    (stateCode.test(r.statusCode.status)||r.statusCode.status==200) ? window.location.href = './fake_html/fake-atack_message.html' : (function(){
      // console.log(r)
      var newArr=[];
      //处理数组
      for(var i=0;i<r.list.length;i++){
          var timeitem = jzm.getTimeStamp(r.list[i].faultTime);
          // console.log(r.list[i].faultTime);
          r.list[i].faultTime = timeitem;
      }
      // console.log(r.list)

      // 重新排列数组
      mapLoction(r.list)
      function mapLoction(arr) {
          // newArr = [];
          r.list.forEach(function(address, i){
              var index = -1;
              var alreadyExists = newArr.some(function(newAddress, j){
                  if (address.faultTime === newAddress.faultTime) {
                      index = j;
                      return true;
                  }
              });
              if (!alreadyExists) {
                  newArr.push({
                      faultTime: address.faultTime,
                      data: [{
                        'mFId':address.mFId,
                        'machineSn':address.machineSn,
                        'faultContent':address.faultContent,
                        'machineNumber':address.machineNumber
                      }]
                  });
              } else {
                  newArr[index].data.push({
                    'mFId':address.mFId,
                    'machineSn':address.machineSn,
                    'faultContent':address.faultContent,
                    'machineNumber':address.machineNumber
                  });
              }
          });
          // return newArr;
      };
      // console.log(newArr)
      for(var i = newArr.length-1; i>=0; i--){
        $("#list").prepend('<div class="content">'+
              '<div>'+
                '<div>'+
                  '<div>故障时间：<span style="color:#1A74EA; font-family:Roboto-Condensed;">'+ newArr[i].faultTime+'</span></div>'+
                  '<div>故障内容：</div>'+
                '</div>'+
              '</div>'+
              '</div>');
      };
      // var num=newArr.length;
      // console.log(newArr)
      for(var i = 0; i<newArr.length; i++){
        // num>0?num--:num=0;
        for(var j=0; j<newArr[i].data.length;j++){
          // console.log(newArr[i].data)
          // console.log(newArr[i].data[j].mFId)
          // console.log(newArr[i].data[j].faultContent)
          $('.content').eq(i).children('div').append(
            '<ul class="fault message">'+
                    '<li style="color:red; font-family:Roboto-Condensed;">ID：<span>'+ newArr[i].data[j].mFId +'</span></li>'+
                    '<li>------<span>'+ newArr[i].data[j].faultContent +'</span></li>'+
            '</ul>');
        }
      };
      $('#header').children('form').children('input').attr('placeholder',newArr[0].data[0].machineNumber);
      // $('#header').append('<button  onclick="jzm.num()" style="position:absolute; z-index:99;">搜索</button>')
    })();
  })
  .fail(function(err) {
      jzm.Error(err);
  })
};
jzm.detailSold = function(startTimes,endTimes){
  $.ajax({
    url:httpJoin + "product_detail_sold",
    type:"POST",
    async:true,
    dataType:"JSON",
    data:{userToken:jzm.uncompilestr(_self.token),url:jzm.uncompilestr(_self.uri),userId:jzm.uncompilestr(_self.id),startTime:startTimes||null,endTime:endTimes||null,machineNumber:jzm.getQueryString('num')}
  })
   .done(function(r){
    // console.log(r)
    // console.log(r.statusCode.status)
     if(stateCode.test(r.statusCode.status)){
        // jzm.Error(r)
        // console.log(r)
      }else if(r.statusCode.status==200){
         window.location.href = './fake_html/fake-index.html';
       }else{
        // console.log(r)
        var str="",productSold="";
        // for(){}
         str += '<div><a><ul><li><span></span><div>'+ r.adminName +'  /  No.'+r.machineNumber+'</div><div>'+r.addrDesc+'</div></li>'+
                   '<li><div style="width:50%;"><div id="information-left"></div><span>'+r.countNum+'</span><span>销售杯数</span></div><div style="width:50%;"><span>'+r.payMoney+'</span><span>销售总额</span></div></li>'+
                '</ul></a></div>';
     	}
     	for(var i=0;i<r.productSold.length;i++){
        num+=r.productSold[i].countNum
        if(r.productSold[r.productSold.length-1].countNum==r.productSold[i].countNum){
          productSold+='<li class="last"><div><div>'+r.productSold[i].countNum+'</div><div>'+r.productSold[i].productName+'</div></div></li>'
        }else if(r.productSold[0].countNum==r.productSold[i].countNum){
          productSold+='<li class="first"><div><div>'+r.productSold[i].countNum+'</div><div>'+r.productSold[i].productName+'</div></div></li>'
        }else{
           productSold+='<li class="middle"><div><div>'+r.productSold[i].countNum+'</div><div>'+r.productSold[i].productName+'</div></div></li>'
        }
     	}
      // console.log(num)
     $('#information-list').html(str||"无")
     $('#information').html(productSold)
  })
  .fail(function(err) {
  	console.log(err)
      // jzm.Error(err);
  })
}
