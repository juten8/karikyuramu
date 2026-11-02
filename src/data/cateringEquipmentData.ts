import { BanquetStyle, CateringEquipmentItem } from '../types/quiz';

export interface BanquetStyleInfo {
  id: BanquetStyle;
  name: string;
  subname: string;
  tagline: string;
  description: string;
  characteristics: string[];
  equipmentFocus: string[];
  cateringCaution: string;
  themeParkSuitability: string;
}

export const BANQUET_STYLES_DATA: BanquetStyleInfo[] = [
  {
    id: 'french',
    name: 'フランス料理形式',
    subname: '正統フレンチ・フルコース',
    tagline: '格式高き正餐スタイル。カトラリー外側順とシルバーサービスが必須',
    description: 'オードブルからスープ、魚料理、肉料理、デセールまでを一皿ずつ順に提供する正統西洋料理。席次プロトコルと厳密なテーブルマナーが求められます。',
    characteristics: [
      'アンダープレート（飾り皿）を中心に、左右にカトラリー（外側から順に使用）',
      'グラス類は右上に配置（ウォーターゴブレット、白ワイン、赤ワイン、シャンパンフルート）',
      'パン皿とバターナイフは左上、パンくず払い（クリッパー）の巡回',
      'サービススタッフがプラッターから取り分けるシルバーサービス、または厨房盛り付けプレートサービス'
    ],
    equipmentFocus: [
      'オードブル/フィッシュ/ミート/デザート用 各種ナイフ＆フォーク',
      'スープスプーン、バターナイフ、デミタススプーン',
      'ワイングラス3種＋シャンパングラス＋ウォーターゴブレット',
      'パン皿、スープボウル、ポワソン皿、ヴィアンド皿、デセール皿'
    ],
    cateringCaution: '温かい料理はホットプレート（ウォーマープレート）で保温し、冷菜は直前まで保冷庫で管理。温度管理の失敗は料理長の沽券に関わる。',
    themeParkSuitability: 'VIPエリアや屋内特設バンケットホールでのハイエンド・テーマパークウェディングに最適。'
  },
  {
    id: 'chinese',
    name: '中華料理形式',
    subname: '円卓・ターンテーブル祝宴',
    tagline: '賑やかな大皿料理。ターンテーブル（回転盤）と大量の取皿が必要',
    description: '丸テーブルの中央に設置した回転盤（ターンテーブル）に大皿料理を盛り、各自またはサービススタッフが取り分ける伝統祝宴スタイル。シェア文化で和やかな一体感を生みます。',
    characteristics: [
      '円卓中央にスムーズに回転するターンテーブル（ベアリング式回転盤）が必須',
      '大皿料理1品ごとに新しい取皿（小皿）を交換するため、1人あたり最低6〜8枚の小皿を消費',
      'レンゲ＋レンゲ置き、中華箸（取り箸・個人箸）、小碗（フカヒレスープ等用）',
      '紹興酒ポット・酒杯、中国茶ポット・湯呑み、フィンガーボウル（甲殻類料理時）'
    ],
    equipmentFocus: [
      '円卓用回転盤（ターンテーブル＝卓数分＋ベアリング予備）',
      '大皿用大型取箸・サービングスプーン、レンゲ＆レンゲ台',
      '取皿（平皿・深小皿＝人数×6〜8枚）',
      '中華セイロ（点心保温用）、スープウォーマー、大型スープ深鉢'
    ],
    cateringCaution: '回転盤の直径とテーブルサイズの比率が重要。手元のグラスや取皿が回転盤に引っかからない余白（最低30cm）を確保すること。',
    themeParkSuitability: '屋外チャイナタウンエリアやアジアンテーマの祝宴で、熱気ある演出と共に圧倒的な満足度を提供。'
  },
  {
    id: 'wa_yoh',
    name: '和洋折衷コース料理',
    subname: '現代婚礼の圧倒的一番人気',
    tagline: '祝箸（柳箸）で年配者も安心。和の繊細美と洋のメインディッシュを融合',
    description: 'お祝いのお造りや季節の前菜・椀物から、メインの国産牛フィレ肉ステーキまでを融合させた、現代の日本婚礼で最も支持率の高いスタイル。箸でもナイフ＆フォークでも食せます。',
    characteristics: [
      '両端が細い「両細の祝箸（柳箸/利休箸）」を使用（「神人共食」の縁起物）',
      '折敷（おしき＝会席膳盆）またはアンダープレートをベースにセッティング',
      '箸置きを右手前、洋食カトラリー（肉用ナイフ・フォーク）を左右に併設',
      'お吸い物用の漆塗り吸物椀、お造り用小皿・醤油皿と洋食平皿のハイブリッド'
    ],
    equipmentFocus: [
      '祝箸（水引巻き柳箸＝人数分＋予備20%）＆箸置き',
      '折敷（会席長手盆＝卓数×人数分）',
      '吸物椀（漆器）、刺身角皿、醤油豆皿',
      'ステーキ用ミートナイフ＆フォーク、デザートスプーン',
      '日本酒用お猪口・徳利 ＆ ワイングラス'
    ],
    cateringCaution: '漆器の吸物椀は熱湯で変形しやすいため専用洗浄と拭き上げが必要。刺身は温度管理（10℃以下）を徹底。',
    themeParkSuitability: '親族や年配ゲストが多いテーマパーク貸切ウェディングでも、全員が無理なく美味しく食べられる万能スタイル。'
  },
  {
    id: 'buffet',
    name: 'ブッフェスタイル形式',
    subname: '立食・着席ブッフェ／テーマパーク・ガーデン',
    tagline: '自由な交流と華やかな演出。チェーフィングディッシュとトングの数が勝負',
    description: 'ブッフェ台に並んだ多彩な料理をゲストが自由に選んで楽しむスタイル。立食（フィンガーフード中心）と着席ブッフェがあり、テーマパークウェディングや屋外フェス型婚礼の代名詞です。',
    characteristics: [
      '温菜保温用のチェーフィングディッシュ（固形燃料または電気式）が多数並ぶ',
      '料理1品ごとに専用サービングトング（温菜用・サラダ用・ブレッド用）を配置',
      'ゲストが席に戻るたびに新しい皿を使うため、平皿（9〜10インチ）は【人数×2.5〜3枚】必要',
      'グラス類も取り替えるため【人数×3〜4個】の大量ストックと返却ダストステーションが必須'
    ],
    equipmentFocus: [
      '角型・丸型チェーフィングディッシュ ＆ 固形燃料／電気ウォーマー',
      'サービングトング・レードル・ブレッドバスケット',
      'スタックプレート（9〜10インチ平皿＝人数×3枚）',
      'カトラリースタンド（フォーク・スプーン・割り箸・ペーパーナプキン）',
      'ドリンクディスペンサー、グラス回収用バッシングワゴン・ダストボックス'
    ],
    cateringCaution: 'ブッフェ台の動線設計（一方通行）が命。混雑で行列ができるとゲストが料理を取れず不満爆発。トングの落下交換用予備をブッフェ台下に常備すること。',
    themeParkSuitability: '屋外広場・アトラクション前・ビーチサイドなどのテーマパークウェディングで最もダイナミックに機能する最強形式。'
  }
];

