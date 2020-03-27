
const calculateTime = (time, time2,time_separator,time2_separator) => {

    let timearr = time.split(time_separator)
    let timearr2 = time2.split(time2_separator)

    let date = new Date()

    let nowyear = date.getFullYear()
    let nowmonth = date.getMonth() + 1
    let today = date.getDate()
    let nowhour = date.getHours()
    let nowminute = date.getMinutes()

    if (nowyear - timearr[0] == 1) {
        return `去年`
    } else if(nowyear - timearr[0] > 1){
        return `${timearr[0]}年` //超过一年返回具体年份
    }else { //今年
        let month_interval = nowmonth - timearr[1] //月间隔
        if (month_interval > 0 && month_interval <= 3) {
            return `${month_interval}个月前`
        } else if(month_interval > 3){
            return `${timearr[1]}月${timearr[2]}日`  //超过3个月返回具体月份
        }else { //这个月
            let date_interval = today - timearr[2] //日间隔
            if (date_interval == 1) {  //昨天
                return `昨天`
            } else if (date_interval > 1 && date_interval <= 3) {  //两天前、三天前
                return `${date_interval}天前`
            } else if(date_interval > 3){
                return `${timearr[1]}月${timearr[2]}日`  //超过3天返回具体日期
            }else { //今天
                let hour_interval = nowhour - timearr2[0] //小时间隔
                if (hour_interval > 0) {
                    return `${hour_interval}小时前`
                } else { //这个小时
                    let minute_interval = nowminute - timearr2[1] //分钟间隔
                    if (minute_interval > 0) {
                        return `${minute_interval}分钟前`
                    } else {
                        return `刚刚`
                    }
                }
            }
        }
    }
}

/**参数：time, time2,time_separator,time2_separator
 * 示例：
 * time = "2020/3/26"
 * time2 = '9:20:23'
 * time_separator = '/'
 * time2_separator = ';'
 * let ymd = "2020/3/26"
   let hms = '9:20:23'
   let ymd_separator = '/'  //年月日分隔符
   let hms_separator = ';'  //时分秒分隔符

   let time_interval = calculateTime(ymd,hms,ymd_separator,hms_separator)
   console.log(time_interval) 
 */

export default {
	calculateTime
}

 
