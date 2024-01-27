

function Home() {
  return (
    <>
    <div className="App">
      <nav className="navbar navbar-expand-lg navbar-dark" style={{ backgroundColor: '#051923' }}>
        <a className="navbar-brand" href="/">
          Your Logo or Brand
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ml-auto">
            <li className="nav-item active">
              <a className="nav-link" href="/">
                Home <span className="sr-only">(current)</span>
              </a>
            </li>
            <li className="nav-item active">
              <a className="nav-link" href="/Login.js">
                Login
              </a>
            </li>
            {/* Add more navigation items as needed */}
          </ul>
        </div>
      </nav>

      <header className="App-header p-5 text-center">
        <h1 className="display-4">Welcome to Our Home Page!</h1>
        <p className="lead">
          Our mission is to create a supportive and accessible space where adults with intellectual and/or cognitive disabilities can thrive and live their lives to the fullest. Here, you'll find a community dedicated to understanding and embracing the unique strengths of every individual. Explore the resources and discover opportunities that empower you to lead a fulfilling life.
        </p>
      </header>
    </div>
    </>
  )
}

export default Home