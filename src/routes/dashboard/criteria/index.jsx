import { PencilIcon, PlusIcon, TrashIcon } from '@heroicons/react/16/solid'
import {
  Button,
  Flex,
  Table,
} from '@mantine/core'
import { useMemo, useState } from 'react'
import { useDisclosure } from '@mantine/hooks'
import { useTitle } from '../../../utils/useTitle'
import DashboardLayout from '../layout'
import { useKriteria } from '../../../utils/use-kriteria'
import { AddModal, DeleteModal, EditModal } from './modal'

export default function Page() {
  const [id, setId] = useState(null)
  useTitle('Kriteria')
  const { data: dataKriteria, isLoading } = useKriteria()

  const [openedEdit, { open: openEdit, close: closeEdit }] =
    useDisclosure(false)
  const [openedDelete, { open: openDelete, close: closeDelete }] =
    useDisclosure(false)
  const [openedAdd, { open: openAdd, close: closeAdd }] = useDisclosure(false)

  const data = useMemo(() => {
    if (isLoading) return []
    return dataKriteria?.data?.data
  }, [dataKriteria, isLoading])

  const handleClose = () => {
    if (id !== null) setId(null)

    if (openDelete) closeDelete()

    if (openedEdit) closeEdit()

    if (openAdd) closeAdd()
  }

  const rows = data.map((d, index) => (
    <Table.Tr key={index} className='hover:bg-gray-50/50'>
      <Table.Td>{d.nama}</Table.Td>
      <Table.Td>{d.bobot}</Table.Td>
      <Table.Td>{d.tipe}</Table.Td>
      <Table.Td>{d.keterangan}</Table.Td>
      <Table.Td className='flex justify-between'>
        <Button
          variant='transparent'
          className='hover:!bg-white'
          onClick={() => {
            setId(d.id)
            openEdit()
          }}
        >
          <PencilIcon className='text-gray-400 h-4 w-4' />
        </Button>
        <Button
          variant='transparent'
          className='hover:!bg-white'
          onClick={() => {
            setId(d.id)
            openDelete()
          }}
        >
          <TrashIcon className='text-red-500 h-4 w-4' />
        </Button>
      </Table.Td>
    </Table.Tr>
  ))

  return (
    <>
      <DashboardLayout>
        <div className='bg-white p-4 mt-4 rounded-lg border border-gray-600/10'>
          <div className='flex items-center justify-between mb-4'>
            <p className='text-gray-700 font-medium'>Kriteria</p>
            <Button
              onClick={() => openAdd()}
              variant='filled'
              py={4}
              pl={6}
              pr={12}
            >
              <Flex align='center' gap={2}>
                <PlusIcon className='text-white w-4 h-4' />
                <span className='text-sm font-normal'>Tambah kriteria</span>
              </Flex>
            </Button>
          </div>
          <Table className='rounded-md'>
            <Table.Thead>
              <Table.Tr className='!border-none'>
                <Table.Th className='rounded-l-md bg-[#F6F7F9]'>
                  <span className='text-sm font-medium'>Nama</span>
                </Table.Th>
                <Table.Th className='bg-[#F6F7F9]'>
                  <span className='text-sm font-medium'>Bobot</span>
                </Table.Th>
                <Table.Th className='bg-[#F6F7F9]'>
                  <span className='text-sm font-medium'>Tipe</span>
                </Table.Th>
                <Table.Th className='bg-[#F6F7F9]'>
                  <span className='text-sm font-medium'>Keterangan</span>
                </Table.Th>
                <Table.Th className='w-[120px] bg-[#F6F7F9] rounded-r-md'></Table.Th>
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>{rows}</Table.Tbody>
          </Table>
        </div>
      </DashboardLayout>

      <AddModal openedAdd={openedAdd} handleClose={handleClose} />
      <EditModal openedEdit={openedEdit} handleClose={handleClose} id={id} />
      <DeleteModal
        openedDelete={openedDelete}
        handleClose={handleClose}
        id={id}
      />
    </>
  )
}
