import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { PieChart } from '@mui/x-charts/PieChart';

function Piechart() {
  const [sumWants, setSumWants] = useState(0);
  const [sumNeeds, setSumNeeds] = useState(0);
  const [sumExpenses, setSumExpenses] = useState(0);
  const id = localStorage.getItem('id');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const wantsResponse = await axios.get(`http://localhost:4000/want/${id}`);
        const needsResponse = await axios.get(`http://localhost:4000/need/${id}`);
        const expenseResponse = await axios.get(`http://localhost:4000/expense/${id}`);

        // Sum the amounts for each category
        const wantsData = wantsResponse.data.wants;
        const needsData = needsResponse.data.needs;
        const expenseData = expenseResponse.data.expense;

        const totalWants = wantsData.reduce((sum, want) => sum + want.amount, 0);
        const totalNeeds = needsData.reduce((sum, need) => sum + need.amount, 0);
        const totalExpenses = expenseData.reduce((sum, expense) => sum + expense.amount, 0);

        // Update state with the calculated sums
        setSumWants(totalWants);
        setSumNeeds(totalNeeds);
        setSumExpenses(totalExpenses);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [id]);

  return (
    <>
      <PieChart
        series={[
          {
            data: [
              { id: 0, value: sumWants, label: 'Wants' },
              { id: 1, value: sumNeeds, label: 'Needs' },
              { id: 2, value: sumExpenses, label: 'Expenses' },
            ],
          },
        ]}
        width={400}
        height={200}
      />
    </>
  );
}

export default Piechart;
