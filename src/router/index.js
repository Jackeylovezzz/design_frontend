import Vue from 'vue'
import Router from 'vue-router'
import login from '@/pages/login.vue'

import rehome from '@/pages/rehome.vue'
import medihome from '@/pages/medi_home.vue'
import pathome from '@/pages/pat_home.vue'
import fenzhen from '@/pages/fenzhen.vue'
import test from '@/pages/test.vue'
import reviewerlogin from '../pages/reviewerlogin'
import adhome from '../pages/adhome'
import admin from '../pages/admin.vue'
Vue.use(Router)

export default new Router({
    mode: 'history',
    routes: [{
            path: '/',
            name: 'login',
            component: login
        },
        {
            path: '/reviewerlogin',
            name: 'reviewerLogin',
            component: reviewerlogin
        },
        {
            path: '/rehome',
            name: 'rehome',
            component: rehome
        },
        {
            path: '/test',
            name: 'test',
            component: test
        },
        {
            path: '/adhome',
            name: 'adhome',
            component: adhome
        },
        {
            path: '/medihome',
            name: 'medihome',
            component: medihome
        },
        {
            path: '/pathome',
            name: 'pathome',
            component: pathome
        },
        {
            path: '/fenzhen',
            name: 'fenzhen',
            component: fenzhen
        },
        {
            path: '/admin',
            name: 'admin',
            component: admin
        }

    ]
})