import {
  Button,
  Flex,
  Select,
  Slider,
  Text,
  Textarea,
  TextInput,
} from '@mantine/core'
import { useState } from 'react'

export function CreateModal({ setModalState }) {
  return (
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
  )
}

export function SuccessCreateModal({ setModalState }) {
  return (
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
  )
}

const marks = [
  { value: 1, label: '1' },
  { value: 2, label: '2' },
  { value: 3, label: '3' },
  { value: 4, label: '4' },
  { value: 5, label: '5' },
]

export function ApplySpkModal({ setModalState, closeAdd }) {
  const [value, setValue] = useState({})

  async function submit() {
    console.log(value)
  }

  return (
    <div>
      <Flex direction='column' gap={20} mb={56}>
        <div>
          <Text mt='md'>Kriteria 1</Text>
          <Slider
            defaultValue={1}
            label={(val) => marks.find((mark) => mark.value === val).label}
            step={1}
            marks={marks}
            onChangeEnd={(val) => {
              setValue((prev) => ({ ...prev, kriteria_1: val }))
            }}
            max={5}
            min={1}
          />
        </div>
        <div>
          <Text mt='md'>Kriteria 2</Text>
          <Slider
            defaultValue={1}
            label={(val) => marks.find((mark) => mark.value === val).label}
            step={1}
            marks={marks}
            onChangeEnd={(val) => {
              setValue((prev) => ({ ...prev, kriteria_2: val }))
            }}
            max={5}
            min={1}
          />
        </div>
      </Flex>

      <Flex justify='end'>
        <Button
          onClick={() => {
            submit()
            setTimeout(() => {
              closeAdd()
              setModalState('add')
            }, 1000)
          }}
        >
          Buat
        </Button>
      </Flex>
    </div>
  )
}
