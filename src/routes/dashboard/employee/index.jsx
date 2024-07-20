import { PencilIcon, PlusIcon, TrashIcon } from '@heroicons/react/16/solid'
import DashboardLayout from '../layout'
import {
  Badge,
  Button,
  Chip,
  Flex,
  Modal,
  Pagination,
  rem,
  Select,
  Table,
  Textarea,
  TextInput,
  Tooltip,
} from '@mantine/core'
import { useEffect, useMemo, useState } from 'react'
import { useDisclosure } from '@mantine/hooks'
import { useTitle } from '../../../utils/useTitle'
import {
  ApplySpkModal,
  CreateModal,
  EditApplySpkModal,
  ModalDelete,
  ModalEdit,
  SuccessCreateModal,
} from './modal'
import { useNavigate } from 'react-router-dom'
import { IconCheck, IconX } from '@tabler/icons-react'
import useUrlState from '@ahooksjs/use-url-state'
import { PATH } from '../../../utils/constant/_path'

export default function Page() {
  useTitle('Pegawai')

  const navigate = useNavigate()

  const [id, setId] = useState(null)
  const [modalState, setModalState] = useState('add')
  const [url, setUrl] = useUrlState({ apply: '' })

  const [openedEdit, { open: openEdit, close: closeEdit }] =
    useDisclosure(false)
  const [openedDelete, { open: openDelete, close: closeDelete }] =
    useDisclosure(false)
  const [openedAdd, { open: openAdd, close: closeAdd }] = useDisclosure(false)
  const [openedDetail, { open: openDetail, close: closeDetail }] =
    useDisclosure(false)

  const data = useMemo(
    () => [
      {
        id: 'A1',
        name: 'Bambang',
        position: 'pegawai',
        status: 'done',
      },
      {
        id: 'A2',
        name: 'Fahmi',
        position: 'pegawai',
        status: 'done',
      },
      {
        id: 'A3',
        name: 'Siti',
        position: 'intern',
        status: 'not',
      },
      {
        id: 'A4',
        name: 'Ilham',
        position: 'pegawai',
        status: 'not',
      },
    ],
    []
  )

  const onDeleteModal = (onClose) => {
    onClose?.()
  }

  useEffect(() => {
    if (!openedAdd) {
      setModalState('add')
    }
  }, [openedAdd])

  const modalOpenConfig = {
    add: {
      component: <CreateModal setModalState={setModalState} />,
      title: 'Tambah Pegawai',
      size: 'xl',
    },
    afterAdd: {
      component: <SuccessCreateModal setModalState={setModalState} />,
      title: '',
      size: 'lg',
    },
    mark: {
      component: (
        <ApplySpkModal closeAdd={closeAdd} setModalState={setModalState} />
      ),
      title: 'Buat Penilaian Pegawai',
      size: 'lg',
    },
  }

  const handleClose = () => {
    if (id !== null) setId(null)

    if (openedDelete) closeDelete()

    if (openedEdit) closeEdit()

    if (openedAdd) closeAdd()

    if (openedDetail) closeDetail()
  }

  const rows = data.map((d, index) => (
    <Table.Tr key={index} className='hover:bg-gray-50/50'>
      <Table.Td>{d.id}</Table.Td>
      <Table.Td>{d.name}</Table.Td>
      <Table.Td>{d.position}</Table.Td>
      <Table.Td>
        {d.status === 'done' ? (
          <Badge variant='light' color='blue' size='sm'>
            <Flex align='center' gap={2}>
              <IconCheck style={{ width: rem(16), height: rem(16) }} />
              Selesai
            </Flex>
          </Badge>
        ) : (
          <Tooltip
            label='Klik untuk membuat penilaian'
            onClick={() => {
              setUrl({ apply: d.id })
              openDetail()
            }}
          >
            <Badge
              className='!cursor-pointer'
              variant='light'
              color='red'
              size='sm'
            >
              <Flex align='center' gap={6}>
                <IconX style={{ width: rem(16), height: rem(16) }} />
                Belum diberi nilai
              </Flex>
            </Badge>
          </Tooltip>
        )}
      </Table.Td>
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
                <Table.Th className='bg-[#F6F7F9]'>
                  <span className='text-sm font-medium'>Status</span>
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

      <ModalEdit
        handleClose={handleClose}
        openedEdit={openedEdit}
        setModalState={setModalState}
      />

      <ModalDelete handleClose={handleClose} openedDelete={openedDelete} />

      <Modal
        opened={openedAdd}
        onClose={() => onDeleteModal(closeAdd)}
        title={modalOpenConfig[modalState].title}
        size={modalOpenConfig[modalState].size}
      >
        {modalOpenConfig[modalState].component}
      </Modal>

      <EditApplySpkModal
        openedDetail={openedDetail}
        onClose={handleClose}
        id={url.apply}
      />
    </>
  )
}
