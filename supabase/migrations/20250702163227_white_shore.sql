/*
  # Love Guru Tips Database Schema

  1. New Tables
    - `love_tips` - Daily love tips with voting and bookmarking
    - `questions` - Anonymous Q&A submissions
    - `confessions` - Anonymous confessions with categories
    - `quiz_results` - Love language and personality quiz results
    - `tip_votes` - User votes on tips
    - `tip_bookmarks` - User bookmarks for tips

  2. Security
    - Enable RLS on all tables
    - Add policies for public read access and authenticated user interactions
    - Anonymous submissions allowed for questions and confessions
*/

-- Love Tips Table
CREATE TABLE IF NOT EXISTS love_tips (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  tip_number text UNIQUE NOT NULL,
  content text NOT NULL,
  category text NOT NULL DEFAULT 'general',
  author text DEFAULT 'Gaurisha',
  is_featured boolean DEFAULT false,
  vote_count integer DEFAULT 0,
  bookmark_count integer DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Questions Table (Anonymous Q&A)
CREATE TABLE IF NOT EXISTS questions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  question text NOT NULL,
  answer text,
  is_anonymous boolean DEFAULT true,
  is_published boolean DEFAULT false,
  category text DEFAULT 'general',
  created_at timestamptz DEFAULT now(),
  answered_at timestamptz,
  vote_count integer DEFAULT 0
);

-- Confessions Table
CREATE TABLE IF NOT EXISTS confessions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  content text NOT NULL,
  category text NOT NULL DEFAULT 'general', -- funny, sad, crush, spicy
  is_approved boolean DEFAULT false,
  vote_count integer DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

-- Quiz Results Table
CREATE TABLE IF NOT EXISTS quiz_results (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  quiz_type text NOT NULL, -- love_language, loyalty_test, attachment_style
  user_session text, -- For anonymous users
  user_id uuid REFERENCES auth.users(id),
  answers jsonb NOT NULL,
  result jsonb NOT NULL,
  score integer,
  created_at timestamptz DEFAULT now()
);

-- Tip Votes Table
CREATE TABLE IF NOT EXISTS tip_votes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  tip_id uuid REFERENCES love_tips(id) ON DELETE CASCADE,
  user_session text,
  user_id uuid REFERENCES auth.users(id),
  vote_type text CHECK (vote_type IN ('like', 'love')) DEFAULT 'like',
  created_at timestamptz DEFAULT now(),
  UNIQUE(tip_id, user_session),
  UNIQUE(tip_id, user_id)
);

-- Tip Bookmarks Table
CREATE TABLE IF NOT EXISTS tip_bookmarks (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  tip_id uuid REFERENCES love_tips(id) ON DELETE CASCADE,
  user_session text,
  user_id uuid REFERENCES auth.users(id),
  created_at timestamptz DEFAULT now(),
  UNIQUE(tip_id, user_session),
  UNIQUE(tip_id, user_id)
);

-- Enable RLS
ALTER TABLE love_tips ENABLE ROW LEVEL SECURITY;
ALTER TABLE questions ENABLE ROW LEVEL SECURITY;
ALTER TABLE confessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE quiz_results ENABLE ROW LEVEL SECURITY;
ALTER TABLE tip_votes ENABLE ROW LEVEL SECURITY;
ALTER TABLE tip_bookmarks ENABLE ROW LEVEL SECURITY;

-- RLS Policies

-- Love Tips: Public read, admin write
CREATE POLICY "Anyone can read love tips"
  ON love_tips FOR SELECT
  TO public
  USING (true);

-- Questions: Public insert, admin update
CREATE POLICY "Anyone can submit questions"
  ON questions FOR INSERT
  TO public
  WITH CHECK (true);

CREATE POLICY "Anyone can read published questions"
  ON questions FOR SELECT
  TO public
  USING (is_published = true);

-- Confessions: Public insert and read approved
CREATE POLICY "Anyone can submit confessions"
  ON confessions FOR INSERT
  TO public
  WITH CHECK (true);

CREATE POLICY "Anyone can read approved confessions"
  ON confessions FOR SELECT
  TO public
  USING (is_approved = true);

-- Quiz Results: Public insert and read own results
CREATE POLICY "Anyone can submit quiz results"
  ON quiz_results FOR INSERT
  TO public
  WITH CHECK (true);

CREATE POLICY "Users can read their own quiz results"
  ON quiz_results FOR SELECT
  TO public
  USING (
    user_session = current_setting('app.user_session', true) OR
    user_id = auth.uid()
  );

-- Tip Votes: Public insert and read
CREATE POLICY "Anyone can vote on tips"
  ON tip_votes FOR INSERT
  TO public
  WITH CHECK (true);

CREATE POLICY "Anyone can read tip votes"
  ON tip_votes FOR SELECT
  TO public
  USING (true);

-- Tip Bookmarks: Public insert and read own bookmarks
CREATE POLICY "Anyone can bookmark tips"
  ON tip_bookmarks FOR INSERT
  TO public
  WITH CHECK (true);

CREATE POLICY "Users can read their own bookmarks"
  ON tip_bookmarks FOR SELECT
  TO public
  USING (
    user_session = current_setting('app.user_session', true) OR
    user_id = auth.uid()
  );

