import {
  Button,
  Flex,
  Modal,
  NumberInput,
  Select,
  Text,
  Textarea,
  TextInput,
} from '@mantine/core'
import { useForm } from '@mantine/form'
import { useEffect, useMemo, useState } from 'react'
import {
  useCreatePegawai,
  useDeletePegawai,
  useDetailPegawai,
  useUpdatePegawai,
} from '../../../utils/use-pegawai'
import { useKriteria } from '../../../utils/use-kriteria'
import { useCreateSPK } from '../../../utils/use-spk'
import { departement, education, role, status } from '../../../data/common'
import { toast } from 'sonner'

function hasZero(data) {
  return Object.values(data).some((value) => value === 0)
}

export function CreateModal({ setModalState, setId }) {
  const { mutate } = useCreatePegawai()

  const form = useForm({
    mode: 'uncontrolled',
    initialValues: {
      nama: '',
      NIP: '',
      tempat_lahir: '',
      tanggal_lahir: '',
      jenis_kelamin: '',
      agama: '',
      alamat: '',
      pendidikan_terakhir: '',
      status_pegawai: '',
      departemen: '',
      jabatan: '',
    },
  })

  const submit = async (data) => {
    await mutate(data, {
      onSuccess: (data) => {
        const response = data.data.data
        setId(response.id)
        setModalState('afterAdd')
      },
    })
  }

  return (
    <form className='w-full' onSubmit={form.onSubmit(submit)}>
      <Flex gap={16} w='100%'>
        <TextInput
          w='50%'
          label='Nama'
          key={form.key('nama')}
          {...form.getInputProps('nama')}
        />
        <TextInput
          w='50%'
          label='NIP'
          key={form.key('NIP')}
          {...form.getInputProps('NIP')}
        />
      </Flex>
      <Flex gap={16} w='100%' mt={16}>
        <TextInput
          w='50%'
          label='Tempat Lahir'
          key={form.key('tempat_lahir')}
          {...form.getInputProps('tempat_lahir')}
        />
        <TextInput
          w='50%'
          label='Tanggal Lahir'
          type='date'
          key={form.key('tanggal_lahir')}
          {...form.getInputProps('tanggal_lahir')}
        />
      </Flex>
      <Flex gap={16} w='100%' mt={16}>
        <Select
          w='50%'
          label='Jenis Kelamin'
          placeholder='Pilih Jenis Kelamin'
          data={['Laki-laki', 'perempuan']}
          key={form.key('jenis_kelamin')}
          {...form.getInputProps('jenis_kelamin')}
        />
        <TextInput
          w='50%'
          label='Agama'
          key={form.key('agama')}
          {...form.getInputProps('agama')}
        />
      </Flex>
      <Textarea
        mt={16}
        label='Alamat'
        key={form.key('alamat')}
        {...form.getInputProps('alamat')}
      />
      <Flex gap={16} w='100%' mt={16}>
        <Select
          w='50%'
          label='Pendidikan Terakhir'
          placeholder='Pilih Pendidikan Terakhir'
          data={education}
          key={form.key('pendidikan_terakhir')}
          {...form.getInputProps('pendidikan_terakhir')}
        />
        <Select
          w='50%'
          label='Status Pegawai'
          placeholder='Pilih Status Pegawai'
          data={status}
          key={form.key('status_pegawai')}
          {...form.getInputProps('status_pegawai')}
        />
      </Flex>
      <Flex gap={16} w='100%' mt={16}>
        <Select
          w='50%'
          label='Departemen'
          placeholder='Pilih Departemen'
          data={departement}
          key={form.key('departemen')}
          {...form.getInputProps('departemen')}
        />
        <Select
          w='50%'
          label='Jabatan'
          placeholder='Pilih Jabatan'
          data={role}
          key={form.key('jabatan')}
          {...form.getInputProps('jabatan')}
        />
      </Flex>
      <Button mt={20} display='block' size='sm' ml='auto' type='submit'>
        Simpan
      </Button>
    </form>
  )
}

