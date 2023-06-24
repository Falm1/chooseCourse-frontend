<template>
    <div style="width: 100vw;height: 100vh;overflow: hidden;display: flex">
        <div style="flex: 1;">
            <el-image style="width: 100%;height: 100%"
                      src="https://pic2.zhimg.com/v2-e474456ff7eb285d6423152354f40056_r.jpg?source=1940ef5c"/>
        </div>
        <div class="welcome-title">
            <div style="font-size: 30px; font-weight: bold">欢迎来到选课系统</div>
            <div style="margin-top: 10px">在这里你可以自定义你的课程，选择你的喜好，丰富你的知识</div>
            <div style="margin-top: 10px">你也可以查看你的成绩，查看你的排名</div>
        </div>
        <div style="width: 400px;background-color: white;z-index: 1">
            <router-view v-slot="{ Component }">
                <transition name="el-zoom-in-center">
                    <component :is="Component" style="height: 100%"/>
                </transition>
            </router-view>
        </div>
    </div>
</template>

<script>
import {Lock, User} from "@element-plus/icons-vue";

export default {
    name: "WelcomeView",
    components: {Lock, User}
}
</script>

<style scoped>
.welcome-title{
    position: absolute;
    bottom: 30px;
    left: 30px;
    color: white;
    text-shadow: 0 0 10px black;
}
</style>