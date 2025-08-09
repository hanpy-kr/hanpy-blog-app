'use client';

import { useState, useEffect, useRef, useCallback, useMemo, memo } from 'react';
import dynamic from 'next/dynamic';
import './page.css';

// 다국어 지원 타입 및 데이터
type Language = 'en' | 'ko' | 'es' | 'fr' | 'de' | 'ja' | 'zh';

type TranslationData = {
  title: string;
  description: string;
  spinButton: string;
  editWheel: string;
  share: string;
  resetToDefault: string;
  recentResults: string;
  resultModalTitle: string;
  spinAgain: string;
  close: string;
  addSector: string;
  save: string;
  cancel: string;
  label: string;
  weight: string;
  color: string;
  remove: string;
  footerText: string;
  defaultSectors: { label: string; description: string }[];
  languageSelector: string;
  fullscreen: string;
  exitFullscreen: string;
};

type Translations = {
  [key in Language]: TranslationData;
};

const translations: Translations = {
  en: {
    title: "Lucky Wheel",
    description: "🎉 Feel the RUSH with every spin! ⚡ Your destiny awaits! Experience the ultimate thrill of chance - make your move NOW! 🍀✨",
    spinButton: "SPIN",
    editWheel: "Edit Wheel",
    share: "Share",
    resetToDefault: "Reset",
    recentResults: "Recent Results",
    resultModalTitle: "🎉 Result",
    spinAgain: "Spin Again",
    close: "Close",
    addSector: "Add Sector",
    save: "Save",
    cancel: "Cancel",
    label: "Label",
    weight: "Weight",
    color: "Color",
    remove: "Remove",
    footerText: "Fair random selection • Perfect for decisions and fun activities",
    defaultSectors: [
      { label: "Prize A", description: "You won the first prize!" },
      { label: "Prize B", description: "You won the second prize!" },
      { label: "Prize C", description: "You won the third prize!" },
      { label: "Try Again", description: "Better luck next time!" },
      { label: "Bonus", description: "You got a bonus prize!" }
    ],
    languageSelector: "Language",
    fullscreen: "Fullscreen",
    exitFullscreen: "Exit Fullscreen"
  },
  ko: {
    title: "행운의 돌림판",
    description: "🎉 짜릿한 스릴을 느껴보세요! ⚡ 당신의 운명이 기다리고 있어요! 지금 바로 도전해보세요! 🍀✨",
    spinButton: "돌리기",
    editWheel: "돌림판 편집",
    share: "공유",
    resetToDefault: "초기화",
    recentResults: "최근 결과",
    resultModalTitle: "🎉 결과",
    spinAgain: "다시 돌리기",
    close: "닫기",
    addSector: "섹터 추가",
    save: "저장",
    cancel: "취소",
    label: "라벨",
    weight: "가중치",
    color: "색상",
    remove: "삭제",
    footerText: "공정한 랜덤 선택 • 결정과 재미있는 활동에 완벽",
    defaultSectors: [
      { label: "상품 A", description: "첫 번째 상품에 당첨되셨습니다!" },
      { label: "상품 B", description: "두 번째 상품에 당첨되셨습니다!" },
      { label: "상품 C", description: "세 번째 상품에 당첨되셨습니다!" },
      { label: "재도전", description: "다음 기회에 도전해보세요!" },
      { label: "보너스", description: "보너스 상품을 받으셨습니다!" }
    ],
    languageSelector: "언어",
    fullscreen: "전체화면",
    exitFullscreen: "전체화면 해제"
  },
  es: {
    title: "Ruleta de la Suerte",
    description: "🎉 ¡Siente la EMOCIÓN con cada giro! ⚡ ¡Tu destino te espera! Vive la experiencia máxima del azar - ¡tu momento es AHORA! 🍀✨",
    spinButton: "GIRAR",
    editWheel: "Editar Ruleta",
    share: "Compartir",
    resetToDefault: "Restablecer",
    recentResults: "Resultados Recientes",
    resultModalTitle: "🎉 Resultado",
    spinAgain: "Girar Otra Vez",
    close: "Cerrar",
    addSector: "Añadir Sector",
    save: "Guardar",
    cancel: "Cancelar",
    label: "Etiqueta",
    weight: "Peso",
    color: "Color",
    remove: "Eliminar",
    footerText: "Selección aleatoria justa • Perfecto para decisiones y actividades divertidas",
    defaultSectors: [
      { label: "Premio A", description: "¡Has ganado el primer premio!" },
      { label: "Premio B", description: "¡Has ganado el segundo premio!" },
      { label: "Premio C", description: "¡Has ganado el tercer premio!" },
      { label: "Inténtalo", description: "¡Mejor suerte la próxima vez!" },
      { label: "Bonus", description: "¡Has obtenido un premio bonus!" }
    ],
    languageSelector: "Idioma",
    fullscreen: "Pantalla Completa",
    exitFullscreen: "Salir de Pantalla Completa"
  },
  fr: {
    title: "Roue de la Fortune",
    description: "🎉 Ressentez l'ADRÉNALINE à chaque tour! ⚡ Votre destin vous attend! Vivez le frisson ultime du hasard - votre moment commence MAINTENANT! 🍀✨",
    spinButton: "TOURNER",
    editWheel: "Modifier la Roue",
    share: "Partager",
    resetToDefault: "Réinitialiser",
    recentResults: "Résultats Récents",
    resultModalTitle: "🎉 Résultat",
    spinAgain: "Tourner Encore",
    close: "Fermer",
    addSector: "Ajouter Secteur",
    save: "Sauvegarder",
    cancel: "Annuler",
    label: "Étiquette",
    weight: "Poids",
    color: "Couleur",
    remove: "Supprimer",
    footerText: "Sélection aléatoire équitable • Parfait pour les décisions et activités amusantes",
    defaultSectors: [
      { label: "Prix A", description: "Vous avez gagné le premier prix !" },
      { label: "Prix B", description: "Vous avez gagné le deuxième prix !" },
      { label: "Prix C", description: "Vous avez gagné le troisième prix !" },
      { label: "Réessayer", description: "Bonne chance la prochaine fois !" },
      { label: "Bonus", description: "Vous avez obtenu un prix bonus !" }
    ],
    languageSelector: "Langue",
    fullscreen: "Plein Écran",
    exitFullscreen: "Quitter le Plein Écran"
  },
  de: {
    title: "Glücksrad",
    description: "🎉 Spüren Sie den NERVENKITZEL bei jeder Drehung! ⚡ Ihr Schicksal wartet auf Sie! Erleben Sie den ultimativen Thrill des Zufalls - Ihr Moment beginnt JETZT! 🍀✨",
    spinButton: "DREHEN",
    editWheel: "Rad Bearbeiten",
    share: "Teilen",
    resetToDefault: "Zurücksetzen",
    recentResults: "Aktuelle Ergebnisse",
    resultModalTitle: "🎉 Ergebnis",
    spinAgain: "Nochmal Drehen",
    close: "Schließen",
    addSector: "Sektor Hinzufügen",
    save: "Speichern",
    cancel: "Abbrechen",
    label: "Bezeichnung",
    weight: "Gewicht",
    color: "Farbe",
    remove: "Entfernen",
    footerText: "Faire Zufallsauswahl • Perfekt für Entscheidungen und unterhaltsame Aktivitäten",
    defaultSectors: [
      { label: "Preis A", description: "Sie haben den ersten Preis gewonnen!" },
      { label: "Preis B", description: "Sie haben den zweiten Preis gewonnen!" },
      { label: "Preis C", description: "Sie haben den dritten Preis gewonnen!" },
      { label: "Versuchen", description: "Viel Glück beim nächsten Mal!" },
      { label: "Bonus", description: "Sie haben einen Bonuspreis erhalten!" }
    ],
    languageSelector: "Sprache",
    fullscreen: "Vollbild",
    exitFullscreen: "Vollbild Verlassen"
  },
  ja: {
    title: "ラッキーホイール",
    description: "🎉 回すたびにドキドキ体験! ⚡ あなたの運命が待っています! 究極のスリルを味わおう - 運命の瞬間は今です! 🍀✨",
    spinButton: "回す",
    editWheel: "ホイール編集",
    share: "共有",
    resetToDefault: "リセット",
    recentResults: "最近の結果",
    resultModalTitle: "🎉 結果",
    spinAgain: "もう一度回す",
    close: "閉じる",
    addSector: "セクター追加",
    save: "保存",
    cancel: "キャンセル",
    label: "ラベル",
    weight: "重み",
    color: "色",
    remove: "削除",
    footerText: "公正なランダム選択 • 決定と楽しい活動に最適",
    defaultSectors: [
      { label: "賞品A", description: "第1位の賞品を獲得しました！" },
      { label: "賞品B", description: "第2位の賞品を獲得しました！" },
      { label: "賞品C", description: "第3位の賞品を獲得しました！" },
      { label: "再挑戦", description: "次回頑張ってください！" },
      { label: "ボーナス", description: "ボーナス賞品を獲得しました！" }
    ],
    languageSelector: "言語",
    fullscreen: "フルスクリーン",
    exitFullscreen: "フルスクリーン解除"
  },
  zh: {
    title: "幸运转盘",
    description: "🎉 每次转动都充满刺激! ⚡ 你的命运在等待! 体验极致的惊险时刻 - 你的机会就是现在! 🍀✨",
    spinButton: "转动",
    editWheel: "编辑转盘",
    share: "分享",
    resetToDefault: "重置",
    recentResults: "最近结果",
    resultModalTitle: "🎉 结果",
    spinAgain: "再次转动",
    close: "关闭",
    addSector: "添加扇区",
    save: "保存",
    cancel: "取消",
    label: "标签",
    weight: "权重",
    color: "颜色",
    remove: "删除",
    footerText: "公平随机选择 • 完美适用于决策和有趣活动",
    defaultSectors: [
      { label: "奖品A", description: "您获得了第一名奖品！" },
      { label: "奖品B", description: "您获得了第二名奖品！" },
      { label: "奖品C", description: "您获得了第三名奖品！" },
      { label: "再试一次", description: "下次好运！" },
      { label: "奖励", description: "您获得了奖励奖品！" }
    ],
    languageSelector: "语言",
    fullscreen: "全屏",
    exitFullscreen: "退出全屏"
  }
};

