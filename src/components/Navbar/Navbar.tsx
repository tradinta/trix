'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import styles from './Navbar.module.css';
import { useApp } from '@/context/AppContext';
import { useSession, signOut } from '@/lib/auth-client';
import { ShoppingBag, Sun, Moon, User, LogOut, Menu, X, ArrowRight } from 'lucide-react';

export const Navbar: React.FC = () => {
  const { theme, toggleTheme, cartItems, setIsCartOpen } = useApp();
  const { data: session } = useSession();
  const [isMobileJumbotronOpen, setIsMobileJumbotronOpen] = useState(false);

  const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  const firstLetter = session?.user?.name
    ? session.user.name.charAt(0).toUpperCase()
    : session?.user?.email
    ? session.user.email.charAt(0).toUpperCase()
    : 'U';

  return (
    <>
      <nav className={styles.navbar} id="navbar">
        <div className={styles.container}>
          
          {/* Brand Logo */}
          <Link href="/" className={styles.logoGroup}>
            <div className={styles.logoBadge}>
              <span className={styles.logoLetter}>A</span>
            </div>
            <span className={styles.brandName}>
              Apex<span className={styles.brandSub}>Tix</span>
            </span>
          </Link>

          {/* Desktop Navigation Links */}
          <div className={styles.navLinks}>
            <Link href="/schedule" className={styles.linkItem}>
              2026 Schedule
            </Link>
            <Link href="/hospitality" className={styles.linkItem}>
              Hospitality
            </Link>
            <Link href="/sell" className={styles.linkItem}>
              Sell Tickets
            </Link>
            <Link href="/experiences" className={styles.linkItem}>
              Experiences
            </Link>
          </div>

          {/* Right Actions */}
          <div className={styles.actions}>
            {/* Conditional User Session / Log In Button */}
            {session?.user ? (
              <button
                onClick={() => signOut()}
                className={styles.userAvatarBtn}
                title={`Logged in as ${session.user.name || session.user.email} • Click to Sign Out`}
              >
                <span className={styles.avatarLetter}>{firstLetter}</span>
                <LogOut size={10} className={styles.avatarSignOutIcon} />
              </button>
            ) : (
              <Link href="/login" className={styles.loginBtn}>
                <User size={16} />
                <span style={{ display: 'none' }}>Log In</span>
              </Link>
            )}

            {/* Theme Switcher */}
            <button
              onClick={toggleTheme}
              className={styles.iconBtn}
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
            </button>

            {/* Shopping Cart Drawer Trigger (ICON ONLY - NO BAG TEXT) */}
            <button
              onClick={() => setIsCartOpen(true)}
              className={styles.cartBtn}
              title="Shopping Bag"
            >
              <ShoppingBag size={18} />
              {cartCount > 0 && (
                <span className={styles.cartBadge}>{cartCount}</span>
              )}
            </button>

            {/* Mobile Hamburger Toggle */}
            <button
              onClick={() => setIsMobileJumbotronOpen(true)}
              className={styles.mobileMenuToggle}
              aria-label="Open mobile menu"
            >
              <Menu size={20} />
            </button>
          </div>

        </div>
      </nav>

      {/* Mobile Jumbotron Fullscreen Overlay */}
      {isMobileJumbotronOpen && (
        <div className={styles.mobileJumbotron}>
          <div className={styles.jumbotronHeader}>
            <Link href="/" onClick={() => setIsMobileJumbotronOpen(false)} className={styles.logoGroup}>
              <div className={styles.logoBadge}>
                <span className={styles.logoLetter}>A</span>
              </div>
              <span className={styles.brandName}>
                Apex<span className={styles.brandSub}>Tix</span>
              </span>
            </Link>

            <button
              onClick={() => setIsMobileJumbotronOpen(false)}
              className={styles.closeJumbotronBtn}
            >
              <X size={24} />
            </button>
          </div>

          <div className={styles.jumbotronBody}>
            <div className={styles.jumbotronTag}>
              <span>2026 World Championship • 12 Rounds</span>
            </div>

            <Link
              href="/schedule"
              onClick={() => setIsMobileJumbotronOpen(false)}
              className={styles.jumbotronLink}
            >
              <span>2026 Schedule</span>
              <ArrowRight size={20} />
            </Link>

            <Link
              href="/hospitality"
              onClick={() => setIsMobileJumbotronOpen(false)}
              className={styles.jumbotronLink}
            >
              <span>Hospitality</span>
              <ArrowRight size={20} />
            </Link>

            <Link
              href="/sell"
              onClick={() => setIsMobileJumbotronOpen(false)}
              className={styles.jumbotronLink}
            >
              <span>Sell Tickets</span>
              <ArrowRight size={20} />
            </Link>

            <Link
              href="/experiences"
              onClick={() => setIsMobileJumbotronOpen(false)}
              className={styles.jumbotronLink}
            >
              <span>Experiences</span>
              <ArrowRight size={20} />
            </Link>

            <Link
              href="/staff"
              onClick={() => setIsMobileJumbotronOpen(false)}
              className={styles.jumbotronLink}
            >
              <span>Staff Portal</span>
              <ArrowRight size={20} />
            </Link>

            <Link
              href="/login"
              onClick={() => setIsMobileJumbotronOpen(false)}
              className={styles.jumbotronLink}
              style={{ color: '#e10600' }}
            >
              <span>{session?.user ? 'Account Settings' : 'Sign In / Register'}</span>
              <ArrowRight size={20} />
            </Link>
          </div>

          <div className={styles.jumbotronFooter}>
            <button
              onClick={() => {
                setIsMobileJumbotronOpen(false);
                setIsCartOpen(true);
              }}
              style={{
                backgroundColor: 'var(--text-primary)',
                color: 'var(--bg-dark)',
                border: 'none',
                padding: '0.75rem 1.5rem',
                borderRadius: '2px',
                fontWeight: 700,
                fontSize: '0.875rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                cursor: 'pointer',
              }}
            >
              <ShoppingBag size={16} />
              <span>View Bag ({cartCount})</span>
            </button>

            <button
              onClick={toggleTheme}
              className={styles.iconBtn}
              title="Toggle Theme"
            >
              {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
            </button>
          </div>
        </div>
      )}
    </>
  );
};
