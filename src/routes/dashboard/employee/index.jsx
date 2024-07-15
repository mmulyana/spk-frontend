import { PencilIcon, PlusIcon, TrashIcon } from '@heroicons/react/16/solid'
import DashboardLayout from '../_component/layout'
import {
  Button,
  Flex,
  Modal,
  Pagination,
  Select,
  Table,
  Textarea,
  TextInput,
} from '@mantine/core'
import { useMemo, useState } from 'react'
import { useDisclosure } from '@mantine/hooks'
import { useTitle } from '../../../utils/useTitle'

export default function Page() {
  const [id, setId] = useState(null)
  const [modalState, setModalState] = useState('add')
  useTitle('Pegawai')

  const [openedEdit, { open: openEdit, close: closeEdit }] =
    useDisclosure(false)
  const [openedDelete, { open: openDelete, close: closeDelete }] =
    useDisclosure(false)
  const [openedAdd, { open: openAdd, close: closeAdd }] = useDisclosure(false)

  const data = useMemo(
    () => [
      {
        id: 'A1',
        name: 'Bambang',
        position: 'pegawai',
      },
      {
        id: 'A2',
        name: 'Fahmi',
        position: 'pegawai',
      },
      {
        id: 'A3',
        name: 'Siti',
        position: 'intern',
      },
      {
        id: 'A4',
        name: 'Ilham',
        position: 'pegawai',
      },
    ],
    []
  )

  const onDeleteModal = (onClose) => {
    onClose?.()
    setTimeout(() => setModalState('add'), 500)
  }

  const modalOpenConfig = {
    add: {
      component: (
        <form className='w-full'>
          <Flex gap={16} w='100%'>
            <TextInput w='50%' label='Nama' />
            <TextInput w='50%' label='NIP' />
          </Flex>
          <Flex gap={16} w='100%' mt={16}>
            <TextInput w='50%' label='Tempat Lahir' />
            <TextInput w='50%' label='Tanggal Lahir' type='date' />
          </Flex>
          <Flex gap={16} w='100%' mt={16}>
            <Select
              w='50%'
              label='Jenis Kelamin'
              placeholder='Pilih Jenis Kelamin'
              data={['Laki-laki', 'perempuan']}
            />
            <TextInput w='50%' label='Agama' />
          </Flex>
          <Textarea mt={16} label='Alamat' />
          <Flex gap={16} w='100%' mt={16}>
            <Select
              w='50%'
              label='Pendidikan Terakhir'
              placeholder='Pilih Pendidikan Terakhir'
              data={['SMP', 'SMA', 'D1', 'D2', 'D3', 'D4', 'S1', 'S2', 'S3']}
            />
            <Select
              w='50%'
              label='Status Pegawai'
              placeholder='Pilih Status Pegawai'
              data={['Tetap', 'Kontrak']}
            />
          </Flex>
          <Flex gap={16} w='100%' mt={16}>
            <Select
              w='50%'
              label='Departemen'
              placeholder='Pilih Departemen'
              data={['Produksi', 'Keuangan', 'Marketing', 'Sales']}
            />
            <Select
              w='50%'
              label='Jabatan'
              placeholder='Pilih Jabatan'
              data={['Intern', 'Pegawai', 'Supervisor']}
            />
          </Flex>
          <Button
            mt={20}
            display='block'
            size='sm'
            ml='auto'
            onClick={() => setModalState('afterAdd')}
          >
            Tambah
          </Button>
        </form>
      ),
      title: 'Tambah Pegawai',
      size: 'xl',
    },
    afterAdd: {
      component: (
        <div>
          <p className='text-lg text-center'>Buat Penilaian Pegawai Baru</p>
          <Flex gap={16} w='100%' mt={24}>
            <Button
              w='50%'
              size='sm'
              variant='default'
              onClick={() => setModalState('add')}
            >
              Tambah Pegawai Baru
            </Button>
            <Button w='50%' size='sm' onClick={() => setModalState('mark')}>
              Buat Penilaian
            </Button>
          </Flex>
        </div>
      ),
      title: '',
      size: 'sm',
    },
    mark: {
      component: (
        <div>
          <p>Penilaian Pegawai</p>
          <Button
            onClick={() => {
              closeAdd()
              setModalState('add')
            }}
          >
            Selesai
          </Button>
        </div>
      ),
      title: 'Penilaian Pegawai',
      size: 'xl',
    },
  }

  const handleClose = () => {
    if (id !== null) setId(null)

    if (openDelete) closeDelete()

    if (openedEdit) closeEdit()

    if (openAdd) closeAdd()
  }

  const rows = data.map((d, index) => (
    <Table.Tr key={index} className='hover:bg-gray-50/50'>
      <Table.Td>{d.id}</Table.Td>
      <Table.Td>{d.name}</Table.Td>
      <Table.Td>{d.position}</Table.Td>
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
                <span className='text-sm font-normal'>Tambah Pegawai</span>
              </Flex>
            </Button>
          </div>
          <Table className='rounded-md'>
            <Table.Thead>
              <Table.Tr className='!border-none'>
                <Table.Th className='rounded-l-md bg-[#F6F7F9]'>
                  <span className='text-sm font-medium'>Id</span>
                </Table.Th>
                <Table.Th className='bg-[#F6F7F9]'>
                  <span className='text-sm font-medium'>Nama</span>
                </Table.Th>
                <Table.Th className='bg-[#F6F7F9]'>
                  <span className='text-sm font-medium'>Jabatan</span>
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

      <Modal opened={openedEdit} onClose={handleClose} title='Edit Pegawai' size='xl'>
        <form className='w-full'>
          <Flex gap={16} w='100%'>
            <TextInput w='50%' label='Nama' />
            <TextInput w='50%' label='NIP' />
          </Flex>
          <Flex gap={16} w='100%' mt={16}>
            <TextInput w='50%' label='Tempat Lahir' />
            <TextInput w='50%' label='Tanggal Lahir' type='date' />
          </Flex>
          <Flex gap={16} w='100%' mt={16}>
            <Select
              w='50%'
              label='Jenis Kelamin'
              placeholder='Pilih Jenis Kelamin'
              data={['Laki-laki', 'perempuan']}
            />
            <TextInput w='50%' label='Agama' />
          </Flex>
          <Textarea mt={16} label='Alamat' />
          <Flex gap={16} w='100%' mt={16}>
            <Select
              w='50%'
              label='Pendidikan Terakhir'
              placeholder='Pilih Pendidikan Terakhir'
              data={['SMP', 'SMA', 'D1', 'D2', 'D3', 'D4', 'S1', 'S2', 'S3']}
            />
            <Select
              w='50%'
              label='Status Pegawai'
              placeholder='Pilih Status Pegawai'
              data={['Tetap', 'Kontrak']}
            />
          </Flex>
          <Flex gap={16} w='100%' mt={16}>
            <Select
              w='50%'
              label='Departemen'
              placeholder='Pilih Departemen'
              data={['Produksi', 'Keuangan', 'Marketing', 'Sales']}
            />
            <Select
              w='50%'
              label='Jabatan'
              placeholder='Pilih Jabatan'
              data={['Intern', 'Pegawai', 'Supervisor']}
            />
          </Flex>
          <Button
            mt={20}
            display='block'
            size='sm'
            ml='auto'
            onClick={() => setModalState('afterAdd')}
          >
            Tambah
          </Button>
        </form>
      </Modal>

      <Modal opened={openedDelete} onClose={handleClose} title='Hapus Pegawai'>
        <div>
          <p className='text-lg text-center'>
            Anda yakin ingin hapus data ini?
          </p>
          <Button mt={20} display='block' size='sm' ml='auto' color='red'>
            Hapus
          </Button>
        </div>
      </Modal>

      <Modal
        opened={openedAdd}
        onClose={() => onDeleteModal(closeAdd)}
        title={modalOpenConfig[modalState].title}
        size={modalOpenConfig[modalState].size}
      >
        {modalOpenConfig[modalState].component}
      </Modal>
    </>
  )
}
