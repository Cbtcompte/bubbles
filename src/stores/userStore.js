import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import localforage from 'localforage'

export const useUserStore = defineStore('user', () => {
  const user = ref({})

  const getUser = computed(() => user.value)

  async function login(data) {

  }

  async function register(data) {
    
  }

  function update() {

  }

  return {user, getUser, login, register, update}
})
