import {
  Button,
  Flex,
  Modal,
  NumberInput,
  Select,
  Textarea,
  TextInput,
} from '@mantine/core'
import { useForm } from '@mantine/form'
import {
  useCreateKriteria,
  useDetailKriteria,
  useUpdateKriteria,
  useDeleteKriteria,
} from '../../../utils/use-kriteria'
import { useEffect } from 'react'

export function EditModal({ openedEdit, handleClose, id }) {
  const { data, isLoading } = useDetailKriteria(id)
  const { mutate } = useUpdateKriteria()

  const form = useForm({
    mode: 'uncontrolled',
    initialValues: {
      id: '',
      nama: '',
      bobot: 0,
      minimum: 0,
      keterangan: '',
      tipe: '',
    },
  })

  useEffect(() => {
    if (!isLoading) {
      const kriteria = data?.data?.data
      form.setValues({
        bobot: kriteria?.bobot,
        nama: kriteria?.nama,
        minimum: kriteria?.minimum,
        keterangan: kriteria?.keterangan,
        id: kriteria?.id,
        tipe: kriteria?.tipe,
      })
    }
  }, [isLoading, data])

  const submit = (data) => {
    const payload = {
      ...data,
      bobot: parseFloat(data.bobot),
      minimum: parseFloat(data.minimum),
    }
    mutate(payload)
    handleClose()
  }

  return (
    <Modal opened={openedEdit} onClose={handleClose} title='Edit Kriteria'>
      <form onSubmit={form.onSubmit(submit)}>
        <Flex direction='column' gap={8}>
          <TextInput
            key={form.key('id')}
            {...form.getInputProps('id')}
            className='hidden'
          />
          <TextInput
            label='Nama'
            key={form.key('nama')}
            {...form.getInputProps('nama')}
          />
          <NumberInput
            label='Bobot'
            key={form.key('bobot')}
            {...form.getInputProps('bobot')}
          />
          <NumberInput
            label='Bobot minimum'
            key={form.key('minimum')}
            {...form.getInputProps('minimum')}
            />
          <Select
            label='Tipe'
            placeholder='Pilih tipe'
            data={['Benefit', 'Cost']}
            key={form.key('tipe')}
            {...form.getInputProps('tipe')}
          />
          <Textarea
            label='keterangan'
            key={form.key('keterangan')}
            {...form.getInputProps('keterangan')}
          />
          <Button mt={16} display='block' size='sm' type='submit'>
            Simpan
          </Button>
        </Flex>
      </form>
    </Modal>
  )
}

export function DeleteModal({ openedDelete, handleClose, id }) {
  const { mutate } = useDeleteKriteria()

  const submit = () => {
    mutate(id)
    handleClose()
  }

  return (
    <Modal opened={openedDelete} onClose={handleClose} title='Hapus Kriteria'>
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
  const { mutate } = useCreateKriteria()
  const form = useForm({
    mode: 'uncontrolled',
    initialValues: {
      nama: '',
      bobot: 0,
      minimum: 0,
      keterangan: '',
      tipe: '',
    },
  })

  const submit = (data) => {
    const payload = {
      ...data,
      bobot: parseFloat(data.bobot),
      minimum: parseFloat(data.minimum),
    }
    mutate(payload, {
      onSuccess: () => {
        handleClose()
        form.reset()
      },
    })
  }

  return (
    <Modal opened={openedAdd} onClose={handleClose} title='Tambah Kriteria'>
      <form onSubmit={form.onSubmit(submit)}>
        <Flex direction='column' gap={8}>
          <TextInput
            label='Nama'
            key={form.key('nama')}
            {...form.getInputProps('nama')}
          />
          <NumberInput
            label='Bobot'
            key={form.key('bobot')}
            {...form.getInputProps('bobot')}
          />
          <NumberInput
            label='Bobot minimum'
            key={form.key('minimum')}
            {...form.getInputProps('minimum')}
          />
          <Select
            label='Tipe'
            placeholder='Pilih tipe'
            data={['Benefit', 'Cost']}
            key={form.key('tipe')}
            {...form.getInputProps('tipe')}
          />
          <Textarea
            label='keterangan'
            key={form.key('keterangan')}
            {...form.getInputProps('keterangan')}
          />
          <Button mt={8} display='block' size='sm' ml='auto' type='submit'>
            Tambah
          </Button>
        </Flex>
      </form>
    </Modal>
  )
}
