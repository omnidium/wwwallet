export default {
  nav: {
    wallet: 'Ví',
    ethereum: 'Ethereum',
    crypto: 'Tiền điện tử',
    faqs: 'Câu hỏi thường gặp',
    launch: 'Khởi chạy Ví',
    home: 'Quay lại đầu trang',
    sectionNavLabel: 'Điều hướng theo mục',
  },
  settings: {
    open: 'Cài đặt',
    close: 'Đóng cài đặt',
    theme: 'Chủ đề',
    themeLight: 'Ánh sáng',
    themeDark: 'Tối',
    language: 'Ngôn ngữ',
  },
  hero: {
    eyebrow: 'Ví Ethereum cá nhân, không lưu trữ',
    heading1: 'Chìa khóa của bạn.',
    heading2: 'Thiết bị của bạn.',
    heading3: 'Ví của bạn.',
    lede: 'wwwallet mã hóa ví của bạn ngay trên thiết bị của chính bạn và tuyệt đối không gửi khóa, mật khẩu hay cụm từ khôi phục của bạn đến bất kỳ nơi nào khác. Không cần tạo tài khoản. Không có máy chủ nào có thể bị xâm nhập. Chỉ có bạn và tiền điện tử của bạn.',
    ctaPrimary: 'Khởi chạy Ví',
    ctaSecondary: 'Hãy xem cách thức hoạt động của nó',
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
        q: 'Cụm từ khôi phục của tôi có đủ để lấy lại ví của tôi không?',
        a: 'Không phải chỉ riêng nó. Cụm từ khôi phục sẽ mở khóa kho dữ liệu được mã hóa của bạn, nhưng bản thân kho dữ liệu đó chỉ tồn tại trên thiết bị của bạn. Nếu bạn làm mất hoặc xóa sạch dữ liệu trên thiết bị đó mà chưa bao giờ sao lưu, thì sẽ không còn gì để cụm từ khôi phục có thể mở khóa nữa. Hãy luôn kết hợp cụm từ khôi phục với bản sao lưu trên Google Drive hoặc tệp tin — xem câu hỏi tiếp theo.',
      },
      {
        q: 'Làm thế nào để sao lưu ví của tôi?',
        a: 'Từ mục Cài đặt, hãy sao lưu kho dữ liệu được mã hóa của bạn lên Google Drive cá nhân — được lưu trữ trong một thư mục riêng tư, chỉ ứng dụng mới có thể truy cập (wwwallet không thể xem các phần còn lại của thư mục này) — hoặc dưới dạng tệp tin mà bạn tải xuống và tự lưu giữ. Hãy thực hiện thao tác này mỗi khi bạn thiết lập ví hoặc thêm tài khoản mới.',
      },
      {
        q: 'Tôi có thể sử dụng wwwallet trên nhiều thiết bị không?',
        a: 'Đúng vậy, nhưng nó không tự động đồng bộ — mỗi thiết bị đều có kho lưu trữ cục bộ riêng. Để sử dụng wwwallet trên một thiết bị mới, hãy khôi phục dữ liệu từ bản sao lưu trên Drive hoặc tệp tin, sau đó mở khóa bằng cụm từ khôi phục của bạn.',
      },
      {
        q: 'Nếu tôi làm mất thiết bị mà chưa bao giờ sao lưu thì sẽ ra sao?',
        a: 'Số tiền của bạn không thể lấy lại được. Điều này là do thiết kế của hệ thống: wwwallet không có hệ thống tài khoản và không lưu giữ bản sao nào của kho tiền của bạn ở bất kỳ đâu, vì vậy không ai — kể cả chúng tôi — có thể khôi phục nó cho bạn. Đó là sự đánh đổi để có được một ví mà chỉ riêng bạn mới có thể truy cập.',
      },
      {
        q: 'Các mã thông báo (Face ID / Touch ID) có được chuyển sang thiết bị mới không?',
        a: 'Không. Mật khẩu chính được liên kết với thiết bị mà nó được tạo ra. Sau khi khôi phục bản sao lưu trên thiết bị mới, hãy mở khóa bằng cụm từ khôi phục của bạn và bạn có thể thiết lập một mật khẩu chính mới trên thiết bị đó.',
      },
      {
        q: 'wwwallet có phải là phần mềm mã nguồn mở không?',
        a: 'Không — mã nguồn của nó được công khai. Toàn bộ mã nguồn được đăng tải công khai trên GitHub nên bất kỳ ai cũng có thể đọc, xem xét và kiểm tra, nhưng nó không phải là phần mềm mã nguồn mở: mã nguồn này được cấp phép theo Giấy phép PolyForm Strict 1.0.0.',
      },
      {
        q: 'Tôi được phép làm gì với đoạn mã này?',
        a: 'Bạn có thể đọc và kiểm tra toàn bộ nội dung, đồng thời chạy một bản sao nguyên vẹn cho các mục đích phi thương mại như học tập cá nhân, nghiên cứu và thử nghiệm. Bạn không được phân phối, sửa đổi hoặc tạo ra các tác phẩm phái sinh (bao gồm cả các phiên bản phân nhánh), cũng như không được sử dụng nó cho mục đích thương mại. Nếu bạn cần thực hiện những việc mà giấy phép này không cho phép, hãy liên hệ với chủ sở hữu bản quyền để xin giấy phép riêng.',
      },
      {
        q: 'wwwallet có an toàn khi sử dụng không? Có chế độ bảo hành nào không?',
        a: 'wwwallet là phần mềm không lưu ký được cung cấp “nguyên trạng”, không kèm theo bất kỳ bảo đảm nào. Chỉ bạn mới có quyền kiểm soát các khóa và tài sản của mình — không ai, kể cả chúng tôi, có thể khôi phục cụm từ khôi phục hoặc bản sao lưu bị mất, hủy bỏ giao dịch, hoặc bồi thường cho bạn về các khoản lỗ. Chỉ nên sử dụng số tiền mà bạn có thể chấp nhận mất, kiểm tra kỹ địa chỉ và mạng lưới trước khi gửi, và những thông tin tại đây không phải là lời khuyên về tài chính, đầu tư, pháp lý hoặc thuế.',
      },
      {
        q: 'wwwallet hỗ trợ những mạng nào?',
        a: 'Mạng chính Ethereum, cùng với các mạng Lớp 2 như Polygon, Arbitrum, Base và Optimism — tất cả đều được quản lý từ cùng một bộ tài khoản.',
      },
      {
        q: 'Làm thế nào để nạp tiền vào ví của tôi?',
        a: 'Mở tài khoản, chọn “Xem mã QR” để xem địa chỉ của tài khoản, sau đó chuyển tiền đến địa chỉ đó từ sàn giao dịch hoặc ví khác. Hãy đảm bảo bạn gửi tiền trên mạng lưới đúng (Ethereum, Polygon, Arbitrum, Base hoặc Optimism) — cùng một địa chỉ hoạt động trên tất cả các mạng này, nhưng số tiền gửi trên một mạng lưới chỉ hiển thị trên mạng lưới đó. Bạn cũng cần có một ít đồng tiền gốc của mạng lưới đó (chẳng hạn như ETH) để thanh toán phí giao dịch.',
      },
      {
        q: 'Tôi có thể làm gì với wwwallet?',
        a: 'Gửi: chuyển ETH hoặc bất kỳ token nào đến một địa chỉ mà bạn dán, quét từ mã QR hoặc chọn từ các tài khoản của chính bạn, và kiểm tra lại thông tin chi tiết trước khi xác nhận. Hoán đổi: đổi một token lấy một token khác trên cùng một mạng lưới từ tab “Hoán đổi”, với báo giá và ước tính phí được hiển thị ngay từ đầu. Nhận: hiển thị địa chỉ của bạn dưới dạng mã QR. Bạn cũng có thể xem số dư của mình dưới dạng giá trị USD và lịch sử giao dịch trên tất cả các mạng được hỗ trợ.',
      },
      {
        q: 'wwwallet biết những gì về tôi?',
        a: 'Không có thông tin nào giúp nhận diện bạn. Không có tài khoản, thông tin đăng nhập hay cơ sở dữ liệu. Dữ liệu về số dư và giá được lấy thông qua hệ thống backend riêng của wwwallet, thay vì trình duyệt của bạn gọi trực tiếp đến các nhà cung cấp bên thứ ba, và hệ thống backend đó không bao giờ tiếp cận được khóa riêng, mật khẩu hay cụm từ khôi phục của bạn.',
      },
    ],
  },
  footer: {
    tagline: 'Một ví Ethereum cá nhân, không lưu trữ tài sản.',
    sourceLink: 'Xem mã nguồn trên GitHub',
    copyright: '© {year} wwwallet',
    licenseLink: 'Được cấp phép theo Giấy phép PolyForm Strict 1.0.0',
    disclaimer:
      'Phần mềm không lưu giữ được cung cấp “nguyên trạng”, không kèm theo bất kỳ bảo hành nào. Đây không phải là lời khuyên tài chính. Bạn hoàn toàn chịu trách nhiệm về các khóa và số tiền của mình.',
  },
}
