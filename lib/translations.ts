import type { Lang } from "./i18n";
import {
  personal as enPersonal,
  skills as enSkills,
  experience as enExperience,
  projects as enProjects,
  education as enEducation,
  navSections as enNav,
  type SkillGroup,
  type Experience,
  type Project,
  type Education,
} from "./content";

type Personal = typeof enPersonal;
type NavSection = { id: string; label: string };

export type UI = {
  about: { eyebrow: string; title: string };
  experience: { eyebrow: string; title: string };
  projects: { eyebrow: string; title: string; desc: string };
  education: { eyebrow: string; title: string };
  contact: {
    eyebrow: string;
    title: string;
    desc: string;
    directLine: string;
    directLineDesc: string;
    open: string;
    repliesWithin: string;
    sendMessage: string;
    sendMessageDesc: string;
    fields: { name: string; email: string; subject: string; message: string };
    placeholders: { name: string; email: string; subject: string; message: string };
    send: string;
    sending: string;
    sent: string;
    sentDesc: string;
  };
  nav: { resume: string; downloadResume: string };
  hero: { viewProjects: string; resume: string; sayHello: string };
  about_spec: {
    base: string; focus: string; experience: string;
    platforms: string; status: string; available: string;
    focusVal: string; expVal: string; platformsVal: string;
  };
  featured: string;
};

export type Translations = {
  personal: Personal;
  skills: SkillGroup[];
  experience: Experience[];
  projects: Project[];
  education: Education[];
  navSections: NavSection[];
  ui: UI;
};

