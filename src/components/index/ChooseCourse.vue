<template>
    <div v-if="loading">
        <el-skeleton :rows="5" animated :count="2"/>
    </div>
    <div v-if="!loading">
        <el-table :data="courseList" style="width: 100%">
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
                        <span style="margin-left: 10px">{{ scope.row.name }}</span>
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
            <el-table-column label="选课人数" width="240">
                <template #default="scope">
                    <div style="display: flex; align-items: center" class="progress">
                        <div v-if="scope.row.num === scope.row.maxNum">
                            <el-progress :percentage="100" status="success">
                                <template #default="{ percentage }">
                                    <p style="color: rgba(255, 105, 180, 1)">{{ scope.row.num+'/'+scope.row.maxNum }}</p>
                                </template>
                            </el-progress>
                        </div>
                        <div v-if="scope.row.num >= scope.row.maxNum/3*2">
                            <el-progress :percentage="((scope.row.num/scope.row.maxNum)*100)" status="warning">
                                <template #default="{ percentage }">
                                    <p style="color: rgba(255, 105, 180, 1)">{{ scope.row.num+'/'+scope.row.maxNum }}</p>
                                </template>
                            </el-progress>
                        </div>
                        <div v-if="scope.row.num < scope.row.maxNum/3*2">
                            <el-progress :percentage="((scope.row.num/scope.row.maxNum)*100).toFixed(2)">
                                <template #default="{ percentage }">
                                    <p style="color: rgba(255, 105, 180, 1)">{{ scope.row.num+'/'+scope.row.maxNum }}</p>
                                </template>
                            </el-progress>
                        </div>
                    </div>
                </template>
            </el-table-column>
            <el-table-column label="Operations">
                <template #header>
                    <el-input v-model="courseId" size="small" placeholder="输入课程编号" @change="searchCourseId"/>
                </template>
                <template #default="scope">
                    <el-button
                        size="small"
                        type="success"
                        @click="doChoose(scope.row.courseId)"
                    >选课</el-button
                    >
                </template>
            </el-table-column>
        </el-table>
    </div>
    <div style="margin-top: 10px;margin-bottom: 20px;text-align: right">
        <div v-if="mode === 0">
            <el-pagination background layout="prev, pager, next" :total="pages" current-page="6"
                           @next-click="doGetNextCourse" @prev-click="doGetBeforeCourse" @current-change="val => doGetNCourse(val)"/>
        </div>
        <div v-if="mode===1">
            <el-pagination background layout="prev, pager, next" :total="pages" current-page="6"
                           @next-click="doGetNextCourseId" @prev-click="doGetBeforeCourseId" @current-change="val => doGetNCourseId(val)"/>
        </div>
    </div>
</template>

<script setup>
import {Timer} from "@element-plus/icons-vue";
import {onMounted, ref} from "vue";
import {doPost} from "@/net";
import {ElMessage} from "element-plus";

const courseList = ref([]);
const pageSize = 20;
let pageNum = 1;
const loading = ref(false);
const pages = ref();
const courseId = ref();
const mode = ref();

onMounted(()=>{
    mode.value = 0;
    loading.value = true
    pageNum = 1;
    doGetCourse();
})
const doGetCourse = ()=>{
    doPost('/course/search-course',{
        pageSize: pageSize,
        pageNum: pageNum,
    }, (RestBean) =>{
        console.log(RestBean)
        pages.value = RestBean.data.pages;
        courseList.value = RestBean.data.list;
        loading.value =false
    })
}

const doChoose = (courseId)=>{
    doPost('/user/choose-course', {
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

const searchCourseId = ()=>{
    mode.value=1;
    loading.value = true;
    pageNum = 1;
    doPost('/course/search-course', {
        courseId: courseId.value,
        pageNum: pageNum,
        pageSize: pageSize,
    }, (RestBean) => {
        pages.value = RestBean.data.pages;
       courseList.value = RestBean.data.list;
       loading.value = false;
    })
}

const doGetNextCourseId = ()=>{
    loading.value = true;
    pageNum = pageNum+1;
    searchCourseId();
}

const doGetBeforeCourseId = ()=>{
    loading.value = true;
    pageNum = pageNum-1;
    searchCourseId();
}

const doGetNCourseId = (val)=>{
    loading.value = true;
    pageNum = val;
    searchCourseId();
}

</script>

<style scoped>
.progress .el-progress--line {
    width: 200px;
}
</style>