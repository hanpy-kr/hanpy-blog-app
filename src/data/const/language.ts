export enum LanguageCategory {
  TYPESCRIPT = 'typescript',
  NODEJS = 'nodejs',
}

const subCategory: Record<
  LanguageCategory,
  {
    name: string
    href: string
    icon: string
    description: string
  }
> = {
  typescript: {
    name: 'TypeScript',
    href: '/language/ko/typescript/contents',
    icon: 'https://resource.han-py.com/blog/logs/nodejs_logo.svg',
    description:
      'TypeScript is a strongly typed programming language built on JavaScript, providing static typing, modern language features, and enhanced tooling. This category covers in-depth concepts, best practices, practical examples, and guides to help developers leverage TypeScript for more robust, maintainable, and scalable applications.',
  },
  nodejs: {
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
    title: ['TypeScript Essentials', 'Classes & Types', 'Advanced Patterns'],
    subTitle: [
      [
        {
          href: '/language/ko/typescript/typescript-01-introduction',
          title: 'Introduction',
        },
        // {
        //   href: '/language/ko/typescript/',
        //   title: 'Symbol in TypeScript',
        // },
      ],
      [],
      [],
    ],
  },
}

// Nav 목차
export const CONTENT_LANGUAGE = {
  mainCategory: 'Language',
  subCategory,
  subCategoryDetail,
}
