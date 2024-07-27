import { useMutation, useQuery, useQueryClient } from 'react-query'
import { URL } from './constant/_urls'
import http from './http'
import { KEYS } from './constant/_key'
import { toast } from 'sonner'

const createKriteria = async (payload) => {
  return await http.post(URL.KRITERIA, payload)
}
const updateKriteria = async (payload) => {
  return await http.patch(`${URL.KRITERIA}/${payload.id}`, payload)
}
const deleteKriteria = async (id) => {
  return await http.delete(`${URL.KRITERIA}/${id}`)
}
const getAllKriteria = async () => {
  return await http(URL.KRITERIA)
}
const getDetailKriteria = async (id) => {
  return await http(`${URL.KRITERIA}/${id}`)
}

export const useKriteria = () => {
  return useQuery({
    queryFn: getAllKriteria,
    queryKey: [KEYS.KRITERIA],
  })
}

export const useDetailKriteria = (id) => {
  return useQuery({
    queryFn: () => getDetailKriteria(id),
    queryKey: [KEYS.KRITERIA, id],
    enabled: !!id,
  })
}

export const useCreateKriteria = () => {
  const queryClient = useQueryClient()

  const { mutate } = useMutation({
    mutationFn: createKriteria,
    onError: (error) => {
      toast.error('Gagal menambah kriteria, silahkan ulangi')
    },
    onSuccess: (data) => {
      toast.success('Kriteria berhasil ditambahkan')
      queryClient.invalidateQueries([KEYS.KRITERIA])
    },
  })

  return { mutate }
}

export const useUpdateKriteria = (id) => {
  const queryClient = useQueryClient()

  const { mutate } = useMutation({
    mutationFn: updateKriteria,
    onError: (error) => {
      toast.error('Gagal mengupdate kriteria, silahkan ulangi')
    },
    onSuccess: (data) => {
      toast.success('Kriteria berhasil diupdate')
      queryClient.invalidateQueries([KEYS.KRITERIA])
    },
  })

  return { mutate }
}

export const useDeleteKriteria = (id) => {
  const queryClient = useQueryClient()

  const { mutate } = useMutation({
    mutationFn: deleteKriteria,
    onError: (error) => {
      toast.error('Gagal menghapus kriteria, silahkan ulangi')
    },
    onSuccess: (data) => {
      toast.success('Kriteria berhasil dihapus')
      queryClient.invalidateQueries([KEYS.KRITERIA, id])
      queryClient.invalidateQueries([KEYS.KRITERIA])
    },
  })

  return { mutate }
}
