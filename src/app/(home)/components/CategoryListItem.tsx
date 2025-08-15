'use client'

import {
  Card, CardBody, CardHeader, Heading, Text,
  LinkBox, LinkOverlay, useColorModeValue
} from '@chakra-ui/react'
import { useRouter } from 'next/navigation'
import {
  BackendCategory, DesignCategory, InfraCategory, LanguageCategory
} from '@/app/(categories)/types'
import { CONTENT_BACKEND } from '@/data/const/backend'
import { CONTENT_DESIGN } from '@/data/const/design'
import { CONTENT_INFRA } from '@/data/const/infra'
import { CONTENT_LANGUAGE } from '@/data/const/language'

export enum BlogTargetCategory {
  BACKEND = 'Backend',
  DESIGN = 'Design',
  INFRA = 'Infra',
  LANGUAGE = 'Language',
}

type SubCategory = { id:string; name:string; href:string; description:string; icon?:string }
type ContentShape = { mainCategory:string; subCategory: Record<string, SubCategory> }

function getCategoryAndContent(target: BlogTargetCategory): {
  category:
    | typeof BackendCategory | typeof DesignCategory
    | typeof InfraCategory  | typeof LanguageCategory
  content: ContentShape
} {
  switch (target) {
    case BlogTargetCategory.BACKEND:  return { category: BackendCategory,  content: CONTENT_BACKEND }
    case BlogTargetCategory.DESIGN:   return { category: DesignCategory,   content: CONTENT_DESIGN }
    case BlogTargetCategory.INFRA:    return { category: InfraCategory,    content: CONTENT_INFRA }
    case BlogTargetCategory.LANGUAGE: return { category: LanguageCategory, content: CONTENT_LANGUAGE }
    default: throw new Error('invalid BlogTargetCategory')
  }
}

export default function CategoryListItem({
  target, bg,       // <- props 유지
}: { target: BlogTargetCategory; bg: string }) {
  const router = useRouter()
  const { category, content } = getCategoryAndContent(target)

  const border  = useColorModeValue('blackAlpha.200', 'whiteAlpha.200')
  const hoverBd = useColorModeValue('blackAlpha.300', 'whiteAlpha.300')
  const title   = useColorModeValue('gray.900', 'gray.100')
  const desc    = useColorModeValue('gray.600', 'gray.300')
  const label   = useColorModeValue('gray.500', 'gray.400')
  const shadow  = useColorModeValue('0 1px 2px rgba(16,24,40,.05)', '0 1px 2px rgba(0,0,0,.35)')
  const hoverSh = useColorModeValue('0 4px 12px rgba(16,24,40,.08)', '0 6px 16px rgba(0,0,0,.45)')

  return (
    <>
      {Object.values(category).map((key) => {
        const item = content.subCategory[key as unknown as string]
        return (
          <LinkBox
            as={Card}
            key={item.href}
            role="group"
            bg={bg}                     // 배경은 외부에서 주는 값 그대로
            borderRadius="14px"         // 라운드 낮춤
            borderWidth="1px"
            borderColor={border}
            boxShadow={shadow}          // 섀도우 약하게
            p="1px 0px"
            transition="transform 140ms ease, box-shadow 140ms ease, border-color 140ms ease"
            _hover={{ transform: 'translateY(-2px)', borderColor: hoverBd, boxShadow: hoverSh }}
            _active={{ transform: 'translateY(-1px)' }}
            onClick={() => router.push(item.href)}
          >
            <CardHeader pt="6px" pb="2px" mb='-15px'>
              <Text fontSize="xs" color={label} mb='-20px' fontWeight="medium" letterSpacing="0.02em">
                {content.mainCategory}
              </Text>
              <Heading size="md" color={title} lineHeight="1.25" letterSpacing="-0.01em">
                <LinkOverlay href={item.href} _groupHover={{ textDecoration: 'none' }}>
                  {item.name}
                </LinkOverlay>
              </Heading>
            </CardHeader>

            <CardBody pt="0">
              <Text color={desc} fontSize="sm" lineHeight="1.7">
                {item.description}
              </Text>
            </CardBody>
          </LinkBox>
        )
      })}
    </>
  )
}
