import { Text, Group, Button, Flex } from '@mantine/core'

import { Link, matchPath, useNavigate } from 'react-router-dom'
import { PATH } from '../../utils/constant/_path'
import { ArrowRightStartOnRectangleIcon } from '@heroicons/react/24/solid'
import Logo from '../logo'
import { useAtomValue } from 'jotai'
import { userAtom } from '../../atom/user'
import { CookieKeys, CookieStorage } from '../../utils/cookie'

const AdminMenus = [{ label: 'Akun', path: PATH.DASHBOARD_ADMIN_ACCOUNT }]

const MainMenu = [
  { label: 'Dashboard', path: PATH.DASHBOARD },
  { label: 'Kriteria', path: PATH.DASHBOARD_CRITERIA },
  { label: 'Pegawai', path: PATH.DASHBOARD_EMPLOYEE },
  { label: 'Peringkat', path: PATH.DASHBOARD_RESULT },
]

export default function Sidebar() {
  const isActive = (path) => !!matchPath({ path }, window.location.pathname)
  const navigate = useNavigate()
  const user = useAtomValue(userAtom)

  const onLogout = () => {
    CookieStorage.remove(CookieKeys.AuthToken)
    navigate(PATH.LOGIN)
  }

  const renderMenu = (menus) =>
    menus.map((menu) => (
      <Link
        to={menu.path}
        key={menu.label}
        className={[
          'hover:bg-white text-sm py-2.5 px-3 rounded-lg relative',
          isActive(menu.path)
            ? 'bg-[#F6F7F9] text-gray-600 font-medium hover:bg-gray-100'
            : 'text-gray-400 hover:text-gray-600 hover:bg-gray-50',
        ].join(' ')}
      >
        {isActive(menu.path) && (
          <div className='h-6 w-1 rounded-r-xl bg-blue-600 absolute top-1/2 -translate-y-1/2 -left-4'></div>
        )}
        {menu.label}
      </Link>
    ))

  return (
    <nav className='px-4 border-r border-gray-600/10 w-[280px] fixed h-screen bg-white'>
      <div className='w-full h-14 px-4 relative'>
        <Flex align='center' h={56} gap={8}>
          <Logo />
          <p className='text-blue-700 text-lg capitalize m-0'>
            SPK Pegawai Terbaik
          </p>
        </Flex>
        <div className='w-full h-[1.5px] bg-gray-100 absolute bottom-0 left-1/2 -translate-x-1/2'></div>
      </div>
      {user?.role === 'MANAGER' ? (
        <div className='mt-4'>
          <Group justify='space-between' className='mb-2'>
            <Text size='xs' fw={500} c='dimmed'>
              Menus
            </Text>
          </Group>
          <div className='flex flex-col gap-2'>{renderMenu(MainMenu)}</div>
        </div>
      ) : (
        <div className='mt-4'>
          <Group justify='space-between' className='mb-2'>
            <Text size='xs' fw={500} c='dimmed'>
              Admin
            </Text>
          </Group>
          <div className='flex flex-col gap-2'>{renderMenu(AdminMenus)}</div>
        </div>
      )}

      <div className='px-4 absolute bottom-4 left-1/2 -translate-x-1/2 h-fit w-full'>
        <Button
          w='100%'
          unstyled
          className='text-gray-500 rounded-md text-sm hover:bg-[#F6F7F9] hover:text-gray-600'
          py={8}
          onClick={onLogout}
        >
          <Flex align='center' justify='center' gap={4}>
            <ArrowRightStartOnRectangleIcon className='h-5 w-5 text-gray-400' />
            <span className='font-normal'>Logout</span>
          </Flex>
        </Button>
      </div>
    </nav>
  )
}
