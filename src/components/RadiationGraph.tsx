
import React, { useEffect, useRef } from 'react';
import { Card } from "@/components/ui/card";
import { generateDataset, wienDisplacementLaw } from './PhysicsCalculations';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer,
  ReferenceLine,
  ReferenceArea
} from 'recharts';

interface RadiationGraphProps {
  temperature: number;
}

interface DataPoint {
  wavelength: number;
  planck: number;
  wien: number;
  rayleighJeans: number;
}

const formatWavelength = (value: number) => {
  if (value < 1000) {
    return `${Math.round(value)} nm`;
  }
  return `${(value / 1000).toFixed(1)} μm`;
};

const formatIntensity = (value: number) => value.toFixed(2);

const RadiationGraph: React.FC<RadiationGraphProps> = ({ temperature }) => {
  const graphRef = useRef<HTMLDivElement>(null);
  const prevTempRef = useRef<number>(temperature);

  // Create formatted dataset for the chart
  const dataset = React.useMemo(() => {
    const { wavelengths, planck, wien, rayleighJeans } = generateDataset(temperature);
    
    return wavelengths.map((wavelength, i) => ({
      wavelength,
      planck: planck[i],
      wien: wien[i],
      rayleighJeans: rayleighJeans[i],
    }));
  }, [temperature]);

  // Calculate the peak wavelength
  const peakWavelength = wienDisplacementLaw(temperature);

  // Find nearest data point to peak wavelength
  const nearestPeakPoint = dataset.reduce((prev, curr) => 
    Math.abs(curr.wavelength - peakWavelength) < Math.abs(prev.wavelength - peakWavelength) ? curr : prev
  );

  // Add animation effect when temperature changes
  useEffect(() => {
    if (Math.abs(temperature - prevTempRef.current) > 50) {
      const graph = graphRef.current;
      if (graph) {
        graph.classList.add('opacity-70');
        
        setTimeout(() => {
          graph.classList.remove('opacity-70');
          prevTempRef.current = temperature;
        }, 300);
      }
    }
  }, [temperature]);

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const wavelength = parseFloat(label);
      return (
        <div className="glass p-2 rounded-md text-xs">
          <p className="font-medium">{formatWavelength(wavelength)}</p>
          {payload.map((entry: any, index: number) => (
            <p key={index} style={{ color: entry.color }}>
              {entry.name}: {formatIntensity(entry.value)}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <Card className="w-full p-4 transition-opacity duration-300" ref={graphRef}>
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold">Spectral Radiance</h2>
          <div className="flex space-x-4 text-sm">
            <div className="flex items-center">
              <div className="w-3 h-3 rounded-full bg-planck mr-1"></div>
              <span>Planck</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 rounded-full bg-wien mr-1"></div>
              <span>Wien</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 rounded-full bg-rayleigh mr-1"></div>
              <span>Rayleigh-Jeans</span>
            </div>
          </div>
        </div>
        
        <div className="h-[400px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={dataset}
              margin={{ top: 10, right: 30, left: 0, bottom: 20 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" opacity={0.5} />
              <XAxis 
                dataKey="wavelength" 
                type="number" 
                scale="log" 
                domain={['auto', 'auto']}
                tickFormatter={formatWavelength}
                label={{ value: 'Wavelength (nm)', position: 'insideBottom', offset: -10 }}
              />
              <YAxis 
                tickFormatter={formatIntensity}
                domain={[0, 1.1]}
                label={{ value: 'Relative Spectral Radiance', angle: -90, position: 'insideLeft' }}
              />
              <Tooltip content={<CustomTooltip />} />
              <Legend />
              
              {/* Wien's displacement law - vertical line at peak wavelength */}
              <ReferenceLine 
                x={peakWavelength} 
                stroke="#FFCC00" 
                strokeDasharray="3 3"
                label={{ 
                  value: `Peak: ${formatWavelength(peakWavelength)}`, 
                  position: 'top',
                  fill: '#FFCC00' 
                }} 
              />
              
              {/* Peak highlight */}
              <ReferenceArea 
                x1={peakWavelength * 0.8} 
                x2={peakWavelength * 1.2} 
                fillOpacity={0.1} 
                fill="#FFCC00" 
              />
              
              {/* The three radiation laws */}
              <Line 
                type="monotone" 
                dataKey="planck" 
                stroke="#8B5CF6" 
                strokeWidth={3} 
                dot={false} 
                name="Planck" 
                activeDot={{ r: 6 }}
                animationDuration={500}
              />
              <Line 
                type="monotone" 
                dataKey="wien" 
                stroke="#F97316" 
                strokeWidth={2} 
                dot={false} 
                name="Wien"
                strokeDasharray="5 5" 
                animationDuration={500} 
              />
              <Line 
                type="monotone" 
                dataKey="rayleighJeans" 
                stroke="#0EA5E9" 
                strokeWidth={2} 
                dot={false} 
                name="Rayleigh-Jeans"
                strokeDasharray="3 3" 
                animationDuration={500} 
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
        
        <div className="text-xs text-muted-foreground italic text-center">
          Note: Graph shows normalized spectral radiance to highlight the relationships between the three laws
        </div>
      </div>
    </Card>
  );
};

export default RadiationGraph;
