import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'
import { logdata } from '@/composables/auth.request'
import type { LoginData } from '@/types/auth.type'

export function useLoginActions() {
  const form = ref()
  const valid = ref(false)
  const router = useRouter()

  const logindata = reactive<LoginData>({
    email: '',
    password: '',
  })

  const serverErrors = reactive<{ email?: string; main?: string }>({})

  const submit = async () => {
    serverErrors.main = undefined
    if (!form.value?.validate()) return
    try {
      await logdata(logindata)
      router.push({ path: '/' })
    } catch (err) {
      if (axios.isAxiosError(err)) {
        serverErrors.main = err.response?.data?.message || 'Ошибка сервера'
      } else {
        serverErrors.main = 'Неизвестная ошибка'
      }
    }
  }

  const goToRegistration = () => router.push({ path: '/register' })

  return {
    form,
    valid,
    router,
    logindata,
    serverErrors,
    submit,
    goToRegistration,
  }
}