export const CATERING_EQUIPMENT_MASTER: CateringEquipmentItem[] = [
  // 1. テーブル＆リネン類
  {
    id: 'eq-tbl-round',
    category: 'table_linen',
    name: 'ゲスト用丸テーブル（直径180cm / 8〜10名掛）',
    unitPrice: 3500,
    perTableRatio: 1,
    unit: '台',
    sparePct: 0.1,
    description: 'ゲストが着席する基本円卓。テーマパークや仮設会場では折りたたみ式キャスター付を持参。',
    heroineRiskNote: 'テーブル数が足りないと当日ゲストの座席が物理的になくなり大パニックに。'
  },
  {
    id: 'eq-tbl-long',
    category: 'table_linen',
    name: '長テーブル（180cm×60cm / 高砂・受付・ブッフェ・配膳台）',
    unitPrice: 2000,
    fixedQuantity: 8,
    unit: '台',
    sparePct: 0.2,
    description: 'メイン高砂用、受付用、クローク用、音響卓、厨房バックヤード配膳台として多用途に使用。',
    heroineRiskNote: 'バックヤードの配膳台が不足すると、料理の盛り付け皿を床に置く不衛生な事故が起こる。'
  },
  {
    id: 'eq-linen-cloth',
    category: 'table_linen',
    name: 'テーブルクロス（アンダークロス＋撥水トップクロス）',
    unitPrice: 2800,
    perTableRatio: 1,
    unit: '枚',
    sparePct: 0.2,
    description: '足元まで垂れる大判アンダークロスと、卓上を彩るトップクロス。予備20%はワインこぼし交換用。',
    heroineRiskNote: '予備クロスがないと、乾杯時に赤ワインをこぼしたテーブルを最後までシミ付きで放置することに。'
  },
  {
    id: 'eq-linen-napkin',
    category: 'table_linen',
    name: 'トーション・布ナフキン（50cm×50cm折込用）',
    unitPrice: 350,
    perPersonRatio: 1.0,
    unit: '枚',
    sparePct: 0.15,
    description: '花嫁・花婿のテーマカラーに合わせたナフキン。キャンドル折り・扇折り等で卓上にセッティング。',
    heroineRiskNote: '枚数不足や汚れがあると、着席したゲストにナフキンが行き渡らない恥を晒す。'
  },
  {
    id: 'eq-chair-cover',
    category: 'table_linen',
    name: '椅子カバー ＆ チェアサッシュ（リボン飾り）',
    unitPrice: 650,
    perPersonRatio: 1.0,
    unit: '枚',
    sparePct: 0.1,
    description: 'パイプ椅子や仮設チェアを高級ホテル仕様に一変させるストレッチカバーとサッシュ。',
    heroineRiskNote: 'カバーがないとテーマパークの無骨な備え付け椅子が丸見えで、安っぽい写真に。'
  },

  // 2. カトラリー＆食器・グラス類
  {
    id: 'eq-dish-starter',
    category: 'cutlery_glass',
    name: 'オードブル・前菜皿 / アンダープレート',
    unitPrice: 450,
    perPersonRatio: 1.0,
    unit: '枚',
    sparePct: 0.15,
    banquetStyles: ['french', 'wa_yoh'],
    description: '最初に着席した際に置かれている飾り皿または前菜用平皿。',
    heroineRiskNote: '破損割れが起きると、替えの皿がなく料理出しがストップする。'
  },
  {
    id: 'eq-dish-soup',
    category: 'cutlery_glass',
    name: 'スープカップ＆ソーサー / 漆塗り吸物椀',
    unitPrice: 400,
    perPersonRatio: 1.0,
    unit: '客',
    sparePct: 0.15,
    banquetStyles: ['french', 'wa_yoh', 'chinese'],
    description: 'フレンチはスープカップとスプーン、和洋は漆器の吸物椀、中華は小碗と陶器レンゲ。',
    heroineRiskNote: 'スープの熱で椀の蓋が開かない、または冷めてしまうなどの温度管理ミス。'
  },
  {
    id: 'eq-dish-main',
    category: 'cutlery_glass',
    name: 'メインディッシュ（肉・魚）温製プレート',
    unitPrice: 500,
    perPersonRatio: 2.0,
    unit: '枚',
    sparePct: 0.15,
    banquetStyles: ['french', 'wa_yoh'],
    description: '魚料理（ポワソン）用と肉料理（ヴィアンド）用の大皿。事前にウォーマーで温めておく。',
    heroineRiskNote: '皿が冷たいと熱々の牛フィレ肉が一瞬で冷め、ゲストから料理が不味いと酷評される。'
  },
  {
    id: 'eq-dish-chinese-small',
    category: 'cutlery_glass',
    name: '中華小皿・取皿（1人あたり6〜8枚消費）',
    unitPrice: 150,
    perPersonRatio: 7.0,
    unit: '枚',
    sparePct: 0.2,
    banquetStyles: ['chinese'],
    description: '中華は1品ごとに取皿を変えるため、人数×7枚の大量ストックが必須。',
    heroineRiskNote: '取皿が切れると、エビチリのソースがついた皿で北京ダックを食べさせる大失態に。'
  },
  {
    id: 'eq-dish-buffet-stack',
    category: 'cutlery_glass',
    name: 'ブッフェ用スタック平皿（9〜10インチ）',
    unitPrice: 250,
    perPersonRatio: 3.0,
    unit: '枚',
    sparePct: 0.2,
    banquetStyles: ['buffet'],
    description: 'ブッフェ台に山積みにしておく取り皿。1人が平均3回取りに行くため人数×3枚を積算。',
    heroineRiskNote: '皿切れが起きるとブッフェ台の前でゲストが皿待ちの長い行列を作りパーティーが崩壊。'
  },
  {
    id: 'eq-cutlery-set-full',
    category: 'cutlery_glass',
    name: '正統フレンチカトラリーフルセット（肉魚用フォーク・ナイフ・スプーン）',
    unitPrice: 850,
    perPersonRatio: 1.0,
    unit: 'セット',
    sparePct: 0.15,
    banquetStyles: ['french'],
    description: 'オードブルナイフ・フォーク、スープスプーン、魚用ナイフ・フォーク、肉用ナイフ・フォーク、デセール用。',
    heroineRiskNote: 'カトラリーが床に落ちた時、即座に交換できる予備がないとゲストが食事できない。'
  },
  {
    id: 'eq-cutlery-chopsticks',
    category: 'cutlery_glass',
    name: '祝箸（両細の柳箸/利休箸・水引付）＆ 箸置き',
    unitPrice: 280,
    perPersonRatio: 1.0,
    unit: '膳',
    sparePct: 0.2,
    banquetStyles: ['wa_yoh', 'chinese'],
    description: '和の婚礼に不可欠な両細の柳箸。「神と人が共に食す」慶事の縁起物。',
    heroineRiskNote: '割り箸を出してしまうと、お祝いの格式が一気に学食レベルに落ちて大顰蹙。'
  },
  {
    id: 'eq-glass-champagne',
    category: 'cutlery_glass',
    name: '乾杯用シャンパングラス（フルート型）',
    unitPrice: 300,
    perPersonRatio: 1.0,
    unit: '脚',
    sparePct: 0.2,
    description: '開宴時の乾杯用グラス。全員が一斉に乾杯するため、必ず全ゲスト＋新郎新婦＋媒酌人分を完備。',
    heroineRiskNote: '乾杯グラスが1脚でも足りないと、誰か1人が乾杯できず会場全体が凍りつく。'
  },
  {
    id: 'eq-glass-wine-water',
    category: 'cutlery_glass',
    name: 'ワイングラス（白・赤）＆ ウォータータンブラー',
    unitPrice: 250,
    perPersonRatio: 3.0,
    unit: '個',
    sparePct: 0.2,
    description: '白ワイン用、赤ワイン用、ソフトドリンク・お冷用グラス。',
    heroineRiskNote: 'グラス不足でワインの銘柄が変わっても同じグラスに注がれるお粗末な接客に。'
  },

  // 3. 厨房・バックヤード調理器具＆保温保冷設備
  {
    id: 'eq-chafing-dish',
    category: 'kitchen_cooking',
    name: 'チェーフィングディッシュ（温菜保温什器・固形燃料/電気式）',
    unitPrice: 4500,
    fixedQuantity: 8,
    unit: '台',
    sparePct: 0.1,
    banquetStyles: ['buffet'],
    description: '温かい料理を湯煎保温するステンレス什器。固形燃料と着火ライターを常備。',
    heroineRiskNote: '燃料切れで料理が冷え切ると、せっかくのメインディッシュが油っぽくなり最悪の印象に。'
  },
  {
    id: 'eq-serving-tongs',
    category: 'kitchen_cooking',
    name: 'サービングトング＆レードル（温菜・冷菜・サラダ・ブレッド用）',
    unitPrice: 450,
    fixedQuantity: 16,
    unit: '本',
    sparePct: 0.3,
    banquetStyles: ['buffet', 'chinese'],
    description: '料理1品につき2本以上配置。床に落とされることが多いため予備30%を台下に必備。',
    heroineRiskNote: 'トングが床に落ちて交換用がないと、ゲストが素手で料理を取る大混乱に。'
  },
  {
    id: 'eq-hot-cabinet',
    category: 'kitchen_cooking',
    name: '移動式温蔵庫（ホットキャビネット）/ 保温ボックス',
    unitPrice: 25000,
    fixedQuantity: 2,
    unit: '台',
    sparePct: 0.0,
    description: '焼き上がった肉料理や温かい皿を直前まで80℃以上でキープする移動式温蔵庫。',
    heroineRiskNote: '保温設備がない仮設会場では、肉料理が冷めて脂が白く固まり大クレームに。'
  },
  {
    id: 'eq-cool-box',
    category: 'kitchen_cooking',
    name: '保冷ボックス（クーラーボックス・蓄冷剤・氷）',
    unitPrice: 6000,
    fixedQuantity: 4,
    unit: '台',
    sparePct: 0.0,
    description: '生ウエディングケーキ、刺身、白ワイン・ビール・シャンパンの冷却用。',
    heroineRiskNote: 'ケーキの生クリームが熱で溶け落ちて倒壊する、食中毒のリスクが発生。'
  },
  {
    id: 'eq-mobile-sink',
    category: 'kitchen_cooking',
    name: '仮設手洗いシンク ＆ 給排水ポリタンク（20L×4本）',
    unitPrice: 18000,
    fixedQuantity: 2,
    unit: 'セット',
    sparePct: 0.0,
    description: '保健所の臨時営業許可基準を満たすための手洗い消毒設備とペーパータオル。',
    heroineRiskNote: '手洗い設備不備で保健所の立ち入り指導を受け、営業停止になれば結婚式は中止。'
  },
  {
    id: 'eq-dust-station',
    category: 'kitchen_cooking',
    name: '分別ダストステーション ＆ 45Lゴミ袋（可燃・ビン・カン・生ゴミ）',
    unitPrice: 8000,
    fixedQuantity: 1,
    unit: 'セット',
    sparePct: 0.5,
    description: '宴席後の原状復帰に不可欠なゴミ分別ステーション。45Lゴミ袋は最低50枚常備。',
    heroineRiskNote: 'ゴミを会場に放置して帰ると、テーマパーク運営元から高額違約金と出入禁止処分。'
  },

  // 4. 受付・クローク・控室備品
  {
    id: 'eq-cloak-tags',
    category: 'cloak_reception',
    name: 'クローク番号札（プラスチックナンバータグ 1〜150）',
    unitPrice: 120,
    perPersonRatio: 1.0,
    unit: '組',
    sparePct: 0.2,
    description: 'ゲストの手荷物・コートを預かる連番タグ（控えと荷物付けのペア）。',
    heroineRiskNote: '番号札が足りなくなると荷物取り違えが多発し、高価なスーツやバッグの紛失事故に。'
  },
  {
    id: 'eq-hanger-rack',
    category: 'cloak_reception',
    name: 'キャスター付ハンガーラック ＆ 厚手ハンガー',
    unitPrice: 4000,
    fixedQuantity: 3,
    unit: '台',
    sparePct: 0.1,
    description: '冬場や雨天時に必須のコート掛け。1台につき30〜40着収容。',
    heroineRiskNote: 'ハンガーが不足してゲストの高級コートを畳んで山積みにすると大クレーム。'
  },
  {
    id: 'eq-cash-safe',
    category: 'cloak_reception',
    name: '受付用手提げ金庫 ＆ ご祝儀保管用布袋',
    unitPrice: 3500,
    fixedQuantity: 2,
    unit: '個',
    sparePct: 0.0,
    description: '数百万円のご祝儀袋を安全に保管する鍵付き金庫。受付終了後は両親へ厳正に引き渡し。',
    heroineRiskNote: '金庫がないとご祝儀の盗難・紛失事故が発生し一生消えない傷に。'
  },
  {
    id: 'eq-fukusa-tray',
    category: 'cloak_reception',
    name: '切手盆（祝儀受盆）＆ 寿筆ペン・ゲストカードペン',
    unitPrice: 2500,
    fixedQuantity: 4,
    unit: '組',
    sparePct: 0.5,
    description: 'ご祝儀を受け取る漆塗りの切手盆と、芳名録記入用のインクが出やすい筆ペン。',
    heroineRiskNote: 'ペンのインクが出ず、受付でゲストがイライラして長蛇の列ができる。'
  },

  // 5. 引出物・ペーパーアイテム備品
  {
    id: 'eq-gift-bag',
    category: 'gift_paper',
    name: '引出物用特製紙袋（底マチ広型・両家名入または無地高級紙）',
    unitPrice: 480,
    perPersonRatio: 1.0,
    unit: '枚',
    sparePct: 0.1,
    description: '引出物3点（記念品・引菓子・縁起物）がすっぽり入るマチ20cm以上の丈夫な紙袋。',
    heroineRiskNote: '雨天時に底が抜けて高価な陶器が割れる惨事を防ぐため撥水厚手袋を厳選。'
  },
  {
    id: 'eq-table-stand-card',
    category: 'gift_paper',
    name: 'テーブルナンバー立て ＆ 席札・メニュー表・席次表立て',
    unitPrice: 1200,
    perTableRatio: 1,
    unit: '組',
    sparePct: 0.2,
    description: '卓上を識別するA〜Zのナンバー立て。席札・メニュー表は人数分＋予備。',
    heroineRiskNote: '卓番札がないと、ゲストがどのテーブルに座ればよいか分からず会場が右往左往。'
  },

  // 6. 音響・マイク・進行演出設備
  {
    id: 'eq-mic-wireless',
    category: 'av_stage',
    name: 'B帯ワイヤレスマイク ＆ 卓上・床上マイクスタンド',
    unitPrice: 7500,
    fixedQuantity: 4,
    unit: '本',
    sparePct: 0.25,
    description: '司会者用、主賓祝辞用、新郎新婦謝辞用、予備。新品アルカリ単3電池を必ずセット。',
    heroineRiskNote: '祝辞の途中で電池切れでマイクが落ちると、厳粛なスピーチが台無しに。'
  },
  {
    id: 'eq-pa-speaker',
    category: 'av_stage',
    name: 'ポータブルPAスピーカー ＆ パワードミキサー（アンプ内蔵）',
    unitPrice: 32000,
    fixedQuantity: 2,
    unit: '台',
    sparePct: 0.0,
    description: '会場全体にクリアな司会音声とBGMを届ける高出力スピーカーシステム。',
    heroineRiskNote: '屋外や大空間で音が響かず、後方の親族席にスピーチが全く聞こえない事故を防ぐ。'
  },
  {
    id: 'eq-power-drum',
    category: 'av_stage',
    name: '防雨型屋外電源コードリール（電工ドラム30m×2本）',
    unitPrice: 4500,
    fixedQuantity: 2,
    unit: '台',
    sparePct: 0.0,
    description: '仮設会場の分電盤から音響卓・温蔵庫・スポットライトへ電力を引く極太コード。',
    heroineRiskNote: 'タコ足配線でブレーカーが落ちて照明も音も全消灯する大停電事故を防止。'
  }
];

