import React, { useState, useEffect } from 'react';
import { 
  Calculator, 
  CheckSquare, 
  DollarSign, 
  Download, 
  FileText, 
  Plus, 
  Printer, 
  RotateCcw, 
  Sparkles, 
  Trash2, 
  TrendingUp, 
  Users 
} from 'lucide-react';

export interface EstimateItem {
  id: string;
  timing: string;
  task: string;
  price: number;
  qty: number;
  perGuest: boolean;
  manualQty?: boolean;
  completed: boolean;
  isCustom?: boolean;
  vendor?: string;
  deadline?: string;
  caution?: string;
}

const DEFAULT_ESTIMATE_ITEMS: EstimateItem[] = [
  { 
    id: '1', 
    timing: '1. 仮予約・決定', 
    task: '挙式・披露宴会場のご予約＆日程確定（定型約款・前受金保全）', 
    price: 0, 
    qty: 1, 
    perGuest: false, 
    completed: true,
    vendor: '式場・ホテル・特設会場',
    deadline: '6ヶ月前',
    caution: 'キャンセル料規定・平均的損害額の根拠書面を必ず両家と確認締結'
  },
  { 
    id: '2', 
    timing: '2. 【最重要初動】衣装直行', 
    task: '新郎新婦衣装決定（白無垢・色打掛・ドレス枠即キープ）', 
    price: 180000, 
    qty: 2, 
    perGuest: false, 
    completed: true,
    vendor: '提携衣装店 / 外部サロン',
    deadline: '5〜6ヶ月前（式場決定直後）',
    caution: '全国1点モノ争奪戦！式場契約のその足で直ちに試着予約し本命枠を押さえる'
  },
  { 
    id: '3', 
    timing: '3. 衣装決定後すぐ', 
    task: '美容着付けとの打ち合わせ（ヘアメイク・着付け内容、リハーサル日程）', 
    price: 0, 
    qty: 1, 
    perGuest: false, 
    completed: true,
    vendor: '専任ブライダルヘアメイク・着付け師',
    deadline: '4ヶ月前',
    caution: '腕利きアーティストは1日1〜2組限定。即座に指名発注すること'
  },
  { 
    id: '4', 
    timing: '4. 初動決定必須', 
    task: '前撮り（スタジオ・ロケーション撮影）の日程・衣裳・撮影内容の決定', 
    price: 98000, 
    qty: 1, 
    perGuest: false, 
    completed: false,
    vendor: 'フォトスタジオ・ロケ撮影社',
    deadline: '3ヶ月前撮影完了（第1工程で即決）',
    caution: '招待状・生い立ちムービー・ウェルカムボードへの写真反映のため初動で実施即決'
  },
  { 
    id: '5', 
    timing: '5. 3〜4ヶ月前', 
    task: '婚礼専任プロ司会者手配・事前打ち合わせ', 
    price: 55000, 
    qty: 1, 
    perGuest: false, 
    completed: false,
    vendor: '司会事務所 / 専任MC',
    deadline: '3ヶ月前',
    caution: '秒刻みタイムラインの把握、ハプニング時の機転アナウンス能力を査定'
  },
  { 
    id: '6', 
    timing: '6. 3ヶ月前', 
    task: '招待状デザイン決定・印刷手配（句読点なし・アレルギー確認同封）', 
    price: 450, 
    qty: 40, 
    perGuest: true, 
    completed: false,
    vendor: 'ペーパーアイテム印刷会社',
    deadline: '2.5ヶ月前',
    caution: '句読点（、。）の完全排除、忌み言葉校正、特定原材料アレルギー欄同封'
  },
  { 
    id: '7', 
    timing: '7. 2.5ヶ月前', 
    task: '招待状発送・宛名毛筆書き手配（寿切手貼付・大安投函）', 
    price: 120, 
    qty: 40, 
    perGuest: true, 
    completed: false,
    vendor: '筆耕職人 / 郵便局窓口持込',
    deadline: '2ヶ月前大安',
    caution: 'ポスト投函禁止（料金不足防止のため郵便局窓口持込）。主賓には手渡し'
  },
  { 
    id: '8', 
    timing: '8. 1.5ヶ月前', 
    task: '返信ハガキ回収・出欠集計＆アレルギー個別リスト化', 
    price: 0, 
    qty: 1, 
    perGuest: false, 
    completed: false,
    vendor: 'プロデューサー自社集計',
    deadline: '挙式1ヶ月前大安必着',
    caution: '未返信ゲストへの丁寧な電話フォロー、特定原材料8品目の重篤度洗い出し'
  },
  { 
    id: '9', 
    timing: '9. 1ヶ月前', 
    task: '座席表・配席レイアウト・席札作成（主大臣方式・伯父叔父厳密校正）', 
    price: 25000, 
    qty: 1, 
    perGuest: false, 
    completed: false,
    vendor: '印刷所 / 自社校正',
    deadline: '3週間前',
    caution: '父母の兄姉は「伯父・伯母」、弟妹は「叔父・叔母」。主大臣方式の主が内側原則'
  },
  { 
    id: '10', 
    timing: '10. 1ヶ月前', 
    task: '料理コース・ドリンクプラン決定（アレルギー個別特別調理）', 
    price: 16000, 
    qty: 40, 
    perGuest: true, 
    completed: false,
    vendor: '調理部厨房・総料理長',
    deadline: '3週間前',
    caution: 'コンタミネーション対策、配膳テーブル指差し確認指示書の作成'
  },
  { 
    id: '11', 
    timing: '11. 1ヶ月前', 
    task: '装花・ブーケ・メイン高砂・卓花ディレクション', 
    price: 90000, 
    qty: 1, 
    perGuest: false, 
    completed: false,
    vendor: 'フローリスト / 生花アトリエ',
    deadline: '3週間前',
    caution: 'ゲスト卓花は会話・視線を遮らない高さ（30cm以下）。花嫁衣装色との調和'
  },
  { 
    id: '12', 
    timing: '12. 1ヶ月前', 
    task: 'プロ写真・ビデオ撮影スタッフ手配（親族集合・スナップ指示書）', 
    price: 130000, 
    qty: 1, 
    perGuest: false, 
    completed: false,
    vendor: 'ブライダルフォトグラファー',
    deadline: '3週間前',
    caution: '希望ショットリスト（手元指輪・親族集合）の事前共有とロケ許可確認'
  },
  { 
    id: '13', 
    timing: '13. 1ヶ月前', 
    task: '引出物・引菓子・プチギフト決定手配（奇数品数・贈り分けA/B/C）', 
    price: 4500, 
    qty: 40, 
    perGuest: true, 
    completed: false,
    vendor: 'ギフトサロン / 百貨店',
    deadline: '2週間前',
    caution: '主賓・親族・友人別の贈り分け、割れない奇数品数（3品/5品）、紅白結び切りのし'
  },
  { 
    id: '14', 
    timing: '14. 3週間前', 
    task: '音響・BGM・照明・ISUM著作権許諾シール貼付点検', 
    price: 45000, 
    qty: 1, 
    perGuest: false, 
    completed: false,
    vendor: '音響照明オペレーター',
    deadline: '2週間前',
    caution: 'ISUM許諾シールの現物確認。無許諾上映による差止め事故を絶対防止'
  },
  { 
    id: '15', 
    timing: '15. 2週間前', 
    task: '伝統演出 鏡開き手配（酒樽・木枡人数分・乾杯杓消毒）', 
    price: 65000, 
    qty: 1, 
    perGuest: false, 
    completed: false,
    vendor: '蔵元酒造 / 宴会課',
    deadline: '前日スタンバイ',
    caution: '前日にタガを緩め木蓋を割って手開き細工にしておくこと！当日叩いても割れない事故防止'
  },
  { 
    id: '16', 
    timing: '16. 2週間前', 
    task: 'ご参列者様・ご親族様 着付け＆ヘアセット手配', 
    price: 9000, 
    qty: 6, 
    perGuest: false, 
    completed: false,
    vendor: '美容着付けサロン',
    deadline: '10日前',
    caution: '両家母親の留袖・父親モーニングのサイズ・小物を事前確認'
  },
  { 
    id: '17', 
    timing: '17. 1週間前', 
    task: '当日忘れ物ゼロ指差し点検（指輪・花嫁肌着・補正タオル・花婿カフス）', 
    price: 0, 
    qty: 1, 
    perGuest: false, 
    completed: false,
    vendor: 'プロデューサー ＆ 新郎新婦',
    deadline: '前日夜再確認',
    caution: '指輪・肌着・補正白タオル・新郎白靴下・カフス・ご両親への手紙の現物確認'
  },
  { 
    id: '18', 
    timing: '18. 1週間前', 
    task: '受付防犯リレー＆VIP控室動線打ち合わせ（鍵付き手提げ金庫・心付け袋）', 
    price: 0, 
    qty: 1, 
    perGuest: false, 
    completed: false,
    vendor: '受付友人4名 ＆ 両家親御様',
    deadline: '前日',
    caution: '受付終了直後に親御様へ金庫を手渡し。心付け・お車代ポチ袋の新札封入確認'
  },
  { 
    id: '19', 
    timing: '19. 前日〜当日', 
    task: '全手配関連 最終チェック・当日ゼネラルディレクション（総監督料）', 
    price: 150000, 
    qty: 1, 
    perGuest: false, 
    completed: false,
    vendor: 'ゼネラルプロデューサー（統括指揮）',
    deadline: '結婚式当日',
    caution: 'マルチベンダー統括、進行遅延調整、花嫁ケア、金庫引き渡し確認まで全責任完遂'
  }
];