const ar: Translations = {
  personal: {
    ...enPersonal,
    location: "دبي، الإمارات",
    title: "مطوّر تطبيقات الجوال",
    subtitle: "خبير Flutter · متخصص متعدد المنصات",
    tagline:
      "تطبيقات جوال عالية الأداء. معمارية نظيفة، أنظمة قابلة للتوسع، تسليم احترافي لـ Android و iOS.",
    bio: "أكثر من سنتين ونصف في بناء تطبيقات جوال عالية الأداء باستخدام Flutter وDart. خبرة قوية في المعمارية النظيفة وإدارة الحالة وأتمتة CI/CD وتكامل الـ APIs الآمنة وتحسين الأداء. سجل حافل بتطبيقات خالية من الأعطال وجاهزة للإنتاج مع أوقات تحميل سريعة ونشر فعّال. خبرة في العمل ضمن فرق متعددة، وبناء أنظمة في الوقت الفعلي، وإطلاق تطبيقات على Google Play وApp Store.",
  },

  skills: [
    { group: "اللغات والأطر", items: ["Flutter", "Dart", "Android", "iOS"] },
    { group: "إدارة الحالة", items: ["BLoC", "GetX", "Provider", "Riverpod"] },
    { group: "المعمارية", items: ["Clean Architecture", "MVVM", "MVC", "SOLID Principles"] },
    {
      group: "قواعد البيانات والـ APIs",
      items: ["Firebase", "Firestore", "Hive", "REST APIs", "Swagger", "Postman"],
    },
    {
      group: "التكاملات",
      items: ["Google Maps", "Stripe", "Payment Gateways", "Branch.io", "AppsFlyer", "Bugsnag", "OpenStreet"],
    },
    {
      group: "CI/CD والأدوات",
      items: [
        "CI/CD", "Shorebird", "Codemagic", "Git", "GitHub", "GitLab", "Bitbucket",
        "App Store Connect", "Google Play Console", "Android Studio", "VS Code", "Xcode",
      ],
    },
    {
      group: "الذكاء الاصطناعي",
      items: ["Claude Code", "OpenAI Codex", "Open Code", "Antigravity", "Ollama"],
    },
  ],

  experience: [
    {
      company: "Marhaba Group of Companies | Marhaba Auctions",
      location: "دبي، الإمارات · حضوري",
      role: "مطوّر Flutter | سير عمل ذكاء اصطناعي",
      duration: "مارس 2026 – الحاضر",
      description: [
        "قاد ترحيل تطبيق Android (Kotlin) وiOS (Swift) إلى Flutter لشركة M1 Shipping، منصة لوجستية للمركبات تعمل في الإمارات وعُمان والعراق، مع تسليم المشروع كاملًا في 30 يومًا.",
        "صمّم وطبّق معمارية نظيفة قابلة للتوسع عبر طبقات العرض والمجال والبيانات، لتطبيق غني بالميزات بنيات ثنائية النكهة للإمارات والعراق من قاعدة كود واحدة.",
        "نفّذ المصادقة الكاملة وتتبع الشحنات والمركبات وسير عمل المالية ومنطق الأسعار والشروط وتدفق بيع السيارة مع بحث VIN وقوائم قابلة للمشاركة.",
        "طبّق الترقيم والبحث والفرز والتصفية عبر الوحدات، مع هويات تطبيقية وأصول ومنطق أعمال خاص بكل سوق.",
        "أرسى أساسًا متينًا باستخدام BLoC وDio وGetIt وgo_router مع مصادقة قائمة على الرمز وتبديل البيئات ومعالجة منظمة للأخطاء وتعريب ARB للعربية والكردية والباشتو والفارسية والإنجليزية مع دعم RTL/LTR كامل.",
        "قاد سير عمل مُعزَّزًا بالذكاء الاصطناعي باستخدام Claude Code وتحليل متعدد الوكلاء وتوليد Codex ونماذج Ollama السحابية لتسريع التسليم وتحسين جودة الكود.",
        "تولّى التخطيط وتصميم الأنظمة والمعمارية والتنفيذ لضمان قابلية التوسع والصيانة عبر أسواق متعددة.",
      ],
    },
    {
      company: "JIITAK Facilitating Pvt Ltd",
      location: "كوتشي، كيرالا",
      role: "مطوّر Flutter",
      duration: "يناير 2024 – أكتوبر 2025",
      description: [
        "طوّر تطبيقات Flutter عالية الأداء لعملاء يابانيين بمعدل 99% جلسات خالية من الأعطال وأوقات تحميل أسرع بنسبة 40% عبر تحسين الكود والأصول.",
        "طبّق تحديثات OTA عبر Shorebird، محققًا انخفاضًا بنسبة 95% في وقت تسليم الإصدارات.",
        "قاد تطوير نظام فحص عقاري بزاوية 360°، مما حسّن دقة التقارير بنسبة 45% وقلّص وقت حل النزاعات بنسبة 30%.",
        "أعاد بناء تطبيق إنتاجي قديم من الصفر باستخدام أفضل ممارسات Flutter الحديثة، محققًا استقرارًا بنسبة 99%.",
        "دمج إشعارات Push وAppsFlyer وBranch.io والروابط العميقة لتعزيز التتبع وتفاعل المستخدم.",
        "حافظ على معمارية كود نظيفة ومعيارية (MVC، MVVM، Clean Architecture)، مما قلّص تكرار الكود وحسّن سرعة التطوير بنسبة 30%.",
        "نشر تطبيقات على Play Store وApp Store بنسبة قبول 100% في كل إصدار.",
      ],
    },
    {
      company: "Norq Technologies",
      location: "كوتشي، كيرالا",
      role: "مطوّر Flutter",
      duration: "سبتمبر 2023 – ديسمبر 2023",
      description: [
        "طوّر منصة تتبع مركبات في الوقت الفعلي لعميل قطري باستخدام Flutter وSocket.io وGoogle Maps، مع تحديثات موقع فورية بدقة دون الثانية وتصور المسارات وتحديد النطاقات الجغرافية وإعادة تشغيل سجل الرحلات.",
        "حسّن منطق تحديث الموقع وبث البيانات، مما رفع دقة التتبع وكفاءة مراقبة الأسطول بنسبة 40%.",
        "طبّق معمارية معيارية، مما قلّص طلبات API بنسبة 25% وحسّن عرض الخريطة.",
        "تعاون مع فرق الخادم لتصميم تدفقات أحداث socket قابلة للتوسع وضمان موثوقية النظام تحت الحمل الزائد.",
      ],
    },
    {
      company: "Brototype",
      location: "تريفاندروم، كيرالا",
      role: "متدرب تطوير Flutter",
      duration: "يوليو 2022 – فبراير 2023",
      description: [
        "أكمل برنامجًا مكثفًا لمدة 6 أشهر في تطوير Flutter مع خبرة عملية في مشاريع فعلية.",
        "اكتسب مهارات عملية قوية في تطوير تطبيقات الجوال وتنفيذ واجهات المستخدم وتكامل REST APIs.",
        "تعاون مع المرشدين والزملاء لتصحيح المشكلات المعقدة وتحسين أداء التطبيق عبر مشاريع متعددة.",
      ],
    },
  ],

  projects: [
    {
      title: "M1 Shipping",
      summary:
        "منصة لوجستية للمركبات في الإمارات وعُمان والعراق — تم ترحيلها من Android/iOS الأصلي إلى Flutter في 30 يومًا. بنيات ثنائية النكهة، دعم كامل RTL/LTR، 5 لغات.",
      description: [
        "قاد ترحيل تطبيق Android (Kotlin) وiOS (Swift) كاملًا إلى Flutter في 30 يومًا، مسلّمًا منصة لوجستية للمركبات غنية بالميزات عبر الإمارات وعُمان والعراق.",
        "صمّم بنيات ثنائية النكهة للإمارات/العراق من قاعدة كود واحدة باستخدام معمارية نظيفة عبر طبقات العرض والمجال والبيانات.",
        "سلّم تتبع الشحنات والمركبات وسير عمل المالية ومنطق الأسعار والشروط وتدفق بيع السيارة مع بحث VIN وقوائم قابلة للمشاركة.",
        "بنى تعريبًا كاملًا RTL/LTR بالعربية والكردية والباشتو والفارسية والإنجليزية باستخدام ملفات ARB.",
        "طبّق BLoC وDio وGetIt وgo_router مع مصادقة قائمة على الرمز وتبديل البيئات ومعالجة منظمة للأخطاء.",
      ],
      tags: ["Flutter", "Clean Architecture", "Multi-flavor", "RTL/LTR", "BLoC"],
      accent: "cyan",
      highlights: ["30-day delivery", "UAE · Oman · Iraq", "5 languages"],
      links: {
        playStore: "https://play.google.com/store/apps/details?id=com.m1shipping.android&hl=en_US",
        appStore: "https://apps.apple.com/ae/app/m1-shipping/id6505103589",
      },
    },
    {
      title: "Okinawa Navi",
      summary:
        "تطبيق معلومات منطقة أوكيناوا مع آخر الأخبار وتنبيهات الطقس وتحديثات الفعاليات وتوصيات المطاعم. أكثر من 10,000 تحميل على Android.",
      description: [
        "طوّر تطبيق معلومات إقليمي لأوكيناوا باليابان يتضمن آخر الأخبار وتنبيهات الطقس وتحديثات الفعاليات وتوصيات المطاعم.",
        "طبّق WebView داخل التطبيق لتحميل المقالات الخارجية ومقاطع الفيديو والمحتوى المحلي بسلاسة.",
        "دمج خريطة أمطار تفاعلية لمساعدة المستخدمين على تتبع هطول الأمطار الحية وأنماط الطقس.",
        "نُشر على Play Store وApp Store محققًا تبنّيًا قويًا بأكثر من 10,000 تحميل على Android.",
      ],
      tags: ["Flutter", "WebView", "Maps", "Push Notifications"],
      accent: "teal",
      highlights: ["10,000+ Android downloads"],
      links: {
        playStore: "https://play.google.com/store/apps/details?id=com.proalliance.okinavi&hl=en_US",
        appStore: "https://apps.apple.com/jp/app/%E6%B2%96%E7%B8%84%E3%83%8A%E3%83%93/id1623775334",
      },
    },
    {
      title: "Look Meal",
      summary:
        "تطبيق بحث عن التغذية والطعام — بحث السعرات الحرارية والمكونات والمنتجات المعبأة، مع تصفية متقدمة وتجميعات طعام مخصصة.",
      description: [
        "أنشأ تطبيق بحث تغذية متعدد المنصات يتيح للمستخدمين البحث عن السعرات الحرارية والمعلومات الغذائية للأطباق والمكونات والمنتجات المعبأة مع فرز وتصفية متقدمة.",
        "طبّق مكافآت جمع الطوابع والمشاركة الاجتماعية داخل التطبيق وتجميعات الطعام المخصصة.",
        "نُشر على Play Store وApp Store، محققًا تبنّيًا ثابتًا في اليابان.",
      ],
      tags: ["Flutter", "REST APIs", "Search", "Gamification"],
      accent: "emerald",
      links: {
        playStore: "https://play.google.com/store/apps/details?id=com.allright.lookmeal&hl=en_US",
        appStore: "https://apps.apple.com/jp/app/%E3%83%AB%E3%83%83%E3%82%AF%E3%83%9F%E3%83%BC%E3%83%AB-%E3%82%AB%E3%83%AD%E3%83%AA%E3%83%BC-%E6%A0%84%E9%A4%8A%E7%B4%A0-pfc-%E3%83%80%E3%82%A4%E3%82%A8%E3%83%83%E3%83%88-%E5%A4%96%E9%A3%9F/id6478847606",
      },
    },
    {
      title: "Tabeh GPS",
      summary:
        "تتبع مركبات ذكي وآمن في الوقت الفعلي مع GPS بدقة دون الثانية وتحديد جغرافي وتنبيهات وقود وإعادة تشغيل الرحلات. يستخدمه مديرو الأساطيل في المملكة العربية السعودية.",
      description: [
        "طوّر تطبيق تتبع مركبات في الوقت الفعلي باستخدام Flutter، مع تحديثات GPS دقيقة وإعادة تشغيل سجل الرحلات وتنبيهات الوقود ومراقبة النطاقات الجغرافية.",
        "طبّق ميزات سجل المسار وإعادة تشغيل الرحلات لمساعدة المستخدمين على مراجعة الرحلات السابقة بتفاصيل دقيقة.",
        "أضاف مراقبة الوقود مع تنبيهات آلية للانخفاضات المفاجئة وأنماط الاستهلاك غير الطبيعية.",
        "بنى إشعارات فورية لحالة الاشتعال والتسارع الزائد وانتهاكات النطاق الجغرافي.",
        "دمج تحديد النطاقات الجغرافية ومناطق الأمان، مما يتيح للمستخدمين وضع حدود افتراضية وتلقي تنبيهات آلية.",
        "أضاف تحليلات متقدمة لسلوك السائق وأداء المركبة وكفاءة الرحلة.",
        "نُشر على Play Store وApp Store مع تبنٍّ متزايد بين مديري الأساطيل في المملكة العربية السعودية.",
      ],
      tags: ["Flutter", "Socket.io", "Google Maps", "Geofencing", "Analytics"],
      accent: "rose",
      links: {
        playStore: "https://play.google.com/store/apps/details?id=com.tabehgps.app&hl=en_US",
        appStore: "https://apps.apple.com/us/app/tabeh-gps/id6736398833",
      },
    },
    {
      title: "Rental Anshin Kun",
      summary:
        "نظام تقارير أضرار بزاوية 360° — تطبيقا السكان والمفتشين المترابطان مع مشاهدات بانورامية ورفع مدمج بـ QR لإدارة العقارات اليابانية.",
      description: [
        "بنى نظامًا متكاملًا من تطبيقَي السكان والمفتشين لتقارير أضرار العقارات المركزية في اليابان.",
        "طبّق مشاهدات بانورامية بزاوية 360° تتيح للمستخدمين تحديد مواقع الأضرار بدقة.",
        "بنى رفع صور مدمجًا بـ QR لضمان شفافية وتتبع الأدلة.",
        "مكّن المفتشين من التحقق من الأضرار التي أبلغ عنها السكان أو إضافة نتائج جديدة ضمن النظام نفسه.",
        "بسّط التواصل وحسّن دقة التقارير عبر فرق إدارة عقارية متعددة.",
      ],
      tags: ["Flutter", "360° View", "QR", "Multi-app System"],
      accent: "indigo",
    },
  ],

  education: [
    {
      degree: "بكالوريوس هندسة في علوم الحاسب",
      institution: "Rohini College of Engineering & Technology, Kanyakumari (Anna University)",
      duration: "2017 – 2021",
    },
    {
      degree: "الثانوية العليا — تخصص علوم",
      institution: "S.N English Medium School",
      duration: "2015 – 2017",
    },
    {
      degree: "شهادة إتمام المرحلة الثانوية (S.S.L.C)",
      institution: "Boys Higher Secondary School",
      duration: "2015",
    },
  ],

  navSections: [
    { id: "home", label: "الرئيسية" },
    { id: "about", label: "عن" },
    { id: "experience", label: "الخبرات" },
    { id: "projects", label: "المشاريع" },
    { id: "education", label: "التعليم" },
    { id: "contact", label: "تواصل" },
  ],

  ui: {
    about: { eyebrow: "01 · عن", title: "مهندس يُنجز." },
    experience: { eyebrow: "02 · الخبرات", title: "حيث بنيت." },
    projects: {
      eyebrow: "03 · المشاريع",
      title: "منتجات مُطلقة.",
      desc: "5 تطبيقات في الإنتاج. تعمل في الإمارات واليابان والمملكة العربية السعودية وأكثر.",
    },
    education: { eyebrow: "04 · التعليم", title: "السجل الأكاديمي." },
    contact: {
      eyebrow: "05 · تواصل",
      title: "لنتحدث.",
      desc: "متاح للأدوار والمشاريع المستقلة والتحدث عن المنتجات.",
      directLine: "خط مباشر",
      directLineDesc: "الأفضل لبناء التطبيقات وإصلاح الإنتاج والعمل طويل الأمد.",
      open: "متاح",
      repliesWithin: "يرد خلال 24 ساعة.",
      sendMessage: "أرسل رسالة",
      sendMessageDesc: "شارك السياق والجدول الزمني أو تفاصيل الدور وسأرد بالخطوة التالية.",
      fields: { name: "الاسم", email: "البريد الإلكتروني", subject: "الموضوع", message: "الرسالة" },
      placeholders: {
        name: "أسوين سوباش...",
        email: "you@example.com...",
        subject: "استفسار عن مشروع...",
        message: "أخبرني المزيد...",
      },
      send: "إرسال الرسالة",
      sending: "جارٍ الإرسال...",
      sent: "تم الإرسال.",
      sentDesc: "شكرًا على تواصلك. سأرد عليك قريبًا.",
    },
    nav: { resume: "السيرة الذاتية", downloadResume: "تحميل السيرة الذاتية" },
    hero: { viewProjects: "عرض المشاريع", resume: "السيرة الذاتية", sayHello: "مرحبًا" },
    about_spec: {
      base: "القاعدة",
      focus: "التركيز",
      experience: "الخبرة",
      platforms: "المنصات",
      status: "الحالة",
      available: "متاح",
      focusVal: "Flutter · Dart",
      expVal: "+2.5 سنوات",
      platformsVal: "Android · iOS",
    },
    featured: "[ مميز ]",
  },
};

