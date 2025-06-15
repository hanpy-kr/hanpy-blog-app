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
import { CONTENT_CATEGORY } from '@/data/const'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { CATEGORY_TYPE, SUB_CATEGORY_TYPE } from '../types'

type CurrentCategoryInfoType = {
  name: string
  href: string
  icon: string
}

// TODO :  Refactor Type
const BlogLNBTitle = ({
  type,
  subType,
}: {
  type: CATEGORY_TYPE
  subType: SUB_CATEGORY_TYPE
}) => {
  const router = useRouter()
  const [currentCategoryInfo, setCurrentCategoryInfo] =
    useState<CurrentCategoryInfoType>(
      CONTENT_CATEGORY[type].subCategory[subType] ?? {
        name: '',
        href: '',
        icon: '',
        description: '',
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
                // borderRadius="full"
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
          {Object.values(CONTENT_CATEGORY[type].subCategory).map(
            (data: any) => (
              <MenuItem
                minH="20px"
                key={data.name}
                onClick={() => handleDropdown(data.id)}
              >
                {data.icon.length !== 0 && (
                  <Image
                    boxSize="1.5rem"
                    // borderRadius="full"
                    src={`${data.icon}`}
                    // src={`/icons/docker.svg`}
                    alt="Fluffybuns the destroyer"
                    mr="12px"
                    ml="1px"
                  />
                )}
                <span>{data.name}</span>
              </MenuItem>
            ),
          )}
        </MenuList>
      </Menu>
      {/* CONTENT_CATEGORY[type].subCategoryDetail[subType].title */}
      <ul>
        {CONTENT_CATEGORY[type].subCategoryDetail[subType].title.map(
          (value: any, index: any) => {
            return (
              <li key={`title_${index}`} className="LBN__subTitle">
                <h2 className="LBN__title">{value}</h2>
                <ul className="LBN__subTitle__container">
                  {CONTENT_CATEGORY[type].subCategoryDetail[subType].subTitle[
                    index
                  ].map((subValue: any, subIndex: any) => {
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
            )
          },
        )}
      </ul>
    </>
  )
}

export default BlogLNBTitle
