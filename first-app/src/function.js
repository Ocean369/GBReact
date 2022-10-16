export function getIdMessage(date, chatID) {
    return `${chatID}-${date}`
}

export function RobotSay() {
    const speech = [
        'Ваше сообщение принято в обработку.',
        'Спасибо, что уделили нам время.',
        'Ваше сообщение отправленно.'
    ]
    let n = Math.floor(Math.random() * 3);
    return speech[n];
}

export function addMessage(message, user) {
    const timeNow = new Date();
    console.log(timeNow.getHours());
    let hours = timeNow.getHours();
    let min = timeNow.getMinutes() < 10 ? `0${timeNow.getMinutes()}` : timeNow.getMinutes();

    let mess = {
        sender: user,
        text: message,
        time: `${hours}:${min}`,
    };
    return mess
}

export function getIdChat(newChat, list) {
    let regExp = /^[a-z,а-я]+/i;
    if (regExp.test(newChat)) {
        let first = newChat[0];
        let firstList = list.filter(chat => chat.id[0] === first
        )
        first = first.toUpperCase();
        if (firstList.length) {
            let numberId = +firstList[firstList.length - 1].id.slice(1);
            return `${first}${numberId + 1}`
        } else return `${first}1`
    } else {
        let firstList = list.filter(chat => !regExp.test(chat.id)
        )
        return firstList.length ? firstList[firstList.length - 1].id + 1 : 1;
    }
}

export function isEmpty(obj) {
    if (Object.keys(obj).length === 0) return true
    return false
}


