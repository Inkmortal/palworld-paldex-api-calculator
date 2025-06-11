import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import BreedingCalculator from './pages/BreedingCalculator';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <header className="bg-blue-600 text-white p-4">
          <h1 className="text-2xl font-bold">Palworld Breeding Calculator</h1>
        </header>
        <main className="container mx-auto p-4">
          <Routes>
            <Route path="/" element={<BreedingCalculator />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;