// 기본 돌림판 설정 (영어 기본) - 생동감 있는 색상
const createDefaultSectors = (language: Language) => {
  const defaultData = translations[language].defaultSectors;
  return [
    { id: "a", label: defaultData[0].label, weight: 25, color: "#4FC3F7", description: defaultData[0].description },
    { id: "b", label: defaultData[1].label, weight: 20, color: "#66BB6A", description: defaultData[1].description },
    { id: "c", label: defaultData[2].label, weight: 20, color: "#FFA726", description: defaultData[2].description },
    { id: "d", label: defaultData[3].label, weight: 20, color: "#EC407A", description: defaultData[3].description },
    { id: "e", label: defaultData[4].label, weight: 15, color: "#AB47BC", description: defaultData[4].description }
  ];
};

type Sector = {
  id: string;
  label: string;
  weight: number;
  color: string;
  description: string;
};

type SpinResult = {
  sector: Sector;
  timestamp: number;
};

// 유틸리티 함수들
const getSecureRandom = (): number => {
  const array = new Uint32Array(1);
  crypto.getRandomValues(array);
  return array[0] / (0xffffffff + 1);
};

const selectWeightedRandom = (sectors: readonly Sector[]): Sector => {
  if (!sectors || sectors.length === 0) {
    throw new Error('섹터가 없습니다');
  }
  
  const totalWeight = sectors.reduce((sum, sector) => sum + (sector?.weight || 0), 0);
  if (totalWeight === 0) throw new Error('총 가중치가 0입니다');
  
  const random = getSecureRandom() * totalWeight;
  let accumulator = 0;
  
  for (const sector of sectors) {
    if (!sector) continue;
    accumulator += sector.weight;
    if (random <= accumulator) {
      return sector;
    }
  }
  
  return sectors[sectors.length - 1];
};

const calculateTargetAngle = (sectorIndex: number, totalSectors: number): number => {
  const sectorAngle = 360 / totalSectors;
  const targetAngle = sectorIndex * sectorAngle + sectorAngle / 2;
  
  // 5-8바퀴 추가 회전으로 더 긴장감 있는 효과
  const fullRotations = 5 + Math.floor(getSecureRandom() * 4); // 5-8바퀴
  
  // 랜덤으로 역회전 효과 추가 (30% 확률)
  const shouldReverseEffect = getSecureRandom() < 0.3;
  const reverseAngle = shouldReverseEffect ? 180 + Math.floor(getSecureRandom() * 180) : 0; // 180-360도 역회전
  
  return fullRotations * 360 + reverseAngle + (360 - targetAngle); // 반시계방향 보정
};

