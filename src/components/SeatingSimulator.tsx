import React, { useState } from 'react';
import { 
  AlertTriangle, 
  ArrowLeft, 
  CheckCircle2, 
  ChevronRight, 
  Crown, 
  Heart, 
  Info, 
  LayoutGrid, 
  Plus, 
  Printer, 
  RotateCcw, 
  ShieldAlert, 
  Sparkles, 
  Trash2, 
  User, 
  Users 
} from 'lucide-react';

export interface SeatingGuest {
  id: string;
  name: string;
  side: 'groom' | 'bride'; // 新郎側 / 新婦側
  title: string; // 肩書き (例: 主賓、会社上司、大学友人、新婦母、新郎父)
  tableId: string; // 'A', 'B', 'C', 'D', 'E', 'F'
  isParent: boolean; // 両親フラグ (下座必須)
  isVIP: boolean; // 主賓フラグ (上座必須)
  giftType: 'A' | 'B' | 'C'; // 引出物セット
  allergy?: string; // アレルギー
}

export interface TableConfig {
  id: string;
  name: string;
  side: 'groom' | 'bride';
  rank: 'top' | 'middle' | 'bottom'; // 上座、中座、下座
  description: string;
  capacity: number;
}

const TABLES: TableConfig[] = [
  { id: 'A', name: '卓 A（新郎主賓卓）', side: 'groom', rank: 'top', description: '【最上座】高砂前・新郎側来賓代表', capacity: 6 },
  { id: 'B', name: '卓 B（新婦主賓卓）', side: 'bride', rank: 'top', description: '【最上座】高砂前・新婦側来賓代表', capacity: 6 },
  { id: 'C', name: '卓 C（新郎友人卓）', side: 'groom', rank: 'middle', description: '【中座】新郎側大学・職場友人', capacity: 8 },
  { id: 'D', name: '卓 D（新婦友人卓）', side: 'bride', rank: 'middle', description: '【中座】新婦側高校・職場友人', capacity: 8 },
  { id: 'E', name: '卓 E（新郎親族卓）', side: 'groom', rank: 'bottom', description: '【最下座・出入口側】新郎伯父・ご両親席', capacity: 6 },
  { id: 'F', name: '卓 F（新婦親族卓）', side: 'bride', rank: 'bottom', description: '【最下座・出入口側】新婦叔母・ご両親席', capacity: 6 }
];

const INITIAL_GUESTS: SeatingGuest[] = [
  // 卓A (新郎主賓)
  { id: 'g1', name: '佐藤 健太郎 様', side: 'groom', title: '新郎主賓（株式会社〇〇 代表取締役）', tableId: 'A', isParent: false, isVIP: true, giftType: 'A' },
  { id: 'g2', name: '高橋 秀樹 様', side: 'groom', title: '新郎恩師（〇〇大学 教授）', tableId: 'A', isParent: false, isVIP: true, giftType: 'A' },
  // 卓B (新婦主賓)
  { id: 'g3', name: '伊藤 雅子 様', side: 'bride', title: '新婦主賓（株式会社〇〇 取締役部長）', tableId: 'B', isParent: false, isVIP: true, giftType: 'A' },
  { id: 'g4', name: '渡辺 恵美 様', side: 'bride', title: '新婦恩師（〇〇高校 担任）', tableId: 'B', isParent: false, isVIP: true, giftType: 'A', allergy: 'くるみ・ナッツ類' },
  // 卓C (新郎友人)
  { id: 'g5', name: '田中 俊介 様', side: 'groom', title: '新郎友人（受付担当）', tableId: 'C', isParent: false, isVIP: false, giftType: 'B' },
  { id: 'g6', name: '小林 亮 様', side: 'groom', title: '新郎友人', tableId: 'C', isParent: false, isVIP: false, giftType: 'B' },
  // 卓D (新婦友人)
  { id: 'g7', name: '中村 綾香 様', side: 'bride', title: '新婦友人（受付担当）', tableId: 'D', isParent: false, isVIP: false, giftType: 'B' },
  { id: 'g8', name: '加藤 美咲 様', side: 'bride', title: '新婦友人', tableId: 'D', isParent: false, isVIP: false, giftType: 'B', allergy: 'えび・かに' },
  // 卓E (新郎親族・ご両親 - 下座)
  { id: 'g9', name: '山田 正男 様', side: 'groom', title: '新郎父（主催者・ホスト）', tableId: 'E', isParent: true, isVIP: false, giftType: 'C' },
  { id: 'g10', name: '山田 和代 様', side: 'groom', title: '新郎母（主催者・ホスト）', tableId: 'E', isParent: true, isVIP: false, giftType: 'C' },
  // 卓F (新婦親族・ご両親 - 下座)
  { id: 'g11', name: '鈴木 昭彦 様', side: 'bride', title: '新婦父（主催者・ホスト）', tableId: 'F', isParent: true, isVIP: false, giftType: 'C' },
  { id: 'g12', name: '鈴木 幸子 様', side: 'bride', title: '新婦母（主催者・ホスト）', tableId: 'F', isParent: true, isVIP: false, giftType: 'C' }
];

