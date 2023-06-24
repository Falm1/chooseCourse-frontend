<template>
    <div style="height: 100vh">
        <el-container style="height: 100vh">
            <el-aside :width="isCollapse ? '70px' : '220px'" style="border-right: solid 1px #d3d3d3; transition: 0.5s">
                <el-image src="https://upload.shejihz.com/2020/05/cb906dc8169e03a9d986094834579f5d.jpg"></el-image>
                <el-menu
                    :default-active="router.currentRoute.value.path"
                    style="border-right: none"
                    router
                    :collapse="isCollapse"
                >
                    <el-menu-item index="/index">
                        <el-icon><location /></el-icon>
                        <span>我要选课</span>
                    </el-menu-item>
                    <el-menu-item index="/index/myCourse">
                        <el-icon><icon-menu /></el-icon>
                        <span>已选课程</span>
                    </el-menu-item>
                    <el-menu-item index="/index/myGrade">
                        <el-icon><setting /></el-icon>
                        <span>我的成绩</span>
                    </el-menu-item>
                </el-menu>
            </el-aside>
            <el-container>
                <el-header style="border-bottom: solid 1px #d3d3d3; padding: 0 20px 0 0">
                    <div style="display: flex; padding: 7px 0">
                        <div style="margin-top: 6px">
                            <el-button :icon="isCollapse ? Expand : Fold" text
                                       style="font-size: 25px"
                                       @click="isCollapse = !isCollapse"/>
                        </div>
                        <div style="flex: 1; text-align: center">
                            <el-input
                                v-model="input3"
                                placeholder="搜索课程..."
                                style="width: 300px;margin-top: 6px"
                                class="input-with-select"
                            >
                                <template #prefix>
                                    <el-icon><Search/></el-icon>
                                </template>
                            </el-input>
                        </div>
                        <div style="display: flex">
                            <div style="text-align: right;margin-right: 8px;margin-top: 8px;line-height: 15px">
                                <div style="font-weight: bold">{{store.auth.user.name}}</div>
                                <div style="font-size: 13px">{{store.auth.user.username}}</div>
                            </div>
                            <el-dropdown>
                                <span class="el-dropdown-link">
                                  <el-avatar class="avatar" :size="45" :src="store.auth.user.avatar" />
                                </span>
                                <template #dropdown>
                                    <el-dropdown-menu>
                                        <el-dropdown-item>
                                            <el-icon><location /></el-icon>
                                            修改信息
                                        </el-dropdown-item>
                                        <el-dropdown-item style="color: #e59797" divided/>
                                        <el-dropdown-item @click="doLogout" style="color: red">
                                            <el-icon><location /></el-icon>
                                            退出登录
                                        </el-dropdown-item>
                                    </el-dropdown-menu>
                                </template>
                            </el-dropdown>
                        </div>
                    </div>
                </el-header>
                <el-main style="padding: 0">
                    <router-view v-slot="{ Component }">
                        <transition name="el-zoom-in-center">
                            <component :is="Component" style="height: 100%"/>
                        </transition>
                    </router-view>
                </el-main>
            </el-container>
        </el-container>
    </div>
</template>


<script setup>

import {doGet} from "@/net";
import {ElMessage} from "element-plus";
import {useStore} from "@/stores";
import router from "@/router";
import {Location, Setting, Menu as IconMenu, Search, Expand, Fold} from "@element-plus/icons-vue";
import {ref} from "vue";

const store = useStore();
const isCollapse = ref(false);
const doLogout = ()=>{
    doGet('/user/auth/logout', (RestBean)=>{
        ElMessage.success(RestBean.message);
        store.auth.user = null;
        localStorage.removeItem("user");
        router.push('/');
    })
}

</script>

<style scoped>
.avatar {
    cursor: pointer;
}
</style>