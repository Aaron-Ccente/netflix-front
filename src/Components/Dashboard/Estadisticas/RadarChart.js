// import React, { useEffect, useState } from 'react'
import { RadarChart as RechartsRadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, Legend } from 'recharts';

function RadarChartView({ data, maxTotal }) {
  if (!data || !data.length) return null;
  // Si no se recibe maxTotal, lo calculamos automáticamente
  const max = maxTotal || Math.max(...data.map(d => d.A)) + 2;
  return (
    <div>
      <RechartsRadarChart outerRadius={240} width={730} height={600} data={data}>
        <PolarGrid />
        <PolarAngleAxis dataKey="subject" />
        <PolarRadiusAxis angle={30} domain={[0, max]} />
        <Radar name="Cantidad" dataKey="A" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
        <Legend />
      </RechartsRadarChart>
    </div>
  );
}

export default RadarChartView;
