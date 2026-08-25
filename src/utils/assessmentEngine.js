export const calculateAssessmentScore = (answers) => {
  const values = Object.values(answers || {}).map(Number).filter(value => Number.isFinite(value));
  if (!values.length) return 0;
  return Math.round(values.reduce((total, value) => total + Math.min(100, Math.max(0, value)), 0) / values.length);
};

export const calculateReadiness = (results) => {
  const scores = Object.values(results || {})
    .map(result => typeof result === 'object' ? result.score : result)
    .map(Number)
    .filter(score => Number.isFinite(score));
  return scores.length ? Math.round(scores.reduce((total, score) => total + score, 0) / scores.length) : 0;
};