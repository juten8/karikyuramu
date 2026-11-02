/**
 * 婚礼マルチベンダー業者一覧連絡票 ＆ 配送先荷札・宛名伝票 ＆ 招待状サンプルデータ
 */

// 1. 業者一覧連絡票（マルチベンダー緊急連絡網）
export interface VendorContactItem {
  id: string;
  category: string;
  companyName: string;
  contactPerson: string;
  phone: string;
  emergencyPhone: string;
  deliveryTime: string; // 搬入・到着予定時間
  roleDescription: string;
  status: 'confirmed' | 'pending' | 'arrived';
  checkNotes: string;
}

export const INITIAL_VENDOR_CONTACTS: VendorContactItem[] = [
  {
    id: 'v-hotel',
    category: '会場・宴会課',
    companyName: 'グランドホテル＆リゾート 特命バンケット課',
    contactPerson: '高橋 宴会支配人 / 佐々木 キャプテン',
    phone: '03-3456-7890',
    emergencyPhone: '090-1111-2222',
    deliveryTime: '前日全日 / 当日07:30開館',
    roleDescription: 'バンケットホール会場設営、料理・飲物提供、配膳スタッフ統括',
    status: 'confirmed',
    checkNotes: '前日20:00に最終テーブルセット＆クロス掛け完了確認済み'
  },
  {
    id: 'v-producer-gen',
    category: '総合プロデュース',
    companyName: '一般社団法人日本ブライダルプロデューサー協会 認定室',
    contactPerson: '統括 ゼネラルプロデューサー（総監督）',
    phone: '0120-888-999',
    emergencyPhone: '090-9999-8888',
    deliveryTime: '当日08:00現場入り',
    roleDescription: '結婚式全体の全ベンダー統括、進行遅延調整、両家対応、品質保証',
    status: 'confirmed',
    checkNotes: '心付け対象：10,000円〜30,000円（両親・新郎新婦より御礼）'
  },
  {
    id: 'v-producer-main',
    category: '担当プロデュース',
    companyName: 'ブライダルプロデュースオフィス 専任プランナー',
    contactPerson: '専任ウェディングプロデューサー',
    phone: '03-1234-5678',
    emergencyPhone: '090-7777-6666',
    deliveryTime: '当日08:00現場入り',
    roleDescription: '新郎新婦アテンド、進行台本タイムキープ、受付金庫リレー立ち合い',
    status: 'confirmed',
    checkNotes: '心付け対象：10,000円〜30,000円（両親・新郎新婦より御礼）'
  },
  {
    id: 'v-attire',
    category: '衣装サロン',
    companyName: 'クラシックブライダル衣装館（銀座本店）',
    contactPerson: '水野 チーフスタイリスト',
    phone: '03-5555-1111',
    emergencyPhone: '090-2222-3333',
    deliveryTime: '挙式前日15:00ホテル気付納品済',
    roleDescription: '白無垢・色打掛・タキシード・ドレス・新郎小物・パニエ納品',
    status: 'confirmed',
    checkNotes: '納品伝票・シミほつれ検品済み。※心付け不要（会場・衣装代金に含む）'
  },
  {
    id: 'v-beauty',
    category: '美容着付け',
    companyName: 'アトリエ・ボーテ ヘア＆メイクアップ',
    contactPerson: '山口 トップアーティスト / 鈴木 着付け師',
    phone: '03-6666-2222',
    emergencyPhone: '090-3333-4444',
    deliveryTime: '当日08:15ブライズルーム入り',
    roleDescription: '新婦新郎ヘアメイク・花嫁和装／ドレス着付け・中座早替え（15分）',
    status: 'confirmed',
    checkNotes: '花嫁肌着・裾よけ・補正白タオル5枚の持参確認。※心付け不要'
  },
  {
    id: 'v-mc',
    category: '司会進行',
    companyName: 'オフィス・ヴォイス プロ司会者',
    contactPerson: '小林 専任MC（婚礼歴15年）',
    phone: '03-7777-3333',
    emergencyPhone: '090-4444-5555',
    deliveryTime: '当日09:30会場入り（開宴2時間前）',
    roleDescription: '全体司会進行、祝辞・プロフィール紹介、鏡開き・余興アナウンス',
    status: 'confirmed',
    checkNotes: '忌み言葉言い換え、秒刻み台本最終打ち合わせ済。※心付け不要'
  },
  {
    id: 'v-flower',
    category: '装花・ブーケ',
    companyName: 'フローリスト・サンク エレガンス',
    contactPerson: '伊藤 チーフフローリスト',
    phone: '03-8888-4444',
    emergencyPhone: '090-5555-6666',
    deliveryTime: '当日08:45搬入設置',
    roleDescription: '高砂メイン装花、ゲスト卓花（9卓）、ウェディングブーケ＆ブートニア',
    status: 'confirmed',
    checkNotes: '卓花高さ25cm以下（視線会話配慮）。ブーケ保水処置完了'
  },
  {
    id: 'v-photo',
    category: '写真・映像',
    companyName: 'スタジオ・ルミエール フォトグラフィ',
    contactPerson: '中村 メインカメラマン / 加藤 ビデオ撮影',
    phone: '03-9999-5555',
    emergencyPhone: '090-6666-7777',
    deliveryTime: '当日08:30現場入り（お支度撮影開始）',
    roleDescription: 'お支度スナップ、親族集合写真、挙式・披露宴全記録、当日エンドロール',
    status: 'confirmed',
    checkNotes: '希望ショットリスト（手元指輪等）受領済み。※心付け不要'
  },
  {
    id: 'v-av',
    category: '音響照明',
    companyName: 'サウンド＆ライティング・プロ',
    contactPerson: '松本 音響PAディレクター',
    phone: '03-4321-8765',
    emergencyPhone: '090-8888-1111',
    deliveryTime: '当日08:30サウンドチェック',
    roleDescription: 'BGM再生、ワイヤレスマイク4本管理、スポットライト調光、映像プロジェクター上映',
    status: 'confirmed',
    checkNotes: '市販CD音源ISUM許諾シール貼付確認済み。マイク新品電池装填'
  },
  {
    id: 'v-gifts',
    category: '引出物・引菓子',
    companyName: '大丸松坂屋 ブライダルギフト特販部',
    contactPerson: '吉田 ギフトアドバイザー',
    phone: '0120-111-222',
    emergencyPhone: '090-1234-9876',
    deliveryTime: '挙式前日午前中必着（納品完了）',
    roleDescription: '引出物（カタログギフト・記念品）、引菓子、縁起物、特製紙袋',
    status: 'confirmed',
    checkNotes: 'A/B/C贈り分け箱数照合済み。椅子の下へセット完了'
  },
  {
    id: 'v-bus',
    category: '送迎バス',
    companyName: '東都観光バス 配車センター',
    contactPerson: 'ドライバー 斉藤（大型2種）',
    phone: '03-6789-0123',
    emergencyPhone: '090-7890-1234',
    deliveryTime: '当日09:45東京駅丸の内口配車',
    roleDescription: '親族・遠方ゲスト送迎（東京駅 ⇄ ホテル往復）',
    status: 'confirmed',
    checkNotes: '車両ナンバー：品川200 か 45-67。幹事携帯番号共有済み'
  }
];

