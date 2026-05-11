/**
 * Career Navigators — mock data
 *
 * Questions extracted from the project PDFs (Nivel 1-4). Each level contains
 * multiple-choice questions, one correct answer, and pop-up explanations
 * for the incorrect choices.
 */

export type Domain = 'hr' | 'marketing';

export type AnswerOption = {
  id: 'A' | 'B' | 'C';
  text: string;
  /**
   * Feedback shown in a pop-up when the option is chosen.
   * For incorrect answers this is the recommendation; for the correct one
   * it's the positive confirmation message.
   */
  feedback: string;
};

export type Question = {
  id: string;
  pageTitle: string;        // "Titlul paginii" — section title
  scenario?: string;        // Optional intro/situation card
  prompt: string;           // The actual question
  options: AnswerOption[];
  correctId: 'A' | 'B' | 'C';
};

export type Level = {
  id: number;
  title: string;
  subtitle: string;
  icon: string;             // emoji used in level card
  domainScoped?: boolean;   // true if questions depend on chosen domain
  questions: Question[];
  questionsByDomain?: Record<Domain, Question[]>;
};

/* -------------------------------------------------------------------------- */
/* LEVEL 1 — Before the Interview                                              */
/* -------------------------------------------------------------------------- */

const level1Questions: Question[] = [
  {
    id: 'l1-q1',
    pageTitle: 'Documentare despre companie',
    prompt:
      'Cât de mult ar trebui să te documentezi despre companie înainte de interviu?',
    options: [
      {
        id: 'A',
        text: 'Deloc, prefer să aflu totul direct de la recrutor în timpul discuției.',
        feedback:
          'Lipsa de documentare arată dezinteres. Recrutorii apreciază candidații care își „fac temele” și înțeleg cu ce se ocupă firma.',
      },
      {
        id: 'B',
        text: 'Citesc doar „Despre noi” de pe site și mă asigur că știu cu ce se ocupă în mare.',
        feedback:
          'Este un început bun, dar o documentare superficială nu te va ajuta să te evidențiezi față de alți candidați mai bine pregătiți.',
      },
      {
        id: 'C',
        text: 'Studiez site-ul, paginile de social media, proiectele recente și valorile lor.',
        feedback:
          'Excelent! O documentare temeinică te ajută să adaptezi răspunsurile și să arăți interes real.',
      },
    ],
    correctId: 'C',
  },
  {
    id: 'l1-q2',
    pageTitle: 'Ținuta pentru interviu',
    prompt: 'Cum alegi ținuta potrivită pentru interviu?',
    options: [
      {
        id: 'A',
        text: 'Port cele mai lejere haine pe care le am (hanorac, blugi rupți), pentru a părea relaxat.',
        feedback:
          'Prima impresie contează enorm! O ținută prea neglijentă transmite lipsă de profesionalism.',
      },
      {
        id: 'B',
        text: 'Mă interesez de cultura vestimentară a firmei și aleg o ținută puțin mai formală decât poartă angajații lor de obicei.',
        feedback: 'Răspuns ideal — adaptabilitatea este cheia!',
      },
      {
        id: 'C',
        text: 'Port întotdeauna un costum complet cu cravată, indiferent de mediul firmei.',
        feedback:
          'Uneori, a fi mult prea formal într-un mediu relaxat poate arăta că nu te potrivești cu cultura lor.',
      },
    ],
    correctId: 'B',
  },
  {
    id: 'l1-q3',
    pageTitle: 'Interviu online',
    prompt: 'Ce faci dacă interviul are loc online (pe Zoom, Teams etc.)?',
    options: [
      {
        id: 'A',
        text: 'Intru pe link exact la ora fixată, nu e nevoie de pregătire specială.',
        feedback:
          'Problemele tehnice apar mereu în ultimul moment. E riscant să nu verifici conexiunea înainte.',
      },
      {
        id: 'B',
        text: 'Verific microfonul, camera și fundalul cu 15-20 de minute înainte și mă asigur că am o conexiune stabilă.',
        feedback: 'Corect! Pregătirea tehnică te scutește de stres de ultim moment.',
      },
      {
        id: 'C',
        text: 'Folosesc telefonul ținut în mână pentru a fi mai mobil în timpul discuției.',
        feedback:
          'Imaginea va fi instabilă. Folosește un laptop sau un suport fix pentru o imagine profesionistă.',
      },
    ],
    correctId: 'B',
  },
  {
    id: 'l1-q4',
    pageTitle: '„Povestește-mi despre tine”',
    prompt: 'Cum pregătești răspunsul la întrebarea „Povestește-mi despre tine”?',
    options: [
      {
        id: 'A',
        text: 'Îmi scriu întreaga biografie, începând din școala generală, pentru a nu omite nimic.',
        feedback:
          'Recrutorul vrea doar informațiile relevante pentru job, nu o poveste lungă despre toată viața ta.',
      },
      {
        id: 'B',
        text: 'Nu pregătesc nimic, voi spune ce îmi vine în minte pe moment ca să par natural.',
        feedback:
          'Fără un plan, riști să te pierzi în detalii sau să uiți realizările cele mai importante.',
      },
      {
        id: 'C',
        text: 'Pregătesc un rezumat de 1-2 minute axat pe experiență, abilități și de ce sunt acolo.',
        feedback: 'Perfect — un pitch concis și relevant!',
      },
    ],
    correctId: 'C',
  },
  {
    id: 'l1-q5',
    pageTitle: 'Propriul CV',
    prompt: 'Ce ar trebui să faci cu propriul CV înainte de interviu?',
    options: [
      {
        id: 'A',
        text: 'Îl recitesc cu atenție pentru a fi sigur că pot explica orice detaliu sau dată menționată.',
        feedback:
          'Exact! Recitirea îți dă siguranță și consistență în răspunsuri.',
      },
      {
        id: 'B',
        text: 'Nu îl mai citesc, doar eu l-am scris, îl știu pe de rost.',
        feedback:
          'Sub emoții poți uita detalii. Recitirea te ajută să fii sigur pe tine.',
      },
      {
        id: 'C',
        text: 'Îl modific cu 5 minute înainte de interviu ca să pară mai interesant.',
        feedback:
          'Discrepanțele între ce vede recrutorul și ce spui tu pot ridica semne de întrebare privind onestitatea.',
      },
    ],
    correctId: 'A',
  },
  {
    id: 'l1-q6',
    pageTitle: 'Puncte slabe',
    prompt: 'Cum te pregătești pentru întrebările despre punctele tale slabe?',
    options: [
      {
        id: 'A',
        text: 'Pregătesc un răspuns de tipul „Sunt prea perfecționist” sau „Muncesc prea mult”.',
        feedback:
          'Răspuns clișeu, perceput ca nesincer și evaziv de recrutori.',
      },
      {
        id: 'B',
        text: 'Identific un punct slab real și pregătesc un exemplu despre cum lucrez activ să îl îmbunătățesc.',
        feedback: 'Corect — onestitate plus acțiune.',
      },
      {
        id: 'C',
        text: 'Spun că nu am puncte slabe, pentru a părea candidatul perfect.',
        feedback: 'Lipsa unui defect arată lipsă de autocunoaștere și aroganță.',
      },
    ],
    correctId: 'B',
  },
  {
    id: 'l1-q7',
    pageTitle: 'Locația interviului',
    prompt: 'Cum verifici locația interviului (dacă este fizic)?',
    options: [
      {
        id: 'A',
        text: 'Verific adresa pe GPS exact când plec de acasă.',
        feedback:
          'Traficul sau lipsa locurilor de parcare te pot face să întârzii.',
      },
      {
        id: 'B',
        text: 'Caut adresa cu cel puțin o zi înainte, verific ruta și estimez timpul de drum cu marjă.',
        feedback: 'Corect! Planificarea elimină stresul.',
      },
      {
        id: 'C',
        text: 'Merg direct la sediul central al companiei, chiar dacă pe invitație scrie altă adresă.',
        feedback:
          'Companiile mari au mai multe sedii. Verifică întotdeauna locația din invitație.',
      },
    ],
    correctId: 'B',
  },
  {
    id: 'l1-q8',
    pageTitle: 'Job Description',
    prompt:
      'Ce faci dacă nu înțelegi cerințele din anunțul de angajare (Job Description)?',
    options: [
      {
        id: 'A',
        text: 'Le ignor, probabil le voi învăța la locul de muncă.',
        feedback:
          'Trebuie să știi exact ce se așteaptă de la tine pentru a demonstra că ai abilitățile.',
      },
      {
        id: 'B',
        text: 'Analizez cuvintele cheie și caut explicații pentru termenii tehnici necunoscuți.',
        feedback: 'Exact — pregătirea atentă face diferența.',
      },
      {
        id: 'C',
        text: 'Întreb prietenii ce cred ei că înseamnă, fără să mai caut altundeva.',
        feedback:
          'Opiniile prietenilor pot fi subiective. O cercetare proprie este mult mai sigură.',
      },
    ],
    correctId: 'B',
  },
];

