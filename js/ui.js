var date = new Date();
var year = date.getFullYear();
// console.log(year)
var month = date.getMonth()<10 ? '0'+(date.getMonth() + 1):(date.getMonth() + 1);
// console.log(month)
var day = date.getDate()<10 ? '0'+date.getDate() : date.getDate();
// console.log(day)
var week = date.getDay();
// console.log(week)
var year = date.getFullYear();
var currentdate =  date.getFullYear() + "-" + month+'-'+day;
//机器信息和状态的跳转事件如果状态值为空获取0时不跳转
jzm.incident=function(){
	// console.log(111)
	$('.faults').click(function(){
		  var faults = $('#Number_of_faults').children('span').eq(0).html();
		  if(faults>0&&faults!=''){
		  	window.location.href='./number-of-faults.html?val1=1&type=1';
		  }else{
		  	return true;
		  	// console.log($('#Number_of_faults').children('span').eq(0).html())
		  }
	});

	$('.off-line').click(function(){
		// console.log(111)
		var off_line = $('#off_line_number').children('span').eq(0).html()
		if(off_line>0&&off_line!=''){
			window.location.href='./off-line.html?val=1&type=1';
		}else{
			return true;
			// console.log($('#off_line_number').children('span').eq(0).html())
		}
		// href="./off-line.html?val=1&type=1"
	});

	$('.quantity').click(function(){
		// console.log(111)
		var quantity =$('#lack_of_quantity').children('span').eq(0).html()
		if(quantity>0&&quantity!=''){
			window.location.href='./lack-of-quantity.html?val2=1&type=1';
		}else{
			return true;
			// console.log($('#lack_of_quantity').children('span').eq(0).html())
		}
		// href="./lack-of-quantity.html?val2=1&type=1"
	});
};
//日期区间搜索
function dateSearch(num){
		// alert(e);
		// alert(1)
		var time= setInterval(function(){
		// console.log(111)
		var startTime=$('#startTime').val()||false;
		var endTime = $('#endTime').val()||false;
		console.log(startTime!=false&&endTime!=false)
		if(num==1){
			if(startTime!=false&&endTime!=false){
				jzm.toList(startTime,endTime)
       			jzm.machineBest(1,null,startTime,endTime)
       			clearInterval(time)
				console.log('关1')
			}else{
	     		return false
			}
		}else if(num==2){
			if(startTime!=false&&endTime!=false){
				jzm.machineBest(2,null,startTime,endTime)
				clearInterval(time)
				console.log('关2')
			}else{
	     		return false
			}
		}else if(num==3){
			if(startTime!=false&&endTime!=false){
				jzm.detailSold(startTime,endTime)
				clearInterval(time)
				console.log('关3')
			}else{
	     		return false
			}
		}else{
			if(startTime!=false&&endTime!=false){
				jzm.toList(startTime,endTime)
				clearInterval(time)
				console.log('关4')
			}else{
	     		return false
			}
		}
	},500);
};
// 所有商户的全部本月本周今天的销售情况
function date_Search(ev){
	var ev = ev || window.event;
    var target = ev.target || ev.srcElement;
    if(target.nodeName.toLowerCase() == 'button'){
    	// target.className
    	switch(target.className){
    		// 全部
    		case 'all':
    			// console.log(1)
				jzm.toList(null,null)
				$('.all').addClass('index').siblings().removeClass('index')
				$('#startTime').val('')
				$('#endTime').val('')
			break;
			// 本月
			case 'this-m':
    			var this_month =  date.getFullYear() + "-" + month+'-01';
				jzm.toList(this_month,currentdate)
				$('.this-m').addClass('index').siblings().removeClass('index')
				$('#startTime').val(this_month)
				$('#endTime').val(currentdate)
			break;
			// 本周
			case 'this-k':
				// console.log((day-week+1)+31)
				var last_day = 0,last_month=0;
				if((day-week+1)<=0&&(month-1)>0){
					 last_month = (month-1)<10 ? '0'+(month-1) : (month-1);
					if (last_month == 2) {
						if(isLeap()){
							// console.log('2月润年')
			         		this_week =   date.getFullYear() + '-' +  last_month + '-' +((day-week+1)+29);
						}else{
							// console.log('2月平年')
							this_week =   date.getFullYear() + '-' +  last_month + '-' +((day-week+1)+28);
						}			    
			        }else if (last_month < 8) {
			            if (last_month % 2 > 0) {
			            	// console.log('8月份以下的大月')
			               this_week =   date.getFullYear() + '-' +  last_month + '-' +((day-week+1)+31);
			            }else{
			            	// console.log('8月份以下的小月')
			            	this_week =   date.getFullYear() + '-' +  last_month + '-' +((day-week+1)+30);
			            }   
			        }else{
			        	 if (last_month % 2 > 0) {
			        	 	// console.log('8月份以上的小月')
				          	 this_week =   date.getFullYear() + '-' +  last_month + '-' +((day-week+1)+30);
				        }else{
				        	// console.log('8月份以上的大月')
				        	this_week =   date.getFullYear() + '-' +  last_month + '-' +((day-week+1)+31);
				        }
			        }
				}else if((day-week+1)<0&&(month-1)<=0){
					// last_year
					this_week = (year-1) +'-'+12+'-'+((day-week+1)+31);
				}else{
					var Day = (day-week+1)<10 ? '0'+(day-week+1) : (day-week+1)
					// console.log(Day<0)
	    			this_week = date.getFullYear() + "-" + month+'-'+Day;
	    			// console.log(this_week)
				}
    			// console.log(this_week)
				jzm.toList(this_week,currentdate)
				$('.this-k').addClass('index').siblings().removeClass('index')
				$('#startTime').val(this_week)
				$('#endTime').val(currentdate)
			break;
			// 今日
			case 'today':
    			// console.log(1)
				jzm.toList(currentdate,currentdate)
				$('.today').addClass('index').siblings().removeClass('index')
				$('#startTime').val(currentdate)
				$('#endTime').val(currentdate)
			break;
    	}
	}
};
//某个商户的全部本月本周今天机器的销售情况
function commercial_Search(ev){
	var ev = ev || window.event;
    var target = ev.target || ev.srcElement;
    if(target.nodeName.toLowerCase() == 'button'){
    	// target.className
    	switch(target.className){
    		// 全部
    		case 'all':
    			console.log(1)
				jzm.machineBest(2,null,null,null)
				$('.all').addClass('index').siblings().removeClass('index')
				$('#startTime').val('')
				$('#endTime').val('')
			break;
			// 本月
			case 'this-m':
    			var this_month =  date.getFullYear() + "-" + month+'-01';
				jzm.machineBest(2,null,this_month,currentdate)
				$('.this-m').addClass('index').siblings().removeClass('index')
				$('#startTime').val(this_month)
				$('#endTime').val(currentdate)
			break;
			// 本周
			case 'this-k':
        		// console.log((day-week+1)+31)
				var last_day = 0,last_month=0;
				if((day-week+1)<=0&&(month-1)>0){
					 last_month = (month-1)<10 ? '0'+(month-1) : (month-1);
					if (last_month == 2) {
						if(isLeap()){
			         		this_week =   date.getFullYear() + '-' +  last_month + '-' +((day-week+1)+29);
						}else{
							this_week =   date.getFullYear() + '-' +  last_month + '-' +((day-week+1)+28);
						}			    
			        }else if (last_month < 8) {
			            if (last_month % 2 > 0) {
			               this_week =   date.getFullYear() + '-' +  last_month + '-' +((day-week+1)+31);
			            }else{
			            	this_week =   date.getFullYear() + '-' +  last_month + '-' +((day-week+1)+30);
			            }   
			        }else{
			        	 if (last_month % 2 > 0) {
				          	 this_week =   date.getFullYear() + '-' +  last_month + '-' +((day-week+1)+30);
				        }else{
				        	this_week =   date.getFullYear() + '-' +  last_month + '-' +((day-week+1)+31);
				        }
			        }
				}else if((day-week+1)<0&&(month-1)<=0){
					// last_year
					this_week = (year-1) +'-'+12+'-'+((day-week+1)+31);
				}else{
					var Day = (day-week+1)<10 ? '0'+(day-week+1) : (day-week+1)
					console.log(Day<0)
	    			this_week = date.getFullYear() + "-" + month+'-'+Day;
	    			// console.log(this_week)
				}
				console.log(this_week)
				jzm.machineBest(2,null,this_week,currentdate)
				$('.this-k').addClass('index').siblings().removeClass('index')
				$('#startTime').val(this_week)
				$('#endTime').val(currentdate)
			break;
			// 今日
			case 'today':
    			// console.log(1)
				jzm.machineBest(2,null,currentdate,currentdate)
				$('.today').addClass('index').siblings().removeClass('index')
				$('#startTime').val(currentdate)
				$('#endTime').val(currentdate)
			break;
    	}
    }
};
//机器每款产品全部本月本周今天的销售情况
function information_Search(ev){
	// console.log(event)
	var ev = ev || window.event;
    var target = ev.target || ev.srcElement;
    if(target.nodeName.toLowerCase() == 'button'){
    	// target.className
    	switch(target.className){
    		// 全部
    		case 'all':
    			console.log(1)
				jzm.detailSold(null,null)
				$('.all').addClass('index').siblings().removeClass('index')
				$('#startTime').val('')
				$('#endTime').val('')
			break;
			// 本月
			case 'this-m':
    			var this_month =  date.getFullYear() + "-" + month+'-01';
				jzm.detailSold(this_month,currentdate)
				$('.this-m').addClass('index').siblings().removeClass('index')
				$('#startTime').val(this_month)
				$('#endTime').val(currentdate)
			break;
			// 本周
			case 'this-k':
				// console.log((day-week+1)+31)
				var last_day = 0,last_month=0;
				if((day-week+1)<=0&&(month-1)>0){
					 last_month = (month-1)<10 ? '0'+(month-1) : (month-1);
					if (last_month == 2) {
						if(isLeap()){
			         		this_week =   date.getFullYear() + '-' +  last_month + '-' +((day-week+1)+29);
						}else{
							this_week =   date.getFullYear() + '-' +  last_month + '-' +((day-week+1)+28);
						}			    
			        }else if (last_month < 8) {
			            if (last_month % 2 > 0) {
			               this_week =   date.getFullYear() + '-' +  last_month + '-' +((day-week+1)+31);
			            }else{
			            	this_week =   date.getFullYear() + '-' +  last_month + '-' +((day-week+1)+30);
			            }   
			        }else{
			        	 if (last_month % 2 > 0) {
				          	 this_week =   date.getFullYear() + '-' +  last_month + '-' +((day-week+1)+30);
				        }else{
				        	this_week =   date.getFullYear() + '-' +  last_month + '-' +((day-week+1)+31);
				        }
			        }
				}else if((day-week+1)<0&&(month-1)<=0){
					// last_year
					this_week = (year-1) +'-'+12+'-'+((day-week+1)+31);
				}else{
					var Day = (day-week+1)<10 ? '0'+(day-week+1) : (day-week+1)
					// console.log(Day<0)
	    			this_week = date.getFullYear() + "-" + month+'-'+Day;
	    			// console.log(this_week)
				}
    			// console.log(this_week)
				jzm.detailSold(this_week,currentdate)
				$('.this-k').addClass('index').siblings().removeClass('index')
				$('#startTime').val(this_week)
				$('#endTime').val(currentdate)
			break;
			// 今日
			case 'today':
    			// console.log(1)
				jzm.detailSold(currentdate,currentdate)
				$('.today').addClass('index').siblings().removeClass('index')
				$('#startTime').val(currentdate)
				$('#endTime').val(currentdate)
			break;
    	}
    }
};
//判断平年还是润年
function isLeap(){
    if (year % 4 == 0 && year % 100 > 0) {
        return true;
    }
    if (year % 400 == 0 && year % 3200 > 0) {
        return true;
    }
    return false;
};
window.onload=function(){
	var window_List_H =Math.round($(window).height()-$('.message').height()-$('.header-box').height());
	setTimeout(function(){
		var list_H = $('#list').height();
		if(window_List_H<list_H){
			$('footer').css('display','block');
		}else{
			$('footer').css('display','none');
		}
	},500);
	$(window).scroll(function(){
		$('footer').css('display','none');
		var top_H =Math.round($('.message').height());
		// console.log(top_H)
		var topGg= document.body.scrollTop||document.documentElement.scrollTop;
		// console.log(topGg)
		if(topGg>top_H){
			$('.header').css({'position':'fixed','top':'0'});
		}else{
			$('.header').css('position','relative');
		};
	});
	//搜索 
	jzm.search=function(num){
		// if(num==1){
			var commercial_val = $('#search').children('input').val()
			var patrn = /[`~!@#$%^&*()_\-+=<>?:"{}|,.\/;'\\[\]·~！@#￥%……&*（）——\-+={}|《》？：“”【】、；‘’，。、]/im; 
			var re = /^[0-9]+.?[0-9]*/
			var reg = /^[0-9a-zA-Z]+$/
			console.log(patrn.test(commercial_val))
			// if(re.test(commercial_val))
			if(commercial_val==''){
					// alert('请输入商户ID')
					return false;
			}else if(re.test(commercial_val)&&!patrn.test(commercial_val)){
				if(commercial_val.length>11){
					return false;
				}else{
					console.log('纯数字“：'+commercial_val.length)
					window.location="./commercial.html?val="+commercial_val;
				}
				
			}else if(reg.test(commercial_val)&&!patrn.test(commercial_val)){
				if(commercial_val.length>20){
					return false;
				}else{
					window.location="./maintenance_center.html?name="+commercial_val;
					console.log('英文加数字：'+commercial_val.length)
					console.log(reg.test(commercial_val))
				}
				
			}else{
				return false
			}
	};
	//分页带省略号
	jzm.pageBtn =function(page,pageCount){
		// page 是当前的页数 pageCount是总页数
		var btn =$('.btn-num').children('button').length; //按钮的个数
		var index=$('.btn-num').children('button').eq(3).index(); 
		// console.log(index)
		if(btn>5){
			if(page>=index&&page<pageCount-1){
				// console.log('if1:'+page)
				for(var i=index;i<btn-1;i++){
					$('.btn-num').children('button').eq(i).hide();
				}
				if(page>index&&page<pageCount-2){
					$('.btn-num').children('button').eq(0).after('<span>...</span>');
					$('.btn-num').children('button').eq(page).after('<span>...</span>');
				}else if(page>=pageCount-2){
					$('.btn-num').children('button').eq(0).after('<span>...</span>');
				}else{
					$('.btn-num').children('button').eq(page).after('<span>...</span>');
				}
				$('.btn-num').children('button').eq(page).show();
				$('.btn-num').children('button').eq(1).html(page-1);
				$('.btn-num').children('button').eq(2).html(page);
				$('.btn-num').children('button').eq(2).addClass('btn');
			}else if(page>=pageCount-1){
				console.log('page:'+page)
				console.log(pageCount-1)
				//页数在倒数第一页或者倒数第二页的时候，倒数第一页和倒数第二页之间不再显示省略号
				for(var i=index;i<btn-2;i++){
					$('.btn-num').children('button').eq(i).hide();
				}
				$('.btn-num').children('button').eq(0).after('<span>...</span>');
				$('.btn-num').children('button').eq(page-2).hide();
				$('.btn-num').children('button').eq(page).show();
				$('.btn-num').children('button').eq(1).html(page-2);
				$('.btn-num').children('button').eq(2).html(page-1);
				$('.btn-num').children('button').eq(page-1).addClass('btn');
			}else{
				// console.log('if3:'+page)
				//分页大于5页时第4页开始变成省略号只显示第1页第2页和最后一页
				for(var i=index;i<btn-1;i++){
					$('.btn-num').children('button').eq(i).hide();
				}
				$('.btn-num').children('button').eq(index).after('<span>...</span>');
				$('.btn-num').children('button').eq(page-1).addClass('btn');
			};
		}else{
			$('.btn-num').children('button').eq(page-1).addClass('btn');
		};
	};

	jzm.state = function(num){
		console.log(num)
		if($('#list').children('div').eq(num).children('ul').children('#state-box').attr('index') == 0){
			$('#list').children('div').eq(num).children('ul').children('#state-box').show();
			$('#list').children('div').eq(num).children('ul').children('#state-box').attr('index','1')
		}else{
			$('#list').children('div').eq(num).children('ul').children('#state-box').hide();
			$('#list').children('div').eq(num).children('ul').children('#state-box').attr('index','0')
		}
		
		// console.log($('#list').children('div').eq(num).children('ul').children('li').children('.state').attr('index'))
	}
};