-- Insert sample data
INSERT INTO love_tips (tip_number, content, category) VALUES
('001', 'When they say "I''m busy," don''t chase. Love doesn''t need reminders, effort does.', 'boundaries'),
('002', 'Green flag: They remember small details about your day and ask follow-up questions.', 'recognition'),
('003', 'Before saying "you always" or "you never," pause. Use "I feel" instead. Watch the magic happen.', 'communication'),
('004', 'If someone wants to be in your life, they''ll make space for you. Stop making excuses for their absence.', 'boundaries'),
('005', 'Real love doesn''t make you question your worth. It makes you feel more yourself, not less.', 'self-worth'),
('006', 'Stop texting "good morning" to someone who goes to sleep without saying goodnight to you.', 'boundaries'),
('007', 'Your person will choose you every day, not just when it''s convenient for them.', 'commitment'),
('008', 'Red flag: They only text you late at night. You''re not a midnight snack, you''re a whole meal.', 'recognition'),
('009', 'Learn the difference between someone who speaks to you in their free time vs someone who frees their time to speak to you.', 'priorities'),
('010', 'If they wanted to, they would. Stop creating stories for their silence.', 'reality-check'),
('011', 'You can''t love someone into loving you back. Save your energy for someone who matches it.', 'self-love'),
('012', 'Green flag: They apologize when they''re wrong and don''t make you feel crazy for being upset.', 'communication'),
('013', 'Stop being available for people who only remember you when they need something.', 'boundaries'),
('014', 'Your standards aren''t too high. Their effort is too low.', 'self-worth'),
('015', 'If you have to beg for their attention, you already have your answer.', 'reality-check'),
('016', 'Real intimacy is being comfortable in silence together, not just talking all the time.', 'intimacy'),
('017', 'They should be adding to your peace, not disturbing it.', 'peace'),
('018', 'Stop giving relationship advice to yourself that you wouldn''t give to your best friend.', 'self-love'),
('019', 'Green flag: They respect your "no" without making you feel guilty about it.', 'respect'),
('020', 'You''re not hard to love. You just haven''t met someone who knows how to love you properly.', 'self-worth'),
('021', 'If they''re interested, you''ll know. If they''re not, you''ll be confused.', 'clarity'),
('022', 'Stop romanticizing people who don''t even text you back consistently.', 'reality-check'),
('023', 'Your healing is not their responsibility, but how they treat you during it says everything.', 'healing'),
('024', 'Red flag: They make you feel like you''re asking for too much when you ask for basic respect.', 'respect'),
('025', 'The right person will never make you choose between your dreams and your relationship.', 'support'),
('026', 'Stop explaining yourself to people who are committed to misunderstanding you.', 'boundaries'),
('027', 'Green flag: They celebrate your wins without making it about themselves.', 'support'),
('028', 'You don''t need closure from everyone who hurt you. Sometimes moving on is the closure.', 'healing'),
('029', 'If they can go days without talking to you, they can go forever. Act accordingly.', 'reality-check'),
('030', 'Your energy is sacred. Don''t waste it on people who drain it.', 'energy');

-- Insert sample questions
INSERT INTO questions (question, answer, is_published, category) VALUES
('How do I know if someone really likes me or is just being friendly?', 'Look for consistency in their actions. Someone who likes you will make effort to spend time with you, remember details about your conversations, and prioritize communication with you. Friendly people are nice to everyone - someone interested will treat you differently.', true, 'dating'),
('My partner never initiates plans. Should I be worried?', 'This could indicate different communication styles or comfort levels with planning. Have an honest conversation about how you both prefer to handle plans. If they never initiate anything in the relationship, that might signal a deeper issue with effort and investment.', true, 'relationships'),
('How long should I wait for someone to text me back?', 'There''s no universal rule, but consistency matters more than speed. Someone genuinely interested will respond within a reasonable timeframe for them. If you''re always waiting days for responses, that''s your answer about their level of interest.', true, 'communication'),
('Is it normal to feel anxious in a new relationship?', 'Some nervousness is completely normal when you care about someone new. However, if you''re constantly anxious, walking on eggshells, or feeling insecure, pay attention to whether it''s your past experiences or their behavior causing this feeling.', true, 'anxiety'),
('How do I get over someone who doesn''t want me?', 'Accept that wanting someone who doesn''t want you back is not love - it''s attachment. Focus on rebuilding your self-worth, reconnecting with friends and hobbies, and remember that the right person will choose you enthusiastically.', true, 'healing');

-- Insert sample confessions
INSERT INTO confessions (content, category, is_approved) VALUES
('I''ve been in love with my best friend for 3 years but I''m too scared to tell them because I don''t want to ruin our friendship. Every time they date someone else, my heart breaks a little more.', 'crush', true),
('I pretended to like the same music as my ex just to have something in common. Now I actually love that genre and it reminds me of them every time I hear it.', 'funny', true),
('I still have all our chat screenshots saved in a hidden folder. I know I should delete them but I can''t bring myself to do it yet.', 'sad', true),
('My partner thinks I''m asleep but I can feel them playing with my hair and whispering how much they love me. It''s the most beautiful thing and I never want them to stop.', 'spicy', true),
('I wrote them a love letter but never sent it. It''s been sitting in my drafts for 6 months. Maybe someday I''ll be brave enough.', 'crush', true),
('We broke up 2 years ago but I still wear the perfume they bought me because it makes me feel confident.', 'sad', true),
('I''m scared I''ll never love anyone the way I loved them, and I''m even more scared that maybe that''s okay.', 'sad', true),
('They said they loved me first while we were both drunk. The next morning they acted like nothing happened but I remember every word.', 'spicy', true);