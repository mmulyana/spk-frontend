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
import { useAtom } from 'jotai'
import { userAtom } from '../../../atom/user'
import { useEffect } from 'react'
import { CookieKeys, CookieStorage } from '../../../utils/cookie'
import { jwtDecode } from 'jwt-decode'
import { PATH } from '../../../utils/constant/_path'
import backgroundImg from '/background.jpg'

export default function Login() {
  const { login } = useAuth()
  const [user, setUser] = useAtom(userAtom)
  const navigate = useNavigate()

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

  useEffect(() => {
    if (user !== null) return

    const token = CookieStorage.get(CookieKeys.AuthToken)
    if (token) {
      const decoded = jwtDecode(token)
      setUser({ nama: decoded.nama, email: decoded.email, role: decoded.role })
      if (decoded?.role === 'MANAGER') {
        navigate(PATH.DASHBOARD)
      } else {
        navigate(PATH.DASHBOARD_ADMIN_ACCOUNT)
      }
    }
  }, [user])

  return (
    <>
      <img className='w-full h-screen object-cover object-center hidden md:block' src={backgroundImg} />
      <Container
        className='relative md:fixed top-1/2 -translate-y-1/2 right-0 md:right-4 bg-white h-screen md:h-[calc(100%-40px)] w-full rounded-xl md:w-[540px] pt-8 pb-10 shadow-2xl !px-8'
      >
        <Flex justify='center' h='100%' direction='column' align='start'>
          <h1 className='text-2xl mb-4 font-medium text-gray-800'>Login</h1>
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
              <Link to='/register' className='text-blue-700'>
                Register here
              </Link>
            </p>
          </Center>
        </Flex>
      </Container>
    </>
  )
}
