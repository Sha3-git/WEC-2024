import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import axios from 'axios';
import Piechart from '../components/piechart';
import Rows from '../components/Rows.jsx';
import FullFeaturedCrudGrid from '../components/Rows.jsx';

function Finance() {
  const id = localStorage.getItem('id');
  const [name, setname] = useState('');
  const [amount, setamount] = useState('');
  const [card, setcard] = useState('');
  const [category, setCategory] = useState('');
  const [submittedData, setSubmittedData] = useState([]);
  const [showWantsData, setShowWantsData] = useState(false);
  const [showNeedsData, setShowNeedsData] = useState(false);
  const [showExpensesData, setShowExpensesData] = useState(false);
  const [wants, setWants] = useState([]);
  const [needs, setNeeds] = useState([]);
  const [expenses, setExpenses] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch wants data
        const wantsResponse = await axios.get(`http://localhost:4000/want/${id}`);
        setSubmittedData((prevData) => [...prevData, ...wantsResponse.data.wants]);
        setWants(wantsResponse.data.wants);
        // Fetch needs data
        const needsResponse = await axios.get(`http://localhost:4000/need/${id}`);
        setSubmittedData((prevData) => [...prevData, ...needsResponse.data.needs]);
        setNeeds(needsResponse.data.needs);
        // Fetch expenses data
        const expensesResponse = await axios.get(`http://localhost:4000/expense/${id}`);
        setSubmittedData((prevData) => [...prevData, ...expensesResponse.data.expense]);
        setExpenses(expensesResponse.data.expense);
        console.log(wantsResponse, needsResponse, expensesResponse);
      } catch (error) {
        console.error('Data fetch failed:', error);
      }
    };

    fetchData();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newData = {
      id,
      name,
      amount,
      card,
    };

    try {
      let endpoint = '';  // Initialize endpoint variable

      // Determine the endpoint based on the selected category
      switch (category) {
        case 'wants':
          endpoint = 'http://localhost:4000/want';  // sends to want endpoint
          break;
        case 'needs':
          endpoint = 'http://localhost:4000/need';  // sends to need endpoint
          break;
        case 'expenses':
          endpoint = 'http://localhost:4000/expense';  // sends to expense endpoint
          break;
        default:
          console.error('Invalid category selected');
          return;
      }

      const response = await axios.post(endpoint, newData);

      console.log('Submission successful:', response.data);

      // Update the state with the submitted data
      setSubmittedData((prevData) => [...prevData, response.data.finance]);

      // Clear form fields
      setname('');
      setamount('');
      setcard('');
      setCategory('');
    } catch (error) {
      // Handle errors, such as displaying an error message to the user
      console.error('Submission failed:', error.response.data);
    }
  };

  return (
    <>
      <div className="App">
        <Header />
        <div className="container mt-5">
          <div className="row justify-content-center">
            <div className="col-md-6">
              <form onSubmit={handleSubmit} className="row g-3">
                {/* Item Name Textbox */}
                <div className="col-md-6 mb-3">
                  <label htmlFor="name" className="form-label">Item Name:</label>
                  <input
                    type="text"
                    className="form-control"
                    id="name"
                    value={name}
                    onChange={(e) => setname(e.target.value)}
                    required
                  />
                </div>

                {/* Item amount Textbox */}
                <div className="col-md-6 mb-3">
                  <label htmlFor="amount" className="form-label">Item amount:</label>
                  <input
                    type="text"
                    className="form-control"
                    id="amount"
                    value={amount}
                    onChange={(e) => setamount(e.target.value)}
                    required
                  />
                </div>

                {/* Payment Method Dropdown */}
                <div className="col-md-6 mb-3">
                  <label htmlFor="card" className="form-label">Payment Method:</label>
                  <select
                    className="form-control"
                    id="card"
                    value={card}
                    onChange={(e) => setcard(e.target.value)}
                    required
                  >
                    <option value="">Select Payment Method</option>
                    <option value="creditCard">Credit Card</option>
                    <option value="debitCard">Debit Card</option>
                  </select>
                </div>

                {/* Category Dropdown */}
                <div className="col-md-6 mb-3">
                  <label htmlFor="category" className="form-label">Category:</label>
                  <select
                    className="form-control"
                    id="category"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    required
                  >
                    <option value="">Select Category</option>
                    <option value="wants">Wants</option>
                    <option value="needs">Needs</option>
                    <option value="expenses">Expenses</option>
                  </select>
                </div>

                {/* Submit Button */}
                <div className="col-md-12">
                  <button type="submit" className="btn btn-primary w-100">Submit</button>
                </div>
              </form>
              {/* Toggle Buttons for Displaying Data */}
              <div className="mt-4">
                <button
                  className="btn btn-info mx-1"
                  onClick={() => setShowWantsData(!showWantsData)}
                >
                  {showWantsData ? 'Hide Wants Data' : 'Show Wants Data'}
                </button>
                <button
                  className="btn btn-info mx-1"
                  onClick={() => setShowNeedsData(!showNeedsData)}
                >
                  {showNeedsData ? 'Hide Needs Data' : 'Show Needs Data'}
                </button>
                <button
                  className="btn btn-info mx-1"
                  onClick={() => setShowExpensesData(!showExpensesData)}
                >
                  {showExpensesData ? 'Hide Expenses Data' : 'Show Expenses Data'}
                </button>
              </div>

              {/* Display Data Sections */}
              {showWantsData && (
                <div className="mt-4">
                  <h5>Wants Data:</h5>
                  <ul>
                    {wants.map((data, index) => (
                      <li key={index}>{`Item: ${data.name}, amount: ${data.amount}, Payment Method: ${data.card}`}</li>
                    ))}
                  </ul>
                </div>
              )}

              {showNeedsData && (
                <div className="mt-4">
                  <h5>Needs Data:</h5>
                  <ul>
                    {needs.map((data, index) => (
                      <li key={index}>{`Item: ${data.name}, amount: ${data.amount}, Payment Method: ${data.card}`}</li>
                    ))}
                  </ul>
                </div>
              )}

              {showExpensesData && (
                <div className="mt-4">
                  <h5>Expenses Data:</h5>
                  <ul>
                    {expenses
                      .map((data, index) => (
                        <li key={index}>{`Item: ${data.name}, amount: ${data.amount}, Payment Method: ${data.card}`}</li>
                      ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <Piechart />
      <div className="container d-flex justify-content-center p-5">
        <FullFeaturedCrudGrid id={id} wants={wants} expenses={expenses} needs={needs} showExpensesData={showExpensesData} showNeedsData={showNeedsData} showWantsData={showWantsData} />
      </div>
    </>
  );
}

export default Finance;