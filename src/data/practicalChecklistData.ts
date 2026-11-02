/**
 * 婚礼総合プロデューサー 現場超実務・ミスゼロ実行チェックリスト＆マニュアルデータ
 * 机上の国家資格試験（言葉遊び）を超えた、現場で花嫁と披露宴を絶対に成功させるための実務体系
 */

// 1. 当日の忘れ物防止チェックリスト（最重要小物）
export interface PackingCheckItem {
  id: string;
  category: 'bride' | 'groom' | 'ceremony' | 'cash_tips' | 'reception_cloak';
  target: string; // 花嫁、花婿、プロデューサー、受付
  name: string;
  importance: 'critical' | 'high' | 'medium';
  timing: string;
  heroineRisk: string; // 忘れた場合どうなるか
  detailNote: string;
}

export const PACKING_CHECKLIST_DATA: PackingCheckItem[] = [
  // 現金・心付け・お車代
  {
    id: 'pack-cash-safe',
    category: 'cash_tips',
    target: 'プロデューサー / 両親',
    name: '受付用 鍵付き手提げ金庫 ＆ 予備の布袋',
    importance: 'critical',
    timing: '来館時（挙式2時間前）',
    heroineRisk: '金庫がないと数百万円のご祝儀袋が受付台に放置され、盗難・紛失の重大事件に。',
    detailNote: '鍵は必ず新郎または新婦の親御様が所持。受付終了時に親御様へ直ちに引き渡し。'
  },
  {
    id: 'pack-cash-tips',
    category: 'cash_tips',
    target: '両親 / 新郎新婦',
    name: '心付け用ポチ袋（新札千円・五千円・一万円）予備含め15〜20通',
    importance: 'critical',
    timing: '前日準備・当日持参',
    heroineRisk: '当日急遽お礼を渡すスタッフや運転手にお札を裸で渡すことになり大恥を晒す。',
    detailNote: '表書きに「寿」「御礼」「志」と両家名字を事前に墨書きしたポチ袋を多めに準備。'
  },
  {
    id: 'pack-cash-travel',
    category: 'cash_tips',
    target: '両親 / プロデューサー',
    name: '主賓・遠方ゲスト用お車代封筒（新札封入済み）',
    importance: 'critical',
    timing: '受付開始前',
    heroineRisk: '渡し忘れや金額入れ間違いが発生し、主賓から一生言われる絶縁クレームに。',
    detailNote: 'リストと照合し、受付係から渡すか、親御様から控室で直接手渡しするかを明確に区分。'
  },

  // 挙式・儀礼品
  {
    id: 'pack-ring',
    category: 'ceremony',
    target: '新郎新婦 / プロデューサー',
    name: '結婚指輪（2本）＆ リングピロー',
    importance: 'critical',
    timing: '当日持参（家を出る直前再確認）',
    heroineRisk: '全国の結婚式で最も多い忘れ物No.1！指輪交換の儀式が物理的に中止になる。',
    detailNote: 'ケースから出してリングピローにリボン結びする係（アテンド）に朝一で預ける。'
  },
  {
    id: 'pack-letter',
    category: 'ceremony',
    target: '花嫁',
    name: '花嫁の手紙 ＆ 便箋予備・ハンカチ',
    importance: 'critical',
    timing: 'ブライズルーム持参',
    heroineRisk: '自宅に忘れてきて取りに戻れず、クライマックスの感動シーンが台無しに。',
    detailNote: '清書した手紙のコピーまたはスマホメモを念のためプロデューサーがバックアップ。'
  },
  {
    id: 'pack-parent-gifts',
    category: 'ceremony',
    target: '新郎新婦',
    name: 'ご両親贈呈用記念品・花束（または目録）',
    importance: 'high',
    timing: '前日納品または当日持参',
    heroineRisk: '品物が届いておらず、披露宴クライマックスで手ぶらで並ぶ悲劇に。',
    detailNote: '壊れ物（体重米・時計・陶器等）は事前開梱して割れや文字彫刻の誤りを点検。'
  },

  // 花嫁小物
  {
    id: 'pack-bride-underwear',
    category: 'bride',
    target: '花嫁',
    name: '和装肌着（肌襦袢・裾よけ・足袋）または ブライダルインナー（ドレス用ビスチェ・ガードル）',
    importance: 'critical',
    timing: 'お支度入り時（挙式3時間前）',
    heroineRisk: '肌着を忘れ、私服のヒートテックや色付きインナーでは着付けが一切始められない。',
    detailNote: '肌着は新品の場合、タグを切り一度試着しておくこと。足袋はこはぜの数をチェック。'
  },
  {
    id: 'pack-bride-towels',
    category: 'bride',
    target: '花嫁',
    name: '補正用白タオル（薄手・無地・4〜5枚）',
    importance: 'critical',
    timing: 'お支度入り時',
    heroineRisk: '補正タオルがないと着物の胸元・ウエストの補正ができず、寸胴・着崩れの不格好に。',
    detailNote: 'マイクロファイバーや柄物タオルは摩擦で帯が滑るため不可。薄手の温泉白タオルが最適。'
  },
  {
    id: 'pack-bride-stockings',
    category: 'bride',
    target: '花嫁',
    name: 'ストッキング（白またはベージュ膝丈）※予備含め2足',
    importance: 'high',
    timing: 'お支度入り時',
    heroineRisk: '着付けや歩行時に電線してしまい、足元が露出するドレスショットが台無しに。',
    detailNote: 'パンストではなく膝丈または太もも丈のガーターストッキングがトイレ時に着崩れず便利。'
  },

  // 花婿小物
  {
    id: 'pack-groom-under',
    category: 'groom',
    target: '花婿',
    name: '花婿白U首肌着（深めU首またはVネック）＆ 白靴下（タキシード用黒靴下）',
    importance: 'critical',
    timing: 'お支度入り時',
    heroineRisk: '丸首Tシャツやプリント柄シャツだと、シャツの胸元から下着が透けて大恥。',
    detailNote: '紋付袴は白足袋、タキシードは黒または白の薄手ハイソックス。スニーカーソックス厳禁。'
  },
  {
    id: 'pack-groom-accessories',
    category: 'groom',
    target: '花婿',
    name: 'カフスボタン ＆ アームバンド ＆ ポケットチーフ',
    importance: 'high',
    timing: 'お支度入り時',
    heroineRisk: 'カフスがないと袖口が留まらず、ブ袖が手元まで垂れ下がりだらしない写真に。',
    detailNote: '新郎は小物を忘れがち。プロデューサーが前日に電話またはLINEで指差し点検させる。'
  },

  // 受付・ウェルカムスペース
  {
    id: 'pack-welcome-board',
    category: 'reception_cloak',
    target: '新郎新婦 / 受付',
    name: 'ウェルカムボード ＆ イーゼル ＆ 飾り付け小物',
    importance: 'high',
    timing: '前日または開宴2時間前',
    heroineRisk: 'イーゼル（立て台）を忘れて壁に立てかけて倒れ、額縁ガラスが割れる事故。',
    detailNote: '倒れ防止の重りや滑り止めシートをバックヤードに常備しておく。'
  },
  {
    id: 'pack-pens-tray',
    category: 'reception_cloak',
    target: '受付 / プロデューサー',
    name: '漆塗り切手盆（祝儀受け盆）＆ 寿筆ペン（インク満充填）4本',
    importance: 'high',
    timing: '受付設営時（開宴1.5時間前）',
    heroineRisk: 'インクが出ないペンで芳名帳に書かせ、ゲストの手を汚し受付が大渋滞。',
    detailNote: '水引付きのご祝儀袋を受け取る際、直に手で掴まず切手盆で丁重に受領する。'
  }
];

