import { Text, Group, Button, Flex } from '@mantine/core'

import { Link, matchPath } from 'react-router-dom'
import { PATH } from '../../utils/constant/_path'
import { ArrowRightStartOnRectangleIcon } from '@heroicons/react/24/solid'

const MainMenu = [
  { label: 'Dashboard', path: PATH.DASHBOARD },
  { label: 'Kriteria', path: PATH.DASHBOARD_CRITERIA },
  { label: 'Pegawai', path: PATH.DASHBOARD_EMPLOYEE },
  { label: 'Hasil', path: PATH.DASHBOARD_RESULT },
]

export default function Sidebar() {
  const isActive = (path) => !!matchPath({ path }, window.location.pathname)

  const renderMenu = (menus) =>
    menus.map((menu) => (
      <Link
        to={menu.path}
        key={menu.label}
        className={[
          'hover:bg-white text-sm py-2.5 px-3 rounded-lg',
          isActive(menu.path)
            ? 'bg-[#F6F7F9] text-gray-600 font-medium hover:bg-[#EBEDF1]'
            : 'text-gray-400 hover:text-gray-600 hover:bg-[#F6F7F9]',
        ].join(' ')}
      >
        {menu.label}
      </Link>
    ))

  return (
    <nav className='px-4 border-r border-gray-600/10 w-[280px] fixed h-screen bg-white'>
      <div className='w-full h-14 px-4 relative'>
        <div className='w-full h-[1.5px] bg-gray-100 absolute bottom-0 left-1/2 -translate-x-1/2'></div>
      </div>
      <div className='mt-4'>
        <Group justify='space-between' className='mb-2'>
          <Text size='xs' fw={500} c='dimmed'>
            Menus
          </Text>
        </Group>
        <div className='flex flex-col gap-2'>{renderMenu(MainMenu)}</div>
      </div>

      <div className='px-4 absolute bottom-4 left-1/2 -translate-x-1/2 h-fit w-full'>
        <Button
          w='100%'
          unstyled
          className='border border-gray-600/20 text-gray-500 rounded-md text-sm'
          py={6}
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
