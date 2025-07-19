import { isEmail } from 'validator'

export function useEntranceRules() {
  const rules = {
    require: (u: string) => !!u || 'Поле нужно заполнить',
    email: (u: string) => isEmail(u) || 'Введен неправильный mail',
    passwordmin: (u: string) => u?.length >= 6 || 'Минимальная длина - 6 символов',
  }

  return { rules }
}
