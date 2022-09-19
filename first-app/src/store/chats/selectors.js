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
