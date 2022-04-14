export default function anon ({ next, store }){
    if(store.getters.logged){
        return next({
            name: 'Index'
        })
    }

    return next()
}