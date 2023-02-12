import { ElNotification, ElMessage, ElMessageBox } from 'element-plus'
import nProgress from 'nprogress'

// 消息提示
export function toast(message, type = 'success', dangerouslyUseHTMLString = true) {
  // ElNotification({
  //   message,
  //   type,
  //   dangerouslyUseHTMLString,
  //   duration: 3000,
  // })
  ElMessage({
    message,
    type,
    dangerouslyUseHTMLString,
    duration: 3000,
  })
}

// 弹框
export function showModal(content = "提示", type = "Warning", title = "") {
  return ElMessageBox.confirm(
    content,
    type,
    {
      confirmButtonText: '确认',
      cancelButtonText: '取消',
      type,
    }
  )
}

// 显示全屏loading
export function showFullLoading() {
  nProgress.start()
}
// 隐藏全屏loading
export function hideFullLoading() {
  nProgress.done()
}

// 弹出输入框
export function showPrompt(tip, value = '') {
  return ElMessageBox.prompt(tip, '', {
    confirmButtonText: '确认',
    cancelButtonText: '取消',
    inputValue: value
  })
}