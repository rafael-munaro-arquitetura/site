import { useState, useEffect } from 'react';
import Home from './pages/Home';
import Loading from './components/Loading';
import CustomCursor from './components/CustomCursor';
import AnimatedBackground from './components/AnimatedBackground';
import WhatsAppButton from './components/WhatsAppButton';

function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Garantir que o loading apareça pelo menos por um momento
    const minLoadingTime = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(minLoadingTime);
  }, []);

  return (
    <>
      {isLoading && <Loading onLoadingComplete={() => setIsLoading(false)} />}
      <CustomCursor />
      <AnimatedBackground />
      <WhatsAppButton />
      <div className="app">
        <Home />
      </div>
    </>
  );
}

export default App;
