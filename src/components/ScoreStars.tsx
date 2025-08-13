export const ScoreStars = ({ score }: { score: number }) => {
  return (
    <div className="flex">
      {Array.from({ length: score }, (_, i) => (
        <span key={i}>★</span>
      ))}
      {Array.from({ length: 5 - score }, (_, i) => (
        <span key={i}>☆</span>
      ))}
    </div>
  );
};
