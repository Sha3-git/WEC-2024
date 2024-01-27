// Home.jsx
import React from 'react';
import Header from '../components/Header';
function Home() {
  return (
    <>
      <div className="App">
        <Header />
        <header className="App-header p-5 text-center">
          <h1 className="display-4">Welcome to Our Home Page!</h1>
          <p className="lead">
            Our mission is to create a supportive and accessible space where adults with intellectual and/or cognitive disabilities can thrive and live their lives to the fullest. Here, you'll find a community dedicated to understanding and embracing the unique strengths of every individual. Explore the resources and discover opportunities that empower you to lead a fulfilling life.
          </p>
        </header>
      </div>
    </>
  );
}

export default Home;
