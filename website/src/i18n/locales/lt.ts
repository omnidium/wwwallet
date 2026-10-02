export default {
  nav: {
    wallet: 'Piniginė',
    ethereum: '„Ethereum“',
    crypto: 'Kriptovaliuta',
    faqs: 'Dažnai užduodami klausimai',
    launch: 'Paleisti „Wallet“',
    home: 'Atgal į viršų',
    sectionNavLabel: 'Skyrių navigacija',
    principles: 'Principai',
  },
  settings: {
    open: 'Nustatymai',
    close: 'Uždaryti nustatymus',
    theme: 'Tema',
    themeLight: 'Šviesa',
    themeDark: 'Tamsus',
    language: 'Kalba',
    search: 'Paieška',
    noMatches: 'Nerasta atitikmenų',
  },
  hero: {
    eyebrow: 'Nemokama „Ethereum“ piniginė be saugojimo funkcijos',
    heading1: 'Tavo raktai.',
    heading2: 'Jūsų įrenginys.',
    heading3: 'Nemokama visiems.',
    lede: '„wwwallet“ veikia jūsų naršyklėje, o jūsų raktus saugo užšifruotus jūsų pačių įrenginyje. Nereikia kurti paskyros, nieko mokėti ir nėra reklamų – tiesiog piniginė, kuri visiems veikia vienodai.',
    ctaPrimary: 'Paleisti piniginę',
    ctaSecondary: 'Pažiūrėkite, kaip tai veikia',
    note: 'Nereikia registruotis · Nėra reklamų · Nėra sekimo · 31 kalba',
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
        q: 'Ar „wwwallet“ tikrai nemokamas?',
        a: 'Taip. Naudotis šia paslauga nemokama, nėra jokio „premium“ lygio ar turinio, prieinamo tik už mokestį, o „wwwallet“ netaiko jokių mokesčių už siunčiamus ar keičiamus lėšų kiekius. Vienintelės neišvengiamos išlaidos – tai pačio tinklo sandorio (dujų) mokestis, kuris atitenka tinklui, o ne „wwwallet“. Keitimo pasiūlymai gaunami iš „0x“ biržų agregatoriaus, kuris kai kuriems sandoriams gali taikyti savo mokestį – bet koks toks mokestis yra nurodytas peržiūros ekrane prieš jums patvirtinant sandorį.',
      },
      {
        q: 'Ar yra reklamų, sekimo įrankių ar analizės priemonių?',
        a: 'Ne. „wwwallet“ nerodo jokių reklamų, nevykdo jokios analizės ar sekimo, taip pat nesudaro jūsų profilio. Čia nėra paskyros, taigi nėra prie ko ją susieti.',
      },
      {
        q: 'Ar norint juo naudotis reikia turėti paskyrą ar asmens tapatybės dokumentą?',
        a: 'Ne. Nereikia registruotis, nurodyti el. pašto adreso, telefono numerio ar patvirtinti tapatybės – tiesiog susikuriate piniginę savo įrenginyje ir pradedate ja naudotis.',
      },
      {
        q: 'Jei tai nemokama, kaip „wwwallet“ padengia savo išlaidas?',
        a: 'Ji neuždirba pinigų iš savo vartotojų – jokių mokesčių, jokių reklamų, jokio duomenų pardavimo. Eksploatacijos išlaidos sąmoningai išlaikomos mažos: pati piniginė veikia jūsų naršyklėje, o serverinė dalis tik perduoda viešus blokų grandinės ir kainų duomenis.',
      },
      {
        q: 'Ar kas nors gali užšaldyti mano piniginę?',
        a: 'Nėra jokios sąskaitos, todėl „wwwallet“ – ar bet kas kitas – neturi ko užšaldyti. Jūsų raktų niekada neiškeliauja iš jūsų įrenginio, o sandoriai pasirašomi jame prieš siunčiant juos į tinklą. Jūsų lėšos saugomos „Ethereum“ tinkle, o ne „wwwallet“: iš bet kurios sąskaitos meniu galite peržiūrėti jos privatųjį raktą arba atkūrimo frazę ir bet kada juos importuoti į kitą „Ethereum“ piniginę.',
      },
      {
        q: 'Ar mano atkūrimo frazės pakanka, kad atgaučiau savo piniginę?',
        a: 'Ne, ne viena. Jūsų atkūrimo frazė atrakina užšifruotą saugyklą, tačiau pati saugykla saugoma tik jūsų įrenginyje. Jei prarasite tą įrenginį arba ištrinsite jo turinį, niekada nepadarę atsarginės kopijos, frazė nebeturės ką atrakinti. Visada derinkite savo atkūrimo frazę su „Google Drive“ arba failų atsargine kopija – žr. kitą klausimą.',
      },
      {
        q: 'Kaip padaryti piniginės atsarginę kopiją?',
        a: 'Meniu „Nustatymai“ sukurkite savo šifruoto seifo atsarginę kopiją savo „Google Drive“ paskyroje – ji bus saugoma privačiame, tik programai skirtame aplanke, kurio likusios dalies „wwwallet“ nemato – arba kaip failą, kurį atsisiųsite ir saugosite patys. Tai darykite kiekvieną kartą, kai kuriate piniginę arba pridedate naujas sąskaitas.',
      },
      {
        q: 'Ar galiu naudoti „wwwallet“ daugiau nei viename įrenginyje?',
        a: 'Taip, tačiau sinchronizacija nevyksta automatiškai — kiekviename įrenginyje saugoma atskira vietinė saugykla. Norėdami naudoti „wwwallet“ naujame įrenginyje, atkurkite jį iš „Drive“ arba failo atsarginės kopijos, tada atrakinkite naudodami atkūrimo frazę.',
      },
      {
        q: 'Kas atsitiks, jei prarasiu savo įrenginį ir niekada nebuvau padaręs atsarginės kopijos?',
        a: 'Jūsų lėšų atkurti neįmanoma. Taip yra numatyta: „wwwallet“ neturi sąskaitų sistemos ir niekur nesaugo jūsų saugyklos kopijos, todėl niekas – net ir mes – negalime jos jums atkurti. Tai yra kompromisas, kurį tenka priimti, norint turėti piniginę, prie kurios prieigą turite tik jūs.',
      },
      {
        q: 'Ar prieigos raktai („Face ID“ / „Touch ID“) perkeliami į naują įrenginį?',
        a: 'Ne. Prieigos raktas yra susietas su įrenginiu, kuriame jis buvo sukurtas. Atkūrus atsarginę kopiją naujame įrenginyje, atrakinkite jį naudodami atkūrimo frazę, ir ten galėsite nustatyti naują prieigos raktą.',
      },
      {
        q: 'Ar „wwwallet“ yra atvirojo kodo programa?',
        a: 'Ne — jo šaltinis yra prieinamas. Visas kodas viešai skelbiamas „GitHub“ platformoje, todėl bet kas gali jį skaityti, peržiūrėti ir patikrinti, tačiau tai nėra atvirojo kodo projektas: kodas licencijuojamas pagal „PolyForm Strict License 1.0.0“.',
      },
      {
        q: 'Ką man leidžiama daryti su šiuo kodu?',
        a: 'Jūs galite visą jį perskaityti ir patikrinti, taip pat naudoti nepakeistą kopiją nekomerciniais tikslais, pavyzdžiui, asmeniniams studijavimams, tyrimams ir bandymams. Jūs negalite jos platinti, keisti ar kurti išvestinių kūrinių (įskaitant šakinius projektus), taip pat negalite jos naudoti komerciniais tikslais. Jei jums reikia ko nors, ko licencija neleidžia, susisiekite su autorių teisių savininku dėl atskiros licencijos.',
      },
      {
        q: 'Ar „wwwallet“ naudoti saugu? Ar suteikiama kokia nors garantija?',
        a: '„wwwallet“ yra nepatikėtinė programinė įranga, teikiama „tokia, kokia yra“, be jokių garantijų. Tik jūs pats valdote savo raktus ir lėšas – niekas, įskaitant mus, negali atkurti prarastos atkūrimo frazės ar atsarginės kopijos, atšaukti sandorio ar kompensuoti jūsų nuostolių. Naudokite tik tas lėšas, kurias galite sau leisti prarasti, prieš siunčiant dar kartą patikrinkite adresus ir tinklus, o ši informacija nėra finansinė, investicinė, teisinė ar mokesčių konsultacija.',
      },
      {
        q: 'Kokius tinklus palaiko „wwwallet“?',
        a: '„Ethereum“ pagrindinis tinklas bei „Layer-2“ tinklai „Polygon“, „Arbitrum“, „Base“ ir „Optimism“ – visi iš to paties sąskaitų rinkinio.',
      },
      {
        q: 'Kaip įnešti lėšų į savo piniginę?',
        a: 'Atidarykite sąskaitą, pasirinkite „Peržiūrėti QR kodą“, kad pamatytumėte jos adresą, ir iš biržos ar kitos piniginės perveskite lėšas į tą adresą. Įsitikinkite, kad siunčiate per tinkamą tinklą („Ethereum“, „Polygon“, „Arbitrum“, „Base“ arba „Optimism“) – tas pats adresas veikia visuose šiuose tinkluose, tačiau per vieną tinklą pervestos lėšos atsiranda tik tame tinkle. Be to, jums reikės šiek tiek to tinklo vietinės valiutos (pavyzdžiui, ETH), kad galėtumėte sumokėti sandorio mokesčius.',
      },
      {
        q: 'Ką galiu daryti naudodamasis „wwwallet“?',
        a: 'Siųsti: perveskite ETH arba bet kokį žetoną į adresą, kurį įklijuosite, nuskaitysite iš QR kodo arba pasirinksite iš savo sąskaitų, ir prieš patvirtindami peržiūrėkite duomenis. Keisti: „Swap“ skirtuke vieną žetoną iškeiskite į kitą tame pačiame tinkle – iš anksto bus rodoma kaina ir numatomas mokestis. Gauti: parodykite savo adresą kaip QR kodą. Taip pat galite peržiūrėti savo likučius, išreikštus JAV doleriais, ir sandorių istoriją visuose palaikomuose tinkluose.',
      },
      {
        q: 'Ką „wwwallet“ žino apie mane?',
        a: 'Jokių duomenų, pagal kuriuos būtų galima jus atpažinti. Čia nėra jokios paskyros, prisijungimo duomenų ar duomenų bazės. Duomenys apie likutį ir kainą gaunami per pačios „wwwallet“ vidinę sistemą, o ne per jūsų naršyklę, kuri tiesiogiai kreiptųsi į trečiųjų šalių paslaugų teikėjus, ir ta vidinė sistema niekada nemato jūsų raktų, slaptažodžių ar atkūrimo frazės.',
      },
    ],
  },
  footer: {
    tagline: 'Nemokama „Ethereum“ piniginė be saugojimo paslaugos, skirta visiems.',
    copyright: '© {year} wwwallet',
    licenseLink: 'Licencija suteikta pagal „PolyForm Strict 1.0.0“',
    disclaimer:
      'Programinė įranga, neteikianti saugojimo paslaugų, teikiama „tokia, kokia yra“, be jokių garantijų. Tai nėra finansinis patarimas. Jūs esate vienintelis atsakingas už savo raktus ir lėšas.',
  },
  principles: {
    eyebrow: 'Principai',
    heading: 'Nemokama, atvira ir sukurta visiems',
    lede: 'Piniginė turėtų būti įrankis, kurį naudojate, o ne verslas, grindžiamas savo vartotojais. Šie įsipareigojimai yra pagrindas, kuriuo remiasi „wwwallet“.',
    items: [
      {
        title: 'Nemokamai, be jokių gudrybių',
        body: 'Jokių kainų, jokių aukštesnių paslaugų lygių, jokių mokamų funkcijų. „wwwallet“ netaiko jokių savų mokesčių – vienintelės išlaidos yra pačio tinklo sandorio mokestis.',
      },
      {
        title: 'Jokių reklamų, jokio sekimo',
        body: 'Jokių reklamų, jokių analitikos įrankių, jokių sekimo skriptų ir jokių duomenų pardavimo kitiems. Iš tiesų, net nėra jokio jūsų profilio, kurį būtų galima parduoti.',
      },
      {
        title: 'Nereikia registruotis',
        body: 'Nereikia nurodyti el. pašto adreso, telefono numerio ar tapatybės dokumento. Atidarykite programą, susikurkite piniginę – ir viskas paruošta.',
      },
      {
        title: 'Jūsų raktai lieka su jumis',
        body: 'Raktų kūrimas ir šifravimas vyksta jūsų įrenginyje, jie niekada neišeina iš jo. „wwwallet“ negali jų matyti, perkelti jūsų lėšų ar užblokuoti jūsų prieigos.',
      },
      {
        title: 'Veikia bet kur',
        body: 'Veikia bet kurioje šiuolaikinėje naršyklėje telefone ar kompiuteryje, o įdiegiamas kaip programėlė — nereikia turėti paskyros programėlių parduotuvėje.',
      },
      {
        title: '31 kalba',
        body: 'Naudokite jį ta kalba, kuria jums patogiausia, šviesiuoju arba tamsuoju režimu.',
      },
      {
        title: 'Atviras kodas',
        body: 'Visas kodas yra paskelbtas, kad kiekvienas galėtų jį perskaityti ir patikrinti. Tai yra „source-available“, o ne „open source“ – dažnai užduodamų klausimų skyriuje paaiškinama, ką leidžia ši licencija.',
      },
      {
        title: 'Nėra ko išjungti',
        body: 'Nėra jokios sąskaitos, kurią kas nors galėtų užšaldyti. Jūsų lėšos saugomos pačiame „Ethereum“ tinkle, o bet kurios sąskaitos raktą bet kuriuo metu galima perkelti į kitą piniginę.',
      },
    ],
  },
  license: {
    title: 'Licencija',
    close: 'Uždaryti',
    summaryTitle: 'Paprastai tariant',
    canUse: '„wwwallet“ galite naudoti nemokamai asmeniniams ir kitiems nekomerciniams tikslams.',
    canRead: 'Galite perskaityti ir patikrinti kiekvieną jo šaltinio kodo eilutę.',
    cannot: 'Jūs negalite jo kopijuoti, keisti, platinti ar parduoti.',
    englishNote:
      'Toliau pateikiama visa licencija originalo kalba – anglų kalba; tai yra teisinis tekstas.',
    viewSource: 'Peržiūrėti „GitHub“ svetainėje',
  },
}
