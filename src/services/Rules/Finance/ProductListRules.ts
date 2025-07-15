export function useProductRules() {
  const rules = {
    require: (u: unknown) => !!u || 'Обязательное поле',
  }

  return { rules }
}
