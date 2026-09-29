import { LEVELS } from './levels';
import type { LevelId, SpeakingScenario } from './types';

const modules = import.meta.glob<Record<string, SpeakingScenario[]>>('./speaking/*.ts', { eager: true });
const all = Object.values(modules).flatMap((m) => Object.values(m).flat());

export const SCENARIOS: SpeakingScenario[] = LEVELS.flatMap((l) => all.filter((s) => s.level === l.id));
export const scenarioById = (id: string) => SCENARIOS.find((s) => s.id === id);
export const scenariosByLevel = (lv: LevelId) => SCENARIOS.filter((s) => s.level === lv);
