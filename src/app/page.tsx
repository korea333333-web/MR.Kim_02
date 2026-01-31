"use client";

import { useState, useEffect } from "react";

// Navigation Component
function Navigation() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { href: "#home", label: "홈" },
    { href: "#about", label: "소개" },
    { href: "#projects", label: "프로젝트" },
    { href: "#experience", label: "경력" },
    { href: "#awards", label: "수상" },
    { href: "#lectures", label: "강의" },
    { href: "#contact", label: "연락처" },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? "glass-card py-3" : "py-6"
        }`}
    >
      <div className="max-w-6xl mx-auto px-6 flex items-center justify-between">
        <a href="#home" className="text-xl font-bold gradient-text">
          김승욱
        </a>
        <div className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-sm text-zinc-400 hover:text-white transition-colors"
            >
              {item.label}
            </a>
          ))}
        </div>
      </div>
    </nav>
  );
}

// Hero Section
function HeroSection() {
  return (
    <section
      id="home"
      className="min-h-screen flex items-center justify-center relative overflow-hidden"
    >
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-900/20 via-transparent to-purple-900/20" />
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />

      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
        <div className="mb-6">
          <span className="inline-block px-4 py-2 rounded-full text-sm glass-card text-indigo-400">
            QuantumAI LAB 대표
          </span>
        </div>
        <h1 className="text-5xl md:text-7xl font-bold mb-4">
          <span className="gradient-text">김승욱</span>
        </h1>
        <p className="text-xl md:text-2xl text-zinc-400 mb-2">Seungwook Kim</p>
        <p className="text-lg md:text-xl text-zinc-500 max-w-2xl mx-auto mb-8">
          AI 콘텐츠 제작, 사운드 디자인, 그리고 교육을 통해
          <br />
          창의성과 기술의 경계를 넓혀가고 있습니다.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="#projects"
            className="px-8 py-4 bg-indigo-600 hover:bg-indigo-700 rounded-full font-medium transition-all hover-lift"
          >
            프로젝트 보기
          </a>
          <a
            href="#contact"
            className="px-8 py-4 glass-card rounded-full font-medium transition-all hover-lift"
          >
            연락하기
          </a>
        </div>

        {/* Stats */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="text-3xl font-bold gradient-text">20+</div>
            <div className="text-sm text-zinc-500">Years Experience</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold gradient-text">AI</div>
            <div className="text-sm text-zinc-500">Content Creator</div>
          </div>
          <div className="text-center hidden md:block">
            <div className="text-3xl font-bold gradient-text">교육자</div>
            <div className="text-sm text-zinc-500">Educator</div>
          </div>
        </div>
      </div>
    </section>
  );
}

// About Section
function AboutSection() {
  return (
    <section id="about" className="py-24 px-6">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold mb-8 gradient-text">
          소개
        </h2>
        <div className="glass-card rounded-2xl p-8 hover-lift">
          <p className="text-lg text-zinc-300 leading-relaxed mb-6">
            사진, 사운드, 영상 — 다양한 매체를 넘나들며 콘텐츠를 기획하고
            창작해온 융합형 아티스트입니다. 사진 스튜디오 운영부터 사운드
            디자인, 그리고 대학과 기업에서의 교육까지, 매체의 경계를 넘어 늘
            새로운 것을 만들어왔습니다.
          </p>
          <p className="text-lg text-zinc-300 leading-relaxed">
            현재는 AI라는 강력한 도구와 함께, 이미지 생성부터 영상 제작,
            사운드까지 창작의 모든 영역에서 가능성을 탐구하고 있습니다. 단순히
            기술을 사용하는 것을 넘어,{" "}
            <span className="text-indigo-400 font-medium">
              누구나 자신의 창작 역량을 수십 배로 키울 수 있도록 돕는 일
            </span>{" "}
            — 그것이 지금 제가 집중하고 있는 일입니다.
          </p>

          {/* Info cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
            <div className="bg-zinc-900/50 rounded-xl p-4">
              <div className="text-sm text-zinc-500 mb-1">Location</div>
              <div className="text-white">Seoul, Korea</div>
            </div>
            <div className="bg-zinc-900/50 rounded-xl p-4">
              <div className="text-sm text-zinc-500 mb-1">Affiliation</div>
              <div className="text-white">광운대학교 정보과학교육원</div>
            </div>
            <div className="bg-zinc-900/50 rounded-xl p-4">
              <div className="text-sm text-zinc-500 mb-1">Education</div>
              <div className="text-white text-sm">
                공주대 게임디자인 박사
                <br />
                상명대 컴퓨터음악 석사
              </div>
            </div>
          </div>
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
      role: "시간강사",
      period: "2015.03 ~",
      current: true,
    },
    {
      title: "해냄솔루션",
      role: "사운드 디렉터",
      period: "2015 ~ 2018",
      current: false,
    },
  ];

  return (
    <section id="experience" className="py-24 px-6 bg-zinc-900/30">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold mb-12 gradient-text">
          경력
        </h2>
        <div className="space-y-4">
          {experiences.map((exp, index) => (
            <div
              key={index}
              className="glass-card rounded-xl p-6 hover-lift flex flex-col md:flex-row md:items-center md:justify-between gap-4"
            >
              <div>
                <h3 className="text-xl font-semibold text-white">
                  {exp.title}
                </h3>
                <p className="text-zinc-400">{exp.role}</p>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-zinc-500">{exp.period}</span>
                {exp.current && (
                  <span className="px-3 py-1 bg-indigo-600/20 text-indigo-400 text-sm rounded-full">
                    현재
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// Awards Section
function AwardsSection() {
  const awards = [
    { title: "신세계 백화점 본점 전시", org: "제3회 국제디지털아트초대전 우수상" },
    { title: "한국게임학회", org: "탕산 국제초대전 Special Prize" },
    { title: "한국디자인학회", org: "학술 발표" },
    { title: "서울 국제 AI 영화제 우수상", org: "AI 제작 영화 부문" },
  ];

  return (
    <section id="awards" className="py-24 px-6">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold mb-12 gradient-text">
          수상 및 전시
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {awards.map((award, index) => (
            <div key={index} className="glass-card rounded-xl p-6 hover-lift">
              <div className="w-12 h-12 bg-indigo-600/20 rounded-xl flex items-center justify-center mb-4">
                <span className="text-2xl">🏆</span>
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">
                {award.title}
              </h3>
              <p className="text-zinc-400 text-sm">{award.org}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// Lectures Section
function LecturesSection() {
  const lectures = [
    {
      title: "뉴콘텐츠아카데미 장기과정 2기 - 팀 프로젝트 AI 활용 코칭",
      org: "한국콘텐츠진흥원",
    },
    {
      title: "생성형 AI 마케팅 영상 제작 프롬프트 디자인 노하우",
      org: "글로벌게임허브센터",
    },
    {
      title: "AI가 만드는 미디어: 기술, 사례, 그리고 창작자의 미래",
      org: "수원대학교",
    },
    { title: "인공지능의 업무활용 AI 임원교육", org: "교보문고" },
    { title: "생성형 AI를 활용한 영상콘텐츠 제작", org: "MBC방송 아카데미" },
  ];

  return (
    <section id="lectures" className="py-24 px-6 bg-zinc-900/30">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold mb-12 gradient-text">
          강의
        </h2>
        <div className="space-y-4">
          {lectures.map((lecture, index) => (
            <div key={index} className="glass-card rounded-xl p-6 hover-lift">
              <h3 className="text-lg font-medium text-white mb-2">
                {lecture.title}
              </h3>
              <p className="text-indigo-400 text-sm">{lecture.org}</p>
            </div>
          ))}
        </div>

        {/* Publication */}
        <div className="mt-16">
          <h3 className="text-2xl font-bold mb-6 text-white">출판</h3>
          <div className="glass-card rounded-xl p-6 hover-lift glow">
            <h4 className="text-xl font-semibold text-white mb-2">
              나만알고싶은 AI 활용 교과서: 시니어 편
            </h4>
            <p className="text-indigo-400 mb-3">출판: 박영사</p>
            <p className="text-zinc-400">
              시니어를 위한 AI 활용 가이드북. 누구나 쉽게 AI 기술을 활용할 수
              있도록 친절하게 안내합니다.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

// Contact Section
function ContactSection() {
  return (
    <section id="contact" className="py-24 px-6">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-6 gradient-text">
          연락처
        </h2>
        <p className="text-zinc-400 mb-12 max-w-xl mx-auto">
          AI 콘텐츠 제작, 강의, 프로젝트 협업 등 궁금한 점이 있으시면 편하게
          연락주세요.
        </p>
        <div className="flex flex-col sm:flex-row gap-6 justify-center">
          <a
            href="mailto:korea333333@gmail.com"
            className="glass-card rounded-xl px-8 py-4 hover-lift flex items-center justify-center gap-3"
          >
            <span className="text-2xl">✉️</span>
            <span className="text-white">korea333333@gmail.com</span>
          </a>
          <a
            href="tel:010-3305-3847"
            className="glass-card rounded-xl px-8 py-4 hover-lift flex items-center justify-center gap-3"
          >
            <span className="text-2xl">📞</span>
            <span className="text-white">010-3305-3847</span>
          </a>
        </div>
      </div>
    </section>
  );
}

// Footer
function Footer() {
  return (
    <footer className="py-8 px-6 border-t border-zinc-800">
      <div className="max-w-4xl mx-auto text-center text-zinc-500 text-sm">
        <p>© 2026 Kim Seungwook. All rights reserved.</p>
        <p className="mt-2">AI Content Creator & Educator</p>
      </div>
    </footer>
  );
}

// Main Page
export default function Home() {
  return (
    <div className="min-h-screen bg-zinc-950">
      <Navigation />
      <HeroSection />
      <AboutSection />
      <ExperienceSection />
      <AwardsSection />
      <LecturesSection />
      <ContactSection />
      <Footer />
    </div>
  );
}