/* -------------------------------------------------------------------------- */
/* LEVEL 2 — Behavioural / Introductory                                        */
/* -------------------------------------------------------------------------- */

const level2Questions: Question[] = [
  {
    id: 'l2-q1',
    pageTitle: 'Despre individ',
    prompt: 'Povestește-mi puțin despre tine.',
    options: [
      {
        id: 'A',
        text: 'M-am născut în Cluj-Napoca, îmi plac cățeii, am terminat liceul în 2021 și acum caut o slujbă pentru că viața mea e foarte monotonă.',
        feedback:
          'Prea multă informație personală. Recrutorul vrea să audă despre parcursul tău profesional.',
      },
      {
        id: 'B',
        text: 'Sunt student la [Domeniu], pasionat de [X], iar în ultimul an m-am implicat în proiecte de voluntariat unde mi-am dezvoltat disciplina și lucrul în echipă.',
        feedback: 'Răspuns excelent — profesional și relevant.',
      },
      {
        id: 'C',
        text: 'Păi, scrie totul în CV-ul pe care vi l-am trimis, nu ați apucat să îl citiți?',
        feedback:
          'Atenție la atitudine! Interviul e ocazia ta de a da viață informațiilor din CV, nu de a deveni defensiv.',
      },
    ],
    correctId: 'B',
  },
  {
    id: 'l2-q2',
    pageTitle: 'Motivație',
    prompt: 'De ce ai ales compania noastră?',
    options: [
      {
        id: 'A',
        text: 'Am văzut că oferiți un pachet salarial atractiv și multe beneficii, iar sediul este aproape de locuința mea.',
        feedback:
          'Evită să pui banii și confortul pe primul loc. Companiile caută angajați motivați de misiune și valori.',
      },
      {
        id: 'B',
        text: 'Mă regăsesc în valorile voastre și am urmărit evoluția proiectelor recente, în care cred că aș putea aduce un plus de valoare.',
        feedback: 'Răspuns excelent — arată cercetare și aliniere.',
      },
      {
        id: 'C',
        text: 'Am trimis CV-ul la mai multe firme și dumneavoastră ați fost primii care m-au sunat.',
        feedback: 'Niciunui recrutor nu îi place să audă că ești acolo din întâmplare.',
      },
    ],
    correctId: 'B',
  },
  {
    id: 'l2-q3',
    pageTitle: 'Defectele tale',
    prompt: 'Care consideri că este cel mai mare defect al tău?',
    options: [
      {
        id: 'A',
        text: 'Sunt un perfecționist convins și muncesc prea mult, uneori uit să mai plec de la birou.',
        feedback: 'Acesta este un clișeu. Recrutorii vor să vadă onestitate și auto-reflecție.',
      },
      {
        id: 'B',
        text: 'Nu cred că am defecte care să îmi afecteze munca, sunt o persoană foarte adaptabilă.',
        feedback: 'Nimeni nu e perfect! Alege ceva real și spune cum încerci să îl corectezi.',
      },
      {
        id: 'C',
        text: 'Uneori îmi este greu să deleg sarcini, dar am început să fiu mai atent cu privire la acest aspect.',
        feedback: 'Corect — onest și orientat spre îmbunătățire.',
      },
    ],
    correctId: 'C',
  },
  {
    id: 'l2-q4',
    pageTitle: 'Viziune pe termen lung',
    prompt: 'Unde te vezi peste 5 ani?',
    options: [
      {
        id: 'A',
        text: 'Îmi doresc să evoluez ca specialist în acest domeniu și să preiau responsabilități mai mari în cadrul departamentului vostru.',
        feedback: 'Răspuns ideal — direcționat spre creștere în companie.',
      },
      {
        id: 'B',
        text: 'Sper ca până atunci să am propria mea afacere și să nu mai fiu nevoit să fiu angajat.',
        feedback:
          'Angajatorul vrea să știe că vei rămâne în companie, nu că plănuiești deja să pleci.',
      },
      {
        id: 'C',
        text: 'Nu îmi place să îmi fac planuri, trăiesc momentul și profit de orice oportunitate.',
        feedback:
          'Acest răspuns sugerează instabilitate. Arată că ai o direcție clară.',
      },
    ],
    correctId: 'A',
  },
  {
    id: 'l2-q5',
    pageTitle: 'Feedback',
    prompt: 'Cum reacționezi atunci când primești feedback negativ?',
    options: [
      {
        id: 'A',
        text: 'Mă supăr puțin, dar îmi trece. De obicei încerc să explic de ce am procedat așa pentru a fi înțeles.',
        feedback: 'Atenție la defensivă — faci să pară că ești greu de instruit.',
      },
      {
        id: 'B',
        text: 'Îl primesc ca pe o oportunitate de învățare. Cer detalii specifice pentru a înțelege unde pot îmbunătăți.',
        feedback: 'Răspuns ideal — orientat pe creștere.',
      },
      {
        id: 'C',
        text: 'Îl ignor dacă știu că am avut dreptate, fiecare are stilul lui și viziuni diferite.',
        feedback: 'Abilitatea de a accepta critici constructive este esențială.',
      },
    ],
    correctId: 'B',
  },
  {
    id: 'l2-q6',
    pageTitle: 'Stil de lucru',
    prompt: 'Preferi să lucrezi singur sau în echipă?',
    options: [
      {
        id: 'A',
        text: 'Prefer singur, deoarece am mai mult control asupra rezultatului final și termin treaba mai repede.',
        feedback: 'Chiar dacă ești eficient singur, majoritatea joburilor necesită colaborare.',
      },
      {
        id: 'B',
        text: 'Mă adaptez situației, dar îmi place colaborarea deoarece ideile diferite duc la rezultate mai bune.',
        feedback: 'Răspuns echilibrat — exact ce caută angajatorul.',
      },
      {
        id: 'C',
        text: 'Nu contează, fac ce mi se spune, atâta timp cât sarcinile sunt clar definite de șef.',
        feedback: 'Răspuns pasiv — arată că nu ai inițiativă.',
      },
    ],
    correctId: 'B',
  },
  {
    id: 'l2-q7',
    pageTitle: 'Greșeli din trecut',
    prompt: 'Povestește-mi despre o situație în care ai făcut o greșeală.',
    options: [
      {
        id: 'A',
        text: 'Nu prea fac greșeli, de obicei sunt foarte atent la detalii și verific totul de două ori.',
        feedback: 'Nimeni nu crede asta! Recrutorul vrea să vadă responsabilitate și învățare.',
      },
      {
        id: 'B',
        text: 'Odată am înțeles greșit un deadline, dar imediat ce am realizat, am anunțat echipa și am lucrat peste program pentru a recupera.',
        feedback: 'Corect — îți asumi greșeala și arăți soluția.',
      },
      {
        id: 'C',
        text: 'Am avut un proiect eșuat, dar a fost în mare parte vina colegului meu care nu și-a trimis partea la timp.',
        feedback: 'Niciodată nu da vina pe alții într-un interviu!',
      },
    ],
    correctId: 'B',
  },
  {
    id: 'l2-q8',
    pageTitle: 'Motivație profesională',
    prompt: 'Ce te motivează cel mai mult la locul de muncă?',
    options: [
      {
        id: 'A',
        text: 'Bonusurile de performanță și posibilitatea de a avea un program flexibil sau zile de lucru de acasă.',
        feedback:
          'Beneficiile sunt importante, dar motivația ar trebui să fie legată și de activitatea în sine.',
      },
      {
        id: 'B',
        text: 'Satisfacția de a rezolva probleme complexe și oportunitatea de a învăța lucruri noi în fiecare zi.',
        feedback: 'Exact — motivație intrinsecă, valoroasă pentru orice echipă.',
      },
      {
        id: 'C',
        text: 'Faptul că pot să avansez rapid în funcție și să am autoritate asupra altor oameni.',
        feedback:
          'Atenție la dorința de putere! Concentrează-te pe dezvoltarea personală și succesul colectiv.',
      },
    ],
    correctId: 'B',
  },
];

