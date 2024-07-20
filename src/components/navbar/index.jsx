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
        <Flex gap={10} align='center' h='56px'>
          <UserButton />
        </Flex>
      </div>
    </div>
  )
}
