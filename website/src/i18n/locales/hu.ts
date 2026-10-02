export default {
  nav: {
    wallet: 'Pénztárca',
    ethereum: 'Ethereum',
    crypto: 'Kriptovaluta',
    faqs: 'GYIK',
    launch: 'Pénztárca elindítása',
    home: 'Vissza az oldal tetejére',
    sectionNavLabel: 'Szekciók közötti navigáció',
    principles: 'Alapelvek',
  },
  settings: {
    open: 'Beállítások',
    close: 'Beállítások bezárása',
    theme: 'Téma',
    themeLight: 'Fény',
    themeDark: 'Sötét',
    language: 'Nyelv',
    search: 'Keresés',
    noMatches: 'Nincs találat',
  },
  hero: {
    eyebrow: 'Ingyenes, nem letéti Ethereum-pénztárca',
    heading1: 'A kulcsaid.',
    heading2: 'A készüléked.',
    heading3: 'Mindenki számára ingyenes.',
    lede: 'A wwwallet a böngészőben fut, és a kulcsokat titkosított formában tárolja a saját eszközödön. Nem kell fiókot létrehozni, nem kell fizetni, és nincsenek hirdetések — egyszerűen csak egy pénztárca, amely mindenki számára ugyanúgy működik.',
    ctaPrimary: 'Pénztárca elindítása',
    ctaSecondary: 'Nézze meg, hogyan működik!',
    note: 'Nincs regisztráció · Nincs reklám · Nincs nyomon követés · 31 nyelv',
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
        q: 'A wwwallet valóban ingyenes?',
        a: 'Igen. A használata ingyenes, nincs prémium szolgáltatás és nincs fizetős tartalom, és a wwwallet semmilyen díjat nem számol fel az elküldött vagy cserélt összegekre. Az egyetlen elkerülhetetlen költség a hálózat saját tranzakciós (gas) díja, amely a hálózatnak, nem pedig a wwwalletnek jut. A csereárak a 0x tőzsde-összesítőtől származnak, amely egyes tranzakciókhoz saját díjat is felszámíthat – az ilyen díjakat a megerősítés előtt a visszajelzési képernyőn jeleníti meg a rendszer.',
      },
      {
        q: 'Vannak hirdetések, nyomkövetők vagy elemzési eszközök?',
        a: 'Nem. A wwwallet nem jelenít meg hirdetéseket, nem futtat elemzési vagy nyomkövető szkripteket, és nem készít rólad felhasználói profilt. Nincs fiók, így nincs semmi, amihez kapcsolódhatna.',
      },
      {
        q: 'Szükségem van fiókra vagy azonosítóra a használatához?',
        a: 'Nem. Nincs regisztráció, e-mail-cím, telefonszám vagy személyazonosság-ellenőrzés – egyszerűen létrehozol egy pénztárcát a készülékeden, és máris használhatod.',
      },
      {
        q: 'Ha ingyenes, akkor hogyan fedezi a wwwallet a működési költségeit?',
        a: 'Nem keres pénzt a felhasználóin — nincsenek díjak, nincsenek hirdetések, nincs adatértékesítés. A működési költségeket szándékosan alacsony szinten tartják: maga a pénztárca a böngészőben fut, a háttérrendszer pedig csupán a nyilvános blokklánc- és áradatokat továbbítja.',
      },
      {
        q: 'Lehet-e valakinek befagyasztania a pénztárcámat?',
        a: 'Nincs fiók, így a wwwallet – vagy bárki más – nem tud semmit befagyasztani. A kulcsok soha nem hagyják el a készülékedet, és a tranzakciókat ott írják alá, mielőtt a hálózatra kerülnének. A pénzeszközeid az Ethereumon vannak, nem a wwwalletben: bármely fiók titkos kulcsát vagy helyreállítási kifejezését megtekintheted a menüből, és bármikor importálhatod egy másik Ethereum-pénztárcába.',
      },
      {
        q: 'Elég-e a helyreállítási kódom ahhoz, hogy visszakapjam a pénztárcámat?',
        a: 'Önmagában nem. A helyreállítási kódod kinyitja a titkosított tárhelyedet, de maga a tárhely kizárólag a készülékeden található. Ha elveszíted vagy törlöd a készüléket anélkül, hogy valaha is készítettél volna róla biztonsági másolatot, akkor a kódnak már nem lesz mit kinyitnia. A helyreállítási kódot mindig párosítsd egy Google Drive-on vagy fájlban tárolt biztonsági másolattal – lásd a következő kérdést.',
      },
      {
        q: 'Hogyan készíthetek biztonsági másolatot a pénztárcámról?',
        a: 'A Beállítások menüpontban készíts biztonsági másolatot a titkosított tárhelyedről a saját Google Drive-odra – ahol egy zárt, kizárólag az alkalmazás számára elérhető mappában lesz tárolva, amelynek többi részét a wwwallet nem láthatja –, vagy letölthető fájlként, amelyet magadnál tárolsz. Ezt minden alkalommal végezd el, amikor pénztárcát állítasz be vagy új fiókokat adsz hozzá.',
      },
      {
        q: 'Használhatom a wwwallet szolgáltatást több eszközön is?',
        a: 'Igen, de nem történik meg automatikusan a szinkronizálás – minden eszközön külön helyi tárhely található. Ha új eszközön szeretnéd használni a wwwallet alkalmazást, állítsd vissza azt a Drive-ból vagy egy fájlbiztonsági másolatból, majd a helyreállítási kóddal oldd fel a zárat.',
      },
      {
        q: 'Mi történik, ha elvesztem a készülékemet, és soha nem készítettem róla biztonsági másolatot?',
        a: 'A pénzeszközeit nem lehet helyreállítani. Ez szándékos megoldás: a wwwallet nem rendelkezik fiókrendszerrel, és sehol sem tárol másolatot a tárcájáról, így senki – beleértve minket is – nem tudja azt Önnek helyreállítani. Ez az ára annak, hogy a tárcájához senki más nem fér hozzá, csak Ön.',
      },
      {
        q: 'Átvihetők-e a belépési kulcsok (Face ID / Touch ID) egy új eszközre?',
        a: 'Nem. A jelszó ahhoz az eszközhöz van kötve, amelyen létrehozták. Miután egy biztonsági másolatot visszaállított egy új eszközön, a helyreállítási kóddal oldja fel a zárat, és ott beállíthat egy új jelszót.',
      },
      {
        q: 'A wwwallet nyílt forráskódú?',
        a: 'Nem — a forráskód hozzáférhető. A teljes forráskód nyilvánosan elérhető a GitHubon, így bárki elolvashatja, átnézheti és ellenőrizheti, de nem nyílt forráskódú: a kód a PolyForm Strict License 1.0.0 licenc alapján áll rendelkezésre.',
      },
      {
        q: 'Mit tehetek a kóddal?',
        a: 'Az anyagot teljes egészében elolvashatja és ellenőrizheti, valamint módosítatlan példányát nem kereskedelmi célokra – például személyes tanulás, kutatás és tesztelés céljából – futtathatja. Nem terjesztheti, nem módosíthatja, nem készíthet belőle származékos művet (beleértve a forkokat sem), és nem használhatja kereskedelmi célokra. Ha olyanra van szüksége, amit a licenc nem engedélyez, vegye fel a kapcsolatot a szerzői jog tulajdonosával egy külön licenc megszerzése érdekében.',
      },
      {
        q: 'Biztonságos-e a wwwallet használata? Van-e rá garancia?',
        a: 'A wwwallet egy nem letéti szoftver, amelyet „adott állapotban” biztosítunk, bármiféle garancia nélkül. Kizárólag Ön rendelkezik a kulcsai és a pénzeszközei felett — senki, beleértve minket is, nem tudja helyreállítani az elveszett helyreállítási kifejezést vagy biztonsági másolatot, visszafordítani egy tranzakciót, vagy kártérítést nyújtani az Ön veszteségeiért. Kizárólag olyan pénzeszközöket használjon, amelyek elvesztését megengedheti magának, küldés előtt gondosan ellenőrizze a címeket és a hálózatokat, és a jelen dokumentumban szereplő információk nem minősülnek pénzügyi, befektetési, jogi vagy adózási tanácsadásnak.',
      },
      {
        q: 'Mely hálózatokat támogatja a wwwallet?',
        a: 'Az Ethereum főhálózat, valamint a Layer-2 hálózatok – a Polygon, az Arbitrum, a Base és az Optimism – mind ugyanabból a fiókcsoportból.',
      },
      {
        q: 'Hogyan tölthetem fel a pénztárcámat?',
        a: 'Nyisson meg egy fiókot, válassza a „QR-kód megtekintése” lehetőséget a cím megtekintéséhez, majd utaljon pénzt erre a címre egy tőzsdéről vagy egy másik pénztárcából. Győződjön meg arról, hogy a megfelelő hálózaton (Ethereum, Polygon, Arbitrum, Base vagy Optimism) küldi el a pénzt – ugyanaz a cím mindegyiken működik, de az egyik hálózaton elküldött pénz csak azon a hálózaton jelenik meg. Szüksége lesz továbbá egy kis mennyiségű hálózati natív érmére (például ETH-ra) a tranzakciós díjak kifizetéséhez.',
      },
      {
        q: 'Mit tudok csinálni a wwwallet segítségével?',
        a: 'Küldés: utalj ETH-t vagy bármilyen tokent egy címre, amelyet beillesztesz, QR-kódból beolvasol, vagy a saját fiókjaid közül választasz ki, majd a megerősítés előtt ellenőrizd az adatokat. Csere: a „Csere” fülön cserélj el egy tokent egy másikra ugyanazon a hálózaton, az árfolyam és a becsült díj előzetesen megjelenik. Fogadás: mutasd meg a címedet QR-kód formájában. Emellett megtekintheti egyenlegeit USD-értékben, valamint tranzakciós előzményeit az összes támogatott hálózaton.',
      },
      {
        q: 'Mit tud rólam a wwwallet?',
        a: 'Semmi, ami azonosítaná Önt. Nincs fiók, bejelentkezés vagy adatbázis. Az egyenleg- és áradatokat a wwwallet saját háttérrendszeréből töltik le, nem pedig úgy, hogy a böngészője közvetlenül harmadik fél szolgáltatókat hívna meg, és ez a háttérrendszer soha nem látja az Ön kulcsait, jelszavait vagy helyreállítási kifejezését.',
      },
    ],
  },
  footer: {
    tagline: 'Egy ingyenes, nem letéti Ethereum-pénztárca mindenki számára.',
    copyright: '© {year} wwwallet',
    licenseLink: 'A PolyForm Strict 1.0.0 licenc alapján',
    disclaimer:
      'A nem letéti szoftver „adott állapotban” kerül rendelkezésre, garancia nélkül. Ez nem minősül pénzügyi tanácsadásnak. A kulcsokért és a pénzeszközökért kizárólag Ön felel.',
  },
  principles: {
    eyebrow: 'Alapelvek',
    heading: 'Ingyenes, nyílt és mindenki számára készült',
    lede: 'A pénztárcának olyan eszköznek kell lennie, amelyet használsz, nem pedig olyan üzleti modellnek, amely a felhasználókon alapul. Ezek azok az elvek, amelyekre a wwwallet épül.',
    items: [
      {
        title: 'Ingyenes, nincs bennfentes feltétel',
        body: 'Nincs ár, nincs prémium szint, nincsenek fizetős funkciók. A wwwallet nem számol fel saját díjakat — az egyetlen költség a hálózat saját tranzakciós díja.',
      },
      {
        title: 'Nincs reklám, nincs nyomon követés',
        body: 'Nincsenek hirdetések, nincsenek elemzések, nincsenek nyomkövető szkriptek, és senkinek nem adunk el adatokat. Eleve nincs rólad olyan profil, amit eladhatnánk.',
      },
      {
        title: 'Nincs regisztráció',
        body: 'Nincs e-mail-cím, telefonszám vagy személyazonosító ellenőrzés. Csak nyisd meg, hozz létre egy pénztárcát, és máris készen állsz.',
      },
      {
        title: 'A kulcsok mindig nálad maradnak',
        body: 'A kulcsok a készüléken jönnek létre és kerülnek titkosításra, és soha nem hagyják el azt. A wwwallet nem láthatja őket, nem mozgathatja az egyenlegedet, és nem zárhatja ki téged.',
      },
      {
        title: 'Bárhol működik',
        body: 'Bármely modern böngészőben fut, akár telefonon, akár asztali gépen, és úgy telepíthető, mint egy alkalmazás — nincs szükség alkalmazásbolt-fiókra.',
      },
      {
        title: '31 nyelven',
        body: 'Használd azt a nyelven, amelyben a legkényelmesebben érzed magad, világos vagy sötét módban.',
      },
      {
        title: 'Nyílt forráskód',
        body: 'A teljes forráskód bárki számára elérhető, hogy elolvassa és ellenőrizze. Ez inkább „forráskód-hozzáférhető”, mint „nyílt forráskódú” – a GYIK-ben részletesen kifejtik, mit engedélyez a licenc.',
      },
      {
        title: 'Nincs mit kikapcsolni',
        body: 'Nincs olyan fiók, amelyet befagyaszthatnának. A pénzeszközeid közvetlenül az Ethereum hálózatán vannak tárolva, és bármely fiók kulcsát bármikor átviheted egy másik pénztárcába.',
      },
    ],
  },
  license: {
    title: 'Licenc',
    close: 'Bezárás',
    summaryTitle: 'Egyszerűen fogalmazva',
    canUse:
      'A wwwallet szolgáltatást ingyenesen használhatja személyes és egyéb, nem kereskedelmi célokra.',
    canRead: 'A forráskód minden sorát elolvashatod és ellenőrizheted.',
    cannot: 'Nem másolhatja, módosíthatja, terjesztheti tovább vagy értékesítheti.',
    englishNote:
      'Az engedély teljes szövege az alábbiakban olvasható eredeti angol nyelven – ez a jogi szöveg.',
    viewSource: 'Megtekintés a GitHubon',
  },
}
