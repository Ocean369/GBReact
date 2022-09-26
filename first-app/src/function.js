export function getId(List) {
    return List.length ? List[List.length - 1].id + 1 : 0
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

export function addMessage(messageList, message, user, chat) {
    let isOwner = user === chat.name ? false : true;
    let time = new Date();
    let hours = time.getHours();
    let min = time.getMinutes() < 10 ? `0${time.getMinutes()}` : time.getMinutes();
    let id = getId(messageList.find(messages => messages.id === chat.id).messages);

    let mess = {
        id: id,
        user: user,
        text: message,
        time: `${hours}:${min}`,
        isOwner: isOwner
    };
    return mess
}

export function getIdChat(newChat, list) {
    let regExp = /^[a-z,а-я]+/i;
    if (regExp.test(newChat)) {
        let first = newChat[0];
        let firstList = list.filter(chat => {
            if (chat.id[0] === first) return chat
        })
        first = first.toUpperCase();
        if (firstList.length) {
            let numberId = +firstList[firstList.length - 1].id.slice(1);
            return `${first}${numberId + 1}`
        } else return `${first}1`
    } else {
        let firstList = list.filter(chat => {
            if (!regExp.test(chat.id)) return chat
        })
        return firstList.length ? firstList[firstList.length - 1].id + 1 : 1;
    }
}

export function createChatList(newChat, list, id) {
    let chat = {
        id: id,
        name: newChat,
    };
    return [...list, chat]
}

