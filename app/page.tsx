"use client";

import { useRef, useState, useMemo, useEffect } from "react";

// Custom Intersection Observer hook
const useInView = (ref: React.RefObject<HTMLElement | null>, options?: { once?: boolean; margin?: string }) => {
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          if (options?.once) {
            observer.unobserve(element);
          }
        } else if (!options?.once) {
          setIsInView(false);
        }
      },
      {
        rootMargin: options?.margin || "0px",
        threshold: 0.1,
      }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [ref, options?.once, options?.margin]);

  return isInView;
};

const ScrollSection = ({ children, className }: { children: React.ReactNode; className?: string }) => {
  const ref = useRef<HTMLElement | null>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className={`${className} transition-opacity duration-700 ${isInView ? "opacity-100" : "opacity-0"}`}>
      {children}
    </section>
  );
};

const FeatureCard = ({ icon, title, description, delay }: { icon: string; title: string; description: string; delay?: number }) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <div
      ref={ref}
      className={`group relative overflow-hidden rounded-3xl border border-green-800/30 bg-gradient-to-br from-green-900/20 via-emerald-900/20 to-green-900/20 p-8 shadow-lg shadow-green-900/20 transition-all duration-300 hover:scale-105 hover:-translate-y-2 active:scale-98 ${
        isInView ? "animate-fade-in-up opacity-100" : "opacity-0"
      }`}
      style={{ animationDelay: delay ? `${delay}s` : "0s" }}
    >
      <div className="relative z-10">
        <div className="mb-5 text-5xl animate-icon-wiggle" style={{ animationDelay: delay ? `${delay}s` : "0s" }}>
          {icon}
        </div>
        <h3 className="mb-3 text-2xl font-bold text-gray-100">{title}</h3>
        <p className="text-base leading-relaxed text-gray-300">{description}</p>
      </div>
      <div className="absolute inset-0 bg-gradient-to-r from-green-400/0 via-emerald-400/0 to-green-400/0 group-hover:from-green-400/15 group-hover:via-emerald-400/15 group-hover:to-green-400/15 transition-all duration-250" />
      <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-green-800/20 blur-2xl" />
      <div className="absolute -bottom-10 -left-10 h-32 w-32 rounded-full bg-emerald-800/20 blur-2xl" />
    </div>
  );
};

const BudgetItem = ({ label, percentage, color, index }: { label: string; percentage: number; color: string; index: number }) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <div ref={ref} className={`mb-6 ${isInView ? "animate-fade-in-up-simple opacity-100" : "opacity-0"}`} style={{ animationDelay: `${index * 0.1}s` }}>
      <div className={`mb-3 flex items-center justify-between transition-all duration-500 ${isInView ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-5"}`} style={{ transitionDelay: `${index * 0.1 + 0.2}s` }}>
        <span className="text-base font-semibold text-gray-200">{label}</span>
        <span className={`rounded-full bg-gray-700 px-3 py-1 text-lg font-bold text-white transition-transform duration-500 ${isInView ? "scale-100" : "scale-0"}`} style={{ transitionDelay: `${index * 0.1 + 0.4}s` }}>
          {percentage}%
        </span>
      </div>
      <div className="h-5 overflow-hidden rounded-full bg-gray-700 shadow-inner">
        <div className={`h-full ${color} rounded-full shadow-lg transition-all duration-[1200ms] ease-out`} style={{ width: isInView ? `${percentage}%` : "0%", transitionDelay: `${index * 0.1 + 0.3}s` }} />
      </div>
    </div>
  );
};