/* -------------------------------------------------------------------------- */
/* LEVEL 3 — Technical (domain-scoped)                                         */
/* -------------------------------------------------------------------------- */

const level3HRQuestions: Question[] = [
  {
    id: 'l3-hr-q1',
    pageTitle: 'Întrebări tehnice',
    scenario:
      'Ești invitat la un interviu tehnic pentru rolul de HR Specialist. Compania pune accent pe procese de recrutare și dezvoltare a angajaților.',
    prompt: 'Care este rolul interviului comportamental?',
    options: [
      {
        id: 'A',
        text: 'Testează cunoștințele tehnice.',
        feedback:
          'Interviul comportamental nu se concentrează pe cunoștințe tehnice, ci pe modul în care persoanele acționează în situații reale.',
      },
      {
        id: 'B',
        text: 'Prezice comportamente viitoare pe baza experiențelor trecute.',
        feedback: 'Corect — exact asta urmărește.',
      },
      {
        id: 'C',
        text: 'Verifică nivelul de educație.',
        feedback:
          'Nivelul de educație se evaluează separat, nu prin întrebări despre comportament.',
      },
    ],
    correctId: 'B',
  },
  {
    id: 'l3-hr-q2',
    pageTitle: 'Întrebări tehnice',
    prompt: 'Care este scopul evaluării performanței?',
    options: [
      {
        id: 'A',
        text: 'Monitorizarea și îmbunătățirea performanței angajaților.',
        feedback: 'Corect — focusul este pe dezvoltare continuă.',
      },
      {
        id: 'B',
        text: 'Stabilirea deciziilor de recompensare și promovare.',
        feedback:
          'Recompensarea poate fi o consecință, dar scopul principal este dezvoltarea performanței.',
      },
      {
        id: 'C',
        text: 'Identificarea angajaților cu performanță scăzută.',
        feedback:
          'Evaluarea nu este doar despre probleme, ci despre susținerea dezvoltării tuturor angajaților.',
      },
    ],
    correctId: 'A',
  },
  {
    id: 'l3-hr-q3',
    pageTitle: 'Întrebări tehnice',
    prompt: 'Ce presupune un plan de recrutare?',
    options: [
      {
        id: 'A',
        text: 'Definirea bugetului și aprobarea pozițiilor deschise.',
        feedback:
          'Acestea sunt etape administrative, nu descriu întregul proces de recrutare.',
      },
      {
        id: 'B',
        text: 'Stabilirea pașilor necesari pentru atragerea și selecția candidaților.',
        feedback: 'Corect — viziune de ansamblu asupra procesului.',
      },
      {
        id: 'C',
        text: 'Planificarea interviurilor și evaluărilor pentru candidați.',
        feedback:
          'Este doar o etapă, nu acoperă strategia completă.',
      },
    ],
    correctId: 'B',
  },
  {
    id: 'l3-hr-q4',
    pageTitle: 'Întrebări situaționale',
    scenario:
      'Un coleg nou are dificultăți la integrare. Tu, în calitate de HR, observi tensiuni în echipă.',
    prompt: 'Cum procedezi când întâlnești o problemă pe care nu știi imediat cum s-o rezolvi?',
    options: [
      {
        id: 'A',
        text: 'Caut răspunsul pe ChatGPT.',
        feedback:
          'Este util să cauți informații, dar trebuie să verifici și să discuți soluțiile în context profesional.',
      },
      {
        id: 'B',
        text: 'Întreb un prieten care nu lucrează în domeniu.',
        feedback:
          'Este mai eficient să ceri ajutor de la persoane cu experiență relevantă în domeniu.',
      },
      {
        id: 'C',
        text: 'Mă consult cu colegii și managementul.',
        feedback: 'Corect — colaborare profesională.',
      },
    ],
    correctId: 'C',
  },
  {
    id: 'l3-hr-q5',
    pageTitle: 'Întrebări situaționale',
    prompt: 'Cum abordezi o situație conflictuală cu un coleg la locul de muncă?',
    options: [
      {
        id: 'A',
        text: 'Comunic deschis cu persoana respectivă și adresez problema.',
        feedback: 'Corect — comunicarea deschisă este cheia.',
      },
      {
        id: 'B',
        text: 'O să treacă problema de la sine.',
        feedback: 'Conflictele nerezolvate pot escalada dacă sunt ignorate.',
      },
      {
        id: 'C',
        text: 'Recurg la tactica tăcerii.',
        feedback:
          'Evitarea comunicării nu rezolvă problema și poate afecta relația profesională.',
      },
    ],
    correctId: 'A',
  },
  {
    id: 'l3-hr-q6',
    pageTitle: 'Întrebări situaționale',
    prompt: 'Un candidat acceptă oferta, dar nu mai apare în prima zi. Cum reacționezi?',
    options: [
      {
        id: 'A',
        text: 'Reiei imediat recrutarea pentru poziție.',
        feedback:
          'Este important să clarifici situația înainte de a lua o decizie.',
      },
      {
        id: 'B',
        text: 'Îl contactezi pentru clarificare.',
        feedback: 'Corect — o abordare profesională și empatică.',
      },
      {
        id: 'C',
        text: 'Îl treci pe blacklist.',
        feedback:
          'O reacție rigidă poate duce la pierderea unor informații importante despre situație.',
      },
    ],
    correctId: 'B',
  },
  {
    id: 'l3-hr-q7',
    pageTitle: 'Metrici și date',
    prompt: 'Ce poate indica un „cost per hire” foarte ridicat?',
    options: [
      {
        id: 'A',
        text: 'Proces de recrutare eficient.',
        feedback:
          'Din contră! Un proces eficient presupune obținerea talentului de calitate cu un consum optim de resurse.',
      },
      {
        id: 'B',
        text: 'Număr mare de angajați noi.',
        feedback:
          '„Cost per hire” este o medie per persoană. Costul individual ar trebui să rămână stabil.',
      },
      {
        id: 'C',
        text: 'Proces de recrutare ineficient.',
        feedback: 'Corect — semnal că procesul are nevoie de optimizare.',
      },
    ],
    correctId: 'C',
  },
  {
    id: 'l3-hr-q8',
    pageTitle: 'Metrici și date',
    prompt: 'Ce indică o rată mare de drop-off în procesul de recrutare?',
    options: [
      {
        id: 'A',
        text: 'Criterii de selecție prea stricte.',
        feedback:
          '„Drop-off” se referă la candidații care părăsesc ei înșiși procesul, nu la cei respinși.',
      },
      {
        id: 'B',
        text: 'Posibile probleme în etapele procesului.',
        feedback: 'Corect — proces lung, platformă greoaie sau comunicare deficitară.',
      },
      {
        id: 'C',
        text: 'Piața muncii instabilă.',
        feedback:
          'O rată mare de abandon este de obicei un semnal de alarmă intern.',
      },
    ],
    correctId: 'B',
  },
];

