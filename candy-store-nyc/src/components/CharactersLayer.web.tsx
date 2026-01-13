import React from 'react';
import { StyleSheet, View } from 'react-native';
import { AnimatePresence, motion } from 'framer-motion';
import type { CharacterInstance, CharacterPhase, CharacterType } from '../types';

type Props = {
  instances: CharacterInstance[];
  sceneWidth: number;
  doorStandX: number;
  onPhaseChange: (id: string, phase: CharacterPhase) => void;
  onDone: (id: string) => void;
};

type WebCharacter = {
  id: string;
  phase: CharacterPhase;
  hasCandy: boolean;
  imageNoCandy: string;
  imageWithCandy: string;
};

/**
 * Web-only implementation that matches the user's requested pattern:
 * <AnimatePresence> + <motion.img ... /> with phase-based animations.
 *
 * Note: On web, RN's `useNativeDriver` can be unreliable; this keeps the web
 * animation logic inside Framer Motion and stays mobile-safe via platform files.
 */
export function CharactersLayer({ instances, sceneWidth, doorStandX, onPhaseChange, onDone }: Props) {
  const storeX = doorStandX; // where "the door" is (stand point)
  const screenRight = sceneWidth + 220;

  const characters: WebCharacter[] = instances.map((c) => {
    const { noCandy, withCandy } = characterEmojis(c.type);
    return {
      id: c.id,
      phase: c.phase,
      hasCandy: c.phase === 'exiting',
      imageNoCandy: svgDataUri(noCandy),
      imageWithCandy: svgDataUri(withCandy),
    };
  });

  return (
    <View pointerEvents="none" style={StyleSheet.absoluteFill}>
      <AnimatePresence>
        {characters.map((c) => {
          const laneIndex = simpleLaneIndex(c.id, 3);
          const laneBottom = 10 + laneIndex * 7;

          return (
            <motion.img
              key={c.id}
              src={c.hasCandy ? c.imageWithCandy : c.imageNoCandy}
              initial={{ x: -200 }}
              animate={{ x: c.phase === 'entering' ? storeX : screenRight }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1 }}
              onAnimationComplete={() => {
                if (c.phase === 'entering') {
                  // Briefly "inside" (pause), then exit with candy.
                  onPhaseChange(c.id, 'inside');
                  setTimeout(() => onPhaseChange(c.id, 'exiting'), 2000);
                } else if (c.phase === 'exiting') {
                  onDone(c.id);
                }
              }}
              style={{
                position: 'absolute',
                left: 0,
                bottom: laneBottom,
                width: 92,
                height: 92,
                pointerEvents: 'none',
                // a tiny "shadow" feel
                filter: 'drop-shadow(0px 6px 0px rgba(0,0,0,0.12))',
              }}
            />
          );
        })}
      </AnimatePresence>
    </View>
  );
}

function characterEmojis(type: CharacterType) {
  // Keep it simple + readable as SVG text. (Works as placeholder art on web.)
  switch (type) {
    case 'blackWomanAfro':
      return { noCandy: '👩🏿‍🦱', withCandy: '👩🏿‍🦱🍬🍭' };
    case 'whiteWomanBlonde':
      return { noCandy: '👱🏻‍♀️', withCandy: '👱🏻‍♀️🍫🍬' };
    case 'manAfroBeard':
      return { noCandy: '🧔🏾‍♂️', withCandy: '🧔🏾‍♂️🍭🍫' };
    case 'littleGirlCurly':
      return { noCandy: '👧🏽', withCandy: '👧🏽🍬🧁' };
    case 'oldManBeardCane':
      return { noCandy: '👴🏻🦯', withCandy: '👴🏻🦯🍬🍫' };
  }
}

function svgDataUri(emoji: string) {
  // Centered emoji in a small SVG so we can use <motion.img src=...>.
  const svg = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="92" height="92" viewBox="0 0 92 92">
  <rect x="8" y="6" width="76" height="76" rx="18" fill="white" stroke="#1b1b1b" stroke-width="3"/>
  <text x="46" y="52" font-size="34" text-anchor="middle" dominant-baseline="middle">${emoji}</text>
</svg>`;
  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
}

function simpleLaneIndex(id: string, lanes: number) {
  let sum = 0;
  for (let i = 0; i < id.length; i += 1) sum += id.charCodeAt(i);
  return sum % lanes;
}

