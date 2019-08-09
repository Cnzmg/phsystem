var Calendar = {
    // _today : new Date(),
    _date : new Date().getDate(),
    _day : new Date().getDay(),
    _month : new Date().getMonth() + 1,
    _year : new Date().getFullYear(),
    setYear:function(time){
        this._year = new Date(time.replace(/-/g, "/")).getFullYear();
        // console.log( this._year+'年')
    },
    setMonth:function(time){
        this._month = new Date(time.replace(/-/g, "/")).getMonth() + 1;
    },
    setDate:function(time){
        this._date = new Date(time.replace(/-/g, "/")).getDate();
        // console.log(this._date+'日')
    },
    setDay:function(time){
        this._day = new Date(time.replace(/-/g, "/")).getDay();
        // console.log('星期'+this._day)
    },
    // 今日的日期
    init:function(curDate){
        this.setDate(curDate);
        this.setDay(curDate);
        this.setMonth(curDate);
        this.setYear(curDate);
        this.isLeap();
    },
    // 判断平年还是闰年
    isLeap:function(){
        // alert('isLeap')
        var year = this._year;
        if (year % 4 == 0 && year % 100 > 0) {
            return true;
        }
        if (year % 400 == 0 && year % 3200 > 0) {
            return true;
        }
        return false;
    },
    //判断大小月
    getLen:function(){
        if (this._month == 2) {
            if (this.isLeap()) {
                return 29;
            }
            return 28;
        }
        if (this._month < 8) {
            if (this._month % 2 > 0) {
                return 31;
            }
            return 30;
        }
        if (this._month % 2 > 0) {
            return 30;
        }
        return 31;
    },
    // 生成表格
    getCalendar : function(events) {
        // alert('getCalendar')
        // console.log(events)
        //获取大小月
        var len = this.getLen();
        // console.log('len:'+len);
        var date = new Date();
        //获取当前月
        var month = date.getMonth()+1;
        // 获取当日
        var day = date.getDate();
        // 获取当前年
        var year = date.getFullYear();
        // console.log(this._year)
        var d = new Date(this._year, this._month - 1, 1);
        
        // console.log(month)
        var dfw = d.getDay();
        // console.log('dfw：'+dfw);
        var arr = new Array();
        // console.log(arr)
        var tem = 0;
        var str = "";
        for (var i = 0; i < 6; i++) {
            arr[i] = new Array();
            // console.log( arr[i])
            // console.log('arr[i]:'+arr[i])
            for (var j = 0; j < 7; j++){
                tem++;
                // console.log('tem:'+tem)
                // console.log('dfw:'+dfw)
                if (tem - dfw > 0 && tem - dfw <= len) {
                    arr[i][j] = tem - dfw;
                } else {
                    arr[i][j] = "";
                }
            }
        }
        str += '<h4><span class="previousMonth" onclick="MonthPage(1)">上月</span><span class="date">'+this._year+'年'+ this._month + '月</span><span class="nextMonth" onclick="MonthPage(2)">下月</span></h4>';//标题
        str += '<table class="sign_tab" border="0px" cellpadding="0px" cellspacing="0px">';
        str += '<thread><tr><th>周日</th><th>周一</th><th>周二</th><th>周三</th><th>周四</th><th>周五</th><th>周六</th></tr></thread>';
        str += '<tbody id="sign_tab" >';
        for (var k = 0; k < 6; k++) {
            if (k == 5 && arr[k][0] == "")
                continue;
            str += '<tr>';
            for (var m = 0; m < arr[k].length; m++) {
                // console.log(arr[k][m])
                if(events.contains(arr[k][m])){
                    str += '<td class="red_tbg">' + arr[k][m] + '</td>';
                }else{
                    //判断是不是当前月份的今日
                    if(arr[k][m] == this._date&&this._month==month&&this._year==year){
                        str += '<td class="cur_day" onclick="sign()">' + arr[k][m] + '</td>';
                        continue;
                    }
                    if(arr[k][m] == ""){
                        str += '<td class="over">' + arr[k][m] + '</td>';
                        continue;
                    }
                    str += '<td>' + arr[k][m] + '</td>';
                }
            }
            str += '</tr>';
        }
        str += '</tbody>';
        str += '</table>';
        if(this._month==month&&this._year==year){
            str += '<div class="sign-in" onclick="sign()">立即签到</div>';
        }
        $("#box").html(str);
    },
    nextMonth : function() {
        // alert('nextMonth')
        if (this._month == 12) {
            this._year++;
            this._month = 0;
        }
        this._month++;
        this.isLeap();
        this.getCalendar([]);
    },
    nextYear : function() {
        this._year++;
    },
    previousMonth : function() {
        // alert('previousMonth')
        if (this._month == 1) {
            this._year--;
            this._month = 13;
        }
        this._month--;
        this.isLeap();
        this.getCalendar([]);
    },
    previousYear : function() {
        this._year--;
    }
};
// 判断对象是否已经在数组
Array.prototype.contains = function(element) {
    for (var i = 0; i < this.length; i++) {
        if (this[i] == element) {
            return true;
        }
    }
    return false;
};