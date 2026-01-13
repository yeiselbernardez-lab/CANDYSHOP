import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

type Props = {
  sceneWidth: number;
};

/**
 * Bright, playful candy store placed at center of the NYC block.
 * Door is visually obvious (center bottom).
 */
export function CandyStore({ sceneWidth }: Props) {
  const storeWidth = Math.min(sceneWidth * 0.46, 240);
  const storeHeight = 170;
  const doorWidth = Math.max(44, storeWidth * 0.18);
  const windowWidth = (storeWidth - doorWidth - 24) / 2;

  return (
    <View style={[styles.wrap, { width: storeWidth, height: storeHeight }]}>
      <View style={styles.sign}>
        <Text style={styles.signText}>CANDY</Text>
        <Text style={styles.signTextSmall}>SHOP</Text>
      </View>

      <View style={styles.front}>
        <View style={[styles.window, { width: windowWidth }]}>
          <Text style={styles.windowCandy}>🍭🍬🍫</Text>
          <Text style={styles.windowCandy}>🧁🍪🍬</Text>
        </View>

        <View style={[styles.door, { width: doorWidth }]}>
          <View style={styles.doorGlass} />
          <View style={styles.doorHandle} />
          <Text style={styles.doorText}>DOOR</Text>
        </View>

        <View style={[styles.window, { width: windowWidth }]}>
          <Text style={styles.windowCandy}>🍬🍭🍫</Text>
          <Text style={styles.windowCandy}>🍩🍫🍬</Text>
        </View>
      </View>

      <View style={styles.awning} />
      <View style={styles.baseTrim} />
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  sign: {
    width: '100%',
    paddingVertical: 8,
    borderTopLeftRadius: 14,
    borderTopRightRadius: 14,
    backgroundColor: '#ff4fd8',
    borderWidth: 3,
    borderColor: '#1b1b1b',
    alignItems: 'center',
  },
  signText: {
    fontSize: 20,
    fontWeight: '900',
    letterSpacing: 1.5,
    color: '#1b1b1b',
  },
  signTextSmall: {
    marginTop: -2,
    fontSize: 14,
    fontWeight: '900',
    letterSpacing: 2,
    color: '#1b1b1b',
  },
  front: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    paddingTop: 10,
    paddingBottom: 12,
    backgroundColor: '#ffd34d',
    borderLeftWidth: 3,
    borderRightWidth: 3,
    borderBottomWidth: 3,
    borderColor: '#1b1b1b',
    borderBottomLeftRadius: 18,
    borderBottomRightRadius: 18,
  },
  window: {
    height: 88,
    backgroundColor: '#b8f5ff',
    borderWidth: 3,
    borderColor: '#1b1b1b',
    borderRadius: 10,
    paddingVertical: 6,
    alignItems: 'center',
    justifyContent: 'center',
  },
  windowCandy: {
    fontSize: 14,
  },
  door: {
    height: 102,
    backgroundColor: '#2ef2a6',
    borderWidth: 3,
    borderColor: '#1b1b1b',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingBottom: 8,
    overflow: 'hidden',
  },
  doorGlass: {
    position: 'absolute',
    top: 10,
    width: '76%',
    height: 44,
    borderRadius: 10,
    backgroundColor: 'rgba(255,255,255,0.55)',
    borderWidth: 2,
    borderColor: 'rgba(0,0,0,0.25)',
  },
  doorHandle: {
    position: 'absolute',
    right: 8,
    top: 52,
    width: 6,
    height: 18,
    borderRadius: 6,
    backgroundColor: '#1b1b1b',
  },
  doorText: {
    fontSize: 11,
    fontWeight: '900',
    color: '#1b1b1b',
    opacity: 0.85,
  },
  awning: {
    position: 'absolute',
    top: 46,
    left: -2,
    right: -2,
    height: 12,
    backgroundColor: '#ff2b2b',
    borderWidth: 3,
    borderColor: '#1b1b1b',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  baseTrim: {
    position: 'absolute',
    bottom: -2,
    left: 4,
    right: 4,
    height: 10,
    borderRadius: 10,
    backgroundColor: '#ff9b2f',
    borderWidth: 2,
    borderColor: '#1b1b1b',
  },
});
