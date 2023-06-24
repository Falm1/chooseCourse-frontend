<template>
    <div style="text-align: center">
        <el-table :data="gradeList" style="width: 100%">
            <el-table-column prop="courseId" label="课程编号" width="230" />
            <el-table-column label="详细信息">
                <el-table-column prop="courseName" label="课程名称" width="180" />
                <el-table-column prop="name" label="任课教师" width="180" />
                <el-table-column label="课程成绩" width="480">
                    <el-table-column prop="testGrade" label="实验成绩" width="180" />
                    <el-table-column prop="workGrade" label="作业成绩" width="180" />
                    <el-table-column prop="examGrade" label="期末成绩" width="180" />
                    <el-table-column prop="finalGrade" label="总成绩" width="180" />
                </el-table-column>
            </el-table-column>
        </el-table>
    </div>
</template>

<script setup>

import {onMounted, ref} from "vue";
import {doPost} from "@/net";

const gradeList = ref();
let pageNum = 1;
const pageSize = 20;
const pages = ref();
const loading = ref(false);
const finalGrade = ref();

onMounted(()=>{
    loading.value = true
    pageNum = 1;
    doGetGradeList();
})

const doGetGradeList = ()=>{
    doPost('/grade/get-grade', {
    }, (RestBean)=>{
        gradeList.value = RestBean.data;
    })
}

</script>

<style scoped>

</style>