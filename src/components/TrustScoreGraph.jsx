import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { month: 'Jan', score: 45 },
  { month: 'Feb', score: 52 },
  { month: 'Mar', score: 58 },
  { month: 'Apr', score: 65 },
  { month: 'May', score: 68 },
  { month: 'Jun', score: 74 },
  { month: 'Jul', score: 82 }
];

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-[#0B0F19]/90 backdrop-blur-md border border-white/10 p-4 rounded-2xl shadow-2xl">
        <p className="text-[#9CA3AF] text-[10px] uppercase tracking-widest mb-2 font-bold opacity-60">{label}</p>
        <div className="flex items-center gap-3">
          <div className="w-1.5 h-1.5 bg-[#4F8CFF] rounded-full shadow-[0_0_8px_#4F8CFF]"></div>
          <p className="text-[#E6EAF2] font-semibold text-xl tracking-tight">
            {payload[0].value}
            <span className="text-[#9CA3AF] text-[10px] ml-2 font-light">Index</span>
          </p>
        </div>
      </div>
    );
  }
  return null;
};

export function TrustScoreGraph() {
  return (
    <div className="w-full h-full min-h-[300px] animate-[fadeIn_0.5s_ease-out]">
      <div className="h-full w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="colorScore" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#4F8CFF" stopOpacity={0.15}/>
                <stop offset="95%" stopColor="#8B5CF6" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.02)" vertical={false} />
            <XAxis 
              dataKey="month" 
              stroke="#9CA3AF" 
              tick={{fill: '#9CA3AF', fontSize: 10, fontWeight: 300}} 
              axisLine={false} 
              tickLine={false} 
              dy={15} 
            />
            <YAxis 
              stroke="#9CA3AF" 
              tick={{fill: '#9CA3AF', fontSize: 10, fontWeight: 300}} 
              axisLine={false} 
              tickLine={false} 
              dx={-10} 
            />
            <Tooltip 
              content={<CustomTooltip />} 
              cursor={{ stroke: 'rgba(79, 140, 255, 0.2)', strokeWidth: 1 }} 
            />
            <Area 
              type="monotone" 
              dataKey="score" 
              stroke="#4F8CFF" 
              strokeWidth={2}
              fillOpacity={1} 
              fill="url(#colorScore)" 
              animationDuration={2000}
              animationEasing="cubic-bezier(0.16, 1, 0.3, 1)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
