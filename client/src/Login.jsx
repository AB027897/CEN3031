import s from './css/Login.module.css';

function Login() {
  return (
    <div className={s.App}>
      <header className={s.App_header}>
        <h1 className={s.Title}>DonorGram</h1>
      </header>
      <body className={s.App_body}>
        <div className={s.ItemTitle}>
            <h2>Username</h2>
            <input className={s.TextField} type="text" placeholder="Enter Text..."/>
        </div>
        <div className={s.ItemTitle}>
            <h2>Password</h2>
            <input className={s.TextField} type="password" placeholder="Enter Text..."/>
        </div>
        <p className={s.ErrorText}>* No account found. Incorrect username or password</p>
        <button className={s.button}>SIGN IN</button>
        <p className={s.RedirectText}>Need an account? <a className={s.App_link} href="/signup" rel="noopener noreferrer">SIGN UP</a></p>
      </body>
    </div>
  );
}

export default Login;
