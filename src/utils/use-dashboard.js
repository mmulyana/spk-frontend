import { useQuery } from 'react-query'
import { KEYS } from './constant/_key'
import { URL } from './constant/_urls'
import http from './http'

const dashboardFetcher = async () => {
  return await http(URL.DASHBOARD)
}

export const useDashboard = () => {
  return useQuery({
    queryFn: dashboardFetcher,
    queryKey: [KEYS.DASHBOARD],
  })
}
