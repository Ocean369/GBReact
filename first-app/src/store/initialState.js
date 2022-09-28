const initialState = {
    chatList: [{
        id: 'B1',
        name: 'Boris Johnson',
    },
    {
        id: 'L1',
        name: 'Lis Truss',
    },
    {
        id: 'G1',
        name: 'Geek Brains',
    }],
    messageList: [{
        id: 'B1',
        messages: []
    },
    {
        id: 'L1',
        messages: []
    },
    {
        id: 'G1',
        messages: []
    }],
    user: {
        name: 'Anastasia',
        password: 'xxx678678'
    },
    fetching: {
        users: [],
        loading: false,
        error: ''
    }
}

export default initialState;