export function SuccessCreateModal({ setModalState }) {
  return (
    <div>
      <Flex justify='center'>
        <Text size='xl'>Buat Penilaian Pegawai Baru</Text>
      </Flex>
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
  )
}

export function ApplySpkModal({ closeAdd, id }) {
  const { data: dataKriteria, isLoading } = useKriteria()
  const { mutate } = useCreateSPK()

  const data = useMemo(() => {
    if (isLoading) return []
    return dataKriteria?.data?.data
  }, [dataKriteria, isLoading])

  const form = useForm({
    mode: 'uncontrolled',
  })

  async function submit(values) {
    const isHasZero = hasZero(values)
    if (isHasZero) {
      toast.error('Silahkan isi kembali dan pastikan bukan nol')
      return
    }

    const dataValues = Object.entries(values).map(([key, value]) => {
      const index = data.findIndex((d) => d.id == key.split('-')[1])
      return {
        id: Number(key.split('-')[1]),
        nilai: value,
        tipe: data[index].tipe,
      }
    })

    const payload = {
      id,
      values: dataValues,
    }
    mutate(payload, {
      onSuccess: () => {
        form.reset()
        closeAdd()
      },
    })
    onClose()
  }

  return (
    <form onSubmit={form.onSubmit(submit)}>
      <Flex direction='column' gap={20}>
        {data.map((d, index) => (
          <div key={index}>
            <NumberInput
              label={d.nama}
              min={d.minimum}
              name={d.nama + '-' + d.id}
              minimum={1}
              defaultValue={1}
              key={d.nama.split(' ').join('_') + '-' + d.id}
              {...form.getInputProps(d.nama.split(' ').join('_') + '-' + d.id)}
            />
          </div>
        ))}
      </Flex>

      <Flex justify='end' mt={24}>
        <Button type='submit'>Buat</Button>
      </Flex>
    </form>
  )
}

export function ModalEdit({ openedEdit, handleClose, setModalState, id }) {
  const { data, isLoading } = useDetailPegawai(id)
  const { mutate } = useUpdatePegawai()

  const form = useForm({
    mode: 'uncontrolled',
    initialValues: {
      id: '',
      nama: '',
      NIP: '',
      tempat_lahir: '',
      tanggal_lahir: '',
      jenis_kelamin: '',
      agama: '',
      alamat: '',
      pendidikan_terakhir: '',
      status_pegawai: '',
      departemen: '',
      jabatan: '',
    },
  })

  useEffect(() => {
    if (!isLoading) {
      const user = data?.data?.data
      form.setValues({
        id: user?.id,
        nama: user?.nama,
        NIP: user?.NIP,
        tempat_lahir: user?.tempat_lahir,
        tanggal_lahir: user?.tanggal_lahir,
        jenis_kelamin: user?.jenis_kelamin,
        agama: user?.agama,
        alamat: user?.alamat,
        pendidikan_terakhir: user?.pendidikan_terakhir,
        status_pegawai: user?.status_pegawai,
        departemen: user?.departemen,
        jabatan: user?.jabatan,
      })
    }
  }, [isLoading])

  const submit = async (data) => {
    await mutate(data, {
      onSuccess: () => {
        form.reset()
      },
    })
    handleClose()
  }

  return (
    <Modal
      opened={openedEdit}
      onClose={handleClose}
      title='Edit Pegawai'
      size='xl'
    >
      <form className='w-full' onSubmit={form.onSubmit(submit)}>
        <Flex gap={16} w='100%'>
          <TextInput
            key={form.key('id')}
            {...form.getInputProps('id')}
            className='hidden'
          />
          <TextInput
            w='50%'
            label='Nama'
            key={form.key('nama')}
            {...form.getInputProps('nama')}
          />
          <TextInput
            w='50%'
            label='NIP'
            key={form.key('NIP')}
            {...form.getInputProps('NIP')}
          />
        </Flex>
        <Flex gap={16} w='100%' mt={16}>
          <TextInput
            w='50%'
            label='Tempat Lahir'
            key={form.key('tempat_lahir')}
            {...form.getInputProps('tempat_lahir')}
          />
          <TextInput
            w='50%'
            label='Tanggal Lahir'
            type='date'
            key={form.key('tanggal_lahir')}
            {...form.getInputProps('tanggal_lahir')}
          />
        </Flex>
        <Flex gap={16} w='100%' mt={16}>
          <Select
            w='50%'
            label='Jenis Kelamin'
            placeholder='Pilih Jenis Kelamin'
            data={['Laki-laki', 'perempuan']}
            key={form.key('jenis_kelamin')}
            {...form.getInputProps('jenis_kelamin')}
          />
          <TextInput
            w='50%'
            label='Agama'
            key={form.key('agama')}
            {...form.getInputProps('agama')}
          />
        </Flex>
        <Textarea
          mt={16}
          label='Alamat'
          key={form.key('alamat')}
          {...form.getInputProps('alamat')}
        />
        <Flex gap={16} w='100%' mt={16}>
          <Select
            w='50%'
            label='Pendidikan Terakhir'
            placeholder='Pilih Pendidikan Terakhir'
            data={education}
            key={form.key('pendidikan_terakhir')}
            {...form.getInputProps('pendidikan_terakhir')}
          />
          <Select
            w='50%'
            label='Status Pegawai'
            placeholder='Pilih Status Pegawai'
            data={status}
            key={form.key('status_pegawai')}
            {...form.getInputProps('status_pegawai')}
          />
        </Flex>
        <Flex gap={16} w='100%' mt={16}>
          <Select
            w='50%'
            label='Departemen'
            placeholder='Pilih Departemen'
            data={departement}
            key={form.key('departemen')}
            {...form.getInputProps('departemen')}
          />
          <Select
            w='50%'
            label='Jabatan'
            placeholder='Pilih Jabatan'
            data={role}
            key={form.key('jabatan')}
            {...form.getInputProps('jabatan')}
          />
        </Flex>
        <Button mt={20} display='block' size='sm' ml='auto' type='submit'>
          Simpan
        </Button>
      </form>
    </Modal>
  )
}

