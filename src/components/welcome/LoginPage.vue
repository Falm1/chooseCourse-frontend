<template>
    <div style="text-align: center;margin: 0 20px">
        <div style="margin-top: 150px">
            <div style="font-size: 25px">登录</div>
            <div style="font-size: 14px;color: grey">进入系统之前，请先登录</div>
        </div>
        <div style="margin-top: 50px">
            <el-form :model="form" status-icon :rules="rules" ref="formRef">
                <el-form-item prop="username">
                    <el-input v-model="form.username" type="text" placeholder="学号/学工号">
                        <template #prefix>
                            <el-icon slot="prefix"><User /></el-icon>
                        </template>
                    </el-input>
                </el-form-item>
                <el-form-item prop="password">
                    <el-input v-model="form.password" type="password" style="margin-top: 15px" placeholder="密码">
                        <template #prefix>
                            <el-icon><Lock /></el-icon>
                        </template>
                    </el-input>
                </el-form-item>
            </el-form>
        </div>
        <el-row style="margin-top: 5px">
            <el-col :span="12" style="text-align: left">
            </el-col>
            <el-col :span="12" style="text-align: right">
                <el-link @click="router.push('/forget')">忘记密码？</el-link>
            </el-col>
        </el-row>
        <div style="margin-top: 40px">
            <el-button style="width: 270px" type="success" plain @click="doLogin">登录</el-button>
        </div>
    </div>
</template>

<script setup>

import {Lock, User} from "@element-plus/icons-vue";
import router from "@/router";
import {reactive, ref} from "vue";
import {ElMessage} from "element-plus";
import {doGet, doPost} from "@/net";
import {useStore} from "@/stores";

const formRef = ref();
const store = useStore();
const form = reactive({
    username: '',
    password: '',
})

const doLogin = () => {
    formRef.value.validate((isValid)=>{
        if(isValid){
            doPost('/user/auth/login', {
                username: form.username,
                password: form.password,
            }, (RestBean)=>{
                ElMessage.success(RestBean.message);
                doGet('/user/auth/getMe', (RestBean)=>{
                    localStorage.setItem("user", JSON.stringify(RestBean.data));
                    store.auth.user = RestBean.data
                    if(store.auth.user.role === 0){
                        router.push('/admin')
                    }else if(store.auth.user.role === 1){
                        router.push('/teacher')
                    } else if(store.auth.user.role === 2){
                        router.push('/index')
                    }else{
                        router.push('/')
                    }

                }, ()=>{
                    store.auth.user = null
                })
            })
        }
    })

}

//校验表单
const validateUsername = (rule, value, callback)=>{
    if(!/^[0-9]{10}$/.test(value)){
        callback("用户名应为10位纯数字")
    }else{
        callback();
    }
}
const validatePwd = (rule, value, callback)=>{
    if(!/^(?=.*[a-zA-Z])(?=.*\d).{3,12}$/.test(value)){
        callback("密码应由字母、数字、特殊字符中任意2种组成,且长度为3-12");
    }else{
        callback();
    }
}

const rules = {
    username: [
        { required: true, message: '请输入学号', trigger: 'blur' },
        { validator: validateUsername, trigger: 'blur' }
    ],
    password: [
        { required: true, message: '请输入密码', trigger: 'blur' },
        { validator: validatePwd, trigger: 'blur' }
    ],
}

</script>

<style scoped>

</style>