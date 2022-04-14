export default function auth ({ next, store }){
    if(!store.getters.logged){
        return next({
            name: 'Login'
        })
    }
    return next()
}