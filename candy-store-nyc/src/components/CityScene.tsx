import React, { useMemo } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { CandyStore } from './CandyStore';

type Props = {
  sceneWidth: number;
};

/**
 * A simple NYC block: skyline + storefronts + street/sidewalk + candy store center.
 * Keep it light-weight and 100% RN Views so it works on mobile + web.
 */
export function CityScene({ sceneWidth }: Props) {
  const skyline = useMemo(() => {
    // Deterministic skyline blocks based on width; no randomness needed.
    const count = 7;
    const maxW = Math.max(40, Math.floor(sceneWidth / count));
    return Array.from({ length: count }).map((_, i) => {
      const w = Math.max(34, Math.min(maxW, 48 + (i % 3) * 10));
      const h = 92 + (i % 4) * 18;
      const tint = i % 2 === 0 ? '#6d7a8f' : '#556273';
      return { key: `sky-${i}`, w, h, tint };
    });
  }, [sceneWidth]);

  return (
    <View style={[styles.scene, { width: sceneWidth }]}>
      {/* Sky */}
      <View style={styles.sky} />

      {/* Skyline (tall buildings) */}
      <View style={styles.skylineRow}>
        {skyline.map((b) => (
          <View key={b.key} style={[styles.skyscraper, { width: b.w, height: b.h, backgroundColor: b.tint }]}>
            <View style={styles.windowsGrid}>
              <Text style={styles.windowsText}>▦▦▦</Text>
              <Text style={styles.windowsText}>▦▦▦</Text>
              <Text style={styles.windowsText}>▦▦▦</Text>
            </View>
          </View>
        ))}
      </View>

      {/* Storefronts row */}
      <View style={styles.storefrontRow}>
        <Storefront label="BODEGA" color="#b4ff6a" accent="#1b1b1b" />
        <Storefront label="PIZZA" color="#ffd34d" accent="#1b1b1b" />
        <Storefront label="NEWS" color="#a7dcff" accent="#1b1b1b" />
      </View>

      {/* Candy store (center focal point) */}
      <View style={styles.candyStoreWrap}>
        <CandyStore sceneWidth={sceneWidth} />
      </View>

      {/* Street + sidewalk */}
      <View style={styles.street}>
        <View style={styles.laneLine} />
        <View style={[styles.laneLine, { opacity: 0.85 }]} />
      </View>
      <View style={styles.sidewalk} />
    </View>
  );
}

function Storefront({ label, color, accent }: { label: string; color: string; accent: string }) {
  return (
    <View style={[styles.storefront, { backgroundColor: color, borderColor: accent }]}>
      <Text style={[styles.storefrontText, { color: accent }]}>{label}</Text>
      <View style={styles.storeWindowRow}>
        <View style={styles.storeWindow} />
        <View style={styles.storeWindow} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  scene: {
    borderRadius: 18,
    overflow: 'hidden',
    borderWidth: 2,
    borderColor: '#d8d8d8',
    backgroundColor: '#eaf6ff',
  },
  sky: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: '#eaf6ff',
  },
  skylineRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    paddingTop: 12,
    paddingBottom: 8,
  },
  skyscraper: {
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    borderWidth: 2,
    borderColor: '#1b1b1b',
    justifyContent: 'flex-end',
    paddingBottom: 6,
    overflow: 'hidden',
  },
  windowsGrid: {
    opacity: 0.85,
    alignItems: 'center',
  },
  windowsText: {
    fontSize: 10,
    color: 'rgba(255,255,255,0.85)',
  },
  storefrontRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    paddingBottom: 10,
    gap: 10,
  },
  storefront: {
    flex: 1,
    borderWidth: 2,
    borderRadius: 14,
    paddingVertical: 8,
    paddingHorizontal: 10,
  },
  storefrontText: {
    fontSize: 12,
    fontWeight: '900',
    letterSpacing: 1,
  },
  storeWindowRow: {
    marginTop: 8,
    flexDirection: 'row',
    gap: 8,
  },
  storeWindow: {
    flex: 1,
    height: 22,
    borderRadius: 7,
    backgroundColor: 'rgba(255,255,255,0.6)',
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.25)',
  },
  candyStoreWrap: {
    alignItems: 'center',
    paddingBottom: 12,
  },
  street: {
    height: 44,
    backgroundColor: '#3f3f46',
    justifyContent: 'center',
    gap: 10,
    paddingHorizontal: 16,
  },
  laneLine: {
    height: 3,
    borderRadius: 3,
    backgroundColor: '#ffe36a',
    opacity: 0.65,
  },
  sidewalk: {
    height: 34,
    backgroundColor: '#cfd3d8',
    borderTopWidth: 2,
    borderColor: 'rgba(0,0,0,0.15)',
  },
});
