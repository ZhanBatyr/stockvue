import {createStore} from "vuex";

const store = createStore({
    state () {
        return {
            init: false,
            logged: false,
            token: localStorage.getItem('token') ?? '',
            user: {
                username: '',
                email: '',
                guest: '',
                role: ''
            }
        }
    },
    getters: {
        logged: state => state.logged,
        token: state => state.token,
        guest: state => state.user.guest,
        role: state => state.user.role
    },
    mutations: {
        init(state) {
            if (!state.init) {
                if (localStorage.getItem('token')) {
                    state.token = localStorage.getItem('token');
                    state.logged = !!state.token.length;
                    state.user.username = localStorage.getItem('user.username')
                    state.user.email = localStorage.getItem('user.email')
                    state.user.guest = localStorage.getItem('user.guest')
                    state.user.role = localStorage.getItem('user.role')
                }
                state.init = true
            }
        },
        setToken(state, token) {
            state.token = token
            state.logged = !!token.length
            localStorage.setItem('token', token)
        },
        setUser(state, data) {
            state.user.username = data.user.username
            state.user.email = data.user.email
            state.user.role = data.user.isGuest ? 'guest' : data.user.role
            state.user.guest = data.user.isGuest ? 'guest' : 'none'
            localStorage.setItem('user.username', data.user.username)
            localStorage.setItem('user.email', data.user.email)
            localStorage.setItem('user.role', data.user.role)
            localStorage.setItem('user.guest', data.user.guest)
        },
        logout(state) {
            state.token = ''
            state.user.username = ''
            state.user.role = ''
            state.user.guest = ''
            state.user.email = ''
            state.logged = false
            localStorage.removeItem('token')
            localStorage.removeItem('user.username')
            localStorage.removeItem('user.email')
            localStorage.removeItem('user.role')
            localStorage.removeItem('user.guest')
        }
    }
})

export default store