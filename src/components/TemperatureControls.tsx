
import React from 'react';
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface TemperatureControlsProps {
  temperature: number;
  setTemperature: (temp: number) => void;
}

// Scientific preset temperatures (in Kelvin)
const presets = [
  { name: "Cosmic Background", temp: 2.7, description: "Cosmic Microwave Background" },
  { name: "Liquid Nitrogen", temp: 77, description: "Temperature of liquid nitrogen" },
  { name: "Room Temp", temp: 300, description: "Average room temperature" },
  { name: "Incandescent Bulb", temp: 2700, description: "Typical light bulb filament" },
  { name: "Sun's Surface", temp: 5778, description: "Temperature of the sun's photosphere" },
  { name: "Blue Star", temp: 10000, description: "Hot O-type star" }
];

const TemperatureControls: React.FC<TemperatureControlsProps> = ({ temperature, setTemperature }) => {
  const handleSliderChange = (value: number[]) => {
    setTemperature(value[0]);
  };
  
  // Format temperature with comma separators
  const formattedTemperature = temperature.toLocaleString();

  return (
    <div className="space-y-4 w-full max-w-2xl mx-auto">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Temperature</h2>
        <div className="text-lg font-medium">{formattedTemperature} K</div>
      </div>

      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Slider
              value={[temperature]}
              min={100}
              max={10000}
              step={10}
              onValueChange={handleSliderChange}
              className="py-2"
              aria-label="Adjust temperature"
            />
          </TooltipTrigger>
          <TooltipContent>
            <p>Drag to adjust temperature: {formattedTemperature} K</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>

      <div className="flex flex-wrap gap-2">
        {presets.map((preset) => (
          <TooltipProvider key={preset.name}>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setTemperature(preset.temp)}
                  className="flex-grow transition-all hover:scale-105"
                >
                  {preset.name}
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>{preset.description}: {preset.temp.toLocaleString()} K</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        ))}
      </div>
    </div>
  );
};

export default TemperatureControls;
