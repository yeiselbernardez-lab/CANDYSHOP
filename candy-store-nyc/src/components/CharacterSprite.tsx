import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import type { CharacterPhase, CharacterType } from '../types';

type Props = {
  type: CharacterType;
  phase: CharacterPhase;
  size?: number;
};

type CharacterVisual = {
  label: string;
  skin: string;
  hairColor: string;
  hairStyle: 'afro' | 'blonde' | 'curly' | 'bald';
  beard?: 'big' | 'veryLong';
  cane?: boolean;
};

const VISUALS: Record<CharacterType, CharacterVisual> = {
  blackWomanAfro: {
    label: 'Black woman',
    skin: '#6b3f2a',
    hairColor: '#1b1b1b',
    hairStyle: 'afro',
  },
  whiteWomanBlonde: {
    label: 'White woman',
    skin: '#f2c6a8',
    hairColor: '#ffd34d',
    hairStyle: 'blonde',
  },
  manAfroBeard: {
    label: 'Bearded man',
    skin: '#7a4c2f',
    hairColor: '#1b1b1b',
    hairStyle: 'afro',
    beard: 'big',
  },
  littleGirlCurly: {
    label: 'Little girl',
    skin: '#c48a6e',
    hairColor: '#3a2a20',
    hairStyle: 'curly',
  },
  oldManBeardCane: {
    label: 'Old man',
    skin: '#e2c5ad',
    hairColor: '#f2f2f2',
    hairStyle: 'bald',
    beard: 'veryLong',
    cane: true,
  },
};

/**
 * A tiny, stylized character. Two visual states:
 * - entering/inside: no candy
 * - exiting: holding lots of candy
 */
export function CharacterSprite({ type, phase, size = 54 }: Props) {
  const v = VISUALS[type];
  const isExiting = phase === 'exiting';

  return (
    <View style={[styles.wrap, { width: size, height: size + 22 }]}>
      {/* Head */}
      <View style={[styles.head, { backgroundColor: v.skin, width: size * 0.48, height: size * 0.48, borderRadius: size }]}>
        {/* Hair */}
        {v.hairStyle === 'afro' ? (
          <View style={[styles.hairAfro, { backgroundColor: v.hairColor }]} />
        ) : null}
        {v.hairStyle === 'blonde' ? (
          <View style={[styles.hairBlonde, { backgroundColor: v.hairColor }]} />
        ) : null}
        {v.hairStyle === 'curly' ? (
          <View style={[styles.hairCurly, { backgroundColor: v.hairColor }]} />
        ) : null}
        {v.hairStyle === 'bald' ? (
          <View style={[styles.hairBald]} />
        ) : null}
      </View>

      {/* Body */}
      <View style={[styles.body, { width: size * 0.62 }]} />

      {/* Beard (if any) */}
      {v.beard === 'big' ? <View style={styles.bigBeard} /> : null}
      {v.beard === 'veryLong' ? <View style={styles.longBeard} /> : null}

      {/* Candy / no candy */}
      <View style={styles.handsRow}>
        {isExiting ? (
          <View style={styles.candyPile}>
            <Text style={styles.candyText}>🍬🍭🍫</Text>
            <Text style={styles.candyText}>🧁🍪🍬</Text>
          </View>
        ) : (
          <View style={styles.emptyHands}>
            <Text style={styles.emptyHandsText}>—</Text>
          </View>
        )}

        {v.cane ? (
          <View style={styles.cane}>
            <View style={styles.caneHook} />
          </View>
        ) : null}
      </View>

      {/* Label (small, readable on mobile) */}
      <Text numberOfLines={1} style={styles.label}>
        {v.label}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  head: {
    borderWidth: 2,
    borderColor: '#1b1b1b',
    alignItems: 'center',
    justifyContent: 'flex-start',
    overflow: 'visible',
  },
  hairAfro: {
    position: 'absolute',
    top: -12,
    width: 46,
    height: 34,
    borderRadius: 999,
    borderWidth: 2,
    borderColor: '#1b1b1b',
  },
  hairBlonde: {
    position: 'absolute',
    top: -8,
    width: 44,
    height: 26,
    borderRadius: 14,
    borderWidth: 2,
    borderColor: '#1b1b1b',
    transform: [{ rotate: '-6deg' }],
  },
  hairCurly: {
    position: 'absolute',
    top: -10,
    width: 44,
    height: 28,
    borderRadius: 16,
    borderWidth: 2,
    borderColor: '#1b1b1b',
  },
  hairBald: {
    position: 'absolute',
    top: -2,
    width: 22,
    height: 8,
    borderRadius: 8,
    backgroundColor: 'rgba(0,0,0,0.08)',
  },
  body: {
    marginTop: -2,
    height: 26,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#1b1b1b',
    backgroundColor: '#6aa9ff',
  },
  bigBeard: {
    position: 'absolute',
    top: 20,
    width: 26,
    height: 18,
    borderBottomLeftRadius: 14,
    borderBottomRightRadius: 14,
    borderWidth: 2,
    borderColor: '#1b1b1b',
    backgroundColor: '#1b1b1b',
    opacity: 0.95,
  },
  longBeard: {
    position: 'absolute',
    top: 22,
    width: 20,
    height: 34,
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
    borderWidth: 2,
    borderColor: '#1b1b1b',
    backgroundColor: '#f2f2f2',
    opacity: 0.95,
  },
  handsRow: {
    marginTop: 2,
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'center',
    gap: 6,
    minHeight: 26,
  },
  emptyHands: {
    minWidth: 34,
    height: 22,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: 'rgba(0,0,0,0.2)',
    backgroundColor: 'rgba(255,255,255,0.55)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyHandsText: {
    fontWeight: '900',
    color: 'rgba(0,0,0,0.4)',
    marginTop: -2,
  },
  candyPile: {
    paddingHorizontal: 6,
    paddingVertical: 3,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#1b1b1b',
    backgroundColor: '#ffffff',
  },
  candyText: {
    fontSize: 12,
    lineHeight: 14,
  },
  cane: {
    width: 8,
    height: 26,
    borderRadius: 10,
    backgroundColor: '#7a4c2f',
    borderWidth: 2,
    borderColor: '#1b1b1b',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  caneHook: {
    width: 10,
    height: 10,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    borderWidth: 2,
    borderColor: '#1b1b1b',
    borderBottomWidth: 0,
    marginTop: -2,
    backgroundColor: 'transparent',
  },
  label: {
    marginTop: 2,
    fontSize: 10,
    fontWeight: '800',
    color: 'rgba(0,0,0,0.7)',
    maxWidth: 80,
  },
});