const enUI: UI = {
  about: { eyebrow: "01 · About", title: "Engineer who ships." },
  experience: { eyebrow: "02 · Experience", title: "Where I've built." },
  projects: {
    eyebrow: "03 · Projects",
    title: "Shipped products.",
    desc: "5 production apps. Live across UAE, Japan, Saudi Arabia, and beyond.",
  },
  education: { eyebrow: "04 · Education", title: "Academic record." },
  contact: {
    eyebrow: "05 · Contact",
    title: "Let's talk.",
    desc: "Open to roles, freelance builds, and product conversations.",
    directLine: "Direct Line",
    directLineDesc: "Best for app builds, production fixes, and long-term product work.",
    open: "Open",
    repliesWithin: "Replies within 24 hours.",
    sendMessage: "Send a Message",
    sendMessageDesc: "Share the context, timeline, or role details and I'll reply with the next step.",
    fields: { name: "Name", email: "Email", subject: "Subject", message: "Message" },
    placeholders: {
      name: "Aswin Subhash…",
      email: "you@example.com…",
      subject: "Project inquiry…",
      message: "Tell me more…",
    },
    send: "Send Message",
    sending: "Sending…",
    sent: "Message sent.",
    sentDesc: "Thanks for reaching out. I'll get back to you shortly.",
  },
  nav: { resume: "Resume", downloadResume: "Download Resume" },
  hero: { viewProjects: "View Projects", resume: "Resume", sayHello: "Say Hello" },
  about_spec: {
    base: "base",
    focus: "focus",
    experience: "experience",
    platforms: "platforms",
    status: "status",
    available: "Available",
    focusVal: "Flutter · Dart",
    expVal: "2.5+ years",
    platformsVal: "Android · iOS",
  },
  featured: "[ featured ]",
};

