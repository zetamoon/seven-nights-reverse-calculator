import { useState, useMemo } from 'react';
import './App.css';
import { InputField, DamageResults } from './components';
import { initialStats, STAT_CONFIG } from './constants';
import { calculateDamage } from './utils';
import type { StatSet } from './types';
import useLocalStorage from './hooks/useLocalStorage';

const StatGroup = ({ title, children, isCollapsed, onToggle }: {
  title: string;
  children: React.ReactNode;
  isCollapsed: boolean;
  onToggle: () => void;
}) => (
  <div className={`stat-group ${isCollapsed ? 'collapsed' : ''}`}>
    <h3 onClick={onToggle}>
      {title}
      <span className="collapse-icon">{isCollapsed ? '▼' : '▲'}</span>
    </h3>
    {!isCollapsed && <div className="stat-group-content">{children}</div>}
  </div>
);

const GROUP_TITLES: { [key: string]: string } = {
  character: '캐릭터 능력치',
  pet: '펫 능력치',
  buff: '버프 및 기타',
  enemy: '적 능력치 / 디버프',
};

function App() {
  const [statSets, setStatSets] = useLocalStorage<{ A: StatSet, B: StatSet }>('sevenNightsStatSets', {
    A: { ...initialStats },
    B: { ...initialStats },
  });
  const [activeSet, setActiveSet] = useState<'A' | 'B'>('A');
  const [message, setMessage] = useState<string | null>(null);
  const [collapsedGroups, setCollapsedGroups] = useState<{ [key: string]: boolean }>({});

  const toggleGroup = (groupKey: string) => {
    setCollapsedGroups(prev => ({
      ...prev,
      [groupKey]: !prev[groupKey]
    }));
  };

  const showMessage = (msg: string) => {
    setMessage(msg);
    setTimeout(() => {
      setMessage(null);
    }, 3000);
  };

  const handleStatChange = (name: string, value: number) => {
    setStatSets((prevSets) => ({
      ...prevSets,
      [activeSet]: {
        ...prevSets[activeSet],
        [name]: value,
      }
    }));
  };

  const copySet = (from: 'A' | 'B', to: 'A' | 'B') => {
    if (from === to) return;
    setStatSets(prev => ({
      ...prev,
      [to]: { ...prev[from] }
    }));
    showMessage(`${from} 세트가 ${to} 세트로 복사되었습니다.`);
  };

  const swapSets = () => {
    setStatSets(prev => ({
      A: { ...prev.B },
      B: { ...prev.A },
    }));
    showMessage("세트가 교체되었습니다!");
  };

  const resetStats = () => {
    setStatSets(prevSets => ({
      ...prevSets,
      [activeSet]: { ...initialStats },
    }));
    showMessage("현재 세트가 초기화되었습니다.");
  };

  const damageStatsA = useMemo(() => calculateDamage(statSets.A), [statSets.A]);
  const damageStatsB = useMemo(() => calculateDamage(statSets.B), [statSets.B]);

  const currentStats = statSets[activeSet];
  const otherSet = activeSet === 'A' ? 'B' : 'A';
  const otherStats = statSets[otherSet];

  const statGroups = useMemo(() => {
    const groups: { [key: string]: typeof STAT_CONFIG } = {
      character: [],
      pet: [],
      buff: [],
      enemy: [],
    };

    STAT_CONFIG.forEach(stat => {
      groups[stat.group].push(stat);
    });
    return groups;
  }, []);

  return (
    <div className='app-container'>
      <header className="app-header">
        <h1>세븐나이츠 리버스 스탯계산기</h1>
        <div className="set-selector">
          <button onClick={() => setActiveSet('A')} className={activeSet === 'A' ? 'active' : ''}>세트 A</button>
          <button onClick={() => setActiveSet('B')} className={activeSet === 'B' ? 'active' : ''}>세트 B</button>
        </div>
      </header>

      <div className="content-wrapper">
        <main className="main-content">
          {Object.entries(statGroups).map(([groupKey, stats]) => (
            <StatGroup
              key={groupKey}
              title={GROUP_TITLES[groupKey]}
              isCollapsed={!!collapsedGroups[groupKey]}
              onToggle={() => toggleGroup(groupKey)}
            >
              {stats.map(({ name, label, isPercentage }) => (
                <InputField
                  key={name}
                  label={label}
                  name={name}
                  value={currentStats[name]}
                  otherValue={otherStats[name]}
                  onValueChange={(name, value) => handleStatChange(name, isPercentage ? value / 100 : value)}
                  isPercentage={isPercentage}
                />
              ))}
            </StatGroup>
          ))}
        </main>

        <aside className="results-sidebar">
          <section className="results-section">
            <h3>결과 비교</h3>
            <div className="results-grid">
              <DamageResults title="세트 A" damageStats={damageStatsA} />
              <DamageResults title="세트 B" damageStats={damageStatsB} />
              <DamageResults title="성능 차이 (B - A)" damageStats={damageStatsB} comparisonStats={damageStatsA} isDifference />
            </div>
          </section>
        </aside>
      </div>

      <footer className="app-footer">
        <div className="button-group">
          <button onClick={() => copySet('A', 'B')}>A→B 복사</button>
          <button onClick={() => copySet('B', 'A')}>B→A 복사</button>
          <button onClick={swapSets}>A↔B 교체</button>
          <button onClick={resetStats}>현재 세트 초기화</button>
        </div>
      </footer>

      {message && <div className="message">{message}</div>}
    </div>
  );
}

export default App;