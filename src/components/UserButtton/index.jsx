import { UnstyledButton, Group, Avatar, Text, rem } from '@mantine/core'
import { IconChevronRight } from '@tabler/icons-react'

export function UserButton() {
  return (
    <UnstyledButton className='block w-full p-0 mb-4'>
      <Group className='bg-white p-2 py-2.5 rounded border border-gray-200/80 shadow-sm'>
        <Avatar
          src='https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-8.png'
          radius='xl'
        />

        <div style={{ flex: 1 }}>
          <Text size='sm' fw={500}>
            Example
          </Text>

          <Text c='dimmed' size='xs'>
            example@mail.com
          </Text>
        </div>

        <IconChevronRight
          style={{ width: rem(14), height: rem(14) }}
          stroke={1.5}
        />
      </Group>
    </UnstyledButton>
  )
}
