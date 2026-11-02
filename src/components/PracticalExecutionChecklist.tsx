import React, { useState, useMemo } from 'react';
import { 
  PACKING_CHECKLIST_DATA, 
  YUINOH_ITEMS_MASTER, 
  RELATIVE_KANJI_RULES, 
  TIP_STAFF_GUIDELINES, 
  KAGAMI_BIRAKI_STEPS, 
  RECEPTION_SECURITY_RULES, 
  VIP_PROTOCOL_RULES,
  VENUE_WALKTHROUGH_CHECKLIST_DATA,
  VenueWalkthroughCheckItem,
  PackingCheckItem
} from '../data/practicalChecklistData';
import { 
  AlertOctagon, 
  AlertTriangle, 
  Award, 
  BedDouble,
  Bell, 
  Briefcase, 
  Building2,
  Camera,
  Check, 
  CheckCircle2, 
  ChevronRight, 
  Church,
  Clock, 
  Coins, 
  Compass,
  Crown, 
  DoorClosed,
  ExternalLink, 
  FileCheck2, 
  FileText, 
  Filter,
  Flame, 
  Gift, 
  GraduationCap, 
  Heart, 
  HelpCircle, 
  Info, 
  Key,
  Layers,
  Lock, 
  Luggage, 
  MessageSquare,
  PackageCheck,
  Printer, 
  RotateCcw, 
  Search, 
  ShieldAlert, 
  ShieldCheck, 
  Sparkles, 
  UserCheck, 
  Users, 
  UtensilsCrossed,
  Wine 
} from 'lucide-react';

interface PracticalExecutionChecklistProps {
  initialTab?: 'venue_walkthrough' | 'first_stage' | 'packing' | 'yuinoh' | 'relatives' | 'tips' | 'reception' | 'kagami';
}

