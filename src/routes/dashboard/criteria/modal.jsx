import {
  Button,
  Flex,
  Modal,
  Select,
  Slider,
  Text,
  Textarea,
  TextInput,
} from '@mantine/core'
import { useForm } from '@mantine/form'
import { useCreateKriteria } from '../../../utils/use-kriteria'

export function EditModal({ openedEdit, handleClose, id }) {
  return (
    <Modal opened={openedEdit} onClose={handleClose} title='Edit Kriteria'>
      <form>
        <TextInput label='Nama' />
        <TextInput label='Nilai' mt={8} />
        <Button mt={20} display='block' size='sm' ml='auto'>
          Simpan
        </Button>
      </form>
    </Modal>
  )
}

export function DeleteModal({ openedDelete, handleClose, id }) {
  return (
    <Modal opened={openedDelete} onClose={handleClose} title='Hapus Kriteria'>
      <div>
        <p className='text-lg text-center'>Anda yakin ingin hapus data ini?</p>
        <Button mt={20} display='block' size='sm' ml='auto' color='red'>
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
    },
  })

  const submit = (data) => {
    mutate(data)
    handleClose()
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
          <TextInput
            label='Bobot'
            key={form.key('bobot')}
            {...form.getInputProps('bobot')}
          />
          <TextInput
            label='Bobot minimum'
            key={form.key('minimum')}
            {...form.getInputProps('minimum')}
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
