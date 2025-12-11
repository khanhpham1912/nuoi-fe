import Image from "next/image";
import type { Metadata } from "next";
import {
  ScrollSection,
  FeatureCard,
  BudgetItem,
  PricingCard,
  TestimonialCard,
  FAQItem,
  FeCodeGenerator,
} from "./components/interactive";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://nuoi-fe.example";

export const metadata: Metadata = {
  title: "Nuôi FE – Feed the Dev, Save the code",
  description:
    "Mỗi đóng góp của bạn giúp một dev sống sót thêm một sprint. Một dev khỏe cả dự án vui 💚",
  alternates: { canonical: "/" },
  openGraph: {
    title: "Nuôi FE – Feed the Dev, Save the code",
    description:
      "Mỗi đóng góp của bạn giúp một dev sống sót thêm một sprint. Một dev khỏe cả dự án vui 💚",
    url: siteUrl,
    siteName: "Nuôi FE",
    images: [
      {
        url: "/QR.jpg",
        width: 1024,
        height: 1024,
        alt: "Mã QR donate Nuôi FE",
      },
    ],
    type: "website",
    locale: "vi_VN",
  },
  twitter: {
    card: "summary_large_image",
    title: "Nuôi FE – Feed the Dev, Save the code",
    description:
      "Mỗi đóng góp của bạn giúp một dev sống sót thêm một sprint. Một dev khỏe cả dự án vui 💚",
    images: ["/QR.jpg"],
  },
};

