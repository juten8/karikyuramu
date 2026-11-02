/**
 * Types for 婚礼総合プランナー・プロデューサー認定資格 試験対策
 */

export type CourseId = 'basic' | 'producer' | 'master';

export interface CourseInfo {
  id: CourseId;
  title: string;
  badgeTitle: string;
  subtitle: string;
  description: string;
  targetLevel: string;
  hours: string;
  tuition: string;
  requirements: string;
  lectures: LectureInfo[];
  examPassingScore: number; // percentage, e.g. 70
  examTimeLimitMinutes: number; // e.g. 30
}

export interface LectureInfo {
  id: string; // e.g., 'basic-1'
  lectureNumber: number;
  title: string;
  focusTopics: string;
  description: string;
}

export type QuestionDifficulty = 'basic' | 'standard' | 'advanced';

export interface Question {
  id: string;
  courseId: CourseId;
  lectureId: string;
  category: string; // e.g. '法律・約款', '挙式進行', '和洋スタイリング', etc.
  difficulty: QuestionDifficulty;
  question: string;
  targetQuestionType: 'find_correct' | 'find_incorrect'; // 最も適切なものを選ぶ / 最も不適切なものを選ぶ
  options: string[];
  optionTruths: boolean[]; // whether each option 0..3 is factually true (○) or false (✕)
  correctIndex: number; // 0, 1, 2, or 3
  explanation: {
    correctPoint: string;
    detailedBreakdown: string[];
    proTip?: string; // 実務プロのアドバイス
    examTip?: string; // 試験対策の急所
  };
  tags: string[];
  workflowStage?: 1 | 2 | 3 | 4; // 婚礼実務4大工程との紐付け
}

export type WorkflowStageNumber = 1 | 2 | 3 | 4;

export interface WorkflowMilestoneTask {
  id: string;
  title: string;
  timing: string;
  description: string;
  heroineRisk: string; // 怠ると花嫁がどう失敗するか
  isMilestone?: boolean;
  relatedTool?: 'estimate' | 'seating';
}

export interface WorkflowStageInfo {
  stageNumber: WorkflowStageNumber;
  id: string;
  timing: string; // e.g. "6ヶ月前〜4ヶ月前"
  title: string;
  tagline: string;
  leadSummary: string;
  heroineWarning: string; // ヒロイン失敗の最大要因
  coreTasks: WorkflowMilestoneTask[];
  examPoints: string[];
  practicalManners: string[];
}

export interface VocabQuestion {
  id: string;
  courseId: CourseId;
  category: string;
  question: string; // sentence with blank
  answer: string; // 正解の単語
  reading?: string; // ふりがな
  acceptableAnswers?: string[]; // aliases
  hint: string;
  explanation: string;
}

export interface CheatSheetTopic {
  id: string;
  title: string;
  icon: string;
  summary: string;
  items: {
    label: string;
    value: string;
    detail?: string;
    caution?: string;
  }[];
}

export interface UserProgressState {
  answeredQuestions: Record<string, { answeredCount: number; correctCount: number; lastAnsweredAt: number }>;
  bookmarkedQuestionIds: string[];
  passedCourses: Record<CourseId, { passedAt: number; score: number; candidateName: string; certificateId: string }>;
  streakDays: number;
  lastActiveDate: string;
  soundEnabled: boolean;
  studentName: string;
  studyViewMode?: 'four_sheet' | 'single_qa'; // User's preferred learning view
}

export type BanquetStyle = 'french' | 'chinese' | 'wa_yoh' | 'buffet';

export interface CateringEquipmentItem {
  id: string;
  category: 'table_linen' | 'cutlery_glass' | 'kitchen_cooking' | 'cloak_reception' | 'gift_paper' | 'av_stage';
  name: string;
  unitPrice: number;       // 単価 (円/日 または 円/個)
  perPersonRatio?: number; // e.g. 1.0 = 1 per person, 2.0 = 2 per person
  perTableRatio?: number;  // e.g. 1 per table
  fixedQuantity?: number;  // fixed e.g. 4 mics
  unit: string;            // 枚, 組, 本, 台, etc.
  sparePct: number;        // e.g. 0.15 for 15% spare
  banquetStyles?: BanquetStyle[]; // applies only to specific banquet styles if set
  description: string;
  heroineRiskNote: string;
}

export type AppMode = 
  | 'workflow'       // 婚礼総合プロデュース 実務4大工程ロードマップ（予約・案内状・座席・進行）
  | 'estimate'       // 婚礼総合プロデュースお見積り＆四大工程連動執行シート
  | 'dispatch'       // 業者一覧連絡票（マルチベンダー緊急連絡網）＆ 配送先荷札・宛名伝票（ホテル気付・前日必着）
  | 'invitation'     // 案内状・返信ハガキ・WEB招待状（本状・消し方マナー・スマホLINE案内）
  | 'practical'      // 現場超実務 忘れ物ゼロ・親族肩書・結納品・鏡開き・プロデューサー心付け
  | 'table-setting'  // 4大料理形式テーブルセッティング図面（仏・中・和洋・ビュッフェ配置下図面）
  | 'catering'       // ケータリング見積書 兼 機材積載発注書（4大料理形式・PDF印刷）
  | 'seating'        // ヒロイン高砂＆配席レイアウトシミュレーター (主大臣方式・媒酌人)
  | 'courses'        // 自己学習・確認テスト（講義一覧・〇✕判定シート）
  | 'drill'          // 自己学習 〇✕即時判定シート＆一問一答
  | 'exam'           // 自己学習 本番模擬試験
  | 'exam-result'    // 自己学習 模試結果
  | 'weakness'       // 自己学習 弱点特訓
  | 'bookmarks'      // 自己学習 復習帳
  | 'vocab'          // 自己学習 単語記述特訓
  | 'cheatsheet'     // 要点集ハンドブック
  | 'diploma';       // 公式認定ディプロマ証書
