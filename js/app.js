// ==========================================================================
// Kalolsavam Poster Maker - Complete Self-Contained Application
// Zero external modules - Runs seamlessly on file:// and http://
// Complete 100% Bilingual Sync (Malayalam & English)
// ==========================================================================

(function() {
  "use strict";

  // --- 1. BIDIRECTIONAL TRANSLATION MAPS ---
  const ML_TO_EN = {
    // Positions
    "ഒന്നാം സ്ഥാനം": "First Place",
    "രണ്ടാം സ്ഥാനം": "Second Place",
    "മൂന്നാം സ്ഥാനം": "Third Place",
    "മികച്ച പ്രകടനം": "Special Mention",
    "പങ്കാളിത്തം": "Participation",

    // Grades
    "A ഗ്രേഡ്": "A Grade",
    "B ഗ്രേഡ്": "B Grade",
    "C ഗ്രേഡ്": "C Grade",
    "എ ഗ്രേഡ്": "A Grade",
    "ബി ഗ്രേഡ്": "B Grade",
    "സി ഗ്രേഡ്": "C Grade",
    "ഗ്രേഡ്": "Grade",

    // Greetings
    "അഭിനന്ദനങ്ങൾ!": "Congratulations!",
    "അഭിനന്ദനങ്ങൾ": "Congratulations!",

    // Titles
    "കേരള സ്കൂൾ\nകലോത്സവം": "Kerala School\nKalolsavam",
    "കേരള സ്കൂൾ കലോത്സവം": "Kerala School Kalolsavam",

    // Sub-Districts
    "കണ്ണൂർ സൗത്ത് ഉപജില്ല": "Kannur South Sub-District",
    "കണ്ണൂർ നോർത്ത് ഉപജില്ല": "Kannur North Sub-District",
    "തലശ്ശേരി ഉപജില്ല": "Thalassery Sub-District",
    "തളിപ്പറമ്പ് ഉപജില്ല": "Taliparamba Sub-District",
    "പയ്യന്നൂർ ഉപജില്ല": "Payyanur Sub-District",
    "ഇരിട്ടി ഉപജില്ല": "Iritty Sub-District",
    "കോഴിക്കോട് സിറ്റി ഉപജില്ല": "Kozhikode City Sub-District",
    "കോഴിക്കോട് റൂറൽ ഉപജില്ല": "Kozhikode Rural Sub-District",
    "വടകര ഉപജില്ല": "Vadakara Sub-District",
    "മലപ്പുറം ഉപജില്ല": "Malappuram Sub-District",
    "മഞ്ചേരി ഉപജില്ല": "Manjeri Sub-District",
    "പാലക്കാട് ഉപജില്ല": "Palakkad Sub-District",
    "തൃശൂർ ഈസ്റ്റ് ഉപജില്ല": "Thrissur East Sub-District",
    "എറണാകുളം ഉപജില്ല": "Ernakulam Sub-District",
    "ആലുവ ഉപജില്ല": "Aluva Sub-District",
    "കോട്ടയം ഉപജില്ല": "Kottayam Sub-District",
    "ആലപ്പുഴ ഉപജില്ല": "Alappuzha Sub-District",
    "കൊല്ലം ഉപജില്ല": "Kollam Sub-District",
    "തിരുവനന്തപുരം നോർത്ത് ഉപജില്ല": "Thiruvananthapuram North Sub-District",

    // Schools & Venues
    "അഞ്ചരക്കണ്ടി ഹയർസെക്കൻഡറി സ്കൂൾ": "Anjarakandy Higher Secondary School",
    "അഞ്ചരക്കണ്ടി ഹയർസെക്കൻഡറി സ്കൂളിൽ": "At Anjarakandy Higher Secondary School",
    "അഞ്ചരക്കണ്ടി എച്ച്.എസ്.എസ്.": "Anjarakandy HSS",
    "ജി.എച്ച്.എസ്.എസ്. അഞ്ചരക്കണ്ടി": "GHSS Anjarakandy",

    // Dates
    "2026 നവംബർ 11, 12, 13, 14 തീയതികളിൽ": "2026 November 11, 12, 13, 14",

    // Students & People
    "ദേവിക എസ്. കുമാർ": "Devika S. Kumar",

    // Common Items
    "മോഹിനിയാട്ടം": "Mohiniyattam",
    "ഭരതനാട്യം": "Bharatanatyam",
    "കുച്ചിപ്പുടി": "Kuchipudi",
    "കേരളനടനം": "Kerala Nadanam",
    "നാടോടിനൃത്തം": "Folk Dance",
    "കഥകളി": "Kathakali",
    "സംഘനൃത്തം": "Group Dance",
    "ഒപ്പന": "Oppana",
    "മാർഗ്ഗംകളി": "Margamkali",
    "തിരുവാതിരക്കളി": "Thiruvathirakali",
    "കോൽക്കളി": "Kolkali",
    "ദഫ്മുട്ട്": "Duffmuttu",
    "വട്ടപ്പാട്ട്": "Vattappattu",
    "ശാസ്ത്രീയ സംഗീതം": "Classical Music",
    "ലളിതഗാനം": "Light Music",
    "മാപ്പിളപ്പാട്ട്": "Mappilappattu",
    "സംഘഗാനം": "Group Song",
    "നാടൻപാട്ട്": "Folk Song",
    "ദേശഭക്തിഗാനം": "Patriotic Song",
    "വയലിൻ": "Violin",
    "മൃദംഗം": "Mridangam",
    "തബല": "Tabla",
    "വീണ": "Veena",
    "ഫ്ലൂട്ട്": "Flute",
    "പ്രസംഗം (മലയാളം)": "Elocution (Malayalam)",
    "പ്രസംഗം (ഇംഗ്ലീഷ്)": "Elocution (English)",
    "പ്രസംഗം (ഹിന്ദി)": "Elocution (Hindi)",
    "കഥാരചന (മലയാളം)": "Short Story Writing",
    "കവിതാരചന (മലയാളം)": "Poetry Writing",
    "പദ്യപാരായണം": "Poem Recitation",
    "അക്ഷരശ്ലോകം": "Aksharaslokam",
    "ക്വിസ് (പ്രശ്നോത്തരി)": "Quiz",
    "മോണോആക്ട്": "Mono Act",
    "മിമിക്രി": "Mimicry",
    "ചാക്യാർകൂത്ത്": "Chakyarkoothu",
    "ഓട്ടൻതുള്ളൽ": "Ottanthullal",
    "നാടകം": "Drama",
    "മൂകാഭിനയം": "Mime",
    "ചിത്രരചന (പെൻസിൽ)": "Pencil Drawing",
    "ചിത്രരചന (ജലച്ചായം)": "Watercolour Painting",
    "ചിത്രരചന (എണ്ണച്ചായം)": "Oil Painting",
    "കാർട്ടൂൺ": "Cartoon",
    "കളിമൺ ശില്പനിർമ്മാണം": "Clay Modelling"
  };

  const EN_TO_ML = {};
  for (const [k, v] of Object.entries(ML_TO_EN)) {
    EN_TO_ML[v] = k;
  }
  // Extra English aliases
  EN_TO_ML["A Grade"] = "A ഗ്രേഡ്";
  EN_TO_ML["B Grade"] = "B ഗ്രേഡ്";
  EN_TO_ML["C Grade"] = "C ഗ്രേഡ്";
  EN_TO_ML["Grade A"] = "A ഗ്രേഡ്";
  EN_TO_ML["Grade B"] = "B ഗ്രേഡ്";
  EN_TO_ML["Grade C"] = "C ഗ്രേഡ്";
  EN_TO_ML["First Place"] = "ഒന്നാം സ്ഥാനം";
  EN_TO_ML["Second Place"] = "രണ്ടാം സ്ഥാനം";
  EN_TO_ML["Third Place"] = "മൂന്നാം സ്ഥാനം";
  EN_TO_ML["1st Place"] = "ഒന്നാം സ്ഥാനം";
  EN_TO_ML["2nd Place"] = "രണ്ടാം സ്ഥാനം";
  EN_TO_ML["3rd Place"] = "മൂന്നാം സ്ഥാനം";
  EN_TO_ML["Congratulations!"] = "അഭിനന്ദനങ്ങൾ!";
  EN_TO_ML["Congratulations"] = "അഭിനന്ദനങ്ങൾ!";
  EN_TO_ML["Devika S. Kumar"] = "ദേവിക എസ്. കുമാർ";
  EN_TO_ML["Anjarakandy Higher Secondary School"] = "അഞ്ചരക്കണ്ടി ഹയർസെക്കൻഡറി സ്കൂൾ";
  EN_TO_ML["Anjarakkandy Higher Secondary School"] = "അഞ്ചരക്കണ്ടി ഹയർസെക്കൻഡറി സ്കൂൾ";
  EN_TO_ML["At Anjarakandy Higher Secondary School"] = "അഞ്ചരക്കണ്ടി ഹയർസെക്കൻഡറി സ്കൂളിൽ";
  EN_TO_ML["At Anjarakkandy Higher Secondary School"] = "അഞ്ചരക്കണ്ടി ഹയർസെക്കൻഡറി സ്കൂളിൽ";
  EN_TO_ML["Anjarakandy HSS"] = "അഞ്ചരക്കണ്ടി എച്ച്.എസ്.എസ്.";
  EN_TO_ML["Anjarakkandy HSS"] = "അഞ്ചരക്കണ്ടി എച്ച്.എസ്.എസ്.";
  EN_TO_ML["GHSS Anjarakandy"] = "ജി.എച്ച്.എസ്.എസ്. അഞ്ചരക്കണ്ടി";
  EN_TO_ML["Ancharakandy Higher Secondary School"] = "അഞ്ചരക്കണ്ടി ഹയർസെക്കൻഡറി സ്കൂൾ";

  function translateValue(val, targetLang) {
    if (!val) return "";
    const trimmed = String(val).trim();
    if (!trimmed) return "";

    // Strip emoji characters & symbols for robust lookup
    const stripped = trimmed.replace(/[\u{1F300}-\u{1FAFF}\u{2600}-\u{27BF}\u{FE00}-\u{FE0F}]/gu, '').trim();

    if (targetLang === "en") {
      if (ML_TO_EN[trimmed]) return ML_TO_EN[trimmed];
      if (stripped && ML_TO_EN[stripped]) return ML_TO_EN[stripped];
      for (const [k, v] of Object.entries(ML_TO_EN)) {
        if (k.toLowerCase() === trimmed.toLowerCase() || (stripped && k.toLowerCase() === stripped.toLowerCase())) {
          return v;
        }
      }
      return trimmed;
    } else {
      if (EN_TO_ML[trimmed]) return EN_TO_ML[trimmed];
      if (stripped && EN_TO_ML[stripped]) return EN_TO_ML[stripped];
      for (const [k, v] of Object.entries(EN_TO_ML)) {
        if (k.toLowerCase() === trimmed.toLowerCase() || (stripped && k.toLowerCase() === stripped.toLowerCase())) {
          return v;
        }
      }
      return trimmed;
    }
  }

  // --- 2. PRESETS & TRANSLATIONS ---
  const SUB_DISTRICTS = [
    { ml: "കണ്ണൂർ സൗത്ത് ഉപജില്ല", en: "Kannur South Sub-District" },
    { ml: "കണ്ണൂർ നോർത്ത് ഉപജില്ല", en: "Kannur North Sub-District" },
    { ml: "തലശ്ശേരി ഉപജില്ല", en: "Thalassery Sub-District" },
    { ml: "തളിപ്പറമ്പ് ഉപജില്ല", en: "Taliparamba Sub-District" },
    { ml: "പയ്യന്നൂർ ഉപജില്ല", en: "Payyanur Sub-District" },
    { ml: "ഇരിട്ടി ഉപജില്ല", en: "Iritty Sub-District" },
    { ml: "കോഴിക്കോട് സിറ്റി ഉപജില്ല", en: "Kozhikode City Sub-District" },
    { ml: "കോഴിക്കോട് റൂറൽ ഉപജില്ല", en: "Kozhikode Rural Sub-District" },
    { ml: "വടകര ഉപജില്ല", en: "Vadakara Sub-District" },
    { ml: "കൊയിലാണ്ടി ഉപജില്ല", en: "Koyilandy Sub-District" },
    { ml: "താമരശ്ശേരി ഉപജില്ല", en: "Thamarassery Sub-District" },
    { ml: "മലപ്പുറം ഉപജില്ല", en: "Malappuram Sub-District" },
    { ml: "മഞ്ചേരി ഉപജില്ല", en: "Manjeri Sub-District" },
    { ml: "തിരൂർ ഉപജില്ല", en: "Tirur Sub-District" },
    { ml: "പെരിന്തൽമണ്ണ ഉപജില്ല", en: "Perinthalmanna Sub-District" },
    { ml: "പാലക്കാട് ഉപജില്ല", en: "Palakkad Sub-District" },
    { ml: "ഒറ്റപ്പാലം ഉപജില്ല", en: "Ottapalam Sub-District" },
    { ml: "ചിറ്റൂർ ഉപജില്ല", en: "Chittur Sub-District" },
    { ml: "തൃശൂർ ഈസ്റ്റ് ഉപജില്ല", en: "Thrissur East Sub-District" },
    { ml: "തൃശൂർ വെസ്റ്റ് ഉപജില്ല", en: "Thrissur West Sub-District" },
    { ml: "ഇരിങ്ങാലക്കുട ഉപജില്ല", en: "Irinjalakuda Sub-District" },
    { ml: "ചാവക്കാട് ഉപജില്ല", en: "Chavakkad Sub-District" },
    { ml: "എറണാകുളം ഉപജില്ല", en: "Ernakulam Sub-District" },
    { ml: "ആലുവ ഉപജില്ല", en: "Aluva Sub-District" },
    { ml: "മട്ടാഞ്ചേരി ഉപജില്ല", en: "Mattancherry Sub-District" },
    { ml: "അങ്കമാലി ഉപജില്ല", en: "Angamaly Sub-District" },
    { ml: "കോട്ടയം ഉപജില്ല", en: "Kottayam Sub-District" },
    { ml: "പാലാ ഉപജില്ല", en: "Pala Sub-District" },
    { ml: "ആലപ്പുഴ ഉപജില്ല", en: "Alappuzha Sub-District" },
    { ml: "ചേർത്തല ഉപജില്ല", en: "Cherthala Sub-District" },
    { ml: "കൊല്ലം ഉപജില്ല", en: "Kollam Sub-District" },
    { ml: "കൊട്ടാരക്കര ഉപജില്ല", en: "Kottarakkara Sub-District" },
    { ml: "തിരുവനന്തപുരം നോർത്ത് ഉപജില്ല", en: "Thiruvananthapuram North Sub-District" },
    { ml: "തിരുവനന്തപുരം സൗത്ത് ഉപജില്ല", en: "Thiruvananthapuram South Sub-District" },
    { ml: "നെയ്യാറ്റിൻകര ഉപജില്ല", en: "Neyyattinkara Sub-District" },
    { ml: "കാസർഗോഡ് ഉപജില്ല", en: "Kasaragod Sub-District" },
    { ml: "ഹൊസ്ദുർഗ് ഉപജില്ല", en: "Hosdurg Sub-District" },
    { ml: "വയനാട് (വൈത്തിരി) ഉപജില്ല", en: "Wayanad (Vythiri) Sub-District" },
    { ml: "മാനന്തവാടി ഉപജില്ല", en: "Mananthavady Sub-District" },
    { ml: "ഇടുക്കി ഉപജില്ല", en: "Idukki Sub-District" },
    { ml: "തൊടുപുഴ ഉപജില്ല", en: "Thodupuzha Sub-District" },
    { ml: "പത്തനംതിട്ട ഉപജില്ല", en: "Pathanamthitta Sub-District" },
    { ml: "തിരുവല്ല ഉപജില്ല", en: "Thiruvalla Sub-District" }
  ];

  const KALOLSAVAM_ITEMS = [
    { ml: "മോഹിനിയാട്ടം", en: "Mohiniyattam", category: "Dance" },
    { ml: "ഭരതനാട്യം", en: "Bharatanatyam", category: "Dance" },
    { ml: "കുച്ചിപ്പുടി", en: "Kuchipudi", category: "Dance" },
    { ml: "കേരളനടനം", en: "Kerala Nadanam", category: "Dance" },
    { ml: "നാടോടിനൃത്തം", en: "Folk Dance", category: "Dance" },
    { ml: "കഥകളി", en: "Kathakali", category: "Dance" },
    { ml: "സംഘനൃത്തം", en: "Group Dance", category: "Dance" },
    { ml: "ഒപ്പന", en: "Oppana", category: "Dance" },
    { ml: "മാർഗ്ഗംകളി", en: "Margamkali", category: "Dance" },
    { ml: "തിരുവാതിരക്കളി", en: "Thiruvathirakali", category: "Dance" },
    { ml: "കോൽക്കളി", en: "Kolkali", category: "Dance" },
    { ml: "ദഫ്മുട്ട്", en: "Duffmuttu", category: "Dance" },
    { ml: "വട്ടപ്പാട്ട്", en: "Vattappattu", category: "Dance" },
    { ml: "ശാസ്ത്രീയ സംഗീതം", en: "Classical Music", category: "Music" },
    { ml: "ലളിതഗാനം", en: "Light Music", category: "Music" },
    { ml: "മാപ്പിളപ്പാട്ട്", en: "Mappilappattu", category: "Music" },
    { ml: "സംഘഗാനം", en: "Group Song", category: "Music" },
    { ml: "നാടൻപാട്ട്", en: "Folk Song", category: "Music" },
    { ml: "ദേശഭക്തിഗാനം", en: "Patriotic Song", category: "Music" },
    { ml: "വയലിൻ", en: "Violin", category: "Music" },
    { ml: "മൃദംഗം", en: "Mridangam", category: "Music" },
    { ml: "തബല", en: "Tabla", category: "Music" },
    { ml: "വീണ", en: "Veena", category: "Music" },
    { ml: "ഫ്ലൂട്ട്", en: "Flute", category: "Music" },
    { ml: "പ്രസംഗം (മലയാളം)", en: "Elocution (Malayalam)", category: "Literature" },
    { ml: "പ്രസംഗം (ഇംഗ്ലീഷ്)", en: "Elocution (English)", category: "Literature" },
    { ml: "പ്രസംഗം (ഹിന്ദി)", en: "Elocution (Hindi)", category: "Literature" },
    { ml: "കഥാരചന (മലയാളം)", en: "Short Story Writing", category: "Literature" },
    { ml: "കവിതാരചന (മലയാളം)", en: "Poetry Writing", category: "Literature" },
    { ml: "പദ്യപാരായണം", en: "Poem Recitation", category: "Literature" },
    { ml: "അക്ഷരശ്ലോകം", en: "Aksharaslokam", category: "Literature" },
    { ml: "ക്വിസ് (പ്രശ്നോത്തരി)", en: "Quiz", category: "Literature" },
    { ml: "മോണോആക്ട്", en: "Mono Act", category: "Arts" },
    { ml: "മിമിക്രി", en: "Mimicry", category: "Arts" },
    { ml: "ചാക്യാർകൂത്ത്", en: "Chakyarkoothu", category: "Arts" },
    { ml: "ഓട്ടൻതുള്ളൽ", en: "Ottanthullal", category: "Arts" },
    { ml: "നാടകം", en: "Drama", category: "Arts" },
    { ml: "മൂകാഭിനയം", en: "Mime", category: "Arts" },
    { ml: "ചിത്രരചന (പെൻസിൽ)", en: "Pencil Drawing", category: "Arts" },
    { ml: "ചിത്രരചന (ജലച്ചായം)", en: "Watercolour Painting", category: "Arts" },
    { ml: "ചിത്രരചന (എണ്ണച്ചായം)", en: "Oil Painting", category: "Arts" },
    { ml: "കാർട്ടൂൺ", en: "Cartoon", category: "Arts" },
    { ml: "കളിമൺ ശില്പനിർമ്മാണം", en: "Clay Modelling", category: "Arts" }
  ];

  const POSITIONS = [
    { ml: "ഒന്നാം സ്ഥാനം", en: "First Place", badge: "🥇" },
    { ml: "രണ്ടാം സ്ഥാനം", en: "Second Place", badge: "🥈" },
    { ml: "മൂന്നാം സ്ഥാനം", en: "Third Place", badge: "🥉" },
    { ml: "മികച്ച പ്രകടനം", en: "Special Mention", badge: "⭐" },
    { ml: "പങ്കാളിത്തം", en: "Participation", badge: "🎖️" }
  ];

  const GRADES = [
    { ml: "A ഗ്രേഡ്", en: "A Grade", badge: "A" },
    { ml: "B ഗ്രേഡ്", en: "B Grade", badge: "B" },
    { ml: "C ഗ്രേഡ്", en: "C Grade", badge: "C" },
    { ml: "", en: "", badge: "" }
  ];

  const DEFAULT_PROFILES = {
    ml: {
      subDistrict: "കണ്ണൂർ സൗത്ത് ഉപജില്ല",
      kalolsavamTitle: "കേരള സ്കൂൾ\nകലോത്സവം",
      venue: "അഞ്ചരക്കണ്ടി ഹയർസെക്കൻഡറി സ്കൂളിൽ",
      dates: "2026 നവംബർ 11, 12, 13, 14 തീയതികളിൽ",
      greeting: "അഭിനന്ദനങ്ങൾ!",
      studentName: "ദേവിക എസ്. കുമാർ",
      itemName: "മോഹിനിയാട്ടം",
      schoolName: "അഞ്ചരക്കണ്ടി ഹയർസെക്കൻഡറി സ്കൂൾ",
      position: "ഒന്നാം സ്ഥാനം",
      grade: "A ഗ്രേഡ്",
      schoolLabel: "സ്കൂൾ",
      positionLabel: "ലഭിച്ച സ്ഥാനം",
      gradeLabel: "ഗ്രേഡ്"
    },
    en: {
      subDistrict: "Kannur South Sub-District",
      kalolsavamTitle: "Kerala School\nKalolsavam",
      venue: "At Anjarakandy Higher Secondary School",
      dates: "2026 November 11, 12, 13, 14",
      greeting: "Congratulations!",
      studentName: "Devika S. Kumar",
      itemName: "Mohiniyattam",
      schoolName: "Anjarakandy Higher Secondary School",
      position: "First Place",
      grade: "A Grade",
      schoolLabel: "School",
      positionLabel: "Position",
      gradeLabel: "Grade"
    }
  };

  const UI_TRANSLATIONS = {
    ml: {
      appTitle: "കലോത്സവ പോസ്റ്റർ മേക്കർ",
      appSubtitle: "ഉപജില്ലാ സ്കൂൾ കലോത്സവ അഭിനന്ദന പോസ്റ്ററുകൾ ഞൊടിയിടയിൽ നിർമ്മിക്കാം",
      badgePro: "Sub-District Pro",
      nextStudentBtn: "അടുത്ത വിദ്യാർത്ഥി (Batch Mode)",
      resetAll: "റീസെറ്റ്",
      tabEdit: "✏️ വിവരങ്ങൾ നൽകുക (Edit)",
      tabPreview: "🖼️ പോസ്റ്റർ കാണുക (Preview)",
      posterLangLabel: "പോസ്റ്റർ ഭാഷ:",
      secFestival: "🎪 ഉത്സവ വിവരങ്ങൾ (Festival Details)",
      autoSaveHint: "തനിയെ സേവ് ആകും",
      lblSubDistrict: "ഉപജില്ല (Sub District)",
      optChooseSubDistrict: "-- ഉപജില്ല തിരഞ്ഞെടുക്കുക --",
      lblTitle: "കലോത്സവം പേര് (Kalolsavam Title)",
      lblVenue: "വേദി (Venue)",
      lblDates: "തീയതികൾ (Dates)",
      secStudent: "👤 വിദ്യാർത്ഥി & ഫലം (Student & Result)",
      lblStudentName: "വിദ്യാർത്ഥിയുടെ പേര് (Student Name)",
      lblItem: "പങ്കെടുത്ത ഇനം (Event / Item)",
      hintSelectBelow: "താഴെ നിന്ന് തിരഞ്ഞെടുക്കാം ⤵",
      lblSchool: "സ്കൂളിന്റെ പേര് (School Name)",
      lblPosition: "ലഭിച്ച സ്ഥാനം (Position)",
      lblGrade: "ഗ്രേഡ് (Grade)",
      lblGreeting: "അഭിനന്ദന സന്ദേശം (Greeting)",
      secPhoto: "📸 വിദ്യാർത്ഥിയുടെ ഫോട്ടോ (Photo)",
      btnSamplePhoto: "സാമ്പിൾ ഫോട്ടോ പരീക്ഷിക്കുക 💃",
      btnUploadPhoto: "ഫോട്ടോ അപ്‌ലോഡ് ചെയ്യുക",
      btnClearPhoto: "മാറ്റുക",
      photoHint: "💡 പോസ്റ്ററിലെ ഫോട്ടോയിൽ നേരിട്ട് ഡ്രാഗ് ചെയ്ത് ഫേസ് അഡ്ജസ്റ്റ് ചെയ്യാം (Drag to position). Ctrl+V വഴിയും പേസ്റ്റ് ചെയ്യാം!",
      lblZoom: "സൂം (Zoom)",
      btnRotate: "🔄 90°",
      btnResetPhoto: "റീസെറ്റ്",
      secLogo: "🏫 സ്കൂൾ ലോഗോ (School Logo)",
      lblShowLogo: "കാണിക്കുക",
      lblLogoPos: "ലോഗോ സ്ഥാനം:",
      optLogoTopCenter: "മുകളിൽ നടുവിലായി (Top Center)",
      optLogoTopRight: "മുകളിൽ വലതുവശത്ത് (Top Right)",
      optLogoTopLeft: "മുകളിൽ ഇടതുവശത്ത് (Top Left)",
      optLogoAboveResults: "ഫലങ്ങൾക്ക് മുകളിലായി (Above Results)",
      lblLogoScale: "വലിപ്പം (Size):",
      btnUploadLogo: "പുതിയ ലോഗോ മാറ്റുക",
      btnResetLogo: "റീസെറ്റ്",
      secTheme: "🎨 കളർ തീമുകളും ശൈലിയും (Themes & Style)",
      optThemeRoyal: "റോയൽ ബ്ലൂ ⭐",
      optThemeMaroon: "മെറൂൺ ഗോൾഡ്",
      optThemeEmerald: "എമറാൾഡ് ഗ്രീൻ",
      optThemeViolet: "ഇംപീരിയൽ വയലറ്റ്",
      optThemeObsidian: "ഡാർക്ക് ലക്ഷ്വറി",
      optShowStars: "✨ സ്പാർക്കിൾ സ്റ്റാർസ്",
      optShowBokeh: "🔮 ബൊക്കെ പ്രഭ",
      optShowKathakali: "🎭 കലോത്സവ മുദ്ര",
      optHideLabels: "🏷️ ലേബൽ ഒഴിവാക്കുക (Clean Badges)",
      aspectLabel: "അളവ്:",
      aspectPoster: "4:5 ക്ലാസിക് പോസ്റ്റർ",
      aspectStatus: "9:16 വാട്സാപ്പ് സ്റ്റാറ്റസ്",
      aspectSquare: "1:1 സ്ക്വയർ",
      liveHd: "Live HD Preview",
      btnDownloadPng: "HD പോസ്റ്റർ ഡൗൺലോഡ് (PNG)",
      btnShareWhatsapp: "വാട്സാപ്പിൽ പങ്കിടുക (Share)",
      btnDownloadJpg: "ഡൗൺലോഡ് (JPG)",
      btnCopyClipboard: "കോപ്പി ചെയ്യുക (Copy)",
      toastCopied: "പോസ്റ്റർ ക്ലിപ്പ്ബോർഡിലേക്ക് കോപ്പി ചെയ്തു! 📋",
      toastDownloaded: "പോസ്റ്റർ വിജയകരമായി ഡൗൺലോഡ് ആയി! 🎉",
      toastNextReady: "അടുത്ത വിദ്യാർത്ഥിക്കായി പുതിയ പോസ്റ്റർ തയ്യാറായി! ✨",
      manglishTitle: "മലയാളം / മാംഗ്ലീഷ് ടൈപ്പിംഗ്",
      manglishDesc: "ഇംഗ്ലീഷിലോ മലയാളത്തിലോ നേരിട്ട് ടൈപ്പ് ചെയ്യാം"
    },
    en: {
      appTitle: "Kalolsavam Poster Maker",
      appSubtitle: "Create stunning congratulatory posters for Sub-District School Kalolsavam",
      badgePro: "Sub-District Pro",
      nextStudentBtn: "Next Student (Batch Mode)",
      resetAll: "Reset",
      tabEdit: "✏️ Edit Details",
      tabPreview: "🖼️ View Poster",
      posterLangLabel: "Poster Language:",
      secFestival: "🎪 Festival Details",
      autoSaveHint: "Auto-saved",
      lblSubDistrict: "Sub-District",
      optChooseSubDistrict: "-- Select Sub-District --",
      lblTitle: "Kalolsavam Title",
      lblVenue: "Venue",
      lblDates: "Dates",
      secStudent: "👤 Student & Result Details",
      lblStudentName: "Student Name",
      lblItem: "Competition Event / Item",
      hintSelectBelow: "Choose from below ⤵",
      lblSchool: "School Name",
      lblPosition: "Position Secured",
      lblGrade: "Grade",
      lblGreeting: "Congratulatory Message",
      secPhoto: "📸 Student Photograph",
      btnSamplePhoto: "Try Sample Photo 💃",
      btnUploadPhoto: "Upload Photo",
      btnClearPhoto: "Remove",
      photoHint: "💡 Drag photo directly on canvas to center face. You can also paste using Ctrl+V!",
      lblZoom: "Zoom",
      btnRotate: "🔄 90°",
      btnResetPhoto: "Reset",
      secLogo: "🏫 School Logo",
      lblShowLogo: "Show Logo",
      lblLogoPos: "Logo Position:",
      optLogoTopCenter: "Top Center",
      optLogoTopRight: "Top Right",
      optLogoTopLeft: "Top Left",
      optLogoAboveResults: "Above Results",
      lblLogoScale: "Logo Size:",
      btnUploadLogo: "Upload Custom Logo",
      btnResetLogo: "Reset Logo",
      secTheme: "🎨 Themes & Visual Styling",
      optThemeRoyal: "Royal Navy Blue ⭐",
      optThemeMaroon: "Festival Maroon",
      optThemeEmerald: "Emerald Green",
      optThemeViolet: "Imperial Violet",
      optThemeObsidian: "Obsidian & Gold",
      optShowStars: "✨ Sparkling Stars",
      optShowBokeh: "🔮 Ambient Bokeh",
      optShowKathakali: "🎭 Festival Watermark",
      optHideLabels: "🏷️ Clean Minimalist Badges",
      aspectLabel: "Size:",
      aspectPoster: "4:5 Classic Poster",
      aspectStatus: "9:16 WhatsApp Status",
      aspectSquare: "1:1 Square",
      liveHd: "Live HD Preview",
      btnDownloadPng: "Download HD Poster (PNG)",
      btnShareWhatsapp: "Share on WhatsApp",
      btnDownloadJpg: "Download (JPG)",
      btnCopyClipboard: "Copy to Clipboard",
      toastCopied: "Poster copied to clipboard! 📋",
      toastDownloaded: "Poster downloaded successfully! 🎉",
      toastNextReady: "Ready for next student! Enter name & photo. ✨",
      manglishTitle: "Phonetic Manglish Typing",
      manglishDesc: "Type in English to auto-convert common Malayalam words"
    }
  };

  const THEMES = {
    royal_blue: {
      id: "royal_blue",
      name: "Royal Navy Blue",
      nameMl: "റോയൽ ബ്ലൂ (Classic)",
      gradientStart: "#05162e",
      gradientMid: "#0a264a",
      gradientEnd: "#0e3566",
      bokehColor1: "rgba(30, 80, 140, 0.38)",
      bokehColor2: "rgba(14, 165, 233, 0.20)",
      bokehColor3: "rgba(234, 179, 8, 0.15)",
      goldPrimary: "#eab308",
      goldSecondary: "#fde047",
      goldBorder: "#e5ad42",
      textColor: "#ffffff",
      subTextColor: "#fde68a",
      labelColor: "#93c5fd",
      cardBg: "rgba(255, 255, 255, 0.08)",
      cardBorder: "rgba(255, 255, 255, 0.24)",
      cardDivider: "rgba(255, 255, 255, 0.15)"
    },
    maroon_gold: {
      id: "maroon_gold",
      name: "Festival Maroon",
      nameMl: "ഫെസ്റ്റിവൽ മെറൂൺ",
      gradientStart: "#28040a",
      gradientMid: "#4c0b16",
      gradientEnd: "#6b1122",
      bokehColor1: "rgba(180, 40, 60, 0.35)",
      bokehColor2: "rgba(245, 158, 11, 0.22)",
      bokehColor3: "rgba(253, 224, 71, 0.15)",
      goldPrimary: "#facc15",
      goldSecondary: "#fef08a",
      goldBorder: "#f59e0b",
      textColor: "#ffffff",
      subTextColor: "#fef08a",
      labelColor: "#fed7aa",
      cardBg: "rgba(255, 255, 255, 0.08)",
      cardBorder: "rgba(255, 215, 0, 0.3)",
      cardDivider: "rgba(255, 215, 0, 0.18)"
    },
    emerald_gold: {
      id: "emerald_gold",
      name: "Emerald Green",
      nameMl: "എമറാൾഡ് ഗ്രീൻ",
      gradientStart: "#031d16",
      gradientMid: "#06382c",
      gradientEnd: "#0c5241",
      bokehColor1: "rgba(16, 120, 85, 0.35)",
      bokehColor2: "rgba(234, 179, 8, 0.2)",
      bokehColor3: "rgba(52, 211, 153, 0.15)",
      goldPrimary: "#f59e0b",
      goldSecondary: "#fde68a",
      goldBorder: "#fbbf24",
      textColor: "#ffffff",
      subTextColor: "#fef3c7",
      labelColor: "#a7f3d0",
      cardBg: "rgba(255, 255, 255, 0.08)",
      cardBorder: "rgba(255, 255, 255, 0.24)",
      cardDivider: "rgba(255, 255, 255, 0.15)"
    },
    violet_majesty: {
      id: "violet_majesty",
      name: "Imperial Violet",
      nameMl: "ഇംപീരിയൽ വയലറ്റ്",
      gradientStart: "#140523",
      gradientMid: "#270b42",
      gradientEnd: "#3d1366",
      bokehColor1: "rgba(110, 40, 180, 0.35)",
      bokehColor2: "rgba(217, 70, 239, 0.2)",
      bokehColor3: "rgba(250, 204, 21, 0.15)",
      goldPrimary: "#facc15",
      goldSecondary: "#fef9c3",
      goldBorder: "#eab308",
      textColor: "#ffffff",
      subTextColor: "#fef08a",
      labelColor: "#e9d5ff",
      cardBg: "rgba(255, 255, 255, 0.08)",
      cardBorder: "rgba(255, 255, 255, 0.24)",
      cardDivider: "rgba(255, 255, 255, 0.15)"
    },
    obsidian_gold: {
      id: "obsidian_gold",
      name: "Obsidian & Gold",
      nameMl: "ഡാർക്ക് ലക്ഷ്വറി",
      gradientStart: "#09090b",
      gradientMid: "#121217",
      gradientEnd: "#1a1a24",
      bokehColor1: "rgba(234, 179, 8, 0.2)",
      bokehColor2: "rgba(245, 158, 11, 0.15)",
      bokehColor3: "rgba(255, 255, 255, 0.06)",
      goldPrimary: "#fbbf24",
      goldSecondary: "#fef08a",
      goldBorder: "#f59e0b",
      textColor: "#ffffff",
      subTextColor: "#fde68a",
      labelColor: "#cbd5e1",
      cardBg: "rgba(255, 255, 255, 0.07)",
      cardBorder: "rgba(251, 191, 36, 0.3)",
      cardDivider: "rgba(251, 191, 36, 0.15)"
    }
  };

  // --- 3. PHONETIC TRANSLITERATION ---
  function transliterateWord(input) {
    if (!input) return "";
    const text = input.trim();
    const commonWords = {
      kannur: "കണ്ണൂർ", south: "സൗത്ത്", north: "നോർത്ത്", upajilla: "ഉപജില്ല",
      kerala: "കേരള", school: "സ്കൂൾ", kalolsavam: "കലോത്സവം",
      abhinandhanangal: "അഭിനന്ദനങ്ങൾ!", congratulations: "അഭിനന്ദനങ്ങൾ!",
      onnam: "ഒന്നാം", randam: "രണ്ടാം", moonnam: "മൂന്നാം",
      sthanam: "സ്ഥാനം", grade: "ഗ്രേഡ്", ancharakandi: "അഞ്ചരക്കണ്ടി",
      higher: "ഹയർ", secondary: "സെക്കൻഡറി", schoolil: "സ്കൂളിൽ",
      november: "നവംബർ", vidyarthi: "വിദ്യാർത്ഥി", peru: "പേര്", inam: "ഇനം",
      mohiniyattam: "മോഹിനിയാട്ടം", bharatanatyam: "ഭരതനാട്യം", kuchipudi: "കുച്ചിപ്പുടി",
      keralanadanam: "കേരളനടനം", lalithaganam: "ലളിതഗാനം", sangeetham: "സംഗീതം",
      mappilappattu: "മാപ്പിളപ്പാട്ട്", oppana: "ഒപ്പന", prasangam: "പ്രസംഗം",
      katharachana: "കഥാരചന", monoact: "മോണോആക്ട്", mimicry: "മിമിക്രി", natakam: "നാടകം"
    };

    const lower = text.toLowerCase();
    if (commonWords[lower]) return commonWords[lower];

    return text.split(/\s+/).map(w => {
      const l = w.toLowerCase();
      return commonWords[l] || w;
    }).join(" ");
  }

  // --- 4. PHOTO EDITOR CONTROLLER ---
  class PhotoEditor {
    constructor(options) {
      this.canvas = options.canvas;
      this.renderer = options.renderer;
      this.onUpdate = options.onUpdate || (() => {});
      this.isDragging = false;
      this.dragStartX = 0;
      this.dragStartY = 0;
      this.initPanX = 0;
      this.initPanY = 0;
      this.setupListeners();
    }

    setupListeners() {
      this.canvas.addEventListener("mousedown", (e) => this.handleDragStart(e.clientX, e.clientY));
      window.addEventListener("mousemove", (e) => this.handleDragMove(e.clientX, e.clientY));
      window.addEventListener("mouseup", () => this.handleDragEnd());

      this.canvas.addEventListener("touchstart", (e) => {
        if (e.touches.length === 1) this.handleDragStart(e.touches[0].clientX, e.touches[0].clientY);
      }, { passive: true });

      window.addEventListener("touchmove", (e) => {
        if (this.isDragging && e.touches.length === 1) this.handleDragMove(e.touches[0].clientX, e.touches[0].clientY);
      }, { passive: true });

      window.addEventListener("touchend", () => this.handleDragEnd());

      window.addEventListener("paste", (e) => {
        const items = e.clipboardData?.items;
        if (!items) return;
        for (let i = 0; i < items.length; i++) {
          if (items[i].type.indexOf("image") !== -1) {
            this.loadImageFile(items[i].getAsFile());
            break;
          }
        }
      });
    }

    handleDragStart(clientX, clientY) {
      if (!this.renderer.userImage) return;
      this.isDragging = true;
      this.dragStartX = clientX;
      this.dragStartY = clientY;
      this.initPanX = this.renderer.photoTransform.panX;
      this.initPanY = this.renderer.photoTransform.panY;
    }

    handleDragMove(clientX, clientY) {
      if (!this.isDragging) return;
      const rect = this.canvas.getBoundingClientRect();
      const scaleFactor = this.canvas.width / rect.width;
      const dx = (clientX - this.dragStartX) * scaleFactor;
      const dy = (clientY - this.dragStartY) * scaleFactor;

      this.renderer.setPhotoTransform({
        panX: this.initPanX + dx,
        panY: this.initPanY + dy
      });
      this.renderer.render();
      this.onUpdate();
    }

    handleDragEnd() {
      this.isDragging = false;
    }

    loadImageFile(file) {
      if (!file || !file.type.startsWith("image/")) return;
      const reader = new FileReader();
      reader.onload = (event) => {
        const img = new Image();
        img.onload = () => {
          this.renderer.setUserImage(img);
          this.renderer.resetPhotoTransform();
          this.renderer.render();
          this.onUpdate();
        };
        img.src = event.target.result;
      };
      reader.readAsDataURL(file);
    }

    loadSamplePhoto() {
      const sampleCanvas = document.createElement("canvas");
      sampleCanvas.width = 600;
      sampleCanvas.height = 600;
      const sCtx = sampleCanvas.getContext("2d");

      const bgGrad = sCtx.createLinearGradient(0, 0, 600, 600);
      bgGrad.addColorStop(0, "#fde047");
      bgGrad.addColorStop(1, "#ca8a04");
      sCtx.fillStyle = bgGrad;
      sCtx.fillRect(0, 0, 600, 600);

      sCtx.fillStyle = "#854d0e";
      sCtx.beginPath();
      sCtx.arc(300, 300, 260, 0, Math.PI * 2);
      sCtx.fill();

      sCtx.fillStyle = "#fef08a";
      sCtx.beginPath();
      sCtx.arc(300, 240, 110, 0, Math.PI * 2);
      sCtx.fill();

      sCtx.fillStyle = "#f59e0b";
      sCtx.beginPath();
      sCtx.moveTo(220, 190);
      sCtx.lineTo(300, 90);
      sCtx.lineTo(380, 190);
      sCtx.closePath();
      sCtx.fill();

      sCtx.fillStyle = "#eab308";
      sCtx.beginPath();
      sCtx.ellipse(300, 480, 200, 160, 0, 0, Math.PI * 2);
      sCtx.fill();

      const img = new Image();
      img.onload = () => {
        this.renderer.setUserImage(img);
        this.renderer.resetPhotoTransform();
        this.renderer.render();
        this.onUpdate();
      };
      img.src = sampleCanvas.toDataURL("image/png");
    }

    setZoom(val) {
      this.renderer.setPhotoTransform({ zoom: parseFloat(val) });
      this.renderer.render();
    }

    rotate90() {
      const nextRotation = (this.renderer.photoTransform.rotation + 90) % 360;
      this.renderer.setPhotoTransform({ rotation: nextRotation });
      this.renderer.render();
    }

    reset() {
      this.renderer.resetPhotoTransform();
      this.renderer.render();
      this.onUpdate();
    }

    clearPhoto() {
      this.renderer.setUserImage(null);
      this.renderer.resetPhotoTransform();
      this.renderer.render();
      this.onUpdate();
    }
  }

  // --- 5. CANVAS RENDERER ---
  class PosterRenderer {
    constructor(canvas, initialLang) {
      this.canvas = canvas;
      this.ctx = canvas.getContext("2d");
      this.aspectRatios = {
        "4:5": { width: 1200, height: 1500 },
        "9:16": { width: 1200, height: 2133 },
        "1:1": { width: 1200, height: 1200 }
      };
      this.currentAspect = "4:5";
      this.userImage = null;
      this.logoImage = null;
      this.language = initialLang || "en";

      this.photoTransform = {
        zoom: 1.0,
        panX: 0,
        panY: 0,
        rotation: 0
      };

      const baseProfile = (this.language === "en") ? DEFAULT_PROFILES.en : DEFAULT_PROFILES.ml;
      this.state = {
        ...baseProfile,
        positionBadge: "🥇",
        gradeBadge: "⭐",
        themeId: "royal_blue",
        showStars: true,
        showBokeh: true,
        showKathakaliMotif: true,
        hideLabels: true,
        showLogo: true,
        logoPosition: "top_center",
        logoScale: 1.0
      };
    }

    setLanguage(lang) {
      this.language = lang;
    }

    setAspectRatio(ratioKey) {
      if (this.aspectRatios[ratioKey]) {
        this.currentAspect = ratioKey;
        const { width, height } = this.aspectRatios[ratioKey];
        this.canvas.width = width;
        this.canvas.height = height;
      }
    }

    updateState(partial) {
      this.state = { ...this.state, ...partial };
    }

    setUserImage(img) {
      this.userImage = img;
    }

    setLogoImage(img) {
      this.logoImage = img;
    }

    setPhotoTransform(tf) {
      this.photoTransform = { ...this.photoTransform, ...tf };
    }

    resetPhotoTransform() {
      this.photoTransform = { zoom: 1.0, panX: 0, panY: 0, rotation: 0 };
    }

    render() {
      const { ctx, canvas } = this;
      const w = canvas.width;
      const h = canvas.height;
      const theme = THEMES[this.state.themeId] || THEMES.royal_blue;

      ctx.save();
      ctx.clearRect(0, 0, w, h);

      // 1. Background
      const grad = ctx.createLinearGradient(0, 0, 0, h);
      grad.addColorStop(0, theme.gradientStart);
      grad.addColorStop(0.45, theme.gradientMid);
      grad.addColorStop(1, theme.gradientEnd);
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, w, h);

      // Radial top glow
      const radial = ctx.createRadialGradient(w / 2, 170, 40, w / 2, 260, 520);
      radial.addColorStop(0, "rgba(255, 215, 0, 0.14)");
      radial.addColorStop(0.5, "rgba(255, 215, 0, 0.04)");
      radial.addColorStop(1, "rgba(0, 0, 0, 0)");
      ctx.fillStyle = radial;
      ctx.fillRect(0, 0, w, h);

      // 2. Bokeh
      if (this.state.showBokeh) {
        const orbs = [
          { x: w * 0.15, y: h * 0.16, r: 190, color: theme.bokehColor1 },
          { x: w * 0.86, y: h * 0.22, r: 160, color: theme.bokehColor2 },
          { x: w * 0.12, y: h * 0.48, r: 200, color: theme.bokehColor1 },
          { x: w * 0.85, y: h * 0.74, r: 240, color: theme.bokehColor1 },
          { x: w * 0.88, y: h * 0.48, r: 140, color: theme.bokehColor3 },
          { x: w * 0.22, y: h * 0.88, r: 180, color: theme.bokehColor2 }
        ];
        orbs.forEach(orb => {
          ctx.save();
          const rGrad = ctx.createRadialGradient(orb.x, orb.y, 0, orb.x, orb.y, orb.r);
          rGrad.addColorStop(0, orb.color);
          rGrad.addColorStop(0.7, orb.color);
          rGrad.addColorStop(1, "rgba(0, 0, 0, 0)");
          ctx.beginPath();
          ctx.arc(orb.x, orb.y, orb.r, 0, Math.PI * 2);
          ctx.fillStyle = rGrad;
          ctx.fill();
          ctx.restore();
        });
      }

      // 3. Cultural Motif
      if (this.state.showKathakaliMotif) {
        ctx.save();
        ctx.strokeStyle = "rgba(255, 215, 0, 0.07)";
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.arc(w / 2, h * 0.40, 340, 0, Math.PI * 2);
        ctx.stroke();
        ctx.restore();
      }

      // 4. Golden Borders & Sparkles
      const margin = 28;
      const innerMargin = 38;
      ctx.save();
      ctx.strokeStyle = theme.goldBorder;
      ctx.lineWidth = 3;
      ctx.strokeRect(margin, margin, w - margin * 2, h - margin * 2);

      ctx.strokeStyle = "rgba(255, 215, 0, 0.35)";
      ctx.lineWidth = 1.5;
      ctx.strokeRect(innerMargin, innerMargin, w - innerMargin * 2, h - innerMargin * 2);

      // Corner diamonds
      this.drawDiamond(ctx, margin + 4, margin + 4, 10, theme.goldPrimary);
      this.drawDiamond(ctx, w - margin - 4, margin + 4, 10, theme.goldPrimary);
      this.drawDiamond(ctx, margin + 4, h - margin - 4, 10, theme.goldPrimary);
      this.drawDiamond(ctx, w - margin - 4, h - margin - 4, 10, theme.goldPrimary);

      // Top sparkles
      if (this.state.showStars) {
        const topStarY = innerMargin + 28;
        if (!this.state.showLogo || this.state.logoPosition !== "top_center") {
          this.drawDiamond(ctx, w * 0.08, topStarY + 4, 11, theme.goldSecondary);
          this.drawDiamond(ctx, w * 0.15, topStarY, 15, theme.goldPrimary);
          this.drawDiamond(ctx, w * 0.23, topStarY + 4, 12, theme.goldSecondary);
        } else {
          this.drawDiamond(ctx, w * 0.08, topStarY + 8, 10, theme.goldSecondary);
          this.drawDiamond(ctx, w * 0.92, topStarY + 8, 10, theme.goldSecondary);
        }
      }
      ctx.restore();

      const layout = this.computeLayout(w, h);

      // 5. School Logo
      this.drawLogo(theme, layout);

      // 6. Header
      this.drawHeader(theme, layout);

      // 7. Photo Frame
      this.drawPhoto(theme, layout);

      // 8. Student Info
      this.drawStudentInfo(theme, layout);

      // 9. Result Pills
      this.drawResultCard(theme, layout);

      ctx.restore();
    }

    drawDiamond(ctx, x, y, size, color) {
      ctx.save();
      ctx.fillStyle = color;
      ctx.shadowColor = "rgba(234, 179, 8, 0.6)";
      ctx.shadowBlur = 8;
      ctx.beginPath();
      ctx.moveTo(x, y - size);
      ctx.lineTo(x + size * 0.8, y);
      ctx.lineTo(x, y + size);
      ctx.lineTo(x - size * 0.8, y);
      ctx.closePath();
      ctx.fill();
      ctx.restore();
    }

    computeLayout(w, h) {
      const hasTopLogo = this.state.showLogo && this.logoImage && this.state.logoPosition === "top_center";
      const headerShift = hasTopLogo ? 88 : 0;

      if (this.currentAspect === "9:16") {
        return {
          headerTop: (h * 0.065) + headerShift,
          photoCenterY: h * 0.405,
          photoRadius: 215,
          greetingY: h * 0.585,
          studentNameY: h * 0.64,
          itemY: h * 0.69,
          cardY: h * 0.74,
          cardHeight: 330,
          cardWidth: w * 0.86
        };
      } else if (this.currentAspect === "1:1") {
        return {
          headerTop: (h * 0.045) + (hasTopLogo ? 65 : 0),
          photoCenterY: h * 0.385,
          photoRadius: 160,
          greetingY: h * 0.58,
          studentNameY: h * 0.64,
          itemY: h * 0.695,
          cardY: h * 0.745,
          cardHeight: 250,
          cardWidth: w * 0.90
        };
      }
      return {
        headerTop: (h * 0.055) + headerShift,
        photoCenterY: h * 0.40,
        photoRadius: 195,
        greetingY: h * 0.585,
        studentNameY: h * 0.645,
        itemY: h * 0.695,
        cardY: h * 0.745,
        cardHeight: 285,
        cardWidth: w * 0.87
      };
    }

    drawLogo(theme, layout) {
      if (!this.state.showLogo || !this.logoImage) return;

      const { ctx } = this;
      const w = this.canvas.width;
      const img = this.logoImage;
      const aspect = (img.width || 423) / (img.height || 122);
      const scale = this.state.logoScale || 1.0;

      ctx.save();
      ctx.shadowColor = "rgba(0, 0, 0, 0.6)";
      ctx.shadowBlur = 10;
      ctx.shadowOffsetY = 3;

      if (this.state.logoPosition === "top_center") {
        const targetW = 340 * scale;
        const targetH = targetW / aspect;
        const logoX = (w - targetW) / 2;
        const logoY = 48;
        ctx.drawImage(img, logoX, logoY, targetW, targetH);
      } else if (this.state.logoPosition === "top_right") {
        const targetW = 240 * scale;
        const targetH = targetW / aspect;
        const logoX = w - 48 - targetW;
        const logoY = 48;
        ctx.drawImage(img, logoX, logoY, targetW, targetH);
      } else if (this.state.logoPosition === "top_left") {
        const targetW = 240 * scale;
        const targetH = targetW / aspect;
        const logoX = 48;
        const logoY = 48;
        ctx.drawImage(img, logoX, logoY, targetW, targetH);
      } else if (this.state.logoPosition === "above_results") {
        const targetW = 260 * scale;
        const targetH = targetW / aspect;
        const logoX = (w - targetW) / 2;
        const logoY = layout.cardY - targetH - 12;
        ctx.drawImage(img, logoX, logoY, targetW, targetH);
      }

      ctx.restore();
    }

    drawHeader(theme, layout) {
      const { ctx } = this;
      const w = this.canvas.width;
      let currentY = layout.headerTop;

      ctx.save();
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";

      const isEn = this.language === "en";
      const fontFamily = isEn 
        ? "'Plus Jakarta Sans', 'Outfit', sans-serif" 
        : "'Manjari', 'Noto Sans Malayalam', sans-serif";

      // Sub-district (Always translated to target language)
      let subDistrictText = translateValue(this.state.subDistrict, this.language);
      if (subDistrictText && subDistrictText.trim()) {
        ctx.font = `700 33px ${fontFamily}`;
        ctx.fillStyle = theme.goldPrimary;
        ctx.shadowColor = "rgba(0, 0, 0, 0.4)";
        ctx.shadowBlur = 6;
        ctx.fillText(subDistrictText.trim(), w / 2, currentY);
        currentY += 45;
      }

      // Title Lines (Always translated to target language)
      let titleText = translateValue(this.state.kalolsavamTitle, this.language);
      const titleLines = (titleText || "").split("\n").filter(Boolean);
      ctx.fillStyle = theme.textColor;
      ctx.shadowColor = "rgba(0, 0, 0, 0.7)";
      ctx.shadowBlur = 10;
      ctx.shadowOffsetY = 3;

      titleLines.forEach((line) => {
        ctx.font = `800 56px ${fontFamily}`;
        ctx.fillText(line.trim(), w / 2, currentY);
        currentY += 60;
      });

      currentY -= 8;

      // Venue
      let venueText = translateValue(this.state.venue, this.language);
      if (venueText && venueText.trim()) {
        ctx.font = `600 26px ${fontFamily}`;
        ctx.fillStyle = theme.subTextColor;
        ctx.shadowColor = "rgba(0, 0, 0, 0.4)";
        ctx.shadowBlur = 4;
        ctx.fillText(venueText.trim(), w / 2, currentY);
        currentY += 34;
      }

      // Dates
      let datesText = translateValue(this.state.dates, this.language);
      if (datesText && datesText.trim()) {
        ctx.font = `500 23px ${fontFamily}`;
        ctx.fillStyle = "rgba(255, 255, 255, 0.9)";
        ctx.fillText(datesText.trim(), w / 2, currentY);
      }

      ctx.restore();
    }

    drawPhoto(theme, layout) {
      const { ctx } = this;
      const w = this.canvas.width;
      const cx = w / 2;
      const cy = layout.photoCenterY;
      const r = layout.photoRadius;

      ctx.save();
      ctx.beginPath();
      ctx.arc(cx, cy, r + 6, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(0, 0, 0, 0.35)";
      ctx.shadowColor = "rgba(0, 0, 0, 0.65)";
      ctx.shadowBlur = 32;
      ctx.shadowOffsetY = 14;
      ctx.fill();

      ctx.save();
      ctx.beginPath();
      ctx.arc(cx, cy, r, 0, Math.PI * 2);
      ctx.closePath();
      ctx.clip();

      if (this.userImage) {
        ctx.save();
        ctx.translate(cx + this.photoTransform.panX, cy + this.photoTransform.panY);
        ctx.rotate((this.photoTransform.rotation * Math.PI) / 180);
        ctx.scale(this.photoTransform.zoom, this.photoTransform.zoom);

        const img = this.userImage;
        const imgAspect = img.width / img.height;
        let drawW, drawH;
        if (imgAspect > 1) {
          drawH = r * 2;
          drawW = drawH * imgAspect;
        } else {
          drawW = r * 2;
          drawH = drawW / imgAspect;
        }
        ctx.drawImage(img, -drawW / 2, -drawH / 2, drawW, drawH);
        ctx.restore();
      } else {
        const bgGrad = ctx.createLinearGradient(cx, cy - r, cx, cy + r);
        bgGrad.addColorStop(0, "#d1d5db");
        bgGrad.addColorStop(1, "#cbd5e1");
        ctx.fillStyle = bgGrad;
        ctx.fillRect(cx - r, cy - r, r * 2, r * 2);

        ctx.fillStyle = "#7c8ba1";
        ctx.beginPath();
        ctx.arc(cx, cy - r * 0.16, r * 0.38, 0, Math.PI * 2);
        ctx.fill();

        ctx.beginPath();
        ctx.ellipse(cx, cy + r * 0.82, r * 0.68, r * 0.52, 0, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.restore();

      ctx.save();
      const ringGrad = ctx.createLinearGradient(cx - r, cy - r, cx + r, cy + r);
      ringGrad.addColorStop(0, "#fde047");
      ringGrad.addColorStop(0.3, "#eab308");
      ringGrad.addColorStop(0.6, "#ca8a04");
      ringGrad.addColorStop(0.85, "#fef08a");
      ringGrad.addColorStop(1, "#b45309");

      ctx.beginPath();
      ctx.arc(cx, cy, r, 0, Math.PI * 2);
      ctx.lineWidth = 9;
      ctx.strokeStyle = ringGrad;
      ctx.shadowColor = "rgba(234, 179, 8, 0.5)";
      ctx.shadowBlur = 12;
      ctx.stroke();

      ctx.beginPath();
      ctx.arc(cx, cy, r - 5, 0, Math.PI * 2);
      ctx.lineWidth = 1.5;
      ctx.strokeStyle = "rgba(255, 255, 255, 0.6)";
      ctx.stroke();
      ctx.restore();

      ctx.restore();
    }

    drawStudentInfo(theme, layout) {
      const { ctx } = this;
      const w = this.canvas.width;

      ctx.save();
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";

      const isEn = this.language === "en";
      const greetingFont = isEn ? "'Plus Jakarta Sans', sans-serif" : "'Gayathri', 'Manjari', sans-serif";
      const nameFont = isEn ? "'Plus Jakarta Sans', sans-serif" : "'Manjari', 'Noto Sans Malayalam', sans-serif";

      // Greeting (Always translated)
      let greetingText = translateValue(this.state.greeting, this.language);
      if (greetingText && greetingText.trim()) {
        ctx.font = `800 48px ${greetingFont}`;
        ctx.fillStyle = theme.goldPrimary;
        ctx.shadowColor = "rgba(234, 179, 8, 0.4)";
        ctx.shadowBlur = 10;
        ctx.fillText(greetingText.trim(), w / 2, layout.greetingY);
      }

      // Student Name (Always translated)
      const rawName = (this.state.studentName || "").trim();
      const studentName = translateValue(rawName, this.language);
      if (studentName) {
        ctx.font = `800 56px ${nameFont}`;
        ctx.fillStyle = theme.textColor;
        ctx.shadowColor = "rgba(0, 0, 0, 0.7)";
        ctx.shadowBlur = 12;
        ctx.shadowOffsetY = 3;

        const maxWidth = w * 0.84;
        if (ctx.measureText(studentName).width > maxWidth) {
          ctx.font = `800 44px ${nameFont}`;
        }
        ctx.fillText(studentName, w / 2, layout.studentNameY);
      }

      // Item Name (Always translated)
      let itemName = translateValue(this.state.itemName, this.language);
      if (itemName) {
        ctx.font = `600 32px ${nameFont}`;
        ctx.fillStyle = theme.labelColor;
        ctx.shadowColor = "rgba(0, 0, 0, 0.4)";
        ctx.shadowBlur = 6;
        ctx.shadowOffsetY = 2;
        ctx.fillText(itemName, w / 2, layout.itemY);
      }

      ctx.restore();
    }

    drawResultCard(theme, layout) {
      const { ctx } = this;
      const w = this.canvas.width;
      const cardW = layout.cardWidth;
      const cardH = layout.cardHeight;
      const cardX = (w - cardW) / 2;
      const cardY = layout.cardY;
      const isEn = this.language === "en";
      const font = isEn ? "'Plus Jakarta Sans', sans-serif" : "'Manjari', 'Noto Sans Malayalam', sans-serif";

      ctx.save();

      const isDummyText = (text) => {
        if (!text) return true;
        const l = text.trim().toLowerCase();
        return ["schoolname", "school name", "സ്കൂളിന്റെ പേര്", "student name", "വിദ്യാർത്ഥിയുടെ പേര്", "position", "സ്ഥാനം"].includes(l);
      };

      const validRows = [];

      // 1. School (Translated to target language!)
      const rawSchool = (this.state.schoolName || "").trim();
      if (rawSchool && !isDummyText(rawSchool)) {
        validRows.push({
          label: isEn ? "School" : "സ്കൂൾ",
          value: translateValue(rawSchool, this.language),
          icon: "🏫",
          badge: ""
        });
      }

      // 2. Position (Crucial: Translated to target language!)
      const rawPos = (this.state.position || "").trim();
      if (rawPos && !isDummyText(rawPos)) {
        validRows.push({
          label: isEn ? "Position" : "ലഭിച്ച സ്ഥാനം",
          value: translateValue(rawPos, this.language),
          icon: "🏆",
          badge: this.state.positionBadge || ""
        });
      }

      // 3. Grade (Crucial: Translated to target language!)
      const rawGrade = (this.state.grade || "").trim();
      if (rawGrade && !isDummyText(rawGrade)) {
        validRows.push({
          label: isEn ? "Grade" : "ഗ്രേഡ്",
          value: translateValue(rawGrade, this.language),
          icon: "⭐",
          badge: this.state.gradeBadge || ""
        });
      }

      if (validRows.length === 0) {
        validRows.push({
          label: isEn ? "Position" : "ലഭിച്ച സ്ഥാനം",
          value: isEn ? "First Place" : "ഒന്നാം സ്ഥാനം",
          icon: "🏆",
          badge: "🥇"
        });
      }

      const pillCount = validRows.length;
      const gap = 12;
      const pillH = Math.min(84, (cardH - gap * (pillCount - 1)) / pillCount);
      const pillRadius = 14;
      const startY = cardY + (cardH - (pillH * pillCount + gap * (pillCount - 1))) / 2;

      validRows.forEach((row, i) => {
        const currentY = startY + i * (pillH + gap);
        const centerY = currentY + pillH / 2;

        ctx.save();
        ctx.beginPath();
        ctx.roundRect(cardX, currentY, cardW, pillH, pillRadius);
        ctx.fillStyle = theme.cardBg;
        ctx.fill();

        ctx.strokeStyle = theme.cardBorder;
        ctx.lineWidth = 1.6;
        ctx.stroke();
        ctx.restore();

        ctx.save();
        ctx.textBaseline = "middle";

        let valText = row.value;
        if (row.badge && row.badge !== "none" && !valText.includes(row.badge)) {
          valText = `${row.value} ${row.badge}`;
        }

        if (this.state.hideLabels) {
          ctx.textAlign = "center";
          ctx.fillStyle = theme.textColor;
          ctx.font = `700 30px ${font}`;
          ctx.shadowColor = "rgba(0, 0, 0, 0.7)";
          ctx.shadowBlur = 6;
          ctx.fillText(`${row.icon}  ${valText}`, cardX + cardW / 2, centerY);
        } else {
          ctx.textAlign = "left";
          ctx.font = `700 27px ${font}`;
          ctx.fillStyle = theme.goldSecondary;
          ctx.shadowColor = "rgba(0, 0, 0, 0.5)";
          ctx.shadowBlur = 4;
          ctx.fillText(row.label, cardX + 34, centerY);

          ctx.fillStyle = theme.textColor;
          ctx.shadowColor = "rgba(0, 0, 0, 0.7)";
          ctx.shadowBlur = 6;

          const rightColStartX = cardX + cardW * 0.38;
          const rightColMaxW = cardW * 0.58;

          let fontSize = 29;
          ctx.font = `700 ${fontSize}px ${font}`;
          while (ctx.measureText(valText).width > rightColMaxW && fontSize > 18) {
            fontSize -= 1.5;
            ctx.font = `700 ${fontSize}px ${font}`;
          }
          ctx.fillText(valText, rightColStartX, centerY);
        }

        ctx.restore();
      });

      if (this.state.showStars && pillCount > 1) {
        const bottomPillY = startY + (pillCount - 1) * (pillH + gap);
        this.drawDiamond(ctx, cardX + cardW - 160, bottomPillY - 2, 7, theme.goldSecondary);
        this.drawDiamond(ctx, cardX + cardW - 75, bottomPillY + 8, 11, theme.goldPrimary);
        this.drawDiamond(ctx, cardX + cardW + 8, bottomPillY - 4, 8, theme.goldSecondary);
      }

      ctx.restore();
    }

    getExportDataURL(format, quality) {
      return this.canvas.toDataURL(format || "image/png", quality || 0.96);
    }

    getExportBlob(format, quality) {
      return new Promise((resolve) => {
        this.canvas.toBlob((blob) => resolve(blob), format || "image/png", quality || 0.96);
      });
    }
  }

  // --- 6. INITIALIZE APPLICATION ---
  function initApp() {
    const canvas = document.getElementById("posterCanvas");
    if (!canvas) return;

    let currentLang = localStorage.getItem("kalolsavam_lang") || "en";
    const renderer = new PosterRenderer(canvas, currentLang);
    renderer.setAspectRatio("4:5");

    let isManglishEnabled = false;

    // Load default Ancharakandy School Logo
    const loadDefaultLogo = () => {
      const logoImg = new Image();
      logoImg.onload = () => {
        renderer.setLogoImage(logoImg);
        renderer.render();
        updateLogoPreview(logoImg.src);
      };
      if (window.DEFAULT_SCHOOL_LOGO) {
        logoImg.src = window.DEFAULT_SCHOOL_LOGO;
      } else {
        logoImg.src = "assets/school_logo.png";
      }
    };
    loadDefaultLogo();

    const photoEditor = new PhotoEditor({
      canvas,
      renderer,
      onUpdate: () => updatePhotoControlsUI()
    });

    // Elements
    const langToggleBtn = document.getElementById("langToggleBtn");
    const posterLangSelect = document.getElementById("posterLangSelect");

    const subDistrictInput = document.getElementById("subDistrict");
    const subDistrictSelect = document.getElementById("subDistrictSelect");
    const kalolsavamTitleInput = document.getElementById("kalolsavamTitle");
    const venueInput = document.getElementById("venue");
    const datesInput = document.getElementById("dates");
    const greetingInput = document.getElementById("greeting");
    const studentNameInput = document.getElementById("studentName");
    const itemNameInput = document.getElementById("itemName");
    const schoolNameInput = document.getElementById("schoolName");
    const positionSelect = document.getElementById("positionSelect");
    const customPositionInput = document.getElementById("customPosition");
    const gradeSelect = document.getElementById("gradeSelect");

    const photoInput = document.getElementById("photoInput");
    const logoInput = document.getElementById("logoInput");
    const zoomSlider = document.getElementById("zoomSlider");
    const zoomValueText = document.getElementById("zoomValue");
    const rotateBtn = document.getElementById("rotateBtn");
    const resetPhotoBtn = document.getElementById("resetPhotoBtn");
    const clearPhotoBtn = document.getElementById("clearPhotoBtn");
    const samplePhotoBtn = document.getElementById("samplePhotoBtn");

    const showLogoToggle = document.getElementById("showLogoToggle");
    const logoPositionSelect = document.getElementById("logoPositionSelect");
    const logoScaleSlider = document.getElementById("logoScaleSlider");
    const resetLogoBtn = document.getElementById("resetLogoBtn");
    const logoPreviewImg = document.getElementById("logoPreviewImg");

    const showStarsToggle = document.getElementById("showStarsToggle");
    const showBokehToggle = document.getElementById("showBokehToggle");
    const showKathakaliToggle = document.getElementById("showKathakaliToggle");
    const hideLabelsToggle = document.getElementById("hideLabelsToggle");
    const manglishToggle = document.getElementById("manglishToggle");

    const downloadPngBtn = document.getElementById("downloadPngBtn");
    const downloadJpgBtn = document.getElementById("downloadJpgBtn");
    const copyClipboardBtn = document.getElementById("copyClipboardBtn");
    const shareWhatsappBtn = document.getElementById("shareWhatsappBtn");
    const nextStudentBtn = document.getElementById("nextStudentBtn");
    const resetAllBtn = document.getElementById("resetAllBtn");

    // Initialize UI and Poster Language fully
    applyLanguage(currentLang, true);
    loadSavedSettings();

    // Ensure visual toggle switches reflect initial defaults
    if (showStarsToggle) showStarsToggle.checked = renderer.state.showStars;
    if (showBokehToggle) showBokehToggle.checked = renderer.state.showBokeh;
    if (showKathakaliToggle) showKathakaliToggle.checked = renderer.state.showKathakaliMotif;
    if (hideLabelsToggle) hideLabelsToggle.checked = renderer.state.hideLabels;

    renderer.render();

    // Re-render when fonts become ready
    if (document.fonts) {
      document.fonts.ready.then(() => renderer.render()).catch(() => {});
    }

    // Language toggle in header
    if (langToggleBtn) {
      langToggleBtn.addEventListener("click", () => {
        currentLang = currentLang === "ml" ? "en" : "ml";
        localStorage.setItem("kalolsavam_lang", currentLang);
        applyLanguage(currentLang, true);
      });
    }

    // Poster Language select
    if (posterLangSelect) {
      posterLangSelect.addEventListener("change", (e) => {
        currentLang = e.target.value;
        localStorage.setItem("kalolsavam_lang", currentLang);
        applyLanguage(currentLang, true);
      });
    }

    function applyLanguage(lang, updatePoster) {
      const t = UI_TRANSLATIONS[lang] || UI_TRANSLATIONS.ml;

      // Update all elements with data-i18n
      document.querySelectorAll("[data-i18n]").forEach(el => {
        const key = el.dataset.i18n;
        if (t[key]) el.textContent = t[key];
      });

      // Update header button
      const langLabel = document.getElementById("langLabel");
      if (langLabel) {
        langLabel.textContent = lang === "ml" ? "മലയാളം / English" : "English / മലയാളം";
      }

      if (posterLangSelect) {
        posterLangSelect.value = lang;
      }

      populateDropdowns(lang);

      if (updatePoster) {
        switchPosterLanguage(lang);
      }
    }

    function switchPosterLanguage(lang) {
      renderer.setLanguage(lang);

      // Translate all input fields seamlessly
      if (subDistrictInput) subDistrictInput.value = translateValue(subDistrictInput.value, lang);
      if (kalolsavamTitleInput) kalolsavamTitleInput.value = translateValue(kalolsavamTitleInput.value, lang);
      if (venueInput) venueInput.value = translateValue(venueInput.value, lang);
      if (datesInput) datesInput.value = translateValue(datesInput.value, lang);
      if (greetingInput) greetingInput.value = translateValue(greetingInput.value, lang);
      if (studentNameInput) studentNameInput.value = translateValue(studentNameInput.value, lang);
      if (itemNameInput) itemNameInput.value = translateValue(itemNameInput.value, lang);
      if (schoolNameInput) schoolNameInput.value = translateValue(schoolNameInput.value, lang);
      if (customPositionInput) customPositionInput.value = translateValue(customPositionInput.value, lang);

      // Translate position & grade in renderer state!
      const currentPos = translateValue(renderer.state.position, lang);
      const currentGrade = translateValue(renderer.state.grade, lang);

      // Find matching badge
      const foundPos = POSITIONS.find(p => p.ml === currentPos || p.en === currentPos);
      const foundGrade = GRADES.find(g => g.ml === currentGrade || g.en === currentGrade);

      if (positionSelect && foundPos) {
        positionSelect.value = foundPos[lang] || foundPos.ml;
      }
      if (gradeSelect && foundGrade) {
        gradeSelect.value = foundGrade[lang] || foundGrade.ml;
      }

      renderer.updateState({
        subDistrict: subDistrictInput?.value || "",
        kalolsavamTitle: kalolsavamTitleInput?.value || "",
        venue: venueInput?.value || "",
        dates: datesInput?.value || "",
        greeting: greetingInput?.value || "",
        studentName: studentNameInput?.value || "",
        itemName: itemNameInput?.value || "",
        schoolName: schoolNameInput?.value || "",
        position: currentPos,
        grade: currentGrade,
        positionBadge: foundPos ? foundPos.badge : "🥇",
        gradeBadge: foundGrade && foundGrade.badge ? "⭐" : ""
      });

      renderer.render();
      saveCommonSettings();
    }

    function bindInput(el, key) {
      if (!el) return;
      el.addEventListener("input", (e) => {
        let val = e.target.value;
        if (isManglishEnabled && e.inputType === "insertText" && e.data === " ") {
          val = transliterateWord(val);
          el.value = val;
        }
        renderer.updateState({ [key]: val });
        renderer.render();
        saveCommonSettings();
      });
    }

    bindInput(subDistrictInput, "subDistrict");
    bindInput(kalolsavamTitleInput, "kalolsavamTitle");
    bindInput(venueInput, "venue");
    bindInput(datesInput, "dates");
    bindInput(greetingInput, "greeting");
    bindInput(studentNameInput, "studentName");
    bindInput(itemNameInput, "itemName");
    bindInput(schoolNameInput, "schoolName");
    bindInput(customPositionInput, "position");

    if (subDistrictSelect) {
      subDistrictSelect.addEventListener("change", (e) => {
        if (e.target.value) {
          subDistrictInput.value = e.target.value;
          renderer.updateState({ subDistrict: e.target.value });
          renderer.render();
          saveCommonSettings();
        }
      });
    }

    if (positionSelect) {
      positionSelect.addEventListener("change", (e) => {
        const found = POSITIONS.find(p => p[currentLang] === e.target.value || p.ml === e.target.value || p.en === e.target.value);
        if (found) {
          const posVal = found[currentLang] || found.ml;
          customPositionInput.value = posVal;
          renderer.updateState({ position: posVal, positionBadge: found.badge });
          renderer.render();
        }
      });
    }

    if (gradeSelect) {
      gradeSelect.addEventListener("change", (e) => {
        const found = GRADES.find(g => g[currentLang] === e.target.value || g.ml === e.target.value || g.en === e.target.value);
        if (found) {
          const grdVal = found[currentLang] || found.ml;
          renderer.updateState({ grade: grdVal, gradeBadge: found.badge ? "⭐" : "" });
          renderer.render();
        }
      });
    }

    if (photoInput) {
      photoInput.addEventListener("change", (e) => {
        if (e.target.files && e.target.files[0]) photoEditor.loadImageFile(e.target.files[0]);
      });
    }

    if (logoInput) {
      logoInput.addEventListener("change", (e) => {
        if (e.target.files && e.target.files[0]) {
          const r = new FileReader();
          r.onload = (ev) => {
            const im = new Image();
            im.onload = () => {
              renderer.setLogoImage(im);
              renderer.render();
              updateLogoPreview(im.src);
            };
            im.src = ev.target.result;
          };
          r.readAsDataURL(e.target.files[0]);
        }
      });
    }

    if (showLogoToggle) {
      showLogoToggle.addEventListener("change", (e) => {
        renderer.updateState({ showLogo: e.target.checked });
        renderer.render();
      });
    }

    if (logoPositionSelect) {
      logoPositionSelect.addEventListener("change", (e) => {
        renderer.updateState({ logoPosition: e.target.value });
        renderer.render();
      });
    }

    if (logoScaleSlider) {
      logoScaleSlider.addEventListener("input", (e) => {
        renderer.updateState({ logoScale: parseFloat(e.target.value) });
        renderer.render();
      });
    }

    if (resetLogoBtn) {
      resetLogoBtn.addEventListener("click", () => {
        loadDefaultLogo();
        const t = UI_TRANSLATIONS[currentLang];
        showToast(currentLang === "en" ? "Logo reset to Anjarakandy HSS" : "ലോഗോ അഞ്ചരക്കണ്ടി എച്ച്.എസ്.എസ്. ലേക്ക് റീസെറ്റ് ചെയ്തു!");
      });
    }

    function updateLogoPreview(src) {
      if (logoPreviewImg) {
        logoPreviewImg.src = src;
      }
    }

    if (zoomSlider) {
      zoomSlider.addEventListener("input", (e) => {
        photoEditor.setZoom(e.target.value);
        if (zoomValueText) zoomValueText.textContent = `${Math.round(e.target.value * 100)}%`;
      });
    }

    if (rotateBtn) rotateBtn.addEventListener("click", () => photoEditor.rotate90());
    if (resetPhotoBtn) resetPhotoBtn.addEventListener("click", () => photoEditor.reset());
    if (clearPhotoBtn) {
      clearPhotoBtn.addEventListener("click", () => {
        photoEditor.clearPhoto();
        if (photoInput) photoInput.value = "";
      });
    }
    if (samplePhotoBtn) samplePhotoBtn.addEventListener("click", () => photoEditor.loadSamplePhoto());

    if (showStarsToggle) {
      showStarsToggle.addEventListener("change", (e) => {
        renderer.updateState({ showStars: e.target.checked });
        renderer.render();
      });
    }
    if (showBokehToggle) {
      showBokehToggle.addEventListener("change", (e) => {
        renderer.updateState({ showBokeh: e.target.checked });
        renderer.render();
      });
    }
    if (showKathakaliToggle) {
      showKathakaliToggle.addEventListener("change", (e) => {
        renderer.updateState({ showKathakaliMotif: e.target.checked });
        renderer.render();
      });
    }
    if (hideLabelsToggle) {
      hideLabelsToggle.addEventListener("change", (e) => {
        renderer.updateState({ hideLabels: e.target.checked });
        renderer.render();
      });
    }
    if (manglishToggle) {
      manglishToggle.addEventListener("change", (e) => {
        isManglishEnabled = e.target.checked;
        showToast(isManglishEnabled ? "Phonetic Manglish ON" : "Manglish OFF");
      });
    }

    // Aspect Ratios
    document.querySelectorAll("[data-aspect]").forEach(btn => {
      btn.addEventListener("click", () => {
        document.querySelectorAll("[data-aspect]").forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
        renderer.setAspectRatio(btn.dataset.aspect);
        renderer.render();
      });
    });

    // Themes
    document.querySelectorAll("[data-theme]").forEach(pill => {
      pill.addEventListener("click", () => {
        document.querySelectorAll("[data-theme]").forEach(p => p.classList.remove("active"));
        pill.classList.add("active");
        renderer.updateState({ themeId: pill.dataset.theme });
        renderer.render();
      });
    });

    // Actions
    if (downloadPngBtn) downloadPngBtn.addEventListener("click", () => exportImage("image/png", "kalolsavam-poster.png"));
    if (downloadJpgBtn) downloadJpgBtn.addEventListener("click", () => exportImage("image/jpeg", "kalolsavam-poster.jpg"));

    if (copyClipboardBtn) {
      copyClipboardBtn.addEventListener("click", async () => {
        try {
          const blob = await renderer.getExportBlob("image/png");
          await navigator.clipboard.write([new ClipboardItem({ "image/png": blob })]);
          const t = UI_TRANSLATIONS[currentLang];
          showToast(t.toastCopied);
        } catch (err) {
          exportImage("image/png", "kalolsavam-poster.png");
        }
      });
    }

    if (shareWhatsappBtn) {
      shareWhatsappBtn.addEventListener("click", async () => {
        try {
          const blob = await renderer.getExportBlob("image/png");
          const file = new File([blob], "kalolsavam-poster.png", { type: "image/png" });
          if (navigator.canShare && navigator.canShare({ files: [file] })) {
            await navigator.share({
              files: [file],
              title: "Kalolsavam Poster",
              text: `${renderer.state.studentName} - ${renderer.state.subDistrict} Congratulations!`
            });
          } else {
            exportImage("image/png", "kalolsavam-poster.png");
            const caption = encodeURIComponent(`*${renderer.state.subDistrict}*\n*${renderer.state.kalolsavamTitle.replace("\n", " ")}*\n\n🎉 ${renderer.state.greeting}\n*${renderer.state.studentName}*\n${renderer.state.itemName}\n${renderer.state.position}\n${renderer.state.schoolName}`);
            window.open(`https://api.whatsapp.com/send?text=${caption}`, "_blank");
          }
        } catch (err) {}
      });
    }

    if (nextStudentBtn) {
      nextStudentBtn.addEventListener("click", () => {
        studentNameInput.value = "";
        photoEditor.clearPhoto();
        if (photoInput) photoInput.value = "";
        renderer.updateState({ studentName: "" });
        renderer.render();
        studentNameInput.focus();
        const t = UI_TRANSLATIONS[currentLang];
        showToast(t.toastNextReady);
      });
    }

    if (resetAllBtn) {
      resetAllBtn.addEventListener("click", () => {
        if (confirm(currentLang === "en" ? "Reset all poster fields to defaults?" : "എല്ലാ വിവരങ്ങളും റീസെറ്റ് ചെയ്യണോ?")) {
          localStorage.removeItem("kalolsavam_poster_saved");
          localStorage.removeItem("kalolsavam_lang");
          location.reload();
        }
      });
    }

    function updatePhotoControlsUI() {
      const hasPhoto = !!renderer.userImage;
      if (clearPhotoBtn) clearPhotoBtn.disabled = !hasPhoto;
      if (resetPhotoBtn) resetPhotoBtn.disabled = !hasPhoto;
      if (zoomSlider) zoomSlider.disabled = !hasPhoto;
      if (rotateBtn) rotateBtn.disabled = !hasPhoto;
      if (zoomSlider) zoomSlider.value = renderer.photoTransform.zoom;
      if (zoomValueText) zoomValueText.textContent = `${Math.round(renderer.photoTransform.zoom * 100)}%`;
    }

    function exportImage(format, defaultFileName) {
      const link = document.createElement("a");
      const name = (renderer.state.studentName || "kalolsavam_poster").trim().replace(/\s+/g, "_").slice(0, 30);
      link.download = `${name}_${Date.now()}.${format === "image/jpeg" ? "jpg" : "png"}`;
      link.href = renderer.getExportDataURL(format, 0.96);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      const t = UI_TRANSLATIONS[currentLang];
      showToast(t.toastDownloaded);
    }

    function populateDropdowns(lang) {
      const t = UI_TRANSLATIONS[lang];
      if (subDistrictSelect) {
        subDistrictSelect.innerHTML = `<option value="">${t.optChooseSubDistrict}</option>`;
        SUB_DISTRICTS.forEach(sub => {
          const opt = document.createElement("option");
          const n = sub[lang] || sub.ml;
          opt.value = n;
          opt.textContent = n;
          subDistrictSelect.appendChild(opt);
        });
      }

      if (positionSelect) {
        positionSelect.innerHTML = "";
        POSITIONS.forEach(pos => {
          const opt = document.createElement("option");
          const n = pos[lang] || pos.ml;
          opt.value = n;
          opt.textContent = `${pos.badge} ${n}`;
          positionSelect.appendChild(opt);
        });
      }

      if (gradeSelect) {
        gradeSelect.innerHTML = "";
        GRADES.forEach(grd => {
          const opt = document.createElement("option");
          const n = grd[lang] || grd.ml;
          opt.value = n;
          opt.textContent = n || (lang === "en" ? "None" : "ഗ്രേഡ് ഇല്ലാതെ");
          gradeSelect.appendChild(opt);
        });
      }

      const itemContainer = document.getElementById("itemChipsContainer");
      if (itemContainer) {
        itemContainer.innerHTML = "";
        KALOLSAVAM_ITEMS.slice(0, 14).forEach(it => {
          const chip = document.createElement("button");
          chip.type = "button";
          chip.className = "chip-btn";
          const itName = it[lang] || it.ml;
          chip.textContent = itName;
          chip.addEventListener("click", () => {
            itemNameInput.value = itName;
            renderer.updateState({ itemName: itName });
            renderer.render();
          });
          itemContainer.appendChild(chip);
        });
      }

      const itemsDatalist = document.getElementById("itemsDatalist");
      if (itemsDatalist) {
        itemsDatalist.innerHTML = "";
        KALOLSAVAM_ITEMS.forEach(it => {
          const opt = document.createElement("option");
          const itName = it[lang] || it.ml;
          opt.value = itName;
          opt.textContent = `${itName} (${it.category})`;
          itemsDatalist.appendChild(opt);
        });
      }
    }

    function saveCommonSettings() {
      const data = {
        subDistrict: subDistrictInput?.value || "",
        kalolsavamTitle: kalolsavamTitleInput?.value || "",
        venue: venueInput?.value || "",
        dates: datesInput?.value || "",
        schoolName: schoolNameInput?.value || ""
      };
      try {
        localStorage.setItem("kalolsavam_poster_saved", JSON.stringify(data));
      } catch (e) {}
    }

    function loadSavedSettings() {
      try {
        const raw = localStorage.getItem("kalolsavam_poster_saved");
        if (raw) {
          const d = JSON.parse(raw);
          if (d.subDistrict && subDistrictInput) subDistrictInput.value = translateValue(d.subDistrict, currentLang);
          if (d.kalolsavamTitle && kalolsavamTitleInput) kalolsavamTitleInput.value = translateValue(d.kalolsavamTitle, currentLang);
          if (d.venue && venueInput) venueInput.value = translateValue(d.venue, currentLang);
          if (d.dates && datesInput) datesInput.value = translateValue(d.dates, currentLang);
          if (d.schoolName && schoolNameInput) schoolNameInput.value = translateValue(d.schoolName, currentLang);

          renderer.updateState({
            subDistrict: subDistrictInput?.value || "",
            kalolsavamTitle: kalolsavamTitleInput?.value || "",
            venue: venueInput?.value || "",
            dates: datesInput?.value || "",
            schoolName: schoolNameInput?.value || ""
          });
        }
      } catch (e) {}
    }

    function showToast(msg) {
      const toast = document.getElementById("toast");
      if (!toast) return;
      toast.textContent = msg;
      toast.classList.add("show");
      clearTimeout(window.__toastTimer);
      window.__toastTimer = setTimeout(() => {
        toast.classList.remove("show");
      }, 3000);
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initApp);
  } else {
    initApp();
  }
})();
