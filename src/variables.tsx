export const SERVER_URL = 'http://3.37.234.117:5000';
// export const CLIENT_URL = 'http://3.34.161.32:3000';
// export const LOCAL_URL = 'http://localhost:5000';
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