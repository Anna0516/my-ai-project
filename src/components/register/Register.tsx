import React from "react"
import { useRecoilState } from 'recoil'
import RouterAtom from "../../atoms/RouterAtom"
import SignedInAtom from "../../atoms/SignedInAtom"
import RegisteredPasswordAtom from "../../atoms/RegisteredPasswordAtom"
import RegisteredEmailAtom from "../../atoms/RegisteredEmailAtom"
import RegisteredNameAtom from "../../atoms/RegisteredNameAtom"
import UserAtom from "../../atoms/UserAtom"

const Register = () => {
  const [signedIn, setSignedIn] = useRecoilState<boolean>(SignedInAtom)
  const [route, setRoute] = useRecoilState<string>(RouterAtom)
  const [registeredPassword, setRegisteredPassword] = useRecoilState<string>(RegisteredPasswordAtom)
  const [registeredEmail, setRegisteredEmail] = useRecoilState<string>(RegisteredEmailAtom)
  const [registeredName, setRegisteredName] = useRecoilState<string>(RegisteredNameAtom)
  const [user, setUser] = useRecoilState(UserAtom)

  const onNameChange = (event: { target: { value: string | ((currVal: string) => string) } }) => {
    setRegisteredName(event.target.value)
  }
  const onEmailChange = (event: { target: { value: string | ((currVal: string) => string) } }) => {
    setRegisteredEmail(event.target.value)
  }
  const onPasswordChange = (event: { target: { value: string | ((currVal: string) => string) } }) => {
    setRegisteredPassword(event.target.value)
  }

  const onSubmitSignIn = () => {
    fetch('https://intense-citadel-42732.herokuapp.com/register', {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: registeredEmail,
        password: registeredPassword,
        name: registeredName
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
  return (
    <article className="br3 ba b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">
      <main className="pa4 black-80">
        <div className="measure">
          <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
            <legend className="f1 fw6 ph0 mh0">Register</legend>
            <div className="mt3">
              <label className="db fw6 lh-copy f6" htmlFor="name">Name</label>
              <input
                onChange={onNameChange}
                className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                type="text"
                name="name"
                id="name" />
              <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
              <input
                onChange={onEmailChange}
                className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                type="email"
                name="email-address"
                id="email-address" />
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
              className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" type="submit" value="Register" />
          </div>

        </div>
      </main>
    </article>
  )
}
export default Register
