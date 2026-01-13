import React from 'react';
import { StyleSheet, View } from 'react-native';
import type { CharacterInstance, CharacterPhase } from '../types';
import { CharacterActor } from './CharacterActor';

type Props = {
  instances: CharacterInstance[];
  sceneWidth: number;
  doorStandX: number;
  onPhaseChange: (id: string, phase: CharacterPhase) => void;
  onDone: (id: string) => void;
};

/**
 * Native implementation uses React Native Animated.
 * Web implementation lives in `CharactersLayer.web.tsx` and uses Framer Motion.
 */
export function CharactersLayer({ instances, sceneWidth, doorStandX, onPhaseChange, onDone }: Props) {
  return (
    <View pointerEvents="none" style={StyleSheet.absoluteFill}>
      {instances.map((inst) => {
        const laneIndex = simpleLaneIndex(inst.id, 3);
        const laneBottom = 10 + laneIndex * 7; // multiple lanes so characters overlap less
        return (
          <CharacterActor
            key={inst.id}
            instance={inst}
            sceneWidth={sceneWidth}
            doorStandX={doorStandX}
            laneBottom={laneBottom}
            onPhaseChange={onPhaseChange}
            onDone={onDone}
          />
        );
      })}
    </View>
  );
}

function simpleLaneIndex(id: string, lanes: number) {
  let sum = 0;
  for (let i = 0; i < id.length; i += 1) sum += id.charCodeAt(i);
  return sum % lanes;
}

const styles = StyleSheet.create({});

