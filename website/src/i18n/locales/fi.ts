export default {
  nav: {
    wallet: 'wwwallet',
    ethereum: 'Ethereum',
    crypto: 'Kryptovaluutta',
    faqs: 'Usein kysytyt kysymykset',
    launch: 'Käynnistä wwwallet',
    home: 'Takaisin alkuun',
    sectionNavLabel: 'Osioiden navigointi',
    principles: 'Periaatteet',
  },
  settings: {
    open: 'Asetukset',
    close: 'Sulje asetukset',
    theme: 'Teema',
    themeLight: 'Kevyt',
    themeDark: 'Tumma',
    language: 'Kieli',
    search: 'Haku',
    noMatches: 'Ei osumia',
    version: 'Versio {version}',
  },
  hero: {
    eyebrow: 'Ilmainen, ei-säilytyspohjainen Ethereum-lompakko',
    heading1: 'Sinun avaimesi.',
    heading2: 'Laitteesi.',
    heading3: 'Ilmainen kaikille.',
    lede: 'wwwallet toimii selaimessasi ja säilyttää avaimesi salattuina omalla laitteellasi. Sinun ei tarvitse luoda tiliä, maksaa mitään eikä siinä ole mainoksia, ja se toimii kaikille samalla tavalla.',
    ctaPrimary: 'Käynnistä wwwallet',
    ctaSecondary: 'Katso, miten se toimii',
    note: 'Ei rekisteröitymistä · Ei mainoksia · Ei seurantaa · 31 kieltä',
  },
  wallet: {
    eyebrow: 'wwwallet',
    heading: 'Suunniteltu niin, että vain sinä voit avata sen',
    lede: 'wwwallet ei säilytä varojasi – se auttaa sinua säilyttämään ne itse. Tässä on selitys siitä, mitä se tarkoittaa käytännössä.',
    points: [
      {
        title: 'Ei-säilytyspohjainen, aina',
        body: 'Yksityiset avaimesi luodaan ja salataan omalla laitteellasi. wwwalletin palvelimet eivät koskaan näe niitä – avaimia sisältävää tietokantaa, johon voisi murtautua, ei ole, koska tietokantaa ei ole lainkaan.',
      },
      {
        title: 'Salattu AES-256-salauksella, avattavissa haluamallasi tavalla',
        body: 'Tallennustilasi on suojattu AES-256-GCM-salauksella. Avaa se palautuslauseellasi tai ota käyttöön salasanakoodi – Face ID, Touch ID tai Windows Hello – nopeaa, vain paikallista käyttöä varten.',
      },
      {
        title: 'Lukittuu automaattisesti',
        body: 'wwwallet lukittuu lyhyen käyttämättömyysjakson jälkeen eikä koskaan tallenna avattua istuntoasi levylle – sulje välilehti, niin se unohtaa sen tarkoituksella.',
      },
      {
        title: 'Viisi Ethereum-verkkoa, yksi tilisarja',
        body: 'Säilytä ja lähetä varoja Ethereumin pääverkossa, Polygonissa, Arbitrumissa, Basessa ja Optimismissa samoilla tileillä ja osoitteilla.',
      },
    ],
    caveatTitle: 'Palautuslause avaa kryptovarastosi – se ei ole mikään maaginen varmuuskopio',
    caveatBody:
      'Tallenna palautuslause turvalliseen paikkaan, mutta tee myös varmuuskopio Google Driveen tai tiedostoon. Tarvitset varmuuskopiota lompakon palauttamiseen uudelle laitteelle ja palautuslausetta lompakon avaamiseen, kun olet palauttanut sen.',
    caveatLink: 'Lue lisää usein kysytyistä kysymyksistä',
  },
  ethereum: {
    eyebrow: 'Ethereum',
    heading: 'Miksi Ethereum?',
    lede: 'wwwallet on kehitetty nimenomaan Ethereumia varten. Tässä on sen edut selkokielellä.',
    points: [
      {
        title: 'Maailmanlaajuinen tietokone, ei pelkkä tilikirja',
        body: 'Ethereum otti Bitcoinin idean jaetusta, väärentämättömästä tilikirjasta ja laajensi sitä: globaali, ohjelmoitava tietokone, jonka päälle kuka tahansa voi rakentaa, eikä yksikään osapuoli voi sammuttaa sitä.',
      },
      {
        title: 'Suojattu stakingilla, ei louhinnalla',
        body: 'Vuoden 2022 ”The Merge” -päivityksen jälkeen Ethereumin turvallisuus on perustunut Proof-of-Stake-mekanismiin energiaa kuluttavan louhinnan sijaan — validoijat asettavat ETH:n vakuudeksi sen sijaan, että kuluttaisivat sähköä kilpaillakseen lohkoista.',
      },
      {
        title: 'Avoin ja luvaton',
        body: 'Kukaan ei hyväksy tiliäsi. Kuka tahansa, missä tahansa, voi pitää hallussaan ETH:ta tai kehittää sovelluksen Ethereum-alustalle – samat säännöt koskevat kaikkia, myös suurimpia instituutioita.',
      },
      {
        title: 'Standardi, johon muut verkostot perustuvat',
        body: 'Arbitrumin, Basen ja Optimismin kaltaiset Layer-2-verkot – joita kaikkia wwwallet tukee – laajentavat Ethereumin turvallisuutta nopeampiin ja edullisempiin transaktioihin sen sijaan, että aloitettaisiin alusta.',
      },
    ],
    linkLabel: 'Lue lisää Ethereum-säätiön sivuilta',
    linkUrl: 'https://ethereum.org/en/foundation/',
  },
  crypto: {
    eyebrow: 'Kryptovaluutta',
    heading: 'Kryptovaluutta, selkokielellä',
    lede: 'Muutamia käsitteitä, jotka on hyvä ymmärtää ennen kuin alat itse pitää hallussasi kryptovaluuttaa – ei vain wwwallet-sovelluksessa.',
    points: [
      {
        title: 'Säilytyspalvelu vs. ei-säilytyspalvelu',
        body: 'Säilytyslompakko tai pörssi säilyttää avaimet puolestasi – se on kätevää, mutta luotat siihen, että joku muu ei jäädyttää, kadota tai väärinkäytä varojasi. Ei-säilytyslompakko, kuten wwwallet, jättää avaimet ja vastuun yksin sinun käsiisi.',
      },
      {
        title: 'Staking vs. louhinta',
        body: 'Proof-of-Work-louhinta turvaa lohkoketjun raakalla laskentateholla ja sähköllä. Proof-of-Stake puolestaan turvaa sen riskipääomalla. Ethereumin siirtyminen stakingiin vähensi sen energiankulutusta yli 99,9 % — mikä vastaa suunnilleen pienen maan ja pienen kaupungin välistä eroa energiankulutuksessa.',
      },
      {
        title: 'Ethereumin ulkopuolella',
        body: 'Bitcoinissa yksinkertaisuus ja ennustettavuus ovat tärkeämpiä kuin ohjelmoitavuus. Solanan kaltaiset ketjut painottavat raakaa läpimenokapasiteettia, usein hajautetun järjestelmän kustannuksella. Ethereum painottaa ensisijaisesti hajautettua järjestelmää ja turvallisuutta, ja jättää nopeuden ja kustannukset sen päälle rakennettujen Layer-2-verkkojen hoidettavaksi.',
      },
      {
        title: 'Kukaan luotettava taho ei pyydä sinulta tätä lauseita',
        body: 'Mikään pörssi, asiakaspalvelija tai kukaan wwwalletilta ei koskaan pyydä palautuslausettasi – käytitpä mitä sovellusta tahansa. Jos joku pyytää sitä, hän yrittää ryöstää sinut.',
      },
    ],
    linkLabel: 'Syvennä aiheeseen Bankless-podcastin avulla',
    linkUrl: 'https://www.bankless.com/',
  },
  faqs: {
    eyebrow: 'Usein kysytyt kysymykset',
    heading: 'Usein kysyttyjä kysymyksiä',
    items: [
      {
        q: 'Onko wwwallet todella ilmainen?',
        a: 'Kyllä. Sen käyttö on maksutonta, eikä siinä ole premium-tasoa tai maksullisia osioita, eikä wwwallet lisää mitään palkkiota lähettämiisi tai vaihtamiisi summiin. Ainoa väistämätön kustannus on verkon oma transaktiomaksu (gas-maksu), joka menee verkolle eikä wwwalletille. Vaihtotarjoukset tulevat 0x-pörssien aggregaattorilta, joka voi lisätä oman palkkionsa joihinkin kauppoihin – tällaiset palkkiot näkyvät tarkistusnäytöllä ennen vahvistamista.',
      },
      {
        q: 'Onko sovelluksessa mainoksia, seurantalaitteita tai analytiikkaa?',
        a: 'Ei. wwwallet ei näytä mainoksia, ei käytä analytiikka- tai seurantaskriptejä eikä luo sinusta profiilia. Tiliä ei ole, joten siihen ei ole mitään liitettävää.',
      },
      {
        q: 'Tarvitsenko tilin tai tunnuksen käyttääkseni sitä?',
        a: 'Ei. Rekisteröitymistä, sähköpostiosoitetta, puhelinnumeroa tai henkilöllisyystarkistusta ei vaadita – luot lompakon laitteellesi ja alat käyttää sitä.',
      },
      {
        q: 'Jos sovellus on ilmainen, miten wwwallet kattaa kustannuksensa?',
        a: 'Sovellus ei ansaitse rahaa käyttäjiltään – ei maksuja, ei mainoksia, ei tietojen myyntiä. Käyttökustannukset on pidetty alhaisina jo suunnitteluvaiheessa: sovellus itsessään toimii selaimessasi, ja taustajärjestelmä välittää vain julkisia lohkoketju- ja hintatietoja.',
      },
      {
        q: 'Voiko kukaan jäädyttää lompakkoani?',
        a: 'Tiliä ei ole, joten wwwalletilla – tai kenelläkään muullakaan – ei ole mitään jäädytettävää. Avaimesi eivät koskaan poistu laitteeltasi, ja transaktiot allekirjoitetaan siellä ennen kuin ne lähetetään verkkoon. Varat ovat Ethereumissa, eivät wwwalletissa: voit tarkastella minkä tahansa tilin yksityistä avainta tai palautuslauseketta sen valikosta ja tuoda sen mihin tahansa toiseen Ethereum-lompakkosovellukseen milloin tahansa.',
      },
      {
        q: 'Riittääkö palautuslauseeni lompakon palauttamiseen?',
        a: 'Ei yksinään. Palautuslause avaa salatun säilytystilan, mutta säilytystila itsessään sijaitsee ainoastaan laitteellasi. Jos kadotat laitteen tai tyhjennät sen muistia ottamatta koskaan varmuuskopiota, palautuslauseella ei ole enää mitään avattavaa. Yhdistä palautuslauseesi aina Google Driveen tai tiedostovarmuuskopioon – katso seuraava kysymys.',
      },
      {
        q: 'Kuinka varmuuskopioin lompakkoni?',
        a: 'Varmuuskopioi salattu säilytystilasi Asetuksista omaan Google Driveen tai tiedostona, jonka lataat ja säilytät itse. Drive-varmuuskopio tallentuu sovelluksen yksityiseen kansioon, eikä wwwallet näe mitään muuta Drive-tilisi sisällöstä. Tee varmuuskopio ensimmäisen asennuksen yhteydessä ja uudelleen aina, kun lisäät tilejä.',
      },
      {
        q: 'Voinko käyttää wwwalletia useammalla kuin yhdellä laitteella?',
        a: 'Kyllä, mutta se ei synkronoidu automaattisesti – jokaisella laitteella on oma paikallinen tallennustila. Jos haluat käyttää wwwalletia uudella laitteella, palauta se sinne Drive-palvelusta tai tiedostovarmuuskopiosta ja avaa se sitten palautuslauseellasi.',
      },
      {
        q: 'Mitä tapahtuu, jos kadotan laitteeni enkä ole koskaan tehnyt varmuuskopiota?',
        a: 'Varoja ei voi palauttaa. Tämä on tarkoituksellista: wwwalletilla ei ole tilijärjestelmää eikä se säilytä missään kopiota varastostasi, joten kukaan – meitä mukaan lukien – ei voi palauttaa sitä puolestasi. Se on vastine siitä, että avaimet ovat vain sinun hallussasi.',
      },
      {
        q: 'Siirtyvätkö salasanat (Face ID / Touch ID) uuteen laitteeseen?',
        a: 'Ei. Salasana on sidottu laitteeseen, jolla se luotiin. Kun olet palauttanut varmuuskopion uudelle laitteelle, avaa se palautuslauseellasi, ja voit asettaa siellä uuden salasanan.',
      },
      {
        q: 'Onko wwwallet avoimen lähdekoodin sovellus?',
        a: 'Ei — sen lähdekoodi on saatavilla. Koko lähdekoodi on julkisesti saatavilla GitHubissa, joten kuka tahansa voi lukea, tarkistaa ja auditoida sitä, mutta se ei ole avointa lähdekoodia: koodi on lisensoitu PolyForm Strict License 1.0.0 -lisenssillä.',
      },
      {
        q: 'Mitä saan tehdä koodilla?',
        a: 'Voit lukea ja tarkastaa kaiken tämän sekä käyttää muokkaamatonta kopiota ei-kaupallisiin tarkoituksiin, kuten henkilökohtaiseen opiskeluun, tutkimukseen ja testaukseen. Et saa jakaa sitä, muokata sitä tai luoda siitä johdannaisteoksia (mukaan lukien haarat) tai käyttää sitä kaupallisiin tarkoituksiin. Jos tarvitset jotain, mitä lisenssi ei salli, ota yhteyttä tekijänoikeuden haltijaan erillisen lisenssin saamiseksi.',
      },
      {
        q: 'Onko wwwallet turvallinen käyttää? Onko sille annettu takuu?',
        a: 'wwwallet on ei-säilytyspohjainen ohjelmisto, joka toimitetaan ”sellaisenaan” ilman minkäänlaista takuuta. Vain sinä hallitset avaimiasi ja varojasi – kukaan, meitä mukaan lukien, ei voi palauttaa kadonnutta palautuslauseketta tai varmuuskopiota, peruuttaa tapahtumaa tai korvata sinulle menetyksiä. Käytä vain varoja, joiden menettämisen voit varautua, tarkista osoitteet ja verkot huolellisesti ennen lähettämistä, eikä mikään tässä ole taloudellista, sijoitus-, oikeudellista tai veroneuvontaa.',
      },
      {
        q: 'Mitä verkkoja wwwallet tukee?',
        a: 'Ethereumin pääverkko sekä Layer-2-verkot Polygon, Arbitrum, Base ja Optimism – kaikki samasta tilikokonaisuudesta.',
      },
      {
        q: 'Miten lisään varoja lompakkooni?',
        a: 'Avaa tili, valitse ”Näytä QR-koodi” nähdäksesi sen osoitteen ja lähetä varat kyseiseen osoitteeseen pörssistä tai toisesta lompakosta. Varmista, että lähetät varat oikealla verkostolla (Ethereum, Polygon, Arbitrum, Base tai Optimism) – sama osoite toimii kaikilla verkostoilla, mutta yhdellä verkostolla lähetetyt varat näkyvät vain kyseisellä verkostolla. Tarvitset myös hieman kyseisen verkon omaa kolikkoa (kuten ETH) transaktiomaksujen maksamiseen.',
      },
      {
        q: 'Mitä voin tehdä wwwallet-sovelluksella?',
        a: 'Lähetä: siirrä ETH:ta tai mitä tahansa tokenia osoitteeseen, jonka liität, skannaat QR-koodista tai valitset omista tileistäsi, ja tarkista tiedot ennen vahvistamista. Vaihda: vaihda yksi token toiseen samassa verkossa Swap-välilehdeltä, jolloin hintatarjous ja arvioidut palkkiot näkyvät etukäteen. Vastaanota: näytä osoitteesi QR-koodina. Voit myös tarkastella saldojasi Yhdysvaltain dollareina sekä tapahtumahistoriaasi kaikissa tuetuissa verkoissa.',
      },
      {
        q: 'Mitä wwwallet tietää minusta?',
        a: 'Mitään, mikä paljastaisi henkilöllisyytesi. Sovelluksessa ei ole tiliä, kirjautumista tai tietokantaa. Saldo- ja hintatiedot haetaan wwwalletin oman taustapalvelimen kautta sen sijaan, että selaimesi ottaisi suoraan yhteyttä kolmannen osapuolen palveluntarjoajiin, eikä kyseinen taustapalvelin näe koskaan avaimiasi, salasanojasi tai palautuslausettasi.',
      },
    ],
  },
  footer: {
    tagline: 'Ilmainen, ei-säilytyspohjainen Ethereum-lompakko kaikille.',
    copyright: '© {year} wwwallet',
    licenseLink: 'Lisensoitu PolyForm Strict 1.0.0 -lisenssillä',
    disclaimer:
      'Ei-säilytyspohjainen ohjelmisto toimitetaan ”sellaisenaan”, ilman takuuta. Ei ole taloudellista neuvontaa. Olet yksin vastuussa avaimistasi ja varoistasi.',
  },
  principles: {
    eyebrow: 'Periaatteet',
    heading: 'Ilmainen, avoin ja kaikille tarkoitettu',
    lede: 'Ohjelmisto, joka säilyttää rahojasi, pitäisi olla työkalu, jota käytät, ei liiketoimintaa, joka perustuu käyttäjiinsä. Nämä ovat sitoumukset, joiden pohjalta wwwallet on rakennettu.',
    items: [
      {
        title: 'Ilmainen, ilman piilokustannuksia',
        body: 'Ei hintoja, ei premium-tasoa, ei maksullisia ominaisuuksia. wwwallet ei lisää omia maksujaan – ainoa kustannus on verkon oma transaktiomaksu.',
      },
      {
        title: 'Ei mainoksia, ei seurantaa',
        body: 'Ei mainoksia, ei analytiikkaa, ei seurantaskriptejä eikä tietojen myyntiä kenellekään. Sinusta ei ole edes myytävää profiilia.',
      },
      {
        title: 'Ei rekisteröitymistä',
        body: 'Ei sähköpostia, puhelinnumeroa tai henkilöllisyystarkistusta. Avaa sovellus, luo lompakko, ja olet valmis.',
      },
      {
        title: 'Avaimesi pysyvät sinulla',
        body: 'Avaimet luodaan ja salataan laitteellasi, eivätkä ne koskaan poistu sieltä. wwwallet ei näe niitä, voi siirtää varojasi tai estää pääsyäsi tilillesi.',
      },
      {
        title: 'Toimii kaikkialla',
        body: 'Toimii missä tahansa nykyaikaisessa selaimessa puhelimella tai tietokoneella, ja asennetaan kuin sovellus – sovelluskaupan tiliä ei tarvita.',
      },
      {
        title: '31 kielellä',
        body: 'Käytä sitä kielellä, jolla puhut parhaiten, vaaleassa tai tummassa tilassa.',
      },
      {
        title: 'Koodi avoimesti',
        body: 'Koko lähdekoodi on julkaistu, jotta kuka tahansa voi lukea ja tarkastaa sen. Kyseessä on lähdekoodin saatavuus eikä avoimen lähdekoodin malli – usein kysytyissä kysymyksissä selitetään, mitä lisenssi sallii.',
      },
      {
        title: 'Ei mitään, mitä pitäisi poistaa',
        body: 'Kukaan ei voi jäädyttää kenenkään tiliä. Varasi sijaitsevat suoraan Ethereum-verkossa, ja minkä tahansa tilin avain voidaan siirtää toiseen lompakkoon milloin tahansa.',
      },
    ],
  },
  license: {
    title: 'Lisenssi',
    close: 'Sulje',
    summaryTitle: 'Selkeällä englannin kielellä',
    canUse:
      'Voit käyttää wwwalletia ilmaiseksi henkilökohtaisiin ja muihin ei-kaupallisiin tarkoituksiin.',
    canRead: 'Voit lukea ja tarkistaa jokaisen rivin sen lähdekoodista.',
    cannot: 'Et saa kopioida, muuttaa, jakaa edelleen tai myydä tätä sisältöä.',
    englishNote:
      'Seuraavassa on lisenssin koko teksti alkuperäisellä englanninkielellä – se on oikeudellinen teksti.',
    viewSource: 'Katso lähdekoodi GitHubissa',
  },
  meta: {
    title: 'wwwallet — Ilmainen, ei-säilytyspohjainen Ethereum-lompakko',
    description:
      'Ilmainen Ethereum-lompakko selaimessasi. Ei rekisteröitymistä, ei mainoksia, ei seurantaa – avaimesi pysyvät salattuina laitteellasi. Ethereum, Arbitrum, Base, Optimism ja Polygon.',
  },
}