// 2. 結納・祝儀品（目録）五品・七品・九品の内訳と意味
export interface YuinohItem {
  name: string;
  reading: string;
  meaning: string;
  fiveItems: boolean;
  sevenItems: boolean;
  nineItems: boolean;
  practicalTip: string;
}

export const YUINOH_ITEMS_MASTER: YuinohItem[] = [
  {
    name: '目録（もくろく）',
    reading: 'もくろく',
    meaning: '結納品の品名と数量、および贈り主の氏名を記した公式証明書',
    fiveItems: true,
    sevenItems: true,
    nineItems: true,
    practicalTip: '受書（うけしょ＝領収の証）と一対になります。筆耕の文字間違いは両家の破談原因になるため原本照合を厳守。'
  },
  {
    name: '長熨斗（ながのし）',
    reading: 'ながのし',
    meaning: '鮑（あわび）の肉を薄く伸ばしたもので、不老長寿と延命、永続を祈念する最高のお祝いの象徴',
    fiveItems: true,
    sevenItems: true,
    nineItems: true,
    practicalTip: '「のし」の語源。現代の祝儀袋の右上にある熨斗飾りもこの長熨斗が起源です。'
  },
  {
    name: '御帯料 / 結納金（おんおびりょう）',
    reading: 'おんおびりょう（男性側） / こんだてりょう（女性側受領時）',
    meaning: '新婦の帯を新調するための金員。「金包（きんぽう）」とも称し、帯料または小袖料（こそでりょう）として贈る',
    fiveItems: true,
    sevenItems: true,
    nineItems: true,
    practicalTip: '金額は100万円、70万円、50万円など奇数（割れない数）が基本。末広がりの80万円も現代では多用されます。'
  },
  {
    name: '寿恵廣（すえひろ）',
    reading: 'すえひろ',
    meaning: '純白の無地扇子一対（2本）。「末広がりに家運がどこまでも栄える」繁栄を象徴',
    fiveItems: true,
    sevenItems: true,
    nineItems: true,
    practicalTip: '必ず白骨・白無地の慶事用扇子。黒骨は弔事用なので絶対に間違えないこと。'
  },
  {
    name: '友白髪（ともしらが）',
    reading: 'ともしらが',
    meaning: '白い麻糸の束。「夫婦ともに白髪が生えるまで仲睦まじく添い遂げる」長寿共楽の象徴',
    fiveItems: true,
    sevenItems: true,
    nineItems: true,
    practicalTip: '麻は古来より神事に使われる強靭で清らかな繊維であり、絆の強さを表します。'
  },
  {
    name: '子生婦（こんぶ）',
    reading: 'こんぶ',
    meaning: '「昆布」の当て字。「子孫繁栄」「よろこぶ（喜ぶ）」に通じ、多くの健全な子宝に恵まれる祈り',
    fiveItems: false,
    sevenItems: true,
    nineItems: true,
    practicalTip: '七品以上の本格的な結納飾りから加わります。広げると大きく広がる縁起物。'
  },
  {
    name: '寿留女（するめ）',
    reading: 'するめ',
    meaning: '「スルメ」の当て字。乾燥して日持ちが良いことから「幾久しく変わらぬ節操を保つ」「末永い幸せ」の象徴',
    fiveItems: false,
    sevenItems: true,
    nineItems: true,
    practicalTip: '噛めば噛むほど味が出る夫婦の円満をも意味します。'
  },
  {
    name: '勝男節（かつおぶし）',
    reading: 'かつおぶし',
    meaning: '「鰹節」の当て字。雄節・雌節を合わせて一対とし、「勝男武士（剛健な男らしさ）」と「夫婦一体」の象徴',
    fiveItems: false,
    sevenItems: false,
    nineItems: true,
    practicalTip: '最高格式の「九品結納」で加わります。背節と腹節がピッタリ合うことから夫婦円満の縁起。'
  },
  {
    name: '家内喜多留（やなぎだる）',
    reading: 'やなぎだる',
    meaning: '柳樽（酒樽）。「家内に喜びが多く留まる」の意。祝宴のお酒料として現金を包む（酒肴料）',
    fiveItems: false,
    sevenItems: false,
    nineItems: true,
    practicalTip: '九品結納の完成形。樽酒の現物、または柳樽料として金員を添えて納めます。'
  }
];

// 3. 親族肩書・祝儀袋の文字表記「伯父・伯母」vs「叔父・叔母」
export interface RelativeRelationRule {
  relation: string;
  kanji: string;
  definition: string;
  shugiBagTip: string;
  seatingTip: string;
  example: string;
}

