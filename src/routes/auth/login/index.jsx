import { Button, Card, PasswordInput, TextInput } from '@mantine/core'
import { useForm } from '@mantine/form'

export default function Login() {
  const form = useForm({
    mode: 'uncontrolled',
    initialValues: {
      email: '',
      password: '',
    },
  })
  
  const submit = (data) => {
    console.log(data)
  }

  return (
    <div>
      <Card>
        <form onSubmit={form.onSubmit(submit)}>
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
          <Button type='submit' mt={20} fullWidth>Login</Button>
        </form>
      </Card>
    </div>
  )
}
