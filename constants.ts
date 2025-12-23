import { ArrivalCardData, PurposeOfVisit } from './types';

export const INITIAL_CARD_DATA: ArrivalCardData = {
  familyName: 'WANG',
  givenName: 'DA-MING',
  gender: 'M',
  birthYear: '1960',
  birthMonth: '05',
  birthDay: '20',
  nationality: 'TAIWAN',
  passportNumber: '312345678',
  passportExpiryYear: '2030',
  passportExpiryMonth: '10',
  passportExpiryDay: '15',
  homeAddress: 'Taipei, Taiwan',
  koreaAddress: '33, Sajang 3-gil, Jeju-si, Jeju-do',
  koreaAddressKr: '제주특별자치도 제주시 연동 사장3길 33',
  detailAddress: 'Hotel The One',
  koreaPhone: '82-64-798-0001',
  email: '', 
  purpose: PurposeOfVisit.TOUR,
  flightNumber: 'LJ764',
  entryDate: '2024-01-02',
  departureDate: '2024-01-06',
  departureFlightNumber: 'LJ763'
};

export const EXAMPLE_CARD_DATA: ArrivalCardData = {
  ...INITIAL_CARD_DATA,
  email: 'wang_daming@gmail.com'
};

export const FIELD_GUIDES: Record<string, { title: string; desc: string; icon: string }> = {
  familyName: {
    title: "這裡填您的「英文姓氏」",
    desc: "請拿出護照，翻到有照片那一頁。看上面的 Surname，把英文抄下來. 例如：WANG (請填寫您本人的姓氏)",
    icon: "🛂"
  },
  givenName: {
    title: "這裡填您的「英文名字」",
    desc: "一樣看護照照片頁，Given Name 那一欄。記得如果有橫線 (-) 也要打上去喔！(請填寫您本人的名字)",
    icon: "🛂"
  },
  gender: {
    title: "您的性別",
    desc: "男生請點 Male (👨)，女生請點 Female (👩)。",
    icon: "🚻"
  },
  birthYear: {
    title: "出生年份 (西元)",
    desc: "請看護照上的 Date of Birth。例如 1960 年出生，就填 1960。",
    icon: "🎂"
  },
  nationality: {
    title: "國籍",
    desc: "這欄我們填 TAIWAN (台灣) 就好。",
    icon: "🌏"
  },
  passportNumber: {
    title: "護照號碼 (9碼)",
    desc: "請看護照照片頁的「右上角」，有 9 個號碼，請「照著填寫您本人的護照號碼」。",
    icon: "🔢"
  },
  koreaPhone: {
    title: "韓國聯絡電話",
    desc: "這個不用擔心！我已經幫您準備好飯店電話了，直接用這個就可以：82-64-798-0001。",
    icon: "📞"
  },
  detailAddress: {
    title: "飯店名稱",
    desc: "這裡填我們的飯店名字：Hotel The One。",
    icon: "🏨"
  },
  purpose: {
    title: "來韓國做什麼？",
    desc: "我們是來玩的，所以請選 Tour (旅遊) 這個選項。",
    icon: "🎒"
  }
};

export const GUIDE_SECTIONS = [
  {
    title: "什麼是電子入境卡？",
    content: "以前去韓國要在飛機上寫一張黃色的紙，現在可以用手機先填好，這樣下飛機通關比較快！這個網站就是教大家怎麼填。",
    highlight: true
  },
  {
    title: "要錢嗎？",
    content: "完全免費！這是韓國政府的規定，不用付錢。如果有網站要收錢，那就是詐騙，請小心。",
    highlight: false
  },
  {
    title: "要準備什麼？",
    content: "請先把您的「護照」準備在手邊，填寫時務必輸入您本人的姓名、護照號碼與效期。",
    highlight: false
  }
];

export const PURPOSE_OPTIONS = [
  { value: PurposeOfVisit.TOUR, label: '旅遊 (個人)' },
  { value: PurposeOfVisit.BUSINESS, label: '商務' },
  { value: PurposeOfVisit.VISIT, label: '探親' },
  { value: PurposeOfVisit.EMPLOYMENT, label: '工作' },
  { value: PurposeOfVisit.OTHER, label: '其他' },
];