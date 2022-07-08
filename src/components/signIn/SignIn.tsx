import React from "react"
import { useRecoilState } from 'recoil'
import RouterAtom from "../../atoms/RouterAtom"
import SignedInAtom from "../../atoms/SignedInAtom"
import SignedInPasswordAtom from "../../atoms/SignedInPasswordAtom"
import SignedInEmailAtom from "../../atoms/SignedInEmailAtom"
import UserAtom from "../../atoms/UserAtom"

const SignIn = () => {
  const [signedIn, setSignedIn] = useRecoilState<boolean>(SignedInAtom)
  const [route, setRoute] = useRecoilState<string>(RouterAtom)
  const [signedInEmail, setSignedInEmail] = useRecoilState<string>(SignedInEmailAtom)
  const [signedInPassword, setSignedInPassword] = useRecoilState<string>(SignedInPasswordAtom)
  const [user, setUser] = useRecoilState(UserAtom)

  const onEmailChange = (event: { target: { value: string | ((currVal: string) => string) } }) => {
    setSignedInEmail(event.target.value)
  }
  const onPasswordChange = (event: { target: { value: string | ((currVal: string) => string) } }) => {
    setSignedInPassword(event.target.value)
  }
  const onSubmitSignIn = () => {
    fetch('https://intense-citadel-42732.herokuapp.com/signin', {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: signedInEmail,
        password: signedInPassword
      })
    })
      .then(response => response.json())
      .then(user => {
        if (user.id) {
          loadUser(user)
          signInUser()
        }
      })

  }
  const loadUser = (data: {
    joined: any; entries: number; id: string; name: string; email: string
  }) => {
    setUser({
      id: data.id,
      name: data.name,
      email: data.email,
      entries: data.entries,
      joined: data.joined

    })
  }

  const signInUser = () => {
    setRoute('home')
    setSignedIn(true)
  }
  const registerUserNow = () => {
    setRoute('register')
    setSignedIn(false)
  }
  return (
    <article className="br3 ba b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">
      <main className="pa4 black-80">
        <div className="measure">
          <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
            <legend className="f1 fw6 ph0 mh0">Sign In</legend>
            <div className="mt3">
              <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
              <input
                onChange={onEmailChange}
                className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                type="email"
                name="email-address" id="email-address" />
            </div>
            <div className="mv3">
              <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
              <input
                onChange={onPasswordChange}
                className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                type="password"
                name="password"
                id="password" />
            </div>

          </fieldset>
          <div className="">
            <input
              onClick={onSubmitSignIn}
              className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" type="submit" value="Sign in" />
          </div>
          <div className="lh-copy mt3">
            <p onClick={registerUserNow} className="f6 link dim black db pointer">Register</p>

          </div>
        </div>
      </main>
    </article>
  )
}
export default SignIn
