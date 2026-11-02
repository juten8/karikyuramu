import React, { useState } from 'react';
import { 
  AppMode, 
  CourseId, 
  UserProgressState 
} from '../types/quiz';
import { COURSES_DATA } from '../data/coursesData';
import { 
  Award, 
  BookOpen, 
  Bookmark, 
  CheckCircle2, 
  Flame, 
  HelpCircle, 
  Menu, 
  RotateCcw, 
  Volume2, 
  VolumeX, 
  X,
  FileText,
  Sparkles,
  GraduationCap,
  Calculator,
  Crown,
  Workflow,
  UtensilsCrossed,
  Utensils,
  Luggage,
  Truck,
  Mail
} from 'lucide-react';

interface HeaderProps {
  currentMode: AppMode;
  setMode: (mode: AppMode) => void;
  selectedCourseId: CourseId;
  setSelectedCourseId: (courseId: CourseId) => void;
  userProgress: UserProgressState;
  setUserProgress: React.Dispatch<React.SetStateAction<UserProgressState>>;
  totalQuestionsCount: number;
  incorrectQuestionsCount: number;
}

export const Header: React.FC<HeaderProps> = ({
  currentMode,
  setMode,
  selectedCourseId,
  setSelectedCourseId,
  userProgress,
  setUserProgress,
  totalQuestionsCount,
  incorrectQuestionsCount
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isEditingName, setIsEditingName] = useState(false);
  const [tempName, setTempName] = useState(userProgress.studentName);

  const currentCourse = COURSES_DATA.find(c => c.id === selectedCourseId) || COURSES_DATA[0];

  const totalAnswered = Object.keys(userProgress.answeredQuestions).length;
  const totalCorrect = Object.values(userProgress.answeredQuestions).filter(q => q.correctCount > 0).length;
  const overallAccuracy = totalAnswered > 0 ? Math.round((totalCorrect / totalAnswered) * 100) : 0;
  const bookmarkedCount = userProgress.bookmarkedQuestionIds.length;

  const toggleSound = () => {
    setUserProgress(prev => ({ ...prev, soundEnabled: !prev.soundEnabled }));
  };

  const saveName = () => {
    if (tempName.trim()) {
      setUserProgress(prev => ({ ...prev, studentName: tempName.trim() }));
    }
    setIsEditingName(false);
  };

  const navItems = [
    { mode: 'workflow' as AppMode, label: '実務4大工程', icon: Workflow, badge: 'メイン', highlight: true },
    { mode: 'estimate' as AppMode, label: '見積り作成・執行', icon: Calculator, badge: '四大工程連動', highlight: true },
    { mode: 'table-setting' as AppMode, label: 'セッティング図面', icon: Utensils, badge: '4大料理形式', highlight: true },
    { mode: 'dispatch' as AppMode, label: '業者連絡票・配送荷札', icon: Truck, badge: 'ホテル気付' },
    { mode: 'invitation' as AppMode, label: '招待状・Web案内', icon: Mail, badge: '実務見本' },
    { mode: 'practical' as AppMode, label: '現場超実務', icon: Luggage, badge: '急所・忘れ物' },
    { mode: 'catering' as AppMode, label: 'ケータリング見積', icon: UtensilsCrossed, badge: '備品・料理' },
    { mode: 'seating' as AppMode, label: '配席・高砂席', icon: Crown, badge: '媒酌人・主大臣' },
    { mode: 'courses' as AppMode, label: '自己学習・確認テスト', icon: BookOpen },
    { mode: 'exam' as AppMode, label: '本番模試', icon: Award },
    { mode: 'diploma' as AppMode, label: '修了証', icon: GraduationCap },
    { mode: 'vocab' as AppMode, label: '単語記述', icon: FileText },
    { 
      mode: 'weakness' as AppMode, 
      label: '弱点特訓', 
      icon: RotateCcw, 
      badge: incorrectQuestionsCount > 0 ? `${incorrectQuestionsCount}` : undefined 
    },
    { 
      mode: 'bookmarks' as AppMode, 
      label: '復習帳', 
      icon: Bookmark, 
      badge: bookmarkedCount > 0 ? `${bookmarkedCount}` : undefined 
    },
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-stone-200 shadow-xs">
      {/* Top Academic Institutional Bar - Light White/Ivory */}
      <div className="bg-stone-50 border-b border-stone-200 text-stone-700 px-4 py-2 text-xs">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2 font-medium tracking-wide">
            <span className="inline-flex items-center gap-1 bg-amber-100 text-amber-900 px-2.5 py-0.5 rounded-full border border-amber-300 font-semibold text-[11px]">
              <Sparkles className="w-3 h-3 text-amber-700" />
              認定校・国家資格基準 総合プロデューサー養成校
            </span>
            <span className="hidden sm:inline text-stone-600 font-serif-jp">
              四大工程 × 見積り執行連動実務アカデミー
            </span>
          </div>

          <div className="flex items-center gap-4 text-[11px] text-stone-600">
            {/* Streak Counter */}
            <div className="flex items-center gap-1 text-amber-800 font-semibold" title="学習継続日数">
              <Flame className="w-3.5 h-3.5 fill-amber-500 text-amber-600" />
              <span>{userProgress.streakDays}日連続</span>
            </div>

            {/* Answered progress */}
            <div className="flex items-center gap-1.5 hidden md:flex text-stone-600">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
              <span>テスト習得: {totalCorrect}/{totalQuestionsCount}問 ({overallAccuracy}%)</span>
            </div>

            {/* Student Name */}
            <div className="flex items-center gap-1">
              {isEditingName ? (
                <div className="flex items-center gap-1">
                  <input
                    type="text"
                    value={tempName}
                    onChange={e => setTempName(e.target.value)}
                    onKeyDown={e => e.key === 'Enter' && saveName()}
                    className="bg-white text-stone-900 text-xs px-2 py-0.5 rounded border border-amber-500 outline-none w-28 shadow-2xs"
                    placeholder="氏名を入力"
                    autoFocus
                  />
                  <button 
                    onClick={saveName} 
                    className="bg-amber-700 hover:bg-amber-800 text-white px-2 py-0.5 rounded text-[10px] font-semibold"
                  >
                    保存
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => setIsEditingName(true)}
                  className="hover:text-amber-800 underline decoration-dotted flex items-center gap-1 text-stone-700"
                  title="クリックして受講者氏名を編集（ディプロマに反映されます）"
                >
                  <span>受講生:</span>
                  <span className="font-bold text-stone-900">{userProgress.studentName}</span>
                </button>
              )}
            </div>

            {/* Sound Toggle */}
            <button
              onClick={toggleSound}
              className="p-1 rounded hover:bg-stone-200 text-stone-500 hover:text-stone-900 transition-colors"
              title={userProgress.soundEnabled ? '効果音 ON (クリックでOFF)' : '効果音 OFF (クリックでON)'}
            >
              {userProgress.soundEnabled ? (
                <Volume2 className="w-3.5 h-3.5 text-amber-700" />
              ) : (
                <VolumeX className="w-3.5 h-3.5 text-stone-400" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 py-2.5 flex items-center justify-between gap-4 bg-white">
        {/* Logo and Brand */}
        <div 
          onClick={() => setMode('workflow')}
          className="flex items-center gap-3 cursor-pointer group select-none shrink-0"
        >
          <div className="w-10 h-10 rounded-xl bg-amber-50 border border-amber-200 text-amber-800 flex items-center justify-center shadow-xs group-hover:scale-105 transition-transform">
            <GraduationCap className="w-6 h-6 text-amber-800" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-base sm:text-lg font-bold text-stone-900 tracking-tight font-serif-jp">
                婚礼総合プロデューサー実務校
              </h1>
              <span className="text-[10px] font-bold uppercase tracking-wider bg-amber-50 text-amber-800 px-2 py-0.5 rounded-full border border-amber-200 hidden sm:inline-block">
                四大工程 × 見積り執行
              </span>
            </div>
            <p className="text-xs text-stone-500 hidden sm:block">
              実務直結フロー・見積り連動チェックリスト・ホテル配送荷札・業者連絡票
            </p>
          </div>
        </div>

        {/* Desktop Nav Items */}
        <nav className="hidden xl:flex items-center gap-1 overflow-x-auto py-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentMode === item.mode;
            return (
              <button
                key={item.mode}
                onClick={() => setMode(item.mode)}
                className={`relative px-2.5 py-1.5 rounded-lg text-xs font-medium flex items-center gap-1.5 transition-all whitespace-nowrap ${
                  isActive
                    ? 'bg-amber-100 text-amber-950 font-bold shadow-2xs border border-amber-300'
                    : item.highlight
                    ? 'bg-amber-50/70 text-amber-900 hover:bg-amber-100/70 border border-amber-200/60'
                    : 'text-stone-600 hover:text-stone-900 hover:bg-stone-100'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-amber-800' : 'text-stone-500'}`} />
                <span>{item.label}</span>
                {item.badge && (
                  <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold ${
                    item.badge === 'メイン'
                      ? 'bg-amber-700 text-white'
                      : item.badge === '四大工程連動'
                      ? 'bg-amber-200 text-amber-900'
                      : 'bg-stone-200 text-stone-700'
                  }`}>
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        {/* Medium-screen fast bar */}
        <div className="hidden lg:flex xl:hidden items-center gap-1">
          {navItems.slice(0, 5).map((item) => {
            const Icon = item.icon;
            const isActive = currentMode === item.mode;
            return (
              <button
                key={item.mode}
                onClick={() => setMode(item.mode)}
                className={`px-2 py-1.5 rounded-lg text-xs font-medium flex items-center gap-1 ${
                  isActive ? 'bg-amber-100 text-amber-950 font-bold border border-amber-300' : 'text-stone-600 hover:bg-stone-100'
                }`}
              >
                <Icon className="w-3.5 h-3.5 text-amber-800" />
                <span>{item.label}</span>
              </button>
            );
          })}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-1.5 rounded-lg text-stone-600 hover:bg-stone-100 text-xs font-medium flex items-center gap-1 border border-stone-200"
          >
            <span>他メニュー</span>
            <Menu className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Mobile menu button */}
        <div className="flex lg:hidden items-center gap-2">
          <button
            onClick={() => setMode('exam')}
            className="px-2.5 py-1.5 rounded-lg bg-amber-600 text-white text-xs font-semibold flex items-center gap-1 shadow-xs"
          >
            <Award className="w-3.5 h-3.5" />
            <span>模試</span>
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-lg text-stone-600 hover:text-stone-900 hover:bg-stone-100"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Course Level Switcher Bar */}
      <div className="bg-stone-100/80 border-t border-stone-200/80 px-4 py-1.5">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2 text-xs">
          <div className="flex items-center gap-1 text-stone-600 font-medium">
            <span className="text-[11px] text-stone-400">受講コース:</span>
            <div className="flex items-center gap-1 bg-white p-0.5 rounded-lg border border-stone-200 shadow-2xs">
              {COURSES_DATA.map(course => {
                const isSelected = selectedCourseId === course.id;
                return (
                  <button
                    key={course.id}
                    onClick={() => {
                      setSelectedCourseId(course.id);
                      if (currentMode === 'diploma') {
                        // keep in diploma
                      }
                    }}
                    className={`px-2.5 py-1 rounded-md text-[11px] font-medium transition-all ${
                      isSelected
                        ? 'bg-linear-to-r from-amber-700 to-amber-800 text-white shadow-xs font-semibold'
                        : 'text-stone-600 hover:text-stone-900 hover:bg-stone-100'
                    }`}
                  >
                    {course.id === 'basic' && '基礎科（全6講）'}
                    {course.id === 'producer' && '花嫁プロデューサー（全8講）'}
                    {course.id === 'master' && '認定校マスター（全4講）'}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="text-[11px] text-amber-900 font-medium flex items-center gap-1 truncate">
            <span className="font-semibold text-stone-800">
              {currentCourse.badgeTitle}
            </span>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-stone-200 p-4 space-y-2 animate-in fade-in slide-in-from-top-2 duration-150">
          <div className="text-xs font-semibold text-stone-400 px-2 pb-1">メニュー</div>
          <div className="grid grid-cols-2 gap-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentMode === item.mode;
              return (
                <button
                  key={item.mode}
                  onClick={() => {
                    setMode(item.mode);
                    setMobileMenuOpen(false);
                  }}
                  className={`p-2.5 rounded-lg text-xs font-medium flex items-center gap-2 ${
                    isActive
                      ? 'bg-amber-100 text-amber-950 font-bold border border-amber-300'
                      : 'bg-stone-50 text-stone-700 hover:bg-stone-100'
                  }`}
                >
                  <Icon className="w-4 h-4 text-amber-700" />
                  <span className="truncate">{item.label}</span>
                  {item.badge && (
                    <span className="ml-auto text-[10px] px-1 py-0.2 rounded-full bg-amber-200 text-amber-900 font-bold">
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </header>
  );
};
