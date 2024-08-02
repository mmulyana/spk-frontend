import { Flex, Table } from '@mantine/core'
import { useTitle } from '../../utils/useTitle'
import DashboardLayout from './layout'
import { useMemo } from 'react'
import { criteria, employees } from '../../data/table'
import {
  FunnelIcon,
  TrophyIcon,
  UserIcon,
  UsersIcon,
} from '@heroicons/react/24/solid'
import { useDashboard } from '../../utils/use-dashboard'
import { roundUpToDecimalPlace } from '../../utils/decimal'

export default function MainDashboard() {
  useTitle('Dashboard')
  const { data: dataDashboard, isLoading } = useDashboard()

  const data = useMemo(() => {
    if (isLoading) return []
    return dataDashboard?.data?.data
  }, [dataDashboard, isLoading])

  const criteriaRows = data?.kriteria?.map((d, index) => (
    <Table.Tr key={index} className='hover:bg-gray-50/50'>
      <Table.Td>{d.nama}</Table.Td>
      <Table.Td>{d.bobot}</Table.Td>
    </Table.Tr>
  ))

  const employeeRows = data?.pegawai?.map((d, index) => (
    <Table.Tr key={index} className='hover:bg-gray-50/50'>
      <Table.Td>{d.pegawai.nama}</Table.Td>
      <Table.Td>{d.pegawai.NIP}</Table.Td>
      <Table.Td>{d.pegawai.jabatan}</Table.Td>
      <Table.Td>{roundUpToDecimalPlace(d.nilai, 1)}</Table.Td>
    </Table.Tr>
  ))

  return (
    <DashboardLayout>
      <div className='mt-4'>
        <div className='grid grid-cols-4 gap-4'>
          <div className='bg-white rounded-lg border border-gray-600/10 h-22 p-4'>
            <Flex align='center' gap={8}>
              <div className='h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center m-0'>
                <UsersIcon className='h-5 w-5 text-blue-600' />
              </div>
              <div>
                <p className='text-sm text-gray-400'>Pegawai</p>
                <p className='text-4xl font-medium text-gray-700'>
                  {data?.count?.pegawai}
                </p>
              </div>
            </Flex>
          </div>
          <div className='bg-white rounded-lg border border-gray-600/10 h-22 p-4'>
            <Flex align='center' gap={8}>
              <div className='flex-0 h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center m-0'>
                <TrophyIcon className='h-5 w-5 text-blue-600' />
              </div>
              <div className='flex-1'>
                <p className='text-sm text-gray-400'>Pegawai Dinilaii</p>
                <p className='text-2xl font-medium text-gray-700'>
                  {data?.count?.nilai} <span className='text-sm text-gray-400 font-normal'>dari</span>  {data?.count?.pegawai}
                </p>
              </div>
            </Flex>
          </div>
          <div className='bg-white rounded-lg border border-gray-600/10 h-22 p-4'>
            <Flex align='center' gap={8}>
              <div className='h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center m-0'>
                <FunnelIcon className='h-5 w-5 text-blue-600' />
              </div>
              <div>
                <p className='text-sm text-gray-400'>Kriteria</p>
                <p className='text-4xl font-medium text-gray-700'>
                  {data?.count?.kriteria}
                </p>
              </div>
            </Flex>
          </div>
          <div className='bg-white rounded-lg border border-gray-600/10 h-22 p-4'>
            <Flex align='center' gap={8}>
              <div className='h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center m-0'>
                <UserIcon className='h-5 w-5 text-blue-600' />
              </div>
              <div>
                <p className='text-sm text-gray-400'>Akun</p>
                <p className='text-4xl font-medium text-gray-700'>
                  {data?.count?.akun}
                </p>
              </div>
            </Flex>
          </div>
        </div>
        <div className='grid grid-cols-2 gap-4'>
          <div className='bg-white p-4 mt-4 rounded-lg border border-gray-600/10'>
            <div className='flex items-center justify-between mb-4'>
              <p className='text-gray-700 font-medium'>Pegawai Terbaik</p>
            </div>
            <Table className='rounded-md'>
              <Table.Thead>
                <Table.Tr className='!border-none'>
                  <Table.Th className='bg-[#F6F7F9]'>
                    <span className='text-sm font-medium'>Nama</span>
                  </Table.Th>
                  <Table.Th className='bg-[#F6F7F9]'>
                    <span className='text-sm font-medium'>NIP</span>
                  </Table.Th>
                  <Table.Th className='bg-[#F6F7F9]'>
                    <span className='text-sm font-medium'>Jabatan</span>
                  </Table.Th>
                  <Table.Th className='bg-[#F6F7F9]'>
                    <span className='text-sm font-medium'>Nilai</span>
                  </Table.Th>
                </Table.Tr>
              </Table.Thead>
              <Table.Tbody>{employeeRows}</Table.Tbody>
            </Table>
          </div>
          <div className='bg-white p-4 mt-4 rounded-lg border border-gray-600/10'>
            <div className='flex items-center justify-between mb-4'>
              <p className='text-gray-700 font-medium'>Kriteria</p>
            </div>
            <Table className='rounded-md'>
              <Table.Thead>
                <Table.Tr className='!border-none'>
                  <Table.Th className='rounded-l-md bg-[#F6F7F9]'>
                    <span className='text-sm font-medium'>Nama</span>
                  </Table.Th>
                  <Table.Th className='bg-[#F6F7F9]'>
                    <span className='text-sm font-medium'>Value</span>
                  </Table.Th>
                  <Table.Th className='w-[120px] bg-[#F6F7F9] rounded-r-md'></Table.Th>
                </Table.Tr>
              </Table.Thead>
              <Table.Tbody>{criteriaRows}</Table.Tbody>
            </Table>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
