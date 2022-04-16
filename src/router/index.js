import { createRouter, createWebHistory  } from 'vue-router'
import Index from "../views/Index"
import AuthLogin from "../views/Auth/Login"
import AuthRegister from "../views/Auth/Register"
import Register from "../views/Market/Register"
import guest from "../middleware/guest"
import Companies from "../views/Company/Index"
import CompanyProfile from "../views/Company/Profile"
//import auth from "../middleware/auth"
import anon from "../middleware/anon"
import store from "../store"
import middlewarePipeline from "./middlewarePipeline"

const routes = [
  {
    path: '/',
    name: 'Index',
    component: Index,
    meta: {
      middleware: [ guest ]
    }
  },
  {
    path: '/companies',
    name: 'Companies',
    component: Companies,
    meta: {
      middleware: [ guest ]
    }
  },
  {
    path: '/companies/:id/',
    name: 'CompanyProfile',
    component: CompanyProfile,
    meta: {
      middleware: [ guest ]
    }
  },
  {
    path: '/start',
    name: 'Start',
    component: Register,
    meta: {
      
    }
  },
  {
    path: '/auth/login',
    name: 'Login',
    component: AuthLogin,
    meta: {
      middleware: [ anon ]
    }
  },
  {
    path: '/auth/register',
    name: 'Register',
    component: AuthRegister,
    meta: {
      middleware: [ anon ]
    }
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  linkActiveClass: 'active',
})

router.beforeEach((to, from, next) => {

  if (!to.meta.middleware) return next()
  const middleware = to.meta.middleware
  const context = {
    to,
    from,
    next,
    store
  }

  return middleware[0]({
    ...context,
    next: middlewarePipeline(context, middleware, 1)
  })

})
export default router
