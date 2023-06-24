<template>
    <div style="margin-top: 40px">
        <el-steps :active="active" align-center>
            <el-step title="步骤 1" description="验证电子邮件" />
            <el-step title="步骤 2" description="重置密码" />
        </el-steps>
    </div>
    <div style="text-align: center;margin: 0 20px" v-if="active===0">
        <div style="margin-top: 60px">
            <div style="font-size: 25px">重置密码</div>
            <div style="font-size: 14px;color: grey">在下方输入您的信息重置密码</div>
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
            </el-form>
        </div>
        <el-row style="margin-top: 5px">
            <el-col :span="12" style="text-align: left">
            </el-col>
            <el-col :span="12" style="text-align: right">
                <el-link @click="router.push('/')">点击登录</el-link>
            </el-col>
        </el-row>
        <div style="margin-top: 40px">
            <el-button style="width: 270px" type="success" plain @click="doValid">验证</el-button>
        </div>
    </div>
    <div style="text-align: center;margin: 0 20px" v-if="active===1">
        <div style="margin-top: 60px">
            <div style="font-size: 25px">重置密码</div>
            <div style="font-size: 14px;color: grey">在下方输入您的信息重置密码</div>
        </div>
        <div style="margin-top: 50px">
            <el-form :model="form" status-icon :rules="rules" ref="formRef">
                <el-form-item prop="password">
                    <el-input v-model="form.password" type="password" placeholder="新密码">
                        <template #prefix>
                            <el-icon slot="prefix"><Lock /></el-icon>
                        </template>
                    </el-input>
                </el-form-item>
                <el-form-item prop="checkPassword">
                    <el-input v-model="form.checkPassword" type="password" placeholder="确认密码">
                        <template #prefix>
                            <el-icon slot="prefix"><Lock /></el-icon>
                        </template>
                    </el-input>
                </el-form-item>
            </el-form>
        </div>
        <el-row style="margin-top: 5px">
            <el-col :span="12" style="text-align: left">
            </el-col>
            <el-col :span="12" style="text-align: right">
                <el-link @click="router.push('/')">点击登录</el-link>
            </el-col>
        </el-row>
        <div style="margin-top: 40px">
            <el-button style="width: 270px" type="success" plain @click="doUpdate">重置密码</el-button>
        </div>
    </div>
</template>

<script setup>

import {Lock, User} from "@element-plus/icons-vue";
import {reactive, ref} from "vue";
import {ElMessage} from "element-plus";
import {doPost} from "@/net";
import router from "@/router";

const active = ref(0);
const formRef = ref();
const form = reactive({
    username: '',
    password: '',
    checkPassword: '',
})

const doValid = ()=>{
    formRef.value.validate((isValid) =>{
        if(isValid){
            doPost('/user/auth/valid', {
                username: form.username,
            }, (RestBean)=>{
                ElMessage.success(RestBean.message)
                active.value=1;

            })
        }
    })

}

const doUpdate = ()=>{
    formRef.value.validate((isValid)=>{
        if(isValid){
            doPost('/user/auth/updatePassword', {
                username: form.username,
                password: form.password,
                checkPassword: form.checkPassword,
            }, (RestBean)=>{
                ElMessage.success(RestBean.message);
                router.push('/');
            })
        }
    })

}

// 表单校验规则

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

const validateCheckPwd = (rule, value, callback)=>{
    if(!/^(?=.*[a-zA-Z])(?=.*\d).{3,12}$/.test(value)){
        callback("密码应由字母、数字、特殊字符中任意2种组成,且长度为3-12");
    } else if(value !== form.password){
        callback("两次密码不一致")
    } else{
        callback();
    }
}

const rules = {
    username: [
        { required: true, message: '请输入学号', trigger: 'blur' },
        { validator: validateUsername, trigger: 'blur' }
    ],
    password: [
        { required: true, message: '请输入新密码', trigger: 'blur' },
        { validator: validatePwd, trigger: 'blur' }
    ],
    checkPassword: [
        { required: true, message: '请确认密码', trigger: 'blur' },
        { validator: validateCheckPwd, trigger: ['blur', 'change'] }
    ]
}

</script>

<style scoped>

</style>