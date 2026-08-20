/**
 * Comprehensive Grammar, Spell Checking, POS Tagging, and Analytics Engine
 * Built for Textify Platform by Suhas S
 */

// Basic English dictionary & common misspellings dictionary
const COMMON_MISSPELLINGS = {
  teh: "the",
  recieve: "receive",
  seperate: "separate",
  definately: "definitely",
  untill: "until",
  occured: "occurred",
  goverment: "government",
  accros: "across",
  begining: "beginning",
  beleive: "believe",
  colleague: "colleague",
  environment: "environment",
  freind: "friend",
  grammer: "grammar",
  knowlege: "knowledge",
  truely: "truly",
  wierd: "weird",
  writting: "writing",
  tommorow: "tomorrow",
  sucessful: "successful",
  privilege: "privilege",
  neccessary: "necessary"
};

// Common POS lexicon rules
const POS_LEXICON = {
  // Determiners / Articles
  the: "Determiner", a: "Determiner", an: "Determiner", this: "Determiner", that: "Determiner",
  these: "Determiner", those: "Determiner", my: "Determiner", your: "Determiner", his: "Determiner",
  her: "Determiner", its: "Determiner", our: "Determiner", their: "Determiner", every: "Determiner",
  each: "Determiner", some: "Determiner", any: "Determiner",

  // Pronouns
  i: "Pronoun", me: "Pronoun", we: "Pronoun", us: "Pronoun", you: "Pronoun", he: "Pronoun",
  him: "Pronoun", she: "Pronoun", it: "Pronoun", they: "Pronoun", them: "Pronoun", who: "Pronoun",
  whom: "Pronoun", someone: "Pronoun", anyone: "Pronoun", everyone: "Pronoun", nobody: "Pronoun",

  // Prepositions
  in: "Preposition", on: "Preposition", at: "Preposition", to: "Preposition", for: "Preposition",
  with: "Preposition", about: "Preposition", against: "Preposition", between: "Preposition",
  into: "Preposition", through: "Preposition", during: "Preposition", before: "Preposition",
  after: "Preposition", above: "Preposition", below: "Preposition", from: "Preposition",
  up: "Preposition", down: "Preposition", in: "Preposition", out: "Preposition", off: "Preposition",
  over: "Preposition", under: "Preposition", again: "Preposition", further: "Preposition",

  // Conjunctions
  and: "Conjunction", but: "Conjunction", or: "Conjunction", nor: "Conjunction", so: "Conjunction",
  yet: "Conjunction", because: "Conjunction", although: "Conjunction", since: "Conjunction",
  unless: "Conjunction", while: "Conjunction", whereas: "Conjunction",

  // Interjections
  oh: "Interjection", wow: "Interjection", hey: "Interjection", alas: "Interjection",
  oops: "Interjection", hurray: "Interjection", ah: "Interjection", bravo: "Interjection"
};

/**
 * Calculates text statistics
 */
export const calculateTextStats = (text = "") => {
  if (!text.trim()) {
    return {
      words: 0,
      characters: 0,
      sentences: 0,
      paragraphs: 0,
      avgSentenceLength: 0,
      readingTime: "0 sec",
      readability: "N/A",
      score: 100,
      tone: "Neutral"
    };
  }

  const cleanText = text.trim();
  const characters = cleanText.length;
  const wordsArray = cleanText.split(/\s+/).filter(Boolean);
  const words = wordsArray.length;

  const sentenceRegex = /[.!?]+/g;
  const sentencesArray = cleanText.split(sentenceRegex).filter((s) => s.trim().length > 0);
  const sentences = sentencesArray.length || 1;

  const paragraphsArray = cleanText.split(/\n+/).filter((p) => p.trim().length > 0);
  const paragraphs = paragraphsArray.length || 1;

  const avgSentenceLength = Math.round((words / sentences) * 10) / 10;
  const readingTimeSeconds = Math.ceil((words / 200) * 60);
  const readingTime = readingTimeSeconds < 60 ? `${readingTimeSeconds} sec` : `${Math.ceil(readingTimeSeconds / 60)} min`;

  // Flesch-Kincaid Readability estimate
  const syllables = wordsArray.reduce((acc, word) => acc + countSyllables(word), 0);
  const fleschScore = 206.835 - 1.015 * (words / sentences) - 84.6 * (syllables / (words || 1));
  let readability = "Standard";
  if (fleschScore >= 80) readability = "Easy / Conversational";
  else if (fleschScore >= 60) readability = "Standard / Clear";
  else if (fleschScore >= 40) readability = "Fairly Complex";
  else readability = "Academic / Advanced";

  // Tone detection
  const tone = detectTone(cleanText);

  return {
    words,
    characters,
    sentences,
    paragraphs,
    avgSentenceLength,
    readingTime,
    readability,
    fleschScore: Math.max(0, Math.min(100, Math.round(fleschScore))),
    tone
  };
};

