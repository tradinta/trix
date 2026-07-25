'use client';

import React, { useState } from 'react';
import styles from './RegisterForm.module.css';
import { signUp } from '@/lib/auth-client';
import { useLanguage } from '@/context/LanguageContext';
import { User, Mail, Lock, ArrowRight, Loader2, AlertCircle } from 'lucide-react';

interface RegisterFormProps {
  onSwitchToLogin: () => void;
  onSuccess?: () => void;
}

export const RegisterForm: React.FC<RegisterFormProps> = ({ onSwitchToLogin, onSuccess }) => {
  const { t } = useLanguage();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage(null);

    try {
      const { error } = await signUp.email({
        email,
        password,
        name,
      });

      if (error) {
        setErrorMessage(error.message || 'Registration failed');
      } else {
        if (onSuccess) onSuccess();
        window.location.href = '/';
      }
    } catch (err: any) {
      setErrorMessage(err.message || 'Failed to create account');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.formContainer}>
      <div className={styles.header}>
        <h2 className={styles.title}>{t('auth.createTitle')}</h2>
        <p className={styles.subtitle}>{t('auth.createSub')}</p>
      </div>

      {errorMessage && (
        <div className={styles.errorAlert}>
          <AlertCircle size={16} />
          <span>{errorMessage}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.inputGroup}>
          <label className={styles.label}>{t('auth.fullName')}</label>
          <div className={styles.inputWrapper}>
            <User size={18} className={styles.inputIcon} />
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder={t('auth.namePlaceholder')}
              className={styles.input}
            />
          </div>
        </div>

        <div className={styles.inputGroup}>
          <label className={styles.label}>{t('auth.email')}</label>
          <div className={styles.inputWrapper}>
            <Mail size={18} className={styles.inputIcon} />
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={t('auth.emailPlaceholder')}
              className={styles.input}
            />
          </div>
        </div>

        <div className={styles.inputGroup}>
          <label className={styles.label}>{t('auth.password')}</label>
          <div className={styles.inputWrapper}>
            <Lock size={18} className={styles.inputIcon} />
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder={t('auth.passwordPlaceholder')}
              className={styles.input}
            />
          </div>
        </div>

        <button type="submit" disabled={isLoading} className={styles.submitBtn}>
          {isLoading ? (
            <>
              <Loader2 size={18} className="animate-spin" />
              <span>{t('auth.creatingAccount')}</span>
            </>
          ) : (
            <>
              <span>{t('auth.joinBtn')}</span>
              <ArrowRight size={18} />
            </>
          )}
        </button>
      </form>

      <div className={styles.footer}>
        <span>{t('auth.alreadyHaveAccount')}</span>
        <button onClick={onSwitchToLogin} className={styles.switchBtn}>
          {t('auth.signInBtn')}
        </button>
      </div>
    </div>
  );
};
