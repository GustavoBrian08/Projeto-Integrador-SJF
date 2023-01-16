import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import app from '@/components/firebase/index'
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { doc, getFirestore, collection, getDoc, query,updateDoc, onSnapshot, deleteDoc, increment ,arrayUnion, where, addDoc } from "firebase/firestore";
const auth = getAuth();
const user = auth.currentUser;
const db = getFirestore(app);
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
        path: '/solicitacaoAlunos',
        name: 'solicitacao',
        component: () =>
            import ( /* webpackChunkName: "about" */ '../views/SolicitacaoAlunoView.vue'),
            beforeEnter: (to, from, next) => {
                onAuthStateChanged(auth, async (user) => {
                    if (user !== null) {
                        const email = user.email;
                        const docRef = doc(db, "Usuarios", user.uid);
                        const docSnap = await getDoc(docRef);
                        console.log(docSnap.data().isAluno)
                        if (docSnap.data().isAluno == 3){
                            return next()
                        }else{
                            return next({name: 'home'})
                        }
                    }else{
                        next({
                            name: 'login'
                        })
                    }
                })
            }
    }, {
        path: '/solicitacaoProfessor',
        name: 'solicitacaoProf',
        component: () =>
            import ( /* webpackChunkName: "about" */ '../views/SolicitacaoProfessorView.vue'),
            beforeEnter: (to, from, next) => {
                onAuthStateChanged(auth, async (user) => {
                    if (user !== null) {
                        const email = user.email;
                        const docRef = doc(db, "Usuarios", user.uid);
                        const docSnap = await getDoc(docRef);
                        console.log(docSnap.data().isAluno)
                        if (docSnap.data().isAluno == 3){
                            return next()
                        }else{
                            return next({name: 'home'})
                        }
                    }else{
                        next({
                            name: 'login'
                        })
                    }
                })
            }
    },
    {
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