export const RELATIVE_KANJI_RULES: RelativeRelationRule[] = [
  {
    relation: '父母の兄（おじ）',
    kanji: '伯父',
    definition: '父母より年上の兄にあたる親族。「伯」は長男・兄を意味する尊称。',
    shugiBagTip: '御祝儀袋の続柄欄や芳名録に「叔父」と書くと、兄に対して失礼な誤記になります。',
    seatingTip: '席次表の肩書は「新郎 伯父」「新婦 伯父」。叔父より上位に配席するのが国際・国内プロトコルの基本。',
    example: '新郎の父親の兄 ＝「新郎 伯父」'
  },
  {
    relation: '父母の姉（おば）',
    kanji: '伯母',
    definition: '父母より年上の姉にあたる親族。「伯」は長女・姉を意味する尊称。',
    shugiBagTip: '御祝儀袋の表書きや親族紹介で「叔母」と間違えやすいため、プロデューサーが事前チェック。',
    seatingTip: '席次表の肩書は「新郎 伯母」「新婦 伯母」。ご夫婦で参列される場合は伯父の隣に伯母を配置。',
    example: '新婦の母親の姉 ＝「新婦 伯母」'
  },
  {
    relation: '父母の弟（おじ）',
    kanji: '叔父',
    definition: '父母より年下の弟にあたる親族。「叔」は弟・末を意味する。',
    shugiBagTip: '父母より年下であれば、新郎新婦から見てどれだけ高齢でも「叔父」と書きます。',
    seatingTip: '席次表の肩書は「新郎 叔父」「新婦 叔父」。席順は伯父より下位（外側）になります。',
    example: '新郎の母親の弟 ＝「新郎 叔父」'
  },
  {
    relation: '父母の妹（おば）',
    kanji: '叔母',
    definition: '父母より年下の妹にあたる親族。「叔」は妹・末を意味する。',
    shugiBagTip: '御祝儀袋の親族書欄で質問された際は「親御様より年下なら叔父・叔母です」と即答する。',
    seatingTip: '席次表の肩書は「新郎 叔母」「新婦 叔母」。',
    example: '新婦の父親の妹 ＝「新婦 叔母」'
  },
  {
    relation: 'いとこ（年上・年下）',
    kanji: '従兄 / 従姉 / 従弟 / 従妹',
    definition: '新郎新婦自身より年上か年下かで漢字を厳密に使い分ける。',
    shugiBagTip: '新郎新婦より年上の男性いとこは「従兄」、年下は「従弟」。女性は「従姉」「従妹」。',
    seatingTip: '席次表で単に「いとこ」と平仮名で書かず、年齢序列に即した正確な肩書を印刷するのが格式。',
    example: '新郎より年上の従兄弟 ＝「新郎 従兄」'
  }
];

// 4. 心付け・お車代の相場 ＆ スマートな渡し方完全マニュアル
export interface TipStaffGuideline {
  role: string;
  amountStandard: string;
  whoHandsIt: string; // 誰から渡すか
  whenToHandIt: string; // いつ渡すか
  wording: string; // 添える言葉
  practicalKey: string;
}

export const TIP_STAFF_GUIDELINES: TipStaffGuideline[] = [
  {
    role: '総合プロデューサー（ゼネラルプロデューサー・総監督）',
    amountStandard: '10,000円 〜 30,000円（必須）',
    whoHandsIt: '新郎新婦、または両家親御様（父親）',
    whenToHandIt: '開宴前の挨拶時、または披露宴お開き直後の精算・お礼時',
    wording: '「本日は結婚式全体の総監督として何卒よろしくお願い申し上げます」「お陰様で最高の式となりました」',
    practicalKey: '【必要】全マルチベンダー・式場・進行・危機管理を統括する最高責任者への敬意と感謝の印。ポチ袋（新札）に両家名字を入れて手渡します。'
  },
  {
    role: '担当ウェディングプロデューサー（専任プランナー）',
    amountStandard: '10,000円 〜 30,000円（必須）',
    whoHandsIt: '新郎新婦、または両家母親',
    whenToHandIt: '当日の朝一番の顔合わせ時、またはお開き後のブライズルーム挨拶時',
    wording: '「数ヶ月間親身に支えていただき本当にありがとうございました。本日もどうぞよろしくお願いいたします」',
    practicalKey: '【必要】初回カウンセリングから見積もり設計、各社発注、花嫁ケアまで伴走した最大の理解者へ渡す心付けです。'
  },
  {
    role: '主賓祝辞・乾杯発声者（お車代）',
    amountStandard: '10,000円 〜 30,000円（または実費往復交通費の全額）',
    whoHandsIt: '頼んだ側の両家親御様が直接手渡し',
    whenToHandIt: '専用VIP控室への到着時（開宴前）',
    wording: '「本日はご多忙の折、主賓としてご臨席賜り誠にありがとうございます。心ばかりのお車代でございます」',
    practicalKey: '【必要】主賓には受付で渡すのではなく、親族控室と分離した専用VIP控室で親御様が直接頭を下げて手渡すのが最上級のプロトコル。'
  },
  {
    role: '現場責任者・サービスキャプテン',
    amountStandard: '不要（会場プラン料・サービス料に含まれるため手配不要）',
    whoHandsIt: '不要（※会場規定により受取辞退が原則）',
    whenToHandIt: '手配不要（口頭での「本日はよろしくお願いいたします」の挨拶のみで十分）',
    wording: '「本日はどうぞよろしくお願いいたします」',
    practicalKey: '【不要】ホテルのサービス料（10〜15%）にスタッフ人件費が含まれているため、心付けは一切不要です。'
  },
  {
    role: '花嫁アテンド（介添え人）',
    amountStandard: '不要（会場基本料・アテンド料に含まれるため手配不要）',
    whoHandsIt: '不要',
    whenToHandIt: '手配不要（口頭での丁寧な挨拶のみ）',
    wording: '「今日一日よろしくお願いいたします」',
    practicalKey: '【不要】介添料として正規見積もりに計上されているため金銭の心付けは不要です。'
  },
  {
    role: '婚礼専任司会者（MC）',
    amountStandard: '不要（正規プロデュース司会料に含まれるため手配不要）',
    whoHandsIt: '不要',
    whenToHandIt: '手配不要',
    wording: '「進行をよろしくお願いいたします」',
    practicalKey: '【不要】プロ司会料（5〜8万円）が正規請求に含まれており別途心付けは不要です。'
  },
  {
    role: 'スナップカメラマン・映像カメラマン',
    amountStandard: '不要（撮影外注費に含まれるため手配不要）',
    whoHandsIt: '不要',
    whenToHandIt: '手配不要',
    wording: '「良い写真をたくさんお願いいたします」',
    practicalKey: '【不要】撮影技術料として請求に含まれます。お礼は言葉と、長時間の撮影に対するお茶程度で十分です。'
  }
];

// 5. 地方・伝統演出：鏡開き（鏡割り）の「前日割りスタンバイ」実務
export interface KagamiBirakiProtocol {
  step: string;
  timing: string;
  action: string;
  reason: string;
  heroineRisk: string;
}

