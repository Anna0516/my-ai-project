
import { useRecoilState } from 'recoil'
import RouterAtom from './atoms/RouterAtom';
import Home from './components/Home'
import Navigation from './components/navigation/Navigation';
import SignIn from './components/signIn/SignIn';
import Register from './components/register/Register';
import './App.css';




const App = () => {
  const [route] = useRecoilState<string>(RouterAtom)


  return (
    <div className="App">
      <Navigation />
      {route === 'home' ?
        <div>

          <Home />

        </div>
        : (
          route === 'signin' ?
            <SignIn />
            : <Register />
        )}

    </div>
  );
}

export default App;
