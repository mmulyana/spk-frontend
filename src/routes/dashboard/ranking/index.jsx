import {
  IconCheck,
  IconFilter,
  IconSearch,
  IconSortAscending,
} from '@tabler/icons-react'
import {
  Button,
  Flex,
  Input,
  Menu,
  Pagination,
  Popover,
  rem,
  Select,
  Table,
} from '@mantine/core'
import { useTitle } from '../../../utils/useTitle'
import { employees } from '../../../data/table'
import DashboardLayout from '../layout'
import { useMemo } from 'react'

export default function Page() {
  useTitle('Peringkat')

  const data = useMemo(() => employees, [])

  const rows = data.map((d, index) => (
    <Table.Tr key={index} className='hover:bg-gray-50/50'>
      <Table.Td>{d.name}</Table.Td>
      <Table.Td>{d.email}</Table.Td>
      <Table.Td>{d.role}</Table.Td>
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
            />
            <Flex gap={8} align='center'>
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
                    />
                    <Select
                      label='Jabatan'
                      placeholder='Select'
                      comboboxProps={{ withinPortal: false }}
                      data={['Pegawai', 'Supervisor', 'Manager']}
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
                      variant='filled'
                      className='!font-normal'
                      fullWidth
                      rightSection={
                        <IconCheck
                          style={{ width: rem(16), height: rem(16) }}
                        />
                      }
                    >
                      Urut dari rangking teratas
                    </Button>
                    <Button
                      className='!font-normal'
                      variant='subtle'
                      justify='space-between'
                      fullWidth
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
                  <span className='text-sm font-medium'>Email</span>
                </Table.Th>
                <Table.Th className='bg-[#F6F7F9]'>
                  <span className='text-sm font-medium'>Jabatan</span>
                </Table.Th>
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>{rows}</Table.Tbody>
          </Table>

          <Flex justify='end' mt={16}>
            <Pagination total={10} size='sm' radius='xs' value={1} />
          </Flex>
        </div>
      </DashboardLayout>
    </>
  )
}
