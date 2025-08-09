/**
 * Manifest 유틸리티 함수들
 * 각 sub-project의 PWA manifest 관리
 */

export type ManifestConfig = {
  name: string;
  shortName: string;
  description: string;
  startUrl: string;
  scope: string;
  themeColor: string;
  backgroundColor: string;
  categories: string[];
  icons?: Array<{
    src: string;
    sizes: string;
    type: string;
    purpose?: string;
  }>;
  shortcuts?: Array<{
    name: string;
    shortName: string;
    description: string;
    url: string;
    icons: Array<{ src: string; sizes: string; }>;
  }>;
};

/**
 * Sub-project별 manifest 설정
 */
export const MANIFEST_CONFIGS: Record<string, ManifestConfig> = {
  spin: {
    name: "Lucky Wheel - Free Spinning Wheel",
    shortName: "Lucky Wheel",
    description: "Free online spinning wheel for games, prizes, and decision making",
    startUrl: "/spin",
    scope: "/spin",
    themeColor: "#4f46e5",
    backgroundColor: "#ffffff",
    categories: ["games", "entertainment", "utilities", "productivity"],
    shortcuts: [
      {
        name: "Spin Wheel",
        shortName: "Spin",
        description: "Quick access to spinning wheel",
        url: "/spin",
        icons: [{ src: "/icons/spin-192.png", sizes: "192x192" }]
      }
    ]
  },
  
  edu: {
    name: "Hanpy Education Center",
    shortName: "Hanpy Edu", 
    description: "Interactive learning platform for business English and educational content",
    startUrl: "/edu",
    scope: "/edu",
    themeColor: "#2563eb",
    backgroundColor: "#ffffff",
    categories: ["education", "utilities", "productivity"],
    shortcuts: [
      {
        name: "Business English",
        shortName: "English",
        description: "Learn business English phrases",
        url: "/edu/business-english",
        icons: [{ src: "/icons/edu-192.png", sizes: "192x192" }]
      }
    ]
  },
  
  blog: {
    name: "Hanpy Blog - Development & Tech Resources",
    shortName: "Hanpy Blog",
    description: "Comprehensive development blog covering backend, frontend, infrastructure, and interactive tools",
    startUrl: "/",
    scope: "/",
    themeColor: "#1f2937",
    backgroundColor: "#ffffff",
    categories: ["education", "productivity", "developer"]
  }
};

/**
 * Sub-project에 해당하는 manifest 경로 반환
 */
export const getManifestPath = (subProject?: string): string => {
  if (!subProject || !MANIFEST_CONFIGS[subProject]) {
    return '/manifest.json'; // 기본 블로그 manifest
  }
  
  return `/manifests/${subProject}.json`;
};

/**
 * Next.js metadata에서 사용할 manifest 경로 반환
 */
export const getManifestForMetadata = (subProject?: string): string => {
  return getManifestPath(subProject);
};

/**
 * 동적으로 manifest 생성 (필요시 사용)
 */
export const generateManifest = (config: ManifestConfig) => {
  return {
    name: config.name,
    short_name: config.shortName,
    description: config.description,
    start_url: config.startUrl,
    display: "standalone",
    background_color: config.backgroundColor,
    theme_color: config.themeColor,
    orientation: "portrait",
    scope: config.scope,
    icons: config.icons || [
      {
        src: "/favicon.ico",
        sizes: "any",
        type: "image/x-icon"
      }
    ],
    categories: config.categories,
    lang: "en",
    dir: "ltr",
    shortcuts: config.shortcuts || [],
    prefer_related_applications: false
  };
};
