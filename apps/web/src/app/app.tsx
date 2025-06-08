import { useEffect, useState } from 'react';
import { ApiResponse } from '@accent-tech/types';
import { capitalize } from '@accent-tech/utils';
import { exampleService } from '@accent-tech/services';

export function App() {
  const [response, setResponse] = useState<ApiResponse | null>(null);
  console.log('response: ', response);

  useEffect(() => {
    exampleService();
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
