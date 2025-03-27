import { BackendCategory, CONTENT_BACKEND } from '@/data/const/backend'
import { CONTENT_DESIGN, DesignCategory } from '@/data/const/design'
import { CONTENT_INFRA, InfraCategory } from '@/data/const/infra'
import { CONTENT_LANGUAGE, LanguageCategory } from '@/data/const/language'
import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Heading,
  Text,
} from '@chakra-ui/react'
import { useRouter } from 'next/navigation'

export enum BlogTargetCategory {
  BACKEND = 'Backend',
  DESIGN = 'Design',
  INFRA = 'Infra',
  LANGUAGE = 'Language',
}

// Todo : any refac
export default function CategoryListItem({
  target,
  bg,
}: {
  target: BlogTargetCategory
  bg: string
}) {
  const router = useRouter()

  const getCategoryAndContent = (
    target: BlogTargetCategory,
  ): {
    category: {}
    content: {
      subCategory: any
      mainCategory: string
    }
  } => {
    if (target === BlogTargetCategory.BACKEND) {
      return {
        category: BackendCategory,
        content: CONTENT_BACKEND,
      }
    } else if (target === BlogTargetCategory.DESIGN) {
      return {
        category: DesignCategory,
        content: CONTENT_DESIGN,
      }
    } else if (target === BlogTargetCategory.INFRA) {
      return {
        category: InfraCategory,
        content: CONTENT_INFRA,
      }
    } else if (target === BlogTargetCategory.LANGUAGE) {
      return {
        category: LanguageCategory,
        content: CONTENT_LANGUAGE,
      }
    } else {
      throw Error('invalid BlogTargetCategory')
    }
  }

  const { category, content } = getCategoryAndContent(target)

  return (
    <>
      {Object.values(category).map((item: any) => {
        return (
          <Card
            align="left"
            borderRadius={'20px'}
            backgroundColor={bg}
            cursor={'pointer'}
            onClick={() => router.push(content.subCategory[item].href)}
            key={content.subCategory[item].href}
          >
            <CardHeader>
              <Text fontSize={'13px'} color={'gray'}>
                {content.mainCategory}
              </Text>
              <Heading size="md" pt={0} mt={1}>
                {content.subCategory[item].name}
              </Heading>
            </CardHeader>
            <CardBody pt={0}>
              <Text>{content.subCategory[item].description}</Text>
            </CardBody>
          </Card>
        )
      })}
    </>
  )
}