// 로컬 스토리지 키
const STORAGE_KEYS = {
  RECENT_RESULTS: 'spin-wheel-recent-results',
  WHEEL_CONFIG: 'spin-wheel-config',
  LANGUAGE: 'spin-wheel-language',
  SOUND_ENABLED: 'spin-wheel-sound'
} as const;

// 텍스트 색상을 배경에 따라 최적화
const getTextColor = (backgroundColor: string): string => {
  // hex 색상을 RGB로 변환
  const hex = backgroundColor.replace('#', '');
  const r = parseInt(hex.substr(0, 2), 16);
  const g = parseInt(hex.substr(2, 2), 16);
  const b = parseInt(hex.substr(4, 2), 16);
  
  // 밝기 계산 (0-255)
  const brightness = (r * 299 + g * 587 + b * 114) / 1000;
  
  // 생동감 있는 색상에 대해 흰색 텍스트 사용
  return brightness > 140 ? '#000000' : '#FFFFFF';
};

// 색상을 더 밝거나 어둡게 만드는 함수
const adjustColorBrightness = (hexColor: string, percent: number): string => {
  const num = parseInt(hexColor.replace('#', ''), 16);
  const amt = Math.round(2.55 * percent);
  const R = (num >> 16) + amt;
  const G = (num >> 8 & 0x00FF) + amt;
  const B = (num & 0x0000FF) + amt;
  return `#${(0x1000000 + (R < 255 ? R < 1 ? 0 : R : 255) * 0x10000 +
    (G < 255 ? G < 1 ? 0 : G : 255) * 0x100 +
    (B < 255 ? B < 1 ? 0 : B : 255)).toString(16).slice(1)}`;
};

// 그라데이션 ID 생성 함수
const getGradientId = (sectorId: string): string => `gradient-${sectorId}`;

// 텍스트 크기 결정 함수
const getOptimalFontSize = (sectorCount: number, sectorAngle: number, text: string): number => {
  // 기본 폰트 크기 (1200x1200 돌림판에 맞춰 대폭 확대)
  let baseFontSize = 36;
  
  // 섹터가 많을수록 폰트 크기 감소 (하지만 전체적으로 크게)
  if (sectorCount > 20) {
    baseFontSize = 22;
  } else if (sectorCount > 15) {
    baseFontSize = 26;
  } else if (sectorCount > 12) {
    baseFontSize = 30;
  } else if (sectorCount > 8) {
    baseFontSize = 32;
  } else if (sectorCount > 6) {
    baseFontSize = 34;
  }
  
  // 텍스트 길이에 따른 조정 (최소 크기도 크게)
  if (text.length > 10) {
    baseFontSize = Math.max(18, baseFontSize - 6);
  } else if (text.length > 8) {
    baseFontSize = Math.max(20, baseFontSize - 5);
  } else if (text.length > 6) {
    baseFontSize = Math.max(24, baseFontSize - 4);
  } else if (text.length > 4) {
    baseFontSize = Math.max(28, baseFontSize - 2);
  }
  
  // 각도가 너무 좁으면 더 작게 (하지만 최소 크기 확대)
  if (sectorAngle < 30) {
    baseFontSize = Math.max(16, baseFontSize - 4);
  } else if (sectorAngle < 45) {
    baseFontSize = Math.max(20, baseFontSize - 3);
  }
  
  return baseFontSize;
};

