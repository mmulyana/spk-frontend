import { PencilIcon, PlusIcon, TrashIcon } from '@heroicons/react/16/solid'
import {
  Button,
  Flex,
  Modal,
  Pagination,
  Select,
  Table,
  TextInput,
} from '@mantine/core'
import { useMemo, useState } from 'react'
import { useDisclosure } from '@mantine/hooks'
import { useTitle } from '../../../../utils/useTitle'
import { accounts } from '../../../../data/table'
import DashboardLayout from '../../_component/layout'

export default function Page() {
  const [id, setId] = useState(null)
  useTitle('Akun')

  const [openedEdit, { open: openEdit, close: closeEdit }] =
    useDisclosure(false)
  const [openedDelete, { open: openDelete, close: closeDelete }] =
    useDisclosure(false)
  const [openedAdd, { open: openAdd, close: closeAdd }] = useDisclosure(false)

  const data = useMemo(() => accounts, [])

  const handleClose = () => {
    if (id !== null) setId(null)

    if (openDelete) closeDelete()

    if (openedEdit) closeEdit()

    if (openAdd) closeAdd()
  }

  const rows = data.map((d, index) => (
    <Table.Tr key={index} className='hover:bg-gray-50/50'>
      <Table.Td>{d.name}</Table.Td>
      <Table.Td>{d.email}</Table.Td>
      <Table.Td>{d.role}</Table.Td>
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
            <p className='text-gray-700 font-medium'>Pegawai</p>
            <Button
              onClick={() => openAdd()}
              variant='filled'
              py={4}
              pl={6}
              pr={12}
            >
              <Flex align='center' gap={2}>
                <PlusIcon className='text-white w-4 h-4' />
                <span className='text-sm font-normal'>Tambah Akun</span>
              </Flex>
            </Button>
          </div>
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
                <Table.Th className='w-[120px] bg-[#F6F7F9] rounded-r-md'></Table.Th>
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>{rows}</Table.Tbody>
          </Table>

          <Flex justify='end' mt={16}>
            <Pagination total={10} size='sm' radius='xs' value={1} />
          </Flex>
        </div>
      </DashboardLayout>

      <Modal opened={openedEdit} onClose={handleClose} title='Edit Akun'>
        <form className='flex flex-col gap-4'>
          <TextInput label='Nama' />
          <TextInput label='Email' />
          <Select
            label='Jabatan'
            placeholder='select'
            data={['Admin', 'Manager']}
          />
          <Button mt={20} display='block' size='sm' ml='auto'>
            Simpan
          </Button>
        </form>
      </Modal>

      <Modal opened={openedDelete} onClose={handleClose} title='Hapus Akun'>
        <div>
          <p className='text-lg text-center'>
            Anda yakin ingin hapus data ini?
          </p>
          <Button mt={20} display='block' size='sm' ml='auto' color='red'>
            Hapus
          </Button>
        </div>
      </Modal>

      <Modal opened={openedAdd} onClose={handleClose} title='Tambah Akun'>
        <form className='flex flex-col gap-4'>
          <TextInput label='Nama' />
          <TextInput label='Email' />
          <Select
            label='Jabatan'
            placeholder='select'
            data={['Admin', 'Manager']}
          />
          <Button mt={20} display='block' size='sm' ml='auto'>
            Tambah
          </Button>
        </form>
      </Modal>
    </>
  )
}
