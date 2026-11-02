import React, { useState } from 'react';
import { INVITATION_SAMPLE_DATA } from '../data/weddingVendorDispatchData';
import { 
  AlertCircle, 
  Calendar, 
  Check, 
  CheckCircle2, 
  Clock, 
  Copy, 
  ExternalLink, 
  FileText, 
  Heart, 
  Mail, 
  MapPin, 
  MessageSquare, 
  Phone, 
  Printer, 
  Send, 
  Share2, 
  Smartphone, 
  Sparkles, 
  Utensils,
  ArrowLeft
} from 'lucide-react';
import { AppMode } from '../types/quiz';

interface InvitationPreviewViewProps {
  onNavigate?: (mode: AppMode) => void;
}

export const InvitationPreviewView: React.FC<InvitationPreviewViewProps> = ({ onNavigate }) => {
  const [activeTab, setActiveTab] = useState<'paper' | 'postcard' | 'web'>('paper');
  const [copySuccess, setCopySuccess] = useState(false);

  const data = INVITATION_SAMPLE_DATA;

  const handleCopyWebUrl = () => {
    navigator.clipboard.writeText(data.webInvitation.urlSlug);
    setCopySuccess(true);
    setTimeout(() => setCopySuccess(false), 2000);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-8">
      {/* Academy White Clean Header */}
      <div className="bg-white rounded-2xl border border-stone-200 p-6 sm:p-8 shadow-xs space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-stone-100 pb-4">
          <div className="flex items-center gap-2">
            {onNavigate && (
              <button
                onClick={() => onNavigate('workflow')}
                className="inline-flex items-center gap-1 text-xs text-stone-500 hover:text-amber-800 transition-colors mr-2"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>実務4大工程へ</span>
              </button>
            )}
            <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-50 text-amber-900 rounded-full text-xs font-bold border border-amber-300">
              <Mail className="w-3.5 h-3.5 text-amber-700" />
              第2工程：招待状＆返信ハガキ設計
            </span>
            <span className="text-xs text-stone-500 font-medium hidden sm:inline">
              紙の本状 ＆ 返信ハガキマナー ＆ スマホWEB招待状
            </span>
          </div>

          <div className="no-print flex items-center gap-2">
            <button
              onClick={() => window.print()}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-stone-900 hover:bg-stone-800 text-white rounded-xl text-xs font-bold shadow-xs transition-colors"
            >
              <Printer className="w-4 h-4 text-amber-300" />
              <span>案内状サンプルを印刷</span>
            </button>
          </div>
        </div>

        <div>
          <h1 className="text-2xl sm:text-3xl font-bold font-serif-jp text-stone-900 tracking-tight flex items-center gap-2.5">
            <FileText className="w-7 h-7 text-amber-700" />
            <span>案内状（招待状）・返信ハガキ ＆ WEB招待状 リアルサンプル</span>
          </h1>
          <p className="text-stone-600 text-xs sm:text-sm mt-1 max-w-4xl leading-relaxed">
            招待状は結婚式の最初の顔です。句読点（、。）を打たないしきたり、何階何の間気付の明記、返信ハガキの食物アレルギー欄、そして現在急増しているLINEやメールで送信する「WEB招待状」のフォーマットを素人にも分かりやすく視覚的に提示します。
          </p>
        </div>

        {/* Tab Buttons */}
        <div className="no-print flex flex-wrap gap-2 pt-2">
          <button
            onClick={() => setActiveTab('paper')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
              activeTab === 'paper'
                ? 'bg-amber-900 text-white shadow-xs'
                : 'bg-stone-100 hover:bg-stone-200 text-stone-700'
            }`}
          >
            <FileText className="w-4 h-4" />
            <span>① 伝統的な紙の招待状（本状サンプル）</span>
          </button>

          <button
            onClick={() => setActiveTab('postcard')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
              activeTab === 'postcard'
                ? 'bg-amber-900 text-white shadow-xs'
                : 'bg-stone-100 hover:bg-stone-200 text-stone-700'
            }`}
          >
            <Mail className="w-4 h-4" />
            <span>② 返信ハガキ（表面・裏面 ＆ 「御」消し作法）</span>
          </button>

          <button
            onClick={() => setActiveTab('web')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
              activeTab === 'web'
                ? 'bg-amber-900 text-white shadow-xs'
                : 'bg-stone-100 hover:bg-stone-200 text-stone-700'
            }`}
          >
            <Smartphone className="w-4 h-4 text-emerald-600" />
            <span>③ 現代のWEB招待状（LINE・メール送信型）</span>
          </button>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* TAB 1: 紙の招待状（本状サンプル）                                         */}
      {/* ========================================================================= */}
      {activeTab === 'paper' && (
        <div className="space-y-6">
          <div className="bg-white rounded-2xl border border-stone-200 p-6 sm:p-8 shadow-xs space-y-6">
            <div className="flex flex-wrap items-center justify-between border-b border-stone-100 pb-3 gap-2">
              <span className="text-xs font-bold text-amber-900 bg-amber-50 px-2.5 py-1 rounded-md border border-amber-200">
                本状レイアウト（高級和紙カード仕様）
              </span>
              <span className="text-xs text-stone-500">
                ※「お祝い事に終止符を打たない」ため句読点（、。）は一切使用しません
              </span>
            </div>

            {/* Formal Japanese Paper Card Mockup */}
            <div className="max-w-2xl mx-auto p-8 sm:p-12 border-2 border-stone-300 rounded-xl bg-linear-to-b from-stone-50 to-white shadow-md text-stone-900 space-y-8 font-serif-jp relative overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 bg-amber-100/30 rounded-bl-full pointer-events-none" />

              <div className="text-center space-y-2">
                <span className="text-xs tracking-widest text-stone-400 block font-sans">WEDDING INVITATION</span>
                <h2 className="text-xl sm:text-2xl font-bold tracking-widest text-stone-900 border-b-2 border-amber-800 pb-3 inline-block">
                  ご　案　内
                </h2>
              </div>

              {/* Body Text (No Punctuation) */}
              <div className="space-y-3 text-xs sm:text-sm leading-loose text-stone-800 text-center">
                <p className="font-semibold">{data.paperInvitation.seasonalGreeting}</p>
                {data.paperInvitation.bodyText.map((line, i) => (
                  <p key={i}>{line}</p>
                ))}
              </div>

              {/* Ceremony & Reception Schedule */}
              <div className="p-5 bg-stone-50 rounded-xl border border-stone-200 space-y-2 text-xs sm:text-sm text-center">
                <div className="text-base font-bold text-amber-950 font-sans">
                  {data.paperInvitation.dateStr}
                </div>
                <div className="space-y-1 text-stone-700">
                  <div>{data.paperInvitation.ceremonyTime}</div>
                  <div className="font-bold text-stone-900">{data.paperInvitation.receptionTime}</div>
                </div>
                <div className="pt-2 border-t border-stone-200 text-stone-600">
                  <div className="font-bold text-stone-900">{data.paperInvitation.venueName}</div>
                  <div className="text-xs font-sans text-stone-500">{data.paperInvitation.venueFloor}</div>
                </div>
              </div>

              {/* RSVP Deadline */}
              <div className="text-center text-xs text-rose-800 font-bold bg-rose-50 p-2 rounded-lg border border-rose-200">
                お手数ながらご都合のほどを <strong>{data.paperInvitation.rsvpDeadline}</strong> までに同封のはがきにてご返信賜りますようお願い申し上げます
              </div>

              {/* Signatures */}
              <div className="pt-4 border-t border-stone-200 flex flex-col sm:flex-row justify-between text-xs text-stone-700 gap-4">
                <div>
                  <span className="text-[10px] text-stone-400 block font-sans">新郎新婦</span>
                  <div className="font-bold text-stone-900 text-sm mt-0.5">
                    {data.paperInvitation.groomsName} ｜ {data.paperInvitation.bridesName}
                  </div>
                </div>
                <div className="sm:text-right">
                  <span className="text-[10px] text-stone-400 block font-sans">両家ご両親</span>
                  <div className="text-stone-700 text-xs mt-0.5">
                    {data.paperInvitation.parentsNames}
                  </div>
                </div>
              </div>
            </div>

            {/* Crucial Paper Rules */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs pt-4 border-t border-stone-100">
              <div className="p-3 bg-amber-50/60 rounded-xl border border-amber-200 space-y-1">
                <span className="font-bold text-amber-950">① 句読点（、。）の完全排除</span>
                <p className="text-stone-600 leading-relaxed">
                  「お祝い事に終止符を打たない・区切りをつけない」という縁起から、句読点は一切使いません。行頭やスペースで間をとります。
                </p>
              </div>

              <div className="p-3 bg-amber-50/60 rounded-xl border border-amber-200 space-y-1">
                <span className="font-bold text-amber-950">② 忌み言葉・重ね言葉の排除</span>
                <p className="text-stone-600 leading-relaxed">
                  「終わる」「切れる」「離れる」「重ね重ね」「度々」は使用厳禁。「お開き」「結び」と言い換えます。
                </p>
              </div>

              <div className="p-3 bg-amber-50/60 rounded-xl border border-amber-200 space-y-1">
                <span className="font-bold text-amber-950">③ 慶事用寿切手 ＆ 郵便局持込</span>
                <p className="text-stone-600 leading-relaxed">
                  ポスト投函ではなく郵便局の窓口へ持ち込み、記念消印や料金不足を防止します。寿切手（吉祥文様切手）を貼付します。
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 2: 返信ハガキ ＆ マナー                                              */}
      {/* ========================================================================= */}
      {activeTab === 'postcard' && (
        <div className="space-y-6">
          <div className="bg-white rounded-2xl border border-stone-200 p-6 sm:p-8 shadow-xs space-y-6">
            <div className="border-b border-stone-100 pb-3">
              <h2 className="text-base font-bold font-serif-jp text-stone-900 flex items-center gap-2">
                <Mail className="w-5 h-5 text-amber-700" />
                <span>返信ハガキの表面・裏面サンプル ＆ ゲスト「御」消しマナー解説</span>
              </h2>
              <p className="text-xs text-stone-500 mt-0.5">
                新郎新婦側が用意する印刷面と、ゲストが返信する際の作法（食物アレルギー申告）を完全解説。
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* Postcard Front (Address side) */}
              <div className="p-6 border-2 border-stone-300 rounded-xl bg-white shadow-xs space-y-5 font-serif-jp">
                <div className="flex justify-between items-start">
                  <div className="w-14 h-16 border-2 border-rose-300 rounded flex items-center justify-center text-[10px] text-rose-800 bg-rose-50 text-center leading-tight">
                    慶事用<br />寿切手<br />貼付欄
                  </div>
                  <div className="flex gap-1">
                    {[1, 0, 0, 0, 0, 0, 1].map((n, i) => (
                      <div key={i} className="w-5 h-7 border border-rose-400 rounded-xs flex items-center justify-center text-xs font-mono text-rose-800">
                        {n}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="py-6 text-center space-y-2">
                  <div className="text-xs text-stone-500 font-sans">宛先（新郎新婦住所）</div>
                  <div className="text-sm text-stone-800">東京都千代田区1-2-3</div>
                  <div className="text-2xl font-bold tracking-widest text-stone-900 pt-2">
                    山田 太郎 <span className="text-stone-400 text-lg">行</span>
                  </div>
                </div>

                <div className="p-2.5 bg-amber-50 rounded-lg border border-amber-200 text-[11px] text-amber-950 font-sans leading-relaxed">
                  💡 <strong>マナー：</strong> ゲストが返信する際、受取人名下の「行」の字を二重線で消し、左横に「様」と書き直すのが日本の慶事マナーです。
                </div>
              </div>

              {/* Postcard Back (Reply side) */}
              <div className="p-6 border-2 border-stone-300 rounded-xl bg-white shadow-xs space-y-4 font-serif-jp text-xs">
                <div className="text-center font-bold text-sm border-b border-stone-200 pb-2">
                  御出席 ｜ 御欠席
                </div>

                <div className="p-3 bg-stone-50 rounded-lg space-y-2 font-sans">
                  <div className="flex items-center gap-2">
                    <span className="w-16 text-stone-500 shrink-0">ご芳名:</span>
                    <div className="border-b border-stone-300 flex-1 py-1 font-bold text-stone-900">
                      山田 友紀
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-16 text-stone-500 shrink-0">ご住所:</span>
                    <div className="border-b border-stone-300 flex-1 py-1 text-stone-700">
                      東京都港区六本木1-2-3
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-16 text-stone-500 shrink-0">お電話:</span>
                    <div className="border-b border-stone-300 flex-1 py-1 text-stone-700 font-mono">
                      090-1234-5678
                    </div>
                  </div>
                </div>

                {/* Allergy Input Box (Critical) */}
                <div className="p-3 bg-rose-50/70 rounded-lg border border-rose-200 space-y-1 font-sans">
                  <span className="font-bold text-rose-950 text-[11px] flex items-center gap-1">
                    <Utensils className="w-3.5 h-3.5 text-rose-600" />
                    おアレルギー等でお召し上がりになれない食材
                  </span>
                  <p className="text-[10px] text-stone-600">
                    特定原材料8品目（えび、かに、卵、乳、小麦、そば、落花生、くるみ）等
                  </p>
                  <div className="bg-white p-2 rounded border border-rose-200 text-xs text-stone-800">
                    甲殻類（エビ・カニ）のアレルギーがあります。エキスも不可です。
                  </div>
                </div>

                <div className="text-[10px] text-stone-500 leading-tight">
                  ※メッセージ欄：「ご結婚おめでとうございます！晴れ姿を楽しみにしております」
                </div>
              </div>

            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 3: 現代のWEB招待状（LINE・メール送信型）                             */}
      {/* ========================================================================= */}
      {activeTab === 'web' && (
        <div className="space-y-6">
          <div className="bg-white rounded-2xl border border-stone-200 p-6 sm:p-8 shadow-xs space-y-6">
            <div className="flex flex-wrap items-center justify-between border-b border-stone-100 pb-3 gap-2">
              <div>
                <h2 className="text-base font-bold font-serif-jp text-stone-900 flex items-center gap-2">
                  <Smartphone className="w-5 h-5 text-emerald-600" />
                  <span>今どきのWEB招待状（LINE・メール送信型）スマホ画面プレビュー</span>
                </h2>
                <p className="text-xs text-stone-500 mt-0.5">
                  友人はWEB招待状、上司や親族は紙の招待状と「送り分け」するのが現代ウェディングの最強スタンダードです。
                </p>
              </div>

              <button
                onClick={handleCopyWebUrl}
                className="no-print inline-flex items-center gap-1.5 px-3 py-1.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-900 rounded-lg text-xs font-semibold border border-emerald-300"
              >
                <Share2 className="w-3.5 h-3.5 text-emerald-700" />
                <span>{copySuccess ? 'LINE送信リンクをコピー済！' : '招待状URLをコピー'}</span>
              </button>
            </div>

            {/* Smartphone UI Mockup */}
            <div className="max-w-sm mx-auto border-8 border-stone-800 rounded-3xl overflow-hidden shadow-2xl bg-stone-50">
              {/* Phone Status Bar */}
              <div className="bg-stone-800 text-white text-[10px] px-4 py-1 flex justify-between items-center font-mono">
                <span>11:30</span>
                <span className="flex items-center gap-1">5G 100%</span>
              </div>

              {/* Web Invitation Hero Screen */}
              <div className="p-5 space-y-4 text-center bg-linear-to-b from-amber-50/80 via-white to-stone-50 text-stone-900">
                <div className="w-16 h-16 rounded-full bg-amber-100 border-2 border-amber-300 mx-auto flex items-center justify-center text-amber-800">
                  <Heart className="w-8 h-8 fill-amber-700/20 text-amber-700" />
                </div>

                <div className="space-y-1">
                  <span className="text-[10px] tracking-widest text-amber-800 uppercase font-bold">
                    WEDDING INVITATION
                  </span>
                  <h3 className="text-lg font-bold font-serif-jp text-stone-950">
                    Taro & Hanako
                  </h3>
                  <div className="text-xs text-stone-500 font-mono">2026.11.22 SUN (大安)</div>
                </div>

                {/* Countdown Timer */}
                <div className="p-3 bg-white rounded-xl border border-stone-200 shadow-xs grid grid-cols-3 gap-2 text-center font-mono">
                  <div>
                    <span className="text-base font-bold text-amber-900">22</span>
                    <span className="text-[9px] text-stone-400 block">DAYS</span>
                  </div>
                  <div>
                    <span className="text-base font-bold text-amber-900">14</span>
                    <span className="text-[9px] text-stone-400 block">HOURS</span>
                  </div>
                  <div>
                    <span className="text-base font-bold text-amber-900">45</span>
                    <span className="text-[9px] text-stone-400 block">MINUTES</span>
                  </div>
                </div>

                {/* Message */}
                <p className="text-xs text-stone-600 leading-relaxed font-serif-jp px-2">
                  日頃お世話になっている皆様へ<br />
                  私たちの結婚披露宴を執り行います<br />
                  ぜひご出席賜りますようご案内申し上げます
                </p>

                {/* Map & Add to Calendar buttons */}
                <div className="space-y-2 pt-2 text-xs">
                  <div className="p-2.5 bg-white rounded-lg border border-stone-200 text-left space-y-1">
                    <span className="font-bold text-stone-900 flex items-center gap-1 text-[11px]">
                      <MapPin className="w-3 h-3 text-rose-600" />
                      グランドホテル＆リゾート 本館3階 鳳凰の間
                    </span>
                    <div className="text-[10px] text-stone-500 font-mono">東京都千代田区紀尾井町4-1</div>
                  </div>

                  {/* Online RSVP Action Button */}
                  <button className="w-full py-2.5 bg-emerald-600 text-white font-bold rounded-xl text-xs shadow-md flex items-center justify-center gap-1.5 hover:bg-emerald-700">
                    <Check className="w-4 h-4 stroke-3" />
                    <span>出欠のご返信はこちら（1分で完了）</span>
                  </button>

                  <button className="w-full py-2 bg-stone-100 text-stone-700 font-semibold rounded-xl text-[11px] border border-stone-300 flex items-center justify-center gap-1">
                    <Calendar className="w-3.5 h-3.5 text-stone-500" />
                    <span>Googleカレンダーに登録</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Modern Advantages List */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs pt-4 border-t border-stone-200">
              <div className="p-4 bg-emerald-50/50 rounded-xl border border-emerald-200 space-y-2">
                <span className="font-bold text-emerald-950 flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-emerald-700" />
                  WEB招待状の劇的な実務メリット
                </span>
                <ul className="space-y-1.5 text-stone-700">
                  {data.webInvitation.modernAdvantages.map((adv, i) => (
                    <li key={i} className="flex items-start gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                      <span>{adv}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="p-4 bg-amber-50/50 rounded-xl border border-amber-200 space-y-2">
                <span className="font-bold text-amber-950 flex items-center gap-1.5">
                  <AlertCircle className="w-4 h-4 text-amber-700" />
                  プロデューサーの贈り分け戦略
                </span>
                <p className="text-stone-700 leading-relaxed">
                  年配の親族や会社上司・主賓には「格式ある紙の招待状（寿切手貼付）」を持参または郵送し、友人や同僚には「LINE・メールでWEB招待状」を送信するハイブリッド方式が現在のベストプラクティスです。
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