// SVG 돌림판 컴포넌트
const WheelSVG = ({ 
  sectors, 
  rotation, 
  isSpinning,
  prefersReducedMotion 
}: { 
  sectors: readonly Sector[]; 
  rotation: number;
  isSpinning: boolean;
  prefersReducedMotion: boolean;
}) => {
  const totalSectors = sectors.length;
  const sectorAngle = 360 / totalSectors;
  
  return (
    <div className="wheel-container" role="img" aria-label={`Spinning wheel with ${sectors.length} sectors`}>
      <svg 
        width="1200" 
        height="1200" 
        viewBox="0 0 1200 1200" 
        className="wheel-svg"
        style={{ 
          transform: `rotate(${rotation}deg)`,
          transition: isSpinning ? 
            (prefersReducedMotion ? 'transform 0.1s ease-out' : 'transform 6s cubic-bezier(0.25, 0.1, 0.25, 1)') : 
            'none'
        }}
      >
        <defs>
          {/* 중앙 원 그라데이션 */}
          <radialGradient id="centerGradient" cx="50%" cy="30%" r="70%">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="70%" stopColor="#f8f9fa" />
            <stop offset="100%" stopColor="#e9ecef" />
          </radialGradient>
        </defs>
        
        {/* 외곽 테두리 */}
        <circle
          cx="600"
          cy="600"
          r="580"
          fill="none"
          stroke="#2c3e50"
          strokeWidth="12"
          filter="drop-shadow(0 10px 30px rgba(0,0,0,0.2))"
        />
        
        {sectors.map((sector, index) => {
          const startAngle = index * sectorAngle;
          const endAngle = (index + 1) * sectorAngle;
          
          const startAngleRad = (startAngle - 90) * (Math.PI / 180);
          const endAngleRad = (endAngle - 90) * (Math.PI / 180);
          
          const x1 = 600 + 580 * Math.cos(startAngleRad);
          const y1 = 600 + 580 * Math.sin(startAngleRad);
          const x2 = 600 + 580 * Math.cos(endAngleRad);
          const y2 = 600 + 580 * Math.sin(endAngleRad);
          
          const largeArcFlag = sectorAngle > 180 ? 1 : 0;
          
          const pathData = [
            `M 600 600`,
            `L ${x1} ${y1}`,
            `A 580 580 0 ${largeArcFlag} 1 ${x2} ${y2}`,
            'Z'
          ].join(' ');
          
          const textAngle = startAngle + sectorAngle / 2;
          const textAngleRad = (textAngle - 90) * (Math.PI / 180);
          
          // 텍스트 위치를 더 큰 원(580반지름)에 맞춰 조정
          const textRadius = totalSectors > 15 ? 320 : totalSectors > 10 ? 370 : totalSectors > 6 ? 420 : 450;
          const textX = 600 + textRadius * Math.cos(textAngleRad);
          const textY = 600 + textRadius * Math.sin(textAngleRad);
          
          const percentage = Math.round((sector.weight / sectors.reduce((sum, s) => sum + s.weight, 0)) * 100);
          const fontSize = getOptimalFontSize(totalSectors, sectorAngle, sector.label);
          const textColor = getTextColor(sector.color);
          
          // 방사형 텍스트 배치 - 각도에 따라 텍스트 방향 결정
          let displayAngle = textAngle;
          let anchor = "middle";
          
          // 텍스트가 뒤집히지 않도록 조정 (아래쪽 반원에서는 180도 회전)
          if (textAngle > 90 && textAngle < 270) {
            displayAngle = textAngle + 180;
            anchor = "middle";
          }
          
          // 섹터가 너무 많으면 텍스트 대신 번호 표시
          const shouldShowNumber = totalSectors > 15 || (sectorAngle < 24 && sector.label.length > 4);
          const displayText = shouldShowNumber ? (index + 1).toString() : sector.label;
          
          return (
            <g key={sector.id}>
              <path
                d={pathData}
                fill={sector.color}
                stroke="#ffffff"
                strokeWidth="2"
              />
              
              {/* 방사형 텍스트 배치 - 텍스트 배경 (가독성 향상) */}
              <text
                x={textX}
                y={textY}
                textAnchor={anchor}
                dominantBaseline="middle"
                fill={textColor === '#FFFFFF' ? 'rgba(0, 0, 0, 0.8)' : 'rgba(255, 255, 255, 0.8)'}
                fontSize={fontSize}
                fontWeight="700"
                stroke={textColor === '#FFFFFF' ? 'rgba(0, 0, 0, 0.5)' : 'rgba(255, 255, 255, 0.5)'}
                strokeWidth="4"
                transform={`rotate(${displayAngle}, ${textX}, ${textY})`}
              >
                {displayText}
              </text>
              
              {/* 방사형 텍스트 배치 - 실제 텍스트 */}
              <text
                x={textX}
                y={textY}
                textAnchor={anchor}
                dominantBaseline="middle"
                fill={textColor}
                fontSize={fontSize}
                fontWeight="700"
                transform={`rotate(${displayAngle}, ${textX}, ${textY})`}
              >
                {displayText}
              </text>
            </g>
          );
        })}
        
        {/* 중앙 원 */}
        <circle
          cx="600"
          cy="600"
          r="90"
          fill="url(#centerGradient)"
          stroke="#2c3e50"
          strokeWidth="10"
          filter="drop-shadow(0 10px 25px rgba(0,0,0,0.3))"
        />
        
        {/* 중앙 로고/아이콘 */}
        <text
          x="600"
          y="600"
          textAnchor="middle"
          dominantBaseline="middle"
          fill="#2c3e50"
          fontSize="75"
          fontWeight="800"
          filter="drop-shadow(0 6px 12px rgba(0,0,0,0.2))"
        >
          🎯
        </text>
      </svg>
      
      {/* 포인터 (시계방향으로 회전, 12시 방향) - 적절한 크기로 조정 */}
      <div className="wheel-pointer" aria-hidden="true">
        <svg width="25" height="30" viewBox="0 0 25 30">
          <defs>
            <filter id="pointerShadow" x="-50%" y="-50%" width="200%" height="200%">
              <feDropShadow dx="0" dy="4" stdDeviation="4" floodOpacity="0.4"/>
            </filter>
          </defs>
          <polygon
            points="12.5,25 20,8 12.5,12 5,8"
            fill="#e74c3c"
            stroke="#ffffff"
            strokeWidth="2"
            filter="url(#pointerShadow)"
          />
          <polygon
            points="12.5,22 17,10 12.5,13 8,10"
            fill="rgba(255,255,255,0.3)"
            strokeWidth="0"
          />
        </svg>
      </div>
    </div>
  );
};

// 언어 선택기 컴포넌트
const LanguageSelector = ({ 
  currentLanguage, 
  onLanguageChange,
  translations,
  isMounted 
}: { 
  currentLanguage: Language; 
  onLanguageChange: (lang: Language) => void;
  translations: any;
  isMounted: boolean;
}) => {
  const languages = [
    { code: 'en' as Language, name: 'English', flag: '🇺🇸' },
    { code: 'ko' as Language, name: '한국어', flag: '🇰🇷' },
    { code: 'es' as Language, name: 'Español', flag: '🇪🇸' },
    { code: 'fr' as Language, name: 'Français', flag: '🇫🇷' },
    { code: 'de' as Language, name: 'Deutsch', flag: '🇩🇪' },
    { code: 'ja' as Language, name: '日本語', flag: '🇯🇵' },
    { code: 'zh' as Language, name: '中文', flag: '🇨🇳' }
  ];

  return (
    <div className="language-selector">
      <label htmlFor="language-select" className="language-label">
        {isMounted ? translations.languageSelector : 'Language'}:
      </label>
      <select 
        id="language-select"
        value={currentLanguage} 
        onChange={(e) => onLanguageChange(e.target.value as Language)}
        className="language-select"
        aria-label={isMounted ? translations.languageSelector : 'Language'}
      >
        {languages.map((lang) => (
          <option key={lang.code} value={lang.code}>
            {lang.flag} {lang.name}
          </option>
        ))}
      </select>
    </div>
  );
};

// 전체화면 버튼 컴포넌트
const FullscreenButton = ({ 
  isFullscreen, 
  onToggle, 
  translations,
  isMounted 
}: { 
  isFullscreen: boolean; 
  onToggle: () => void; 
  translations: TranslationData;
  isMounted: boolean;
}) => {
  return (
    <button
      onClick={onToggle}
      className="fullscreen-button"
      aria-label={isMounted ? (isFullscreen ? translations.exitFullscreen : translations.fullscreen) : (isFullscreen ? 'Exit Fullscreen' : 'Fullscreen')}
      title={isMounted ? (isFullscreen ? translations.exitFullscreen : translations.fullscreen) : (isFullscreen ? 'Exit Fullscreen' : 'Fullscreen')}
    >
      {isFullscreen ? (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M8 3v3a2 2 0 0 1-2 2H3m18 0h-3a2 2 0 0 1-2-2V3m0 18v-3a2 2 0 0 0 2-2h3M3 16h3a2 2 0 0 0 2 2v3" />
        </svg>
      ) : (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3" />
        </svg>
      )}
    </button>
  );
};

