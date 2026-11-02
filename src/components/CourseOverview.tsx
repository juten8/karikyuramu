import React from 'react';
import { CourseId, LectureInfo, UserProgressState } from '../types/quiz';
import { COURSES_DATA } from '../data/coursesData';
import { QUESTIONS_DATA } from '../data/questionsData';
import { 
  Award, 
  BookOpen, 
  CheckCircle2, 
  ChevronRight, 
  Clock, 
  FileCheck, 
  GraduationCap, 
  Play, 
  Sparkles, 
  Target, 
  TrendingUp, 
  Users,
  Workflow,
  Compass
} from 'lucide-react';

interface CourseOverviewProps {
  selectedCourseId: CourseId;
  setSelectedCourseId: (id: CourseId) => void;
  onStartLectureDrill: (lectureId: string) => void;
  onStartCourseExam: (courseId: CourseId) => void;
  onStartVocabDrill: () => void;
  onOpenEstimate?: () => void;
  onOpenSeating?: () => void;
  onOpenWorkflow?: () => void;
  userProgress: UserProgressState;
}

export const CourseOverview: React.FC<CourseOverviewProps> = ({
  selectedCourseId,
  setSelectedCourseId,
  onStartLectureDrill,
  onStartCourseExam,
  onStartVocabDrill,
  onOpenEstimate,
  onOpenSeating,
  onOpenWorkflow,
  userProgress
}) => {
  const currentCourse = COURSES_DATA.find(c => c.id === selectedCourseId) || COURSES_DATA[0];

  // Questions in this course
  const courseQuestions = QUESTIONS_DATA.filter(q => q.courseId === selectedCourseId);
  const totalCourseQuestions = courseQuestions.length;

  // Answered questions in this course
  const answeredInCourse = courseQuestions.filter(q => {
    const record = userProgress.answeredQuestions[q.id];
    return record && record.correctCount > 0;
  }).length;

  const courseMasteryPct = totalCourseQuestions > 0 
    ? Math.round((answeredInCourse / totalCourseQuestions) * 100) 
    : 0;

  const isPassed = !!userProgress.passedCourses[selectedCourseId];

  return (
    <div className="space-y-8 max-w-7xl mx-auto px-4 py-6">
      {/* 4 Grand Stages Roadmap Callout Banner */}
      {onOpenWorkflow && (
        <div className="bg-gradient-to-r from-stone-900 via-amber-950 to-stone-900 text-white rounded-2xl p-5 sm:p-6 shadow-lg border border-amber-500/40">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            <div className="space-y-2 max-w-2xl">
              <div className="inline-flex items-center gap-1.5 text-xs font-bold px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-400/30">
                <Compass className="w-3.5 h-3.5 text-amber-400" />
                <span>【プロデューサー必修】結婚式全体の流れをまず把握！</span>
              </div>
              <h3 className="text-lg sm:text-xl font-bold font-serif-jp text-white">
                婚礼総合プロデュース「実務4大工程ロードマップ」
              </h3>
              <p className="text-xs text-stone-300 leading-relaxed font-sans">
                ①式場予約＆直ちに衣装美容選定 → ②3ヶ月前の案内状送付 → ③返信後 テーブル座席・料理・引出物確定 → ④司会進行・演出＆当日総監督。この4つのプロセスが頭に入って初めて、クイズも実務も解けるようになります。
              </p>
            </div>

            <button
              onClick={onOpenWorkflow}
              className="px-5 py-3 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-stone-950 rounded-xl font-bold text-xs shadow-md hover:shadow-lg flex items-center justify-center gap-2 shrink-0 transition-all cursor-pointer"
            >
              <Workflow className="w-4 h-4 text-stone-950" />
              <span>実務4大工程ロードマップを開く</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Hero Header */}
      <div className="relative overflow-hidden rounded-2xl bg-linear-to-r from-stone-900 via-stone-850 to-amber-950 text-white p-6 sm:p-8 shadow-xl border border-amber-900/30">
        <div className="absolute right-0 top-0 bottom-0 w-1/3 opacity-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-amber-300 via-transparent to-transparent pointer-events-none" />
        
        <div className="relative z-10 max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 border border-amber-400/40 text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5" />
            国家技能検定・認定基準準拠 カリキュラム問題集
          </div>

          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold font-serif-jp tracking-tight text-amber-50 leading-tight">
            {currentCourse.title}
          </h2>

          <p className="text-sm sm:text-base text-stone-300 leading-relaxed font-light">
            {currentCourse.subtitle}
          </p>

          {/* Quick Metrics Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2 text-xs">
            <div className="bg-white/5 backdrop-blur-xs p-2.5 rounded-lg border border-white/10">
              <span className="text-stone-400 block text-[10px]">修得講義数</span>
              <span className="font-bold text-white text-sm">{currentCourse.lectures.length} 講義</span>
            </div>
            <div className="bg-white/5 backdrop-blur-xs p-2.5 rounded-lg border border-white/10">
              <span className="text-stone-400 block text-[10px]">総合問題数</span>
              <span className="font-bold text-white text-sm">{totalCourseQuestions} 問（四肢択一）</span>
            </div>
            <div className="bg-white/5 backdrop-blur-xs p-2.5 rounded-lg border border-white/10">
              <span className="text-stone-400 block text-[10px]">合格基準スコア</span>
              <span className="font-bold text-amber-400 text-sm">{currentCourse.examPassingScore}% 以上</span>
            </div>
            <div className="bg-white/5 backdrop-blur-xs p-2.5 rounded-lg border border-white/10">
              <span className="text-stone-400 block text-[10px]">認定ステータス</span>
              <span className={`font-bold text-sm flex items-center gap-1 ${isPassed ? 'text-emerald-400' : 'text-stone-300'}`}>
                {isPassed ? (
                  <>
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                    合格・修了済
                  </>
                ) : (
                  '未受験'
                )}
              </span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center gap-3 pt-3">
            <button
              onClick={() => onStartCourseExam(selectedCourseId)}
              className="px-5 py-2.5 rounded-xl bg-linear-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-stone-950 font-bold text-sm shadow-lg shadow-amber-600/30 flex items-center gap-2 transition-all active:scale-95 cursor-pointer"
            >
              <Award className="w-4 h-4 text-stone-950" />
              <span>本番模擬試験を受ける（合格でディプロマ発行）</span>
            </button>

            {onOpenEstimate && (
              <button
                onClick={onOpenEstimate}
                className="px-4 py-2.5 rounded-xl bg-amber-400/20 hover:bg-amber-400/30 text-amber-200 border border-amber-400/40 font-bold text-sm flex items-center gap-1.5 transition-all cursor-pointer"
              >
                <span>📊 見積もり作成（実務シミュレーター）</span>
              </button>
            )}

            {onOpenSeating && (
              <button
                onClick={onOpenSeating}
                className="px-4 py-2.5 rounded-xl bg-rose-400/20 hover:bg-rose-400/30 text-rose-200 border border-rose-400/40 font-bold text-sm flex items-center gap-1.5 transition-all cursor-pointer"
              >
                <span>👑 配席・ヒロイン座席表</span>
              </button>
            )}

            <button
              onClick={onStartVocabDrill}
              className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/15 text-stone-200 border border-white/20 font-medium text-sm flex items-center gap-1.5 transition-all cursor-pointer"
            >
              <FileCheck className="w-4 h-4 text-amber-300" />
              <span>単語記述式特訓（2級頻出）</span>
            </button>
          </div>
        </div>
      </div>

      {/* 3 Qualification Courses Cards (Directly matching the uploaded image!) */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-lg font-bold text-stone-900 font-serif-jp flex items-center gap-2">
              <GraduationCap className="w-5 h-5 text-amber-700" />
              公式認定 3段階資格カリキュラム
            </h3>
            <p className="text-xs text-stone-500">
              目的やキャリアステージに合わせてコースを切り替え、全カリキュラムを反復学習できます
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {COURSES_DATA.map((course) => {
            const isSelected = course.id === selectedCourseId;
            const cQuestions = QUESTIONS_DATA.filter(q => q.courseId === course.id);
            const cAnswered = cQuestions.filter(q => userProgress.answeredQuestions[q.id]?.correctCount > 0).length;
            const cProgress = cQuestions.length > 0 ? Math.round((cAnswered / cQuestions.length) * 100) : 0;
            const cPassed = !!userProgress.passedCourses[course.id];

            return (
              <div
                key={course.id}
                onClick={() => setSelectedCourseId(course.id)}
                className={`relative rounded-2xl p-5 cursor-pointer transition-all border text-left flex flex-col justify-between ${
                  isSelected
                    ? 'bg-amber-50/70 border-amber-500/80 shadow-md ring-2 ring-amber-500/20'
                    : 'bg-white hover:bg-stone-50/80 border-stone-200/90 shadow-xs'
                }`}
              >
                {cPassed && (
                  <div className="absolute top-3 right-3 bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded-full border border-emerald-300 flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                    修了認定
                  </div>
                )}

                <div className="space-y-3">
                  <div className="text-[11px] font-semibold text-amber-900 tracking-wide uppercase bg-amber-100/80 px-2 py-0.5 rounded w-fit border border-amber-200">
                    {course.badgeTitle}
                  </div>

                  <h4 className="text-base font-bold text-stone-900 font-serif-jp">
                    {course.title}
                  </h4>

                  <p className="text-xs text-stone-600 line-clamp-3 leading-relaxed">
                    {course.subtitle}
                  </p>

                  <div className="space-y-1.5 text-[11px] text-stone-500 pt-2 border-t border-stone-200/70">
                    <div className="flex items-center justify-between">
                      <span className="text-stone-400">期間・コマ数:</span>
                      <span className="font-medium text-stone-700">{course.hours}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-stone-400">受講料目安:</span>
                      <span className="font-medium text-stone-700">{course.tuition}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-stone-400">講義数:</span>
                      <span className="font-semibold text-amber-800">{course.lectures.length} 講義</span>
                    </div>
                  </div>
                </div>

                {/* Progress bar inside card */}
                <div className="pt-4 mt-3 border-t border-stone-200/60">
                  <div className="flex items-center justify-between text-[11px] mb-1">
                    <span className="text-stone-500">学習進捗</span>
                    <span className="font-bold text-amber-900">{cProgress}%</span>
                  </div>
                  <div className="h-2 w-full bg-stone-100 rounded-full overflow-hidden border border-stone-200">
                    <div 
                      className="h-full bg-linear-to-r from-amber-600 to-amber-700 rounded-full transition-all duration-500"
                      style={{ width: `${cProgress}%` }}
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Lecture List (Curriculum Drill Section) */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-stone-200 pb-3">
          <div>
            <h3 className="text-xl font-bold text-stone-900 font-serif-jp flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-amber-700" />
              <span>{currentCourse.title} カリキュラム科目一覧</span>
            </h3>
            <p className="text-xs text-stone-500">
              各回の講義テーマをクリックして、実践的な四肢択一問題と詳細解説で反復演習できます
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs text-stone-600 font-medium">コース全体の習得度:</span>
            <span className="text-xs font-bold text-amber-800 bg-amber-100 px-2 py-0.5 rounded-full border border-amber-300">
              {courseMasteryPct}% 完了
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-3.5">
          {currentCourse.lectures.map((lecture: LectureInfo) => {
            const lectureQuestions = QUESTIONS_DATA.filter(q => q.lectureId === lecture.id);
            const lectureAnswered = lectureQuestions.filter(q => userProgress.answeredQuestions[q.id]?.correctCount > 0).length;
            const isLectureComplete = lectureQuestions.length > 0 && lectureAnswered === lectureQuestions.length;

            return (
              <div
                key={lecture.id}
                className={`p-4 sm:p-5 rounded-xl border transition-all flex flex-col md:flex-row md:items-center justify-between gap-4 ${
                  isLectureComplete
                    ? 'bg-emerald-50/40 border-emerald-300/80 shadow-2xs'
                    : 'bg-white hover:bg-stone-50/90 border-stone-200 shadow-xs'
                }`}
              >
                <div className="space-y-2 max-w-3xl">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="px-2.5 py-0.5 rounded-md bg-stone-900 text-amber-200 text-xs font-bold">
                      第{lecture.lectureNumber}回
                    </span>

                    <h4 className="text-base font-bold text-stone-900 font-serif-jp">
                      {lecture.title}
                    </h4>

                    {isLectureComplete && (
                      <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full">
                        <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                        全問正解達成
                      </span>
                    )}
                  </div>

                  <p className="text-xs text-stone-600 leading-relaxed">
                    {lecture.description}
                  </p>

                  <div className="flex flex-wrap items-center gap-1.5 pt-1 text-[11px]">
                    <span className="text-stone-400 font-medium">重点科目:</span>
                    <span className="text-amber-900 font-medium bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                      {lecture.focusTopics}
                    </span>
                  </div>
                </div>

                <div className="flex items-center justify-between md:justify-end gap-3 pt-3 md:pt-0 border-t md:border-t-0 border-stone-100">
                  <div className="text-right text-xs">
                    <span className="text-stone-400 block text-[10px]">問題数</span>
                    <span className="font-semibold text-stone-700">
                      {lectureAnswered} / {lectureQuestions.length} 問
                    </span>
                  </div>

                  <button
                    onClick={() => onStartLectureDrill(lecture.id)}
                    className="px-4 py-2 rounded-lg bg-amber-700 hover:bg-amber-800 active:scale-95 text-white text-xs font-bold flex items-center gap-1.5 shadow-xs transition-all"
                  >
                    <Play className="w-3.5 h-3.5 fill-white" />
                    <span>演習を始める</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Professional Tips & Study Guide */}
      <div className="p-5 rounded-2xl bg-stone-100 border border-stone-200/80 space-y-3">
        <h4 className="text-sm font-bold text-stone-900 font-serif-jp flex items-center gap-2">
          <Target className="w-4 h-4 text-amber-700" />
          <span>合格のための学習アドバイス（学習サイクル）</span>
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs text-stone-600">
          <div className="bg-white p-3 rounded-lg border border-stone-200/80 shadow-2xs space-y-1">
            <span className="font-bold text-amber-900 block">① 講義別演習で即時インプット</span>
            <p>各回の四肢択一を解き、詳細解説と「実務プロの急所」を精読して知識を定着させます。</p>
          </div>
          <div className="bg-white p-3 rounded-lg border border-stone-200/80 shadow-2xs space-y-1">
            <span className="font-bold text-amber-900 block">② 弱点特訓＆単語記述で総復習</span>
            <p>間違えた問題は自動で弱点リストに蓄積されます。2級頻出の単語記述特訓も活用しましょう。</p>
          </div>
          <div className="bg-white p-3 rounded-lg border border-stone-200/80 shadow-2xs space-y-1">
            <span className="font-bold text-amber-900 block">③ 本番模擬試験で合格ディプロマ獲得</span>
            <p>制限時間付きの総合模擬試験を受験。合格基準をクリアすると公式修了証書が発行されます。</p>
          </div>
        </div>
      </div>
    </div>
  );
};
