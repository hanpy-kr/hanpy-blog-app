import { LanguageCategory } from '@/app/(categories)/types'

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
    href: '/language/ko/nodejs/contents',
    icon: 'https://resource.han-py.com/blog/logs/nodejs_logo.svg',
    description:
      "Node.js is a JavaScript runtime environment that enables developers to run JavaScript on servers and build scalable, event-driven applications. In this category, you'll find tutorials, guides, practical examples, and advanced techniques focused on Node.js development, performance optimization, and backend solutions.",
  },
  python: {
    id: LanguageCategory.PYTHON,
    name: 'Python',
    // href: '/language/ko/python/contents',
    href: '/language/ko/python/pyarmor',
    icon: 'https://resource.han-py.com/blog/logs/python_logo.svg',
    description:
      "Python is a versatile, high-level programming language widely used in web development, data science, automation, artificial intelligence, and more. In this category, you'll find detailed tutorials, practical examples, best practices, and advanced concepts to help you master Python programming and build efficient, robust applications.",
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
    title: [
      'Introduction & Fundamentals',
      'Built-in Modules',
      'External Libraries',
      'Error & Performance',
    ],
    subTitle: [
      [
        {
          href: '/language/ko/nodejs/introduction',
          title: 'Introduction',
        },
        {
          href: '/language/ko/nodejs/introduction-install_env_path',
          title: 'Environment Variables',
        },
        {
          href: '/language/ko/nodejs/introduction-nvm',
          title: 'Node Version Manager',
        },
        {
          href: '/language/ko/nodejs/buffer-stream-intro',
          title: 'Buffer & Stream',
        },
      ],
      [
        // Managing Files and Directories
        {
          href: '/language/ko/nodejs/lib-fs-existsSync',
          title: 'fs.existsSync',
        },
        {
          href: '/language/ko/nodejs/lib-fs-lstatSync',
          title: 'fs.lstatSync',
        },
        {
          href: '/language/ko/nodejs/lib-fs-statSync',
          title: 'fs.statSync',
        },
        // Asynchronous File Operations
        {
          href: '/language/ko/nodejs/lib-fs-promises',
          title: 'fs.promises',
        },
        {
          href: '/language/ko/nodejs/lib-fs-promises-unlink',
          title: 'fs.promises.unlink',
        },
        {
          href: '/language/ko/nodejs/lib-fs-readdir',
          title: 'fs.readdir',
        },
        {
          href: '/language/ko/nodejs/lib-fs-readdirSync',
          title: 'fs.readdirSync',
        },
        // URL Processing and Encoding
        {
          href: '/language/ko/nodejs/encoder-decoder',
          title: 'Encoder / Decoder',
        },
        // Child Process Management
        {
          href: '/language/ko/nodejs/utils-child_process-exec',
          title: 'child_process.exec',
        },
        {
          href: '/language/ko/nodejs/utils-child_process-spawn',
          title: 'child_process.spawn',
        },
        {
          href: '/language/ko/nodejs/utils-child_process-fork',
          title: 'child_process.fork',
        },
      ],
      [],
      [
        {
          href: '/language/ko/nodejs/error-captureStackTrace',
          title: 'CaptureStackTrace',
        },
        {
          href: '/language/ko/nodejs/beginner-nodejs-cpu-memory-monitoring',
          title: 'CPU and Memory Usage',
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
  python: {
    title: ['utils'],
    subTitle: [
      [
        {
          href: '/language/ko/python/pyarmor',
          title: 'Basic Types',
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
