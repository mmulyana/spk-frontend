import { useMutation, useQuery, useQueryClient } from 'react-query'
import { URL } from './constant/_urls'
import http from './http'

const createAkun = async (payload) => {
  return await http.post(URL.AKUN, payload)
}
const updateAkun = async (payload) => {
  return await http.patch(`${URL.AKUN}/${payload.id}`, payload)
}
const deleteAkun = async (id) => {
  return await http.delete(`${URL.AKUN}/${id}`)
}
const getAkun = async (id) => {
  if (!!id) return await http(`${URL.AKUN}/${id}`)
  return await http(URL.AKUN)
}

export const useAkun = () => {
  return useQuery({
    queryFn: getAkun,
    queryKey: [KEYS.AKUN],
  })
}

export const useDetailAkun = (id) => {
  return useQuery({
    queryFn: () => getAkun(id),
    queryKey: [KEYS.AKUN, id],
    enabled: !!id,
  })
}

export const useCreateAkun = () => {
  const queryClient = useQueryClient()

  const { mutate } = useMutation({
    mutationFn: createAkun,
    onError: (error) => {
      toast.error('Gagal menambah akun, silahkan ulangi')
    },
    onSuccess: (data) => {
      toast.success('Akun berhasil ditambahkan')
      queryClient.invalidateQueries([KEYS.AKUN])
    },
  })

  return { mutate }
}

export const useUpdateAkun = (id) => {
  const queryClient = useQueryClient()

  const { mutate } = useMutation({
    mutationFn: updateAkun,
    onError: (error) => {
      toast.error('Gagal mengupdate akun, silahkan ulangi')
    },
    onSuccess: (data) => {
      toast.success('Akun berhasil diupdate')
      queryClient.invalidateQueries([KEYS.AKUN])
    },
  })

  return { mutate }
}

export const useDeleteAkun = (id) => {
  const queryClient = useQueryClient()

  const { mutate } = useMutation({
    mutationFn: deleteAkun,
    onError: (error) => {
      toast.error('Gagal menghapus akun, silahkan ulangi')
    },
    onSuccess: (data) => {
      toast.success('Akun berhasil dihapus')
      queryClient.invalidateQueries([KEYS.AKUN])
    },
  })

  return { mutate }
}
