import { useMutation, useQueryClient } from 'react-query'
import { URL } from './constant/_urls'
import http from './http'
import { toast } from 'sonner'
import { KEYS } from './constant/_key'

const spkFetcher = async (payload) => {
  return http.post(URL.SPK, payload)
}

export const useCreateSPK = () => {
  const queryClient = useQueryClient()

  const { mutate } = useMutation({
    mutationFn: spkFetcher,
    onError: (err) => {
      toast.error(err.response.data.message)
    },
    onSuccess: (data) => {
      toast.success('Perhitungan berhasil dibuat')
      queryClient.invalidateQueries([KEYS.PEGAWAI])
    },
  })

  return { mutate }
}
