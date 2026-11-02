// vi — từ điển tiếng Việt. Hình dạng khóa phải khớp en chính xác (tests/seo.test.ts).
// Giữ nguyên "KeyCheats", các placeholder {n}/{count}/{query}/{category} và token kỹ thuật.
const vi = {
  brand: "KeyCheats",
  tagline: "Tài liệu phím tắt luôn chính xác.",
  metaDesc: "Tài liệu phím tắt tìm được và in được cho VS Code, macOS, Windows, Chrome và GitHub — mô tả thật, phím Mac ⇄ Windows, tất cả chạy trong trình duyệt.",

  nav: {
    tools: "Tất cả công cụ",
    categories: "Danh mục",
    about: "Giới thiệu",
    menu: "Menu",
    language: "Ngôn ngữ",
  },

  home: {
    heroTitle: "Mọi phím tắt quan trọng — tìm được, in được, không bao giờ lỗi thời",
    heroSub: "{n} tài liệu phím tắt với mô tả thật, phím theo hệ điều hành của bạn và tìm kiếm tức thì. Không quảng cáo, không đăng ký.",
    browseAll: "Xem tất cả công cụ",
    categoriesTitle: "Danh mục",
    featuredTitle: "Công cụ phổ biến",
    trustLocal: "File luôn ở lại thiết bị của bạn",
    trustFree: "Miễn phí, không cần tài khoản",
    trustFast: "Tức thì, dùng được cả khi offline",
    rotating: [
      "VS Code, macOS, Windows, Chrome, GitHub — mỗi tài liệu đều đối chiếu với tài liệu chính thức",
      "Chuyển Mac ⇄ Windows và các phím tự đổi theo",
      "Tìm trong hơn 125 phím tắt theo tên, mô tả hoặc phím",
      "In tài liệu tham khảo sạch sẽ cho bàn làm việc chỉ với một cú nhấp",
    ],
    statsLabels: { tools: "công cụ", languages: "ngôn ngữ", uploads: "lượt tải lên", accounts: "tài khoản" },
    eyebrow: "Miễn phí mãi mãi",
    heroCtaSecondary: "Cách hoạt động",
    statsTools: "{n} công cụ",
    statsLanguages: "{n} ngôn ngữ",
    statsUploads: "0 lượt tải lên",
    statsAccounts: "0 tài khoản",
    categoriesSub: "Mỗi ứng dụng một tài liệu: mọi phím tắt được nhóm, mô tả và tìm được.",
    popularSub: "Những công cụ được mở nhiều nhất.",
    privacyTitle: "Phím tắt của bạn không bao giờ rời trình duyệt.",
    privacySub: "Không có bước tải lên và không có máy chủ. Tài liệu là dữ liệu cùng JavaScript chạy trong trình duyệt của bạn — đó là cách xây dựng, không phải lời hứa chính sách.",
    privacyPoint1T: "Xử lý cục bộ",
    privacyPoint1D: "Tìm kiếm, nhận diện hệ điều hành, vẽ phím và kiểm tra xung đột đều chạy trong bộ nhớ thiết bị của bạn. Không gửi đi đâu cả.",
    privacyPoint2T: "Không cần tài khoản",
    privacyPoint2D: "Không đăng ký, không email, không lưu lịch sử. Mở công cụ lên và dùng ngay.",
    privacyPoint3T: "Trung thực từ thiết kế",
    privacyPoint3D:
      "Nếu có gì đó thực sự không thể làm trong trình duyệt, chúng tôi nói thẳng thay vì giả vờ được.",
    privacyLink: "Đọc ghi chú riêng tư đầy đủ",
    endTitle: "Tìm phím. Nhấn. Quay lại công việc.",
    endSub: "Tìm được, in được, bằng 15 ngôn ngữ.",
  },

  tools: {
    title: "Tất cả công cụ",
    subtitle: "Tìm kiếm trong {count} công cụ trình duyệt miễn phí. Không tải lên, không đăng ký.",
    filterPlaceholder: "Tìm công cụ…",
    count: "{count} công cụ",
    empty: "Không có công cụ nào khớp với “{query}”.",
  },

  categories: {
    pdf: { name: "PDF", desc: "Gộp, tách, chuyển đổi và chỉnh sửa file PDF mà không cần tải lên bất cứ đâu." },
    image: { name: "Ảnh", desc: "Nén, đổi kích thước, cắt và chuyển đổi ảnh ngay trong trình duyệt của bạn." },
    text: { name: "Văn bản", desc: "Đếm, làm sạch, sắp xếp và biến đổi văn bản tức thì khi bạn gõ." },
    developer: { name: "Lập trình viên", desc: "Tài liệu phím tắt, hiển thị phím và kiểm tra trùng gán cho công việc bàn phím hằng ngày." },
    seo: { name: "SEO", desc: "Thẻ meta, dữ liệu có cấu trúc, xem trước SERP và các trợ thủ SEO trên trang." },
    security: { name: "Bảo mật", desc: "Mật khẩu, hàm băm và tra cứu — tạo và kiểm tra ngay trên thiết bị của bạn." },
    utility: { name: "Tiện ích", desc: "Bộ chuyển đổi đơn vị, máy tính và các trợ thủ hằng ngày." },
  },

  tool: {
    howTo: "Cách sử dụng",
    faq: "Câu hỏi thường gặp",
    related: "Công cụ liên quan",
    privacyNote:
      "Công cụ này chạy hoàn toàn trong trình duyệt của bạn. Dữ liệu không bao giờ rời khỏi thiết bị — không được tải lên bất kỳ máy chủ nào.",
    inCategory: "Xem thêm trong {category}",
    backToCategory: "Tất cả công cụ {category}",
  },

  common: {
    copy: "Sao chép",
    copied: "Đã sao chép",
    download: "Tải xuống",
    reset: "Đặt lại",
    swap: "Đảo chiều",
    clear: "Xóa",
    error: "Đã xảy ra lỗi. Kiểm tra dữ liệu nhập và thử lại.",
    input: "Đầu vào",
    output: "Kết quả",
    settings: "Tùy chọn",
    dropFiles: "Kéo thả file vào đây hoặc bấm để chọn",
    dropFile: "Kéo thả file vào đây hoặc bấm để chọn",
    processing: "Đang xử lý…",
    fileSize: "Dung lượng",
    sample: "Dùng thử ví dụ",
    uppercase: "CHỮ IN HOA",
  },

  unit: {
    from: "Từ",
    to: "Sang",
    amount: "Số lượng",
    result: "Kết quả",
    common: "Chuyển đổi thường dùng",
    formula: "Công thức",
    allUnits: "Tất cả đơn vị",
  },

  text: {
    stats: {
      words: "Từ",
      characters: "Ký tự",
      charsNoSpaces: "Không khoảng trắng",
      sentences: "Câu",
      paragraphs: "Đoạn",
      lines: "Dòng",
      readingTime: "Thời gian đọc",
      readingMinutes: "{n} phút đọc",
    },
  },

  footer: {
    line: "Mọi phím tắt đi qua bàn phím của bạn — mọi tài liệu chạy trong trình duyệt của bạn.",
    privacy: "Quyền riêng tư",
    terms: "Điều khoản",
    about: "Giới thiệu",
    badges: "Huy hiệu",
    language: "Ngôn ngữ",
  },

  badge: {
    title: "Huy hiệu KeyCheats",
    desc: "Gắn huy hiệu KeyCheats lên trang web, README hoặc tài liệu của bạn. Nó dẫn về đây và cho biết các tài liệu phím tắt này luôn chính xác và chạy hoàn toàn trong trình duyệt.",
    voluntary: "Việc nhúng hoàn toàn tự nguyện — chọn một huy hiệu nếu bạn thích dự án này. Không cần xin phép ai.",
    md: "Markdown (README)",
    html: "HTML (trang web)",
    thanks: "Cảm ơn bạn đã lan tỏa — mỗi lượt nhúng giúp nhiều người hơn khám phá những công cụ tôn trọng file của họ.",
  },

  embed: {
    title: "Nhúng công cụ này",
    desc: "Đưa công cụ này vào trang của bạn bằng một dòng — nó chạy trong trình duyệt của khách.",
  },

    mcp: {
    title: "Máy chủ MCP — công cụ cho AI gọi trực tiếp",
    desc1: "KeyCheats kèm máy chủ MCP (Model Context Protocol): trợ lý AI như Claude hay Cursor có thể tìm trong bộ dữ liệu phím tắt, phát hiện gán trùng và vẽ keycap — cùng logic đã kiểm thử của trang, không cần viết lại.",
    desc2: "Các công cụ chạy hàm thuần của trang trên cùng bộ dữ liệu tuyển chọn (VS Code, macOS, Windows, Chrome, GitHub). Việc thực thi diễn ra qua npx trên máy của client AI — không gửi gì tới máy chủ của chúng tôi.",
    toolsTitle: "Công cụ chạy được ({n})",
    requiresNode: "Cần Node.js 18+. Máy chủ chạy cục bộ qua stdio; chỉ các lệnh bạn gọi được tính trên máy của bạn.",
    privacy: "Cần Node.js 18+. Máy chủ chạy cục bộ qua stdio; chỉ các lệnh bạn gọi được tính trên máy của bạn.",
  },

    notFound: {
    title: "Không tìm thấy trang",
    body: "Công cụ bạn tìm không tồn tại. Hãy xem tất cả công cụ thay thế.",
    home: "Về trang chủ",
  },
};

export default vi;
