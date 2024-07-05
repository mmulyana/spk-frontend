import { useAtomValue } from 'jotai'
import { headerTitle } from '../../atom/common'
import { Button, Divider, Flex } from '@mantine/core'
import { Cog6ToothIcon, UsersIcon } from '@heroicons/react/24/outline'
import { UserButton } from '../UserButtton'
import { Link } from 'react-router-dom'
import { PATH } from '../../utils/constant/_path'

export default function Navbar() {
  const title = useAtomValue(headerTitle)

  return (
    <div className='fixed pl-[280px] h-fit z-10 w-full'>
      <div className='h-14 w-full bg-white border-b border-gray-600/10 px-4 flex items-center justify-between'>
        <p className='text-lg text-gray-800'>{title ?? ''}</p>
        <Flex gap={16} py={4} align='center' h='56px'>
          <Link to={PATH.DASHBOARD_ADMIN_ACCOUNT}>
            <Button
              variant='transparent'
              className='!h-8 !w-8 hover:!bg-gray-100'
              px={0}
              py={0}
              radius='xl'
            >
              <UsersIcon className='h-5 w-5 text-gray-400' />
            </Button>
          </Link>

          <Link to={PATH.DASHBOARD_SETTINGS}>
            <Button
              variant='transparent'
              className='!h-8 !w-8 hover:!bg-gray-100'
              px={0}
              py={0}
              radius='xl'
            >
              <Cog6ToothIcon className='h-5 w-5 text-gray-400' />
            </Button>
          </Link>
          <Flex gap={10} align='center' h='56px'>
            <Divider orientation='vertical' h='40px' className='!self-center' />
            <UserButton />
          </Flex>
        </Flex>
      </div>
    </div>
  )
}
