export default {
  nav: {
    wallet: 'wwwallet',
    ethereum: 'Ethereum',
    crypto: 'Tiền điện tử',
    faqs: 'Câu hỏi thường gặp',
    launch: 'Ra mắt wwwallet',
    home: 'Quay lại đầu trang',
    sectionNavLabel: 'Điều hướng các phần',
    principles: 'Các nguyên tắc',
  },
  settings: {
    open: 'Cài đặt',
    close: 'Đóng cài đặt',
    theme: 'Chủ đề',
    themeLight: 'Light',
    themeDark: 'Dark',
    language: 'Ngôn ngữ',
    search: 'Tìm kiếm',
    noMatches: 'Không có kết quả phù hợp',
    version: 'Phiên bản {version}',
  },
  hero: {
    eyebrow: 'Một ví Ethereum miễn phí, không lưu ký',
    heading1: 'Khóa của cậu.',
    heading2: 'Thiết bị của cậu.',
    heading3: 'Miễn phí cho tất cả mọi người.',
    lede: 'wwwallet chạy trên trình duyệt của cậu và lưu trữ các khóa của cậu dưới dạng mã hóa trên chính thiết bị của cậu. Không cần tạo tài khoản, không phải trả phí và không có quảng cáo, và ứng dụng hoạt động giống nhau cho tất cả mọi người.',
    ctaPrimary: 'Ra mắt wwwallet',
    ctaSecondary: 'Xem cách nó hoạt động',
    note: 'Không cần đăng ký · Không quảng cáo · Không theo dõi · Hỗ trợ 31 ngôn ngữ',
  },
  wallet: {
    eyebrow: 'wwwallet',
    heading: 'Được thiết kế để chỉ có cậu mới mở được nó',
    lede: 'wwwallet không giữ tiền của cậu — ứng dụng này giúp cậu tự quản lý số tiền đó. Dưới đây là ý nghĩa thực tế của điều này.',
    points: [
      {
        title: 'Không lưu ký, luôn luôn',
        body: 'Các khóa riêng tư của cậu được tạo ra và mã hóa ngay trên thiết bị của cậu. Máy chủ của wwwallet không bao giờ nhìn thấy chúng — không có cơ sở dữ liệu khóa nào để bị xâm phạm, vì thực ra chẳng có cơ sở dữ liệu nào cả.',
      },
      {
        title: 'Được mã hóa bằng AES-256, mở khóa theo cách của cậu',
        body: 'Kho tiền của cậu được bảo vệ bằng mã hóa AES-256-GCM. Mở khóa bằng cụm từ khôi phục của cậu, hoặc bật mật khẩu — Face ID, Touch ID hoặc Windows Hello — để truy cập nhanh chóng và chỉ trên thiết bị cục bộ.',
      },
      {
        title: 'Tự động khóa',
        body: 'wwwallet sẽ tự khóa sau một khoảng thời gian ngắn không hoạt động và tuyệt đối không lưu phiên làm việc đã mở khóa của cậu lên đĩa — chỉ cần đóng tab là ứng dụng sẽ quên ngay, đó là thiết kế có chủ đích.',
      },
      {
        title: 'Năm mạng Ethereum, một bộ tài khoản',
        body: 'Cậu có thể lưu trữ và gửi tiền trên mạng chính Ethereum, Polygon, Arbitrum, Base và Optimism bằng cùng một tài khoản và địa chỉ.',
      },
    ],
    caveatTitle:
      'Cụm từ khôi phục của cậu sẽ mở khóa kho tiền của cậu — nó không phải là bản sao lưu thần kỳ đâu nhé',
    caveatBody:
      'Hãy lưu cụm từ khôi phục của cậu ở một nơi an toàn, đồng thời sao lưu vào Google Drive hoặc tệp tin. Cậu sẽ cần bản sao lưu này để khôi phục ví trên thiết bị mới, và cần cụm từ đó để mở khóa ví sau khi khôi phục xong.',
    caveatLink: 'Đọc thêm trong phần Câu hỏi thường gặp',
  },
  ethereum: {
    eyebrow: 'Ethereum',
    heading: 'Tại sao lại là Ethereum',
    lede: 'wwwallet được phát triển dành riêng cho Ethereum. Dưới đây là lý do giải thích điều này, bằng ngôn ngữ dễ hiểu.',
    points: [
      {
        title: 'Một cỗ máy tính toàn cầu, không chỉ đơn thuần là một sổ cái',
        body: 'Ethereum đã lấy ý tưởng về sổ cái chung, chống giả mạo của Bitcoin và phát triển nó lên một tầm cao mới: một chiếc máy tính toàn cầu, có thể lập trình, mà ai cũng có thể xây dựng trên đó, và không một bên nào có thể tắt nó đi.',
      },
      {
        title: 'Được bảo mật bằng cách staking, không phải mining',
        body: 'Kể từ sự kiện “The Merge” vào năm 2022, Ethereum đã được bảo mật bằng cơ chế Proof-of-Stake thay vì khai thác tiêu tốn nhiều năng lượng — các validator sẽ dùng ETH làm tài sản thế chấp thay vì tiêu tốn điện năng để cạnh tranh giành các khối.',
      },
      {
        title: 'Mở và không cần xin phép',
        body: 'Không ai phê duyệt tài khoản của cậu cả. Bất kỳ ai, ở bất kỳ đâu, đều có thể nắm giữ ETH hoặc xây dựng ứng dụng trên Ethereum — các quy tắc này áp dụng cho tất cả mọi người, kể cả những tổ chức lớn nhất.',
      },
      {
        title: 'Tiêu chuẩn mà các mạng khác dựa vào',
        body: 'Các mạng Layer-2 như Arbitrum, Base và Optimism — đều được wwwallet hỗ trợ — mở rộng tính bảo mật của Ethereum để mang lại các giao dịch nhanh hơn, rẻ hơn thay vì phải bắt đầu lại từ đầu.',
      },
    ],
    linkLabel: 'Đọc thêm tại Ethereum Foundation',
    linkUrl: 'https://ethereum.org/en/foundation/',
  },
  crypto: {
    eyebrow: 'Tiền điện tử',
    heading: 'Tiền điện tử, nói một cách dễ hiểu',
    lede: 'Một vài khái niệm đáng để hiểu rõ trước khi cậu tự mình sở hữu bất kỳ loại tiền điện tử nào — không chỉ với wwwallet đâu nhé.',
    points: [
      {
        title: 'Có lưu ký và không lưu ký',
        body: 'Ví có lưu ký hoặc sàn giao dịch sẽ giữ khóa cho cậu — tuy tiện lợi nhưng cậu phải tin tưởng người khác sẽ không đóng băng, làm mất hoặc lạm dụng tiền của cậu. Còn ví không lưu ký như wwwallet thì để toàn bộ khóa, cũng như trách nhiệm, hoàn toàn trong tay cậu.',
      },
      {
        title: 'Staking so với mining',
        body: 'Khai thác theo cơ chế Proof-of-Work bảo mật blockchain bằng sức mạnh tính toán thô và điện năng. Trong khi đó, Proof-of-Stake bảo mật blockchain bằng vốn đầu tư có rủi ro. Việc Ethereum chuyển sang cơ chế staking đã giúp giảm hơn 99,9% lượng năng lượng tiêu thụ — tương đương với sự chênh lệch về mức tiêu thụ điện năng giữa một quốc gia nhỏ và một thị trấn nhỏ.',
      },
      {
        title: 'Ngoài Ethereum',
        body: 'Bitcoin ưu tiên tính đơn giản và khả năng dự đoán hơn là khả năng lập trình. Các chuỗi như Solana tập trung vào thông lượng thô, thường phải đánh đổi tính phi tập trung để đạt được điều đó. Ethereum thì ưu tiên tính phi tập trung và bảo mật lên hàng đầu, còn tốc độ và chi phí thì để các mạng Layer-2 được xây dựng trên nền tảng của nó lo.',
      },
      {
        title: 'Không ai đáng tin cậy lại đi hỏi cụm từ của cậu đâu',
        body: 'Không có sàn giao dịch, nhân viên hỗ trợ hay bất kỳ ai từ wwwallet sẽ bao giờ yêu cầu cậu cung cấp cụm từ khôi phục — dù cậu dùng ứng dụng nào đi chăng nữa. Bất cứ ai làm vậy đều đang cố lừa đảo cậu.',
      },
    ],
    linkLabel: 'Tìm hiểu sâu hơn với podcast Bankless',
    linkUrl: 'https://www.bankless.com/',
  },
  faqs: {
    eyebrow: 'Câu hỏi thường gặp',
    heading: 'Các câu hỏi thường gặp',
    items: [
      {
        q: 'wwwallet có thực sự miễn phí không?',
        a: 'Đúng vậy. Sử dụng ứng dụng hoàn toàn miễn phí, không có gói cao cấp hay nội dung trả phí nào cả, và wwwallet cũng không thu thêm phí cho bất kỳ giao dịch gửi hay trao đổi nào của cậu. Chi phí duy nhất không thể tránh khỏi là phí giao dịch (gas) của chính mạng lưới, khoản phí này được chuyển cho mạng lưới chứ không phải cho wwwallet. Báo giá trao đổi đến từ công cụ tổng hợp sàn giao dịch 0x, có thể bao gồm phí riêng của họ đối với một số giao dịch — bất kỳ khoản phí nào như vậy đều được liệt kê trên màn hình xem lại trước khi cậu xác nhận.',
      },
      {
        q: 'Có quảng cáo, trình theo dõi hay công cụ phân tích nào không?',
        a: 'Không. wwwallet không hiển thị quảng cáo, không chạy các tập lệnh phân tích hay theo dõi, và cũng không tạo hồ sơ về cậu. Không có tài khoản nào cả, nên chẳng có gì để liên kết cả.',
      },
      {
        q: 'Tớ có cần tài khoản hay ID để dùng ứng dụng này không?',
        a: 'Không. Không cần đăng ký, địa chỉ email, số điện thoại hay xác minh danh tính — cậu chỉ cần tạo ví trên thiết bị của mình là có thể bắt đầu sử dụng ngay.',
      },
      {
        q: 'Nếu ứng dụng miễn phí, thì wwwallet lấy tiền từ đâu để duy trì hoạt động?',
        a: 'Ứng dụng này không kiếm tiền từ người dùng — không phí, không quảng cáo, không bán dữ liệu. Chi phí vận hành được thiết kế để giữ ở mức thấp: ứng dụng chạy trực tiếp trên trình duyệt của cậu, còn phần máy chủ chỉ truyền tải dữ liệu blockchain công khai và giá cả.',
      },
      {
        q: 'Có ai có thể khóa ví của tớ không?',
        a: 'Không có tài khoản nào cả, nên wwwallet — hay bất kỳ ai khác — cũng chẳng có gì để đóng băng cả. Khóa của cậu không bao giờ rời khỏi thiết bị của cậu, và các giao dịch được ký ngay tại đó trước khi được gửi lên mạng. Tiền của cậu nằm trên Ethereum, không phải trong wwwallet: cậu có thể xem khóa riêng tư hoặc cụm từ khôi phục của bất kỳ tài khoản nào từ menu của nó và nhập nó vào bất kỳ ứng dụng ví Ethereum nào khác bất cứ khi nào cậu muốn.',
      },
      {
        q: 'Cụm từ khôi phục của tớ có đủ để lấy lại ví không?',
        a: 'Không phải chỉ riêng nó đâu nhé. Cụm từ khôi phục của cậu sẽ mở khóa kho tiền được mã hóa, nhưng kho tiền đó chỉ tồn tại trên thiết bị của cậu thôi. Nếu cậu làm mất hoặc xóa sạch thiết bị mà chưa bao giờ sao lưu, thì cụm từ đó sẽ chẳng còn gì để mở khóa nữa. Hãy luôn kết hợp cụm từ khôi phục với bản sao lưu trên Google Drive hoặc tệp tin — xem câu hỏi tiếp theo nhé.',
      },
      {
        q: 'Làm thế nào để sao lưu ví của tớ?',
        a: 'Từ mục Cài đặt, hãy sao lưu kho tiền mã hóa đã được mã hóa của cậu lên Google Drive của riêng cậu hoặc dưới dạng tệp tin để tải về và tự lưu giữ. Bản sao lưu trên Drive sẽ được lưu trong một thư mục riêng tư của ứng dụng, và wwwallet không thể xem bất kỳ thứ gì khác trong Drive của cậu. Hãy sao lưu khi cậu thiết lập lần đầu, và sao lưu lại mỗi khi cậu thêm tài khoản mới.',
      },
      {
        q: 'Tớ có thể dùng wwwallet trên nhiều thiết bị không?',
        a: 'Đúng vậy, nhưng ứng dụng không tự động đồng bộ — mỗi thiết bị đều có kho lưu trữ cục bộ riêng. Để dùng wwwallet trên thiết bị mới, cậu hãy khôi phục ứng dụng từ bản sao lưu trên Drive hoặc tệp tin, sau đó mở khóa bằng cụm từ khôi phục của mình.',
      },
      {
        q: 'Nếu tớ làm mất thiết bị mà chưa bao giờ sao lưu thì sẽ ra sao?',
        a: 'Tiền của cậu sẽ không thể khôi phục được. Đó là thiết kế cố ý: wwwallet không có hệ thống tài khoản và không lưu giữ bản sao kho tiền của cậu ở bất kỳ đâu, nên không ai — kể cả tụi tớ — có thể khôi phục nó giúp cậu. Đó là sự đánh đổi để chỉ có mình cậu mới có thể truy cập vào các khóa riêng tư.',
      },
      {
        q: 'Các mật khẩu (Face ID / Touch ID) có được chuyển sang thiết bị mới không?',
        a: 'Không. Mật khẩu được liên kết với thiết bị mà nó được tạo ra. Sau khi khôi phục bản sao lưu trên thiết bị mới, hãy mở khóa bằng cụm từ khôi phục của cậu và cậu có thể thiết lập một mật khẩu mới tại đó.',
      },
      {
        q: 'wwwallet có phải là mã nguồn mở không?',
        a: 'Không — nó có mã nguồn sẵn. Toàn bộ mã nguồn được công khai trên GitHub nên ai cũng có thể đọc, xem xét và kiểm tra, nhưng nó không phải là mã nguồn mở: mã này được cấp phép theo Giấy phép PolyForm Strict 1.0.0.',
      },
      {
        q: 'Tớ được phép làm gì với đoạn mã này?',
        a: 'Cậu có thể đọc và kiểm tra toàn bộ nội dung, cũng như chạy một bản sao không bị sửa đổi cho các mục đích phi thương mại như học tập cá nhân, nghiên cứu và thử nghiệm. Cậu không được phân phối, sửa đổi hay tạo ra các tác phẩm phái sinh (bao gồm cả các nhánh fork), cũng như không được sử dụng nó cho mục đích thương mại. Nếu cậu cần làm điều gì đó mà giấy phép không cho phép, hãy liên hệ với chủ sở hữu bản quyền để xin một giấy phép riêng.',
      },
      {
        q: 'wwwallet có an toàn khi sử dụng không? Có bất kỳ bảo hành nào không?',
        a: 'wwwallet là phần mềm không lưu giữ được cung cấp “nguyên trạng”, không kèm bất kỳ bảo hành nào. Chỉ có cậu mới kiểm soát được khóa và số tiền của mình — không ai, kể cả tụi tớ, có thể khôi phục cụm từ khôi phục hoặc bản sao lưu bị mất, đảo ngược giao dịch, hay bồi thường thiệt hại cho cậu. Chỉ nên dùng số tiền mà cậu có thể chấp nhận mất, kiểm tra kỹ địa chỉ và mạng trước khi gửi, và những thông tin ở đây không phải là lời khuyên về tài chính, đầu tư, pháp lý hay thuế.',
      },
      {
        q: 'wwwallet hỗ trợ những mạng nào?',
        a: 'Mạng chính Ethereum, cùng với các mạng Layer-2 như Polygon, Arbitrum, Base và Optimism — tất cả đều từ cùng một bộ tài khoản.',
      },
      {
        q: 'Làm thế nào để nạp tiền vào ví của tớ?',
        a: 'Mở tài khoản, chọn “Xem mã QR” để xem địa chỉ của nó, rồi gửi tiền đến địa chỉ đó từ sàn giao dịch hoặc ví khác. Hãy đảm bảo cậu gửi tiền trên đúng mạng (Ethereum, Polygon, Arbitrum, Base hoặc Optimism) — cùng một địa chỉ hoạt động trên tất cả các mạng này, nhưng tiền gửi trên một mạng chỉ hiển thị trên mạng đó thôi. Cậu cũng nên chuẩn bị một ít đồng tiền gốc của mạng lưới đó (như ETH) để trả phí giao dịch.',
      },
      {
        q: 'Tớ có thể làm gì với wwwallet?',
        a: 'Gửi: chuyển ETH hoặc bất kỳ token nào đến địa chỉ mà cậu dán vào, quét từ mã QR hoặc chọn từ các tài khoản của chính cậu, và kiểm tra lại thông tin chi tiết trước khi xác nhận. Đổi: trao đổi một token lấy token khác trên cùng một mạng từ tab Đổi, với báo giá và ước tính phí được hiển thị ngay từ đầu. Nhận: hiển thị địa chỉ của cậu dưới dạng mã QR. Cậu cũng có thể xem số dư của mình theo giá trị USD và lịch sử giao dịch trên tất cả các mạng được hỗ trợ.',
      },
      {
        q: 'wwwallet biết gì về tớ?',
        a: 'Không có thông tin nào giúp nhận diện cậu cả. Không có tài khoản, đăng nhập hay cơ sở dữ liệu nào cả. Dữ liệu về số dư và giá được lấy thông qua hệ thống backend riêng của wwwallet thay vì trình duyệt của cậu gọi trực tiếp đến các nhà cung cấp bên thứ ba, và hệ thống backend đó không bao giờ nhìn thấy khóa, mật khẩu hay cụm từ khôi phục của cậu.',
      },
    ],
  },
  footer: {
    tagline: 'Một ví Ethereum miễn phí, không lưu ký dành cho tất cả mọi người.',
    copyright: '© {year} wwwallet',
    licenseLink: 'Được cấp phép theo PolyForm Strict 1.0.0',
    disclaimer:
      'Phần mềm không lưu ký được cung cấp “nguyên trạng”, không kèm bất kỳ bảo hành nào. Đây không phải là lời khuyên tài chính. Cậu hoàn toàn tự chịu trách nhiệm về khóa và số tiền của mình.',
  },
  license: {
    title: 'Giấy phép',
    close: 'Đóng',
    summaryTitle: 'Dùng tiếng Anh đơn giản',
    canUse:
      'Cậu có thể dùng wwwallet miễn phí cho mục đích cá nhân và các mục đích phi thương mại khác.',
    canRead: 'Cậu có thể đọc và kiểm tra từng dòng mã nguồn của ứng dụng này.',
    cannot: 'Cậu không được sao chép, thay đổi, phân phối lại hay bán nội dung này.',
    englishNote: 'Dưới đây là toàn văn giấy phép bằng tiếng Anh gốc — đây là văn bản pháp lý.',
    viewSource: 'Xem mã nguồn trên GitHub',
  },
  principles: {
    eyebrow: 'Các nguyên tắc',
    heading: 'Miễn phí, mở và được xây dựng dành cho tất cả mọi người',
    lede: 'Phần mềm giữ tiền của cậu nên là một công cụ để cậu sử dụng, chứ không phải một mô hình kinh doanh dựa vào người dùng. Đây chính là những cam kết mà wwwallet được xây dựng dựa trên.',
    items: [
      {
        title: 'Miễn phí, không có điều kiện gì cả',
        body: 'Không đề cập đến giá cả, gói cao cấp hay tính năng trả phí. wwwallet không thu thêm bất kỳ khoản phí nào — chi phí duy nhất là phí giao dịch của chính mạng lưới.',
      },
      {
        title: 'Không quảng cáo, không theo dõi',
        body: 'Không quảng cáo, không phân tích dữ liệu, không kịch bản theo dõi và không bán dữ liệu cho bất kỳ ai. Thực ra thì cũng chẳng có hồ sơ cá nhân nào của cậu để bán cả.',
      },
      {
        title: 'Không cần đăng ký',
        body: 'Không cần email, số điện thoại hay xác minh danh tính. Mở ứng dụng, tạo ví là cậu đã sẵn sàng rồi.',
      },
      {
        title: 'Khóa của cậu sẽ luôn ở bên cậu',
        body: 'Các khóa được tạo và mã hóa ngay trên thiết bị của cậu và không bao giờ rời khỏi đó. wwwallet không thể xem chúng, chuyển tiền của cậu hay khóa tài khoản của cậu lại đâu.',
      },
      {
        title: 'Hoạt động ở mọi nơi',
        body: 'Ứng dụng chạy được trên mọi trình duyệt hiện đại ở điện thoại hay máy tính để bàn, và cài đặt giống như một ứng dụng thông thường — không cần tài khoản trên cửa hàng ứng dụng.',
      },
      {
        title: 'Bản dịch sang 31 ngôn ngữ',
        body: 'Hãy dùng nó bằng ngôn ngữ mà cậu thấy thoải mái nhất, ở chế độ sáng hoặc tối.',
      },
      {
        title: 'Mã nguồn mở',
        body: 'Toàn bộ mã nguồn được công bố để ai cũng có thể đọc và kiểm tra. Đây là mã nguồn có sẵn chứ không phải mã nguồn mở — phần Câu hỏi thường gặp (FAQ) sẽ giải thích những gì giấy phép cho phép.',
      },
      {
        title: 'Không cần tắt bất cứ thứ gì',
        body: 'Không có tài khoản nào để ai đó có thể đóng băng cả. Tiền của cậu nằm trên chính mạng Ethereum, và khóa của bất kỳ tài khoản nào cũng có thể được chuyển sang ví khác bất cứ lúc nào.',
      },
    ],
  },
  meta: {
    title: 'wwwallet — Ví Ethereum miễn phí, không lưu giữ',
    description:
      'Ví Ethereum miễn phí ngay trên trình duyệt của cậu. Không cần đăng ký, không quảng cáo, không theo dõi — các khóa của cậu sẽ được mã hóa và lưu trữ an toàn trên thiết bị của cậu. Hỗ trợ Ethereum, Arbitrum, Base, Optimism và Polygon.',
  },
}
