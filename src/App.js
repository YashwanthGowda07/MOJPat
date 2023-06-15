import React, { useEffect, useState } from 'react';
import axios from 'axios';
export default NumberManagementService;

function NumberManagementService() {
  const [numbers, setNumbers] = useState([]);

  useEffect(() => {
    const fetchNumbers = async () => {
      const urls = [
        'http://104.211.219.98/numbers/primes',
    'http://104.211.219.98/numbers/fibo',
    'http://104.211.219.98/numbers/odd',
    'http://104.211.219.98/numbers/rand'
      ];

      try {
        const responseList = await Promise.all(urls.map(url => axios.get(url)));
        const fetchedNumbers = responseList.reduce((acc, response) => {
          if (response.status === 200) {
            return acc.concat(response.data.numbers || []);
          }
          return acc;
        }, []);

        setNumbers(fetchedNumbers);
      } catch (error) {
        console.error('Error fetching numbers:', error);
      }
    };

    fetchNumbers();
  }, []);

  return (
    <div>
      <h1>Numbers:</h1>
      <ul>
        {numbers.map((number, index) => (
          <li key={index}>{number}</li>
        ))}
      </ul>
    </div>
  );
}


