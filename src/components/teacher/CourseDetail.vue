<template>
    <div class="demo-collapse" style="margin-left: 20px;">
        <el-collapse v-model="activeName" accordion>
            <el-collapse-item title="学生" name="1">
                <div>
                    <el-table :data="studentList" stripe style="width: 100%" height="400">
                        <el-table-column prop="username" label="学号" width="500" />
                        <el-table-column prop="name" label="姓名" width="500" />
                    </el-table>
                </div>
            </el-collapse-item>
            <el-collapse-item title="作业" name="2">
                <div>
                    <el-table :data="workList" stripe style="width: 100%" height="400">
                        <el-table-column prop=courseName label="名称" width="500" />
                        <el-table-column prop="name" label="任课教师" width="500" />
                        <el-table-column prop="num" label="人数" width="500" />
                    </el-table>
                </div>
            </el-collapse-item>
            <el-collapse-item title="实验" name="3">
                <div>
                    <el-table :data="testList" stripe style="width: 100%">
                        <el-table-column prop="courseName" label="名称" width="500" />
                        <el-table-column prop="name" label="任课教师" width="500" />
                        <el-table-column prop="num" label="人数" width="500" />
                    </el-table>
                </div>
            </el-collapse-item>
            <el-collapse-item title="期末考试" name="4">
                <div>
                    <el-table :data="examList" stripe style="width: 100%">
                        <el-table-column prop="courseName" label="名称" width="500" />
                        <el-table-column prop="name" label="任课教师" width="500" />
                        <el-table-column prop="num" label="人数" width="500" />
                    </el-table>
                </div>
            </el-collapse-item>
        </el-collapse>
    </div>
</template>

<script setup>
import {useRoute} from "vue-router";
import {doPost} from "@/net";
import {onMounted, ref} from "vue";

const route = useRoute();
const courseId = route.query.courseId
const studentList = ref([])
const workList = ref([])
const testList = ref([])
const examList = ref([])

onMounted(()=>{
    doGetDetail()
})
const doGetDetail = ()=>{
    doPost('/course/get-course-details', {
        courseId: courseId,
    }, (RestBean)=>{
        studentList.value = RestBean.data.studentList;
        RestBean.data.courseList.forEach(course =>{
            if(course.status === 1){
                testList.value.push(course)
            }else if(course.status === 2){
                workList.value.push(course)
            }else{
                examList.value.push(course)
            }
        })
    })
}
</script>

<style scoped>

</style>