// 스핀 버튼 컴포넌트
const SpinButton = ({ 
  onClick, 
  disabled,
  text
}: { 
  onClick: () => void; 
  disabled: boolean;
  text: string;
}) => {
  return (
    <button
      className={`spin-button ${disabled ? 'disabled' : ''}`}
      onClick={onClick}
      disabled={disabled}
      aria-label={disabled ? 'Spinning...' : 'Spin the wheel'}
    >
      {text}
    </button>
  );
};

// 결과 모달 컴포넌트
const ResultModal = ({ 
  result, 
  isOpen, 
  onClose, 
  onSpin 
}: { 
  result: Sector | null; 
  isOpen: boolean; 
  onClose: () => void;
  onSpin: () => void;
}) => {
  if (!isOpen || !result) {
    return (
      <div style={{ display: 'none' }} aria-hidden="true">
        {/* Hidden modal to maintain consistent DOM structure */}
      </div>
    );
  }
  
  return (
    <div 
      className="modal-backdrop" 
      onClick={onClose}
      role="dialog" 
      aria-labelledby="result-title"
      aria-describedby="result-description"
    >
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <h2 id="result-title" className="result-title">🎉 결과</h2>
        <div className="result-sector" style={{ backgroundColor: result.color }}>
          {result.label}
        </div>
        <p id="result-description" className="result-description">
          {result.description}
        </p>
        <div className="modal-buttons">
          <button className="button-secondary" onClick={onClose}>
            닫기
          </button>
          <button className="button-primary" onClick={onSpin}>
            다시 돌리기
          </button>
        </div>
      </div>
    </div>
  );
};