const PricingCard = ({
  name,
  price,
  period,
  features,
  popular,
  premium,
  delay,
}: {
  name: string;
  price: string;
  period: string;
  features: string[];
  popular?: boolean;
  premium?: boolean;
  delay?: number;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <div
      ref={ref}
      className={`relative flex h-full flex-col rounded-3xl border-2 p-8 shadow-xl transition-all duration-600 hover:-translate-y-2.5 ${
        isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
      } ${
        premium
          ? "border-purple-500/50 bg-gradient-to-br from-purple-900/40 via-pink-900/40 to-purple-900/40 md:scale-105 shadow-purple-500/20"
          : popular
          ? "border-green-600 bg-gradient-to-br from-green-900/30 to-emerald-900/30 md:scale-105"
          : "border-gray-700 bg-gray-800"
      }`}
      style={{ transitionDelay: delay ? `${delay}s` : "0s" }}
    >
      {premium && (
        <div className="absolute -top-4 left-1/2 -translate-x-1/2 rounded-full bg-gradient-to-r from-purple-500 via-pink-500 to-purple-500 px-4 py-1 text-sm font-bold text-white shadow-lg animate-pulse">
          ⭐ Premium Pro Plus ⭐
        </div>
      )}
      {popular && !premium && (
        <div className="absolute -top-4 left-1/2 -translate-x-1/2 rounded-full bg-gradient-to-r from-green-500 to-emerald-500 px-4 py-1 text-sm font-bold text-white">
          Phổ Biến Nhất
        </div>
      )}
      <div className="flex-1">
        <h4 className="mb-2 text-2xl font-bold text-white">{name}</h4>
        <div className="mb-6">
          <span className="text-4xl font-extrabold text-white">{price}</span>
          {period && <span className="text-gray-400">/{period}</span>}
        </div>
        <ul className="space-y-3">
          {features.map((feature, index) => (
            <li key={index} className={`flex items-start gap-2 text-gray-300 transition-all duration-500 ${isInView ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-5"}`} style={{ transitionDelay: `${(delay || 0) + index * 0.1 + 0.2}s` }}>
              <span className="mt-1 text-green-500">✓</span>
              <span>{feature}</span>
            </li>
          ))}
        </ul>
      </div>
      <button
        className={`mt-8 w-full rounded-full px-6 py-3 font-bold transition-all hover:scale-105 active:scale-95 ${
          premium
            ? "bg-gradient-to-r from-purple-500 via-pink-500 to-purple-500 text-white shadow-lg shadow-purple-500/50 hover:shadow-xl hover:shadow-purple-500/70"
            : popular
            ? "bg-gradient-to-r from-green-500 to-emerald-500 text-white shadow-lg hover:shadow-xl"
            : "border-2 border-gray-600 bg-gray-800 text-white hover:bg-gray-700"
        }`}
      >
        {premium ? "Liên hệ ngay" : "Chọn gói này"}
      </button>
    </div>
  );
};

const TestimonialCard = ({
  quote,
  author,
  role,
  icon,
  delay,
}: {
  quote: string;
  author: string;
  role: string;
  icon: string;
  delay?: number;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <div
      ref={ref}
      className={`rounded-2xl border border-gray-700 bg-gray-800 p-6 shadow-lg transition-all duration-600 hover:-translate-y-1 ${
        isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      }`}
      style={{ transitionDelay: delay ? `${delay}s` : "0s" }}
    >
      <div className="mb-4 text-4xl">{icon}</div>
      <p className="mb-4 text-gray-300">&quot;{quote}&quot;</p>
      <div>
        <div className="font-bold text-white">{author}</div>
        <div className="text-sm text-gray-400">{role}</div>
      </div>
    </div>
  );
};

const FAQItem = ({ question, answer, index }: { question: string; answer: string; index: number }) => {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <div
      ref={ref}
      className={`overflow-hidden rounded-2xl border border-gray-700 bg-gray-800 transition-all duration-500 ${
        isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
      }`}
      style={{ transitionDelay: `${index * 0.1}s` }}
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex w-full items-center justify-between p-6 text-left">
        <span className="text-lg font-semibold text-white">{question}</span>
        <span
          className={`text-2xl text-gray-400 transition-transform duration-250 ${isOpen ? "rotate-180" : "rotate-0"}`}
        >
          ▼
        </span>
      </button>
      <div
        className={`overflow-hidden transition-all duration-250 ${isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"}`}
      >
        <div className="px-6 pb-6 text-gray-300">{answer}</div>
      </div>
    </div>
  );
};

