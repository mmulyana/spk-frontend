import {
  Button,
  Card,
  Center,
  Container,
  Flex,
  Group,
  PasswordInput,
  TextInput,
} from '@mantine/core'
import { useForm } from '@mantine/form'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../../utils/use-auth'

export default function Login() {
  const { login } = useAuth()
  
  const form = useForm({
    mode: 'uncontrolled',
    initialValues: {
      email: '',
      password: '',
    },
  })

  const submit = (data) => {
    login(data)
  }

  return (
    <>
      <div className='w-[calc(100%-560px)] h-screen bg-gray-200 hidden md:block'></div>
      <Container
        className='relative md:fixed top-0 right-0 bg-white border h-screen md:h-full w-full md:w-[560px] '
        px='32px'
      >
        <Flex justify='center' h='100%' direction='column' align='start'>
          <h1 className='text-xl mb-4 font-medium text-gray-800'>Login</h1>

          <form onSubmit={form.onSubmit(submit)} className='w-full'>
            <Flex direction='column' gap='16px'>
              <TextInput
                label='Email'
                placeholder='example@mail.com'
                key={form.key('email')}
                {...form.getInputProps('email')}
              />
              <PasswordInput
                placeholder='Your password'
                label='Password'
                key={form.key('password')}
                {...form.getInputProps('password')}
              />
              <Button type='submit' mt={20} fullWidth>
                Login
              </Button>
            </Flex>
          </form>
          <Center w='100%' mt='16px'>
            <p>
              Dont have an account?{' '}
              <Link to='/register' className='text-blue-700 underline'>
                Register here
              </Link>
            </p>
          </Center>
        </Flex>
      </Container>
    </>
  )
}
