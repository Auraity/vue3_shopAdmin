import store from "~/store"
function hasPermission(value, el = false) {
  if (!Array.isArray(value)) {
    throw new Error("需要配置权限")
  }
  const hasAuth = value.findIndex(v => store.state.ruleNames.includes(v)) != -1
  if (el && !hasAuth) {
    el.parentNode?.removeChild(el)
  }
  return hasAuth
}

export default {
  install(app) {
    app.directive('permission', (el, binding) => {
      // 这会在 `mounted` 和 `updated` 时都调用
      hasPermission(binding.value, el)
    })
  }
}