export const PracticalExecutionChecklist: React.FC<PracticalExecutionChecklistProps> = ({ initialTab }) => {
  const [activeTab, setActiveTab] = useState<
    'venue_walkthrough' | 'first_stage' | 'packing' | 'yuinoh' | 'relatives' | 'tips' | 'reception' | 'kagami'
  >(initialTab || 'venue_walkthrough');

  // ==========================================
  // Walkthrough Checklist State (当日現場巡回)
  // ==========================================
  const [checkedWalkthroughItems, setCheckedWalkthroughItems] = useState<Record<string, boolean>>({});
  const [ceremonyFilter, setCeremonyFilter] = useState<'all' | 'shinto' | 'chapel' | 'civil'>('all');
  const [walkthroughSearch, setWalkthroughSearch] = useState<string>('');
  const [selectedWalkthroughStep, setSelectedWalkthroughStep] = useState<number | 'all'>('all');

  const toggleWalkthroughItem = (itemKey: string) => {
    setCheckedWalkthroughItems(prev => ({
      ...prev,
      [itemKey]: !prev[itemKey]
    }));
  };

  const handleCheckAllStep = (step: VenueWalkthroughCheckItem, check: boolean) => {
    const updated = { ...checkedWalkthroughItems };
    step.targetCheckItems.forEach((_, idx) => {
      updated[`${step.id}-target-${idx}`] = check;
    });
    if (step.ceremonySpecific) {
      ['oath', 'threeCups', 'sacredSake', 'sacredBranch', 'weddingRings'].forEach(k => {
        updated[`${step.id}-shinto-${k}`] = check;
      });
      ['hymn', 'pastor', 'musicians', 'motherVeil', 'weddingRings'].forEach(k => {
        updated[`${step.id}-chapel-${k}`] = check;
      });
      ['moderator', 'weddingRings', 'oath'].forEach(k => {
        updated[`${step.id}-civil-${k}`] = check;
      });
    }
    setCheckedWalkthroughItems(updated);
  };

  const handleCheckAllWalkthrough = (check: boolean) => {
    const updated = { ...checkedWalkthroughItems };
    VENUE_WALKTHROUGH_CHECKLIST_DATA.forEach(step => {
      step.targetCheckItems.forEach((_, idx) => {
        updated[`${step.id}-target-${idx}`] = check;
      });
      if (step.ceremonySpecific) {
        ['oath', 'threeCups', 'sacredSake', 'sacredBranch', 'weddingRings'].forEach(k => {
          updated[`${step.id}-shinto-${k}`] = check;
        });
        ['hymn', 'pastor', 'musicians', 'motherVeil', 'weddingRings'].forEach(k => {
          updated[`${step.id}-chapel-${k}`] = check;
        });
        ['moderator', 'weddingRings', 'oath'].forEach(k => {
          updated[`${step.id}-civil-${k}`] = check;
        });
      }
    });
    setCheckedWalkthroughItems(updated);
  };

  // Walkthrough metrics
  const totalWalkthroughKeys = useMemo(() => {
    const keys: string[] = [];
    VENUE_WALKTHROUGH_CHECKLIST_DATA.forEach(step => {
      step.targetCheckItems.forEach((_, idx) => {
        keys.push(`${step.id}-target-${idx}`);
      });
      if (step.ceremonySpecific) {
        ['oath', 'threeCups', 'sacredSake', 'sacredBranch', 'weddingRings'].forEach(k => {
          keys.push(`${step.id}-shinto-${k}`);
        });
        ['hymn', 'pastor', 'musicians', 'motherVeil', 'weddingRings'].forEach(k => {
          keys.push(`${step.id}-chapel-${k}`);
        });
        ['moderator', 'weddingRings', 'oath'].forEach(k => {
          keys.push(`${step.id}-civil-${k}`);
        });
      }
    });
    return keys;
  }, []);

  const walkthroughCheckedCount = useMemo(() => {
    return totalWalkthroughKeys.filter(k => checkedWalkthroughItems[k]).length;
  }, [totalWalkthroughKeys, checkedWalkthroughItems]);

  const walkthroughPct = Math.round((walkthroughCheckedCount / (totalWalkthroughKeys.length || 1)) * 100);

  const completedStepCount = useMemo(() => {
    return VENUE_WALKTHROUGH_CHECKLIST_DATA.filter(step => {
      return step.targetCheckItems.every((_, idx) => checkedWalkthroughItems[`${step.id}-target-${idx}`]);
    }).length;
  }, [checkedWalkthroughItems]);

  const filteredWalkthroughSteps = useMemo(() => {
    return VENUE_WALKTHROUGH_CHECKLIST_DATA.filter(step => {
      const matchStep = selectedWalkthroughStep === 'all' || step.stepNumber === selectedWalkthroughStep;
      const matchQuery = !walkthroughSearch || 
        step.zoneName.toLowerCase().includes(walkthroughSearch.toLowerCase()) ||
        step.checkpointName.toLowerCase().includes(walkthroughSearch.toLowerCase()) ||
        step.dangerRisk.toLowerCase().includes(walkthroughSearch.toLowerCase()) ||
        step.targetCheckItems.some(item => 
          item.label.toLowerCase().includes(walkthroughSearch.toLowerCase()) ||
          item.description.toLowerCase().includes(walkthroughSearch.toLowerCase())
        );
      return matchStep && matchQuery;
    });
  }, [selectedWalkthroughStep, walkthroughSearch]);

  // ==========================================
  // Packing Checklist State (持込小物点検)
  // ==========================================
  const [checkedPackingIds, setCheckedPackingIds] = useState<Record<string, boolean>>({});
  const [packingCategoryFilter, setPackingCategoryFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Interactive Relative Tester
  const [relativeTarget, setRelativeTarget] = useState<'parent_older_bro' | 'parent_older_sis' | 'parent_younger_bro' | 'parent_younger_sis' | 'cousin_older' | 'cousin_younger'>('parent_older_bro');

  const togglePackingCheck = (id: string) => {
    setCheckedPackingIds(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const handleCheckAllPacking = (check: boolean) => {
    const updated = { ...checkedPackingIds };
    PACKING_CHECKLIST_DATA.forEach(item => {
      updated[item.id] = check;
    });
    setCheckedPackingIds(updated);
  };

  const packingCheckedCount = PACKING_CHECKLIST_DATA.filter(item => checkedPackingIds[item.id]).length;
  const packingProgressPct = Math.round((packingCheckedCount / PACKING_CHECKLIST_DATA.length) * 100);

  const filteredPackingItems = useMemo(() => {
    return PACKING_CHECKLIST_DATA.filter(item => {
      const matchCat = packingCategoryFilter === 'all' || item.category === packingCategoryFilter;
      const matchQuery = !searchQuery || 
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.detailNote.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.heroineRisk.toLowerCase().includes(searchQuery.toLowerCase());
      return matchCat && matchQuery;
    });
  }, [packingCategoryFilter, searchQuery]);

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-8">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-stone-900 via-rose-950 to-amber-950 text-white p-6 rounded-3xl shadow-lg border border-amber-900/40 relative overflow-hidden">
        <div className="relative z-10 space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-400 text-stone-950 rounded-full text-xs font-extrabold shadow-sm">
                <ShieldCheck className="w-4 h-4 text-stone-950" />
                国家資格の言葉遊びを完全脱却・実務直結
              </span>
              <span className="text-xs text-amber-200/90 font-medium">
                婚礼総合プロデューサー 現場ミスゼロ執行マニュアル
              </span>
            </div>

            <button
              onClick={() => window.print()}
              className="no-print inline-flex items-center gap-1.5 px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-xl text-xs font-bold border border-white/20 transition-all backdrop-blur-xs"
            >
              <Printer className="w-4 h-4 text-amber-300" />
              <span>現場携帯用シート印刷</span>
            </button>
          </div>

          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold font-serif-jp tracking-tight text-white flex items-center gap-2.5">
              <span>現場超実務・当日の忘れ物＆ミス防止 総合チェックリスト</span>
            </h1>
            <p className="text-stone-300 text-xs sm:text-sm mt-1.5 max-w-4xl leading-relaxed">
              プランナー資格試験の机上の言葉遊びでは現場は回りません。式場到着順の現場巡回点検（入口看板・親族控室・来賓控室・披露宴会場・挙式場3大様式・写真室・スタッフ打ち合わせ・引き出物・受付金庫・宿泊部屋）、当日持込小物、伯父と叔父の親族肩書、心付け相場、鏡開き実務など、<strong>現場で花嫁を絶対に失敗させない必須実務</strong>を完全体系化しました。
            </p>
          </div>
        </div>
      </div>

      {/* Main Tabs Navigation */}
      <div className="no-print flex flex-wrap gap-2 border-b border-stone-200 pb-3">
        {[
          { 
            id: 'venue_walkthrough', 
            label: '⚡ 当日現場動線順 最終点検リスト', 
            icon: Compass, 
            badge: `${walkthroughCheckedCount}/${totalWalkthroughKeys.length} (${walkthroughPct}%)`,
            isHighlight: true 
          },
          { id: 'first_stage', label: '① 第1工程 衣裳争奪＆美容・前撮り', icon: Sparkles },
          { id: 'packing', label: '② 当日忘れ物ゼロ 持込小物リスト', icon: Luggage, badge: `${packingCheckedCount}/${PACKING_CHECKLIST_DATA.length}` },
          { id: 'yuinoh', label: '③ 結納・祝儀品 目録（五品・七品・九品）', icon: Gift },
          { id: 'relatives', label: '④ 親族肩書（伯父 vs 叔父）＆祝儀袋', icon: Users },
          { id: 'tips', label: '⑤ 心付け・お車代 相場＆渡し方', icon: Coins },
          { id: 'reception', label: '⑥ 受付防犯（金庫リレー）＆ VIP動線', icon: Lock },
          { id: 'kagami', label: '⑦ 伝統演出 鏡開きの前日割り実務', icon: Flame }
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as typeof activeTab)}
              className={`px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
                isActive
                  ? tab.isHighlight
                    ? 'bg-gradient-to-r from-amber-800 to-amber-900 text-white shadow-md ring-2 ring-amber-400'
                    : 'bg-amber-900 text-white shadow-md ring-2 ring-amber-500/50'
                  : tab.isHighlight
                    ? 'bg-amber-50 hover:bg-amber-100 text-amber-950 border-2 border-amber-300 shadow-xs'
                    : 'bg-white hover:bg-stone-100 text-stone-700 border border-stone-200 shadow-xs'
              }`}
            >
              <Icon className={`w-4 h-4 ${isActive ? 'text-amber-300' : tab.isHighlight ? 'text-amber-700' : 'text-stone-500'}`} />
              <span>{tab.label}</span>
              {tab.badge && (
                <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-mono ${
                  isActive 
                    ? 'bg-amber-950 text-amber-200' 
                    : tab.isHighlight
                      ? 'bg-amber-200 text-amber-900 font-bold'
                      : 'bg-stone-100 text-stone-600'
                }`}>
                  {tab.badge}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* ========================================================================= */}
      {/* TAB 0: 【新設・必修】当日現場動線順 最終点検チェックリスト（10大エリア巡回）  */}
      {/* ========================================================================= */}
      {activeTab === 'venue_walkthrough' && (
        <div className="space-y-6">
          {/* Top Operational Dashboard */}
          <div className="bg-white rounded-2xl border-2 border-amber-300/80 p-6 shadow-sm space-y-5">
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-stone-100 pb-4">
              <div>
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-0.5 bg-amber-600 text-white rounded text-[11px] font-bold">
                    第4工程 最終執行カラム
                  </span>
                  <span className="text-xs text-amber-900 font-bold">
                    当日現場到着順・10大エリア完全巡回チェックリスト
                  </span>
                </div>
                <h2 className="text-lg sm:text-xl font-bold font-serif-jp text-stone-900 mt-1 flex items-center gap-2">
                  <Compass className="w-5 h-5 text-amber-700" />
                  <span>当日現場の順番に沿った指差し点検・ゼロミス巡回シート</span>
                </h2>
                <p className="text-xs text-stone-600 mt-1 max-w-3xl leading-relaxed">
                  ホテル・式場への朝の到着から開宴直前までの<strong>「入口看板 → 親族控室 → 来賓控室 → 披露宴会場 → 挙式場（神前・チャペル・人前） → 写真室 → スタッフ打ち合わせ → 引き出物 → 受付金庫 → 宿泊部屋」</strong>という実際の物理動線に沿って点検するプロデューサー最終チェックリストです。
                </p>
              </div>

              {/* Progress Counters & Actions */}
              <div className="flex flex-col sm:flex-row items-end sm:items-center gap-3">
                <div className="text-right">
                  <div className="text-xs text-stone-500 font-medium">現場巡回 完了ステータス</div>
                  <div className="text-base font-bold font-mono text-stone-900 flex items-center gap-1.5 justify-end">
                    <span className="text-amber-800">{completedStepCount} / 10 エリア点検済</span>
                    <span className="text-stone-400">|</span>
                    <span className="text-emerald-700">{walkthroughCheckedCount} / {totalWalkthroughKeys.length} 項目 ({walkthroughPct}%)</span>
                  </div>
                </div>

                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => handleCheckAllWalkthrough(true)}
                    className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-bold transition-colors shadow-xs"
                  >
                    全10大工程 完了にする
                  </button>
                  <button
                    onClick={() => handleCheckAllWalkthrough(false)}
                    className="px-2.5 py-1.5 bg-stone-100 hover:bg-stone-200 text-stone-700 rounded-lg text-xs font-medium transition-colors"
                  >
                    リセット
                  </button>
                  <button
                    onClick={() => window.print()}
                    className="no-print px-2.5 py-1.5 bg-amber-100 hover:bg-amber-200 text-amber-900 rounded-lg text-xs font-bold transition-colors flex items-center gap-1"
                  >
                    <Printer className="w-3.5 h-3.5" />
                    <span>A4印刷</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Overall Progress Bar */}
            <div className="space-y-1">
              <div className="w-full bg-stone-100 rounded-full h-2.5 overflow-hidden">
                <div 
                  className="bg-gradient-to-r from-amber-600 to-emerald-600 h-2.5 rounded-full transition-all duration-300"
                  style={{ width: `${walkthroughPct}%` }}
                />
              </div>
            </div>

            {/* Quick Filter Bar: Ceremony Type & Step Selector */}
            <div className="no-print flex flex-wrap items-center justify-between gap-3 pt-1">
              <div className="flex flex-wrap items-center gap-2 text-xs">
                <span className="text-stone-500 font-bold flex items-center gap-1">
                  <Church className="w-3.5 h-3.5 text-stone-600" />
                  挙式場（Step 5）表示切替:
                </span>
                {[
                  { id: 'all', label: '全挙式スタイル表示' },
                  { id: 'shinto', label: '⛩️ 神前式（指輪・三献・神酒・榊）' },
                  { id: 'chapel', label: '⛪ チャペル式（指輪・牧師・ベール母）' },
                  { id: 'civil', label: '🕊️ 人前式（指輪・司会・誓い）' }
                ].map(c => (
                  <button
                    key={c.id}
                    onClick={() => setCeremonyFilter(c.id as typeof ceremonyFilter)}
                    className={`px-3 py-1 rounded-lg font-medium transition-colors ${
                      ceremonyFilter === c.id
                        ? 'bg-amber-800 text-white font-bold shadow-xs'
                        : 'bg-stone-100 hover:bg-stone-200 text-stone-700'
                    }`}
                  >
                    {c.label}
                  </button>
                ))}
              </div>

              {/* Step Quick Jumper & Search */}
              <div className="flex items-center gap-2">
                <div className="relative w-48 sm:w-60">
                  <Search className="w-3.5 h-3.5 text-stone-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    placeholder="現場エリア・品目検索..."
                    value={walkthroughSearch}
                    onChange={(e) => setWalkthroughSearch(e.target.value)}
                    className="w-full pl-8 pr-3 py-1 text-xs bg-stone-50 border border-stone-200 rounded-lg focus:outline-amber-600"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* 10 Sequential On-Site Inspection Cards */}
          <div className="space-y-6">
            {filteredWalkthroughSteps.map((step) => {
              const allTargetsChecked = step.targetCheckItems.every((_, idx) => checkedWalkthroughItems[`${step.id}-target-${idx}`]);

              // Icon mapping for 10 steps
              const getStepIcon = (code: string) => {
                switch(code) {
                  case 'ENTRANCE': return DoorClosed;
                  case 'FAMILY_ROOM': return Users;
                  case 'GUEST_ROOM': return Wine;
                  case 'BANQUET_HALL': return UtensilsCrossed;
                  case 'CEREMONY': return Church;
                  case 'PHOTO_STUDIO': return Camera;
                  case 'STAFF_BRIEFING': return MessageSquare;
                  case 'GIFTS_HIKIDEMONO': return Gift;
                  case 'RECEPTION_DESK': return Lock;
                  case 'STAY_ROOM': return BedDouble;
                  default: return CheckCircle2;
                }
              };

              const StepIcon = getStepIcon(step.zoneCode);

              return (
                <div 
                  key={step.id} 
                  className={`bg-white rounded-2xl border transition-all overflow-hidden ${
                    allTargetsChecked 
                      ? 'border-emerald-300 shadow-xs' 
                      : 'border-stone-200 hover:border-amber-300 shadow-sm'
                  }`}
                >
                  {/* Step Header Bar */}
                  <div className={`p-4 sm:p-5 border-b flex flex-wrap items-center justify-between gap-3 ${
                    allTargetsChecked ? 'bg-emerald-50/50 border-emerald-200' : 'bg-stone-50 border-stone-100'
                  }`}>
                    <div className="flex items-center gap-3">
                      <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 font-extrabold text-sm ${
                        allTargetsChecked 
                          ? 'bg-emerald-600 text-white' 
                          : 'bg-amber-900 text-amber-200'
                      }`}>
                        {step.stepNumber}
                      </div>

                      <div>
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="text-xs font-bold text-amber-900 flex items-center gap-1">
                            <StepIcon className="w-3.5 h-3.5 text-amber-700" />
                            {step.zoneName}
                          </span>
                          <span className="text-[11px] px-2 py-0.5 rounded font-mono bg-stone-200/80 text-stone-700 flex items-center gap-1">
                            <Clock className="w-3 h-3 text-stone-500" />
                            {step.timing}
                          </span>
                          <span className="text-[11px] px-2 py-0.5 rounded bg-amber-100 text-amber-900 font-medium">
                            立会責任者：{step.responsibleStaff}
                          </span>
                        </div>
                        <h3 className="text-base font-bold font-serif-jp text-stone-900 mt-0.5">
                          {step.checkpointName}
                        </h3>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleCheckAllStep(step, !allTargetsChecked)}
                        className={`px-3 py-1 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
                          allTargetsChecked
                            ? 'bg-emerald-100 text-emerald-800 hover:bg-emerald-200'
                            : 'bg-stone-200/80 text-stone-700 hover:bg-amber-100 hover:text-amber-900'
                        }`}
                      >
                        <Check className="w-3.5 h-3.5" />
                        <span>{allTargetsChecked ? 'エリア全項目点検済' : 'このエリアを一括点検'}</span>
                      </button>
                    </div>
                  </div>

                  {/* Body: Checkable Items */}
                  <div className="p-4 sm:p-6 space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {step.targetCheckItems.map((item, idx) => {
                        const itemKey = `${step.id}-target-${idx}`;
                        const isChecked = !!checkedWalkthroughItems[itemKey];

                        return (
                          <div
                            key={idx}
                            onClick={() => toggleWalkthroughItem(itemKey)}
                            className={`p-3.5 rounded-xl border transition-all cursor-pointer flex items-start gap-3 ${
                              isChecked
                                ? 'bg-emerald-50/60 border-emerald-300'
                                : 'bg-stone-50/40 hover:bg-white border-stone-200 hover:border-amber-300'
                            }`}
                          >
                            <div className={`w-5 h-5 rounded flex items-center justify-center shrink-0 mt-0.5 border transition-all ${
                              isChecked 
                                ? 'bg-emerald-600 border-emerald-600 text-white' 
                                : 'border-stone-300 bg-white hover:border-amber-500'
                            }`}>
                              {isChecked && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                            </div>

                            <div className="space-y-1 text-xs">
                              <h4 className={`font-bold ${isChecked ? 'text-emerald-950 line-through opacity-80' : 'text-stone-900'}`}>
                                {item.label}
                              </h4>
                              <p className="text-stone-600 leading-relaxed">
                                {item.description}
                              </p>
                              <div className="text-[11px] text-amber-900 bg-amber-50/80 px-2 py-0.5 rounded border border-amber-200/60 font-medium inline-block mt-0.5">
                                💡 要諦: {item.criticalPoint}
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>

                    {/* Step 5 Special: Deep-dive 3 Ceremony Styles (神前式・チャペル式・人前式) */}
                    {step.stepNumber === 5 && step.ceremonySpecific && (
                      <div className="pt-2 border-t border-stone-200 space-y-4">
                        <div className="flex items-center justify-between">
                          <h4 className="text-xs font-bold text-stone-900 uppercase tracking-wider flex items-center gap-1.5">
                            <Church className="w-4 h-4 text-purple-700" />
                            <span>挙式3大様式別 儀礼・神事・重要人物 必修点検項目</span>
                          </h4>
                          <span className="text-[11px] text-purple-900 font-bold bg-purple-50 px-2 py-0.5 rounded border border-purple-200">
                            ※神前式・チャペル式・人前式いずれも「結婚指輪」は最重要点検
                          </span>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                          {/* 1. 神前式 */}
                          {(ceremonyFilter === 'all' || ceremonyFilter === 'shinto') && (
                            <div className="bg-red-50/40 border border-red-200 rounded-xl p-3.5 space-y-2.5">
                              <div className="flex items-center justify-between border-b border-red-200 pb-1.5">
                                <span className="font-bold text-xs text-red-950 flex items-center gap-1">
                                  <span>⛩️</span>
                                  <span>神前式（神道神事）</span>
                                </span>
                                <span className="text-[10px] font-bold text-red-700 bg-red-100 px-1.5 py-0.5 rounded">
                                  5大必須品
                                </span>
                              </div>

                              <div className="space-y-2 text-xs">
                                {[
                                  { key: 'oath', title: '誓いの言葉（誓詞）', desc: step.ceremonySpecific.shinto.oath },
                                  { key: 'threeCups', title: '三献の儀（三三九度）', desc: step.ceremonySpecific.shinto.threeCups },
                                  { key: 'sacredSake', title: '神酒（御神酒）', desc: step.ceremonySpecific.shinto.sacredSake },
                                  { key: 'sacredBranch', title: '榊（玉串奉奠）', desc: step.ceremonySpecific.shinto.sacredBranch },
                                  { key: 'weddingRings', title: '★結婚指輪（神前式も必須！）', desc: step.ceremonySpecific.shinto.weddingRings, isRing: true }
                                ].map((sub) => {
                                  const subKey = `${step.id}-shinto-${sub.key}`;
                                  const isChecked = !!checkedWalkthroughItems[subKey];
                                  return (
                                    <div
                                      key={sub.key}
                                      onClick={() => toggleWalkthroughItem(subKey)}
                                      className={`p-2 rounded-lg border cursor-pointer transition-all ${
                                        isChecked
                                          ? 'bg-emerald-50 border-emerald-300'
                                          : sub.isRing
                                            ? 'bg-amber-100/60 border-amber-300 hover:bg-white'
                                            : 'bg-white border-red-100 hover:border-red-300'
                                      }`}
                                    >
                                      <div className="flex items-start gap-2">
                                        <div className={`w-4 h-4 rounded shrink-0 mt-0.5 border flex items-center justify-center text-[10px] ${
                                          isChecked ? 'bg-emerald-600 border-emerald-600 text-white' : 'border-stone-300 bg-white'
                                        }`}>
                                          {isChecked && <Check className="w-3 h-3 stroke-[3]" />}
                                        </div>
                                        <div>
                                          <div className={`font-bold text-[11px] ${isChecked ? 'text-emerald-900 line-through' : sub.isRing ? 'text-amber-950 font-black' : 'text-stone-900'}`}>
                                            {sub.title}
                                          </div>
                                          <p className="text-[11px] text-stone-600 leading-tight mt-0.5">
                                            {sub.desc}
                                          </p>
                                        </div>
                                      </div>
                                    </div>
                                  );
                                })}
                              </div>
                            </div>
                          )}

                          {/* 2. チャペル式 */}
                          {(ceremonyFilter === 'all' || ceremonyFilter === 'chapel') && (
                            <div className="bg-blue-50/40 border border-blue-200 rounded-xl p-3.5 space-y-2.5">
                              <div className="flex items-center justify-between border-b border-blue-200 pb-1.5">
                                <span className="font-bold text-xs text-blue-950 flex items-center gap-1">
                                  <span>⛪</span>
                                  <span>チャペル式（キリスト教式）</span>
                                </span>
                                <span className="text-[10px] font-bold text-blue-700 bg-blue-100 px-1.5 py-0.5 rounded">
                                  5大必須品
                                </span>
                              </div>

                              <div className="space-y-2 text-xs">
                                {[
                                  { key: 'hymn', title: '賛美歌（式次第・楽譜）', desc: step.ceremonySpecific.chapel.hymn },
                                  { key: 'pastor', title: '牧師（聖書・宣誓確認）', desc: step.ceremonySpecific.chapel.pastor },
                                  { key: 'musicians', title: '音楽奏者（オルガン/聖歌隊）', desc: step.ceremonySpecific.chapel.musicians },
                                  { key: 'motherVeil', title: 'ベールを引く母（ベールダウン）', desc: step.ceremonySpecific.chapel.motherVeil },
                                  { key: 'weddingRings', title: '★結婚指輪（リングピロー）', desc: step.ceremonySpecific.chapel.weddingRings, isRing: true }
                                ].map((sub) => {
                                  const subKey = `${step.id}-chapel-${sub.key}`;
                                  const isChecked = !!checkedWalkthroughItems[subKey];
                                  return (
                                    <div
                                      key={sub.key}
                                      onClick={() => toggleWalkthroughItem(subKey)}
                                      className={`p-2 rounded-lg border cursor-pointer transition-all ${
                                        isChecked
                                          ? 'bg-emerald-50 border-emerald-300'
                                          : sub.isRing
                                            ? 'bg-amber-100/60 border-amber-300 hover:bg-white'
                                            : 'bg-white border-blue-100 hover:border-blue-300'
                                      }`}
                                    >
                                      <div className="flex items-start gap-2">
                                        <div className={`w-4 h-4 rounded shrink-0 mt-0.5 border flex items-center justify-center text-[10px] ${
                                          isChecked ? 'bg-emerald-600 border-emerald-600 text-white' : 'border-stone-300 bg-white'
                                        }`}>
                                          {isChecked && <Check className="w-3 h-3 stroke-[3]" />}
                                        </div>
                                        <div>
                                          <div className={`font-bold text-[11px] ${isChecked ? 'text-emerald-900 line-through' : sub.isRing ? 'text-amber-950 font-black' : 'text-stone-900'}`}>
                                            {sub.title}
                                          </div>
                                          <p className="text-[11px] text-stone-600 leading-tight mt-0.5">
                                            {sub.desc}
                                          </p>
                                        </div>
                                      </div>
                                    </div>
                                  );
                                })}
                              </div>
                            </div>
                          )}

                          {/* 3. 人前式 */}
                          {(ceremonyFilter === 'all' || ceremonyFilter === 'civil') && (
                            <div className="bg-emerald-50/40 border border-emerald-200 rounded-xl p-3.5 space-y-2.5">
                              <div className="flex items-center justify-between border-b border-emerald-200 pb-1.5">
                                <span className="font-bold text-xs text-emerald-950 flex items-center gap-1">
                                  <span>🕊️</span>
                                  <span>人前式（シビルウェディング）</span>
                                </span>
                                <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100 px-1.5 py-0.5 rounded">
                                  3大必須品
                                </span>
                              </div>

                              <div className="space-y-2 text-xs">
                                {[
                                  { key: 'moderator', title: '司会者（開会・誓い問いかけ）', desc: step.ceremonySpecific.civil.moderator },
                                  { key: 'weddingRings', title: '★結婚指輪（リレーまたはピロー）', desc: step.ceremonySpecific.civil.weddingRings, isRing: true },
                                  { key: 'oath', title: '誓いの言葉（誓約書原本・署名）', desc: step.ceremonySpecific.civil.oath }
                                ].map((sub) => {
                                  const subKey = `${step.id}-civil-${sub.key}`;
                                  const isChecked = !!checkedWalkthroughItems[subKey];
                                  return (
                                    <div
                                      key={sub.key}
                                      onClick={() => toggleWalkthroughItem(subKey)}
                                      className={`p-2 rounded-lg border cursor-pointer transition-all ${
                                        isChecked
                                          ? 'bg-emerald-50 border-emerald-300'
                                          : sub.isRing
                                            ? 'bg-amber-100/60 border-amber-300 hover:bg-white'
                                            : 'bg-white border-emerald-100 hover:border-emerald-300'
                                      }`}
                                    >
                                      <div className="flex items-start gap-2">
                                        <div className={`w-4 h-4 rounded shrink-0 mt-0.5 border flex items-center justify-center text-[10px] ${
                                          isChecked ? 'bg-emerald-600 border-emerald-600 text-white' : 'border-stone-300 bg-white'
                                        }`}>
                                          {isChecked && <Check className="w-3 h-3 stroke-[3]" />}
                                        </div>
                                        <div>
                                          <div className={`font-bold text-[11px] ${isChecked ? 'text-emerald-900 line-through' : sub.isRing ? 'text-amber-950 font-black' : 'text-stone-900'}`}>
                                            {sub.title}
                                          </div>
                                          <p className="text-[11px] text-stone-600 leading-tight mt-0.5">
                                            {sub.desc}
                                          </p>
                                        </div>
                                      </div>
                                    </div>
                                  );
                                })}
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    )}

                    {/* Step Danger Risk & Fail-Safe Rule Boxes */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-1">
                      <div className="p-3 rounded-xl bg-rose-50/80 border border-rose-200 text-xs space-y-1">
                        <div className="font-bold text-rose-900 flex items-center gap-1.5">
                          <AlertTriangle className="w-3.5 h-3.5 text-rose-600 shrink-0" />
                          <span>重大事故リスク（ここを怠るとどうなるか）</span>
                        </div>
                        <p className="text-rose-800 leading-relaxed font-sans text-[11px]">
                          {step.dangerRisk}
                        </p>
                      </div>

                      <div className="p-3 rounded-xl bg-amber-50/80 border border-amber-200 text-xs space-y-1">
                        <div className="font-bold text-amber-950 flex items-center gap-1.5">
                          <ShieldCheck className="w-3.5 h-3.5 text-amber-700 shrink-0" />
                          <span>現場フェイルセーフ鉄則</span>
                        </div>
                        <p className="text-amber-900 leading-relaxed font-sans text-[11px]">
                          {step.failSafeRule}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 1: 第1工程 衣裳争奪＆美容・前撮り即決                                */}
      {/* ========================================================================= */}
      {activeTab === 'first_stage' && (
        <div className="space-y-6">
          <div className="bg-amber-50 border-2 border-amber-300 rounded-2xl p-6 shadow-sm space-y-4">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-600 text-white flex items-center justify-center shrink-0 font-bold text-lg">
                1
              </div>
              <div>
                <span className="text-xs font-bold text-amber-900 uppercase tracking-widest block">
                  PRODUCER GOLDEN RULE
                </span>
                <h2 className="text-xl font-bold font-serif-jp text-stone-900">
                  式場を決めたら「その足で直ちに衣装屋へ直行」しなければならない鉄則
                </h2>
                <p className="text-xs text-stone-600 mt-1 leading-relaxed">
                  一般のプランナーは「式場が決まってからゆっくり衣装を決めましょう」と言いますが、これは最大の怠慢です。人気の白無垢・色打掛・有名ブランドドレスは全国で各1着（1点モノ）しか存在せず、同じ挙式日の他家に予約を押さえられた瞬間に枠が完全に消滅します。
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
              <div className="bg-white p-4 rounded-xl border border-amber-200 space-y-2">
                <span className="text-xs font-bold text-rose-800 flex items-center gap-1.5">
                  <AlertOctagon className="w-4 h-4 text-rose-600" />
                  ステップ1: 直ちに衣裳店へ直行
                </span>
                <h3 className="text-sm font-bold text-stone-900">衣装枠の全国争奪戦を制す</h3>
                <p className="text-xs text-stone-600 leading-relaxed">
                  式場契約の同日または翌日には提携店および外部ドレスサロンへ試着予約。新婦の骨格診断・パーソナルカラーに合う本命衣装を最優先でキープ（仮押さえ）する。
                </p>
                <div className="text-[11px] text-rose-700 bg-rose-50 p-2 rounded border border-rose-100 font-medium">
                  ⚠️ 怠ると：妥協した似合わない衣装を着る羽目になり、花嫁が生涯消えない後悔を背負う。
                </div>
              </div>

              <div className="bg-white p-4 rounded-xl border border-amber-200 space-y-2">
                <span className="text-xs font-bold text-amber-800 flex items-center gap-1.5">
                  <UserCheck className="w-4 h-4 text-amber-600" />
                  ステップ2: 美容着付け・ヘアメイク即押さえ
                </span>
                <h3 className="text-sm font-bold text-stone-900">腕利きの専任アーティストを確保</h3>
                <p className="text-xs text-stone-600 leading-relaxed">
                  和装の花嫁着付け（補正・帯結び）やドレスヘアメイクは職人技。優れたアーティストは1日に1〜2組しか担当できないため、衣装決定と同時に即時指名・発注する。
                </p>
                <div className="text-[11px] text-amber-800 bg-amber-50 p-2 rounded border border-amber-100 font-medium">
                  ⚠️ 怠ると：新人スタッフが配属され、着崩れや希望と違うヘアセットで当日大泣きする事故に。
                </div>
              </div>

              <div className="bg-white p-4 rounded-xl border border-amber-200 space-y-2">
                <span className="text-xs font-bold text-blue-800 flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-blue-600" />
                  ステップ3: 前撮り（写真）をやるか即決
                </span>
                <h3 className="text-sm font-bold text-stone-900">招待状・ムービー・ボードに必須</h3>
                <p className="text-xs text-stone-600 leading-relaxed">
                  前撮りをやるかやらないかを第1工程で即決。前撮り写真データは「第2工程の招待状」「第3工程のウェルカムボード」「第4工程の生い立ちムービー」の基幹素材となるため、遅くとも挙式2ヶ月前には撮影を終えなければならない。
                </p>
                <div className="text-[11px] text-blue-800 bg-blue-50 p-2 rounded border border-blue-100 font-medium">
                  ⚠️ 怠ると：直前に前撮りを思い立ってもデータ納品が間に合わず、自作ムービーが完成しない。
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 2: 当日の忘れ物ゼロ！花嫁・花婿・プロデューサー持込品マスター        */}
      {/* ========================================================================= */}
      {activeTab === 'packing' && (
        <div className="space-y-6">
          {/* Quick navigation to the newly requested sequential walkthrough checklist */}
          <div className="bg-gradient-to-r from-amber-500 to-amber-600 text-stone-950 p-4 rounded-2xl shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border border-amber-400">
            <div className="flex items-center gap-2.5">
              <span className="p-2 bg-stone-950 text-amber-300 rounded-xl font-bold">
                <Compass className="w-5 h-5" />
              </span>
              <div>
                <h4 className="font-bold text-sm text-stone-950">
                  【当日現場の到着順・巡回順で点検したい場合はこちら】
                </h4>
                <p className="text-xs text-stone-900">
                  入口案内板 → 親族控室 → 来賓控室 → 披露宴会場 → 挙式場（神前・チャペル・人前） → 写真室 → スタッフ打ち合わせ → 引き出物 → 受付金庫 → 宿泊部屋
                </p>
              </div>
            </div>
            <button
              onClick={() => setActiveTab('venue_walkthrough')}
              className="px-4 py-2 bg-stone-950 hover:bg-stone-900 text-amber-300 rounded-xl text-xs font-bold shrink-0 shadow-xs transition-colors flex items-center gap-1.5"
            >
              <span>現場動線順リストに切替</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          <div className="bg-white rounded-2xl border border-stone-200 p-6 shadow-xs space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-stone-100 pb-4">
              <div>
                <h2 className="text-lg font-bold font-serif-jp text-stone-900 flex items-center gap-2">
                  <Luggage className="w-5 h-5 text-amber-700" />
                  <span>当日の忘れ物ゼロ！花嫁・花婿・プロデューサー持込小物マスター</span>
                </h2>
                <p className="text-xs text-stone-500 mt-0.5">
                  全国の結婚式場で最も発生頻度が高い「指輪・肌着・補正タオル・金庫・ポチ袋」の忘れ物を100%防止する指差し点検シートです。
                </p>
              </div>

              <div className="flex items-center gap-3">
                <div className="text-right">
                  <span className="text-xs text-stone-500">点検完了率:</span>
                  <span className="font-bold text-sm font-mono ml-1 text-stone-900">
                    {packingCheckedCount} / {PACKING_CHECKLIST_DATA.length} 項目（{packingProgressPct}%）
                  </span>
                </div>
                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => handleCheckAllPacking(true)}
                    className="px-2.5 py-1 bg-emerald-100 hover:bg-emerald-200 text-emerald-900 rounded text-xs font-semibold"
                  >
                    全項目点検済
                  </button>
                  <button
                    onClick={() => handleCheckAllPacking(false)}
                    className="px-2.5 py-1 bg-stone-100 hover:bg-stone-200 text-stone-600 rounded text-xs"
                  >
                    クリア
                  </button>
                </div>
              </div>
            </div>

            {/* Filter Buttons & Search */}
            <div className="no-print flex flex-wrap items-center justify-between gap-3">
              <div className="flex flex-wrap gap-1.5 text-xs">
                {[
                  { id: 'all', label: 'すべて' },
                  { id: 'cash_tips', label: '現金・金庫・心付け' },
                  { id: 'ceremony', label: '挙式・指輪・手紙' },
                  { id: 'bride', label: '花嫁小物・肌着・補正' },
                  { id: 'groom', label: '花婿小物・カフス' },
                  { id: 'reception_cloak', label: '受付・芳名・切手盆' }
                ].map(c => (
                  <button
                    key={c.id}
                    onClick={() => setPackingCategoryFilter(c.id)}
                    className={`px-3 py-1.5 rounded-lg font-medium transition-colors ${
                      packingCategoryFilter === c.id
                        ? 'bg-amber-900 text-white font-bold'
                        : 'bg-stone-100 hover:bg-stone-200 text-stone-600'
                    }`}
                  >
                    {c.label}
                  </button>
                ))}
              </div>

              <div className="relative w-full sm:w-64">
                <Search className="w-3.5 h-3.5 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="品名・リスク検索..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-8 pr-3 py-1.5 text-xs bg-stone-50 border border-stone-200 rounded-lg focus:outline-amber-600"
                />
              </div>
            </div>

            {/* Itemized Cards */}
            <div className="space-y-3">
              {filteredPackingItems.map((item) => {
                const isChecked = !!checkedPackingIds[item.id];
                return (
                  <div
                    key={item.id}
                    onClick={() => togglePackingCheck(item.id)}
                    className={`p-4 rounded-xl border transition-all cursor-pointer flex flex-col sm:flex-row sm:items-start justify-between gap-3 ${
                      isChecked
                        ? 'bg-emerald-50/50 border-emerald-300'
                        : 'bg-stone-50/50 hover:bg-white border-stone-200 hover:border-amber-300'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <div className={`w-5 h-5 rounded flex items-center justify-center shrink-0 mt-0.5 border ${
                        isChecked 
                          ? 'bg-emerald-600 border-emerald-600 text-white' 
                          : 'border-stone-300 bg-white hover:border-amber-500'
                      }`}>
                        {isChecked && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                      </div>

                      <div className="space-y-1">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="text-[11px] font-bold px-2 py-0.5 rounded bg-stone-200 text-stone-700">
                            対象：{item.target}
                          </span>
                          <span className="text-[11px] font-mono text-stone-500">
                            点検：{item.timing}
                          </span>
                          {item.importance === 'critical' && (
                            <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-rose-100 text-rose-800">
                              ★最重要
                            </span>
                          )}
                        </div>
                        <h3 className={`text-sm font-bold ${isChecked ? 'text-stone-400 line-through' : 'text-stone-900'}`}>
                          {item.name}
                        </h3>
                        <p className="text-xs text-stone-600 leading-relaxed font-sans">
                          {item.detailNote}
                        </p>
                      </div>
                    </div>

                    <div className="sm:max-w-xs shrink-0 bg-rose-50/80 p-2.5 rounded-lg border border-rose-100 text-[11px] text-rose-800 space-y-0.5">
                      <span className="font-bold flex items-center gap-1 text-rose-900">
                        <AlertTriangle className="w-3 h-3 text-rose-600" />
                        忘れた場合の悲劇（ヒロイン崩壊）：
                      </span>
                      <p className="leading-tight">{item.heroineRisk}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 3: 結納品・祝儀品 目録マスター                                        */}
      {/* ========================================================================= */}
      {activeTab === 'yuinoh' && (
        <div className="space-y-6">
          <div className="bg-white rounded-2xl border border-stone-200 p-6 shadow-xs space-y-4">
            <div className="border-b border-stone-100 pb-3">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 bg-amber-100 text-amber-900 rounded text-xs font-bold">
                  伝統儀礼・当て字の意味
                </span>
                <span className="text-xs text-stone-500 font-mono">
                  関東式・関西式 共通基礎
                </span>
              </div>
              <h2 className="text-lg font-bold font-serif-jp text-stone-900 mt-1 flex items-center gap-2">
                <Gift className="w-5 h-5 text-amber-700" />
                <span>結納の品目（目録）と込められた寿ぎの由来</span>
              </h2>
              <p className="text-xs text-stone-600 mt-1 leading-relaxed">
                結納品は奇数（割れない数＝別れない）で揃えるのが鉄則です。現代では略式結納（五品または七品・九品）が多く用いられます。単なる言葉遊びではなく、両家が生涯固く結ばれるための「寿ぎの当て字」の真の意味を理解します。
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {YUINOH_ITEMS_MASTER.map((item, idx) => (
                <div key={idx} className="p-4 rounded-xl border border-stone-200 bg-stone-50/40 hover:bg-white transition-all space-y-2">
                  <div className="flex items-center justify-between border-b border-stone-200 pb-2">
                    <span className="text-base font-bold text-amber-950 font-serif-jp">
                      {item.name}
                    </span>
                    <span className="text-xs font-mono text-stone-500 bg-stone-100 px-2 py-0.5 rounded">
                      {item.reading}
                    </span>
                  </div>
                  <div className="text-xs font-medium text-stone-800">
                    <span className="text-stone-500">品目格式：</span>
                    {item.fiveItems && <span className="mr-1 text-emerald-700 font-bold">五品</span>}
                    {item.sevenItems && <span className="mr-1 text-blue-700 font-bold">七品</span>}
                    {item.nineItems && <span className="text-purple-700 font-bold">九品</span>}
                  </div>
                  <div className="text-xs text-stone-600 leading-relaxed font-sans bg-amber-50/50 p-2.5 rounded-lg border border-amber-100">
                    <strong className="text-amber-900 block mb-0.5">【由来・寿ぎの意】</strong>
                    {item.meaning}
                  </div>
                  <div className="text-[11px] text-stone-600 bg-white p-2 rounded border border-stone-200">
                    💡 実務要点: {item.practicalTip}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 4: 親族肩書（伯父 vs 叔父）＆ 祝儀袋マナー                            */}
      {/* ========================================================================= */}
      {activeTab === 'relatives' && (
        <div className="space-y-6">
          <div className="bg-white rounded-2xl border border-stone-200 p-6 shadow-xs space-y-4">
            <div className="border-b border-stone-100 pb-3">
              <h2 className="text-lg font-bold font-serif-jp text-stone-900 flex items-center gap-2">
                <Users className="w-5 h-5 text-indigo-700" />
                <span>現場で最も誤植・クレームが多い「伯父／叔父」「伯母／叔母」の判定</span>
              </h2>
              <p className="text-xs text-stone-600 mt-1 leading-relaxed">
                席次表の肩書きで最も多いミスがこれです。「自分から見て年上か年下か」ではありません。<strong>「新郎新婦の親（父親または母親）から見て年上か年下か」</strong>で漢字を厳密に使い分けます。
              </p>
            </div>

            {/* Interactive Tester Box */}
            <div className="bg-indigo-50/70 border-2 border-indigo-200 rounded-xl p-5 space-y-4">
              <h3 className="text-sm font-bold text-indigo-950 flex items-center gap-2">
                <GraduationCap className="w-4 h-4 text-indigo-700" />
                <span>親族肩書 リアルタイム判定シミュレーター</span>
              </h3>

              <div className="flex flex-wrap gap-2 text-xs">
                {[
                  { id: 'parent_older_bro', label: '親の「兄」（自分から見て年上のおじ）' },
                  { id: 'parent_younger_bro', label: '親の「弟」（自分から見て年下のおじ）' },
                  { id: 'parent_older_sis', label: '親の「姉」（自分から見て年上のおば）' },
                  { id: 'parent_younger_sis', label: '親の「妹」（自分から見て年下のおば）' },
                  { id: 'cousin_older', label: '自分より年上のいとこ' },
                  { id: 'cousin_younger', label: '自分より年下のいとこ' }
                ].map(opt => (
                  <button
                    key={opt.id}
                    onClick={() => setRelativeTarget(opt.id as typeof relativeTarget)}
                    className={`px-3 py-1.5 rounded-lg font-medium transition-all ${
                      relativeTarget === opt.id
                        ? 'bg-indigo-900 text-white font-bold shadow-xs'
                        : 'bg-white hover:bg-indigo-100 text-indigo-900 border border-indigo-200'
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>

              <div className="bg-white p-4 rounded-xl border border-indigo-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="space-y-1">
                  <span className="text-xs text-stone-500">席次表に印刷すべき正式な漢字表記：</span>
                  <div className="text-2xl font-bold font-serif-jp text-indigo-950">
                    {relativeTarget === 'parent_older_bro' && '新郎（新婦）の 伯父'}
                    {relativeTarget === 'parent_younger_bro' && '新郎（新婦）の 叔父'}
                    {relativeTarget === 'parent_older_sis' && '新郎（新婦）の 伯母'}
                    {relativeTarget === 'parent_younger_sis' && '新郎（新婦）の 叔母'}
                    {relativeTarget === 'cousin_older' && '新郎（新婦）の 従兄（男性）/ 従姉（女性）'}
                    {relativeTarget === 'cousin_younger' && '新郎（新婦）の 従弟（男性）/ 従妹（女性）'}
                  </div>
                </div>

                <div className="text-xs bg-indigo-50 p-3 rounded-lg border border-indigo-100 text-indigo-900 sm:max-w-md font-sans">
                  <strong>【判定ロジック】</strong>
                  {relativeTarget.includes('older_bro') && ' 親の兄＝「伯」の字を用います。新郎新婦よりどれだけ歳が離れていても、親より年上なので「伯父」です。'}
                  {relativeTarget.includes('younger_bro') && ' 親の弟＝「叔」の字を用います。新郎新婦より年上であっても、親より年下なので「叔父」です。'}
                  {relativeTarget.includes('older_sis') && ' 親の姉＝「伯」の字を用います。'}
                  {relativeTarget.includes('younger_sis') && ' 親の妹＝「叔」の字を用います。'}
                  {relativeTarget.includes('cousin') && ' いとこは「自分基準」。自分より年上なら「従兄・従姉」、年下なら「従弟・従妹」です。'}
                </div>
              </div>
            </div>

            {/* Static Reference Table */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
              {RELATIVE_KANJI_RULES.map((rule, idx) => (
                <div key={idx} className="p-3.5 rounded-xl border border-stone-200 bg-stone-50/50 space-y-1 text-xs">
                  <div className="flex items-center justify-between font-bold text-stone-900 border-b border-stone-200 pb-1.5">
                    <span className="text-sm font-serif-jp text-amber-950">{rule.relation}</span>
                    <span className="px-2 py-0.5 bg-amber-100 text-amber-900 rounded font-mono font-extrabold">{rule.kanji}</span>
                  </div>
                  <div className="text-stone-600 pt-1 leading-relaxed">
                    <strong>定義：</strong> {rule.definition}
                  </div>
                  <div className="text-indigo-900 bg-indigo-50 p-1.5 rounded font-medium">
                    💡 祝儀袋・肩書：{rule.shugiBagTip}
                  </div>
                  <div className="text-stone-700 bg-stone-100 p-1.5 rounded font-mono text-[11px]">
                    実例：{rule.example}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 5: 心付け・お車代 相場＆渡し方                                       */}
      {/* ========================================================================= */}
      {activeTab === 'tips' && (
        <div className="space-y-6">
          <div className="bg-white rounded-2xl border border-stone-200 p-6 shadow-xs space-y-4">
            <div className="border-b border-stone-100 pb-3">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 bg-amber-100 text-amber-900 rounded text-xs font-bold">
                  現場の暗黙知・リアル相場
                </span>
                <span className="text-xs text-stone-500">
                  プロデューサー＆総合プロデューサーには1万〜3万円
                </span>
              </div>
              <h2 className="text-lg font-bold font-serif-jp text-stone-900 mt-1 flex items-center gap-2">
                <Coins className="w-5 h-5 text-amber-600" />
                <span>現場スタッフへの「心付け」と主賓への「お車代」完全相場表</span>
              </h2>
              <p className="text-xs text-stone-600 mt-1 leading-relaxed">
                現代の結婚式場ではサービス料（10〜15%）が含まれているため、一般スタッフ（キャプテン・司会・カメラマン・介添人等）への心付けは原則辞退または不要とされています。しかし、新郎新婦と伴走し全責任を背負う<strong>「プロデューサー」および「総合プロデューサー」</strong>には、感謝の意として1万円〜3万円をポチ袋で手渡すのが最高の実務礼儀です。
              </p>
            </div>

            <div className="space-y-3">
              {TIP_STAFF_GUIDELINES.map((guide, idx) => {
                const isRequired = guide.practicalKey.includes('必要') && !guide.amountStandard.includes('不要');
                return (
                  <div 
                    key={idx} 
                    className={`p-4 rounded-xl border transition-all ${
                      isRequired
                        ? 'bg-amber-50/50 border-amber-300' 
                        : 'bg-stone-50/50 border-stone-200'
                    }`}
                  >
                    <div className="flex flex-wrap items-center justify-between gap-2 border-b border-stone-200/60 pb-2">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-sm text-stone-900">{guide.role}</span>
                        <span className={`text-[11px] font-bold px-2 py-0.5 rounded ${
                          isRequired
                            ? 'bg-amber-600 text-white'
                            : 'bg-stone-200 text-stone-600'
                        }`}>
                          {isRequired ? '★ 心付け必要' : '心付け不要（基本料込）'}
                        </span>
                      </div>
                      <div className="text-sm font-bold font-mono text-amber-950">
                        相場：{guide.amountStandard}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2 text-xs">
                      <div>
                        <span className="text-stone-500 font-medium block">渡すタイミング：</span>
                        <span className="text-stone-800 font-medium">{guide.whenToHandIt}</span>
                      </div>
                      <div>
                        <span className="text-stone-500 font-medium block">誰から渡すか：</span>
                        <span className="text-stone-800 font-medium">{guide.whoHandsIt}</span>
                      </div>
                    </div>

                    <div className="text-xs text-stone-700 bg-white p-2.5 rounded-lg border border-stone-200/80 mt-2 leading-relaxed space-y-1">
                      <div><strong className="text-stone-900">添える言葉：</strong>{guide.wording}</div>
                      <div className="text-amber-950 font-medium text-[11px]">💡 実務要点: {guide.practicalKey}</div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 6: 受付防犯（金庫リレー）＆ VIP動線                                    */}
      {/* ========================================================================= */}
      {activeTab === 'reception' && (
        <div className="space-y-6">
          <div className="bg-white rounded-2xl border border-stone-200 p-6 shadow-xs space-y-4">
            <div className="border-b border-stone-100 pb-3">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 bg-rose-100 text-rose-900 rounded text-xs font-bold">
                  防犯重大マニュアル
                </span>
                <span className="text-xs text-stone-500">
                  数百万円の現金が動く現場のセキュリティ
                </span>
              </div>
              <h2 className="text-lg font-bold font-serif-jp text-stone-900 mt-1 flex items-center gap-2">
                <Lock className="w-5 h-5 text-rose-600" />
                <span>受付盗難防止「金庫リレー」手順 ＆ VIPエスコート動線</span>
              </h2>
              <p className="text-xs text-stone-600 mt-1 leading-relaxed">
                披露宴の受付台には、100名規模で300万〜500万円ものご祝儀袋（現金）が集まります。受付係（友人）を犯罪の危険に晒さず、盗難・紛失を100%遮断する「金庫リレー」の運用鉄則です。
              </p>
            </div>

            <div className="space-y-4">
              <h3 className="text-sm font-bold text-stone-900 flex items-center gap-2">
                <ShieldAlert className="w-4 h-4 text-rose-600" />
                <span>受付防犯リレー 4つの鉄則ステップ</span>
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {RECEPTION_SECURITY_RULES.map((rule) => (
                  <div key={rule.step} className="p-4 rounded-xl border border-stone-200 bg-stone-50/50 space-y-2">
                    <div className="flex items-center justify-between border-b border-stone-200 pb-2">
                      <span className="text-xs font-bold text-rose-800 bg-rose-100 px-2 py-0.5 rounded">
                        Step {rule.step}
                      </span>
                      <span className="text-xs text-stone-500 font-mono">{rule.timing}</span>
                    </div>
                    <h4 className="text-sm font-bold text-stone-900">{rule.title}</h4>
                    <p className="text-xs text-stone-600 leading-relaxed font-sans">{rule.actionDetails}</p>
                    <div className="text-[11px] text-rose-700 bg-rose-50 p-2 rounded border border-rose-100 font-medium">
                      ⚠️ 危険：{rule.securityRisk}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* VIP Protocol */}
            <div className="pt-4 border-t border-stone-200 space-y-4">
              <h3 className="text-sm font-bold text-stone-900 flex items-center gap-2">
                <Crown className="w-4 h-4 text-amber-600" />
                <span>主賓・VIPゲスト専用エスコートプロトコル</span>
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {VIP_PROTOCOL_RULES.map((vip, idx) => (
                  <div key={idx} className="p-3.5 rounded-xl border border-stone-200 bg-amber-50/30 space-y-1.5 text-xs">
                    <h4 className="font-bold text-amber-950 text-xs">{vip.item}</h4>
                    <p className="text-stone-700 leading-relaxed font-sans">{vip.action}</p>
                    <div className="text-[11px] text-amber-900 bg-white p-2 rounded border border-amber-200">
                      💡 怠ると：{vip.caution}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 7: 伝統演出 鏡開きの前日割り実務                                     */}
      {/* ========================================================================= */}
      {activeTab === 'kagami' && (
        <div className="space-y-6">
          <div className="bg-white rounded-2xl border border-stone-200 p-6 shadow-xs space-y-4">
            <div className="border-b border-stone-100 pb-3">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 bg-rose-100 text-rose-900 rounded text-xs font-bold">
                  地方・格式婚で絶対に漏らしてはならない急所
                </span>
              </div>
              <h2 className="text-lg font-bold font-serif-jp text-stone-900 mt-1 flex items-center gap-2">
                <Flame className="w-5 h-5 text-rose-600" />
                <span>伝統演出「鏡開き（樽酒）」の前日割りスタンバイ実務</span>
              </h2>
              <p className="text-xs text-stone-600 mt-1 leading-relaxed">
                ケーキ入刀と並ぶ祝宴の最高潮演出「鏡開き」。新品の酒樽は頑丈に固定されているため、前日にタガを緩め木蓋を割って手開き細工にしておかないと、当日新郎新婦が叩いても絶対に割れません。
              </p>
            </div>

            <div className="space-y-3">
              {KAGAMI_BIRAKI_STEPS.map((step, idx) => (
                <div key={idx} className="p-4 rounded-xl border border-stone-200 bg-stone-50/50 space-y-2">
                  <div className="flex flex-wrap items-center justify-between gap-2 border-b border-stone-200 pb-2">
                    <span className="text-sm font-bold text-stone-900">{step.step}</span>
                    <span className="text-xs font-mono text-amber-800 bg-amber-100 px-2 py-0.5 rounded">
                      実施：{step.timing}
                    </span>
                  </div>
                  <div className="text-xs text-stone-700 leading-relaxed font-sans bg-white p-3 rounded-lg border border-stone-200">
                    <strong className="text-stone-900 block mb-1">【現場作業手順】</strong>
                    {step.action}
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs pt-1">
                    <div className="text-stone-600">
                      <strong className="text-stone-700">理由：</strong> {step.reason}
                    </div>
                    <div className="text-rose-700 font-medium">
                      ⚠️ 怠った場合の事故：{step.heroineRisk}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
