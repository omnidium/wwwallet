export default {
  nav: {
    wallet: 'Pénztárca',
    ethereum: 'Ethereum',
    crypto: 'Kriptovaluta',
    faqs: 'GYIK',
    launch: 'Pénztárca elindítása',
    home: 'Vissza az oldal tetejére',
    sectionNavLabel: 'Szekciók közötti navigáció',
  },
  settings: {
    open: 'Beállítások',
    close: 'Beállítások bezárása',
    theme: 'Téma',
    themeLight: 'Fény',
    themeDark: 'Sötét',
    language: 'Nyelv',
  },
  hero: {
    eyebrow: 'Személyes, nem letéti Ethereum-pénztárca',
    heading1: 'A kulcsai.',
    heading2: 'A készüléked.',
    heading3: 'A pénztárcád.',
    lede: 'A wwwallet a saját eszközödön titkosítja a pénztárcádat, és soha nem továbbítja máshová a kulcsaidat, jelszavaidat vagy a helyreállítási kódodat. Nem kell fiókot létrehozni. Nincs szerver, amit feltörhetnének. Csak te és a kriptovalutád.',
    ctaPrimary: 'Pénztárca elindítása',
    ctaSecondary: 'Nézze meg, hogyan működik!',
  },
  wallet: {
    eyebrow: 'Pénztárca',
    heading: 'Úgy készült, hogy csak te tudd kinyitni',
    lede: 'A wwwallet nem kezeli a pénzedet — hanem segít abban, hogy te magad kezelhesd. Íme, mit jelent ez a gyakorlatban.',
    points: [
      {
        title: 'Nem letéti, mindig',
        body: 'A privát kulcsok a saját eszközödön kerülnek generálásra és titkosításra. A wwwallet szerverei soha nem látják őket — nincs olyan pénztárca-adatbázis, amelyet feltörhetnének, mert egyáltalán nincs ilyen adatbázis.',
      },
      {
        title: 'AES-256-tal titkosítva, a saját módszered szerint feloldható',
        body: 'A tárhelyét AES-256-GCM titkosítás védi. Nyissa meg a helyreállítási kóddal, vagy állítson be egy belépési kulcsot – Face ID, Touch ID vagy Windows Hello – a gyors, kizárólag helyi hozzáférés érdekében.',
      },
      {
        title: 'Automatikusan bezáródik',
        body: 'A wwwallet rövid inaktivitás után lezárul, és soha nem menti a feloldott munkamenetet a lemezre — ha bezárja a lapot, a program szándékosan elfelejti az adatokat.',
      },
      {
        title: 'Egy pénztárca, öt Ethereum-hálózat',
        body: 'Ugyanazon fiókokból tárolhat és küldhet az Ethereum főhálózaton, a Polygonon, az Arbitrumon, a Base-en és az Optimismon keresztül.',
      },
    ],
    caveatTitle:
      'A helyreállítási kódod segítségével nyithatod meg a tárhelyedet — ez nem valami varázslatos biztonsági másolat',
    caveatBody:
      'Tartsd a helyreállítási kódot biztonságos helyen, de készíts róla biztonsági másolatot a Google Drive-on vagy egy fájlban is. A biztonsági másolatra azért lesz szükséged, hogy a pénztárcádat egy új eszközön visszaállíthasd, a kódra pedig azért, hogy azt követően feloldhasd a pénztárcát.',
    caveatLink: 'További információk a GYIK-ben',
  },
  ethereum: {
    eyebrow: 'Ethereum',
    heading: 'Miért az Ethereum?',
    lede: 'A wwwallet kifejezetten az Ethereumra épül. Íme az érvek ennek mellett, egyszerű szavakkal.',
    points: [
      {
        title: 'Egy világszintű számítógép, nem csupán egy főkönyv',
        body: 'Az Ethereum átvette a Bitcoin közös, hamisíthatatlan főkönyv koncepcióját, és továbbfejlesztette: egy globális, programozható számítógép lett belőle, amelyre bárki építhet, és amelyet egyetlen fél sem tud kikapcsolni.',
      },
      {
        title: 'Staking révén biztosított, nem bányászat révén',
        body: 'A 2022-es „Merge” óta az Ethereum biztonságát már nem az energiaigényes bányászat, hanem a Proof-of-Stake biztosítja — a validátorok az ETH-t kockáztatják biztosítékként, ahelyett, hogy áramot fogyasztanának a blokkokért folyó versenyben.',
      },
      {
        title: 'Nyílt és engedélyezés nélküli',
        body: 'Senki sem hagyja jóvá a fiókodat. Bárki, bárhol tarthat ETH-t vagy fejleszthet alkalmazást az Ethereumon — ugyanazok a szabályok vonatkoznak mindenkire, beleértve a legnagyobb intézményeket is.',
      },
      {
        title: 'Az a szabvány, amelyre a többi hálózat épül',
        body: 'Az olyan 2. rétegű hálózatok, mint az Arbitrum, a Base és az Optimism – amelyek mindegyikét támogatja a wwwallet – az Ethereum biztonságát kiterjesztik a gyorsabb és olcsóbb tranzakciókra, ahelyett, hogy a nulláról kezdenék.',
      },
    ],
    linkLabel: 'További információk az Ethereum Alapítvány honlapján',
    linkUrl: 'https://ethereum.org/en/foundation/',
  },
  crypto: {
    eyebrow: 'Kriptovaluta',
    heading: 'A kriptovaluta, egyszerűen elmagyarázva',
    lede: 'Néhány fogalom, amit érdemes megérteni, mielőtt magad is kriptovalutát tartanál — nem csak a wwwallet segítségével.',
    points: [
      {
        title: 'Gyámsági és nem gyámsági',
        body: 'Egy letéti pénztárca vagy tőzsde őrzi a kulcsokat az Ön számára – ez kényelmes, de ezzel arra bízza magát, hogy mások nem foglalják be, nem veszítik el és nem használják fel visszaélésszerűen a pénzeszközeit. Egy nem letéti pénztárca, mint például az wwwallet, a kulcsokat és a felelősséget kizárólag az Ön kezébe adja.',
      },
      {
        title: 'Staking kontra bányászat',
        body: 'A Proof-of-Work bányászat a blokkláncot nyers számítási teljesítménnyel és villamos energiával biztosítja. A Proof-of-Stake viszont kockázati tőkével biztosítja azt. Az Ethereum áttérése a stakingre több mint 99,9%-kal csökkentette az energiafogyasztását — ez nagyjából egy kis ország és egy kisváros energiaellátása közötti különbségnek felel meg.',
      },
      {
        title: 'Az Ethereumon túl',
        body: 'A Bitcoin az egyszerűséget és a kiszámíthatóságot részesíti előnyben a programozhatósággal szemben. Az olyan blokkláncok, mint a Solana, a nyers átviteli sebességet helyezik előtérbe, és ennek elérése érdekében gyakran a decentralizáció rovására mennek. Az Ethereum elsősorban a decentralizációra és a biztonságra helyezi a hangsúlyt, a sebességet és a költségeket pedig a rá épülő 2. rétegű hálózatokra bízza.',
      },
      {
        title: 'Egyetlen hiteles személy sem kéri a jelszavadat',
        body: 'Bármilyen pénztárcát is használsz: sem a tőzsde, sem az ügyfélszolgálat, sem a wwwallet alkalmazottai soha nem fogják megkérdezni a helyreállítási kódodat. Aki ezt megkérdezi, az megpróbál kirabolni téged.',
      },
    ],
    linkLabel: 'Merülj el még mélyebben a Bankless podcast segítségével',
    linkUrl: 'https://www.bankless.com/',
  },
  faqs: {
    eyebrow: 'GYIK',
    heading: 'Gyakori kérdések',
    items: [
      {
        q: 'Elég a helyreállítási kódom ahhoz, hogy visszakapjam a pénztárcámat?',
        a: 'Önmagában nem. A helyreállítási kódod kinyitja a titkosított tárhelyedet, de maga a tárhely kizárólag a készülékeden található. Ha elveszted vagy törlöd a készüléket anélkül, hogy valaha is készítettél volna róla biztonsági másolatot, akkor a kódnak már nem lesz mit kinyitnia. A helyreállítási kódodat mindig párosítsd egy Google Drive-on vagy fájlban tárolt biztonsági másolattal – lásd a következő kérdést.',
      },
      {
        q: 'Hogyan készíthetek biztonsági másolatot a pénztárcámról?',
        a: 'A Beállítások menüpontban készíts biztonsági másolatot a titkosított tárhelyedről a saját Google Drive-odra – ahol egy privát, kizárólag az alkalmazás számára elérhető mappában lesz tárolva, amelynek többi részét a wwwallet nem láthatja –, vagy töltsd le fájlként, és tárold el magadnál. Ezt minden alkalommal végezd el, amikor pénztárcát állítasz be vagy új fiókokat adsz hozzá.',
      },
      {
        q: 'Használhatom a wwwallet szolgáltatást egynél több eszközön?',
        a: 'Igen, de nem történik meg az automatikus szinkronizálás – minden eszközön saját helyi tárhely található. Ha az wwwallet alkalmazást egy új eszközön szeretnéd használni, állítsd vissza azt a Drive-ról vagy egy fájlmentésből, majd oldd fel a védelmet a helyreállítási kóddal.',
      },
      {
        q: 'Mi történik, ha elveszítem a készülékemet, és soha nem készítettem róla biztonsági másolatot?',
        a: 'A pénzeszközeit nem lehet helyreállítani. Ez szándékos: a wwwallet nem rendelkezik fiókrendszerrel, és sehol sem tárol másolatot a tárcájáról, így senki – beleértve minket is – nem tudja azt Önnek helyreállítani. Ez az ára annak, hogy a tárcájához rajtad kívül senki sem férhet hozzá.',
      },
      {
        q: 'Átvihetők-e a belépési kulcsok (Face ID / Touch ID) egy új eszközre?',
        a: 'Nem. A jelszó ahhoz az eszközhöz van kötve, amelyen létrehozták. Miután egy új eszközön visszaállította a biztonsági másolatot, a helyreállítási kifejezéssel oldja fel a zárat, és ott beállíthat egy új jelszót.',
      },
      {
        q: 'A wwwallet nyílt forráskódú?',
        a: 'Nem — a forráskód elérhető. A teljes forráskód nyilvánosan elérhető a GitHubon, így bárki elolvashatja, átnézheti és ellenőrizheti, de nem nyílt forráskódú: a kódra a PolyForm Strict License 1.0.0 licenc vonatkozik.',
      },
      {
        q: 'Mit tehetek a kóddal?',
        a: 'Az egész anyagot elolvashatja és ellenőrizheti, valamint módosítatlan példányát nem kereskedelmi célokra – például személyes tanulás, kutatás és tesztelés céljából – futtathatja. Nem terjesztheti, nem módosíthatja, nem készíthet belőle származékos művet (beleértve a forkákat sem), és nem használhatja kereskedelmi célokra. Ha olyanra van szüksége, amit a licenc nem engedélyez, vegye fel a kapcsolatot a szerzői jog tulajdonosával egy külön licenc megszerzése érdekében.',
      },
      {
        q: 'Biztonságos-e a wwwallet használata? Van-e rá garancia?',
        a: 'A wwwallet egy nem letéti szoftver, amelyet „adott állapotban” biztosítunk, bármiféle garancia nélkül. Kizárólag Ön rendelkezik a kulcsokkal és a pénzeszközökkel — senki, beleértve minket is, nem tudja helyreállítani az elveszett helyreállítási kifejezést vagy biztonsági másolatot, visszavonni egy tranzakciót, vagy kártérítést nyújtani az Ön veszteségeiért. Csak olyan pénzeszközöket használjon, amelyek elvesztését megengedheti magának, az elküldés előtt gondosan ellenőrizze a címeket és a hálózatokat, és a jelen dokumentumban szereplő információk nem minősülnek pénzügyi, befektetési, jogi vagy adótanácsadásnak.',
      },
      {
        q: 'Mely hálózatokat támogatja az wwwallet?',
        a: 'Az Ethereum főhálózata, valamint a Layer-2 hálózatok – a Polygon, az Arbitrum, a Base és az Optimism – mind ugyanabból a fiókcsoportból.',
      },
      {
        q: 'Hogyan tölthetem fel a pénztárcámat?',
        a: 'Nyisson meg egy fiókot, válassza a „QR-kód megtekintése” lehetőséget a cím megtekintéséhez, majd utaljon pénzt erre a címre egy tőzsdéről vagy egy másik pénztárcából. Győződjön meg róla, hogy a megfelelő hálózaton (Ethereum, Polygon, Arbitrum, Base vagy Optimism) küldi el a pénzt – ugyanaz a cím mindegyiken működik, de az egyik hálózaton elküldött pénz csak azon a hálózaton jelenik meg. Szüksége lesz egy kis mennyiségű hálózati natív érmére (például ETH-ra) is a tranzakciós díjak kifizetéséhez.',
      },
      {
        q: 'Mit tudok csinálni a wwwallet segítségével?',
        a: 'Küldés: utalj ETH-t vagy bármilyen tokent egy címre, amelyet beillesztesz, QR-kódból beolvasol, vagy a saját fiókjaid közül választasz ki, majd a megerősítés előtt ellenőrizd az adatokat. Csere: cserélj ki egy tokent egy másikra ugyanazon a hálózaton a „Csere” fülön, ahol előre megjelenik az árfolyam és a becsült díj. Fogadás: mutasd meg a címedet QR-kód formájában. Emellett megtekintheti egyenlegeit USD-értékben, valamint a tranzakciós előzményeket az összes támogatott hálózaton.',
      },
      {
        q: 'Mit tud rólam a wwwallet?',
        a: 'Semmi, ami azonosíthatna téged. Nincs fiók, bejelentkezés vagy adatbázis. Az egyenleg- és áradatokat a wwwallet saját háttérrendszere tölti be, nem pedig a böngésződ, amely közvetlenül harmadik fél szolgáltatókat hívna meg, és ez a háttérrendszer soha nem látja a kulcsaidat, jelszavaidat vagy helyreállítási kódodat.',
      },
    ],
  },
  footer: {
    tagline: 'Egy személyes, nem letéti Ethereum-pénztárca.',
    sourceLink: 'A forráskód megtekintése a GitHubon',
    copyright: '© {year} wwwallet',
    licenseLink: 'A PolyForm Strict 1.0.0 licenc alapján',
    disclaimer:
      'A nem letéti szoftver „adott állapotban” kerül rendelkezésre, garancia nélkül. Ez nem minősül pénzügyi tanácsadásnak. A kulcsokért és a pénzeszközökért kizárólag Ön felel.',
  },
}
