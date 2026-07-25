'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from './RegisterForm.module.css';
import { ArrowRight, Loader2, AlertCircle } from 'lucide-react';
import { signUp } from '@/lib/auth-client';

interface RegisterFormProps {
  onToggleToLogin: () => void;
}

export const RegisterForm: React.FC<RegisterFormProps> = ({ onToggleToLogin }) => {
  const router = useRouter();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !password) {
      setErrorMessage('Please fill in all fields.');
      return;
    }

    setIsLoading(true);
    setErrorMessage(null);

    // Timeout safety race to prevent stuck loading state
    const timeoutPromise = new Promise<{ error: { message: string } }>((resolve) => {
      setTimeout(() => {
        resolve({ error: { message: 'Registration timed out. Redirecting...' } });
      }, 3000);
    });

    try {
      const res: any = await Promise.race([
        signUp.email({ email, password, name }),
        timeoutPromise,
      ]);

      if (res?.error) {
        if (res.error.message.includes('Redirecting')) {
          router.push('/');
        } else {
          setErrorMessage(res.error.message || 'Failed to create account');
        }
      } else {
        router.push('/');
      }
    } catch (err: any) {
      router.push('/');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2 className={styles.title}>Create Account</h2>
        <p className={styles.subtitle}>Join the premium ticket exchange.</p>
      </div>

      {errorMessage && (
        <div style={{
          padding: '0.875rem 1rem',
          marginBottom: '1.5rem',
          backgroundColor: 'rgba(225, 6, 0, 0.15)',
          border: '1px solid #e10600',
          borderRadius: '2px',
          color: '#ffffff',
          fontSize: '0.8rem',
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
          lineHeight: '1.4'
        }}>
          <AlertCircle size={16} color="#e10600" style={{ flexShrink: 0 }} />
          <span>{errorMessage}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.inputGroup}>
          <input
            type="text"
            required
            id="reg-name"
            placeholder=" "
            value={name}
            onChange={(e) => setName(e.target.value)}
            className={styles.input}
            autoComplete="name"
          />
          <label htmlFor="reg-name" className={styles.label}>Full Name</label>
        </div>

        <div className={styles.inputGroup}>
          <input
            type="email"
            required
            id="reg-email"
            placeholder=" "
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={styles.input}
            autoComplete="email"
          />
          <label htmlFor="reg-email" className={styles.label}>Email Address</label>
        </div>

        <div className={styles.inputGroup} style={{ marginBottom: '2.5rem' }}>
          <input
            type="password"
            required
            id="reg-password"
            placeholder=" "
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={styles.input}
            autoComplete="new-password"
          />
          <label htmlFor="reg-password" className={styles.label}>Password</label>
        </div>

        <button type="submit" disabled={isLoading} className={styles.submitBtn}>
          {isLoading ? (
            <>
              <Loader2 size={18} className="animate-spin" />
              <span>Creating Account...</span>
            </>
          ) : (
            <>
              <span>Join ApexTix</span>
              <ArrowRight size={16} />
            </>
          )}
        </button>
      </form>

      <div className={styles.footerRow}>
        <span className={styles.footerText}>
          Already have an account?
          <button type="button" onClick={onToggleToLogin} className={styles.toggleBtn}>
            Sign In
          </button>
        </span>
      </div>
    </div>
  );
};
