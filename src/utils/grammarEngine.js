/**
 * Comprehensive Grammar, Spell Checking, POS Tagging, and Analytics Engine
 * Built for Textify Platform by Suhas S
 */

// Comprehensive English dictionary & common shorthand/typo dictionary
const COMMON_MISSPELLINGS = {
  // Shorthand & informal typos
  vry: "very",
  mrning: "morning",
  evng: "evening",
  aftrnun: "afternoon",
  gud: "good",
  u: "you",
  ur: "your",
  r: "are",
  pls: "please",
  plz: "please",
  thx: "thanks",
  thanks: "thanks",
  bcoz: "because",
  bcuz: "because",
  wud: "would",
  shud: "should",
  cud: "could",
  clg: "college",
  univ: "university",
  abt: "about",
  txt: "text",
  msg: "message",
  eting: "eating",
  icream: "ice cream",
  icecream: "ice cream",
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
  neccessary: "necessary",
  alot: "a lot",
  dont: "don't",
  wont: "won't",
  cant: "can't",
  im: "I'm",
  ive: "I've",
  id: "I'd",
  accomodate: "accommodate",
  achive: "achieve",
  apparantly: "apparently",
  calender: "calendar",
  embarass: "embarrass",
  foreign: "foreign",
  guarantee: "guarantee",
  harass: "harass",
  immediate: "immediate",
  independent: "independent",
  maintenance: "maintenance",
  noticeable: "noticeable",
  occasion: "occasion",
  occurrence: "occurrence",
  relevant: "relevant",
  rhythm: "rhythm",
  schedule: "schedule"
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
  up: "Preposition", down: "Preposition", out: "Preposition", off: "Preposition",
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
  if (!text || !text.trim()) {
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
 * Checks text for spelling, grammar, punctuation, capitalization, etc.
 */
export const checkGrammarAndSpelling = (text = "", customDictionary = []) => {
  if (!text || !text.trim()) {
    return { errors: [], score: 100, correctedText: text };
  }

  const errors = [];
  const customDictSet = new Set(customDictionary.map((w) => w.toLowerCase()));

  // Rule 1: First word sentence capitalization (e.g. "it is..." -> "It")
  const trimmed = text.trim();
  const firstWordMatch = trimmed.match(/^([a-z][a-z]*)/);
  if (firstWordMatch && firstWordMatch[1]) {
    const firstWord = firstWordMatch[1];
    const capitalized = firstWord.charAt(0).toUpperCase() + firstWord.slice(1);
    errors.push({
      id: `err_cap_0`,
      type: "Capitalization Error",
      original: firstWord,
      suggestion: capitalized,
      explanation: `Sentences should begin with a capital letter ("${capitalized}").`,
      category: "grammar"
    });
  }

  // Rule 2: Lowercase single pronoun 'i' (e.g. "i am", "i go")
  try {
    const singleIMatches = Array.from(text.matchAll(/\b(i)\b/g));
    singleIMatches.forEach((match) => {
      // Avoid duplicate if first word
      if (match.index !== 0 || !firstWordMatch) {
        errors.push({
          id: `err_i_${match.index}`,
          type: "Capitalization Error",
          original: match[0],
          suggestion: "I",
          explanation: "The pronoun 'I' should always be capitalized.",
          category: "grammar"
        });
      }
    });
  } catch (e) {
    console.error(e);
  }

  // Rule 3: Misspellings & Shorthand Typos
  const tokens = text.split(/(\s+|[.,!?;:"()])/);
  let wordOffset = 0;
  tokens.forEach((token) => {
    const cleanToken = token.replace(/[^a-zA-Z]/g, "").toLowerCase();
    if (cleanToken && COMMON_MISSPELLINGS[cleanToken] && !customDictSet.has(cleanToken)) {
      const correction = COMMON_MISSPELLINGS[cleanToken];
      errors.push({
        id: `err_spell_${wordOffset}_${cleanToken}`,
        type: "Spelling Error",
        original: token,
        suggestion: token[0] === token[0].toUpperCase() ? correction.charAt(0).toUpperCase() + correction.slice(1) : correction,
        explanation: `"${token}" is misspelled or informal shorthand. Recommended: "${correction}".`,
        category: "spelling"
      });
    }
    wordOffset += token.length;
  });

  // Rule 4: Repeated Words (e.g. "the the", "in in")
  try {
    const repMatches = Array.from(text.matchAll(/\b([a-zA-Z]+)\s+\1\b/gi));
    repMatches.forEach((match) => {
      errors.push({
        id: `err_rep_${match.index}`,
        type: "Repeated Word",
        original: match[0],
        suggestion: match[1],
        explanation: `Duplicate word "${match[1]}". Consider removing the repeated instance.`,
        category: "grammar"
      });
    });
  } catch (e) {
    console.error(e);
  }

  // Rule 5: Subject-Verb Agreement & Phrase Grammar Rules
  const subVerbPatterns = [
    { regex: /\b(he|she|it)\s+(want)\b/gi, fix: "$1 wants", exp: "Use 'wants' for third-person singular subjects (he, she, it)." },
    { regex: /\b(he|she|it)\s+(go)\b/gi, fix: "$1 goes", exp: "Use 'goes' for third-person singular subjects (he, she, it)." },
    { regex: /\b(he|she|it)\s+(do)\b/gi, fix: "$1 does", exp: "Use 'does' for third-person singular subjects." },
    { regex: /\b(he|she|it)\s+(have)\b/gi, fix: "$1 has", exp: "Use 'has' instead of 'have' with singular pronouns." },
    { regex: /\b(they|we|you)\s+(is)\b/gi, fix: "$1 are", exp: "Use plural verb 'are' with plural pronouns." },
    { regex: /\b(i)\s+(is)\b/gi, fix: "I am", exp: "Use 'am' with pronoun 'I'." },
    { regex: /\b(a)\s+([aeiou][a-z]+)\b/gi, fix: "an $2", exp: "Use article 'an' before words starting with a vowel sound." },
    { regex: /\b(an)\s+([bcdfghjklmnpqrstvwxyz][a-z]+)\b/gi, fix: "a $2", exp: "Use article 'a' before words starting with a consonant sound." },
    { regex: /\b(college|school|work)\s+(everyday)\b/gi, fix: "$1 every day", exp: "Use 'every day' (two words) as an adverbial phrase." }
  ];

  subVerbPatterns.forEach(({ regex, fix, exp }, i) => {
    try {
      const matches = Array.from(text.matchAll(new RegExp(regex.source, "gi")));
      matches.forEach((pMatch) => {
        const replacement = pMatch[0].replace(new RegExp(regex.source, "i"), fix);
        errors.push({
          id: `err_sv_${i}_${pMatch.index}`,
          type: "Grammar Error",
          original: pMatch[0],
          suggestion: replacement,
          explanation: exp,
          category: "grammar"
        });
      });
    } catch (e) {
      console.error(e);
    }
  });

  // Calculate Quality Score
  const totalWords = text.trim().split(/\s+/).length;
  const errorPenalty = errors.length * 15;
  const score = Math.max(10, Math.min(100, 100 - Math.round((errorPenalty / (totalWords || 1)) * 100)));

  // Generate Auto-Corrected Text
  let correctedText = text;
  errors.forEach((err) => {
    correctedText = correctedText.replace(err.original, err.suggestion);
  });

  // Ensure sentence ending punctuation if missing
  if (correctedText && !correctedText.endsWith(".") && !correctedText.endsWith("!") && !correctedText.endsWith("?")) {
    correctedText += ".";
  }

  return { errors, score, correctedText };
};

/**
 * Analyzes Parts of Speech for every word in text
 */
export const analyzePartsOfSpeech = (text = "") => {
  if (!text || !text.trim()) {
    return { tokens: [], categoryCounts: {} };
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
