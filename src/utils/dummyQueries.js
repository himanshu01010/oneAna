export const dummyQueries = [
    {
      id: 'q1',
      name: 'Select all customers',
      query: 'SELECT * FROM customers;',
      timestamp: new Date().toISOString()
    },
    {
      id: 'q2',
      name: 'Customers by country',
      query: 'SELECT country, COUNT(*) as customer_count FROM customers GROUP BY country;',
      timestamp: new Date(Date.now() - 86400000).toISOString()
    },
    {
      id: 'q3',
      name: 'Customers in Germany',
      query: "SELECT * FROM customers WHERE country = 'Germany';",
      timestamp: new Date(Date.now() - 172800000).toISOString()
    },
    {
      id: 'q4',
      name: 'Customers without fax',
      query: 'SELECT * FROM customers WHERE fax IS NULL;',
      timestamp: new Date(Date.now() - 259200000).toISOString()
    }
  ];