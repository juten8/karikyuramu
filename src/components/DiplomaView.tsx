import React, { useState } from 'react';
import { CourseId, UserProgressState } from '../types/quiz';
import { COURSES_DATA } from '../data/coursesData';
import { generateCertificateId } from '../utils/storage';
import { 
  ArrowLeft, 
  Award, 
  Check, 
  CheckCircle2, 
  Copy, 
  Edit3, 
  GraduationCap, 
  Printer, 
  Share2, 
  Sparkles 
} from 'lucide-react';

interface DiplomaViewProps {
  selectedCourseId: CourseId;
  setSelectedCourseId: (id: CourseId) => void;
  onBack: () => void;
  userProgress: UserProgressState;
  setUserProgress: React.Dispatch<React.SetStateAction<UserProgressState>>;
}

export const DiplomaView: React.FC<DiplomaViewProps> = ({
  selectedCourseId,
  setSelectedCourseId,
  onBack,
  userProgress,
  setUserProgress
}) => {
  const currentCourse = COURSES_DATA.find(c => c.id === selectedCourseId) || COURSES_DATA[0];
  const passedInfo = userProgress.passedCourses[selectedCourseId];

  const [isEditingName, setIsEditingName] = useState(false);
  const [studentName, setStudentName] = useState(userProgress.studentName);
  const [copied, setCopied] = useState(false);

  // If not yet passed through exam, provide a demo preview / simulation issuance
  const certificateId = passedInfo?.certificateId || generateCertificateId(selectedCourseId);
  const issueDate = passedInfo?.passedAt ? new Date(passedInfo.passedAt) : new Date();

  const formattedDate = `${issueDate.getFullYear()}年${issueDate.getMonth() + 1}月${issueDate.getDate()}日`;

  const handleSaveName = () => {
    if (studentName.trim()) {
      setUserProgress(prev => ({
        ...prev,
        studentName: studentName.trim(),
        passedCourses: {
          ...prev.passedCourses,
          [selectedCourseId]: {
            ...(prev.passedCourses[selectedCourseId] || {
              passedAt: Date.now(),
              score: 95,
              certificateId: generateCertificateId(selectedCourseId)
            }),
            candidateName: studentName.trim()
          }
        }
      }));
    }
    setIsEditingName(false);
  };

  const handlePrint = () => {
    window.print();
  };

  const handleShare = () => {
    const text = `【公式認定 取得報告】${currentCourse.badgeTitle} に合格・修了認定されました！ 証書番号: ${certificateId}`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-6 space-y-6">
      {/* Top Controls (Hidden during print) */}
      <div className="no-print flex flex-wrap items-center justify-between gap-3 border-b border-stone-200 pb-4">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-stone-600 hover:text-stone-900 bg-stone-100 hover:bg-stone-200 px-3 py-1.5 rounded-lg transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>カリキュラムに戻る</span>
        </button>

        {/* Tier Selector */}
        <div className="flex items-center gap-1 bg-stone-100 p-1 rounded-xl border border-stone-200 text-xs">
          {COURSES_DATA.map(c => {
            const hasPassed = !!userProgress.passedCourses[c.id];
            const isSelected = c.id === selectedCourseId;
            return (
              <button
                key={c.id}
                onClick={() => setSelectedCourseId(c.id)}
                className={`px-3 py-1.5 rounded-lg font-medium transition-all flex items-center gap-1 ${
                  isSelected
                    ? 'bg-amber-800 text-white shadow-xs font-bold'
                    : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                <span>{c.id === 'basic' ? '基礎科' : c.id === 'producer' ? '花嫁プロデューサー' : '認定校マスター'}</span>
                {hasPassed && <CheckCircle2 className="w-3 h-3 text-emerald-400" />}
              </button>
            );
          })}
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleShare}
            className="px-3 py-1.5 rounded-lg bg-stone-100 hover:bg-stone-200 text-stone-700 text-xs font-medium flex items-center gap-1 transition-colors"
            title="合格証番号をコピー"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? 'コピーしました' : 'シェア'}</span>
          </button>

          <button
            onClick={handlePrint}
            className="px-4 py-1.5 rounded-lg bg-stone-900 hover:bg-stone-800 text-amber-200 text-xs font-bold flex items-center gap-1.5 shadow-sm transition-all active:scale-95"
          >
            <Printer className="w-4 h-4" />
            <span>印刷・PDF保存</span>
          </button>
        </div>
      </div>

      {/* Status Notice if not officially taken test yet */}
      {!passedInfo && (
        <div className="no-print bg-amber-50 border border-amber-300 p-3.5 rounded-xl text-xs text-amber-900 flex items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-amber-600 shrink-0" />
            <span>
              こちらはプレビュー版です。本番模擬試験で合格基準スコア（{currentCourse.examPassingScore}%以上）を獲得すると正式認定が付与されます。
            </span>
          </div>
          <button
            onClick={() => {
              // Quick test pass for demonstration
              setUserProgress(prev => ({
                ...prev,
                passedCourses: {
                  ...prev.passedCourses,
                  [selectedCourseId]: {
                    passedAt: Date.now(),
                    score: 100,
                    candidateName: userProgress.studentName,
                    certificateId: generateCertificateId(selectedCourseId)
                  }
                }
              }));
            }}
            className="shrink-0 px-2.5 py-1 bg-amber-600 hover:bg-amber-700 text-white rounded-lg text-[11px] font-bold"
          >
            認定証を即時発行する
          </button>
        </div>
      )}

      {/* =========================================================================
          THE OFFICIAL CERTIFICATE (DIPLOMA) CONTAINER
          Designed for traditional elegance, high dpi print, gold framing
          ========================================================================= */}
      <div className="bg-amber-50/30 p-4 sm:p-8 rounded-3xl border border-amber-300 shadow-2xl">
        <div className="relative bg-white border-8 border-double border-amber-700/80 p-8 sm:p-14 rounded-2xl shadow-inner text-stone-900 font-serif-jp space-y-8 overflow-hidden">
          
          {/* Subtle Decorative Background Watermark */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-[0.03]">
            <div className="w-96 h-96 rounded-full border-12 border-amber-900 flex items-center justify-center">
              <GraduationCap className="w-64 h-64 text-amber-900" />
            </div>
          </div>

          {/* Certificate Corner Ornaments */}
          <div className="absolute top-3 left-3 w-8 h-8 border-t-2 border-l-2 border-amber-700" />
          <div className="absolute top-3 right-3 w-8 h-8 border-t-2 border-r-2 border-amber-700" />
          <div className="absolute bottom-3 left-3 w-8 h-8 border-b-2 border-l-2 border-amber-700" />
          <div className="absolute bottom-3 right-3 w-8 h-8 border-b-2 border-r-2 border-amber-700" />

          {/* Certificate ID Header */}
          <div className="flex flex-wrap items-center justify-between text-[11px] text-stone-500 font-sans border-b border-amber-200/60 pb-3">
            <span className="tracking-widest font-mono">
              CERTIFICATE NO. : <strong className="text-stone-800">{certificateId}</strong>
            </span>
            <span className="text-amber-900 font-medium">
              公式技能検定 認定証書
            </span>
          </div>

          {/* Main Title */}
          <div className="text-center space-y-2 pt-2">
            <div className="inline-block tracking-[0.35em] text-xs sm:text-sm font-bold text-amber-900/90 border-b border-amber-700/50 pb-1">
              DIPLOMA OF BRIDAL PRODUCER
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-widest text-stone-900">
              修 了 認 定 証 書
            </h1>
            <p className="text-xs sm:text-sm font-semibold text-amber-950 pt-1">
              【 {currentCourse.badgeTitle} 】
            </p>
          </div>

          {/* Candidate Name Section */}
          <div className="text-center py-4">
            <div className="inline-flex items-center justify-center gap-2 border-b-2 border-stone-800 pb-2 px-8">
              {isEditingName ? (
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    value={studentName}
                    onChange={e => setStudentName(e.target.value)}
                    className="text-2xl sm:text-3xl font-bold text-center border-b border-amber-600 outline-none w-64 bg-amber-50/50 px-2 font-serif-jp"
                    autoFocus
                  />
                  <button
                    onClick={handleSaveName}
                    className="no-print px-3 py-1 bg-amber-800 text-white rounded text-xs font-sans font-bold"
                  >
                    確定
                  </button>
                </div>
              ) : (
                <div 
                  onClick={() => setIsEditingName(true)}
                  className="group cursor-pointer flex items-center gap-2"
                  title="クリックして受講生氏名を編集"
                >
                  <span className="text-2xl sm:text-3xl font-bold tracking-wider text-stone-900">
                    {userProgress.studentName}
                  </span>
                  <span className="text-lg font-medium text-stone-600">殿</span>
                  <Edit3 className="no-print w-4 h-4 text-stone-400 group-hover:text-amber-800 transition-colors ml-1" />
                </div>
              )}
            </div>
            <p className="no-print text-[10px] text-stone-400 pt-1 font-sans">
              ※氏名をクリックすると名前を変更できます
            </p>
          </div>

          {/* Certification Body Text */}
          <div className="max-w-2xl mx-auto text-xs sm:text-sm leading-relaxed text-stone-800 text-justify sm:text-center space-y-3 font-normal">
            <p>
              貴殿は、当機構の定める「{currentCourse.title}」における全講義カリキュラム
              （計{currentCourse.lectures.length}科目・総合プロデュース実務・法令コンプライアンス・トータルスタイリング技術）
              を優秀なる成績をもって修了し、認定試験の厳正なる審査に合格いたしました。
            </p>
            <p>
              よって、頭書の資格称号を授与し、婚礼総合プロデューサーとしての卓越した専門知識と
              高度な実務能力をここに公認認定いたします。
            </p>
          </div>

          {/* Footer with Date, Issuer & Seal Stamp */}
          <div className="pt-8 border-t border-amber-200/60 flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="text-left space-y-1 text-xs">
              <div className="text-stone-500 font-sans">授与日:</div>
              <div className="font-bold text-stone-900 text-sm tracking-wide">
                {formattedDate}
              </div>
              <div className="text-[10px] text-stone-400 font-sans">
                ブライダルコーディネート技能基準準拠
              </div>
            </div>

            {/* Issuing Authority & Vermilion Seal */}
            <div className="flex items-center gap-4">
              <div className="text-right space-y-1">
                <div className="text-xs font-bold text-stone-800">
                  一般社団法人 婚礼総合プロデュース技能審査機構
                </div>
                <div className="text-[11px] text-stone-600 font-serif-jp">
                  認定委員長・マスタープロデューサー
                </div>
              </div>

              {/* Japanese Square Red Stamp (朱肉印) */}
              <div className="relative w-16 h-16 sm:w-20 sm:h-20 border-2 border-red-700 text-red-700 flex items-center justify-center p-1 rounded-sm shadow-xs select-none bg-red-50/20">
                <div className="border border-red-600 w-full h-full flex flex-col items-center justify-center font-bold text-[9px] sm:text-[11px] leading-tight tracking-tighter text-center">
                  <span>婚礼総合</span>
                  <span>認定機関</span>
                  <span>之印</span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};
