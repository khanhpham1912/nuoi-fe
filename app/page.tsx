"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState, useMemo } from "react";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
    },
  },
};

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
    },
  },
};

const ScrollSection = ({ children, className }: { children: React.ReactNode; className?: string }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.section
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={containerVariants}
      className={className}
    >
      {children}
    </motion.section>
  );
};

const FeatureCard = ({ icon, title, description, delay }: { icon: string; title: string; description: string; delay?: number }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={itemVariants}
      transition={{ delay }}
      whileHover={{
        scale: 1.05,
        y: -8,
        transition: {
          type: "spring",
          stiffness: 400,
          damping: 17,
        },
      }}
      whileTap={{ scale: 0.98 }}
      className="group relative overflow-hidden rounded-3xl border border-green-800/30 bg-gradient-to-br from-green-900/20 via-emerald-900/20 to-green-900/20 p-8 shadow-lg shadow-green-900/20 transition-all duration-300"
    >
      <div className="relative z-10">
        <motion.div
          className="mb-5 text-5xl"
          animate={{
            rotate: [0, 10, -10, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut",
            delay: delay || 0,
          }}
        >
          {icon}
        </motion.div>
        <h3 className="mb-3 text-2xl font-bold text-gray-100">{title}</h3>
        <p className="text-base leading-relaxed text-gray-300">{description}</p>
      </div>
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-green-400/0 via-emerald-400/0 to-green-400/0"
        whileHover={{
          background: "linear-gradient(to right, rgba(74, 222, 128, 0.15), rgba(16, 185, 129, 0.15), rgba(74, 222, 128, 0.15))",
        }}
        transition={{ duration: 0.25 }}
      />
      <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-green-800/20 blur-2xl" />
      <div className="absolute -bottom-10 -left-10 h-32 w-32 rounded-full bg-emerald-800/20 blur-2xl" />
    </motion.div>
  );
};

const BudgetItem = ({ label, percentage, color, index }: { label: string; percentage: number; color: string; index: number }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={fadeInUp}
      transition={{ delay: index * 0.1 }}
      className="mb-6"
    >
      <motion.div
        className="mb-3 flex items-center justify-between"
        initial={{ opacity: 0, x: -20 }}
        animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
        transition={{ duration: 0.5, delay: index * 0.1 + 0.2 }}
      >
        <span className="text-base font-semibold text-gray-200">{label}</span>
        <motion.span
          className="rounded-full bg-gray-700 px-3 py-1 text-lg font-bold text-white"
          initial={{ scale: 0 }}
          animate={isInView ? { scale: 1 } : { scale: 0 }}
          transition={{
            type: "spring",
            stiffness: 200,
            damping: 15,
            delay: index * 0.1 + 0.4,
          }}
        >
          {percentage}%
        </motion.span>
      </motion.div>
      <div className="h-5 overflow-hidden rounded-full bg-gray-700 shadow-inner">
        <motion.div
          initial={{ width: 0 }}
          animate={isInView ? { width: `${percentage}%` } : { width: 0 }}
          transition={{
            duration: 1.2,
            delay: index * 0.1 + 0.3,
            ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
          }}
          className={`h-full ${color} rounded-full shadow-lg`}
        />
      </div>
    </motion.div>
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
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.6, delay }}
      whileHover={{
        y: -10,
        transition: { type: "spring", stiffness: 400, damping: 17 },
      }}
      className={`relative flex h-full flex-col rounded-3xl border-2 p-8 shadow-xl ${
        premium
          ? "border-purple-500/50 bg-gradient-to-br from-purple-900/40 via-pink-900/40 to-purple-900/40 md:scale-105 shadow-purple-500/20"
          : popular
          ? "border-green-600 bg-gradient-to-br from-green-900/30 to-emerald-900/30 md:scale-105"
          : "border-gray-700 bg-gray-800"
      }`}
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
            <motion.li
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
              transition={{ delay: (delay || 0) + index * 0.1 + 0.2 }}
              className="flex items-start gap-2 text-gray-300"
            >
              <span className="mt-1 text-green-500">✓</span>
              <span>{feature}</span>
            </motion.li>
          ))}
        </ul>
      </div>
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className={`mt-8 w-full rounded-full px-6 py-3 font-bold transition-all ${
          premium
            ? "bg-gradient-to-r from-purple-500 via-pink-500 to-purple-500 text-white shadow-lg shadow-purple-500/50 hover:shadow-xl hover:shadow-purple-500/70"
            : popular
            ? "bg-gradient-to-r from-green-500 to-emerald-500 text-white shadow-lg hover:shadow-xl"
            : "border-2 border-gray-600 bg-gray-800 text-white hover:bg-gray-700"
        }`}
      >
        {premium ? "Liên hệ ngay" : "Chọn gói này"}
      </motion.button>
    </motion.div>
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
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.6, delay }}
      whileHover={{
        y: -5,
        transition: { type: "spring", stiffness: 400, damping: 17 },
      }}
      className="rounded-2xl border border-gray-700 bg-gray-800 p-6 shadow-lg"
    >
      <div className="mb-4 text-4xl">{icon}</div>
      <p className="mb-4 text-gray-300">&quot;{quote}&quot;</p>
      <div>
        <div className="font-bold text-white">{author}</div>
        <div className="text-sm text-gray-400">{role}</div>
      </div>
    </motion.div>
  );
};

