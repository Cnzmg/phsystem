var dateArr = [];
// var date = new Date();
// var year = date.getFullYear(); //获取年
// var month = date.getMonth()+1; //月
// var day = date.getDate(); //日
var startYear = year - 2017;
var urlName = window.location.pathname;
console.log(urlName)

for (var y = 0; y <= startYear; y++) {
    dateArr.push({
        'id': y + 1,
        'value': 2017 + y + '年',
        'childs': []
    });
    for (var m = 1; m <= 12; m++) {
        var mNum = m < 10 ? '0' + m : m;
        dateArr[y].childs.push({
            'id': m,
            'value': mNum + '月',
            'childs': []
        });
        for (var d = 1; d <= dateThisWeek(m, 2017 + y); d++) {
            // console.log(dateArr)
            var dNum = d < 10 ? '0' + d : d;
            dateArr[y].childs[m - 1].childs.push({
                'id': d,
                'value': dNum + '日'
            });
        }
    }
};
console.log(dateArr)

//判断平年还是润年
function dateIsLeap(theYear) {
    if (theYear % 4 == 0 && theYear % 100 > 0) {
        return true;
    }
    if (theYear % 400 == 0 && theYear % 3200 > 0) {
        return true;
    }
    return false;
};

//大小月
function dateThisWeek(last_month, theYear) {
    // last_month = (month-1)<10 ? '0'+(month-1) : (month-1);
    if (last_month == 2) {
        // isLeap(theYear) ? return 29 : return 28;
        if (dateIsLeap(theYear)) {
            // console.log('2月润年')
            return 29;
        } else {
            // console.log('2月平年')
            return 28;
        }
    } else if (last_month < 8) {
        if (last_month % 2 > 0) {
            // console.log('8月份以下的大月')
            return 31;
        } else {
            // console.log('8月份以下的小月')
            return 30;
        }
    } else {
        if (last_month % 2 > 0) {
            // console.log('8月份以上的小月')
            return 30;
        } else {
            // console.log('8月份以上的大月')
            return 31;
        }
    }
};
console.log(date)

var mobileSelect4 = new MobileSelect({
    trigger: '#startTime',
    title: '选择日期',
    wheels: [
        { data: dateArr }
    ],
    position: [startYear, month-1, day - 1],
    transitionEnd: function (indexArr, data) {
        //console.log(data);
    },
    callback: function (indexArr, data) {
        // console.log(data);
        $('#startTime').html(data[0].value.split('年')[0] + '-' + data[1].value.split('月')[0] + '-' + data[2].value.split('日')[0])
        if (urlName == '/phsystem/machine-sales-information.html') {
            dateSearch(3)
        } else if (urlName == '/phsystem/maintenance_center.html') {
            dateSearch(1)
        } else if (urlName == '/phsystem/' || urlName == '/phsystem/index.html') {
            dateSearch(1)
        } else {
            dateSearch()
        }
        // dateSearch()
        // data[0].value;
    }
});

var mobileSelect5 = new MobileSelect({
    trigger: '#endTime',
    title: '选择日期',
    wheels: [
        { data: dateArr }
    ],
    position: [startYear, month-1, day - 1],
    transitionEnd: function (indexArr, data) {
        console.log(data);
    },
    callback: function (indexArr, data) {
        console.log(indexArr);
        // data[0].value;
        // console.log(window.location.pathname)
        $('#endTime').html(data[0].value.split('年')[0] + '-' + data[1].value.split('月')[0] + '-' + data[2].value.split('日')[0])
        if (urlName == '/phsystem/machine-sales-information.html') {
            dateSearch(3)
        } else if (urlName == '/phsystem/maintenance_center.html') {
            dateSearch(1)
        } else if (urlName == '/phsystem/' || urlName == '/phsystem/index.html') {
            dateSearch(1)
        } else {
            dateSearch()
        }
    }
});
