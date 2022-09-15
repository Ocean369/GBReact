// 'use strict';

function getId(List) {
    return List.length ? List[List.length - 1].id + 1 : 0
}

function RobotSay() {
    const speech = [
        'Ваше сообщение принято в обработку.',
        'Спасибо, что уделили нам время.'
    ]
    let n = Math.floor(Math.random() * 2);
    return speech[n];
}

function updateMessageList(messages, message, user) {
    let isOwner = true;
    if (user !== 'You') isOwner = false
    let time = new Date();
    let hours = time.getHours();
    let min = time.getMinutes();
    let mes = {
        id: getId(messages),
        user: user,
        text: message,
        time: `${hours}:${min}`,
        isOwner: isOwner
    };

    messages = messages.slice()
    messages.push(mes);
    return messages
}

function getIdChat(newChat, list) {
    let regExp = /^[a-z,а-я]+/i;
    if (regExp.test(newChat)) {
        let first = newChat[0];
        let firstList = list.filter(chat => {
            if (chat.id[0] === first) return chat
        })
        first = first.toUpperCase();
        if (firstList.lenght) {
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

function createChatList(newChat, list) {
    let id = getIdChat(newChat, list);
    let chat = {
        id: id,
        name: newChat,
        messageList: []
    };
    list = list.slice();
    list.push(chat);
    return list
}

function updateChatList(id, list, messages) {
    list = list.slice();
    list.map(chat => chat.id === id ? chat.messageList = messages : chat);
}

export { getId, RobotSay, updateMessageList, getIdChat, updateChatList, createChatList }