export interface StaffRoleItem {
  id: string;
  role: string;
  count: number;
  unitRate: number; // 日当単価 (円)
  amount: number;   // count * unitRate
  description: string;
  duty: string;
}

// スタッフ人数計算ロジック（標準バンケット配置基準）
export function calculateRequiredStaff(guestCount: number, tableCount: number) {
  const captain = 1;
  const tableService = Math.max(4, Math.ceil(tableCount * 0.6));
  const barStaff = Math.max(2, Math.ceil(guestCount / 35));
  const kitchenRunners = Math.max(2, Math.ceil(guestCount / 30));
  const cloakStaff = guestCount > 70 ? 3 : 2;
  const mc = 1;
  const avStaff = guestCount > 80 ? 2 : 1;
  const producer = 1;
  const bridalAttendant = 1;

  const totalStaff = captain + tableService + barStaff + kitchenRunners + cloakStaff + mc + avStaff + producer + bridalAttendant;

  const staffItems: StaffRoleItem[] = [
    {
      id: 'staff-captain',
      role: '宴会サービスキャプテン（統括合図）',
      count: captain,
      unitRate: 38000,
      amount: captain * 38000,
      description: '披露宴進行の最高指揮官。全サービススタッフの配置・指示と進行合図',
      duty: '開宴・乾杯・お色直し・料理出しの進行タイミング統括'
    },
    {
      id: 'staff-service',
      role: 'テーブル配膳サービススタッフ',
      count: tableService,
      unitRate: 24000,
      amount: tableService * 24000,
      description: '卓付サービス（ゲスト卓担当）。料理サーブ・お飲み物注ぎ・パン配り',
      duty: '各卓の食事ペース管理、アレルギー対応、シルバー交換'
    },
    {
      id: 'staff-bar',
      role: 'ドリンク＆バーカウンター担当',
      count: barStaff,
      unitRate: 22000,
      amount: barStaff * 22000,
      description: '乾杯シャンパンの抜栓・ワイン注ぎ・フリーカクテル調合・グラス洗浄',
      duty: '乾杯時の一斉提供準備、温度管理、氷・グラス補充'
    },
    {
      id: 'staff-runner',
      role: '料理配膳ランナー・厨房バックヤード補助',
      count: kitchenRunners,
      unitRate: 20000,
      amount: kitchenRunners * 20000,
      description: '厨房からバンケットホールへの料理運搬・下膳（バッシング）',
      duty: '温かい料理の即時提供、空き皿・ゴミの迅速回収'
    },
    {
      id: 'staff-cloak',
      role: '受付・クローク・ゲスト誘導担当',
      count: cloakStaff,
      unitRate: 18000,
      amount: cloakStaff * 18000,
      description: 'ご祝儀受付補助・手荷物コート預かり・更衣室案内・送迎車誘導',
      duty: '貴重品金庫管理、手荷物札照合、お見送り時の引出物手渡し'
    },
    {
      id: 'staff-mc',
      role: '婚礼専任プロ司会進行役（MC）',
      count: mc,
      unitRate: 50000,
      amount: mc * 50000,
      description: '進行アナウンス・新郎新婦紹介・祝辞・余興・両親への手紙進行',
      duty: '秒単位のタイムキープ、ハプニング時の機転アナウンス'
    },
    {
      id: 'staff-av',
      role: '音響・照明オペレーター',
      count: avStaff,
      unitRate: 35000,
      amount: avStaff * 35000,
      description: '入場・ケーキ入刀・乾杯・退場のBGMフェードイン/アウト、照明調光',
      duty: 'ワイヤレスマイク音量管理、ハウリング防止、映像上映操作'
    },
    {
      id: 'staff-producer',
      role: 'ゼネラルプロデューサー（総監督）',
      count: producer,
      unitRate: 55000,
      amount: producer * 55000,
      description: '新郎新婦・両家親族対応、会場運営側・各ベンダー統括の最高責任者',
      duty: '全行程の品質保証、予期せぬトラブル対応、最終精算確認'
    },
    {
      id: 'staff-attendant',
      role: '花嫁アテンド（介添え・ドレスエスコート）',
      count: bridalAttendant,
      unitRate: 28000,
      amount: bridalAttendant * 28000,
      description: '花嫁に常時寄り添い、ドレスの裾捌き・歩行介助・お直し・涙のケア',
      duty: '高砂着席時のドレス形整え、中座エスコート、写真撮影時の美姿勢サポート'
    }
  ];

  const totalStaffCost = staffItems.reduce((sum, item) => sum + item.amount, 0);

  return {
    captain,
    tableService,
    barStaff,
    kitchenRunners,
    cloakStaff,
    mc,
    avStaff,
    producer,
    bridalAttendant,
    totalStaff,
    staffItems,
    totalStaffCost
  };
}
