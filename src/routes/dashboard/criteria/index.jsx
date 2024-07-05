import { PencilIcon, PlusIcon, TrashIcon } from '@heroicons/react/16/solid'
import DashboardLayout from '../_component/layout'
import {
  Button,
  Flex,
  Modal,
  Pagination,
  Table,
  TextInput,
} from '@mantine/core'
import { useMemo, useState } from 'react'
import { useDisclosure } from '@mantine/hooks'
import { useTitle } from '../../../utils/useTitle'

export default function Page() {
  const [id, setId] = useState(null)
  useTitle('Kriteria')

  const [openedEdit, { open: openEdit, close: closeEdit }] =
    useDisclosure(false)
  const [openedDelete, { open: openDelete, close: closeDelete }] =
    useDisclosure(false)
  const [openedAdd, { open: openAdd, close: closeAdd }] = useDisclosure(false)

  const data = useMemo(
    () => [
      {
        id: 1,
        name: 'Sangat baik',
        value: 10,
      },
      {
        id: 2,
        name: 'Baik',
        value: 8,
      },
      {
        id: 3,
        name: 'Cukup',
        value: 5,
      },
      {
        id: 4,
        name: 'Buruk',
        value: 0,
      },
    ],
    []
  )

  const handleClose = () => {
    if (id !== null) setId(null)

    if (openDelete) closeDelete()

    if (openedEdit) closeEdit()

    if (openAdd) closeAdd()
  }

  const rows = data.map((d, index) => (
    <Table.Tr key={index} className='hover:bg-gray-50'>
      <Table.Td>{d.name}</Table.Td>
      <Table.Td>{d.value}</Table.Td>
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
        <div className='flex items-center justify-between mb-4 mt-2.5'>
          <p className='text-gray-700 font-medium'>Criteria</p>
          <Button
            onClick={() => openAdd()}
            variant='filled'
            py={4}
            pl={6}
            pr={12}
          >
            <Flex align='center' gap={2}>
              <PlusIcon className='text-white w-4 h-4' />
              <span className='text-sm font-normal'>Add Criteria</span>
            </Flex>
          </Button>
        </div>
        <Table className='rounded-md'>
          <Table.Thead>
            <Table.Tr className='!border-none'>
              <Table.Th className='rounded-l-md bg-[#F2F4F7]'>
                <span className='text-sm font-medium'>Name</span>
              </Table.Th>
              <Table.Th className='bg-[#F2F4F7]'>
                <span className='text-sm font-medium'>Value</span>
              </Table.Th>
              <Table.Th className='w-[120px] bg-[#F2F4F7] rounded-r-md'></Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>{rows}</Table.Tbody>
        </Table>

        <Flex justify='end' mt={16}>
          <Pagination total={10} size='sm' radius='xs' value={1} />
        </Flex>
      </DashboardLayout>
      <Modal opened={openedEdit} onClose={handleClose} title='Edit Kriteria'>
        <form>
          <TextInput label='Nama' />
          <TextInput label='Nilai' mt={8} />
          <Button mt={20} display='block' size='sm' ml='auto'>
            Simpan
          </Button>
        </form>
      </Modal>
      <Modal opened={openedDelete} onClose={handleClose} title='Hapus Kriteria'>
        <div>
          <p className='text-lg text-center'>
            Anda yakin ingin hapus data ini?
          </p>
          <Button mt={20} display='block' size='sm' ml='auto' color='red'>
            Hapus
          </Button>
        </div>
      </Modal>
      <Modal opened={openedAdd} onClose={handleClose} title='Tambah Kriteria'>
        <form>
          <TextInput label='Nama' />
          <TextInput label='Nilai' mt={8} />
          <Button mt={20} display='block' size='sm' ml='auto'>
            Tambah
          </Button>
        </form>
      </Modal>
    </>
  )
}
