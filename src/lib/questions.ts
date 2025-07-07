
export type Question = {
  id: number;
  subject: 'Math' | 'Physics' | 'English' | 'Computer';
  question: string;
  options: { [key: string]: string };
  answer: string;
  explanation?: string;
};

// This is your new, expandable question bank.
export const questionBank: Question[] = [
  // English Questions
  {
    "id": 1001,
    "subject": "English",
    "question": "<strong>Choose the closest meaning:</strong><br/>People fishing on a lake must wait <u>calmly</u> so as not to scare the fish away.",
    "options": { "A": "Considerately", "B": "Hungrily", "C": "Alertly", "D": "Quietly" },
    "answer": "D",
    "explanation": "Machliyon ko darane se bachne ke liye, logon ko khamoshi se intezar karna chahiye. 'Calmly' ka sabse qareeb matlab 'quietly' hai."
  },
  {
    "id": 1002,
    "subject": "English",
    "question": "<strong>Choose the closest meaning:</strong><br/>When department stores have an oversupply of goods, they frequently <u>cut prices</u> to encourage sales.",
    "options": { "A": "Conceal", "B": "Review", "C": "Damage", "D": "Reduce" },
    "answer": "D",
    "explanation": "Jab stores mein samaan zyada ho jata hai, to woh sale badhane ke liye qeematein kam karte hain. 'Cut prices' ka matlab 'reduce' karna hai."
  },
  {
    "id": 1003,
    "subject": "English",
    "question": "<strong>Choose the closest meaning:</strong><br/>As a nerve cell is depolarized, it <u>releases</u> nerve impulses.",
    "options": { "A": "Coincides", "B": "Emits", "C": "Pushes", "D": "Shields" },
    "answer": "B",
    "explanation": "Jab ek nerve cell depolarize hota hai, to woh nerve impulses kharij karta hai. 'Releases' ka sabse qareeb matlab 'emits' hai."
  },
  {
    "id": 1004,
    "subject": "English",
    "question": "<strong>Choose the closest meaning:</strong><br/>Evolution has <u>hardly</u> changed the horseshoe crab over millions of years.",
    "options": { "A": "Carefully", "B": "Probably", "C": "Scarcely", "D": "Slowly" },
    "answer": "C",
    "explanation": "Evolution ne horseshoe crab ko lakhoon saalon mein mushkil se tabdeel kiya hai. 'Hardly' ka matlab 'scarcely' hai."
  },
  {
    "id": 1005,
    "subject": "English",
    "question": "<strong>Choose the correct word:</strong><br/>The government was ______ of incompetence.",
    "options": { "A": "Accusing", "B": "Accused", "C": "Accusation", "D": "Accuses" },
    "answer": "B",
    "explanation": "Hukumat par na-ahli ka ilzam lagaya gaya. Yahan passive voice use hoga, isliye 'accused' sahi hai."
  },
  {
    "id": 1006,
    "subject": "English",
    "question": "<strong>Choose the correct word:</strong><br/>The neighbor's children are the ______ of my life.",
    "options": { "A": "Bane", "B": "Banner", "C": "Boon", "D": "Benefit" },
    "answer": "A",
    "explanation": "Parosi ke bachay musibat ka sabab hain. 'Bane' ka matlab hai takleef ya pareshani ki wajah."
  },
  {
    "id": 1007,
    "subject": "English",
    "question": "<strong>Choose the correct word:</strong><br/>The pipes are ______ up.",
    "options": { "A": "Jingling", "B": "Clogging", "C": "Clearing", "D": "Opening" },
    "answer": "B",
    "explanation": "Pipes mein rukawat aa rahi hai. 'Clogging' ka matlab hai kisi cheez ka band ho jana ya rukawat paida karna."
  },
  {
    "id": 1008,
    "subject": "English",
    "question": "<strong>Choose the correct word:</strong><br/>She has always been very ______ to her mother.",
    "options": { "A": "Closely", "B": "Close", "C": "Enclosed", "D": "Closure" },
    "answer": "B",
    "explanation": "Woh hamesha apni maa ke bohot qareeb rahi hai. Yahan 'close' aik adjective ke tor par use hoga."
  },
  {
    "id": 1009,
    "subject": "English",
    "question": "<strong>Choose the correct word:</strong><br/>She states her views very ______.",
    "options": { "A": "Definitely", "B": "Definite", "C": "Definition", "D": "Defined" },
    "answer": "A",
    "explanation": "Woh apne khayalaat bohot wazeh tareeqay se bayan karti hai. 'Definitely' aik adverb hai jo 'states' (verb) ko describe kar raha hai."
  },
  {
    "id": 1010,
    "subject": "English",
    "question": "<strong>Complete the sentence:</strong><br/>Medieval kingdoms did not become constitutional republics over night, on the contrary, the change was ______.",
    "options": { "A": "Unpopular", "B": "Gradual", "C": "Advantageous", "D": "Sufficient" },
    "answer": "B",
    "explanation": "Darmiyani daur ki saltanatein raat-o-raat dastoor-e-jumhooriya nahi ban gain, balkay tabdeeli ahista ahista hui. 'Gradual' ka matlab hai ahista ahista."
  },
  {
    "id": 1011,
    "subject": "English",
    "question": "<strong>Complete the sentence:</strong><br/>A judgment made before all the facts are known must be called ______.",
    "options": { "A": "Harsh", "B": "Deliberate", "C": "Sensible", "D": "Premature" },
    "answer": "D",
    "explanation": "Tamam waqai maloom hone se pehle diya gaya faisla waqt se pehle (premature) kehlayega. 'Premature' ka matlab hai waqt se pehle."
  },
  {
    "id": 1012,
    "subject": "English",
    "question": "<strong>Complete the sentence:</strong><br/>The research is so ______ that it leaves no part of the issue unexamined.",
    "options": { "A": "Comprehensive", "B": "Rewarding", "C": "Sporadic", "D": "Economical" },
    "answer": "A",
    "explanation": "Tehqeeq itni mufeed hai ke woh maslay ka koi hissa bhi baghair jaanch ke nahi chhorti. 'Comprehensive' ka matlab hai mukammal ya tafseeli."
  },
  {
    "id": 1013,
    "subject": "English",
    "question": "<strong>Complete the sentence:</strong><br/>A dictatorship requires its citizens to be docile and finds it expedient to make an example of those who do not ______.",
    "options": { "A": "Rebel", "B": "Disobey", "C": "Conform", "D": "Withdraw" },
    "answer": "C",
    "explanation": "Tanasahi hukumat apne shehriyon ko farmabardar rehne par majboor karti hai aur un logon ko misaal banati hai jo mutabiqat nahi karte. 'Conform' ka matlab hai mutabiqat karna ya pabandi karna."
  },
  {
    "id": 1014,
    "subject": "English",
    "question": "<strong>Complete the sentence:</strong><br/>The supreme court's reversal of its previous ruling on the issue of state rights ______ its reputation for consistency.",
    "options": { "A": "Sustained", "B": "Compromised", "C": "Bolstered", "D": "Aggravated" },
    "answer": "B",
    "explanation": "Supreme court ke apne pichle faisle ko badalne se uski mustaqil mizaji ki shohrat par samjhota hua. 'Compromised' ka matlab hai nuqsan pohchana ya samjhota karna."
  },
  {
    "id": 1015,
    "subject": "English",
    "question": "<strong>Complete the sentence:</strong><br/>Unprecedented turmoil in the usually thriving nations has made the formerly ______ investors leery of any further involvement.",
    "options": { "A": "Pessimistic", "B": "Cautious", "C": "Clandestine", "D": "Sanguine" },
    "answer": "D",
    "explanation": "Aam taur par taraqqi karti hui qaumon mein be-misal halchal ne pehle ke pur umeed sarmaya karon ko mazeed shirkat se hichkichahat mein daal diya hai. 'Sanguine' ka matlab hai pur umeed."
  },
  {
    "id": 1016,
    "subject": "English",
    "question": "<strong>Complete the sentence:</strong><br/>Misrepresentative graphs and drawings distort the real data and encourage readers to accept ______ arguments.",
    "options": { "A": "Legitimate", "B": "Spurious", "C": "Controversial", "D": "Esteemed" },
    "answer": "B",
    "explanation": "Ghalat numaindagi karne walay graphs aur tasveeren asal data ko bigaarti hain aur qareen ko ghalat dalilon ko qubool karne par uksati hain. 'Spurious' ka matlab hai ghalat ya jaali."
  },
  {
    "id": 1017,
    "subject": "English",
    "question": "<strong>Complete the sentence:</strong><br/>Since many teachers today draw on material from a variety of sources, disciplines, and ideologies for their lessons, their approach could best be called ______.",
    "options": { "A": "Eclectic", "B": "Simplistic", "C": "Invidious", "D": "Dogmatic" },
    "answer": "A",
    "explanation": "Chunkay aaj kal bohot se ustaad apne sabqon ke liye mukhtalif mawad, shobajat aur nazriyat se istifada karte hain, isliye unka tareeqa-e-kar 'eclectic' (mukhtalif zakhair se muntakhab shuda) kaha ja sakta hai."
  },
  {
    "id": 1018,
    "subject": "English",
    "question": "<strong>Identify the error:</strong><br/>It estimated is that only about thirty percent of our planet's surface consists of land.",
    "options": { "A": "It estimated is", "B": "that", "C": "consists of", "D": "land" },
    "answer": "A",
    "explanation": "Grammar ke lihaz se 'It estimated is' ghalat hai. Sahi jumla 'It is estimated' hoga."
  },
  {
    "id": 1019,
    "subject": "English",
    "question": "<strong>Identify the error:</strong><br/>In the early years of the Republic, George Washington proposed the establishment of an university in the nation's capital.",
    "options": { "A": "In the early years", "B": "proposed", "C": "an university", "D": "nation's capital" },
    "answer": "C",
    "explanation": "'University' ke shuru mein 'an' ki bajaye 'a' istimal hoga kyunki 'university' ki aawaz consonant se shuru hoti hai (y-sound)."
  },
  {
    "id": 1020,
    "subject": "English",
    "question": "<strong>Identify the error:</strong><br/>General reference maps include basic information, such continents, countries, rivers, cities and other features.",
    "options": { "A": "include", "B": "basic information", "C": "such continents", "D": "features" },
    "answer": "C",
    "explanation": "'Such continents' ghalat hai. Is ki bajaye 'such as continents' hona chahiye."
  },
  {
    "id": 1021,
    "subject": "English",
    "question": "<strong>Identify the error:</strong><br/>The St. Lawrence Seaway, which runs between British Columbia and New York, has completed by the United States and Canada 1959.",
    "options": { "A": "which runs", "B": "has completed", "C": "by the United States and Canada", "D": "in" },
    "answer": "B",
    "explanation": "Sentence passive voice mein hona chahiye, isliye 'has completed' ki bajaye 'was completed' hona chahiye."
  },
  {
    "id": 1022,
    "subject": "English",
    "question": "<strong>Identify the error:</strong><br/>Dolphins are warm blooded; that is, its body temperature always stays about the same regardless of the surroundings.",
    "options": { "A": "its", "B": "always stays", "C": "the same", "D": "surroundings" },
    "answer": "A",
    "explanation": "'Dolphins' plural hai, isliye 'its' ki bajaye 'their' istimal hoga."
  },
  {
    "id": 1023,
    "subject": "English",
    "question": "<strong>Choose the synonym:</strong><br/>He has a <u>distaste</u> for mystery movies.",
    "options": { "A": "Dislike", "B": "Honor of", "C": "Displeasure", "D": "Favorite" },
    "answer": "A",
    "explanation": "'Distaste' ka matlab na-pasandegi hai, isliye 'dislike' sabse qareeb matlab hai."
  },
  {
    "id": 1024,
    "subject": "English",
    "question": "<strong>Choose the synonym:</strong><br/>There is a <u>rational</u> explanation for every event.",
    "options": { "A": "Sensible", "B": "Logical", "C": "Meaningful", "D": "Clear" },
    "answer": "B",
    "explanation": "'Rational' ka matlab aqali ya mantiqi hai, isliye 'logical' sabse qareeb matlab hai."
  },
  {
    "id": 1025,
    "subject": "English",
    "question": "<strong>Choose the synonym:</strong><br/>He is <u>good at</u> making plans.",
    "options": { "A": "Clever", "B": "Expert", "C": "Intelligent", "D": "Bold" },
    "answer": "B",
    "explanation": "Woh mansoobay banane mein mahir hai. 'Good at' ka matlab mahir hona hai, isliye 'expert' sahi hai."
  },
  {
    "id": 1026,
    "subject": "English",
    "question": "<strong>Choose the closest meaning:</strong><br/>Density of weave is an important element in <u>determining</u> the qualities of fabrics.",
    "options": { "A": "Evaluating", "B": "Improving", "C": "Closing", "D": "Discussing" },
    "answer": "A",
    "explanation": "Bunnai ki ghanaai kapron ke khasiyat ka taayun karne mein aik ahem ansar hai. 'Determining' ka matlab hai taayun karna ya jaanchna, isliye 'evaluating' sahi hai."
  },
  {
    "id": 1027,
    "subject": "English",
    "question": "<strong>Complete the sentence:</strong><br/>It is less expensive to build machine parts ______ than to build a few at a time.",
    "options": { "A": "Mass quantities in", "B": "Quantities mass in", "C": "Masses in quantities", "D": "In mass quantities" },
    "answer": "D",
    "explanation": "Machine ke purzay bari miqdar mein banana kam mehnga hai. 'In mass quantities' aik common phrase hai."
  },
  {
    "id": 1028,
    "subject": "English",
    "question": "<strong>Complete the sentence:</strong><br/>We were ______ to go when they came.",
    "options": { "A": "Already", "B": "All ready", "C": "Al ready", "D": "On ready" },
    "answer": "B",
    "explanation": "Hum jane ke liye bilkul tayyar the jab woh aaye. 'All ready' ka matlab hai mukammal taur par tayyar."
  },
  {
    "id": 1029,
    "subject": "English",
    "question": "<strong>Complete the sentence:</strong><br/>The more precise ______ the more effective the communication.",
    "options": { "A": "A writer's words", "B": "There are writer's words", "C": "That a writer's words", "D": "They are a writer's words" },
    "answer": "A",
    "explanation": "Jitne ziyada mohtat likhari ke alfaaz honge, utni hi ziyada muassar communication hogi. 'The more precise a writer's words' grammatically correct structure hai."
  },
  {
    "id": 1030,
    "subject": "English",
    "question": "<strong>Complete the sentence:</strong><br/>Sara did not secure good marks in English, ______ she is doing good at the university.",
    "options": { "A": "Nevertheless", "B": "Although", "C": "Since", "D": "So far" },
    "answer": "A",
    "explanation": "Sara ne English mein acche number hasil nahi kiye, phir bhi woh university mein accha kar rahi hai. 'Nevertheless' contradiction ko show karta hai."
  },
  {
    "id": 1031,
    "subject": "English",
    "question": "<strong>Choose the synonym:</strong><br/>The country has an <u>abundant</u> supply of natural resources.",
    "options": { "A": "Scarce", "B": "Plentiful", "C": "Limited", "D": "Rare" },
    "answer": "B",
    "explanation": "Abundant ka matlab 'wafir' ya 'bohot zyada' hai, isliye 'plentiful' iska sahi synonym hai."
  },
  {
    "id": 1032,
    "subject": "English",
    "question": "<strong>Choose the antonym:</strong><br/>The court declared him <u>innocent</u> of all charges.",
    "options": { "A": "Guilty", "B": "Pure", "C": "Harmless", "D": "Honest" },
    "answer": "A",
    "explanation": "Innocent ka matlab 'be-gunah' hai. Iska ulta 'guilty' ya 'mujrim' hoga."
  },
  {
    "id": 1033,
    "subject": "English",
    "question": "<strong>Complete the sentence:</strong><br/>Despite the bad weather, they ______ to have the picnic.",
    "options": { "A": "decides", "B": "were deciding", "C": "decided", "D": "will decide" },
    "answer": "C",
    "explanation": "Kharab mausam ke bawajood, unhon ne picnic manane ka faisla kiya. Jumla past tense mein hai, isliye 'decided' sahi hai."
  },
  {
    "id": 1034,
    "subject": "English",
    "question": "<strong>Identify the error:</strong><br/>Each of the students are responsible for their own work.",
    "options": { "A": "Each of", "B": "are", "C": "responsible for", "D": "their own work" },
    "answer": "B",
    "explanation": "'Each' ke sath hamesha singular verb 'is' istimal hota hai, 'are' nahi."
  },
  {
    "id": 1035,
    "subject": "English",
    "question": "<strong>Choose the closest meaning:</strong><br/>His constant complaints began to <u>vex</u> his friends.",
    "options": { "A": "Please", "B": "Help", "C": "Annoy", "D": "Ignore" },
    "answer": "C",
    "explanation": "Vex ka matlab 'pareshan karna' ya 'tang karna' hai, isliye 'annoy' iska sabse qareebi matlab hai."
  },
  {
    "id": 1036,
    "subject": "English",
    "question": "<strong>Choose the correct word:</strong><br/>The ______ of the new policy was felt immediately.",
    "options": { "A": "Affect", "B": "Effect", "C": "Effective", "D": "Affecting" },
    "answer": "B",
    "explanation": "Yahan par 'asar' (noun) ki zaroorat hai, isliye 'effect' sahi lafz hai. 'Affect' ek verb hai."
  },
  {
    "id": 1037,
    "subject": "English",
    "question": "<strong>Choose the synonym:</strong><br/>He was <u>meticulous</u> in his preparations for the big presentation.",
    "options": { "A": "Careless", "B": "Hasty", "C": "Careful", "D": "Sloppy" },
    "answer": "C",
    "explanation": "Meticulous ka matlab 'bohot ehtiyat se kaam karne wala' hai, isliye 'careful' iska sahi synonym hai."
  },
  {
    "id": 1038,
    "subject": "English",
    "question": "<strong>Choose the antonym:</strong><br/>She showed great <u>courage</u> during the crisis.",
    "options": { "A": "Bravery", "B": "Fear", "C": "Cowardice", "D": "Strength" },
    "answer": "C",
    "explanation": "Courage ka matlab 'himmat' ya 'bahaduri' hai. Iska ulta 'cowardice' ya 'buzdili' hoga."
  },
  {
    "id": 1039,
    "subject": "English",
    "question": "<strong>Complete the sentence:</strong><br/>He is known for his ______; he never gives up.",
    "options": { "A": "laziness", "B": "persistence", "C": "indifference", "D": "doubt" },
    "answer": "B",
    "explanation": "Agar woh kabhi haar nahi manta, to woh apni 'saabit qadmi' (persistence) ke liye jana jata hai."
  },
  {
    "id": 1040,
    "subject": "English",
    "question": "<strong>Identify the error:</strong><br/>I have went to the store yesterday.",
    "options": { "A": "I have", "B": "went", "C": "to the store", "D": "yesterday" },
    "answer": "B",
    "explanation": "'Have' ke sath verb ki third form ('gone') aati hai. Sahi jumla hoga 'I went to the store yesterday'."
  },
  {
    "id": 1041,
    "subject": "English",
    "question": "<strong>Choose the closest meaning:</strong><br/>Her explanation was perfectly <u>lucid</u>.",
    "options": { "A": "Confusing", "B": "Long", "C": "Clear", "D": "Vague" },
    "answer": "C",
    "explanation": "Lucid ka matlab 'saaf' ya 'wazeh' hai, isliye 'clear' iska sabse qareebi matlab hai."
  },
  {
    "id": 1042,
    "subject": "English",
    "question": "<strong>Choose the correct word:</strong><br/>Please ______ me your book.",
    "options": { "A": "borrow", "B": "lend", "C": "sent", "D": "give up" },
    "answer": "B",
    "explanation": "Jab aap kisi ko koi cheez dete hain to 'lend' istemal hota hai. Jab aap lete hain to 'borrow' istemal hota hai."
  },
  {
    "id": 1043,
    "subject": "English",
    "question": "<strong>Choose the synonym:</strong><br/>Smartphones have become <u>ubiquitous</u> in modern society.",
    "options": { "A": "Rare", "B": "Scarce", "C": "Widespread", "D": "Localized" },
    "answer": "C",
    "explanation": "Ubiquitous ka matlab 'har jagah mojood' hai, isliye 'widespread' iska sahi synonym hai."
  },
  {
    "id": 1044,
    "subject": "English",
    "question": "<strong>Choose the antonym:</strong><br/>We visited the ruins of an <u>ancient</u> civilization.",
    "options": { "A": "Old", "B": "Modern", "C": "Aged", "D": "Past" },
    "answer": "B",
    "explanation": "Ancient ka matlab 'qadeem' hai. Iska ulta 'modern' ya 'jadeed' hoga."
  },
  {
    "id": 1045,
    "subject": "English",
    "question": "<strong>Complete the sentence:</strong><br/>The solution was so simple that it ______ everyone.",
    "options": { "A": "pleased", "B": "angered", "C": "confused", "D": "baffled" },
    "answer": "D",
    "explanation": "Agar hal bohot aasan tha, to isne sab ko 'hairan' (baffled) kar diya."
  },
  {
    "id": 1046,
    "subject": "English",
    "question": "<strong>Identify the error:</strong><br/>The reason I am late is because the traffic was bad.",
    "options": { "A": "The reason", "B": "is", "C": "because", "D": "was bad" },
    "answer": "C",
    "explanation": "'The reason is' aur 'because' dono ek hi matlab dete hain, isliye 'because' yahan zayed (redundant) hai. Sahi jumla hoga 'The reason I am late is that...'"
  },
  {
    "id": 1047,
    "subject": "English",
    "question": "<strong>Choose the closest meaning:</strong><br/>It was a <u>prudent</u> decision to save money for the future.",
    "options": { "A": "Foolish", "B": "Wise", "C": "Quick", "D": "Difficult" },
    "answer": "B",
    "explanation": "Prudent ka matlab 'aqalmandana' ya 'door-andesh' hai, isliye 'wise' iska sabse qareebi matlab hai."
  },
  {
    "id": 1048,
    "subject": "English",
    "question": "<strong>Choose the correct word:</strong><br/>There are ______ books on the table than on the shelf.",
    "options": { "A": "less", "B": "fewer", "C": "much", "D": "little" },
    "answer": "B",
    "explanation": "'Fewer' qabil-e-shumar (countable) cheezon ke liye istemal hota hai jaise books, jabke 'less' ghair-qabil-e-shumar (uncountable) cheezon ke liye."
  },
  {
    "id": 1049,
    "subject": "English",
    "question": "<strong>Choose the synonym:</strong><br/>He is an <u>eminent</u> scientist in the field of genetics.",
    "options": { "A": "Unknown", "B": "Famous", "C": "Ordinary", "D": "Common" },
    "answer": "B",
    "explanation": "Eminent ka matlab 'numayan' ya 'mashhoor' hai, isliye 'famous' iska sahi synonym hai."
  },
  {
    "id": 1050,
    "subject": "English",
    "question": "<strong>Choose the antonym:</strong><br/>Participation in the survey is completely <u>voluntary</u>.",
    "options": { "A": "Willing", "B": "Optional", "C": "Compulsory", "D": "Free" },
    "answer": "C",
    "explanation": "Voluntary ka matlab 'razakarana' hai. Iska ulta 'compulsory' ya 'lazmi' hoga."
  },
  {
    "id": 1051,
    "subject": "English",
    "question": "<strong>Choose the synonym:</strong><br/>Fashion trends are often <u>ephemeral</u>, lasting only a season.",
    "options": { "A": "Permanent", "B": "Everlasting", "C": "Temporary", "D": "Eternal" },
    "answer": "C",
    "explanation": "Ephemeral ka matlab 'aarzi' ya 'chand roza' hai, isliye 'temporary' iska sahi synonym hai."
  },
  {
    "id": 1052,
    "subject": "English",
    "question": "<strong>Choose the antonym:</strong><br/>He was known for being a <u>generous</u> donor to many charities.",
    "options": { "A": "Kind", "B": "Stingy", "C": "Charitable", "D": "Giving" },
    "answer": "B",
    "explanation": "Generous ka matlab 'sakhi' ya 'fayyaz' hai. Iska ulta 'stingy' ya 'kanjoos' hoga."
  },
  {
    "id": 1053,
    "subject": "English",
    "question": "<strong>Complete the sentence:</strong><br/>If I ______ you, I would study harder for the exam.",
    "options": { "A": "am", "B": "was", "C": "were", "D": "be" },
    "answer": "C",
    "explanation": "Hypothetical (farzi) soorat-e-haal mein, 'if' ke sath 'I' ke baad 'were' istemal hota hai, na ke 'was'."
  },
  {
    "id": 1054,
    "subject": "English",
    "question": "<strong>Identify the error:</strong><br/>Me and my friend are going to the movies.",
    "options": { "A": "Me and my friend", "B": "are going", "C": "to the", "D": "movies" },
    "answer": "A",
    "explanation": "Jab aap subject ke taur par baat kar rahe hon, to 'My friend and I' istemal karna chahiye, na ke 'Me and my friend'."
  },
  {
    "id": 1055,
    "subject": "English",
    "question": "<strong>Choose the closest meaning:</strong><br/>The politician's speech was full of <u>ambiguous</u> statements.",
    "options": { "A": "Clear", "B": "Unclear", "C": "Loud", "D": "Short" },
    "answer": "B",
    "explanation": "Ambiguous ka matlab 'mubham' ya 'ghair wazeh' hai, isliye 'unclear' iska sabse qareebi matlab hai."
  },
  {
    "id": 1056,
    "subject": "English",
    "question": "<strong>Choose the correct word:</strong><br/>The dog wagged ______ tail happily.",
    "options": { "A": "it's", "B": "its", "C": "its'", "D": "ities" },
    "answer": "B",
    "explanation": "'Its' ek possessive pronoun hai jo milkiyat zahir karta hai. 'It's' ka matlab 'it is' hota hai."
  },
  {
    "id": 1057,
    "subject": "English",
    "question": "<strong>Choose the synonym:</strong><br/>She faced her illness with great <u>fortitude</u>.",
    "options": { "A": "Weakness", "B": "Fear", "C": "Courage", "D": "Anxiety" },
    "answer": "C",
    "explanation": "Fortitude ka matlab mushkil waqt mein 'himmat' aur 'sabit qadmi' hai, isliye 'courage' iska sahi synonym hai."
  },
  {
    "id": 1058,
    "subject": "English",
    "question": "<strong>Choose the antonym:</strong><br/>Even a <u>novice</u> can learn the basics of the game quickly.",
    "options": { "A": "Beginner", "B": "Trainee", "C": "Expert", "D": "Learner" },
    "answer": "C",
    "explanation": "Novice ka matlab 'na-tajurbakar' ya 'naya seekhne wala' hai. Iska ulta 'expert' ya 'mahir' hoga."
  },
  {
    "id": 1059,
    "subject": "English",
    "question": "<strong>Complete the sentence:</strong><br/>The professor asked the students to ______ their essays by Friday.",
    "options": { "A": "turn on", "B": "turn in", "C": "turn off", "D": "turn around" },
    "answer": "B",
    "explanation": "'Turn in' ka matlab 'jama karana' ya 'submit karna' hai, jo yahan par munasib hai."
  },
  {
    "id": 1060,
    "subject": "English",
    "question": "<strong>Identify the error:</strong><br/>She is one of the girls who is always on time.",
    "options": { "A": "one of the girls", "B": "who", "C": "is", "D": "on time" },
    "answer": "C",
    "explanation": "Yahan 'who' ka talluq 'girls' (plural) se hai, isliye verb bhi plural ('are') hona chahiye, na ke 'is'."
  },

  // Computer Questions
  {
    "id": 2001,
    "subject": "Computer",
    "question": "Which of the following is best for Database",
    "options": { "A": "Is a collection papers", "B": "Used to arrange and sort data according to the requirement of user", "C": "Used to do talking", "D": "All of these" },
    "answer": "B",
    "explanation": "Database ka maqsad data ko user ki zarurat ke mutabiq arrange aur sort karna hai."
  },
  {
    "id": 2002,
    "subject": "Computer",
    "question": "Which of the following are storage devices:",
    "options": { "A": "RAM", "B": "USB", "C": "M.2 SSD", "D": "Both b and c" },
    "answer": "D",
    "explanation": "USB (Universal Serial Bus) aur M.2 SSD (Solid State Drive) dono storage devices hain."
  },
  {
    "id": 2003,
    "subject": "Computer",
    "question": "DBMS stands for",
    "options": { "A": "Database Management System", "B": "Data Building Management System", "C": "Database Manipulation System", "D": "Data Business Management System" },
    "answer": "A",
    "explanation": "DBMS ka matlab Database Management System hai."
  },
  {
    "id": 2004,
    "subject": "Computer",
    "question": "Which of the following are escape sequences",
    "options": { "A": "\\n", "B": "\\t", "C": "\\r", "D": "All of above" },
    "answer": "D",
    "explanation": "\\n (newline), \\t (tab), aur \\r (carriage return) sab common escape sequences hain."
  },
  {
    "id": 2005,
    "subject": "Computer",
    "question": "Which of the following is/are language translator:",
    "options": { "A": "Compiler", "B": "Interpreter", "C": "Assembler", "D": "All of above" },
    "answer": "D",
    "explanation": "Compiler, Interpreter, aur Assembler teeno language translators hain jo code ko machine readable format mein convert karte hain."
  },
  {
    "id": 2006,
    "subject": "Computer",
    "question": "In hexadecimal digit 9 is equivalent to",
    "options": { "A": "H9", "B": "G9", "C": "F9", "D": "E9" },
    "answer": "A",
    "explanation": "Hexadecimal mein '9' decimal '9' ke barabar hai. Is option mein syntax galat hai, magar 'H9' mein '9' ko highlight kiya gaya hai. Sawaal ghalat frame kiya gaya hai ya options mein error hai. Hexadecimal digits 0-9 aur A-F hotay hain."
  },
  {
    "id": 2007,
    "subject": "Computer",
    "question": "Memory unit is one part of",
    "options": { "A": "Input device", "B": "Control unit", "C": "Output device", "D": "Central Processing Unit" },
    "answer": "D",
    "explanation": "Memory unit Central Processing Unit (CPU) ka hissa hota hai."
  },
  {
    "id": 2008,
    "subject": "Computer",
    "question": "Bits can be represent in",
    "options": { "A": "0 or 1", "B": "1 or 2", "C": "0 or 2", "D": "All of above" },
    "answer": "A",
    "explanation": "Bits ko binary system mein 0 ya 1 se represent kiya jata hai."
  },
  {
    "id": 2009,
    "subject": "Computer",
    "question": "Control unit is a part of:",
    "options": { "A": "CPU", "B": "RAM", "C": "GPU", "D": "HDD" },
    "answer": "A",
    "explanation": "Control Unit Central Processing Unit (CPU) ka aik aham hissa hai."
  },
  {
    "id": 2010,
    "subject": "Computer",
    "question": "What does \"bit rate\" refer to?",
    "options": { "A": "The speed of a computer processor", "B": "The number of bits processed per unit of time", "C": "The capacity of a storage device", "D": "The resolution of a digital image" },
    "answer": "B",
    "explanation": "Bit rate ka matlab fi unit waqt mein process kiye jane wale bits ki tadaad hai."
  },
  {
    "id": 2011,
    "subject": "Computer",
    "question": "In MS Access which tool is used for data presentation",
    "options": { "A": "Report", "B": "Forms", "C": "Queries", "D": "Tables" },
    "answer": "A",
    "explanation": "MS Access mein data ko present karne ke liye Reports ka istemal hota hai."
  },
  {
    "id": 2012,
    "subject": "Computer",
    "question": "Following is based on Read-only:",
    "options": { "A": "Hard disk", "B": "CD-ROM", "C": "Pen drive", "D": "External SSD" },
    "answer": "B",
    "explanation": "CD-ROM (Compact Disc Read-Only Memory) read-only hota hai."
  },
  {
    "id": 2013,
    "subject": "Computer",
    "question": "Data type used to store name :",
    "options": { "A": "Float", "B": "Long", "C": "Char", "D": "int" },
    "answer": "C",
    "explanation": "Names (text) store karne ke liye 'char' data type ka istemal hota hai jo characters ko represent karta hai. Strings chars ki collection hotay hain."
  },
  {
    "id": 2014,
    "subject": "Computer",
    "question": "A group of eight bits is called:",
    "options": { "A": "Byte", "B": "Nibble", "C": "Word", "D": "Kilobyte" },
    "answer": "A",
    "explanation": "Eight bits ke group ko Byte kehte hain."
  },
  {
    "id": 2015,
    "subject": "Computer",
    "question": "The software commonly used for editing and creating documents is:",
    "options": { "A": "Microsoft Word", "B": "Adobe Photoshop", "C": "Microsoft Excel", "D": "Adobe Premiere Pro" },
    "answer": "A",
    "explanation": "Documents ko edit aur create karne ke liye aam tor par Microsoft Word istemal hota hai."
  },
  {
    "id": 2016,
    "subject": "Computer",
    "question": "The full form of PC is:",
    "options": { "A": "Personal Computer", "B": "Processing Core", "C": "Program Control", "D": "Peripheral Component" },
    "answer": "A",
    "explanation": "PC ka matlab Personal Computer hai."
  },
  {
    "id": 2017,
    "subject": "Computer",
    "question": "What type of computers uses the 8 bit code called EBCDIC?",
    "options": { "A": "Minicomputer", "B": "Microcomputer", "C": "Supercomputer", "D": "Mainframe computer" },
    "answer": "D",
    "explanation": "EBCDIC code aam tor par Mainframe computers mein istemal hota hai."
  },
  {
    "id": 2018,
    "subject": "Computer",
    "question": "Which statement is used to exit from a switch statement in C/C++?",
    "options": { "A": "end", "B": "break", "C": "exit", "D": "stop" },
    "answer": "B",
    "explanation": "C/C++ mein switch statement se bahar nikalne ke liye 'break' statement istemal hoti hai."
  },
  {
    "id": 2019,
    "subject": "Computer",
    "question": "Barcode is a",
    "options": { "A": "Input device", "B": "Scanning device", "C": "Output device", "D": "None of them" },
    "answer": "B",
    "explanation": "Barcode ek scanning device hai jo barcodes ko read karta hai."
  },
  {
    "id": 2020,
    "subject": "Computer",
    "question": "What does \"resolution\" refer to in digital imaging?",
    "options": { "A": "The size of the image in inches", "B": "The number of pixels in the image", "C": "The number of colors in the image", "D": "The total file size of the image" },
    "answer": "B",
    "explanation": "Digital imaging mein resolution ka matlab image mein pixels ki tadaad hai."
  },
  {
    "id": 2021,
    "subject": "Computer",
    "question": "What is the pictorial representation of a program called?",
    "options": { "A": "Algorithm", "B": "Flowchart", "C": "Picture", "D": "All of above" },
    "answer": "B",
    "explanation": "Program ki pictorial representation ko flowchart kehte hain."
  },
  {
    "id": 2022,
    "subject": "Computer",
    "question": "BIOS stands for",
    "options": { "A": "Basic Input Output System", "B": "Binary Input Output System", "C": "Basic Input Output Security", "D": "Binary Input Output Security" },
    "answer": "A",
    "explanation": "BIOS ka matlab Basic Input Output System hai."
  },
  {
    "id": 2023,
    "subject": "Computer",
    "question": "Which of the following type of topology has multi connection",
    "options": { "A": "Star topology", "B": "Ring Topology", "C": "Mesh Topology", "D": "Bus Topology" },
    "answer": "C",
    "explanation": "Mesh topology mein har device dusre har device se multi connections ke zariye juri hoti hai."
  },
  {
    "id": 2024,
    "subject": "Computer",
    "question": "Which logical operation returns true if and only if the two inputs are identical?",
    "options": { "A": "XOR", "B": "AND", "C": "OR", "D": "XNOR" },
    "answer": "D",
    "explanation": "XNOR operation tab true return karta hai jab dono inputs identical hon (yaani dono true hon ya dono false hon)."
  },
  {
    "id": 2025,
    "subject": "Computer",
    "question": "Which logical operation returns true if and only if the two inputs are different?",
    "options": { "A": "XOR", "B": "AND", "C": "OR", "D": "NOT" },
    "answer": "A",
    "explanation": "XOR operation tab true return karta hai jab dono inputs different hon (yaani aik true aur aik false ho)."
  },
  {
    "id": 2026,
    "subject": "Computer",
    "question": "A function which calls itself is a:",
    "options": { "A": "Recursive function", "B": "Iterative function", "C": "Nested function", "D": "Callback function" },
    "answer": "A",
    "explanation": "Jo function khud ko call karta hai usse Recursive function kehte hain."
  },
  {
    "id": 2027,
    "subject": "Computer",
    "question": "Which memory is considered as volatile memory?",
    "options": { "A": "RAM", "B": "ROM", "C": "PROM", "D": "All of above" },
    "answer": "A",
    "explanation": "RAM (Random Access Memory) volatile memory hai, yani power off hone par data erase ho jata hai."
  },
  {
    "id": 2028,
    "subject": "Computer",
    "question": "Second generation of computer were made up of",
    "options": { "A": "Transistor", "B": "Al", "C": "Microprocessor", "D": "IC" },
    "answer": "A",
    "explanation": "Second generation ke computers Transistors se banaye gaye the."
  },
  {
    "id": 2029,
    "subject": "Computer",
    "question": "In MS Excel, a formula starts with",
    "options": { "A": "+", "B": "=", "C": ">", "D": "<" },
    "answer": "B",
    "explanation": "MS Excel mein har formula '=' sign se shuru hota hai."
  },
  {
    "id": 2030,
    "subject": "Computer",
    "question": "Which type of data transmission allows two direction communication but not simultaneously?",
    "options": { "A": "Half duplex", "B": "Full duplex", "C": "Simplex", "D": "All of above" },
    "answer": "A",
    "explanation": "Half-duplex communication mein dono taraf data transmit ho sakta hai, lekin aik waqt mein sirf aik taraf."
  },
  {
    "id": 2031,
    "subject": "Computer",
    "question": "What is cache memory?",
    "options": { "A": "A type of permanent storage", "B": "A smaller, faster memory closer to the CPU", "C": "A type of optical disk", "D": "Software to clean junk files" },
    "answer": "B",
    "explanation": "Cache memory ek choti aur tez memory hoti hai jo CPU ke qareeb hoti hai taake data tak rasai tez ho."
  },
  {
    "id": 2032,
    "subject": "Computer",
    "question": "What is the full form of LAN?",
    "options": { "A": "Large Area Network", "B": "Local Area Network", "C": "Length Area Network", "D": "Logical Area Network" },
    "answer": "B",
    "explanation": "LAN ka matlab Local Area Network hai, jo ek mehdood ilaqay (jaise office ya ghar) mein computers ko jorta hai."
  },
  {
    "id": 2033,
    "subject": "Computer",
    "question": "Which of the following is an example of an Operating System?",
    "options": { "A": "Microsoft Word", "B": "Google Chrome", "C": "Windows 10", "D": "Adobe Photoshop" },
    "answer": "C",
    "explanation": "Windows 10 ek operating system hai jo computer ke hardware aur software ko manage karta hai."
  },
  {
    "id": 2034,
    "subject": "Computer",
    "question": "What does a compiler do?",
    "options": { "A": "Runs the program line by line", "B": "Translates the entire source code into machine code at once", "C": "Checks for viruses", "D": "Connects to the internet" },
    "answer": "B",
    "explanation": "Compiler poore source code ko ek sath machine code mein translate karta hai taake computer usay samajh sake."
  },
  {
    "id": 2035,
    "subject": "Computer",
    "question": "Which of the following is NOT an input device?",
    "options": { "A": "Keyboard", "B": "Mouse", "C": "Scanner", "D": "Monitor" },
    "answer": "D",
    "explanation": "Monitor ek output device hai jo information display karta hai, jabke keyboard, mouse aur scanner input devices hain."
  },
  {
    "id": 2036,
    "subject": "Computer",
    "question": "What was the main component of first-generation computers?",
    "options": { "A": "Transistors", "B": "Integrated Circuits", "C": "Vacuum Tubes", "D": "Microprocessors" },
    "answer": "C",
    "explanation": "Pehli generation ke computers mein vacuum tubes ka istemal hota tha jo bohot bare aur garam hote the."
  },
  {
    "id": 2037,
    "subject": "Computer",
    "question": "In C++, what is `cout` used for?",
    "options": { "A": "Input from the keyboard", "B": "Output to the screen", "C": "Declaring a variable", "D": "Creating a function" },
    "answer": "B",
    "explanation": "`cout` C++ mein ek standard object hai jo screen par output display karne ke liye istemal hota hai."
  },
  {
    "id": 2038,
    "subject": "Computer",
    "question": "Which data structure uses the LIFO (Last-In, First-Out) principle?",
    "options": { "A": "Queue", "B": "Stack", "C": "Linked List", "D": "Tree" },
    "answer": "B",
    "explanation": "Stack LIFO ke usool par kaam karta hai, jahan jo cheez aakhir mein daali jaati hai woh pehle nikalti hai."
  },
  {
    "id": 2039,
    "subject": "Computer",
    "question": "What is malware?",
    "options": { "A": "A type of computer hardware", "B": "A physical component of a network", "C": "Software designed to cause harm", "D": "A computer cleaning tool" },
    "answer": "C",
    "explanation": "Malware (malicious software) ek aisa software hai jo computer system ko nuqsan pohanchane ke liye banaya jata hai."
  },
  {
    "id": 2040,
    "subject": "Computer",
    "question": "What does HTML stand for?",
    "options": { "A": "HyperText Markup Language", "B": "High-Level Text Machine Language", "C": "Hyper-Transfer Machine Language", "D": "Hyperlink and Text Markup Language" },
    "answer": "A",
    "explanation": "HTML ka matlab HyperText Markup Language hai, jo web pages banane ke liye istemal hoti hai."
  },
  {
    "id": 2041,
    "subject": "Computer",
    "question": "The 'brain' of any computer system is the:",
    "options": { "A": "RAM", "B": "Hard Disk", "C": "CPU", "D": "Monitor" },
    "answer": "C",
    "explanation": "CPU (Central Processing Unit) ko computer ka 'dimagh' kaha jata hai kyunki yeh tamam processing karta hai."
  },
  {
    "id": 2042,
    "subject": "Computer",
    "question": "What is an IP address?",
    "options": { "A": "An address for an email account", "B": "A unique numerical label for a device on a network", "C": "A type of computer port", "D": "The name of a website" },
    "answer": "B",
    "explanation": "IP address ek unique numerical label hai jo network par har device ko pehchanne ke liye istemal hota hai."
  },
  {
    "id": 2043,
    "subject": "Computer",
    "question": "Which of these is a programming language?",
    "options": { "A": "HTML", "B": "CSS", "C": "Python", "D": "JPEG" },
    "answer": "C",
    "explanation": "Python ek high-level programming language hai, jabke HTML aur CSS markup/styling languages hain."
  },
  {
    "id": 2044,
    "subject": "Computer",
    "question": "What does RAM stand for?",
    "options": { "A": "Read-Only Memory", "B": "Random Access Memory", "C": "Rapid Application Module", "D": "Remote Access Machine" },
    "answer": "B",
    "explanation": "RAM ka matlab Random Access Memory hai. Yeh ek volatile memory hai jo computer ke active programs aur data ko store karti hai."
  },
  {
    "id": 2045,
    "subject": "Computer",
    "question": "A collection of related web pages is called a:",
    "options": { "A": "Web server", "B": "Search engine", "C": "Website", "D": "Browser" },
    "answer": "C",
    "explanation": "Mutaliqa web pages ke majmooay ko website kehte hain."
  },
  {
    "id": 2046,
    "subject": "Computer",
    "question": "Which key is used to create a new line in most text editors?",
    "options": { "A": "Spacebar", "B": "Tab", "C": "Enter", "D": "Backspace" },
    "answer": "C",
    "explanation": "Z्यादातर text editors mein nayi line shuru karne ke liye Enter key ka istemal kiya jata hai."
  },
  {
    "id": 2047,
    "subject": "Computer",
    "question": "What does `//` signify in C++?",
    "options": { "A": "Start of a multi-line comment", "B": "Division operator", "C": "End of a block", "D": "Start of a single-line comment" },
    "answer": "D",
    "explanation": "C++ mein, `//` se shuru hone wali line ek single-line comment kehlati hai, jise compiler nazar-andaz kar deta hai."
  },
  {
    "id": 2048,
    "subject": "Computer",
    "question": "Which is a valid file extension for an image file?",
    "options": { "A": ".txt", "B": ".mp3", "C": ".exe", "D": ".jpg" },
    "answer": "D",
    "explanation": ".jpg ek aam file extension hai jo image files ke liye istemal hoti hai."
  },
  {
    "id": 2049,
    "subject": "Computer",
    "question": "What is the primary purpose of an SSD?",
    "options": { "A": "Processing instructions", "B": "Displaying images", "C": "Long-term data storage", "D": "Connecting to networks" },
    "answer": "C",
    "explanation": "SSD (Solid-State Drive) ka bunyadi maqsad data ko taweel arsay tak store karna hai, aur yeh hard drives se tez hota hai."
  },
  {
    "id": 2050,
    "subject": "Computer",
    "question": "What is Wi-Fi?",
    "options": { "A": "A type of computer virus", "B": "A wired internet connection", "C": "A wireless networking technology", "D": "A brand of computer" },
    "answer": "C",
    "explanation": "Wi-Fi ek wireless networking technology hai jo devices ko internet se baghair taar ke jorne ki ijazat deti hai."
  },

  // Physics Questions
  {
    "id": 3001,
    "subject": "Physics",
    "question": "If focal length is increased two times, what happens to the power of the lens?",
    "options": { "A": "Power becomes 4 times", "B": "Power becomes half", "C": "Power becomes double", "D": "Power remains unchanged" },
    "answer": "B",
    "explanation": "Power of a lens is inversely proportional to its focal length. Agar focal length do guna barh jaye, to power aadhi ho jati hai."
  },
  {
    "id": 3002,
    "subject": "Physics",
    "question": "Which of the following equations represents Power?",
    "options": { "A": "FV", "B": "F/V", "C": "F+V", "D": "F-A" },
    "answer": "A",
    "explanation": "Power ko force aur velocity ke dot product se represent kiya jata hai, P = F * v."
  },
  {
    "id": 3003,
    "subject": "Physics",
    "question": "Angular momentum is defined as:",
    "options": { "A": "r + p", "B": "p x r", "C": "r . p", "D": "r x p" },
    "answer": "D",
    "explanation": "Angular momentum ko position vector aur linear momentum ke cross product ke taur par define kiya jata hai, L = r x p."
  },
  {
    "id": 3004,
    "subject": "Physics",
    "question": "If electric field E . A = 0 then:",
    "options": { "A": "There is no electric field", "B": "Flux is zero", "C": "All of these", "D": "None of these" },
    "answer": "B",
    "explanation": "Electric flux ka formula is E . A. Agar dot product zero hai, to iska matlab hai ke flux zero hai."
  },
  {
    "id": 3005,
    "subject": "Physics",
    "question": "Black body radiations are:",
    "options": { "A": "Classical", "B": "Magnetic", "C": "Quantum", "D": "Static" },
    "answer": "C",
    "explanation": "Black body radiations ko Planck's Quantum Theory se explain kiya jata hai, isliye yeh Quantum hoti hain."
  },
  {
    "id": 3006,
    "subject": "Physics",
    "question": "If a body is sliding, the type of friction applied is:",
    "options": { "A": "Static friction", "B": "Rolling friction", "C": "Sliding friction", "D": "Air resistance" },
    "answer": "C",
    "explanation": "Jab koi body slide kar rahi hoti hai, to us par sliding friction lagti hai."
  },
  {
    "id": 3007,
    "subject": "Physics",
    "question": "Two vectors are perpendicular: A= i + 2j and B=xi+j. What is the value of x?",
    "options": { "A": "-2", "B": "-1", "C": "0", "D": "1" },
    "answer": "A",
    "explanation": "Agar do vectors perpendicular hon, to unka dot product zero hota hai. (i + 2j) . (xi + j) = x + 2 = 0, isliye x = -2."
  },
  {
    "id": 3008,
    "subject": "Physics",
    "question": "What is the SI unit of intensity of light?",
    "options": { "A": "Watt", "B": "Lumen", "C": "Lux", "D": "Candela" },
    "answer": "D",
    "explanation": "Luminous intensity ka SI unit Candela hai. Illuminance ka unit Lux hai. Sawal wazeh nahi hai, magar aam tor par intensity se luminous intensity murad li jati hai."
  },
  {
    "id": 3009,
    "subject": "Physics",
    "question": "Why is absolute viscosity difficult to measure?",
    "options": { "A": "It depends on density", "B": "It depends on temperature", "C": "It depends on pressure", "D": "It depends on surface tension" },
    "answer": "B",
    "explanation": "Absolute viscosity temperature par depend karti hai, jiski wajah se isko accurately measure karna mushkil hota hai."
  },
  {
    "id": 3010,
    "subject": "Physics",
    "question": "What is the equation for kinetic energy of a photoelectron in the photoelectric effect?",
    "options": { "A": "KE = hv - Φ", "B": "K.E=hv+Φ", "C": "K.E=hvΦ", "D": "K.E=hv/Φ" },
    "answer": "A",
    "explanation": "Photoelectric effect mein photoelectron ki kinetic energy (KE) incident photon ki energy (hv) aur work function (Φ) ke farq ke barabar hoti hai, KE = hv - Φ."
  },
  {
    "id": 3011,
    "subject": "Physics",
    "question": "The range of a projectile becomes equal to four time its maximum height at an angle of?",
    "options": { "A": "0 degree", "B": "30 degree", "C": "60 degree", "D": "45 degree" },
    "answer": "D",
    "explanation": "Jab projectile ka range uski maximum height ke char guna hota hai, to angle 45 degrees hota hai."
  },
  {
    "id": 3012,
    "subject": "Physics",
    "question": "The range of a projectile is maximum when the angle of projection is:",
    "options": { "A": "30°", "B": "60°", "C": "90°", "D": "45°" },
    "answer": "D",
    "explanation": "Projectile ka range us waqt maximum hota hai jab angle of projection 45 degrees hota hai."
  },
  {
    "id": 3013,
    "subject": "Physics",
    "question": "Two capacitors of 3 µF and 6 µF are connected in series. What is their equivalent capacitance?",
    "options": { "A": "1 µF", "B": "4.5 µF", "C": "2 µF", "D": "9 µF" },
    "answer": "C",
    "explanation": "Series mein capacitors ke liye equivalent capacitance ka formula hai 1/Ceq = 1/C1 + 1/C2. Is case mein, 1/Ceq = 1/3 + 1/6 = 3/6 = 1/2, so Ceq = 2 µF."
  },
  {
    "id": 3014,
    "subject": "Physics",
    "question": "When is the magnetic force on a moving charge zero?",
    "options": { "A": "When angle between v and B is 45°", "B": "When angle between v and B is 60°", "C": "When angle between v and B is 90°", "D": "When angle between v and B is 0°" },
    "answer": "D",
    "explanation": "Magnetic force F = qvBsinθ hoti hai. Force zero hogi jab sinθ = 0, yani θ = 0° (velocity aur magnetic field parallel hon)."
  },
  {
    "id": 3015,
    "subject": "Physics",
    "question": "In a satellite, artificial gravity can be simulated by:",
    "options": { "A": "Heating the interior", "B": "Spinning it around its axis", "C": "Using powerful magnets", "D": "Increasing its orbital speed" },
    "answer": "B",
    "explanation": "Artificial gravity ko satellite ko uski axis ke ird gird ghuma kar simulate kiya ja sakta hai."
  },
  {
    "id": 3016,
    "subject": "Physics",
    "question": "Faraday's law is related to:",
    "options": { "A": "Conservation of energy", "B": "Theory of relativity", "C": "Photoelectric effect", "D": "Nuclear fission" },
    "answer": "A",
    "explanation": "Faraday's law of electromagnetic induction energy ke conservation se related hai."
  },
  {
    "id": 3017,
    "subject": "Physics",
    "question": "Resistivity of a material depends upon:",
    "options": { "A": "Its length", "B": "Its cross-sectional area", "C": "The nature of the material", "D": "The applied voltage" },
    "answer": "C",
    "explanation": "Resistivity material ki fitrat aur temperature par depend karti hai, na ke uski length ya cross-sectional area par."
  },
  {
    "id": 3018,
    "subject": "Physics",
    "question": "If three capacitors are connected in parallel to a voltage source, the voltage across each capacitor will be:",
    "options": { "A": "Divided equally", "B": "The same as the source voltage", "C": "Inversely proportional to capacitance", "D": "Zero" },
    "answer": "B",
    "explanation": "Parallel connection mein capacitors ke across voltage same rehta hai aur source voltage ke barabar hota hai."
  },
  {
    "id": 3019,
    "subject": "Physics",
    "question": "The magnification of a telescope is determined by the ratio of:",
    "options": { "A": "Objective focal length to eyepiece focal length", "B": "Eyepiece focal length to objective focal length", "C": "Light intensity to aperture size", "D": "Image distance to object distance" },
    "answer": "A",
    "explanation": "Telescope ki magnification objective lens ki focal length aur eyepiece ki focal length ke ratio se nikali jati hai, M = fo/fe."
  },
  {
    "id": 3020,
    "subject": "Physics",
    "question": "A long solenoid with radius a, turns per unit length n, and current I produces a magnetic field on its axis directly proportional to:",
    "options": { "A": "ani", "B": "ni", "C": "n<sup>2</sup>i", "D": "i" },
    "answer": "B",
    "explanation": "Solenoid ke andar magnetic field B = μ0nI hoti hai, isliye yeh turns per unit length (n) aur current (I) ke directly proportional hoti hai."
  },
  {
    "id": 3021,
    "subject": "Physics",
    "question": "The energy gained by an electron accelerated through a potential difference of 1V is:",
    "options": { "A": "1 Joule", "B": "1 eV", "C": "1 Coulomb", "D": "1 Ampere" },
    "answer": "B",
    "explanation": "Ek electron ko 1 Volt ke potential difference se accelerate karne par woh 1 electron volt (eV) energy hasil karta hai."
  },
  {
    "id": 3022,
    "subject": "Physics",
    "question": "A string vibrates under tension T. What should be the new length of the string to make it vibrate in two segments if the original vibrating segment was 10 cm?",
    "options": { "A": "5 cm", "B": "10 cm", "C": "20 cm", "D": "40 cm" },
    "answer": "C",
    "explanation": "Agar string do segments mein vibrate kar rahi hai, to iska matlab hai ke wavelength aadhi ho gayi hai. Fundamental frequency barqarar rakhne ke liye length ko double karna hoga (20 cm)."
  },
  {
    "id": 3023,
    "subject": "Physics",
    "question": "The second law of thermodynamics implies that:",
    "options": { "A": "Energy cannot be created or destroyed", "B": "No heat engine can have 100% efficiency", "C": "Entropy of a perfect crystal at absolute zero is zero", "D": "Heat flows from cold to hot objects" },
    "answer": "B",
    "explanation": "Second law of thermodynamics ka ek bunyadi natija yeh hai ke koi bhi heat engine 100% efficient nahi ho sakta."
  },
  {
    "id": 3024,
    "subject": "Physics",
    "question": "The dimensions of resistivity are:",
    "options": { "A": "[M L<sup>3</sup> T<sup>-3</sup> A<sup>-2</sup>]", "B": "[MLTA]", "C": "[M L T<sup>-3</sup> A<sup>-1</sup>]", "D": "[M L<sup>2</sup> T<sup>-2</sup> A<sup>-1</sup>]" },
    "answer": "A",
    "explanation": "Resistivity ki dimensions [M L<sup>3</sup> T<sup>-3</sup> A<sup>-2</sup>] hoti hain."
  },
  {
    "id": 3025,
    "subject": "Physics",
    "question": "The time period of a simple pendulum depends on:",
    "options": { "A": "Mass of the bob", "B": "Length of the string", "C": "Amplitude of oscillation", "D": "Material of the string" },
    "answer": "B",
    "explanation": "Simple pendulum ka time period uski string ki length par depend karta hai, T = 2π√(L/g)."
  },
  {
    "id": 3026,
    "subject": "Physics",
    "question": "If a force of 36 N acts on an object and its radius of motion is tripled, the new force required to maintain the same acceleration is:",
    "options": { "A": "4 N", "B": "12 N", "C": "108 N", "D": "324 N" },
    "answer": "B",
    "explanation": "Centripetal force Fc = mv^2/r hoti hai. Agar radius teen guna barh jaye, to force teen guna kam ho jayegi. Isliye, 36 N / 3 = 12 N."
  },
  {
    "id": 3027,
    "subject": "Physics",
    "question": "If a body moves in a circular path with constant speed, then:",
    "options": { "A": "Its acceleration is zero", "B": "Its velocity is constant", "C": "It has centripetal acceleration", "D": "Its kinetic energy is zero" },
    "answer": "C",
    "explanation": "Constant speed par circular motion mein body ki velocity ki direction musalsal change hoti hai, jiski wajah se us mein centripetal acceleration paida hota hai."
  },
  {
    "id": 3028,
    "subject": "Physics",
    "question": "If four resistors are connected in parallel, their equivalent resistance is:",
    "options": { "A": "Less than the smallest resistor", "B": "Greater than the largest resistor", "C": "Equal to the average resistance", "D": "Zero" },
    "answer": "A",
    "explanation": "Parallel connection mein equivalent resistance hamesha sab se chote resistor ki value se bhi kam hoti hai."
  },
  {
    "id": 3029,
    "subject": "Physics",
    "question": "Four resistors are connected in series with resistances 2Ω, 4Ω, 6Ω, and 8Ω. If the current through the first resistor (2Ω) is 1A, what is the total voltage across the circuit?",
    "options": { "A": "2V", "B": "10V", "C": "20V", "D": "24V" },
    "answer": "C",
    "explanation": "Series connection mein current sab resistors mein same rehta hai. Total resistance R_total = 2 + 4 + 6 + 8 = 20Ω. Total voltage V = IR_total = 1A × 20Ω = 20V."
  },
  {
    "id": 3030,
    "subject": "Physics",
    "question": "Which of the following is the largest unit of power?",
    "options": { "A": "5 Joules", "B": "0.5 Watt", "C": "1 Kilowatt", "D": "All are equal" },
    "answer": "C",
    "explanation": "1 Kilowatt (1000 Watts) baqi options se sab se bari power unit hai."
  },
  {
    "id": 3031,
    "subject": "Physics",
    "question": "What is the SI unit of electric charge?",
    "options": { "A": "Ampere", "B": "Volt", "C": "Coulomb", "D": "Ohm" },
    "answer": "C",
    "explanation": "Electric charge ka SI unit Coulomb hai."
  },
  {
    "id": 3032,
    "subject": "Physics",
    "question": "Ohm's law relates which three quantities?",
    "options": { "A": "Voltage, Current, and Resistance", "B": "Force, Mass, and Acceleration", "C": "Work, Power, and Time", "D": "Frequency, Wavelength, and Speed" },
    "answer": "A",
    "explanation": "Ohm ka qanoon Voltage (V), Current (I), aur Resistance (R) ke darmiyan taluq batata hai (V=IR)."
  },
  {
    "id": 3033,
    "subject": "Physics",
    "question": "A convex lens is used to correct which vision defect?",
    "options": { "A": "Myopia (Nearsightedness)", "B": "Hypermetropia (Farsightedness)", "C": "Astigmatism", "D": "Cataract" },
    "answer": "B",
    "explanation": "Convex lens door ki nazar ki kamzori (Hypermetropia) ko theek karne ke liye istemal hota hai."
  },
  {
    "id": 3034,
    "subject": "Physics",
    "question": "The rate of change of momentum of an object is equal to the:",
    "options": { "A": "Applied force", "B": "Object's velocity", "C": "Object's acceleration", "D": "Kinetic energy" },
    "answer": "A",
    "explanation": "Newton ke doosre qanoon ke mutabiq, momentum ki tabdeeli ki sharah (rate of change) lagayi gayi quwwat (force) ke barabar hoti hai."
  },
  {
    "id": 3035,
    "subject": "Physics",
    "question": "Sound waves in air are:",
    "options": { "A": "Transverse waves", "B": "Longitudinal waves", "C": "Electromagnetic waves", "D": "Surface waves" },
    "answer": "B",
    "explanation": "Hawa mein awaz ki lehrein longitudinal hoti hain, jahan zarrat (particles) lehar ki simt mein aage peechay harkat karte hain."
  },
  {
    "id": 3036,
    "subject": "Physics",
    "question": "What is the SI unit of frequency?",
    "options": { "A": "Meter", "B": "Second", "C": "Hertz", "D": "Watt" },
    "answer": "C",
    "explanation": "Frequency ka SI unit Hertz (Hz) hai, jo per second cycles ke barabar hota hai."
  },
  {
    "id": 3037,
    "subject": "Physics",
    "question": "Newton's first law of motion is also known as the law of:",
    "options": { "A": "Action-Reaction", "B": "Gravitation", "C": "Inertia", "D": "Momentum" },
    "answer": "C",
    "explanation": "Newton ke pehle qanoon ko Law of Inertia bhi kaha jata hai, jo batata hai ke jism apni halat (rest ya motion) barqarar rakhta hai jab tak us par koi quwwat na lage."
  },
  {
    "id": 3038,
    "subject": "Physics",
    "question": "Which of the following is a vector quantity?",
    "options": { "A": "Speed", "B": "Distance", "C": "Mass", "D": "Velocity" },
    "answer": "D",
    "explanation": "Velocity ek vector miqdar hai kyunki ismein miqdar (magnitude) aur simt (direction) dono hote hain. Speed, distance, aur mass scalar hain."
  },
  {
    "id": 3039,
    "subject": "Physics",
    "question": "The energy stored in a stretched or compressed spring is:",
    "options": { "A": "Kinetic energy", "B": "Potential energy", "C": "Thermal energy", "D": "Chemical energy" },
    "answer": "B",
    "explanation": "Khinchay ya dabaye hue spring mein store shuda tawanai ko potential energy kehte hain."
  },
  {
    "id": 3040,
    "subject": "Physics",
    "question": "The bending of light as it passes from one medium to another is called:",
    "options": { "A": "Reflection", "B": "Refraction", "C": "Diffraction", "D": "Interference" },
    "answer": "B",
    "explanation": "Jab roshni ek medium se doosre medium mein jati hai to uske murr jane ke amal ko refraction kehte hain."
  },
  {
    "id": 3041,
    "subject": "Physics",
    "question": "The weight of an object is maximum at the:",
    "options": { "A": "Equator", "B": "Center of the Earth", "C": "Poles", "D": "Moon" },
    "answer": "C",
    "explanation": "Zameen ke poles par 'g' (gravity) ki qeemat zyada hone ki wajah se kisi jism ka wazan sab se zyada hota hai."
  },
  {
    "id": 3042,
    "subject": "Physics",
    "question": "The working of a rocket is based on the principle of:",
    "options": { "A": "Conservation of Energy", "B": "Conservation of Momentum", "C": "Bernoulli's principle", "D": "Archimedes' principle" },
    "answer": "B",
    "explanation": "Rocket ka kaam conservation of momentum ke usool par mabni hai. Gas peechay nikalti hai aur rocket aage barhta hai."
  },
  {
    "id": 3043,
    "subject": "Physics",
    "question": "Which color of visible light has the longest wavelength?",
    "options": { "A": "Blue", "B": "Green", "C": "Yellow", "D": "Red" },
    "answer": "D",
    "explanation": "Visible spectrum mein, surkh (red) roshni ki wavelength sab se lambi hoti hai."
  },
  {
    "id": 3044,
    "subject": "Physics",
    "question": "What is the SI unit of pressure?",
    "options": { "A": "Newton", "B": "Joule", "C": "Watt", "D": "Pascal" },
    "answer": "D",
    "explanation": "Pressure ka SI unit Pascal (Pa) hai, jo ek Newton per square meter ke barabar hota hai."
  },
  {
    "id": 3045,
    "subject": "Physics",
    "question": "An ammeter is a device used to measure:",
    "options": { "A": "Voltage", "B": "Resistance", "C": "Electric current", "D": "Power" },
    "answer": "C",
    "explanation": "Ammeter ek aala hai jo circuit mein electric current ko naapne ke liye istemal hota hai."
  },
  {
    "id": 3046,
    "subject": "Physics",
    "question": "The process by which a heavy nucleus splits into lighter nuclei is called:",
    "options": { "A": "Nuclear fusion", "B": "Nuclear fission", "C": "Radioactivity", "D": "Chain reaction" },
    "answer": "B",
    "explanation": "Jab ek bhari nucleus halkay nuclei mein toot jata hai to is amal ko nuclear fission kehte hain."
  },
  {
    "id": 3047,
    "subject": "Physics",
    "question": "What is the value of 'g' (acceleration due to gravity) at the center of the Earth?",
    "options": { "A": "9.8 m/s²", "B": "Infinite", "C": "Zero", "D": "4.9 m/s²" },
    "answer": "C",
    "explanation": "Zameen ke markaz (center) par, har taraf se kashish (gravity) masawi hone ki wajah se 'g' ki qeemat sifar (zero) ho jati hai."
  },
  {
    "id": 3048,
    "subject": "Physics",
    "question": "A device that converts mechanical energy into electrical energy is called a:",
    "options": { "A": "Motor", "B": "Generator", "C": "Transformer", "D": "Capacitor" },
    "answer": "B",
    "explanation": "Generator ek aala hai jo mechanical tawanai ko electrical tawanai mein tabdeel karta hai."
  },
  {
    "id": 3049,
    "subject": "Physics",
    "question": "The number of images formed by two plane mirrors inclined at an angle of 90 degrees is:",
    "options": { "A": "1", "B": "2", "C": "3", "D": "4" },
    "answer": "C",
    "explanation": "Formula hai (360/θ) - 1. Is case mein (360/90) - 1 = 4 - 1 = 3 images banengi."
  },
  {
    "id": 3050,
    "subject": "Physics",
    "question": "The force that keeps the planets in their orbits around the sun is:",
    "options": { "A": "Magnetic force", "B": "Nuclear force", "C": "Gravitational force", "D": "Electrostatic force" },
    "answer": "C",
    "explanation": "Sayyaron ko unke madar (orbits) mein suraj ke gird rakhne wali quwwat kashish-e-saqal (gravitational force) hai."
  },

  // Math Questions
  {
    "id": 4001,
    "subject": "Math",
    "question": "Solution of the equation 12<sup>x</sup>+18<sup>y</sup>=468 is",
    "options": { "A": "x=2, y=2", "B": "x=1, y=2", "C": "x=2/3, y=1/3", "D": "x=4/3, y=1/s" },
    "answer": "A",
    "explanation": "Trial and error se, jab x=2 aur y=2 put karte hain, toh 12<sup>2</sup> + 18<sup>2</sup> = 144 + 324 = 468."
  },
  {
    "id": 4002,
    "subject": "Math",
    "question": "If the average of 8 students on a test is 77, if 4 of them got 73 marks, then what will be the sum of scores of other 4?",
    "options": { "A": "324", "B": "211", "C": "127", "D": "623" },
    "answer": "A",
    "explanation": "Total marks = 8 &times; 77 = 616. Pehle 4 students ke marks ka sum = 4 &times; 73 = 292. Baaki 4 students ke marks ka sum = 616 - 292 = 324."
  },
  {
    "id": 4003,
    "subject": "Math",
    "question": "The value of <table class=\"matrix\"><tbody><tr><td>1</td><td>1</td><td>1</td><td>1</td></tr><tr><td>4</td><td>2</td><td>1</td><td>8</td></tr><tr><td>2</td><td>2</td><td>2</td><td>2</td></tr><tr><td>6</td><td>1</td><td>2</td><td>1</td></tr></tbody></table> is",
    "options": { "A": "0", "B": "1", "C": "7", "D": "-1" },
    "answer": "A",
    "explanation": "Agar kisi matrix ki do rows ya columns same hon, toh uska determinant zero hota hai. Yahan row 3, row 1 ka multiple hai (Row 3 = 2 * Row 1), isliye determinant 0 hoga."
  },
  {
    "id": 4004,
    "subject": "Math",
    "question": "(i)<sup>16</sup>+(i)<sup>32</sup>-(i)<sup>67</sup>=",
    "options": { "A": "-1+i", "B": "2+i", "C": "1-i", "D": "i" },
    "answer": "B",
    "explanation": "i<sup>16</sup> = (i<sup>4</sup>)<sup>4</sup> = 1<sup>4</sup> = 1. i<sup>32</sup> = (i<sup>4</sup>)<sup>8</sup> = 1<sup>8</sup> = 1. i<sup>67</sup> = i<sup>64</sup> &middot; i<sup>3</sup> = (i<sup>4</sup>)<sup>16</sup> &middot; (-i) = 1 &middot; (-i) = -i. Toh, 1 + 1 - (-i) = 2 + i."
  },
  {
    "id": 4005,
    "subject": "Math",
    "question": "If sin x = 3/4 and x is in first quadrant then value of cos x is:",
    "options": { "A": "&radic;<span class=\"overline\">7</span>/3", "B": "4/3", "C": "&radic;<span class=\"overline\">7</span>/4", "D": "3/5" },
    "answer": "C",
    "explanation": "Pythagorean identity se: cos<sup>2</sup>x + sin<sup>2</sup>x = 1. So, cos<sup>2</sup>x = 1 - (3/4)<sup>2</sup> = 1 - 9/16 = 7/16. cos x = &radic;<span class=\"overline\">7/16</span> = &radic;<span class=\"overline\">7</span>/4 (first quadrant mein cos positive hota hai)."
  },
  {
    "id": 4006,
    "subject": "Math",
    "question": "&int;(2x+5)<sup>2</sup>dx=",
    "options": { "A": "(2x+5)<sup>3</sup>/3+C", "B": "(2x+5)<sup>3</sup>/6+C", "C": "(2x+5)<sup>2</sup>/2+C", "D": "(2x+5)+c" },
    "answer": "B",
    "explanation": "Substitution method use karein: let u = 2x+5, then du = 2dx. So dx = du/2. Integral becomes &int; u<sup>2</sup> (du/2) = (1/2) &int; u<sup>2</sup> du = (1/2) (u<sup>3</sup>/3) + C = u<sup>3</sup>/6 + C. Substitute back u = 2x+5, toh (2x+5)<sup>3</sup>/6 + C."
  },
  {
    "id": 4007,
    "subject": "Math",
    "question": "If x=sin&theta; and y=cos&theta; then dy/dx=",
    "options": { "A": "-tan&theta;", "B": "sec&theta;", "C": "-cot&theta;", "D": "sin&theta;" },
    "answer": "C",
    "explanation": "dx/d&theta; = cos&theta; aur dy/d&theta; = -sin&theta;. Chain rule se: dy/dx = (dy/d&theta;)/(dx/d&theta;) = (-sin&theta;)/(cos&theta;) = -cot&theta;."
  },
  {
    "id": 4008,
    "subject": "Math",
    "question": "The vectors i+j, 3ai+k, 4i-j+k are coplanar then value of a is:",
    "options": { "A": "5/3", "B": "1/3", "C": "1/5", "D": "3/5" },
    "answer": "A",
    "explanation": "Vectors coplanar tab hote hain jab unka scalar triple product zero ho. Determinant of the vectors must be zero: <table class=\"matrix\"><tbody><tr><td>1</td><td>1</td><td>0</td></tr><tr><td>3a</td><td>0</td><td>1</td></tr><tr><td>4</td><td>-1</td><td>1</td></tr></tbody></table> = 1(0 - (-1)) - 1(3a - 4) + 0 = 1 - 3a + 4 = 5 - 3a. Set to 0: 5 - 3a = 0 => 3a = 5 => a = 5/3."
  },
  {
    "id": 4009,
    "subject": "Math",
    "question": "sin&theta;/(tan&theta;cos&theta;)=",
    "options": { "A": "tan&theta;", "B": "sin&theta;", "C": "1", "D": "cos&theta;" },
    "answer": "C",
    "explanation": "sin&theta;/(tan&theta;cos&theta;) = sin&theta;/((sin&theta;/cos&theta;)cos&theta;) = sin&theta;/sin&theta; = 1."
  },
  {
    "id": 4010,
    "subject": "Math",
    "question": "Partial fraction of (x+36)/((x-6)(x-2)) are",
    "options": { "A": "21/(2(x-6)) - 19/(2(x-2))", "B": "1/(x-6) - 1/(x-2)", "C": "1/(2(x-6)) - 3/(x-2)", "D": "2/(x-6) - 3/(x-2)" },
    "answer": "A",
    "explanation": "Partial fraction decomposition: (x+36)/((x-6)(x-2)) = A/(x-6) + B/(x-2). Solving for A and B gives A = 21/2 and B = -19/2."
  },
  {
    "id": 4011,
    "subject": "Math",
    "question": "Eccentricity of circle is:",
    "options": { "A": "0", "B": "1", "C": "&radic;<span class=\"overline\">2</span>", "D": "None" },
    "answer": "A",
    "explanation": "Circle ki eccentricity hamesha 0 hoti hai."
  },
  {
    "id": 4012,
    "subject": "Math",
    "question": "The vector i+2j-k and -i+j+k",
    "options": { "A": "are parallel", "B": "are perpendicular", "C": "forming angle &pi;/4", "D": "None" },
    "answer": "B",
    "explanation": "Agar do vectors perpendicular hon, toh unka dot product zero hota hai. (1)(-1) + (2)(1) + (-1)(1) = -1 + 2 - 1 = 0."
  },
  {
    "id": 4013,
    "subject": "Math",
    "question": "<table class=\"matrix\"><tbody><tr><td>1</td><td>0</td></tr><tr><td>-i</td><td>-1</td></tr></tbody></table><table class=\"matrix\"><tbody><tr><td>1</td><td>-1</td></tr><tr><td>i</td><td>0</td></tr></tbody></table><table class=\"matrix\"><tbody><tr><td>0</td><td>i</td></tr><tr><td>0</td><td>-i</td></tr></tbody></table>=",
    "options": { "A": "<table class=\"matrix\"><tbody><tr><td>0</td><td>2i</td></tr><tr><td>0</td><td>3</td></tr></tbody></table>", "B": "<table class=\"matrix\"><tbody><tr><td>-i</td><td>2i</td></tr><tr><td>2i</td><td>3</td></tr></tbody></table>", "C": "<table class=\"matrix\"><tbody><tr><td>3</td><td>2i</td></tr><tr><td>1</td><td>3i</td></tr></tbody></table>", "D": "<table class=\"matrix\"><tbody><tr><td>0</td><td>i</td></tr><tr><td>2i</td><td>-2i</td></tr></tbody></table>" },
    "answer": "A",
    "explanation": "Pehli do matrices ka product: [[1, -1], [-2i, i]]. Phir isko teesri matrix se multiply karne par: [[1*0 + (-1)*0, 1*i + (-1)*(-i)], [-2i*0 + i*0, -2i*i + i*(-i)]] = [[0, 2i], [0, 2+1]] = [[0, 2i], [0, 3]]. Option A sahi hai."
  },
  {
    "id": 4014,
    "subject": "Math",
    "question": "A card is drawn at random. Probability that selected card is a face card is:",
    "options": { "A": "3/13", "B": "1/4", "C": "1/13", "D": "1/26" },
    "answer": "A",
    "explanation": "Standard deck mein 52 cards hote hain. Face cards (King, Queen, Jack) har suit mein 3 hote hain, aur 4 suits hote hain, toh total 12 face cards. Probability = 12/52 = 3/13."
  },
  {
    "id": 4015,
    "subject": "Math",
    "question": "&int;(e<sup>x</sup>+x)dx=",
    "options": { "A": "e<sup>x</sup>+1+C", "B": "2e<sup>x</sup>+x<sup>2</sup>/2+C", "C": "e<sup>x</sup>+2x+C", "D": "e<sup>x</sup>+x<sup>2</sup>/2+C" },
    "answer": "D",
    "explanation": "Integration rules ke mutabiq: &int; e^x dx = e^x aur &int; x dx = x^2/2. Toh, e^x + x^2/2 + C."
  },
  {
    "id": 4016,
    "subject": "Math",
    "question": "&int; e<sup>x<sup>2</sup></sup>xdx=",
    "options": { "A": "e<sup>x<sup>2</sup></sup>+C", "B": "2e<sup>x<sup>2</sup></sup>+C", "C": "1/2 * e<sup>x<sup>2</sup></sup>+C", "D": "2xe<sup>x<sup>2</sup></sup>+C" },
    "answer": "C",
    "explanation": "Substitution method: Let u = x^2, then du = 2x dx. So x dx = du/2. Integral becomes &int; e^u (du/2) = (1/2) &int; e^u du = (1/2) e^u + C. Substitute back u = x^2, toh (1/2)e<sup>x<sup>2</sup></sup> + C."
  },
  {
    "id": 4017,
    "subject": "Math",
    "question": "(a<sup>2</sup>)<sup>3</sup>+b<sup>2</sup>.b<sup>3</sup> =",
    "options": { "A": "a<sup>6</sup>+b<sup>6</sup>", "B": "a<sup>6</sup>-b<sup>5</sup>", "C": "a<sup>6</sup>+b<sup>5</sup>", "D": "a<sup>5</sup>-b<sup>3</sup>" },
    "answer": "C",
    "explanation": "Exponent rules: (a^2)^3 = a^(2*3) = a^6. Aur b^2 * b^3 = b^(2+3) = b^5. Toh, a^6 + b^5."
  },
  {
    "id": 4018,
    "subject": "Math",
    "question": "Let A=<table class=\"matrix\"><tbody><tr><td>-2</td><td>-2</td><td>0</td></tr><tr><td>-3</td><td>1</td><td>2</td></tr><tr><td>1</td><td>-3</td><td>-1</td></tr></tbody></table> and |A|=-8, the matrix B is equal to transpose of matrix A the |B| is",
    "options": { "A": "-12", "B": "12", "C": "-8", "D": "8" },
    "answer": "C",
    "explanation": "Matrix ka determinant uske transpose ke determinant ke barabar hota hai. So, |B| = |A^T| = |A| = -8."
  },
  {
    "id": 4019,
    "subject": "Math",
    "question": "&int;(2x)/(x<sup>2</sup>+1)dx=",
    "options": { "A": "2 ln(x<sup>2</sup>+1)+C", "B": "3 ln(x<sup>2</sup>+1)+C", "C": "ln(x<sup>2</sup>+1)+C", "D": "None" },
    "answer": "C",
    "explanation": "Integration rule: &int; (f'(x)/f(x)) dx = ln|f(x)| + C. Yahan f(x) = x^2+1 aur f'(x) = 2x. Toh, ln(x^2+1)+C."
  },
  {
    "id": 4020,
    "subject": "Math",
    "question": "1/(1+tan<sup>2</sup>x)=",
    "options": { "A": "sin<sup>2</sup>x", "B": "tan<sup>2</sup>x", "C": "sec<sup>2</sup>x", "D": "cos<sup>2</sup>x" },
    "answer": "D",
    "explanation": "Trigonometric identity: 1 + tan^2x = sec^2x. Toh, 1/sec^2x = cos^2x."
  },
  {
    "id": 4021,
    "subject": "Math",
    "question": "sin&theta;+sin(-&theta;)+cos&theta;+cos(-&theta;)=",
    "options": { "A": "2sin&theta;+2cos&theta;", "B": "-2sin&theta;-2cos&theta;", "C": "2sin&theta;", "D": "2cos&theta;" },
    "answer": "D",
    "explanation": "Properties of trigonometric functions: sin(-&theta;) = -sin&theta; aur cos(-&theta;) = cos&theta;. Toh, sin&theta; - sin&theta; + cos&theta; + cos&theta; = 2cos&theta;."
  },
  {
    "id": 4022,
    "subject": "Math",
    "question": "There are 83 people in the gym from which 51 are kick boxing, 25 are of yoga and 11 for both. Then number of persons who do not take part in either category",
    "options": { "A": "9", "B": "11", "C": "18", "D": "21" },
    "answer": "C",
    "explanation": "Venn diagram ke formula se: N(A U B) = N(A) + N(B) - N(A &cap; B). Toh, N(kick boxing or yoga) = 51 + 25 - 11 = 65. Total log jo koi bhi activity nahi karte = 83 - 65 = 18."
  },
  {
    "id": 4023,
    "subject": "Math",
    "question": "The length of latus rectum of y<sup>2</sup>=4ax is:",
    "options": { "A": "a", "B": "2", "C": "4a", "D": "None" },
    "answer": "C",
    "explanation": "Parabola y^2 = 4ax ka latus rectum ki length 4a hoti hai."
  },
  {
    "id": 4024,
    "subject": "Math",
    "question": "The equation of straight line passing through (7,-4) and (8,5) is",
    "options": { "A": "9x-y-67=0", "B": "x-3y-12=0", "C": "2x-2y-43=0", "D": "None" },
    "answer": "A",
    "explanation": "Two-point form of line equation: (y - y1)/(x - x1) = (y2 - y1)/(x2 - x1). Points (7,-4) and (8,5) use karte hue: (y - (-4))/(x - 7) = (5 - (-4))/(8 - 7) => (y+4)/(x-7) = 9/1 => y+4 = 9(x-7) => y+4 = 9x - 63 => 9x - y - 67 = 0."
  },
  {
    "id": 4025,
    "subject": "Math",
    "question": "Which of the following is correct partial fraction expression of 1/(x<sup>3</sup>-1)",
    "options": { "A": "A/(x-1) + B/(x<sup>2</sup>+x+1)", "B": "A/(x-1) + (Bx+C)/(x<sup>2</sup>+x+1)", "C": "A/(x-1) + B/(x-1)<sup>2</sup> + C/(x-1)<sup>3</sup>", "D": "A/(x-1) + B/(x<sup>2</sup>-1) + C/(x<sup>3</sup>-1)" },
    "answer": "B",
    "explanation": "Denominator x^3-1 ko factorize kiya ja sakta hai as (x-1)(x^2+x+1). Quadratic factor x^2+x+1 non-reducible hai, isliye uske upar Bx+C form aati hai."
  },
  {
    "id": 4026,
    "subject": "Math",
    "question": "The foci of ellipse 3x<sup>2</sup>+4y<sup>2</sup>=12 are:",
    "options": { "A": "(&plusmn;&radic;<span class=\"overline\">2</span>,0)", "B": "(&plusmn;2,0)", "C": "(&plusmn;3,0)", "D": "(&plusmn;1,0)" },
    "answer": "D",
    "explanation": "Equation ko standard form mein laane ke liye 12 se divide karein: x<sup>2</sup>/4 + y<sup>2</sup>/3 = 1. Yahan a^2 = 4 aur b^2 = 3. Focus ke liye c^2 = a^2 - b^2 = 4 - 3 = 1. So c = &plusmn;1. Foci x-axis par hain, isliye (&plusmn;1, 0)."
  },
  {
    "id": 4027,
    "subject": "Math",
    "question": "If f(x)=x<sup>x</sup> then f'(x) is equal to",
    "options": { "A": "x ln x(ln x+1)", "B": "x<sup>x</sup>(ln x+1)", "C": "x<sup>x</sup>(ln x-1)", "D": "None of these" },
    "answer": "B",
    "explanation": "Function ko differentiate karne ke liye y = x^x => ln y = x ln x. Differentiate both sides w.r.t x: (1/y) dy/dx = 1 * ln x + x * (1/x) = ln x + 1. Toh, dy/dx = y(ln x + 1) = x^x(ln x + 1)."
  },
  {
    "id": 4028,
    "subject": "Math",
    "question": "Second derivative of sin x w.r.t x is",
    "options": { "A": "cos x", "B": "sinx", "C": "-sin x", "D": "-cos x" },
    "answer": "C",
    "explanation": "Pehla derivative of sin x is cos x. Dusra derivative of cos x is -sin x."
  },
  {
    "id": 4029,
    "subject": "Math",
    "question": "A card is drawn at random. Probability that selected card is not a face card, is:",
    "options": { "A": "1/4", "B": "4/13", "C": "10/13", "D": "1/12" },
    "answer": "C",
    "explanation": "Total cards 52. Face cards 12 (3 per suit). Non-face cards = 52 - 12 = 40. Probability = 40/52 = 10/13."
  },
  {
    "id": 4030,
    "subject": "Math",
    "question": "Two cards are selected at random from a deck of 52 cards. The probability of getting 2 red cards is:",
    "options": { "A": "25/102", "B": "13/99", "C": "1/4", "D": "11/102" },
    "answer": "A",
    "explanation": "Deck mein 26 red cards hote hain. Pehli red card nikalne ki probability = 26/52. Dusri red card nikalne ki probability = 25/51. Total probability = (26/52) &times; (25/51) = (1/2) &times; (25/51) = 25/102."
  },
  {
    "id": 4031,
    "subject": "Math",
    "question": "What is the value of log<sub>10</sub>(100)?",
    "options": { "A": "1", "B": "2", "C": "10", "D": "100" },
    "answer": "B",
    "explanation": "Logarithm ka matlab hai '10 ki kya power 100 ke barabar hogi?'. 10<sup>2</sup> = 100, isliye jawab 2 hai."
  },
  {
    "id": 4032,
    "subject": "Math",
    "question": "The area of a circle with radius 'r' is given by the formula:",
    "options": { "A": "&pi;r", "B": "2&pi;r", "C": "&pi;r<sup>2</sup>", "D": "2&pi;r<sup>2</sup>" },
    "answer": "C",
    "explanation": "Circle ke area ka formula &pi;r<sup>2</sup> hota hai."
  },
  {
    "id": 4033,
    "subject": "Math",
    "question": "What is the next number in the series: 2, 4, 8, 16, ...?",
    "options": { "A": "20", "B": "24", "C": "32", "D": "64" },
    "answer": "C",
    "explanation": "Yeh ek geometric series hai jahan har agla number pichle number ko 2 se multiply karke aata hai. 16 * 2 = 32."
  },
  {
    "id": 4034,
    "subject": "Math",
    "question": "The sum of the interior angles of a triangle is always:",
    "options": { "A": "90 degrees", "B": "180 degrees", "C": "270 degrees", "D": "360 degrees" },
    "answer": "B",
    "explanation": "Kisi bhi triangle ke andar ke tamam angles ka majmooa hamesha 180 degrees hota hai."
  },
  {
    "id": 4035,
    "subject": "Math",
    "question": "What is the value of sin(90&deg;)?",
    "options": { "A": "0", "B": "0.5", "C": "1", "D": "-1" },
    "answer": "C",
    "explanation": "Trigonometry mein, sin(90 degrees) ki qeemat 1 hoti hai."
  },
  {
    "id": 4036,
    "subject": "Math",
    "question": "What is the slope of the line y = 2x + 3?",
    "options": { "A": "1", "B": "2", "C": "3", "D": "5" },
    "answer": "B",
    "explanation": "Line ki equation y = mx + c mein 'm' slope hota hai. Is equation mein, m = 2."
  },
  {
    "id": 4037,
    "subject": "Math",
    "question": "The integral of cos(x) dx is:",
    "options": { "A": "-sin(x) + C", "B": "sin(x) + C", "C": "cos(x) + C", "D": "-cos(x) + C" },
    "answer": "B",
    "explanation": "Calculus mein, cos(x) ka integral sin(x) + C hota hai."
  },
  {
    "id": 4038,
    "subject": "Math",
    "question": "In complex numbers, what is the value of i<sup>2</sup>?",
    "options": { "A": "1", "B": "-1", "C": "i", "D": "-i" },
    "answer": "B",
    "explanation": "Imaginary unit 'i' ki definition hi yeh hai ke i<sup>2</sup> = -1."
  },
  {
    "id": 4039,
    "subject": "Math",
    "question": "In a right-angled triangle, the side opposite the right angle is called the:",
    "options": { "A": "Base", "B": "Perpendicular", "C": "Hypotenuse", "D": "Median" },
    "answer": "C",
    "explanation": "Right-angled triangle mein 90 degree ke angle ke samne wali side ko hypotenuse kehte hain."
  },
  {
    "id": 4040,
    "subject": "Math",
    "question": "The probability of an event that is impossible to occur is:",
    "options": { "A": "0", "B": "1", "C": "0.5", "D": "Undefined" },
    "answer": "A",
    "explanation": "Ek na-mumkin (impossible) event ke hone ka imkaan (probability) hamesha 0 hota hai."
  },
  {
    "id": 4041,
    "subject": "Math",
    "question": "The determinant of a 2x2 matrix <table class=\"matrix\"><tbody><tr><td>a</td><td>b</td></tr><tr><td>c</td><td>d</td></tr></tbody></table> is:",
    "options": { "A": "ab - cd", "B": "ac - bd", "C": "ad - bc", "D": "a+d - (b+c)" },
    "answer": "C",
    "explanation": "2x2 matrix ka determinant (ad - bc) hota hai."
  },
  {
    "id": 4042,
    "subject": "Math",
    "question": "The formula for the volume of a sphere with radius 'r' is:",
    "options": { "A": "4&pi;r<sup>2</sup>", "B": "&pi;r<sup>3</sup>", "C": "(4/3)&pi;r<sup>3</sup>", "D": "2&pi;r<sup>3</sup>" },
    "answer": "C",
    "explanation": "Sphere ke volume ka formula (4/3)&pi;r<sup>3</sup> hota hai."
  },
  {
    "id": 4043,
    "subject": "Math",
    "question": "What is the value of tan(45&deg;)?",
    "options": { "A": "0", "B": "1", "C": "&radic;<span class=\"overline\">3</span>", "D": "Undefined" },
    "answer": "B",
    "explanation": "Trigonometry mein, tan(45 degrees) ki qeemat 1 hoti hai."
  },
  {
    "id": 4044,
    "subject": "Math",
    "question": "If A and B are two sets, A &cup; B represents the set of elements which are:",
    "options": { "A": "in A and in B", "B": "only in A", "C": "in A or in B or in both", "D": "only in B" },
    "answer": "C",
    "explanation": "A union B (A &cup; B) un tamam anasir (elements) ka set hota hai jo ya to A mein hon, ya B mein hon, ya dono mein hon."
  },
  {
    "id": 4045,
    "subject": "Math",
    "question": "The derivative of x<sup>n</sup> with respect to x is:",
    "options": { "A": "x<sup>n-1</sup>", "B": "(n-1)x<sup>n</sup>", "C": "nx<sup>n-1</sup>", "D": "n*x" },
    "answer": "C",
    "explanation": "Power rule ke mutabiq, x<sup>n</sup> ka derivative nx<sup>n-1</sup> hota hai."
  },
  {
    "id": 4046,
    "subject": "Math",
    "question": "What is the value of 0! (zero factorial)?",
    "options": { "A": "0", "B": "1", "C": "Undefined", "D": "Infinite" },
    "answer": "B",
    "explanation": "Riyazi mein, 0 factorial (0!) ki qeemat 1 ke barabar define ki gayi hai."
  },
  {
    "id": 4047,
    "subject": "Math",
    "question": "The distance between two points (x<sub>1</sub>, y<sub>1</sub>) and (x<sub>2</sub>, y<sub>2</sub>) is given by:",
    "options": { "A": "&radic;<span class=\"overline\">(x<sub>2</sub>-x<sub>1</sub>) + (y<sub>2</sub>-y<sub>1</sub>)</span>", "B": "(x<sub>2</sub>-x<sub>1</sub>)<sup>2</sup> + (y<sub>2</sub>-y<sub>1</sub>)<sup>2</sup>", "C": "&radic;<span class=\"overline\">(x<sub>2</sub>-x<sub>1</sub>)<sup>2</sup> + (y<sub>2</sub>-y<sub>1</sub>)<sup>2</sup></span>", "D": "|x<sub>2</sub>-x<sub>1</sub>| + |y<sub>2</sub>-y<sub>1</sub>|" },
    "answer": "C",
    "explanation": "Do points ke darmiyan fasla distance formula se nikala jata hai, jo ke &radic;<span class=\"overline\">(x<sub>2</sub>-x<sub>1</sub>)<sup>2</sup> + (y<sub>2</sub>-y<sub>1</sub>)<sup>2</sup></span> hai."
  },
  {
    "id": 4048,
    "subject": "Math",
    "question": "What is the general form of a quadratic equation?",
    "options": { "A": "ax + b = 0", "B": "ax<sup>2</sup> + bx + c = 0", "C": "ax<sup>3</sup> + bx<sup>2</sup> + cx + d = 0", "D": "y = mx + c" },
    "answer": "B",
    "explanation": "Quadratic equation ki aam shakal ax<sup>2</sup> + bx + c = 0 hai, jahan a, 0 ke barabar nahi hota."
  },
  {
    "id": 4049,
    "subject": "Math",
    "question": "The circumference of a circle with radius 'r' is:",
    "options": { "A": "&pi;r<sup>2</sup>", "B": "2&pi;r", "C": "&pi;r", "D": "2&pi;d" },
    "answer": "B",
    "explanation": "Circle ke circumference (gherao) ka formula 2&pi;r hota hai."
  },
  {
    "id": 4050,
    "subject": "Math",
    "question": "The sum of the first 'n' natural numbers is given by:",
    "options": { "A": "n(n+1)", "B": "n<sup>2</sup>", "C": "n(n+1)/2", "D": "2n" },
    "answer": "C",
    "explanation": "Pehle 'n' qudrati adad (natural numbers) ka majmooa n(n+1)/2 ke formula se nikala jata hai."
  }
];

