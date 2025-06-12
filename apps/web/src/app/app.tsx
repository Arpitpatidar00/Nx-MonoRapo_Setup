import { exampleService } from '@accent-tech/services';
import { ApiResponse } from '@accent-tech/types';
import { capitalize } from '@accent-tech/utils';
import { useEffect, useState } from 'react';

export function App() {
  const [response, setResponse] = useState<ApiResponse | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const result = await exampleService();
      setResponse(result);
    };

    fetchData();
  }, []);

  const raw = 'hello from utils!';
  const message = capitalize(raw);

  return (
    <div>
      <h1>Frontend Service Example</h1>
      <p>{response ? response.message : 'Loading...'}</p>
      <h1>{message}</h1>
    </div>
  );
}

export default App;
