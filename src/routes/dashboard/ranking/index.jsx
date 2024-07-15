import { PlusIcon } from '@heroicons/react/16/solid'
import { Button, Flex, Input, Pagination, Table } from '@mantine/core'
import { useMemo, useState } from 'react'
import { useTitle } from '../../../utils/useTitle'
import { employees } from '../../../data/table'
import DashboardLayout from '../_component/layout'
import { IconFilter, IconSearch, IconSortAscending } from '@tabler/icons-react'

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
                  <span className='text-sm font-medium'>Role</span>
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
