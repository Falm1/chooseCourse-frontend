import { createRouter, createWebHistory } from 'vue-router'
import {useStore} from "@/stores";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'welcome',
      component: ()=>import('@/views/WelcomeView.vue'),
      children:[
        {
          path: '',
          name: 'welcome-login',
          component: ()=>import('@/components/welcome/LoginPage.vue')
        },
        {
          path: 'forget',
          name: 'welcome-forget',
          component: ()=> import('@/components/welcome/ForgetPage.vue')
        }
      ]
    },
    {
      path: '/index',
      name: 'index',
      component: ()=>import('@/views/IndexView.vue'),
      children: [
        {
          path: '',
          name: 'index-choose',
          component: () => import('@/components/index/ChooseCourse.vue'),
        },
        {
          path: 'myCourse',
          name: 'index-myCourse',
          component: ()=> import('@/components/index/MyCourse.vue'),
        },
        {
          path: 'myGrade',
          name: 'index-myGrade',
          component: () => import('@/components/index/MyGrade.vue'),
        },
        {
          path: 'setting',
          name: 'index-setting',
          component: ()=>import('@/components/index/Settings.vue'),
        }
      ]
    },
    {
      path: '/teacher',
      name: 'teacher',
      component: ()=>import('@/views/TeacherView.vue'),
      children: [
        {
          path: '',
          name: 'course',
          component: ()=>import('@/components/teacher/Courses.vue')
        },
        {
          path: 'grade',
          name: 'course-grade',
          component: ()=>import('@/components/teacher/CourseGrade.vue')
        },
        {
          path: 'add',
          name: 'course-add',
          component: ()=>import('@/components/teacher/CourseAdd.vue')
        },
        {
          path: 'addWith',
          name: 'course-addWith',
          component: ()=>import('@/components/teacher/CourseAddWith.vue')
        },
        {
          path: 'details',
          name: 'course-details',
          component: ()=>import('@/components/teacher/CourseDetail.vue')
        },
        {
          path: 'getGrade',
          name: 'course-getGrade',
          component: ()=>import('@/components/teacher/CourseGetGrade.vue')
        },
        {
          path: 'doGrade',
          name: 'course-doGrade',
          component: ()=>import('@/components/teacher/CourseDoGrade.vue')
        }
      ]
    },
    {
      path: '/admin',
      name: 'admin',
      component: ()=>import('@/views/AdminView.vue'),
    }
  ]
})

router.beforeEach((to, from, next) =>{
  const store = useStore()
  if(store.auth.user != null && to.name.startsWith('welcome-')){
    next('/index')
  } else if(store.auth.user == null && to.fullPath.startsWith('/index')){
    next('/')
  }else if(to.matched.length === 0){
    next('/index')
  } else{
    next()
  }
})

export default router
