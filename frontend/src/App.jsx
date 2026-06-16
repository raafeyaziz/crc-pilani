import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <Router>
      <div className="min-h-screen p-8">
        <Routes>
          <Route path="/" element={<h1 className="text-4xl">crc.pilani</h1>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;