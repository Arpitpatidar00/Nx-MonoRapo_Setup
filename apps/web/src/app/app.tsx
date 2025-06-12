import { testApiAction } from '@accent-tech/services';
import { capitalize, ui } from '@accent-tech/utils';
import { useEffect, useState } from 'react';

export function App() {
  const [response, setResponse] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await testApiAction({
          params: {
            limit: 1,
            page: 1,
          },
        });
        setResponse(res);
      } catch (err) {
        console.error('API Error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const raw = ui('responses.success.contactUs.success');
  const message = capitalize(raw);

  return (
    <div>
      <h1>Frontend Service Example</h1>
      <p>
        {loading
          ? 'Loading...'
          : response
            ? JSON.stringify(response)
            : 'No data received'}
      </p>
      <h2>{message}</h2>
    </div>
  );
}

export default App;
