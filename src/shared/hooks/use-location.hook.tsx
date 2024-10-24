'use client';

import { useState, useEffect } from 'react';

interface LocationState {
  latitude: number | null;
  longitude: number | null;
  error: string | null;
}

export function useLocation() {
  const [locationEnabled, setLocationEnabled] = useState<boolean | null>(null);
  const [location, setLocation] = useState<LocationState>({
    latitude: null,
    longitude: null,
    error: null,
  });


  useEffect(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('locationEnabled');
      setLocationEnabled(saved === 'true');
    }
  }, []);

  useEffect(() => {
    let watchId: number | null = null;

    if (locationEnabled) {
      if ('geolocation' in navigator) {
        watchId = navigator.geolocation.watchPosition(
          (position) => {
            setLocation({
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
              error: null,
            });
          },
          (error) => {
            setLocation((prev) => ({ ...prev, error: error.message }));
          }
        );
      } else {
        setLocation((prev) => ({
          ...prev,
          error: 'Geolocalização não suportada neste navegador.',
        }));
      }
    } else if (locationEnabled === false) {

      if (watchId !== null) {
        navigator.geolocation.clearWatch(watchId);
      }
      setLocation({
        latitude: null,
        longitude: null,
        error: null,
      });
    }

    return () => {
      if (watchId !== null) {
        navigator.geolocation.clearWatch(watchId);
      }
    };
  }, [locationEnabled]);


  useEffect(() => {
    if (typeof window !== 'undefined' && locationEnabled !== null) {
      localStorage.setItem('locationEnabled', locationEnabled.toString());
    }
  }, [locationEnabled]);

  const toggleLocation = () => {
    setLocationEnabled((prev) => !prev);
  };

  return { location, locationEnabled, toggleLocation };
}
