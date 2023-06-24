<template>
  <router-view />
</template>

<script setup>
import {useStore} from "@/stores";
import {nextTick, provide, ref} from "vue";

const store = useStore()
const user = localStorage.getItem("user")

if(user != null){
    store.auth.user = JSON.parse(user);
}

</script>

<style scoped>

</style>
