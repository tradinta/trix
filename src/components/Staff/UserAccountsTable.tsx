'use client';

import React from 'react';
import styles from './UserAccountsTable.module.css';
import { Users, CheckCircle2, User } from 'lucide-react';

interface UserAccount {
  id: string;
  name: string;
  email: string;
  emailVerified: boolean;
  image?: string;
  createdAt: string;
}

interface UserAccountsTableProps {
  users?: UserAccount[];
}

export const UserAccountsTable: React.FC<UserAccountsTableProps> = ({ users = [] }) => {
  return (
    <div className={styles.card}>
      <div className={styles.titleRow}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Users size={18} color="#e10600" />
          <h3 className={styles.title}>Registered User Accounts</h3>
        </div>
        <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
          {users.length} Total Registered Accounts
        </span>
      </div>

      <div className={styles.tableWrapper}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th className={styles.th}>User ID</th>
              <th className={styles.th}>Full Name</th>
              <th className={styles.th}>Email Address</th>
              <th className={styles.th}>Status</th>
              <th className={styles.th}>Created Date</th>
            </tr>
          </thead>
          <tbody>
            {users.length === 0 ? (
              <tr>
                <td colSpan={5} className={styles.td} style={{ textAlign: 'center', color: 'var(--text-muted)', padding: '2.5rem' }}>
                  No user accounts created yet. Register an account on the Login page to see live user data here.
                </td>
              </tr>
            ) : (
              users.map((u) => (
                <tr key={u.id}>
                  <td className={styles.td} style={{ fontFamily: 'monospace', fontSize: '0.75rem', color: '#e10600' }}>
                    {u.id}
                  </td>
                  <td className={styles.td} style={{ fontWeight: 600, color: '#ffffff' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <User size={14} color="#e10600" />
                      <span>{u.name}</span>
                    </div>
                  </td>
                  <td className={styles.td} style={{ color: 'var(--text-primary)' }}>
                    {u.email}
                  </td>
                  <td className={styles.td}>
                    <span className={styles.verifiedBadge}>
                      <CheckCircle2 size={10} style={{ display: 'inline', marginRight: '4px' }} />
                      Verified User
                    </span>
                  </td>
                  <td className={styles.td} style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                    {new Date(u.createdAt).toLocaleString()}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};
