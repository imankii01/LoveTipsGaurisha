export interface LoveTip {
  id: string;
  tip_number: string;
  content: string;
  category: string;
  author: string;
  is_featured: boolean;
  vote_count: number;
  bookmark_count: number;
  created_at: string;
  updated_at: string;
}

export interface Question {
  id: string;
  question: string;
  answer?: string;
  is_anonymous: boolean;
  is_published: boolean;
  category: string;
  created_at: string;
  answered_at?: string;
  vote_count: number;
}

export interface Confession {
  id: string;
  content: string;
  category: 'funny' | 'sad' | 'crush' | 'spicy' | 'general';
  is_approved: boolean;
  vote_count: number;
  created_at: string;
}

export interface QuizResult {
  id: string;
  quiz_type: string;
  user_session?: string;
  user_id?: string;
  answers: Record<string, any>;
  result: Record<string, any>;
  score?: number;
  created_at: string;
}

export interface TipVote {
  id: string;
  tip_id: string;
  user_session?: string;
  user_id?: string;
  vote_type: 'like' | 'love';
  created_at: string;
}

export interface TipBookmark {
  id: string;
  tip_id: string;
  user_session?: string;
  user_id?: string;
  created_at: string;
}