import logo_e from './Logo_Earth.png';
import logo_h from './Logo_Hands.png';
import s from './App.module.css';

function App() {
  return (
    <div className={s.App}>
      <header className={s.header}>
        <img src={logo_e} className={s.logo} alt="logo" />
        <img src={logo_h} className={s.hands} alt="hands" />
        <p className={s.Title}> DonorGram</p>
    <div className={s.App}>
      <header className={s.header}>
        <img src={logo_e} className={s.logo} alt="logo" />
        <img src={logo_h} className={s.hands} alt="hands" />
        <p className={s.Title}> DonorGram</p>
      </header>
      <div className={s.Links}>
        <p className={s.JoinNowText}>Join Today</p>
        <a href="/signup" rel="noopener noreferrer"><button className={s.Button1}>Create Account</button></a>
        <p className={s.AlreadyAccountText}>Already have an account?</p>
        <a href="/login" rel="noopener noreferrer"><button className={s.Button2}>Sign In</button></a>
      </div>
      <div className={s.Links}>
        <p className={s.JoinNowText}>Join Today</p>
        <a href="/signup" rel="noopener noreferrer"><button className={s.Button1}>Create Account</button></a>
        <p className={s.AlreadyAccountText}>Already have an account?</p>
        <a href="/login" rel="noopener noreferrer"><button className={s.Button2}>Sign In</button></a>
      </div>
    </div>
  );
}

export default App;