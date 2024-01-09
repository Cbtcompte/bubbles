import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { accountService } from '@/services/account.service.js'

export const useUserStore = defineStore('user', () => {
  const user = ref({})

  const getUser = computed(() => user.value)

  async function login(data) {
    await accountService.login(data)
  }

  async function register(data) {
    user.value = await accountService.register(data)
  }

  function update() {

  }

  return {user, getUser, login, register, update}
})
