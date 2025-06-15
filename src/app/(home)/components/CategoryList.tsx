'use client'

import {
  Box,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Heading,
  HStack,
  Stack,
  Text,
} from '@chakra-ui/react'
import { useRouter } from 'next/navigation'
import CategoryListItem, { BlogTargetCategory } from './CategoryListItem'

export default function CategoryList({ defaultTab = 'All' }) {
  const router = useRouter()
  // router.push('/')

  // CONTENT_BACKEND
  return (
    <>
      <HStack justify={'center'}>
        <Stack w={'90%'} maxW={'800px'} gap={'20px'} borderRadius={'8px'}>
          <CategoryListItem
            target={BlogTargetCategory.LANGUAGE}
            bg={'#faf6f5'}
          />
          {/* // BACKEND SECTION ================================= */}
          <CategoryListItem
            target={BlogTargetCategory.BACKEND}
            bg={'#f1f3fa'}
          />
          <CategoryListItem target={BlogTargetCategory.DESIGN} bg={'#faf3f5'} />
          <CategoryListItem target={BlogTargetCategory.INFRA} bg={'#fafaf5'} />
        </Stack>
      </HStack>
    </>
  )
}
