import { Text, Group } from '@mantine/core'

import classes from './NavbarSearch.module.css'
import { UserButton } from '../UserButtton'
import { Link, matchPath } from 'react-router-dom'
import { PATH } from '../../utils/constant/_path'

const MainMenu = [
  { label: 'Dashboard', path: PATH.DASHBOARD },
  { label: 'Employee', path: PATH.DASHBOARD_EMPLOYEE },
  { label: 'Criteria', path: PATH.DASHBOARD_CRITERIA },
]

const SecondaryMenu = [
  { label: 'Admin', path: PATH.DASHBOARD_ADMIN },
  { label: 'Account', path: PATH.DASHBOARD_ADMIN },
]

export default function Sidebar() {
  const isActive = (path) => !!matchPath({ path }, window.location.pathname)

  const renderMenu = (menus) =>
    menus.map((menu) => (
      <Link
        to={menu.path}
        key={menu.label}
        className={[
          'hover:bg-white border-b-2 border-transparent hover:border-gray-200 text-sm py-2.5 px-3 rounded-lg text-gray-500',
          isActive(menu.path) ? 'bg-white border-gray-200' : '',
        ].join(' ')}
      >
        {menu.label}
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
        <div className='flex flex-col gap-2'>{renderMenu(MainMenu)}</div>
      </div>

      <div className='mt-4'>
        <Group justify='space-between' className='mb-2'>
          <Text size='xs' fw={500} c='dimmed'>
            Settings
          </Text>
        </Group>
        <div className='flex flex-col gap-2'>{renderMenu(SecondaryMenu)}</div>
      </div>
    </nav>
  )
}