/**
 * Shuffles an array in place.
 * @param array The array to shuffle.
 */
function shuffleArray<T>(array: T[]): T[] {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

/**
 * Generates a new test with a specified number of random questions from each subject.
 * @param countPerSubject The number of questions to select from each subject.
 * @returns An array of 100 questions (or countPerSubject * 4).
 */
export function generateRandomTest(countPerSubject = 25): Question[] {
  const subjects = ['English', 'Math', 'Physics', 'Computer'];
  const testQuestions: Question[] = [];

  const groupedBySubject: Record<string, Question[]> = {
    English: [],
    Math: [],
    Physics: [],
    Computer: [],
  };

  // Group questions by subject
  for (const question of questionBank) {
    if (groupedBySubject[question.subject]) {
      groupedBySubject[question.subject].push(question);
    }
  }
  
  // For each subject, shuffle and pick the required number of questions
  for (const subject of subjects) {
    const subjectQuestions = groupedBySubject[subject];
    if (subjectQuestions.length < countPerSubject) {
        console.warn(`Warning: Not enough questions for subject '${subject}'. Found ${subjectQuestions.length}, needed ${countPerSubject}.`);
    }
    const selectedQuestions = shuffleArray([...subjectQuestions]).slice(0, countPerSubject);
    testQuestions.push(...selectedQuestions);
  }

  // We return the questions grouped by subject to maintain the block structure in the test.
  return testQuestions;
}
