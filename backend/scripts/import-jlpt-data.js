import db, { initDatabase } from '../src/db/connection.js';

initDatabase();

const sampleVocab = [
  // N5 Vocab & Kanji
  { kanji: '日', kana: 'ひ / にち', romaji: 'hi / nichi', meaning: 'Day, Sun, Japan', example_sentence: '今日は良い天気です。 (Today is good weather.)', jlpt_level: 'N5', tags: 'Kanji, N5' },
  { kanji: '本', kana: 'ほん', romaji: 'hon', meaning: 'Book, Origin', example_sentence: '図書館で本を借りました。 (I borrowed a book at the library.)', jlpt_level: 'N5', tags: 'Vocab, N5' },
  { kanji: '人', kana: 'ひと', romaji: 'hito', meaning: 'Person, Human', example_sentence: 'あの人は誰ですか。 (Who is that person?)', jlpt_level: 'N5', tags: 'Kanji, N5' },
  { kanji: '食べる', kana: 'たべる', romaji: 'taberu', meaning: 'To eat', example_sentence: '朝ごはんを食べます。 (I eat breakfast.)', jlpt_level: 'N5', tags: 'Verb, N5' },
  { kanji: '飲む', kana: 'のむ', romaji: 'nomu', meaning: 'To drink', example_sentence: 'お茶を飲みましょう。 (Let\'s drink green tea.)', jlpt_level: 'N5', tags: 'Verb, N5' },
  { kanji: '水', kana: 'みず', romaji: 'mizu', meaning: 'Water', example_sentence: '冷たい水をください。 (Cold water, please.)', jlpt_level: 'N5', tags: 'Noun, N5' },
  { kanji: '学校', kana: 'がっこう', romaji: 'gakkou', meaning: 'School', example_sentence: '毎日学校へ行きます。 (I go to school every day.)', jlpt_level: 'N5', tags: 'Noun, N5' },
  { kanji: '先生', kana: 'せんせい', romaji: 'sensei', meaning: 'Teacher, Master', example_sentence: '日本語の先生は親切です。 (The Japanese teacher is kind.)', jlpt_level: 'N5', tags: 'Noun, N5' },
  { kanji: '友だち', kana: 'ともだち', romaji: 'tomodachi', meaning: 'Friend', example_sentence: '友だちと映画を見ました。 (I watched a movie with a friend.)', jlpt_level: 'N5', tags: 'Noun, N5' },

  // N4 Vocab & Kanji
  { kanji: '案内', kana: 'あんない', romaji: 'annai', meaning: 'Guidance, Information', example_sentence: '街を案内します。 (I will show you around the town.)', jlpt_level: 'N4', tags: 'Noun, N4' },
  { kanji: '運転', kana: 'うんてん', romaji: 'unten', meaning: 'Driving, Operation', example_sentence: '車を運転できますか。 (Can you drive a car?)', jlpt_level: 'N4', tags: 'Verb, N4' },
  { kanji: '経験', kana: 'けいけん', romaji: 'keiken', meaning: 'Experience', example_sentence: '日本での生活は良い経験です。 (Living in Japan is a good experience.)', jlpt_level: 'N4', tags: 'Noun, N4' },
  { kanji: '説明', kana: 'せつめい', romaji: 'setsumei', meaning: 'Explanation', example_sentence: 'もう一度説明してください。 (Please explain one more time.)', jlpt_level: 'N4', tags: 'Verb, N4' },
  { kanji: '準備', kana: 'じゅんび', romaji: 'junbi', meaning: 'Preparation', example_sentence: '旅行の準備をします。 (I will prepare for the trip.)', jlpt_level: 'N4', tags: 'Noun, N4' },

  // N3 Vocab & Kanji
  { kanji: '影響', kana: 'えいきょう', romaji: 'eikyou', meaning: 'Influence, Effect', example_sentence: '天候が野菜の価格に影響を与える。 (Weather affects vegetable prices.)', jlpt_level: 'N3', tags: 'Noun, N3' },
  { kanji: '解決', kana: 'かいけつ', romaji: 'kaiketsu', meaning: 'Solution, Settlement', example_sentence: '問題を解決しました。 (We solved the problem.)', jlpt_level: 'N3', tags: 'Verb, N3' },
  { kanji: '努力', kana: 'どりょく', romaji: 'doryoku', meaning: 'Effort, Endeavor', example_sentence: '夢のために努力します。 (I make an effort for my dream.)', jlpt_level: 'N3', tags: 'Noun, N3' },
  { kanji: '感情', kana: 'かんじょう', romaji: 'kanjou', meaning: 'Emotion, Feeling', example_sentence: '自分の感情を表現する。 (Expressing one\'s emotions.)', jlpt_level: 'N3', tags: 'Noun, N3' },

  // N2 Vocab & Kanji
  { kanji: '維持', kana: 'いじ', romaji: 'iji', meaning: 'Maintenance, Preservation', example_sentence: '健康を維持することが大切だ。 (Maintaining health is important.)', jlpt_level: 'N2', tags: 'Noun, N2' },
  { kanji: '把握', kana: 'はあく', romaji: 'haaku', meaning: 'Grasp, Understanding', example_sentence: '現状を正確に把握する。 (Accurately grasp the current situation.)', jlpt_level: 'N2', tags: 'Verb, N2' },

  // N1 Vocab & Kanji
  { kanji: '凌駕', kana: 'りょうが', romaji: 'ryouga', meaning: 'Surpassing, Outstripping', example_sentence: '期待を遥かに凌駕する成果。 (Results far surpassing expectations.)', jlpt_level: 'N1', tags: 'Verb, N1' }
];

console.log('Seeding vocabulary database...');

const insertVocabStmt = db.prepare(`
  INSERT INTO vocabulary (kanji, kana, romaji, meaning, example_sentence, jlpt_level, tags, source)
  VALUES (?, ?, ?, ?, ?, ?, ?, 'jlpt-kanji-dictionary')
`);

const insertReviewStateStmt = db.prepare(`
  INSERT INTO review_state (vocabulary_id, ease_factor, interval_days, repetitions, due_date)
  VALUES (?, 2.5, 0, 0, datetime('now'))
`);

const insertMany = db.transaction((items) => {
  let count = 0;
  for (const item of items) {
    const res = insertVocabStmt.run(
      item.kanji,
      item.kana,
      item.romaji,
      item.meaning,
      item.example_sentence,
      item.jlpt_level,
      item.tags
    );
    const vocabId = res.lastInsertRowid;
    insertReviewStateStmt.run(vocabId);
    count++;
  }
  return count;
});

const count = insertMany(sampleVocab);
console.log(`Successfully seeded ${count} vocabulary items with review states!`);
process.exit(0);
