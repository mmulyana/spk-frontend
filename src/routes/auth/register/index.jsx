import {
  Button,
  Center,
  Container,
  Flex,
  PasswordInput,
  TextInput,
} from '@mantine/core'
import { useForm } from '@mantine/form'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../../utils/use-auth'
import useUrlState from '@ahooksjs/use-url-state'
import { useAtom } from 'jotai'
import { userAtom } from '../../../atom/user'
import { useEffect } from 'react'
import { CookieKeys, CookieStorage } from '../../../utils/cookie'
import { jwtDecode } from 'jwt-decode'
import { PATH } from '../../../utils/constant/_path'

export default function Register() {
  const { register } = useAuth()
  const navigate = useNavigate()
  const [user, setUser] = useAtom(userAtom)
  const [url, setUrl] = useUrlState({ role: '' })

  const form = useForm({
    mode: 'uncontrolled',
    initialValues: {
      nama: '',
      email: '',
      password: '',
      confirmPassword: '',
    },

    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
      password: (value) =>
        value.length >= 8 ? null : 'Password must 8 character',
      confirmPassword: (value, values) =>
        value !== values.password ? 'Passwords did not match' : null,
    },
  })

  const submit = (data) => {
    register({ ...data, role: url.role || 'MANAGER' })
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
      <div className='w-[calc(100%-560px)] h-screen bg-gray-200 hidden md:block'></div>
      <Container
        className='relative md:fixed top-0 right-0 bg-white border h-screen md:h-full w-full md:w-[560px]'
        px='32px'
      >
        <Flex justify='center' h='100%' direction='column' align='start'>
          <h1 className='text-xl mb-4 font-medium text-gray-800'>
            Create an Account
          </h1>
          <form onSubmit={form.onSubmit(submit)} className='w-full'>
            <Flex direction='column' gap='16px'>
              <TextInput
                label='nama'
                key={form.key('nama')}
                {...form.getInputProps('nama')}
              />
              <TextInput
                label='Email'
                placeholder='example@mail.com'
                key={form.key('email')}
                {...form.getInputProps('email')}
              />
              <PasswordInput
                placeholder='password'
                label='Password'
                key={form.key('password')}
                {...form.getInputProps('password')}
              />
              <PasswordInput
                placeholder='Confirm password'
                label='Confirm Password'
                key={form.key('confirmPassword')}
                {...form.getInputProps('confirmPassword')}
              />
              <Button type='submit' mt={12} fullWidth>
                Register
              </Button>
            </Flex>
          </form>
          <Center w='100%' mt='16px'>
            <p>
              Already have an account?{' '}
              <Link to='/login' className='text-blue-700 underline'>
                Login
              </Link>
            </p>
          </Center>
        </Flex>
      </Container>
    </>
  )
}
