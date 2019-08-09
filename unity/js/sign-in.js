var signInArr=[];
var dayarr= "";
var dataarr = [];
var dataObj = {};
var date = new Date();
var Month = date.getMonth()<10 ? '0'+(date.getMonth() + 1):(date.getMonth() + 1)
// console.log(Month)
var currentdate =  date.getFullYear() + "-" + Month+'-'+date.getDate();
var geolocation = new BMap.Geolocation(),lng,lat;
  // console.log(currentdate)
  geolocation.getCurrentPosition(function(r){
    // console.log(r)
    getLocation([r.longitude,r.latitude]);
  });

function getLocation(xml){
    console.log(xml)
    $.ajax({
        type:"GET",
        url:"http://api.map.baidu.com/geosearch/v3/nearby?ak=YrLXSmMEX8PpItoywaoeuXigcfKNuzoy&geotable_id=182569&location="+ xml +"&tags=coffee&radius=10000&sortby=distance:-1",
        dataType:"jsonp",
        success:function(res){
          // console.log(res)
           dataObj = {address:res.contents[0].address,machineNumber:jzm.getQueryString('machinenumber'),userId:jzm.uncompilestr(_self.id.toString()),userToken:jzm.uncompilestr(_self.token)};
           // console.log(dataObj);
           postatch(2,currentdate);
        }
    });
};
//签到
function postatch(type,time){
    // console.log('time:'+time)
    // console.log(xml)
    $.ajax({
        url: httpJoin + 'maintainer_inspect_sign',
        type: 'POST',
        dataType: 'json',
        data:{address:dataObj.address,machineNumber:dataObj.machineNumber,userId:dataObj.userId,userToken:dataObj.userToken,type:type,time:time}
    })
    .done(function(reg) {
        // console.log(reg.statusCode.status)
        // console.log(reg)
        // console.log(stateCode)
        // console.log(stateCode.test(reg.statusCode.status))
        if(stateCode.test(reg.statusCode.status)){
            // alert(reg.statusCode.msg)
            // console.log(1)
            if(reg.statusCode.status==4444){
                dataarr=[];
                signInArr=[];
                Calendar.getCalendar(signInArr)
            }else{
                 jzm.Error(reg);
            }
        }else if(reg.statusCode.status==200){
            alert('签到失败'+reg.statusCode.msg)
            // $('.sign-in').html('签到完成')
        }else if(reg.statusCode.status==2061){
            signInArr.push($('.cur_day').html())
            $("#box").html(Calendar.getCalendar(signInArr));
            $('.sign-in').html('签到完成');
        }else{
            dateReg(reg.list);
            function dateReg(arr){
                dataarr=[];
                signInArr=[];
                if(arr!=null){
                    for(var i=0;i<arr.length;i++){
                        dataarr.push(arr[i].split('-'))
                        signInArr.push(dataarr[i][2])
                    }
                    // console.log(signInArr)
                    Calendar.getCalendar(signInArr)
                    Calendar.init(currentdate)
                    for(var i=0;i<arr.length;i++){
                        if(arr[i]==currentdate){
                            // console.log(1111)
                            $('.sign-in').html('签到完成')
                        }
                    }
                    return true;
                }
            }   
        }  
    })
    .fail(function(err) {
        // alert(err)
        jzm.Error(err);
        // console.log(err)
    })
};
// 签到的点击方法
function sign(){
    postatch(1,currentdate)
}

//上月//下月
function MonthPage(num){
    // alert('MonthPage')
    num==1?Calendar.previousMonth():Calendar.nextMonth();
    // $("#box").html(Calendar.getCalendar([]));
    // Calendar.getCalendar([])
    var str=$('h4').children('span').eq(1).html();
    // console.log(str.length)
    var dateStr=str.substr(0,4)+'-'+str.substr(5,str.length-6);
    postatch(2,dateStr);
    // Calendar.init(dateStr);   
}

   
