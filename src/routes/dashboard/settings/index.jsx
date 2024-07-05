import { Button, Center, Flex, PasswordInput, TextInput } from '@mantine/core'
import { useTitle } from '../../../utils/useTitle'
import DashboardLayout from '../_component/layout'
import { useState } from 'react'

export default function Page() {
  useTitle('Pengaturan')
  const [isChangePassword, setIsChangePassword] = useState(false)

  return (
    <DashboardLayout>
      <Center>
        <div className='w-[640px] max-w-full bg-white rounded-lg border border-gray-600/10 h-fit p-4 mt-4'>
          {isChangePassword ? (
            <>
              <p className='text-gray-700 font-semibold'>Pengaturan</p>
              <form className='mt-2 flex flex-col gap-4 '>
                <PasswordInput label='password lama' />
                <PasswordInput label='password baru' />
                <Flex justify='space-between' align='center'>
                  <Button
                    variant='transparent'
                    color='gray'
                    className='!font-normal !text-gray-400'
                    px={4}
                    onClick={() => setIsChangePassword(!isChangePassword)}
                  >
                    Batal
                  </Button>
                  <Button>Ubah</Button>
                </Flex>
              </form>
            </>
          ) : (
            <>
              <p className='text-gray-700 font-semibold'>Pengaturan</p>
              <form className='mt-2 flex flex-col gap-4 '>
                <TextInput label='Nama' placeholder='Example' />
                <TextInput label='Email' placeholder='example@mail.com' />
                <Flex justify='space-between' align='center'>
                  <Button
                    variant='transparent'
                    color='gray'
                    className='!font-normal !text-gray-400'
                    px={4}
                    onClick={() => setIsChangePassword(!isChangePassword)}
                  >
                    Ubah Password
                  </Button>
                  <Button>Simpan</Button>
                </Flex>
              </form>
            </>
          )}
        </div>
      </Center>
    </DashboardLayout>
  )
}
