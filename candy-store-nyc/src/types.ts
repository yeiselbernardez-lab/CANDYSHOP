export type CharacterType =
  | 'blackWomanAfro'
  | 'whiteWomanBlonde'
  | 'manAfroBeard'
  | 'littleGirlCurly'
  | 'oldManBeardCane';

export type CharacterPhase = 'entering' | 'inside' | 'exiting';

export type CharacterInstance = {
  id: string;
  type: CharacterType;
  phase: CharacterPhase;
};

export type CharacterCounts = Record<CharacterType, number>;
