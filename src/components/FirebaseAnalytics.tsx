'use client';

import { useEffect } from 'react';
import { getAnalytics, isSupported } from 'firebase/analytics';
import { app } from '@/lib/firebaseClient';

export default function FirebaseAnalytics() {
  useEffect(() => {
    isSupported().then(supported => {
      if (supported) {
        getAnalytics(app);
      }
    });
  }, []);

  return null;
}