export const KAGAMI_BIRAKI_STEPS: KagamiBirakiProtocol[] = [
  {
    step: '1. タガ外し ＆ 木蓋の完全割断（手開き細工）',
    timing: '前日（または当日開宴2時間前）',
    action: '酒樽の上部を巻いている竹のタガを緩め、木槌で木蓋の合わせ目を一度完全に叩き割って外す。内側の和紙・ビニールを取り除き、蓋をジグソーパズルのように軽く乗せ直す（手で触ればすぐ開く状態にする）。',
    reason: '新品の酒樽の蓋は強固に固定されており、当日の掛け声「よいしょ！」で新郎新婦が軽く叩いた程度では物理的に絶対に割れないため。',
    heroineRisk: 'この細工をしておかないと、本番で全力で何度も叩いてもビクとも割れず、新郎新婦が冷や汗をかき会場が静まり返る放送事故に！'
  },
  {
    step: '2. 飛び散り防止・床面養生 ＆ ビニール敷き',
    timing: '前日会場セッティング時',
    action: '高砂横またはステージの樽酒設置場所に、撥水クリアシートまたは毛氈（もうせん）＋ビニールシートを敷設。',
    reason: '鏡開きで木槌を振り下ろした瞬間、樽の中の日本酒が大量に跳ねて花嫁の白無垢やドレス、参列者の着物に飛び散るのを防ぐ。',
    heroineRisk: '酒飛沫で花嫁の数十万円の着物やドレスにシミがつき、クリーニング弁償トラブルに発展。'
  },
  {
    step: '3. 木枡（きます）の人数分確保 ＆ 清酒消毒',
    timing: '前日〜当日朝',
    action: '乾杯用木枡（名入れ寿枡）をゲスト人数分＋予備20%用意。縁に塗る塩、および柄杓（ひしゃく）を熱湯または清酒で消毒。',
    reason: '木枡の杉の香りで祝い酒を振る舞う。割れやささくれでゲストが唇を切るのを防止。',
    heroineRisk: '枡の数が足りず、途中で紙コップを配る羽目になり一気に学園祭レベルに格式が墜落。'
  },
  {
    step: '4. 掛け声の事前アナウンス ＆ 木槌の安全リボン結び',
    timing: '進行打ち合わせ＆開宴前',
    action: '司会者と「せーの、よいしょ、よいしょ、よいしょー！」の三拍子唱和を打ち合わせ。木槌の柄に紅白水引リボンを結ぶ。',
    reason: '全員が一斉に声を出せるタイミングを作り、叩く瞬間のシャッターチャンスをカメラマンと共有する。',
    heroineRisk: '司会者の合図がズレてバラバラに叩かれ、決定的な写真がブレて残らない。'
  }
];

// 6. 受付・クロークの安全防犯・手土産盗難防止リレー
export interface ReceptionSecurityRule {
  step: number;
  title: string;
  timing: string;
  responsible: string;
  actionDetails: string;
  securityRisk: string;
}

export const RECEPTION_SECURITY_RULES: ReceptionSecurityRule[] = [
  {
    step: 1,
    title: '友人受付スタッフ（4名）の事前依頼と1時間前集合',
    timing: '挙式1ヶ月前依頼 / 当日開宴1.5時間前集合',
    responsible: '新郎友人2名 ＆ 新婦友人2名',
    actionDetails: '遅刻厳禁。会場専任キャプテンから芳名帳の受け方、お車代の手渡しリスト、金庫の施錠ルールをブリーフィング受ける。',
    securityRisk: '直前依頼で遅刻されると受付が無人になり、ゲストが入口で立ち往生する大混乱に。'
  },
  {
    step: 2,
    title: 'ご祝儀袋の即時金庫投入 ＆ 手土産の保管棚管理',
    timing: '受付開宴中（約40分間）',
    responsible: '受付係4名',
    actionDetails: 'ご祝儀袋を受領したら切手盆で受け取り、中身を確認後、受付台の目の届く足元にある「鍵付き手提げ金庫」へ即座に投入。机の上に放置しない。',
    securityRisk: '受付台の端に置いた祝儀袋が混雑時に紛れ込み、置き引きや盗難の標的になる。'
  },
  {
    step: 3,
    title: '【最重要】受付終了直後の「金庫リレー（親御様への即時引き渡し）」',
    timing: '受付終了（挙式開始15分前）',
    responsible: '受付責任者 → 新郎新婦の両親',
    actionDetails: '受付をクローズした瞬間に、金庫を施錠し、親族控室にいる両家の親御様（父親）の元へ直接持参して手渡し。「確かに受領いたしました」と確認印またはサインを取り交わす。',
    securityRisk: '金庫を披露宴中も受付台やクロークに預けっぱなしにして盗難に遭う最悪の事故を100%遮断する鉄則。'
  },
  {
    step: 4,
    title: 'クローク荷物札のペア照合 ＆ 貴重品預かり拒否の徹底',
    timing: '受付中〜お見送り',
    responsible: 'クロークスタッフ',
    actionDetails: 'コート・荷物に連番タグを付け、半券を必ずゲストに渡す。「財布・貴金属等の貴重品はお手元にお持ちください」と掲示・口頭案内する。',
    securityRisk: 'クロークに預けたバッグから財布がなくなったという言いがかりクレームを未然に防止。'
  }
];

// 7. VIP・主賓の受入＆控室誘導動線
export interface VipProtocolRule {
  item: string;
  action: string;
  caution: string;
}

export const VIP_PROTOCOL_RULES: VipProtocolRule[] = [
  {
    item: '一般ゲストとは異なる到着時間設定',
    action: '主賓・恩師には、一般ゲストより15〜20分遅め、または専用の迎賓時間をご案内し、混雑したロビーに立たせない。',
    caution: '一般ゲストの長蛇の列に主賓が並ばされると、その時点で「配慮のない式」と評価が急落する。'
  },
  {
    item: '親族控室と完全分離した「専用VIP控室」の確保',
    action: '親族控室とは別に、静かなVIPサロンを用意。専任アテンドが温かいお茶とおしぼりを提供。',
    caution: '親族同士が盛り上がっている控室に主賓を押し込むと、お互いに気まずい思いをする。'
  },
  {
    item: '両家両親・新郎による控室への直々のご挨拶',
    action: '開宴30分前、新郎および両家の父親・母親がVIP控室を訪れ、「本日は主賓のお役目を賜り恐縮です」と頭を下げ、お車代を直接手渡す。',
    caution: '受付で機械的にお車代を渡すより、親御様が直接目を見て挨拶と御礼を述べるのが最高の礼儀。'
  },
  {
    item: '会場内への最優先先行入場・エスコート',
    action: '開場時、VIPキャプテンが主賓を最優先で一番前の上座（主賓席）へ先導エスコートする。',
    caution: '主賓が自分の座席を探して右往左往することが絶対にないよう、マンツーマンで着席までアテンド。'
  }
];