// 돌림판 편집 모달 컴포넌트
const WheelEditModal = ({ 
  isOpen, 
  onClose, 
  sectors, 
  onSave 
}: { 
  isOpen: boolean; 
  onClose: () => void; 
  sectors: Sector[]; 
  onSave: (newSectors: Sector[]) => void;
}) => {
  const [editingSectors, setEditingSectors] = useState<Sector[]>(sectors);
  
  useEffect(() => {
    setEditingSectors([...sectors]);
  }, [sectors]);
  
  // 배경과 조화로운 생동감 있는 색상 팔레트
  const generateRandomColor = () => {
    const vibrantColors = [
      // 생동감 있는 블루 계열
      '#4FC3F7', '#29B6F6', '#03A9F4', '#039BE5',
      // 생동감 있는 그린 계열
      '#66BB6A', '#4CAF50', '#43A047', '#388E3C',
      // 생동감 있는 오렌지 계열
      '#FFA726', '#FF9800', '#FB8C00', '#F57C00',
      // 생동감 있는 핑크 계열
      '#EC407A', '#E91E63', '#D81B60', '#C2185B',
      // 생동감 있는 퍼플 계열
      '#AB47BC', '#9C27B0', '#8E24AA', '#7B1FA2',
      // 생동감 있는 틸 계열
      '#26A69A', '#009688', '#00897B', '#00695C',
      // 생동감 있는 인디고 계열
      '#5C6BC0', '#3F51B5', '#3949AB', '#303F9F',
      // 생동감 있는 딥오렌지 계열
      '#FF7043', '#FF5722', '#F4511E', '#E64A19'
    ];
    return vibrantColors[Math.floor(Math.random() * vibrantColors.length)];
  };

  const addSector = () => {
    const newId = Date.now().toString();
    const newSector: Sector = {
      id: newId,
      label: '새 항목',
      weight: 10,
      color: generateRandomColor(),
      description: '새로운 항목입니다!'
    };
    setEditingSectors([...editingSectors, newSector]);
  };
  
  const removeSector = (id: string) => {
    if (editingSectors.length <= 2) {
      alert('최소 2개의 섹터가 필요합니다.');
      return;
    }
    setEditingSectors(editingSectors.filter(s => s.id !== id));
  };
  
  const updateSector = (id: string, field: keyof Sector, value: string | number) => {
    setEditingSectors(editingSectors.map(sector => 
      sector.id === id ? { ...sector, [field]: value } : sector
    ));
  };
  
  const handleSave = () => {
    // 유효성 검사
    const hasEmptyLabel = editingSectors.some(s => !s.label.trim());
    const hasInvalidWeight = editingSectors.some(s => s.weight <= 0);
    
    if (hasEmptyLabel) {
      alert('모든 섹터에 이름을 입력해주세요.');
      return;
    }
    
    if (hasInvalidWeight) {
      alert('가중치는 0보다 큰 숫자여야 합니다.');
      return;
    }
    
    onSave(editingSectors);
    onClose();
  };
  
  if (!isOpen) {
    return (
      <div style={{ display: 'none' }} aria-hidden="true">
        {/* Hidden modal to maintain consistent DOM structure */}
      </div>
    );
  }
  
  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="edit-modal-content" onClick={(e) => e.stopPropagation()}>
        <h2>돌림판 편집</h2>
        
        {/* 미리보기 */}
        <div className="wheel-preview">
          <h3>미리보기</h3>
          <div className="preview-container">
            <WheelSVG 
              sectors={editingSectors}
              rotation={0}
              isSpinning={false}
              prefersReducedMotion={false}
            />
          </div>
        </div>
        
        <div className="sectors-list">
          {editingSectors.map((sector, index) => (
            <div key={sector.id} className="sector-edit-item">
              <div className="sector-preview" style={{ backgroundColor: sector.color }}>
                {index + 1}
              </div>
              
              <div className="sector-inputs">
                <input
                  type="text"
                  value={sector.label}
                  onChange={(e) => updateSector(sector.id, 'label', e.target.value)}
                  placeholder="섹터 이름"
                  className="sector-input"
                />
                
                <input
                  type="number"
                  value={sector.weight}
                  onChange={(e) => updateSector(sector.id, 'weight', parseInt(e.target.value) || 1)}
                  min="1"
                  placeholder="가중치"
                  className="sector-input weight-input"
                />
                
                <input
                  type="color"
                  value={sector.color}
                  onChange={(e) => updateSector(sector.id, 'color', e.target.value)}
                  className="color-input"
                />
                
                <input
                  type="text"
                  value={sector.description}
                  onChange={(e) => updateSector(sector.id, 'description', e.target.value)}
                  placeholder="설명"
                  className="sector-input"
                />
                
                <button 
                  className="remove-button"
                  onClick={() => removeSector(sector.id)}
                  disabled={editingSectors.length <= 2}
                  aria-label={`${sector.label} 섹터 삭제`}
                >
                  ✕
                </button>
              </div>
            </div>
          ))}
        </div>
        
        <div className="edit-modal-actions">
          <button className="add-sector-button" onClick={addSector}>
            + 섹터 추가
          </button>
          
          <div className="modal-buttons">
            <button className="button-secondary" onClick={onClose}>
              취소
            </button>
            <button className="button-primary" onClick={handleSave}>
              저장
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// 최근 결과 컴포넌트
const RecentResults = ({ results, title }: { results: SpinResult[]; title: string }) => {
  return (
    <section className="recent-results" aria-labelledby="recent-title">
      <h3 id="recent-title">{title}</h3>
      <div className="results-list">
        {results.length > 0 ? (
          results.map((result, index) => (
            <div 
              key={`${result.timestamp}-${index}`} 
              className="result-item"
              style={{ backgroundColor: result.sector.color }}
            >
              <span className="result-label">{result.sector.label}</span>
              <span className="result-time">
                {new Date(result.timestamp).toLocaleTimeString('ko-KR', { 
                  hour: '2-digit', 
                  minute: '2-digit' 
                })}
              </span>
            </div>
          ))
        ) : (
          <p className="no-results">아직 결과가 없습니다</p>
        )}
      </div>
    </section>
  );
};

// 메인 페이지 컴포넌트
export default function SpinWheelPage() {
  const [language, setLanguage] = useState<Language>(() => {
    if (typeof window === 'undefined') return 'en';
    return (localStorage.getItem(STORAGE_KEYS.LANGUAGE) as Language) || 'en';
  });
  const [rotation, setRotation] = useState(0);
  const [isSpinning, setIsSpinning] = useState(false);
  const [selectedSector, setSelectedSector] = useState<Sector | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [recentResults, setRecentResults] = useState<SpinResult[]>(() => {
    if (typeof window === 'undefined') return [];
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.RECENT_RESULTS);
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(() => {
    if (typeof window === 'undefined') return false;
    return localStorage.getItem(STORAGE_KEYS.SOUND_ENABLED) === 'true';
  });
  const [wheelConfig, setWheelConfig] = useState<Sector[]>(() => {
    if (typeof window === 'undefined') return createDefaultSectors('en');
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.WHEEL_CONFIG);
      const storedLanguage = localStorage.getItem(STORAGE_KEYS.LANGUAGE) as Language;
      const defaultLanguage = storedLanguage || 'en';
      return stored ? JSON.parse(stored) : createDefaultSectors(defaultLanguage);
    } catch {
      return createDefaultSectors('en');
    }
  });
  const [isEditing, setIsEditing] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  
  // 현재 언어의 번역 데이터 (memoized)
  const t = useMemo(() => translations[language], [language]);
  
  const wheelRef = useRef<HTMLDivElement>(null);
  
  // 클라이언트 사이드 초기화
  useEffect(() => {
    setIsMounted(true);
    
    // 접근성 설정 확인
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);
    
    const handleMotionChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
    };
    
    mediaQuery.addEventListener('change', handleMotionChange);
    
    // 로컬 스토리지에서 데이터 복원
    const storedResults = localStorage.getItem(STORAGE_KEYS.RECENT_RESULTS);
    const storedSoundEnabled = localStorage.getItem(STORAGE_KEYS.SOUND_ENABLED);
    const storedWheelConfig = localStorage.getItem(STORAGE_KEYS.WHEEL_CONFIG);
    const storedLanguage = localStorage.getItem(STORAGE_KEYS.LANGUAGE);
    
    // 언어 설정 복원 (브라우저 언어 감지 포함)
    if (storedLanguage) {
      setLanguage(storedLanguage as Language);
    } else {
      // 브라우저 언어 자동 감지
      const browserLang = navigator.language.toLowerCase();
      if (browserLang.startsWith('ko')) setLanguage('ko');
      else if (browserLang.startsWith('es')) setLanguage('es');
      else if (browserLang.startsWith('fr')) setLanguage('fr');
      else if (browserLang.startsWith('de')) setLanguage('de');
      else if (browserLang.startsWith('ja')) setLanguage('ja');
      else if (browserLang.startsWith('zh')) setLanguage('zh');
      else setLanguage('en'); // 기본값은 영어
    }
    
    if (storedSoundEnabled) {
      setSoundEnabled(JSON.parse(storedSoundEnabled));
    }
    
    if (storedWheelConfig) {
      try {
        const parsed = JSON.parse(storedWheelConfig);
        setWheelConfig(parsed);
      } catch (e) {
        console.warn('돌림판 설정 파싱 실패:', e);
      }
    }
    
    if (storedResults) {
      try {
        const parsed = JSON.parse(storedResults);
        setRecentResults(parsed.slice(0, 3));
      } catch (e) {
        console.warn('결과 데이터 파싱 실패:', e);
      }
    }
    
    return () => {
      mediaQuery.removeEventListener('change', handleMotionChange);
    };
  }, []);
  

  

  
  // 사운드 재생 함수
  const playSound = useCallback((type: 'spin' | 'win' | 'lose') => {
    if (!soundEnabled || typeof window === 'undefined') return;
    
    try {
      const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioContext) return;
      
      const context = new AudioContext();
      const oscillator = context.createOscillator();
      const gainNode = context.createGain();
      
      oscillator.connect(gainNode);
      gainNode.connect(context.destination);
      
      switch (type) {
        case 'spin':
          oscillator.frequency.setValueAtTime(400, context.currentTime);
          oscillator.frequency.exponentialRampToValueAtTime(200, context.currentTime + 0.1);
          gainNode.gain.setValueAtTime(0.1, context.currentTime);
          gainNode.gain.exponentialRampToValueAtTime(0.01, context.currentTime + 0.1);
          oscillator.start();
          oscillator.stop(context.currentTime + 0.1);
          break;
        case 'win':
          oscillator.frequency.setValueAtTime(523, context.currentTime);
          oscillator.frequency.setValueAtTime(659, context.currentTime + 0.1);
          oscillator.frequency.setValueAtTime(784, context.currentTime + 0.2);
          gainNode.gain.setValueAtTime(0.1, context.currentTime);
          gainNode.gain.exponentialRampToValueAtTime(0.01, context.currentTime + 0.3);
          oscillator.start();
          oscillator.stop(context.currentTime + 0.3);
          break;
        case 'lose':
          oscillator.frequency.setValueAtTime(300, context.currentTime);
          oscillator.frequency.exponentialRampToValueAtTime(150, context.currentTime + 0.2);
          gainNode.gain.setValueAtTime(0.1, context.currentTime);
          gainNode.gain.exponentialRampToValueAtTime(0.01, context.currentTime + 0.2);
          oscillator.start();
          oscillator.stop(context.currentTime + 0.2);
          break;
      }
    } catch (error) {
      console.warn('사운드 재생 실패:', error);
    }
  }, [soundEnabled]);
  
  const toggleSound = () => {
    const newSoundEnabled = !soundEnabled;
    setSoundEnabled(newSoundEnabled);
    localStorage.setItem(STORAGE_KEYS.SOUND_ENABLED, JSON.stringify(newSoundEnabled));
  };
  
  // 언어 변경 함수
  const changeLanguage = (newLanguage: Language) => {
    setLanguage(newLanguage);
    if (typeof window !== 'undefined') {
      localStorage.setItem(STORAGE_KEYS.LANGUAGE, newLanguage);
    }
    
    // 언어 변경 시 기본 섹터가 현재 설정과 동일하면 새 언어로 업데이트
    const currentDefault = createDefaultSectors(language);
    const isDefaultConfig = wheelConfig.length === currentDefault.length && 
      wheelConfig.every((sector, index) => 
        sector.label === currentDefault[index].label && 
        sector.description === currentDefault[index].description
      );
    
    if (isDefaultConfig) {
      const newDefaultSectors = createDefaultSectors(newLanguage);
      setWheelConfig(newDefaultSectors);
      if (typeof window !== 'undefined') {
        localStorage.setItem(STORAGE_KEYS.WHEEL_CONFIG, JSON.stringify(newDefaultSectors));
      }
    }
  };
  
  const handleSpin = useCallback(() => {
    if (isSpinning || !wheelConfig || wheelConfig.length === 0) return;
    
    try {
      const selectedSector = selectWeightedRandom(wheelConfig);
      if (!selectedSector) {
        throw new Error('섹터 선택 실패');
      }
      
      const sectorIndex = wheelConfig.findIndex(s => s?.id === selectedSector.id);
      if (sectorIndex === -1) {
        throw new Error('섹터 인덱스를 찾을 수 없습니다');
      }
      
      const targetAngle = calculateTargetAngle(sectorIndex, wheelConfig.length);
      
      setIsSpinning(true);
      setRotation(prev => prev + targetAngle);
      setSelectedSector(selectedSector);
      
      // 스핀 사운드 재생
      playSound('spin');
      
      // 애니메이션 완료 후 결과 표시 (6초로 연장)
      const animationDuration = prefersReducedMotion ? 100 : 6000;
      
      const timeoutId = setTimeout(() => {
        try {
          setIsSpinning(false);
          setShowResult(true);
          
          // 최근 결과 저장
          const newResult: SpinResult = {
            sector: selectedSector,
            timestamp: Date.now()
          };
          
          setRecentResults(prev => {
            const updatedResults = [newResult, ...(prev || [])].slice(0, 3);
            if (typeof window !== 'undefined') {
              localStorage.setItem(STORAGE_KEYS.RECENT_RESULTS, JSON.stringify(updatedResults));
            }
            return updatedResults;
          });
          
          // 결과에 따른 사운드 재생
          if (selectedSector.id === 'a') { // 꽝
            playSound('lose');
          } else {
            playSound('win');
          }
          
          // 접근성을 위한 결과 읽기
          if (typeof window !== 'undefined' && document) {
            setTimeout(() => {
              try {
                const announcement = `결과: ${selectedSector.label}. ${selectedSector.description}`;
                const announcer = document.createElement('div');
                announcer.setAttribute('aria-live', 'polite');
                announcer.setAttribute('aria-atomic', 'true');
                announcer.className = 'sr-only';
                announcer.textContent = announcement;
                document.body.appendChild(announcer);
                setTimeout(() => {
                  if (document.body.contains(announcer)) {
                    document.body.removeChild(announcer);
                  }
                }, 1000);
              } catch (e) {
                console.warn('접근성 안내 오류:', e);
              }
            }, 100);
          }
        } catch (e) {
          console.error('애니메이션 완료 처리 오류:', e);
          setIsSpinning(false);
        }
      }, animationDuration);
      
      // 컴포넌트 언마운트 시 타이머 정리
      return () => {
        if (timeoutId) {
          clearTimeout(timeoutId);
        }
      };
      
    } catch (error) {
      console.error('스핀 실행 중 오류:', error);
      setIsSpinning(false);
      if (typeof window !== 'undefined') {
        alert('오류가 발생했습니다. 다시 시도해주세요.');
      }
    }
  }, [isSpinning, prefersReducedMotion, playSound, wheelConfig]);
  
  // 전체화면 처리 함수들
  const toggleFullscreen = useCallback(async () => {
    try {
      if (typeof document === 'undefined') return;
      
      if (!document.fullscreenElement) {
        // 전체화면 진입
        await document.documentElement.requestFullscreen();
        setIsFullscreen(true);
      } else {
        // 전체화면 해제
        await document.exitFullscreen();
        setIsFullscreen(false);
      }
    } catch (error) {
      console.warn('전체화면 전환 실패:', error);
    }
  }, []);
  
  // 전체화면 상태 감지
  useEffect(() => {
    if (typeof document === 'undefined') return;
    
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
    };
  }, []);
  
  // 키보드 이벤트 처리
  useEffect(() => {
    const handleKeydown = (e: KeyboardEvent) => {
      if (e.code === 'Space' || e.code === 'Enter') {
        if (e.target === document.body || (e.target as HTMLElement)?.closest('.spin-page')) {
          e.preventDefault();
          if (!isSpinning && !isEditing) {
            handleSpin();
          }
        }
      }
      
      if (e.code === 'Escape') {
        if (showResult) {
          handleCloseResult();
        } else if (isEditing) {
          setIsEditing(false);
        }
      }
    };
    
    document.addEventListener('keydown', handleKeydown);
    return () => document.removeEventListener('keydown', handleKeydown);
  }, [isSpinning, showResult, isEditing, handleSpin]);
  
  const handleCloseResult = () => {
    setShowResult(false);
    setSelectedSector(null);
  };
  
  const handleSpinFromModal = () => {
    handleCloseResult();
    setTimeout(handleSpin, 100);
  };
  
  const copyToClipboard = () => {
    try {
      if (!recentResults || recentResults.length === 0) return;
      
      const text = `가벼운 돌림판 결과: ${recentResults.map(r => r?.sector?.label || '알 수 없음').join(', ')}`;
      
      if (typeof window !== 'undefined' && navigator.clipboard) {
        navigator.clipboard.writeText(text).then(() => {
          alert('결과가 클립보드에 복사되었습니다!');
        }).catch(() => {
          // 폴백: 텍스트 선택 방식
          const textArea = document.createElement('textarea');
          textArea.value = text;
          document.body.appendChild(textArea);
          textArea.select();
          document.execCommand('copy');
          document.body.removeChild(textArea);
          alert('결과가 클립보드에 복사되었습니다!');
        });
      }
    } catch (error) {
      console.error('클립보드 복사 오류:', error);
    }
  };
  
  const handleWheelConfigSave = (newSectors: Sector[]) => {
    setWheelConfig(newSectors);
    localStorage.setItem(STORAGE_KEYS.WHEEL_CONFIG, JSON.stringify(newSectors));
  };
  
  const resetToDefault = () => {
    if (confirm(language === 'ko' ? '돌림판을 기본 설정으로 되돌리시겠습니까?' : 'Reset wheel to default settings?')) {
      const defaultSectors = createDefaultSectors(language);
      setWheelConfig(defaultSectors);
      localStorage.setItem(STORAGE_KEYS.WHEEL_CONFIG, JSON.stringify(defaultSectors));
    }
  };
  
  const isDisabled = isSpinning;
  
  return (
    <>
      {/* SEO 메타데이터 - 클라이언트에서만 렌더링 */}
      {isMounted && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@graph": [
                {
                  "@type": "WebPage",
                  "@id": "/spin",
                  "name": t.title,
                  "description": t.description,
                  "inLanguage": language,
                  "isPartOf": {
                    "@type": "WebSite",
                    "name": "Hanpy Blog",
                    "url": "/"
                  }
                },
                {
                  "@type": "SoftwareApplication",
                  "name": t.title,
                  "description": t.description,
                  "applicationCategory": "Game",
                  "operatingSystem": "Any",
                  "offers": {
                    "@type": "Offer",
                    "price": "0",
                    "priceCurrency": "USD"
                  }
                }
              ]
            })
          }}
        />
      )}
      
      <main className="spin-page">
        {/* 언어 선택기 - 우측 상단 고정 */}
        <div className="top-controls">
          <LanguageSelector 
            currentLanguage={language}
            onLanguageChange={changeLanguage}
            translations={t}
            isMounted={isMounted}
          />
          <FullscreenButton
            isFullscreen={isFullscreen}
            onToggle={toggleFullscreen}
            translations={t}
            isMounted={isMounted}
          />
        </div>
        
        <header className="page-header">
          <h1>{isMounted ? t.title : 'Random Picker'}</h1>
          <p className="page-description">
            {isMounted ? t.description : 'Feel the RUSH of anticipation! Your destiny awaits with every spin!'}
          </p>
        </header>
        
        <section className="wheel-section" aria-labelledby="wheel-title">
          <h2 id="wheel-title" className="sr-only">돌림판</h2>
          <WheelSVG 
            sectors={wheelConfig} 
            rotation={rotation}
            isSpinning={isSpinning}
            prefersReducedMotion={prefersReducedMotion}
          />
                    <SpinButton 
            onClick={handleSpin} 
            disabled={isDisabled}
            text={isSpinning ? `${isMounted ? t.spinButton : 'SPIN'}...` : (isMounted ? t.spinButton : 'SPIN')}
          />
          
          {/* 섹터가 많을 때 범례 표시 */}
          {isMounted && wheelConfig.length > 20 && (
            <div className="wheel-legend">
              <h3>범례</h3>
              <div className="legend-grid">
                {wheelConfig.map((sector, index) => (
                  <div key={sector.id} className="legend-item">
                    <span className="legend-number" style={{ backgroundColor: sector.color }}>
                      {index + 1}
                    </span>
                    <span className="legend-label">{sector.label}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </section>
        
        <RecentResults results={recentResults} title={isMounted ? t.recentResults : 'Recent Results'} />
        
        <div className="controls-section">
          {/* {isMounted && recentResults.length > 0 && (
            <button 
              className="share-button"
              onClick={copyToClipboard}
              aria-label="결과를 클립보드에 복사"
            >
              📋 결과 복사하기
            </button>
          )} */}
          
          <div className="settings-controls">
            <div className="settings-row">
              <button 
                className={`setting-button ${isMounted && soundEnabled ? 'active' : ''}`}
                onClick={toggleSound}
                aria-label={`${language === 'ko' ? '사운드' : 'Sound'} ${isMounted && soundEnabled ? (language === 'ko' ? '끄기' : 'off') : (language === 'ko' ? '켜기' : 'on')}`}
              >
                {isMounted && soundEnabled ? '🔊' : '🔇'} {isMounted ? (language === 'ko' ? '사운드' : 'Sound') : 'Sound'}
              </button>
              
              <button 
                className="setting-button"
                onClick={() => setIsEditing(true)}
                disabled={isSpinning}
                aria-label={isMounted ? t.editWheel : 'Edit Wheel'}
              >
                ⚙️ {isMounted ? t.editWheel : 'Edit Wheel'}
              </button>
              
              <button 
                className="setting-button reset-button"
                onClick={resetToDefault}
                disabled={isSpinning}
                aria-label={isMounted ? t.resetToDefault : 'Reset to Default'}
              >
                🔄 {isMounted ? t.resetToDefault : 'Reset to Default'}
              </button>
            </div>
            
            <div className="accessibility-info">
              {isMounted && prefersReducedMotion && (
                <span className="reduced-motion-indicator" aria-live="polite">
                  ♿ 애니메이션 최소화 모드
                </span>
              )}
            </div>
          </div>
        </div>
        
        <footer className="page-footer">
          <p>
            <small>
              {isMounted ? t.footerText : 'Perfect for decisions and fun activities'}
            </small>
          </p>
        </footer>
        
        <ResultModal
          result={selectedSector}
          isOpen={showResult}
          onClose={handleCloseResult}
          onSpin={handleSpinFromModal}
        />
        
        <WheelEditModal
          isOpen={isEditing}
          onClose={() => setIsEditing(false)}
          sectors={wheelConfig}
          onSave={handleWheelConfigSave}
        />
      </main>
    </>
  );
}
