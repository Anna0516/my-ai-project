import React from "react"
import { useRecoilState } from 'recoil'
import RouterAtom from "../../atoms/RouterAtom"
import SignedInAtom from "../../atoms/SignedInAtom"
//import UserAtom from "../../atoms/UserAtom"
import UrlAtom from "../../atoms/UrlAtom"
import InputAtom from "../../atoms/InputAtom"

const Navigation = () => {
  const [signedIn, setSignedIn] = useRecoilState<boolean>(SignedInAtom)
  const [route, setRoute] = useRecoilState<string>(RouterAtom)
  //const [user, setUser] = useRecoilState(UserAtom)
  const [imageUrl, setImageUrl] = useRecoilState<string>(UrlAtom)
  const [urlInput, setUrlInput] = useRecoilState<string>(InputAtom)

  const signOutUser = () => {
    setRoute('signin')
    setSignedIn(false)
    //setUser('')
    setImageUrl('')
    setUrlInput('')
  }
  const signInUser = () => {
    setRoute('signin')
    setSignedIn(false)
  }

  const registerUser = () => {
    setRoute('register')
    setSignedIn(false)
  }

  if (signedIn === true) {
    return (
      <nav style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <p onClick={signOutUser} className="f3 link dim black underline pa3 pointer"> Sign out</p>
      </nav>
    )

  } else {
    return (
      <div>
        <nav style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <p onClick={signInUser} className="f3 link dim black underline pa3 pointer"> Sign in</p>
          <p onClick={registerUser} className="f3 link dim black underline pa3 pointer">Register</p>
        </nav>
      </div>
    )

  }

}
export default Navigation
