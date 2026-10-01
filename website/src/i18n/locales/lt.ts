export default {
  nav: {
    wallet: 'Piniginė',
    ethereum: '„Ethereum“',
    crypto: 'Kriptovaliuta',
    faqs: 'Dažnai užduodami klausimai',
    launch: 'Paleisti „Wallet“',
    home: 'Atgal į viršų',
    sectionNavLabel: 'Skyrių navigacija',
  },
  settings: {
    open: 'Nustatymai',
    close: 'Uždaryti nustatymus',
    theme: 'Tema',
    themeLight: 'Šviesa',
    themeDark: 'Tamsus',
    language: 'Kalba',
  },
  hero: {
    eyebrow: 'Asmeninė „Ethereum“ piniginė, kurioje lėšos nesaugomos',
    heading1: 'Jūsų raktai.',
    heading2: 'Jūsų įrenginys.',
    heading3: 'Jūsų piniginė.',
    lede: '„wwwallet“ šifruoja jūsų piniginę jūsų pačių įrenginyje ir niekada nesiunčia jūsų raktų, slaptažodžių ar atkūrimo frazės į jokią kitą vietą. Nereikia kurti paskyros. Nėra serverio, kurį būtų galima įsilaužti. Tik jūs ir jūsų kriptovaliuta.',
    ctaPrimary: 'Paleisti piniginę',
    ctaSecondary: 'Pažiūrėkite, kaip tai veikia',
  },
  wallet: {
    eyebrow: 'Piniginė',
    heading: 'Sukurtas taip, kad jį galėtum atidaryti tik tu',
    lede: '„wwwallet“ nesaugo jūsų lėšų – ji padeda jums patiems jas saugoti. Štai ką tai reiškia praktikoje.',
    points: [
      {
        title: 'Be saugojimo, visada',
        body: 'Jūsų privatūs raktai generuojami ir šifruojami jūsų pačių įrenginyje. „wwwallet“ serveriai jų niekada nemato – nėra jokios piniginių duomenų bazės, kurią būtų galima įsilaužti, nes tokios duomenų bazės iš viso nėra.',
      },
      {
        title: 'Šifruota naudojant AES-256, atrakinama jūsų pasirinktu būdu',
        body: 'Jūsų saugykla apsaugota naudojant AES-256-GCM šifravimą. Atrakinkite ją naudodami atkūrimo frazę arba įjunkite prieigos raktą – „Face ID“, „Touch ID“ arba „Windows Hello“ – kad galėtumėte greitai prisijungti tik lokaliai.',
      },
      {
        title: 'Užsirakina automatiškai',
        body: '„wwwallet“ užsirakina po trumpo neveikimo laikotarpio ir niekada neįrašo jūsų atrakintos sesijos į diską – uždarykite skirtuką, ir programa sąmoningai viską pamiršta.',
      },
      {
        title: 'Viena piniginė, penki „Ethereum“ tinklai',
        body: 'Laikykite ir siųskite per „Ethereum“ pagrindinį tinklą, „Polygon“, „Arbitrum“, „Base“ ir „Optimism“ naudodami tą patį sąskaitų rinkinį.',
      },
    ],
    caveatTitle:
      'Jūsų atkūrimo frazė atrakina jūsų saugyklą — tai nėra stebuklinga atsarginė kopija',
    caveatBody:
      'Išsaugokite atkūrimo frazę saugioje vietoje, taip pat pasirūpinkite atsargine kopija „Google Drive“ arba kitoje vietoje. Atsarginė kopija bus reikalinga, kad galėtumėte atkurti savo piniginę naujame įrenginyje, o frazė – kad ją atrakintumėte, kai tai padarysite.',
    caveatLink: 'Daugiau informacijos rasite dažnai užduodamų klausimų skyriuje',
  },
  ethereum: {
    eyebrow: '„Ethereum“',
    heading: 'Kodėl „Ethereum“?',
    lede: '„wwwallet“ yra sukurtas specialiai „Ethereum“ pagrindu. Štai kodėl taip yra, paprastais žodžiais tariant.',
    points: [
      {
        title: 'Pasaulinis kompiuteris, o ne tik apskaitos knyga',
        body: '„Ethereum“ perėmė „Bitcoin“ idėją apie bendrą, nuo klastojimo apsaugotą apskaitos knygą ir ją išplėtė: tai pasaulinis, programuojamas kompiuteris, kurį gali plėtoti bet kas, o nė viena šalis negali jo išjungti.',
      },
      {
        title: 'Užtikrinama stakingu, o ne kasyba',
        body: 'Nuo 2022 m. įvykusio „Merge“ „Ethereum“ saugumas užtikrinamas naudojant „Proof-of-Stake“ mechanizmą, o ne daug energijos reikalaujančią kasybą – validatoriai kaip užstatą rizikuoja savo ETH, o ne eikvoja elektros energiją, siekdami konkuruoti dėl blokų.',
      },
      {
        title: 'Atviras ir nereikalaujantis leidimų',
        body: 'Niekas nepatvirtina jūsų paskyros. Bet kas, bet kur gali laikyti ETH arba kurti programą „Ethereum“ tinkle — visiems taikomos tos pačios taisyklės, įskaitant didžiausias institucijas.',
      },
      {
        title: 'Standartas, kuriuo remiasi kiti tinklai',
        body: '2-ojo lygmens tinklai, tokie kaip „Arbitrum“, „Base“ ir „Optimism“ — kuriuos visus palaiko „wwwallet“ — išplečia „Ethereum“ saugumą, leidžiant atlikti greitesnius ir pigesnius sandorius, o ne kurti viską nuo nulio.',
      },
    ],
    linkLabel: 'Daugiau informacijos rasite „Ethereum“ fondo svetainėje',
    linkUrl: 'https://ethereum.org/en/foundation/',
  },
  crypto: {
    eyebrow: 'Kriptovaliuta',
    heading: 'Kriptovaliuta paprastais žodžiais',
    lede: 'Keletas sąvokų, kurias verta suprasti prieš pradedant laikyti kriptovaliutą – ne tik naudojant „wwwallet“.',
    points: [
      {
        title: 'Su globos teisėmis ir be globos teisių',
        body: 'Saugojimo tipo piniginė arba birža saugo jūsų raktus už jus — tai patogu, tačiau jūs pasitikite kitu asmeniu, kad jis neįšaldys, neprarastų ar nepiktnaudžiautų jūsų lėšomis. Nesaugojimo tipo piniginė, pavyzdžiui, wwwallet, raktus ir atsakomybę palieka vien tik jūsų rankose.',
      },
      {
        title: 'Stakingas ir kasyba',
        body: '„Proof-of-Work“ kasyba užtikrina blokų grandinės saugumą naudojant grynąją skaičiavimo galią ir elektros energiją. Tuo tarpu „Proof-of-Stake“ užtikrina saugumą naudojant rizikuojamą kapitalą. „Ethereum“ perėjimas prie stakingo sumažino energijos suvartojimą daugiau nei 99,9 % — tai maždaug atitinka skirtumą tarp mažos šalies ir mažo miestelio aprūpinimo elektros energija.',
      },
      {
        title: 'Už „Ethereum“ ribų',
        body: '„Bitcoin“ pirmenybę teikia paprastumui ir nuspėjamumui, o ne programavimo galimybėms. Tokios grandinės kaip „Solana“ siekia didžiausio pralaidumo, dažnai aukodamos decentralizaciją, kad tai pasiektų. „Ethereum“ pirmiausia orientuojasi į decentralizaciją ir saugumą, o greitį ir sąnaudas palieka ant jo pagrindu sukurtiems 2-ojo lygmens tinklams.',
      },
      {
        title: 'Nė vienas sąžiningas asmuo neprašo jūsų slaptažodžio',
        body: 'Nesvarbu, kokią piniginę naudojate: nei birža, nei pagalbos tarnybos atstovas, nei „wwwallet“ darbuotojas niekada neprašys jūsų atkūrimo frazės. Jei kas nors to prašo, jis bando jus apiplėšti.',
      },
    ],
    linkLabel: 'Sužinokite daugiau klausydamiesi „Bankless“ podkasto',
    linkUrl: 'https://www.bankless.com/',
  },
  faqs: {
    eyebrow: 'Dažnai užduodami klausimai',
    heading: 'Dažnai užduodami klausimai',
    items: [
      {
        q: 'Ar mano atkūrimo frazės pakanka, kad atgaučiau savo piniginę?',
        a: 'Ne, ne vien tik ji. Jūsų atkūrimo frazė atrakina užšifruotą saugyklą, tačiau pati saugykla yra tik jūsų įrenginyje. Jei prarasite tą įrenginį arba ištrinsite jo turinį, niekada nepadarę atsarginės kopijos, frazė nebeturės ko atrakinti. Visada derinkite savo atkūrimo frazę su „Google Drive“ arba failų atsargine kopija – žr. kitą klausimą.',
      },
      {
        q: 'Kaip padaryti piniginės atsarginę kopiją?',
        a: 'Meniu „Nustatymai“ atlikite užšifruoto seifo atsarginę kopiją į savo „Google Drive“ – ji bus saugoma privačiame, tik programėlei skirtame aplanke, kurio likusios dalies „wwwallet“ nemato – arba kaip failą, kurį atsisiųsite ir saugosite patys. Tai darykite kiekvieną kartą, kai kuriate piniginę arba pridedate naujas sąskaitas.',
      },
      {
        q: 'Ar galiu naudoti „wwwallet“ daugiau nei viename įrenginyje?',
        a: 'Taip, tačiau sinchronizacija nevyksta automatiškai – kiekviename įrenginyje saugoma atskira vietinė saugykla. Norėdami naudoti „wwwallet“ naujame įrenginyje, atkurkite jį iš „Drive“ arba failo atsarginės kopijos, tada atrakinkite naudodami atkūrimo frazę.',
      },
      {
        q: 'Kas atsitiks, jei prarasiu savo įrenginį ir niekada nebuvau padaręs atsarginės kopijos?',
        a: 'Jūsų lėšų atgauti neįmanoma. Taip sukurta sąmoningai: „wwwallet“ neturi sąskaitų sistemos ir niekur nesaugo jūsų saugyklos kopijos, todėl niekas – įskaitant ir mus – negali jos jums atkurti. Tai yra kompromisas, kurį tenka priimti, norint turėti piniginę, prie kurios prieigą turite tik jūs.',
      },
      {
        q: 'Ar prieigos raktai („Face ID“ / „Touch ID“) perkeliami į naują įrenginį?',
        a: 'Ne. Prieigos raktas yra susietas su įrenginiu, kuriame jis buvo sukurtas. Atkūrus atsarginę kopiją naujame įrenginyje, atrakinkite jį naudodami atkūrimo frazę – tada jame galėsite nustatyti naują prieigos raktą.',
      },
      {
        q: 'Ar „wwwallet“ yra atvirojo kodo?',
        a: 'Šaltinis yra viešai prieinamas „GitHub“ svetainėje, todėl jį gali peržiūrėti bet kas. Kol kas jis nėra išleistas pagal atvirojo kodo licenciją, todėl kol kas laikykite jį viešai prieinamu peržiūrai, o ne atvirojo kodo projektu.',
      },
      {
        q: 'Kokius tinklus palaiko „wwwallet“?',
        a: '„Ethereum“ pagrindinis tinklas bei „Layer-2“ tinklai „Polygon“, „Arbitrum“, „Base“ ir „Optimism“ – visi iš to paties sąskaitų rinkinio.',
      },
      {
        q: 'Ką „wwwallet“ žino apie mane?',
        a: 'Jokių duomenų, pagal kuriuos būtų galima jus atpažinti. Nėra jokios paskyros, prisijungimo duomenų ar duomenų bazės. Duomenys apie likutį ir kainą gaunami per pačios „wwwallet“ vidinę sistemą, o ne per jūsų naršyklę, kuri tiesiogiai kreipiasi į trečiųjų šalių paslaugų teikėjus, ir ta vidinė sistema niekada nemato jūsų raktų, slaptažodžių ar atkūrimo frazės.',
      },
    ],
  },
  footer: {
    tagline: 'Asmeninė „Ethereum“ piniginė, kurioje lėšos nesaugomos.',
    sourceLink: 'Peržiūrėti šaltinį „GitHub“ svetainėje',
    copyright: '© {year} wwwallet',
  },
}
