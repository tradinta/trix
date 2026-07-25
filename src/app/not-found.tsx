'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowLeft, Flag } from 'lucide-react';
import { CustomCursor } from '@/components/CustomCursor/CustomCursor';
import { Footer } from '@/components/Footer/Footer';

export default function NotFound() {
  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', backgroundColor: 'var(--bg-dark)', color: 'var(--text-primary)' }}>
      <CustomCursor />

      <main style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '4rem 1.5rem', textAlign: 'center' }}>
        <div style={{ maxWidth: '28rem', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1.5rem' }}>
          <div style={{
            width: '4rem',
            height: '4rem',
            backgroundColor: 'rgba(225, 6, 0, 0.15)',
            border: '1px solid #e10600',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#e10600',
          }}>
            <Flag size={32} />
          </div>

          <h1 style={{ fontFamily: 'Syncopate, sans-serif', fontSize: '3rem', fontWeight: 700, margin: 0, color: '#e10600' }}>404</h1>
          <h2 style={{ fontFamily: 'Syncopate, sans-serif', fontSize: '1.25rem', fontWeight: 700, margin: 0 }}>Off Track Location</h2>

          <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', lineHeight: 1.6, margin: 0 }}>
            The requested Grand Prix page or ticket pass sector does not exist or has been moved.
          </p>

          <Link
            href="/"
            style={{
              backgroundColor: '#e10600',
              color: '#ffffff',
              padding: '0.875rem 1.5rem',
              borderRadius: '2px',
              fontWeight: 700,
              fontSize: '0.875rem',
              textDecoration: 'none',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              marginTop: '0.5rem',
              boxShadow: '0 0 15px rgba(225, 6, 0, 0.4)',
            }}
          >
            <ArrowLeft size={16} />
            <span>Return to Paddock Home</span>
          </Link>
        </div>
      </main>

      <Footer />
    </div>
  );
}
