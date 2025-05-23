type RatingCircleProps = {
    score: number; // e.g., 7.1
  };
  
  const getScoreColor = (scorePercent: number) => {
    if (scorePercent >= 70) return 'text-green-400';
    if (scorePercent >= 40) return 'text-yellow-400';
    return 'text-red-500';
  };
  
  export default function RatingCircle({ score }: RatingCircleProps) {
    const percentage = Math.round(score * 10); // e.g. 7.1 => 71
    //const radius = 15.9155;
    const radius = 2;
  
    return (
      <div className="relative w-10 h-10 ">
        <svg viewBox="0 0 36 36" className="w-full h-full">
            <circle cx="18" cy="18" r="16" fill="#0d253f" />
          {/* Background track */}
          <path
            className="text-gray-700"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            d={`
              M18 2.0845
              a ${radius} ${radius} 0 0 1 0 31.831
              a ${radius} ${radius} 0 0 1 0 -31.831
            `}
          />
          {/* Progress arc */}
          <path
            className={getScoreColor(percentage)}
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeDasharray={`${percentage}, 100`}
            d={`
              M18 2.0845
              a ${radius} ${radius} 0 0 1 0 31.831
              a ${radius} ${radius} 0 0 1 0 -31.831
            `}
          />
        </svg>
  
        {/* Score number */}
        <div className="absolute inset-0 flex items-center justify-center font-bold text-white">
          {percentage}
          <sup className="text-[6px] font-bold">%</sup>
        </div>
      </div>
    );
  }
  