import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1 className="Title">DonorGram</h1>
      </header>
      <body className="App-body">
        <div className="TextEntry">
            <h2>Username</h2>
            <input className="TextField" type="text" defaultValue="Enter Text..."/>
        </div>
        <div className="TextEntry">
            <h2>Password</h2>
            <input className="TextField" type="text" defaultValue="Enter Text..."/>
        </div>
        <p className="ErrorText">* No account found. Incorrect username or password</p>
        <p className="button">LOGIN</p>
        <p className="RedirectText">Need an account? <a className="App-link" href="http://localhost:3000/sign-up" rel="noopener noreferrer">SIGN UP</a></p>
      </body>
    </div>
  );
}

export default App;
