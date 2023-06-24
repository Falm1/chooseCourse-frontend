<template>
    <div>
        <el-table :data="studentList" stripe style="width: 100%" height="600">
            <el-table-column prop="username" label="学号" width="600" />
            <el-table-column prop="name" label="姓名" width="600" />
            <el-table-column type="expand">
                <template #default="props">
                    <div style="margin-left: 20px">
                        <el-form :inline="true" :model="form" class="demo-form-inline" :rules="rules" ref="formRef">
                            <el-form-item label="请输入分数">
                                <el-input v-model="form.grade" placeholder="请输入成绩" clearable />
                            </el-form-item>
                            <el-form-item label="请选择课程">
                                <el-cascader v-model="form.couId" :options="courseList" @change="handleChange" />
                            </el-form-item>
                            <el-form-item>
                                <el-button type="primary" @click="onSubmit">提交</el-button>
                            </el-form-item>
                        </el-form>
                    </div>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script setup>
import {onMounted, reactive, ref} from "vue";
import {useRoute} from "vue-router";
import {doPost} from "@/net";
import {ElMessage} from "element-plus";

const route = useRoute();
const courseId = route.query.courseId
const studentList = ref([])
const formRef = ref();
const courseList = ref([])
const couId = ref([])

onMounted(()=>{
    doGetDetail();
    doGetCategory();
})

const handleChange = (value) => {
    form.couId = value[1];
}
const doGetDetail = ()=>{
    doPost('/course/get-course-details', {
        courseId: courseId,
    }, (RestBean)=>{
        studentList.value = RestBean.data.studentList;
    })
}

const doGetCategory = () => {
    doPost('/course/get-course-category', {
        courseId: courseId,
    }, (RestBean)=>{
        courseList.value = RestBean.data;
        console.log(courseList);
    })
}

const form = reactive({
    grade: '',
    couId: '',
})

const onSubmit = () => {
    doPost('/grade/add-grade', {
        couId: form.couId,
        grade: form.grade,
    }, (RestBean) => {
        ElMessage.success(RestBean.message)
    })
}

const validateGrade = (rule, value, callback)=>{
    if(!/(?:[1-9][0-9]*|0)\/[1-9][0-9]*/g.test(value)){
        callback("分数应为数字");
    }else{
        callback();
    }
}

const rules = {
    grade: [
        { required: true, message: '请输入成绩', trigger: 'blur' },
        { validator: validateGrade, trigger: 'blur' }
    ],
}

</script>

<style scoped>

</style>