const en: Translations = {
  personal: enPersonal,
  skills: enSkills,
  experience: enExperience,
  projects: enProjects,
  education: enEducation,
  navSections: enNav as NavSection[],
  ui: enUI,
};

const ja: Translations = {
  personal: {
    ...enPersonal,
    location: "ドバイ、UAE",
    title: "モバイルアプリ開発者",
    subtitle: "Flutterエキスパート · クロスプラットフォームスペシャリスト",
    tagline:
      "高性能モバイルアプリ。クリーンアーキテクチャ、スケーラブルなシステム、AndroidとiOSへのプロフェッショナルな納品。",
    bio: "2.5年以上、FlutterとDartで高性能モバイルアプリを開発してきました。クリーンアーキテクチャ、状態管理、CI/CDオートメーション、セキュアなAPI統合、パフォーマンス最適化に豊富な経験を持ちます。クラッシュフリーでプロダクション対応のアプリ、高速な読み込み、効率的なデプロイを実現してきた確かな実績があります。チームでの協力、リアルタイムシステムの構築、Google PlayおよびApp Storeへのアプリリリース経験があります。",
  },

  skills: [
    { group: "言語・フレームワーク", items: ["Flutter", "Dart", "Android", "iOS"] },
    { group: "状態管理", items: ["BLoC", "GetX", "Provider", "Riverpod"] },
    { group: "アーキテクチャ", items: ["Clean Architecture", "MVVM", "MVC", "SOLID Principles"] },
    {
      group: "データベース・API",
      items: ["Firebase", "Firestore", "Hive", "REST APIs", "Swagger", "Postman"],
    },
    {
      group: "インテグレーション",
      items: ["Google Maps", "Stripe", "Payment Gateways", "Branch.io", "AppsFlyer", "Bugsnag", "OpenStreet"],
    },
    {
      group: "CI/CDツール",
      items: [
        "CI/CD", "Shorebird", "Codemagic", "Git", "GitHub", "GitLab", "Bitbucket",
        "App Store Connect", "Google Play Console", "Android Studio", "VS Code", "Xcode",
      ],
    },
    {
      group: "AI・エージェント",
      items: ["Claude Code", "OpenAI Codex", "Open Code", "Antigravity", "Ollama"],
    },
  ],

  experience: [
    {
      company: "Marhaba Group of Companies | Marhaba Auctions",
      location: "ドバイ、UAE · 出社",
      role: "Flutterエンジニア | AIワークフロー",
      duration: "2026年3月 – 現在",
      description: [
        "M1 ShippingのAndroid（Kotlin）・iOS（Swift）アプリをFlutterに完全移行。UAE・オマーン・イラクで稼働する車両物流プラットフォームを30日で納品。",
        "クリーンアーキテクチャ（Presentation/Domain/Data層）を採用し、単一コードベースからUAE/イラク向けデュアルフレーバーアーキテクチャを設計・実装。",
        "貨物・車両追跡、財務ワークフロー、価格条件ロジック、VIN検索付き車両販売フロー、共有可能なリストを完全に実装。",
        "ARBファイルによるアラビア語・クルド語・パシュトー語・ペルシャ語・英語の完全RTL/LTRローカライゼーションを構築。",
        "BLoC・Dio・GetIt・go_routerをトークンベース認証・環境切り替え・構造化エラーハンドリングとともに実装。",
        "Claude Code・マルチエージェント分析・Codex生成・OllamaローカルモデルによるAI強化ワークフローを主導し、納品速度とコード品質を向上。",
        "複数市場にわたるスケーラビリティと保守性を確保するため、計画・システム設計・アーキテクチャ・実装を担当。",
      ],
    },
    {
      company: "JIITAK Facilitating Pvt Ltd",
      location: "コーチ、ケーララ州",
      role: "Flutterエンジニア",
      duration: "2024年1月 – 2025年10月",
      description: [
        "日本企業クライアント向けに高性能Flutterアプリを開発。クラッシュフリーセッション率99%を達成し、コード・アセット最適化で読み込み速度を40%改善。",
        "Shorebirdを用いたOTAアップデートを実装し、リリース配信時間を95%削減。",
        "360度視点を活用した不動産検査システムの開発を主導。レポート精度を45%向上させ、紛争解決時間を30%短縮。",
        "レガシーな本番アプリを最新のFlutterベストプラクティスでゼロから再構築し、安定率99%を達成。",
        "プッシュ通知・AppsFlyer・Branch.io・ディープリンクを統合し、トラッキングとユーザーエンゲージメントを強化。",
        "クリーンでモジュール化されたコードアーキテクチャ（MVC・MVVM・クリーンアーキテクチャ）を維持し、コード重複を削減、開発速度を30%向上。",
        "Play StoreおよびApp Storeへのリリースを全件100%承認率で実施。",
      ],
    },
    {
      company: "Norq Technologies",
      location: "コーチ、ケーララ州",
      role: "Flutterエンジニア",
      duration: "2023年9月 – 2023年12月",
      description: [
        "カタールのクライアント向けにFlutter・Socket.io・Google Mapsを使用したリアルタイム車両追跡プラットフォームを開発。サブ秒精度の位置情報更新、ルート可視化、ジオフェンシング、運行履歴再生を実装。",
        "位置情報更新ロジックとデータストリーミングを最適化し、追跡精度とフリート監視効率を40%向上。",
        "モジュール化されたアーキテクチャを実装し、APIリクエストを25%削減、マップレンダリングを改善。",
        "サーバーチームと協力してスケーラブルなsocketイベントフローを設計し、高負荷時のシステム信頼性を確保。",
      ],
    },
    {
      company: "Brototype",
      location: "トリバンドラム、ケーララ州",
      role: "Flutter開発インターン",
      duration: "2022年7月 – 2023年2月",
      description: [
        "実プロジェクトの実務経験を積む6ヶ月の集中的なFlutter開発プログラムを修了。",
        "モバイルアプリ開発・UI実装・REST API統合の実践的スキルを習得。",
        "メンターおよびチームメンバーと協力し、複数プロジェクトにわたる複雑な問題のデバッグとアプリパフォーマンスの改善を実施。",
      ],
    },
  ],

  projects: [
    {
      title: "M1 Shipping",
      summary:
        "UAE・オマーン・イラク向け車両物流プラットフォーム — Android/iOSネイティブから30日でFlutterに移行。デュアルフレーバー、完全RTL/LTR対応、5言語サポート。",
      description: [
        "Android（Kotlin）・iOS（Swift）アプリを30日でFlutterに完全移行し、UAE・オマーン・イラクをカバーする機能豊富な車両物流プラットフォームを納品。",
        "単一コードベースからクリーンアーキテクチャ（Presentation/Domain/Data層）でUAE/イラク向けデュアルフレーバーアーキテクチャを設計。",
        "貨物・車両追跡、財務ワークフロー、価格条件ロジック、VIN検索付き車両販売フロー、共有可能なリストを実装。",
        "ARBファイルによるアラビア語・クルド語・パシュトー語・ペルシャ語・英語の完全RTL/LTRローカライゼーションを構築。",
        "BLoC・Dio・GetIt・go_routerをトークンベース認証・環境切り替え・構造化エラーハンドリングとともに実装。",
      ],
      tags: ["Flutter", "Clean Architecture", "Multi-flavor", "RTL/LTR", "BLoC"],
      accent: "cyan",
      highlights: ["30日で納品", "UAE · オマーン · イラク", "5言語対応"],
      links: {
        playStore: "https://play.google.com/store/apps/details?id=com.m1shipping.android&hl=en_US",
        appStore: "https://apps.apple.com/ae/app/m1-shipping/id6505103589",
      },
    },
    {
      title: "Okinawa Navi",
      summary:
        "沖縄地域情報アプリ — 最新ニュース、天気アラート、イベント情報、レストラン情報を提供。Androidで1万ダウンロード以上。",
      description: [
        "沖縄向けの地域情報アプリを開発。最新ニュース、天気アラート、イベント情報、レストラン情報を提供。",
        "外部記事・動画・地域コンテンツをシームレスに読み込むアプリ内WebViewを実装。",
        "ユーザーがリアルタイムの降水量と天気パターンを確認できるインタラクティブな雨雲レーダーを統合。",
        "Play StoreおよびApp Storeに配信し、Androidで1万ダウンロード以上を達成。",
      ],
      tags: ["Flutter", "WebView", "Maps", "Push Notifications"],
      accent: "teal",
      highlights: ["Android 1万DL以上"],
      links: {
        playStore: "https://play.google.com/store/apps/details?id=com.proalliance.okinavi&hl=en_US",
        appStore: "https://apps.apple.com/jp/app/%E6%B2%96%E7%B8%84%E3%83%8A%E3%83%93/id1623775334",
      },
    },
    {
      title: "Look Meal",
      summary:
        "栄養・食品検索アプリ — カロリー・食材・パッケージ食品の検索、高度なフィルタリング、カスタム食品コレクション機能を提供。",
      description: [
        "料理・食材・パッケージ食品のカロリーと栄養情報を高度な並び替え・フィルタリングで検索できるクロスプラットフォーム栄養検索アプリを開発。",
        "スタンプラリー報酬・アプリ内ソーシャルシェア・カスタム食品コレクション機能を実装。",
        "Play StoreおよびApp Storeに配信し、日本での安定したユーザー獲得を達成。",
      ],
      tags: ["Flutter", "REST APIs", "Search", "Gamification"],
      accent: "emerald",
      links: {
        playStore: "https://play.google.com/store/apps/details?id=com.allright.lookmeal&hl=en_US",
        appStore: "https://apps.apple.com/jp/app/%E3%83%AB%E3%83%83%E3%82%AF%E3%83%9F%E3%83%BC%E3%83%AB-%E3%82%AB%E3%83%AD%E3%83%AA%E3%83%BC-%E6%A0%84%E9%A4%8A%E7%B4%A0-pfc-%E3%83%80%E3%82%A4%E3%82%A8%E3%83%83%E3%83%88-%E5%A4%96%E9%A3%9F/id6478847606",
      },
    },
    {
      title: "Tabeh GPS",
      summary:
        "スマートかつセキュアなリアルタイム車両追跡 — サブ秒GPS精度、ジオフェンシング、燃料アラート、運行履歴再生。サウジアラビアのフリート管理者に利用されています。",
      description: [
        "Flutterを使ったリアルタイム車両追跡アプリを開発。精密なGPS更新、運行履歴再生、燃料アラート、ジオフェンシング監視を実装。",
        "ルート履歴・運行履歴再生機能を実装し、ユーザーが詳細なデータで過去の運行を確認できるように。",
        "急激な燃料低下や異常消費パターンへの自動アラート付き燃料監視機能を追加。",
        "エンジン起動・急加速・ジオフェンス違反へのリアルタイム通知を構築。",
        "ジオフェンシングとセーフゾーンを統合し、ユーザーが仮想境界を設定して自動アラートを受信できるように。",
        "ドライバー行動・車両パフォーマンス・運行効率の高度なアナリティクスを追加。",
        "Play StoreおよびApp Storeに配信し、サウジアラビアのフリート管理者の間で導入が拡大中。",
      ],
      tags: ["Flutter", "Socket.io", "Google Maps", "Geofencing", "Analytics"],
      accent: "rose",
      links: {
        playStore: "https://play.google.com/store/apps/details?id=com.tabehgps.app&hl=en_US",
        appStore: "https://apps.apple.com/us/app/tabeh-gps/id6736398833",
      },
    },
    {
      title: "Rental Anshin Kun",
      summary:
        "360度損傷報告システム — 入居者・検査員向け連携アプリ、パノラマビュー、QRコード付き統合写真アップロードで日本の不動産管理をサポート。",
      description: [
        "日本の不動産損傷報告を集中管理する入居者・検査員連携アプリを構築。",
        "ユーザーが損傷箇所を正確に特定できる360度パノラマビューを実装。",
        "証拠の透明性とトレーサビリティを確保するQRコード付き統合写真アップロードを構築。",
        "検査員が入居者の報告を確認・承認したり、同システム内で新たな調査結果を追加できるように。",
        "複数の不動産管理チームにわたるコミュニケーションを効率化し、レポート精度を向上。",
      ],
      tags: ["Flutter", "360° View", "QR", "Multi-app System"],
      accent: "indigo",
    },
  ],

  education: [
    {
      degree: "コンピュータサイエンス工学 学士",
      institution: "Rohini College of Engineering & Technology, Kanyakumari (Anna University)",
      duration: "2017 – 2021",
    },
    {
      degree: "高校卒業 — 理系",
      institution: "S.N English Medium School",
      duration: "2015 – 2017",
    },
    {
      degree: "中学卒業証書 (S.S.L.C)",
      institution: "Boys Higher Secondary School",
      duration: "2015",
    },
  ],

  navSections: [
    { id: "home", label: "ホーム" },
    { id: "about", label: "概要" },
    { id: "experience", label: "経歴" },
    { id: "projects", label: "プロジェクト" },
    { id: "education", label: "学歴" },
    { id: "contact", label: "連絡先" },
  ],

  ui: {
    about: { eyebrow: "01 · 概要", title: "作るエンジニア。" },
    experience: { eyebrow: "02 · 経歴", title: "積み上げた場所。" },
    projects: {
      eyebrow: "03 · プロジェクト",
      title: "リリース済みプロダクト。",
      desc: "5つの本番アプリ。UAE・日本・サウジアラビアなどで稼働中。",
    },
    education: { eyebrow: "04 · 学歴", title: "学歴記録。" },
    contact: {
      eyebrow: "05 · 連絡先",
      title: "話しましょう。",
      desc: "役職、フリーランス、プロダクトの話し合いを歓迎します。",
      directLine: "直通連絡",
      directLineDesc: "アプリ開発、本番修正、長期プロダクト作業に最適です。",
      open: "対応中",
      repliesWithin: "24時間以内に返信します。",
      sendMessage: "メッセージを送る",
      sendMessageDesc: "コンテキスト、スケジュール、または役職の詳細を共有してください。次のステップをお伝えします。",
      fields: { name: "お名前", email: "メールアドレス", subject: "件名", message: "メッセージ" },
      placeholders: {
        name: "Aswin Subhash…",
        email: "you@example.com…",
        subject: "プロジェクトのお問い合わせ…",
        message: "詳細を教えてください…",
      },
      send: "送信する",
      sending: "送信中…",
      sent: "送信完了。",
      sentDesc: "ご連絡ありがとうございます。近日中にご返信いたします。",
    },
    nav: { resume: "履歴書", downloadResume: "履歴書をダウンロード" },
    hero: { viewProjects: "プロジェクトを見る", resume: "履歴書", sayHello: "挨拶する" },
    about_spec: {
      base: "拠点",
      focus: "専門",
      experience: "経験",
      platforms: "対応プラットフォーム",
      status: "状態",
      available: "対応可能",
      focusVal: "Flutter · Dart",
      expVal: "2.5年以上",
      platformsVal: "Android · iOS",
    },
    featured: "[ 注目 ]",
  },
};

