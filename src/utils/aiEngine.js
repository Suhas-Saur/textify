/**
 * AI Processing Layer for Textify Platform
 * Created by Suhas S
 */

import { checkGrammarAndSpelling } from "./grammarEngine";

/**
 * AI Improve Text with 10 Professional Rewrite Modes
 */
export const improveTextWithAI = async (text, mode = "Fix Grammar") => {
  if (!text || !text.trim()) {
    return { improvedText: "", mode };
  }

  // Simulate fast client-side AI processing with sophisticated heuristic transformations
  await new Promise((res) => setTimeout(res, 800));

  const trimmed = text.trim();
  const { correctedText } = checkGrammarAndSpelling(trimmed);

  let output = correctedText;

  switch (mode) {
    case "Fix Grammar":
      output = correctedText;
      break;

    case "Make Professional":
      output = output
        .replace(/\b(wanna|gonna|gotta)\b/gi, "intend to")
        .replace(/\b(good|nice|ok)\b/gi, "effective")
        .replace(/\b(big)\b/gi, "substantial")
        .replace(/\b(help)\b/gi, "assist")
        .replace(/\b(fix)\b/gi, "resolve")
        .replace(/\b(buy)\b/gi, "purchase");
      if (!output.endsWith(".")) output += ".";
      output = `In professional context: ${output}`;
      break;

    case "Make Academic":
      output = output
        .replace(/\b(think)\b/gi, "hypothesize")
        .replace(/\b(show)\b/gi, "demonstrate")
        .replace(/\b(find)\b/gi, "ascertain")
        .replace(/\b(use)\b/gi, "utilize")
        .replace(/\b(about)\b/gi, "approximately");
      output = `Furthermore, academic analysis indicates that ${output.toLowerCase()}`;
      break;

    case "Make Simple":
      output = output
        .replace(/\b(utilize)\b/gi, "use")
        .replace(/\b(substantial)\b/gi, "large")
        .replace(/\b(ascertain)\b/gi, "find")
        .replace(/\b(subsequently)\b/gi, "then");
      break;

    case "Make Concise":
      const words = output.split(/\s+/);
      output = words.slice(0, Math.ceil(words.length * 0.75)).join(" ");
      if (!output.endsWith(".")) output += ".";
      break;

    case "Expand":
      output = `${output} In addition, this topic encompasses critical nuances that warrant thorough examination and detailed consideration across all aspects of implementation.`;
      break;

    case "Improve Vocabulary":
      output = output
        .replace(/\b(important)\b/gi, "paramount")
        .replace(/\b(change)\b/gi, "transform")
        .replace(/\b(different)\b/gi, "distinct")
        .replace(/\b(clear)\b/gi, "lucid");
      break;

    case "Improve Clarity":
      output = output.replace(/,([^,]*),/g, " ($1) ");
      break;

    case "Make Formal":
      output = `We respectfully submit that ${output.toLowerCase()}`;
      break;

    case "Make Casual":
      output = output
        .replace(/\b(therefore|furthermore)\b/gi, "so")
        .replace(/\b(assist)\b/gi, "help")
        .replace(/\b(purchase)\b/gi, "get");
      break;

    default:
      output = correctedText;
      break;
  }

  // Capitalize first letter clean-up
  output = output.charAt(0).toUpperCase() + output.slice(1);

  return {
    improvedText: output,
    originalText: text,
    mode
  };
};

/**
 * AI Paragraph Generator by topic, length, tone, difficulty
 */
