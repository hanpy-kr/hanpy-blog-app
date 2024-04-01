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

const HEADER_CATEGORY_DATA = {
  mainTitle: 'Infra',
  subCategory: [
    { name: 'docker', href: '/docker', icon: '/docker.svg' },
    { name: 'kubernetes', href: '/kubernetes', icon: '/kubernetes.svg' },
  ],
}

const HEADER_SUB_DATA = {
  title: ['TEST1', 'TEST2'],
  subTitle: [
    ['TEST1-1', 'TEST1-2', 'TEST1-3', 'TEST1-4'],
    ['TEST2-1', 'TEST2-2', 'TEST2-3', 'TEST2-4'],
  ],
}

type CurrentCategoryInfoType = {
  name: string
  href: string
  icon: string
}

const BlogLNBTitle = ({
  type,
  subType,
}: {
  type: 'frontend' | 'backend' | 'infra'
  subType: string
}) => {
  const [currentCategoryInfo, setCurrentCategoryInfo] =
    useState<CurrentCategoryInfoType>(CONTENT_CATEGORY[type].subCategory[0])

  const handleDropdown = (value: string) => {
    const clickData = CONTENT_CATEGORY[type].subCategory.find(
      (v) => v.name === value,
    )
    if (!clickData) return
    setCurrentCategoryInfo(clickData)
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
          <Flex alignItems={'center'}>
            <Image
              boxSize="2rem"
              borderRadius="full"
              src={`/icons${currentCategoryInfo.icon}`}
              alt="Fluffybuns the destroyer"
              mr="12px"
            />
            {currentCategoryInfo.name}
          </Flex>
        </MenuButton>
        <MenuList>
          {CONTENT_CATEGORY[type].subCategory.map((data) => (
            <MenuItem
              minH="20px"
              key={data.name}
              onClick={() => handleDropdown(data.name)}
            >
              <Image
                boxSize="2rem"
                borderRadius="full"
                src={`/icons${data.icon}`}
                // src={`/icons/docker.svg`}
                alt="Fluffybuns the destroyer"
                mr="12px"
                ml="8px"
              />
              <span>{data.name}</span>
            </MenuItem>
          ))}
        </MenuList>
      </Menu>
      {/* CONTENT_CATEGORY[type].subCategoryDetail.title */}
      <ul>
        {CONTENT_CATEGORY[type].subCategoryDetail.title.map((value, index) => {
          return (
            <>
              <li>
                <h2 className="LBN__title">{value}</h2>
                <ul className="LBN__subTitle__container" key={index}>
                  {CONTENT_CATEGORY[type].subCategoryDetail.subTitle[index].map(
                    (subValue, subIndex) => {
                      return (
                        <>
                          <li className="LBN__subTitle">{subValue}</li>
                        </>
                      )
                    },
                  )}
                </ul>
              </li>
            </>
          )
        })}
        <li>
          <h2 className="LBN__title">Design Patterns</h2>
          <ul className="LBN__subTitle__container">
            <li className="LBN__subTitle">subTitle1</li>
            <li className="LBN__subTitle">subTitle2</li>
            <li className="LBN__subTitle">subTitle3</li>
          </ul>
        </li>
        <li>
          <h2 className="LBN__title">Design Patterns</h2>
          <ul className="LBN__subTitle__container">
            <li className="LBN__subTitle">subTitle1</li>
            <li className="LBN__subTitle">subTitle2</li>
            <li className="LBN__subTitle">subTitle3</li>
          </ul>
        </li>
        <li>
          <div>Title1</div>
          <ul>
            <li>subTitle1</li>
            <li>subTitle2</li>
            <li>subTitle3</li>
          </ul>
        </li>
      </ul>
      {/* <Image
        // boxSize="2rem"
        // borderRadius="full"
        fill
        src={`/icons/docker.svg`}
        alt="Fluffybuns the destroyer"
        // mr="12px"
      /> */}
    </>
  )
}

export default BlogLNBTitle
