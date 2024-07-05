import { Button, Center, Flex } from '@mantine/core'
import { Link } from 'react-router-dom'
import { PATH } from '../../utils/constant/_path'

export default function Page() {
  return (
    <Flex h='100vh' align='center' direction='column' justify='center'>
      <Center>
        <Flex direction='column' justify='center' align='center' gap={10}>
          <p className='text-5xl text-gray-800'>404</p>
          <Link to={PATH.LOGIN}>
            <Button>Kembali</Button>
          </Link>
        </Flex>
      </Center>
    </Flex>
  )
}