const de: Translations = {
  personal: {
    ...enPersonal,
    location: "Dubai, VAE",
    title: "Mobile-App-Entwickler",
    subtitle: "Flutter-Experte · Cross-Platform-Spezialist",
    tagline:
      "Hochleistungs-Mobile-Apps. Saubere Architektur, skalierbare Systeme, professionelle Lieferung für Android & iOS.",
    bio: "Über 2,5 Jahre Erfahrung in der Entwicklung hochleistungsfähiger, skalierbarer Mobile-Apps mit Flutter und Dart. Fundierte Kenntnisse in Clean Architecture, State Management, CI/CD-Automatisierung, sicheren API-Integrationen und Performance-Optimierung. Nachgewiesene Erfolge bei absturzfreien, produktionsreifen Apps mit schnellen Ladezeiten und effizienten Deployments. Erfahrung in der Teamarbeit, beim Aufbau von Echtzeitsystemen und beim Launch auf Google Play und App Store.",
  },

  skills: [
    { group: "Sprachen & Frameworks", items: ["Flutter", "Dart", "Android", "iOS"] },
    { group: "State Management", items: ["BLoC", "GetX", "Provider", "Riverpod"] },
    { group: "Architektur", items: ["Clean Architecture", "MVVM", "MVC", "SOLID Principles"] },
    {
      group: "Datenbanken & APIs",
      items: ["Firebase", "Firestore", "Hive", "REST APIs", "Swagger", "Postman"],
    },
    {
      group: "Integrationen",
      items: ["Google Maps", "Stripe", "Payment Gateways", "Branch.io", "AppsFlyer", "Bugsnag", "OpenStreet"],
    },
    {
      group: "CI/CD & Tools",
      items: [
        "CI/CD", "Shorebird", "Codemagic", "Git", "GitHub", "GitLab", "Bitbucket",
        "App Store Connect", "Google Play Console", "Android Studio", "VS Code", "Xcode",
      ],
    },
    {
      group: "KI & Agenten",
      items: ["Claude Code", "OpenAI Codex", "Open Code", "Antigravity", "Ollama"],
    },
  ],

  experience: [
    {
      company: "Marhaba Group of Companies | Marhaba Auctions",
      location: "Dubai, VAE · Vor Ort",
      role: "Flutter-Entwickler | KI-Workflow",
      duration: "März 2026 – Heute",
      description: [
        "Leitete die vollständige Migration einer Android- (Kotlin) und iOS- (Swift) App zu Flutter für M1 Shipping, eine Fahrzeuglogistikplattform in den VAE, Oman und dem Irak – Projektabschluss in 30 Tagen.",
        "Entwarf und implementierte eine skalierbare Clean Architecture (Presentation/Domain/Data) mit Dual-Flavor-Builds für VAE/Irak aus einer einzigen Codebasis.",
        "Lieferte vollständige Fracht- und Fahrzeugverfolgung, Finanz-Workflows, Preiskonditionen-Logik, Fahrzeugverkaufsflow mit VIN-Suche und teilbaren Listings.",
        "Baute vollständige RTL/LTR-Lokalisierung in Arabisch, Kurdisch, Paschtu, Persisch und Englisch mit ARB-Dateien.",
        "Implementierte BLoC, Dio, GetIt und go_router mit tokenbasierter Authentifizierung, Umgebungswechsel und strukturiertem Fehler-Handling.",
        "Führte einen KI-gestützten Workflow mit Claude Code, Multi-Agenten-Analyse, Codex-Generierung und lokalen Ollama-Modellen zur Beschleunigung der Lieferung und Verbesserung der Codequalität.",
        "Verantwortlich für Planung, Systemdesign, Architektur und Implementierung zur Sicherstellung von Skalierbarkeit und Wartbarkeit über mehrere Märkte hinweg.",
      ],
    },
    {
      company: "JIITAK Facilitating Pvt Ltd",
      location: "Kochi, Kerala",
      role: "Flutter-Entwickler",
      duration: "Jan. 2024 – Okt. 2025",
      description: [
        "Entwickelte hochleistungsfähige Flutter-Apps für japanische Kunden mit 99 % absturzfreien Sitzungen und 40 % schnelleren Ladezeiten durch Code- und Asset-Optimierung.",
        "Implementierte OTA-Updates über Shorebird und reduzierte die Release-Lieferzeit um 95 %.",
        "Leitete die Entwicklung eines 360°-Immobilienprüfungssystems, das die Berichtsgenauigkeit um 45 % verbesserte und die Streitbeilegungszeit um 30 % reduzierte.",
        "Baute eine veraltete Produktions-App von Grund auf mit modernen Flutter-Best-Practices neu auf und erzielte 99 % Stabilität.",
        "Integrierte Push-Benachrichtigungen, AppsFlyer, Branch.io und Deep Links zur Verbesserung von Tracking und Nutzerengagement.",
        "Pflegte eine saubere, modulare Codearchitektur (MVC, MVVM, Clean Architecture), reduzierte Codeduplikation und steigerte die Entwicklungsgeschwindigkeit um 30 %.",
        "Veröffentlichte Apps im Play Store und App Store mit 100 % Akzeptanzrate bei jedem Release.",
      ],
    },
    {
      company: "Norq Technologies",
      location: "Kochi, Kerala",
      role: "Flutter-Entwickler",
      duration: "Sept. 2023 – Dez. 2023",
      description: [
        "Entwickelte eine Echtzeit-Fahrzeugverfolgungsplattform für einen katarischen Kunden mit Flutter, Socket.io und Google Maps – Sub-Sekunden-GPS-Updates, Routenvisualisierung, Geofencing und Fahrthistorie-Wiedergabe.",
        "Optimierte Standortaktualisierungslogik und Daten-Streaming und verbesserte Tracking-Genauigkeit und Flottenüberwachungseffizienz um 40 %.",
        "Implementierte modulare Architektur, reduzierte API-Anfragen um 25 % und verbesserte Karten-Rendering.",
        "Arbeitete mit Server-Teams zusammen, um skalierbare Socket-Event-Flows zu entwerfen und Systemzuverlässigkeit unter Last zu gewährleisten.",
      ],
    },
    {
      company: "Brototype",
      location: "Thiruvananthapuram, Kerala",
      role: "Flutter-Entwicklungspraktikant",
      duration: "Juli 2022 – Feb. 2023",
      description: [
        "Absolvierte ein intensives 6-monatiges Flutter-Entwicklungsprogramm mit praktischer Erfahrung an realen Projekten.",
        "Erwarb fundierte praktische Kenntnisse in Mobile-App-Entwicklung, UI-Implementierung und REST-API-Integration.",
        "Arbeitete mit Mentoren und Kollegen zusammen, um komplexe Probleme zu beheben und die App-Performance über mehrere Projekte hinweg zu verbessern.",
      ],
    },
  ],

  projects: [
    {
      title: "M1 Shipping",
      summary:
        "Fahrzeuglogistikplattform für VAE, Oman und Irak – migriert von nativem Android/iOS zu Flutter in 30 Tagen. Dual-Flavor-Builds, vollständige RTL/LTR-Unterstützung, 5 Sprachen.",
      description: [
        "Leitete die vollständige Migration von Android (Kotlin) und iOS (Swift) zu Flutter in 30 Tagen und lieferte eine funktionsreiche Fahrzeuglogistikplattform für VAE, Oman und den Irak.",
        "Entwarf Dual-Flavor-Architektur für VAE/Irak aus einer einzigen Codebasis mit Clean Architecture (Presentation/Domain/Data).",
        "Lieferte Fracht- und Fahrzeugverfolgung, Finanz-Workflows, Preiskonditionen, Fahrzeugverkaufsflow mit VIN-Suche und teilbare Listings.",
        "Baute vollständige RTL/LTR-Lokalisierung in Arabisch, Kurdisch, Paschtu, Persisch und Englisch mit ARB-Dateien.",
        "Implementierte BLoC, Dio, GetIt und go_router mit tokenbasierter Auth, Umgebungswechsel und strukturiertem Fehler-Handling.",
      ],
      tags: ["Flutter", "Clean Architecture", "Multi-flavor", "RTL/LTR", "BLoC"],
      accent: "cyan",
      highlights: ["30-Tage-Lieferung", "VAE · Oman · Irak", "5 Sprachen"],
      links: {
        playStore: "https://play.google.com/store/apps/details?id=com.m1shipping.android&hl=en_US",
        appStore: "https://apps.apple.com/ae/app/m1-shipping/id6505103589",
      },
    },
    {
      title: "Okinawa Navi",
      summary:
        "Regionalinformations-App für Okinawa mit aktuellen Nachrichten, Wetterwarnungen, Veranstaltungen und Restaurantempfehlungen. Über 10.000 Downloads auf Android.",
      description: [
        "Entwickelte eine regionale Info-App für Okinawa mit aktuellen Nachrichten, Wetterwarnungen, Veranstaltungsupdates und Restaurantempfehlungen.",
        "Implementierte eine In-App-WebView zum nahtlosen Laden externer Artikel, Videos und lokaler Inhalte.",
        "Integrierte eine interaktive Regenradar-Karte zur Verfolgung von Live-Niederschlägen und Wettermustern.",
        "Im Play Store und App Store veröffentlicht mit über 10.000 Downloads auf Android.",
      ],
      tags: ["Flutter", "WebView", "Maps", "Push Notifications"],
      accent: "teal",
      highlights: ["10.000+ Android-Downloads"],
      links: {
        playStore: "https://play.google.com/store/apps/details?id=com.proalliance.okinavi&hl=en_US",
        appStore: "https://apps.apple.com/jp/app/%E6%B2%96%E7%B8%84%E3%83%8A%E3%83%93/id1623775334",
      },
    },
    {
      title: "Look Meal",
      summary:
        "Ernährungs- und Lebensmittel-Such-App – Kaloriensuche für Gerichte, Zutaten und verpackte Produkte mit erweiterter Filterung und benutzerdefinierten Sammlungen.",
      description: [
        "Entwickelte eine plattformübergreifende Ernährungssuch-App, mit der Nutzer Kalorien und Nährwertinfos für Gerichte, Zutaten und verpackte Produkte mit erweiterter Sortierung und Filterung suchen können.",
        "Implementierte Stempel-Sammel-Belohnungen, In-App-Social-Sharing und benutzerdefinierte Lebensmittelsammlungen.",
        "Im Play Store und App Store mit stabiler Nutzerbasis in Japan veröffentlicht.",
      ],
      tags: ["Flutter", "REST APIs", "Search", "Gamification"],
      accent: "emerald",
      links: {
        playStore: "https://play.google.com/store/apps/details?id=com.allright.lookmeal&hl=en_US",
        appStore: "https://apps.apple.com/jp/app/%E3%83%AB%E3%83%83%E3%82%AF%E3%83%9F%E3%83%BC%E3%83%AB-%E3%82%AB%E3%83%AD%E3%83%AA%E3%83%BC-%E6%A0%84%E9%A4%8A%E7%B4%A0-pfc-%E3%83%80%E3%82%A4%E3%82%A8%E3%83%83%E3%83%88-%E5%A4%96%E9%A3%9F/id6478847606",
      },
    },
    {
      title: "Tabeh GPS",
      summary:
        "Intelligentes Echtzeit-Fahrzeugtracking mit Sub-Sekunden-GPS, Geofencing, Kraftstoffwarnungen und Fahrthistorie. Wird von Flottenmanagern in Saudi-Arabien genutzt.",
      description: [
        "Entwickelte eine Echtzeit-Fahrzeugverfolgungsapp mit Flutter mit präzisen GPS-Updates, Fahrthistorie-Wiedergabe, Kraftstoffwarnungen und Geofencing-Überwachung.",
        "Implementierte Routenverlauf und Fahrthistorie-Wiedergabe für detaillierte Überprüfung vergangener Fahrten.",
        "Fügte Kraftstoffüberwachung mit automatischen Warnungen bei plötzlichen Abfällen und ungewöhnlichen Verbrauchsmustern hinzu.",
        "Baute Echtzeit-Benachrichtigungen für Zündung, starke Beschleunigung und Geofence-Verletzungen.",
        "Integrierte Geofencing und Sicherheitszonen, um Nutzern das Setzen virtueller Grenzen mit automatischen Warnungen zu ermöglichen.",
        "Erweiterte Analysen zu Fahrerverhalten, Fahrzeugleistung und Fahreffizienz.",
        "Im Play Store und App Store mit wachsender Verbreitung bei Flottenmanagern in Saudi-Arabien veröffentlicht.",
      ],
      tags: ["Flutter", "Socket.io", "Google Maps", "Geofencing", "Analytics"],
      accent: "rose",
      links: {
        playStore: "https://play.google.com/store/apps/details?id=com.tabehgps.app&hl=en_US",
        appStore: "https://apps.apple.com/us/app/tabeh-gps/id6736398833",
      },
    },
    {
      title: "Rental Anshin Kun",
      summary:
        "360°-Schadenserfassungssystem – verknüpfte Mieter- und Prüfer-Apps mit Panoramaansichten und QR-basiertem Foto-Upload für japanisches Immobilienmanagement.",
      description: [
        "Baute ein integriertes System aus Mieter- und Prüfer-App für zentrale Immobilienschadensberichte in Japan.",
        "Implementierte 360°-Panoramaansichten zur präzisen Lokalisierung von Schäden durch Nutzer.",
        "Baute QR-basierten Foto-Upload für Transparenz und Nachverfolgbarkeit von Beweisen.",
        "Ermöglichte Prüfern die Verifizierung gemeldeter Schäden oder das Hinzufügen neuer Befunde im selben System.",
        "Vereinfachte Kommunikation und verbesserte Berichtsgenauigkeit über mehrere Immobilienverwaltungsteams.",
      ],
      tags: ["Flutter", "360° View", "QR", "Multi-app System"],
      accent: "indigo",
    },
  ],

  education: [
    {
      degree: "Bachelor of Engineering in Informatik",
      institution: "Rohini College of Engineering & Technology, Kanyakumari (Anna University)",
      duration: "2017 – 2021",
    },
    {
      degree: "Abitur – Naturwissenschaften",
      institution: "S.N English Medium School",
      duration: "2015 – 2017",
    },
    {
      degree: "Mittlere Reife (S.S.L.C)",
      institution: "Boys Higher Secondary School",
      duration: "2015",
    },
  ],

  navSections: [
    { id: "home", label: "Start" },
    { id: "about", label: "Über" },
    { id: "experience", label: "Erfahrung" },
    { id: "projects", label: "Projekte" },
    { id: "education", label: "Bildung" },
    { id: "contact", label: "Kontakt" },
  ],

  ui: {
    about: { eyebrow: "01 · Über", title: "Ingenieur, der liefert." },
    experience: { eyebrow: "02 · Erfahrung", title: "Wo ich gebaut habe." },
    projects: {
      eyebrow: "03 · Projekte",
      title: "Ausgelieferte Produkte.",
      desc: "5 Produktions-Apps. Live in den VAE, Japan, Saudi-Arabien und darüber hinaus.",
    },
    education: { eyebrow: "04 · Bildung", title: "Akademischer Werdegang." },
    contact: {
      eyebrow: "05 · Kontakt",
      title: "Lass uns reden.",
      desc: "Offen für Stellen, Freelance-Projekte und Produktgespräche.",
      directLine: "Direkter Kontakt",
      directLineDesc: "Am besten für App-Entwicklung, Produktionsfixes und langfristige Produktarbeit.",
      open: "Verfügbar",
      repliesWithin: "Antwortet innerhalb von 24 Stunden.",
      sendMessage: "Nachricht senden",
      sendMessageDesc: "Teile Kontext, Zeitplan oder Stellendetails mit und ich antworte mit dem nächsten Schritt.",
      fields: { name: "Name", email: "E-Mail", subject: "Betreff", message: "Nachricht" },
      placeholders: {
        name: "Aswin Subhash…",
        email: "you@example.com…",
        subject: "Projektanfrage…",
        message: "Erzähl mir mehr…",
      },
      send: "Nachricht senden",
      sending: "Wird gesendet…",
      sent: "Nachricht gesendet.",
      sentDesc: "Danke für deine Nachricht. Ich werde mich in Kürze melden.",
    },
    nav: { resume: "Lebenslauf", downloadResume: "Lebenslauf herunterladen" },
    hero: { viewProjects: "Projekte ansehen", resume: "Lebenslauf", sayHello: "Hallo sagen" },
    about_spec: {
      base: "Standort",
      focus: "Fokus",
      experience: "Erfahrung",
      platforms: "Plattformen",
      status: "Status",
      available: "Verfügbar",
      focusVal: "Flutter · Dart",
      expVal: "2,5+ Jahre",
      platformsVal: "Android · iOS",
    },
    featured: "[ hervorgehoben ]",
  },
};

export const translations: Record<Lang, Translations> = { en, ar, ja, de };
