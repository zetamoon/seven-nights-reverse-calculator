const formatNumber = (num: number) => {
  if (num === Infinity) return '∞';
  if (num === -Infinity) return '-∞';
  return Math.floor(num).toLocaleString();
};

const DamageResults = ({ title, damageStats, comparisonStats, isDifference = false }: {
  title: string;
  damageStats: { [key: string]: number };
  comparisonStats?: { [key: string]: number };
  isDifference?: boolean;
}) => {

  const calculateDiff = (a: number, b: number) => {
    const diff = a - b;
    const percentage = b === 0 ? (a === 0 ? 0 : Infinity) : (diff / b) * 100;
    return { diff, percentage };
  };

  const renderRow = (label: string, value: number, comparisonValue?: number) => {
    if (isDifference && comparisonValue !== undefined) {
      const { diff, percentage } = calculateDiff(value, comparisonValue);
      const diffClass = diff > 0 ? 'positive' : diff < 0 ? 'negative' : 'neutral';
      const sign = diff > 0 ? '+' : '';
      const formattedPercentage = isFinite(percentage) ? `(${sign}${percentage.toFixed(1)}%)` : '';
      return (
        <div className="result-row" key={label}>
          <span className="result-label">{label}</span>
          <span className={`result-value ${diffClass}`}>{`${sign}${formatNumber(diff)}`}</span>
          <span className={`result-diff ${diffClass}`}>{formattedPercentage}</span>
        </div>
      );
    }

    return (
      <div className="result-row" key={label}>
        <span className="result-label">{label}</span>
        <span className="result-value">{formatNumber(value)}</span>
      </div>
    );
  };

  const headers = isDifference ? ['스탯', '차이', '%'] : ['스탯', '피해량'];

  return (
    <div className="damage-results">
      <h4>{title}</h4>
      <div className="result-header">
        {headers.map(h => <span key={h}>{h}</span>)}
      </div>
      {renderRow('기본 피해량', damageStats.baseDamage, comparisonStats?.baseDamage)}
      {renderRow('치명타 피해량', damageStats.critDamage, comparisonStats?.critDamage)}
      {renderRow('약점 공격 피해량', damageStats.weaknessDamage, comparisonStats?.weaknessDamage)}
      {renderRow('치명타 + 약점 공격', damageStats.critWeaknessDamage, comparisonStats?.critWeaknessDamage)}
      {renderRow('피해량 기댓값', damageStats.expectedDamage, comparisonStats?.expectedDamage)}
    </div>
  );
};

export default DamageResults;
