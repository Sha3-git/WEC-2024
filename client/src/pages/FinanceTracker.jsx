import React, { useState } from 'react';
import Header from '../components/Header';
import axios from 'axios';

function Finance() {
  const [itemName, setItemName] = useState('');
  const [itemCost, setItemCost] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('');
  const [category, setCategory] = useState('');
  const [submittedData, setSubmittedData] = useState([]);
  const [showWantsData, setShowWantsData] = useState(false);
  const [showNeedsData, setShowNeedsData] = useState(false);
  const [showExpensesData, setShowExpensesData] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newData = {
      itemName,
      itemCost,
      paymentMethod,
      category,
    };

    try {
      const response = await axios.post('http://localhost:4000/finance', newData);

      // Handle the response based on your backend API's structure
      console.log('Submission successful:', response.data);

      // Update the state with the submitted data
      setSubmittedData((prevData) => [...prevData, response.data.finance]);

      // Clear form fields
      setItemName('');
      setItemCost('');
      setPaymentMethod('');
      setCategory('');
    } catch (error) {
      // Handle errors, e.g., display an error message to the user
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
                  <label htmlFor="itemName" className="form-label">Item Name:</label>
                  <input
                    type="text"
                    className="form-control"
                    id="itemName"
                    value={itemName}
                    onChange={(e) => setItemName(e.target.value)}
                    required
                  />
                </div>

                {/* Item Cost Textbox */}
                <div className="col-md-6 mb-3">
                  <label htmlFor="itemCost" className="form-label">Item Cost:</label>
                  <input
                    type="text"
                    className="form-control"
                    id="itemCost"
                    value={itemCost}
                    onChange={(e) => setItemCost(e.target.value)}
                    required
                  />
                </div>

                {/* Payment Method Dropdown */}
                <div className="col-md-6 mb-3">
                  <label htmlFor="paymentMethod" className="form-label">Payment Method:</label>
                  <select
                    className="form-control"
                    id="paymentMethod"
                    value={paymentMethod}
                    onChange={(e) => setPaymentMethod(e.target.value)}
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
                    {submittedData
                      .filter((data) => data.category === 'wants')
                      .map((data, index) => (
                        <li key={index}>{`Item: ${data.itemName}, Cost: ${data.itemCost}, Payment Method: ${data.paymentMethod}`}</li>
                      ))}
                  </ul>
                </div>
              )}

              {showNeedsData && (
                <div className="mt-4">
                  <h5>Needs Data:</h5>
                  <ul>
                    {submittedData
                      .filter((data) => data.category === 'needs')
                      .map((data, index) => (
                        <li key={index}>{`Item: ${data.itemName}, Cost: ${data.itemCost}, Payment Method: ${data.paymentMethod}`}</li>
                      ))}
                  </ul>
                </div>
              )}

              {showExpensesData && (
                <div className="mt-4">
                  <h5>Expenses Data:</h5>
                  <ul>
                    {submittedData
                      .filter((data) => data.category === 'expenses')
                      .map((data, index) => (
                        <li key={index}>{`Item: ${data.itemName}, Cost: ${data.itemCost}, Payment Method: ${data.paymentMethod}`}</li>
                      ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}


export default Finance;
