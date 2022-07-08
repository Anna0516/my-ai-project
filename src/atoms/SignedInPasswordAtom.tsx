import { atom, RecoilState } from 'recoil'

const SignedInPasswordAtom: RecoilState<string> = atom({
  key: 'SignedInPassword',
  default: '',
})
export default SignedInPasswordAtom