const level3MarketingQuestions: Question[] = [
  {
    id: 'l3-mk-q1',
    pageTitle: 'Întrebări tehnice',
    scenario:
      'Te afli la un interviu tehnic pentru rolul de Marketing Analyst. Compania rulează campanii digitale la scară largă.',
    prompt: 'Ce este A/B testing?',
    options: [
      {
        id: 'A',
        text: 'Lansarea a două campanii diferite.',
        feedback:
          'Dacă schimbi totul, nu vei ști ce element a funcționat. Testarea corectă compară variații specifice.',
      },
      {
        id: 'B',
        text: 'Compararea a două variante ale aceluiași element.',
        feedback: 'Corect — exact ce înseamnă A/B testing.',
      },
      {
        id: 'C',
        text: 'Testarea unei campanii înainte de lansare.',
        feedback:
          'Aceasta este o verificare internă (QA). A/B testing-ul se face pe publicul real.',
      },
    ],
    correctId: 'B',
  },
  {
    id: 'l3-mk-q2',
    pageTitle: 'Întrebări tehnice',
    prompt: 'Ce este o campanie de brand awareness?',
    options: [
      {
        id: 'A',
        text: 'Campanie pentru recunoașterea și familiaritatea publicului cu brandul.',
        feedback: 'Corect — focus pe imagine și memorabilitate pe termen lung.',
      },
      {
        id: 'B',
        text: 'Campanie pentru vânzări imediate și conversii directe.',
        feedback:
          'Aceasta este o campanie de „performance”, nu brand awareness.',
      },
      {
        id: 'C',
        text: 'Campanie pentru colectarea de date despre clienți.',
        feedback:
          'Aceea este o campanie de „lead generation”. Awareness-ul vizează o audiență mult mai largă.',
      },
    ],
    correctId: 'A',
  },
  {
    id: 'l3-mk-q3',
    pageTitle: 'Întrebări tehnice',
    prompt: 'Ce reprezintă KPI în marketing?',
    options: [
      {
        id: 'A',
        text: 'Obiective generale stabilite la început de campanie.',
        feedback:
          'KPI-urile trebuie să fie specifice și măsurabile, nu generale.',
      },
      {
        id: 'B',
        text: 'Indicatori folosiți pentru a evalua performanța campaniilor.',
        feedback: 'Corect — instrumente concrete de măsurare.',
      },
      {
        id: 'C',
        text: 'Rezultatele finale ale unei campanii.',
        feedback:
          'KPI-urile se monitorizează pe tot parcursul campaniei, nu doar la final.',
      },
    ],
    correctId: 'B',
  },
  {
    id: 'l3-mk-q4',
    pageTitle: 'Întrebări situaționale',
    scenario:
      'Ai un task neașteptat și termenul este strâns. Echipa așteaptă rezultatele de la tine.',
    prompt: 'Cum procedezi când întâlnești o problemă pe care nu știi imediat cum s-o rezolvi?',
    options: [
      {
        id: 'A',
        text: 'Caut răspunsul pe ChatGPT.',
        feedback:
          'AI-ul este un ajutor util, dar trebuie să treci soluția prin filtrul gândirii tale și al contextului firmei.',
      },
      {
        id: 'B',
        text: 'Întreb un prieten care nu lucrează în domeniu.',
        feedback:
          'Problemele de business necesită expertiză. Riști să primești un sfat greșit.',
      },
      {
        id: 'C',
        text: 'Mă consult cu colegii și managementul.',
        feedback: 'Corect — soluție profesională și colaborativă.',
      },
    ],
    correctId: 'C',
  },
  {
    id: 'l3-mk-q5',
    pageTitle: 'Întrebări situaționale',
    prompt: 'Ai un client nemulțumit de rezultatele campaniei social media. Cum procedezi?',
    options: [
      {
        id: 'A',
        text: 'Îi explici că marketingul nu garantează rezultate imediate.',
        feedback:
          'Răspuns defensiv care nu oferă o soluție. Clientul are nevoie de un plan de acțiune.',
      },
      {
        id: 'B',
        text: 'Prezinți KPI-urile și propui ajustări pentru optimizarea performanței.',
        feedback: 'Corect — abordare bazată pe date și soluții.',
      },
      {
        id: 'C',
        text: 'Reduci numărul de postări ca să nu mai cheltuiți buget.',
        feedback:
          'Reducerea activității într-un moment de criză va scădea și mai mult vizibilitatea.',
      },
    ],
    correctId: 'B',
  },
  {
    id: 'l3-mk-q6',
    pageTitle: 'Întrebări situaționale',
    prompt:
      'Bugetul pentru marketing a fost redus cu 20%, dar trebuie să atingi aceleași obiective. Ce faci?',
    options: [
      {
        id: 'A',
        text: 'Renunți la canalele mai puțin eficiente.',
        feedback:
          'Eliminarea unor canale poate distruge mixul de marketing. Unele canale susțin conversia pe altele.',
      },
      {
        id: 'B',
        text: 'Analizezi performanța fiecărui canal și redistribui bugetul către cele cu ROI maxim.',
        feedback: 'Corect — abordare strategică, bazată pe date.',
      },
      {
        id: 'C',
        text: 'Amâni campaniile până când bugetul va fi majorat.',
        feedback:
          'În marketing, absența de pe piață înseamnă pierdere de relevanță.',
      },
    ],
    correctId: 'B',
  },
  {
    id: 'l3-mk-q7',
    pageTitle: 'Metrici și date',
    prompt: 'Ce măsoară reach-ul unei campanii?',
    options: [
      {
        id: 'A',
        text: 'Numărul total de utilizatori unici care au văzut conținutul.',
        feedback: 'Corect — măsoară audiența atinsă.',
      },
      {
        id: 'B',
        text: 'Numărul total de click-uri.',
        feedback:
          'Aceasta este definiția pentru Click-Through Rate, nu pentru reach.',
      },
      {
        id: 'C',
        text: 'Numărul de vânzări generate.',
        feedback:
          'Aceasta este metrica pentru Conversii. Reach-ul se oprește la nivel de vizualizare.',
      },
    ],
    correctId: 'A',
  },
  {
    id: 'l3-mk-q8',
    pageTitle: 'Metrici și date',
    prompt: 'Cum măsori succesul unei campanii de brand awareness?',
    options: [
      {
        id: 'A',
        text: 'Prin creșterea numărului de vânzări.',
        feedback:
          'Succesul unei campanii de imagine se măsoară prin recunoaștere și descoperire, nu prin vânzări directe.',
      },
      {
        id: 'B',
        text: 'Prin reducerea costului per conversie.',
        feedback:
          'Costul per conversie este o metrică de Performance Marketing, nu de Awareness.',
      },
      {
        id: 'C',
        text: 'Prin indicatori de vizibilitate, reach și impresii.',
        feedback: 'Corect — KPI-urile specifice awareness-ului.',
      },
    ],
    correctId: 'C',
  },
];

