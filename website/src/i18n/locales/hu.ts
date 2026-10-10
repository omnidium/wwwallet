export default {
  nav: {
    wallet: 'wwwallet',
    ethereum: 'Ethereum',
    crypto: 'Kriptovaluta',
    faqs: 'GYIK',
    launch: 'Indítsa el a wwwallet alkalmazást',
    home: 'Vissza a tetejére',
    sectionNavLabel: 'Szekciók közötti navigáció',
    principles: 'Alapelvek',
  },
  settings: {
    open: 'Beállítások',
    close: 'Beállítások bezárása',
    theme: 'Téma',
    themeLight: 'Rövid',
    themeDark: 'Sötét',
    language: 'Nyelv',
    search: 'Keresés',
    noMatches: 'Nincs találat',
    version: 'Verzió {version}',
  },
  hero: {
    eyebrow: 'Egy ingyenes, nem letéti Ethereum-pénztárca',
    heading1: 'A kulcsai.',
    heading2: 'A készüléked.',
    heading3: 'Mindenki számára ingyenes.',
    lede: 'A wwwallet a böngészőben fut, és a kulcsokat titkosítva tárolja a saját eszközén. Nem kell fiókot létrehozni, nem kell fizetni, nincsenek hirdetések, és mindenki számára ugyanúgy működik.',
    ctaPrimary: 'Indítsa el a wwwallet-et',
    ctaSecondary: 'Nézze meg, hogyan működik',
    note: 'Nincs regisztráció · Nincs reklám · Nincs nyomon követés · 31 nyelv',
  },
  wallet: {
    eyebrow: 'wwwallet',
    heading: 'Úgy készült, hogy csak te tudd megnyitni',
    lede: 'A wwwallet nem őrzi a pénzeszközeit – hanem segít abban, hogy Ön maga őrizhesse azokat. Íme, mit jelent ez a gyakorlatban.',
    points: [
      {
        title: 'Mindig használja a „nem letéti” kifejezést',
        body: 'A privát kulcsok a saját eszközödön kerülnek generálásra és titkosításra. A wwwallet szerverei soha nem látják őket – nincs olyan kulcsadatbázis, amelyet feltörhetnének, mert egyáltalán nincs adatbázis.',
      },
      {
        title: 'AES-256-tal titkosítva, a saját módszereddel nyitható',
        body: 'A tárhelyét AES-256-GCM titkosítás védi. Nyissa meg a helyreállítási kifejezéssel, vagy engedélyezzen egy jelszót – Face ID, Touch ID vagy Windows Hello – a gyors, kizárólag helyi hozzáférés érdekében.',
      },
      {
        title: 'Automatikusan lezáródik',
        body: 'A wwwallet rövid inaktivitás után lezárul, és soha nem menti a feloldott munkamenetet a merevlemezre – ha bezárja a lapot, az alkalmazás szándékosan elfelejti az adatokat.',
      },
      {
        title: 'Tizenöt Ethereum-hálózat, egy fiókkészlet',
        body: 'Tartson és küldjön az Ethereum főhálózaton és további 14 hálózaton – beleértve az Arbitrumot, a Base-t, az Optimismet, a Polygont, a Lineát és a ZKsync-et – ugyanazokkal a fiókokkal és címekkel.',
      },
    ],
    caveatTitle:
      'A helyreállítási kifejezés nyitja meg a tárházadat – ez nem egy varázslatos biztonsági másolat',
    caveatBody:
      'Tárold a helyreállítási kifejezést biztonságos helyen, de készíts róla biztonsági másolatot a Google Drive-on vagy egy fájlban is. A biztonsági másolatra szükséged lesz a pénztárca új eszközön történő visszaállításához, a kifejezésre pedig a feloldásához, miután ezt megtetted.',
    caveatLink: 'További információk a GYIK-ben',
  },
  ethereum: {
    eyebrow: 'Ethereum',
    heading: 'Miért az Ethereum?',
    lede: 'A wwwallet kifejezetten az Ethereumra épül. Íme az érvek mellette, egyszerű szavakkal.',
    points: [
      {
        title: 'Egy világszintű számítógép, nem csupán egy főkönyv',
        body: 'Az Ethereum átvette a Bitcoin közös, hamisíthatatlan főkönyv koncepcióját, és továbbfejlesztette: egy globális, programozható számítógép lett belőle, amelyre bárki építhet, és amelyet egyetlen fél sem tud kikapcsolni.',
      },
      {
        title: 'Stakinggel biztosított, nem bányászattal',
        body: 'A 2022-es „Merge” óta az Ethereumot a Proof-of-Stake biztosítja az energiaigényes bányászat helyett – a validátorok az ETH-t kockáztatják biztosítékként, ahelyett, hogy áramot fogyasztanának a blokkokért folyó versenyben.',
      },
      {
        title: 'Nyitott és engedélyezésmentes',
        body: 'Senki sem hagyja jóvá a fiókodat. Bárki, bárhol tarthat ETH-t vagy fejleszthet alkalmazást az Ethereumon – ugyanazok a szabályok vonatkoznak mindenkire, beleértve a legnagyobb intézményeket is.',
      },
      {
        title: 'A többi hálózat által alkalmazott szabvány',
        body: 'Az olyan 2. rétegű hálózatok, mint az Arbitrum, a Base és az Optimism – amelyeket a wwwallet mind támogat – kiterjesztik az Ethereum biztonságát a gyorsabb, olcsóbb tranzakciókra, ahelyett, hogy a nulláról kezdenék.',
      },
    ],
    linkLabel: 'További információk az Ethereum Alapítvány honlapján',
    linkUrl: 'https://ethereum.org/en/foundation/',
  },
  crypto: {
    eyebrow: 'Kriptovaluta',
    heading: 'A kriptovaluta egyszerű szavakkal',
    lede: 'Néhány fogalom, amelyet érdemes megérteni, mielőtt saját kriptovalutát tartana – nem csak a wwwallet segítségével.',
    points: [
      {
        title: 'Letéti vs. nem letéti',
        body: 'Egy letéti pénztárca vagy tőzsde őrzi a kulcsait – ez kényelmes, de ezzel másra bízza, hogy ne fagyassza be, ne veszítse el és ne használja fel visszaélésszerűen a pénzeszközeit. Egy nem letéti pénztárca, mint például a wwwallet, a kulcsokat és a felelősséget kizárólag az Ön kezében hagyja.',
      },
      {
        title: 'Staking vs. bányászat',
        body: 'A Proof-of-Work bányászat nyers számítási teljesítménnyel és villamos energiával biztosítja a blokklánc biztonságát. A Proof-of-Stake ezzel szemben kockázati tőkével biztosítja azt. Az Ethereum áttérése a stakingre több mint 99,9%-kal csökkentette az energiafogyasztását – ez nagyjából egy kis ország és egy kisváros energiaellátása közötti különbségnek felel meg.',
      },
      {
        title: 'Az Ethereumon túl',
        body: 'A Bitcoin az egyszerűséget és a kiszámíthatóságot részesíti előnyben a programozhatósággal szemben. Az olyan blokkláncok, mint a Solana, a nyers átviteli sebességet helyezik előtérbe, és ennek elérése érdekében gyakran feláldozzák a decentralizációt. Az Ethereum elsősorban a decentralizációra és a biztonságra helyezi a hangsúlyt, a sebességet és a költségeket pedig a rá épülő 2. rétegű hálózatokra bízza.',
      },
      {
        title: 'Egyetlen legitim személy sem kéri el tőled a kifejezésedet',
        body: 'Sem a tőzsde, sem az ügyfélszolgálat, sem a wwwallet egyetlen munkatársa sem fogja soha elkérni a helyreállítási kódját – függetlenül attól, hogy melyik alkalmazást használja. Aki ezt megkérdezi, az megpróbálja kirabolni Önt.',
      },
    ],
    linkLabel: 'Tudj meg többet a Bankless podcastból',
    linkUrl: 'https://www.bankless.com/',
  },
  faqs: {
    eyebrow: 'GYIK',
    heading: 'Gyakori kérdések',
    items: [
      {
        q: 'A wwwallet valóban ingyenes?',
        a: 'Igen. A használata ingyenes, nincs prémium szint és nincs fizetős tartalom, és a wwwallet semmilyen díjat nem számol fel az elküldött vagy cserélt összegekre. Az egyetlen elkerülhetetlen költség a hálózat saját tranzakciós (gáz) díja, amely a hálózatnak jut, nem pedig a wwwalletnek. A csereárak a 0x tőzsde-összesítőtől származnak (vagy a LI.FI-től, azokon a hálózatokon, amelyeket a 0x nem fed le), amely egyes tranzakciók esetén saját díjat számíthat fel – az ilyen díjakat a megerősítés előtt a visszajelzési képernyőn feltüntetik.',
      },
      {
        q: 'Vannak hirdetések, nyomkövetők vagy elemzések?',
        a: 'Nem. A wwwallet nem jelenít meg hirdetéseket, nem futtat elemzési vagy nyomkövető szkripteket, és nem készít rólad profilt. Nincs fiók, így nincs semmi, amihez kapcsolódhatna.',
      },
      {
        q: 'Szükségem van fiókra vagy azonosítóra a használatához?',
        a: 'Nem. Nincs regisztráció, e-mail-cím, telefonszám vagy személyazonosság-ellenőrzés – egyszerűen létrehoz egy pénztárcát a készülékén, és máris használhatja.',
      },
      {
        q: 'Ha ingyenes, hogyan fedezi a wwwallet a saját költségeit?',
        a: 'Az alkalmazás nem keres pénzt a felhasználóin – nincsenek díjak, nincsenek hirdetések, nincs adatértékesítés. A működési költségeket szándékosan alacsony szinten tartjuk: maga az alkalmazás a böngészőben fut, a háttérrendszer pedig csak a nyilvános blokklánc- és áradatokat továbbítja.',
      },
      {
        q: 'Lehet-e valaki befagyasztani a pénztárcámat?',
        a: 'Nincs fiók, így a wwwalletnek – vagy bárki másnak – nincs mit befagyasztania. A kulcsai soha nem hagyják el a készülékét, és a tranzakciókat ott írják alá, mielőtt a hálózatra kerülnének. A pénzeszközeid az Ethereumon vannak, nem a wwwalletben: bármely fiók privát kulcsát vagy helyreállítási kifejezését megtekintheted a menüből, és bármikor importálhatod bármely más Ethereum-pénztárcaalkalmazásba.',
      },
      {
        q: 'Elég a helyreállítási kifejezésem ahhoz, hogy visszakapjam a pénztárcámat?',
        a: 'Nem önmagában. A helyreállítási kifejezés feloldja a titkosított tárhelyedet, de maga a tárhely kizárólag a készülékeden található. Ha elveszíted vagy törlöd azt a készüléket anélkül, hogy valaha is készítettél volna róla biztonsági másolatot, akkor a kifejezésnek már nincs mit feloldania. Mindig párosítsd a helyreállítási kifejezésedet egy Google Drive-on vagy fájlban tárolt biztonsági másolattal – lásd a következő kérdést.',
      },
      {
        q: 'Hogyan készíthetek biztonsági másolatot a pénztárcámról?',
        a: 'A Beállítások menüpontból készítsen biztonsági másolatot a titkosított tárhelyéről a saját Google Drive-jára, vagy egy letöltött fájlba, amelyet magánál tart. A Drive-ra készített biztonsági másolat egy privát alkalmazásmappába kerül, és a wwwallet nem láthat semmit a Drive-on található egyéb tartalmakból. Készítsen biztonsági másolatot az első beállításkor, majd minden alkalommal, amikor fiókokat ad hozzá.',
      },
      {
        q: 'Használhatom a wwwallet-et több eszközön is?',
        a: 'Igen, de nem szinkronizálódik automatikusan – minden eszköz a saját helyi tárhelyét tárolja. Ha az wwwallet-et új eszközön szeretné használni, állítsa vissza onnan a Drive-ról vagy egy fájlmentésből, majd a helyreállítási kifejezéssel oldja fel a zárat.',
      },
      {
        q: 'Mi történik, ha elveszítem a készülékemet, és soha nem készítettem biztonsági másolatot?',
        a: 'A pénzeszközeit nem lehet helyreállítani. Ez a tervezésből adódik: a wwwallet nem rendelkezik fiókrendszerrel, és sehol sem tárol másolatot a tárcájáról, így senki – beleértve minket is – nem tudja azt helyreállítani az Ön számára. Ez az ára annak, hogy a kulcsokhoz senki más nem fér hozzá, csak Ön.',
      },
      {
        q: 'Átvihetők-e a jelszavak (Face ID / Touch ID) egy új eszközre?',
        a: 'Nem. A jelszó ahhoz az eszközhöz van kötve, amelyen létrehozták. Miután egy új eszközön visszaállította a biztonsági másolatot, a helyreállítási kifejezéssel oldja fel a zárat, és ott beállíthat egy új jelszót.',
      },
      {
        q: 'A wwwallet nyílt forráskódú?',
        a: 'Nem – a forráskód elérhető. A teljes forráskód nyilvános a GitHubon, így bárki elolvashatja, áttekintheti és ellenőrizheti, de nem nyílt forráskódú: a kód a PolyForm Strict License 1.0.0 licenc alatt áll.',
      },
      {
        q: 'Mit tehetek a kóddal?',
        a: 'Az egész szöveget elolvashatja és ellenőrizheti, valamint módosítatlan másolatot futtathat nem kereskedelmi célokra, például személyes tanulás, kutatás és tesztelés céljából. Nem terjesztheti, nem módosíthatja, nem készíthet belőle származékos művet (beleértve a forkokat sem), és nem használhatja kereskedelmi célokra. Ha olyanra van szüksége, amit a licenc nem engedélyez, vegye fel a kapcsolatot a szerzői jog tulajdonosával egy külön licenc megszerzése érdekében.',
      },
      {
        q: 'Biztonságos-e a wwwallet használata? Van-e rá garancia?',
        a: 'A wwwallet egy nem letéti szoftver, amelyet „adott állapotban” biztosítunk, bármiféle garancia nélkül. Kizárólag Ön rendelkezik a kulcsai és a pénzeszközei felett – senki, beleértve minket is, nem tudja helyreállítani az elveszett helyreállítási kifejezést vagy biztonsági másolatot, visszafordítani egy tranzakciót, vagy kártérítést nyújtani az Ön veszteségeiért. Csak olyan pénzeszközöket használjon, amelyek elvesztését megengedheti magának, küldés előtt kétszer ellenőrizze a címeket és a hálózatokat, és a jelen dokumentumban szereplő információk nem minősülnek pénzügyi, befektetési, jogi vagy adótanácsadásnak.',
      },
      {
        q: 'Mely hálózatokat támogatja a wwwallet?',
        a: 'Az Ethereum főhálózata, valamint az Arbitrum, a Base, az Optimism, a Polygon, a Robinhood Chain, a World Chain, az Ink, a Linea, a Gnosis, a Celo, a ZKsync Era, a Ronin, az Unichain és a Scroll – mind ugyanabból a fiókkészletből.',
      },
      {
        q: 'Hogyan tölthetem fel a pénztárcámat?',
        a: 'Nyisson fiókot, válassza a „QR-kód megtekintése” lehetőséget a cím megtekintéséhez, majd küldjön pénzt arra a címre egy tőzsdéről vagy egy másik pénztárcából. Győződjön meg arról, hogy a megfelelő hálózaton (például Ethereum, Base vagy Arbitrum) küldi el a pénzt – ugyanaz a cím minden támogatott hálózaton működik, de az egyik hálózaton elküldött pénzeszközök csak azon a hálózaton jelennek meg. Szüksége lesz egy kis mennyiségű hálózati natív érmére (például ETH-ra) is a tranzakciós díjak kifizetéséhez.',
      },
      {
        q: 'Mit tehetek a wwwallet segítségével?',
        a: 'Küldés: utaljon ETH-t vagy bármilyen tokent egy címre, amelyet beilleszt, QR-kódból beolvas, vagy saját fiókjaiból választ ki, és ellenőrizze a részleteket, mielőtt megerősíti a tranzakciót. Csere: cseréljen ki egy tokent egy másikra ugyanazon a hálózaton a „Swap” fülön, ahol előre megjelenik az árfolyam és a becsült díj. Fogadás: mutassa meg címét QR-kód formájában. Emellett megtekintheti egyenlegeit USD-értékben, valamint a tranzakciós előzményeket az összes támogatott hálózaton.',
      },
      {
        q: 'Mit tud rólam a wwwallet?',
        a: 'Semmi, ami azonosíthatná Önt. Nincs fiók, bejelentkezés vagy adatbázis. Az egyenleg- és áradatokat a wwwallet saját háttérrendszere tölti be, nem pedig a böngészője, amely közvetlenül harmadik fél szolgáltatókat hívna meg, és ez a háttérrendszer soha nem látja a kulcsait, jelszavait vagy helyreállítási kifejezését.',
      },
    ],
  },
  footer: {
    tagline: 'Egy ingyenes, nem letéti Ethereum-pénztárca mindenki számára.',
    copyright: '© {year} wwwallet',
    licenseLink: 'A PolyForm Strict 1.0.0 licenc alapján',
    disclaimer:
      'A nem letéti szoftvert „adott állapotban”, garancia nélkül biztosítjuk. Ez nem pénzügyi tanácsadás. A kulcsokért és a pénzeszközökért kizárólag Ön felel.',
  },
  principles: {
    eyebrow: 'Alapelvek',
    heading: 'Ingyenes, nyílt és bárki számára készült',
    lede: 'A pénzedet tároló szoftvernek olyan eszköznek kell lennie, amelyet te használsz, nem pedig egy, a felhasználóira épülő üzleti vállalkozásnak. Ezek azok az elvek, amelyekre a wwwallet épül.',
    items: [
      {
        title: 'Ingyenes, nincs csapda',
        body: 'Nincs ár, nincs prémium szint, nincsenek fizetős funkciók. A wwwallet nem számol fel saját díjakat – az egyetlen költség a hálózat saját tranzakciós díja.',
      },
      {
        title: 'Nincs reklám, nincs nyomon követés',
        body: 'Nincsenek hirdetések, nincsenek elemzések, nincsenek nyomkövető szkriptek, és senkinek nem adunk el adatokat. Eleve nincs rólad olyan profil, amit eladhatnánk.',
      },
      {
        title: 'Nincs regisztráció',
        body: 'Nincs e-mail-, telefonszám- vagy személyazonosság-ellenőrzés. Nyisd meg, hozz létre egy pénztárcát, és máris készen állsz.',
      },
      {
        title: 'A kulcsok nálad maradnak',
        body: 'A kulcsok a készüléken jönnek létre és kerülnek titkosításra, és soha nem hagyják el azt. A wwwallet nem láthatja őket, nem mozgathatja az egyenlegét, és nem zárhatja ki Önt a fiókból.',
      },
      {
        title: 'Bárhol működik',
        body: 'Bármely modern böngészőben fut, akár telefonon, akár asztali gépen, és úgy telepíthető, mint egy alkalmazás – nincs szükség app store-fiókra.',
      },
      {
        title: '31 nyelven',
        body: 'Használd azt a nyelvet, amelyben a legkényelmesebben érzed magad, világos vagy sötét módban.',
      },
      {
        title: 'Nyílt kód',
        body: 'A teljes forráskódot közzétettük, hogy bárki elolvashassa és ellenőrizhesse. A kód forráskódja elérhető, de nem nyílt forráskódú – a GYIK részben elmagyarázzuk, mit engedélyez a licenc.',
      },
      {
        title: 'Semmit sem kell kikapcsolni',
        body: 'Nincs olyan fiók, amelyet bárki is befagyaszthatna. A pénzeszközei magán az Ethereumon vannak tárolva, és bármely fiók kulcsát bármikor átviheti egy másik pénztárcába.',
      },
    ],
  },
  license: {
    title: 'Licenc',
    close: 'Bezárás',
    summaryTitle: 'Egyszerű nyelven',
    canUse: 'A wwwallet-et ingyenesen használhatja személyes és egyéb nem kereskedelmi célokra.',
    canRead: 'A forráskód minden sorát elolvashatja és ellenőrizheti.',
    cannot: 'A szöveget nem másolhatja, módosíthatja, terjesztheti vagy értékesítheti.',
    englishNote:
      'Az eredeti angol nyelvű, teljes licencszöveg az alábbiakban olvasható – ez a jogi szöveg.',
    viewSource: 'Forrás megtekintése a GitHubon',
  },
  meta: {
    title: 'wwwallet — Ingyenes, nem letéti Ethereum-pénztárca',
    description:
      'Ingyenes Ethereum-pénztárca a böngészőjében. Nincs regisztráció, nincsenek hirdetések, nincs nyomon követés – a kulcsai titkosítva maradnak a készülékén. Ethereum, Base, Arbitrum, Optimism, Polygon és további 10 hálózat.',
  },
}
