import {
  TextInput,
  Code,
  UnstyledButton,
  Badge,
  Text,
  Group,
  ActionIcon,
  Tooltip,
  rem,
} from '@mantine/core'
import {
  IconBulb,
  IconUser,
  IconCheckbox,
  IconSearch,
  IconPlus,
} from '@tabler/icons-react'
import classes from './NavbarSearch.module.css'
import { UserButton } from '../UserButtton'
import { Link } from 'react-router-dom'

const links = [
  { icon: IconBulb, label: 'Activity', notifications: 3 },
  { icon: IconCheckbox, label: 'Tasks', notifications: 4 },
  { icon: IconUser, label: 'Contacts' },
]

const collections = [
  { label: 'Menu 1' },
  { label: 'Menu 2' },
  { label: 'Menu 3' },
]

export default function Sidebar() {
  const collectionLinks = collections.map((collection) => (
    <Link
      to='/dashboard'
      key={collection.label}
      className='hover:bg-white border-b border-transparent hover:border-gray-200 text-sm p-2.5 rounded-lg text-gray-500'
    >
      {collection.label}
    </Link>
  ))

  return (
    <nav className={`${classes.navbar} !p-4`}>
      <div className='w-full'>
        <UserButton />
      </div>

      <div>
        <Group justify='space-between' className='mb-2'>
          <Text size='xs' fw={500} c='dimmed'>
            Menus
          </Text>
        </Group>
        <div className='flex flex-col gap-2'>{collectionLinks}</div>
      </div>
    </nav>
  )
}
