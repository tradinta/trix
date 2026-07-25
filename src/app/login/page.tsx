'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import styles from './page.module.css';
import { CustomCursor } from '@/components/CustomCursor/CustomCursor';
import { AuthLeftPanel } from '@/components/Auth/AuthLeftPanel';
import { LoginForm } from '@/components/Auth/LoginForm';
import { RegisterForm } from '@/components/Auth/RegisterForm';
import { ArrowLeft } from 'lucide-react';

export default function LoginPage() {
  const [view, setView] = useState<'login' | 'register'>('login');

  return (
    <div className={styles.page}>
      <CustomCursor />

      {/* Left Visual Panel */}
      <AuthLeftPanel />

      {/* Right Form Panel */}
      <div className={styles.rightPanel}>
        {/* Back to Home Link */}
        <Link href="/" className={styles.homeLink}>
          <ArrowLeft size={14} />
          <span>Home</span>
        </Link>

        {/* Form Container Wrapper */}
        <div className={styles.formWrapper}>
          {view === 'login' ? (
            <LoginForm onToggleToRegister={() => setView('register')} />
          ) : (
            <RegisterForm onToggleToLogin={() => setView('login')} />
          )}
        </div>
      </div>
    </div>
  );
}
