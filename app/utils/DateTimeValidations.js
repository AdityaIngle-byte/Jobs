export const dateFormatDDMMYYYY = (date) => {
    const d = new Date(date)
    const _date = d.getDate().toString().padStart(2,'0') + '-' + (d.getMonth()+1).toString().padStart(2,'0') + '-' + d.getFullYear()
    return _date
}


export const dateFormatMMDDYYYY = (date) => {
    const d = new Date(date)
    const _date =  (d.getMonth()+1).toString().padStart(2,'0') + '-' +d.getDate().toString().padStart(2,'0') + '-' + d.getFullYear()
    return _date
}


export const dateFormatYYYYMMDD = (date) => {
    const d = new Date(date)
    const _date =  d.getFullYear() + '-' + (d.getMonth()+1).toString().padStart(2,'0') + '-' +d.getDate().toString().padStart(2,'0')
    return _date
}



export const dateFormatOnChange = (value) =>{
    let val = value.replace(/[^\d\*]/g, '')
    let newVal = '';
    let sizes = [2, 2, 4];
    for (let i in sizes) {
        if (val.length > sizes[i]) {
            newVal += val.substr(0, sizes[i]) + '-';
            val = val.substr(sizes[i]);
            console.log(i,sizes)
        } else { 
            break; 
        }       
    }

    newVal += val;
    console.log('Date Format',newVal,value)
    return newVal
}



export const timeFormatAM_PM = (time) => {
    const d = new Date(time)
    let hour = d.getHours()
    let minute = d.getMinutes()
    let am_pm = 'AM';

    if(hour>11){
    am_pm = 'PM';
    if(hour>12){
        hour = hour - 12;
    }
    }

    if(hour == 0){
    hour = 12;
    }
    const _time = `${hour.toString().padStart(2,'0')}:${minute.toString().padStart(2,'0')} ${am_pm}` ;
    return _time
}




//  Expiry date Format
export const getEndTime = (time) =>{
    const hours = parseInt(time.substring(0,2))
    const minutes = parseInt(time.substring(3,5))
    let endHours = ''
    let AM_PM = time.substring(6,8)
    if(hours === 12){
        endHours = 1
    }else {
        endHours = hours + 1
    }
    if(hours === 11 && minutes > 0){
        if(AM_PM === 'PM'){
            AM_PM = 'AM'
        }else {
            AM_PM = 'PM'
        }
    }
    const endTime = `${endHours.toString().padStart(2,'0')}:${minutes} ${AM_PM}`

    return endTime
}


export const dateFormatWithDDMonthYYYY = date => {

    const d = new Date(date)
    // console.log(d.getDay())
    const format = `${d.getDate().toString().padStart(2,0)} ${getMonth(d.getMonth())}, ${d.getFullYear()}`
    return format;
}



export const getMonth = number => {
    switch (number) {
        case 0:
            return 'Jan';
        case 1:
            return 'Feb';
        case 2:
            return 'Mar';
        case 3:
            return 'Apr';
        case 4:
            return 'May';
        case 5:
            return 'Jun';
        case 6:
            return 'Jul';
        case 7:
            return 'Aug';
        case 8:
            return 'Sep';
        case 9:
            return 'Oct';
        case 10:
            return 'Nov';
        case 11:
            return 'Dec';
        default:
            return 'Unknown'
    }
}


export const getFullMonth = number => {
    switch (number) {
        case 0:
            return 'January';
        case 1:
            return 'February';
        case 2:
            return 'March';
        case 3:
            return 'April';
        case 4:
            return 'May';
        case 5:
            return 'June';
        case 6:
            return 'July';
        case 7:
            return 'August';
        case 8:
            return 'September';
        case 9:
            return 'October';
        case 10:
            return 'November';
        case 11:
            return 'December';
        default:
            return 'Unknown'
    }
}


export const getDiffInDaysFromToday = (date) => {
    const date1 = new Date();
    const date2 = new Date(date);
	const oneDay = 24 * 60 * 60 * 1000;  // 24 hours * 60 minutes * 60 seconds * 1000 milliseconds

    var diffDays = Math.abs((date1.getTime() - date2.getTime()) / (oneDay));
    return parseInt(diffDays);
    
}



export const getPreciseDateDiff = (date1, date2) => {
    let diff = Math.floor(date1.getTime() - date2.getTime());
    let day = 1000 * 60 * 60 * 24;
    let days = Math.floor(diff / day);
    let years = Math.floor(days / 365);
    let remDaysYear = days %  365
    let months = Math.floor(remDaysYear / 30);
    let remDays = remDaysYear %  30
    let message = ''
    if (years !== 0) {
        message += years + " years "
    }
    if (months !== 0) {
        message += months + " months "
    }    
    message += remDays + " days Ago"
    return message
}