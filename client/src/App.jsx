import logo_e from './images/Logo_Earth.png';
import logo_h from './images/Logo_Hands.png';
import s from './css/App.module.css';

function App() {
  return (
    <div className={s.App}>
      <header className={s.LogoDiv}>
        <img src={logo_e} className={s.Earth} alt="logo" />
        <img src={logo_h} className={s.Hands} alt="hands" />
        <p className={s.Title}> DonorGram</p>
      </header>
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