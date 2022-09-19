
function getId(List) {
    return List.length ? List[List.length - 1].id + 1 : 0
}

function RobotSay() {
    const speech = [
        'Ваше сообщение принято в обработку.',
        'Спасибо, что уделили нам время.',
        'Ваше сообщение отправленно.'
    ]
    let n = Math.floor(Math.random() * 3);
    return speech[n];
}

function addMessageList(messageList, message, user, chat) {
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

export { getId, RobotSay, addMessageList }