/* -------------------------------------------------------------------------- */
/* LEVEL 4 — Candidate Questions                                               */
/* -------------------------------------------------------------------------- */

const level4Questions: Question[] = [
  {
    id: 'l4-q1',
    pageTitle: 'Întrebări din partea ta',
    scenario:
      'Recrutorul îți spune: „Acum, ai tu vreo întrebare pentru noi?”. Alegi varianta cea mai potrivită.',
    prompt: 'Ce întrebare alegi să adresezi?',
    options: [
      {
        id: 'A',
        text: 'Care sunt oportunitățile de dezvoltare profesională în acest rol?',
        feedback: 'Corect — arată ambiție și interes pentru creștere.',
      },
      {
        id: 'B',
        text: 'Pot să întârzii ocazional?',
        feedback:
          'Respectarea programului este importantă; întrebarea sugerează lipsă de responsabilitate.',
      },
      {
        id: 'C',
        text: 'Câte zile de concediu pot să-mi iau imediat după angajare?',
        feedback:
          'Beneficiile sunt importante, dar arată mai întâi interes pentru rol.',
      },
    ],
    correctId: 'A',
  },
  {
    id: 'l4-q2',
    pageTitle: 'Întrebări din partea ta',
    prompt: 'Care întrebare arată interesul tău profesional?',
    options: [
      {
        id: 'A',
        text: 'Cum arată o zi obișnuită de lucru în acest rol?',
        feedback: 'Corect — întrebare profesională și relevantă.',
      },
      {
        id: 'B',
        text: 'Există camere de supraveghere în birou?',
        feedback:
          'Întrebarea nu este relevantă pentru rol și nu arată interes profesional.',
      },
      {
        id: 'C',
        text: 'Pot să plec acasă mai repede dacă îmi termin task-urile?',
        feedback:
          'Important să demonstrezi implicare, nu dorința de a reduce efortul.',
      },
    ],
    correctId: 'A',
  },
  {
    id: 'l4-q3',
    pageTitle: 'Întrebări din partea ta',
    prompt: 'Care este cea mai bună întrebare despre performanță?',
    options: [
      {
        id: 'A',
        text: 'Cum este evaluată performanța în acest rol?',
        feedback: 'Corect — arată că vrei să livrezi rezultate clare.',
      },
      {
        id: 'B',
        text: 'Pot să lucrez de acasă chiar dacă este un job on-site?',
        feedback:
          'Regulile organizației sunt importante; întrebarea sugerează lipsă de disponibilitate.',
      },
      {
        id: 'C',
        text: 'Pot evita lucrul în weekend dacă sunt ocupat?',
        feedback: 'Flexibilitatea este importantă pentru cerințele rolului.',
      },
    ],
    correctId: 'A',
  },
  {
    id: 'l4-q4',
    pageTitle: 'Întrebări din partea ta',
    prompt: 'Care întrebare arată maturitate profesională?',
    options: [
      {
        id: 'A',
        text: 'Care sunt principalele provocări ale acestui rol?',
        feedback: 'Corect — întrebare matură și relevantă.',
      },
      {
        id: 'B',
        text: 'Ce se întâmplă dacă nu mă înțeleg cu colegii?',
        feedback:
          'Mai potrivit să te concentrezi pe rol și oportunități, nu pe posibile conflicte.',
      },
      {
        id: 'C',
        text: 'Este ok dacă evit anumite sarcini când mi se par prea complexe?',
        feedback:
          'Angajatorii caută persoane adaptabile, dispuse să-și asume responsabilități diverse.',
      },
    ],
    correctId: 'A',
  },
  {
    id: 'l4-q5',
    pageTitle: 'Întrebări din partea ta',
    prompt: 'Care întrebare arată interesul pentru integrare?',
    options: [
      {
        id: 'A',
        text: 'Cum arată procesul de onboarding pentru acest rol?',
        feedback: 'Corect — arată că vrei să te integrezi rapid și eficient.',
      },
      {
        id: 'B',
        text: 'Pot să aleg singur ce task-uri să fac?',
        feedback:
          'Rolurile vin cu responsabilități clare; colaborarea este esențială.',
      },
      {
        id: 'C',
        text: 'Există sancțiuni dacă lipsesc de la muncă?',
        feedback:
          'Sugerează preocuparea pentru evitarea regulilor, nu pentru integrare.',
      },
    ],
    correctId: 'A',
  },
  {
    id: 'l4-q6',
    pageTitle: 'Întrebări din partea ta',
    prompt: 'Care întrebare arată orientarea către echipă?',
    options: [
      {
        id: 'A',
        text: 'Cum colaborează echipa în cadrul acestui departament?',
        feedback: 'Corect — arată că ești un team player.',
      },
      {
        id: 'B',
        text: 'Pot evita ședințele dacă mă simt inconfortabil?',
        feedback:
          'Participarea la activitățile echipei este importantă pentru colaborare.',
      },
      {
        id: 'C',
        text: 'Pot să nu accept feedback-ul de la manager?',
        feedback: 'Feedback-ul este esențial pentru dezvoltare și performanță.',
      },
    ],
    correctId: 'A',
  },
  {
    id: 'l4-q7',
    pageTitle: 'Întrebări din partea ta',
    prompt: 'Care întrebare arată că vrei să livrezi rezultate?',
    options: [
      {
        id: 'A',
        text: 'Ce competențe sunt esențiale pentru a avea succes în acest rol?',
        feedback: 'Corect — vrei să știi unde să te concentrezi.',
      },
      {
        id: 'B',
        text: 'Pot să fiu promovat rapid?',
        feedback: 'Evoluția profesională necesită timp și competențe.',
      },
      {
        id: 'C',
        text: 'Este obligatoriu să respect toate procedurile?',
        feedback: 'Respectarea procedurilor este importantă pentru organizație.',
      },
    ],
    correctId: 'A',
  },
  {
    id: 'l4-q8',
    pageTitle: 'Întrebări din partea ta',
    prompt: 'Care întrebare e potrivită la finalul interviului?',
    options: [
      {
        id: 'A',
        text: 'Care sunt următorii pași în procesul de recrutare?',
        feedback: 'Corect — clarifică așteptările pentru ambele părți.',
      },
      {
        id: 'B',
        text: 'Când pot cere prima mărire salarială?',
        feedback:
          'Salariul e important, dar nu ar trebui să fie prima preocupare.',
      },
      {
        id: 'C',
        text: 'Pot negocia sarcinile după angajare?',
        feedback:
          'Important să demonstrezi claritate și interes față de rol încă de la început.',
      },
    ],
    correctId: 'A',
  },
];

