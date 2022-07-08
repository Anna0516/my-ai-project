import { atom, RecoilState } from 'recoil'

const RegisteredNameAtom: RecoilState<string> = atom({
  key: 'RegisteredName',
  default: '',
})
export default RegisteredNameAtom
