import { atom, RecoilState } from 'recoil'

const RegisteredEmailAtom: RecoilState<string> = atom({
  key: 'RegisteredEmail',
  default: '',
})
export default RegisteredEmailAtom
