/**
 * 婚礼4大料理形式 テーブルセッティング図面データ
 * 1. フランス料理形式（正餐フルコースセッティング）
 * 2. 中国料理形式（円卓・ターンテーブルセッティング）
 * 3. 和洋折衷コース料理（会席折敷・大皿膳セッティング）
 * 4. ビュッフェスタイル（ビュッフェカウンター動線 ＆ ゲスト卓セッティング）
 */

export type SettingStyleId = 'french' | 'chinese' | 'fusion' | 'buffet';

export interface TableItemHotspot {
  id: string;
  name: string;
  reading?: string;
  enName?: string;
  category: 'plate' | 'silverware' | 'glassware' | 'chopsticks_bowl' | 'linen' | 'buffet_equipment' | 'condiment_decor';
  positionLabel: string;
  dimensionRule: string; // 寸法ルール（例: テーブル縁から2cm、折敷の右手前など）
  purpose: string; // 用途・対象料理
  examTip: string; // 国家試験・検定対策の急所
  serviceManner: string; // サービスキャプテン・配膳マナー
  ngAction: string; // やってはいけないNGマナー・配膳ミス
  svgCoords: {
    cx?: number;
    cy?: number;
    x?: number;
    y?: number;
    width?: number;
    height?: number;
    rotation?: number;
  };
}

export interface TableSettingData {
  id: SettingStyleId;
  title: string;
  subtitle: string;
  banquetConcept: string;
  tableType: string; // e.g. "丸卓（直径180cm・1卓8〜10名）" or "長机（180×60cm）"
  standardCoverSpace: string; // 1人当たりのスペース（カバー幅・奥行）
  dimensionKeyRule: string;
  leadExplanation: string;
  serviceSequence: string[];
  examImportantCheckpoints: string[];
  items: TableItemHotspot[];
  buffetStations?: {
    step: number;
    zoneName: string;
    equipment: string;
    flowOrder: string;
    hygienePoint: string;
  }[];
}

