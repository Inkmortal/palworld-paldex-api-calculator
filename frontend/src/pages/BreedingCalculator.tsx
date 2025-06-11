import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

interface Pal {
  id: number;
  key: string;
  name: string;
  image: string;
}

interface BreedingResult {
  child: Pal;
  probability: number;
  specialCombination: boolean;
}

const BreedingCalculator = () => {
  const [parent1, setParent1] = useState<string>('');
  const [parent2, setParent2] = useState<string>('');
  const [result, setResult] = useState<BreedingResult | null>(null);

  // Fetch all pals for dropdown
  const { data: palsData, isLoading } = useQuery({
    queryKey: ['pals'],
    queryFn: async () => {
      const response = await axios.get('/api/breeding/pals');
      return response.data;
    },
  });

  const calculateBreeding = async () => {
    if (!parent1 || !parent2) return;

    try {
      const response = await axios.get('/api/breeding/calculate', {
        params: { parent1, parent2 },
      });
      setResult(response.data);
    } catch (error) {
      console.error('Breeding calculation failed:', error);
      setResult(null);
    }
  };

  if (isLoading) return <div>Loading Pals...</div>;

  return (
    <div className="max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold mb-6">Breeding Calculator</h2>
      
      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div>
            <label className="block text-sm font-medium mb-2">Parent 1</label>
            <select
              value={parent1}
              onChange={(e) => setParent1(e.target.value)}
              className="w-full p-2 border rounded-md"
            >
              <option value="">Select a Pal</option>
              {palsData?.pals.map((pal: Pal) => (
                <option key={pal.key} value={pal.key}>
                  {pal.name}
                </option>
              ))}
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-2">Parent 2</label>
            <select
              value={parent2}
              onChange={(e) => setParent2(e.target.value)}
              className="w-full p-2 border rounded-md"
            >
              <option value="">Select a Pal</option>
              {palsData?.pals.map((pal: Pal) => (
                <option key={pal.key} value={pal.key}>
                  {pal.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        <button
          onClick={calculateBreeding}
          disabled={!parent1 || !parent2}
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 disabled:bg-gray-400"
        >
          Calculate Breeding Result
        </button>

        {result && (
          <div className="mt-6 p-4 bg-gray-50 rounded-md">
            <h3 className="text-xl font-semibold mb-2">Result:</h3>
            <div className="flex items-center gap-4">
              <img
                src={result.child.image}
                alt={result.child.name}
                className="w-20 h-20 object-contain"
              />
              <div>
                <p className="text-lg font-medium">{result.child.name}</p>
                {result.specialCombination && (
                  <p className="text-sm text-green-600">Special Combination!</p>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BreedingCalculator;