import { UnstyledButton, Group, Avatar, Text, rem, Flex } from '@mantine/core'
import { useAtomValue } from 'jotai'
import { userAtom } from '../../atom/user'

export function UserButton() {
  const user = useAtomValue(userAtom)

  return (
    <div>
      <Flex gap={8}>
        <Avatar radius='xl' className='uppercase'>{user?.nama?.at(0)}</Avatar>
        <div>
          <Text size='sm' fw={500}>
            {user?.nama || ''}
          </Text>

          <Text c='dimmed' size='xs'>
            {user?.email || ''}
          </Text>
        </div>
      </Flex>
    </div>
  )
}