export const TABLE_SETTING_DATA: Record<SettingStyleId, TableSettingData> = {
  french: {
    id: 'french',
    title: 'フランス料理 正餐フルコースセッティング図面',
    subtitle: 'フレンチ・シルバーとグラスの厳密な配置規準・寸法ルール',
    banquetConcept: '正餐（ディナー）フルコース形式。外側から内側へと料理の進行に合わせて使用するカトラリー序列と、ワインと料理のマリアージュに応じたグラス配置を完全網羅。',
    tableType: '正餐丸卓（直径180cm〜200cm・1卓8名着席時）',
    standardCoverSpace: '1名あたりカバー幅：70cm〜75cm ／ 奥行：約45cm',
    dimensionKeyRule: 'テーブルエッジ（縁）から指2本分（約2cm〜2.5cm）にシルバー・位置皿の下端を厳密に一直線に揃える。',
    leadExplanation: 'フランス料理のテーブルセッティングは「内側から外側へ並べ、外側から内側へ使用する」のが鉄則です。中央に位置皿（ショープレート）を置き、その左右に対称性を持ってカトラリーを配置します。刃の向きは必ず「内側（位置皿向き）」です。',
    serviceSequence: [
      '1. アミューズ・ブーシュ（突き出し）',
      '2. オードブル（冷製または温製前菜） ➔ オードブルナイフ＆フォーク（最外側）',
      '3. スープ ➔ スープスプーン（右側外側）',
      '4. ポワソン（魚料理） ➔ フィッシュナイフ＆フォーク',
      '5. グラニテ（お口直しの氷菓）',
      '6. ヴィアンド（肉料理・主菜） ➔ ミートナイフ＆フォーク（位置皿直近）',
      '7. デセール（デザート） ➔ デザートスプーン＆フォーク（位置皿上部）',
      '8. カフェ＆プチフール（小菓子）'
    ],
    examImportantCheckpoints: [
      '【寸法の鉄則】ナイフ・フォークの柄末端およびショープレートは「テーブル端から2cm（指2本）」に一直線に揃える。',
      '【刃の向き】ナイフの刃（ブレード）は、いかなる場合も必ず「左側（内側の位置皿向き）」に向ける。外側に向けるのは重大なマナー違反・減点対象。',
      '【パン皿の位置】パン皿（ブレッドプレート）は必ず「左上（フォークの上部外側）」に配置し、バターナイフの刃は左または内側に向ける。',
      '【グラスの序列】右奥から「水用ゴブレット（最大）➔ 赤ワイングラス ➔ 白ワイングラス ➔ シャンパングラス」の順に斜めまたは三角配置。',
      '【デザートシルバーの向き】上のデザートスプーンの柄は「右向き」、その下のデザートフォークの柄は「左向き」に交差させずに平行配置。'
    ],
    items: [
      {
        id: 'fr-showplate',
        name: '位置皿（ショープレート / プレゼンテーションプレート）',
        reading: 'いちざら（ショープレート）',
        enName: 'Show Plate / Service Plate (30cm-32cm)',
        category: 'plate',
        positionLabel: 'カバー中央・テーブル縁から2cm',
        dimensionRule: 'テーブルエッジから2cm〜2.5cm（指2本幅）離して中央に配置。',
        purpose: '着席時の装飾皿。最初のオードブルがサーブされる直前、または魚料理の前に下げられる。料理を直接盛ることはない。',
        examTip: '位置皿は料理を盛る皿ではなく「席の位置を示す装飾皿」。婚礼では銀器や金彩、ホテルのクレスト入りが用いられる。',
        serviceManner: '右側から着席を確認し、ナプキンを膝に広げていただいた後に、最初のアミューズまたはオードブルと差し替えで静かにバッシングする。',
        ngAction: '位置皿の上に直接温かい料理を盛り付けたり、最後まで下げずに残すのは誤り。',
        svgCoords: { cx: 400, cy: 370, width: 140, height: 140 }
      },
      {
        id: 'fr-napkin',
        name: 'テーブルナプキン（フォーマル折り）',
        reading: 'テーブルナプキン',
        enName: 'Table Napkin with Menu Card',
        category: 'linen',
        positionLabel: 'ショープレートの中央上',
        dimensionRule: 'ショープレートの中央に直立またはフラット配置。メニューカードや席札を添える。',
        purpose: '膝の上に広げて衣服の汚れを防ぎ、口元や指先を拭うための布。婚礼ではカノエ（舟型）、扇、バラ折りなどが選ばれる。',
        examTip: '乾杯後、主賓や新郎新婦がナプキンを取り上げて膝に置いたのを見てからゲストも広げるのが正餐マナー。',
        serviceManner: '中座の際は「椅子の上に軽くたたんで置く」。食事終了・退席時は「テーブルの上に無造作に軽くたたんで置く（綺麗にたたみ直すと不味かったの意になる）」。',
        ngAction: '首からナプキンをぶら下げたり、胸元に挟むのは正式な西洋ディナーではNG（子供を除く）。',
        svgCoords: { cx: 400, cy: 370, width: 70, height: 70 }
      },
      {
        id: 'fr-fork-meat',
        name: 'ミートフォーク（ディナーフォーク）',
        reading: 'ミートフォーク',
        enName: 'Dinner / Meat Fork',
        category: 'silverware',
        positionLabel: '位置皿の左側・最内側',
        dimensionRule: '位置皿から約1cm〜1.5cm離し、下端はテーブル縁から2cmに揃える。',
        purpose: 'メインディッシュ（肉料理・ヴィアンド）に使用する最も大ぶりのフォーク。背を上にして置く（英国式）か背を下にする（仏式）。日本のホテルでは背が下が一般的。',
        examTip: '内側にいくほど後半の料理用。ミートフォークはフォーク類で最も内側（皿に近い位置）に配置する。',
        serviceManner: 'メインディッシュ提供前に、シルバーが残っているか確認。万が一落下した場合はゲストに拾わせず即座にトレイに乗せて交換。',
        ngAction: '外側の前菜の段階で内側のミートフォークを使ってしまったゲストには、肉料理の前に新しいものを静かに補充する。',
        svgCoords: { x: 300, y: 310, width: 18, height: 120 }
      },
      {
        id: 'fr-fork-fish',
        name: 'フィッシュフォーク（魚料理用フォーク）',
        reading: 'フィッシュフォーク',
        enName: 'Fish Fork',
        category: 'silverware',
        positionLabel: '位置皿の左側・中央（ミートの外側）',
        dimensionRule: 'ミートフォークの外側約1cm。刃先は4本で中央のスリットがやや広い特徴がある。',
        purpose: 'ポワソン（魚料理）に使用。魚の身を崩しやすくするための幅広形状。',
        examTip: 'フィッシュナイフ＆フォークは独特の装飾彫刻や刃先の幅広さが特徴。',
        serviceManner: '魚料理の皿を下げる際、必ずフィッシュナイフ＆フォークも一緒に下げる。',
        ngAction: '魚料理が終わったのにフィッシュフォークをテーブルに残したまま肉料理に進んではならない。',
        svgCoords: { x: 270, y: 315, width: 18, height: 115 }
      },
      {
        id: 'fr-fork-appetizer',
        name: 'オードブルフォーク（前菜用フォーク）',
        reading: 'オードブルフォーク',
        enName: 'Appetizer / Salad Fork',
        category: 'silverware',
        positionLabel: '位置皿の左側・最外側',
        dimensionRule: '左側カトラリーの中で最も外側に配置。下端は縁から2cmラインに揃える。',
        purpose: '冷製・温製オードブル（前菜）を食すために最初に使用するフォーク。',
        examTip: 'コース料理の鉄則「カトラリーは外側から順に内側へ使う」。したがって最外側が前菜用。',
        serviceManner: '前菜の皿とともに最外側のフォーク＆ナイフを回収する。',
        ngAction: '最初から内側のカトラリーを取らないよう、司会やサービスがさりげなく見守る。',
        svgCoords: { x: 240, y: 320, width: 18, height: 110 }
      },
      {
        id: 'fr-knife-meat',
        name: 'ミートナイフ（ディナーナイフ）',
        reading: 'ミートナイフ',
        enName: 'Dinner / Meat Knife',
        category: 'silverware',
        positionLabel: '位置皿の右側・最内側',
        dimensionRule: '位置皿から1cm離す。刃は必ず【左（皿側）】に向ける。下端は縁から2cm。',
        purpose: 'メイン肉料理用。ステーキやローストビーフをカットするため、細かい波刃（セレーション）が付いていることが多い。',
        examTip: '【超頻出】ナイフの刃の向きは「内側（左側）」。外側に向けると「敵意・攻撃性」を示し重大な作法違反。',
        serviceManner: '肉料理用ナイフは切れ味の良い状態に磨き上げられたものをセット。',
        ngAction: '刃を右側（外側）に向けてセッティングすること。',
        svgCoords: { x: 480, y: 310, width: 18, height: 120 }
      },
      {
        id: 'fr-knife-fish',
        name: 'フィッシュナイフ（魚料理用ナイフ）',
        reading: 'フィッシュナイフ',
        enName: 'Fish Knife',
        category: 'silverware',
        positionLabel: '位置皿の右側・中央（ミートの外側）',
        dimensionRule: 'ミートナイフの外側1cm。刃は内側（皿側）に向ける。',
        purpose: '魚料理用。魚の骨や皮を分けやすいよう、ヘラ状の平たい幅広の刃になっている（切るのではなく身をほぐすため鋭利な刃はない）。',
        examTip: 'フィッシュナイフには尖った刃先がなく、バターナイフに似たへら状の丸みを帯びた形状をしている。',
        serviceManner: '魚料理提供時に右側からナイフの有無を確認。',
        ngAction: '魚料理用の平らなナイフで肉料理を切らせてはならない。',
        svgCoords: { x: 510, y: 315, width: 18, height: 115 }
      },
      {
        id: 'fr-spoon-soup',
        name: 'スープスプーン',
        reading: 'スープスプーン',
        enName: 'Soup Spoon (Bouillon / Cream)',
        category: 'silverware',
        positionLabel: '位置皿の右側・フィッシュナイフの外側',
        dimensionRule: '丸い壺（ボウル）を持つスープ専用スプーン。下端は縁から2cm。',
        purpose: 'コンソメスープやポタージュスープをいただくための丸型スプーン。',
        examTip: '英国式は「手前から奥へ」すくい、フランス式は「奥から手前へ」すくう。音を立ててすするのは厳禁。',
        serviceManner: 'スープ皿を下げる際、スプーンをスープ皿の中に斜めに揃えて乗せてバッシングする。',
        ngAction: 'スープスプーンを深皿の底に立てたままにしたり、持ち上げて皿から口へ直接スープを流し込んではならない。',
        svgCoords: { x: 540, y: 320, width: 22, height: 110 }
      },
      {
        id: 'fr-knife-appetizer',
        name: 'オードブルナイフ（前菜用ナイフ）',
        reading: 'オードブルナイフ',
        enName: 'Appetizer Knife',
        category: 'silverware',
        positionLabel: '位置皿の右側・最外側',
        dimensionRule: '右側カトラリーの最外側。刃は内側（皿側）に向ける。',
        purpose: '冷製オードブル（テリーヌ、カルパッチョなど）を切り分けるナイフ。',
        examTip: 'スープの前にオードブルが出るため、右側の最も外側に配置される。',
        serviceManner: '前菜終了後にフォークとともに速やかに回収。',
        ngAction: 'オードブルナイフでパンにバターを塗ってはならない（パン皿上のバターナイフを使う）。',
        svgCoords: { x: 570, y: 325, width: 18, height: 105 }
      },
      {
        id: 'fr-breadplate',
        name: 'パン皿 ＆ バターナイフ',
        reading: 'パンざら ＆ バターナイフ',
        enName: 'Bread & Butter Plate with Butter Spreader',
        category: 'plate',
        positionLabel: '位置皿の左上（フォークの上部外側）',
        dimensionRule: 'フォークの先端よりやや上の左側に配置。バターナイフは皿の右縁に縦または斜めに置く（刃は左向き）。',
        purpose: 'フランスパン（バゲット）やロールパンを置く皿。バターディッシュやオリーブオイル皿が添えられる。',
        examTip: '【超重要】パンはナイフで切るのではなく「手で一口大にちぎってから」バターを塗って食べるのが正餐マナー。',
        serviceManner: 'パンくず（パン屑）がテーブルに散らばった場合、デザートの前に「ダストパン（クリューマー）」で静かに掃き取る。',
        ngAction: 'パンを丸ごとかじりついたり、スープに浸して食べるのは婚礼正餐ではマナー違反。',
        svgCoords: { cx: 240, cy: 200, width: 85, height: 85 }
      },
      {
        id: 'fr-dessert-spoon',
        name: 'デザートスプーン',
        reading: 'デザートスプーン',
        enName: 'Dessert Spoon',
        category: 'silverware',
        positionLabel: '位置皿の真上（最上段）',
        dimensionRule: '位置皿の上部。柄（持ち手）は【右向き】、すくう壺は左向きに配置。',
        purpose: 'ムース、アイスクリーム、クレームブリュレ、ジュレなどのデザートを食すスプーン。',
        examTip: '柄が右側を向いている理由は「右手で自然に持ち上げられるようにするため」。',
        serviceManner: 'デザートサーブの直前に、上から手元の位置皿の左右へと下ろしてあげるサービスもある。',
        ngAction: 'デザートスプーンの柄を左向きに配置すること（左利きの特段の指定がない限り右利き用配置が標準）。',
        svgCoords: { x: 340, y: 220, width: 110, height: 16 }
      },
      {
        id: 'fr-dessert-fork',
        name: 'デザートフォーク',
        reading: 'デザートフォーク',
        enName: 'Dessert Fork',
        category: 'silverware',
        positionLabel: '位置皿の真上（デザートスプーンの下）',
        dimensionRule: 'デザートスプーンのすぐ下。柄（持ち手）は【左向き】、フォークの先端は右向きに配置。',
        purpose: 'ガトー、フルーツ、タルトなどの固形デザートを押さえて切り分けるフォーク。',
        examTip: 'デザートフォークの柄は【左向き】。スプーン（右向き）と互い違いに向き合う形になる。',
        serviceManner: 'ケーキ類が供される際には、フォークとスプーンの両方が使われる。',
        ngAction: 'スプーンとフォークの柄の向きを同じ方向にして並べてしまうこと。',
        svgCoords: { x: 350, y: 245, width: 100, height: 16 }
      },
      {
        id: 'fr-glass-water',
        name: 'ウォーターゴブレット（水用グラス）',
        reading: 'ウォーターゴブレット',
        enName: 'Water Goblet (Largest glass)',
        category: 'glassware',
        positionLabel: '位置皿の右上・ミートナイフの真上奥',
        dimensionRule: 'グラス類の中で最も大ぶり。ミートナイフの刃先延長線上の奥に配置。',
        purpose: 'ミネラルウォーター用。乾杯前から常に冷水が注がれ、宴席終了まで下げられない。',
        examTip: 'グラス類の中で最も背が高く大ぶりのものがウォーターゴブレット。配置の基準点となる。',
        serviceManner: 'ゲストが半分ほど飲んだら、右後方から静かにミネラルウォーターを注ぎ足す。',
        ngAction: 'ウォーターゴブレットで乾杯の音頭を取ったり、赤ワインを注ぐこと。',
        svgCoords: { cx: 480, cy: 190, width: 44, height: 44 }
      },
      {
        id: 'fr-glass-red',
        name: '赤ワイングラス',
        reading: 'あかワイングラス',
        enName: 'Red Wine Glass (Bordeaux / Burgundy)',
        category: 'glassware',
        positionLabel: 'ウォーターゴブレットの右下（手前）',
        dimensionRule: 'ゴブレットから右斜め手前に約3cm〜4cm離して配置。ふくよかな丸型ボウル。',
        purpose: 'メインの肉料理（ヴィアンド）に合わせて供される赤ワイン用グラス。香りを立たせるため口径が広め。',
        examTip: '白ワイングラスよりもボウル部分が大きくふくらんでいるのが赤ワイングラス。',
        serviceManner: 'グラスの最も太い部分（約1/3〜1/2）まで注ぐのが美しく香りも引き立つ。',
        ngAction: 'グラスになみなみと満杯に注ぐこと（香りが立ち込めずマナー違反）。',
        svgCoords: { cx: 520, cy: 220, width: 40, height: 40 }
      },
      {
        id: 'fr-glass-white',
        name: '白ワイングラス',
        reading: 'しろワイングラス',
        enName: 'White Wine Glass',
        category: 'glassware',
        positionLabel: '赤ワイングラスの右下（さらに手前）',
        dimensionRule: '赤ワイングラスの右斜め手前に配置。冷えた温度を保つため赤ワイングラスより小ぶり。',
        purpose: '前菜および魚料理（ポワソン）に合わせて供される白ワイン用グラス。',
        examTip: '赤ワイン用より小ぶりでチューリップ型。温度が上がらないうちに飲み切れるサイズ。',
        serviceManner: 'よく冷やした白ワインをサーブ。ゲストのグラスが空になりかけたらお伺いを立てる。',
        ngAction: '常温の白ワインを注いだり、赤ワインと同じ巨大グラスを使うこと。',
        svgCoords: { cx: 555, cy: 250, width: 36, height: 36 }
      },
      {
        id: 'fr-glass-champagne',
        name: 'シャンパングラス（フルート型）',
        reading: 'シャンパングラス',
        enName: 'Champagne Flute (Toast glass)',
        category: 'glassware',
        positionLabel: 'ゴブレットの奥、または白ワイングラスの外側',
        dimensionRule: '背の高い細長いフルート型。乾杯酒用として一番最初に用いられる。',
        purpose: '開宴時の祝宴乾杯用。美しい炭酸の立ち上る泡（ペルル）を鑑賞できるよう細長い。',
        examTip: '乾杯（トースト）の際は「グラス同士をカチリとぶつけない」。目の高さに掲げてアイコンタクトするのが正餐作法。',
        serviceManner: '開宴直前にシャンパンを7〜8分目まで注ぎ、泡が消えないうちに乾杯へ進行する。',
        ngAction: '高級クリスタルグラス同士を強くぶつけて音を鳴らすこと（破損や傷の原因）。',
        svgCoords: { cx: 525, cy: 165, width: 32, height: 32 }
      }
    ]
  },

  chinese: {
    id: 'chinese',
    title: '中国料理 円卓（ターンテーブル）セッティング図面',
    subtitle: '円卓・回転台の時計回りマナー・散蓮華と湯碗・取り皿の厳格な配置',
    banquetConcept: '中国料理祝宴（大皿料理を円卓で分かち合うスタイル）。回転台（レイジースーザン）を中心とした動線秩序と、1料理ごとに取り皿を交換する味の独立マナーを完全網羅。',
    tableType: '円卓（ラウンドテーブル 直径180cm〜210cm・1卓8〜10名着席）',
    standardCoverSpace: '1名あたりカバー幅：約65cm〜70cm ／ 奥行：約40cm',
    dimensionKeyRule: '回転台の上に置く大皿料理は主賓の正面からスタートし、必ず【時計回り（順時計回り）】に回す。',
    leadExplanation: '中国料理のテーブルセッティングでは、テーブル中央にガラスまたは木製の「回転台（ターンテーブル）」が設置されます。ゲスト手前には位置皿、右手に箸置き＆象牙箸、その左に散蓮華（レンゲ）＆レンゲ台、奥にスープ椀（湯碗）を配置します。',
    serviceSequence: [
      '1. 前菜の盛り合わせ（冷菜大皿） ➔ 回転台にセット、時計回りに取り分ける',
      '2. フカヒレの姿煮スープ（湯・タン） ➔ 湯碗と散蓮華（レンゲ）を使用',
      '3. 海老や蟹の炒め・揚げ物（熱菜） ➔ 新しい取り皿へ交換、フィンガーボウル使用',
      '4. 北京ダック・点心（飲茶・包子） ➔ 甜麺醤・調味料セット使用',
      '5. 魚の強火蒸し（清蒸魚） ➔ 魚用取り分けスプーン＆フォーク',
      '6. 肉料理（酢豚・角煮・北京風ロースト） ➔ 新しい取り皿へ交換',
      '7. 麺・飯（炒飯・伊府麺） ➔ 締めの食事',
      '8. デザート（杏仁豆腐・胡麻団子・中国茶） ➔ 蓋碗または茶杯で温かいジャスミン茶'
    ],
    examImportantCheckpoints: [
      '【回転台の方向ルール】回転台は必ず「時計回り（右回り）」。逆回転させるのは重大なマナー違反。',
      '【取り皿の鉄則】中国料理では「1品1皿（料理ごとに新しい取り皿へ交換）」。味が混ざることを極度に嫌う。取り皿のストックを常に切らさない。',
      '【レンゲと箸の配置】右手前に箸置きと箸、そのすぐ左側に「散蓮華（レンゲ）をレンゲ台に乗せて」配置。レンゲの柄は右または手前向き。',
      '【湯碗の位置】スープ用の湯碗（タンワン）は位置皿の左上奥に配置。',
      '【骨入れとフィンガーボウル】殻付き海老や蟹、骨付き肉が出る場合、手元脇に「骨入れ（深皿）」とレモンを浮かせたフィンガーボウルをセット。'
    ],
    items: [
      {
        id: 'cn-turntable',
        name: '回転台（ターンテーブル / レイジースーザン）',
        reading: 'かいてんだい（ターンテーブル）',
        enName: 'Revolving Lazy Susan Turntable',
        category: 'buffet_equipment',
        positionLabel: '円卓の中央',
        dimensionRule: 'テーブル直径の約半分〜60%の円形ガラステーブル。時計回りに回転。',
        purpose: '大皿に盛られた料理を乗せ、各ゲストが自席から手を伸ばして取り分けるための回転台。中央に卓上花や調味料セットを置く。',
        examTip: '【鉄則】回転台を回すのは「全員が料理を取り終わった後、または主賓から順に時計回り」。料理を取っている最中に回してはならない。',
        serviceManner: '主賓（上座）の真正面に大皿料理を置き、主賓が最初に料理を取ったのを確認してから次へ回すよう促す。',
        ngAction: '立って料理を取ったり、反時計回り（逆回り）に回すこと。',
        svgCoords: { cx: 400, cy: 170, width: 220, height: 220 }
      },
      {
        id: 'cn-condiments',
        name: '調味料セット（味加減セット）',
        reading: 'ちょうみりょうセット',
        enName: 'Chinese Condiment Set (Soy Sauce, Vinegar, Chili Oil, Mustard)',
        category: 'condiment_decor',
        positionLabel: '回転台の中央奥',
        dimensionRule: '回転台の中心。醤油（生抽）、香酢（黒酢）、辣油、からしをセット。',
        purpose: '点心や水餃子、揚げ物などの味をゲストの好みに応じて調整するための卓上調味料。',
        examTip: '回転台の中央に固定配置し、ゲストの手元に引き取って独占しないのがマナー。',
        serviceManner: '液だれがないよう常に清潔な受け皿とナプキンで拭き清めておく。',
        ngAction: '調味料入れを自分の手元に置き去りにして回転台から下ろしてしまうこと。',
        svgCoords: { cx: 400, cy: 130, width: 60, height: 40 }
      },
      {
        id: 'cn-showplate',
        name: '位置皿（アンダープレート / 飾り皿）',
        reading: 'いちざら（かざりざら）',
        enName: 'Service Underplate / Presentation Plate',
        category: 'plate',
        positionLabel: '各ゲストの手前中央',
        dimensionRule: '円卓の外縁から約3cm。陶磁器製の絵柄入り大皿。',
        purpose: '着席時の定位置を示す皿。取り皿の下敷きとして、またはテーブルクロスを汚さない受け皿として機能する。',
        examTip: '西洋料理同様、直接この皿に大皿から料理をてんこ盛りにするのではなく、取り皿を上に重ねて使う。',
        serviceManner: 'ナプキンを取り皿の上に美しく立体折り（孔雀や扇など）にしてスタンバイ。',
        ngAction: '位置皿を勝手に回転台に乗せて大皿の料理を取りに行くこと。',
        svgCoords: { cx: 400, cy: 370, width: 130, height: 130 }
      },
      {
        id: 'cn-chopsticks',
        name: '箸 ＆ 箸置き（象牙調・塗長箸）',
        reading: 'はし ＆ はしおき',
        enName: 'Chinese Chopsticks & Ceramic Rest',
        category: 'chopsticks_bowl',
        positionLabel: '位置皿の右側',
        dimensionRule: '位置皿の右側に縦に配置。先端（喰い先）は奥または左に向ける。',
        purpose: '料理を取り皿から口へ運ぶための主食具。中国箸は先が丸く長めのものが特徴。',
        examTip: '大皿から料理を取る際は、原則として「大皿に添えられた取り箸（公用箸）やサーバートング」を使用する。直箸はNG。',
        serviceManner: '料理の油分で滑りやすい料理にはスプーンの併用を案内する。',
        ngAction: '箸を料理に突き刺す（刺し箸）や、箸をご飯・料理に立てる（仏箸）は凶事のタブー。',
        svgCoords: { x: 485, y: 310, width: 12, height: 120 }
      },
      {
        id: 'cn-renge',
        name: '散蓮華（散レンゲ） ＆ レンゲ台',
        reading: 'ちりれんげ ＆ レンゲだい',
        enName: 'Chinese Ceramic Soup Spoon (Renge) & Stand',
        category: 'chopsticks_bowl',
        positionLabel: '箸の左側（位置皿と箸の間）',
        dimensionRule: '陶器製のレンゲ台の上に散蓮華をセット。柄は手前または右斜め手前に向ける。',
        purpose: 'スープ、フカヒレ煮込み、麻婆豆腐、杏仁豆腐などをすくって食べる。',
        examTip: 'レンゲの正しい持ち方は「溝（くぼみ）に人差し指を入れ、親指と中指で両脇を挟む」。スプーン握りはNG。',
        serviceManner: 'スープ料理や炒飯の提供時には必ずレンゲが清潔にセットされているか確認。',
        ngAction: 'レンゲを深く口の中までくわえ込んだり、音を立ててすすること。',
        svgCoords: { x: 460, y: 320, width: 18, height: 80 }
      },
      {
        id: 'cn-soupbowl',
        name: '湯碗（タンワン / スープ椀） ＆ ソーサー',
        reading: 'タンワン（スープわん）',
        enName: 'Chinese Soup Bowl with Saucer',
        category: 'chopsticks_bowl',
        positionLabel: '位置皿の左上奥',
        dimensionRule: '位置皿の左斜め奥約5cm。受け皿の上に小ぶりのスープ椀を配置。',
        purpose: 'フカヒレスープや燕の巣スープ、上湯（シャンタン）をいただくための椀。',
        examTip: 'スープ椀は手で持ち上げて直接口をつけない。テーブルに置いたままレンゲですくって飲むのが中国正餐マナー。',
        serviceManner: 'スープが冷めないよう熱々でサーブ。提供時は右奥から丁寧に置く。',
        ngAction: '日本の味噌汁のように椀を持ち上げて直接すすること。',
        svgCoords: { cx: 320, cy: 260, width: 65, height: 65 }
      },
      {
        id: 'cn-platestack',
        name: '取り皿ストック（銘々皿）',
        reading: 'とりざらストック',
        enName: 'Small Sharing Plates Stack (3-4 plates)',
        category: 'plate',
        positionLabel: '位置皿の左脇または手元脇',
        dimensionRule: '清潔な取り皿を3〜4枚スタックして手元脇またはテーブル上に常備。',
        purpose: '料理1品ごとに新しい皿に取り分けて味の混ざりを防ぐ。',
        examTip: '【超重要】中国料理では「前の料理のタレが残った取り皿に次の料理を取るのは作法知らず」。スタッフも頻繁に皿を差し替える。',
        serviceManner: '魚や肉料理が切り替わるタイミングで、使用済み取り皿を速やかに下げ、新しい取り皿を補充する。',
        ngAction: '1枚の取り皿に複数の料理（エビチリと酢豚など）を同時に盛り合わせて味が混ざること。',
        svgCoords: { cx: 270, cy: 360, width: 60, height: 60 }
      },
      {
        id: 'cn-glass-shaoxing',
        name: '紹興酒盅（酒杯）',
        reading: 'しょうこうしゅちゅう',
        enName: 'Shaoxing Wine Goblet / Ceramic Cup',
        category: 'glassware',
        positionLabel: '箸の右奥',
        dimensionRule: '小さめの陶器またはガラスの杯。乾杯用。',
        purpose: '紹興加飯酒や花彫酒を常温、ロック、またはぬる燗でいただくための杯。',
        examTip: '「乾杯（ガンペイ）」の音頭があったら杯を干す（飲み干す）のが中国の礼儀とされるが、婚礼では口をつける程度でも可。',
        serviceManner: '希望に応じてザラメや干し梅（話梅）の有無を確認。',
        ngAction: '無理な一気飲みを強要すること。',
        svgCoords: { cx: 520, cy: 260, width: 28, height: 28 }
      },
      {
        id: 'cn-glass-beer',
        name: 'ビールグラス（一口タンブラー）',
        reading: 'ビールグラス',
        enName: 'Beer Tumbler Glass',
        category: 'glassware',
        positionLabel: '紹興酒杯の右奥',
        dimensionRule: '中型タンブラーグラス。',
        purpose: '瓶ビール（青島ビールや国産プレミアムビール）を注ぎ合って乾杯する。',
        examTip: '中国式宴席ではお互いに注ぎ合う「相互敬酒」が重視される。',
        serviceManner: '泡立ちに注意し、7:3の黄金比率でサーブ。',
        ngAction: 'グラスを空のまま放置すること。',
        svgCoords: { cx: 550, cy: 230, width: 34, height: 34 }
      },
      {
        id: 'cn-teacup',
        name: '中国茶杯（蓋碗 / 湯呑み）',
        reading: 'ちゅうごくちゃはい',
        enName: 'Chinese Tea Cup with Lid (Gaiwan)',
        category: 'glassware',
        positionLabel: '位置皿の真奥（回転台の手前）',
        dimensionRule: '受け皿＋蓋付きの磁器製茶杯。',
        purpose: 'ジャスミン茶（茉莉花茶）、烏龍茶、プーアル茶などを脂っこい料理の合間に飲む。',
        examTip: 'お茶のお代わりが欲しい時は「蓋を少しずらして置く」のが合図（給仕への無言のサイン）。',
        serviceManner: 'ポットから温かいお茶を適宜注ぎ足す。',
        ngAction: '蓋で茶葉を押さえずに口をつけて茶葉を飲み込んでしまうこと。',
        svgCoords: { cx: 400, cy: 270, width: 45, height: 45 }
      },
      {
        id: 'cn-fingerbowl',
        name: 'フィンガーボウル ＆ 骨入れ（殻入れ）',
        reading: 'フィンガーボウル ＆ ほねいれ',
        enName: 'Finger Bowl (with Lemon) & Bone Scrap Bowl',
        category: 'condiment_decor',
        positionLabel: '位置皿の左手前脇',
        dimensionRule: 'レモンスライスや花びらを浮かべた水鉢と、骨ガラ用深皿。',
        purpose: '手づかみで殻をむいた海老や蟹の指先を洗うためのボウル。',
        examTip: '【超有名マナー】フィンガーボウルの水は「指先を洗う水」であり、絶対に飲んではならない！',
        serviceManner: '甲殻類や骨付きスペアリブが配膳される直前にセットし、料理が下がったら速やかに下げる。',
        ngAction: 'フィンガーボウルの水をレモン水と勘違いして飲んでしまうこと。両手を同時に突っ込むこと。',
        svgCoords: { cx: 260, cy: 290, width: 50, height: 50 }
      }
    ]
  },

  fusion: {
    id: 'fusion',
    title: '和洋折衷コース料理（会席折敷・大皿膳）セッティング図面',
    subtitle: '折敷（半月盆）と祝い両口箸・吸物椀と洋風カトラリーの調和',
    banquetConcept: '日本の伝統的な婚礼祝膳（会席料理・本膳の格式）と、西洋料理の華やかな肉料理・デザートを融合させた一番人気の婚礼スタイル。和の配膳作法と洋のナイフ＆フォークの併用ルールを完全網羅。',
    tableType: '正餐丸卓（直径180cm・1卓8名）または角テーブル',
    standardCoverSpace: '1名あたりカバー幅：70cm〜75cm ／ 奥行：約45cm',
    dimensionKeyRule: '和の折敷（半月盆）を中心に置き、左手前に先付/飯、右手前に吸物椀。折敷の外側右に洋カトラリーを一直線に配置。',
    leadExplanation: '和洋折衷料理では、テーブル上に漆塗り調の「折敷（半月盆）」が置かれます。手前には神人共食の「両口祝箸（柳箸）」が水引箸袋に収められ、前菜（祝肴）や吸物椀は和の作法、メインの牛フィレ肉ローストやデザートは洋のナイフ・フォーク・スプーンを使用します。',
    serviceSequence: [
      '1. 祝盃（かわらけの儀・乾杯） ➔ 朱塗り盃またはシャンパングラス',
      '2. 祝肴・先付（折敷内：祝前菜七福盛り） ➔ 祝い両口箸を使用',
      '3. 御吸物（折敷右手前：蛤真丈・紅白結び） ➔ 蒔絵椀の蓋を取り、出汁の香りを愛でる',
      '4. 御造里（伊勢海老・祝鯛の姿造り） ➔ 銘々皿と溜まり醤油小皿を使用',
      '5. 魚料理（真鯛のポワレ または オマール海老の黄金焼き） ➔ フィッシュナイフ＆フォーク',
      '6. お口直し（柚子または紫蘇のグラニテ） ➔ 小スプーン',
      '7. 肉料理（特選牛フィレ肉のロースト・ジャポネソース） ➔ ディナーナイフ＆フォーク',
      '8. 留椀・御飯（赤飯または季節の炊き込みご飯、赤出汁、香の物） ➔ 祝箸',
      '9. デザート＆抹茶・珈琲 ➔ デザートスプーン＆フォーク'
    ],
    examImportantCheckpoints: [
      '【祝箸の鉄則（神人共食）】両端が細くなっている「柳箸（両口箸）」は、一端を人間が、もう一端を神様が召し上がる儀礼箸。ひっくり返して使う「逆さ箸（料理の取り分け用）」は重大な無作法・タブー！',
      '【配膳位置の和食原則】折敷内の基本は「左手前に飯/先付、右手前に汁物（御吸物）、奥におかず（前菜・向付）」。逆にするのは仏前配膳（忌事）となり厳禁。',
      '【吸物椀の蓋の作法】蓋を開けたら、裏返して折敷の外側右（または椀の右奥）に置く。食後は蓋を元通り椀にかぶせる（逆さに伏せて乗せるのは蒔絵を傷つけるためNG）。',
      '【和洋器具の同居】折敷の中にナイフやフォークを入れない。洋カトラリーは必ず折敷の右外側に並べる。',
      '【大皿膳の取り箸】大皿料理を取り分ける際は、必ず大皿に添えられた専用の取り箸（菜箸）を使用する。'
    ],
    items: [
      {
        id: 'fs-oshiki',
        name: '会席折敷（半月盆 / 漆調長角膳）',
        reading: 'かいせきおしき（はんげつぼん）',
        enName: 'Kaiseki Oshiki (Half-Moon Lacquer Tray)',
        category: 'plate',
        positionLabel: 'カバー中央・テーブル縁から2cm',
        dimensionRule: 'テーブルエッジから約2cm。半月の直線側（または角膳の手前縁）を着席者側に向ける。',
        purpose: '神聖な食事空間を区切る盆。すべての和の器はこの折敷の上に美しく配置される。',
        examTip: '折敷は結界の意味を持ち、折敷の外に和食器をはみ出させないのが基本（ただし洋カトラリーやグラスは外側）。',
        serviceManner: '傷がつかないよう両手で水平に持ち上げ、静かにテーブルへセットする。',
        ngAction: '半月盆の丸い側を手前に向けてセッティングすること（直線側が手前）。',
        svgCoords: { cx: 380, cy: 360, width: 220, height: 140 }
      },
      {
        id: 'fs-hashi',
        name: '祝儀両口箸（柳箸） ＆ 水引箸袋 ＆ 箸置き',
        reading: 'しゅうぎりょうぐちばし（やなぎばし）',
        enName: 'Celebratory Yanagi Chopsticks with Mizuhiki Cover',
        category: 'chopsticks_bowl',
        positionLabel: '折敷の手前中央',
        dimensionRule: '折敷の手前縁に沿って横一文字に配置。箸先は【左向き】。',
        purpose: '折れにくく清浄な柳の木で作られた祝い箸。両端が細いのは「神人共食（神様と共に食事を祝う）」を意味する。',
        examTip: '【最頻出】大皿の料理を取る際に、箸を逆さまにして反対側を使う「逆さ箸」はマナー違反。神様の召し上がる側を汚す行為とされる。',
        serviceManner: '水引の結びが「結び切り（一度結んだらほどけない＝婚礼祝儀）」であることを確認。',
        ngAction: '取り分け用に箸をひっくり返して使うこと（逆さ箸）。',
        svgCoords: { x: 290, y: 410, width: 180, height: 16 }
      },
      {
        id: 'fs-suimono',
        name: '御吸物椀（蒔絵蓋付き吸物椀）',
        reading: 'おすいものわん',
        enName: 'Lacquer Soup Bowl with Lid',
        category: 'chopsticks_bowl',
        positionLabel: '折敷の右手前',
        dimensionRule: '折敷内の右手前に配置。蓋の蒔絵が正面を向くように置く。',
        purpose: '蛤（はまぐり：一生添い遂げる象徴）や紅白真丈、清まし仕立ての御吸物。',
        examTip: '和食の配膳は「左飯右汁（左に飯、右に汁）」。吸物椀は必ず【右側】に置く。',
        serviceManner: '提供時は蓋が密着して開けにくくならないよう、少し空気を含ませて蓋をして熱々を運ぶ。',
        ngAction: '食べた後に蓋をひっくり返して椀にかぶせること（蒔絵に傷がつき、蓋が抜けなくなる原因）。',
        svgCoords: { cx: 440, cy: 370, width: 55, height: 55 }
      },
      {
        id: 'fs-sakizuke',
        name: '先付小鉢 / 祝飯（赤飯）',
        reading: 'さきづけこばち / いわいめし',
        enName: 'Appetizer Bowl / Festive Rice',
        category: 'chopsticks_bowl',
        positionLabel: '折敷の左手前',
        dimensionRule: '折敷内の左手前に配置。吸物椀と左右対称のバランスを取る。',
        purpose: '祝宴の始まりを告げる旬の小鉢、または一口の祝赤飯。',
        examTip: '「左上位」の日本の伝統作法に基づき、主食や最初の重要小鉢は左手前に配する。',
        serviceManner: '彩り豊かな器の正面を着席者に向けてセットする。',
        ngAction: '吸物椀と位置を左右逆（右に先付、左に汁）に配置すること。',
        svgCoords: { cx: 320, cy: 370, width: 55, height: 55 }
      },
      {
        id: 'fs-zensai',
        name: '祝肴（祝い前菜七福盛り）',
        reading: 'いわいざかな（ぜんさいもり）',
        enName: 'Celebratory Appetizer Assortment Plate',
        category: 'plate',
        positionLabel: '折敷の中央奥',
        dimensionRule: '折敷の中央から奥にかけて配置。横長の角皿や扇面皿が用いられる。',
        purpose: '数の子（子孫繁栄）、黒豆（まめに暮らす）、田作り（五穀豊穣）など縁起物の盛り合わせ。',
        examTip: '前菜の盛り付けは奇数（五種、七種、九種）の祝い数にするのが吉例。',
        serviceManner: 'お品書きの記載順と料理の配置が一致しているか確認。',
        ngAction: '偶数（4品・割れる数・死に通じる）で盛り付けること。',
        svgCoords: { cx: 380, cy: 320, width: 140, height: 50 }
      },
      {
        id: 'fs-knife-meat',
        name: '洋食ミートナイフ ＆ ミートフォーク',
        reading: 'ようしょくミートナイフ ＆ フォーク',
        enName: 'Western Meat Knife & Fork',
        category: 'silverware',
        positionLabel: '折敷の右外側',
        dimensionRule: '折敷の右側縁から約1.5cm離し、ナイフ（内側・刃は左向き）、フォーク（外側）に配置。',
        purpose: '和洋折衷コースのメインである牛フィレステーキや鴨肉のローストを食すためのカトラリー。',
        examTip: '折敷の上に洋カトラリーを乗せず、折敷の外側に整然と並べるのが調和の秘訣。',
        serviceManner: '肉料理提供の直前に、お箸で食べたいゲストには「箸で切れる一口カット」への変更対応を提案できると一流。',
        ngAction: 'ナイフの刃を外側（右向き）に向けて置くこと。',
        svgCoords: { x: 520, y: 310, width: 35, height: 110 }
      },
      {
        id: 'fs-dessert-set',
        name: 'デザートスプーン ＆ デザートフォーク',
        reading: 'デザートスプーン ＆ フォーク',
        enName: 'Dessert Spoon & Cake Fork',
        category: 'silverware',
        positionLabel: '折敷の真上奥',
        dimensionRule: '折敷の上部奥。スプーンの柄は右、フォークの柄は左。',
        purpose: '和洋折衷デザート（抹茶パフェ、水菓子、ウエディングケーキ生菓子）をいただく。',
        examTip: 'スプーンとフォークの配置は洋食正餐のデザートシルバー配置に準拠。',
        serviceManner: 'デザート提供時に温かい緑茶（煎茶・ほうじ茶）またはコーヒー・紅茶を同時にサーブ。',
        ngAction: 'お茶用の湯呑みの中にスプーンを浸したまま配膳すること。',
        svgCoords: { x: 330, y: 240, width: 100, height: 25 }
      },
      {
        id: 'fs-sakazuki',
        name: '祝盃（朱塗り盃 ＆ 盃台）',
        reading: 'しゅくはい（しゅぬりさかずき）',
        enName: 'Celebratory Red Lacquer Sake Cup & Stand',
        category: 'glassware',
        positionLabel: '折敷の左上奥',
        dimensionRule: '折敷の左奥の外側。黒塗りや朱塗りの盃台の上に盃を伏せておく、または上向きにセット。',
        purpose: '開宴の儀、乾杯の日本酒（清酒）を注ぎ受けて祝意を表す。',
        examTip: '盃を両手で持ち、右手を下に添えて左手で支えるのが美しい乾杯の所作。',
        serviceManner: '乾杯酒として樽酒（鏡開き）の振る舞い酒を注ぐ際、一滴もこぼさぬよう静かに注ぐ。',
        ngAction: '盃台を片手で乱暴に持ち上げたり、盃を逆さまにしたまま放置すること。',
        svgCoords: { cx: 240, cy: 260, width: 45, height: 45 }
      },
      {
        id: 'fs-glass-toast',
        name: '乾杯シャンパングラス / ビールグラス',
        reading: 'かんぱいシャンパングラス',
        enName: 'Champagne / Beer Toast Glass',
        category: 'glassware',
        positionLabel: '折敷の右上奥（ミートナイフの上）',
        dimensionRule: 'ナイフの奥、冷酒グラスの右隣に配置。',
        purpose: '披露宴開宴の祝杯・乾杯用。',
        examTip: '和洋折衷でも現代の披露宴ではシャンパンでの乾杯が一般的。日本酒と両方用意されることも多い。',
        serviceManner: 'ゲストが乾杯時にグラスを掲げやすい位置へ配置。',
        ngAction: 'グラスを折敷の内側に置いて配膳の邪魔にすること。',
        svgCoords: { cx: 520, cy: 230, width: 36, height: 36 }
      },
      {
        id: 'fs-meimeizara',
        name: '銘々皿 ＆ 溜まり醤油小皿',
        reading: 'めいめいざら ＆ しょうゆこざら',
        enName: 'Small Sharing Plate & Soy Sauce Dish',
        category: 'plate',
        positionLabel: '折敷の左外側',
        dimensionRule: '折敷の左側縁から約2cm。お造り（刺身）用の小皿と取り皿。',
        purpose: '大皿盛りの祝鯛姿造りや伊勢海老の刺身を自分用に取り分け、わさび醤油でいただく。',
        examTip: '醤油小皿に醤油を注ぐ量は「底が隠れる程度の八分目以下」。なみなみ注ぐのは無作法。',
        serviceManner: 'お造りが終わったら、刺身の魚臭さが残るため速やかに下げてテーブルを清める。',
        ngAction: 'わさびを醤油の中で溶かしきって濁らせること（刺身に直接わさびを乗せて醤油につけるのが粋）。',
        svgCoords: { cx: 230, cy: 350, width: 60, height: 60 }
      }
    ]
  },

  buffet: {
    id: 'buffet',
    title: 'ビュッフェスタイル（会場カウンター動線 ＆ ゲスト卓）セッティング図面',
    subtitle: 'ワンウェイ（一方通行）完全動線・チェーフィングディッシュ配置とゲスト卓',
    banquetConcept: '立食または着席ビュッフェ形式。ゲストが自由に料理を選べる一方、動線の混乱・交錯や料理の品切れ、衛生事故を防ぐための「ワンウェイ動線レイアウト」と「卓上セッティング」を完全網羅。',
    tableType: 'ビュッフェ料理台（180×90cm会議机 複数連結） ＆ ゲスト丸卓（直径150cm〜180cm）',
    standardCoverSpace: '通路幅：ビュッフェカウンター前 2.0m以上確保 ／ ゲスト卓間 1.5m以上',
    dimensionKeyRule: '料理台は【入口 ➔ プレート ➔ 冷製 ➔ スープ ➔ 温製 ➔ 実演 ➔ デザート ➔ ドリンク ➔ 出口】の厳格な一方通行（ワンウェイ動線）。',
    leadExplanation: 'ビュッフェスタイルの成否は「動線設計」にかかっています。逆流や渋滞を防ぐため、入口でディナープレートを取り、冷製から温製、最後にデザート・ドリンクへと流れる一方通行を徹底します。またゲスト卓側にはカトラリーやグラス、卓番をコンパクトに整えます。',
    serviceSequence: [
      '1. ビュッフェ台オープン（乾杯・スピーチ終了後、司会より案内）',
      '2. テーブルごとの分散誘導（全テーブル一斉ではなく、高砂近隣や番号順にアナウンス）',
      '3. 入口でディナープレート（大皿）とカトラリーをピックアップ',
      '4. オードブル・フレッシュサラダゾーンで前菜を取り分け',
      '5. スープ＆ブレッドステーション（熱いスープと個包装パン）',
      '6. チェーフィングディッシュ（温製メイン料理：ローストポーク、パスタ等）',
      '7. ライブカービングステーション（シェフによるローストビーフ切り分け実演）',
      '8. デザートタワー＆フルーツ、コーヒー・紅茶ステーション',
      '9. 自席卓へ戻り食事 ➔ サービススタッフによる空き皿の定期バッシング（下膳）'
    ],
    examImportantCheckpoints: [
      '【動線のワンウェイ（一方通行）原則】入口と出口を明確に分離し、人の流れが交錯・逆流しないようにレイアウトする。',
      '【料理の配置順序】人の味覚と食事進行に合わせ、「冷製料理（前菜・サラダ）➔ 温製料理（スープ・主菜）➔ デザート」の順に配置する。',
      '【チェーフィングディッシュの保温管理】温製料理用チェーフィングディッシュは湯煎（ウォーターパン）の湯量と固形燃料/電気ウォーマーの残量を常時監視（温度65℃以上保持）。',
      '【トングの混用厳禁（アレルゲン対策）】特定原材料（卵、乳、小麦、えび、かに、そば、落花生など）を含む料理のサーバートングは料理ごとに独立固定し、絶対に他の料理と混ぜない。',
      '【バッシングステーションの分離】使用済み食器の回収台（下げ台）はビュッフェ料理台から離れた出口付近・サービス動線上に配置し、不潔感を与えない。'
    ],
    items: [
      {
        id: 'bf-platedispenser',
        name: '① ディナープレートスタック（大皿置き場）',
        reading: 'ディナープレートスタック',
        enName: 'Dinner Plate Stack / Heated Dispenser',
        category: 'plate',
        positionLabel: 'ビュッフェカウンター【最前列・入口】',
        dimensionRule: 'カウンターの始点。清潔な大皿（24cm〜27cm）を15〜20枚ずつ綺麗に重ねて配置。',
        purpose: 'ビュッフェで最初にゲストが手に取るお皿。常に潤沢に補充される。',
        examTip: '料理台の入口に皿がないと動線が即座に停止・大渋滞する。補充要員の常時監視が必須。',
        serviceManner: '指紋や水滴がないかをチェックし、保温機能付きウォーマーまたは清潔なナプキンの上に積む。',
        ngAction: '料理の途中に皿を置くこと（必ず料理より先に皿がなければならない）。',
        svgCoords: { x: 120, y: 150, width: 60, height: 60 }
      },
      {
        id: 'bf-cutlerystation',
        name: 'カトラリー＆ナプキンスタンド',
        reading: 'カトラリースタンド',
        enName: 'Cutlery Caddy & Paper/Linen Napkin',
        category: 'silverware',
        positionLabel: 'ディナープレートの直後',
        dimensionRule: 'フォーク、スプーン、ナイフを清潔なバスケットに柄を上にして配置。',
        purpose: '料理を取り分けた後、または皿と一緒にカトラリーをピックアップする。',
        examTip: 'カトラリーの刃先やフォークの先を触らせず、ゲストが「柄だけを触って取れる」ように上向きに立てるのが衛生管理の基本。',
        serviceManner: '不足が出ないよう常に補充ストックをカウンター下に常備。',
        ngAction: 'カトラリーの口に入れる側を上に向けてむき出しで配置すること。',
        svgCoords: { x: 195, y: 155, width: 45, height: 50 }
      },
      {
        id: 'bf-coldstation',
        name: '② コールドディッシュゾーン（冷製前菜・サラダ）',
        reading: 'コールドディッシュゾーン',
        enName: 'Cold Appetizers, Terrine & Salad Bar',
        category: 'plate',
        positionLabel: 'ビュッフェカウンター【前半ゾーン】',
        dimensionRule: '氷敷きクーラーまたは保冷トレイの上にガラスや陶器の盛り皿を配置。',
        purpose: 'スモークサーモン、パテ・ド・カンパーニュ、シーフードマリネ、彩りフレッシュサラダ。',
        examTip: '食事の最初は消化の良い冷製・野菜から取るため、温製料理より前に配置する。',
        serviceManner: 'ドレッシング（和風・フレンチ・シーザー）のスプーンを別々に用意。',
        ngAction: '常温に放置して生野菜がしおれたり、魚介の温度が上昇すること（食中毒防止）。',
        svgCoords: { x: 255, y: 150, width: 90, height: 60 }
      },
      {
        id: 'bf-soupstation',
        name: '③ スープ＆ブレッドステーション',
        reading: 'スープ＆ブレッドステーション',
        enName: 'Soup Warmer Kettle & Bread Basket',
        category: 'buffet_equipment',
        positionLabel: 'コールドとホットの中間',
        dimensionRule: '電気式スープケトルウォーマー、スープカップ、お玉（レードル）、パン籠。',
        purpose: '季節の温かいスープ（かぼちゃのポタージュやミネストローネ）とブレッド。',
        examTip: 'スープの火傷を防ぐため、レードルの柄が熱くならない断熱仕様のものを使用する。',
        serviceManner: 'パン用トングと個包装バターを添える。',
        ngAction: '熱いスープケトルを子供の手の届くカウンター手前ぎりぎりに配置すること。',
        svgCoords: { x: 360, y: 150, width: 70, height: 60 }
      },
      {
        id: 'bf-chafing',
        name: '④ チェーフィングディッシュ（温製メイン料理）',
        reading: 'チェーフィングディッシュ',
        enName: 'Chafing Dishes (Hot Entrees: Fish, Meat, Pasta)',
        category: 'buffet_equipment',
        positionLabel: 'ビュッフェカウンター【中盤メインゾーン】',
        dimensionRule: 'ステンレス製角型・丸型チェーフィングディッシュを4〜6台連続配置。下部に固形燃料/IH。',
        purpose: '白身魚の白ワイン蒸し、ローストポーク、若鶏のディアブル、ペンネボロネーゼ等の保温提供。',
        examTip: '【重要器具】チェーフィングディッシュは湯煎で料理を乾燥させずに65℃以上に保つ保温器具。空焚きは厳禁。',
        serviceManner: 'フタの開け閉めによる水滴落下を防ぎ、減ってきたら厨房へ連絡して新しいパンと丸ごと交換。',
        ngAction: '燃料が切れて料理が冷たくなっているのに放置すること。',
        svgCoords: { x: 445, y: 145, width: 140, height: 70 }
      },
      {
        id: 'bf-carving',
        name: '⑤ ライブカービングステーション（シェフ実演）',
        reading: 'ライブカービングステーション',
        enName: 'Live Carving Station (Roast Beef / Tempura)',
        category: 'buffet_equipment',
        positionLabel: 'チェーフィングの隣・カウンターの花形位置',
        dimensionRule: 'カッティングボード、ヒートランプ（保温照明）、カービングナイフ＆フォーク。',
        purpose: 'シェフが目の前で特選ローストビーフをスライスし、温かいグレイビーソースをかけて手渡す。',
        examTip: '披露宴ビュッフェで最も人気が高く行列ができるため、スペースを広めに確保する。',
        serviceManner: 'シェフとサービスが連携し、焼き加減の好みやアレルギーの確認を行う。',
        ngAction: 'カービングステーションの前で行列が滞留し、後続の動線を塞いでしまうこと。',
        svgCoords: { x: 600, y: 140, width: 80, height: 80 }
      },
      {
        id: 'bf-dessert',
        name: '⑥ デザートタワー ＆ カットフルーツ',
        reading: 'デザートタワー',
        enName: 'Pastry Dessert Tower & Seasonal Fruits',
        category: 'plate',
        positionLabel: 'ビュッフェカウンター【終盤出口付近】',
        dimensionRule: '段差をつけたスタンド（アクリル・ガラスタワー）、デザート用小皿。',
        purpose: 'プチフール、マカロン、ショートケーキ、グラスジュレ、季節のフルーツ。',
        examTip: 'デザートは食後の締めくくりのため、カウンターの出口近くに配置する。',
        serviceManner: 'ケーキ用ミニトングを種類ごとに用意し、取り分けやすく配置。',
        ngAction: '温製料理のすぐ隣に配置して、熱気でチョコレートや生クリームが溶けること。',
        svgCoords: { x: 695, y: 145, width: 80, height: 70 }
      },
      {
        id: 'bf-drinkbar',
        name: '⑦ ドリンクステーション ＆ コーヒー・紅茶',
        reading: 'ドリンクステーション',
        enName: 'Beverage Bar & Hot Coffee / Tea Station',
        category: 'glassware',
        positionLabel: '料理台からやや独立した出口側カウンター',
        dimensionRule: '料理カウンターと少し離して独立設置。グラス、カップ、氷、ソフトドリンクピッチャー。',
        purpose: 'ビール、ワイン、ウーロン茶、オレンジジュース、ホットコーヒー等の提供。',
        examTip: 'ドリンクカウンターを料理カウンターと離すことで「飲み物だけ取りたい人」の混雑を分散させる。',
        serviceManner: '氷の補充、水滴の清掃、温かいコーヒーのドリップ管理。',
        ngAction: '料理の列に並ばないと飲み物が取れないような一本レイアウトにすること。',
        svgCoords: { x: 790, y: 145, width: 70, height: 70 }
      },
      // ゲスト卓（下部）
      {
        id: 'bf-guesttable',
        name: '【着席・立食ゲスト卓】テーブルセット',
        reading: 'ゲストたく テーブルセット',
        enName: 'Guest Dining Table Setup (Round Table)',
        category: 'linen',
        positionLabel: 'フロア客席エリア（直径150cm〜180cm卓）',
        dimensionRule: '卓番号プレート、ナプキン、カトラリーレスト、乾杯グラス、ペーパーおしぼりをセット。',
        purpose: 'ゲストがビュッフェ台から料理を持ち帰り、落ち着いて歓談・食事をするテーブル。',
        examTip: '立食ビュッフェの場合でも「出席人数の20〜30%相当の椅子」を高齢者・妊婦のために壁側に配置するのが必須マナー。',
        serviceManner: '食べ終わった空き皿やグラスがテーブルにたまらないよう、こまめにバッシングする。',
        ngAction: '卓上に空き皿が山積みになり、新しい料理を置くスペースがなくなること。',
        svgCoords: { cx: 480, cy: 370, width: 220, height: 110 }
      }
    ],
    buffetStations: [
      {
        step: 1,
        zoneName: '大皿ディナープレート＆カトラリー',
        equipment: '大皿スタック（保温ディスペンサー）、ナプキン、フォーク・スプーン',
        flowOrder: '入口（スタート地点）',
        hygienePoint: '指紋・ホコリのない清潔な皿を常に補充。カトラリーは柄を上にしてセット。'
      },
      {
        step: 2,
        zoneName: 'コールドオードブル＆サラダバー',
        equipment: 'アイスベッド、ガラスボウル、ドレッシングピッチャー、菜箸トング',
        flowOrder: '入口から最初の料理ゾーン',
        hygienePoint: '10℃以下を維持。トングはドレッシングや具材ごとに完全分別。'
      },
      {
        step: 3,
        zoneName: '温製メイン料理（チェーフィング）',
        equipment: '角型・丸型チェーフィングディッシュ、固形燃料/電気ウォーマー、大スプーン',
        flowOrder: 'カウンター中央の主役ゾーン',
        hygienePoint: '湯煎で芯温65℃以上を保持。料理の表面が乾かないよう適宜フタを閉じる。'
      },
      {
        step: 4,
        zoneName: 'ライブカービング実演ステーション',
        equipment: 'カッティングボード、ヒートランプ、カービングナイフ・ミートフォーク',
        flowOrder: '温製料理のハイライト',
        hygienePoint: 'シェフが衛生手袋・マスク・コック帽着用で切り分け。行列整理スタッフ配置。'
      },
      {
        step: 5,
        zoneName: 'デザート＆フレッシュフルーツ',
        equipment: 'デザートタワー、冷却プレート、ケーキトング、ミニデザート皿',
        flowOrder: '出口手前のゾーン',
        hygienePoint: '温製料理の蒸気・熱から離して設置。溶けや崩れを防ぐ。'
      },
      {
        step: 6,
        zoneName: 'ドリンクカウンター＆バッシング台',
        equipment: 'コーヒーウォーマー、ピッチャー、グラスラック、下膳ワゴン（隔離）',
        flowOrder: '料理台から独立したサイドゾーン',
        hygienePoint: '下げ台は客席・料理台から目立たないバックヤード動線上に配置。'
      }
    ]
  }
};
