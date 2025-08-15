'use client'

import {
  Button,
  Flex,
  Image as ChakraImage,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
} from '@chakra-ui/react'
import { ChevronDownIcon } from '@chakra-ui/icons'
import Link from 'next/link'
import { useRouter, usePathname } from 'next/navigation'
import { useMemo, useState } from 'react'

import { CONTENT_CATEGORY } from '@/data/const'
import { CATEGORY_TYPE, SUB_CATEGORY_TYPE } from '../types'
import './BlogLNBTitle.css' // 파일명/클래스명 정리 (LNB로 통일)

type SubCategoryItem = {
  id: string
  name: string
  href: string
  icon?: string
}

type SubCategoryDetail = {
  title: string[]
  subTitle: { title: string; href: string }[][]
}

type CurrentCategoryInfo = Pick<SubCategoryItem, 'name' | 'href' | 'icon'>

const BlogLNBTitle = ({
  type,
  subType,
}: {
  type: CATEGORY_TYPE
  subType: SUB_CATEGORY_TYPE
}) => {
  const router = useRouter()
  const path = usePathname()


  // 데이터 가드
  const subCategoryMap = CONTENT_CATEGORY[type].subCategory as Record<
    string,
    SubCategoryItem
  >
  const subCategoryDetail =
    CONTENT_CATEGORY[type].subCategoryDetail[subType] as SubCategoryDetail

  // 최초 선택값: subType 과 매칭되는 id 를 사용하도록 통일
  const initial = useMemo<CurrentCategoryInfo>(() => {
    // subType이 'id'와 동일하다는 가정이 아니라면, 안전히 찾아 매핑
    const entry =
      subCategoryMap[subType] ??
      Object.values(subCategoryMap).find((v) => v.id === String(subType)) ??
      Object.values(subCategoryMap)[0]

    return {
      name: entry?.name ?? '',
      href: entry?.href ?? '',
      icon: entry?.icon ?? '',
    }
  }, [subCategoryMap, subType])

  const [current, setCurrent] = useState<CurrentCategoryInfo>(initial)

  const handleDropdown = (id: string) => {
    const item = Object.values(subCategoryMap).find((v) => v.id === id)
    if (!item) return
    setCurrent({ name: item.name, href: item.href, icon: item.icon })
    router.push(item.href)
  }

  console.log(path)

  return (
    <nav aria-label="블로그 탐색 사이드바" className="LNB">
      <Menu>
        <MenuButton
          as={Button}
          width="100%"
          bg="white"
          border="1px solid #ddd"
          textAlign="left"
          rightIcon={<ChevronDownIcon aria-hidden="true" />}
          aria-label="카테고리 선택"
        >
          <Flex alignItems="center" justifyContent="flex-start" gap="12px">
            {Boolean(current.icon) && (
              <ChakraImage
                boxSize="1.5rem"
                src={current.icon as string}
                alt={`${current.name} 아이콘`}
                ml="1px"
              />
            )}
            <span>{current.name}</span>
          </Flex>
        </MenuButton>

        <MenuList>
          {Object.values(subCategoryMap).map((item) => (
            <MenuItem
              minH="32px"
              key={item.id}
              onClick={() => handleDropdown(item.id)}
            >
              {Boolean(item.icon) && (
                <ChakraImage
                  boxSize="1.5rem"
                  src={item.icon as string}
                  alt={`${item.name} 아이콘`}
                  mr="12px"
                  ml="1px"
                />
              )}
              <span>{item.name}</span>
            </MenuItem>
          ))}
        </MenuList>
      </Menu>

      {/* Sectioned link list */}
      <ul className="LNB__section">
        {subCategoryDetail.title.map((sectionTitle, sectionIdx) => (
          <li key={`section_${sectionIdx}`} className="LNB__sectionItem">
            <h2 className="LNB__title">{sectionTitle}</h2>
            <ul className="LNB__list">
              {subCategoryDetail.subTitle[sectionIdx]?.map((sub, i) => (
                <li key={`${sub.title}_${i}`} className="LNB__listItem">
                  <Link
                    href={sub.href}
                    className="LNB__link"
                    aria-current={
                      sub.href === path ? 'page' : false
                    }
                  >
                    {sub.title}
                  </Link>
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </nav>
  )
}

export default BlogLNBTitle