// 2. 配送先・荷札（送り状・ホテル気付宛名伝票）テンプレート
export interface ShippingSlipTemplate {
  facilityName: string; // 送付先施設名
  banquetDepartment: string; // 担当部署
  floorAndRoom: string; // 〇階 〇〇の間 気付
  eventDate: string; // 施行日
  eventTime: string; // 開宴時間
  coupleNames: string; // 両家名
  deliveryDeadline: string; // 必着指定
  itemCategory: string; // 荷物品目
  boxCount: number; // 個数
  senderName: string; // 送り主
  senderPhone: string; // 送り主連絡先
  importantNotes: string; // 現場注意書き
}

export const DEFAULT_SHIPPING_SLIP: ShippingSlipTemplate = {
  facilityName: 'グランドホテル＆リゾート',
  banquetDepartment: '宴会予約課・クローク気付',
  floorAndRoom: '本館3階「鳳凰の間（ほうおうのま）」気付',
  eventDate: '2026年11月22日（日・大安）',
  eventTime: '11:30 開宴（10:30 受付開始）',
  coupleNames: '山田家・鈴木家 婚礼御両家 宴席 御中',
  deliveryDeadline: '【挙式前日 11月21日（土）午前中必着（時間厳守）】',
  itemCategory: '引出物一式（カタログギフト＋引菓子＋縁起物）',
  boxCount: 5,
  senderName: '株式会社ブライダルギフト配送センター（担当：吉田）',
  senderPhone: '090-1234-9876',
  importantNotes: '※ホテル内他宴席との混同厳禁。受領後は直ちに3階「鳳凰の間」控室へ搬入・施錠保管してください。'
};

