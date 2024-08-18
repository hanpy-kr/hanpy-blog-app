'use client'

import {
  Button,
  Flex,
  Image,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
} from '@chakra-ui/react'
import { ChevronDownIcon } from '@chakra-ui/icons'

import './BlogLNBTitle.css'
import { useState } from 'react'
import { CONTENT_CATEGORY } from '@/data/content'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

type CurrentCategoryInfoType = {
  name: string
  href: string
  icon: string
}

type SUB_CATEGORY_TYPE =
  | 'docker'
  | 'kubernetes'
  | 'react'
  | 'utils'
  | 'pattern'
  | 'nodejs'
  | 'nextjs'
  | 'react'

const BlogLNBTitle = ({
  type,
  subType,
}: {
  type: 'frontend' | 'backend' | 'infra' | 'design' | 'language'
  subType: SUB_CATEGORY_TYPE
}) => {
  const router = useRouter()
  const [currentCategoryInfo, setCurrentCategoryInfo] =
    useState<CurrentCategoryInfoType>(
      CONTENT_CATEGORY[type].subCategory[subType] ?? {
        name: '',
        href: '',
        icon: '',
      },
    )

  const handleDropdown = (value: string) => {
    const clickData = Object.keys(CONTENT_CATEGORY[type].subCategory).find(
      (v) => v === value.toLowerCase(),
    )
    if (!clickData) return
    setCurrentCategoryInfo(CONTENT_CATEGORY[type].subCategory[clickData])
    router.push(CONTENT_CATEGORY[type].subCategory[clickData].href)
  }
  return (
    <>
      <Menu>
        <MenuButton
          width={'80%'}
          bg={'white'}
          border={'1px solid #dddddd'}
          textAlign={'left'}
          as={Button}
          rightIcon={<ChevronDownIcon />}
        >
          <Flex alignItems={'center'} justifyContent={'flex-start'}>
            {currentCategoryInfo.icon.length !== 0 && (
              <Image
                boxSize="1.5rem"
                borderRadius="full"
                src={`${currentCategoryInfo.icon}`}
                alt="Fluffybuns the destroyer"
                mr="12px"
                ml="1px"
              />
            )}
            {currentCategoryInfo.name}
          </Flex>
        </MenuButton>
        <MenuList>
          {Object.values(CONTENT_CATEGORY[type].subCategory).map((data) => (
            <MenuItem
              minH="20px"
              key={data.name}
              onClick={() => handleDropdown(data.name)}
            >
              {data.icon.length !== 0 && (
                <Image
                  boxSize="1.5rem"
                  borderRadius="full"
                  src={`${data.icon}`}
                  // src={`/icons/docker.svg`}
                  alt="Fluffybuns the destroyer"
                  mr="12px"
                  ml="1px"
                />
              )}
              <span>{data.name}</span>
            </MenuItem>
          ))}
        </MenuList>
      </Menu>
      {/* CONTENT_CATEGORY[type].subCategoryDetail[subType].title */}
      <ul>
        {CONTENT_CATEGORY[type].subCategoryDetail[subType].title.map(
          (value, index) => {
            return (
              <>
                <li>
                  <h2 className="LBN__title">{value}</h2>
                  <ul
                    className="LBN__subTitle__container"
                    key={`${JSON.stringify(value)}_${index}`}
                  >
                    {CONTENT_CATEGORY[type].subCategoryDetail[subType].subTitle[
                      index
                    ].map((subValue, subIndex) => {
                      return (
                        <Link
                          href={subValue.href}
                          key={`${subValue.title}_${subIndex}`}
                        >
                          <li className="LBN__subTitle">{subValue.title}</li>
                        </Link>
                      )
                    })}
                  </ul>
                </li>
              </>
            )
          },
        )}
      </ul>
    </>
  )
}

export default BlogLNBTitle
