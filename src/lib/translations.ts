export type Locale = "en" | "sc";

export interface TranslationKeys {
  nav: {
    brand: string;
    brandSub: string;
    home: string;
    about: string;
    resources: string;
    compliance: string;
    directory: string;
    join: string;
    login: string;
    dashboard: string;
    joinNow: string;
  };
  hero: {
    badge: string;
    headingPre: string;
    headingHighlight: string;
    description: string;
    joinNow: string;
    exploreResources: string;
  };
  stats: {
    members: string;
    years: string;
    resources: string;
  };
  features: {
    sectionTitle: string;
    sectionDesc: string;
    items: Array<{ title: string; description: string }>;
  };
  whyJoin: {
    title: string;
    items: string[];
  };
  cta: {
    title: string;
    desc: string;
    button: string;
  };
  partner: {
    badge: string;
    title: string;
    desc: string;
    benefits: string[];
    button: string;
  };
}

// "sc" = Seychellois Creole. Toggle is disabled in UI (coming soon).
export const translations: Record<Locale, TranslationKeys> = {
  en: {
    nav: {
      brand: "Retailers Association",
      brandSub: "of Seychelles",
      home: "Home",
      about: "About",
      resources: "Resources",
      compliance: "Compliance",
      directory: "Directory",
      join: "Join",
      login: "Login",
      dashboard: "My Dashboard",
      joinNow: "Join Now",
    },
    hero: {
      badge: "Fair Service to Our Nation",
      headingPre: "Your All-In-One Platform for",
      headingHighlight: "Retail Success",
      description:
        "The Retailers Association of Seychelles empowers retail business owners across Mahé and the islands with compliance tools, expert resources, and a strong community voice. Grow your business with confidence.",
      joinNow: "Join Now",
      exploreResources: "Explore Resources",
    },
    stats: {
      members: "Members",
      years: "Years of Service",
      resources: "Resources",
    },
    features: {
      sectionTitle: "Everything Your Retail Business Needs",
      sectionDesc:
        "From compliance to community, RAS provides the tools and support that Seychelles retailers rely on every day.",
      items: [
        { title: "Monthly Newsletters", description: "Stay informed with curated retail news, regulatory updates, and market insights delivered each month to all members." },
        { title: "Retail Compliance Hub", description: "Access a centralised library of Seychelles laws, public health guidelines, and food safety standards relevant to your business." },
        { title: "Store Standards & Cleanliness", description: "Practical checklists and guidance for maintaining a hygienic, well-presented retail environment that passes inspections." },
        { title: "Pest Control Services", description: "Vetted pest management providers and guidance on scheduling treatments, maintaining records, and compliance documentation." },
        { title: "Employee & Legal Support", description: "Templates, guidance notes, and referrals to help you navigate employment contracts, disputes, and labour regulations." },
        { title: "Permits & Applications Support", description: "Step-by-step help with trade licences, health certificates, import permits, and other regulatory applications." },
      ],
    },
    whyJoin: {
      title: "Why Join RAS?",
      items: [
        "Direct access to government departments on your behalf, saving you time and reducing bureaucracy.",
        "Regular compliance updates so your business always meets Seychelles public health and trade standards.",
        "A trusted network of vetted service providers — from cleaning and pest control to IT and refrigeration.",
        "Legal and employment guidance to protect your business and your staff relationships.",
        "A unified voice in policy discussions with government ministries and regulatory bodies.",
      ],
    },
    cta: {
      title: "Ready to grow your business?",
      desc: "Join hundreds of Seychelles retailers who rely on RAS for compliance, resources, and community support.",
      button: "Become a Member Today",
    },
    partner: {
      badge: "Stronger Retailers, Stronger Seychelles",
      title: "Your Partner in Compliance.\nYour Partner in Growth.",
      desc: "RAS gives every retailer in Seychelles a single platform for laws, contacts, vetted providers, and peer support — so you spend less time navigating bureaucracy and more time growing your business.",
      benefits: [
        "Stay compliant with Seychelles laws",
        "Improve store quality & safety",
        "Save time with ready resources",
        "Connect with verified service providers",
        "Build customer trust & loyalty",
      ],
      button: "Become a Member",
    },
  },

  sc: {
    nav: {
      brand: "Lasosyasyon Komersyan",
      brandSub: "Sesel",
      home: "Lakaz",
      about: "Lor Nou",
      resources: "Resours",
      compliance: "Konformite",
      directory: "Direktori",
      join: "Zwenn",
      login: "Konekte",
      dashboard: "Mon Tablo Bor",
      joinNow: "Zwenn Asterla",
    },
    hero: {
      badge: "Servis Ekitab Pou Nou Nasyon",
      headingPre: "Vot Platform Tout-an-En pou",
      headingHighlight: "Sikse Komersyal",
      description:
        "Lasosyasyon Komersyan Sesel soutyen propriyeter biznes komersyal atraver Maye ek lezil avek zouti konformite, resours eksper, ek en vwa kominotef for. Grandi vot biznes avek konfyans.",
      joinNow: "Zwenn Asterla",
      exploreResources: "Egzplore Resours",
    },
    stats: {
      members: "Manm",
      years: "Lane Servis",
      resources: "Resours",
    },
    features: {
      sectionTitle: "Tou Sa Vot Biznes Komersyal Bizwen",
      sectionDesc:
        "Depi konformite ziska kominote, RAS fourni zouti ek sipor ki komersyan Sesel konte lor toulezour.",
      items: [
        { title: "Letnewsletter Mansyel", description: "Reste enforme avek linformasyon komersyal, mizazour regilasyon, ek analiz marse ki delivre sak mwa a tou manm." },
        { title: "Santral Konformite Komersyal", description: "Aksede en biblyotek santralize lalwa Sesel, gidlinen lasante piblik, ek normlote sekirite aliman releva pou vot biznes." },
        { title: "Normlote Magazen ek Prop", description: "Lis verifikasyon pratik ek gidans pou mentenir en anviyronman komersyal iyzyenik ki pase lexpeksyon." },
        { title: "Servis Konrol Ravan", description: "Founiseur jestyon ravan verife ek gidans lor planifye tretman, mantenir dosye, ek dokimantasyon konformite." },
        { title: "Sipor Enpwaye ek Legal", description: "Modèl, not gidans, ek referans pou ed ou navige kontra travay, diferan, ek regilasyon travay." },
        { title: "Sipor Permi ek Aplikasyon", description: "Led pa pa pou lisans komers, sertifika lasante, permi enpor, ek lot aplikasyon regilatwar." },
      ],
    },
    whyJoin: {
      title: "Poukwa Zwenn RAS?",
      items: [
        "Akse direkt a departman gouvernman ek ou, sov ou letan ek redwir bwirokratik.",
        "Mizazour regilye konformite pou vot biznes touzour reponn normlote lasante piblik ek komers Sesel.",
        "En rezo konfyans founiseur verife — depi netway ek konrol ravan ziska IT ek refrizersyon.",
        "Gidans legal ek enpwaye pou protez vot biznes ek relasyon avek vot personel.",
        "En vwa inifye dan diskisyon politik avek ministere gouvernman ek korp regilatwar.",
      ],
    },
    cta: {
      title: "Pare pou Grandi Vot Biznes?",
      desc: "Zwenn sante komersyan Sesel ki konte lor RAS pou konformite, resours, ek sipor kominotef.",
      button: "Vinn en Manm Zordi",
    },
    partner: {
      badge: "Komersyan Pi For, Sesel Pi For",
      title: "Vot Partnair dan Konformite.\nVot Partnair dan Kwasans.",
      desc: "RAS donn sak komersyan Sesel en sel platform pou lalwa, kontak, founiseur verife, ek sipor — pour ou pase mwen letan dan bwirokratik ek pli letan pou grandi vot biznes.",
      benefits: [
        "Reste konforme avek lalwa Sesel",
        "Amelyor kalite ek sekirite magazen",
        "Sov letan avek resours pre",
        "Konekte avek founiseur verife",
        "Konstrir konfyans ek fidelite klyan",
      ],
      button: "Vinn en Manm",
    },
  },
};
