<template>
    <div>
        <el-table v-loading="loading" :data="courseList" style="width: 100%">
            <el-table-column label="课程编号" width="240">
                <template #default="scope">
                    <div style="display: flex; align-items: center">
                        <el-icon><timer /></el-icon>
                        <span style="margin-left: 10px">{{ scope.row.courseId }}</span>
                    </div>
                </template>
            </el-table-column>
            <el-table-column label="课程名称" width="240">
                <template #default="scope">
                    <div style="display: flex; align-items: center">
                        <el-icon><timer /></el-icon>
                        <span style="margin-left: 10px">{{ scope.row.courseName }}</span>
                    </div>
                </template>
            </el-table-column>
            <el-table-column label="任课教师" width="240">
                <template #default="scope">
                    <div style="display: flex; align-items: center">
                        <el-icon><timer /></el-icon>
                        <span style="margin-left: 10px">{{ scope.row.teacherName }}</span>
                    </div>
                </template>
            </el-table-column>
            <el-table-column label="课程类别" width="240">
                <template #default="scope">
                    <div style="display: flex; align-items: center">
                        <el-icon><timer /></el-icon>
                        <span style="margin-left: 10px">{{ scope.row.category }}</span>
                    </div>
                </template>
            </el-table-column>
            <el-table-column label="已选人数" width="240">
                <template #default="scope">
                    <div style="display: flex; align-items: center" class="progress">
                        <el-icon><timer /></el-icon>
                        <span style="margin-left: 10px">{{ scope.row.num }}</span>
                    </div>
                </template>
            </el-table-column>
            <el-table-column label="操作">
                <template #default="scope">
                    <el-popconfirm
                        width="220"
                        confirm-button-text="确定"
                        @confirm="doExit(scope.row.courseId)"
                        cancel-button-text="取消"
                        :icon="InfoFilled"
                        icon-color="#626AEF"
                        title="你确定要退课吗？"
                    >
                        <template #reference>
                            <el-button
                                size="small"
                                type="danger"
                            >退课</el-button
                            >
                        </template>
                    </el-popconfirm>
                </template>
            </el-table-column>
        </el-table>
    </div>
    <div style="margin-top: 10px;margin-bottom: 20px;text-align: right">
        <div>
            <el-pagination background layout="prev, pager, next" :total="pages" current-page="6"
                           @next-click="doGetNextCourse" @prev-click="doGetBeforeCourse" @current-change="val => doGetNCourse(val)"/>
        </div>
    </div>
</template>

<script setup>

import {InfoFilled, Timer} from "@element-plus/icons-vue";
import {onMounted, ref} from "vue";
import {doPost} from "@/net";
import {ElMessage} from "element-plus";

const courseList = ref([]);
const pageSize = 20;
let pageNum = 1;
const loading = ref(false);
const pages = ref(1);

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
        loading.value =false;
    })
}

const doExit = (courseId)=>{
    doPost('/user/exit-course', {
        courseId: courseId,
    }, (RestBean)=>{
        doGetCourse();
        ElMessage.success(RestBean.message);
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