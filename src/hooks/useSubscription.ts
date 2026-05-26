import { useEffect, useState, useCallback, useRef } from 'react';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from '../lib/firebase';
import type { SubscriptionData } from '../types';

const DEFAULT_SUB: SubscriptionData = {
  plan: 'free',
  expiresAt: null,
  activatedAt: null,
  couponUsed: null,
};

export function useSubscription(uid: string) {
  const [sub, setSub] = useState<SubscriptionData>(DEFAULT_SUB);
  const [subLoading, setSubLoading] = useState(true);
  const initialized = useRef(false);

  useEffect(() => {
    if (initialized.current) return;
    initialized.current = true;
    getDoc(doc(db, 'users', uid, 'data', 'subscription')).then(snap => {
      if (snap.exists()) {
        setSub(snap.data() as SubscriptionData);
      }
      setSubLoading(false);
    }).catch(() => setSubLoading(false));
  }, [uid]);

  const isPro =
    sub.plan === 'pro' &&
    sub.expiresAt !== null &&
    new Date(sub.expiresAt) > new Date();

  const activate = useCallback(async (coupon?: string) => {
    const now = new Date();
    const expiresAt = new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000).toISOString();
    const next: SubscriptionData = {
      plan: 'pro',
      expiresAt,
      activatedAt: now.toISOString(),
      couponUsed: coupon ?? null,
    };
    setSub(next);
    await setDoc(doc(db, 'users', uid, 'data', 'subscription'), next);
  }, [uid]);

  const cancel = useCallback(async () => {
    const next: SubscriptionData = {
      plan: 'free',
      expiresAt: null,
      activatedAt: null,
      couponUsed: null,
    };
    setSub(next);
    await setDoc(doc(db, 'users', uid, 'data', 'subscription'), next);
  }, [uid]);

  return { sub, isPro, subLoading, activate, cancel };
}