// ============================================================================
// 8. 当日現場動線順 最終点検チェックリスト（会場巡回ウォークスルー）
// ============================================================================
export interface CeremonyCheckDetails {
  shinto: {
    oath: string; // 誓いの言葉
    threeCups: string; // 三献の儀
    sacredSake: string; // 神酒
    sacredBranch: string; // 榊
    weddingRings: string; // 結婚指輪（※神前式も指輪必須）
  };
  chapel: {
    hymn: string; // 賛美歌
    pastor: string; // 牧師
    musicians: string; // 音楽奏者
    motherVeil: string; // ベールを引く母
    weddingRings: string; // 結婚指輪
  };
  civil: {
    moderator: string; // 司会者
    weddingRings: string; // 結婚指輪
    oath: string; // 誓いの言葉
  };
}

export interface VenueWalkthroughCheckItem {
  stepNumber: number;
  id: string;
  zoneCode: 'ENTRANCE' | 'FAMILY_ROOM' | 'GUEST_ROOM' | 'BANQUET_HALL' | 'CEREMONY' | 'PHOTO_STUDIO' | 'STAFF_BRIEFING' | 'GIFTS_HIKIDEMONO' | 'RECEPTION_DESK' | 'STAY_ROOM';
  zoneName: string; // エリア名
  checkpointName: string; // チェックポイント名
  timing: string; // 点検推奨タイミング
  responsibleStaff: string; // 主担当・立会人
  targetCheckItems: {
    label: string;
    description: string;
    criticalPoint: string;
  }[];
  ceremonySpecific?: CeremonyCheckDetails;
  dangerRisk: string; // ここを怠るとどうなるか（重大事故）
  failSafeRule: string; // 現場フェイルセーフ鉄則
}

