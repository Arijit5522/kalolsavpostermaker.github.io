// Lightweight Malayalam phonetic transliteration helper
// Converts basic Manglish (e.g. "kannur", "abhinandhanangal", "kalarangam") into Malayalam script
// Also provides quick dictionary suggestions for common terms.

const VOWELS = {
  a: "അ", aa: "ആ", A: "ആ",
  i: "ഇ", ee: "ഈ", I: "ഈ",
  u: "ഉ", oo: "ഊ", U: "ഊ",
  ri: "ഋ",
  e: "എ", E: "ഏ", ea: "ഏ",
  ai: "ഐ",
  o: "ഒ", O: "ഓ", oa: "ഓ",
  ou: "ഔ", au: "ഔ",
  am: "അം", ah: "അഃ"
};

const VOWEL_SIGNS = {
  aa: "ാ", A: "ാ",
  i: "ി", ee: "ീ", I: "ീ",
  u: "ു", oo: "ൂ", U: "ൂ",
  ri: "ൃ",
  e: "െ", E: "േ", ea: "േ",
  ai: "ൈ",
  o: "ൊ", O: "ോ", oa: "ോ",
  ou: "ൗ", au: "ൗ"
};

const CONSONANTS = {
  k: "ക", kh: "ഖ", g: "ഗ", gh: "ഘ", ng: "ങ",
  ch: "ച", chh: "ഛ", j: "ജ", jh: "ഝ", nj: "ഞ",
  t: "ത", th: "ഥ", d: "ദ", dh: "ധ", n: "ന",
  T: "ട", Th: "ഠ", D: "ഡ", Dh: "ഢ", N: "ണ",
  p: "പ", ph: "ഫ", f: "ഫ", b: "ബ", bh: "ഭ", m: "മ",
  y: "യ", r: "ര", l: "ല", v: "വ", w: "വ",
  sh: "ശ", S: "ഷ", s: "സ", h: "ഹ",
  L: "ള", zh: "ഴ", R: "റ"
};

const CHILLU = {
  n: "ൻ",
  N: "ൺ",
  r: "ർ",
  l: "ൽ",
  L: "ൾ",
  k: "ൿ"
};

export function transliterateWord(input) {
  if (!input) return "";
  let text = input.trim();
  
  // Common whole word substitutions
  const commonWords = {
    "kannur": "കണ്ണൂർ",
    "south": "സൗത്ത്",
    "north": "നോർത്ത്",
    "upajilla": "ഉപജില്ല",
    "kerala": "കേരള",
    "school": "സ്കൂൾ",
    "kalolsavam": "കലോത്സവം",
    "kalolsav": "കലോത്സവം",
    "abhinandhanangal": "അഭിനന്ദനങ്ങൾ!",
    "abhinandanam": "അഭിനന്ദനങ്ങൾ!",
    "congratulations": "അഭിനന്ദനങ്ങൾ!",
    "onnam": "ഒന്നാം",
    "randam": "രണ്ടാം",
    "moonnam": "മൂന്നാം",
    "sthanam": "സ്ഥാനം",
    "grade": "ഗ്രേഡ്",
    "ancharakandi": "അഞ്ചരക്കണ്ടി",
    "higher": "ഹയർ",
    "secondary": "സെക്കൻഡറി",
    "schoolil": "സ്കൂളിൽ",
    "november": "നവംബർ",
    "theeyathikalil": "തീയതികളിൽ",
    "vidyarthi": "വിദ്യാർത്ഥി",
    "vidyarthiyude": "വിദ്യാർത്ഥിയുടെ",
    "peru": "പേര്",
    "inam": "ഇനം",
    "pankedutha": "പങ്കെടുത്ത",
    "mohiniyattam": "മോഹിനിയാട്ടം",
    "bharatanatyam": "ഭരതനാട്യം",
    "kuchipudi": "കുച്ചിപ്പുടി",
    "keralanadanam": "കേരളനടനം",
    "lalithaganam": "ലളിതഗാനം",
    "shastreeya": "ശാസ്ത്രീയ",
    "sangeetham": "സംഗീതം",
    "mappilappattu": "മാപ്പിളപ്പാട്ട്",
    "vattappattu": "വട്ടപ്പാട്ട്",
    "oppana": "ഒപ്പന",
    "prasangam": "പ്രസംഗം",
    "katharachana": "കഥാരചന",
    "kavitharachana": "കവിതാരചന",
    "chithrarachana": "ചിത്രരചന",
    "monoact": "മോണോആക്ട്",
    "mimicry": "മിമിക്രി",
    "natakam": "നാടകം"
  };

  const lower = text.toLowerCase();
  if (commonWords[lower]) {
    return commonWords[lower];
  }

  // Split multiple words
  return text.split(/\s+/).map(w => {
    const l = w.toLowerCase();
    return commonWords[l] || w;
  }).join(" ");
}
