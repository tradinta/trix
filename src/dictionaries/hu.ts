import { Dictionary } from './en';

export const hu: Dictionary = {
  // Navigation
  nav: {
    schedule: '2026 Versenynaptár',
    hospitality: 'VIP Vendéglátás',
    sell: 'Jegyértékesítés',
    experiences: 'Élmények',
    staff: 'Személyzeti Portál',
    login: 'Bejelentkezés',
    account: 'Fiókbeállítások',
    bag: 'Kosár',
  },
  // Status Badges
  status: {
    sellingFast: 'Gyorsan fogy',
    available: 'Elérhető',
    limitedVip: 'Korlátozott VIP',
    ongoing: 'Folyamatban',
    debutRace: 'Új Verseny',
  },
  // Home & Hero
  home: {
    badge: 'Hivatalos 2026-os Bajnoksági Belépők',
    heroTitle: 'Hivatalos Formula 1 Jegyértékesítő Platform',
    heroSubtitle: 'Közvetlen hozzáférés a Tribün, VIP Paddock Club és Csapat Szektor belépőkhöz mind a 24 Grand Prix helyszínen.',
    explorePasses: 'Belépők böngészése',
    viewSchedule: 'Versenynaptár',
    feature1Title: '100% Garantált Jegyek',
    feature1Desc: 'Közvetlen integráció a versenypályák jegykezelő rendszerével és Cloudflare R2 dokumentum ellenőrzéssel.',
    feature2Title: 'Kifizetési Kalkulátor',
    feature2Desc: 'Azonnali garantált kifizetés számítás az eladó védelmével.',
    feature3Title: 'Digitális Jegytárca',
    feature3Desc: 'Azonnali vonalkód generálás és offline mobil jegykezelés a kapuknál való belépéshez.',
  },
  // Schedule Page
  schedule: {
    title: '2026 Világbajnokság',
    subtitle: 'Hivatalos versenynaptár a Magyar Nagydíjjal kezdődően.',
    viewDetails: 'Jegyek megtekintése',
    laps: 'kör',
    circuitLength: 'Pálya hossza',
    lapRecord: 'Körrekord',
    startingFrom: 'Kezdőár:',
  },
  // Hospitality Page
  hospitality: {
    title: 'Paddock Club & Csapat Szektorok',
    subtitle: 'Exkluzív VIP vendéglátó csomagok pit lane bejárással és gurmé étkeztetéssel.',
    paddockClubTitle: 'Paddock Club™ Élmény',
    paddockClubDesc: 'A csapatgarázsok felett nyitott bárral és pit lane belépéssel.',
    teamSuitesTitle: 'Csapat VIP Szektorok',
    teamSuitesDesc: 'Közvetlen hozzáférés a Ferrari, Red Bull és Mercedes VIP szektoraihoz.',
    bookVip: 'VIP Szektor foglalása',
  },
  // Experiences Page
  experiences: {
    title: 'Pályamenti Élmények',
    subtitle: 'Exkluzív pit lane séták, dobogós ünneplés és pilóta közönségtalálkozók.',
    pitWalkTitle: 'Vezetett Pit Lane Séta',
    pitWalkDesc: 'Sétáljon a pit lane-en csütörtökön a zöld jelzés előtt.',
    podiumTitle: 'Dobogós Ünneplés Belépő',
    podiumDesc: 'Álljon közvetlenül a pezsgős dobogó alatt a verseny végén.',
    exploreBtn: 'Élmény felfedezése',
  },
  // Checkout Modal
  checkout: {
    orderSummary: 'Rendelés összegzése',
    subtotal: 'Részösszeg',
    platformFee: 'Platform díj (10%)',
    vat: 'ÁFA (Tartalmazza)',
    totalAmount: 'Végösszeg',
    paymentDetails: 'Fizetési adatok',
    emailLabel: 'E-mail cím',
    cardInfoLabel: 'Kártya adatok',
    cardholderLabel: 'Kártyabirtokos neve',
    completePurchase: 'Vásárlás befejezése',
    processing: 'Fizetés feldolgozása...',
    declinedError: 'Tranzakció elutasítva: A kibocsátó bank elutasította a kártyát. Kérjük, ellenőrizze az adatokat vagy próbáljon másik fizetési módot.',
    securedTitle: 'Sikeres foglalás.',
    securedSub: 'A Grand Prix jegyei visszaigazolva.',
    viewTickets: 'Mobil jegyek megtekintése',
    returnHome: 'Vissza a főoldalra',
  },
  // Cart Drawer
  cart: {
    title: 'Az Ön Kosara',
    emptyTitle: 'A kosara üres',
    emptySub: 'Böngéssze a 2026-os versenynaptárt a jegyek lefoglalásához.',
    checkoutBtn: 'Tovább a fizetéshez',
    removeBtn: 'Törlés',
    qty: 'Mennyiség',
  },
  // Pass Locker
  locker: {
    title: 'Digitális Jegytárca',
    subtitle: 'Mutassa be a vonalkódot a beléptető kapunál.',
    validPass: 'ELLENŐRZÖTT BELÉPŐ',
    orderRef: 'Rendelésszám',
    holder: 'Jegyinhaber',
    gate: 'Belépő kapu',
    sector: 'Szektor / Sor',
    closeBtn: 'Tárca bezárása',
  },
  // Sell Page
  sell: {
    title: 'Adja el jegyeit',
    subtitle: 'Hirdesse meg F1 Grand Prix belépőjét azonnali Cloudflare R2 ellenőrzéssel.',
    liveCalculator: 'Kifizetési kalkulátor',
    guaranteedPayout: 'Garantált kifizetés',
    askingPrice: 'Eladási ár',
    platformFeeLabel: '10% Díj',
    adjustPrice: 'Eladási ár módosítása ($)',
    selectEvent: 'Válasszon Grand Prix versenyt',
    selectGrandstand: 'Tribün / Szektor',
    uploadTicket: 'E-Jegy PDF feltöltése (Cloudflare R2)',
    uploadDropzone: 'Kattintson vagy húzza ide a PDF e-jegyet',
    listButton: 'Jegy meghirdetése',
    listingLive: 'Hirdetés aktív!',
    viewSchedule: 'Versenynaptár megtekintése',
  },
  // Auth Pages
  auth: {
    signInTitle: 'Bejelentkezés',
    signInSub: 'Üdvözöljük újra az ApexTix-nél.',
    createTitle: 'Fiók létrehozása',
    createSub: 'Csatlakozzon a prémium jegyértékesítő platformhoz.',
    fullName: 'Teljes név',
    email: 'E-mail cím',
    password: 'Jelszó',
    accessAccount: 'Belépés a fiókba',
    joinBtn: 'Csatlakozás az ApexTix-hez',
    newToPaddock: 'Új a paddockban?',
    alreadyHaveAccount: 'Már van fiókja?',
    createAccountBtn: 'Fiók létrehozása',
    signInBtn: 'Bejelentkezés',
  },
  // Cookie & Language Consent Modal
  cookieConsent: {
    title: 'Üdvözöljük az ApexTix oldalán',
    subtitle: 'Kérjük, válassza ki a kívánt nyelvet és a süti beállításokat a folytatáshoz.',
    selectLanguageLabel: 'Válasszon nyelvet',
    cookieInfo: 'Alapvető sütiket használunk a kosár, a nyelvi beállítások és a biztonságos fizetés kezeléséhez.',
    acceptAll: 'Elfogadás és Folytatás',
    essentialOnly: 'Csak szükséges sütik',
  },
  // Footer
  footer: {
    brandDesc: 'Hivatalos Formula 1 jegyhozzáférés és ellenőrzött jegyértékesítő platform.',
    rights: 'Minden jog fenntartva.',
  },
};