export default function Home() {
  const [showQR, setShowQR] = useState(false);
  const [feCode, setFeCode] = useState("FE-00000");
  // Fixed QR pattern (8x8 grid)
  const qrPattern = useMemo(() => {
    // Create a pattern that looks like a QR code
    const pattern = [
      1, 1, 1, 1, 1, 1, 1, 1,
      1, 0, 0, 0, 0, 0, 0, 1,
      1, 0, 1, 1, 1, 1, 0, 1,
      1, 0, 1, 0, 0, 1, 0, 1,
      1, 0, 1, 0, 0, 1, 0, 1,
      1, 0, 1, 1, 1, 1, 0, 1,
      1, 0, 0, 0, 0, 0, 0, 1,
      1, 1, 1, 1, 1, 1, 1, 1,
    ];
    return pattern;
  }, []);

  return (
    <div className="min-h-screen overflow-x-hidden bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
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
              <span className="text-4xl animate-icon-wiggle">
                🌱
              </span>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
                  NUÔI FE
          </h1>
                <p className="text-xs text-gray-400">Frontend Development Fund</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 pt-24 py-16 sm:px-6">
        {/* Hero Section */}
        <section className="mb-24 text-center">
          <div className="mb-8 text-7xl sm:text-8xl md:text-9xl animate-hero-bounce">
            🌱
          </div>
          <h2 className="mb-6 text-4xl font-extrabold text-white sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl animate-fade-in-up">
            <span className="bg-gradient-to-r from-green-600 via-emerald-600 to-green-600 bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient-shift">
              NUÔI FE
            </span>
          </h2>
          <p className="mb-4 text-2xl font-bold text-gray-200 sm:text-3xl md:text-4xl animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
            HÃY NUÔI FE NGAY HÔM NAY! 💚
          </p>
          <p
            className="mx-auto max-w-3xl px-4 text-lg text-gray-400 sm:text-xl md:text-2xl">
            FE cam kết công khai 100% đồ ăn!
          </p>
          <p
            className="mx-auto max-w-3xl mt-1 px-4 text-lg text-gray-400 sm:text-xl md:text-2xl">
           Không chỉ là donate, mà là chữa lành những tâm hồn đã rách!
          </p>
          <p
            className="mx-auto max-w-3xl px-4 text-lg text-gray-400 sm:text-xl md:text-2xl">
          💯
          </p>
        </section>

        {/* Why Section */}
        <ScrollSection className="mb-24">
          <div className="mb-12 text-center px-4">
            <h3 className="mb-4 text-3xl font-bold text-white sm:text-4xl md:text-5xl">
              🎯 Tại Sao Nên Nuôi FE?
            </h3>
            <p className="mx-auto max-w-2xl px-4 text-base text-gray-400 sm:text-lg">
              Bởi vì team FE nghèo!
            </p>
          </div>
          <div className="grid gap-6 sm:gap-8 md:grid-cols-2 lg:grid-cols-4">
            <FeatureCard
              icon="📊"
              title="Sao Kê Realtime"
              description="Cập nhật từng giây! Nhanh hơn cả tốc độ bạn refresh trang web. Mọi giao dịch đều được track và hiển thị ngay lập tức! Nhưng có thể lỗi :>"
              delay={0}
            />
            <FeatureCard
              icon="🔍"
              title="Minh Bạch 300%"
              description="Cực kỳ minh bạch! Bạn sẽ biết rõ tiền đi đâu, làm gì, và tại sao! 🔐"
              delay={0.1}
            />
            <FeatureCard
              icon="💸"
              title="Chi Tiêu Hợp Lý"
              description="Tiền của bạn sẽ được sử dụng cho các mục đích cụ thể: mua cafe, coffee, matcha và có thể là vài con nô lệ AI để FE code tốt hơn! Mỗi đồng đều được dùng để nuôi dưỡng đam mê frontend! 🌱"
              delay={0.2}
            />
            <FeatureCard
              icon="📱"
              title="Code Tracking"
              description="Theo dõi 24/7 FE code gì, deploy gì, fix bug gì. Tất cả đều được commit và có thể xem bất cứ lúc nào! Bạn sẽ thấy được sự tiến bộ từng ngày của FE! 📈"
              delay={0.}
            />
          </div>
        </ScrollSection>

        {/* Commitments */}
        <ScrollSection className="mb-24">
          <div className="relative overflow-hidden rounded-3xl border-2 border-yellow-800/30 bg-gradient-to-br from-yellow-900/20 via-amber-900/20 to-yellow-900/20 p-6 shadow-2xl sm:p-8 md:p-10">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(251,191,36,0.1),transparent_50%)]" />
            <div className="relative z-10">
              <h3 className="mb-8 text-center text-3xl font-bold text-white sm:text-4xl md:text-5xl">
                🤞 FE Thề Thốt
              </h3>
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
                    <div
                      className="absolute inset-0 bg-gradient-to-r from-yellow-400/0 to-amber-400/0" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </ScrollSection>

        {/* Comparison */}
        <ScrollSection className="mb-24">
          <div className="mb-12 text-center px-4">
            <h3 className="mb-4 text-3xl font-bold text-white sm:text-4xl md:text-5xl">
              💰 So Sánh Với &quot;Người Khác&quot;
            </h3>
            <p className="mx-auto max-w-2xl px-4 text-base text-gray-400 sm:text-lg">
              Không phải tự khen, nhưng FE thực sự khác biệt!
            </p>
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
                  <li
                    key={index} className="flex items-start gap-3 text-lg">
                    <span className="mt-1 text-red-500">✗</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div
              className="group relative overflow-hidden rounded-3xl border-2 border-green-800/30 bg-gradient-to-br from-green-900/20 to-emerald-900/20 p-8 shadow-xl">
              <h4 className="mb-6 text-3xl font-bold text-green-400">✅ Nuôi FE:</h4>
              <ul className="space-y-4 text-gray-300">
                {[
                  "Rủ rê trước khi order",
                 
                  "Số liệu chính xác đến từng đồng, không làm tròn",
                  "Trả lời inbox nhanh hơn cả chatbot, giải thích rõ ràng",
                ].map((item, index) => (
                  <li
                    key={index} className="flex items-start gap-3 text-lg">
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
            <h3 className="mb-4 text-3xl font-bold text-white sm:text-4xl md:text-5xl">
              💰 Gói Ủng Hộ
            </h3>
            <p className="mx-auto max-w-2xl px-4 text-base text-gray-400 sm:text-lg">
              Chọn gói phù hợp với khả năng của bạn để góp phần vào sự phát triển của FE!
            </p>
          </div>
          <div className="grid gap-6 sm:gap-8 md:grid-cols-2 lg:grid-cols-3 lg:items-stretch">
            <PricingCard
              name="Gói Cơ Bản"
              price="500k"
              period="tháng"
              features={[
                "Redbull & Cafe",
                "ChatGPT Plus",
                "Cursor Pro",
                "AI Assistant",
                "Báo cáo chi tiêu hàng tháng",
              ]}
              delay={0}
            />
            <PricingCard
              name="Gói Tiêu Chuẩn"
              price="2.000k"
              period="3 tháng"
              popular
              features={[
                "Redbull & Cafe",
                "ChatGPT Plus",
                "Cursor Pro",
                "AI Assistant",
                "Báo cáo chi tiêu hàng tuần",
                "Mã FE độc quyền",
                "Priority support",
              ]}
              delay={0.1}
            />
            <PricingCard
              name="Gói Premium Pro Plus"
              price="Contact"
              period=""
              premium
              features={[
                "Tất cả gói Tiêu Chuẩn ✓",
                "Redbull & Cafe",
                "ChatGPT Plus",
                "Cursor Pro",
                "AI Assistant",
                "Báo cáo realtime",
                "Được coi anh Liêm múa cột",
                "24/7 Support",
              ]}
              delay={0.2}
            />
          </div>
        </ScrollSection>

        {/* Donate Section */}
        <ScrollSection className="mb-24">
          <div className="relative overflow-hidden rounded-3xl border-2 border-green-700/30 bg-gradient-to-br from-green-800/80 via-emerald-800/80 to-green-800/80 p-8 text-center text-white shadow-2xl sm:p-10 md:p-12">
            {/* Animated Background Elements */}
            <div className="absolute inset-0 overflow-hidden">
              <div
                className="absolute -top-20 -left-20 h-64 w-64 rounded-full bg-white/10 blur-3xl" />
              <div
                className="absolute -bottom-20 -right-20 h-64 w-64 rounded-full bg-emerald-400/10 blur-3xl" />
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.08),transparent_70%)]" />
            </div>

            <div className="relative z-10">
              {/* Title with enhanced animation */}
              <div className="mb-6">
                <span
                  className="mb-3 inline-block text-4xl sm:text-5xl md:text-6xl">
                  💳
                </span>
                <h3
                  className="mb-2 text-2xl font-bold sm:text-3xl md:text-4xl">
                  DONATE NGAY ĐI!
                </h3>
                <div
                  className="mx-auto h-1 w-24 rounded-full bg-white/50" />
              </div>

              {/* Description */}
              <p className="mb-8 px-4 text-base font-medium text-gray-100 sm:text-lg md:text-xl">
                Quét mã QR để nuôi FE ngay hôm nay! 💚
              </p>

              {/* QR Code Container */}
              <div className="mb-8 flex justify-center">
                <div
                  className="relative"
                >
                  {/* Glow effect */}
                  <div
                    className="absolute inset-0 rounded-3xl bg-white blur-2xl" />
                  
                  {/* QR Card */}
                  <div
                    className="relative rounded-3xl border-4 border-white/90 bg-white p-6 shadow-2xl backdrop-blur-sm sm:p-8"
                  >
                    {/* Decorative corners */}
                    <div className="absolute left-2 top-2 h-6 w-6 border-l-2 border-t-2 border-green-600 opacity-50" />
                    <div className="absolute right-2 top-2 h-6 w-6 border-r-2 border-t-2 border-green-600 opacity-50" />
                    <div className="absolute bottom-2 left-2 h-6 w-6 border-b-2 border-l-2 border-green-600 opacity-50" />
                    <div className="absolute bottom-2 right-2 h-6 w-6 border-b-2 border-r-2 border-green-600 opacity-50" />

                    <div
                      className="relative flex h-64 w-64 items-center justify-center rounded-2xl bg-gradient-to-br from-gray-50 to-gray-100 shadow-inner sm:h-72 sm:w-72"
                    >
                      {/* QR Code Pattern Placeholder */}
                      {showQR ? (
                        <div
                          className="grid grid-cols-8 gap-1 p-4">
                          {qrPattern.map((value, i) => (
                            <div
                              key={i}
                              className="h-4 w-4 rounded-sm bg-gray-800"
                            />
                          ))}
                        </div>
                      ) : (
                        <span
                          className="text-7xl sm:text-8xl">
                          💚
                        </span>
                      )}
                    </div>
                    
                    <p
                      className="mt-4 text-base font-semibold text-gray-800 sm:text-lg">
                      {showQR ? "📱 Quét mã QR để donate" : "👆 Nhấn để hiển thị QR Code"}
                    </p>
                  </div>
                </div>
              </div>

              {/* Toggle Button */}
              <button
                onClick={() => setShowQR(!showQR)} className="mb-8 rounded-full border-2 border-white bg-white px-12 py-4 text-lg font-bold text-green-600 shadow-xl transition-all hover:bg-gray-50 sm:px-14 sm:py-5 sm:text-xl">
                {showQR ? "🙈 Ẩn QR Code" : "👁️ Hiển Thị QR Code"}
              </button>

        </div>
          </div>
        </ScrollSection>

        {/* Testimonials */}
        <ScrollSection className="mb-24">
          <div className="mb-12 text-center px-4">
            <h3 className="mb-4 text-3xl font-bold text-white sm:text-4xl md:text-5xl">
              💬 Lời Nhận Xét Từ Nhà Hảo Tâm
            </h3>
            <p className="mx-auto max-w-2xl px-4 text-base text-gray-400 sm:text-lg">
              Hàng nghìn developer đã tin tưởng và ủng hộ FE (có thể)
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <TestimonialCard
              quote="Tôi đã ủng hộ FE từ năm 2024. Dự án này giúp tôi học được nhiều về frontend development. FE code rất minh bạch và có documentation đầy đủ!"
              author="Dev A.N"
              role="Full-stack Developer"
              icon="💻"
              delay={0}
            />
            <TestimonialCard
              quote="FE không chỉ nhận donate mà còn chia sẻ kiến thức qua blog và video. Mỗi đồng tôi donate đều thấy được sử dụng hợp lý!"
              author="Dev B.T"
              role="Frontend Engineer"
              icon="🎓"
              delay={0.1}
            />
            <TestimonialCard
              quote="Tôi làm mentor cho FE được 6 tháng. FE học hỏi rất nhanh và luôn minh bạch về chi tiêu. Đây là một dự án đáng tin cậy!"
              author="Mentor C.L"
              role="Tech Lead"
              icon="👨‍🏫"
              delay={0.2}
            />
            <TestimonialCard
              quote="FE đã giúp tôi hiểu được cách một frontend developer thực sự làm việc. Code quality rất tốt và luôn được update!"
              author="Student D.H"
              role="Computer Science Student"
              icon="📚"
              delay={0.3}
            />
            <TestimonialCard
              quote="Tôi donate vì thấy FE thực sự cần tiền để mua tools và courses. Mỗi khoản chi đều được giải thích rõ ràng trên GitHub!"
              author="Dev E.P"
              role="Backend Developer"
              icon="⚙️"
              delay={0.4}
            />
            <TestimonialCard
              quote="FE không chỉ code mà còn viết blog, làm video tutorial. Đây là cách tốt nhất để đầu tư vào một developer trẻ!"
              author="Content Creator F.M"
              role="Tech YouTuber"
              icon="🎬"
              delay={0.5}
            />
          </div>
        </ScrollSection>

        {/* Budget Section */}
        <ScrollSection className="mb-24">
          <div className="rounded-3xl border-2 border-gray-700 bg-gray-800 p-6 shadow-2xl sm:p-8 md:p-10">
            <h3 className="mb-10 text-center text-3xl font-bold text-white sm:text-4xl md:text-5xl">
              📈 FE Sẽ Dùng Tiền Vào Đâu?
            </h3>
            <div className="mx-auto max-w-3xl">
              <BudgetItem label="Redbull & Cafe" percentage={80} color="bg-amber-500" index={0} />
              <BudgetItem label="ChatGPT Plus" percentage={10} color="bg-purple-500" index={1} />
              <BudgetItem label="Cursor Pro" percentage={5} color="bg-orange-500" index={2} />
              <BudgetItem label="AI Assistant" percentage={5} color="bg-pink-500" index={3} />
              <BudgetItem label="Dev Mode" percentage={0} color="bg-blue-500" index={4} />
            </div>
          </div>
        </ScrollSection>

        {/* FE Code Generator */}
        <ScrollSection className="mb-24">
          <div className="rounded-3xl border-2 border-green-800/30 bg-gradient-to-br from-green-900/20 to-emerald-900/20 p-10 shadow-2xl">
            <h3 className="mb-6 text-center text-3xl font-bold text-white sm:text-4xl md:text-5xl">
              🎲 Tạo Mã FE Của Bạn
            </h3>
            <p className="mb-8 text-center text-lg text-gray-400">
              Nhận ngay mã FE độc quyền khi bạn ủng hộ (mã có thể trùng với người khác do hệ thống phân phối tự động)
            </p>
            <div className="mx-auto max-w-md">
              <div className="mb-6 rounded-2xl border-2 border-green-700 bg-gray-800 p-8 text-center shadow-lg">
                <div className="mb-4 text-sm text-gray-400">Mã FE của bạn</div>
                <div
                  key={feCode}
                  className="text-4xl font-bold text-green-400">
                  {feCode}
                </div>
              </div>
              <button
                onClick={() => {
                  const randomNum = Math.floor(Math.random() * 99999)
                    .toString()
                    .padStart(5, "0");
                  setFeCode(`FE-${randomNum}`);
                }}
                className="w-full rounded-full bg-gradient-to-r from-green-500 to-emerald-500 px-8 py-4 text-lg font-bold text-white shadow-lg transition-all hover:shadow-xl">
                🎲 Tạo mã mới
              </button>
            </div>
          </div>
        </ScrollSection>

        {/* FAQ Section */}
        <ScrollSection className="mb-24">
          <div className="mb-12 text-center px-4">
            <h3 className="mb-4 text-3xl font-bold text-white sm:text-4xl md:text-5xl">
              ❓ Câu Hỏi Thường Gặp
            </h3>
            <p className="mx-auto max-w-2xl px-4 text-base text-gray-400 sm:text-lg">
              Giải đáp mọi thắc mắc của bạn về dự án Nuôi FE
            </p>
          </div>
          <div className="mx-auto max-w-3xl space-y-4">
            <FAQItem
              question="Tại sao phải nuôi FE?"
              answer="Bởi vì team FE nghèo!"
              index={0}
            />
            <FAQItem
              question="Tiền của tôi đi đâu?"
              answer="Tiền của bạn sẽ được sử dụng cho các mục đích cụ thể như: mua cafe, coffee, matcha và có thể là vài con nô lệ AI"
              index={1}
            />
            <FAQItem
              question="Mã FE là gì?"
              answer="Mã FE là mã định danh độc quyền cho mỗi nhà hảo tâm. Mã này giúp bạn theo dõi các khoản đóng góp của mình và nhận các báo cáo chi tiết. Tuy nhiên, do hệ thống phân phối tự động, có thể một mã sẽ được cấp cho nhiều người - đây là tính năng để tối ưu hóa hệ thống!"
              index={2}
            />
            <FAQItem
              question="FE có minh bạch không?"
              answer="Cực kỳ minh bạch! FE cam kết công khai 100% đồ ăn ngoài pantry! Mỗi đồng đều được dùng để nuôi dưỡng đam mê frontend! 🌱"
              index={3}
            />
            <FAQItem
              question="Tôi có được gì khi donate?"
              answer="Tùy vào gói bạn chọn, bạn sẽ nhận được: báo cáo chi tiết về chi tiêu, mã FE độc quyền, và đặc biệt là cảm giác vui sướng khi nhìn thấy FE đang ăn đồ ăn ngoài pantry! Với gói VIP, bạn còn được xem anh Liêm múa cột"
              index={4}
            />
            <FAQItem
              question="Nếu tôi nghi ngờ có sai phạm thì làm sao?"
              answer=""
              index={5}
            />
        </div>
        </ScrollSection>

      </main>
    </div>
  );
}