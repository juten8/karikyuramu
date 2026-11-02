import React, { useState, useMemo } from 'react';
import { BanquetStyle, CateringEquipmentItem } from '../types/quiz';
import { 
  BANQUET_STYLES_DATA, 
  CATERING_EQUIPMENT_MASTER, 
  calculateRequiredStaff,
  StaffRoleItem
} from '../data/cateringEquipmentData';
import { 
  AlertTriangle, 
  Building2, 
  Calendar, 
  Check, 
  CheckCircle2, 
  ChevronRight, 
  Clock, 
  FileCheck, 
  FileSpreadsheet, 
  FileText, 
  Flame, 
  HelpCircle, 
  Info, 
  Layers, 
  MapPin, 
  Printer, 
  Receipt, 
  RotateCcw, 
  ShieldCheck, 
  Sparkles, 
  Trash2, 
  UserCheck, 
  Users, 
  Utensils, 
  UtensilsCrossed, 
  Wine 
} from 'lucide-react';

interface CateringSimulatorProps {
  onOpenTableSetting?: () => void;
}

export const CateringSimulator: React.FC<CateringSimulatorProps> = ({
  onOpenTableSetting
}) => {
  // Event & Client Profile
  const [clientName, setClientName] = useState<string>('山田家・鈴木家 婚礼御両家 宴席 御中');
  const [eventDate, setEventDate] = useState<string>('2026年11月22日（大安）11:30開宴');
  const [venueName, setVenueName] = useState<string>('特設テーマパーク / 邸宅ガーデンバンケット');
  const [quoteNumber] = useState<string>('EST-CAT-202611-084');

  // Simulation Parameters
  const [selectedStyle, setSelectedStyle] = useState<BanquetStyle>('wa_yoh');
  const [guestCount, setGuestCount] = useState<number>(70);
  const [tableCount, setTableCount] = useState<number>(9);
  
  // UI States
  const [activeView, setActiveView] = useState<'estimate' | 'manifest'>('estimate');
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [checkedItemIds, setCheckedItemIds] = useState<Record<string, boolean>>({});

  // Auto-update table count when guest count changes (roughly 8 guests per table)
  const handleGuestCountChange = (val: number) => {
    setGuestCount(val);
    setTableCount(Math.max(2, Math.ceil(val / 8)));
  };

  const currentStyleInfo = BANQUET_STYLES_DATA.find(s => s.id === selectedStyle) || BANQUET_STYLES_DATA[0];

  // Calculate required staffing based on guest count and table count
  const staffing = useMemo(() => {
    return calculateRequiredStaff(guestCount, tableCount);
  }, [guestCount, tableCount]);

  // Filter equipment based on selected banquet style
  const applicableEquipment = useMemo(() => {
    return CATERING_EQUIPMENT_MASTER.filter(item => {
      if (!item.banquetStyles) return true;
      return item.banquetStyles.includes(selectedStyle);
    });
  }, [selectedStyle]);

  // Calculate quantity & cost for each equipment item
  const equipmentDetails = useMemo(() => {
    return applicableEquipment.map(item => {
      let baseQty = 0;
      if (item.perPersonRatio !== undefined) {
        baseQty = guestCount * item.perPersonRatio;
      } else if (item.perTableRatio !== undefined) {
        baseQty = tableCount * item.perTableRatio;
      } else if (item.fixedQuantity !== undefined) {
        baseQty = item.fixedQuantity;
      }
      const totalWithSpare = Math.ceil(baseQty * (1 + item.sparePct));
      const spareQty = totalWithSpare - Math.ceil(baseQty);
      const amount = totalWithSpare * item.unitPrice;

      return {
        ...item,
        baseQty: Math.ceil(baseQty),
        spareQty,
        orderQty: totalWithSpare,
        amount
      };
    });
  }, [applicableEquipment, guestCount, tableCount]);

  // Filter by category
  const displayedEquipment = useMemo(() => {
    if (activeCategory === 'all') return equipmentDetails;
    if (activeCategory === 'staff') return [];
    return equipmentDetails.filter(item => item.category === activeCategory);
  }, [equipmentDetails, activeCategory]);

  // Cost Aggregations
  const totalEquipmentCost = useMemo(() => {
    return equipmentDetails.reduce((sum, item) => sum + item.amount, 0);
  }, [equipmentDetails]);

  const totalStaffCost = staffing.totalStaffCost;
  const produceManagementFee = Math.round((totalEquipmentCost + totalStaffCost) * 0.10); // 10% management & logistics fee
  const subtotalNet = totalEquipmentCost + totalStaffCost + produceManagementFee;
  const consumptionTax = Math.round(subtotalNet * 0.10);
  const grandTotal = subtotalNet + consumptionTax;

  // Toggle item checked
  const toggleItemCheck = (id: string) => {
    setCheckedItemIds(prev => ({ ...prev, [id]: !prev[id] }));
  };

  // Check all / Uncheck all
  const handleCheckAll = (check: boolean) => {
    const updated = { ...checkedItemIds };
    applicableEquipment.forEach(item => {
      updated[item.id] = check;
    });
    staffing.staffItems.forEach(s => {
      updated[s.id] = check;
    });
    setCheckedItemIds(updated);
  };

  // Overall check progress
  const allInspectableCount = applicableEquipment.length + staffing.staffItems.length;
  const checkedCount = [...applicableEquipment, ...staffing.staffItems].filter(item => checkedItemIds[item.id]).length;
  const progressPct = allInspectableCount > 0 ? Math.round((checkedCount / allInspectableCount) * 100) : 0;

  const categoryNames: Record<string, string> = {
    table_linen: '① テーブル＆リネン設備',
    cutlery_glass: '② カトラリー・食器・グラスウェア',
    kitchen_cooking: '③ 厨房調理・保温保冷設備',
    cloak_reception: '④ 受付・クローク・金庫備品',
    gift_paper: '⑤ 引出物・ペーパーアイテム',
    av_stage: '⑥ 音響PA・照明・進行演出設備'
  };

  const categories = [
    { id: 'all', label: '全明細（機材＋人件費）' },
    { id: 'table_linen', label: 'テーブル＆リネン' },
    { id: 'cutlery_glass', label: '食器・グラス' },
    { id: 'kitchen_cooking', label: '厨房保温保冷' },
    { id: 'cloak_reception', label: '受付・クローク' },
    { id: 'gift_paper', label: '引出物・袋' },
    { id: 'av_stage', label: '音響・マイク' },
    { id: 'staff', label: '専任人件費のみ' }
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-8">
      {/* Screen Control Header & Notice */}
      <div className="no-print space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3 bg-gradient-to-r from-stone-900 to-amber-950 text-white p-4 sm:p-5 rounded-2xl shadow-md border border-stone-800">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 bg-amber-400 text-stone-950 rounded-full text-[11px] font-bold shadow-xs">
                <Sparkles className="w-3.5 h-3.5" />
                公式認定 婚礼総合プロデューサー実務仕様
              </span>
              <span className="text-xs text-amber-200/90 font-medium hidden sm:inline">
                テーマパーク・屋外特設バンケット対応
              </span>
            </div>
            <h1 className="text-xl sm:text-2xl font-bold font-serif-jp text-white tracking-wide flex items-center gap-2">
              <Receipt className="w-6 h-6 text-amber-400" />
              <span>婚礼ケータリング総合御見積書 兼 備品積載発注書</span>
            </h1>
            <p className="text-xs text-stone-300 max-w-3xl leading-relaxed">
              単なるチェックリストではなく、単価・数量・小計・消費税・プロデュース管理費を網羅した**公式見積書一覧形式**です。「PDF / 印刷出力」をクリックすると、提出用・発注用の正式な帳票としてA4出力できます。
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2 shrink-0">
            <button
              onClick={() => window.print()}
              className="inline-flex items-center gap-2 px-4 py-2.5 bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold rounded-xl text-xs sm:text-sm shadow-md transition-all active:scale-95"
            >
              <Printer className="w-4 h-4" />
              <span>PDF / 印刷出力 (A4)</span>
            </button>
          </div>
        </div>

        {/* View Switcher & Quick Toggles */}
        <div className="flex flex-wrap items-center justify-between gap-3 bg-white p-3 rounded-xl border border-stone-200 text-xs">
          <div className="flex items-center gap-1 p-1 bg-stone-100 rounded-lg">
            <button
              onClick={() => setActiveView('estimate')}
              className={`px-3 py-1.5 rounded-md font-bold transition-all flex items-center gap-1.5 ${
                activeView === 'estimate'
                  ? 'bg-amber-900 text-white shadow-xs'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              <FileSpreadsheet className="w-4 h-4" />
              <span>公式御見積書 兼 明細一覧表</span>
            </button>
            <button
              onClick={() => setActiveView('manifest')}
              className={`px-3 py-1.5 rounded-md font-bold transition-all flex items-center gap-1.5 ${
                activeView === 'manifest'
                  ? 'bg-amber-900 text-white shadow-xs'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              <FileCheck className="w-4 h-4" />
              <span>現場持込・積載チェックシート</span>
            </button>
          </div>

          <div className="flex items-center gap-3">
            <div className="text-right">
              <span className="text-[11px] text-stone-500">点検済:</span>
              <span className="font-bold text-xs font-mono ml-1 text-stone-900">
                {checkedCount} / {allInspectableCount} 項目（{progressPct}%）
              </span>
            </div>
            <div className="flex items-center gap-1.5">
              <button
                onClick={() => handleCheckAll(true)}
                className="px-2.5 py-1 bg-stone-100 hover:bg-stone-200 text-stone-700 rounded text-[11px] font-semibold"
              >
                全点検完了
              </button>
              <button
                onClick={() => handleCheckAll(false)}
                className="px-2.5 py-1 bg-stone-100 hover:bg-stone-200 text-stone-500 rounded text-[11px]"
              >
                解除
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 4 Banquet Styles Selector (Screen Only) */}
      <div className="no-print space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <label className="text-xs font-bold text-stone-700 uppercase tracking-wider block">
            料理スタイル選択（4大バンケット形式により必要什器・カトラリーが自動換装されます）
          </label>
          {onOpenTableSetting && (
            <button
              onClick={onOpenTableSetting}
              className="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-300 rounded-lg text-xs font-bold transition-colors"
            >
              <Utensils className="w-3.5 h-3.5 text-amber-700" />
              <span>🍽️ 4大料理形式テーブルセッティング図面を確認</span>
            </button>
          )}
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {BANQUET_STYLES_DATA.map((style) => {
            const isSelected = style.id === selectedStyle;
            return (
              <button
                key={style.id}
                onClick={() => setSelectedStyle(style.id)}
                className={`p-3.5 rounded-xl border text-left transition-all relative overflow-hidden flex flex-col justify-between ${
                  isSelected
                    ? 'bg-amber-900 text-white border-amber-950 shadow-md ring-2 ring-amber-500'
                    : 'bg-white hover:bg-stone-50 text-stone-800 border-stone-200 hover:border-amber-300 shadow-xs'
                }`}
              >
                <div className="space-y-1">
                  <div className="flex items-center justify-between">
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                      isSelected ? 'bg-amber-800 text-amber-200' : 'bg-stone-100 text-stone-600'
                    }`}>
                      {style.subname}
                    </span>
                    {isSelected && <Check className="w-4 h-4 text-amber-300" />}
                  </div>
                  <div className="text-sm font-bold font-serif-jp pt-0.5">
                    {style.name}
                  </div>
                  <p className={`text-[11px] leading-tight line-clamp-2 ${
                    isSelected ? 'text-amber-100/90' : 'text-stone-500'
                  }`}>
                    {style.tagline}
                  </p>
                </div>

                <div className={`mt-2 pt-1.5 border-t text-[10px] flex items-center justify-between ${
                  isSelected ? 'border-amber-800 text-amber-300' : 'border-stone-100 text-stone-400'
                }`}>
                  <span>{isSelected ? '選択中' : '選択して見積再計算'}</span>
                  <ChevronRight className="w-3 h-3" />
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Scale Sliders (Screen Only) */}
      <div className="no-print bg-stone-900 text-white rounded-2xl p-5 shadow-md border border-stone-800 space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h3 className="text-sm font-bold font-serif-jp text-amber-200 flex items-center gap-2">
              <Users className="w-4 h-4 text-amber-400" />
              <span>宴席規模設定（人数・卓数の変更で機材数・人件費・金額がリアルタイム連動）</span>
            </h3>
          </div>
          <div className="flex items-center gap-3">
            <div className="bg-stone-800 px-3 py-1 rounded-lg border border-stone-700 text-right">
              <span className="text-[10px] text-stone-400 block">招待人数</span>
              <span className="text-sm font-bold text-amber-300 font-mono">{guestCount} 名</span>
            </div>
            <div className="bg-stone-800 px-3 py-1 rounded-lg border border-stone-700 text-right">
              <span className="text-[10px] text-stone-400 block">ゲスト卓数</span>
              <span className="text-sm font-bold text-amber-300 font-mono">{tableCount} 卓</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 pt-1">
          <div className="space-y-1.5">
            <div className="flex justify-between text-xs">
              <span className="text-stone-300">招待人数（20〜150名）:</span>
              <span className="text-amber-300 font-bold font-mono">{guestCount}名</span>
            </div>
            <input
              type="range"
              min={20}
              max={150}
              step={5}
              value={guestCount}
              onChange={(e) => handleGuestCountChange(parseInt(e.target.value))}
              className="w-full accent-amber-500 cursor-pointer"
            />
          </div>

          <div className="space-y-1.5">
            <div className="flex justify-between text-xs">
              <span className="text-stone-300">卓数手動微調整:</span>
              <span className="text-amber-300 font-bold font-mono">{tableCount} 卓（1卓あたり約{Math.round(guestCount / tableCount)}名）</span>
            </div>
            <input
              type="range"
              min={2}
              max={20}
              step={1}
              value={tableCount}
              onChange={(e) => setTableCount(parseInt(e.target.value))}
              className="w-full accent-amber-500 cursor-pointer"
            />
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* FORMAL ESTIMATE DOCUMENT (Print & Screen Presentation)                     */}
      {/* ========================================================================= */}
      <div className="bg-white rounded-2xl border border-stone-300 p-6 sm:p-8 shadow-sm space-y-8 text-stone-900 print:border-none print:shadow-none print:p-0">
        
        {/* Document Header */}
        <div className="border-b-2 border-stone-900 pb-5 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="text-[10px] sm:text-xs text-stone-500 tracking-widest font-mono">
                JAPAN BRIDAL PRODUCER ASSOCIATION ACCREDITED SPECIFICATION
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold font-serif-jp tracking-tight text-stone-950 mt-1">
                婚礼ケータリング総合御見積書
              </h2>
              <div className="text-xs text-stone-600 font-medium">
                兼 備品積載・バンケットオペレーション発注書
              </div>
            </div>

            <div className="text-right text-xs space-y-1 font-mono text-stone-700 bg-stone-50 p-3 rounded-lg border border-stone-200">
              <div><span className="text-stone-500">見積番号:</span> <span className="font-bold">{quoteNumber}</span></div>
              <div><span className="text-stone-500">発行日付:</span> 2026年10月30日</div>
              <div><span className="text-stone-500">有効期限:</span> 発行日より30日間</div>
              <div><span className="text-stone-500">担当責任者:</span> 統括プロデューサー</div>
            </div>
          </div>

          {/* Client & Event Specs Form */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-3 text-xs">
            <div className="space-y-2 bg-stone-50/80 p-3.5 rounded-xl border border-stone-200">
              <div className="flex items-center gap-2">
                <span className="font-bold text-stone-500 shrink-0 w-20">宛名（御中）:</span>
                <input
                  type="text"
                  value={clientName}
                  onChange={(e) => setClientName(e.target.value)}
                  className="w-full bg-white px-2 py-1 border border-stone-300 rounded font-serif-jp font-bold text-sm text-stone-900 focus:outline-amber-600"
                />
              </div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-stone-500 shrink-0 w-20">施行予定日:</span>
                <input
                  type="text"
                  value={eventDate}
                  onChange={(e) => setEventDate(e.target.value)}
                  className="w-full bg-white px-2 py-1 border border-stone-300 rounded text-stone-800 focus:outline-amber-600 font-mono"
                />
              </div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-stone-500 shrink-0 w-20">施行会場:</span>
                <input
                  type="text"
                  value={venueName}
                  onChange={(e) => setVenueName(e.target.value)}
                  className="w-full bg-white px-2 py-1 border border-stone-300 rounded text-stone-800 focus:outline-amber-600"
                />
              </div>
            </div>

            <div className="space-y-2 bg-amber-50/50 p-3.5 rounded-xl border border-amber-200/80">
              <div className="flex justify-between items-center text-xs">
                <span className="text-amber-900 font-bold">選択宴会形式:</span>
                <span className="font-bold text-amber-950 font-serif-jp bg-amber-100 px-2 py-0.5 rounded">
                  {currentStyleInfo.name}（{currentStyleInfo.subname}）
                </span>
              </div>
              <div className="flex justify-between items-center text-xs">
                <span className="text-stone-600">御招待人数:</span>
                <span className="font-bold font-mono text-stone-900">{guestCount} 名様</span>
              </div>
              <div className="flex justify-between items-center text-xs">
                <span className="text-stone-600">ゲスト丸テーブル数:</span>
                <span className="font-bold font-mono text-stone-900">{tableCount} 卓（高砂・受付別）</span>
              </div>
              <div className="flex justify-between items-center text-xs">
                <span className="text-stone-600">現場専任スタッフ数:</span>
                <span className="font-bold font-mono text-stone-900">{staffing.totalStaff} 名（専任配置）</span>
              </div>
            </div>
          </div>
        </div>

        {/* Grand Total Highlight & Signatures Box */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          
          {/* Executive Amount Display */}
          <div className="lg:col-span-7 bg-stone-900 text-white rounded-xl p-5 shadow-sm space-y-3">
            <div className="flex justify-between items-center border-b border-stone-800 pb-2">
              <span className="text-xs uppercase tracking-wider text-amber-300 font-bold">
                御見積金額（税込総額）
              </span>
              <span className="text-[11px] text-stone-400">※諸経費・管理費込</span>
            </div>

            <div className="flex items-baseline justify-between">
              <span className="text-xs text-stone-300 font-serif-jp">合計ご請求予定額:</span>
              <div className="text-2xl sm:text-3xl font-extrabold text-amber-300 font-mono tracking-tight">
                ¥ {grandTotal.toLocaleString()} <span className="text-xs text-stone-300 font-normal">（税込）</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-x-4 gap-y-1.5 pt-2 border-t border-stone-800 text-xs">
              <div className="flex justify-between text-stone-300">
                <span>備品・什器・リネン小計:</span>
                <span className="font-mono text-white">¥ {totalEquipmentCost.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-stone-300">
                <span>専任スタッフ人件費小計:</span>
                <span className="font-mono text-white">¥ {totalStaffCost.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-stone-300">
                <span>プロデュース運搬管理費(10%):</span>
                <span className="font-mono text-white">¥ {produceManagementFee.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-stone-300">
                <span>小計（税抜合計）:</span>
                <span className="font-mono text-white">¥ {subtotalNet.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-amber-200 col-span-2 pt-1 border-t border-stone-800/80">
                <span>消費税（10%対象）:</span>
                <span className="font-mono font-bold text-amber-300">¥ {consumptionTax.toLocaleString()}</span>
              </div>
            </div>
          </div>

          {/* Official Signatures Seal Box (印鑑欄) */}
          <div className="lg:col-span-5 border border-stone-300 rounded-xl p-3 flex flex-col justify-between bg-stone-50/50">
            <div className="text-[11px] font-bold text-stone-700 text-center border-b border-stone-200 pb-1">
              承認・検印・お客様ご受領印鑑欄
            </div>
            <div className="grid grid-cols-3 gap-2 py-2">
              <div className="border border-stone-300 rounded bg-white p-1 text-center flex flex-col justify-between h-20">
                <span className="text-[10px] text-stone-500">統括責任者</span>
                <div className="w-10 h-10 border border-dashed border-stone-300 rounded-full mx-auto flex items-center justify-center text-[10px] text-stone-300">
                  印
                </div>
                <span className="text-[9px] text-stone-400">作成</span>
              </div>
              <div className="border border-stone-300 rounded bg-white p-1 text-center flex flex-col justify-between h-20">
                <span className="text-[10px] text-stone-500">現場キャプテン</span>
                <div className="w-10 h-10 border border-dashed border-stone-300 rounded-full mx-auto flex items-center justify-center text-[10px] text-stone-300">
                  印
                </div>
                <span className="text-[9px] text-stone-400">点検</span>
              </div>
              <div className="border border-stone-300 rounded bg-white p-1 text-center flex flex-col justify-between h-20">
                <span className="text-[10px] text-stone-500">お客様ご承認</span>
                <div className="w-10 h-10 border border-dashed border-stone-300 rounded-full mx-auto flex items-center justify-center text-[10px] text-stone-300">
                  印
                </div>
                <span className="text-[9px] text-stone-400">受領</span>
              </div>
            </div>
            <div className="text-[9px] text-stone-400 text-center">
              ※本見積書は機材積載および当日の配膳スタッフィングの正式手配書を兼ねます。
            </div>
          </div>

        </div>

        {/* Category Filters (Screen Only) */}
        <div className="no-print flex flex-wrap gap-1.5 border-b border-stone-200 pb-3">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                activeCategory === cat.id
                  ? 'bg-amber-900 text-white shadow-xs'
                  : 'bg-stone-100 hover:bg-stone-200 text-stone-600'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* ========================================================= */}
        {/* VIEW 1: FORMAL ESTIMATE SPREADSHEET TABLE                 */}
        {/* ========================================================= */}
        {activeView === 'estimate' && (
          <div className="space-y-6">
            
            {/* Equipment Items Table */}
            {activeCategory !== 'staff' && (
              <div className="overflow-x-auto rounded-xl border border-stone-300">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="bg-stone-100 border-b border-stone-300 text-stone-800 font-bold">
                      <th className="py-2.5 px-3 w-10 text-center">No</th>
                      <th className="py-2.5 px-3 w-32">分類カテゴリ</th>
                      <th className="py-2.5 px-3">品名・仕様・規格</th>
                      <th className="py-2.5 px-3 text-right w-20">単価</th>
                      <th className="py-2.5 px-3 text-right w-16">基本数</th>
                      <th className="py-2.5 px-3 text-right w-16">予備数</th>
                      <th className="py-2.5 px-3 text-right w-20">発注数</th>
                      <th className="py-2.5 px-3 text-center w-12">単位</th>
                      <th className="py-2.5 px-3 text-right w-24">金額(税抜)</th>
                      <th className="py-2.5 px-3 text-center w-14">点検</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-stone-200">
                    {displayedEquipment.map((item, idx) => {
                      const isChecked = !!checkedItemIds[item.id];
                      return (
                        <tr 
                          key={item.id} 
                          className={`hover:bg-amber-50/40 transition-colors ${isChecked ? 'bg-emerald-50/30' : ''}`}
                        >
                          <td className="py-2 px-3 text-center text-stone-400 font-mono">{idx + 1}</td>
                          <td className="py-2 px-3 font-semibold text-stone-600 text-[11px]">
                            {categoryNames[item.category] || item.category}
                          </td>
                          <td className="py-2 px-3">
                            <div className="font-bold text-stone-900">{item.name}</div>
                            <div className="text-[11px] text-stone-500 max-w-md">{item.description}</div>
                            <div className="text-[10px] text-rose-700 font-medium mt-0.5">
                              ⚠️ リスク：{item.heroineRiskNote}
                            </div>
                          </td>
                          <td className="py-2 px-3 text-right font-mono text-stone-700">
                            ¥{item.unitPrice.toLocaleString()}
                          </td>
                          <td className="py-2 px-3 text-right font-mono text-stone-500">
                            {item.baseQty}
                          </td>
                          <td className="py-2 px-3 text-right font-mono text-amber-700 font-semibold">
                            +{item.spareQty}
                          </td>
                          <td className="py-2 px-3 text-right font-mono font-bold text-stone-900 bg-stone-50">
                            {item.orderQty}
                          </td>
                          <td className="py-2 px-3 text-center text-stone-500">
                            {item.unit}
                          </td>
                          <td className="py-2 px-3 text-right font-mono font-bold text-stone-900">
                            ¥{item.amount.toLocaleString()}
                          </td>
                          <td className="py-2 px-3 text-center">
                            <button
                              onClick={() => toggleItemCheck(item.id)}
                              className={`w-5 h-5 rounded flex items-center justify-center mx-auto border transition-colors ${
                                isChecked
                                  ? 'bg-emerald-600 border-emerald-600 text-white'
                                  : 'border-stone-300 bg-white hover:border-amber-400'
                              }`}
                            >
                              {isChecked && <Check className="w-3.5 h-3.5 stroke-3" />}
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                  <tfoot>
                    <tr className="bg-stone-100 border-t-2 border-stone-300 font-bold text-stone-900">
                      <td colSpan={8} className="py-2.5 px-3 text-right">
                        備品・機材・什器レンタル 合計（税抜）:
                      </td>
                      <td className="py-2.5 px-3 text-right font-mono text-sm font-extrabold text-amber-900">
                        ¥{totalEquipmentCost.toLocaleString()}
                      </td>
                      <td></td>
                    </tr>
                  </tfoot>
                </table>
              </div>
            )}

            {/* Staffing Breakdown Table */}
            {(activeCategory === 'all' || activeCategory === 'staff') && (
              <div className="space-y-3 pt-2">
                <div className="flex justify-between items-center">
                  <h3 className="text-sm font-bold font-serif-jp text-stone-900 flex items-center gap-2">
                    <Users className="w-4 h-4 text-amber-700" />
                    <span>第7部門：バンケット専任オペレーションスタッフ人件費明細（当日配置基準）</span>
                  </h3>
                  <span className="text-xs text-stone-500 font-mono">
                    計 {staffing.totalStaff} 名専任配置
                  </span>
                </div>

                <div className="overflow-x-auto rounded-xl border border-stone-300">
                  <table className="w-full text-left text-xs border-collapse">
                    <thead>
                      <tr className="bg-stone-100 border-b border-stone-300 text-stone-800 font-bold">
                        <th className="py-2.5 px-3 w-10 text-center">No</th>
                        <th className="py-2.5 px-3 w-64">役職・職務</th>
                        <th className="py-2.5 px-3">担当職責 ＆ 進行ディレクション業務</th>
                        <th className="py-2.5 px-3 text-right w-24">日当単価</th>
                        <th className="py-2.5 px-3 text-right w-20">配置人数</th>
                        <th className="py-2.5 px-3 text-center w-12">単位</th>
                        <th className="py-2.5 px-3 text-right w-28">金額(税抜)</th>
                        <th className="py-2.5 px-3 text-center w-14">配置</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-stone-200">
                      {staffing.staffItems.map((st, idx) => {
                        const isChecked = !!checkedItemIds[st.id];
                        return (
                          <tr 
                            key={st.id} 
                            className={`hover:bg-amber-50/40 transition-colors ${isChecked ? 'bg-emerald-50/30' : ''}`}
                          >
                            <td className="py-2 px-3 text-center text-stone-400 font-mono">{idx + 1}</td>
                            <td className="py-2 px-3">
                              <span className="font-bold text-stone-900">{st.role}</span>
                              <div className="text-[11px] text-stone-500">{st.description}</div>
                            </td>
                            <td className="py-2 px-3 text-[11px] text-stone-700">
                              {st.duty}
                            </td>
                            <td className="py-2 px-3 text-right font-mono text-stone-700">
                              ¥{st.unitRate.toLocaleString()}
                            </td>
                            <td className="py-2 px-3 text-right font-mono font-bold text-stone-900 bg-stone-50">
                              {st.count}
                            </td>
                            <td className="py-2 px-3 text-center text-stone-500">
                              名
                            </td>
                            <td className="py-2 px-3 text-right font-mono font-bold text-stone-900">
                              ¥{st.amount.toLocaleString()}
                            </td>
                            <td className="py-2 px-3 text-center">
                              <button
                                onClick={() => toggleItemCheck(st.id)}
                                className={`w-5 h-5 rounded flex items-center justify-center mx-auto border transition-colors ${
                                  isChecked
                                    ? 'bg-emerald-600 border-emerald-600 text-white'
                                    : 'border-stone-300 bg-white hover:border-amber-400'
                                }`}
                              >
                                {isChecked && <Check className="w-3.5 h-3.5 stroke-3" />}
                              </button>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                    <tfoot>
                      <tr className="bg-stone-100 border-t-2 border-stone-300 font-bold text-stone-900">
                        <td colSpan={6} className="py-2.5 px-3 text-right">
                          バンケット専任スタッフ人件費 合計（税抜）:
                        </td>
                        <td className="py-2.5 px-3 text-right font-mono text-sm font-extrabold text-amber-900">
                          ¥{totalStaffCost.toLocaleString()}
                        </td>
                        <td></td>
                      </tr>
                    </tfoot>
                  </table>
                </div>
              </div>
            )}

          </div>
        )}

        {/* ========================================================= */}
        {/* VIEW 2: LOADING & MANIFEST CHECKLIST                      */}
        {/* ========================================================= */}
        {activeView === 'manifest' && (
          <div className="space-y-4">
            <div className="p-3 bg-stone-50 border border-stone-200 rounded-xl text-xs text-stone-600 flex items-center justify-between">
              <span>トラック積載時および現場開梱時に、該当ボックスをタップしてチェック済みにしてください。</span>
              <span className="font-bold text-amber-900">{checkedCount} / {applicableEquipment.length} 積載完了</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {displayedEquipment.map((item) => {
                const isChecked = !!checkedItemIds[item.id];
                return (
                  <div
                    key={item.id}
                    onClick={() => toggleItemCheck(item.id)}
                    className={`p-3.5 rounded-xl border transition-all cursor-pointer flex items-start gap-3 ${
                      isChecked
                        ? 'bg-emerald-50/60 border-emerald-300 text-stone-700'
                        : 'bg-white hover:bg-stone-50 border-stone-200 hover:border-amber-300 text-stone-900'
                    }`}
                  >
                    <div className={`w-5 h-5 rounded flex items-center justify-center shrink-0 mt-0.5 border ${
                      isChecked
                        ? 'bg-emerald-600 border-emerald-600 text-white'
                        : 'border-stone-300 bg-white'
                    }`}>
                      {isChecked && <Check className="w-3.5 h-3.5 stroke-3" />}
                    </div>

                    <div className="flex-1 space-y-1">
                      <div className="flex items-center justify-between">
                        <span className={`text-xs font-bold ${isChecked ? 'line-through text-stone-400' : 'text-stone-900'}`}>
                          {item.name}
                        </span>
                        <span className="text-xs font-bold font-mono text-stone-900 ml-2">
                          {item.orderQty} {item.unit}
                        </span>
                      </div>
                      <div className="text-[11px] text-stone-500">
                        基本: {item.baseQty} + 予備: {item.spareQty} {item.unit}（単価 ¥{item.unitPrice.toLocaleString()}）
                      </div>
                      <div className="text-[10px] text-rose-700 font-medium">
                        ⚠️ {item.heroineRiskNote}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Catering Special Terms & Regulatory Notes */}
        <div className="border-t border-stone-200 pt-5 space-y-3 text-[11px] text-stone-600">
          <div className="font-bold text-stone-800 flex items-center gap-1.5 text-xs">
            <ShieldCheck className="w-4 h-4 text-emerald-700" />
            <span>婚礼ケータリング施工規程 兼 特約事項（一般社団法人日本ブライダルプロデューサー協会 準拠）</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 leading-relaxed">
            <div className="p-3 bg-stone-50 rounded-lg border border-stone-200/80 space-y-1">
              <span className="font-bold text-stone-800">1. 衛生管理および温度維持</span>
              <p>
                保健所の臨時営業許可および食品衛生基準に基づき、温蔵庫（80℃以上）および保冷庫（10℃以下）を常時モニタリングします。生ウエディングケーキおよび生鮮品の常温放置は固く禁止されています。
              </p>
            </div>
            <div className="p-3 bg-stone-50 rounded-lg border border-stone-200/80 space-y-1">
              <span className="font-bold text-stone-800">2. 什器破損・紛失および原状復帰</span>
              <p>
                カトラリー・グラス・リネン類の破損・紛失に関しては各品目の仕入れ規定原価にて実費精算となります。宴席終了後は分別ダストステーションに基づき完全原状復帰を実施いたします。
              </p>
            </div>
            <div className="p-3 bg-stone-50 rounded-lg border border-stone-200/80 space-y-1">
              <span className="font-bold text-stone-800">3. 予備バッファ（10〜20%）の保証</span>
              <p>
                本見積りには開宴中の落下・ワインこぼし・破損事故を瞬時にリカバリーするための予備バッファ（トーション、取皿、カトラリー、箸、グラス等）が積載数に含まれています。
              </p>
            </div>
            <div className="p-3 bg-stone-50 rounded-lg border border-stone-200/80 space-y-1">
              <span className="font-bold text-stone-800">4. 天候急変・電源バックアップ</span>
              <p>
                テーマパーク・ガーデン等での屋外施行において、雨天・強風時は所定の屋内避難タイムラインへ移行します。音響・温蔵設備は防雨型電工ドラムおよび指定独立系統電源を使用します。
              </p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