export default function Home() {
  return (
    <div className="min-h-screen overflow-x-hidden bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 scroll-smooth">
      {/* Decorative Background Elements */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute left-0 top-0 h-96 w-96 rounded-full bg-green-800/10 blur-3xl" />
        <div className="absolute bottom-0 right-0 h-96 w-96 rounded-full bg-emerald-800/10 blur-3xl" />
      </div>

      {/* Header */}
      <header
        className="fixed top-0 left-0 right-0 z-50 w-full border-b border-green-800/20 bg-gradient-to-br from-gray-900/60 via-gray-800/60 to-gray-900/60 backdrop-blur-2xl backdrop-saturate-150">
        <div className="container mx-auto px-4 py-4 sm:px-6 sm:py-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="text-4xl animate-icon-wiggle">🌱</span>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
                  NUÔI FE
                </h1>
                <p className="text-xs text-gray-400">Frontend Development Fund</p>
              </div>
            </div>
            <a
              href="#donate"
              className="hidden items-center gap-2 rounded-full bg-gradient-to-r from-green-500 to-emerald-500 px-5 py-2 text-sm font-semibold text-white shadow-lg transition-all hover:scale-105 active:scale-95 sm:inline-flex"
            >
              Donate ngay 💚
            </a>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 pt-24 py-16 sm:px-6">
        {/* Hero Section */}
        <section className="mb-24 text-center">
          <div className="mb-8 text-7xl sm:text-8xl md:text-9xl animate-hero-bounce">🌱</div>
          <h2 className="mb-6 text-4xl font-extrabold text-white sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl animate-fade-in-up">
            <span className="bg-gradient-to-r from-green-600 via-emerald-600 to-green-600 bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient-shift">
              NUÔI FE
            </span>
          </h2>
          <p className="mb-4 text-2xl font-bold text-gray-200 sm:text-3xl md:text-4xl animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
            HÃY NUÔI FE NGAY HÔM NAY! 💚
          </p>
          <p className="mx-auto max-w-3xl px-4 text-lg text-gray-400 sm:text-xl md:text-2xl">FE cam kết công khai 100% đồ ăn!</p>
          <p className="mx-auto max-w-3xl mt-1 px-4 text-lg text-gray-400 sm:text-xl md:text-2xl">Không chỉ là donate, mà là chữa lành những tâm hồn đã rách!</p>
          <p className="mx-auto max-w-3xl px-4 text-lg text-gray-400 sm:text-xl md:text-2xl">💯</p>
        </section>

        {/* Why Section */}
        <ScrollSection className="mb-24">
          <div className="mb-12 text-center px-4">
            <h3 className="mb-4 text-3xl font-bold text-white sm:text-4xl md:text-5xl">🎯 Tại Sao Nên Nuôi FE?</h3>
            <p className="mx-auto max-w-2xl px-4 text-base text-gray-400 sm:text-lg">Bởi vì team FE nghèo!</p>
          </div>
          <div className="grid gap-6 sm:gap-8 md:grid-cols-2 lg:grid-cols-4">
            <FeatureCard
              icon="📊"
              title="Sao Kê Realtime"
              description="Cập nhật từng giây! Nhanh hơn cả tốc độ bạn refresh trang web. Mọi giao dịch đều được track và hiển thị ngay lập tức! Nhưng có thể lỗi :>"
            />
            <FeatureCard
              icon="🔍"
              title="Minh Bạch 300%"
              description="Cực kỳ minh bạch! Bạn sẽ biết rõ tiền đi đâu, làm gì, và tại sao! 🔐"
            />
            <FeatureCard
              icon="💸"
              title="Chi Tiêu Hợp Lý"
              description="Tiền của bạn sẽ được sử dụng cho các mục đích cụ thể: mua cafe, coffee, matcha và có thể là vài con nô lệ AI để FE code tốt hơn! Mỗi đồng đều được dùng để nuôi dưỡng đam mê frontend! 🌱"
            />
            <FeatureCard
              icon="📱"
              title="Code Tracking"
              description="Theo dõi 24/7 FE code gì, deploy gì, fix bug gì. Tất cả đều được commit và có thể xem bất cứ lúc nào! Bạn sẽ thấy được sự tiến bộ từng ngày của FE! 📈"
            />
          </div>
        </ScrollSection>

        {/* Commitments */}
        <ScrollSection className="mb-24">
          <div className="relative overflow-hidden rounded-3xl border-2 border-yellow-800/30 bg-gradient-to-br from-yellow-900/20 via-amber-900/20 to-yellow-900/20 p-6 shadow-2xl sm:p-8 md:p-10">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(251,191,36,0.1),transparent_50%)]" />
            <div className="relative z-10">
              <h3 className="mb-8 text-center text-3xl font-bold text-white sm:text-4xl md:text-5xl">🤞 FE Thề Thốt</h3>
              <div className="grid gap-6 md:grid-cols-2">
                {[
                  {
                    icon: "⏰",
                    title: "Sao Kê Mỗi Ngày",
                    desc: "Sao kê mỗi ngày nhưng ngày nào thì chưa chốt.",
                  },
                  {
                    icon: "📝",
                    title: "Công Khai 100% Đồ Ăn",
                    desc: "FE cam kết công khai 100% đồ ăn! Từ cafe 50k đến matcha 80k, từng khoản đều được ghi chép tỉ mỉ với screenshot và invoice đầy đủ.",
                  },
                  {
                    icon: "🧾",
                    title: "Hóa Đơn Chứng Từ",
                    desc: "Screenshot invoice - tất cả đều được lưu trữ công khai trên máy của chúng tôi!",
                  },
                  {
                    icon: "☕",
                    title: "Chi Tiêu Rõ Ràng",
                    desc: "Tiền của bạn sẽ được dùng để mua cafe, coffee, matcha và có thể là vài con nô lệ AI. Mỗi đồng đều có mục đích cụ thể!",
                  },
                  {
                    icon: "📞",
                    title: "Hotline 24/7",
                    desc: "Gọi hỏi FE code gì bất cứ lúc nào, kể cả 3h sáng! FE sẽ trả lời ngay (nếu không ngủ quên 😴).",
                  },
                  {
                    icon: "💬",
                    title: "Không Block",
                    desc: "Hỏi khó đến mấy cũng trả lời, không 'đã xem' rồi im lặng. FE cam kết trả lời mọi câu hỏi về chi tiêu!",
                  },
                ].map((item, index) => (
                  <div
                    key={index}
                    className="group relative overflow-hidden rounded-2xl border border-yellow-800/30 bg-gray-800/80 p-6 shadow-lg backdrop-blur-sm">
                    <div className="mb-3 flex items-center gap-3">
                      <span className="text-3xl">{item.icon}</span>
                      <h4 className="text-xl font-bold text-white">{item.title}</h4>
                    </div>
                    <p className="text-gray-300">{item.desc}</p>
                    <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/0 to-amber-400/0" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </ScrollSection>

        {/* Comparison */}
        <ScrollSection className="mb-24">
          <div className="mb-12 text-center px-4">
            <h3 className="mb-4 text-3xl font-bold text-white sm:text-4xl md:text-5xl">💰 So Sánh Với &quot;Người Khác&quot;</h3>
            <p className="mx-auto max-w-2xl px-4 text-base text-gray-400 sm:text-lg">Không phải tự khen, nhưng FE thực sự khác biệt!</p>
          </div>
          <div className="grid gap-8 md:grid-cols-2">
            <div className="group relative overflow-hidden rounded-3xl border-2 border-red-800/30 bg-gradient-to-br from-red-900/20 to-pink-900/20 p-8 shadow-xl">
              <h4 className="mb-6 text-3xl font-bold text-red-400">❌ Người Khác:</h4>
              <ul className="space-y-4 text-gray-300">
                {[
                  "Sao kê sau 3 năm (hoặc không bao giờ)",
                  "Báo cáo tài chính qua facebook",
                  "Block người hỏi nhanh như chớp, không giải thích",
                ].map((item, index) => (
                  <li key={index} className="flex items-start gap-3 text-lg">
                    <span className="mt-1 text-red-500">✗</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="group relative overflow-hidden rounded-3xl border-2 border-green-800/30 bg-gradient-to-br from-green-900/20 to-emerald-900/20 p-8 shadow-xl">
              <h4 className="mb-6 text-3xl font-bold text-green-400">✅ Nuôi FE:</h4>
              <ul className="space-y-4 text-gray-300">
                {[
                  "Rủ rê trước khi order",
                  "Số liệu chính xác đến từng đồng, không làm tròn",
                  "Trả lời inbox nhanh hơn cả chatbot, giải thích rõ ràng",
                ].map((item, index) => (
                  <li key={index} className="flex items-start gap-3 text-lg">
                    <span className="mt-1 text-green-500">✓</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </ScrollSection>

        {/* Pricing Packages */}
        <ScrollSection className="mb-24">
          <div className="mb-12 text-center px-4">
            <h3 className="mb-4 text-3xl font-bold text-white sm:text-4xl md:text-5xl">💰 Gói Ủng Hộ</h3>
            <p className="mx-auto max-w-2xl px-4 text-base text-gray-400 sm:text-lg">Chọn gói phù hợp với khả năng của bạn để góp phần vào sự phát triển của FE!</p>
          </div>
          <div className="grid gap-6 sm:gap-8 md:grid-cols-2 lg:grid-cols-3 lg:items-stretch">
            <PricingCard
              name="Gói Cơ Bản"
              price="500k"
              period="tháng"
              features={["Redbull & Cafe", "ChatGPT Plus", "Cursor Pro", "AI Assistant", "Báo cáo chi tiêu hàng tháng"]}
            />
            <PricingCard
              name="Gói Tiêu Chuẩn"
              price="2.000k"
              period="3 tháng"
              popular
              features={["Redbull & Cafe", "ChatGPT Plus", "Cursor Pro", "AI Assistant", "Báo cáo chi tiêu hàng tuần", "Mã FE độc quyền", "Priority support"]}
            />
            <PricingCard
              name="Gói Premium Pro Plus"
              price="Contact"
              period=""
              premium
              features={["Tất cả gói Tiêu Chuẩn ✓", "Redbull & Cafe", "ChatGPT Plus", "Cursor Pro", "AI Assistant", "Báo cáo realtime", "Được coi anh Liêm múa cột", "24/7 Support"]}
            />
          </div>
        </ScrollSection>

        {/* Donate Section */}
        <ScrollSection className="mb-24">
          <div
            id="donate"
            className="relative overflow-hidden rounded-3xl border-2 border-green-700/30 bg-gradient-to-br from-green-800/80 via-emerald-800/80 to-green-800/80 p-8 text-center text-white shadow-2xl sm:p-10 md:p-12">
            {/* Animated Background Elements */}
            <div className="absolute inset-0 overflow-hidden">
              <div className="absolute -top-20 -left-20 h-64 w-64 rounded-full bg-white/10 blur-3xl" />
              <div className="absolute -bottom-20 -right-20 h-64 w-64 rounded-full bg-emerald-400/10 blur-3xl" />
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.08),transparent_70%)]" />
            </div>

            <div className="relative z-10">
              {/* Title with enhanced animation */}
              <div className="mb-6">
                <span className="mb-3 inline-block text-4xl sm:text-5xl md:text-6xl">💳</span>
                <h3 className="mb-2 text-2xl font-bold sm:text-3xl md:text-4xl">DONATE NGAY ĐI!</h3>
                <div className="mx-auto h-1 w-24 rounded-full bg-white/50" />
              </div>

              {/* Description */}
              <p className="mb-8 px-4 text-base font-medium text-gray-100 sm:text-lg md:text-xl">Quét mã QR để nuôi FE ngay hôm nay! 💚</p>

              {/* QR / Deeplink */}
              <div className="mb-8 flex justify-center">
                {/* Desktop & tablet: show QR image */}
                <div className="relative hidden md:block">
                  <div className="absolute inset-0 rounded-3xl bg-white blur-2xl" />
                  <div className="relative rounded-3xl border-4 border-white/90 bg-white p-6 shadow-2xl backdrop-blur-sm sm:p-8">
                    <div className="absolute left-2 top-2 h-6 w-6 border-l-2 border-t-2 border-green-600 opacity-50" />
                    <div className="absolute right-2 top-2 h-6 w-6 border-r-2 border-t-2 border-green-600 opacity-50" />
                    <div className="absolute bottom-2 left-2 h-6 w-6 border-b-2 border-l-2 border-green-600 opacity-50" />
                    <div className="absolute bottom-2 right-2 h-6 w-6 border-b-2 border-r-2 border-green-600 opacity-50" />

                    <div className="relative flex h-64 w-64 items-center justify-center rounded-2xl bg-gradient-to-br from-gray-50 to-gray-100 shadow-inner sm:h-72 sm:w-72">
                      <Image
                        src="/QR.jpg"
                        alt="QR code để donate cho FE"
                        width={512}
                        height={512}
                        className="h-full w-full rounded-xl object-cover shadow-lg"
                        priority
                      />
                    </div>
                    <p className="mt-4 text-base font-semibold text-gray-800 sm:text-lg">📱 Quét mã QR để donate</p>
                  </div>
                </div>

                <div className="w-full max-w-md md:hidden">
                  <a
                    href="https://dl.vietqr.io/pay?app=tpb&ba=taikhoantest@tpb&bn=NGUYEN%20THAI%20HOA&am=200000&tn=camonvidaden&url=https%3A%2F%2Fwww.nuoife.com"
                    className="flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-green-500 to-emerald-500 px-6 py-5 text-lg font-bold text-white shadow-lg transition-all hover:scale-[1.02] active:scale-95"
                  >
                    🚀 Donate ngay thôi
                  </a>
                  <p className="mt-3 text-sm text-gray-200">Tất cả vì sự tiện lợi của mạnh thường quân 💚 </p>
                </div>
              </div>
            </div>
          </div>
        </ScrollSection>

        {/* Testimonials */}
        <ScrollSection className="mb-24">
          <div className="mb-12 text-center px-4">
            <h3 className="mb-4 text-3xl font-bold text-white sm:text-4xl md:text-5xl">💬 Lời Nhận Xét Từ Nhà Hảo Tâm</h3>
            <p className="mx-auto max-w-2xl px-4 text-base text-gray-400 sm:text-lg">Hàng nghìn developer đã tin tưởng và ủng hộ FE (có thể)</p>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <TestimonialCard
              quote="Tôi đã ủng hộ FE từ năm 2024. Dự án này giúp tôi học được nhiều về frontend development. FE code rất minh bạch và có documentation đầy đủ!"
              author="Dev A.N"
              role="Full-stack Developer"
              icon="💻"
            />
            <TestimonialCard
              quote="FE không chỉ nhận donate mà còn chia sẻ kiến thức qua blog và video. Mỗi đồng tôi donate đều thấy được sử dụng hợp lý!"
              author="Dev B.T"
              role="Frontend Engineer"
              icon="🎓"
            />
            <TestimonialCard
              quote="Tôi làm mentor cho FE được 6 tháng. FE học hỏi rất nhanh và luôn minh bạch về chi tiêu. Đây là một dự án đáng tin cậy!"
              author="Mentor C.L"
              role="Tech Lead"
              icon="👨‍🏫"
            />
            <TestimonialCard
              quote="FE đã giúp tôi hiểu được cách một frontend developer thực sự làm việc. Code quality rất tốt và luôn được update!"
              author="Student D.H"
              role="Computer Science Student"
              icon="📚"
            />
            <TestimonialCard
              quote="Tôi donate vì thấy FE thực sự cần tiền để mua tools và courses. Mỗi khoản chi đều được giải thích rõ ràng trên GitHub!"
              author="Dev E.P"
              role="Backend Developer"
              icon="⚙️"
            />
            <TestimonialCard
              quote="FE không chỉ code mà còn viết blog, làm video tutorial. Đây là cách tốt nhất để đầu tư vào một developer trẻ!"
              author="Content Creator F.M"
              role="Tech YouTuber"
              icon="🎬"
            />
          </div>
        </ScrollSection>

        {/* Budget Section */}
        <ScrollSection className="mb-24">
          <div className="rounded-3xl border-2 border-gray-700 bg-gray-800 p-6 shadow-2xl sm:p-8 md:p-10">
            <h3 className="mb-10 text-center text-3xl font-bold text-white sm:text-4xl md:text-5xl">📈 FE Sẽ Dùng Tiền Vào Đâu?</h3>
            <div className="mx-auto max-w-3xl">
              <BudgetItem label="Redbull & Cafe" percentage={80} color="bg-amber-500" />
              <BudgetItem label="ChatGPT Plus" percentage={10} color="bg-purple-500" />
              <BudgetItem label="Cursor Pro" percentage={5} color="bg-orange-500" />
              <BudgetItem label="AI Assistant" percentage={5} color="bg-pink-500" />
              <BudgetItem label="Dev Mode" percentage={0} color="bg-blue-500" />
            </div>
          </div>
        </ScrollSection>

        {/* FE Code Generator */}
        <ScrollSection className="mb-24">
          <FeCodeGenerator />
        </ScrollSection>

        {/* FAQ Section */}
        <ScrollSection className="mb-24">
          <div className="mb-12 text-center px-4">
            <h3 className="mb-4 text-3xl font-bold text-white sm:text-4xl md:text-5xl">❓ Câu Hỏi Thường Gặp</h3>
            <p className="mx-auto max-w-2xl px-4 text-base text-gray-400 sm:text-lg">Giải đáp mọi thắc mắc của bạn về dự án Nuôi FE</p>
          </div>
          <div className="mx-auto max-w-3xl space-y-4">
            <FAQItem question="Tại sao phải nuôi FE?" answer="Bởi vì team FE nghèo!" />
            <FAQItem
              question="Tiền của tôi đi đâu?"
              answer="Tiền của bạn sẽ được sử dụng cho các mục đích cụ thể như: mua cafe, coffee, matcha và có thể là vài con nô lệ AI"
            />
            <FAQItem
              question="Mã FE là gì?"
              answer="Mã FE là mã định danh độc quyền cho mỗi nhà hảo tâm. Mã này giúp bạn theo dõi các khoản đóng góp của mình và nhận các báo cáo chi tiết. Tuy nhiên, do hệ thống phân phối tự động, có thể một mã sẽ được cấp cho nhiều người - đây là tính năng để tối ưu hóa hệ thống!"
            />
            <FAQItem
              question="FE có minh bạch không?"
              answer="Cực kỳ minh bạch! FE cam kết công khai 100% đồ ăn ngoài pantry! Mỗi đồng đều được dùng để nuôi dưỡng đam mê frontend! 🌱"
            />
            <FAQItem
              question="Tôi có được gì khi donate?"
              answer="Tùy vào gói bạn chọn, bạn sẽ nhận được: báo cáo chi tiết về chi tiêu, mã FE độc quyền, và đặc biệt là cảm giác vui sướng khi nhìn thấy FE đang ăn đồ ăn ngoài pantry! Với gói VIP, bạn còn được xem anh Liêm múa cột"
            />
            <FAQItem question="Nếu tôi nghi ngờ có sai phạm thì làm sao?" answer="" />
          </div>
        </ScrollSection>
      </main>
    </div>
  );
}
