# Seven Knights Reverse Stat Calculator

This is a stat calculator for the game **Seven Knights Reverse**, designed to help players optimize their character builds. It allows you to compare two different sets of stats (Set A and Set B) to see how changes affect your overall damage output.

## Features

*   **A/B Stat Comparison:** Input two different stat configurations (Set A and Set B) and see the calculated damage results side-by-side.
*   **Detailed Damage Calculation:** View not just the base damage, but also critical damage, weakness damage, and the combined expected damage based on your stats.
*   **Damage Difference:** The calculator automatically shows the difference in damage between Set B and Set A, making it easy to see which setup is superior.
*   **Persistent Storage:** Your stat sets are automatically saved to your browser's local storage, so you don't have to re-enter them every time.
*   **Easy Set Management:**
    *   **Copy:** Copy stats from one set to another (A→B or B→A).
    *   **Swap:** Instantly swap the stats between Set A and Set B.
    *   **Reset:** Reset the currently selected set to the initial default values.

## How to Use

1.  **Select a Set:** Choose either "Set A" or "Set B" to begin editing.
2.  **Input Your Stats:** Fill in the input fields for the selected set. The stats are grouped into categories:
    *   **Character Stats:** Your character's primary stats.
    *   **Pet & Buffs:** Stats from your equipped pet and active buffs.
    *   **Enemy Stats / Debuffs:** The stats of the enemy you are targeting, including any debuffs applied to them.
3.  **Analyze the Results:** The "Results" section will update automatically as you change the stats.
    *   **Set A/B Results:** Shows the calculated damage for each set.
    *   **Difference (B - A):** Shows the increase or decrease in damage when switching from Set A to Set B.
4.  **Manage Your Sets:** Use the buttons at the bottom to copy, swap, or reset your stat sets as needed.

## Stat Definitions

*   **기본(도감) 공격력 (Base Attack):** The base attack power of your character, found in the codex.
*   **스탯 공격력 (Stat Attack):** The attack power after gaining additional attack power from equipment, accessories, etc. This is the number shown in the stat screen.
*   **치명타 확률 (Crit Rate):** The chance to land a critical hit.
*   **치명타 피해 (Crit Damage):** The damage multiplier applied on a critical hit.
*   **약점 공격 확률 (Weakness Rate):** The chance to land a weakness attack.
*   **약점 공격 피해 (Weakness Damage):** The damage multiplier applied on a weakness attack.
*   **진형 보너스 (Formation Bonus):** The attack bonus from your selected formation.
*   **펫 공격력 (Pet Attack):** Additional attack power from your pet.
*   **펫 잠재능력 (Pet Potential):** The percentage-based attack bonus from your pet's potential.
*   **공격력 증가 (Attack Buff):** Percentage increase in attack power from buffs.
*   **주는 피해량 증가 (Damage Buff):** Percentage increase in the final damage dealt.
*   **스킬 계수 (Skill Coefficient):** The damage multiplier of the skill being used.
*   **방어력 (Defense):** The enemy's defense stat.
*   **방어력 증가 (Defense Buff):** Percentage increase in the enemy's defense from buffs.
*   **방어력 감소 (Defense Reduction):** Percentage decrease in the enemy's defense from debuffs.
*   **방어력 무시 (Defense Ignored):** The percentage of the enemy's defense that you ignore.
*   **받는 피해량 감소 (Damage Reduction):** Percentage reduction in the damage the enemy takes.

## Development

This project was built with React, TypeScript, and Vite.

### To run locally:

1.  Clone the repository.
2.  Install dependencies: `npm install`
3.  Start the development server: `npm run dev`