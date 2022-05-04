import { createRouter, createWebHistory  } from 'vue-router'
import Index from "../views/Index"
import AuthLogin from "../views/Auth/Login"
import AuthRegister from "../views/Auth/Register"
import Register from "../views/Market/Register"
import guest from "../middleware/guest"
import Companies from "../views/Company/Index"

import Orders from "../views/Order/Index"
import ConfirmOrder from "../views/Order/Confirm"

import Transactions from "../views/Bank/Transactions"
import Credits from "../views/Bank/Credits"
import Credit from "../views/Bank/Credit"

import Movements from "../views/Movement/Index"

import Sectors from "../views/Sector/Index"
import Quotes from "../views/Quote/Index"
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
      
    }
  },
  {
    path: '/orders',
    name: 'Orders',
    component: Orders,
    meta: {
      middleware: [ guest ]
    }
  },
  {
    path: '/orders/:id/confirmation',
    name: 'ConfirmOrder',
    component: ConfirmOrder,
    meta: {
      middleware: [ guest ]
    }
  },
  {
    path: '/quotes',
    name: 'Quotes',
    component: Quotes,
    meta: {

    }
  },
  {
    path: '/movements',
    name: 'Movements',
    component: Movements,
    meta: {

    }
  },
  {
    path: '/transactions',
    name: 'Transactions',
    component: Transactions,
    meta: {
      middleware: [ guest ]
    }
  },
  {
    path: '/credits',
    name: 'Credits',
    component: Credits,
    meta: {
      middleware: [ guest ]
    }
  },
  {
    path: '/credit',
    name: 'Credit',
    component: Credit,
    meta: {
      middleware: [ guest ]
    }
  },
  {
    path: '/sectors',
    name: 'Sectors',
    component: Sectors,
    meta: {
      
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
