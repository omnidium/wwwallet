export default {
  nav: {
    wallet: 'wwwallet',
    ethereum: '„Ethereum“',
    crypto: 'Kriptovaliuta',
    faqs: 'DUK',
    launch: 'Pradėkite naudoti „wwwallet“',
    home: 'Atgal į viršų',
    sectionNavLabel: 'Skyrių navigacija',
    principles: 'Principai',
  },
  settings: {
    open: 'Nustatymai',
    close: 'Uždaryti nustatymus',
    theme: 'Tema',
    themeLight: 'Trumpas',
    themeDark: 'Tamsus',
    language: 'Kalba',
    search: 'Paieška',
    noMatches: 'Nerasta atitikmenų',
    version: 'Versija {version}',
  },
  hero: {
    eyebrow: 'Nemokama, nekustodinė „Ethereum“ piniginė',
    heading1: 'Jūsų raktus.',
    heading2: 'Jūsų įrenginys.',
    heading3: 'Nemokama visiems.',
    lede: '„wwwallet“ veikia jūsų naršyklėje, o jūsų raktus saugo užšifruotus jūsų pačių įrenginyje. Nereikia kurti paskyros, nieko mokėti, nėra reklamų, o programa veikia vienodai visiems.',
    ctaPrimary: 'Pradėkite naudoti „wwwallet“',
    ctaSecondary: 'Pažiūrėkite, kaip tai veikia',
    note: 'Nereikia registruotis · Nėra reklamų · Nėra sekimo · 31 kalba',
  },
  wallet: {
    eyebrow: 'wwwallet',
    heading: 'Sukurta taip, kad tik jūs galėtumėte ją atidaryti',
    lede: '„wwwallet“ nesaugo jūsų lėšų – ji padeda jums patiems jas saugoti. Štai ką tai reiškia praktikoje.',
    points: [
      {
        title: 'Be saugojimo, visada',
        body: 'Jūsų privatūs raktai generuojami ir šifruojami jūsų pačių įrenginyje. „wwwallet“ serveriai jų niekada nemato – nėra jokios raktų duomenų bazės, kurią būtų galima įsilaužti, nes tokios duomenų bazės iš viso nėra.',
      },
      {
        title: 'Šifruota naudojant AES-256, atrakinama jūsų pasirinktu būdu',
        body: 'Jūsų saugykla apsaugota AES-256-GCM šifravimu. Atrakinkite ją naudodami atkūrimo frazę arba įjunkite prieigos raktą – „Face ID“, „Touch ID“ arba „Windows Hello“ – greitam, tik vietiniam prieigai.',
      },
      {
        title: 'Automatiškai užsirakina',
        body: '„wwwallet“ užsirakina po trumpo neveikimo laikotarpio ir niekada neįrašo jūsų atrakintos sesijos į diską – uždarykite skirtuką, ir programa tai sąmoningai pamirš.',
      },
      {
        title: 'Penkiolika „Ethereum“ tinklų, vienas sąskaitų rinkinys',
        body: 'Laikykite ir siųskite per „Ethereum“ pagrindinį tinklą ir dar 14 tinklų – įskaitant „Arbitrum“, „Base“, „Optimism“, „Polygon“, „Linea“ ir „ZKsync“ – naudodami tuos pačius paskyrus ir adresus.',
      },
    ],
    caveatTitle:
      'Jūsų atkūrimo frazė atrakina jūsų saugyklą – tai nėra stebuklinga atsarginė kopija',
    caveatBody:
      'Išsaugokite savo atkūrimo frazę saugioje vietoje, bet taip pat padarykite atsarginę kopiją „Google Drive“ arba failų saugykloje. Atsarginė kopija bus reikalinga, kad galėtumėte atkurti piniginę naujame įrenginyje, o frazė – kad ją atrakintumėte, kai tai padarysite.',
    caveatLink: 'Daugiau informacijos rasite DUK skyriuje',
  },
  ethereum: {
    eyebrow: '„Ethereum“',
    heading: 'Kodėl „Ethereum“',
    lede: '„wwwallet“ sukurta specialiai „Ethereum“ tinklui. Štai kodėl, paprastais žodžiais.',
    points: [
      {
        title: 'Pasaulinis kompiuteris, o ne tik apskaitos knyga',
        body: '„Ethereum“ perėmė „Bitcoin“ idėją apie bendrą, nuo klastojimo apsaugotą apskaitos knygą ir ją išplėtė: tai pasaulinis, programuojamas kompiuteris, kurį gali kurti bet kas, ir kurio nė viena šalis negali išjungti.',
      },
      {
        title: 'Apsaugota stakingu, o ne kasyba',
        body: 'Nuo 2022 m. įvykusio „The Merge“ Ethereum saugumas užtikrinamas naudojant „Proof-of-Stake“ (įnašo įrodymo) mechanizmą, o ne daug energijos reikalaujančią kasybą – validatoriai rizikuoja savo ETH kaip užstatu, o ne eikvoja elektros energiją, konkuruodami dėl blokų.',
      },
      {
        title: 'Atviras ir nereikalaujantis leidimų',
        body: 'Niekas nepatvirtina jūsų paskyros. Bet kas, bet kur, gali laikyti ETH arba kurti programą „Ethereum“ tinkle – visiems taikomos tos pačios taisyklės, įskaitant didžiausias institucijas.',
      },
      {
        title: 'Standartas, kuriuo remiasi kiti tinklai',
        body: '2-ojo lygmens tinklai, tokie kaip „Arbitrum“, „Base“ ir „Optimism“ – kuriuos visus palaiko „wwwallet“ – išplečia „Ethereum“ saugumą, užtikrindami greitesnius ir pigesnius sandorius, o ne pradėdami viską nuo nulio.',
      },
    ],
    linkLabel: 'Daugiau informacijos rasite „Ethereum“ fondo svetainėje',
    linkUrl: 'https://ethereum.org/en/foundation/',
  },
  crypto: {
    eyebrow: 'Kriptovaliuta',
    heading: 'Kriptovaliuta paprastais žodžiais',
    lede: 'Keletas sąvokų, kurias verta suprasti prieš pradedant laikyti bet kokią kriptovaliutą – ne tik naudojant „wwwallet“.',
    points: [
      {
        title: 'Saugomoji ir nesaugomoji',
        body: 'Saugomoji piniginė arba birža saugo jūsų raktus už jus – tai patogu, tačiau jūs pasitikite kitu asmeniu, kad jis neįšaldys, neprarastų ar nepiktnaudžiautų jūsų lėšomis. Nesaugomoji piniginė, pavyzdžiui, „wwwallet“, palieka raktus ir atsakomybę vien tik jūsų rankose.',
      },
      {
        title: 'Stakingas ir kasyba',
        body: '„Proof-of-Work“ kasyba užtikrina blokų grandinės saugumą naudojant grynąją skaičiavimo galią ir elektros energiją. „Proof-of-Stake“ užtikrina saugumą vietoj to naudojant rizikuojamą kapitalą. „Ethereum“ perėjimas prie stakingo sumažino energijos suvartojimą daugiau nei 99,9 % — tai maždaug atitinka skirtumą tarp mažos šalies ir mažo miestelio aprūpinimo elektra.',
      },
      {
        title: 'Ne tik „Ethereum“',
        body: '„Bitcoin“ pirmenybę teikia paprastumui ir nuspėjamumui, o ne programavimo galimybėms. Tokios grandinės kaip „Solana“ siekia didžiausio pralaidumo, dažnai aukodamos decentralizaciją, kad tai pasiektų. „Ethereum“ pirmiausia orientuojasi į decentralizaciją ir saugumą, o greitį ir sąnaudas palieka ant jo pagrįstoms 2-ojo lygmens tinklų sistemoms.',
      },
      {
        title: 'Nė vienas teisėtas asmuo neprašo jūsų frazės',
        body: 'Jokia birža, joks pagalbos tarnybos atstovas ir niekas iš „wwwallet“ niekada neprašys jūsų atkūrimo frazės – nesvarbu, kokią programėlę naudojate. Kas tai daro, tas bando jus apiplėšti.',
      },
    ],
    linkLabel: 'Sužinokite daugiau klausydami „Bankless“ podkasto',
    linkUrl: 'https://www.bankless.com/',
  },
  faqs: {
    eyebrow: 'DUK',
    heading: 'Dažnai užduodami klausimai',
    items: [
      {
        q: 'Ar „wwwallet“ tikrai nemokama?',
        a: 'Taip. Naudotis ja nemokama, nėra jokio „premium“ lygio ir nieko už mokamos sienos, o „wwwallet“ nepriskaičiuoja jokių mokesčių už siunčiamus ar keičiamus turimus. Vienintelė neišvengiama išlaida yra pačio tinklo sandorio (dujų) mokestis, kuris atitenka tinklui, o ne „wwwallet“. Keitimo kainos pateikiamos iš „0x“ biržų agregatoriaus (arba „LI.FI“, tinkle, kurio „0x“ neapima), kuris kai kuriose operacijose gali taikyti savo mokestį – bet koks toks mokestis yra nurodytas peržiūros ekrane prieš jums patvirtinant.',
      },
      {
        q: 'Ar yra reklamų, sekimo įrankių ar analizės priemonių?',
        a: 'Ne. „wwwallet“ nerodo jokių reklamų, nevykdo jokių analitikos ar sekimo skriptų ir nesudaro jūsų profilio. Čia nėra paskyros, todėl nėra prie ko ją susieti.',
      },
      {
        q: 'Ar norint ja naudotis reikia turėti paskyrą ar asmens tapatybės dokumentą?',
        a: 'Ne. Nereikia registruotis, nurodyti el. pašto adreso, telefono numerio ar tapatybės – piniginę susikuriate savo įrenginyje ir pradedate ja naudotis.',
      },
      {
        q: 'Jei programa nemokama, kaip „wwwallet“ padengia savo išlaidas?',
        a: 'Ji neuždirba pinigų iš savo vartotojų – jokių mokesčių, jokių reklamų, jokio duomenų pardavimo. Eksploatacijos išlaidos yra sąmoningai išlaikomos mažos: pati programėlė veikia jūsų naršyklėje, o serverinė dalis tik perduoda viešus blokų grandinės ir kainų duomenis.',
      },
      {
        q: 'Ar kas nors gali užblokuoti mano piniginę?',
        a: 'Čia nėra paskyros, todėl „wwwallet“ – ar bet kas kitas – neturi ką užšaldyti. Jūsų raktų niekada neišeina iš jūsų įrenginio, o sandoriai pasirašomi jame prieš siunčiant juos į tinklą. Jūsų lėšos saugomos „Ethereum“ tinkle, o ne „wwwallet“: bet kurios paskyros privatųjį raktą ar atkūrimo frazę galite peržiūrėti jos meniu ir importuoti į bet kurią kitą „Ethereum“ piniginės programėlę, kada tik norite.',
      },
      {
        q: 'Ar mano atkūrimo frazės pakanka, kad atgaučiau savo piniginę?',
        a: 'Ne atskirai. Jūsų atkūrimo frazė atrakina jūsų užšifruotą saugyklą, tačiau pati saugykla yra tik jūsų įrenginyje. Jei prarasite ar ištrinsite tą įrenginį, niekada nepadarę atsarginės kopijos, frazei nebeliks ko atrakinti. Visada derinkite savo atkūrimo frazę su „Google Drive“ arba failų atsargine kopija – žr. kitą klausimą.',
      },
      {
        q: 'Kaip padaryti piniginės atsarginę kopiją?',
        a: 'Nustatymuose atsarginę kopiją savo užšifruoto saugyklos turinio išsaugokite savo „Google Drive“ arba kaip failą, kurį atsisiųsite ir saugosite patys. „Drive“ atsarginė kopija patenka į privatų programos aplanką, o „wwwallet“ nemato nieko kito jūsų „Drive“ paskyroje. Atsarginę kopiją darykite pirmą kartą, kai nustatote programą, ir vėl kiekvieną kartą, kai pridedate sąskaitas.',
      },
      {
        q: 'Ar galiu naudoti „wwwallet“ daugiau nei viename įrenginyje?',
        a: 'Taip, tačiau ji nesinchronizuojama automatiškai – kiekvienas įrenginys turi savo vietinį saugyklą. Norėdami naudoti „wwwallet“ naujame įrenginyje, atkurkite ją iš „Drive“ arba failo atsarginės kopijos, tada atrakinkite naudodami atkūrimo frazę.',
      },
      {
        q: 'Kas atsitiks, jei prarasiu savo įrenginį ir niekada nebuvau padaręs atsarginės kopijos?',
        a: 'Jūsų lėšų atkurti neįmanoma. Taip sukurta sąmoningai: „wwwallet“ neturi sąskaitų sistemos ir niekur nesaugo jūsų saugyklos kopijos, todėl niekas – įskaitant mus – negali jos atkurti už jus. Tai kompromisas už raktus, prie kurių prieigą turite tik jūs.',
      },
      {
        q: 'Ar prieigos raktai („Face ID“ / „Touch ID“) perkeliami į naują įrenginį?',
        a: 'Ne. Prieigos raktas yra susietas su įrenginiu, kuriame jis buvo sukurtas. Atkūrus atsarginę kopiją naujame įrenginyje, atrakinkite jį naudodami atkūrimo frazę ir ten galėsite nustatyti naują prieigos raktą.',
      },
      {
        q: 'Ar „wwwallet“ yra atviro kodo?',
        a: 'Ne — jos šaltinis yra prieinamas. Visas šaltinis yra viešai paskelbtas „GitHub“ platformoje, todėl bet kas gali jį skaityti, peržiūrėti ir tikrinti, tačiau tai nėra atvirojo kodo projektas: kodas yra licencijuotas pagal „PolyForm Strict License 1.0.0“.',
      },
      {
        q: 'Ką man leidžiama daryti su kodu?',
        a: 'Jūs galite visą tekstą perskaityti ir patikrinti, taip pat naudoti nepakeistą kopiją nekomerciniais tikslais, pavyzdžiui, asmeniniams studijavimui, tyrimams ir testavimui. Jūs negalite jos platinti, keisti ar kurti išvestinių kūrinių (įskaitant šakojimus), taip pat negalite jos naudoti komerciniais tikslais. Jei jums reikia ko nors, ko licencija neleidžia, susisiekite su autorių teisių savininku dėl atskiros licencijos.',
      },
      {
        q: 'Ar „wwwallet“ naudoti saugu? Ar yra kokia nors garantija?',
        a: '„wwwallet“ yra nekustodinė programinė įranga, teikiama „tokia, kokia yra“, be jokių garantijų. Tik jūs vieni kontroliuojate savo raktus ir lėšas – niekas, įskaitant mus, negali atkurti prarastos atkūrimo frazės ar atsarginės kopijos, atšaukti sandorio ar kompensuoti jūsų nuostolių. Naudokite tik tas lėšas, kurias galite sau leisti prarasti, prieš siunčiant dar kartą patikrinkite adresus ir tinklus, o čia pateikta informacija nėra finansinė, investicinė, teisinė ar mokesčių konsultacija.',
      },
      {
        q: 'Kokius tinklus palaiko „wwwallet“?',
        a: '„Ethereum“ pagrindinis tinklas, taip pat „Arbitrum“, „Base“, „Optimism“, „Polygon“, „Robinhood Chain“, „World Chain“, „Ink“, „Linea“, „Gnosis“, „Celo“, „ZKsync Era“, „Ronin“, „Unichain“ ir „Scroll“ – visi iš to paties sąskaitų rinkinio.',
      },
      {
        q: 'Kaip įnešti lėšų į savo piniginę?',
        a: 'Atidarykite sąskaitą, pasirinkite „Peržiūrėti QR kodą“, kad pamatytumėte jos adresą, ir iš biržos ar kitos piniginės nusiųskite lėšas į tą adresą. Įsitikinkite, kad siunčiate per tinkamą tinklą (pavyzdžiui, „Ethereum“, „Base“ ar „Arbitrum“) – tas pats adresas veikia visuose palaikomuose tinkluose, tačiau viename tinkle išsiųstos lėšos atsiranda tik tame tinkle. Taip pat reikės šiek tiek tinklo vietinės valiutos (pavyzdžiui, ETH), kad galėtumėte sumokėti sandorio mokesčius.',
      },
      {
        q: 'Ką galiu daryti su „wwwallet“?',
        a: 'Siųsti: perveskite ETH arba bet kurį žetoną į adresą, kurį įklijuosite, nuskaitysite iš QR kodo arba pasirinksite iš savo sąskaitų, ir prieš patvirtindami peržiūrėkite duomenis. Keisti: „Swap“ skirtuke vieną žetoną iškeiskite į kitą tame pačiame tinkle, iš anksto matydami kainą ir mokesčių įvertinimą. Gauti: parodykite savo adresą kaip QR kodą. Taip pat galite peržiūrėti savo likučius, išreikštus JAV doleriais, ir sandorių istoriją visuose palaikomuose tinkluose.',
      },
      {
        q: 'Ką „wwwallet“ žino apie mane?',
        a: 'Niekas, kas galėtų jus identifikuoti. Čia nėra jokios paskyros, prisijungimo duomenų ar duomenų bazės. Duomenys apie likutį ir kainą gaunami per pačios „wwwallet“ vidinę sistemą, o ne per jūsų naršyklę, kuri tiesiogiai kreipiasi į trečiųjų šalių teikėjus, ir ta vidinė sistema niekada nemato jūsų raktų, slaptažodžių ar atkūrimo frazės.',
      },
    ],
  },
  footer: {
    tagline: 'Nemokama, nekustodinė „Ethereum“ piniginė, skirta visiems.',
    copyright: '© {year} wwwallet',
    licenseLink: 'Licencijuota pagal „PolyForm Strict 1.0.0“',
    disclaimer:
      'Programinė įranga be saugojimo teikiama „tokia, kokia yra“, be garantijos. Tai nėra finansinis patarimas. Jūs esate vienintelis atsakingas už savo raktus ir lėšas.',
  },
  principles: {
    eyebrow: 'Principai',
    heading: 'Nemokama, atvira ir sukurta visiems',
    lede: 'Programinė įranga, kurioje laikomi jūsų pinigai, turėtų būti įrankis, kurį naudojate, o ne verslas, pastatytas ant savo vartotojų. Tai yra įsipareigojimai, kuriais remiasi „wwwallet“.',
    items: [
      {
        title: 'Nemokama, be jokių gudrybių',
        body: 'Jokių kainų, jokių aukščiausios klasės paslaugų, jokių mokamų funkcijų. „wwwallet“ netaiko jokių savų mokesčių – vienintelė kaina yra paties tinklo sandorio mokestis.',
      },
      {
        title: 'Jokių reklamų, jokio sekimo',
        body: 'Jokių reklamų, jokių analitikos priemonių, jokių sekimo skriptų ir jokių duomenų pardavimo kam nors. Iš pradžių net nėra jūsų profilio, kurį būtų galima parduoti.',
      },
      {
        title: 'Nereikia registruotis',
        body: 'Nereikia el. pašto, telefono numerio ar tapatybės patikrinimo. Atidarykite programą, susikurkite piniginę – ir viskas paruošta.',
      },
      {
        title: 'Jūsų raktus saugote patys',
        body: 'Raktų kūrimas ir šifravimas vyksta jūsų įrenginyje, ir jie niekada neišeina iš jo. „wwwallet“ negali jų matyti, perkelti jūsų lėšų ar užblokuoti jūsų prieigos.',
      },
      {
        title: 'Veikia visur',
        body: 'Veikia bet kurioje šiuolaikinėje naršyklėje telefone ar kompiuteryje ir įdiegiama kaip programėlė – nereikia turėti paskyros programėlių parduotuvėje.',
      },
      {
        title: '31 kalba',
        body: 'Naudokite ją ta kalba, kuria jums patogiausia, šviesiuoju arba tamsuoju režimu.',
      },
      {
        title: 'Atviras kodas',
        body: 'Visas kodas yra paskelbtas, kad bet kas galėtų jį perskaityti ir patikrinti. Tai yra „source-available“, o ne „open source“ – dažnai užduodamuose klausimuose paaiškinama, ką leidžia licencija.',
      },
      {
        title: 'Nereikia nieko išjungti',
        body: 'Nėra jokios sąskaitos, kurią kas nors galėtų užšaldyti. Jūsų lėšos saugomos pačiame „Ethereum“ tinkle, o bet kurios sąskaitos raktą bet kuriuo metu galima perkelti į kitą piniginę.',
      },
    ],
  },
  license: {
    title: 'Licencija',
    close: 'Uždaryti',
    summaryTitle: 'Paprasta anglų kalba',
    canUse: '„wwwallet“ galite naudoti nemokamai asmeniniams ir kitiems nekomerciniams tikslams.',
    canRead: 'Galite perskaityti ir patikrinti kiekvieną šios programos šaltinio kodo eilutę.',
    cannot: 'Jūs negalite jo kopijuoti, keisti, platinti ar parduoti.',
    englishNote:
      'Toliau pateikiama visa licencija originalo kalba – anglų – tai yra teisinis tekstas.',
    viewSource: 'Peržiūrėti šaltinį „GitHub“',
  },
  meta: {
    title: 'wwwallet — Nemokama, nekustodinė „Ethereum“ piniginė',
    description:
      'Nemokama „Ethereum“ piniginė jūsų naršyklėje. Nereikia registruotis, nėra reklamų, nėra sekimo – jūsų raktų duomenys lieka užšifruoti jūsų įrenginyje. „Ethereum“, „Base“, „Arbitrum“, „Optimism“, „Polygon“ ir dar 10 tinklų.',
  },
}
