// import { skillsList } from "../values/skillsList"

export const emailCheck = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
export const passwordCheck = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})");


// export const createSkills = () => {
//     const list = []
//     skillsList.forEach((item,index) => {
//         const data = {
//             'id' : index+1,
//             'skill' : item.skill,
//             'isSelected' : false
//         }
//         list.push(data)
//     })
//     console.log(JSON.stringify(list))
// }


export const generateRandomString = (length) => {
    let result           = '';
    let characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let charactersLength = characters.length;
    for ( let i = 0; i < length; i++ ) {
       result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}


//  //date Format
// export const dateFormat = (value) =>{
//     var val = value.replace(/[^\d\*]/g, '')
//     var newVal = '';
//     var sizes = [2, 2, 4];
//     for (var i in sizes) {
//         if (val.length > sizes[i]) {
//             newVal += val.substr(0, sizes[i]) + '/';
//             val = val.substr(sizes[i]);
//             console.log(i,sizes)
//         } else { 
//             break; 
//         }       
//     }

//     newVal += val;
//     console.log('Date Format',newVal,value)
//     return newVal
// }


//Credit/Debit Card Format
export const cardFormat = (value) =>{
    var val = value.replace(/[^\d\*]/g, '')
    var newVal = '';
    var sizes = [4, 4, 4, 4];
    for (var i in sizes) {
        if (val.length > sizes[i]) {
            newVal += val.substr(0, sizes[i]) + '  ';
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


//  Expiry date Format
export const cardExpiryDateFormat = (value) =>{
    var val = value.replace(/[^\d\*]/g, '')
    var newVal = '';
    var sizes = [2, 4];
    for (var i in sizes) {
        if (val.length > sizes[i]) {
            newVal += val.substr(0, sizes[i]) + '/';
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


// ^[a-zA-Z] means any a-z or A-Z at the start of a line

// [^a-zA-Z] means any character that IS NOT a-z OR A-Z

export const acceptOnlyCharacters = text => {
    let value = text.replace(/[^A-Za-z,. ]/ig,'')
    console.log('[ProfilePersonalInfo.js]: ',value)
    return value
}


export const acceptOnlyNumbers = text => {
    let value = text.replace(/[^0-9. ]/ig,'')
    console.log('[ProfilePersonalInfo.js]: ',value)
    return value
}



export const getYearsList = () => {
    const todayDate = new Date();
    const currentYear = todayDate.getFullYear();
    const totalYears = 50;
    const yearsList = [];
    for(let i = 1972; i <= currentYear; i++){

        const item = {
            id : i.toString(),
            name : i.toString(),
        }

        yearsList.push(item);
    }
    const reverseList = yearsList.reverse()
    // console.log('Validations.js',reverseList)
    // this.setState({list: reverseList})
    return reverseList;
}


export const isValidUrl = (url) => {
    const matchPattern = /^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)$/gm;
    return matchPattern.test(url);
}