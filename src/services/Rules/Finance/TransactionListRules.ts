import { computed, type Ref } from 'vue'
import type { Transaction } from '@/types/transaction.type'

export function useTransactionRules(record: Ref<Transaction>) {
  const rules = {
    require: (v: string) => !!v || 'Обязательное поле',
    negative: (v: string) => Number(v) > 0 || 'Сумма должна быть положительной',
  }
  const formValid = computed(
    () =>
      rules.require(String(record.value.amount)) === true &&
      rules.require(record.value.date) === true &&
      rules.require(String(record.value.category)) === true &&
      rules.require(String(record.value.type)) === true &&
      rules.negative(String(record.value.amount)) === true &&
      rules.require(String(record.value.date)) === true,
  )
  return { rules, formValid }
}
