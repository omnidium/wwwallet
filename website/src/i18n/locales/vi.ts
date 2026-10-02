export default {
  nav: {
    wallet: 'Ví',
    ethereum: 'Ethereum',
    crypto: 'Tiền điện tử',
    faqs: 'Câu hỏi thường gặp',
    launch: 'Khởi chạy Ví',
    home: 'Quay lại đầu trang',
    sectionNavLabel: 'Điều hướng theo mục',
    principles: 'Các nguyên tắc',
  },
  settings: {
    open: 'Cài đặt',
    close: 'Đóng cài đặt',
    theme: 'Chủ đề',
    themeLight: 'Ánh sáng',
    themeDark: 'Tối',
    language: 'Ngôn ngữ',
    search: 'Tìm kiếm',
    noMatches: 'Không có kết quả phù hợp',
  },
  hero: {
    eyebrow: 'Một ví Ethereum miễn phí, không lưu giữ tài sản',
    heading1: 'Chìa khóa của bạn.',
    heading2: 'Thiết bị của bạn.',
    heading3: 'Miễn phí cho tất cả mọi người.',
    lede: 'wwwallet hoạt động ngay trên trình duyệt của bạn và lưu trữ các khóa của bạn dưới dạng mã hóa trên chính thiết bị của bạn. Bạn không cần tạo tài khoản, không phải trả phí và không có quảng cáo — chỉ đơn giản là một ví hoạt động giống nhau cho tất cả mọi người.',
    ctaPrimary: 'Khởi chạy Ví',
    ctaSecondary: 'Hãy xem cách thức hoạt động của nó',
    note: 'Không cần đăng ký · Không có quảng cáo · Không theo dõi · 31 ngôn ngữ',
  },
  wallet: {
    eyebrow: 'Ví',
    heading: 'Được thiết kế để chỉ có bạn mới có thể mở được',
    lede: 'wwwallet không giữ tiền của bạn — nó giúp bạn tự quản lý số tiền đó. Dưới đây là cách thức hoạt động của nó trong thực tế.',
    points: [
      {
        title: 'Không giữ tài sản, mọi lúc',
        body: 'Các khóa riêng của bạn được tạo và mã hóa ngay trên thiết bị của chính bạn. Các máy chủ của wwwallet không bao giờ tiếp cận được chúng — không có cơ sở dữ liệu ví nào để bị xâm nhập, bởi vì đơn giản là không có cơ sở dữ liệu nào cả.',
      },
      {
        title: 'Được mã hóa bằng AES-256, mở khóa theo cách của bạn',
        body: 'Kho lưu trữ của bạn được bảo vệ bằng mã hóa AES-256-GCM. Bạn có thể mở khóa kho lưu trữ bằng cụm từ khôi phục hoặc kích hoạt phương thức xác thực — Face ID, Touch ID hoặc Windows Hello — để truy cập nhanh chóng và chỉ trên thiết bị.',
      },
      {
        title: 'Tự động khóa',
        body: 'wwwallet sẽ tự động khóa sau một khoảng thời gian ngắn không hoạt động và không bao giờ lưu phiên làm việc đã mở khóa của bạn vào đĩa — chỉ cần đóng tab là nó sẽ quên ngay, và đó là thiết kế có chủ đích.',
      },
      {
        title: 'Một ví, năm mạng Ethereum',
        body: 'Lưu trữ và chuyển tiền trên mạng chính Ethereum, Polygon, Arbitrum, Base và Optimism từ cùng một bộ tài khoản.',
      },
    ],
    caveatTitle:
      'Cụm từ khôi phục sẽ giúp bạn mở khóa kho lưu trữ — đây không phải là một bản sao lưu thần kỳ',
    caveatBody:
      'Hãy lưu cụm từ khôi phục ở một nơi an toàn, đồng thời tạo bản sao lưu trên Google Drive hoặc dưới dạng tệp tin. Bạn sẽ cần bản sao lưu này để khôi phục ví trên thiết bị mới, và cần cụm từ khôi phục để mở khóa ví sau khi khôi phục xong.',
    caveatLink: 'Xem thêm trong phần Câu hỏi thường gặp',
  },
  ethereum: {
    eyebrow: 'Ethereum',
    heading: 'Tại sao lại là Ethereum?',
    lede: 'wwwallet được phát triển dựa trên nền tảng Ethereum. Dưới đây là những lý do giải thích cho điều này, được trình bày một cách dễ hiểu.',
    points: [
      {
        title: 'Một siêu máy tính toàn cầu, không chỉ là một sổ cái',
        body: 'Ethereum đã tiếp thu ý tưởng về một sổ cái chung, không thể bị giả mạo của Bitcoin và phát triển nó thành một hệ thống máy tính toàn cầu, có thể lập trình, mà bất kỳ ai cũng có thể xây dựng trên đó và không một bên nào có thể tắt đi được.',
      },
      {
        title: 'Được bảo đảm bằng cách staking, không phải bằng cách khai thác',
        body: 'Kể từ sự kiện “The Merge” vào năm 2022, Ethereum đã được bảo mật bằng cơ chế Proof-of-Stake thay vì khai thác tiêu tốn nhiều năng lượng — các trình xác thực sử dụng ETH làm tài sản thế chấp thay vì tiêu tốn điện năng để cạnh tranh giành quyền xác nhận các khối.',
      },
      {
        title: 'Mở và không cần xin phép',
        body: 'Không có ai phê duyệt tài khoản của bạn. Bất kỳ ai, ở bất kỳ đâu, cũng có thể nắm giữ ETH hoặc phát triển ứng dụng trên Ethereum — các quy tắc này áp dụng cho tất cả mọi người, kể cả các tổ chức lớn nhất.',
      },
      {
        title: 'Tiêu chuẩn mà các mạng khác dựa vào',
        body: 'Các mạng Layer-2 như Arbitrum, Base và Optimism — tất cả đều được hỗ trợ trên wwwallet — mở rộng tính bảo mật của Ethereum để mang lại các giao dịch nhanh hơn và rẻ hơn, thay vì phải xây dựng lại từ đầu.',
      },
    ],
    linkLabel: 'Đọc thêm tại Quỹ Ethereum',
    linkUrl: 'https://ethereum.org/en/foundation/',
  },
  crypto: {
    eyebrow: 'Tiền điện tử',
    heading: 'Tiền điện tử, nói một cách đơn giản',
    lede: 'Một số khái niệm bạn nên nắm rõ trước khi tự mình sở hữu bất kỳ loại tiền điện tử nào — không chỉ khi sử dụng wwwallet.',
    points: [
      {
        title: 'Người giám hộ so với người không phải là người giám hộ',
        body: 'Ví lưu ký hoặc sàn giao dịch sẽ giữ chìa khóa cho bạn — điều này rất tiện lợi, nhưng bạn phải tin tưởng rằng người khác sẽ không đóng băng, làm mất hoặc sử dụng sai mục đích số tiền của bạn. Một ví không lưu ký như wwwallet sẽ trao chìa khóa — và cả trách nhiệm — hoàn toàn vào tay bạn.',
      },
      {
        title: 'Staking so với khai thác',
        body: 'Khai thác theo cơ chế Proof-of-Work bảo mật blockchain bằng sức mạnh tính toán thô và điện năng. Trong khi đó, cơ chế Proof-of-Stake bảo mật blockchain bằng vốn đầu tư có rủi ro. Việc Ethereum chuyển sang cơ chế staking đã giúp giảm mức tiêu thụ năng lượng xuống hơn 99,9% — con số này tương đương với sự chênh lệch về mức tiêu thụ năng lượng giữa việc cung cấp điện cho một quốc gia nhỏ và một thị trấn nhỏ.',
      },
      {
        title: 'Vượt ra ngoài Ethereum',
        body: 'Bitcoin ưu tiên tính đơn giản và khả năng dự đoán hơn là khả năng lập trình. Các chuỗi khối như Solana tập trung vào việc tối đa hóa thông lượng thô, thường phải đánh đổi tính phi tập trung để đạt được điều đó. Ethereum ưu tiên hàng đầu tính phi tập trung và bảo mật, đồng thời giao phó vấn đề tốc độ và chi phí cho các mạng Lớp 2 được xây dựng trên nền tảng của nó.',
      },
      {
        title: 'Không ai đáng tin cậy lại yêu cầu bạn cung cấp cụm từ bảo mật của mình',
        body: 'Dù bạn sử dụng ví nào đi chăng nữa: không có sàn giao dịch, không có nhân viên hỗ trợ và không có nhân viên nào của wwwallet sẽ bao giờ yêu cầu bạn cung cấp cụm từ khôi phục. Bất kỳ ai làm điều đó đều đang cố gắng lừa đảo bạn.',
      },
    ],
    linkLabel: 'Khám phá sâu hơn cùng podcast Bankless',
    linkUrl: 'https://www.bankless.com/',
  },
  faqs: {
    eyebrow: 'Câu hỏi thường gặp',
    heading: 'Các câu hỏi thường gặp',
    items: [
      {
        q: 'wwwallet có thực sự miễn phí không?',
        a: 'Đúng vậy. Việc sử dụng dịch vụ này hoàn toàn miễn phí, không có gói cao cấp và không có nội dung nào bị giới hạn bởi tường phí, đồng thời wwwallet cũng không thu thêm bất kỳ khoản phí nào đối với các giao dịch gửi hoặc trao đổi của bạn. Chi phí duy nhất không thể tránh khỏi là phí giao dịch (gas) của chính mạng lưới, khoản phí này được chuyển cho mạng lưới chứ không phải cho wwwallet. Báo giá trao đổi đến từ nền tảng tổng hợp giao dịch 0x, có thể bao gồm phí riêng của nền tảng này đối với một số giao dịch — bất kỳ khoản phí nào như vậy đều được liệt kê trên màn hình xác nhận trước khi bạn thực hiện giao dịch.',
      },
      {
        q: 'Có quảng cáo, công cụ theo dõi hay công cụ phân tích không?',
        a: 'Không. wwwallet không hiển thị quảng cáo, không chạy các tập lệnh phân tích hay theo dõi, và không tạo hồ sơ về bạn. Không có tài khoản nào cả, nên không có gì để liên kết với tài khoản đó.',
      },
      {
        q: 'Tôi có cần tài khoản hoặc giấy tờ tùy thân để sử dụng nó không?',
        a: 'Không. Không cần đăng ký, cung cấp địa chỉ email, số điện thoại hay xác minh danh tính — bạn chỉ cần tạo ví trên thiết bị của mình và bắt đầu sử dụng ngay.',
      },
      {
        q: 'Nếu dịch vụ này miễn phí, thì wwwallet lấy nguồn thu từ đâu?',
        a: 'Nền tảng này không kiếm tiền từ người dùng — không thu phí, không có quảng cáo, không bán dữ liệu. Chi phí vận hành được thiết kế để ở mức thấp: chính ví tiền điện tử này chạy trực tiếp trên trình duyệt của bạn, còn hệ thống phía sau chỉ đóng vai trò trung gian truyền tải dữ liệu blockchain công khai và dữ liệu giá.',
      },
      {
        q: 'Có ai có thể khóa ví của tôi không?',
        a: 'Không có tài khoản nào cả, nên wwwallet — hay bất kỳ ai khác — cũng không có gì để đóng băng. Khóa riêng tư của bạn không bao giờ rời khỏi thiết bị của bạn, và các giao dịch được ký tại đó trước khi được gửi lên mạng. Tiền của bạn được lưu trữ trên Ethereum, không phải trong wwwallet: bạn có thể xem khóa riêng tư hoặc cụm từ khôi phục của bất kỳ tài khoản nào từ menu của nó và nhập nó vào một ví Ethereum khác bất cứ lúc nào bạn muốn.',
      },
      {
        q: 'Cụm từ khôi phục của tôi có đủ để lấy lại ví của mình không?',
        a: 'Không phải chỉ riêng nó. Cụm từ khôi phục của bạn dùng để mở khóa kho dữ liệu được mã hóa, nhưng bản thân kho dữ liệu đó chỉ tồn tại trên thiết bị của bạn. Nếu bạn làm mất hoặc xóa sạch thiết bị đó mà chưa bao giờ sao lưu, thì sẽ không còn gì để cụm từ khôi phục có thể mở khóa nữa. Hãy luôn kết hợp cụm từ khôi phục với bản sao lưu trên Google Drive hoặc tệp tin — xem câu hỏi tiếp theo.',
      },
      {
        q: 'Làm thế nào để sao lưu ví của tôi?',
        a: 'Từ mục Cài đặt, hãy sao lưu kho tiền được mã hóa của bạn lên Google Drive cá nhân — được lưu trữ trong một thư mục riêng tư, chỉ ứng dụng mới có thể truy cập (wwwallet không thể xem các phần còn lại của thư mục này) — hoặc dưới dạng tệp tin mà bạn tải xuống và tự lưu giữ. Hãy thực hiện thao tác này mỗi khi bạn thiết lập ví hoặc thêm tài khoản mới.',
      },
      {
        q: 'Tôi có thể sử dụng wwwallet trên nhiều thiết bị không?',
        a: 'Đúng vậy, nhưng nó không tự động đồng bộ hóa — mỗi thiết bị đều có kho lưu trữ cục bộ riêng. Để sử dụng wwwallet trên một thiết bị mới, hãy khôi phục dữ liệu từ bản sao lưu trên Drive hoặc tệp tin, sau đó mở khóa bằng cụm từ khôi phục của bạn.',
      },
      {
        q: 'Nếu tôi làm mất thiết bị mà chưa bao giờ sao lưu thì sẽ ra sao?',
        a: 'Số tiền của bạn không thể khôi phục được. Điều này là do thiết kế: wwwallet không có hệ thống tài khoản và không lưu giữ bản sao kho tiền của bạn ở bất kỳ đâu, vì vậy không ai — kể cả chúng tôi — có thể khôi phục nó cho bạn. Đó là sự đánh đổi để có được một ví mà chỉ riêng bạn mới có thể truy cập.',
      },
      {
        q: 'Các khóa truy cập (Face ID / Touch ID) có được chuyển sang thiết bị mới không?',
        a: 'Không. Mật khẩu chính được liên kết với thiết bị mà nó được tạo ra. Sau khi khôi phục bản sao lưu trên thiết bị mới, hãy mở khóa bằng cụm từ khôi phục của bạn và bạn có thể thiết lập một mật khẩu chính mới trên thiết bị đó.',
      },
      {
        q: 'wwwallet có phải là phần mềm mã nguồn mở không?',
        a: 'Không — đây là phần mềm có mã nguồn công khai. Toàn bộ mã nguồn được công bố công khai trên GitHub nên bất kỳ ai cũng có thể đọc, xem xét và kiểm tra, nhưng nó không phải là phần mềm mã nguồn mở: mã nguồn này được cấp phép theo Giấy phép PolyForm Strict 1.0.0.',
      },
      {
        q: 'Tôi được phép làm gì với đoạn mã này?',
        a: 'Bạn có thể đọc và kiểm tra toàn bộ nội dung, đồng thời sử dụng một bản sao nguyên vẹn cho các mục đích phi thương mại như học tập cá nhân, nghiên cứu và thử nghiệm. Bạn không được phép phân phối, sửa đổi hoặc tạo ra các tác phẩm phái sinh (bao gồm cả các phiên bản phân nhánh), cũng như không được sử dụng nó cho mục đích thương mại. Nếu bạn cần thực hiện những việc mà giấy phép này không cho phép, hãy liên hệ với chủ sở hữu bản quyền để xin một giấy phép riêng.',
      },
      {
        q: 'wwwallet có an toàn khi sử dụng không? Có chế độ bảo hành nào không?',
        a: 'wwwallet là phần mềm không lưu ký được cung cấp “nguyên trạng”, không kèm theo bất kỳ hình thức bảo hành nào. Chỉ bạn mới có quyền kiểm soát các khóa và số tiền của mình — không ai, kể cả chúng tôi, có thể khôi phục cụm từ khôi phục hoặc bản sao lưu bị mất, hủy bỏ giao dịch, hoặc bồi thường cho bạn về các khoản lỗ. Chỉ nên sử dụng số tiền mà bạn có thể chấp nhận mất, kiểm tra kỹ địa chỉ và mạng lưới trước khi gửi, và những thông tin ở đây không phải là lời khuyên về tài chính, đầu tư, pháp lý hoặc thuế.',
      },
      {
        q: 'wwwallet hỗ trợ những mạng nào?',
        a: 'Mạng chính Ethereum, cùng với các mạng Layer-2 như Polygon, Arbitrum, Base và Optimism — tất cả đều được quản lý từ cùng một bộ tài khoản.',
      },
      {
        q: 'Làm thế nào để nạp tiền vào ví của tôi?',
        a: 'Mở tài khoản, chọn “Xem mã QR” để xem địa chỉ của tài khoản, sau đó chuyển tiền đến địa chỉ đó từ sàn giao dịch hoặc ví khác. Hãy đảm bảo bạn gửi tiền trên mạng đúng (Ethereum, Polygon, Arbitrum, Base hoặc Optimism) — cùng một địa chỉ hoạt động trên tất cả các mạng này, nhưng số tiền gửi trên một mạng chỉ hiển thị trên mạng đó. Bạn cũng cần có một ít đồng tiền gốc của mạng đó (chẳng hạn như ETH) để thanh toán phí giao dịch.',
      },
      {
        q: 'Tôi có thể làm gì với wwwallet?',
        a: 'Gửi: chuyển ETH hoặc bất kỳ token nào đến địa chỉ mà bạn dán vào, quét từ mã QR hoặc chọn từ các tài khoản của chính bạn, và kiểm tra lại thông tin trước khi xác nhận. Hoán đổi: đổi một token lấy một token khác trên cùng một mạng từ tab “Hoán đổi”, với báo giá và ước tính phí được hiển thị ngay từ đầu. Nhận: hiển thị địa chỉ của bạn dưới dạng mã QR. Bạn cũng có thể xem số dư của mình dưới dạng giá trị USD và lịch sử giao dịch trên tất cả các mạng được hỗ trợ.',
      },
      {
        q: 'wwwallet biết những gì về tôi?',
        a: 'Không có thông tin nào giúp xác định danh tính của bạn. Không có tài khoản, thông tin đăng nhập hay cơ sở dữ liệu. Dữ liệu về số dư và giá cả được lấy từ hệ thống backend riêng của wwwallet, thay vì trình duyệt của bạn gọi trực tiếp đến các nhà cung cấp bên thứ ba, và hệ thống backend đó hoàn toàn không tiếp cận được khóa riêng, mật khẩu hay cụm từ khôi phục của bạn.',
      },
    ],
  },
  footer: {
    tagline: 'Một ví Ethereum miễn phí, không lưu giữ tài sản dành cho tất cả mọi người.',
    copyright: '© {year} wwwallet',
    licenseLink: 'Được cấp phép theo Giấy phép PolyForm Strict 1.0.0',
    disclaimer:
      'Phần mềm không lưu giữ được cung cấp “nguyên trạng”, không kèm theo bất kỳ bảo hành nào. Đây không phải là lời khuyên tài chính. Bạn hoàn toàn chịu trách nhiệm về các khóa và số tiền của mình.',
  },
  license: {
    title: 'Giấy phép',
    close: 'Đóng',
    summaryTitle: 'Nói một cách đơn giản',
    canUse:
      'Bạn có thể sử dụng wwwallet miễn phí cho mục đích cá nhân và các mục đích phi thương mại khác.',
    canRead: 'Bạn có thể đọc và kiểm tra từng dòng mã nguồn của nó.',
    cannot: 'Bạn không được sao chép, sửa đổi, phân phối lại hoặc bán tài liệu này.',
    englishNote: 'Dưới đây là toàn văn giấy phép bằng tiếng Anh gốc — đây là văn bản pháp lý.',
    viewSource: 'Xem trên GitHub',
  },
  principles: {
    eyebrow: 'Các nguyên tắc',
    heading: 'Miễn phí, mở và được thiết kế dành cho mọi người',
    lede: 'Ví điện tử nên là một công cụ để bạn sử dụng, chứ không phải là một mô hình kinh doanh dựa vào người dùng. Đây chính là những cam kết mà wwwallet được xây dựng dựa trên.',
    items: [
      {
        title: 'Miễn phí, không có điều kiện nào cả',
        body: 'Không có giá, không có gói cao cấp, không có tính năng trả phí. wwwallet không thu thêm bất kỳ khoản phí nào — chi phí duy nhất là phí giao dịch của chính mạng lưới đó.',
      },
      {
        title: 'Không có quảng cáo, không theo dõi',
        body: 'Không có quảng cáo, không có công cụ phân tích, không có mã theo dõi và không bán dữ liệu cho bất kỳ ai. Ngay từ đầu, đã không có hồ sơ cá nhân nào của bạn để bán cả.',
      },
      {
        title: 'Không cần đăng ký',
        body: 'Không cần email, số điện thoại hay xác minh danh tính. Chỉ cần mở ứng dụng, tạo ví là bạn đã sẵn sàng.',
      },
      {
        title: 'Bạn luôn mang theo chìa khóa bên mình',
        body: 'Các khóa được tạo và mã hóa ngay trên thiết bị của bạn và không bao giờ rời khỏi thiết bị đó. wwwallet không thể xem các khóa này, không thể chuyển tiền của bạn cũng như không thể khóa tài khoản của bạn.',
      },
      {
        title: 'Hoạt động ở mọi nơi',
        body: 'Hoạt động trên mọi trình duyệt hiện đại trên điện thoại hoặc máy tính để bàn, và cài đặt giống như một ứng dụng — không cần tài khoản trên cửa hàng ứng dụng.',
      },
      {
        title: 'Bằng 31 ngôn ngữ',
        body: 'Hãy sử dụng nó bằng ngôn ngữ mà bạn cảm thấy thoải mái nhất, ở chế độ sáng hoặc tối.',
      },
      {
        title: 'Mã nguồn mở',
        body: 'Toàn bộ mã nguồn đã được công bố để bất kỳ ai cũng có thể đọc và kiểm tra. Đây là mã nguồn có sẵn chứ không phải mã nguồn mở — phần Câu hỏi thường gặp (FAQ) giải thích những gì giấy phép cho phép.',
      },
      {
        title: 'Không có gì cần tắt cả',
        body: 'Không có tài khoản nào bị đóng băng cả. Tiền của bạn được lưu trữ trực tiếp trên mạng Ethereum, và khóa của bất kỳ tài khoản nào cũng có thể được chuyển sang ví khác bất cứ lúc nào.',
      },
    ],
  },
}
