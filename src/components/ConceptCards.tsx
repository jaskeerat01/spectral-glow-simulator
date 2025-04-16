
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const ConceptCards: React.FC = () => {
  const concepts = [
    {
      title: "Planck's Law",
      description: "Describes the spectral density of electromagnetic radiation emitted by a black body in thermal equilibrium at a given temperature.",
      formula: "B(λ,T) = (2hc²/λ⁵) × 1/(e^(hc/λkT) - 1)",
      detail: "Developed by Max Planck in 1900, this law marked the beginning of quantum physics."
    },
    {
      title: "Wien's Approximation",
      description: "Approximation of Planck's Law valid for shorter wavelengths, where hc >> λkT.",
      formula: "B(λ,T) ≈ (2hc²/λ⁵) × e^(-hc/λkT)",
      detail: "Formulated by Wilhelm Wien in 1896, before Planck's complete solution."
    },
    {
      title: "Rayleigh-Jeans Law",
      description: "Classical approximation of Planck's Law valid for longer wavelengths, where hc << λkT.",
      formula: "B(λ,T) ≈ (2ckT)/λ⁴",
      detail: "Developed by Lord Rayleigh and James Jeans, it fails at short wavelengths (ultraviolet catastrophe)."
    },
    {
      title: "Wien's Displacement Law",
      description: "Determines the wavelength at which the spectral radiance of black-body radiation reaches its peak.",
      formula: "λₘₐₓ = b/T  (where b ≈ 2.898×10⁻³ m·K)",
      detail: "Shows that the peak wavelength is inversely proportional to temperature."
    },
    {
      title: "Stefan-Boltzmann Law",
      description: "Relates the total energy radiated per unit surface area to the temperature of a black body.",
      formula: "P = σT⁴  (where σ ≈ 5.67×10⁻⁸ W·m⁻²·K⁻⁴)",
      detail: "The total power increases with the fourth power of temperature."
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {concepts.map((concept, index) => (
        <Card key={index} className="hover:shadow-lg transition-all hover:translate-y-[-2px] glass">
          <CardHeader>
            <CardTitle>{concept.title}</CardTitle>
            <CardDescription>{concept.description}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="mb-2 p-2 bg-muted rounded-md overflow-x-auto">
              <pre className="text-sm">{concept.formula}</pre>
            </div>
            <p className="text-sm text-muted-foreground">{concept.detail}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default ConceptCards;