const FAQItem = ({ question, answer, index }: { question: string; answer: string; index: number }) => {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="overflow-hidden rounded-2xl border border-gray-700 bg-gray-800"
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex w-full items-center justify-between p-6 text-left"
      >
        <span className="text-lg font-semibold text-white">{question}</span>
        <motion.span
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.25 }}
          className="text-2xl text-gray-400"
        >
          ▼
        </motion.span>
      </button>
      <motion.div
        initial={false}
        animate={{ height: isOpen ? "auto" : 0 }}
        transition={{ duration: 0.25 }}
        className="overflow-hidden"
      >
        <div className="px-6 pb-6 text-gray-300">{answer}</div>
      </motion.div>
    </motion.div>
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
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{
          type: "spring",
          stiffness: 100,
          damping: 20,
          duration: 0.8,
        }}
        className="fixed top-0 left-0 right-0 z-50 w-full border-b border-green-800/20 bg-gradient-to-br from-gray-900/60 via-gray-800/60 to-gray-900/60 backdrop-blur-2xl backdrop-saturate-150"
      >
        <div className="container mx-auto px-4 py-4 sm:px-6 sm:py-5">
          <div className="flex items-center justify-between">
            <motion.div
              whileHover={{
                scale: 1.05,
                transition: {
                  type: "spring",
                  stiffness: 400,
                  damping: 17,
                },
              }}
              whileTap={{
                scale: 0.95,
                transition: {
                  type: "spring",
                  stiffness: 400,
                  damping: 17,
                },
              }}
              className="flex items-center gap-3"
            >
              <motion.span
                className="text-4xl"
                animate={{
                  rotate: [0, 15, -15, 0],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  repeatDelay: 3,
                  ease: "easeInOut",
                }}
              >
                🌱
              </motion.span>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
                  NUÔI FE
                </h1>
                <p className="text-xs text-gray-400">Frontend Development Fund</p>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.header>

      {/* Main Content */}
      <motion.main
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="container mx-auto px-4 pt-24 py-16 sm:px-6"
      >
        {/* Hero Section */}
        <motion.section variants={itemVariants} className="mb-24 text-center">
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              rotate: [0, 10, -10, 0],
              y: [0, -15, 0],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut",
            }}
            className="mb-8 text-7xl sm:text-8xl md:text-9xl"
          >
            🌱
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="mb-6 text-4xl font-extrabold text-white sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl"
          >
            <motion.span
              className="bg-gradient-to-r from-green-600 via-emerald-600 to-green-600 bg-clip-text text-transparent bg-[length:200%_auto]"
              animate={{
                backgroundPosition: ["0%", "100%", "0%"],
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: "linear",
              }}
            >
              NUÔI FE
            </motion.span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="mb-4 text-2xl font-bold text-gray-200 sm:text-3xl md:text-4xl"
          >
            HÃY NUÔI FE NGAY HÔM NAY! 💚
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="mx-auto max-w-2xl px-4 text-lg text-gray-400 sm:text-xl md:text-2xl"
          >
            FE hứa sẽ sao kê đầy đủ, minh bạch từng đồng! Mỗi khoản chi tiêu đều được công khai và giải thích rõ ràng.
            💯
          </motion.p>
        </motion.section>

        {/* Why Section */}
        <ScrollSection className="mb-24">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="mb-12 text-center px-4"
          >
            <h3 className="mb-4 text-3xl font-bold text-white sm:text-4xl md:text-5xl">
              🎯 Tại Sao Nên Nuôi FE?
            </h3>
            <p className="mx-auto max-w-2xl px-4 text-base text-gray-400 sm:text-lg">
              Không chỉ là donate, mà là đầu tư vào một frontend developer đầy tiềm năng!
            </p>
          </motion.div>
          <div className="grid gap-6 sm:gap-8 md:grid-cols-2 lg:grid-cols-4">
            <FeatureCard
              icon="📊"
              title="Sao Kê Realtime"
              description="Cập nhật từng giây! Nhanh hơn cả tốc độ bạn refresh trang web. Mọi giao dịch đều được track và hiển thị ngay lập tức!"
              delay={0}
            />
            <FeatureCard
              icon="🔍"
              title="Minh Bạch 300%"
              description="Hơn cả 100%! FE không chỉ báo cáo chi tiêu mà còn giải thích tại sao cần mua từng món. Từ domain đến hosting, từng đồng đều có lý do!"
              delay={0.1}
            />
            <FeatureCard
              icon="💸"
              title="Chi Tiêu Hợp Lý"
              description="FE không mua xe hơi hay nhà cửa. Chỉ đầu tư vào những gì thực sự cần: domain, hosting, tools, và courses để code tốt hơn!"
              delay={0.2}
            />
            <FeatureCard
              icon="📱"
              title="Code Tracking"
              description="Theo dõi 24/7 FE code gì, deploy gì, fix bug gì. Tất cả đều được commit lên GitHub và có thể xem bất cứ lúc nào!"
              delay={0.3}
            />
          </div>
        </ScrollSection>

        {/* Commitments */}
        <ScrollSection className="mb-24">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="relative overflow-hidden rounded-3xl border-2 border-yellow-800/30 bg-gradient-to-br from-yellow-900/20 via-amber-900/20 to-yellow-900/20 p-6 shadow-2xl sm:p-8 md:p-10"
          >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(251,191,36,0.1),transparent_50%)]" />
            <div className="relative z-10">
              <motion.h3
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7 }}
                className="mb-8 text-center text-3xl font-bold text-white sm:text-4xl md:text-5xl"
              >
                🎪 Cam Kết Vàng Của FE
              </motion.h3>
              <div className="grid gap-6 md:grid-cols-2">
                {[
                  {
                    icon: "⏰",
                    title: "Sao Kê Mỗi Ngày",
                    desc: "Cập nhật lúc 6h sáng, đều như vắt tranh! Kể cả Chủ Nhật & Lễ, FE vẫn không quên báo cáo.",
                  },
                  {
                    icon: "📝",
                    title: "Không Giấu Giếm",
                    desc: "Từ domain 200k đến hosting 50k, từng khoản đều được ghi chép tỉ mỉ với screenshot và invoice đầy đủ.",
                  },
                  {
                    icon: "🧾",
                    title: "Hóa Đơn Chứng Từ",
                    desc: "Screenshot invoice, export PDF, lưu receipt - tất cả đều được lưu trữ công khai trên GitHub repository.",
                  },
                  {
                    icon: "🎥",
                    title: "Video Demo",
                    desc: "Deploy từng feature live trên Vercel cho mọi người xem. Không chỉ code mà còn demo cách sử dụng!",
                  },
                  {
                    icon: "📞",
                    title: "Hotline 24/7",
                    desc: "Gọi hỏi FE code gì bất cứ lúc nào, kể cả 3h sáng! FE sẽ trả lời ngay (nếu không ngủ quên 😴).",
                  },
                  {
                    icon: "💬",
                    title: "Không Block",
                    desc: "Hỏi khó đến mấy cũng trả lời, không 'đã xem' rồi im lặng. FE cam kết trả lời mọi câu hỏi!",
                  },
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30, scale: 0.9 }}
                    whileInView={{ opacity: 1, x: 0, scale: 1 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{
                      duration: 0.6,
                      delay: index * 0.1,
                      ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
                    }}
                    whileHover={{
                      scale: 1.03,
                      x: index % 2 === 0 ? 5 : -5,
                      transition: {
                        type: "spring",
                        stiffness: 400,
                        damping: 17,
                      },
                    }}
                    className="group relative overflow-hidden rounded-2xl border border-yellow-800/30 bg-gray-800/80 p-6 shadow-lg backdrop-blur-sm"
                  >
                    <div className="mb-3 flex items-center gap-3">
                      <span className="text-3xl">{item.icon}</span>
                      <h4 className="text-xl font-bold text-white">{item.title}</h4>
                    </div>
                    <p className="text-gray-300">{item.desc}</p>
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-yellow-400/0 to-amber-400/0"
                      whileHover={{
                        background: "linear-gradient(to right, rgba(251, 191, 36, 0.1), rgba(245, 158, 11, 0.1))",
                      }}
                      transition={{ duration: 0.25 }}
                    />
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </ScrollSection>

        {/* Comparison */}
        <ScrollSection className="mb-24">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="mb-12 text-center px-4"
          >
            <h3 className="mb-4 text-3xl font-bold text-white sm:text-4xl md:text-5xl">
              💰 So Sánh Với &quot;Người Khác&quot;
            </h3>
            <p className="mx-auto max-w-2xl px-4 text-base text-gray-400 sm:text-lg">
              Không phải tự khen, nhưng FE thực sự khác biệt!
            </p>
          </motion.div>
          <div className="grid gap-8 md:grid-cols-2">
            <motion.div
              initial={{ opacity: 0, x: -50, scale: 0.9 }}
              whileInView={{ opacity: 1, x: 0, scale: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{
                duration: 0.7,
                ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
              }}
              whileHover={{
                scale: 1.02,
                y: -5,
                transition: {
                  type: "spring",
                  stiffness: 400,
                  damping: 17,
                },
              }}
              className="group relative overflow-hidden rounded-3xl border-2 border-red-800/30 bg-gradient-to-br from-red-900/20 to-pink-900/20 p-8 shadow-xl"
            >
              <h4 className="mb-6 text-3xl font-bold text-red-400">❌ Người Khác:</h4>
              <ul className="space-y-4 text-gray-300">
                {[
                  "Sao kê sau 3 năm (hoặc không bao giờ)",
                  "File Excel blur mờ như ảnh ma, không đọc được",
                  "Số liệu 'làm tròn' theo kiểu 1 + 1 = 3",
                  "Block người hỏi nhanh như chớp, không giải thích",
                ].map((item, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 + 0.3, duration: 0.5 }}
                    className="flex items-start gap-3 text-lg"
                  >
                    <span className="mt-1 text-red-500">✗</span>
                    <span>{item}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 50, scale: 0.9 }}
              whileInView={{ opacity: 1, x: 0, scale: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{
                duration: 0.7,
                delay: 0.2,
                ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
              }}
              whileHover={{
                scale: 1.02,
                y: -5,
                transition: {
                  type: "spring",
                  stiffness: 400,
                  damping: 17,
                },
              }}
              className="group relative overflow-hidden rounded-3xl border-2 border-green-800/30 bg-gradient-to-br from-green-900/20 to-emerald-900/20 p-8 shadow-xl"
            >
              <h4 className="mb-6 text-3xl font-bold text-green-400">✅ Nuôi FE:</h4>
              <ul className="space-y-4 text-gray-300">
                {[
                  "Sao kê trước khi chi tiêu (để mọi người duyệt)",
                  "File Excel 4K Ultra HD, có chữ ký điện tử và watermark",
                  "Số liệu chính xác đến từng đồng, không làm tròn",
                  "Trả lời inbox nhanh hơn cả chatbot, giải thích rõ ràng",
                ].map((item, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 + 0.5, duration: 0.5 }}
                    className="flex items-start gap-3 text-lg"
                  >
                    <span className="mt-1 text-green-500">✓</span>
                    <span>{item}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          </div>
        </ScrollSection>

        {/* Pricing Packages */}
        <ScrollSection className="mb-24">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7 }}
            className="mb-12 text-center px-4"
          >
            <h3 className="mb-4 text-3xl font-bold text-white sm:text-4xl md:text-5xl">
              💰 Gói Ủng Hộ
            </h3>
            <p className="mx-auto max-w-2xl px-4 text-base text-gray-400 sm:text-lg">
              Chọn gói phù hợp với khả năng của bạn để góp phần vào sự phát triển của FE!
            </p>
          </motion.div>
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
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative overflow-hidden rounded-3xl border-2 border-green-700/30 bg-gradient-to-br from-green-800/80 via-emerald-800/80 to-green-800/80 p-8 text-center text-white shadow-2xl sm:p-10 md:p-12"
          >
            {/* Animated Background Elements */}
            <div className="absolute inset-0 overflow-hidden">
              <motion.div
                className="absolute -top-20 -left-20 h-64 w-64 rounded-full bg-white/10 blur-3xl"
                animate={{
                  x: [0, 50, 0],
                  y: [0, 50, 0],
                  scale: [1, 1.2, 1],
                }}
                transition={{
                  duration: 8,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
              <motion.div
                className="absolute -bottom-20 -right-20 h-64 w-64 rounded-full bg-emerald-400/10 blur-3xl"
                animate={{
                  x: [0, -50, 0],
                  y: [0, -50, 0],
                  scale: [1, 1.2, 1],
                }}
                transition={{
                  duration: 8,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 1,
                }}
              />
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.08),transparent_70%)]" />
            </div>

            <div className="relative z-10">
              {/* Title with enhanced animation */}
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="mb-6"
              >
                <motion.span
                  className="mb-3 inline-block text-4xl sm:text-5xl md:text-6xl"
                  animate={{
                    rotate: [0, 10, -10, 0],
                    scale: [1, 1.05, 1],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  💳
                </motion.span>
                <motion.h3
                  className="mb-2 text-2xl font-bold sm:text-3xl md:text-4xl"
                  animate={{
                    scale: [1, 1.01, 1],
                  }}
                  transition={{
                    duration: 2.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  DONATE NGAY ĐI!
                </motion.h3>
                <motion.div
                  className="mx-auto h-1 w-24 rounded-full bg-white/50"
                  animate={{
                    width: [96, 128, 96],
                    opacity: [0.5, 0.8, 0.5],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />
              </motion.div>

              {/* Description */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2, duration: 0.7 }}
                className="mb-8 px-4 text-base font-medium text-gray-100 sm:text-lg md:text-xl"
              >
                Quét mã QR để nuôi FE ngay hôm nay! 💚
              </motion.p>

              {/* QR Code Container */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8, y: 30 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.7,
                  delay: 0.3,
                  ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
                }}
                className="mb-8 flex justify-center"
              >
                <motion.div
                  className="relative"
                  whileHover={{
                    scale: 1.05,
                    transition: {
                      type: "spring",
                      stiffness: 400,
                      damping: 17,
                    },
                  }}
                  whileTap={{
                    scale: 0.98,
                    transition: {
                      type: "spring",
                      stiffness: 400,
                      damping: 17,
                    },
                  }}
                >
                  {/* Glow effect */}
                  <motion.div
                    className="absolute inset-0 rounded-3xl bg-white blur-2xl"
                    animate={{
                      opacity: showQR ? [0.3, 0.5, 0.3] : [0.2, 0.3, 0.2],
                      scale: [1, 1.1, 1],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  />
                  
                  {/* QR Card */}
                  <motion.div
                    className="relative rounded-3xl border-4 border-white/90 bg-white p-6 shadow-2xl backdrop-blur-sm sm:p-8"
                    animate={showQR ? { rotate: [0, 3, -3, 0] } : {}}
                    transition={{ duration: 0.6 }}
                  >
                    {/* Decorative corners */}
                    <div className="absolute left-2 top-2 h-6 w-6 border-l-2 border-t-2 border-green-600 opacity-50" />
                    <div className="absolute right-2 top-2 h-6 w-6 border-r-2 border-t-2 border-green-600 opacity-50" />
                    <div className="absolute bottom-2 left-2 h-6 w-6 border-b-2 border-l-2 border-green-600 opacity-50" />
                    <div className="absolute bottom-2 right-2 h-6 w-6 border-b-2 border-r-2 border-green-600 opacity-50" />

                    <motion.div
                      className="relative flex h-64 w-64 items-center justify-center rounded-2xl bg-gradient-to-br from-gray-50 to-gray-100 shadow-inner sm:h-72 sm:w-72"
                      animate={showQR ? { scale: [1, 1.05, 1] } : {}}
                      transition={{ duration: 0.6 }}
                    >
                      {/* QR Code Pattern Placeholder */}
                      {showQR ? (
                        <motion.div
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ duration: 0.4 }}
                          className="grid grid-cols-8 gap-1 p-4"
                        >
                          {qrPattern.map((value, i) => (
                            <motion.div
                              key={i}
                              className="h-4 w-4 rounded-sm bg-gray-800"
                              initial={{ opacity: 0 }}
                              animate={{ opacity: value ? 1 : 0 }}
                              transition={{
                                delay: i * 0.01,
                                duration: 0.25,
                              }}
                            />
                          ))}
                        </motion.div>
                      ) : (
                        <motion.span
                          className="text-7xl sm:text-8xl"
                          animate={{
                            scale: [1, 1.2, 1],
                            rotate: [0, 10, -10, 0],
                          }}
                          transition={{
                            duration: 2,
                            repeat: Infinity,
                            ease: "easeInOut",
                          }}
                        >
                          💚
                        </motion.span>
                      )}
                    </motion.div>
                    
                    <motion.p
                      className="mt-4 text-base font-semibold text-gray-800 sm:text-lg"
                      animate={{
                        opacity: [1, 0.8, 1],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                    >
                      {showQR ? "📱 Quét mã QR để donate" : "👆 Nhấn để hiển thị QR Code"}
                    </motion.p>
                  </motion.div>
                </motion.div>
              </motion.div>

              {/* Toggle Button */}
              <motion.button
                onClick={() => setShowQR(!showQR)}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                whileHover={{
                  scale: 1.08,
                  boxShadow: "0 20px 40px rgba(0, 0, 0, 0.3)",
                  transition: {
                    type: "spring",
                    stiffness: 400,
                    damping: 17,
                  },
                }}
                whileTap={{
                  scale: 0.95,
                  transition: {
                    type: "spring",
                    stiffness: 400,
                    damping: 17,
                  },
                }}
                transition={{ delay: 0.5, duration: 0.6 }}
                className="mb-8 rounded-full border-2 border-white bg-white px-12 py-4 text-lg font-bold text-green-600 shadow-xl transition-all hover:bg-gray-50 sm:px-14 sm:py-5 sm:text-xl"
              >
                {showQR ? "🙈 Ẩn QR Code" : "👁️ Hiển Thị QR Code"}
              </motion.button>

        </div>
          </motion.div>
        </ScrollSection>

        {/* Testimonials */}
        <ScrollSection className="mb-24">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7 }}
            className="mb-12 text-center px-4"
          >
            <h3 className="mb-4 text-3xl font-bold text-white sm:text-4xl md:text-5xl">
              💬 Lời Nhận Xét Từ Nhà Hảo Tâm
            </h3>
            <p className="mx-auto max-w-2xl px-4 text-base text-gray-400 sm:text-lg">
              Hàng nghìn developer đã tin tưởng và ủng hộ FE (có thể)
            </p>
          </motion.div>
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
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="rounded-3xl border-2 border-gray-700 bg-gray-800 p-6 shadow-2xl sm:p-8 md:p-10"
          >
            <motion.h3
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="mb-10 text-center text-3xl font-bold text-white sm:text-4xl md:text-5xl"
            >
              📈 FE Sẽ Dùng Tiền Vào Đâu?
            </motion.h3>
            <div className="mx-auto max-w-3xl">
              <BudgetItem label="Redbull & Cafe" percentage={80} color="bg-amber-500" index={0} />
              <BudgetItem label="ChatGPT Plus" percentage={10} color="bg-purple-500" index={1} />
              <BudgetItem label="Cursor Pro" percentage={5} color="bg-orange-500" index={2} />
              <BudgetItem label="AI Assistant" percentage={5} color="bg-pink-500" index={3} />
              <BudgetItem label="Dev Mode" percentage={0} color="bg-blue-500" index={4} />
            </div>
          </motion.div>
        </ScrollSection>

        {/* FE Code Generator */}
        <ScrollSection className="mb-24">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="rounded-3xl border-2 border-green-800/30 bg-gradient-to-br from-green-900/20 to-emerald-900/20 p-10 shadow-2xl"
          >
            <motion.h3
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="mb-6 text-center text-3xl font-bold text-white sm:text-4xl md:text-5xl"
            >
              🎲 Tạo Mã FE Của Bạn
            </motion.h3>
            <p className="mb-8 text-center text-lg text-gray-400">
              Nhận ngay mã FE độc quyền khi bạn ủng hộ (mã có thể trùng với người khác do hệ thống phân phối tự động)
            </p>
            <div className="mx-auto max-w-md">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="mb-6 rounded-2xl border-2 border-green-700 bg-gray-800 p-8 text-center shadow-lg"
              >
                <div className="mb-4 text-sm text-gray-400">Mã FE của bạn</div>
                <motion.div
                  key={feCode}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 200, damping: 15 }}
                  className="text-4xl font-bold text-green-400"
                >
                  {feCode}
                </motion.div>
              </motion.div>
              <motion.button
                onClick={() => {
                  const randomNum = Math.floor(Math.random() * 99999)
                    .toString()
                    .padStart(5, "0");
                  setFeCode(`FE-${randomNum}`);
                }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-full rounded-full bg-gradient-to-r from-green-500 to-emerald-500 px-8 py-4 text-lg font-bold text-white shadow-lg transition-all hover:shadow-xl"
              >
                🎲 Tạo mã mới
              </motion.button>
            </div>
          </motion.div>
        </ScrollSection>

        {/* FAQ Section */}
        <ScrollSection className="mb-24">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7 }}
            className="mb-12 text-center px-4"
          >
            <h3 className="mb-4 text-3xl font-bold text-white sm:text-4xl md:text-5xl">
              ❓ Câu Hỏi Thường Gặp
            </h3>
            <p className="mx-auto max-w-2xl px-4 text-base text-gray-400 sm:text-lg">
              Giải đáp mọi thắc mắc của bạn về dự án Nuôi FE
            </p>
          </motion.div>
          <div className="mx-auto max-w-3xl space-y-4">
            <FAQItem
              question="Tại sao phải nuôi FE?"
              answer="Bởi vì FE là một frontend developer đầy tiềm năng đang cần sự hỗ trợ từ cộng đồng. Việc nuôi FE không chỉ giúp FE có tools và resources để code tốt hơn, mà còn tạo ra một mô hình minh bạch trong việc hỗ trợ developers trẻ. Mỗi đồng bạn donate sẽ giúp FE tạo ra những sản phẩm tốt hơn cho cộng đồng!"
              index={0}
            />
            <FAQItem
              question="Tiền của tôi đi đâu?"
              answer="Tiền của bạn sẽ được sử dụng cho các mục đích cụ thể như: mua domain và hosting, đăng ký UI/UX tools (Figma Pro), cloud services (Vercel, AWS), mua courses và books để học tập, và các chi phí liên quan đến frontend development. Tất cả đều được track và báo cáo minh bạch trên GitHub!"
              index={1}
            />
            <FAQItem
              question="Mã FE là gì?"
              answer="Mã FE là mã định danh độc quyền cho mỗi nhà hảo tâm. Mã này giúp bạn theo dõi các khoản đóng góp của mình và nhận các báo cáo chi tiết. Tuy nhiên, do hệ thống phân phối tự động, có thể một mã sẽ được cấp cho nhiều người - đây là tính năng để tối ưu hóa hệ thống!"
              index={2}
            />
            <FAQItem
              question="FE có minh bạch không?"
              answer="Cực kỳ minh bạch! FE cam kết công khai 100% thu chi trên GitHub repository. Mỗi khoản chi tiêu đều có screenshot invoice, giải thích lý do, và được cập nhật hàng tuần. Bạn có thể xem bất cứ lúc nào và đặt câu hỏi nếu có thắc mắc!"
              index={3}
            />
            <FAQItem
              question="Tôi có được gì khi donate?"
              answer="Tùy vào gói bạn chọn, bạn sẽ nhận được: access vào GitHub repo với code và documentation, báo cáo chi tiết về chi tiêu, mã FE độc quyền, và đặc biệt là cảm giác hài lòng khi giúp đỡ một developer trẻ phát triển! Với gói VIP, bạn còn được video call định kỳ và tên trên website."
              index={4}
            />
            <FAQItem
              question="Nếu tôi nghi ngờ có sai phạm thì làm sao?"
              answer="FE luôn sẵn sàng giải thích mọi khoản chi tiêu. Nếu bạn có thắc mắc, hãy mở issue trên GitHub hoặc gửi email. FE cam kết trả lời trong vòng 24h và cung cấp đầy đủ chứng từ nếu cần. Tính minh bạch là ưu tiên hàng đầu của dự án này!"
              index={5}
            />
        </div>
        </ScrollSection>

      </motion.main>
    </div>
  );
}
