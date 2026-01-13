import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Animated, Easing, Platform, StyleSheet, View } from 'react-native';
import type { CharacterInstance, CharacterPhase } from '../types';
import { CharacterSprite } from './CharacterSprite';

type Props = {
  instance: CharacterInstance;
  /** Width of the scene container that the actor walks across */
  sceneWidth: number;
  /** X position (within scene) where the actor should stand at the door */
  doorStandX: number;
  /** Y position from bottom for actor lane alignment */
  laneBottom: number;
  onPhaseChange?: (id: string, phase: CharacterPhase) => void;
  onDone: (id: string) => void;
};

/**
 * Runs a full loop:
 * offscreen-left → door → (briefly inside) → exit with candy → offscreen-right.
 * Each instance is independent, so multiple can animate concurrently.
 */
export function CharacterActor({ instance, sceneWidth, doorStandX, laneBottom, onPhaseChange, onDone }: Props) {
  const [phase, setPhase] = useState<CharacterPhase>(instance.phase);

  const size = 54;
  const startLeftX = -size - 20;
  const endRightX = sceneWidth + size + 20;

  // On web, `useNativeDriver: true` can be unsupported/buggy and cause animations to never start.
  // Use the JS driver on web, native driver elsewhere.
  const useNativeDriver = Platform.OS !== 'web';

  const x = useRef(new Animated.Value(startLeftX)).current;
  const bounce = useRef(new Animated.Value(0)).current;
  const opacity = useRef(new Animated.Value(1)).current;

  const bounceAnim = useMemo(() => {
    // A subtle "excited walk" bounce.
    return Animated.loop(
      Animated.sequence([
        Animated.timing(bounce, { toValue: 1, duration: 260, easing: Easing.inOut(Easing.quad), useNativeDriver }),
        Animated.timing(bounce, { toValue: 0, duration: 260, easing: Easing.inOut(Easing.quad), useNativeDriver }),
      ])
    );
  }, [bounce, useNativeDriver]);

  useEffect(() => {
    let cancelled = false;

    const setPhaseSafe = (p: CharacterPhase) => {
      if (cancelled) return;
      setPhase(p);
      onPhaseChange?.(instance.id, p);
    };

    // Start: entering
    setPhaseSafe('entering');
    x.setValue(startLeftX);
    opacity.setValue(1);

    const walkToDoor = () =>
      new Promise<void>((resolve) => {
        bounceAnim.start();
        Animated.timing(x, {
          toValue: doorStandX,
          duration: 1100,
          easing: Easing.out(Easing.cubic),
          useNativeDriver,
        }).start(() => {
          bounceAnim.stop();
          bounce.setValue(0);
          resolve();
        });
      });

    const goInsideBriefly = () =>
      new Promise<void>((resolve) => {
        setPhaseSafe('inside');
        Animated.sequence([
          Animated.timing(opacity, { toValue: 0, duration: 180, easing: Easing.inOut(Easing.quad), useNativeDriver }),
          Animated.delay(320),
          Animated.timing(opacity, { toValue: 1, duration: 180, easing: Easing.inOut(Easing.quad), useNativeDriver }),
        ]).start(() => resolve());
      });

    const walkOut = () =>
      new Promise<void>((resolve) => {
        setPhaseSafe('exiting');
        bounceAnim.start();
        Animated.timing(x, {
          toValue: endRightX,
          duration: 1400,
          easing: Easing.in(Easing.cubic),
          useNativeDriver,
        }).start(() => {
          bounceAnim.stop();
          bounce.setValue(0);
          resolve();
        });
      });

    (async () => {
      await walkToDoor();
      if (cancelled) return;
      await goInsideBriefly();
      if (cancelled) return;
      await walkOut();
      if (cancelled) return;
      onDone(instance.id);
    })();

    return () => {
      cancelled = true;
      bounceAnim.stop();
    };
  }, [bounce, bounceAnim, doorStandX, endRightX, instance.id, onDone, onPhaseChange, opacity, sceneWidth, startLeftX, x]);

  const translateY = bounce.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -5],
  });

  return (
    <Animated.View
      pointerEvents="none"
      style={[
        styles.actor,
        {
          bottom: laneBottom,
          opacity,
          transform: [{ translateX: x }, { translateY }],
        },
      ]}
    >
      <View style={styles.shadow} />
      <CharacterSprite type={instance.type} phase={phase} size={size} />
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  actor: {
    position: 'absolute',
    left: 0,
    width: 90,
    alignItems: 'center',
  },
  shadow: {
    position: 'absolute',
    bottom: 12,
    width: 46,
    height: 10,
    borderRadius: 999,
    backgroundColor: 'rgba(0,0,0,0.12)',
    transform: [{ scaleX: 1.15 }],
  },
});

