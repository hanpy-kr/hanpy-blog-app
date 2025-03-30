export enum LanguageCategory {
  TYPESCRIPT = 'typescript',
  NODEJS = 'nodejs',
}

const subCategory: Record<
  LanguageCategory,
  {
    id: LanguageCategory
    name: string
    href: string
    icon: string
    description: string
  }
> = {
  typescript: {
    id: LanguageCategory.TYPESCRIPT,
    name: 'TypeScript',
    href: '/language/ko/typescript/contents',
    icon: 'https://resource.han-py.com/blog/logs/typescript_logo.svg',
    description:
      'TypeScript is a strongly typed programming language built on JavaScript, providing static typing, modern language features, and enhanced tooling. This category covers in-depth concepts, best practices, practical examples, and guides to help developers leverage TypeScript for more robust, maintainable, and scalable applications.',
  },
  nodejs: {
    id: LanguageCategory.NODEJS,
    name: 'Nodejs',
    href: '/language/ko/nodejs/introduction',
    icon: 'https://resource.han-py.com/blog/logs/nodejs_logo.svg',
    description:
      "Node.js is a JavaScript runtime environment that enables developers to run JavaScript on servers and build scalable, event-driven applications. In this category, you'll find tutorials, guides, practical examples, and advanced techniques focused on Node.js development, performance optimization, and backend solutions.",
  },
}

const subCategoryDetail: {
  [key: string]: {
    title: string[]
    subTitle: {
      href: string
      title: string
    }[][]
  }
} = {
  nodejs: {
    title: ['Beginner'],
    subTitle: [
      [
        {
          href: '/language/ko/nodejs/introduction',
          title: 'Introduction',
        },
        {
          href: '/language/ko/nodejs/install-env-path',
          title: 'Nodejs Install',
        },
        {
          href: '/language/ko/nodejs/encoder-decoder',
          title: 'Encoding and Decoding',
        },
      ],
    ],
  },
  typescript: {
    title: [
      'TypeScript Essentials',
      'Classes & Types',
      'Advanced Patterns',
      'Trouble-Shooting',
    ],
    subTitle: [
      [
        {
          href: '/language/ko/typescript/typescript-essential-01-introduction',
          title: 'Basic Types',
        },
        {
          href: '/language/ko/typescript/typescript-essential-02-union-intersection',
          title: 'Union & Intersection types',
        },
        {
          href: '/language/ko/typescript/typescript-essential-03-symbol',
          title: 'Symbol',
        },
      ],
      [
        {
          href: '/language/ko/typescript/typescript-intermediate-01-type-assertions',
          title: 'Type Assertions',
        },
        {
          href: '/language/ko/typescript/typescript-intermediate-02-generics',
          title: 'Generics',
        },
        {
          href: '/language/ko/typescript/typescript-intermediate-03-structural-typing',
          title: 'Structural Typing',
        },
      ],
      [],
      [
        {
          href: '/language/ko/typescript/typescript-ts-01-prototype-chain',
          title: 'Prototype Chain (setPrototypeOf)',
        },
      ],
    ],
  },
}

// Nav 목차
export const CONTENT_LANGUAGE = {
  mainCategory: 'Language',
  subCategory,
  subCategoryDetail,
}
