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
import { IconCheck, IconX } from '@tabler/icons-react'
import { usePegawai } from '../../../utils/use-pegawai'
import { roundUpToDecimalPlace } from '../../../utils/decimal'
import useUrlState from '@ahooksjs/use-url-state'

export default function Page() {
  useTitle('Pegawai')
  const [url, setUrl] = useUrlState({ page: 1 })

  const { data: dataPegawai, isLoading } = usePegawai({
    ...(url.page ? { page: url.page } : undefined),
  })

  const [id, setId] = useState(null)
  const [modalState, setModalState] = useState('add')

  const [openedAdd, { open: openAdd, close: closeAdd }] = useDisclosure(false)
  const [openedEdit, { open: openEdit, close: closeEdit }] =
    useDisclosure(false)
  const [openedDelete, { open: openDelete, close: closeDelete }] =
    useDisclosure(false)
  const [openedDetail, { open: openDetail, close: closeDetail }] =
    useDisclosure(false)

  const data = useMemo(() => {
    if (isLoading) return []
    return dataPegawai?.data?.data
  }, [dataPegawai, isLoading])

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
      component: <CreateModal setModalState={setModalState} setId={setId} />,
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
        <ApplySpkModal
          closeAdd={closeAdd}
          setModalState={setModalState}
          id={id}
        />
      ),
      title: 'Buat Penilaian Pegawai',
      size: 'lg',
    },
  }

  const handleClose = () => {
    if (id !== null) setId(null)

    if (openedDelete) closeDelete()

    if (openedEdit) closeEdit()

    if (openedAdd) {
      closeAdd()

      setModalState('add')
    }

    if (openedDetail) closeDetail()
  }

  const rows = data?.map((d, index) => (
    <Table.Tr key={index} className='hover:bg-gray-50/50'>
      <Table.Td>{d.nama}</Table.Td>
      <Table.Td>{d.jabatan}</Table.Td>
      <Table.Td>
        {d.status === 'SUDAH' ? (
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
              setId(d.id)
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
      <Table.Td>
        {isNaN(d?.hasil?.[0]?.nilai)
          ? null
          : roundUpToDecimalPlace(d?.hasil?.[0]?.nilai, 1)}
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
                <Table.Th className='bg-[#F6F7F9]'>
                  <span className='text-sm font-medium'>Nama</span>
                </Table.Th>
                <Table.Th className='bg-[#F6F7F9]'>
                  <span className='text-sm font-medium'>Jabatan</span>
                </Table.Th>
                <Table.Th className='bg-[#F6F7F9]'>
                  <span className='text-sm font-medium'>Status</span>
                </Table.Th>
                <Table.Th className='bg-[#F6F7F9]'>
                  <span className='text-sm font-medium'>Nilai</span>
                </Table.Th>
                <Table.Th className='w-[120px] bg-[#F6F7F9] rounded-r-md'></Table.Th>
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>{rows}</Table.Tbody>
          </Table>

          <Flex justify='end' mt={16}>
            <Pagination
              total={dataPegawai?.data.pagination.totalPages || 10}
              size='sm'
              radius='xs'
              value={dataPegawai?.data.pagination.currentPage}
              onChange={(e) => setUrl({ page: e })}
            />
          </Flex>
        </div>
      </DashboardLayout>

      <ModalEdit
        handleClose={handleClose}
        openedEdit={openedEdit}
        setModalState={setModalState}
        id={id}
      />

      <ModalDelete
        handleClose={handleClose}
        openedDelete={openedDelete}
        id={id}
      />

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
        id={id}
      />
    </>
  )
}
