// tr — Türkçe sözlük. Anahtar şekli en ile birebir aynıdır (tests/seo.test.ts derin karşılaştırır).
const tr = {
  brand: "KeyCheats",
  tagline: "Doğru kalan klavye kısayol kopya kağıtları.",
  metaDesc: "VS Code, macOS, Windows, Chrome ve GitHub için aranabilir, yazdırılabilir kısayol kopya kağıtları. Gerçek açıklamalar, Mac ⇄ Windows tuşları — her şey tarayıcında.",

  nav: {
    tools: "Tüm araçlar",
    categories: "Kategoriler",
    about: "Hakkında",
    menu: "Menü",
    language: "Dil",
  },

  home: {
    heroTitle: "Önemli her kısayol — aranabilir, yazdırılabilir, hiç eskimeyen",
    heroSub: "Gerçek açıklamalı, OS'a göre tuş gösteren ve anında arama yapan {n} kısayol kopya kağıdı. Reklam yok, kayıt yok.",
    browseAll: "Tüm araçlara göz at",
    categoriesTitle: "Kategoriler",
    featuredTitle: "Popüler araçlar",
    trustLocal: "Dosyalar cihazında kalır",
    trustFree: "Ücretsiz, hesap yok",
    trustFast: "Anında, çevrimdışı bile çalışır",
    rotating: [
      "VS Code, macOS, Windows, Chrome, GitHub — her yaprak resmi belgelerle kontrol edildi",
      "Mac ⇄ Windows arasında geç — tuşlar kendiliğinden değişir",
      "125'ten fazla kısayolu ad, açıklama veya tuşla ara",
      "Tek tıkla masalık temiz bir başvuru yazdır",
    ],
    statsLabels: { tools: "araç", languages: "dil", uploads: "yükleme", accounts: "hesap" },
    eyebrow: "Sonsuza kadar ücretsiz",
    heroCtaSecondary: "Nasıl çalışır",
    statsTools: "{n} araç",
    statsLanguages: "{n} dil",
    statsUploads: "0 yükleme",
    statsAccounts: "0 hesap",
    categoriesSub: "Uygulama başına bir yaprak: her kısayol gruplu, açıklamalı ve aranabilir.",
    popularSub: "En çok açılan araçlar.",
    privacyTitle: "Kısayolların tarayıcından asla çıkmaz.",
    privacySub: "Yükleme adımı da sunucu da yok. Yapraklar, tarayıcında çalışan veri ve JavaScript'ten ibaret — bu bir politika sözü değil, yapılış biçimi.",
    privacyPoint1T: "Yerel işleme",
    privacyPoint1D: "Arama, OS algılama, tuş görselleştirme ve çakışma kontrolü cihazının belleğinde çalışır. Hiçbir şey iletilmez.",
    privacyPoint2T: "Hesap yok",
    privacyPoint2D: "Kayıt yok, e-posta yok, saklanan geçmiş yok. Aracı aç ve kullan.",
    privacyPoint3T: "Tasarımdan dürüst",
    privacyPoint3D:
      "Bir şey gerçekten tarayıcıda yapılamıyorsa, yapılabiliyormuş gibi göstermek yerine bunu söyleriz.",
    privacyLink: "Tüm gizlilik notunu oku",
    endTitle: "Tuşu bul. Bas. İşine dön.",
    endSub: "Aranabilir, yazdırılabilir, 15 dilde.",
  },

  tools: {
    title: "Tüm araçlar",
    subtitle: "{count} ücretsiz tarayıcı aracı. Yükleme yok, kayıt yok.",
    filterPlaceholder: "Araçlarda ara…",
    count: "{count} araç",
    empty: "“{query}” ile eşleşen araç yok.",
  },

  categories: {
    pdf: { name: "PDF", desc: "PDF dosyalarını hiçbir yere yüklemeden birleştir, böl, dönüştür ve düzenle." },
    image: { name: "Görsel", desc: "Görselleri doğrudan tarayıcında sıkıştır, yeniden boyutlandır, kırp ve dönüştür." },
    text: { name: "Metin", desc: "Metni yazarken anında say, temizle, sırala ve dönüştür." },
    developer: { name: "Geliştirici", desc: "Günlük klavye işi için kısayol kopya kağıtları, tuş görselleri ve yinelenen atama kontrolü." },
    seo: { name: "SEO", desc: "Meta etiketleri, schema işaretlemesi, SERP önizlemesi ve diğer sayfa içi SEO yardımcıları." },
    security: { name: "Güvenlik", desc: "Şifreler, karma (hash) değerleri ve sorgular — cihazında üretilir, cihazında denetlenir." },
    utility: { name: "Yardımcı Araçlar", desc: "Birim dönüştürücüler, hesap makineleri ve günlük yardımcılar." },
  },

  tool: {
    howTo: "Nasıl kullanılır",
    faq: "Sık sorulan sorular",
    related: "İlgili araçlar",
    privacyNote:
      "Bu araç tamamen tarayıcında çalışır. Verilerin asla cihazından çıkmaz — hiçbir sunucuya yüklenmez.",
    inCategory: "{category} kategorisinde daha fazlası",
    backToCategory: "Tüm {category} araçları",
  },

  common: {
    openTool: "Aracı aç",
    copy: "Kopyala",
    copied: "Kopyalandı",
    download: "İndir",
    reset: "Sıfırla",
    swap: "Değiştir",
    clear: "Temizle",
    error: "Bir şeyler ters gitti. Girdini kontrol edip tekrar dene.",
    input: "Girdi",
    output: "Sonuç",
    settings: "Seçenekler",
    dropFiles: "Dosyaları buraya bırak veya tıklayarak seç",
    dropFile: "Dosyayı buraya bırak veya tıklayarak seç",
    processing: "İşleniyor…",
    fileSize: "Boyut",
    sample: "Örneği dene",
    uppercase: "BÜYÜKHARF",
  },

  unit: {
    from: "Kaynak",
    to: "Hedef",
    amount: "Miktar",
    result: "Sonuç",
    common: "Sık kullanılan dönüşümler",
    formula: "Formül",
    allUnits: "Tüm birimler",
  },

  text: {
    stats: {
      words: "Kelime",
      characters: "Karakter",
      charsNoSpaces: "Boşluksuz",
      sentences: "Cümle",
      paragraphs: "Paragraf",
      lines: "Satır",
      readingTime: "Okuma süresi",
      readingMinutes: "{n} dk okuma",
    },
  },

  footer: {
    line: "Her kısayol klavyenden geçer — her yaprak tarayıcında çalışır.",
    privacy: "Gizlilik",
    terms: "Kullanım Koşulları",
    about: "Hakkında",
    badges: "Rozetler",
    language: "Dil",
  },

  badge: {
    title: "KeyCheats rozetleri",
    desc: "Sitenize, README'nize veya dokümanlarınıza bir KeyCheats rozeti ekleyin. Buraya bağlanır ve bu kısayol yapraklarının doğru kaldığını ve tamamen tarayıcıda çalıştığını söyler.",
    voluntary: "Yerleştirme tamamen isteğe bağlıdır — projeyi seviyorsan bir rozet seç. İzin almaya gerek yok.",
    md: "Markdown (README)",
    html: "HTML (web sitesi)",
    thanks: "Duyulmamıza yardım ettiğin için teşekkürler — her yerleştirme, dosyalarına saygı duyan araçları daha çok kişinin keşfetmesini sağlar.",
  },

  embed: {
    title: "Bu aracı gömün",
    desc: "Tek satırla bu aracı sitenize ekleyin — ziyaretçinin tarayıcısında çalışır.",
  },

    mcp: {
    title: "MCP sunucusu — AI erişimli araçlar",
    desc1: "KeyCheats bir MCP (Model Context Protocol) sunucusuyla gelir: Claude veya Cursor gibi yapay zekâ asistanları kısayol veri setini arayabilir, yinelenen atamaları bulabilir ve tuşları görselleştirebilir — sitenin test edilmiş aynı mantığıyla, yeniden yazmadan.",
    desc2: "Araçlar, sitenin saf fonksiyonlarını aynı küratörlü veri seti üzerinde çalıştırır (VS Code, macOS, Windows, Chrome, GitHub). Yürütme npx ile yapay zekâ istemcisinin makinesinde olur — sunucularımıza hiçbir şey gönderilmez.",
    toolsTitle: "Çalıştırılabilir araçlar ({n})",
    requiresNode: "Node.js 18+ gerekir. Sunucu stdio üzerinden yerel çalışır; yalnızca yaptığınız çağrılar makinenizde hesaplanır.",
    privacy: "Node.js 18+ gerekir. Sunucu stdio üzerinden yerel çalışır; yalnızca yaptığınız çağrılar makinenizde hesaplanır.",
  },

    notFound: {
    title: "Sayfa bulunamadı",
    body: "Aradığın araç mevcut değil. Onun yerine tüm araçlara göz at.",
    home: "Ana sayfaya git",
  },
};

export default tr;
