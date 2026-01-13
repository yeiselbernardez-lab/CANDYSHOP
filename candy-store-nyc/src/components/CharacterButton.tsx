import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import type { CharacterType } from '../types';

type Props = {
  type: CharacterType;
  label: string;
  emoji: string;
  count: number;
  onPress: () => void;
};

export function CharacterButton({ label, emoji, count, onPress }: Props) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [styles.button, pressed && styles.buttonPressed]}
      accessibilityRole="button"
      accessibilityLabel={`${label} button`}
    >
      <View style={styles.row}>
        <Text style={styles.emoji}>{emoji}</Text>
        <View style={styles.textCol}>
          <Text numberOfLines={1} style={styles.label}>
            {label}
          </Text>
          <Text style={styles.count}>Clicks: {count}</Text>
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    flex: 1,
    minWidth: 140,
    borderRadius: 14,
    paddingVertical: 12,
    paddingHorizontal: 12,
    backgroundColor: '#1b1b1b',
    borderWidth: 2,
    borderColor: 'rgba(255,255,255,0.18)',
  },
  buttonPressed: {
    transform: [{ scale: 0.98 }],
    opacity: 0.9,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  emoji: {
    fontSize: 22,
  },
  textCol: {
    flex: 1,
    minWidth: 0,
  },
  label: {
    color: '#ffffff',
    fontSize: 13,
    fontWeight: '900',
  },
  count: {
    marginTop: 2,
    color: 'rgba(255,255,255,0.8)',
    fontSize: 11,
    fontWeight: '700',
  },
});