export const generateParagraphWithAI = async ({
  topic = "",
  length = "Medium",
  tone = "Professional",
  difficulty = "Intermediate",
  language = "English"
}) => {
  if (!topic || !topic.trim()) {
    throw new Error("Topic is required to generate a paragraph.");
  }

  await new Promise((res) => setTimeout(res, 1000));

  const sentencesCount = length === "Short" ? 3 : length === "Long" ? 8 : 5;

  const intros = [
    `Exploring ${topic} reveals a fascinating intersection of innovation and practical application.`,
    `${topic} plays an increasingly pivotal role in modern society and strategic development.`,
    `Understanding the key principles of ${topic} is vital for achieving sustainable growth and efficiency.`
  ];

  const bodies = [
    `Key studies emphasize that effective execution requires continuous refinement, domain expertise, and strategic vision.`,
    `By leveraging structured methodologies, practitioners can maximize efficiency while minimizing potential risk vectors.`,
    `Furthermore, integration of advanced tools fosters collaboration and drives measurable outcomes across all operational workflows.`
  ];

  const conclusions = [
    `Ultimately, embracing ${topic} empowers individuals and organizations to adapt dynamically to evolving challenges.`,
    `In summary, prioritizing ${topic} establishes a firm foundation for future innovation and long-term success.`,
    `Therefore, dedicating resources toward mastering ${topic} remains a high-value imperative.`
  ];

  const intro = intros[Math.floor(Math.random() * intros.length)];
  const body = bodies[Math.floor(Math.random() * bodies.length)];
  const conclusion = conclusions[Math.floor(Math.random() * conclusions.length)];

  let generatedText = `${intro} ${body} ${conclusion}`;

  if (sentencesCount > 5) {
    generatedText += ` Additional perspectives suggest that consistent practice and analytical review yield compounding benefits over time.`;
  }

  return {
    topic,
    paragraph: generatedText,
    wordCount: generatedText.split(/\s+/).length,
    tone,
    difficulty,
    language
  };
};

/**
 * Multilingual AI Translation Engine
 */
const SAMPLE_TRANSLATIONS = {
  Hindi: "यह टेक्स्टिफ़ाई प्लेटफ़ॉर्म द्वारा अनुवादित किया गया पाठ है।",
  Kannada: "ಇದು ಟೆಕ್ಸ್ಟಿಫೈ ಪ್ಲಾಟ್‌ಫಾರ್ಮ್ ಮೂಲಕ ಅನುವಾದಿಸಲಾದ ಪಠ್ಯವಾಗಿದೆ.",
  Tamil: "இது டெக்ஸ்டிஃபை தளத்தால் மொழிபெயர்க்கப்பட்ட உரையாகும்.",
  Telugu: "ఇది టెక్స్టిఫై ప్లాట్‌ఫారమ్ ద్వారా అనువదించబడిన వచనం.",
  Malayalam: "ഇത് ടെക്സ്റ്റിഫൈ പ്ലാറ്റ്ഫോം വഴി വിവർത്തനം ചെയ്ത വാചകമാണ്.",
  Marathi: "हा मजकूर टेक्स्टिफाय प्लॅटफॉर्मद्वारे भाषांतरित केला आहे.",
  Bengali: "এটি টেক্সটিফাই প্ল্যাটফর্ম দ্বারা অনূদিত পাঠ্য।",
  French: "Ceci est le texte traduit généré par la plateforme Textify.",
  German: "Dies ist der übersetzte Text, der von der Textify-Plattform generiert wurde.",
  Spanish: "Este es el texto traducido generado por la plataforma Textify.",
  Portuguese: "Este é o texto traduzido gerado pela plataforma Textify.",
  Arabic: "هذا هو النص المترجم الذي تم إنشاؤه بواسطة منصة Textify.",
  Chinese: "这是由 Textify 平台生成的翻译文本。",
  Japanese: "これは Textify プラットフォームによって生成された翻訳テキストです。",
  Korean: "이것은 Textify 플랫폼에서 생성된 번역된 텍스트입니다."
};

export const translateTextWithAI = async (text, targetLanguage = "Spanish") => {
  if (!text || !text.trim()) {
    return { translatedText: "", targetLanguage };
  }

  await new Promise((res) => setTimeout(res, 700));

  if (targetLanguage === "English") {
    return { translatedText: text, targetLanguage };
  }

  const mockTranslation = SAMPLE_TRANSLATIONS[targetLanguage] || `[${targetLanguage} Translation]: ${text}`;

  return {
    originalText: text,
    translatedText: `${mockTranslation} (${text})`,
    targetLanguage
  };
};
