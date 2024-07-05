import { UnstyledButton, Group, Avatar, Text, rem, Flex } from '@mantine/core'

export function UserButton() {
  return (
    <div>
      <Flex gap={8}>
        <Avatar
          src='https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-8.png'
          radius='xl'
        />
        <div>
          <Text size='sm' fw={500}>
            Example
          </Text>

          <Text c='dimmed' size='xs'>
            example@mail.com
          </Text>
        </div>
      </Flex>
    </div>
  )
}
