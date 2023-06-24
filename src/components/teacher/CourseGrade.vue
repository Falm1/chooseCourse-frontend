<template>
    <div v-if="loading">
        <el-skeleton :rows="5" animated :count="2"/>
    </div>
    <div v-if="!loading">
        <el-table :data="courseList" style="width: 100%">
            <el-table-column label="课程编号" width="220">
                <template #default="scope">
                    <div style="display: flex; align-items: center">
                        <el-icon><timer /></el-icon>
                        <span style="margin-left: 10px">{{ scope.row.courseId }}</span>
                    </div>
                </template>
            </el-table-column>
            <el-table-column label="课程名称" width="220">
                <template #default="scope">
                    <div style="display: flex; align-items: center">
                        <el-icon><timer /></el-icon>
                        <span style="margin-left: 10px">{{ scope.row.courseName }}</span>
                    </div>
                </template>
            </el-table-column>
            <el-table-column label="任课教师" width="220">
                <template #default="scope">
                    <div style="display: flex; align-items: center">
                        <el-icon><timer /></el-icon>
                        <span style="margin-left: 10px">{{ scope.row.teacherName }}</span>
                    </div>
                </template>
            </el-table-column>
            <el-table-column label="课程类别" width="220">
                <template #default="scope">
                    <div style="display: flex; align-items: center">
                        <el-icon><timer /></el-icon>
                        <span style="margin-left: 10px">{{ scope.row.category }}</span>
                    </div>
                </template>
            </el-table-column>
            <el-table-column label="课程人数" width="220">
                <template #default="scope">
                    <div style="display: flex; align-items: center">
                        <el-icon><timer /></el-icon>
                        <span style="margin-left: 10px">{{ scope.row.num }}</span>
                    </div>
                </template>
            </el-table-column>
            <el-table-column label="Operations">
                <template #default="scope">
                    <el-button
                        size="small"
                        type="success"
                        @click="doGrade(scope.row.courseId)"
                    >提交分数</el-button
                    >
                </template>
            </el-table-column>
        </el-table>
    </div>
    <div style="margin-top: 10px;margin-bottom: 20px;text-align: right">
        <el-pagination background layout="prev, pager, next" :total="pages" current-page="6"
                       @next-click="doGetNextCourse" @prev-click="doGetBeforeCourse" @current-change="val => doGetNCourse(val)"/>
    </div>
</template>

<script setup>

import {Timer} from "@element-plus/icons-vue";
import {onMounted, ref} from "vue";
import {doPost} from "@/net";
import router from "@/router";
const courseList = ref([]);
const pageSize = 20;
let pageNum = 1;
const loading = ref(false);
const pages = ref();

onMounted(()=>{
    loading.value = true
    pageNum = 1;
    doGetCourse();
})
const doGetCourse = ()=>{
    doPost('/user/get-myCourse',{
        pageSize: pageSize,
        pageNum: pageNum,
    }, (RestBean) =>{
        pages.value = RestBean.data.pages;
        courseList.value = RestBean.data.list;
        loading.value =false
    })
}
const doGrade = (courseId)=>{
    router.push({
        path: '/teacher/getGrade',
        query: {
            courseId: courseId,
        }
    })
}

const doGetNextCourse = ()=>{
    loading.value = true;
    pageNum = pageNum+1;
    doGetCourse();
}

const doGetBeforeCourse = ()=>{
    loading.value = true;
    pageNum = pageNum-1;
    doGetCourse();
}

const doGetNCourse = (val)=>{
    loading.value = true;
    pageNum = val;
    doGetCourse();
}

</script>

<style scoped>

</style>