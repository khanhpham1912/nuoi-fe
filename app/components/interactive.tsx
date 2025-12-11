"use client";

import { useState } from "react";

export const ScrollSection = ({ children, className }: { children: React.ReactNode; className?: string }) => {
  return (
    <section className={className}>
      {children}
    </section>
  );
};

export const FeatureCard = ({ icon, title, description }: { icon: string; title: string; description: string }) => {
  return (
    <div
      className="group relative overflow-hidden rounded-3xl border border-green-800/30 bg-gradient-to-br from-green-900/20 via-emerald-900/20 to-green-900/20 p-8 shadow-lg shadow-green-900/20 transition-all duration-300 hover:scale-105 hover:-translate-y-2 active:scale-98"
    >
      <div className="relative z-10">
        <div className="mb-5 text-5xl animate-icon-wiggle">
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

export const BudgetItem = ({ label, percentage, color }: { label: string; percentage: number; color: string }) => {
  return (
    <div className="mb-6 animate-fade-in-up-simple opacity-100">
      <div className="mb-3 flex items-center justify-between transition-all duration-500">
        <span className="text-base font-semibold text-gray-200">{label}</span>
        <span className="rounded-full bg-gray-700 px-3 py-1 text-lg font-bold text-white transition-transform duration-500">
          {percentage}%
        </span>
      </div>
      <div className="h-5 overflow-hidden rounded-full bg-gray-700 shadow-inner">
        <div className={`h-full ${color} rounded-full shadow-lg transition-all duration-[1200ms] ease-out`} style={{ width: `${percentage}%` }} />
      </div>
    </div>
  );
};

export const PricingCard = ({
  name,
  price,
  period,
  features,
  popular,
  premium,
}: {
  name: string;
  price: string;
  period: string;
  features: string[];
  popular?: boolean;
  premium?: boolean;
}) => {
  return (
    <div
      className={`relative flex h-full flex-col rounded-3xl border-2 p-8 shadow-xl transition-all duration-600 hover:-translate-y-2.5 ${
        premium
          ? "border-purple-500/50 bg-gradient-to-br from-purple-900/40 via-pink-900/40 to-purple-900/40 md:scale-105 shadow-purple-500/20"
          : popular
          ? "border-green-600 bg-gradient-to-br from-green-900/30 to-emerald-900/30 md:scale-105"
          : "border-gray-700 bg-gray-800"
      }`}
    >
      {premium && (
        <div className="absolute -top-4 left-1/2 -translate-x-1/2 rounded-full bg-gradient-to-r from-purple-500 via-pink-500 to-purple-500 px-4 py-1 text-sm font-bold text-white shadow-lg animate-pulse">
          ⭐ Premium Pro Plus
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
            <li key={index} className="flex items-start gap-2 text-gray-300 transition-all duration-500">
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

export const TestimonialCard = ({
  quote,
  author,
  role,
  icon,
}: {
  quote: string;
  author: string;
  role: string;
  icon: string;
}) => {
  return (
    <div
      className="rounded-2xl border border-gray-700 bg-gray-800 p-6 shadow-lg transition-all duration-600 hover:-translate-y-1"
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

export const FAQItem = ({ question, answer }: { question: string; answer: string }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div
      className="overflow-hidden rounded-2xl border border-gray-700 bg-gray-800 shadow-lg transition-all duration-400"
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

export const FeCodeGenerator = () => {
  const [feCode, setFeCode] = useState("FE-00000");

  return (
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
  );
};
