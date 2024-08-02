import { useQuery } from 'react-query'
import { URL } from './constant/_urls'
import http from './http'
import { KEYS } from './constant/_key'

const getPeringkat = async (params) => {
  const query = new URLSearchParams(params).toString()
  return await http(`${URL.PERINGKAT}?${query}`)
}

export const usePeringkat = (params) => {
  return useQuery({
    queryFn: () => getPeringkat(params),
    queryKey: [KEYS.PERINGKAT, {...params}],
  })
}