export function ModalDelete({ openedDelete, handleClose, id }) {
  const { mutate } = useDeletePegawai()

  const submit = () => {
    mutate(id)
    handleClose()
  }

  return (
    <Modal opened={openedDelete} onClose={handleClose} title='Hapus Pegawai'>
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

export function EditApplySpkModal({ openedDetail, onClose, id }) {
  const { data: dataKriteria, isLoading } = useKriteria()
  const { mutate } = useCreateSPK()

  const data = useMemo(() => {
    if (isLoading) return []
    return dataKriteria?.data?.data
  }, [dataKriteria, isLoading])

  const form = useForm({
    mode: 'uncontrolled',
  })

  async function submit(values) {
    const isHasZero = hasZero(values)
    if (isHasZero) {
      toast.error('Silahkan isi kembali dan pastikan bukan nol')
      return
    }
    
    const dataValues = Object.entries(values).map(([key, value]) => {
      const index = data.findIndex((d) => d.id == key.split('-')[1])
      return {
        id: Number(key.split('-')[1]),
        nilai: value,
        tipe: data[index].tipe,
      }
    })

    const payload = {
      id,
      values: dataValues,
    }
    mutate(payload, {
      onSuccess: () => {
        form.reset()
      },
    })
    onClose()
  }

  return (
    <Modal
      opened={openedDetail}
      title='Buat Penilaian Pegawai'
      onClose={onClose}
    >
      <form onSubmit={form.onSubmit(submit)}>
        <Flex direction='column' gap={20}>
          {data.map((d, index) => (
            <div key={index}>
              <NumberInput
                label={d.nama}
                min={d.minimum}
                name={d.nama + '-' + d.id}
                minimum={1}
                defaultValue={1}
                key={d.nama.split(' ').join('_') + '-' + d.id}
                {...form.getInputProps(
                  d.nama.split(' ').join('_') + '-' + d.id
                )}
              />
            </div>
          ))}
        </Flex>

        <Flex justify='end' mt={24}>
          <Button type='submit'>Buat</Button>
        </Flex>
      </form>
    </Modal>
  )
}
