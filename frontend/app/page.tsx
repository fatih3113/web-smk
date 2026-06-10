'use client';
import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';

export default function HomePage() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const heroRef = useRef(null);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40);
      setScrollY(window.scrollY);
    };
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const heroBg = 'https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=1920&q=80';
  const navLinks = ['Profil', 'Jurusan', 'Berita', 'Galeri', 'Kontak'];

  const fasilitas = [
    { icon: '🔬', label: 'Lab Farmasi', desc: 'Terstandar BPOM' },
    { icon: '💻', label: 'Lab Komputer', desc: '40 Unit Modern' },
    { icon: '🏠', label: 'Asrama', desc: 'Putra & Putri' },
    { icon: '📚', label: 'Perpustakaan', desc: 'Ribuan Koleksi' },
    { icon: '🕌', label: 'Masjid', desc: 'Kapasitas Besar' },
    { icon: '🏥', label: 'Fasilitas Medis', desc: 'Siap 24 Jam' },
    { icon: '📶', label: 'WiFi Area', desc: 'High Speed' },
    { icon: '🏪', label: 'Koperasi', desc: 'Kantin Sehat' },
  ];

  const ekskul = [
    'Renang', 'Bola Voli', 'Badminton', 'Kesenian',
    'Kerohanian', 'Kunjungan Industri', 'OSIS',
    'Pramuka', 'Paskibra', 'PKS', 'Rebana',
  ];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700;900&family=Plus+Jakarta+Sans:wght@300;400;500;600;700&display=swap');

        * { box-sizing: border-box; margin: 0; padding: 0; }

        :root {
          --green: #22c55e;
          --green-dark: #16a34a;
          --green-dim: rgba(34,197,94,0.12);
          --gold: #f5c842;
          --navy: #060e1f;
          --navy2: #0c1628;
          --navy3: #111e35;
          --glass: rgba(255,255,255,0.04);
          --glass-border: rgba(255,255,255,0.08);
          --text: #f1f5fb;
          --muted: rgba(241,245,251,0.5);
          --muted2: rgba(241,245,251,0.25);
        }

        body { background: var(--navy); color: var(--text); font-family: 'Plus Jakarta Sans', sans-serif; }

        /* NAVBAR */
        .navbar {
          position: fixed; top: 0; left: 0; right: 0; z-index: 100;
          padding: 0 2rem;
          transition: all 0.4s ease;
        }
        .navbar.scrolled {
          background: rgba(6,14,31,0.92);
          backdrop-filter: blur(20px);
          border-bottom: 1px solid var(--glass-border);
          box-shadow: 0 4px 40px rgba(0,0,0,0.4);
        }
        .navbar-inner {
          max-width: 1200px; margin: 0 auto;
          display: flex; align-items: center; justify-content: space-between;
          padding: 1.1rem 0;
        }
        .logo { display: flex; align-items: center; gap: 12px; text-decoration: none; }
        .logo-mark {
          width: 42px; height: 42px; border-radius: 12px;
          background: linear-gradient(135deg, #16a34a, #22c55e);
          display: flex; align-items: center; justify-content: center;
          font-weight: 800; font-size: 11px; letter-spacing: 0.5px;
          color: white; flex-shrink: 0;
          box-shadow: 0 0 0 1px rgba(34,197,94,0.3), 0 4px 20px rgba(34,197,94,0.2);
        }
        .logo-text p:first-child { font-weight: 700; font-size: 13px; color: var(--text); letter-spacing: 0.3px; }
        .logo-text p:last-child { font-size: 11px; color: var(--green); margin-top: 1px; }
        .nav-links { display: flex; align-items: center; gap: 2rem; }
        .nav-links a { font-size: 13.5px; font-weight: 500; color: var(--muted); text-decoration: none; transition: color 0.2s; letter-spacing: 0.2px; }
        .nav-links a:hover { color: var(--text); }
        .btn-ppdb {
          background: var(--green); color: white;
          font-size: 13px; font-weight: 700; letter-spacing: 0.3px;
          padding: 9px 20px; border-radius: 10px; text-decoration: none;
          transition: all 0.2s; border: none;
          box-shadow: 0 0 0 1px rgba(34,197,94,0.4);
        }
        .btn-ppdb:hover { background: var(--green-dark); transform: translateY(-1px); box-shadow: 0 6px 20px rgba(34,197,94,0.3); }
        .btn-admin {
          display: flex; align-items: center; gap: 6px;
          background: var(--glass); border: 1px solid var(--glass-border);
          color: var(--muted); font-size: 13px; font-weight: 500;
          padding: 9px 16px; border-radius: 10px; text-decoration: none;
          transition: all 0.2s;
        }
        .btn-admin:hover { background: rgba(255,255,255,0.08); color: var(--text); }
        .mobile-toggle {
          display: none; background: none; border: none; color: white;
          font-size: 22px; cursor: pointer; padding: 4px;
        }
        .mobile-menu {
          background: rgba(6,14,31,0.97); backdrop-filter: blur(20px);
          border-top: 1px solid var(--glass-border);
          padding: 1.5rem 2rem; display: flex; flex-direction: column; gap: 0.75rem;
        }
        .mobile-menu a { color: var(--muted); font-size: 15px; padding: 6px 0; text-decoration: none; transition: color 0.2s; }
        .mobile-menu a:hover { color: white; }

        /* HERO */
        .hero {
          position: relative; min-height: 100vh;
          display: flex; align-items: center; justify-content: center;
          padding: 6rem 2rem 4rem; overflow: hidden;
        }
        .hero-bg { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; }
        .hero-overlay {
          position: absolute; inset: 0;
          background: linear-gradient(170deg, rgba(6,14,31,0.75) 0%, rgba(6,14,31,0.6) 40%, rgba(6,14,31,0.95) 100%);
        }
        .hero-grain {
          position: absolute; inset: 0; opacity: 0.04;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E");
          background-size: 200px;
        }
        .hero-glow {
          position: absolute; top: 20%; left: 50%; transform: translateX(-50%);
          width: 600px; height: 400px;
          background: radial-gradient(ellipse, rgba(34,197,94,0.1) 0%, transparent 70%);
          pointer-events: none;
        }
        .hero-content { position: relative; z-index: 2; text-align: center; max-width: 800px; }
        .badge-live {
          display: inline-flex; align-items: center; gap: 8px;
          background: rgba(34,197,94,0.1); border: 1px solid rgba(34,197,94,0.25);
          color: var(--green); font-size: 11px; font-weight: 700; letter-spacing: 1px; text-transform: uppercase;
          padding: 7px 16px; border-radius: 100px; margin-bottom: 2rem;
          animation: fadeDown 0.8s ease both;
        }
        .pulse { width: 7px; height: 7px; background: var(--green); border-radius: 50%; animation: pulse 2s infinite; }
        @keyframes pulse { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:0.5;transform:scale(1.3)} }
        .hero-title {
          font-family: 'Playfair Display', Georgia, serif;
          font-size: clamp(3rem, 7vw, 5.5rem);
          font-weight: 900; line-height: 1.08;
          margin-bottom: 1.5rem; letter-spacing: -1px;
          animation: fadeUp 0.9s 0.1s ease both;
        }
        .hero-title span { color: var(--green); }
        .hero-sub {
          font-size: 17px; color: var(--muted); max-width: 560px;
          margin: 0 auto 2rem; line-height: 1.7; font-weight: 400;
          animation: fadeUp 0.9s 0.2s ease both;
        }
        .beasiswa-card {
          display: inline-flex; align-items: center; gap: 14px;
          background: rgba(245,200,66,0.08); border: 1px solid rgba(245,200,66,0.2);
          border-radius: 16px; padding: 14px 22px; margin-bottom: 2.5rem;
          animation: fadeUp 0.9s 0.3s ease both;
        }
        .beasiswa-icon { font-size: 28px; }
        .beasiswa-title { color: var(--gold); font-weight: 700; font-size: 14px; margin-bottom: 3px; }
        .beasiswa-sub { color: rgba(245,200,66,0.6); font-size: 12px; }
        .hero-cta { display: flex; flex-wrap: wrap; gap: 12px; justify-content: center; animation: fadeUp 0.9s 0.4s ease both; }
        .cta-primary {
          display: inline-flex; align-items: center; gap: 8px;
          background: var(--green); color: white;
          font-weight: 700; font-size: 15px; padding: 14px 32px;
          border-radius: 14px; text-decoration: none;
          transition: all 0.25s; box-shadow: 0 0 0 1px rgba(34,197,94,0.4), 0 8px 30px rgba(34,197,94,0.2);
        }
        .cta-primary:hover { background: var(--green-dark); transform: translateY(-2px); box-shadow: 0 0 0 1px rgba(34,197,94,0.4), 0 16px 40px rgba(34,197,94,0.3); }
        .cta-secondary {
          display: inline-flex; align-items: center; gap: 8px;
          background: var(--glass); border: 1px solid var(--glass-border);
          backdrop-filter: blur(12px); color: var(--text);
          font-weight: 600; font-size: 15px; padding: 14px 28px;
          border-radius: 14px; text-decoration: none;
          transition: all 0.25s;
        }
        .cta-secondary:hover { background: rgba(255,255,255,0.08); border-color: rgba(255,255,255,0.2); transform: translateY(-2px); }
        .scroll-hint { margin-top: 5rem; display: flex; flex-direction: column; align-items: center; gap: 8px; color: var(--muted2); font-size: 12px; letter-spacing: 1px; text-transform: uppercase; animation: fadeUp 1s 0.6s ease both; }
        .scroll-dot { width: 4px; height: 4px; background: var(--muted2); border-radius: 50%; animation: scrollBounce 2s infinite; }
        @keyframes scrollBounce { 0%,100%{transform:translateY(0)} 50%{transform:translateY(6px)} }

        /* STATS STRIP */
        .stats-strip { background: var(--navy2); border-top: 1px solid var(--glass-border); border-bottom: 1px solid var(--glass-border); }
        .stats-inner { max-width: 900px; margin: 0 auto; display: grid; grid-template-columns: repeat(3, 1fr); }
        .stat-item { padding: 2.5rem 1rem; text-align: center; border-right: 1px solid var(--glass-border); }
        .stat-item:last-child { border-right: none; }
        .stat-icon { font-size: 1.75rem; margin-bottom: 8px; }
        .stat-num { font-family: 'Playfair Display', serif; font-size: 1.8rem; font-weight: 700; color: var(--green); letter-spacing: -0.5px; }
        .stat-label { font-size: 11px; color: var(--muted); margin-top: 5px; letter-spacing: 0.5px; text-transform: uppercase; }

        /* SECTION HEADER */
        .section-label { font-size: 11px; font-weight: 700; letter-spacing: 2px; text-transform: uppercase; color: var(--green); text-align: center; margin-bottom: 10px; }
        .section-title { font-family: 'Playfair Display', serif; font-size: clamp(2rem, 4vw, 2.8rem); font-weight: 700; text-align: center; margin-bottom: 3.5rem; color: var(--text); letter-spacing: -0.5px; }
        .section-title em { color: var(--green); font-style: italic; }

        /* JURUSAN */
        .jurusan-section { padding: 6rem 2rem; }
        .jurusan-grid { max-width: 960px; margin: 0 auto; display: grid; grid-template-columns: 1fr 1fr; gap: 24px; }

        /* Enhanced jurusan card with better hover & clickable feel */
        .jurusan-card {
          background: var(--navy3); border: 1px solid var(--glass-border);
          border-radius: 24px; padding: 2.5rem; transition: all 0.35s;
          position: relative; overflow: hidden; cursor: pointer;
          text-decoration: none; display: block; color: inherit;
        }
        .jurusan-card::before {
          content: ''; position: absolute; inset: 0;
          background: radial-gradient(circle at top left, var(--card-glow) 0%, transparent 60%);
          opacity: 0; transition: opacity 0.35s;
        }
        .jurusan-card:hover::before { opacity: 1; }
        .jurusan-card:hover { transform: translateY(-8px); border-color: var(--card-border); box-shadow: 0 20px 60px rgba(0,0,0,0.3); }
        .jurusan-card.farmasi { --card-glow: rgba(147,51,234,0.15); --card-border: rgba(147,51,234,0.45); }
        .jurusan-card.tkj { --card-glow: rgba(59,130,246,0.15); --card-border: rgba(59,130,246,0.45); }
        .jurusan-icon-wrap {
          width: 60px; height: 60px; border-radius: 16px;
          display: flex; align-items: center; justify-content: center;
          font-size: 28px; margin-bottom: 1.5rem;
          transition: transform 0.3s;
        }
        .jurusan-card:hover .jurusan-icon-wrap { transform: scale(1.1) rotate(-3deg); }
        .jurusan-card.farmasi .jurusan-icon-wrap { background: rgba(147,51,234,0.15); }
        .jurusan-card.tkj .jurusan-icon-wrap { background: rgba(59,130,246,0.15); }
        .jurusan-name { font-family: 'Playfair Display', serif; font-size: 1.5rem; font-weight: 700; margin-bottom: 0.75rem; }
        .jurusan-desc { color: var(--muted); font-size: 14px; line-height: 1.7; margin-bottom: 1.5rem; }
        .jurusan-footer { display: flex; align-items: center; justify-content: space-between; }
        .badge-akred {
          font-size: 11px; font-weight: 700; letter-spacing: 0.5px; padding: 5px 12px; border-radius: 100px;
        }
        .farmasi .badge-akred { background: rgba(147,51,234,0.15); color: #c084fc; }
        .tkj .badge-akred { background: rgba(59,130,246,0.15); color: #93c5fd; }
        .jurusan-link-badge {
          display: inline-flex; align-items: center; gap: 6px;
          font-size: 13px; font-weight: 600; transition: all 0.2s;
          padding: 6px 14px; border-radius: 8px;
          border: 1px solid transparent;
        }
        .farmasi .jurusan-link-badge { color: #c084fc; border-color: rgba(147,51,234,0.25); background: rgba(147,51,234,0.08); }
        .farmasi:hover .jurusan-link-badge { background: rgba(147,51,234,0.18); border-color: rgba(147,51,234,0.4); gap: 10px; }
        .tkj .jurusan-link-badge { color: #93c5fd; border-color: rgba(59,130,246,0.25); background: rgba(59,130,246,0.08); }
        .tkj:hover .jurusan-link-badge { background: rgba(59,130,246,0.18); border-color: rgba(59,130,246,0.4); gap: 10px; }

        /* Pill tags on jurusan cards */
        .jurusan-tags { display: flex; flex-wrap: wrap; gap: 6px; margin-bottom: 1.25rem; }
        .jurusan-tag { font-size: 11px; font-weight: 600; padding: 4px 10px; border-radius: 100px; }
        .farmasi .jurusan-tag { background: rgba(147,51,234,0.1); color: rgba(192,132,252,0.8); }
        .tkj .jurusan-tag { background: rgba(59,130,246,0.1); color: rgba(147,197,253,0.8); }

        /* Arrow indicator */
        .card-arrow {
          position: absolute; top: 2rem; right: 2rem;
          width: 32px; height: 32px; border-radius: 8px;
          display: flex; align-items: center; justify-content: center;
          font-size: 14px; opacity: 0; transform: translate(4px, -4px);
          transition: all 0.3s;
        }
        .farmasi .card-arrow { background: rgba(147,51,234,0.15); color: #c084fc; }
        .tkj .card-arrow { background: rgba(59,130,246,0.15); color: #93c5fd; }
        .jurusan-card:hover .card-arrow { opacity: 1; transform: translate(0, 0); }

        /* FASILITAS */
        .fasilitas-section { padding: 6rem 2rem; background: var(--navy2); }
        .fasilitas-grid { max-width: 1000px; margin: 0 auto; display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px; }
        .fas-card {
          background: var(--glass); border: 1px solid var(--glass-border);
          border-radius: 20px; padding: 1.75rem 1.25rem; text-align: center;
          transition: all 0.3s; cursor: default; position: relative; overflow: hidden;
        }
        .fas-card::after {
          content: ''; position: absolute; bottom: 0; left: 0; right: 0; height: 2px;
          background: linear-gradient(90deg, var(--green), transparent);
          opacity: 0; transition: opacity 0.3s;
        }
        .fas-card:hover { background: rgba(255,255,255,0.06); border-color: rgba(34,197,94,0.3); transform: translateY(-4px); }
        .fas-card:hover::after { opacity: 1; }
        .fas-icon { font-size: 2rem; margin-bottom: 10px; display: block; transition: transform 0.3s; }
        .fas-card:hover .fas-icon { transform: scale(1.15); }
        .fas-name { font-size: 13px; font-weight: 600; color: var(--text); }
        .fas-desc { font-size: 11px; color: var(--muted2); margin-top: 4px; }

        /* EKSKUL */
        .ekskul-section { padding: 6rem 2rem; }
        .ekskul-wrap { max-width: 700px; margin: 0 auto; display: flex; flex-wrap: wrap; justify-content: center; gap: 10px; }
        .ekskul-pill {
          background: var(--glass); border: 1px solid var(--glass-border);
          color: var(--muted); font-size: 13px; font-weight: 500;
          padding: 9px 20px; border-radius: 100px;
          transition: all 0.25s; cursor: default; letter-spacing: 0.2px;
        }
        .ekskul-pill:hover { background: var(--green-dim); border-color: rgba(34,197,94,0.35); color: var(--text); transform: scale(1.04); }

        /* CTA SECTION */
        .cta-section { position: relative; padding: 7rem 2rem; text-align: center; overflow: hidden; }
        .cta-bg { position: absolute; inset: 0; background: linear-gradient(135deg, #064e2a, #0a2a15, #03150a); }
        .cta-pattern {
          position: absolute; inset: 0; opacity: 0.04;
          background-image: repeating-linear-gradient(0deg, transparent, transparent 60px, rgba(255,255,255,0.5) 60px, rgba(255,255,255,0.5) 61px),
                            repeating-linear-gradient(90deg, transparent, transparent 60px, rgba(255,255,255,0.5) 60px, rgba(255,255,255,0.5) 61px);
        }
        .cta-glow {
          position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%);
          width: 500px; height: 300px;
          background: radial-gradient(ellipse, rgba(34,197,94,0.15) 0%, transparent 70%);
          pointer-events: none;
        }
        .cta-content { position: relative; z-index: 1; max-width: 640px; margin: 0 auto; }
        .cta-tag {
          display: inline-block; background: rgba(34,197,94,0.15); border: 1px solid rgba(34,197,94,0.3);
          color: var(--green); font-size: 11px; font-weight: 700; letter-spacing: 1.5px; text-transform: uppercase;
          padding: 6px 16px; border-radius: 100px; margin-bottom: 1.5rem;
        }
        .cta-title { font-family: 'Playfair Display', serif; font-size: clamp(2rem, 5vw, 3.5rem); font-weight: 900; color: white; margin-bottom: 1rem; line-height: 1.1; }
        .cta-desc { color: rgba(255,255,255,0.7); font-size: 16px; margin-bottom: 1rem; }
        .cta-phones { color: rgba(255,255,255,0.5); font-size: 13px; margin-bottom: 2.5rem; line-height: 1.8; }
        .cta-btn {
          display: inline-flex; align-items: center; gap: 8px;
          background: white; color: #16a34a;
          font-weight: 800; font-size: 15px; padding: 15px 36px;
          border-radius: 14px; text-decoration: none;
          transition: all 0.25s; box-shadow: 0 8px 40px rgba(0,0,0,0.3);
        }
        .cta-btn:hover { background: #f0fdf4; transform: translateY(-3px) scale(1.02); box-shadow: 0 16px 50px rgba(0,0,0,0.4); }

        /* FOOTER */
        footer { background: #030a14; border-top: 1px solid var(--glass-border); padding: 4rem 2rem 2rem; }
        .footer-inner { max-width: 1100px; margin: 0 auto; display: grid; grid-template-columns: 1.5fr 1fr 1fr; gap: 3rem; margin-bottom: 3rem; }
        .footer-about p { color: var(--muted2); font-size: 13.5px; line-height: 1.75; margin-top: 1rem; }
        .footer-nav-title, .footer-contact-title { font-size: 11px; font-weight: 700; letter-spacing: 1.5px; text-transform: uppercase; color: var(--muted); margin-bottom: 1.25rem; }
        .footer-nav-links { display: grid; grid-template-columns: 1fr 1fr; gap: 6px; }
        .footer-nav-links a { color: var(--muted2); font-size: 13.5px; text-decoration: none; padding: 3px 0; transition: color 0.2s; }
        .footer-nav-links a:hover { color: var(--text); }
        .footer-contact div { display: flex; gap: 10px; align-items: flex-start; margin-bottom: 10px; color: var(--muted2); font-size: 13.5px; line-height: 1.5; }
        .footer-contact span:first-child { flex-shrink: 0; }
        .footer-bottom { border-top: 1px solid var(--glass-border); padding-top: 1.5rem; display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 1rem; }
        .footer-bottom p { color: var(--muted2); font-size: 12px; }
        .admin-link {
          display: flex; align-items: center; gap: 6px;
          background: var(--glass); border: 1px solid var(--glass-border);
          color: var(--muted2); font-size: 12px; font-weight: 500;
          padding: 8px 14px; border-radius: 8px; text-decoration: none;
          transition: all 0.2s;
        }
        .admin-link:hover { background: rgba(255,255,255,0.06); color: var(--text); }

        /* DIVIDER */
        .divider { height: 1px; background: linear-gradient(90deg, transparent, var(--glass-border), transparent); border: none; margin: 0; }

        /* ANIMATIONS */
        @keyframes fadeUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes fadeDown { from { opacity: 0; transform: translateY(-10px); } to { opacity: 1; transform: translateY(0); } }

        /* RESPONSIVE */
        @media (max-width: 768px) {
          .nav-links { display: none; }
          .mobile-toggle { display: block; }
          .jurusan-grid { grid-template-columns: 1fr; }
          .fasilitas-grid { grid-template-columns: repeat(2, 1fr); }
          .footer-inner { grid-template-columns: 1fr; gap: 2rem; }
          .footer-nav-links { grid-template-columns: repeat(3, 1fr); }
          .stat-num { font-size: 1.4rem; }
        }
        @media (max-width: 480px) {
          .hero-title { font-size: 2.6rem; }
          .footer-nav-links { grid-template-columns: repeat(2, 1fr); }
        }
      `}</style>

      <div>
        {/* NAVBAR */}
        <nav className={`navbar${scrolled ? ' scrolled' : ''}`}>
          <div className="navbar-inner">
            <Link href="/" className="logo">
              <div className="logo-mark">SMK</div>
              <div className="logo-text">
                <p>SMK FARMASI AL AMIN</p>
                <p>Dukuhturi — Farmasi & TKJ</p>
              </div>
            </Link>
            <div className="nav-links">
              {navLinks.map(m => (
                <Link key={m} href={`/${m.toLowerCase()}`}>{m}</Link>
              ))}
              <Link href="/ppdb" className="btn-ppdb">SPMB 2025</Link>
              <Link href="/admin/login" className="btn-admin">🔐 Admin</Link>
            </div>
            <button className="mobile-toggle" onClick={() => setMenuOpen(!menuOpen)}>
              {menuOpen ? '✕' : '☰'}
            </button>
          </div>
          {menuOpen && (
            <div className="mobile-menu">
              {navLinks.map(m => (
                <Link key={m} href={`/${m.toLowerCase()}`} onClick={() => setMenuOpen(false)}>{m}</Link>
              ))}
              <Link href="/ppdb" onClick={() => setMenuOpen(false)} className="btn-ppdb" style={{ textAlign: 'center', marginTop: '8px' }}>
                🎓 Daftar SPMB Online
              </Link>
              <Link href="/admin/login" onClick={() => setMenuOpen(false)} className="btn-admin" style={{ justifyContent: 'center', marginTop: '4px' }}>
                🔐 Login Admin
              </Link>
            </div>
          )}
        </nav>

        {/* HERO */}
        <section className="hero" ref={heroRef}>
          <img src={heroBg} alt="" aria-hidden className="hero-bg" style={{ transform: `translateY(${scrollY * 0.25}px)` }} />
          <div className="hero-overlay" />
          <div className="hero-grain" />
          <div className="hero-glow" />
          <div className="hero-content">
            <div className="badge-live">
              <span className="pulse" />
              SPMB 2025/2026 Telah Dibuka
            </div>
            <h1 className="hero-title">
              SMK Farmasi<br />
              Al Amin <span>Dukuhturi</span>
            </h1>
            <p className="hero-sub">
              Cetak masa depan bersama kami. Pendaftaran gratis, bebas uang gedung, dan program beasiswa penuh untuk putra-putri terbaik.
            </p>
            <div className="beasiswa-card">
              <span className="beasiswa-icon">🎓</span>
              <div>
                <p className="beasiswa-title">Program Beasiswa Sekolah</p>
                <p className="beasiswa-sub">Gratis Seragam · Gratis Daftar Ulang · Gratis SPP 3 Tahun*</p>
              </div>
            </div>
            <div className="hero-cta">
              <Link href="/ppdb" className="cta-primary">🎓 Daftar SPMB Online</Link>
              <Link href="/profil" className="cta-secondary">Lihat Profil Sekolah →</Link>
            </div>
            <div className="scroll-hint">
              <p>Scroll</p>
              <div className="scroll-dot" />
            </div>
          </div>
        </section>

        {/* STATS */}
        <div className="stats-strip">
          <div className="stats-inner">
            {[
              { icon: '🎁', num: 'GRATIS', label: 'Uang Pendaftaran' },
              { icon: '📚', num: '2', label: 'Jurusan Unggulan' },
              { icon: '🕌', num: 'MONDOK', label: 'Sekolah Sambil' },
            ].map(s => (
              <div key={s.label} className="stat-item">
                <p className="stat-icon">{s.icon}</p>
                <p className="stat-num">{s.num}</p>
                <p className="stat-label">{s.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* JURUSAN — kartu sekarang sepenuhnya bisa diklik */}
        <section className="jurusan-section">
          <p className="section-label">Program Keahlian</p>
          <h2 className="section-title">Dua Jurusan <em>Unggulan</em></h2>
          <div className="jurusan-grid">

            {/* FARMASI CARD — full card is a link */}
            <Link href="/jurusan#farmasi" className="jurusan-card farmasi">
              <span className="card-arrow">↗</span>
              <div className="jurusan-icon-wrap">💊</div>
              <h3 className="jurusan-name">Farmasi</h3>
              <div className="jurusan-tags">
                <span className="jurusan-tag">Standar BPOM</span>
                <span className="jurusan-tag">Lab Lengkap</span>
                <span className="jurusan-tag">Siap Kerja</span>
              </div>
              <p className="jurusan-desc">
                Keahlian di bidang kefarmasian, obat-obatan, dan pelayanan kesehatan berbasis standar BPOM & industri farmasi nasional.
              </p>
              <div className="jurusan-footer">
                <span className="badge-akred">Akreditasi A</span>
                <span className="jurusan-link-badge">Selengkapnya →</span>
              </div>
            </Link>

            {/* TKJ CARD — full card is a link */}
            <Link href="/jurusan" className="jurusan-card tkj">
              <span className="card-arrow">↗</span>
              <div className="jurusan-icon-wrap">🌐</div>
              <h3 className="jurusan-name">Teknik Komputer & Jaringan</h3>
              <div className="jurusan-tags">
                <span className="jurusan-tag">Jaringan Modern</span>
                <span className="jurusan-tag">Cyber Security</span>
                <span className="jurusan-tag">IT Industri</span>
              </div>
              <p className="jurusan-desc">
                Instalasi, konfigurasi jaringan komputer, sistem operasi, dan keamanan jaringan berbasis standar industri IT modern.
              </p>
              <div className="jurusan-footer">
                <span className="badge-akred">Akreditasi A</span>
                <span className="jurusan-link-badge">Selengkapnya →</span>
              </div>
            </Link>

          </div>
        </section>

        <hr className="divider" />

        {/* FASILITAS */}
        <section className="fasilitas-section">
          <p className="section-label">Apa yang Kami Sediakan</p>
          <h2 className="section-title">Fasilitas <em>Lengkap</em></h2>
          <div className="fasilitas-grid">
            {fasilitas.map(f => (
              <div key={f.label} className="fas-card">
                <span className="fas-icon">{f.icon}</span>
                <p className="fas-name">{f.label}</p>
                <p className="fas-desc">{f.desc}</p>
              </div>
            ))}
          </div>
        </section>

        <hr className="divider" />

        {/* EKSKUL */}
        <section className="ekskul-section">
          <p className="section-label">Pengembangan Diri</p>
          <h2 className="section-title">Kegiatan <em>Ekstrakurikuler</em></h2>
          <div className="ekskul-wrap">
            {ekskul.map(k => (
              <span key={k} className="ekskul-pill">{k}</span>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="cta-section">
          <div className="cta-bg" />
          <div className="cta-pattern" />
          <div className="cta-glow" />
          <div className="cta-content">
            <span className="cta-tag">Pendaftaran Terbuka</span>
            <h2 className="cta-title">Daftar Sekarang,<br />100% Gratis!</h2>
            <p className="cta-desc">Bebas uang pendaftaran & uang gedung. Kuota terbatas, syarat & ketentuan berlaku.</p>
            <p className="cta-phones">
              📞 0895-3578-24656 (Bu Rahma)<br />
              0821-3792-9140 (Bu Anis) · 0856-4042-6203 (Bu Salma)
            </p>
            <Link href="/ppdb" className="cta-btn">🎓 Daftar SPMB Online</Link>
          </div>
        </section>

        {/* FOOTER */}
        <footer>
          <div className="footer-inner">
            <div className="footer-about">
              <Link href="/" className="logo" style={{ display: 'inline-flex', marginBottom: '0' }}>
                <div className="logo-mark">SMK</div>
                <div className="logo-text">
                  <p>SMK FARMASI AL AMIN</p>
                  <p>Dukuhturi</p>
                </div>
              </Link>
              <p>Mencetak generasi muda yang kompeten, berakhlak mulia, dan siap kerja di bidang Farmasi & TKJ.</p>
            </div>
            <div>
              <p className="footer-nav-title">Navigasi</p>
              <div className="footer-nav-links">
                {['Beranda', 'Profil', 'Jurusan', 'SPMB', 'Berita', 'Galeri', 'Kontak'].map(m => (
                  <Link key={m} href={m === 'Beranda' ? '/' : m === 'SPMB' ? '/ppdb' : `/${m.toLowerCase()}`}>
                    {m}
                  </Link>
                ))}
              </div>
            </div>
            <div className="footer-contact">
              <p className="footer-contact-title">Kontak</p>
              <div><span>📍</span><span>Jl. Pesantren No. 8 Bandasari RT 06/01, Dukuhturi</span></div>
              <div><span>📞</span><span>0895-3578-24656</span></div>
              <div><span>📲</span><span>@smkfarmindukuhturi</span></div>
            </div>
          </div>
          <div className="footer-bottom">
            <p>© {new Date().getFullYear()} SMK Farmasi Al Amin Dukuhturi. All rights reserved.</p>
            <Link href="/admin/login" className="admin-link">🔐 Login Admin Panel</Link>
          </div>
        </footer>
      </div>
    </>
  );
}