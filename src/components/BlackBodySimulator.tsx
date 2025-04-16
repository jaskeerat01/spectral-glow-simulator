
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { stefanBoltzmannLaw, wienDisplacementLaw } from './PhysicsCalculations';

import RadiationGraph from './RadiationGraph';
import BlackBodyVisual from './BlackBodyVisual';
import TemperatureControls from './TemperatureControls';
import ConceptCards from './ConceptCards';
import { ThemeToggle } from './ThemeToggle';

const BlackBodySimulator: React.FC = () => {
  const [temperature, setTemperature] = useState(6000); // Default to approximately the Sun's surface temperature

  // Calculate key values
  const peakWavelength = wienDisplacementLaw(temperature);
  const totalPower = stefanBoltzmannLaw(temperature);

  // Format peak wavelength for display
  const formattedWavelength = peakWavelength < 1000
    ? `${Math.round(peakWavelength)} nm`
    : `${(peakWavelength / 1000).toFixed(2)} μm`;

  // Format total power with proper scientific notation
  const formatPower = (power: number) => {
    if (power < 1000) {
      return `${power.toFixed(2)} W/m²`;
    }
    return `${(power).toExponential(2)} W/m²`;
  };

  return (
    <div className="min-h-screen w-full py-6 px-4 md:px-8 flex flex-col animate-fadeIn">
      <header className="w-full max-w-7xl mx-auto flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold">Black Body Radiation Simulator</h1>
          <p className="text-muted-foreground">Interactive visualization of Planck's Law and related phenomena</p>
        </div>
        <ThemeToggle />
      </header>

      <main className="flex-grow w-full max-w-7xl mx-auto space-y-6 pb-10">
        {/* Main simulation area */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Left column: Visual and temperature controls */}
          <div className="lg:col-span-1 space-y-6">
            <Card>
              <CardContent className="pt-6">
                <BlackBodyVisual temperature={temperature} />
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Key Values</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="text-sm text-muted-foreground">Peak Wavelength (Wien's Law)</p>
                  <p className="text-xl font-medium">{formattedWavelength}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Total Power (Stefan-Boltzmann)</p>
                  <p className="text-xl font-medium">{formatPower(totalPower)}</p>
                </div>
              </CardContent>
            </Card>
          </div>
          
          {/* Right column: Graph and controls */}
          <div className="lg:col-span-3 space-y-6">
            <RadiationGraph temperature={temperature} />
            
            <Card>
              <CardContent className="pt-6">
                <TemperatureControls 
                  temperature={temperature} 
                  setTemperature={setTemperature} 
                />
              </CardContent>
            </Card>
          </div>
        </div>
        
        {/* Tabs section for education content */}
        <Tabs defaultValue="concepts" className="mt-8">
          <TabsList className="grid w-full grid-cols-2 max-w-md mx-auto">
            <TabsTrigger value="concepts">Physics Concepts</TabsTrigger>
            <TabsTrigger value="about">About</TabsTrigger>
          </TabsList>
          
          <TabsContent value="concepts" className="mt-4">
            <ConceptCards />
          </TabsContent>
          
          <TabsContent value="about" className="mt-4">
            <Card>
              <CardHeader>
                <CardTitle>About this Simulator</CardTitle>
                <CardDescription>Understanding Black Body Radiation</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <p>
                  A black body is an idealized physical body that absorbs all incident electromagnetic radiation, 
                  regardless of frequency or angle of incidence. It then emits thermal radiation according to Planck's law.
                </p>
                
                <p>
                  This simulator demonstrates how black body radiation changes with temperature, showing the relationship 
                  between Planck's law, Wien's approximation, and the Rayleigh-Jeans law. The visual representation changes 
                  color to approximate the appearance of a black body at the selected temperature.
                </p>
                
                <p>
                  Black body radiation explains many physical phenomena, from the color of stars to the cosmic microwave 
                  background radiation left over from the Big Bang. It was also central to the development of quantum mechanics.
                </p>
                
                <h3 className="text-lg font-medium mt-4">How to Use</h3>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Use the slider to adjust the temperature between 100K and 10,000K</li>
                  <li>Click preset buttons to jump to temperatures of common objects</li>
                  <li>Observe how the peak wavelength shifts and the total power increases with temperature</li>
                  <li>Compare the three theoretical models on the graph</li>
                  <li>Toggle between light and dark mode using the button in the top-right corner</li>
                </ul>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
      
      <footer className="mt-auto w-full max-w-7xl mx-auto border-t pt-6">
        <div className="text-sm text-muted-foreground text-center">
          <p>© 2025 Physics Simulator | Created for educational purposes</p>
        </div>
      </footer>
    </div>
  );
};

export default BlackBodySimulator;
