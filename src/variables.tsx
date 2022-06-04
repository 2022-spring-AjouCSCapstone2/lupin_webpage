export const SERVER_URL = 'https://api.lupin.today';
// export const SERVER_URL = 'http://localhost:5000';
export const pwRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?~^<>,.&+=])[A-Za-z\d$@$!%*#?~^<>,.&+=]{8,15}$/;
export const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*))@((([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
export const getToday = () => {
    const today = new Date().getDay();
    let dayParam;
    switch (today) {
        case 0:
            dayParam = 'sun';
            break;
        case 1:
            dayParam = 'mon';
            break;
        case 2:
            dayParam = 'tue';
            break;
        case 3:
            dayParam = 'wed';
            break;
        case 4:
            dayParam = 'thu';
            break;
        case 5:
            dayParam = 'fri';
            break;
        case 6:
            dayParam = 'sat';
            break;
        default:
            dayParam = 'no';
            break;
    }
    return dayParam;
}
export const timeFormat = (time: string) => {
    const tmp = time.split('');
    tmp.splice(2, 0, ':');
    return tmp.join('');
}
export const getKoreanDay = (day: string) => {
    let koreanDay;
    switch (day) {
        case 'sun':
            koreanDay = '일';
            break;
        case 'mon':
            koreanDay = '월';
            break;
        case 'tue':
            koreanDay = '화';
            break;
        case 'wed':
            koreanDay = '수';
            break;
        case 'thu':
            koreanDay = '목';
            break;
        case 'fri':
            koreanDay = '금';
            break;
        case 'sat':
            koreanDay = '토';
            break;
        default:
            koreanDay = '무';
            break;
    }
    return koreanDay;
}
export const compareDate = (a: string, b: string) => {
    const splitA = a.split('-').map(e => Number(e));
    const splitB = b.split('-').map(e => Number(e));
    
    if(splitA[0] < splitB[0]) return 1;
    else if(splitA[0] > splitB[0]) return -1;
    else {
        if(splitA[1] < splitB[1]) return 1;
        else if(splitA[1] > splitB[1]) return -1;
        else {
            if(splitA[2] < splitB[2]) return 1;
            else if(splitA[2] > splitB[2]) return -1;
            else return 0;
        }
    }
}
export const dateInKorean = (date: string) => {
    const splited = date.split('-');
    return `${splited[0]}년 ${splited[1]}월 ${splited[2]}일`;
}