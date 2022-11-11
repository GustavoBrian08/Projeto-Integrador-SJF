import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import app from '@/components/firebase/index'
import { getAuth, onAuthStateChanged } from "firebase/auth";
const auth = getAuth();

const routes = [{
        path: '/',
        name: 'home',
        component: HomeView,
        beforeEnter: (to, from, next) => {
            onAuthStateChanged(auth, async (user) => {
                if (user !== null) {
                    const email = user.email;
                    next()
                }else{
                    next({
                        name: 'login'
                    })
                }
            })
        }
    },
    {
        path: '/login',
        name: 'login',

        component: () => import ('../views/LoginView.vue')
    },
    {
        path: '/cadastrar',
        name: 'cadastrar',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () =>
            import ( /* webpackChunkName: "about" */ '../views/CadastroView.vue')

    }, {
        path: '/justificar',
        name: 'justificar',
        component: () =>
            import ( /* webpackChunkName: "about" */ '../views/JustificarFaltasView.vue'),
            beforeEnter: (to, from, next) => {
                onAuthStateChanged(auth, async (user) => {
                    if (user !== null) {
                        const email = user.email;
                        next()
                    }else{
                        next({
                            name: 'login'
                        })
                    }
                })
            }

    }, {
        path: '/historico-de-justificativas',
        name: 'historicoDeJustificativas',
        component: () =>
            import ( /* webpackChunkName: "about" */ '../views/HistoricoDeJustificatiasView.vue'),
            beforeEnter: (to, from, next) => {
                onAuthStateChanged(auth, async (user) => {
                    if (user !== null) {
                        const email = user.email;
                        next()
                    }else{
                        next({
                            name: 'login'
                        })
                    }
                })
            }
    },
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})

export default router