// 3. 案内状（招待状）＆ 返信ハガキ ＆ WEB招待状 サンプルデータ
export interface InvitationSampleData {
  paperInvitation: {
    seasonalGreeting: string; // 時候の挨拶
    bodyText: string[]; // 本文（句読点なし）
    dateStr: string;
    ceremonyTime: string;
    receptionTime: string;
    venueName: string;
    venueFloor: string;
    rsvpDeadline: string; // 返信期日（大安）
    groomsName: string;
    bridesName: string;
    parentsNames: string;
  };
  replyPostcard: {
    returnAddress: string;
    recipientName: string;
    deadlineNotice: string;
    allergyQuestion: string;
    mannerTip: string;
  };
  webInvitation: {
    urlSlug: string;
    pageTitle: string;
    heroMessage: string;
    features: string[];
    modernAdvantages: string[];
  };
}

export const INVITATION_SAMPLE_DATA: InvitationSampleData = {
  paperInvitation: {
    seasonalGreeting: '謹啓　爽秋の候　皆様にはますますご清祥のこととお慶び申し上げます',
    bodyText: [
      'このたび　私たちは結婚式を挙げることとなりました',
      'つきましては　日頃お世話になっております皆様をお招きいたしたく',
      'ささやかながら披露宴を催したく存じます',
      'ご多用中誠に恐縮ではございますが',
      'ぜひご出席賜りたくご案内申し上げます'
    ],
    dateStr: '2026年11月22日（日曜日・大安）',
    ceremonyTime: '挙式　午前10時30分（神殿 豊栄の間）',
    receptionTime: '披露宴　午前11時30分（本館3階 鳳凰の間）',
    venueName: 'グランドホテル＆リゾート',
    venueFloor: '東京都千代田区紀尾井町1-1 / 電話 03-3456-7890',
    rsvpDeadline: '2026年10月22日（木・大安）必着',
    groomsName: '山田 太郎',
    bridesName: '鈴木 花子',
    parentsNames: '山田 一郎・恵美 ｜ 鈴木 正男・和子'
  },
  replyPostcard: {
    returnAddress: '〒100-0001 東京都千代田区1-2-3',
    recipientName: '山田 太郎 行（※ゲスト返信時は「行」を二重線で消し「様」と書くのがマナー）',
    deadlineNotice: '誠に恐れ入りますが 挙式準備の都合上 10月22日（木）までに返信賜りますようお願い申し上げます',
    allergyQuestion: '食物アレルギー等でお召し上がりになれない食材がございましたら 具体的にご記入ください（えび、かに、卵、乳、小麦、そば、落花生、くるみ等）',
    mannerTip: '【返信ハガキの作法】「御出席」の「御」および「御芳名」「御住所」の「御」の字はすべて寿の文字または二重線で消し、「出席」に丸を付け「慶んで出席させていただきます」と添え書きします。'
  },
  webInvitation: {
    urlSlug: 'https://wedding.example.com/taro-hanako-2026',
    pageTitle: 'Taro & Hanako Wedding Invitation 2026.11.22',
    heroMessage: '大切な皆様へ 私たちの結婚式にご招待いたします',
    features: [
      'LINEやメールで1タップ即送信＆即回答集計（出欠返信率が95%以上に向上）',
      'Googleマップ連携・カレンダー自動登録・当日のタイムライン確認',
      '事前オンラインご祝儀（キャッシュレス決済）対応で受付の金庫盗難リスクを完全回避',
      '食物アレルギー入力フォーム・新郎新婦へのメッセージ送信'
    ],
    modernAdvantages: [
      'ペーパーレスで印刷費・筆耕代・切手代を大幅コスト削減（約8〜12万円削減）',
      '住所を知らない友人にもSNS・メッセージアプリ経由でスマートに送付可能',
      '回答がリアルタイムでスプレッドシートに自動反映され、配席・料理集計ミスをゼロに'
    ]
  }
};
