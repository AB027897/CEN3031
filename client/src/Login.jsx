import './Login.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1 className="Title">DonorGram</h1>
      </header>
      <body className="App-body">
        <div className="ItemTitle">
            <h2>Username</h2>
            <input className="TextField" type="text" placeholder="Enter Text..."/>
        </div>
        <div className="ItemTitle">
            <h2>Password</h2>
            <input className="TextField" type="password" placeholder="Enter Text..."/>
        </div>
        <p className="ErrorText">* No account found. Incorrect username or password</p>
        <button className="button">LOGIN</button>
        <p className="RedirectText">Need an account? <a className="App-link" href="/signup" rel="noopener noreferrer">SIGN UP</a></p>
      </body>
    </div>
  );
}

export default App;
