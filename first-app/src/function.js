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

export function addMessageList(messageList, message, user, chat) {
    let isOwner = true;
    if (user === chat.name) isOwner = false
    let time = new Date();
    let hours = time.getHours();
    let min = time.getMinutes();
    let filtered = messageList.filter(messages => { return messages.id === chat.id });

    let mes = {
        id: getId(filtered[0].messages),
        user: user,
        text: message,
        time: `${hours}:${min}`,
        isOwner: isOwner
    };
    filtered[0].messages.push(mes)
    let mapList = messageList.map(messages => messages.id === chat.id ? filtered[0] : messages)
    return mapList
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
