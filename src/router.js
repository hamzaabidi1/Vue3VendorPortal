import { createWebHistory, createRouter } from "vue-router";
import Home from "./components/Home.vue";
import Login from "./components/Login.vue";
import ForgotPassword from "./components/ForgotPassword.vue";
import VerifyEmail from "./components/VerifyEmail.vue";
import PasswordsConfirmation from "./components/PasswordsConfirmation.vue";
import requests from "./components/Requests.vue";
import SignUp from "./components/SignUp.vue";
import Rfq from "./components/Rfq.vue";
import RfqDetails from "./components/RfqDetails.vue";
import Po from "./components/Po.vue";
import PoDetails from "./components/PoDetails.vue";
import Invoice from "./components/Invoice.vue";
import InvoiceDetails from "./components/InvoiceDetails.vue";
import DemandeEnCours from "./components/DemandeEnCours.vue";
import Config from "./components/Config.vue";
import NotFound from "./components/NotFound.vue";
import Submitted from "./components/submitted.vue";
import BoardFournisseur from "./components/BoardFournisseur.vue";
import AdminDashboard from "./components/AdminDashboard.vue";
import jwt_decode from "jwt-decode";
// lazy-loaded
const Profile = () => import("./components/Profile.vue")
const BoardAdmin = () => import("./components/BoardAdmin.vue")
const BoardModerator = () => import("./components/BoardModerator.vue")
const BoardUser = () => import("./components/BoardUser.vue")

const routes = [
  {
    path: "/",
    name: "home",
    component: Home,
  },
  {
    path: "/home",
    component: Home,
  },
  {
    path: "/login",
    component: Login,
  },
  {
    path: "/profile",
    name: "profile",
    // lazy-loaded
    component: Profile,
  },
  {
    path: "/admin",
    name: "admin",
    // lazy-loaded
    component: BoardAdmin,
  },
  {
    path: "/fournisseur",
    name: "fournisseur",
    // lazy-loaded
    component: BoardModerator,
  },
  {
    path: "/user",
    name: "user",
    // lazy-loaded
    component: BoardUser,
  },
  {
    path: '/signup',
    component: SignUp
  },
  {
    path: '/forgotPassword',
    component: ForgotPassword
  },
  {
    path: '/verifyemail',
    component: VerifyEmail
  },
  
  {
    path: '/passwordsConfirmation',
    component: PasswordsConfirmation
  },
  { path: '/boardfournisseur',
  component: BoardFournisseur,
  name: "BoardFournisseur"
},

{ path: '/admindashboard',
component: AdminDashboard,
name: "AdminDashboard"
},

 { path: '/rfq',
  component: Rfq,
  name: "rfq",

},
{ path: '/rfqdetails/:idpath',
  component: RfqDetails,
  name: "rfqdetails"
},

{ path: '/po',
component: Po,
name: "po"
},
{ path: '/podetails/:idpath',
component: PoDetails,
name: "podetails"
},

{ path: '/invoice',
component: Invoice,
name: "invoice"
},
{ path: '/invoicedetails/:idpath',
component: InvoiceDetails,
name: "invoicedetails"
},
{
  path: '/encours',
  component: DemandeEnCours,
  name: "DemandeEnCours",
},
  {
    path: '/requests',
    component: requests,
    name: "requests",
  },
  {
    path: '/config',
    component: Config,
    name: "config",
  },
  {
    path: '/notfound',
    component: NotFound,
    name: "notfound",
  },
  {
    path: '/submitted',
    component: Submitted,
    name: "submitted",
  },
  {
    path: '/register',
    component: () => import('./components/StepSignup.vue'),
    children: [{
        path: '/register',
        component: () => import('./components/Register.vue')
    },
    {
        path: '/register/adressInformation',
        component: () => import('./components/AdressInformation.vue')
    },
    {
        path: '/register/fiscal',
        component: () => import('./components/FiscalInformation.vue')
    },
    {
        path: '/register/legacy',
        component: () => import('./components/LegacyInformation.vue')
    },
    {
      path: '/register/confirmation',
      component: () => import('./components/ConfirmInformation.vue')
    }
  ]
},
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const publicPages = ['/login', '/verifyemail', '/home', '/signup','/notfound','/ForgotPassword','/passwordsConfirmation'];
  const authRequired =  !publicPages.includes(to.path);
  const loggedIn = localStorage.getItem('user');
  const tokenloggedIn = localStorage.getItem('user.accessToken');

if (loggedIn){
  var  jsonobject= localStorage.user;
  let monobjet = JSON.parse(jsonobject)
   let decoded = jwt_decode(monobjet.accessToken);

   if ((decoded.exp <= (Math.floor(new Date().getTime() / 1000) )))
   {
  
   localStorage.removeItem('user');
   location.replace('/login')
}
}
  if ((authRequired && !loggedIn) ) {

    location.replace('/login')
  }
  else {
    next();
  }
});

export default router;