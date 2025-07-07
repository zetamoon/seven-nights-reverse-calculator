import type { StatSet } from '../types';

export const STAT_CONFIG: Array<{ name: keyof StatSet; label: string; isPercentage: boolean; group: 'character' | 'pet' | 'enemy' | 'buff' }> = [
  { name: 'baseAtk', label: '기본(도감) 공격력', isPercentage: false, group: 'character' },
  { name: 'statAtk', label: '스탯 공격력', isPercentage: false, group: 'character' },
  { name: 'critRate', label: '치명타 확률 (%)', isPercentage: true, group: 'character' },
  { name: 'critDamage', label: '치명타 피해 (%)', isPercentage: true, group: 'character' },
  { name: 'weaknessRate', label: '약점 공격 확률 (%)', isPercentage: true, group: 'character' },
  { name: 'weaknessDamage', label: '약점 공격 피해 (%)', isPercentage: true, group: 'character' },
  { name: 'formationBonus', label: '진형 보너스 (%)', isPercentage: true, group: 'buff' },
  { name: 'petAtk', label: '펫 공격력', isPercentage: false, group: 'pet' },
  { name: 'petPotential', label: '펫 잠재능력 (%)', isPercentage: true, group: 'pet' },
  { name: 'atkBuff', label: '공격력 증가 (%)', isPercentage: true, group: 'buff' },
  { name: 'damageBuff', label: '주는 피해량 증가 (%)', isPercentage: true, group: 'buff' },
  { name: 'skillCoeff', label: '스킬 계수 (%)', isPercentage: true, group: 'buff' },
  { name: 'defense', label: '방어력', isPercentage: false, group: 'enemy' },
  { name: 'defenseBuff', label: '방어력 증가 (%)', isPercentage: true, group: 'enemy' },
  { name: 'defenseReduction', label: '방어력 감소 (%)', isPercentage: true, group: 'enemy' },
  { name: 'defenseIgnored', label: '방어력 무시 (%)', isPercentage: true, group: 'enemy' },
  { name: 'damageReduction', label: '받는 피해량 감소 (%)', isPercentage: true, group: 'enemy' },
];
