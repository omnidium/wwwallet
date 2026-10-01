export default {
  nav: {
    wallet: 'Lompakko',
    ethereum: 'Ethereum',
    crypto: 'Krypto',
    faqs: 'Usein kysytyt kysymykset',
    launch: 'Käynnistä lompakko',
    home: 'Takaisin alkuun',
    sectionNavLabel: 'Osioiden navigaatio',
  },
  settings: {
    open: 'Asetukset',
    close: 'Sulje asetukset',
    theme: 'Teema',
    themeLight: 'Valo',
    themeDark: 'Pimeä',
    language: 'Kieli',
  },
  hero: {
    eyebrow: 'Henkilökohtainen, säilytyspalvelua tarjoamaton Ethereum-lompakko',
    heading1: 'Avaimesi.',
    heading2: 'Laitteesi.',
    heading3: 'Lompakkosi.',
    lede: 'wwwallet salaa lompakkosi omalla laitteellasi eikä lähetä avaimiasi, salasanojasi tai palautuslauseitasi koskaan mihinkään muualle. Ei tarvitse luoda tiliä. Ei palvelinta, johon voitaisiin murtautua. Vain sinä ja kryptovaluuttasi.',
    ctaPrimary: 'Käynnistä lompakko',
    ctaSecondary: 'Katso, miten se toimii',
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
        q: 'Riittääkö palautuslauseeni lompakkoni takaisin saamiseksi?',
        a: 'Ei yksinään. Palautuslause avaa salatun tallennustilan, mutta tallennustila itsessään sijaitsee ainoastaan laitteellasi. Jos kadotat laitteen tai tyhjennät sen muistin ilman, että olet koskaan ottanut varmuuskopiota, palautuslauseella ei ole enää mitään avattavaa. Yhdistä palautuslauseesi aina Google Driveen tai tiedostovarmuuskopioon – katso seuraava kysymys.',
      },
      {
        q: 'Miten teen varmuuskopion lompakostani?',
        a: 'Varmuuskopioi salattu kirstusi Asetuksista omaan Google Driveen — se tallennetaan yksityiseen, pelkästään sovellukselle tarkoitettuun kansioon, jonka muuta sisältöä wwwallet ei näe — tai tiedostona, jonka voit ladata ja säilyttää itse. Tee tämä aina, kun otat lompakon käyttöön tai lisäät uusia tilejä.',
      },
      {
        q: 'Voinko käyttää wwwallet-palvelua useammalla kuin yhdellä laitteella?',
        a: 'Kyllä, mutta se ei synkronoidu automaattisesti — jokaisella laitteella on oma paikallinen tallennustila. Jos haluat käyttää wwwallet-sovellusta uudella laitteella, palauta se laitteelle Drive-palvelusta tai tiedostovarmuuskopiosta ja avaa se sitten palautuslauseellasi.',
      },
      {
        q: 'Mitä tapahtuu, jos kadotan laitteeni enkä ole koskaan tehnyt varmuuskopiota?',
        a: 'Varoja ei voi palauttaa. Tämä on tarkoituksellista: wwwalletissa ei ole tilijärjestelmää, eikä se säilytä missään kopiota tallelokerostasi, joten kukaan – emme edes me – voi palauttaa sitä sinulle. Tämä on se hinta, joka maksetaan siitä, että kukaan muu kuin sinä itse ei pääse käsiksi lompakkoosi.',
      },
      {
        q: 'Siirtyvätkö tunnistustiedot (Face ID / Touch ID) uuteen laitteeseen?',
        a: 'Ei. Salasana on sidottu laitteeseen, jolla se on luotu. Kun olet palauttanut varmuuskopion uudelle laitteelle, avaa laite palautuslauseellasi, ja voit määrittää siellä uuden salasanan.',
      },
      {
        q: 'Onko wwwallet avoimen lähdekoodin ohjelmisto?',
        a: 'Ei — sen lähdekoodi on saatavilla. Koko lähdekoodi on julkisesti saatavilla GitHubissa, joten kuka tahansa voi lukea, tarkistaa ja arvioida sitä, mutta se ei ole avointa lähdekoodia: koodi on lisensoitu PolyForm Strict License 1.0.0 -lisenssillä.',
      },
      {
        q: 'Mitä saan tehdä koodilla?',
        a: 'Voit lukea ja tarkastaa sen kokonaisuudessaan sekä käyttää muokkaamatonta kopiota ei-kaupallisiin tarkoituksiin, kuten henkilökohtaiseen opiskeluun, tutkimukseen ja testaukseen. Et saa jakaa sitä, muokata sitä tai luoda siitä johdannaisteoksia (mukaan lukien haarautumat) tai käyttää sitä kaupallisiin tarkoituksiin. Jos tarvitset jotain, mitä lisenssi ei salli, ota yhteyttä tekijänoikeuden haltijaan erillisen lisenssin saamiseksi.',
      },
      {
        q: 'Onko wwwallet turvallinen käyttää? Onko sille annettu takuu?',
        a: 'wwwallet on ei-säilytyspohjainen ohjelmisto, jota tarjotaan ”sellaisenaan” ilman minkäänlaista takuuta. Vain sinä hallitset avaimiasi ja varojasi — kukaan, meitä mukaan lukien, ei voi palauttaa kadonnutta palautuslauseketta tai varmuuskopiota, peruuttaa tapahtumaa tai korvata sinulle menetyksiä. Käytä vain varoja, joiden menettämisen voit kestää, tarkista osoitteet ja verkot huolellisesti ennen lähettämistä, eikä mikään tässä ole taloudellista, sijoitus-, oikeudellista tai veroneuvontaa.',
      },
      {
        q: 'Mitä verkkoja wwwallet tukee?',
        a: 'Ethereumin pääverkko sekä Layer-2-verkot Polygon, Arbitrum, Base ja Optimism — kaikki samasta tilikokonaisuudesta.',
      },
      {
        q: 'Miten lisään varoja lompakkooni?',
        a: 'Avaa tili, valitse ”Näytä QR-koodi” nähdäksesi sen osoitteen ja lähetä varoja kyseiseen osoitteeseen pörssistä tai toisesta lompakosta. Varmista, että lähetät varat oikealla verkostolla (Ethereum, Polygon, Arbitrum, Base tai Optimism) — sama osoite toimii kaikilla verkostoilla, mutta yhdellä verkostolla lähetetyt varat näkyvät vain kyseisellä verkostolla. Tarvitset myös hieman kyseisen verkon omaa kolikkoa (kuten ETH) transaktiomaksujen maksamiseen.',
      },
      {
        q: 'Mitä voin tehdä wwwallet-palvelun avulla?',
        a: 'Lähetä: siirrä ETH:ta tai mitä tahansa tokenia osoitteeseen, jonka liität, skannaat QR-koodista tai valitset omilta tileiltäsi, ja tarkista tiedot ennen vahvistamista. Vaihto: vaihda yksi token toiseen samassa verkossa Vaihto-välilehdellä; hintatarjous ja arvioidut palkkiot näkyvät etukäteen. Vastaanota: näytä osoitteesi QR-koodina. Voit myös tarkastella saldojasi Yhdysvaltain dollareina sekä tapahtumahistoriaasi kaikissa tuetuissa verkoissa.',
      },
      {
        q: 'Mitä wwwallet tietää minusta?',
        a: 'Mitään, mikä paljastaisi henkilöllisyytesi. Palvelussa ei ole tiliä, kirjautumista eikä tietokantaa. Saldo- ja hintatiedot haetaan wwwalletin oman taustajärjestelmän kautta sen sijaan, että selaimesi ottaisi suoraan yhteyttä kolmannen osapuolen palveluntarjoajiin, eikä kyseinen taustajärjestelmä näe koskaan avaimiasi, salasanojasi tai palautuslauseitasi.',
      },
    ],
  },
  footer: {
    tagline: 'Henkilökohtainen Ethereum-lompakko, jossa ei ole varainhoitoa.',
    sourceLink: 'Katso lähdekoodi GitHubissa',
    copyright: '© {year} wwwallet',
    licenseLink: 'Lisensoitu PolyForm Strict 1.0.0 -lisenssillä',
    disclaimer:
      'Ohjelmisto, joka ei ole säilytyspalvelu, toimitetaan ”sellaisenaan” ilman takuuta. Tämä ei ole taloudellista neuvontaa. Olet yksin vastuussa avaimistasi ja varoistasi.',
  },
}
