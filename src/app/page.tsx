"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";

// 스크롤 애니메이션 훅 - 화면에 보이면 등장 효과
function useScrollAnimation() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("scroll-visible");
          }
        });
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  return ref;
}

// 스크롤 애니메이션 래퍼 컴포넌트
function ScrollReveal({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const ref = useScrollAnimation();
  return (
    <div ref={ref} className={`scroll-hidden ${className}`}>
      {children}
    </div>
  );
}

// 클라이언트/협업 로고 섹션
function ClientLogosSection() {
  const clients = [
    { name: "POSCO", label: "포스코 체인지업" },
    { name: "BMW", label: "도이치 모터스" },
    { name: "MBC", label: "MBC 아카데미" },
    { name: "교보문고", label: "AI 임원교육" },
    { name: "광운대학교", label: "정보과학교육원" },
    { name: "수원대학교", label: "AI 미디어 특강" },
    { name: "한국콘텐츠진흥원", label: "뉴콘텐츠아카데미" },
    { name: "글로벌게임허브센터", label: "AI 마케팅 영상" },
    { name: "박영사", label: "AI 활용 교과서 출판" },
    { name: "코엑스", label: "Fatu 캠페인 전시" },
  ];

  return (
    <section className="py-16 px-6 bg-[#1a1614] border-t border-b border-[#3d352e]/50">
      <ScrollReveal>
        <div className="max-w-6xl mx-auto">
          <p className="text-center text-sm text-[#8b7355] mb-8 tracking-widest uppercase">
            Trusted Partners & Clients
          </p>
          <div className="overflow-hidden">
            <div className="logo-slide-track">
              {/* 로고를 두 번 반복하여 무한 슬라이드 효과 */}
              {[...clients, ...clients].map((client, index) => (
                <div
                  key={index}
                  className="flex-shrink-0 flex flex-col items-center justify-center min-w-[140px] group cursor-default"
                >
                  <div className="w-20 h-20 rounded-xl bg-[#2c2520] border border-[#3d352e] flex items-center justify-center mb-2 group-hover:border-[#c9a66b]/50 group-hover:bg-[#2c2520]/80 transition-all duration-300">
                    <span className="text-[#c9a66b] font-bold text-sm text-center leading-tight px-2">
                      {client.name}
                    </span>
                  </div>
                  <span className="text-[#8b7355] text-xs text-center whitespace-nowrap">
                    {client.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </ScrollReveal>
    </section>
  );
}

// Navigation Component
function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { href: "#home", label: "홈" },
    { href: "#about", label: "소개" },
    { href: "#projects", label: "프로젝트" },
    { href: "#products", label: "서비스" },
    { href: "#experience", label: "경력" },
    { href: "#awards", label: "수상" },
    { href: "#research", label: "논문" },
    { href: "#contact", label: "연락처" },
  ];

  return (
    <>
      {/* 데스크톱 네비게이션 */}
      <nav
        className={`hidden md:block fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? "glass-card py-3" : "py-6"
          }`}
      >
        <div className="max-w-6xl mx-auto px-6 flex items-center justify-between">
          <a href="#home" className="text-xl font-bold gradient-text">
            김승욱
          </a>
          <div className="flex items-center gap-8">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="text-sm text-[#a89a8c] hover:text-[#c9a66b] transition-colors"
              >
                {item.label}
              </a>
            ))}
          </div>
        </div>
      </nav>

      {/* 모바일 햄버거 버튼 */}
      <button
        onClick={() => setMobileOpen(true)}
        className="md:hidden fixed top-4 right-4 z-50 w-12 h-12 rounded-full glass-card flex items-center justify-center text-[#c9a66b] text-xl glow"
        aria-label="메뉴 열기"
      >
        ☰
      </button>

      {/* 모바일 전체 화면 메뉴 */}
      {mobileOpen && (
        <div className="md:hidden fixed inset-0 z-[60] bg-[#1a1614]/98 backdrop-blur-xl flex flex-col items-center justify-center animate-fade-in">
          <button
            onClick={() => setMobileOpen(false)}
            className="absolute top-4 right-4 w-12 h-12 rounded-full glass-card flex items-center justify-center text-[#c9a66b] text-2xl"
            aria-label="메뉴 닫기"
          >
            ✕
          </button>
          <div className="flex flex-col items-center gap-8">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className="text-2xl text-[#a89a8c] hover:text-[#c9a66b] transition-colors"
              >
                {item.label}
              </a>
            ))}
          </div>
        </div>
      )}
    </>
  );
}

