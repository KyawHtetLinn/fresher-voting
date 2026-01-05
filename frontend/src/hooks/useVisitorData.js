import { useState, useEffect } from 'react';
import FingerprintJS from '@fingerprintjs/fingerprintjs';

export function useVisitorData() {
  const [visitorId, setVisitorId] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const setFp = async () => {
      try {
        // 1. Load the library
        const fp = await FingerprintJS.load();
        
        // 2. Get the result (this analyzes the device)
        const { visitorId } = await fp.get();
        
        // 3. Save it to state
        setVisitorId(visitorId);
        console.log("Device Fingerprint:", visitorId); // Check your console!
        
        setLoading(false);
      } catch (error) {
        console.error("Error generating fingerprint:", error);
        setLoading(false);
      }
    };

    setFp();
  }, []);

  return { visitorId, loading };
}