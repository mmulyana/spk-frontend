import {
  IconCheck,
  IconFilter,
  IconSearch,
  IconSortAscending,
  IconX,
} from '@tabler/icons-react'
import {
  Button,
  Flex,
  Input,
  Pagination,
  Popover,
  rem,
  Select,
  Skeleton,
  Table,
} from '@mantine/core'
import { useTitle } from '../../../utils/useTitle'
import { usePeringkat } from '../../../utils/use-peringkat'
import { roundUpToDecimalPlace } from '../../../utils/decimal'
import useUrlState from '@ahooksjs/use-url-state'
import { role } from '../../../data/common'
import DashboardLayout from '../layout'
import { useEffect, useMemo, useState } from 'react'
import { useDebounce } from '@uidotdev/usehooks'
import { useNavigate } from 'react-router-dom'
import { PATH } from '../../../utils/constant/_path'

function isObjectNotEmpty(data) {
  for (const item of data) {
    if (typeof item === 'string' && item.trim() !== '') {
      return true
    }
  }

  return false
}

export default function Page() {
  useTitle('Peringkat')
  const [search, setSearch] = useState('')
  const debouncedSearch = useDebounce(search, 300)
  const navigate = useNavigate()

  const [url, setUrl] = useUrlState({
    jenis_kelamin: '',
    sort: 'desc',
    jabatan: '',
    nama: '',
  })

  const { data: dataRangking, isLoading } = usePeringkat({
    ...(url.sort !== '' ? { sort: url.sort } : undefined),
    ...(url.jenis_kelamin !== ''
      ? { jenis_kelamin: url['jenis_kelamin'] }
      : undefined),
    ...(url.nama !== '' ? { nama: url.nama } : undefined),
    ...(url.jabatan !== '' ? { jabatan: url.jabatan } : undefined),
  })

  const data = useMemo(() => {
    if (isLoading) return []
    return dataRangking?.data?.data
  }, [dataRangking, isLoading])

  const isReset = useMemo(() => {
    return isObjectNotEmpty([
      url.jabatan,
      url.jenis_kelamin,
      url.nama,
      url.sort !== 'desc' ? 'asc' : '',
    ])
  }, [url])

  useEffect(() => {
    if (debouncedSearch) {
      setUrl({ ...url, nama: search })
    }
  }, [debouncedSearch])

  const rows = data.map((d, index) => (
    <Table.Tr key={index} className='hover:bg-gray-50/50'>
      <Table.Td>{d.pegawai.nama}</Table.Td>
      <Table.Td>{d.pegawai.NIP}</Table.Td>
      <Table.Td>{d.pegawai.jabatan}</Table.Td>
      <Table.Td>{roundUpToDecimalPlace(d.nilai, 1)}</Table.Td>
      <Table.Td>{d.peringkat}</Table.Td>
    </Table.Tr>
  ))

  return (
    <>
      <DashboardLayout>
        <div className='bg-white p-4 mt-4 rounded-lg border border-gray-600/10'>
          <div className='flex items-center justify-between mb-4'>
            <p className='text-gray-700 font-medium'>Peringkat</p>
          </div>
          <Flex justify='space-between' align='center' mb={16}>
            <Input
              placeholder='Cari'
              leftSection={<IconSearch className='w-4' />}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <Flex gap={8} align='center'>
              {isReset && (
                <Button
                  variant='light'
                  color='red'
                  size='compact-sm'
                  onClick={() => {
                    navigate(PATH.DASHBOARD_RESULT)
                  }}
                >
                  <IconX className='w-4' />
                  Reset
                </Button>
              )}
              <Popover width={300} position='bottom-end' withArrow shadow='md'>
                <Popover.Target>
                  <Button
                    pl={5}
                    size='compact-sm'
                    className='!bg-transparent !text-gray-900 hover:!bg-gray-100'
                  >
                    <Flex align='center' gap={4}>
                      <IconFilter className='w-5 text-gray-400' />
                      <span>Filter</span>
                    </Flex>
                  </Button>
                </Popover.Target>
                <Popover.Dropdown>
                  <Flex direction='column' gap={8}>
                    <Select
                      label='Jenis Kelamin'
                      placeholder='Select'
                      comboboxProps={{ withinPortal: false }}
                      data={['Laki-laki', 'Perempuan']}
                      defaultValue={url['jenis_kelamin']}
                      onChange={(e) => setUrl({ ...url, jenis_kelamin: e })}
                    />
                    <Select
                      label='Jabatan'
                      placeholder='Select'
                      comboboxProps={{ withinPortal: false }}
                      data={role}
                      defaultValue={url.jabatan}
                      onChange={(e) => setUrl({ ...url, jabatan: e })}
                    />
                  </Flex>
                </Popover.Dropdown>
              </Popover>

              <Popover width={300} position='bottom-end' withArrow shadow='md'>
                <Popover.Target>
                  <Button
                    pl={5}
                    size='compact-sm'
                    className='!bg-transparent !text-gray-900 hover:!bg-gray-100'
                  >
                    <Flex align='center' gap={4}>
                      <IconSortAscending className='w-5 text-gray-400' />
                      <span>Sort</span>
                    </Flex>
                  </Button>
                </Popover.Target>
                <Popover.Dropdown>
                  <Flex direction='column' gap={4}>
                    <Button
                      justify='space-between'
                      variant={
                        url.sort == 'desc' || url.sort == ''
                          ? 'filled'
                          : 'subtle'
                      }
                      className='!font-normal'
                      fullWidth
                      onClick={() => {
                        setUrl({ ...url, sort: 'desc' })
                      }}
                      rightSection={
                        url.sort == 'desc' ? (
                          <IconCheck
                            style={{ width: rem(16), height: rem(16) }}
                          />
                        ) : null
                      }
                    >
                      Urut dari rangking teratas
                    </Button>
                    <Button
                      className='!font-normal'
                      variant={url.sort == 'asc' ? 'filled' : 'subtle'}
                      justify='space-between'
                      fullWidth
                      onClick={() => {
                        setUrl({ ...url, sort: 'asc' })
                      }}
                      rightSection={
                        url.sort == 'asc' ? (
                          <IconCheck
                            style={{ width: rem(16), height: rem(16) }}
                          />
                        ) : null
                      }
                    >
                      Urut dari rangking terbawah
                    </Button>
                  </Flex>
                </Popover.Dropdown>
              </Popover>
            </Flex>
          </Flex>
          <Table className='rounded-md'>
            <Table.Thead>
              <Table.Tr className='!border-none'>
                <Table.Th className='rounded-l-md bg-[#F6F7F9]'>
                  <span className='text-sm font-medium'>Name</span>
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
                <Table.Th className='bg-[#F6F7F9]'>
                  <span className='text-sm font-medium'>Peringkat</span>
                </Table.Th>
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>{isLoading ? <TableSkeleton /> : rows}</Table.Tbody>
          </Table>

          <Flex justify='end' mt={16}>
            <Pagination total={10} size='sm' radius='xs' value={1} />
          </Flex>
        </div>
      </DashboardLayout>
    </>
  )
}

function TableSkeleton() {
  return (
    <Table.Tr className='hover:bg-gray-50/50'>
      {[1, 2, 3, 4, 5].map((_, idx) => (
        <Table.Td key={idx}>
          <Skeleton height={20} radius='xl' />
        </Table.Td>
      ))}
    </Table.Tr>
  )
}
