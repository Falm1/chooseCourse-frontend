<template>
    <div class="demo-collapse" style="margin-left: 20px;">
        <el-collapse v-model="activeName" accordion>
            <el-collapse-item title="作业" name="1">
                <div>
                    <el-table :data="workList" style="width: 100%" max-height="250">
                        <el-table-column fixed prop="courseId" label="课程号" width="250" />
                        <el-table-column prop="courseName" label="任课教师" width="250" />
                        <el-table-column prop="name" label="任课教师" width="250" />
                        <el-table-column prop="num" label="人数" width="250" />
                        <el-table-column fixed="right" label="Operations" width="250">
                            <template #default="scope">
                                <el-button
                                        link
                                        type="primary"
                                        size="large"
                                        @click.prevent="deleteRow(scope.$index)"
                                >
                                    删除
                                </el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                    <el-button class="mt-4" style="width: 100%" @click="addWork"
                    >Add Item</el-button
                    >
                    <el-drawer v-model="drawer" title="I am the title" :with-header="false">
                        <div>
                            <el-form
                                :label-position="labelPosition"
                                label-width="100px"
                                :model="form"
                                style="max-width: 460px"
                            >
                                <el-form-item label="作业名称">
                                    <el-input v-model="form.courseName" />
                                </el-form-item>
                                <el-form-item label="成绩占比" v-if="workList.length===0">
                                    <el-input v-model="form.percent" />
                                </el-form-item>
                                <el-form-item>
                                    <el-button type="primary" @click="doAdd">添加</el-button>
                                </el-form-item>
                            </el-form>
                        </div>
                    </el-drawer>
                </div>
            </el-collapse-item>
            <el-collapse-item title="实验" name="2">
                <div>
                    <el-table :data="testList" style="width: 100%" max-height="250">
                        <el-table-column fixed prop="courseId" label="课程号" width="250" />
                        <el-table-column prop="courseName" label="任课教师" width="250" />
                        <el-table-column prop="name" label="任课教师" width="250" />
                        <el-table-column prop="num" label="人数" width="250" />
                        <el-table-column fixed="right" label="Operations" width="250">
                            <template #default="scope">
                                <el-button
                                    link
                                    type="primary"
                                    size="large"
                                    @click.prevent="deleteRow(scope.$index)"
                                >
                                    删除
                                </el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                    <el-button class="mt-4" style="width: 100%" @click="addTest"
                    >Add Item</el-button
                    >
                    <el-drawer v-model="drawer" title="I am the title" :with-header="false">
                        <el-form>
                            <el-form-item label="实验名称">
                                <el-input v-model="form.courseName" />
                            </el-form-item>
                            <el-form-item label="成绩占比" v-if="testList.length===0">
                                <el-input v-model="form.percent" />
                            </el-form-item>
                            <el-form-item>
                                <el-button type="primary" @click="doAdd">添加</el-button>
                            </el-form-item>
                        </el-form>
                    </el-drawer>
                </div>
            </el-collapse-item>
            <el-collapse-item title="考试" name="3">
                <div>
                    <el-table :data="examList" style="width: 100%" max-height="250">
                        <el-table-column fixed prop="courseId" label="课程号" width="250" />
                        <el-table-column prop="courseName" label="任课教师" width="250" />
                        <el-table-column prop="name" label="任课教师" width="250" />
                        <el-table-column prop="num" label="人数" width="250" />
                        <el-table-column fixed="right" label="Operations" width="250">
                            <template #default="scope">
                                <el-button
                                    link
                                    type="primary"
                                    size="large"
                                    @click.prevent="deleteRow(scope.$index)"
                                >
                                    删除
                                </el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                    <el-button class="mt-4" style="width: 100%" @click="addExam"
                    >Add Item</el-button
                    >
                    <el-drawer v-model="drawer" title="I am the title" :with-header="false">
                        <el-form>
                            <el-form-item label="考试名称">
                                <el-input v-model="form.courseName" />
                            </el-form-item>
                            <el-form-item label="成绩占比" v-if="examList.length===0">
                                <el-input v-model="form.percent" />
                            </el-form-item>
                            <el-form-item>
                                <el-button type="primary" @click="doAdd">添加</el-button>
                            </el-form-item>
                        </el-form>
                    </el-drawer>
                </div>
            </el-collapse-item>
        </el-collapse>
    </div>
</template>

<script setup>

import {onMounted, reactive, ref} from "vue";
import {doPost} from "@/net";
import {useRoute} from "vue-router";
import router from "@/router";
import {storeToRefs} from "pinia";
import {useStore} from "@/stores";
import {ElMessage} from "element-plus";

const route = useRoute();
const courseId = route.query.courseId
const workList = ref([])
const testList = ref([])
const examList = ref([])
const status = ref();
const store = useStore();
const activeName = ref('1')
const maxNum = ref();
const num = ref();

const drawer = ref(false)
const form = reactive({
    courseName: '',
    percent: '',
})
onMounted(()=>{
    doGetDetail()
})
const doGetDetail = ()=>{
    testList.value = [];
    workList.value = [];
    examList.value = [];
    doPost('/course/get-course-details', {
        courseId: courseId,
    }, (RestBean)=>{
        num.value = RestBean.data.num;
        maxNum.value = RestBean.data.maxNum;
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

const addWork = ()=>{
    drawer.value = true
    status.value = 2
    if(workList.value.length!==0){
        form.percent = workList.value[0].percent
    }
}

const addTest= ()=>{
    drawer.value = true
    status.value = 1
    if(testList.value.length!==0){
        form.percent = testList.value[0].percent
    }
}

const addExam= ()=>{
    drawer.value = true
    status.value = 3
    if(examList.value.length!==0){
        form.percent = examList.value[0].percent
    }
}

const doAdd = ()=>{
    doPost('/course/add-course', {
        parentId: courseId,
        teacherId: store.auth.user.username,
        status: status.value,
        courseName: form.courseName,
        percent: form.percent,
        num: num.value,
        maxNum: maxNum.value,
    }, (RestBean)=>{
        doGetDetail()
        ElMessage.success(RestBean.message)
    })
}

</script>

<style scoped>

</style>