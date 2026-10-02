export default {
  nav: {
    wallet: 'Lompakko',
    ethereum: 'Ethereum',
    crypto: 'Krypto',
    faqs: 'Usein kysytyt kysymykset',
    launch: 'Käynnistä lompakko',
    home: 'Takaisin alkuun',
    sectionNavLabel: 'Osioiden navigaatio',
    principles: 'Periaatteet',
  },
  settings: {
    open: 'Asetukset',
    close: 'Sulje asetukset',
    theme: 'Teema',
    themeLight: 'Valo',
    themeDark: 'Pimeä',
    language: 'Kieli',
    search: 'Haku',
    noMatches: 'Ei osumia',
  },
  hero: {
    eyebrow: 'Ilmainen, ei-säilytyspohjainen Ethereum-lompakko',
    heading1: 'Avaimesi.',
    heading2: 'Laitteesi.',
    heading3: 'Ilmainen kaikille.',
    lede: 'wwwallet toimii selaimessasi, ja avaimet säilytetään salattuina omalla laitteellasi. Sinun ei tarvitse luoda tiliä, maksaa mitään eikä katsella mainoksia — kyseessä on vain lompakko, joka toimii kaikille samalla tavalla.',
    ctaPrimary: 'Käynnistä lompakko',
    ctaSecondary: 'Katso, miten se toimii',
    note: 'Ei rekisteröitymistä · Ei mainoksia · Ei seurantaa · 31 kieltä',
  },
  wallet: {
    eyebrow: 'Lompakko',
    heading: 'Suunniteltu niin, että vain sinä voit avata sen',
    lede: 'wwwallet ei säilytä varojasi — se auttaa sinua säilyttämään ne itse. Tässä selitetään, mitä se tarkoittaa käytännössä.',
    points: [
      {
        title: 'Ei säilytystä, aina',
        body: 'Yksityiset avaimet luodaan ja salataan omalla laitteellasi. wwwalletin palvelimet eivät koskaan näe niitä — ei ole olemassa lompakkojen tietokantaa, johon voitaisiin murtautua, koska tietokantaa ei ole lainkaan.',
      },
      {
        title: 'Salattu AES-256-salauksella, avattavissa haluamallasi tavalla',
        body: 'Tallennustilasi on suojattu AES-256-GCM-salauksella. Avaa se palautuslauseella tai ota käyttöön avain – Face ID, Touch ID tai Windows Hello – jotta pääset käsiksi tietoihin nopeasti ja vain paikallisesti.',
      },
      {
        title: 'Lukittuu automaattisesti',
        body: 'wwwallet lukittuu lyhyen käyttämättömyysjakson jälkeen, eikä se koskaan tallenna avattua istuntoasi levylle — kun suljet välilehden, se unohtaa sen tarkoituksella.',
      },
      {
        title: 'Yksi lompakko, viisi Ethereum-verkkoa',
        body: 'Säilytä ja lähetä varoja Ethereumin pääverkossa, Polygonissa, Arbitrumissa, Basessa ja Optimismissa samalta tiliryhmältä.',
      },
    ],
    caveatTitle: 'Palautuslause avaa tallesi – se ei ole mikään maaginen varmuuskopio',
    caveatBody:
      'Tallenna palautuslause turvalliseen paikkaan, mutta tee myös varmuuskopio Google Driveen tai tiedostomuotoon. Tarvitset varmuuskopiota lompakon palauttamiseen uudelle laitteelle ja palautuslausetta lompakon avaamiseen, kun olet palauttanut sen.',
    caveatLink: 'Lue lisää usein kysytyistä kysymyksistä',
  },
  ethereum: {
    eyebrow: 'Ethereum',
    heading: 'Miksi Ethereum?',
    lede: 'wwwallet on kehitetty nimenomaan Ethereum-alustan ympärille. Tässä on sen perustelut selkokielellä.',
    points: [
      {
        title: 'Maailmanlaajuinen tietokone, ei pelkkä tilikirja',
        body: 'Ethereum otti käyttöön Bitcoinin idean jaetusta, väärentämättömästä tilikirjasta ja laajensi sitä: globaali, ohjelmoitava tietokone, jonka päälle kuka tahansa voi rakentaa sovelluksia ja jota yksikään osapuoli ei voi sammuttaa.',
      },
      {
        title: 'Turvattu stakingin avulla, ei louhinnan avulla',
        body: 'Vuoden 2022 ”The Merge” -päivityksen jälkeen Ethereumin turvallisuus on perustunut Proof-of-Stake -mekanismiin energiaa kuluttavan louhinnan sijaan — validoijat asettavat ETH:n vakuudeksi sen sijaan, että kuluttaisivat sähköä kilpaillakseen lohkoista.',
      },
      {
        title: 'Avoin ja ilman lupavaatimuksia',
        body: 'Kukaan ei hyväksy tiliäsi. Kuka tahansa, missä tahansa, voi pitää hallussaan ETH:ta tai kehittää sovelluksen Ethereum-alustalla — samat säännöt koskevat kaikkia, myös suurimpia instituutioita.',
      },
      {
        title: 'Standardi, johon muut verkot perustuvat',
        body: 'Arbitrumin, Basen ja Optimismin kaltaiset Layer-2-verkot — joita kaikkia wwwallet tukee — laajentavat Ethereumin turvallisuutta nopeampiin ja edullisempiin transaktioihin sen sijaan, että aloitettaisiin alusta.',
      },
    ],
    linkLabel: 'Lue lisää Ethereum-säätiön sivuilta',
    linkUrl: 'https://ethereum.org/en/foundation/',
  },
  crypto: {
    eyebrow: 'Krypto',
    heading: 'Kryptovaluutta, yksinkertaisesti selitettynä',
    lede: 'Muutamia asioita, jotka on hyvä ymmärtää ennen kuin alat itse omistaa kryptovaluuttaa — ei pelkästään wwwallet-palvelun kautta.',
    points: [
      {
        title: 'Huoltajuus vs. ei-huoltajuus',
        body: 'Säilytyspalvelua tarjoava lompakko tai pörssi säilyttää avaimia puolestasi — se on kätevää, mutta luotat siihen, että joku muu ei jäädyttäisi, kadottaisi tai käyttäisi varojasi väärin. Ei-säilytyspalvelua tarjoava lompakko, kuten wwwallet, antaa avaimet ja vastuun yksinomaan sinun käsiisi.',
      },
      {
        title: 'Staking vs. louhinta',
        body: 'Proof-of-Work -louhinta turvaa lohkoketjun raakalla laskentateholla ja sähköllä. Proof-of-Stake puolestaan turvaa sen riskipääomalla. Ethereumin siirtyminen staking-järjestelmään vähensi sen energiankulutusta yli 99,9 % — mikä vastaa suunnilleen pienen maan ja pienen kaupungin välistä eroa energiankulutuksessa.',
      },
      {
        title: 'Ethereumin ulkopuolella',
        body: 'Bitcoin painottaa yksinkertaisuutta ja ennustettavuutta ohjelmoitavuuden sijaan. Solanan kaltaiset ketjut pyrkivät maksimoimaan raakakapasiteetin, mikä usein tapahtuu hajautetun rakenteen kustannuksella. Ethereum asettaa etusijalle hajautetun rakenteen ja turvallisuuden, ja jättää nopeuden ja kustannukset sen päälle rakennettujen Layer-2-verkostojen hoidettavaksi.',
      },
      {
        title: 'Kukaan luotettava taho ei pyydä salasanaasi',
        body: 'Riippumatta siitä, mitä lompakkoa käytät: mikään pörssi, asiakaspalvelija tai wwwallet-työntekijä ei koskaan pyydä sinulta palautuslauseitasi. Jokainen, joka niin tekee, yrittää ryöstää sinut.',
      },
    ],
    linkLabel: 'Syvennä tietojasi Bankless-podcastin avulla',
    linkUrl: 'https://www.bankless.com/',
  },
  faqs: {
    eyebrow: 'Usein kysytyt kysymykset',
    heading: 'Usein kysyttyjä kysymyksiä',
    items: [
      {
        q: 'Onko wwwallet todella ilmainen?',
        a: 'Kyllä. Sen käyttö on maksutonta, eikä siinä ole premium-tasoa tai maksullisia osioita, eikä wwwallet lisää palkkiota mihinkään lähettämääsi tai vaihtamaasi summaan. Ainoa väistämätön kustannus on verkon oma transaktiomaksu (gas-maksu), joka menee verkolle eikä wwwalletille. Vaihtotarjoukset tulevat 0x-pörssien aggregaattorilta, joka voi lisätä omaa palkkiotaan joihinkin kauppoihin – tällaiset palkkiot näkyvät tarkistusnäytöllä ennen vahvistamista.',
      },
      {
        q: 'Onko sivustolla mainoksia, seurantatyökaluja tai analytiikkaa?',
        a: 'Ei. wwwallet ei näytä mainoksia, ei käytä analytiikka- tai seurantaskriptejä eikä luo sinusta profiilia. Sivustolla ei ole käyttäjätiliä, joten sinua ei voida liittää mihinkään.',
      },
      {
        q: 'Tarvitsenko käyttäjätilin tai tunnuksen, jotta voin käyttää sitä?',
        a: 'Ei. Rekisteröitymistä, sähköpostiosoitetta, puhelinnumeroa tai henkilöllisyyden tarkistusta ei vaadita — luot lompakon laitteellesi ja alat käyttää sitä.',
      },
      {
        q: 'Jos palvelu on ilmainen, miten wwwallet kattaa kustannuksensa?',
        a: 'Se ei ansaitse rahaa käyttäjiltään – ei maksuja, ei mainoksia, ei tietojen myyntiä. Käyttökustannukset on suunniteltu pidettäväksi alhaisina: lompakko itsessään toimii selaimessasi, ja taustajärjestelmä välittää ainoastaan julkista lohkoketjutietoa ja hintatietoja.',
      },
      {
        q: 'Voiko kukaan jäädyttää lompakkoni?',
        a: 'Tiliä ei ole, joten wwwalletilla – tai kenelläkään muullakaan – ei ole mitään jäädytettävää. Avaimesi eivät koskaan poistu laitteeltasi, ja tapahtumat allekirjoitetaan siellä ennen kuin ne lähetetään verkkoon. Varat ovat Ethereum-verkossa, eivät wwwalletissa: voit tarkastella minkä tahansa tilin yksityistä avainta tai palautuslauseketta sen valikosta ja tuoda ne toiseen Ethereum-lompakkoon milloin tahansa.',
      },
      {
        q: 'Riittääkö palautuslauseeni lompakkoni takaisin saamiseksi?',
        a: 'Ei yksinään. Palautuslause avaa salatun säilytystilan, mutta säilytystila itsessään sijaitsee ainoastaan laitteellasi. Jos kadotat laitteen tai tyhjennät sen muistia ottamatta koskaan varmuuskopiota, palautuslauseella ei ole enää mitään avattavaa. Yhdistä palautuslauseesi aina Google Driveen tai tiedostovarmuuskopioon – katso seuraava kysymys.',
      },
      {
        q: 'Miten teen varmuuskopion lompakostani?',
        a: 'Varmuuskopioi salattu kirstusi Asetukset-kohdasta omaan Google Driveen – se tallennetaan yksityiseen, vain sovellukselle tarkoitettuun kansioon, jonka muuta sisältöä wwwallet ei näe – tai lataa tiedosto ja säilytä se itse. Tee tämä aina, kun otat lompakon käyttöön tai lisäät uusia tilejä.',
      },
      {
        q: 'Voinko käyttää wwwallet-palvelua useammalla kuin yhdellä laitteella?',
        a: 'Kyllä, mutta se ei synkronoidu automaattisesti — jokaisella laitteella on oma paikallinen tallennustila. Jos haluat käyttää wwwallet-sovellusta uudella laitteella, palauta se laitteelle Drive-palvelusta tai tiedostovarmuuskopiosta ja avaa se sitten palautuslauseellasi.',
      },
      {
        q: 'Mitä tapahtuu, jos kadotan laitteeni enkä ole koskaan tehnyt varmuuskopiota?',
        a: 'Varoja ei voi palauttaa. Tämä on tarkoituksellista: wwwalletissa ei ole tilijärjestelmää, eikä se säilytä missään kopiota säilytystilastasi, joten kukaan – emme edes me – ei voi palauttaa sitä sinulle. Tämä on se hinta, joka maksetaan siitä, että lompakkoon pääsee käsiksi vain sinä itse.',
      },
      {
        q: 'Siirtyvätkö tunnistustiedot (Face ID / Touch ID) uuteen laitteeseen?',
        a: 'Ei. Salasana on sidottu laitteeseen, jolla se on luotu. Kun olet palauttanut varmuuskopion uudelle laitteelle, avaa laite palautuslauseellasi, ja voit määrittää sille uuden salasanan.',
      },
      {
        q: 'Onko wwwallet avoimen lähdekoodin ohjelmisto?',
        a: 'Ei — sen lähdekoodi on saatavilla. Koko lähdekoodi on julkisesti saatavilla GitHubissa, joten kuka tahansa voi lukea, tarkistaa ja arvioida sitä, mutta se ei ole avointa lähdekoodia: koodi on lisensoitu PolyForm Strict License 1.0.0 -lisenssillä.',
      },
      {
        q: 'Mitä saan tehdä koodilla?',
        a: 'Voit lukea ja tarkastaa koko teoksen sekä käyttää sitä muokkaamattomana kopiona ei-kaupallisiin tarkoituksiin, kuten henkilökohtaiseen opiskeluun, tutkimukseen ja testaukseen. Et saa jakaa sitä, muokata sitä tai luoda siitä johdannaisteoksia (mukaan lukien haarautumat) tai käyttää sitä kaupallisiin tarkoituksiin. Jos tarvitset jotain, mitä lisenssi ei salli, ota yhteyttä tekijänoikeuden haltijaan erillisen lisenssin saamiseksi.',
      },
      {
        q: 'Onko wwwallet turvallinen käyttää? Onko sille annettu takuu?',
        a: 'wwwallet on ei-säilytyspohjainen ohjelmisto, joka toimitetaan ”sellaisenaan” ilman minkäänlaista takuuta. Vain sinä hallitset avaimiasi ja varojasi – kukaan, meitä mukaan lukien, ei voi palauttaa kadonnutta palautuslauseketta tai varmuuskopiota, peruuttaa tapahtumaa tai korvata sinulle menetyksiä. Käytä vain varoja, joiden menettämisen voit varautua, tarkista osoitteet ja verkot huolellisesti ennen lähettämistä, eikä mikään tässä ole taloudellista, sijoitus-, oikeudellista tai veroneuvontaa.',
      },
      {
        q: 'Mitä verkkoja wwwallet tukee?',
        a: 'Ethereumin pääverkko sekä Layer-2-verkot Polygon, Arbitrum, Base ja Optimism — kaikki samalta tilikokonaisuudelta.',
      },
      {
        q: 'Miten voin ladata rahaa lompakkooni?',
        a: 'Avaa tili, valitse ”Näytä QR-koodi” nähdäksesi sen osoitteen ja lähetä varoja kyseiseen osoitteeseen pörssistä tai toisesta lompakosta. Varmista, että lähetät varat oikealla verkostolla (Ethereum, Polygon, Arbitrum, Base tai Optimism) — sama osoite toimii kaikilla verkostoilla, mutta yhdellä verkostolla lähetetyt varat näkyvät vain kyseisellä verkostolla. Tarvitset myös hieman kyseisen verkon omaa kolikkoa (kuten ETH) transaktiomaksujen maksamiseen.',
      },
      {
        q: 'Mitä voin tehdä wwwallet-palvelun avulla?',
        a: 'Lähetä: siirrä ETH:ta tai mitä tahansa tokenia osoitteeseen, jonka liität, skannaat QR-koodista tai valitset omista tileistäsi, ja tarkista tiedot ennen vahvistamista. Vaihto: vaihda yksi token toiseen samassa verkossa Swap-välilehdellä; hintatarjous ja arvioidut palkkiot näkyvät etukäteen. Vastaanota: näytä osoitteesi QR-koodina. Voit myös tarkastella saldojasi Yhdysvaltain dollareina sekä tapahtumahistoriaasi kaikissa tuetuissa verkoissa.',
      },
      {
        q: 'Mitä wwwallet tietää minusta?',
        a: 'Mitään, mikä paljastaisi henkilöllisyytesi. Palvelussa ei ole tiliä, kirjautumista eikä tietokantaa. Saldo- ja hintatiedot haetaan wwwalletin oman taustajärjestelmän kautta sen sijaan, että selaimesi ottaisi suoraan yhteyttä kolmannen osapuolen palveluntarjoajiin, eikä kyseinen taustajärjestelmä näe koskaan avaimiasi, salasanojasi tai palautuslauseitasi.',
      },
    ],
  },
  footer: {
    tagline: 'Ilmainen, ei-säilytyspohjainen Ethereum-lompakko kaikille.',
    copyright: '© {year} wwwallet',
    licenseLink: 'Lisensoitu PolyForm Strict 1.0.0 -lisenssillä',
    disclaimer:
      'Ohjelmisto, joka ei ole säilytyspalvelu, toimitetaan ”sellaisenaan” ilman takuuta. Tämä ei ole taloudellista neuvontaa. Olet yksin vastuussa avaimistasi ja varoistasi.',
  },
  principles: {
    eyebrow: 'Periaatteet',
    heading: 'Ilmainen, avoin ja kaikille tarkoitettu',
    lede: 'Lompakko pitäisi olla työkalu, jota käytät, ei liiketoimintaa, joka perustuu sen käyttäjiin. Nämä ovat sitoumukset, joiden pohjalta wwwallet on rakennettu.',
    items: [
      {
        title: 'Ilmainen, ilman piilokustannuksia',
        body: 'Ei hintaa, ei premium-tasoa, ei maksullisia ominaisuuksia. wwwallet ei peri omia maksuja – ainoa kustannus on verkon oma siirtomaksu.',
      },
      {
        title: 'Ei mainoksia, ei seurantaa',
        body: 'Ei mainoksia, ei analytiikkaa, ei seurantaskriptejä eikä tietojen myyntiä kenellekään. Sinusta ei ole edes profiilia, jota voitaisiin myydä.',
      },
      {
        title: 'Ei rekisteröitymistä',
        body: 'Ei sähköpostiosoitetta, puhelinnumeroa tai henkilöllisyystodistuksen tarkistusta. Avaa sovellus, luo lompakko, ja olet valmis.',
      },
      {
        title: 'Avaimesi pysyvät sinulla',
        body: 'Avaimet luodaan ja salataan laitteellasi, eivätkä ne koskaan poistu laitteesta. wwwallet ei voi nähdä niitä, siirtää varojasi tai estää pääsyäsi tilillesi.',
      },
      {
        title: 'Toimii missä tahansa',
        body: 'Toimii kaikissa nykyaikaisissa selaimissa sekä puhelimella että tietokoneella, ja se asennetaan aivan kuten sovellus – sovelluskaupan tiliä ei tarvita.',
      },
      {
        title: '31 kielellä',
        body: 'Käytä sitä kielellä, joka tuntuu sinulle luontevimmalta, vaaleassa tai tummassa tilassa.',
      },
      {
        title: 'Avoin koodi',
        body: 'Lähdekoodi on julkaistu kokonaisuudessaan, jotta kuka tahansa voi lukea ja tarkastaa sen. Kyseessä on lähdekoodin saatavuus eikä avoimen lähdekoodin malli — usein kysytyissä kysymyksissä selitetään, mitä lisenssi sallii.',
      },
      {
        title: 'Ei mitään, mitä pitäisi sammuttaa',
        body: 'Kukaan ei voi jäädyttää kenenkään tiliä. Varasi sijaitsevat suoraan Ethereum-verkossa, ja minkä tahansa tilin avain voidaan siirtää toiseen lompakkoon milloin tahansa.',
      },
    ],
  },
  license: {
    title: 'Käyttöoikeus',
    close: 'Sulje',
    summaryTitle: 'Selkokielellä',
    canUse:
      'Voit käyttää wwwallet-palvelua ilmaiseksi henkilökohtaisiin ja muihin ei-kaupallisiin tarkoituksiin.',
    canRead: 'Voit lukea ja tarkastaa sen lähdekoodin jokaisen rivin.',
    cannot: 'Et saa kopioida, muuttaa, jakaa edelleen tai myydä sitä.',
    englishNote:
      'Seuraavassa on lisenssin koko teksti alkuperäisellä englanninkielellä – kyseessä on oikeudellinen teksti.',
    viewSource: 'Katso GitHubissa',
  },
}
