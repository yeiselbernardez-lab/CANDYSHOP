import { StatusBar } from 'expo-status-bar';
import React, { useMemo, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View, useWindowDimensions } from 'react-native';
import { CityScene } from './src/components/CityScene';
import { CharactersLayer } from './src/components/CharactersLayer';
import { CharacterButton } from './src/components/CharacterButton';
import type { CharacterCounts, CharacterInstance, CharacterPhase, CharacterType } from './src/types';
import { nextId } from './src/utils/id';

export default function App() {
  const { width } = useWindowDimensions();
  const sceneWidth = Math.min(440, Math.max(320, width - 24 * 2));

  const [counts, setCounts] = useState<CharacterCounts>({
    blackWomanAfro: 0,
    whiteWomanBlonde: 0,
    manAfroBeard: 0,
    littleGirlCurly: 0,
    oldManBeardCane: 0,
  });

  const [instances, setInstances] = useState<CharacterInstance[]>([]);

  const storeWidth = Math.min(sceneWidth * 0.46, 240);
  const doorCenterX = (sceneWidth - storeWidth) / 2 + storeWidth / 2;
  const actorSize = 54;
  const doorStandX = doorCenterX - actorSize / 2;

  const buttons = useMemo(
    () =>
      [
        { type: 'blackWomanAfro', label: 'Black woman (afro)', emoji: '👩🏿‍🦱' },
        { type: 'whiteWomanBlonde', label: 'White woman (blonde)', emoji: '👱🏻‍♀️' },
        { type: 'manAfroBeard', label: 'Man (afro + beard)', emoji: '🧔🏾‍♂️' },
        { type: 'littleGirlCurly', label: 'Little girl (curly)', emoji: '👧🏽' },
        { type: 'oldManBeardCane', label: 'Old man (beard + cane)', emoji: '👴🏻' },
      ] as const,
    []
  );

  const spawn = (type: CharacterType) => {
    setCounts((c) => ({ ...c, [type]: (c[type] ?? 0) + 1 }));
    setInstances((prev) => [...prev, { id: nextId(type), type, phase: 'entering' }]);
  };

  const handlePhaseChange = (id: string, phase: CharacterPhase) => {
    // Keep phase in state (useful for debugging / potential UI later).
    setInstances((prev) => prev.map((it) => (it.id === id ? { ...it, phase } : it)));
  };

  const handleDone = (id: string) => {
    setInstances((prev) => prev.filter((it) => it.id !== id));
  };

  return (
    <View style={styles.root}>
      <StatusBar style="dark" />

      <ScrollView contentContainerStyle={styles.scrollContent} alwaysBounceVertical={false}>
        <Pressable
          onPress={() => {
            // Title is a "button" per spec; no action required.
          }}
          style={({ pressed }) => [styles.titleButton, pressed && styles.titleButtonPressed]}
          accessibilityRole="button"
          accessibilityLabel="The Candy Store of New York"
        >
          <Text style={styles.titleText}>THE CANDY STORE OF NEW YORK</Text>
        </Pressable>

        <View style={[styles.sceneWrap, { width: sceneWidth }]}>
          <CityScene sceneWidth={sceneWidth} />

          {/* Character lane overlay (absolute positioned so it doesn't affect layout). */}
          <CharactersLayer
            instances={instances}
            sceneWidth={sceneWidth}
            doorStandX={doorStandX}
            onPhaseChange={handlePhaseChange}
            onDone={handleDone}
          />
        </View>

        <View style={[styles.buttonsWrap, { width: sceneWidth }]}>
          <Text style={styles.buttonsHeader}>Choose a character to send into the candy store:</Text>
          <View style={styles.buttonsGrid}>
            {buttons.map((b) => (
              <CharacterButton
                key={b.type}
                type={b.type}
                label={b.label}
                emoji={b.emoji}
                count={counts[b.type]}
                onPress={() => spawn(b.type)}
              />
            ))}
          </View>
          <Text style={styles.hint}>
            Tip: tap quickly to spawn multiple characters — they’ll animate independently and leave the scene automatically.
          </Text>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#f2f2f2',
  },
  scrollContent: {
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 16,
    gap: 14,
  },
  titleButton: {
    width: '100%',
    maxWidth: 520,
    borderRadius: 16,
    paddingVertical: 14,
    paddingHorizontal: 14,
    backgroundColor: '#ffffff',
    borderWidth: 2,
    borderColor: '#1b1b1b',
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 6 },
    elevation: 2,
  },
  titleButtonPressed: {
    transform: [{ scale: 0.99 }],
    opacity: 0.95,
  },
  titleText: {
    textAlign: 'center',
    fontSize: 18,
    fontWeight: '900',
    letterSpacing: 1,
    color: '#1b1b1b',
  },
  sceneWrap: {
    position: 'relative',
    alignSelf: 'center',
  },
  buttonsWrap: {
    alignSelf: 'center',
    gap: 10,
    paddingBottom: 20,
  },
  buttonsHeader: {
    fontSize: 13,
    fontWeight: '900',
    color: 'rgba(0,0,0,0.72)',
  },
  buttonsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  hint: {
    fontSize: 12,
    fontWeight: '700',
    color: 'rgba(0,0,0,0.55)',
  },
});
