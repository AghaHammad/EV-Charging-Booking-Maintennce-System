import { BrowserRouter as Router } from 'react-router-dom';
import AppRoutes from './routes/AppRouter.jsx';

function App() {
  return (
    <Router>
      <AppRoutes />
    </Router>
  );
}

export default App;