/**
 * Counts syllables in a word
 */
function countSyllables(word) {
  word = word.toLowerCase().replace(/[^a-z]/g, "");
  if (!word) return 1;
  if (word.length <= 3) return 1;
  word = word.replace(/(?:endsWith|ed|es|e)$/, "");
  const matches = word.match(/[aeiouy]{1,2}/g);
  return matches ? matches.length : 1;
}

/**
 * Detects tone of writing
 */
export const detectTone = (text = "") => {
  const lower = text.toLowerCase();
  const academicWords = ["furthermore", "consequently", "hypothesis", "analysis", "empirical", "methodology", "thus", "hence"];
  const professionalWords = ["regarding", "implementation", "deliverable", "optimize", "strategy", "objective", "efficient", "platform"];
  const casualWords = ["cool", "awesome", "yeah", "gonna", "wanna", "stuff", "lol", "hey", "guys"];
  const persuasiveWords = ["must", "essential", "proven", "transform", "guarantee", "crucial", "extraordinary"];

  let scores = { Professional: 0, Academic: 0, Casual: 0, Persuasive: 0, Formal: 0 };

  academicWords.forEach((w) => { if (lower.includes(w)) scores.Academic += 2; });
  professionalWords.forEach((w) => { if (lower.includes(w)) scores.Professional += 2; });
  casualWords.forEach((w) => { if (lower.includes(w)) scores.Casual += 2; });
  persuasiveWords.forEach((w) => { if (lower.includes(w)) scores.Persuasive += 2; });

  if (text.includes("!") || text.includes("?")) scores.Casual += 1;
  if (text.split(".").length > 4) scores.Professional += 1;

  let maxTone = "Neutral";
  let maxScore = 0;
  Object.entries(scores).forEach(([t, s]) => {
    if (s > maxScore) {
      maxScore = s;
      maxTone = t;
    }
  });

  return maxTone;
};

/**
 * Checks text for spelling, grammar, punctuation, subject-verb agreement, prepositions, articles, etc.
 */