export const VENUE_WALKTHROUGH_CHECKLIST_DATA: VenueWalkthroughCheckItem[] = [
  // 1. 入口（両家案内ボードチェック1）
  {
    stepNumber: 1,
    id: 'step-1-entrance',
    zoneCode: 'ENTRANCE',
    zoneName: '① 入口・エントランス',
    checkpointName: '両家の案内ボードチェック1',
    timing: '開宴2.5時間前（搬入完了直後・来館第1号前）',
    responsibleStaff: '総合プロデューサー / 式場インフォメーション責任者',
    targetCheckItems: [
      {
        label: '両家名案内看板の文字・家名照合',
        description: '「〇〇家 〇〇家 御披露宴会場」の漢字・旧字体（髙・﨑・澁・齋など）の誤字脱字を両家名簿原本と完全照合。',
        criticalPoint: 'ホテル・式場側が作成した案内板の苗字変換ミスは式場全体の信用失墜に直結。'
      },
      {
        label: 'フロア・階数・時間表示の正確性',
        description: '「〇階 〇〇の間」「受付開始 〇時〇分 / 開宴 〇時〇分」の時刻プレートが本日進行表と1分も狂いなく合致しているか確認。',
        criticalPoint: '同ホテル内で別宴家と時間が近い場合、別室への迷い込みを誘発。'
      },
      {
        label: 'ウェルカムボード＆エントランス装飾',
        description: '新郎新婦持ち込みのウェルカムボード、イーゼルの固定金具、写真立て、ウェルカムドール、装花・照明の設置。',
        criticalPoint: 'イーゼルの足が緩んで倒れる事故が多発。テープ固定・重り確認を徹底。'
      },
      {
        label: '館内誘導サイン・エレベーター前案内',
        description: '1階ロビーおよびEVホール前の電子サイネージまたは立看板の点検。矢印が正しい通路を指しているか。',
        criticalPoint: '他家宴会客との動線重複による混雑・迷子を完全防止。'
      }
    ],
    dangerRisk: '両家の苗字の漢字誤字や会場階数間違いがあると、来館した親族や主賓が別フロアに迷い込み激怒。一生消えない重大クレームに。',
    failSafeRule: '名簿原本の文字を指差し「よし！」と声出し確認。イーゼル足元に滑り止めクッションを必ず噛ませる。'
  },

  // 2. 親族控室（親族控室チェック1）
  {
    stepNumber: 2,
    id: 'step-2-family-room',
    zoneCode: 'FAMILY_ROOM',
    zoneName: '② 親族控室',
    checkpointName: '親族控室チェック1',
    timing: '開宴2時間前（親族到着30分前）',
    responsibleStaff: '親族控室専任アテンド / プロデューサー',
    targetCheckItems: [
      {
        label: '両家専用控室サイン＆扉前名札',
        description: '新郎家親族控室・新婦家親族控室がそれぞれ明確に区切られ、室名札が正しく掲示されているか。',
        criticalPoint: '両家同室の場合はパーテーション配置または中央での境界動線を確認。'
      },
      {
        label: '桜湯（または昆布茶）＆おしぼりスタンバイ',
        description: 'お祝いの席にふさわしい桜湯（塩抜き適正・桜の花がきれいに開く状態）または昆布茶、温かいおしぼりの適正数確保。',
        criticalPoint: '「煎茶（茶を濁す・出涸らし）」は婚礼タブー。必ず桜湯か昆布茶を用意。'
      },
      {
        label: '親族紹介の席次・着席順（新郎側・新婦側）',
        description: '紹介の並び順（父・母・兄弟・祖父母・伯父叔父・従兄弟）に沿った椅子の配置と、両家対面レイアウトの検証。',
        criticalPoint: '伯父（年上）と叔父（年下）の席順の序列誤りを防ぐ。'
      },
      {
        label: '親族手荷物・衣装ケースの保管札管理',
        description: '着替え後の私服や貴重品以外の大型手荷物を一時預かるクロークラックと連番札の準備。',
        criticalPoint: '親族が部屋を出る際の荷物取り違えをゼロにする。'
      }
    ],
    dangerRisk: '控室の準備不足やお茶出しの遅れ、親族紹介の席次不備は、両家親族が最初に感じる「おもてなしの粗相」となり、その後の式全体の雰囲気を険悪にします。',
    failSafeRule: '親族来館予定時刻の30分前にはエアコン（23〜24℃）とお茶用湯沸かしを完了させておく。'
  },

  // 3. 来賓控室（来賓控室チェック2）
  {
    stepNumber: 3,
    id: 'step-3-guest-room',
    zoneCode: 'GUEST_ROOM',
    zoneName: '③ 来賓・ゲスト控室',
    checkpointName: '来賓控室チェック2',
    timing: '開宴1.5時間前（一般来賓受付開始前）',
    responsibleStaff: 'フロアマネージャー / サービスキャプテン',
    targetCheckItems: [
      {
        label: 'ウェルカムドリンク＆フードの準備完了',
        description: 'ビール・スパークリング・ソフトドリンク・温温茶、乾き物フィンガーフードのグラス・シルバー配備。',
        criticalPoint: '喉を潤しながらリラックスして開宴を待てる空間温度・BGM音量（心地よい音量30%）。'
      },
      {
        label: '芳名カード（ゲストカード）記載台＆筆記具',
        description: '事前に招待状と同封したゲストカードを忘れた人用の予備カード、高級筆記具（インクかすれゼロ確認済み）の常備。',
        criticalPoint: 'ボールペンのインクが出ないトラブルはゲストのストレスNo.1。'
      },
      {
        label: '喫煙所・化粧室・授乳室・バリアフリー動線',
        description: '控室から各設備への矢印案内板の確認。特に足の不自由なゲストやベビーカーの最短ルート確保。',
        criticalPoint: '喫煙所を探して迷子になり挙式開始に遅れるゲストをゼロにする。'
      },
      {
        label: '手荷物クロークへのスムーズ誘導案内',
        description: '大きなコートやトランクをスムーズに預けられるクロークスタッフとの連携と誘導サインの視認性。',
        criticalPoint: '受付前のロビー滞留・長蛇の列の分散。'
      }
    ],
    dangerRisk: '喉が渇いた来賓を立ち往生させたり、喫煙所やトイレの案内が不親切だと、挙式入場直前にゲストが揃わず定刻スタートが遅延します。',
    failSafeRule: 'ペン全数試し書きチェック。ドリンクは開場10分前に抜栓・氷配備。'
  },

  // 4. 披露宴会場（披露宴会場チェック3）
  {
    stepNumber: 4,
    id: 'step-4-banquet-hall',
    zoneCode: 'BANQUET_HALL',
    zoneName: '④ 披露宴会場',
    checkpointName: '披露宴会場チェック3',
    timing: '開宴2時間前〜開場45分前',
    responsibleStaff: '披露宴会場キャプテン / 総合プロデューサー',
    targetCheckItems: [
      {
        label: '卓番プレート（テーブルナンバー）順序・欠落ゼロ',
        description: 'A・B・C〜または松・竹・梅などの卓番プレートが席次表の配置図通りに正しく立っているか全卓巡回。',
        criticalPoint: '卓番プレートの数字抜けがあると、その卓のゲスト全員が着席できず会場内で立ち往生する。'
      },
      {
        label: '席札（ゲスト氏名・敬称・漢字）の全席照合',
        description: '各席の席札を1枚ずつ手にとって、席次表原本の氏名・会社名・肩書と完全一致しているか確認。',
        criticalPoint: '主賓・上司の席札の漢字誤字や「様」の抜けは会場側の最大過失事故。'
      },
      {
        label: 'メニュー表・席次表・プロフィールブックの配置',
        description: '各ゲストのナプキンの上、またはショープレートの中央に美しく揃えてセッティング。',
        criticalPoint: 'お子様料理の席にお子様用メニュー表・アレルギー対応ゲストの特別指示札があるか。'
      },
      {
        label: 'メインテーブル（高砂）＆ゲスト卓の装花・キャンドル',
        description: 'フローリストの生花納品状態（水揚げ・萎れチェック）、高砂席の目線高さを遮らない生花バランス。',
        criticalPoint: '乾杯・ケーキ入刀時に花が倒れないか、キャンドルの芯が立っているか。'
      },
      {
        label: '音響マイク・BGM・照明・プロジェクター試写',
        description: '司会者マイク、主賓挨拶用スタンドマイク、新郎謝辞用ワイヤレスマイクの音量と予備電池（新品交換確認）。',
        criticalPoint: '新郎謝辞でマイクの電池が切れる事故を100%遮断。オープニング映像の投影ピント・アスペクト比確認。'
      },
      {
        label: '空調温度（新婦ドレス・着物ゲスト配慮）',
        description: '会場内温度を23〜24℃に設定。ドア開放時の冷暖房逃げを計算し、冷えすぎ・暑すぎを防止。',
        criticalPoint: '和装の列席者が汗だくにならないよう、またドレスの新婦が寒気で震えない絶妙な温度調整。'
      }
    ],
    dangerRisk: '席札の置き間違い、卓番プレートの欠落、マイクの電池切れは、披露宴中の取り返しがつかない三大現場事故。即座に式の進行がストップします。',
    failSafeRule: '席札は「名簿と手元の札を指で照合」するWチェック。マイクには新品アルカリ電池を本番直前に再装填。'
  },

  // 5. 挙式場（神前式・チャペル式・人前式の3大様式完全網羅）
  {
    stepNumber: 5,
    id: 'step-5-ceremony',
    zoneCode: 'CEREMONY',
    zoneName: '⑤ 挙式場（神前式・チャペル式・人前式）',
    checkpointName: '挙式場 神事・儀礼品・重要人物配置チェック',
    timing: '挙式開始1時間前（リハーサル開始前）',
    responsibleStaff: '式場挙式責任者 / 介添えチーフ / 総合プロデューサー',
    targetCheckItems: [
      {
        label: '【神前式】三献の儀・神酒・榊・誓詞 ＆ 結婚指輪',
        description: '誓いの言葉（誓詞）、三献の儀（三三九度・神子・大中小三段盃・雄蝶雌蝶銚子）、神酒（御神酒）、榊（玉串奉奠・本数と向き）、結婚指輪（※神前式でも指輪交換あり・三方上に厳粛に配置）。',
        criticalPoint: '神前式でも結婚指輪交換が現代婚礼の必須儀式！三方への指輪配置を忘れない。'
      },
      {
        label: '【チャペル式】賛美歌・牧師・音楽奏者・母のベール・指輪',
        description: '賛美歌（式次第・聖書・楽譜）、牧師（スタンバイ・宣誓進行確認）、音楽奏者（オルガニスト/聖歌隊音合わせ）、ベールを引く母（ベールダウン立ち位置・手袋外し・所作打ち合わせ）、結婚指輪（リングピロー・リボン解けやすさ点検）。',
        criticalPoint: 'ベールダウンで母親が指輪や髪飾りに引っ掛けないよう直前リハーサル。リングピローのリボン固結び厳禁。'
      },
      {
        label: '【人前式】司会者・誓いの言葉・結婚指輪',
        description: '司会者（開会アナウンス・誓いの問いかけ原稿確認）、結婚指輪（リングリレー用リボンまたはピロー）、誓いの言葉（結婚誓約書原本・新郎新婦立会人代表署名欄・羽ペン）。',
        criticalPoint: 'ゲスト全員が証人となる儀式のため、誓約書のインク漏れ・筆記具かすれを完全防止。'
      }
    ],
    ceremonySpecific: {
      shinto: {
        oath: '誓いの言葉（誓詞・新郎が読み上げ新婦が名を添える巻物形式・台上にスタンバイ）',
        threeCups: '三献の儀（三三九度用三つ組盃・神子用の雄蝶雌蝶銚子・盃を載せる三方）',
        sacredSake: '神酒（御神酒・献酒用瓶および親族固めの盃用のお神酒の適正温度管理）',
        sacredBranch: '榊（玉串奉奠用の新鮮な瑞々しい真榊・紙垂の折れがないこと・向きの確認）',
        weddingRings: '結婚指輪（※神前式でも指輪交換あり！三方または専用ケースに白木台上に配置）'
      },
      chapel: {
        hymn: '賛美歌（参列者席の式次第および賛美歌カード・オルガン用譜面台の楽譜確認）',
        pastor: '牧師（外国人牧師または司式者の入室・聖書の開くページ・式次第の最終復唱）',
        musicians: '音楽奏者（パイプオルガン・聖歌隊・バイオリン奏者のリハーサル音合わせ・マイクゲイン）',
        motherVeil: 'ベールを引く母（入場直後のベールダウン立ち位置・手袋の外し方・声掛けタイミングの指導）',
        weddingRings: '結婚指輪（リングピローにリボンでゆるく固定。固結びでほどけない事故を防止）'
      },
      civil: {
        moderator: '司会者（人前式専用の厳粛かつ温かい進行台本・立会人代表への問いかけマイク）',
        weddingRings: '結婚指輪（リングリレーを行う場合の長尺リボンの通し確認、またはリングボーイ/ガール指導）',
        oath: '誓いの言葉（オリジナル誓約書・両名署名用フェザーペン・立会人代表署名欄の確認）'
      }
    },
    dangerRisk: '指輪が届いていない、誓約書・誓詞がない、牧師や雅楽奏者が不在などの事故は、挙式そのものが成立しない最悪の破綻事象となります。',
    failSafeRule: '指輪はケースから出してリングピローまたは三方に載った実物を肉眼で指差し確認。'
  },

  // 6. 写真室（スタジオ集合写真）
  {
    stepNumber: 6,
    id: 'step-6-photo-studio',
    zoneCode: 'PHOTO_STUDIO',
    zoneName: '⑥ 写真室（スタジオ）',
    checkpointName: '写真室 親族集合写真座り順＆撮影機材チェック',
    timing: '挙式開始45分前（挙式前または挙式後の撮影スタンバイ）',
    responsibleStaff: '写真室チーフカメラマン / プロデューサー',
    targetCheckItems: [
      {
        label: '親族集合写真の整列ひな壇・座り順椅子',
        description: '新郎新婦中心、前列（両親・祖父母）、中列・後列（親族）の席順表と椅子の脚数・位置目印テープ。',
        criticalPoint: '親族が写真室に入ってから誰がどこに座るか揉める時間をゼロにする事前番号札。'
      },
      {
        label: 'スタジオ大型ストロボ・カメラ機材同調テスト',
        description: 'メインストロボ・傘・アンブレラ・スレーブ同調、予備カメラ本体・メモリーカード残量・バッテリー点検。',
        criticalPoint: '親族40名が並んだ状態でストロボが光らない機材トラブルを未然防止。'
      },
      {
        label: '撮影指示書・ポーズリスト・欠席者情報',
        description: '事前に新郎新婦から受領した「必ず撮ってほしいカット」「足の不自由な親族の椅子着席指示」の確認。',
        criticalPoint: '体調配慮が必要な高齢親族を立たせっぱなしにしない配慮。'
      }
    ],
    dangerRisk: '親族集合写真は1回きりの大イベント。整列誘導が滞ると披露宴の開宴時間が20〜30分押し、料理出しが全崩壊します。',
    failSafeRule: '席順表のコピーを写真室入口に貼り、親族名前を呼び出しながら即座に着席誘導する。'
  },

  // 7. スタッフ直前打ち合わせ（キャプテン・司会・美容）
  {
    stepNumber: 7,
    id: 'step-7-staff-briefings',
    zoneCode: 'STAFF_BRIEFING',
    zoneName: '⑦ スタッフ直前打ち合わせ（三者連携）',
    checkpointName: 'キャプテン・司会者・美容アテンド 最終ブリーフィング',
    timing: '開場30分前（全スタッフ最終同期ミーティング）',
    responsibleStaff: '総合プロデューサー（主宰）',
    targetCheckItems: [
      {
        label: '披露宴会場担当・サービスキャプテン打ち合わせ',
        description: '進行表タイムライン、入場扉オープン秒数、乾杯酒抜栓タイミング、温かい料理（肉料理）の焼き上がり時間、アレルギー該当ゲスト（テーブル番号と氏名・代替メニュー）の配膳手順。',
        criticalPoint: 'アレルギー誤配膳は生命に関わる事故。キャプテンと料理長が直々にプレートを運ぶ体制確認。'
      },
      {
        label: '司会者打ち合わせ（氏名・肩書・電報順）',
        description: '新郎新婦・親族・主賓の氏名の正しい発音・アクセント、祝電（電報）拝読順位の確定、時間短縮・延長時のカット演出プラン。',
        criticalPoint: '主賓の会社名・役職の読み間違いは司会者のプロとして致命的ミス。フリガナを指差し確認。'
      },
      {
        label: '美容・ヘアメイク・アテンド打ち合わせ',
        description: '新婦ドレス裾さばきサポート、お色直し中座時間（目標20分・最大25分死守）、涙を拭く白ハンカチの手渡しタイミング、お手洗い誘導。',
        criticalPoint: '中座が35分に伸びると歓談が間延びし、後半の余興・手紙朗読が巻かれて感動が半減する。'
      }
    ],
    dangerRisk: 'キャプテン、司会者、美容アテンドの3者がバラバラに動くと、扉が開くのに音楽が鳴らない、中座が遅れて料理が冷めるなど連携事故が連発します。',
    failSafeRule: '時計を1秒単位で時報同期（秒針合わせ）。プロデューサーが3者立ち会いでサインを交わす。'
  },

  // 8. 引き出物関連確認（席ごとの贈り分け間違いゼロ）
  {
    stepNumber: 8,
    id: 'step-8-gifts',
    zoneCode: 'GIFTS_HIKIDEMONO',
    zoneName: '⑧ 引き出物・記念品点検',
    checkpointName: '引き出物席別贈り分け＆予備袋ゼロミスチェック',
    timing: '開場1時間前（全卓袋詰め完了直後）',
    responsibleStaff: '引き出物担当スタッフ / 総合プロデューサー',
    targetCheckItems: [
      {
        label: '席ごとの贈り分けパターン照合（親族・上司・友人・主賓）',
        description: '主賓用（特大包み）、親族用、夫婦出席用（1世帯1袋）、友人用の贈り分け記号（A/B/C/D）を全席配席表と指差し照合。',
        criticalPoint: '主賓の席に友人の引き出物が置かれてしまう最悪の取り違えを絶対に防ぐ。'
      },
      {
        label: 'ペーパーバッグ（紙袋）の破れ・底抜け・汚れ点検',
        description: 'ホテルの重い紙袋の底貼り強度、持ち手紐のほつれ、外側の汚れがないかを1袋ずつ外観点検。',
        criticalPoint: 'お見送り時や帰宅途中に底が抜けて陶器が割れる大事故を防止。'
      },
      {
        label: '予備袋（急な追加・破損対応用）のスタンバイ',
        description: '各パターンの引き出物・引菓子・縁起物の予備をバックヤードに最低1〜2セット確保。',
        criticalPoint: '当日急遽来られなくなった人のキャンセル対応や、袋に酒をこぼした時の即時交換。'
      },
      {
        label: '引菓子・縁起物の賞味期限とアレルギー表示',
        description: '納品されたバームクーヘン・かつお節等の賞味期限が十分か（本日中や賞味期限切れの誤納品ゼロ）。',
        criticalPoint: 'メーカー側のロット誤発送による期限切れトラブルの最終防波堤。'
      }
    ],
    dangerRisk: '引き出物の贈り分け間違いは、披露宴終了後にゲストが自宅で開けて初めて発覚し、新郎新婦と式場が後日謝罪行脚に追い込まれる最悪の事後トラブルです。',
    failSafeRule: '配席表に「A・B・C」のカラーシールを貼り、紙袋のタグ色と全席マッチング確認。'
  },

  // 9. 受付担当確認（ご祝儀金庫・お車代リスト・筆記具）
  {
    stepNumber: 9,
    id: 'step-9-reception-desk',
    zoneCode: 'RECEPTION_DESK',
    zoneName: '⑨ 受付担当確認',
    checkpointName: '受付台 鍵付き金庫・お車代リスト・防犯リレー確認',
    timing: '受付開始30分前（受付友人集合直後）',
    responsibleStaff: '受付担当キャプテン / 総合プロデューサー',
    targetCheckItems: [
      {
        label: 'ご祝儀袋用「鍵付き手提げ金庫」の配備と鍵受渡ルート',
        description: '受付台の下に頑丈な鍵付き手提げ金庫をセット。鍵は親御様所持、受付終了時に直ちに親御様へ手渡しする防犯リレーの確認。',
        criticalPoint: '受付終了後に金庫を受付台に放置する盗難事故を根絶。'
      },
      {
        label: 'お車代・御礼封筒リスト預かり（渡し忘れ防止）',
        description: '主賓・遠方ゲスト・乾杯発声者へ渡すお車代封筒を受付係に預け、芳名帳の該当者欄に目印マーカーをつけておく。',
        criticalPoint: '「あの人にお車代を渡し忘れた！」という受付終了後のパニックをゼロにする。'
      },
      {
        label: '名簿・芳名帳・高級筆記具・切手盆のセット',
        description: 'ご祝儀袋を手渡しでなく品格ある「切手盆」で受領する作法指導と、筆ペン・インク補充の確認。',
        criticalPoint: '両家の大切なゲストを品格あるマナーでお迎えする受付の顔作り。'
      },
      {
        label: '受付係へのキャプテンからの最終ブリーフィング完了',
        description: '受付4名（新郎側2名・新婦側2名）への役割分担（挨拶係・芳名確認係・祝儀金庫投入係・席次表手渡し係）の伝達。',
        criticalPoint: '役割が曖昧だと受付前が長蛇の列になり、挙式・披露宴の開宴が遅延する。'
      }
    ],
    dangerRisk: 'ご祝儀袋の紛失・盗難は警察沙汰になる最悪の刑事事件。お車代の渡し忘れは新郎新婦の社会的信用を失墜させます。',
    failSafeRule: '金庫リレーの親御様受け渡し手順を受付全員に声に出して復唱させる。'
  },

  // 10. 新郎新婦の宿泊先部屋確認（部屋番号・荷物搬入・ルームキー）
  {
    stepNumber: 10,
    id: 'step-10-stay-room',
    zoneCode: 'STAY_ROOM',
    zoneName: '⑩ 新郎新婦の宿泊先部屋確認',
    checkpointName: '当日宿泊部屋番号・大量荷物搬入ルート・ルームキー管理',
    timing: '開宴前（新郎新婦お支度中）〜お見送り直前',
    responsibleStaff: 'ホテルコンシェルジュ / 総合プロデューサー',
    targetCheckItems: [
      {
        label: '宿泊部屋番号の確認とホテルフロント連携',
        description: '本日新郎新婦が宿泊する部屋番号（スイートルーム等）の確定と、フロントのチェックイン手続き代行完了の確認。',
        criticalPoint: '披露宴後に疲労困憊の新郎新婦が一般フロントに並ばされる失態を絶対に防ぐ。'
      },
      {
        label: '荷物（二次会衣装・私服・祝電・花束）搬入ルート',
        description: '大量に届いた祝電、お色直し前の私服、両親贈呈の巨大花束・記念品を、披露宴終了までにスタッフが宿泊部屋へ事前搬入。',
        criticalPoint: '披露宴後にブライズルームが荷物で溢れかえり、二次会出発に遅れる事故を防止。'
      },
      {
        label: '金庫（全額ご祝儀）・貴重品の部屋内セーフティボックス保管',
        description: '受付から親御様へリレーされたご祝儀金庫を、親御様同伴で宿泊室内の暗証番号式セーフティボックスへ安全に格納。',
        criticalPoint: '数百万円の現金を二次会会場に持ち歩く危険を遮断。'
      },
      {
        label: 'ルームキーの保管責任者と解錠手配',
        description: 'カードキーの現物をプロデューサーまたは新郎の父親が確実に保管し、お見送り後に即時新郎新婦へ手渡す。',
        criticalPoint: '「部屋の鍵がどこにあるか分からない！」と部屋の前で立ち往生する悲劇をゼロにする。'
      }
    ],
    dangerRisk: '披露宴が終わって疲れ切った新郎新婦を部屋の前で待たせたり、大量の花束や祝電の搬入が滞ると、最高の1日のフィナーレが台無しになります。',
    failSafeRule: 'お見送り開始の30分前までに宿泊部屋のエアコンを入れて荷物搬入を完了させ、鍵をブライズルームにスタンバイ。'
  }
];
