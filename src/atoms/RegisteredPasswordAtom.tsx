import { atom, RecoilState } from 'recoil'

const RegisteredPasswordAtom: RecoilState<string> = atom({
  key: 'RegisteredPassword',
  default: '',
})
export default RegisteredPasswordAtom