/* -------------------------------------------------------------------------- */
/* LEVELS                                                                      */
/* -------------------------------------------------------------------------- */

export const LEVELS: Level[] = [
  {
    id: 1,
    title: 'Before the Interview',
    subtitle: 'Pregătirea ta înainte de marele moment',
    icon: '🔍',
    questions: level1Questions,
  },
  {
    id: 2,
    title: 'Introductory Interview',
    subtitle: 'Cunoaște și fii cunoscut',
    icon: '💬',
    questions: level2Questions,
  },
  {
    id: 3,
    title: 'Technical Interview',
    subtitle: 'Demonstrează că ești pregătit pentru rol',
    icon: '⚙️',
    domainScoped: true,
    questions: [],
    questionsByDomain: {
      hr: level3HRQuestions,
      marketing: level3MarketingQuestions,
    },
  },
  {
    id: 4,
    title: 'Your Questions',
    subtitle: 'Ce întrebări pui tu recrutorului?',
    icon: '❓',
    questions: level4Questions,
  },
  {
    id: 5,
    title: 'After the Interview',
    subtitle: 'În curând — pașii de follow-up',
    icon: '📨',
    questions: [],
  },
];

export const DOMAIN_LABELS: Record<Domain, { title: string; subtitle: string; icon: string }> = {
  hr: {
    title: 'HR & People',
    subtitle: 'Recrutare, evaluare, dezvoltare',
    icon: '👥',
  },
  marketing: {
    title: 'Marketing & Growth',
    subtitle: 'Campanii, KPI, brand',
    icon: '📊',
  },
};

export function getLevelQuestions(level: Level, domain: Domain): Question[] {
  if (level.domainScoped && level.questionsByDomain) {
    return level.questionsByDomain[domain];
  }
  return level.questions;
}

/* Career Navigators colour tokens */
export const Palette = {
  // Backgrounds
  appBg: '#FFFFFF',
  appDark: '#0F2A44',
  // Brand
  primary: '#58CC02',          // Duolingo-like green
  primaryDark: '#46A302',
  accent: '#FF9F1C',
  danger: '#E53935',
  // Status colours
  heart: '#FF3B30',
  star: '#FFC93C',
  xp: '#FFB020',
  streak: '#FF6B35',
  // Card / surface
  cardBg: '#F7F7F7',
  cardBorder: '#E5E5E5',
  cardLocked: '#F0F0F0',
  cardActiveBorder: '#FF9F1C',
  cardDoneBorder: '#58CC02',
  // Text
  textPrimary: '#0F1B2D',
  textSecondary: '#6B7280',
  textMuted: '#9CA3AF',
  // Review screen
  reviewBg: '#F3ECFF',
  reviewAccent: '#7C4DFF',
};