export const SeatingSimulator: React.FC = () => {
  const [guests, setGuests] = useState<SeatingGuest[]>(INITIAL_GUESTS);
  const [selectedTableId, setSelectedTableId] = useState<string>('A');
  
  // 媒酌人（仲人夫妻）の有無と氏名設定（伝統格式スタイル vs 現代スタイル）
  const [hasMatchmaker, setHasMatchmaker] = useState<boolean>(true);
  const [matchmakerName, setMatchmakerName] = useState<string>('松本 栄一 様');
  const [matchmakerWifeName, setMatchmakerWifeName] = useState<string>('松本 静子 様');

  // 国際プロトコル席次順（主大臣方式・主が内側）表示モード
  const [showProtocolMode, setShowProtocolMode] = useState<boolean>(true);

  // New guest input
  const [newName, setNewName] = useState('');
  const [newTitle, setNewTitle] = useState('');
  const [newSide, setNewSide] = useState<'groom' | 'bride'>('groom');
  const [newTable, setNewTable] = useState('A');
  const [newGift, setNewGift] = useState<'A' | 'B' | 'C'>('B');
  const [newAllergy, setNewAllergy] = useState('');

  // Manner checks
  const mannerWarnings: string[] = [];

  // Check 1: Parents must be in bottom tables (E or F), not top
  guests.forEach(g => {
    if (g.isParent) {
      const table = TABLES.find(t => t.id === g.tableId);
      if (table && table.rank === 'top') {
        mannerWarnings.push(`⚠️ 【重大マナー違反】新郎新婦のご両親（${g.name}様）が最上座（${table.name}）に配置されています。ご両親は招待客をもてなす主催者（ホスト）であるため、最も出入口に近い最下座（卓EまたはF）に配置するのが婚礼の鉄則です。`);
      }
    }
    if (g.isVIP) {
      const table = TABLES.find(t => t.id === g.tableId);
      if (table && table.rank === 'bottom') {
        mannerWarnings.push(`⚠️ 【失礼な配席】主賓の来賓代表（${g.name}様）が出入口側の最下座（${table.name}）に配置されています。主賓は高砂席に最も近い最上座（卓AまたはB）にご着席いただくのが正式な礼儀です。`);
      }
    }
  });

  const handleAddGuest = () => {
    if (!newName.trim()) return;
    const isParent = newTitle.includes('父') || newTitle.includes('母');
    const isVIP = newTitle.includes('主賓') || newTitle.includes('社長') || newTitle.includes('教授') || newTitle.includes('来賓');

    const newGuest: SeatingGuest = {
      id: `g-${Date.now()}`,
      name: newName.trim(),
      side: newSide,
      title: newTitle.trim() || 'ご列席者様',
      tableId: newTable,
      isParent,
      isVIP,
      giftType: newGift,
      allergy: newAllergy.trim() || undefined
    };

    setGuests(prev => [...prev, newGuest]);
    setNewName('');
    setNewTitle('');
    setNewAllergy('');
  };

  const handleDeleteGuest = (id: string) => {
    setGuests(prev => prev.filter(g => g.id !== id));
  };

  const handleMoveTable = (id: string, newTableId: string) => {
    setGuests(prev => prev.map(g => g.id === id ? { ...g, tableId: newTableId } : g));
  };

  // Gift summary
  const giftCounts = {
    A: guests.filter(g => g.giftType === 'A').length,
    B: guests.filter(g => g.giftType === 'B').length,
    C: guests.filter(g => g.giftType === 'C').length
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-6 space-y-6">
      {/* Top Banner */}
      <div className="bg-linear-to-r from-stone-900 via-stone-850 to-amber-950 text-white p-6 sm:p-8 rounded-2xl shadow-xl border border-amber-900/40 space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="bg-amber-500/20 text-amber-300 text-xs font-bold px-3 py-1 rounded-full border border-amber-400/40 flex items-center gap-1.5">
              <Crown className="w-3.5 h-3.5 text-amber-300" />
              プロフェッショナル 配席マナー診断
            </span>
            <span className="text-xs text-stone-300 hidden sm:inline">
              披露宴会場 内主配置＆ヒロイン高砂シミュレーター
            </span>
          </div>

          <button
            onClick={() => window.print()}
            className="no-print px-4 py-2 bg-amber-600 hover:bg-amber-500 text-stone-950 font-bold text-xs rounded-xl shadow-md flex items-center gap-1.5 active:scale-95 transition-all"
          >
            <Printer className="w-4 h-4" />
            <span>座席表を印刷・PDF保存</span>
          </button>
        </div>

        <h1 className="text-2xl sm:text-3xl font-bold font-serif-jp text-amber-50 tracking-tight">
          ヒロイン高砂 ＆ ゲスト座席表（配席レイアウト）シミュレーター
        </h1>
        <p className="text-xs sm:text-sm text-stone-300 leading-relaxed max-w-3xl">
          「ヒロインの座席と上座・下座を正しく決められてこそ、本物のプロフェッショナル。」<br />
          祭壇・客席から見た新郎新婦の立ち位置（新郎＝左、新婦ヒロイン＝右）、高砂直近の主賓上座、出入口側の両親最下座マナーをリアルタイム診断します。
        </p>
      </div>

      {/* Manner Diagnostic Warnings */}
      {mannerWarnings.length > 0 ? (
        <div className="p-4 sm:p-5 rounded-2xl bg-rose-50 border-2 border-rose-400 space-y-2 animate-pulse">
          <div className="flex items-center gap-2 text-rose-900 font-bold text-sm">
            <ShieldAlert className="w-5 h-5 text-rose-600 shrink-0" />
            <span>【プロ失格警告】配席マナー違反が検出されました（{mannerWarnings.length}件）</span>
          </div>
          <div className="space-y-1 text-xs text-rose-800 leading-relaxed">
            {mannerWarnings.map((warn, i) => (
              <p key={i} className="pl-3 border-l-2 border-rose-500">
                {warn}
              </p>
            ))}
          </div>
        </div>
      ) : (
        <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-300 text-emerald-950 flex items-center gap-3">
          <CheckCircle2 className="w-6 h-6 text-emerald-600 shrink-0" />
          <div className="text-xs">
            <span className="font-bold text-sm text-emerald-900 block font-serif-jp">
              格調高き完璧な配席レイアウトです！
            </span>
            主賓が最上座（卓A・B）、ご両親がホストとして最下座（卓E・F）、ヒロイン新婦が向かって右側に正しく配置されています。
          </div>
        </div>
      )}

      {/* Visual Floor Plan Layout */}
      <div className="bg-white rounded-2xl border border-stone-200 p-6 shadow-sm space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-stone-100 pb-3">
          <div className="flex items-center gap-2">
            <LayoutGrid className="w-5 h-5 text-amber-700" />
            <h3 className="text-base font-bold text-stone-900 font-serif-jp">
              披露宴会場 配席フロアマップ（客席・扉視点）
            </h3>
          </div>

          <div className="flex items-center gap-3">
            {/* Protocol mode toggle */}
            <button
              onClick={() => setShowProtocolMode(!showProtocolMode)}
              className={`px-3 py-1 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                showProtocolMode
                  ? 'bg-amber-800 text-white shadow-xs'
                  : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
              }`}
            >
              <span>国際プロトコル席次順（主＝①・主が内側）</span>
              <span className={`text-[10px] px-1.5 py-0.2 rounded ${showProtocolMode ? 'bg-amber-950 text-amber-200' : 'bg-stone-300 text-stone-700'}`}>
                {showProtocolMode ? 'ON' : 'OFF'}
              </span>
            </button>

            <span className="text-xs text-stone-500">
              総着席数: {guests.length} 名
            </span>
          </div>
        </div>

        {/* International Protocol Banner */}
        {showProtocolMode && (
          <div className="p-4 bg-amber-50/80 rounded-xl border border-amber-300 text-xs text-stone-800 space-y-1.5">
            <div className="font-bold text-amber-950 flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-amber-700" />
              <span>【国際プロトコルの基本原則：主大臣方式 ＆「主が内側」席次】</span>
            </div>
            <p className="leading-relaxed text-stone-700">
              日本の披露宴の配席は国際儀礼（プロトコル）に準拠しています。メインテーブルは<strong>「主大臣方式」</strong>（首班・次席配置）を取り、主賓卓および各円卓の座席は<strong>「常に主（上位）が内側（センターライン寄り）」</strong>とするのが絶対原則です。
              主賓を<strong>「①（主・内側最上座）」</strong>とし、左右交互に<strong>「②（主の右/向かって左）」「③（主の左/向かって右）」「④」「⑤」「⑥」…</strong>と外側・後方へ座席を取ります。
              そして、新郎新婦のご両親・親族（ホスト側・もてなす主催者）は、会場の最も出入口（扉）に近い<strong>「最下座」</strong>に位置します。
            </p>
          </div>
        )}

        {/* 1. HIGH TABLE (高砂席) */}
        <div className="max-w-4xl mx-auto p-4 sm:p-5 rounded-2xl bg-linear-to-b from-amber-50 to-amber-100/60 border-2 border-amber-400 text-center shadow-md relative space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-amber-300/80 pb-2">
            <div className="text-[11px] font-bold text-amber-900 uppercase tracking-widest flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-amber-600" />
              メインテーブル（高砂席・内主配置・主大臣方式）
            </div>

            {/* Toggle: Matchmaker on/off */}
            <div className="flex items-center gap-1.5 text-xs bg-white px-2 py-1 rounded-xl border border-amber-300 shadow-2xs">
              <span className="text-[11px] font-bold text-stone-600">高砂媒酌人（仲人）設定:</span>
              <button
                onClick={() => setHasMatchmaker(true)}
                className={`px-2 py-0.5 rounded-lg text-[11px] font-bold transition-all cursor-pointer ${
                  hasMatchmaker
                    ? 'bg-amber-800 text-white shadow-2xs'
                    : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                あり（伝統正統4席）
              </button>
              <button
                onClick={() => setHasMatchmaker(false)}
                className={`px-2 py-0.5 rounded-lg text-[11px] font-bold transition-all cursor-pointer ${
                  !hasMatchmaker
                    ? 'bg-amber-800 text-white shadow-2xs'
                    : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                なし（現代2席）
              </button>
            </div>
          </div>

          {hasMatchmaker ? (
            /* 4-seat layout: [媒酌人夫] [新郎] [新婦ヒロイン] [媒酌人夫人] */
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 text-left">
              {/* 1. Matchmaker Husband (Far Left from audience) */}
              <div className="bg-stone-50 p-3 rounded-xl border border-stone-300 shadow-2xs">
                <span className="text-[10px] text-amber-800 font-bold block">客席向かって最左（上座）</span>
                <span className="text-xs font-bold text-stone-600 block">新郎側 媒酌人（仲人夫）</span>
                <input
                  type="text"
                  value={matchmakerName}
                  onChange={e => setMatchmakerName(e.target.value)}
                  className="font-bold text-xs sm:text-sm text-stone-900 font-serif-jp mt-0.5 w-full bg-white px-1 py-0.5 border border-stone-200 rounded"
                />
                <span className="text-[10px] text-stone-400 block mt-1">モーニングコート / 紋付袴</span>
              </div>

              {/* 2. Groom */}
              <div className="bg-white p-3 rounded-xl border-2 border-stone-400 shadow-2xs">
                <span className="text-[10px] text-stone-500 font-bold block">中央・左</span>
                <span className="text-xs font-bold text-stone-800 block">新郎様（主役）</span>
                <div className="font-bold text-sm text-stone-900 font-serif-jp mt-1">
                  新郎様
                </div>
                <span className="text-[10px] text-stone-400 block mt-1">黒紋付羽織袴 / タキシード</span>
              </div>

              {/* 3. Bride (Heroine) */}
              <div className="bg-white p-3 rounded-xl border-2 border-rose-400 bg-rose-50/20 shadow-2xs">
                <span className="text-[10px] text-rose-700 font-bold block flex items-center gap-1">
                  <Heart className="w-3 h-3 text-rose-500 fill-rose-500" />
                  中央・右（主役）
                </span>
                <span className="text-xs font-bold text-rose-900 block">新婦様（ヒロイン）</span>
                <div className="font-bold text-sm text-rose-950 font-serif-jp mt-1">
                  新婦様（ヒロイン）
                </div>
                <span className="text-[10px] text-rose-700 block mt-1">白無垢・色打掛 / ウエディング</span>
              </div>

              {/* 4. Matchmaker Wife (Far Right from audience) */}
              <div className="bg-stone-50 p-3 rounded-xl border border-stone-300 shadow-2xs">
                <span className="text-[10px] text-amber-800 font-bold block">客席向かって最右（上座）</span>
                <span className="text-xs font-bold text-stone-600 block">新婦側 媒酌人夫人（仲人妻）</span>
                <input
                  type="text"
                  value={matchmakerWifeName}
                  onChange={e => setMatchmakerWifeName(e.target.value)}
                  className="font-bold text-xs sm:text-sm text-stone-900 font-serif-jp mt-0.5 w-full bg-white px-1 py-0.5 border border-stone-200 rounded"
                />
                <span className="text-[10px] text-stone-400 block mt-1">黒留袖（五つ紋・白末広）</span>
              </div>
            </div>
          ) : (
            /* 2-seat layout */
            <div className="grid grid-cols-2 gap-4 text-left max-w-lg mx-auto">
              <div className="bg-white p-3.5 rounded-xl border border-stone-300 shadow-2xs">
                <span className="text-[10px] text-stone-500 font-bold block">新郎席（客席向かって左）</span>
                <span className="text-base font-bold text-stone-900 font-serif-jp">新郎様</span>
                <span className="text-[10px] text-stone-400 block mt-0.5">黒紋付羽織袴 / タキシード</span>
              </div>

              <div className="bg-white p-3.5 rounded-xl border-2 border-rose-300 bg-rose-50/20 shadow-2xs">
                <span className="text-[10px] text-rose-700 font-bold block flex items-center gap-1">
                  <Heart className="w-3 h-3 text-rose-500 fill-rose-500" />
                  新婦ヒロイン席（向かって右）
                </span>
                <span className="text-base font-bold text-rose-950 font-serif-jp">新婦様（ヒロイン）</span>
                <span className="text-[10px] text-rose-700 block mt-0.5">白無垢・色打掛 / ドレス</span>
              </div>
            </div>
          )}

          <div className="text-[10px] text-amber-900/90 font-medium bg-white/60 p-2.5 rounded-lg border border-amber-200">
            <strong>【披露宴高砂の正統マナー】：</strong>
            客席正面から見て、左から<strong>【媒酌人（夫）】→【新郎】→【新婦（ヒロイン）】→【媒酌人夫人（妻）】</strong>の順に両サイドへ並びます。
            新郎の横に仲人男性、新婦の横に仲人女性が寄り添い、新郎新婦を両脇から支えるのが伝統の格式ある配置です。
          </div>
        </div>

        {/* 2. GUEST ROUND TABLES (円卓 6卓レイアウト) */}
        <div className="space-y-4 pt-2">
          <div className="flex items-center justify-between text-xs text-stone-500 font-medium px-2">
            <span className="font-bold text-stone-800">【新郎側 席列（左サイド）】</span>
            <span className="text-amber-800 font-bold bg-amber-100 px-2 py-0.5 rounded">↑ 上座（高砂前） ↑</span>
            <span className="font-bold text-stone-800">【新婦側 席列（右サイド）】</span>
          </div>

          {/* Table Grid (3 rows: Top, Middle, Bottom) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {TABLES.map(table => {
              const tableGuests = guests.filter(g => g.tableId === table.id);
              const isSelected = selectedTableId === table.id;

              return (
                <div
                  key={table.id}
                  onClick={() => setSelectedTableId(table.id)}
                  className={`p-4 rounded-2xl border transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-amber-50/60 border-amber-500 shadow-md ring-2 ring-amber-400/20'
                      : 'bg-stone-50/50 hover:bg-stone-100/60 border-stone-200 shadow-2xs'
                  }`}
                >
                  <div className="flex items-center justify-between border-b border-stone-200 pb-2 mb-3">
                    <div className="flex items-center gap-2">
                      <span className={`w-6 h-6 rounded-md text-xs font-bold text-white flex items-center justify-center ${
                        table.rank === 'top' ? 'bg-amber-800' : table.rank === 'middle' ? 'bg-stone-700' : 'bg-stone-500'
                      }`}>
                        {table.id}
                      </span>
                      <h4 className="font-bold text-sm text-stone-900 font-serif-jp">
                        {table.name}
                      </h4>
                    </div>

                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                      table.rank === 'top' 
                        ? 'bg-amber-200 text-amber-900' 
                        : table.rank === 'bottom' 
                        ? 'bg-stone-200 text-stone-700' 
                        : 'bg-stone-100 text-stone-600'
                    }`}>
                      {table.description}
                    </span>
                  </div>

                  {/* Seated Guests */}
                  <div className="space-y-1.5 min-h-24">
                    {tableGuests.map((g, idx) => (
                      <div
                        key={g.id}
                        className="bg-white p-2 rounded-lg border border-stone-200 flex items-center justify-between text-xs"
                      >
                        <div className="flex items-center gap-1.5 truncate">
                          {showProtocolMode && (
                            <span className={`text-[10px] font-bold font-mono px-1.5 py-0.5 rounded shrink-0 ${
                              idx === 0 
                                ? 'bg-amber-800 text-amber-100' 
                                : idx === 1 
                                ? 'bg-amber-200 text-amber-950 font-semibold' 
                                : 'bg-stone-100 text-stone-700'
                            }`} title={idx === 0 ? '① 主（内側最上座）' : `席次序列 ${idx + 1}`}>
                              {idx === 0 ? '①主(内)' : idx === 1 ? '②次席' : idx === 2 ? '③' : idx === 3 ? '④' : `${idx + 1}`}
                            </span>
                          )}
                          <User className="w-3.5 h-3.5 text-stone-400 shrink-0" />
                          <span className="font-bold text-stone-900 truncate">{g.name}</span>
                          <span className="text-[10px] text-stone-500 truncate">({g.title})</span>
                        </div>

                        <div className="flex items-center gap-2 shrink-0">
                          {g.allergy && (
                            <span className="text-[10px] bg-rose-100 text-rose-800 px-1 py-0.2 rounded border border-rose-300">
                              食アレルギー
                            </span>
                          )}
                          <span className="text-[10px] bg-amber-100 text-amber-900 px-1.5 py-0.2 rounded font-bold">
                            引出物:{g.giftType}
                          </span>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleDeleteGuest(g.id);
                            }}
                            className="text-stone-400 hover:text-rose-600 transition-colors p-0.5"
                            title="席から削除"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    ))}

                    {tableGuests.length === 0 && (
                      <p className="text-center text-stone-400 text-xs py-6">
                        現在着席者なし（下のフォームから追加または移動できます）
                      </p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          <div className="p-3 bg-stone-100 rounded-xl text-center text-xs text-stone-500 font-medium">
            ↓ 最下座（披露宴会場 出入口・送賓扉） ↓
          </div>
        </div>
      </div>

      {/* Guest Addition & Gift Summary Card */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Add Guest Form */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-stone-200 p-5 shadow-xs space-y-4">
          <h3 className="text-sm font-bold text-stone-900 font-serif-jp flex items-center gap-2">
            <Plus className="w-4 h-4 text-amber-700" />
            <span>ゲストの新規配席・座席変更登録</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <div>
              <label className="block text-stone-600 font-bold mb-1">お名前（敬称略）</label>
              <input
                type="text"
                value={newName}
                onChange={e => setNewName(e.target.value)}
                placeholder="例: 山田 太郎 様"
                className="w-full px-3 py-2 rounded-xl border border-stone-300 focus:ring-2 focus:ring-amber-500 outline-none"
              />
            </div>

            <div>
              <label className="block text-stone-600 font-bold mb-1">肩書き・関係性</label>
              <input
                type="text"
                value={newTitle}
                onChange={e => setNewTitle(e.target.value)}
                placeholder="例: 主賓、会社上司、新郎父、大学友人"
                className="w-full px-3 py-2 rounded-xl border border-stone-300 focus:ring-2 focus:ring-amber-500 outline-none"
              />
            </div>

            <div>
              <label className="block text-stone-600 font-bold mb-1">新郎新婦側</label>
              <select
                value={newSide}
                onChange={e => setNewSide(e.target.value as 'groom' | 'bride')}
                className="w-full px-3 py-2 rounded-xl border border-stone-300 focus:ring-2 focus:ring-amber-500 outline-none"
              >
                <option value="groom">新郎側（左サイド）</option>
                <option value="bride">新婦側（右サイド）</option>
              </select>
            </div>

            <div>
              <label className="block text-stone-600 font-bold mb-1">配置テーブル</label>
              <select
                value={newTable}
                onChange={e => setNewTable(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-stone-300 focus:ring-2 focus:ring-amber-500 outline-none"
              >
                {TABLES.map(t => (
                  <option key={t.id} value={t.id}>
                    {t.name} ({t.description})
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-stone-600 font-bold mb-1">引出物区分</label>
              <select
                value={newGift}
                onChange={e => setNewGift(e.target.value as 'A' | 'B' | 'C')}
                className="w-full px-3 py-2 rounded-xl border border-stone-300 focus:ring-2 focus:ring-amber-500 outline-none"
              >
                <option value="A">Aセット（主賓用・6点詰合）</option>
                <option value="B">Bセット（友人・同僚用・4点詰合）</option>
                <option value="C">Cセット（親族・家族用・3点詰合）</option>
              </select>
            </div>

            <div>
              <label className="block text-stone-600 font-bold mb-1">食物アレルギー（特定原材料8品目）</label>
              <input
                type="text"
                value={newAllergy}
                onChange={e => setNewAllergy(e.target.value)}
                placeholder="例: くるみ、小麦、甲殻類（えび・かに）"
                className="w-full px-3 py-2 rounded-xl border border-stone-300 focus:ring-2 focus:ring-amber-500 outline-none"
              />
            </div>
          </div>

          <div className="flex justify-end pt-1">
            <button
              onClick={handleAddGuest}
              className="px-5 py-2.5 rounded-xl bg-amber-700 hover:bg-amber-800 text-white font-bold text-xs flex items-center gap-1.5 shadow-xs transition-all cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>座席表に配席する</span>
            </button>
          </div>
        </div>

        {/* Gift Summary Box */}
        <div className="bg-white rounded-2xl border border-stone-200 p-5 shadow-xs space-y-4">
          <h3 className="text-sm font-bold text-stone-900 font-serif-jp flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-amber-700" />
            <span>引出物袋 分け集計（自動積算）</span>
          </h3>

          <div className="space-y-3 text-xs">
            <div className="p-3 rounded-xl bg-stone-50 border border-stone-200 flex justify-between items-center">
              <div>
                <span className="font-bold text-stone-900 block">Aセット（主賓用）</span>
                <span className="text-[10px] text-stone-500">記念品＋引菓子＋縁起物＋調味料</span>
              </div>
              <span className="text-lg font-black text-amber-900 font-mono">{giftCounts.A} 個</span>
            </div>

            <div className="p-3 rounded-xl bg-stone-50 border border-stone-200 flex justify-between items-center">
              <div>
                <span className="font-bold text-stone-900 block">Bセット（友人・同僚用）</span>
                <span className="text-[10px] text-stone-500">記念品＋引菓子＋タオル</span>
              </div>
              <span className="text-lg font-black text-amber-900 font-mono">{giftCounts.B} 個</span>
            </div>

            <div className="p-3 rounded-xl bg-stone-50 border border-stone-200 flex justify-between items-center">
              <div>
                <span className="font-bold text-stone-900 block">Cセット（親族・家族用）</span>
                <span className="text-[10px] text-stone-500">記念品＋引菓子＋縁起物</span>
              </div>
              <span className="text-lg font-black text-amber-900 font-mono">{giftCounts.C} 個</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
