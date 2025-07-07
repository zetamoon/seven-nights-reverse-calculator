import type { StatSet } from '../types/StatSet';

export const calculateDamage = (stats: StatSet) => {
  const { baseAtk, statAtk, critRate, critDamage, weaknessRate, weaknessDamage,
    formationBonus, petAtk, petPotential, atkBuff, damageBuff, skillCoeff,
    defense, defenseBuff, defenseReduction, defenseIgnored, damageReduction } = stats;

  const attack = (statAtk + petAtk + baseAtk * (formationBonus + petPotential)) * (1 + atkBuff);
  const defenseValue = defense * (1 - defenseIgnored) * (1 - defenseReduction + defenseBuff);
  const defenseCoeff = 1 + defenseValue / 467;
  const damage = attack * skillCoeff / defenseCoeff * (1 + damageBuff) * (1 - damageReduction);

  return {
    baseDamage: damage,
    critDamage: damage * critDamage,
    weaknessDamage: damage * weaknessDamage,
    critWeaknessDamage: damage * critDamage * weaknessDamage,
    expectedDamage: (damage * (1 - critRate) + damage * critDamage * critRate) * (1 - weaknessRate) +
      (damage * weaknessDamage * (1 - critRate) + damage * critDamage * critRate * weaknessDamage) * weaknessRate,
  };
};