export const EstimateSimulator: React.FC = () => {
  const [weddingDate, setWeddingDate] = useState('2026-11-22');
  const [coupleName, setCoupleName] = useState('山田家・鈴木家 ご婚礼');
  const [guestCount, setGuestCount] = useState<number>(40);
  const [deposit, setDeposit] = useState<number>(100000);
  const [items, setItems] = useState<EstimateItem[]>(() => {
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem('bridal_estimate_items_v1');
        if (saved) return JSON.parse(saved);
      } catch {}
    }
    return DEFAULT_ESTIMATE_ITEMS;
  });

  // Target gross margin (婚礼プロデュース粗利目標 35%)
  const [targetMarginPct, setTargetMarginPct] = useState<number>(35);

  // Sync perGuest quantities when guest count changes
  const handleGuestCountChange = (newCount: number) => {
    const val = Math.max(1, newCount || 1);
    setGuestCount(val);
    setItems(prev => prev.map(item => {
      if (item.perGuest && !item.manualQty) {
        return { ...item, qty: val };
      }
      return item;
    }));
  };

  const handlePriceChange = (id: string, price: number) => {
    setItems(prev => prev.map(it => it.id === id ? { ...it, price: Math.max(0, price) } : it));
  };

  const handleQtyChange = (id: string, qty: number) => {
    setItems(prev => prev.map(it => it.id === id ? { ...it, qty: Math.max(0, qty), manualQty: true } : it));
  };

  const handleToggleCompleted = (id: string) => {
    setItems(prev => prev.map(it => it.id === id ? { ...it, completed: !it.completed } : it));
  };

  const handleAddItem = () => {
    const newItem: EstimateItem = {
      id: `custom-${Date.now()}`,
      timing: '随時追加手配',
      task: '持込料・特別演出・プロデュース追加項目',
      price: 30000,
      qty: 1,
      perGuest: false,
      completed: false,
      isCustom: true
    };
    setItems(prev => [...prev, newItem]);
  };

  const handleDeleteItem = (id: string) => {
    setItems(prev => prev.filter(it => it.id !== id));
  };

  const handleReset = () => {
    if (window.confirm('見積り項目を初期標準状態にリセットしますか？')) {
      setItems(DEFAULT_ESTIMATE_ITEMS);
      setGuestCount(40);
      setDeposit(100000);
    }
  };

  // Calculations
  const subTotal = items.reduce((sum, item) => sum + (item.price * item.qty), 0);
  const finalBalance = subTotal - deposit;
  const perGuestPrice = guestCount > 0 ? Math.round(subTotal / guestCount) : 0;

  const completedCount = items.filter(it => it.completed).length;
  const progressPercentage = items.length > 0 ? Math.round((completedCount / items.length) * 100) : 0;

  // Approximate cost analysis (原価率 ~65% when gross profit is 35%)
  const estimatedCost = Math.round(subTotal * ((100 - targetMarginPct) / 100));
  const estimatedGrossProfit = subTotal - estimatedCost;
  const actualMarginPct = subTotal > 0 ? Math.round((estimatedGrossProfit / subTotal) * 100) : 0;

  // Save to localStorage
  useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem('bridal_estimate_items_v1', JSON.stringify(items));
      } catch {}
    }
  }, [items]);

  return (
    <div className="max-w-6xl mx-auto px-4 py-6 space-y-6">
      {/* Header Banner */}
      <div className="bg-linear-to-r from-stone-900 via-stone-850 to-amber-950 text-white p-6 sm:p-8 rounded-2xl shadow-xl border border-amber-900/40 space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="bg-amber-500/20 text-amber-300 text-xs font-bold px-3 py-1 rounded-full border border-amber-400/40 flex items-center gap-1.5">
              <Calculator className="w-3.5 h-3.5 text-amber-300" />
              実務プロ仕様 施工指示連動
            </span>
            <span className="text-xs text-stone-300 hidden sm:inline">
              婚礼総合プロデュースお見積り＆進行段取りチェックシート
            </span>
          </div>

          <div className="no-print flex items-center gap-2">
            <button
              onClick={() => window.print()}
              className="px-4 py-2 bg-amber-600 hover:bg-amber-500 text-stone-950 font-bold text-xs rounded-xl shadow-md flex items-center gap-1.5 active:scale-95 transition-all"
            >
              <Printer className="w-4 h-4" />
              <span>見積書を印刷・PDF保存</span>
            </button>
            <button
              onClick={handleReset}
              className="p-2 bg-stone-800 hover:bg-stone-700 text-stone-300 rounded-xl transition-colors"
              title="初期標準値にリセット"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>
        </div>

        <h1 className="text-2xl sm:text-3xl font-bold font-serif-jp text-amber-50 tracking-tight">
          婚礼総合プロデュース お見積り＆段取りシミュレーター
        </h1>
        <p className="text-xs sm:text-sm text-stone-300 leading-relaxed max-w-3xl">
          一丁前の婚礼プロデューサー・コーディネーターとして現場を仕切るための核心ツールです。
          参列人数に連動した料理・引出物・招待状のリアルタイム積算、予約金控除、粗利30〜40%の収支設計を完全自動化します。
        </p>
      </div>

      {/* Basic Inputs Card */}
      <div className="bg-white rounded-2xl border border-stone-200 p-5 shadow-xs grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div>
          <label className="block text-xs font-bold text-stone-700 mb-1">
            挙式・披露宴 実施予定日
          </label>
          <input
            type="date"
            value={weddingDate}
            onChange={e => setWeddingDate(e.target.value)}
            className="w-full px-3 py-2 rounded-xl border border-stone-300 text-xs sm:text-sm font-medium focus:ring-2 focus:ring-amber-500 outline-none"
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-stone-700 mb-1">
            両家名・カップル名
          </label>
          <input
            type="text"
            value={coupleName}
            onChange={e => setCoupleName(e.target.value)}
            placeholder="例: 山田家・鈴木家 ご婚礼"
            className="w-full px-3 py-2 rounded-xl border border-stone-300 text-xs sm:text-sm font-medium focus:ring-2 focus:ring-amber-500 outline-none"
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-stone-700 mb-1 flex items-center justify-between">
            <span>ご参列人数（名）</span>
            <span className="text-[10px] text-amber-700 font-normal">※料理・引出物連動</span>
          </label>
          <div className="relative">
            <Users className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="number"
              min="1"
              value={guestCount}
              onChange={e => handleGuestCountChange(parseInt(e.target.value, 10) || 1)}
              className="w-full pl-9 pr-3 py-2 rounded-xl border border-stone-300 text-xs sm:text-sm font-bold text-stone-900 focus:ring-2 focus:ring-amber-500 outline-none"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold text-stone-700 mb-1">
            申込金・内受金（円）
          </label>
          <input
            type="number"
            step="10000"
            value={deposit}
            onChange={e => setDeposit(Math.max(0, parseInt(e.target.value, 10) || 0))}
            className="w-full px-3 py-2 rounded-xl border border-stone-300 text-xs sm:text-sm font-bold text-stone-900 focus:ring-2 focus:ring-amber-500 outline-none"
          />
        </div>
      </div>

      {/* Summary KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-2xl border border-stone-200 shadow-xs space-y-1">
          <span className="text-xs text-stone-500 font-medium block">お見積り総額（税込）</span>
          <span className="text-xl sm:text-2xl font-black text-stone-900 font-mono">
            {subTotal.toLocaleString()} <span className="text-xs font-normal text-stone-600">円</span>
          </span>
          <span className="text-[11px] text-stone-400 block">全{items.length}項目合算</span>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-amber-300 bg-amber-50/30 shadow-xs space-y-1">
          <span className="text-xs text-amber-900 font-bold block">最終ご請求残金（前受残高）</span>
          <span className="text-xl sm:text-2xl font-black text-amber-900 font-mono">
            {finalBalance.toLocaleString()} <span className="text-xs font-normal text-amber-800">円</span>
          </span>
          <span className="text-[10px] text-stone-500 block">
            内受金 {deposit.toLocaleString()}円 控除済
          </span>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-stone-200 shadow-xs space-y-1">
          <span className="text-xs text-stone-500 font-medium block">ゲスト1人あたり単価</span>
          <span className="text-xl sm:text-2xl font-black text-stone-800 font-mono">
            {perGuestPrice.toLocaleString()} <span className="text-xs font-normal text-stone-600">円/名</span>
          </span>
          <span className="text-[10px] text-stone-400 block">{guestCount}名参列想定</span>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-stone-200 shadow-xs space-y-1">
          <div className="flex items-center justify-between text-xs text-stone-500">
            <span className="font-medium">粗利シミュレーション</span>
            <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100 px-1.5 py-0.2 rounded">
              目標: 30〜40%
            </span>
          </div>
          <span className="text-xl sm:text-2xl font-black text-emerald-800 font-mono">
            約 {estimatedGrossProfit.toLocaleString()} <span className="text-xs font-normal text-stone-600">円 ({actualMarginPct}%)</span>
          </span>
          <span className="text-[10px] text-stone-400 block">プロデュース粗利益</span>
        </div>
      </div>

      {/* Main Estimate & Milestone Table */}
      <div className="bg-white rounded-2xl border border-stone-200 shadow-sm overflow-hidden">
        <div className="p-4 sm:p-5 border-b border-stone-200 flex flex-wrap items-center justify-between gap-3 bg-stone-50/80">
          <div>
            <h3 className="text-sm sm:text-base font-bold text-stone-900 font-serif-jp flex items-center gap-2">
              <FileText className="w-4 h-4 text-amber-700" />
              <span>進行段取りマイルストーン別 見積内訳明細（全20項目）</span>
            </h3>
            <p className="text-xs text-stone-500">
              各行の単価・数量は直接編集可能。参列人数を変更すると連動項目が自動計算されます。
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleAddItem}
              className="px-3.5 py-1.5 rounded-xl bg-stone-900 hover:bg-stone-800 text-amber-200 text-xs font-bold flex items-center gap-1 shadow-xs transition-all cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>手配項目を追加</span>
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left border-collapse">
            <thead>
              <tr className="bg-stone-100 text-stone-700 border-b border-stone-200 uppercase font-semibold">
                <th className="p-3 text-center w-12">完了</th>
                <th className="p-3 w-32">進行時期</th>
                <th className="p-3">手配業務・品目名称</th>
                <th className="p-3 text-right w-32">単価（円）</th>
                <th className="p-3 text-center w-24">数量</th>
                <th className="p-3 text-right w-36">小計（円）</th>
                <th className="p-3 text-center w-12 no-print">削除</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-200">
              {items.map((item, idx) => {
                const sub = item.price * item.qty;
                return (
                  <tr
                    key={item.id}
                    className={`hover:bg-amber-50/40 transition-colors ${
                      item.completed ? 'bg-stone-50/50' : 'bg-white'
                    }`}
                  >
                    {/* Checkbox for Milestone Completed */}
                    <td className="p-3 text-center">
                      <input
                        type="checkbox"
                        checked={item.completed}
                        onChange={() => handleToggleCompleted(item.id)}
                        className="w-4 h-4 rounded text-amber-700 focus:ring-amber-500 cursor-pointer"
                        title="手配完了チェック"
                      />
                    </td>

                    {/* Milestone Timing */}
                    <td className="p-3 font-semibold text-stone-700 whitespace-nowrap">
                      <span className="bg-stone-100 text-stone-800 px-2 py-0.5 rounded text-[11px] border border-stone-200">
                        {item.timing}
                      </span>
                    </td>

                    {/* Task Description */}
                    <td className="p-3">
                      <div className="font-medium text-stone-900 leading-relaxed">
                        {item.task}
                      </div>
                      {item.perGuest && (
                        <span className="inline-block text-[10px] text-amber-800 bg-amber-100/70 px-1.5 py-0.2 rounded mt-0.5">
                          参列人数連動（{guestCount}名）
                        </span>
                      )}
                    </td>

                    {/* Unit Price Input */}
                    <td className="p-3 text-right">
                      <input
                        type="number"
                        min="0"
                        step="100"
                        value={item.price}
                        onChange={e => handlePriceChange(item.id, parseFloat(e.target.value) || 0)}
                        className="w-full text-right px-2 py-1 rounded-lg border border-stone-300 font-mono text-xs font-semibold focus:ring-1 focus:ring-amber-500 outline-none"
                      />
                    </td>

                    {/* Quantity Input */}
                    <td className="p-3 text-center">
                      <input
                        type="number"
                        min="0"
                        value={item.qty}
                        onChange={e => handleQtyChange(item.id, parseFloat(e.target.value) || 0)}
                        className="w-16 text-center px-1.5 py-1 rounded-lg border border-stone-300 font-mono text-xs font-semibold focus:ring-1 focus:ring-amber-500 outline-none mx-auto"
                      />
                    </td>

                    {/* Subtotal */}
                    <td className="p-3 text-right font-bold text-stone-900 font-mono text-sm whitespace-nowrap">
                      {sub.toLocaleString()} 円
                    </td>

                    {/* Delete button (for custom added items) */}
                    <td className="p-3 text-center no-print">
                      {item.isCustom ? (
                        <button
                          onClick={() => handleDeleteItem(item.id)}
                          className="p-1 text-stone-400 hover:text-rose-600 rounded transition-colors"
                          title="項目を削除"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      ) : (
                        <span className="text-stone-300">-</span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
            <tfoot>
              <tr className="bg-stone-900 text-white font-bold">
                <td colSpan={3} className="p-4 text-sm font-serif-jp">
                  総合計（お見積り総額・税込）
                </td>
                <td colSpan={3} className="p-4 text-right text-lg sm:text-xl font-mono text-amber-300">
                  {subTotal.toLocaleString()} 円
                </td>
                <td className="no-print"></td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* ESTIMATE-LINKED EXECUTION CHECKLIST (見積もりイコール現場実行チェックリスト) */}
      {/* ========================================================================= */}
      <div className="bg-white rounded-2xl border-2 border-amber-300 p-6 sm:p-7 shadow-md space-y-5">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-stone-200 pb-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 bg-amber-100 text-amber-900 rounded-full text-xs font-bold border border-amber-300">
                プロフェッショナル品質保証
              </span>
              <span className="text-xs text-stone-500 font-medium">
                見積作成イコール現場実行の完全一体化
              </span>
            </div>
            <h3 className="text-xl font-bold font-serif-jp text-stone-900 flex items-center gap-2">
              <CheckSquare className="w-5 h-5 text-amber-700" />
              <span>見積もり連動 現場実行＆納品ディレクション・チェックリスト</span>
            </h3>
            <p className="text-xs text-stone-600 max-w-3xl leading-relaxed">
              「見積もりを作って満足し、現場手配が漏れる」のが最大の失敗原因です。上のお見積書に計上した全項目がそのまま発注・納品・点検チェックリストとして連動しています。
            </p>
          </div>

          <div className="bg-stone-900 text-white px-4 py-2.5 rounded-xl text-right">
            <span className="text-[10px] text-stone-400 block font-mono">手配・納品進捗</span>
            <span className="text-lg font-bold text-amber-300 font-mono">
              {completedCount} / {items.length} 項目（{progressPercentage}%）
            </span>
          </div>
        </div>

        {/* Execution Items Table */}
        <div className="space-y-3">
          {items.map((item, idx) => {
            return (
              <div
                key={item.id}
                onClick={() => handleToggleCompleted(item.id)}
                className={`p-4 rounded-xl border transition-all cursor-pointer flex flex-col md:flex-row md:items-start justify-between gap-3 ${
                  item.completed
                    ? 'bg-emerald-50/50 border-emerald-300'
                    : 'bg-stone-50/40 hover:bg-white border-stone-200 hover:border-amber-300'
                }`}
              >
                <div className="flex items-start gap-3">
                  <div className={`w-5 h-5 rounded flex items-center justify-center shrink-0 mt-0.5 border ${
                    item.completed
                      ? 'bg-emerald-600 border-emerald-600 text-white'
                      : 'border-stone-300 bg-white'
                  }`}>
                    {item.completed && <CheckSquare className="w-3.5 h-3.5 stroke-3" />}
                  </div>

                  <div className="space-y-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className={`text-xs font-bold px-2 py-0.5 rounded ${
                        item.completed ? 'bg-stone-100 text-stone-500' : 'bg-amber-100 text-amber-900'
                      }`}>
                        {item.timing}
                      </span>
                      <span className={`text-sm font-bold ${item.completed ? 'line-through text-stone-400' : 'text-stone-900'}`}>
                        {item.task}
                      </span>
                    </div>

                    <div className="flex flex-wrap items-center gap-3 text-xs text-stone-600 pt-0.5 font-mono">
                      <span>🏢 発注先：<strong className="text-stone-800">{item.vendor || '指定ベンダー'}</strong></span>
                      <span>⏳ 確定締切：<strong className="text-amber-800">{item.deadline || '要確認'}</strong></span>
                      <span>💰 金額：¥{(item.price * item.qty).toLocaleString()}</span>
                    </div>

                    {item.caution && (
                      <div className="text-[11px] text-rose-700 bg-rose-50/70 p-2 rounded-lg border border-rose-100 font-medium mt-1">
                        ⚠️ 現場の急所＆事故防止：{item.caution}
                      </div>
                    )}
                  </div>
                </div>

                <div className="shrink-0 md:text-right pl-8 md:pl-0">
                  <span className={`text-xs font-bold px-3 py-1 rounded-full ${
                    item.completed
                      ? 'bg-emerald-100 text-emerald-800'
                      : 'bg-amber-100 text-amber-900'
                  }`}>
                    {item.completed ? '手配完了' : '未完了・手配中'}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
