import { defineStore } from 'pinia';
import { ref} from 'vue'
import { getEmail } from '@/composables/auth.request'

export const useUserStore = defineStore('user', ()=> {
  const userData = ref({
    email: "",
  })
  const loadUserEmail = async () => {
    const data = await getEmail();
    userData.value.email = data.email;
  };
  return {
    userData,
    loadUserEmail
  };
});
