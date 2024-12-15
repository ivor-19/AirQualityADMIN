import { createRouter, createWebHistory } from 'vue-router';

const routes = [
    {
        path: '/Assets',
        name: 'Assets',
        meta: { requiresAuth: false },
        component: () => import('@/components/Assets.vue')
    },
    {
        path: '/HistoryTable',
        name: 'HistoryTable',
        meta: { requiresAuth: false },
        component: () => import('@/components/HistoryTable.vue')
    },
    {
        path: '/LatestAQ',
        name: 'LatestAQ',
        meta: { requiresAuth: false },
        component: () => import('@/components/icons/weather.vue')
    },
    {
        path: '/UserTable',
        name: 'UserTable',
        meta: { requiresAuth: false },
        component: () => import('@/components/UserTable.vue')
    },
    {
        path: '/StudentList',
        name: 'StudentList',
        meta: { requiresAuth: false },
        component: () => import('@/components/StudentList.vue')
    },

    ]

    const router = createRouter({
        history: createWebHistory(import.meta.env.BASE_URL),
        routes,
    })

    export default router;