// Hero Section
function HeroSection() {
  return (
    <section
      id="home"
      className="min-h-screen flex items-center relative overflow-hidden sepia-bg"
    >
      {/* Background gradient orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#c9a66b]/10 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#8b7355]/10 rounded-full blur-3xl" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#c9a66b]/5 rounded-full blur-3xl" />

      <div className="relative z-10 w-full max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Left - Text Content */}
          <div className="order-1">
            <div className="mb-6">
              <span className="inline-block px-4 py-2 rounded-full text-sm glass-card text-[#c9a66b] glow">
                QuantumAI LAB 대표
              </span>
            </div>
            <h1 className="text-5xl md:text-7xl font-bold mb-4">
              <span className="gradient-text">김승욱</span>
            </h1>
            <p className="text-xl md:text-2xl text-[#a89a8c] mb-2">Seunguk Kim</p>
            <p className="text-lg md:text-xl text-[#8b7355] max-w-lg mb-8 leading-relaxed">
              AI 콘텐츠 제작, 사운드 디자인, 그리고 교육을 통해
              창의성과 기술의 경계를 넓혀가고 있습니다.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href="#projects"
                className="px-8 py-4 bg-[#c9a66b] hover:bg-[#d4b88a] text-[#1a1614] rounded-full font-medium transition-all hover-lift text-center"
              >
                프로젝트 보기
              </a>
              <a
                href="#contact"
                className="px-8 py-4 glass-card rounded-full font-medium transition-all hover-lift text-[#f5ede6] text-center"
              >
                연락하기
              </a>
            </div>

            {/* Stats */}
            <div className="mt-12 flex gap-12">
              <div>
                <div className="text-3xl font-bold text-[#c9a66b]">Current</div>
                <div className="text-sm text-[#8b7355]">QuantumAI LAB 대표</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-[#c9a66b]">20+ Years</div>
                <div className="text-sm text-[#8b7355]">Creative Experience</div>
              </div>
            </div>
          </div>

          {/* Right - Profile Video */}
          <div className="order-2 flex justify-center md:justify-end mt-8 md:mt-0">
            <div className="relative">
              {/* Glow effect behind video */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#c9a66b]/30 to-[#8b7355]/30 rounded-2xl blur-2xl transform scale-110" />
              <div className="relative w-64 md:w-80 h-80 md:h-[450px] rounded-2xl overflow-hidden profile-image glow">
                <video
                  src="/hero-video.mp4"
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// About Section
function AboutSection() {
  return (
    <section id="about" className="py-24 px-6 sepia-bg">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold mb-12 gradient-text text-center">
          소개
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
          {/* Left - Profile Photo */}
          <div className="flex flex-col items-center">
            <div className="relative mb-4">
              <div className="absolute inset-0 bg-gradient-to-br from-[#c9a66b]/30 to-[#8b7355]/30 rounded-xl blur-xl transform scale-110" />
              <div className="relative w-48 h-60 rounded-xl overflow-hidden border-2 border-[#c9a66b]/30 glow">
                <Image
                  src="/profile.jpg"
                  alt="김승욱"
                  fill
                  className="object-cover object-top"
                />
              </div>
            </div>
            <p className="text-[#c9a66b] text-sm">Seunguk Kim</p>
            <p className="text-[#8b7355] text-sm mt-1">QuantumAI LAB 대표</p>
          </div>

          {/* Right - About Text */}
          <div className="md:col-span-2 glass-card rounded-2xl p-8 hover-lift">
            <p className="text-lg text-[#d4c4b0] leading-relaxed mb-6">
              사진, 사운드, 영상 — 다양한 매체를 넘나들며 콘텐츠를 기획하고
              창작해온 융합형 아티스트입니다. 사진 스튜디오 운영부터 사운드
              디자인, 그리고 대학과 기업에서의 교육까지, 매체의 경계를 넘어 늘
              새로운 것을 만들어왔습니다.
            </p>
            <p className="text-lg text-[#d4c4b0] leading-relaxed">
              현재는 AI라는 강력한 도구와 함께, 이미지 생성부터 영상 제작,
              사운드까지 창작의 모든 영역에서 가능성을 탐구하고 있습니다. 단순히
              기술을 사용하는 것을 넘어,{" "}
              <span className="text-[#c9a66b] font-medium">
                누구나 자신의 창작 역량을 수십 배로 키울 수 있도록 돕는 일
              </span>{" "}
              — 그것이 지금 제가 집중하고 있는 일입니다.
            </p>

            {/* Info cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-8">
              <div className="bg-[#1a1614]/50 rounded-xl p-4 border border-[#3d352e]">
                <div className="text-sm text-[#8b7355] mb-1">Location</div>
                <div className="text-[#f5ede6]">Seoul, Korea</div>
              </div>
              <div className="bg-[#1a1614]/50 rounded-xl p-4 border border-[#3d352e]">
                <div className="text-sm text-[#8b7355] mb-1">Affiliation</div>
                <div className="text-[#f5ede6]">광운대학교 정보과학교육원</div>
              </div>
              <div className="bg-[#1a1614]/50 rounded-xl p-4 border border-[#3d352e]">
                <div className="text-sm text-[#8b7355] mb-1">Education</div>
                <div className="text-[#f5ede6] text-sm">
                  공주대 게임디자인 박사
                  <br />
                  상명대 컴퓨터음악 석사
                  <br />
                  전주대 음악학 학사
                </div>
              </div>
              <div className="bg-[#1a1614]/50 rounded-xl p-4 border border-[#3d352e]">
                <div className="text-sm text-[#8b7355] mb-1">Certification</div>
                <div className="text-[#f5ede6] text-sm">
                  ICA Color Technology 201
                  <br />
                  ICA DaVinci Resolve 201
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// Projects Section
function ProjectsSection() {
  return (
    <section id="projects" className="py-24 px-6 bg-[#1a1614]">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold mb-4 gradient-text">
          프로젝트
        </h2>
        <p className="text-[#8b7355] mb-12">
          AI 기술로 창작한 주요 작품들 (클릭하여 상세 보기)
        </p>

        {/* 프로젝트 이미지를 추가할 수 있는 그리드 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="glass-card rounded-xl p-6 hover-lift cursor-pointer group">
            <div className="w-full h-48 bg-[#2c2520] rounded-lg mb-4 flex items-center justify-center overflow-hidden p-8">
              <div className="relative w-full h-full">
                <Image
                  src="/assets/project-art.png"
                  alt="AI 아트 컬렉션"
                  fill
                  className="object-contain group-hover:scale-110 transition-transform duration-500"
                />
              </div>
            </div>
            <h3 className="text-xl font-semibold text-[#f5ede6] mb-2">
              AI 아트 컬렉션
            </h3>
            <p className="text-[#a89a8c] text-sm">
              생성형 AI를 활용한 디지털 아트 작품
            </p>
          </div>

          <div className="glass-card rounded-xl p-6 hover-lift cursor-pointer group">
            <div className="w-full h-48 bg-[#2c2520] rounded-lg mb-4 flex items-center justify-center overflow-hidden p-8">
              <div className="relative w-full h-full">
                <Image
                  src="/assets/project-video.png"
                  alt="AI 영상 제작"
                  fill
                  className="object-contain group-hover:scale-110 transition-transform duration-500"
                />
              </div>
            </div>
            <h3 className="text-xl font-semibold text-[#f5ede6] mb-2">
              AI 영상 제작
            </h3>
            <p className="text-[#a89a8c] text-sm">
              AI 기술을 활용한 영상 콘텐츠 제작
            </p>
          </div>

          <div className="glass-card rounded-xl p-6 hover-lift cursor-pointer group">
            <div className="w-full h-48 bg-[#2c2520] rounded-lg mb-4 flex items-center justify-center overflow-hidden p-8">
              <div className="relative w-full h-full">
                <Image
                  src="/assets/project-sound.png"
                  alt="사운드 디자인"
                  fill
                  className="object-contain group-hover:scale-110 transition-transform duration-500"
                />
              </div>
            </div>
            <h3 className="text-xl font-semibold text-[#f5ede6] mb-2">
              사운드 디자인
            </h3>
            <p className="text-[#a89a8c] text-sm">
              게임 및 미디어 사운드 디자인
            </p>
          </div>

          <div className="glass-card rounded-xl p-6 hover-lift cursor-pointer group">
            <div className="w-full h-48 bg-[#2c2520] rounded-lg mb-4 flex items-center justify-center overflow-hidden p-8">
              <div className="relative w-full h-full">
                <Image
                  src="/assets/project-edu.png"
                  alt="AI 교육 콘텐츠"
                  fill
                  className="object-contain group-hover:scale-110 transition-transform duration-500"
                />
              </div>
            </div>
            <h3 className="text-xl font-semibold text-[#f5ede6] mb-2">
              AI 교육 콘텐츠
            </h3>
            <p className="text-[#a89a8c] text-sm">
              기업 및 대학 AI 활용 교육
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

// AI & Web Products Section
function DigitalProductsSection() {
  const products = [
    {
      title: "웨딩송 AI 청첩장",
      subtitle: "AI 음악이 담긴 프리미엄 모바일 청첩장",
      description:
        "신랑신부의 이야기와 분위기에 맞춘 AI 웨딩송, 모바일 초대장, 공유 링크까지 연결한 실사용형 웹 서비스입니다.",
      href: "https://wedding-card-jet.vercel.app/",
      tags: ["AI Music", "Mobile Invitation", "Next.js"],
      featured: true,
    },
    {
      title: "AI 인사이트 브리프",
      subtitle: "AI 뉴스 분석 브리핑 블로그",
      description:
        "전세계 AI 뉴스와 중국 AI 동향을 큐레이션하고 분석하는 브리핑 블로그입니다. AI 교육자이자 콘텐츠 제작자로서의 관점을 기록합니다.",
      href: "https://korea333333-web.github.io/",
      tags: ["AI Briefing", "Research", "Blog"],
      featured: true,
    },
    {
      title: "Product Page Image Prompt Studio",
      subtitle: "상품 상세페이지 이미지 프롬프트 도구",
      description:
        "커머스 상품 이미지를 기획하고 상세페이지용 이미지 프롬프트를 설계하는 AI 워크플로우 도구입니다.",
      href: "https://product-page-image-studio.vercel.app/",
      tags: ["Commerce AI", "Prompt Studio", "Image Workflow"],
      featured: true,
    },
    {
      title: "증명사진 플러스",
      subtitle: "실용형 AI 사진 서비스",
      description:
        "프로필·증명사진 제작 흐름을 웹에서 간편하게 다룰 수 있도록 구성한 실용형 AI 사진 서비스입니다.",
      href: "https://id-picture-theta.vercel.app/",
      tags: ["AI Photo", "Utility", "Next.js"],
      featured: false,
    },
    {
      title: "달새김",
      subtitle: "감성 기록형 웹 서비스",
      description:
        "날짜와 기억, 메시지를 감성적으로 기록하는 방향의 웹 서비스 프로젝트입니다. 공개 URL 확인 후 링크를 연결할 예정입니다.",
      href: null,
      tags: ["Web App", "Personal Archive", "In Progress"],
      featured: false,
    },
    {
      title: "커머스 운영 자동화 도구",
      subtitle: "위탁판매 주문 관리 시스템",
      description:
        "위탁판매 주문 확인과 운영 흐름을 관리하기 위한 내부 업무형 웹 도구입니다. 커머스 운영 자동화 실험으로 정리했습니다.",
      href: "https://coupang-vert.vercel.app/",
      tags: ["Commerce Ops", "Automation", "Dashboard"],
      featured: false,
    },
  ];

  return (
    <section id="products" className="py-24 px-6 sepia-bg">
      <div className="max-w-5xl mx-auto">
        <div className="mb-12">
          <p className="text-[#c9a66b] text-sm tracking-widest uppercase mb-3">
            AI & Web Products
          </p>
          <h2 className="text-3xl md:text-4xl font-bold mb-4 gradient-text">
            AI 서비스와 웹 프로덕트
          </h2>
          <p className="text-[#8b7355] max-w-2xl leading-relaxed">
            AI 콘텐츠 제작 경험을 실제로 사용할 수 있는 웹 서비스와 업무 도구로 확장한 프로젝트들입니다.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {products.map((product) => (
            <div
              key={product.title}
              className={`glass-card rounded-xl p-6 hover-lift flex flex-col ${product.featured ? "md:min-h-[300px]" : ""}`}
            >
              <div className="flex items-start justify-between gap-4 mb-5">
                <div>
                  <p className="text-[#c9a66b] text-sm mb-2">{product.subtitle}</p>
                  <h3 className="text-2xl font-bold text-[#f5ede6] leading-tight">
                    {product.title}
                  </h3>
                </div>
                {product.featured && (
                  <span className="shrink-0 px-3 py-1 bg-[#c9a66b]/20 text-[#c9a66b] text-xs rounded-full">
                    Featured
                  </span>
                )}
              </div>

              <p className="text-[#d4c4b0] leading-relaxed mb-6 flex-1">
                {product.description}
              </p>

              <div className="flex flex-wrap gap-2 mb-6">
                {product.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2 py-1 bg-[#2c2520] text-[#a89a8c] text-xs rounded-lg border border-[#3d352e]"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {product.href ? (
                <a
                  href={product.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex w-fit items-center gap-2 px-5 py-3 bg-[#c9a66b] hover:bg-[#d4b88a] text-[#1a1614] rounded-full font-medium transition-all"
                >
                  <span>↗</span>
                  사이트 보기
                </a>
              ) : (
                <span className="inline-flex w-fit items-center px-5 py-3 glass-card rounded-full text-[#8b7355] text-sm">
                  URL 준비 중
                </span>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// Experience Section
function ExperienceSection() {
  const experiences = [
    {
      title: "QuantumAI LAB",
      role: "대표",
      period: "2024.12 ~",
      current: true,
    },
    { title: "AIMon", role: "V.A.", period: "2025.05 ~", current: true },
    {
      title: "HABIMUSIC 스튜디오",
      role: "음악감독",
      period: "2022.01 ~",
      current: true,
    },
    {
      title: "광운대학교 정보과학교육원",
      role: "",
      period: "2015.03 ~",
      current: true,
    },
    {
      title: "해냄솔루션",
      role: "사운드 디렉터",
      period: "2015 ~ 2018",
      current: false,
    },
    {
      title: "서울호서직업전문학교",
      role: "외래교수",
      period: "2007.03 ~ 2013.06",
      current: false,
    },
    {
      title: "Play-Photo",
      role: "대표",
      period: "2009 ~ 2015",
      current: false,
    },
    {
      title: "Studio A-Min",
      role: "대표",
      period: "2005.08 ~ 2010",
      current: false,
    },
    {
      title: "전주대학교",
      role: "기간강사",
      period: "2004.08 ~ 2006.02",
      current: false,
    },
  ];

  const highlights = [
    {
      year: "2014 ~ 2021",
      title: "EBS <문화유산 코리아>",
      description: "음악, 효과, 믹싱",
    },
    {
      year: "2020 ~ 2022",
      title: "JOYCITY 게임 사운드",
      description: "크로스파이어 워존 트레일러, BLESS MOBILE, 프리스타일 풋볼2, 건쉽배틀 클립토 컨플릭트",
    },
    {
      year: "2023",
      title: "ZEPETO <POP WAVE>",
      description: "리듬게임 음악, 효과, 믹싱",
    },
    {
      year: "2023",
      title: "와이낫미디어 웹드라마",
      description: "지질한 이야기, 그래 서른 음악",
    },
    {
      year: "2004 ~ 2007",
      title: "음반·뮤지컬 작편곡",
      description: "아름다운 세상, 프린스 쿨루의 모험",
    },
  ];

  return (
    <section id="experience" className="py-24 px-6 sepia-bg">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold mb-12 gradient-text">
          Experience
        </h2>
        <div className="space-y-4">
          {experiences.map((exp, index) => (
            <div
              key={index}
              className="glass-card rounded-xl p-6 hover-lift flex flex-col md:flex-row md:items-center md:justify-between gap-4"
            >
              <div>
                <h3 className="text-xl font-semibold text-[#f5ede6]">
                  {exp.title}
                </h3>
                {exp.role && <p className="text-[#a89a8c]">{exp.role}</p>}
              </div>
              <div className="flex items-center gap-3">
                <span className="text-[#8b7355]">{exp.period}</span>
                {exp.current && (
                  <span className="px-3 py-1 bg-[#c9a66b]/20 text-[#c9a66b] text-sm rounded-full">
                    현재
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16">
          <h3 className="text-2xl font-bold mb-6 text-[#f5ede6]">주요 제작 경력</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {highlights.map((item, index) => (
              <div key={index} className="glass-card rounded-xl p-5 hover-lift">
                <p className="text-[#c9a66b] text-sm mb-2">{item.year}</p>
                <h4 className="text-lg font-semibold text-[#f5ede6] mb-2">
                  {item.title}
                </h4>
                <p className="text-[#a89a8c] text-sm leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// Awards Section
function AwardsSection() {
  const [selectedProject, setSelectedProject] = useState<string | null>(null);

  const projects = [
    {
      id: "posco",
      title: "POSCO 체인지업 AI 광고",
      subtitle: "포스코 AI 광고 영상 제작",
      image: null,
      videoUrl: "https://www.youtube.com/watch?v=FsMGKtbGo1A",
      embedUrl: "https://www.youtube.com/embed/FsMGKtbGo1A",
      description: "POSCO 체인지업을 위한 AI 기술 기반 광고 영상입니다. 생성형 AI를 활용하여 기업 브랜딩 영상을 제작했습니다.",
      technologies: ["AI Video Generation", "Runway", "After Effects"],
      tags: ["AI Video", "Commercial", "Corporate"],
    },
    {
      id: "mom-star",
      title: "엄마가 보낸 별",
      subtitle: "AI 제작 영화",
      image: null,
      videoUrl: null,
      embedUrl: null,
      description: "AI 제작 영화로 2024 서울 국제 AI 영화제 초청작에 선정되었으며 우수상을 수상했습니다.",
      technologies: ["AI Film", "Generative AI", "Video Production"],
      tags: ["AI Film", "Award", "Festival"],
      award: "🏆 2024 서울 국제 AI 영화제 우수상",
    },
    {
      id: "bmw",
      title: "BMW 7 공존을 그리다",
      subtitle: "BMW 도이치 모터스 AI 영상공모전",
      image: null,
      videoUrl: "https://youtu.be/Ot675jyNgZI",
      embedUrl: "https://www.youtube.com/embed/Ot675jyNgZI",
      description: "BMW 도이치 모터스 AI 영상공모전 출품작입니다. BMW 7 시리즈를 주제로 AI 기술을 활용하여 '공존'이라는 테마를 영상으로 표현했습니다.",
      technologies: ["AI Video Generation", "Runway", "After Effects"],
      tags: ["AI Video", "Commercial", "Competition"],
    },
    {
      id: "fatu",
      title: "Fatu 코뿔소 캠페인",
      subtitle: "AI 기술을 활용한 보존 캠페인",
      image: "/patou-rhino.jpg",
      videoUrl: "https://youtu.be/4D3-EZXFmMU",
      embedUrl: "https://www.youtube.com/embed/4D3-EZXFmMU",
      description: "전 세계에 단 2마리만 남은 북부흰코뿔소 Fatu의 이야기를 AI 기술로 전달하는 캠페인입니다. 사회적 기업 지파운데이션과 협업하여 AI 생성 영상과 이미지를 제작했으며, 코엑스와 안양천 서서울 새사랑 걷기 캠페인에서 전시되었습니다. 멸종 위기 동물 보호의 중요성을 알리는 의미 있는 프로젝트입니다.",
      technologies: ["Runway", "Midjourney", "DaVinci Resolve", "After Effects"],
      tags: ["AI Video", "Social Campaign", "Conservation"],
    },
    {
      id: "ai-project",
      title: "AI 프로젝트",
      subtitle: "생성형 AI 활용 콘텐츠",
      image: null,
      videoUrl: "https://youtu.be/M4EOp59im_M",
      embedUrl: "https://www.youtube.com/embed/M4EOp59im_M",
      description: "생성형 AI를 활용한 창작 프로젝트입니다.",
      technologies: ["Generative AI", "Video Production"],
      tags: ["AI Content", "Creative"],
    },
    {
      id: "leavelize",
      title: "LEAVELIZE 라운지 장수사진",
      subtitle: "AI 프로젝트 영상",
      image: null,
      videoUrl: "https://youtu.be/jJ_nceJwQDE",
      embedUrl: "https://www.youtube.com/embed/jJ_nceJwQDE",
      description: "LEAVELIZE 라운지를 위한 장수사진 프로젝트 영상입니다. AI 기술을 활용하여 제작되었습니다.",
      technologies: ["AI Video Generation", "Runway"],
      tags: ["AI Video", "Commercial"],
    },
    {
      id: "seo-hyukshin",
      title: "서혁신 - 끝의 끝",
      subtitle: "보이스 오브 코리아 출신 가수 뮤직비디오",
      image: null,
      videoUrl: null,
      embedUrl: null,
      description: "보이스 오브 코리아 출신 가수 서혁신의 곡 '끝의 끝' 뮤직비디오 제작 프로젝트입니다.",
      technologies: ["AI Video Generation", "Music Video", "Post Production"],
      tags: ["Music Video", "AI Video"],
    },
    {
      id: "last-human-memory",
      title: "The Last Human Memory",
      subtitle: "최후의 인간: 기억",
      image: "/last-human-memory.jpg",
      videoUrl: null,
      embedUrl: null,
      description: "인류 마지막 순간의 기억을 담은 AI 디지털 아트 시리즈입니다. AI 시대에 인간의 기억과 정체성이 어떻게 변화하고 보존될 수 있는지에 대한 철학적 질문을 담았습니다. 한국게임학회 주최 제3회 국제디지털아트초대전에서 우수상을 수상했습니다.",
      technologies: ["Midjourney", "Stable Diffusion", "ComfyUI"],
      tags: ["Digital Art", "AI Generation", "Exhibition"],
      award: "🏆 2025 제3회 국제디지털아트초대전 우수상 (한국게임학회)",
    },
    {
      id: "eye-of-abyss",
      title: "The Eye of Abyss",
      subtitle: "환상과 현실 사이의 경계",
      image: "/eye-of-abyss.jpg",
      videoUrl: null,
      embedUrl: null,
      description: "환상과 현실 사이의 경계를 탐구하는 AI 디지털 아트 작품입니다. 심연의 눈이라는 주제로, 인간의 내면 깊숙한 곳에 존재하는 무의식의 세계를 시각화했습니다. Midjourney와 Stable Diffusion을 활용하여 초현실적인 이미지를 생성하고, 후보정을 통해 완성했습니다.",
      technologies: ["Midjourney", "Stable Diffusion", "Photoshop"],
      tags: ["Digital Art", "AI Art", "International"],
      award: "🏆 2025 탕산 국제초대전 Special Prize (한국디자인학회)",
    },
    {
      id: "sejong",
      title: "배우 고준 IP활용 세종대왕",
      subtitle: "AI 기반 역사 콘텐츠 제작",
      image: null,
      videoUrl: "https://youtu.be/8HUikOrpPGs",
      embedUrl: "https://www.youtube.com/embed/8HUikOrpPGs",
      description: "배우 고준의 IP를 활용하여 세종대왕을 AI 기술로 재현한 프로젝트입니다.",
      technologies: ["AI Video Generation", "Character IP"],
      tags: ["AI Video", "Historical Content"],
    },
  ];

  const awards = [
    { title: "2026 AI INNOVATION CHALLENGE 특별상", org: "AI 콘텐츠 제작 부문, 아모레퍼시픽" },
    { title: "고혼진 AI영상광고 공모전 우수상", org: "바이럴미디어 부문" },
    { title: "서울 국제 AI 영화제 우수상", org: "AI 제작 영화 <엄마가 보낸 별>" },
    { title: "탕산 국제초대전 Special Prize", org: "The Eye of Abyss, 한국디자인학회" },
    { title: "제3회 국제디지털아트초대전 우수상", org: "The Last Human Memory, 한국게임학회" },
  ];

  return (
    <section id="awards" className="py-24 px-6 bg-[#1a1614]">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold mb-12 gradient-text">
          수상 및 전시
        </h2>

        {/* Digital Art Works - Large Display */}
        <div className="space-y-8 mb-12">
          {projects.filter(p => p.id === "last-human-memory" || p.id === "eye-of-abyss").map((project) => (
            <div
              key={project.id}
              onClick={() => setSelectedProject(project.id)}
              className="glass-card rounded-2xl p-6 hover-lift cursor-pointer glow"
            >
              <div className="grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-8">
                <div className="rounded-xl overflow-hidden h-fit">
                  <Image
                    src={project.image!}
                    alt={project.title}
                    width={400}
                    height={500}
                    className="w-full h-auto object-cover rounded-xl hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="flex flex-col justify-center">
                  <h3 className="text-2xl font-bold text-[#f5ede6] mb-2">
                    {project.title}
                  </h3>
                  <p className="text-xl text-[#c9a66b] mb-3">
                    {project.subtitle}
                  </p>
                  <p className="text-[#a89a8c] mb-4 line-clamp-3">
                    {project.description}
                  </p>
                  {project.award && (
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#c9a66b]/20 text-[#c9a66b] rounded-full font-medium w-fit mb-4">
                      {project.award}
                    </div>
                  )}
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag, i) => (
                      <span
                        key={i}
                        className="px-2 py-1 bg-[#c9a66b]/10 text-[#c9a66b] text-xs rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Video Projects - Card Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {projects.filter(p => p.id !== "last-human-memory" && p.id !== "eye-of-abyss").map((project) => (
            <div
              key={project.id}
              onClick={() => setSelectedProject(project.id)}
              className="glass-card rounded-2xl p-4 hover-lift cursor-pointer group"
            >
              <div className="aspect-video rounded-xl overflow-hidden mb-4 bg-[#2c2520]">
                {project.image ? (
                  <Image
                    src={project.image}
                    alt={project.title}
                    width={400}
                    height={225}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                ) : project.embedUrl ? (
                  <iframe
                    width="100%"
                    height="100%"
                    src={project.embedUrl}
                    title={project.title}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-[#2c2520] to-[#1a1614] p-6">
                    <span className="text-[#c9a66b] text-center font-semibold leading-relaxed">
                      {project.title}
                    </span>
                  </div>
                )}
              </div>
              <h3 className="text-xl font-bold text-[#f5ede6] mb-2">
                {project.title}
              </h3>
              <p className="text-[#a89a8c] text-sm mb-3">{project.subtitle}</p>
              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag, i) => (
                  <span
                    key={i}
                    className="px-2 py-1 bg-[#c9a66b]/20 text-[#c9a66b] text-xs rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Other Awards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {awards.map((award, index) => (
            <div key={index} className="glass-card rounded-xl p-6 hover-lift">
              <div className="w-12 h-12 bg-[#c9a66b]/20 rounded-xl flex items-center justify-center mb-4">
                <span className="text-2xl">🏆</span>
              </div>
              <h3 className="text-lg font-semibold text-[#f5ede6] mb-2">
                {award.title}
              </h3>
              <p className="text-[#a89a8c] text-sm">{award.org}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Modal Popup */}
      {selectedProject && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md"
          onClick={() => setSelectedProject(null)}
        >
          <div
            className="glass-card rounded-2xl p-6 max-w-6xl w-full max-h-[95vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {projects.filter((p) => p.id === selectedProject).map((project) => (
              <div key={project.id}>
                {/* Header */}
                <div className="flex justify-between items-start mb-6">
                  <h3 className="text-3xl font-bold text-[#f5ede6]">
                    {project.title}
                  </h3>
                  <button
                    onClick={() => setSelectedProject(null)}
                    className="text-[#a89a8c] hover:text-[#f5ede6] text-3xl"
                  >
                    ✕
                  </button>
                </div>

                {/* Video or ImageContainer */}
                <div className="w-full rounded-xl overflow-hidden mb-8 bg-[#1a0f0f] flex justify-center items-center min-h-[300px]">
                  {project.embedUrl ? (
                    <div className="w-full aspect-video">
                      <iframe
                        width="100%"
                        height="100%"
                        src={project.embedUrl || `https://www.youtube.com/embed/${project.videoUrl?.split('/').pop()}`}
                        title={project.title}
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      />
                    </div>
                  ) : project.image ? (
                    <div className="relative w-full h-auto max-h-[70vh]">
                      <Image
                        src={project.image}
                        alt={project.title}
                        width={1200}
                        height={800}
                        style={{ width: '100%', height: 'auto', maxHeight: '70vh', objectFit: 'contain' }}
                        className="rounded-lg"
                      />
                    </div>
                  ) : (
                    <div className="min-h-[300px] w-full flex items-center justify-center bg-gradient-to-br from-[#2c2520] to-[#1a1614] p-8">
                      <span className="text-2xl text-[#c9a66b] text-center font-semibold">
                        {project.title}
                      </span>
                    </div>
                  )}
                </div>

                {/* Description */}
                <p className="text-[#d4c4b0] leading-relaxed mb-6">
                  {project.description}
                </p>

                {/* Technologies */}
                <div className="mb-6">
                  <h4 className="text-[#c9a66b] font-medium mb-3">사용 기술</h4>
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech, i) => (
                      <span
                        key={i}
                        className="px-3 py-1 bg-[#2c2520] text-[#f5ede6] text-sm rounded-lg"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Tags */}
                <div className="mb-6">
                  <h4 className="text-[#c9a66b] font-medium mb-3">태그</h4>
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag, i) => (
                      <span
                        key={i}
                        className="px-3 py-1 bg-[#c9a66b]/20 text-[#c9a66b] text-sm rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Award if exists */}
                {project.award && (
                  <div className="mb-6 p-4 bg-[#c9a66b]/10 rounded-xl border border-[#c9a66b]/30">
                    <p className="text-[#c9a66b] font-medium">{project.award}</p>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="flex gap-4">
                  {project.videoUrl && (
                    <a
                      href={project.videoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-6 py-3 bg-[#c9a66b] hover:bg-[#d4b88a] text-[#1a1614] rounded-full font-medium transition-all"
                    >
                      <span>▶</span> 포트폴리오 보기
                    </a>
                  )}
                  <button
                    onClick={() => setSelectedProject(null)}
                    className="px-6 py-3 glass-card rounded-full font-medium text-[#f5ede6] hover:bg-[#3d352e] transition-all"
                  >
                    닫기
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}

// Lectures Section
function LecturesSection() {
  const lectures = [
    {
      period: "2026.05.14",
      title: "AI시대를 살아가는 법: 무엇이 오고 있고 무엇을 잃을 것인가?",
      org: "부천대학교 반려동물과",
    },
    {
      period: "2026.04.26",
      title: "쌍용C&E 관리직 생성형 AI 업무 활용",
      org: "쌍용C&E 종합기술훈련원",
    },
    {
      period: "2025.11",
      title: "2025 디지털 리터러시: 생성형 AI를 통해 콘텐츠 만들기",
      org: "한국항공대학교",
    },
    {
      period: "2025.09 ~ 2025.12",
      title: "AI로 나를 업그레이드하라: 인공지능 영상 제작 실습",
      org: "광명시 평생학습원",
    },
    {
      period: "2025.10",
      title: "AI가 만드는 미디어: 기술, 사례, 그리고 창작자의 미래",
      org: "수원대학교",
    },
    {
      period: "2025",
      title: "뉴콘텐츠아카데미 장기과정 2기 - 팀 프로젝트 AI 활용 코칭",
      org: "한국콘텐츠진흥원",
    },
    {
      period: "2025",
      title: "생성형 AI 마케팅 영상 제작 프롬프트 디자인 노하우",
      org: "글로벌게임허브센터",
    },
    {
      period: "2025",
      title: "웹툰 제작 회사에서의 AI 트렌드 및 제작 활용",
      org: "키다리스튜디오",
    },
    {
      period: "2025",
      title: "AI 활용 업무 효율화 교육",
      org: "군산상공회의소",
    },
    {
      period: "2025",
      title: "인공지능의 업무활용 AI 임원교육",
      org: "교보문고",
    },
    {
      period: "2025.03 ~ 2025.05",
      title: "AI로 나를 업그레이드하라: 평범한 일상을 초능력으로 바꾸는 방법",
      org: "광명시 평생학습원",
    },
    {
      period: "2025",
      title: "AI 콘텐츠 제작 마법: 상상력을 현실로",
      org: "성남여성인력개발센터",
    },
    {
      period: "2025",
      title: "산학프로젝트 멘토링: 생성형 게임AI 개발",
      org: "인제대학교",
    },
    {
      period: "2025",
      title: "뉴콘텐츠아카데미 장기과정 1기 - 인공지능을 활용한 영상 제작",
      org: "한국콘텐츠진흥원",
    },
    {
      period: "2024",
      title: "슈퍼스타 시즌10 저자강의: 나도 AI로 다시 시작!",
      org: "오늘과 내일의 학교",
    },
    {
      period: "2024",
      title: "게임 컨셉아트를 위한 스테이블 디퓨전의 활용 기초",
      org: "인제대학교 게임학과",
    },
    {
      period: "2024",
      title: "이미지 생성형 AI를 활용한 콘텐츠 제작",
      org: "호서대학교",
    },
    {
      period: "2024",
      title: "창의성과 생산성의 융합: 생성형 AI로 업무 혁신하기",
      org: "Hanumul",
    },
    {
      period: "2024",
      title: "생성형 AI를 활용한 게임제작 활용",
      org: "세한대학교",
    },
    {
      period: "2024",
      title: "이미지 생성형 AI를 활용한 게임제작 기초",
      org: "건양대학교 창의융합캠퍼스",
    },
    {
      period: "2024",
      title: "생성형 AI를 활용한 영상콘텐츠 제작",
      org: "MBC방송 아카데미",
    },
    {
      period: "2024",
      title: "AI 시대에서 콘텐츠의 미래 그리고 윤리",
      org: "인제대학교",
    },
    {
      period: "2021",
      title: "웹소설, 독립출판, 프로듀싱을 한 번에 배워보자",
      org: "경기콘텐츠진흥원 판교클러스터센터",
    },
  ];

  return (
    <section id="lectures" className="py-24 px-6 sepia-bg">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold mb-12 gradient-text">
          강의
        </h2>
        <div className="space-y-4">
          {lectures.map((lecture, index) => (
            <div key={index} className="glass-card rounded-xl p-6 hover-lift">
              <p className="text-[#c9a66b] text-sm mb-2">{lecture.period}</p>
              <h3 className="text-lg font-medium text-[#f5ede6] mb-2">
                {lecture.title}
              </h3>
              <p className="text-[#a89a8c] text-sm">{lecture.org}</p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

// Research Section
function ResearchSection() {
  const papers = [
    {
      period: "2026.02",
      title: "RPG 장르 게임 직업별 음성 커스터마이징을 위한 자동 레이블링 방법에 관한 연구",
      org: "국립공주대학교 대학원 게임디자인학과 박사학위논문",
    },
    {
      period: "2024.05",
      title: "Development of an evaluation tool model for the effective measurement of cyber motion sickness in immersive virtual reality",
      org: "International Journal of Advanced Culture Technology, Vol.12 No.2, pp.345-352",
    },
    {
      period: "2023.11",
      title: "Analysis of School Safety Education Utilization with Educational Game Elements",
      org: "International Journal of Advanced Culture Technology, Vol.11 No.4, pp.81-87",
    },
  ];

  return (
    <section id="research" className="py-24 px-6 bg-[#1a1614]">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold mb-12 gradient-text">
          논문 및 출간
        </h2>
        <div className="space-y-4 mb-16">
          {papers.map((paper, index) => (
            <div key={index} className="glass-card rounded-xl p-6 hover-lift">
              <p className="text-[#c9a66b] text-sm mb-2">{paper.period}</p>
              <h3 className="text-lg font-semibold text-[#f5ede6] mb-2">
                {paper.title}
              </h3>
              <p className="text-[#a89a8c] text-sm">{paper.org}</p>
            </div>
          ))}
        </div>

        <div className="glass-card rounded-xl p-6 hover-lift glow">
          <p className="text-[#c9a66b] text-sm mb-2">2024.12</p>
          <h3 className="text-xl font-semibold text-[#f5ede6] mb-2">
            나만알고싶은 AI 활용 교과서: 시니어 편
          </h3>
          <p className="text-[#a89a8c]">
            박영사 출판. 시니어를 위한 AI 활용 가이드북으로, 누구나 쉽게 AI 기술을 활용할 수 있도록 안내합니다.
          </p>
        </div>
      </div>
    </section>
  );
}

// Guestbook Section
function GuestbookSection() {
  const [messages, setMessages] = useState<{ id: number; name: string; message: string; createdAt: string }[]>([]);
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [password, setPassword] = useState(""); // For creating
  const [deletePassword, setDeletePassword] = useState(""); // For deleting
  const [deleteTargetId, setDeleteTargetId] = useState<number | null>(null); // Which message to delete
  const [loading, setLoading] = useState(false);

  const fetchMessages = async () => {
    try {
      const res = await fetch("/api/guestbook");
      if (!res.ok) return;
      const data = await res.json();
      setMessages(data.messages || []);
    } catch (error) {
      console.error("Failed to fetch messages:", error);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !message.trim() || !password.trim()) return;

    setLoading(true);
    try {
      await fetch("/api/guestbook", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, message, password }),
      });
      setName("");
      setMessage("");
      setPassword("");
      await fetchMessages();
    } catch (error) {
      console.error("Failed to post message:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!deleteTargetId || !deletePassword.trim()) return;

    setLoading(true);
    try {
      const res = await fetch("/api/guestbook", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: deleteTargetId, password: deletePassword }),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.error || "삭제에 실패했습니다.");
      } else {
        alert("삭제되었습니다.");
        setDeleteTargetId(null);
        setDeletePassword("");
        await fetchMessages();
      }
    } catch (error) {
      console.error("Failed to delete message:", error);
      alert("오류가 발생했습니다.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="guestbook" className="py-24 px-6 bg-[#1a1614] relative overflow-hidden">
      {/* Background Decoration */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#c9a66b]/5 rounded-full blur-3xl" />

      <div className="max-w-4xl mx-auto relative z-10">
        <h2 className="text-3xl md:text-4xl font-bold mb-4 gradient-text text-center">
          방명록
        </h2>
        <p className="text-[#8b7355] mb-12 text-center">
          다녀가신 흔적을 남겨주세요.
        </p>

        {/* Input Form */}
        <div className="glass-card rounded-2xl p-8 mb-12 border border-[#c9a66b]/20">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-[#c9a66b] mb-2">이름</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-[#1a1614]/50 border border-[#3d352e] rounded-lg px-4 py-3 text-[#f5ede6] focus:border-[#c9a66b] focus:outline-none transition-colors"
                  placeholder="이름을 입력해주세요"
                  maxLength={50}
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#c9a66b] mb-2">비밀번호 (삭제용)</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-[#1a1614]/50 border border-[#3d352e] rounded-lg px-4 py-3 text-[#f5ede6] focus:border-[#c9a66b] focus:outline-none transition-colors"
                  placeholder="Password"
                  maxLength={20}
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-[#c9a66b] mb-2">메시지</label>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full bg-[#1a1614]/50 border border-[#3d352e] rounded-lg px-4 py-3 text-[#f5ede6] focus:border-[#c9a66b] focus:outline-none transition-colors min-h-[100px]"
                placeholder="응원의 한마디를 남겨주세요..."
                maxLength={500}
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 bg-[#c9a66b] hover:bg-[#d4b88a] text-[#1a1614] rounded-lg font-bold transition-all hover-lift disabled:opacity-50"
            >
              {loading ? "등록 중..." : "방명록 등록하기"}
            </button>
          </form>
        </div>

        {/* Message List */}
        <div className="grid md:grid-cols-2 gap-6">
          {messages.map((entry) => (
            <div key={entry.id} className="glass-card rounded-xl p-6 relative group hover:border-[#c9a66b]/40 transition-colors">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h4 className="font-bold text-[#f5ede6]">{entry.name}</h4>
                  <p className="text-xs text-[#8b7355]">
                    {new Date(entry.createdAt).toLocaleDateString()}
                  </p>
                </div>
                {/* Delete Button Trigger */}
                <button
                  onClick={() => setDeleteTargetId(entry.id)}
                  className="text-[#a89a8c] hover:text-red-400 transition-colors p-1"
                  title="삭제"
                >
                  🗑️
                </button>
              </div>
              <p className="text-[#d4c4b0] text-sm leading-relaxed whitespace-pre-wrap">
                {entry.message}
              </p>

              {/* Delete Modal (Inline) */}
              {deleteTargetId === entry.id && (
                <div className="absolute inset-0 bg-[#1a1614]/95 backdrop-blur-sm rounded-xl flex items-center justify-center p-6 z-10 animate-fade-in">
                  <div className="w-full space-y-3">
                    <p className="text-sm text-[#f5ede6] text-center mb-2">비밀번호를 입력하세요</p>
                    <input
                      type="password"
                      value={deletePassword}
                      onChange={(e) => setDeletePassword(e.target.value)}
                      className="w-full bg-[#2c2520] border border-[#3d352e] rounded-lg px-3 py-2 text-[#f5ede6] text-sm focus:border-[#c9a66b] outline-none"
                      autoFocus
                    />
                    <div className="flex gap-2">
                      <button
                        onClick={handleDelete}
                        className="flex-1 py-2 bg-red-900/50 hover:bg-red-900 text-red-200 text-xs rounded-lg transition-colors border border-red-900"
                        disabled={loading}
                      >
                        삭제
                      </button>
                      <button
                        onClick={() => {
                          setDeleteTargetId(null);
                          setDeletePassword("");
                        }}
                        className="flex-1 py-2 bg-[#2c2520] hover:bg-[#3d352e] text-[#a89a8c] text-xs rounded-lg transition-colors"
                      >
                        취소
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}

          {messages.length === 0 && (
            <div className="col-span-full text-center py-12 border border-dashed border-[#3d352e] rounded-xl">
              <p className="text-[#8b7355]">첫 번째 메시지를 남겨주세요!</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

// Contact Section
function ContactSection() {
  return (
    <section id="contact" className="py-24 px-6 bg-[#1a1614]">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-6 gradient-text">
          연락처
        </h2>
        <p className="text-[#a89a8c] mb-12 max-w-xl mx-auto">
          AI 콘텐츠 제작, 강의, 프로젝트 협업 등 궁금한 점이 있으시면 편하게
          연락주세요.
        </p>
        <div className="flex flex-col sm:flex-row gap-6 justify-center">
          <a
            href="mailto:korea333333@gmail.com"
            className="glass-card rounded-xl px-8 py-4 hover-lift flex items-center justify-center gap-3"
          >
            <span className="text-2xl">✉️</span>
            <span className="text-[#f5ede6]">korea333333@gmail.com</span>
          </a>
          <a
            href="tel:010-3305-3847"
            className="glass-card rounded-xl px-8 py-4 hover-lift flex items-center justify-center gap-3"
          >
            <span className="text-2xl">📞</span>
            <span className="text-[#f5ede6]">010-3305-3847</span>
          </a>
        </div>
      </div>
    </section>
  );
}

// Footer
function Footer() {
  return (
    <footer className="py-8 px-6 border-t border-[#3d352e] bg-[#1a1614]">
      <div className="max-w-4xl mx-auto text-center text-[#8b7355] text-sm">
        <p>© 2026 Kim Seunguk. All rights reserved.</p>
        <p className="mt-2">AI Content Creator & Educator</p>
      </div>
    </footer>
  );
}

// Main Page
export default function Home() {
  return (
    <div className="min-h-screen bg-[#1a1614]">
      <Navigation />
      <HeroSection />
      <ClientLogosSection />
      <ScrollReveal><AboutSection /></ScrollReveal>
      <ScrollReveal><ProjectsSection /></ScrollReveal>
      <ScrollReveal><DigitalProductsSection /></ScrollReveal>
      <ScrollReveal><ExperienceSection /></ScrollReveal>
      <ScrollReveal><AwardsSection /></ScrollReveal>
      <ScrollReveal><LecturesSection /></ScrollReveal>
      <ScrollReveal><ResearchSection /></ScrollReveal>
      <ScrollReveal><GuestbookSection /></ScrollReveal>
      <ScrollReveal><ContactSection /></ScrollReveal>
      <Footer />
    </div>
  );
}
