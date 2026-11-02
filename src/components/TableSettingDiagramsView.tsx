import React, { useState } from 'react';
import { 
  TABLE_SETTING_DATA, 
  SettingStyleId, 
  TableItemHotspot 
} from '../data/tableSettingDiagramData';
import { 
  AppMode 
} from '../types/quiz';
import { 
  AlertTriangle, 
  ArrowLeft, 
  ArrowRight, 
  CheckCircle2, 
  Clock, 
  Compass, 
  Info, 
  Printer, 
  Ruler, 
  Sparkles, 
  Utensils, 
  UtensilsCrossed, 
  Workflow, 
  ZoomIn,
  Wine,
  HelpCircle
} from 'lucide-react';

interface TableSettingDiagramsViewProps {
  onNavigate?: (mode: AppMode) => void;
  initialStyle?: SettingStyleId;
}

export const TableSettingDiagramsView: React.FC<TableSettingDiagramsViewProps> = ({
  onNavigate,
  initialStyle = 'french'
}) => {
  const [activeStyle, setActiveStyle] = useState<SettingStyleId>(initialStyle);
  const [selectedItemId, setSelectedItemId] = useState<string | null>(null);
  const [showRulerGuide, setShowRulerGuide] = useState<boolean>(true);
  const [activeTabSubView, setActiveTabSubView] = useState<'diagram' | 'sequence' | 'checklist'>('diagram');

  const currentData = TABLE_SETTING_DATA[activeStyle];
  const selectedItem = currentData.items.find(i => i.id === selectedItemId) || currentData.items[0];

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-8 font-sans">
      {/* Breadcrumb Navigation - Academic White Style */}
      <div className="no-print bg-white rounded-xl border border-stone-200 p-4 shadow-2xs flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-2 text-xs text-stone-600">
          <button
            onClick={() => onNavigate?.('workflow')}
            className="hover:text-amber-800 font-semibold flex items-center gap-1 transition-colors"
          >
            <Workflow className="w-3.5 h-3.5 text-amber-700" />
            <span>実務4大工程ロードマップ</span>
          </button>
          <span className="text-stone-300">/</span>
          <span className="text-amber-900 font-bold bg-amber-50 px-2.5 py-0.5 rounded-md border border-amber-200">
            第4工程・料理サービス ＆ 第3工程・配席実務
          </span>
          <span className="text-stone-300">/</span>
          <span className="text-stone-800 font-bold">
            4大料理形式 テーブルセッティング精密図面
          </span>
        </div>

        <div className="flex items-center gap-2">
          {onNavigate && (
            <button
              onClick={() => onNavigate('catering')}
              className="px-3 py-1.5 bg-stone-100 hover:bg-stone-200 text-stone-700 rounded-lg text-xs font-semibold border border-stone-300 flex items-center gap-1.5 transition-colors"
            >
              <UtensilsCrossed className="w-3.5 h-3.5 text-stone-600" />
              <span>ケータリング備品見積りへ連動</span>
            </button>
          )}
          <button
            onClick={handlePrint}
            className="px-3.5 py-1.5 bg-amber-700 hover:bg-amber-800 text-white rounded-lg text-xs font-bold shadow-xs flex items-center gap-1.5 transition-colors"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>A4図面印刷</span>
          </button>
        </div>
      </div>

      {/* Main Title Banner */}
      <div className="bg-white rounded-2xl border border-stone-200 p-6 sm:p-8 shadow-xs space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-50 text-amber-900 border border-amber-200 rounded-full text-xs font-bold">
            <Utensils className="w-3.5 h-3.5 text-amber-700" />
            <span>教育・技能検定公式準拠 テーブルセッティング平面図面集</span>
          </div>
          <span className="text-xs text-stone-500 font-mono">
            BIA技能検定基準 / ホテルバンケット・サービスキャプテン配膳規格
          </span>
        </div>

        <div className="space-y-2">
          <h1 className="text-2xl sm:text-3xl font-bold font-serif-jp text-stone-900">
            {currentData.title}
          </h1>
          <p className="text-amber-800 text-sm font-semibold">
            {currentData.subtitle}
          </p>
          <p className="text-stone-600 text-xs sm:text-sm leading-relaxed max-w-4xl">
            {currentData.leadExplanation}
          </p>
        </div>

        {/* 4 Grand Styles Tabs */}
        <div className="no-print pt-2 flex flex-wrap gap-2 border-t border-stone-100">
          {[
            { id: 'french' as SettingStyleId, label: 'フランス料理 正餐フルコース', icon: '🇫🇷', badge: 'シルバー・グラス配置' },
            { id: 'chinese' as SettingStyleId, label: '中国料理 円卓（ターンテーブル）', icon: '🇨🇳', badge: '散蓮華・湯碗・時計回り' },
            { id: 'fusion' as SettingStyleId, label: '和洋折衷（会席折敷・大皿膳）', icon: '🇯🇵', badge: '両口祝箸・半月盆・吸物' },
            { id: 'buffet' as SettingStyleId, label: 'ビュッフェスタイル', icon: '🍽️', badge: 'ワンウェイ動線・料理台' },
          ].map(style => {
            const isActive = activeStyle === style.id;
            return (
              <button
                key={style.id}
                onClick={() => {
                  setActiveStyle(style.id);
                  setSelectedItemId(null);
                }}
                className={`flex-1 min-w-[200px] p-3 rounded-xl border text-left transition-all ${
                  isActive
                    ? 'bg-amber-50/90 border-amber-300 shadow-xs ring-1 ring-amber-300'
                    : 'bg-white border-stone-200 hover:bg-stone-50 hover:border-stone-300'
                }`}
              >
                <div className="flex items-center gap-2 font-bold text-xs sm:text-sm">
                  <span>{style.icon}</span>
                  <span className={isActive ? 'text-amber-950 font-bold' : 'text-stone-800 font-medium'}>
                    {style.label}
                  </span>
                </div>
                <div className={`text-[11px] mt-1 ${isActive ? 'text-amber-800 font-semibold' : 'text-stone-500'}`}>
                  {style.badge}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Key Specifications & Dimension Strip */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white rounded-xl border border-stone-200 p-4 shadow-2xs space-y-1">
          <div className="text-[11px] font-bold text-stone-500 uppercase flex items-center gap-1.5">
            <Compass className="w-3.5 h-3.5 text-amber-700" />
            <span>想定テーブル仕様</span>
          </div>
          <p className="text-xs sm:text-sm font-bold text-stone-900">
            {currentData.tableType}
          </p>
        </div>

        <div className="bg-white rounded-xl border border-stone-200 p-4 shadow-2xs space-y-1">
          <div className="text-[11px] font-bold text-stone-500 uppercase flex items-center gap-1.5">
            <Ruler className="w-3.5 h-3.5 text-amber-700" />
            <span>1人当たりのカバー寸法規準</span>
          </div>
          <p className="text-xs sm:text-sm font-bold text-stone-900">
            {currentData.standardCoverSpace}
          </p>
        </div>

        <div className="bg-white rounded-xl border border-amber-200 bg-amber-50/50 p-4 shadow-2xs space-y-1">
          <div className="text-[11px] font-bold text-amber-800 uppercase flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-amber-700" />
            <span>最重要セッティング寸法ルール</span>
          </div>
          <p className="text-xs sm:text-sm font-bold text-amber-950">
            {currentData.dimensionKeyRule}
          </p>
        </div>
      </div>

      {/* View Switcher: Diagram / Service Sequence / Checkpoints */}
      <div className="no-print flex items-center justify-between border-b border-stone-200 pb-3">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setActiveTabSubView('diagram')}
            className={`px-4 py-2 rounded-lg text-xs font-bold transition-colors ${
              activeTabSubView === 'diagram'
                ? 'bg-stone-900 text-white'
                : 'bg-white text-stone-600 hover:bg-stone-100 border border-stone-200'
            }`}
          >
            📐 俯瞰精密図面（インタラクティブ下図面）
          </button>
          <button
            onClick={() => setActiveTabSubView('sequence')}
            className={`px-4 py-2 rounded-lg text-xs font-bold transition-colors ${
              activeTabSubView === 'sequence'
                ? 'bg-stone-900 text-white'
                : 'bg-white text-stone-600 hover:bg-stone-100 border border-stone-200'
            }`}
          >
            🍽️ 料理提供シーケンス＆カトラリー進行
          </button>
          <button
            onClick={() => setActiveTabSubView('checklist')}
            className={`px-4 py-2 rounded-lg text-xs font-bold transition-colors ${
              activeTabSubView === 'checklist'
                ? 'bg-stone-900 text-white'
                : 'bg-white text-stone-600 hover:bg-stone-100 border border-stone-200'
            }`}
          >
            ⭐ 国家試験・現場配膳 急所チェック
          </button>
        </div>

        {activeTabSubView === 'diagram' && (
          <div className="flex items-center gap-3">
            <label className="flex items-center gap-2 text-xs font-medium text-stone-600 cursor-pointer">
              <input
                type="checkbox"
                checked={showRulerGuide}
                onChange={(e) => setShowRulerGuide(e.target.checked)}
                className="rounded border-stone-300 text-amber-600 focus:ring-amber-500"
              />
              <span className="flex items-center gap-1">
                <Ruler className="w-3.5 h-3.5 text-stone-500" />
                寸法・配置ガイド線を表示
              </span>
            </label>
          </div>
        )}
      </div>

      {/* SUBVIEW 1: INTERACTIVE DIAGRAM */}
      {activeTabSubView === 'diagram' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left / Center: Interactive SVG Blueprint */}
          <div className="lg:col-span-8 bg-white rounded-2xl border border-stone-200 p-4 sm:p-6 shadow-xs space-y-4">
            <div className="flex items-center justify-between text-xs text-stone-500 pb-2 border-b border-stone-100">
              <span className="flex items-center gap-1.5 font-bold text-stone-800">
                <ZoomIn className="w-4 h-4 text-amber-700" />
                卓上平面配置図（クリックして器具の詳細・寸法・試験急所を確認）
              </span>
              <span className="text-[11px] text-amber-900 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                ※ 着席者目線（下側がゲスト着席位置・上側がテーブル中央奥）
              </span>
            </div>

            {/* SVG RENDERING FOR EACH BANQUET STYLE */}
            <div className="w-full overflow-x-auto bg-stone-50/60 rounded-xl p-2 border border-stone-200">
              {activeStyle === 'french' && (
                <FrenchSettingSvg
                  items={currentData.items}
                  selectedItemId={selectedItem?.id}
                  onSelectItem={(id) => setSelectedItemId(id)}
                  showRulerGuide={showRulerGuide}
                />
              )}

              {activeStyle === 'chinese' && (
                <ChineseSettingSvg
                  items={currentData.items}
                  selectedItemId={selectedItem?.id}
                  onSelectItem={(id) => setSelectedItemId(id)}
                  showRulerGuide={showRulerGuide}
                />
              )}

              {activeStyle === 'fusion' && (
                <FusionSettingSvg
                  items={currentData.items}
                  selectedItemId={selectedItem?.id}
                  onSelectItem={(id) => setSelectedItemId(id)}
                  showRulerGuide={showRulerGuide}
                />
              )}

              {activeStyle === 'buffet' && (
                <BuffetSettingSvg
                  items={currentData.items}
                  selectedItemId={selectedItem?.id}
                  onSelectItem={(id) => setSelectedItemId(id)}
                  showRulerGuide={showRulerGuide}
                />
              )}
            </div>

            {/* Quick Item Buttons Carousel */}
            <div className="pt-2">
              <div className="text-[11px] font-bold text-stone-500 uppercase tracking-wider mb-2">
                配置器具クイック選択一覧（全{currentData.items.length}品目）：
              </div>
              <div className="flex flex-wrap gap-1.5">
                {currentData.items.map(item => {
                  const isSelected = item.id === selectedItem?.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => setSelectedItemId(item.id)}
                      className={`px-2.5 py-1 rounded-md text-xs font-medium transition-colors ${
                        isSelected
                          ? 'bg-amber-700 text-white shadow-2xs font-bold'
                          : 'bg-white border border-stone-200 text-stone-700 hover:bg-stone-100'
                      }`}
                    >
                      {item.name.split('（')[0]}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right: Detailed Inspector Panel */}
          <div className="lg:col-span-4 space-y-4">
            {selectedItem ? (
              <div className="bg-white rounded-2xl border border-stone-200 shadow-xs overflow-hidden sticky top-6">
                {/* Header */}
                <div className="bg-stone-50 border-b border-stone-200 p-4 space-y-1">
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="px-2 py-0.5 bg-amber-100 text-amber-900 border border-amber-300 rounded font-bold">
                      {selectedItem.positionLabel}
                    </span>
                    <span className="text-stone-400 font-mono text-[10px]">
                      {selectedItem.category.toUpperCase()}
                    </span>
                  </div>
                  <h3 className="text-base font-bold font-serif-jp text-stone-900 pt-1">
                    {selectedItem.name}
                  </h3>
                  {selectedItem.reading && (
                    <p className="text-[11px] text-stone-500">
                      読み：{selectedItem.reading}
                    </p>
                  )}
                  {selectedItem.enName && (
                    <p className="text-[11px] text-stone-400 font-mono italic">
                      {selectedItem.enName}
                    </p>
                  )}
                </div>

                <div className="p-4 space-y-4 text-xs">
                  {/* Dimension Rule */}
                  <div className="bg-amber-50/60 rounded-xl p-3 border border-amber-200 space-y-1">
                    <div className="font-bold text-amber-900 flex items-center gap-1.5">
                      <Ruler className="w-3.5 h-3.5 text-amber-700" />
                      <span>配置寸法・位置規準</span>
                    </div>
                    <p className="text-amber-950 text-xs leading-relaxed font-medium">
                      {selectedItem.dimensionRule}
                    </p>
                  </div>

                  {/* Purpose */}
                  <div className="space-y-1">
                    <div className="font-bold text-stone-700 flex items-center gap-1.5">
                      <Utensils className="w-3.5 h-3.5 text-stone-500" />
                      <span>用途・対象料理</span>
                    </div>
                    <p className="text-stone-600 leading-relaxed">
                      {selectedItem.purpose}
                    </p>
                  </div>

                  {/* Exam Tip */}
                  <div className="bg-sky-50 rounded-xl p-3 border border-sky-200 space-y-1">
                    <div className="font-bold text-sky-950 flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-sky-700" />
                      <span>国家試験・BIA検定対策の急所</span>
                    </div>
                    <p className="text-sky-900 leading-relaxed">
                      {selectedItem.examTip}
                    </p>
                  </div>

                  {/* Service Captain Manner */}
                  <div className="space-y-1">
                    <div className="font-bold text-stone-700 flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                      <span>サービスキャプテン・配膳マナー</span>
                    </div>
                    <p className="text-stone-600 leading-relaxed">
                      {selectedItem.serviceManner}
                    </p>
                  </div>

                  {/* NG Action */}
                  <div className="bg-rose-50 rounded-xl p-3 border border-rose-200 space-y-1">
                    <div className="font-bold text-rose-950 flex items-center gap-1.5">
                      <AlertTriangle className="w-3.5 h-3.5 text-rose-700" />
                      <span>厳禁マナー・配膳NGミス</span>
                    </div>
                    <p className="text-rose-900 leading-relaxed">
                      {selectedItem.ngAction}
                    </p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-white rounded-2xl border border-stone-200 p-8 text-center text-stone-400 space-y-2">
                <Info className="w-8 h-8 mx-auto text-stone-300" />
                <p className="text-xs">左の図面から器具をクリックすると、詳細な配置寸法と試験の急所が表示されます。</p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* SUBVIEW 2: SERVICE SEQUENCE & PROGRESSION */}
      {activeTabSubView === 'sequence' && (
        <div className="bg-white rounded-2xl border border-stone-200 p-6 sm:p-8 shadow-xs space-y-6">
          <div className="flex items-center justify-between border-b border-stone-200 pb-4">
            <div className="space-y-1">
              <h2 className="text-lg font-bold font-serif-jp text-stone-900 flex items-center gap-2">
                <Clock className="w-5 h-5 text-amber-700" />
                <span>料理提供シーケンス ＆ カトラリー・器の使用順序</span>
              </h2>
              <p className="text-xs text-stone-500">
                披露宴進行における料理サーブの順序と、テーブル上のどの器具がどの段階で使用・回収されるかを時系列で解説。
              </p>
            </div>
            <span className="text-xs font-bold text-amber-900 bg-amber-50 px-3 py-1 rounded-full border border-amber-200">
              全{currentData.serviceSequence.length}ステップ
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {currentData.serviceSequence.map((step, idx) => (
              <div 
                key={idx}
                className="p-4 rounded-xl border border-stone-200 bg-stone-50/50 hover:bg-white hover:border-amber-300 hover:shadow-2xs transition-all space-y-2"
              >
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-amber-700 text-white text-xs font-bold flex items-center justify-center shrink-0">
                    {idx + 1}
                  </span>
                  <span className="font-bold text-stone-900 text-xs sm:text-sm">
                    {step}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {activeStyle === 'buffet' && currentData.buffetStations && (
            <div className="pt-6 border-t border-stone-200 space-y-4">
              <h3 className="text-base font-bold font-serif-jp text-stone-900 flex items-center gap-2">
                <UtensilsCrossed className="w-4 h-4 text-amber-700" />
                <span>ビュッフェ料理台 ワンウェイ動線ステーション詳細</span>
              </h3>
              <div className="overflow-x-auto">
                <table className="w-full text-xs text-left border-collapse border border-stone-200">
                  <thead className="bg-stone-100 text-stone-700 font-bold border-b border-stone-200">
                    <tr>
                      <th className="p-3 border-r border-stone-200 w-16 text-center">順序</th>
                      <th className="p-3 border-r border-stone-200 w-48">ステーション名</th>
                      <th className="p-3 border-r border-stone-200">配置機材・器具</th>
                      <th className="p-3 border-r border-stone-200 w-36">動線上の役割</th>
                      <th className="p-3">衛生・安全管理急所</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-stone-200">
                    {currentData.buffetStations.map(station => (
                      <tr key={station.step} className="hover:bg-amber-50/40">
                        <td className="p-3 border-r border-stone-200 font-bold text-center text-amber-900">
                          {station.step}
                        </td>
                        <td className="p-3 border-r border-stone-200 font-bold text-stone-900">
                          {station.zoneName}
                        </td>
                        <td className="p-3 border-r border-stone-200 text-stone-600">
                          {station.equipment}
                        </td>
                        <td className="p-3 border-r border-stone-200 font-semibold text-stone-700">
                          {station.flowOrder}
                        </td>
                        <td className="p-3 text-rose-900 bg-rose-50/30">
                          {station.hygienePoint}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      )}

      {/* SUBVIEW 3: EXAM & FIELD CHECKLIST */}
      {activeTabSubView === 'checklist' && (
        <div className="bg-white rounded-2xl border border-stone-200 p-6 sm:p-8 shadow-xs space-y-6">
          <div className="space-y-1 border-b border-stone-200 pb-4">
            <h2 className="text-lg font-bold font-serif-jp text-stone-900 flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-amber-700" />
              <span>国家検定・現場配膳 キャプテン必須チェックポイント</span>
            </h2>
            <p className="text-xs text-stone-500">
              試験で最も狙われる減点ポイントと、実際の披露宴会場で開宴30分前のキャプテン点検項目です。
            </p>
          </div>

          <div className="space-y-3">
            {currentData.examImportantCheckpoints.map((cp, idx) => (
              <div 
                key={idx} 
                className="p-4 rounded-xl border border-amber-200 bg-amber-50/50 flex items-start gap-3"
              >
                <div className="w-6 h-6 rounded-full bg-amber-200 text-amber-900 text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                  ✓
                </div>
                <div className="text-xs sm:text-sm text-stone-800 leading-relaxed font-medium">
                  {cp}
                </div>
              </div>
            ))}
          </div>

          {/* Table of all items with dimensions */}
          <div className="pt-6 border-t border-stone-200 space-y-4">
            <h3 className="text-sm font-bold text-stone-800 uppercase tracking-wider">
              {currentData.title} 全器具配置寸法一覧表
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left border-collapse border border-stone-200">
                <thead className="bg-stone-100 text-stone-700 font-bold border-b border-stone-200">
                  <tr>
                    <th className="p-2.5 border-r border-stone-200 w-44">器具名</th>
                    <th className="p-2.5 border-r border-stone-200 w-36">配置位置</th>
                    <th className="p-2.5 border-r border-stone-200">寸法規準・角度ルール</th>
                    <th className="p-2.5 text-rose-900">厳禁NGミス</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-200">
                  {currentData.items.map(item => (
                    <tr 
                      key={item.id} 
                      onClick={() => {
                        setSelectedItemId(item.id);
                        setActiveTabSubView('diagram');
                      }}
                      className="hover:bg-amber-50 cursor-pointer"
                    >
                      <td className="p-2.5 border-r border-stone-200 font-bold text-stone-900">
                        {item.name}
                      </td>
                      <td className="p-2.5 border-r border-stone-200 text-stone-600">
                        {item.positionLabel}
                      </td>
                      <td className="p-2.5 border-r border-stone-200 font-medium text-amber-950 bg-amber-50/30">
                        {item.dimensionRule}
                      </td>
                      <td className="p-2.5 text-rose-800 bg-rose-50/30">
                        {item.ngAction}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Print-Only Academic Footer */}
      <div className="hidden print:block text-stone-500 text-[10px] pt-8 border-t border-stone-300 text-center space-y-1">
        <p>婚礼総合プロデューサー実務校 教材資料 ｜ 第4工程 4大料理形式テーブルセッティング図面</p>
        <p>BIA技能検定基準およびホテル・式場配膳規格準拠 ｜ 発行日: 2026年 婚礼実務教本</p>
      </div>
    </div>
  );
};

/* =========================================================================
   SVG BLUEPRINTS FOR EACH STYLE
========================================================================= */

interface SvgProps {
  items: TableItemHotspot[];
  selectedItemId?: string;
  onSelectItem: (id: string) => void;
  showRulerGuide: boolean;
}

// 1. FRENCH BANQUET SETTING SVG
const FrenchSettingSvg: React.FC<SvgProps> = ({
  items,
  selectedItemId,
  onSelectItem,
  showRulerGuide
}) => {
  return (
    <div className="relative w-full max-w-[800px] mx-auto select-none">
      <svg
        viewBox="0 0 800 500"
        className="w-full h-auto bg-white rounded-xl shadow-inner border border-stone-200"
      >
        {/* Table Background (Curved Table Edge) */}
        <defs>
          <pattern id="linen-grid" width="20" height="20" patternUnits="userSpaceOnUse">
            <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#f5f5f4" strokeWidth="1" />
          </pattern>
          <linearGradient id="silver-grad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#e2e8f0" />
            <stop offset="50%" stopColor="#ffffff" />
            <stop offset="100%" stopColor="#cbd5e1" />
          </linearGradient>
          <linearGradient id="gold-rim" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#fef08a" />
            <stop offset="50%" stopColor="#facc15" />
            <stop offset="100%" stopColor="#ca8a04" />
          </linearGradient>
        </defs>

        {/* Table Linen */}
        <rect x="0" y="0" width="800" height="500" fill="#fafaf9" />
        <rect x="0" y="0" width="800" height="500" fill="url(#linen-grid)" />

        {/* Table Edge Line (Bottom Edge: y=450) */}
        <line x1="50" y1="450" x2="750" y2="450" stroke="#a8a29e" strokeWidth="3" strokeDasharray="6 3" />
        <text x="50" y="475" fill="#78716c" fontSize="12" fontWeight="bold">
          ▼ テーブル縁（エッジ）／ ゲスト着席側
        </text>

        {/* Ruler Guide Lines (2cm from edge => y=430) */}
        {showRulerGuide && (
          <g>
            <line x1="180" y1="430" x2="620" y2="430" stroke="#f59e0b" strokeWidth="1.5" strokeDasharray="4 2" />
            <line x1="180" y1="430" x2="180" y2="450" stroke="#f59e0b" strokeWidth="1" />
            <line x1="620" y1="430" x2="620" y2="450" stroke="#f59e0b" strokeWidth="1" />
            <text x="630" y="443" fill="#b45309" fontSize="11" fontWeight="bold">
              ← 指2本分（約2cm）厳密整列線
            </text>
          </g>
        )}

        {/* Center: Presentation Show Plate */}
        <g 
          onClick={() => onSelectItem('fr-showplate')}
          className="cursor-pointer transition-transform hover:opacity-90"
        >
          <circle
            cx="400"
            cy="360"
            r="68"
            fill="#ffffff"
            stroke={selectedItemId === 'fr-showplate' ? '#b45309' : '#d6d3d1'}
            strokeWidth={selectedItemId === 'fr-showplate' ? 4 : 2}
          />
          <circle cx="400" cy="360" r="64" fill="none" stroke="url(#gold-rim)" strokeWidth="3" />
          <circle cx="400" cy="360" r="48" fill="#f8fafc" stroke="#e2e8f0" strokeWidth="1" />
          <text x="400" y="325" textAnchor="middle" fill="#78716c" fontSize="10" fontWeight="bold">
            SHOW PLATE
          </text>
          <text x="400" y="340" textAnchor="middle" fill="#1c1917" fontSize="11" fontWeight="bold">
            位置皿 (32cm)
          </text>
        </g>

        {/* Napkin with Menu Card (Center of Plate) */}
        <g 
          onClick={() => onSelectItem('fr-napkin')}
          className="cursor-pointer hover:opacity-90"
        >
          <polygon
            points="400,345 375,395 425,395"
            fill={selectedItemId === 'fr-napkin' ? '#f59e0b' : '#fef3c7'}
            stroke="#d97706"
            strokeWidth="2"
          />
          {/* Menu Card */}
          <rect x="385" y="365" width="30" height="30" fill="#ffffff" stroke="#94a3b8" rx="2" />
          <text x="400" y="382" textAnchor="middle" fill="#475569" fontSize="8" fontWeight="bold">
            Menu
          </text>
          <text x="400" y="415" textAnchor="middle" fill="#92400e" fontSize="9" fontWeight="bold">
            ナプキン
          </text>
        </g>

        {/* LEFT SILVERWARE: Forks (Appetizer, Fish, Meat) */}
        {/* Meat Fork */}
        <g 
          onClick={() => onSelectItem('fr-fork-meat')}
          className="cursor-pointer hover:opacity-80"
        >
          <rect
            x="300"
            y="310"
            width="14"
            height="120"
            rx="4"
            fill={selectedItemId === 'fr-fork-meat' ? '#fbbf24' : 'url(#silver-grad)'}
            stroke="#64748b"
            strokeWidth="1.5"
          />
          {/* Prongs */}
          <line x1="302" y1="310" x2="302" y2="335" stroke="#475569" strokeWidth="1" />
          <line x1="307" y1="310" x2="307" y2="335" stroke="#475569" strokeWidth="1" />
          <line x1="312" y1="310" x2="312" y2="335" stroke="#475569" strokeWidth="1" />
          <text x="307" y="380" textAnchor="middle" fill="#0f172a" fontSize="8" fontWeight="bold" transform="rotate(-90 307 380)">
            ミートF
          </text>
        </g>

        {/* Fish Fork */}
        <g 
          onClick={() => onSelectItem('fr-fork-fish')}
          className="cursor-pointer hover:opacity-80"
        >
          <rect
            x="268"
            y="318"
            width="14"
            height="112"
            rx="4"
            fill={selectedItemId === 'fr-fork-fish' ? '#fbbf24' : 'url(#silver-grad)'}
            stroke="#64748b"
            strokeWidth="1.5"
          />
          <line x1="271" y1="318" x2="271" y2="340" stroke="#475569" strokeWidth="1" />
          <line x1="275" y1="318" x2="275" y2="340" stroke="#475569" strokeWidth="1" />
          <line x1="279" y1="318" x2="279" y2="340" stroke="#475569" strokeWidth="1" />
          <text x="275" y="380" textAnchor="middle" fill="#0f172a" fontSize="8" fontWeight="bold" transform="rotate(-90 275 380)">
            フィッシュF
          </text>
        </g>

        {/* Appetizer Fork */}
        <g 
          onClick={() => onSelectItem('fr-fork-appetizer')}
          className="cursor-pointer hover:opacity-80"
        >
          <rect
            x="236"
            y="325"
            width="14"
            height="105"
            rx="4"
            fill={selectedItemId === 'fr-fork-appetizer' ? '#fbbf24' : 'url(#silver-grad)'}
            stroke="#64748b"
            strokeWidth="1.5"
          />
          <line x1="239" y1="325" x2="239" y2="345" stroke="#475569" strokeWidth="1" />
          <line x1="243" y1="325" x2="243" y2="345" stroke="#475569" strokeWidth="1" />
          <line x1="247" y1="325" x2="247" y2="345" stroke="#475569" strokeWidth="1" />
          <text x="243" y="380" textAnchor="middle" fill="#0f172a" fontSize="8" fontWeight="bold" transform="rotate(-90 243 380)">
            オードブルF
          </text>
        </g>

        {/* Order Indicator on Left: Out to In */}
        <path d="M 230 440 L 320 440" stroke="#94a3b8" strokeWidth="1.5" markerEnd="url(#arrow)" />
        <text x="275" y="455" textAnchor="middle" fill="#64748b" fontSize="9">
          使用順：外側 ➔ 内側
        </text>

        {/* RIGHT SILVERWARE: Knives & Spoon (Meat Knife, Fish Knife, Soup Spoon, Appetizer Knife) */}
        {/* Meat Knife */}
        <g 
          onClick={() => onSelectItem('fr-knife-meat')}
          className="cursor-pointer hover:opacity-80"
        >
          <rect
            x="485"
            y="310"
            width="14"
            height="120"
            rx="3"
            fill={selectedItemId === 'fr-knife-meat' ? '#fbbf24' : 'url(#silver-grad)'}
            stroke="#64748b"
            strokeWidth="1.5"
          />
          {/* Blade Indicator (Left edge has blade) */}
          <line x1="485" y1="310" x2="485" y2="370" stroke="#e11d48" strokeWidth="2" />
          <text x="492" y="380" textAnchor="middle" fill="#0f172a" fontSize="8" fontWeight="bold" transform="rotate(-90 492 380)">
            ミートK
          </text>
        </g>

        {/* Fish Knife */}
        <g 
          onClick={() => onSelectItem('fr-knife-fish')}
          className="cursor-pointer hover:opacity-80"
        >
          <rect
            x="517"
            y="318"
            width="14"
            height="112"
            rx="3"
            fill={selectedItemId === 'fr-knife-fish' ? '#fbbf24' : 'url(#silver-grad)'}
            stroke="#64748b"
            strokeWidth="1.5"
          />
          <line x1="517" y1="318" x2="517" y2="370" stroke="#e11d48" strokeWidth="2" />
          <text x="524" y="380" textAnchor="middle" fill="#0f172a" fontSize="8" fontWeight="bold" transform="rotate(-90 524 380)">
            フィッシュK
          </text>
        </g>

        {/* Soup Spoon */}
        <g 
          onClick={() => onSelectItem('fr-spoon-soup')}
          className="cursor-pointer hover:opacity-80"
        >
          {/* Handle */}
          <rect
            x="552"
            y="350"
            width="10"
            height="80"
            rx="3"
            fill={selectedItemId === 'fr-spoon-soup' ? '#fbbf24' : 'url(#silver-grad)'}
            stroke="#64748b"
            strokeWidth="1.5"
          />
          {/* Bowl */}
          <ellipse
            cx="557"
            cy="335"
            rx="12"
            ry="18"
            fill={selectedItemId === 'fr-spoon-soup' ? '#fbbf24' : 'url(#silver-grad)'}
            stroke="#64748b"
            strokeWidth="1.5"
          />
          <text x="557" y="385" textAnchor="middle" fill="#0f172a" fontSize="8" fontWeight="bold" transform="rotate(-90 557 385)">
            スープS
          </text>
        </g>

        {/* Appetizer Knife */}
        <g 
          onClick={() => onSelectItem('fr-knife-appetizer')}
          className="cursor-pointer hover:opacity-80"
        >
          <rect
            x="585"
            y="325"
            width="14"
            height="105"
            rx="3"
            fill={selectedItemId === 'fr-knife-appetizer' ? '#fbbf24' : 'url(#silver-grad)'}
            stroke="#64748b"
            strokeWidth="1.5"
          />
          <line x1="585" y1="325" x2="585" y2="375" stroke="#e11d48" strokeWidth="2" />
          <text x="592" y="380" textAnchor="middle" fill="#0f172a" fontSize="8" fontWeight="bold" transform="rotate(-90 592 380)">
            オードブルK
          </text>
        </g>

        {/* Blade Note */}
        <text x="545" y="455" textAnchor="middle" fill="#e11d48" fontSize="9" fontWeight="bold">
          ※ 刃はすべて内側（左側・位置皿向き）
        </text>

        {/* TOP: Dessert Spoon & Fork */}
        {/* Dessert Spoon (Handle to Right) */}
        <g 
          onClick={() => onSelectItem('fr-dessert-spoon')}
          className="cursor-pointer hover:opacity-80"
        >
          <rect
            x="340"
            y="235"
            width="110"
            height="8"
            rx="3"
            fill={selectedItemId === 'fr-dessert-spoon' ? '#fbbf24' : 'url(#silver-grad)'}
            stroke="#64748b"
            strokeWidth="1.5"
          />
          <ellipse
            cx="345"
            cy="239"
            rx="14"
            ry="9"
            fill={selectedItemId === 'fr-dessert-spoon' ? '#fbbf24' : 'url(#silver-grad)'}
            stroke="#64748b"
            strokeWidth="1.5"
          />
          <text x="400" y="230" textAnchor="middle" fill="#0f172a" fontSize="9" fontWeight="bold">
            デザートスプーン (柄：右向き ➔)
          </text>
        </g>

        {/* Dessert Fork (Handle to Left) */}
        <g 
          onClick={() => onSelectItem('fr-dessert-fork')}
          className="cursor-pointer hover:opacity-80"
        >
          <rect
            x="350"
            y="255"
            width="110"
            height="8"
            rx="3"
            fill={selectedItemId === 'fr-dessert-fork' ? '#fbbf24' : 'url(#silver-grad)'}
            stroke="#64748b"
            strokeWidth="1.5"
          />
          <line x1="455" y1="255" x2="455" y2="263" stroke="#475569" strokeWidth="1" />
          <line x1="458" y1="255" x2="458" y2="263" stroke="#475569" strokeWidth="1" />
          <text x="400" y="278" textAnchor="middle" fill="#0f172a" fontSize="9" fontWeight="bold">
            デザートフォーク (柄：左向き ⬅)
          </text>
        </g>

        {/* TOP LEFT: Bread Plate & Butter Knife */}
        <g 
          onClick={() => onSelectItem('fr-breadplate')}
          className="cursor-pointer hover:opacity-80"
        >
          <circle
            cx="240"
            cy="195"
            r="44"
            fill="#ffffff"
            stroke={selectedItemId === 'fr-breadplate' ? '#b45309' : '#cbd5e1'}
            strokeWidth="2"
          />
          <circle cx="240" cy="195" r="41" fill="none" stroke="#e2e8f0" strokeWidth="1" />
          <text x="240" y="195" textAnchor="middle" fill="#334155" fontSize="10" fontWeight="bold">
            パン皿
          </text>
          <text x="240" y="208" textAnchor="middle" fill="#64748b" fontSize="8">
            (ブレッドプレート)
          </text>
          {/* Butter Knife on Plate */}
          <rect
            x="248"
            y="160"
            width="6"
            height="65"
            rx="2"
            fill="#e2e8f0"
            stroke="#475569"
            strokeWidth="1"
            transform="rotate(15 251 192)"
          />
          <text x="240" y="248" textAnchor="middle" fill="#b45309" fontSize="8" fontWeight="bold">
            バターナイフ（刃は左）
          </text>
        </g>

        {/* TOP RIGHT: Glasses Group (Water, Red Wine, White Wine, Champagne) */}
        {/* 1. Water Goblet */}
        <g 
          onClick={() => onSelectItem('fr-glass-water')}
          className="cursor-pointer hover:opacity-80"
        >
          <circle
            cx="490"
            cy="185"
            r="24"
            fill={selectedItemId === 'fr-glass-water' ? '#fed7aa' : '#eff6ff'}
            stroke="#2563eb"
            strokeWidth="2"
          />
          <circle cx="490" cy="185" r="8" fill="#bfdbfe" />
          <text x="490" y="188" textAnchor="middle" fill="#1e40af" fontSize="9" fontWeight="bold">
            水
          </text>
          <text x="490" y="152" textAnchor="middle" fill="#1e3a8a" fontSize="9" fontWeight="bold">
            ゴブレット(最大)
          </text>
        </g>

        {/* 2. Red Wine Glass */}
        <g 
          onClick={() => onSelectItem('fr-glass-red')}
          className="cursor-pointer hover:opacity-80"
        >
          <circle
            cx="540"
            cy="210"
            r="20"
            fill={selectedItemId === 'fr-glass-red' ? '#fed7aa' : '#fff1f2'}
            stroke="#e11d48"
            strokeWidth="2"
          />
          <circle cx="540" cy="210" r="6" fill="#fecdd3" />
          <text x="540" y="213" textAnchor="middle" fill="#9f1239" fontSize="9" fontWeight="bold">
            赤
          </text>
          <text x="575" y="200" fill="#9f1239" fontSize="8" fontWeight="bold">
            赤ワイン
          </text>
        </g>

        {/* 3. White Wine Glass */}
        <g 
          onClick={() => onSelectItem('fr-glass-white')}
          className="cursor-pointer hover:opacity-80"
        >
          <circle
            cx="580"
            cy="245"
            r="17"
            fill={selectedItemId === 'fr-glass-white' ? '#fed7aa' : '#fefce8'}
            stroke="#ca8a04"
            strokeWidth="2"
          />
          <circle cx="580" cy="245" r="5" fill="#fef08a" />
          <text x="580" y="248" textAnchor="middle" fill="#854d0e" fontSize="8" fontWeight="bold">
            白
          </text>
          <text x="610" y="245" fill="#854d0e" fontSize="8" fontWeight="bold">
            白ワイン
          </text>
        </g>

        {/* 4. Champagne Flute */}
        <g 
          onClick={() => onSelectItem('fr-glass-champagne')}
          className="cursor-pointer hover:opacity-80"
        >
          <circle
            cx="540"
            cy="150"
            r="15"
            fill={selectedItemId === 'fr-glass-champagne' ? '#fed7aa' : '#fdf4ff'}
            stroke="#a21caf"
            strokeWidth="2"
          />
          <circle cx="540" cy="150" r="4" fill="#f5d0fe" />
          <text x="540" y="153" textAnchor="middle" fill="#701a75" fontSize="8" fontWeight="bold">
            泡
          </text>
          <text x="540" y="125" textAnchor="middle" fill="#701a75" fontSize="8" fontWeight="bold">
            乾杯シャンパン
          </text>
        </g>

        {/* Diagonal Alignment Guide for Glasses */}
        {showRulerGuide && (
          <line
            x1="475"
            y1="170"
            x2="595"
            y2="260"
            stroke="#3b82f6"
            strokeWidth="1"
            strokeDasharray="3 3"
          />
        )}

        {/* Centerpiece Flower & Table Number Indicator */}
        <circle cx="400" cy="80" r="28" fill="#fef2f2" stroke="#f43f5e" strokeWidth="1.5" />
        <text x="400" y="83" textAnchor="middle" fill="#9f1239" fontSize="9" fontWeight="bold">
          卓上装花
        </text>
        <rect x="330" y="65" width="30" height="20" rx="3" fill="#ffffff" stroke="#94a3b8" />
        <text x="345" y="78" textAnchor="middle" fill="#0f172a" fontSize="8" fontWeight="bold">
          No.1
        </text>
      </svg>
    </div>
  );
};

// 2. CHINESE BANQUET SETTING SVG
const ChineseSettingSvg: React.FC<SvgProps> = ({
  items,
  selectedItemId,
  onSelectItem,
  showRulerGuide
}) => {
  return (
    <div className="relative w-full max-w-[800px] mx-auto select-none">
      <svg
        viewBox="0 0 800 500"
        className="w-full h-auto bg-white rounded-xl shadow-inner border border-stone-200"
      >
        <rect x="0" y="0" width="800" height="500" fill="#fafaf9" />

        {/* Round Table Outer Ring */}
        <circle cx="400" cy="450" r="420" fill="#ffffff" stroke="#cbd5e1" strokeWidth="2" />

        {/* Central Revolving Turntable (Lazy Susan) */}
        <g 
          onClick={() => onSelectItem('cn-turntable')}
          className="cursor-pointer hover:opacity-95"
        >
          <circle
            cx="400"
            cy="150"
            r="125"
            fill="#f8fafc"
            stroke={selectedItemId === 'cn-turntable' ? '#b45309' : '#0284c7'}
            strokeWidth={selectedItemId === 'cn-turntable' ? 4 : 2}
            strokeDasharray="6 3"
          />
          {/* Lazy Susan Edge */}
          <circle cx="400" cy="150" r="115" fill="#f0f9ff" stroke="#bae6fd" strokeWidth="1" />
          
          {/* Turntable Clockwise Flow Arrows */}
          <path
            d="M 330 80 A 100 100 0 0 1 470 80"
            fill="none"
            stroke="#0284c7"
            strokeWidth="3"
            markerEnd="url(#blue-arrow)"
          />
          <path
            d="M 470 220 A 100 100 0 0 1 330 220"
            fill="none"
            stroke="#0284c7"
            strokeWidth="3"
            markerEnd="url(#blue-arrow)"
          />
          <text x="400" y="70" textAnchor="middle" fill="#0369a1" fontSize="11" fontWeight="bold">
            ↻ 【絶対鉄則】時計回り（順時計回り）
          </text>

          {/* Big Shared Platters on Lazy Susan */}
          <ellipse cx="400" cy="150" rx="42" ry="26" fill="#fef08a" stroke="#ca8a04" strokeWidth="1.5" />
          <text x="400" y="153" textAnchor="middle" fill="#854d0e" fontSize="10" fontWeight="bold">
            祝宴大皿料理
          </text>
          <text x="400" y="167" textAnchor="middle" fill="#a16207" fontSize="8">
            （主賓から順に取り分け）
          </text>
        </g>

        {/* Condiments on Turntable Center */}
        <g 
          onClick={() => onSelectItem('cn-condiments')}
          className="cursor-pointer hover:opacity-80"
        >
          <circle cx="400" cy="105" r="16" fill="#ffffff" stroke="#e11d48" strokeWidth="1.5" />
          <text x="400" y="108" textAnchor="middle" fill="#9f1239" fontSize="8" fontWeight="bold">
            調味料
          </text>
          <text x="400" y="128" textAnchor="middle" fill="#475569" fontSize="8">
            醤油・香酢・辣油
          </text>
        </g>

        {/* Guest Edge Line */}
        <line x1="100" y1="460" x2="700" y2="460" stroke="#a8a29e" strokeWidth="2" strokeDasharray="4 4" />
        <text x="100" y="480" fill="#78716c" fontSize="11" fontWeight="bold">
          ▼ ゲスト着席位置（円卓外周）
        </text>

        {/* 1. Show Plate / Presentation Plate */}
        <g 
          onClick={() => onSelectItem('cn-showplate')}
          className="cursor-pointer hover:opacity-90"
        >
          <circle
            cx="400"
            cy="375"
            r="62"
            fill="#ffffff"
            stroke={selectedItemId === 'cn-showplate' ? '#b45309' : '#dc2626'}
            strokeWidth={selectedItemId === 'cn-showplate' ? 4 : 2}
          />
          <circle cx="400" cy="375" r="56" fill="#fef2f2" stroke="#fca5a5" strokeWidth="1" />
          <text x="400" y="365" textAnchor="middle" fill="#991b1b" fontSize="11" fontWeight="bold">
            位置皿（飾り皿）
          </text>
          {/* Fan Napkin */}
          <path d="M 380 400 Q 400 375 420 400 Z" fill="#ef4444" stroke="#b91c1c" />
          <text x="400" y="415" textAnchor="middle" fill="#991b1b" fontSize="8">
            扇型ナプキン
          </text>
        </g>

        {/* 2. Chopsticks & Rest (Right of Plate) */}
        <g 
          onClick={() => onSelectItem('cn-chopsticks')}
          className="cursor-pointer hover:opacity-80"
        >
          {/* Ceramic Rest */}
          <rect x="480" y="420" width="16" height="8" rx="2" fill="#e2e8f0" stroke="#64748b" />
          {/* Long Ivory/Black Chopsticks */}
          <rect
            x="485"
            y="305"
            width="6"
            height="130"
            rx="2"
            fill={selectedItemId === 'cn-chopsticks' ? '#f59e0b' : '#334155'}
            stroke="#0f172a"
            strokeWidth="1"
          />
          <text x="488" y="295" textAnchor="middle" fill="#0f172a" fontSize="9" fontWeight="bold">
            象牙箸
          </text>
        </g>

        {/* 3. Renge & Renge Rest (Left of Chopsticks) */}
        <g 
          onClick={() => onSelectItem('cn-renge')}
          className="cursor-pointer hover:opacity-80"
        >
          {/* Renge Stand */}
          <ellipse cx="455" cy="390" rx="12" ry="24" fill="#ffffff" stroke="#94a3b8" strokeWidth="1.5" />
          {/* Renge Spoon */}
          <path
            d="M 455 350 C 462 360 462 390 455 405 C 448 390 448 360 455 350 Z"
            fill={selectedItemId === 'cn-renge' ? '#f59e0b' : '#f8fafc'}
            stroke="#475569"
            strokeWidth="1.5"
          />
          <text x="455" y="340" textAnchor="middle" fill="#0f172a" fontSize="9" fontWeight="bold">
            散蓮華(レンゲ)
          </text>
        </g>

        {/* 4. Soup Bowl (Tan-wan) & Saucer (Top Left of Plate) */}
        <g 
          onClick={() => onSelectItem('cn-soupbowl')}
          className="cursor-pointer hover:opacity-80"
        >
          <circle
            cx="320"
            cy="280"
            r="32"
            fill="#ffffff"
            stroke={selectedItemId === 'cn-soupbowl' ? '#b45309' : '#0284c7'}
            strokeWidth="2"
          />
          <circle cx="320" cy="280" r="24" fill="#e0f2fe" stroke="#38bdf8" strokeWidth="1" />
          <text x="320" y="278" textAnchor="middle" fill="#0369a1" fontSize="9" fontWeight="bold">
            湯碗(スープ椀)
          </text>
          <text x="320" y="292" textAnchor="middle" fill="#0284c7" fontSize="8">
            フカヒレ用
          </text>
        </g>

        {/* 5. Sharing Plates Stack (Left Side of Plate) */}
        <g 
          onClick={() => onSelectItem('cn-platestack')}
          className="cursor-pointer hover:opacity-80"
        >
          {/* Stack effect */}
          <circle cx="280" cy="385" r="30" fill="#e2e8f0" stroke="#94a3b8" />
          <circle cx="280" cy="380" r="30" fill="#f1f5f9" stroke="#94a3b8" />
          <circle
            cx="280"
            cy="375"
            r="30"
            fill={selectedItemId === 'cn-platestack' ? '#fed7aa' : '#ffffff'}
            stroke={selectedItemId === 'cn-platestack' ? '#b45309' : '#64748b'}
            strokeWidth="2"
          />
          <text x="280" y="373" textAnchor="middle" fill="#0f172a" fontSize="9" fontWeight="bold">
            取り皿
          </text>
          <text x="280" y="386" textAnchor="middle" fill="#64748b" fontSize="8">
            (3〜4枚ストック)
          </text>
          <text x="280" y="420" textAnchor="middle" fill="#b91c1c" fontSize="8" fontWeight="bold">
            ※ 1品ごとに交換
          </text>
        </g>

        {/* 6. Chinese Tea Cup with Lid (Behind Plate) */}
        <g 
          onClick={() => onSelectItem('cn-teacup')}
          className="cursor-pointer hover:opacity-80"
        >
          <circle
            cx="400"
            cy="275"
            r="22"
            fill="#ffffff"
            stroke={selectedItemId === 'cn-teacup' ? '#b45309' : '#15803d'}
            strokeWidth="2"
          />
          <circle cx="400" cy="275" r="14" fill="#dcfce7" stroke="#86efac" />
          <text x="400" y="278" textAnchor="middle" fill="#166534" fontSize="8" fontWeight="bold">
            中国茶杯
          </text>
          <text x="400" y="250" textAnchor="middle" fill="#15803d" fontSize="8">
            (蓋碗/ジャスミン茶)
          </text>
        </g>

        {/* 7. Shaoxing Wine Cup & Beer Glass (Right Back) */}
        <g 
          onClick={() => onSelectItem('cn-glass-shaoxing')}
          className="cursor-pointer hover:opacity-80"
        >
          <circle
            cx="530"
            cy="285"
            r="15"
            fill={selectedItemId === 'cn-glass-shaoxing' ? '#fed7aa' : '#fef3c7'}
            stroke="#d97706"
            strokeWidth="2"
          />
          <text x="530" y="288" textAnchor="middle" fill="#92400e" fontSize="8" fontWeight="bold">
            紹興酒
          </text>
        </g>

        <g 
          onClick={() => onSelectItem('cn-glass-beer')}
          className="cursor-pointer hover:opacity-80"
        >
          <circle
            cx="560"
            cy="245"
            r="18"
            fill={selectedItemId === 'cn-glass-beer' ? '#fed7aa' : '#fef9c3'}
            stroke="#eab308"
            strokeWidth="2"
          />
          <text x="560" y="248" textAnchor="middle" fill="#713f12" fontSize="8" fontWeight="bold">
            ビール
          </text>
        </g>

        {/* 8. Finger Bowl & Bone Scrap Bowl */}
        <g 
          onClick={() => onSelectItem('cn-fingerbowl')}
          className="cursor-pointer hover:opacity-80"
        >
          <circle
            cx="260"
            cy="295"
            r="24"
            fill="#eff6ff"
            stroke={selectedItemId === 'cn-fingerbowl' ? '#b45309' : '#3b82f6'}
            strokeWidth="1.5"
          />
          {/* Lemon Slice */}
          <circle cx="260" cy="295" r="8" fill="#fef08a" stroke="#eab308" strokeWidth="1" />
          <text x="260" y="328" textAnchor="middle" fill="#1d4ed8" fontSize="8" fontWeight="bold">
            フィンガーボウル
          </text>
          <text x="260" y="340" textAnchor="middle" fill="#e11d48" fontSize="7" fontWeight="bold">
            (絶対に飲まない！)
          </text>
        </g>
      </svg>
    </div>
  );
};

// 3. FUSION (WA-YOH KAISEKI OSHIKI) SETTING SVG
const FusionSettingSvg: React.FC<SvgProps> = ({
  items,
  selectedItemId,
  onSelectItem,
  showRulerGuide
}) => {
  return (
    <div className="relative w-full max-w-[800px] mx-auto select-none">
      <svg
        viewBox="0 0 800 500"
        className="w-full h-auto bg-white rounded-xl shadow-inner border border-stone-200"
      >
        <rect x="0" y="0" width="800" height="500" fill="#fafaf9" />

        {/* Table Edge Line */}
        <line x1="50" y1="450" x2="750" y2="450" stroke="#a8a29e" strokeWidth="3" strokeDasharray="6 3" />
        <text x="50" y="475" fill="#78716c" fontSize="12" fontWeight="bold">
          ▼ テーブル縁（エッジ）／ ゲスト着席側
        </text>

        {/* Ruler Guide */}
        {showRulerGuide && (
          <g>
            <line x1="220" y1="430" x2="550" y2="430" stroke="#f59e0b" strokeWidth="1.5" strokeDasharray="4 2" />
            <text x="560" y="435" fill="#b45309" fontSize="10" fontWeight="bold">
              ← テーブル端から2cm
            </text>
          </g>
        )}

        {/* Center: Kaiseki Oshiki (Half-Moon Lacquer Tray) */}
        <g 
          onClick={() => onSelectItem('fs-oshiki')}
          className="cursor-pointer hover:opacity-95"
        >
          {/* Half-Moon Shape: Straight line at bottom (y=425), Arched top */}
          <path
            d="M 240 425 A 140 140 0 0 1 520 425 Z"
            fill="#1c1917"
            stroke={selectedItemId === 'fs-oshiki' ? '#f59e0b' : '#dc2626'}
            strokeWidth={selectedItemId === 'fs-oshiki' ? 4 : 3}
          />
          {/* Inner Golden Rim */}
          <path
            d="M 246 422 A 134 134 0 0 1 514 422 Z"
            fill="#292524"
            stroke="#ca8a04"
            strokeWidth="1.5"
          />
          <text x="380" y="300" textAnchor="middle" fill="#d6d3d1" fontSize="10" fontWeight="bold">
            会席折敷（半月盆）
          </text>
          <text x="380" y="315" textAnchor="middle" fill="#a8a29e" fontSize="8">
            ※ 直線側を手前に配置
          </text>
        </g>

        {/* 1. Yanagi Chopsticks & Mizuhiki Envelope (Front of Tray) */}
        <g 
          onClick={() => onSelectItem('fs-hashi')}
          className="cursor-pointer hover:opacity-90"
        >
          {/* Rest */}
          <rect x="280" y="416" width="16" height="8" rx="2" fill="#dc2626" />
          {/* Yanagi Chopsticks (Both ends tapered) */}
          <rect
            x="290"
            y="418"
            width="170"
            height="5"
            rx="2"
            fill={selectedItemId === 'fs-hashi' ? '#f59e0b' : '#fef08a'}
            stroke="#ca8a04"
            strokeWidth="1"
          />
          {/* Mizuhiki Chopstick Cover */}
          <rect x="360" y="415" width="60" height="11" rx="2" fill="#ffffff" stroke="#e11d48" />
          <line x1="390" y1="415" x2="390" y2="426" stroke="#e11d48" strokeWidth="2" />
          <text x="380" y="445" textAnchor="middle" fill="#991b1b" fontSize="9" fontWeight="bold">
            祝儀両口箸（柳箸）／ 箸先は左向き
          </text>
          <text x="380" y="458" textAnchor="middle" fill="#e11d48" fontSize="8">
            【厳禁】逆さ箸（ひっくり返して使う）はタブー
          </text>
        </g>

        {/* 2. Left Front: Sakizuke / Red Rice */}
        <g 
          onClick={() => onSelectItem('fs-sakizuke')}
          className="cursor-pointer hover:opacity-90"
        >
          <circle
            cx="320"
            cy="375"
            r="26"
            fill="#ffffff"
            stroke={selectedItemId === 'fs-sakizuke' ? '#f59e0b' : '#059669'}
            strokeWidth="2"
          />
          <circle cx="320" cy="375" r="18" fill="#ecfdf5" stroke="#6ee7b7" />
          <text x="320" y="372" textAnchor="middle" fill="#065f46" fontSize="9" fontWeight="bold">
            先付小鉢
          </text>
          <text x="320" y="385" textAnchor="middle" fill="#047857" fontSize="8">
            (祝飯)
          </text>
          <text x="320" y="340" textAnchor="middle" fill="#047857" fontSize="8" fontWeight="bold">
            【左飯】
          </text>
        </g>

        {/* 3. Right Front: Suimono Lacquer Bowl */}
        <g 
          onClick={() => onSelectItem('fs-suimono')}
          className="cursor-pointer hover:opacity-90"
        >
          <circle
            cx="440"
            cy="375"
            r="26"
            fill="#1c1917"
            stroke={selectedItemId === 'fs-suimono' ? '#f59e0b' : '#ca8a04'}
            strokeWidth="2"
          />
          {/* Gold Makie Motif */}
          <circle cx="440" cy="375" r="12" fill="none" stroke="#facc15" strokeWidth="1.5" />
          <text x="440" y="372" textAnchor="middle" fill="#fef08a" fontSize="9" fontWeight="bold">
            御吸物椀
          </text>
          <text x="440" y="385" textAnchor="middle" fill="#ca8a04" fontSize="8">
            (蛤真丈)
          </text>
          <text x="440" y="340" textAnchor="middle" fill="#b45309" fontSize="8" fontWeight="bold">
            【右汁】
          </text>
        </g>

        {/* 4. Top Center inside Tray: Celebratory Appetizer (Hassun / Zensai) */}
        <g 
          onClick={() => onSelectItem('fs-zensai')}
          className="cursor-pointer hover:opacity-90"
        >
          <rect
            x="315"
            y="245"
            width="130"
            height="50"
            rx="6"
            fill="#ffffff"
            stroke={selectedItemId === 'fs-zensai' ? '#f59e0b' : '#334155'}
            strokeWidth="2"
          />
          <text x="380" y="265" textAnchor="middle" fill="#0f172a" fontSize="9" fontWeight="bold">
            祝肴（祝い前菜七福盛り）
          </text>
          <text x="380" y="280" textAnchor="middle" fill="#64748b" fontSize="8">
            数の子・黒豆・田作り等 (奇数盛り)
          </text>
        </g>

        {/* 5. Western Cutlery on the RIGHT OUTSIDE of the Tray */}
        <g 
          onClick={() => onSelectItem('fs-knife-meat')}
          className="cursor-pointer hover:opacity-80"
        >
          {/* Meat Knife */}
          <rect
            x="535"
            y="320"
            width="12"
            height="105"
            rx="2"
            fill={selectedItemId === 'fs-knife-meat' ? '#fbbf24' : '#e2e8f0'}
            stroke="#64748b"
            strokeWidth="1.5"
          />
          <line x1="535" y1="320" x2="535" y2="370" stroke="#e11d48" strokeWidth="2" />
          {/* Meat Fork */}
          <rect
            x="560"
            y="320"
            width="12"
            height="105"
            rx="2"
            fill={selectedItemId === 'fs-knife-meat' ? '#fbbf24' : '#e2e8f0'}
            stroke="#64748b"
            strokeWidth="1.5"
          />
          <text x="548" y="440" textAnchor="middle" fill="#0f172a" fontSize="9" fontWeight="bold">
            洋食ナイフ＆フォーク
          </text>
          <text x="548" y="452" textAnchor="middle" fill="#64748b" fontSize="8">
            (牛フィレ肉メイン用)
          </text>
        </g>

        {/* 6. Dessert Silverware (Top of Tray) */}
        <g 
          onClick={() => onSelectItem('fs-dessert-set')}
          className="cursor-pointer hover:opacity-80"
        >
          <rect
            x="340"
            y="200"
            width="80"
            height="6"
            rx="2"
            fill={selectedItemId === 'fs-dessert-set' ? '#fbbf24' : '#e2e8f0'}
            stroke="#64748b"
          />
          <text x="380" y="190" textAnchor="middle" fill="#475569" fontSize="8" fontWeight="bold">
            デザートスプーン＆フォーク
          </text>
        </g>

        {/* 7. Celebratory Sake Cup & Stand (Left Back Outside) */}
        <g 
          onClick={() => onSelectItem('fs-sakazuki')}
          className="cursor-pointer hover:opacity-80"
        >
          {/* Stand */}
          <rect x="235" y="275" width="30" height="15" rx="3" fill="#1c1917" stroke="#dc2626" />
          {/* Cup */}
          <circle
            cx="250"
            cy="275"
            r="16"
            fill={selectedItemId === 'fs-sakazuki' ? '#fed7aa' : '#dc2626'}
            stroke="#b91c1c"
            strokeWidth="1.5"
          />
          <circle cx="250" cy="275" r="8" fill="#ef4444" />
          <text x="250" y="250" textAnchor="middle" fill="#991b1b" fontSize="9" fontWeight="bold">
            祝盃（朱塗り盃）
          </text>
          <text x="250" y="260" textAnchor="middle" fill="#7f1d1d" fontSize="7">
            (鏡開き振る舞い酒)
          </text>
        </g>

        {/* 8. Toast Champagne / Beer Glass (Right Back Outside) */}
        <g 
          onClick={() => onSelectItem('fs-glass-toast')}
          className="cursor-pointer hover:opacity-80"
        >
          <circle
            cx="540"
            cy="250"
            r="18"
            fill={selectedItemId === 'fs-glass-toast' ? '#fed7aa' : '#fdf4ff'}
            stroke="#9333ea"
            strokeWidth="2"
          />
          <text x="540" y="253" textAnchor="middle" fill="#6b21a8" fontSize="8" fontWeight="bold">
            乾杯酒
          </text>
          <text x="540" y="225" textAnchor="middle" fill="#581c87" fontSize="8">
            シャンパン/ビール
          </text>
        </g>

        {/* 9. Small Sharing Plate & Soy Sauce Dish (Left Outside) */}
        <g 
          onClick={() => onSelectItem('fs-meimeizara')}
          className="cursor-pointer hover:opacity-80"
        >
          <circle
            cx="200"
            cy="365"
            r="28"
            fill="#ffffff"
            stroke={selectedItemId === 'fs-meimeizara' ? '#b45309' : '#0284c7'}
            strokeWidth="1.5"
          />
          <text x="200" y="360" textAnchor="middle" fill="#0369a1" fontSize="9" fontWeight="bold">
            銘々皿
          </text>
          <text x="200" y="375" textAnchor="middle" fill="#0284c7" fontSize="8">
            (お造り用)
          </text>
          {/* Soy sauce mini dish */}
          <circle cx="200" cy="415" r="14" fill="#ffffff" stroke="#475569" />
          <circle cx="200" cy="415" r="8" fill="#451a03" />
          <text x="200" y="440" textAnchor="middle" fill="#78350f" fontSize="7" fontWeight="bold">
            溜まり醤油
          </text>
        </g>
      </svg>
    </div>
  );
};

// 4. BUFFET STYLE (ONE-WAY COUNTER + GUEST TABLE) SETTING SVG
const BuffetSettingSvg: React.FC<SvgProps> = ({
  items,
  selectedItemId,
  onSelectItem,
  showRulerGuide
}) => {
  return (
    <div className="relative w-full max-w-[850px] mx-auto select-none">
      <svg
        viewBox="0 0 850 520"
        className="w-full h-auto bg-white rounded-xl shadow-inner border border-stone-200"
      >
        <rect x="0" y="0" width="850" height="520" fill="#fafaf9" />

        {/* Top Header Label */}
        <rect x="40" y="20" width="770" height="30" rx="6" fill="#f1f5f9" stroke="#cbd5e1" />
        <text x="425" y="40" textAnchor="middle" fill="#1e293b" fontSize="12" fontWeight="bold">
          ★ ビュッフェ料理カウンター配置 ＆ ワンウェイ（一方通行）完全動線設計図
        </text>

        {/* ONE-WAY FLOW ARROW */}
        <path
          d="M 60 70 L 780 70"
          stroke="#059669"
          strokeWidth="4"
          markerEnd="url(#green-arrow)"
        />
        <text x="425" y="65" textAnchor="middle" fill="#047857" fontSize="11" fontWeight="bold">
          ➔ ➔ ➔ ワンウェイ一方通行（入口から出口へ逆流禁止） ➔ ➔ ➔
        </text>

        {/* Counter Surface (y=90 to y=230) */}
        <rect x="40" y="90" width="770" height="135" rx="8" fill="#ffffff" stroke="#94a3b8" strokeWidth="2" />

        {/* Station 1: Dinner Plate Stack & Cutlery */}
        <g 
          onClick={() => onSelectItem('bf-platedispenser')}
          className="cursor-pointer hover:opacity-90"
        >
          <rect
            x="55"
            y="105"
            width="75"
            height="105"
            rx="6"
            fill={selectedItemId === 'bf-platedispenser' ? '#fed7aa' : '#f8fafc'}
            stroke={selectedItemId === 'bf-platedispenser' ? '#b45309' : '#0284c7'}
            strokeWidth="2"
          />
          {/* Stack of plates */}
          <circle cx="92" cy="145" r="26" fill="#e2e8f0" stroke="#64748b" />
          <circle cx="92" cy="140" r="26" fill="#ffffff" stroke="#64748b" />
          <text x="92" y="142" textAnchor="middle" fill="#0f172a" fontSize="8" fontWeight="bold">
            大皿スタック
          </text>
          <text x="92" y="195" textAnchor="middle" fill="#0284c7" fontSize="9" fontWeight="bold">
            ① 入口・プレート
          </text>
        </g>

        {/* Cutlery Stand */}
        <g 
          onClick={() => onSelectItem('bf-cutlerystation')}
          className="cursor-pointer hover:opacity-90"
        >
          <rect
            x="140"
            y="115"
            width="45"
            height="85"
            rx="4"
            fill={selectedItemId === 'bf-cutlerystation' ? '#fed7aa' : '#fef3c7'}
            stroke="#d97706"
            strokeWidth="1.5"
          />
          <line x1="150" y1="125" x2="150" y2="185" stroke="#475569" strokeWidth="2" />
          <line x1="162" y1="125" x2="162" y2="185" stroke="#475569" strokeWidth="2" />
          <line x1="174" y1="125" x2="174" y2="185" stroke="#475569" strokeWidth="2" />
          <text x="162" y="110" textAnchor="middle" fill="#92400e" fontSize="8" fontWeight="bold">
            カトラリー
          </text>
          <text x="162" y="195" textAnchor="middle" fill="#92400e" fontSize="7">
            (柄を上に)
          </text>
        </g>

        {/* Station 2: Cold Appetizers & Salad */}
        <g 
          onClick={() => onSelectItem('bf-coldstation')}
          className="cursor-pointer hover:opacity-90"
        >
          <rect
            x="195"
            y="105"
            width="100"
            height="105"
            rx="6"
            fill={selectedItemId === 'bf-coldstation' ? '#fed7aa' : '#ecfdf5'}
            stroke={selectedItemId === 'bf-coldstation' ? '#b45309' : '#059669'}
            strokeWidth="2"
          />
          <ellipse cx="245" cy="140" rx="36" ry="22" fill="#d1fae5" stroke="#10b981" />
          <text x="245" y="142" textAnchor="middle" fill="#065f46" fontSize="8" fontWeight="bold">
            冷製・サラダバー
          </text>
          <text x="245" y="195" textAnchor="middle" fill="#047857" fontSize="9" fontWeight="bold">
            ② 冷製前菜
          </text>
        </g>

        {/* Station 3: Soup & Bread */}
        <g 
          onClick={() => onSelectItem('bf-soupstation')}
          className="cursor-pointer hover:opacity-90"
        >
          <rect
            x="305"
            y="105"
            width="80"
            height="105"
            rx="6"
            fill={selectedItemId === 'bf-soupstation' ? '#fed7aa' : '#fffbeb'}
            stroke="#d97706"
            strokeWidth="2"
          />
          <circle cx="345" cy="140" r="22" fill="#fde68a" stroke="#f59e0b" />
          <text x="345" y="142" textAnchor="middle" fill="#78350f" fontSize="8" fontWeight="bold">
            スープケトル
          </text>
          <text x="345" y="195" textAnchor="middle" fill="#b45309" fontSize="9" fontWeight="bold">
            ③ スープ＆パン
          </text>
        </g>

        {/* Station 4: Chafing Dishes (Hot Entrees) */}
        <g 
          onClick={() => onSelectItem('bf-chafing')}
          className="cursor-pointer hover:opacity-90"
        >
          <rect
            x="395"
            y="105"
            width="145"
            height="105"
            rx="6"
            fill={selectedItemId === 'bf-chafing' ? '#fed7aa' : '#fff1f2'}
            stroke={selectedItemId === 'bf-chafing' ? '#b45309' : '#e11d48'}
            strokeWidth="2"
          />
          {/* 2 Chafing Dishes */}
          <rect x="405" y="120" width="58" height="42" rx="4" fill="#ffffff" stroke="#e11d48" strokeWidth="1.5" />
          <rect x="470" y="120" width="58" height="42" rx="4" fill="#ffffff" stroke="#e11d48" strokeWidth="1.5" />
          <text x="434" y="144" textAnchor="middle" fill="#9f1239" fontSize="8" fontWeight="bold">
            魚ポワレ
          </text>
          <text x="499" y="144" textAnchor="middle" fill="#9f1239" fontSize="8" fontWeight="bold">
            パスタ等
          </text>
          <text x="467" y="195" textAnchor="middle" fill="#be123c" fontSize="9" fontWeight="bold">
            ④ チェーフィング(温製)
          </text>
        </g>

        {/* Station 5: Live Carving (Roast Beef) */}
        <g 
          onClick={() => onSelectItem('bf-carving')}
          className="cursor-pointer hover:opacity-90"
        >
          <rect
            x="550"
            y="105"
            width="90"
            height="105"
            rx="6"
            fill={selectedItemId === 'bf-carving' ? '#fed7aa' : '#fdf2f8'}
            stroke={selectedItemId === 'bf-carving' ? '#b45309' : '#db2777'}
            strokeWidth="2"
          />
          {/* Heat lamp & Board */}
          <rect x="560" y="125" width="70" height="35" rx="3" fill="#ffffff" stroke="#be185d" />
          <circle cx="595" cy="115" r="8" fill="#fbcfe8" stroke="#db2777" />
          <text x="595" y="144" textAnchor="middle" fill="#9d174d" fontSize="8" fontWeight="bold">
            ローストビーフ
          </text>
          <text x="595" y="195" textAnchor="middle" fill="#be185d" fontSize="9" fontWeight="bold">
            ⑤ シェフ実演
          </text>
        </g>

        {/* Station 6: Dessert Tower */}
        <g 
          onClick={() => onSelectItem('bf-dessert')}
          className="cursor-pointer hover:opacity-90"
        >
          <rect
            x="650"
            y="105"
            width="75"
            height="105"
            rx="6"
            fill={selectedItemId === 'bf-dessert' ? '#fed7aa' : '#f5f3ff'}
            stroke={selectedItemId === 'bf-dessert' ? '#b45309' : '#7c3aed'}
            strokeWidth="2"
          />
          <circle cx="687" cy="140" r="22" fill="#ede9fe" stroke="#8b5cf6" />
          <text x="687" y="142" textAnchor="middle" fill="#5b21b6" fontSize="8" fontWeight="bold">
            ガトー/フルーツ
          </text>
          <text x="687" y="195" textAnchor="middle" fill="#6d28d9" fontSize="9" fontWeight="bold">
            ⑥ デザート
          </text>
        </g>

        {/* Station 7: Beverage Station (Independent) */}
        <g 
          onClick={() => onSelectItem('bf-drinkbar')}
          className="cursor-pointer hover:opacity-90"
        >
          <rect
            x="735"
            y="105"
            width="65"
            height="105"
            rx="6"
            fill={selectedItemId === 'bf-drinkbar' ? '#fed7aa' : '#f0fdfa'}
            stroke="#0d9488"
            strokeWidth="2"
          />
          <rect x="745" y="125" width="45" height="35" rx="3" fill="#ffffff" stroke="#0f766e" />
          <text x="767" y="144" textAnchor="middle" fill="#115e59" fontSize="8" fontWeight="bold">
            珈琲/ワイン
          </text>
          <text x="767" y="195" textAnchor="middle" fill="#0f766e" fontSize="9" fontWeight="bold">
            ⑦ 出口・飲物
          </text>
        </g>

        {/* Passage Space Label */}
        {showRulerGuide && (
          <g>
            <rect x="40" y="240" width="770" height="24" fill="#e2e8f0" rx="4" />
            <text x="425" y="256" textAnchor="middle" fill="#475569" fontSize="10" fontWeight="bold">
              ↔ 通路幅：2.0m以上確保（ゲスト渋滞・すれ違い防止）
            </text>
          </g>
        )}

        {/* LOWER SECTION: GUEST ROUND TABLE */}
        <g 
          onClick={() => onSelectItem('bf-guesttable')}
          className="cursor-pointer hover:opacity-95"
        >
          {/* Round Table (Center: cx=425, cy=385) */}
          <circle
            cx="425"
            cy="385"
            r="85"
            fill="#ffffff"
            stroke={selectedItemId === 'bf-guesttable' ? '#b45309' : '#334155'}
            strokeWidth={selectedItemId === 'bf-guesttable' ? 4 : 2}
          />
          {/* Table Center Flower & Number */}
          <circle cx="425" cy="385" r="22" fill="#fef2f2" stroke="#f43f5e" />
          <text x="425" y="382" textAnchor="middle" fill="#9f1239" fontSize="8" fontWeight="bold">
            卓上装花
          </text>
          <text x="425" y="394" textAnchor="middle" fill="#0f172a" fontSize="8" fontWeight="bold">
            卓番 A
          </text>

          {/* 6 Guest Place Settings around Table */}
          {/* Guest 1 (Top) */}
          <circle cx="425" cy="320" r="10" fill="#f1f5f9" stroke="#94a3b8" />
          {/* Guest 2 (Top Right) */}
          <circle cx="480" cy="345" r="10" fill="#f1f5f9" stroke="#94a3b8" />
          {/* Guest 3 (Bottom Right) */}
          <circle cx="480" cy="425" r="10" fill="#f1f5f9" stroke="#94a3b8" />
          {/* Guest 4 (Bottom) */}
          <circle cx="425" cy="450" r="10" fill="#f1f5f9" stroke="#94a3b8" />
          {/* Guest 5 (Bottom Left) */}
          <circle cx="370" cy="425" r="10" fill="#f1f5f9" stroke="#94a3b8" />
          {/* Guest 6 (Top Left) */}
          <circle cx="370" cy="345" r="10" fill="#f1f5f9" stroke="#94a3b8" />

          <text x="425" y="485" textAnchor="middle" fill="#1e293b" fontSize="11" fontWeight="bold">
            着席・立食ゲスト卓（カトラリーレスト・乾杯グラス・卓番号）
          </text>
        </g>

        {/* Separate Bussing Station (Return Table) */}
        <rect x="700" y="340" width="110" height="90" rx="6" fill="#f8fafc" stroke="#dc2626" strokeWidth="1.5" strokeDasharray="4 2" />
        <text x="755" y="370" textAnchor="middle" fill="#991b1b" fontSize="9" fontWeight="bold">
          下膳台（バッシング）
        </text>
        <text x="755" y="388" textAnchor="middle" fill="#b91c1c" fontSize="8">
          料理台と隔離設置
        </text>
        <text x="755" y="402" textAnchor="middle" fill="#7f1d1d" fontSize="7">
          (不潔感・交錯防止)
        </text>
      </svg>
    </div>
  );
};
