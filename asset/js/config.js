//正式服
// var httpJoin = "http://120.79.53.95:8080/";
// var localURL = "http://39.108.88.107:8081/phsystem/";
//测试服
var httpJoin = "http://test.cbCoffee.cn:8080/";
var localURL = "http://test.cbCoffee.cn:8086/phsystem/";
var wxUri = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx71c7dc4f5208bb07&redirect_uri=http://www.cbcoffee.cn/sharedcoffee/tran/transfer.html&response_type=code&scope=snsapi_userinfo&state=' + window.location.href;

//公用工具
var jzm = new Object();
var zmpaths,num = 0;
var statusCode = "400|1004|1003|997|1005|999|2068|4444";
var stateCode = new RegExp(statusCode);
jzm.paraMessage = function(msg,data){
  return new jzm[msg](data);
};
jzm.getQueryString = function(name)
{
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return unescape(r[2]);
    return null;
}
jzm.compilestr = function(str){
    var c = String.fromCharCode(str.charCodeAt(0) + str.length);
    for(var i = 1; i <str.length; i++)
    {
        c += String.fromCharCode(str.charCodeAt(i) + str.charCodeAt(i-1));
    }
     return escape(c);
};

jzm.getQueryToken = function (){
  $.ajax({
    url:httpJoin + "phone_login",
    type:"POST",
    async:false,
    dataType:"JSON",
    data:{code:jzm.getQueryString("code"),url:window.location.pathname.split('?')[0]}
  })
  .done(function(reg) {
      stateCode.test(reg.statusCode.status) ? jzm.Error(reg) : sessionStorage.setItem("token",JSON.stringify({token:jzm.compilestr(reg.userToken),id:jzm.compilestr(reg.userId.toString()),uri:jzm.compilestr(window.location.pathname.split('?')[0])}));
  })
  .fail(function(err) {
      jzm.Error(err);
  })

};
jzm.Error = function (err){   //错误信息
    console.log(err);
    document.write(err.statusCode.msg);
    // mBox.open({
	  //   content: '网络异常!',
	  //   time: 3 //3秒后自动关闭
    // });
    // err.statusCode.status == 4444 ? document.write(err.statusCode.msg) : window.location.href = "./asset/html/404.html?uri=" + encodeURI(window.location.href.split('?')[0]);
};
sessionStorage.getItem("token") ? null : (!jzm.getQueryString("code") ? window.location.href = wxUri : jzm.getQueryToken());    //授权登陆
var _self = JSON.parse(sessionStorage.getItem("token"));

Function.prototype.before = function (fn){
  var __self = this;
  return function(){
    __self.apply(__self, arguments);
    fn.apply(this, arguments);
  };
};
Function.prototype.after = function (fn){
  var __self = this;
  return function(){
    fn.apply(this, arguments);
    __self.apply(__self, arguments);
  };
};
jzm.uncompilestr = function(code){
    code = unescape(code);
    var c = String.fromCharCode(code.charCodeAt(0) - code.length);
    for(var i = 1;i < code.length; i++)
    {
        c +=String.fromCharCode(code.charCodeAt(i) - c.charCodeAt(i-1));
    }
    return c;
};
//时间戳
jzm.getTimeStamp = function(timeStamp){
  var stamp = new Date(timeStamp);
  var Y = stamp.getFullYear() + '/',M = (stamp.getMonth() + 1 < 10 ? '0' + (stamp.getMonth() + 1) : stamp.getMonth() + 1) + '/',D = (stamp.getDate() < 10 ? '0' + (stamp.getDate()) : stamp.getDate()) + ' ',h = (stamp.getHours() < 10 ? '0' + stamp.getHours() : stamp.getHours()) + ':',m = (stamp.getMinutes() < 10 ? '0' + stamp.getMinutes() : stamp.getMinutes()) + ':',s = (stamp.getSeconds() < 10 ? '0' + stamp.getSeconds() : stamp.getSeconds());
  return Y + M + D + h + m + s;
};

