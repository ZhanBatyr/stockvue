import { notify } from "@kyvg/vue3-notification";

export default function guest ({ next, store }) {
    if(store.getters.logged && store.getters.guest){
        
        notify({
            type: 'error',
            title: 'Зарегистируйтесь чтобы начать играть!'
        })
        
        return next({
            name: 'Start'
        })
    }

    return next()
}