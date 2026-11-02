import React, { useState } from 'react';
import { WORKFLOW_STAGES_DATA } from '../data/workflowStagesData';
import { WorkflowStageNumber, WorkflowStageInfo } from '../types/quiz';
import { 
  AlertTriangle, 
  ArrowLeft, 
  ArrowRight, 
  Calendar, 
  Calculator, 
  CheckCircle2, 
  ChevronRight, 
  Clock, 
  HelpCircle, 
  Layers, 
  Sparkles, 
  Users, 
  Workflow, 
  BookOpen, 
  Compass,
  Heart,
  UtensilsCrossed,
  Utensils,
  Luggage,
  Truck,
  Mail
} from 'lucide-react';

interface WorkflowTimelineViewProps {
  onStartStageDrill: (stageNumber: WorkflowStageNumber) => void;
  onOpenEstimate: () => void;
  onOpenSeating: () => void;
  onOpenCatering?: () => void;
  onOpenPractical?: () => void;
  onOpenDispatch?: () => void;
  onOpenInvitation?: () => void;
  onOpenTableSetting?: () => void;
  onBackToCourses: () => void;
  stageQuestionCounts: Record<WorkflowStageNumber, number>;
}

export const WorkflowTimelineView: React.FC<WorkflowTimelineViewProps> = ({
  onStartStageDrill,
  onOpenEstimate,
  onOpenSeating,
  onOpenCatering,
  onOpenPractical,
  onOpenDispatch,
  onOpenInvitation,
  onOpenTableSetting,
  onBackToCourses,
  stageQuestionCounts,
}) => {
  const [activeStageNumber, setActiveStageNumber] = useState<WorkflowStageNumber>(1);
  const activeStage: WorkflowStageInfo = WORKFLOW_STAGES_DATA.find(s => s.stageNumber === activeStageNumber) || WORKFLOW_STAGES_DATA[0];

  const handleNextStage = () => {
    if (activeStageNumber < 4) {
      setActiveStageNumber((activeStageNumber + 1) as WorkflowStageNumber);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handlePrevStage = () => {
    if (activeStageNumber > 1) {
      setActiveStageNumber((activeStageNumber - 1) as WorkflowStageNumber);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-8">
      {/* Header breadcrumb & introduction */}
      <div className="space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <button
            onClick={onBackToCourses}
            className="inline-flex items-center gap-1.5 text-xs text-stone-500 hover:text-amber-700 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>講座カリキュラム一覧へ戻る</span>
          </button>
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-amber-100 text-amber-900 rounded-full text-xs font-semibold">
              <Compass className="w-3.5 h-3.5 text-amber-700" />
              プロデューサー必須 実務4大工程
            </span>
          </div>
        </div>

        <div>
          <h1 className="text-2xl sm:text-3xl font-bold font-serif-jp text-stone-900 tracking-tight flex items-center gap-2.5">
            <Workflow className="w-7 h-7 text-amber-700" />
            <span>婚礼総合プロデュース 実務4大工程ロードマップ</span>
          </h1>
          <p className="text-stone-600 text-sm mt-1 max-w-3xl leading-relaxed">
            式場予約から結婚式当日までの「全体プロセス」が頭に入っていなければ、どんな演出も座席も組み立てられません。
            プロデューサーが絶対に間違えてはならない<span className="font-semibold text-stone-900">「予約・衣装選定 → 3ヶ月前案内状 → 返信後座席・料理確定 → 進行演出・当日総監督」</span>の4工程を完全マスターします。
          </p>
        </div>
      </div>

      {/* Practical Execution Quick Banner - Academic Light Style */}
      {onOpenPractical && (
        <div className="bg-white border-2 border-amber-200/90 text-stone-900 p-4 sm:p-5 rounded-2xl shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-bold tracking-widest text-amber-900 bg-amber-100 px-2 py-0.5 rounded-full border border-amber-300 uppercase">
                現場ミスゼロ・実務執行
              </span>
              <span className="text-xs text-stone-500 font-serif-jp">
                言葉遊び・単なるクイズからの完全脱却
              </span>
            </div>
            <div className="text-base font-bold font-serif-jp text-stone-900 flex items-center gap-2">
              <Luggage className="w-5 h-5 text-amber-700" />
              <span>当日忘れ物ゼロ・心付け（Pのみ1〜3万）・親族肩書・金庫防犯・鏡開き前日割</span>
            </div>
            <p className="text-xs text-stone-600">
              指輪・肌着忘れ物防止、祝儀九品、伯父/叔父の漢字、受付金庫リレー、樽酒の前日割りスタンバイを即時確認
            </p>
          </div>
          <button
            onClick={onOpenPractical}
            className="shrink-0 px-4 py-2.5 bg-amber-700 hover:bg-amber-800 text-white font-bold rounded-xl text-xs shadow-xs transition-all flex items-center gap-1.5"
          >
            <span>現場超実務マニュアルを開く</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* 4 Grand Stages Interactive Stepper / Navigation - Academic Light Style */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {WORKFLOW_STAGES_DATA.map((stage) => {
          const isActive = stage.stageNumber === activeStageNumber;
          const qCount = stageQuestionCounts[stage.stageNumber] || 0;

          return (
            <button
              key={stage.id}
              onClick={() => setActiveStageNumber(stage.stageNumber)}
              className={`p-4 rounded-xl border text-left transition-all relative overflow-hidden flex flex-col justify-between ${
                isActive
                  ? 'bg-amber-50/90 text-amber-950 border-amber-400 shadow-xs ring-2 ring-amber-400/50'
                  : 'bg-white hover:bg-stone-50/80 text-stone-800 border-stone-200 hover:border-amber-300 shadow-2xs'
              }`}
            >
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className={`text-[11px] font-bold px-2 py-0.5 rounded-full ${
                    isActive ? 'bg-amber-200 text-amber-900 border border-amber-300' : 'bg-stone-100 text-stone-600'
                  }`}>
                    {stage.timing}
                  </span>
                  <span className={`text-[11px] font-semibold flex items-center gap-1 ${
                    isActive ? 'text-amber-800 font-bold' : 'text-stone-400'
                  }`}>
                    <HelpCircle className="w-3 h-3" />
                    確認テスト{qCount}問
                  </span>
                </div>

                <div className="text-sm font-bold font-serif-jp leading-snug pt-1 text-stone-900">
                  第{stage.stageNumber}工程
                  <div className="text-xs font-sans font-medium line-clamp-1 mt-0.5 text-stone-600">
                    {stage.stageNumber === 1 && '式場予約・衣装美容即選定'}
                    {stage.stageNumber === 2 && '3ヶ月前の招待状送付'}
                    {stage.stageNumber === 3 && '返信後 座席・料理・引出物'}
                    {stage.stageNumber === 4 && '司会進行＆当日総監督'}
                  </div>
                </div>
              </div>

              <div className={`mt-3 pt-2 border-t text-[11px] flex items-center justify-between ${
                isActive ? 'border-amber-200 text-amber-900 font-semibold' : 'border-stone-100 text-stone-400'
              }`}>
                <span>{isActive ? '現在表示中' : 'クリックして詳細表示'}</span>
                <ChevronRight className={`w-3.5 h-3.5 ${isActive ? 'rotate-90 text-amber-700' : ''}`} />
              </div>
            </button>
          );
        })}
      </div>

      {/* Active Stage Detailed Card */}
      <div className="bg-white rounded-2xl border border-stone-200 shadow-xs overflow-hidden">
        {/* Stage Header Banner - Academic White / Stone Style */}
        <div className="bg-stone-50 border-b border-stone-200 text-stone-900 p-6 sm:p-8 space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <span className="px-3 py-1 bg-amber-100 text-amber-900 border border-amber-300 rounded-full text-xs font-bold tracking-wider flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-amber-800" />
              時期目安：{activeStage.timing}
            </span>
            <div className="flex items-center gap-2">
              <button
                onClick={() => onStartStageDrill(activeStage.stageNumber)}
                className="px-3.5 py-2 bg-stone-100 hover:bg-stone-200 text-stone-800 border border-stone-300 rounded-lg text-xs font-semibold shadow-2xs transition-all flex items-center gap-1.5"
                title="確認用セルフチェック問題"
              >
                <CheckCircle2 className="w-3.5 h-3.5 text-stone-600" />
                <span>自己学習：第{activeStage.stageNumber}工程 確認テスト（{stageQuestionCounts[activeStage.stageNumber] || 0}問）</span>
              </button>
            </div>
          </div>

          <div className="space-y-2">
            <h2 className="text-xl sm:text-2xl font-bold font-serif-jp text-stone-900 leading-tight">
              {activeStage.title}
            </h2>
            <p className="text-amber-800 text-sm font-semibold">
              💡 {activeStage.tagline}
            </p>
            <p className="text-stone-700 text-xs sm:text-sm leading-relaxed max-w-4xl pt-1">
              {activeStage.leadSummary}
            </p>
          </div>

          {/* Quick Real-World Action Hub for Active Stage */}
          <div className="pt-2 flex flex-wrap items-center gap-2.5">
            <span className="text-[11px] font-bold text-stone-500 uppercase tracking-wider">
              連動実務ツール:
            </span>
            
            {activeStage.stageNumber === 1 && (
              <button
                onClick={onOpenEstimate}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-amber-600 hover:bg-amber-700 text-white rounded-lg text-xs font-bold shadow-xs transition-colors"
              >
                <Calculator className="w-3.5 h-3.5" />
                <span>第1工程 見積りシミュレーター（挙式・衣装・美容枠）を開く</span>
              </button>
            )}

            {activeStage.stageNumber === 2 && (
              <>
                {onOpenInvitation && (
                  <button
                    onClick={onOpenInvitation}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-amber-700 hover:bg-amber-800 text-white rounded-lg text-xs font-bold shadow-xs transition-colors"
                  >
                    <Mail className="w-3.5 h-3.5" />
                    <span>本状・返信ハガキ・Web招待状 実務見本</span>
                  </button>
                )}
                {onOpenDispatch && (
                  <button
                    onClick={onOpenDispatch}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-stone-700 hover:bg-stone-800 text-white rounded-lg text-xs font-bold shadow-xs transition-colors"
                  >
                    <Truck className="w-3.5 h-3.5" />
                    <span>ホテル気付 荷札・配送伝票・祝電指示書</span>
                  </button>
                )}
              </>
            )}

            {activeStage.stageNumber === 3 && (
              <>
                <button
                  onClick={onOpenSeating}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-amber-700 hover:bg-amber-800 text-white rounded-lg text-xs font-bold shadow-xs transition-colors"
                >
                  <Users className="w-3.5 h-3.5" />
                  <span>配席・媒酌人・主大臣配置</span>
                </button>
                {onOpenDispatch && (
                  <button
                    onClick={onOpenDispatch}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-stone-700 hover:bg-stone-800 text-white rounded-lg text-xs font-bold shadow-xs transition-colors"
                  >
                    <Truck className="w-3.5 h-3.5" />
                    <span>業者一覧連絡票（マルチベンダー緊急連絡網）</span>
                  </button>
                )}
                {onOpenCatering && (
                  <button
                    onClick={onOpenCatering}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-stone-100 hover:bg-stone-200 text-stone-800 border border-stone-300 rounded-lg text-xs font-semibold transition-colors"
                  >
                    <UtensilsCrossed className="w-3.5 h-3.5 text-stone-700" />
                    <span>ケータリング備品＆料理形式</span>
                  </button>
                )}
                {onOpenTableSetting && (
                  <button
                    onClick={onOpenTableSetting}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-300 rounded-lg text-xs font-bold transition-colors"
                  >
                    <Utensils className="w-3.5 h-3.5 text-amber-700" />
                    <span>卓上セッティング図面</span>
                  </button>
                )}
              </>
            )}

            {activeStage.stageNumber === 4 && (
              <>
                {onOpenTableSetting && (
                  <button
                    onClick={onOpenTableSetting}
                    className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-amber-700 hover:bg-amber-800 text-white rounded-lg text-xs font-bold shadow-xs transition-colors"
                  >
                    <Utensils className="w-3.5 h-3.5" />
                    <span>🍽️ 4大料理形式テーブルセッティング図面（仏・中・和洋・ビュッフェ配置下図面）</span>
                  </button>
                )}
                {onOpenPractical && (
                  <button
                    onClick={onOpenPractical}
                    className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-amber-100 hover:bg-amber-200 text-amber-950 border border-amber-300 rounded-lg text-xs font-bold transition-colors"
                  >
                    <Compass className="w-3.5 h-3.5 text-amber-800" />
                    <span>⚡ 当日現場動線順 最終点検リスト＆忘れ物ゼロ</span>
                  </button>
                )}
                <button
                  onClick={onOpenEstimate}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-stone-700 hover:bg-stone-800 text-white rounded-lg text-xs font-bold shadow-xs transition-colors"
                >
                  <Calculator className="w-3.5 h-3.5" />
                  <span>見積もり連動・最終執行チェックリスト</span>
                </button>
              </>
            )}
          </div>
        </div>

        {/* Heroine Danger Warning Box */}
        <div className="p-6 sm:p-8 bg-rose-50/70 border-b border-rose-100">
          <div className="flex items-start gap-3.5">
            <div className="w-9 h-9 rounded-lg bg-rose-100 text-rose-700 flex items-center justify-center shrink-0 mt-0.5">
              <AlertTriangle className="w-5 h-5" />
            </div>
            <div className="space-y-1">
              <h3 className="text-sm font-bold text-rose-950 flex items-center gap-2">
                <span>プロデューサー厳重警告：ヒロイン失敗の最大の罠</span>
              </h3>
              <p className="text-xs sm:text-sm text-rose-900 leading-relaxed font-sans">
                {activeStage.heroineWarning}
              </p>
            </div>
          </div>
        </div>

        {/* Stage 4 Special: Table Setting Educational Blueprint Banner */}
        {activeStage.stageNumber === 4 && onOpenTableSetting && (
          <div className="p-6 sm:p-8 bg-amber-50/70 border-b border-amber-200">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="space-y-1.5 max-w-3xl">
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-0.5 bg-amber-200 text-amber-900 rounded-md text-[11px] font-bold border border-amber-300">
                    第4工程 必修実務図面
                  </span>
                  <span className="text-amber-800 text-xs font-semibold">
                    国家検定・ホテルバンケット配膳規格準拠
                  </span>
                </div>
                <h3 className="text-base sm:text-lg font-bold font-serif-jp text-amber-950">
                  🍽️ 4大料理形式テーブルセッティング精密平面図面集
                </h3>
                <p className="text-xs sm:text-sm text-stone-700 leading-relaxed">
                  フランス料理フルコース（シルバー＆グラス配置図面）、中国料理（円卓・散蓮華・湯碗・時計回り動線）、和洋折衷（会席折敷・祝儀柳箸・洋カトラリー）、ビュッフェ（ワンウェイ動線＆ゲスト卓）の下図面と配置寸法・マナー急所を完全図解。
                </p>
              </div>
              <button
                onClick={onOpenTableSetting}
                className="px-4 py-2.5 bg-amber-700 hover:bg-amber-800 text-white rounded-xl text-xs sm:text-sm font-bold shadow-xs shrink-0 flex items-center gap-2 transition-all"
              >
                <Utensils className="w-4 h-4" />
                <span>図面集を開く（A4印刷対応）</span>
              </button>
            </div>
          </div>
        )}

        {/* Tasks Checklist & Milestone Flow */}
        <div className="p-6 sm:p-8 space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold font-serif-jp text-stone-900 flex items-center gap-2">
              <Layers className="w-5 h-5 text-amber-700" />
              <span>第{activeStage.stageNumber}工程の実務マイルストーン＆タスク実行順序</span>
            </h3>
            <span className="text-xs text-stone-500">全{activeStage.coreTasks.length}タスク</span>
          </div>

          <div className="space-y-4">
            {activeStage.coreTasks.map((task, idx) => (
              <div 
                key={task.id}
                className="p-4 sm:p-5 rounded-xl border border-stone-200 hover:border-amber-300 bg-stone-50/40 hover:bg-white transition-all space-y-3"
              >
                <div className="flex flex-wrap items-start justify-between gap-2">
                  <div className="flex items-center gap-2.5">
                    <span className="w-6 h-6 rounded-full bg-stone-900 text-amber-300 text-xs font-bold flex items-center justify-center shrink-0">
                      {idx + 1}
                    </span>
                    <h4 className="text-sm font-bold text-stone-900">
                      {task.title}
                    </h4>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] font-medium px-2 py-0.5 bg-stone-200/80 text-stone-700 rounded-md">
                      {task.timing}
                    </span>
                    {task.isMilestone && (
                      <span className="text-[11px] font-bold px-2 py-0.5 bg-amber-100 text-amber-900 rounded-md border border-amber-300">
                        必須マイルストーン
                      </span>
                    )}
                  </div>
                </div>

                <p className="text-xs text-stone-700 leading-relaxed pl-8">
                  {task.description}
                </p>

                {/* Risk and direct tool linking */}
                <div className="pl-8 pt-1 flex flex-wrap items-center justify-between gap-3 text-xs">
                  <div className="text-rose-700/90 text-[11px] flex items-center gap-1 font-medium bg-rose-50 px-2.5 py-1 rounded-md">
                    <span>⚠️ 怠った場合のリスク：</span>
                    <span>{task.heroineRisk}</span>
                  </div>

                  {task.relatedTool === 'estimate' && (
                    <button
                      onClick={onOpenEstimate}
                      className="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-50 hover:bg-amber-100 text-amber-900 rounded-md text-xs font-semibold border border-amber-200 transition-colors"
                    >
                      <Calculator className="w-3.5 h-3.5 text-amber-700" />
                      <span>見積もりシミュレーターで確認</span>
                    </button>
                  )}

                  {task.relatedTool === 'seating' && (
                    <button
                      onClick={onOpenSeating}
                      className="inline-flex items-center gap-1.5 px-3 py-1 bg-indigo-50 hover:bg-indigo-100 text-indigo-900 rounded-md text-xs font-semibold border border-indigo-200 transition-colors"
                    >
                      <Users className="w-3.5 h-3.5 text-indigo-700" />
                      <span>配席・媒酌人シミュレーターで確認</span>
                    </button>
                  )}

                  {task.id === 't-3-2' && onOpenCatering && (
                    <button
                      onClick={onOpenCatering}
                      className="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-100 hover:bg-amber-200 text-amber-950 rounded-md text-xs font-semibold border border-amber-300 transition-colors"
                    >
                      <UtensilsCrossed className="w-3.5 h-3.5 text-amber-800" />
                      <span>4大料理形式＆ケータリング備品リスト</span>
                    </button>
                  )}

                  {task.id === 't-4-4' && onOpenPractical && (
                    <button
                      onClick={onOpenPractical}
                      className="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-100 hover:bg-amber-200 text-amber-950 rounded-md text-xs font-semibold border border-amber-300 transition-colors"
                    >
                      <Compass className="w-3.5 h-3.5 text-amber-800" />
                      <span>⚡ 当日現場動線順 最終点検リストを開く</span>
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Exam & Practical Manners Knowledge Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
            <div className="p-4 rounded-xl bg-stone-100/70 border border-stone-200 space-y-2">
              <h4 className="text-xs font-bold text-stone-900 flex items-center gap-1.5">
                <BookOpen className="w-4 h-4 text-amber-700" />
                <span>本試験（技能検定・認定資格）頻出ポイント</span>
              </h4>
              <ul className="space-y-1.5 text-xs text-stone-700">
                {activeStage.examPoints.map((point, i) => (
                  <li key={i} className="flex items-start gap-1.5">
                    <span className="text-amber-700 font-bold">•</span>
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="p-4 rounded-xl bg-stone-100/70 border border-stone-200 space-y-2">
              <h4 className="text-xs font-bold text-stone-900 flex items-center gap-1.5">
                <Heart className="w-4 h-4 text-rose-600" />
                <span>現場プロフェッショナルの極上マナー</span>
              </h4>
              <ul className="space-y-1.5 text-xs text-stone-700">
                {activeStage.practicalManners.map((manner, i) => (
                  <li key={i} className="flex items-start gap-1.5">
                    <span className="text-rose-600 font-bold">•</span>
                    <span>{manner}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Bottom Stage Action & Stepping */}
          <div className="pt-4 border-t border-stone-200 flex flex-wrap items-center justify-between gap-4">
            <button
              onClick={handlePrevStage}
              disabled={activeStageNumber === 1}
              className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-medium border ${
                activeStageNumber === 1
                  ? 'opacity-40 cursor-not-allowed bg-stone-100 text-stone-400 border-stone-200'
                  : 'bg-white hover:bg-stone-50 text-stone-800 border-stone-300'
              }`}
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>前の工程へ</span>
            </button>

            <button
              onClick={() => onStartStageDrill(activeStage.stageNumber)}
              className="px-6 py-2.5 bg-amber-700 hover:bg-amber-800 text-white rounded-lg text-xs font-bold shadow-xs hover:shadow-sm transition-all flex items-center gap-2"
            >
              <CheckCircle2 className="w-4 h-4 text-amber-200" />
              <span>第{activeStage.stageNumber}工程の確認テスト（{stageQuestionCounts[activeStage.stageNumber] || 0}問）</span>
            </button>

            <button
              onClick={handleNextStage}
              disabled={activeStageNumber === 4}
              className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-medium border ${
                activeStageNumber === 4
                  ? 'opacity-40 cursor-not-allowed bg-stone-100 text-stone-400 border-stone-200'
                  : 'bg-white hover:bg-stone-50 text-stone-800 border-stone-300'
              }`}
            >
              <span>次の工程へ</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
