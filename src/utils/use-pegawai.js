import { useMutation, useQuery, useQueryClient } from 'react-query'
import { URL } from './constant/_urls'
import http from './http'
import { KEYS } from './constant/_key'
import { toast } from 'sonner'

const createPegawai = async (payload) => {
  return await http.post(URL.PEGAWAI, payload)
}
const updatePegawai = async (payload) => {
  return await http.patch(`${URL.PEGAWAI}/${payload.id}`, payload)
}
const deletePegawai = async (id) => {
  return await http.delete(`${URL.PEGAWAI}/${id}`)
}
const getPegawai = async (params) => {
  const query = new URLSearchParams(params).toString()
  return await http(`${URL.PEGAWAI}?${query}`)
}
const getDetailPegawai = async (id) => {
  return await http(`${URL.PEGAWAI}/${id}`)
}

export const usePegawai = (params) => {
  return useQuery({
    queryFn: () => getPegawai(params),
    queryKey: [KEYS.PEGAWAI, { ...params }],
  })
}

export const useDetailPegawai = (id) => {
  return useQuery({
    queryFn: () => getDetailPegawai(id),
    queryKey: [KEYS.PEGAWAI, id],
    enabled: !!id,
  })
}

export const useCreatePegawai = () => {
  const queryClient = useQueryClient()

  const { mutate } = useMutation({
    mutationFn: createPegawai,
    onError: (error) => {
      toast.error('Gagal menambah pegawai, silahkan ulangi')
    },
    onSuccess: (data) => {
      toast.success('pegawai berhasil ditambahkan')
      queryClient.invalidateQueries([KEYS.PEGAWAI])
    },
  })

  return { mutate }
}

export const useUpdatePegawai = (id) => {
  const queryClient = useQueryClient()

  const { mutate } = useMutation({
    mutationFn: updatePegawai,
    onError: (error) => {
      toast.error('Gagal mengupdate pegawai, silahkan ulangi')
    },
    onSuccess: (data) => {
      toast.success('Pegawai berhasil diupdate')
      queryClient.invalidateQueries([KEYS.PEGAWAI])
    },
  })

  return { mutate }
}

export const useDeletePegawai = () => {
  const queryClient = useQueryClient()

  const { mutate } = useMutation({
    mutationFn: deletePegawai,
    onError: (error) => {
      toast.error('Gagal menghapus pegawai, silahkan ulangi')
    },
    onSuccess: (data) => {
      toast.success('Pegawai berhasil dihapus')
      queryClient.invalidateQueries([KEYS.PEGAWAI])
    },
  })

  return { mutate }
}
