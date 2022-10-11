const initialState = {
    chatList: [

        {
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
        }
    ],
    messageList: {
        B1: [],
        L1: [],
        G1: []
    },
    currentUser: {
        loading: false,
        error: '',
        user: null
    },
    fetching: {
        users: [],
        loading: false,
        error: ''
    }
}

export default initialState;