//mBox v2.0 弹层组件移动版
!function(a,b){"function"==typeof define&&define.amd?define(["mBox"],b):"object"==typeof exports?module.exports=b(require("mBox")):a.mBox=b(a.mBox)}(this,function(a){function o(a,b,c,d,e){b&&b.parentNode?b.parentNode.insertBefore(a,b.nextSibling):c&&c.parentNode?c.parentNode.insertBefore(a,c):d&&d.appendChild(a),a.style.display="block"==e?"block":"none",this.backSitu=null}var f,i,j,k,l,m,g,h,n,b=function(a){return document.querySelectorAll(a)},c=document,d={};return b.prototype,d.timer={},d.endfun={},d.extend=function(a,b,c){void 0===c&&(c=!0);for(var d in b)!c&&d in a||(a[d]=b[d]);return a},d.oneven=function(a,b){var c;return/Android|iPhone|SymbianOS|Windows Phone|iPad|iPod/.test(navigator.userAgent)?(a.addEventListener("touchmove",function(){c=!0},!1),a.addEventListener("touchend",function(a){a.preventDefault(),c||b.call(this,a),c=!1},!1),void 0):a.addEventListener("click",function(a){b.call(this,a)},!1)},f={width:"",height:"",boxtype:0,title:[],content:"请稍等,暂无内容！",conStyle:"background-color:#fff;",btnName:[],btnStyle:[],yesfun:null,nofun:null,closefun:null,closeBtn:[!1,1],time:null,fixed:!0,mask:!0,maskClose:!0,maskColor:"rgba(0,0,0,0.5)",padding:"10px 10px",zIndex:1e4,success:null,endfun:null},g=1,h=["jembox"],n=function(a){var b=this,c=JSON.parse(JSON.stringify(f));b.config=d.extend(c,a),i=b.config.content,i&&1===i.nodeType&&(m=document.defaultView.getComputedStyle(i,null).display,j=i.previousSibling,k=i.nextSibling,l=i.parentNode),b.viewInit()},n.prototype={viewInit:function(){var k,l,m,n,o,p,q,r,s,a=this,d=a.config,e=c.createElement("div"),f=d.mask?'<div class="jemboxmask" style="pointer-events:auto;background-color:'+d.maskColor+';"></div>':"",i=function(){var a="object"==typeof d.title,b=void 0!=d.title[1]?d.title[1]:"";return""!=d.title?'<div class="jemboxhead" id="head'+g+'" style="'+b+'">'+(a?d.title[0]:d.title)+"</div>":""}(),j=function(){var c,f,h,i,a=d.btnName,b=a.length,e="width:50%;";return 0!==b&&d.btnName?(1===b&&(f=""!=d.btnStyle?"width:100%;"+d.btnStyle[0].replace(/\s/g,""):"width:100%;",c='<span onytpe="1" style="'+f+'">'+a[0]+"</span>"),2===b&&(h=void 0!=d.btnStyle[0]?e+d.btnStyle[0]:e,i=void 0!=d.btnStyle[1]?e+d.btnStyle[1]:e,c='<span onytpe="0" style="'+i+'">'+a[1]+'</span><span onytpe="1" style="'+h+'">'+a[0]+"</span>"),'<div class="jemboxfoot" id="foot'+g+'">'+c+"</div>"):""}();k=""!=d.width?"width:"+d.width+";":"",l=""!=d.height?"height:"+d.height+";":"",a.id=e.id=h[0]+g,e.setAttribute("class","jemboxer "+h[0]+(d.boxtype||1)),e.setAttribute("style","z-index:"+d.zIndex),e.setAttribute("jmb",g),e.innerHTML=f+'<div class="jemboxmain" '+(d.fixed?"":'style="position:static;"')+'><div class="jemboxsection">'+'<div class="jemboxchild" style="'+k+l+d.conStyle+'">'+i+'<span class="jemboxclose0'+d.closeBtn[1]+'" style="display:'+(d.closeBtn[0]?"block":"none")+'"></span>'+'<div class="jemboxmcont" style="padding:'+d.padding+';"></div>'+j+"</div>"+"</div></div>",c.body.appendChild(e),""!=d.height&&(m=b("#"+a.id+" .jemboxmcont")[0],n=""!=d.title?b("#head"+g)[0].offsetHeight:0,o=0!=d.btnName.length?b("#foot"+g)[0].offsetHeight:0,p=/^\d+%$/.test(d.height.toString())?parseInt(document.documentElement.clientHeight*(d.height.replace("%","")/100)):parseInt(fixH.replace(/\px|em|rem/g,"")),q=m.style.paddingTop.replace(/\px|em|rem/g,""),r=m.style.paddingBottom.replace(/\px|em|rem/g,""),m.style.overflow="auto",m.style.height=p-n-o-q-r+"px"),s=a.elem=b("#"+a.id)[0],setTimeout(function(){try{b("#"+a.id+" .jemboxchild")[0].classList.add("jemboxanim")}catch(c){return}d.success&&d.success(s)},1),a.idx=g++,a.contype(d),a.action(d)},contype:function(a){var g,d=this,e=b("#"+d.id+" .jemboxmcont")[0],f=a.content;return d._elemBack&&d._elemBack(),void 0===f?e:("string"==typeof f?e.innerHTML=a.content:f&&1===f.nodeType&&(g=c.createElement("div"),"none"==window.getComputedStyle(f,null).display&&(f.style.display="block"),e.appendChild(g.appendChild(f))),void 0)},action:function(c){var f,g,h,i,e=this;if(c.time&&(d.timer[e.idx]=setTimeout(function(){a.close(e.idx)},1e3*c.time)),c.closeBtn[0]&&(f=b("#"+e.id+" .jemboxclose0"+c.closeBtn[1])[0],d.oneven(f,function(){c.closefun&&c.closefun(),a.close(e.idx)})),""!=c.btnName)for(g=b("#"+e.id+" .jemboxfoot")[0].children,h=0;h<g.length;h++)d.oneven(g[h],function(){var b=this.getAttribute("onytpe");0==b?c.nofun&&c.nofun():c.yesfun&&c.yesfun(e.idx),a.close(e.idx)});c.mask&&c.maskClose&&(i=b("#"+e.id+" .jemboxmask")[0],d.oneven(i,function(){a.close(e.idx,c.endfun)})),c.endfun&&(d.endfun[e.idx]=c.endfun)}},a={idx:g,version:"2.0",cell:function(a){return b(a)[0]},open:function(a){var b=new n(a||{});return b.idx},close:function(a){var e=b("#jembox"+a)[0];e&&(i&&1===i.nodeType&&o(i,j,k,l,m),c.body.removeChild(e),clearTimeout(d.timer[g]),delete d.timer[g],"function"==typeof d.endfun[g]&&d.endfun[g](),delete d.endfun[g])},closeAll:function(){var d,c=b(".jemboxer");for(d=0;d<c.length;d++)a.close(c[d].getAttribute("jmb"))}}});
