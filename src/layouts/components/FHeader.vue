<template>
  <div class="f-header">
    <span class="logo">
      <el-icon class="mr-1"><ElemeFilled /></el-icon>
      vue3管理系统
    </span>
    <el-icon class="icon-btn" @click="$store.commit('handleAsideWidth')">
      <Fold v-if="$store.state.asideWidth == '250px'" />
      <Expand v-else />
    </el-icon>
    <el-tooltip effect="dark" content="刷新" placement="bottom">
      <el-icon class="icon-btn" @click="handleRefresh"><Refresh /></el-icon>
    </el-tooltip>
    <div class="ml-auto flex items-center">
      <el-tooltip effect="dark" content="全屏" placement="bottom">
        <el-icon class="icon-btn" @click="toggle">
          <FullScreen v-if="!isFullscreen" />
          <aim v-else />
        </el-icon>
      </el-tooltip>
      <el-dropdown class="drpodown" @command="handleCommand">
        <span class="flex items-center text-light-50">
          <el-avatar class="mr-2" :size="25" :src="$store.state.user.avatar" />
          {{ $store.state.user.username }}
          <el-icon class="el-icon--right">
            <arrow-down />
          </el-icon>
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item command="rePassword">修改密码</el-dropdown-item>
            <el-dropdown-item command="logout">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>

  <FormDrawer ref="formDrawerRef" title="修改密码" destroyOnClose @submit="onSubmit">
    <el-form :model="form" ref="formRef" :rules="rules" label-width="80px" size="small">
      <!-- 用户名 -->
      <el-form-item prop="oldpassword" label="旧密码">
        <el-input v-model="form.oldpassword" placeholder="请输入旧密码"> </el-input>
      </el-form-item>
      <!-- 密码 -->
      <el-form-item prop="password" label="新密码">
        <el-input v-model="form.password" type="password" placeholder="请输入新密码" show-password> </el-input>
      </el-form-item>
      <!-- 确认密码 -->
      <el-form-item prop="repassword" label="确认密码">
        <el-input v-model="form.repassword" type="password" placeholder="请输入确认密码" show-password> </el-input>
      </el-form-item>
    </el-form>
  </FormDrawer>
</template>

<script setup>
import FormDrawer from '~/components/FormDrawer.vue'
import { useFullscreen } from '@vueuse/core'
import { useRepassword, useLogout } from '~/composables/useManager'

// 全屏，切换
const { isFullscreen, toggle } = useFullscreen()
const { formDrawerRef, form, rules, formRef, onSubmit, openRePasswordForm } = useRepassword()
const { handleLogout } = useLogout()
const handleCommand = (c) => {
  switch (c) {
    case 'logout':
      handleLogout()
      break
    case 'rePassword':
      /* showDrawer.value = true*/
      openRePasswordForm()
      break
  }
}

// 刷新
const handleRefresh = () => location.reload()
</script>

<style>
.f-header {
  @apply flex items-center bg-cyan-600 text-light-50 fixed top-0 left-0 right-0;
  height: 64px;
  z-index: 1000;
}
.logo {
  width: 250px;
  @apply flex justify-center items-center text-xl font-thin;
}
.icon-btn {
  @apply flex justify-center items-center;
  width: 43px;
  height: 64px;
  cursor: pointer;
}
.icon-btn:hover {
  @apply bg-cyan-500;
}
.f-header .drpodown {
  height: 64px;
  cursor: pointer;
  @apply flex justify-center items-center mx-5;
}
</style>