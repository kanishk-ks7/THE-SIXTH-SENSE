import React, { useState } from 'react';
import { Sparkles, TrendingUp, Calendar, Info } from 'lucide-react';
import Badge from '../ui/Badge';

export const PerformanceTrajectoryChart = ({ data = [], currentScore = 38 }) => {
  const [hoveredPoint, setHoveredPoint] = useState(null);

  // Dimensions & Coordinate Scaling
  const width = 640;
  const height = 230;
  const padding = { top: 30, right: 35, bottom: 40, left: 45 };

  const chartWidth = width - padding.left - padding.right;
  const chartHeight = height - padding.top - padding.bottom;

  const yMin = 0;
  const yMax = 100;

  const getX = (index) => {
    if (data.length <= 1) return padding.left;
    return padding.left + (index / (data.length - 1)) * chartWidth;
  };

  const getY = (val) => {
    return padding.top + chartHeight - ((val - yMin) / (yMax - yMin)) * chartHeight;
  };

  // Separate historical/current points (index 0 to 4) and projected points (index 4 to 6)
  const historicalPoints = data.filter((d, i) => i <= 4);
  const projectedPoints = data.filter((d, i) => i >= 4);

  // Generate SVG path strings
  const createPathString = (points) => {
    if (points.length === 0) return '';
    return points.reduce((acc, pt, idx) => {
      const actualIndex = data.findIndex(d => d.id === pt.id);
      const x = getX(actualIndex);
      const y = getY(pt.score);
      return idx === 0 ? `M ${x} ${y}` : `${acc} L ${x} ${y}`;
    }, '');
  };

  const historicalPath = createPathString(historicalPoints);
  const projectedPath = createPathString(projectedPoints);

  // Area fill under historical curve
  const historicalAreaPath = historicalPoints.length > 0
    ? `${historicalPath} L ${getX(4)} ${padding.top + chartHeight} L ${getX(0)} ${padding.top + chartHeight} Z`
    : '';

  // Area fill under projected curve
  const projectedAreaPath = projectedPoints.length > 0
    ? `${projectedPath} L ${getX(data.length - 1)} ${padding.top + chartHeight} L ${getX(4)} ${padding.top + chartHeight} Z`
    : '';

  // Y-axis tick marks
  const yTicks = [0, 25, 50, 75, 100];

  return (
    <div className="w-full select-none">
      
      {/* Legend and Active Snapshot Indicator */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-4 text-xs">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <span className="w-3 h-0.5 bg-brand-400 shadow-glow-sm" />
            <span className="w-2 h-2 rounded-full bg-brand-accent border border-dark-bg" />
            <span className="text-slate-300 font-medium">Historical & Current</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-4 h-0.5 border-b-2 border-dashed border-volt" />
            <span className="w-2 h-2 rounded-full border-2 border-volt bg-dark-bg" />
            <span className="text-volt font-medium">Projected Bi-Weekly</span>
          </div>
        </div>

        <div className="flex items-center gap-1.5 text-[11px] text-slate-400">
          <Calendar className="w-3.5 h-3.5 text-brand-400" />
          <span>Cycles: <strong>Every 2 Weeks</strong></span>
        </div>
      </div>

      {/* Responsive SVG Chart Container */}
      <div className="relative w-full overflow-hidden bg-dark-bg/60 border border-dark-border/80 rounded-2xl p-2 sm:p-4">
        
        <svg
          viewBox={`0 0 ${width} ${height}`}
          className="w-full h-auto overflow-visible"
          preserveAspectRatio="xMidYMid meet"
        >
          <defs>
            {/* Historical Gradient Area */}
            <linearGradient id="cyanGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#00F0FF" stopOpacity="0.25" />
              <stop offset="100%" stopColor="#00F0FF" stopOpacity="0.0" />
            </linearGradient>

            {/* Projected Gradient Area */}
            <linearGradient id="voltGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#CCFF00" stopOpacity="0.2" />
              <stop offset="100%" stopColor="#CCFF00" stopOpacity="0.0" />
            </linearGradient>

            {/* Glow Filter */}
            <filter id="neonGlowCyan" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>

            <filter id="neonGlowVolt" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Horizontal Gridlines & Y-Axis Labels */}
          {yTicks.map((tick) => {
            const y = getY(tick);
            return (
              <g key={tick}>
                <line
                  x1={padding.left}
                  y1={y}
                  x2={width - padding.right}
                  y2={y}
                  stroke="#1E2D4A"
                  strokeDasharray="4 4"
                  strokeWidth="1"
                />
                <text
                  x={padding.left - 10}
                  y={y + 4}
                  textAnchor="end"
                  fill="#64748B"
                  fontSize="10"
                  fontFamily="Outfit, sans-serif"
                  fontWeight="600"
                >
                  {tick}%
                </text>
              </g>
            );
          })}

          {/* Area Fills */}
          <path d={historicalAreaPath} fill="url(#cyanGradient)" />
          <path d={projectedAreaPath} fill="url(#voltGradient)" />

          {/* Trajectory Stroke Lines */}
          <path
            d={historicalPath}
            fill="none"
            stroke="#00F0FF"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
            filter="url(#neonGlowCyan)"
          />

          <path
            d={projectedPath}
            fill="none"
            stroke="#CCFF00"
            strokeWidth="2.5"
            strokeDasharray="6 6"
            strokeLinecap="round"
            strokeLinejoin="round"
            filter="url(#neonGlowVolt)"
          />

          {/* Vertical Milestone Divider at Current Cycle */}
          <line
            x1={getX(4)}
            y1={padding.top}
            x2={getX(4)}
            y2={padding.top + chartHeight}
            stroke="#06b6d4"
            strokeDasharray="2 2"
            strokeWidth="1.5"
            opacity="0.6"
          />

          {/* Interactive Data Points & Hover Targets */}
          {data.map((pt, idx) => {
            const x = getX(idx);
            const y = getY(pt.score);
            const isCurrent = idx === 4;
            const isProjected = idx > 4;
            const isHovered = hoveredPoint?.id === pt.id;

            return (
              <g key={pt.id} className="cursor-pointer">
                {/* Hit area for easy mouse/touch targeting */}
                <circle
                  cx={x}
                  cy={y}
                  r={16}
                  fill="transparent"
                  onMouseEnter={() => setHoveredPoint(pt)}
                  onMouseLeave={() => setHoveredPoint(null)}
                  onClick={() => setHoveredPoint(pt)}
                />

                {/* Outer Ring on Hover or Current */}
                {isCurrent && (
                  <circle
                    cx={x}
                    cy={y}
                    r={9}
                    fill="none"
                    stroke="#00F0FF"
                    strokeWidth="2"
                    className="animate-ping origin-center opacity-75"
                  />
                )}

                {/* Node Circle */}
                <circle
                  cx={x}
                  cy={y}
                  r={isHovered ? 7 : isCurrent ? 6 : 4.5}
                  fill={isProjected ? '#080C14' : isCurrent ? '#00F0FF' : '#06B6D4'}
                  stroke={isProjected ? '#CCFF00' : isCurrent ? '#FFFFFF' : '#080C14'}
                  strokeWidth={isProjected ? 2.5 : 2}
                  className="transition-all duration-200"
                />

                {/* Value Label above node on Current and Projected */}
                {(isCurrent || isProjected || isHovered) && (
                  <text
                    x={x}
                    y={y - 12}
                    textAnchor="middle"
                    fill={isProjected ? '#CCFF00' : '#00F0FF'}
                    fontSize="11"
                    fontFamily="Outfit, sans-serif"
                    fontWeight="800"
                    className="drop-shadow-md"
                  >
                    {pt.score}%
                  </text>
                )}

                {/* X-Axis Cycle Labels */}
                <text
                  x={x}
                  y={padding.top + chartHeight + 18}
                  textAnchor="middle"
                  fill={isCurrent ? '#00F0FF' : isProjected ? '#A3E635' : '#94A3B8'}
                  fontSize="10"
                  fontFamily="Outfit, sans-serif"
                  fontWeight={isCurrent ? '700' : '500'}
                >
                  {pt.label}
                </text>

                {/* X-Axis Date Subtitles */}
                <text
                  x={x}
                  y={padding.top + chartHeight + 30}
                  textAnchor="middle"
                  fill="#64748B"
                  fontSize="8.5"
                  fontFamily="Inter, sans-serif"
                >
                  {pt.dateShort}
                </text>
              </g>
            );
          })}
        </svg>

        {/* Hover Tooltip Overlay */}
        {hoveredPoint && (
          <div className="mt-3 p-3 rounded-xl bg-dark-surface border border-brand-500/50 shadow-xl flex items-center justify-between gap-4 animate-fade-in text-xs">
            <div className="flex items-center gap-2.5">
              <span className={`w-2.5 h-2.5 rounded-full ${
                hoveredPoint.status === 'Projected' ? 'bg-volt' : hoveredPoint.status === 'Current Score' ? 'bg-brand-accent animate-ping' : 'bg-brand-400'
              }`} />
              <div>
                <span className="font-bold text-white block">{hoveredPoint.label}: {hoveredPoint.dateRange}</span>
                <span className="text-[11px] text-slate-400">{hoveredPoint.status}</span>
              </div>
            </div>
            <div className="text-right">
              <span className="text-base font-extrabold text-white font-mono">{hoveredPoint.score}%</span>
              <span className="text-[10px] text-brand-300 block">Readiness</span>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default PerformanceTrajectoryChart;
