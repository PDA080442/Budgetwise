import { useApi } from './useApiCheck'

const { call } = useApi('/api/cheques')

export async function checkUpload(file: File): Promise<void> {
  const formData = new FormData()
  formData.append('qrfile', file)
  await call('/upload/', formData, 'POST')
}