export const checkGrammarAndSpelling = (text = "", customDictionary = []) => {
  if (!text || !text.trim()) {
    return { errors: [], score: 100, correctedText: text };
  }

  const errors = [];
  const words = text.split(/(\s+|[.,!?;:"()])/);

  // Custom dict lookup set (lowercase)
  const customDictSet = new Set(customDictionary.map((w) => w.toLowerCase()));

  // Rule 1: Common Misspellings
  let wordOffset = 0;
  words.forEach((token) => {
    const cleanToken = token.replace(/[^a-zA-Z]/g, "").toLowerCase();
    if (cleanToken && COMMON_MISSPELLINGS[cleanToken] && !customDictSet.has(cleanToken)) {
      const correction = COMMON_MISSPELLINGS[cleanToken];
      errors.push({
        id: `err_spell_${wordOffset}_${cleanToken}`,
        type: "Spelling Error",
        original: token,
        suggestion: token[0] === token[0].toUpperCase() ? correction.charAt(0).toUpperCase() + correction.slice(1) : correction,
        explanation: `"${token}" is misspelled. Recommended spelling is "${correction}".`,
        category: "spelling"
      });
    }
    wordOffset += token.length;
  });

  // Rule 2: Repeated Words (e.g. "the the", "in in")
  const repeatedRegex = /\b([a-zA-Z]+)\s+\1\b/gi;
  let match;
  while ((match = repeatedRegex.exec(text)) !== null) {
    errors.push({
      id: `err_rep_${match.index}`,
      type: "Repeated Word",
      original: match[0],
      suggestion: match[1],
      explanation: `Duplicate word "${match[1]}". Consider removing the repeated instance.`,
      category: "grammar"
    });
  }

  // Rule 3: Subject-Verb Agreement Errors (e.g. "He go to", "She do not", "They is")
  const subVerbPatterns = [
    { pattern: /\b(he|she|it)\s+(go)\b/gi, fix: "$1 goes", exp: "Use 'goes' for third-person singular subjects (he, she, it)." },
    { pattern: /\b(he|she|it)\s+(do)\b/gi, fix: "$1 does", exp: "Use 'does' for third-person singular subjects." },
    { pattern: /\b(he|she|it)\s+(have)\b/gi, fix: "$1 has", exp: "Use 'has' instead of 'have' with singular pronouns." },
    { pattern: /\b(they|we|you)\s+(is)\b/gi, fix: "$1 are", exp: "Use plural verb 'are' with plural pronouns." },
    { pattern: /\b(i)\s+(is)\b/gi, fix: "I am", exp: "Use 'am' with pronoun 'I'." },
    { pattern: /\b(a)\s+([aeiou][a-z]+)\b/gi, fix: "an $2", exp: "Use article 'an' before words starting with a vowel sound." },
    { pattern: /\b(an)\s+([bcdfghjklmnpqrstvwxyz][a-z]+)\b/gi, fix: "a $2", exp: "Use article 'a' before words starting with a consonant sound." }
  ];

  subVerbPatterns.forEach(({ pattern, fix, exp }, i) => {
    let pMatch;
    while ((pMatch = pattern.exec(text)) !== null) {
      const replacement = pMatch[0].replace(pattern, fix);
      errors.push({
        id: `err_sv_${i}_${pMatch.index}`,
        type: "Grammar Error",
        original: pMatch[0],
        suggestion: replacement,
        explanation: exp,
        category: "grammar"
      });
    }
  });

  // Calculate Quality Score
  const totalWords = text.trim().split(/\s+/).length;
  const errorPenalty = errors.length * 8;
  const score = Math.max(10, Math.min(100, 100 - Math.round((errorPenalty / (totalWords || 1)) * 100)));

  // Generate Auto-Corrected Text
  let correctedText = text;
  errors.forEach((err) => {
    correctedText = correctedText.replace(err.original, err.suggestion);
  });

  return { errors, score, correctedText };
};

/**
 * Analyzes Parts of Speech for every word in text
 */
export const analyzePartsOfSpeech = (text = "") => {
  if (!text || !text.trim()) {
    return { tokens: [], stats: {}, categoryCounts: {} };
  }

  const tokens = [];
  const categoryCounts = {
    Noun: 0,
    Verb: 0,
    Adjective: 0,
    Adverb: 0,
    Pronoun: 0,
    Preposition: 0,
    Conjunction: 0,
    Interjection: 0,
    Determiner: 0
  };

  const wordsAndPunct = text.split(/(\s+|[.,!?;:"()])/);

  wordsAndPunct.forEach((token) => {
    if (!token) return;

    if (/^\s+$/.test(token) || /^[.,!?;:"()]+$/.test(token)) {
      tokens.push({ text: token, isWord: false });
      return;
    }

    const lower = token.toLowerCase();
    let pos = "Noun"; // default fallback

    if (POS_LEXICON[lower]) {
      pos = POS_LEXICON[lower];
    } else if (lower.endsWith("ing") || lower.endsWith("ed") || lower.endsWith("ate") || lower.endsWith("ize")) {
      pos = "Verb";
    } else if (lower.endsWith("ly")) {
      pos = "Adverb";
    } else if (lower.endsWith("ful") || lower.endsWith("ous") || lower.endsWith("ive") || lower.endsWith("able") || lower.endsWith("ish") || lower.endsWith("al")) {
      pos = "Adjective";
    } else if (lower.endsWith("tion") || lower.endsWith("sion") || lower.endsWith("ment") || lower.endsWith("ness") || lower.endsWith("ity")) {
      pos = "Noun";
    }

    categoryCounts[pos] = (categoryCounts[pos] || 0) + 1;

    tokens.push({
      text: token,
      isWord: true,
      pos
    });
  });

  return { tokens, categoryCounts };
};
