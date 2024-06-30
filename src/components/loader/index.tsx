import { Center, Container, Flex, Loader } from '@mantine/core'
import React from 'react'

export default function LoaderScreen() {
  return (
    <Container h='100vh' w='100vw'>
      <div className='h-full w-full flex items-center justify-center'>
        <Loader color='blue' type='dots' />
      </div>
    </Container>
  )
}
