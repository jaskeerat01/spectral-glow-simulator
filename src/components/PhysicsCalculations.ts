// Constants
export const SPEED_OF_LIGHT = 299792458; // m/s
export const PLANCK_CONSTANT = 6.62607015e-34; // J⋅s
export const BOLTZMANN_CONSTANT = 1.380649e-23; // J/K
export const STEFAN_BOLTZMANN = 5.670374419e-8; // W/(m²⋅K⁴)

// Convert wavelength from nanometers to meters
export const nmToM = (wavelength: number): number => wavelength * 1e-9;

// Convert meters to nanometers
export const mToNm = (wavelength: number): number => wavelength * 1e9;

/**
 * Planck's Law: Spectral radiance of a black body at a given temperature
 * @param wavelength - Wavelength in nanometers
 * @param temperature - Temperature in Kelvin
 * @returns Spectral radiance in W⋅sr⁻¹⋅m⁻³
 */
export const planckLaw = (wavelength: number, temperature: number): number => {
  const lambda = nmToM(wavelength);
  const h = PLANCK_CONSTANT;
  const c = SPEED_OF_LIGHT;
  const k = BOLTZMANN_CONSTANT;
  const T = temperature;

  // Planck's Law formula
  const numerator = 2 * h * c * c / Math.pow(lambda, 5);
  const denominator = Math.exp((h * c) / (lambda * k * T)) - 1;
  
  return numerator / denominator;
};

/**
 * Wien's Approximation: Approximation of Planck's Law for short wavelengths
 * @param wavelength - Wavelength in nanometers
 * @param temperature - Temperature in Kelvin
 * @returns Spectral radiance in W⋅sr⁻¹⋅m⁻³
 */
export const wienApproximation = (wavelength: number, temperature: number): number => {
  const lambda = nmToM(wavelength);
  const h = PLANCK_CONSTANT;
  const c = SPEED_OF_LIGHT;
  const k = BOLTZMANN_CONSTANT;
  const T = temperature;

  // Wien's approximation formula
  const numerator = 2 * h * c * c / Math.pow(lambda, 5);
  const denominator = Math.exp((h * c) / (lambda * k * T));
  
  return numerator / denominator;
};

/**
 * Rayleigh-Jeans Law: Approximation of Planck's Law for long wavelengths
 * @param wavelength - Wavelength in nanometers
 * @param temperature - Temperature in Kelvin
 * @returns Spectral radiance in W⋅sr⁻¹⋅m⁻³
 */
export const rayleighJeansLaw = (wavelength: number, temperature: number): number => {
  const lambda = nmToM(wavelength);
  const c = SPEED_OF_LIGHT;
  const k = BOLTZMANN_CONSTANT;
  const T = temperature;

  // Rayleigh-Jeans formula
  return (2 * c * k * T) / Math.pow(lambda, 4);
};

/**
 * Wien's Displacement Law: Calculate peak wavelength
 * @param temperature - Temperature in Kelvin
 * @returns Peak wavelength in nanometers
 */
export const wienDisplacementLaw = (temperature: number): number => {
  // Wien's displacement constant (b) in m·K
  const b = 2.8977719e-3;
  
  // Peak wavelength in meters
  const peakWavelengthM = b / temperature;
  
  // Convert to nanometers and return
  return mToNm(peakWavelengthM);
};

/**
 * Stefan-Boltzmann Law: Total power radiated per unit surface area
 * @param temperature - Temperature in Kelvin
 * @returns Power in W/m²
 */
export const stefanBoltzmannLaw = (temperature: number): number => {
  return STEFAN_BOLTZMANN * Math.pow(temperature, 4);
};

/**
 * Convert temperature to RGB color approximating black body radiation
 * @param temperature - Temperature in Kelvin
 * @returns RGB color as string
 */
export const temperatureToColor = (temperature: number): string => {
  // Approximation based on temperature
  let r, g, b;

  // Normalize temperature to a manageable range
  const temp = Math.max(1000, Math.min(temperature, 40000)) / 100;
  
  // Red component
  if (temp <= 66) {
    r = 255;
  } else {
    r = temp - 60;
    r = 329.698727446 * Math.pow(r, -0.1332047592);
    r = Math.max(0, Math.min(255, r));
  }
  
  // Green component
  if (temp <= 66) {
    g = temp;
    g = 99.4708025861 * Math.log(g) - 161.1195681661;
  } else {
    g = temp - 60;
    g = 288.1221695283 * Math.pow(g, -0.0755148492);
  }
  g = Math.max(0, Math.min(255, g));
  
  // Blue component
  if (temp >= 66) {
    b = 255;
  } else if (temp <= 19) {
    b = 0;
  } else {
    b = temp - 10;
    b = 138.5177312231 * Math.log(b) - 305.0447927307;
    b = Math.max(0, Math.min(255, b));
  }

  // Convert to hex
  return `rgb(${Math.round(r)}, ${Math.round(g)}, ${Math.round(b)})`;
};

/**
 * Calculate maximum intensity across temperature range
 * @param minTemp - Minimum temperature in Kelvin
 * @param maxTemp - Maximum temperature in Kelvin
 * @returns Maximum intensity
 */
export const calculateMaxIntensity = (minTemp: number, maxTemp: number): number => {
  const tempSteps = 10; // Number of temperature points to check
  let maxIntensity = 0;
  
  for (let i = 0; i < tempSteps; i++) {
    const temp = minTemp + (i * (maxTemp - minTemp) / (tempSteps - 1));
    const { planck } = generateDataset(temp);
    const maxAtTemp = Math.max(...planck);
    maxIntensity = Math.max(maxIntensity, maxAtTemp);
  }
  
  return maxIntensity * 1.1; // Add 10% margin
};

/**
 * Generate dataset for plotting
 * @param temperature - Temperature in Kelvin
 * @param points - Number of data points
 * @returns Arrays of wavelengths and intensities
 */
export const generateDataset = (temperature: number, points = 500) => {
  // Fixed wavelength range from 100nm to 3000nm
  const minWavelength = 100;
  const maxWavelength = 3000;
  
  const wavelengths: number[] = [];
  const planckValues: number[] = [];
  const wienValues: number[] = [];
  const rayleighJeansValues: number[] = [];
  
  // Generate data points with fixed range
  for (let i = 0; i < points; i++) {
    // Use logarithmic spacing for better visualization
    const t = i / (points - 1);
    const wavelength = minWavelength * Math.pow(maxWavelength / minWavelength, t);
    
    wavelengths.push(wavelength);
    planckValues.push(planckLaw(wavelength, temperature));
    wienValues.push(wienApproximation(wavelength, temperature));
    rayleighJeansValues.push(rayleighJeansLaw(wavelength, temperature));
  }
  
  // Get the global maximum intensity for normalization
  const maxPlanck = Math.max(...planckValues);
  
  const normalizedPlanck = planckValues.map(value => value / maxPlanck);
  const normalizedWien = wienValues.map(value => value / maxPlanck);
  const normalizedRayleigh = rayleighJeansValues.map(value => Math.min(value / maxPlanck, 5));
  
  return {
    wavelengths,
    planck: normalizedPlanck,
    wien: normalizedWien,
    rayleighJeans: normalizedRayleigh,
    peakWavelength: wienDisplacementLaw(temperature)
  };
};
