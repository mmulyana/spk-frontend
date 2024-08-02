import {
  Button,
  Flex,
  Modal,
  PasswordInput,
  Select,
  TextInput,
} from '@mantine/core'
import {
  useCreateAkun,
  useDeleteAkun,
  useDetailAkun,
  useUpdateAkun,
} from '../../../utils/use-akun'
import { useForm } from '@mantine/form'
import { useEffect } from 'react'

export function EditModal({ openedEdit, handleClose, id }) {
  const { mutate } = useUpdateAkun()
  const { data, isLoading } = useDetailAkun(id)

  const form = useForm({
    mode: 'uncontrolled',
    initialValues: {
      id: '',
      nama: '',
      email: '',
      role: '',
      password: '',
    },
  })

  useEffect(() => {
    if (!isLoading) {
      const akun = data?.data.data
      form.setValues({
        id: akun?.id,
        nama: akun?.nama,
        email: akun?.email,
        role:
          akun?.role.at(0).toUpperCase() + akun?.role.slice(1).toLowerCase(),
      })
    }
  }, [isLoading, data])

  const submit = (data) => {
    mutate(
      { ...data, role: data.role.toUpperCase() },
      {
        onSuccess: () => {
          handleClose()
          form.reset()
        },
      }
    )
  }

  return (
    <Modal opened={openedEdit} onClose={handleClose} title='Edit Akun'>
      <form className='flex flex-col gap-4' onSubmit={form.onSubmit(submit)}>
        <Flex gap={8} direction='column'>
          <TextInput
            className='hidden'
            key={form.key('id')}
            {...form.getInputProps('id')}
          />
          <TextInput
            label='Nama'
            key={form.key('nama')}
            {...form.getInputProps('nama')}
          />
          <TextInput
            label='Email'
            key={form.key('email')}
            {...form.getInputProps('email')}
          />
          <Select
            label='Role'
            placeholder='select'
            data={['Admin', 'Manager']}
            key={form.key('role')}
            {...form.getInputProps('role')}
          />
          <PasswordInput
            label='Password'
            key={form.key('password')}
            {...form.getInputProps('password')}
          />
          <Button mt={16} display='block' size='sm' ml='auto' type='submit'>
            Tambah
          </Button>
        </Flex>
      </form>
    </Modal>
  )
}

export function DeleteModal({ openedDelete, handleClose, id }) {
  const { mutate } = useDeleteAkun()

  const submit = () => {
    mutate(id)
    handleClose()
  }

  return (
    <Modal opened={openedDelete} onClose={handleClose} title='Hapus Akun'>
      <div>
        <p className='text-lg text-center'>Anda yakin ingin hapus data ini?</p>
        <Button
          mt={20}
          display='block'
          size='sm'
          ml='auto'
          color='red'
          onClick={submit}
        >
          Hapus
        </Button>
      </div>
    </Modal>
  )
}

export function AddModal({ openedAdd, handleClose }) {
  const { mutate } = useCreateAkun()

  const form = useForm({
    mode: 'uncontrolled',
    initialValues: {
      nama: '',
      email: '',
      role: '',
      password: '',
    },
  })

  const submit = async (data) => {
    await mutate(
      {
        ...data,
        role: data.role ? data.role.toUpperCase() : 'MANAGER',
      },
      {
        onSuccess: () => {
          form.reset()
          handleClose()
        },
      }
    )
  }

  return (
    <Modal opened={openedAdd} onClose={handleClose} title='Tambah Akun'>
      <form className='flex flex-col gap-4' onSubmit={form.onSubmit(submit)}>
        <Flex gap={8} direction='column'>
          <TextInput
            label='Nama'
            key={form.key('nama')}
            {...form.getInputProps('nama')}
          />
          <TextInput
            label='Email'
            key={form.key('email')}
            {...form.getInputProps('email')}
          />
          <Select
            label='Role'
            placeholder='select'
            data={['Admin', 'Manager']}
            key={form.key('role')}
            {...form.getInputProps('role')}
          />
          <PasswordInput
            label='Password'
            key={form.key('password')}
            {...form.getInputProps('password')}
          />
          <Button mt={16} display='block' size='sm' ml='auto' type='submit'>
            Tambah
          </Button>
        </Flex>
      </form>
    </Modal>
  )
}
