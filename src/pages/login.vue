<template>
  <el-row style="min-height: 100vh" class="login-container">
    <!-- 左边 -->
    <el-col :lg="16" :md="12" class="all-center">
      <div class="left">
        <div>欢迎登录</div>
      </div>
    </el-col>
    <!-- 右边 -->
    <el-col :lg="8" :md="12" class="right all-center">
      <h2 class="title">欢迎回来</h2>
      <div class="minititle all-center">
        <span class="line"></span>
        <span>账号密码登录</span>
        <span class="line"></span>
      </div>
      <!-- 表单 -->
      <el-form :model="form" ref="formRef" class="w-[250px]" :rules="rules">
        <!-- 用户名 -->
        <el-form-item prop="username">
          <el-input v-model="form.username" placeholder="请输入用户">
            <template #prefix>
              <el-icon><User /></el-icon>
            </template>
          </el-input>
        </el-form-item>
        <!-- 密码 -->
        <el-form-item prop="password">
          <el-input v-model="form.password" type="password" placeholder="请输入密码" show-password>
            <template #prefix>
              <el-icon><Lock /></el-icon>
            </template>
          </el-input>
        </el-form-item>
        <!-- 按钮 -->
        <el-form-item>
          <el-button type="primary" color="#0891b2" @click="onSubmit" class="w-[250px]" round :loading="loading">登录</el-button>
        </el-form-item>
      </el-form>
    </el-col>
  </el-row>
</template>

<script setup>
import { reactive, ref, onMounted, onBeforeUnmount } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
import { toast } from '~/composables/utils'

const router = useRouter()
const store = useStore()

const form = reactive({
  username: '',
  password: '',
})

// 表单校验
const rules = {
  username: [{ required: true, message: '用户名不能为空', trigger: 'blur' }],
  password: [
    { required: true, message: '密码不能为空', trigger: 'blur' },
    { min: 3, max: 10, message: '密码长度为3到10个字符', trigger: 'blur' },
  ],
}

const formRef = ref(null)
const loading = ref(false)

const onSubmit = () => {
  formRef.value.validate((valid) => {
    if (!valid) {
      return false
    }
    loading.value = true
    store
      .dispatch('login', form)
      .then((res) => {
        toast('登录成功')
        // 跳转到后台首页
        router.push('/')
      })
      .finally(() => {
        loading.value = false
      })
  })
}
// 监听回车事件
function onKeyUp(e) {
  if (e.key == 'Enter') onSubmit()
}
// 添加键盘监听
onMounted(() => {
  document.addEventListener('keyup', onKeyUp)
})
// 移除键盘监听
onBeforeUnmount(() => {
  document.removeEventListener('keyup', onKeyUp)
})
</script>

<style>
.all-center {
  @apply flex items-center justify-center;
}
.line {
  @apply h-[1px] w-16 bg-gray-200;
}
.login-container {
  @apply min-h-screen bg-cyan-600;
}
.left > div:first-child {
  @apply font-bold text-5xl text-light-50 mb-4;
}
/* .left > div:last-child {
  @apply text-gray-300 text-sm;
} */
.right {
  @apply bg-light-50 flex-col;
}
.minititle {
  @apply my-5 text-gray-300 space-x-2;
}
.title {
  @apply font-bold text-3xl text-gray-800;
}
</style>