import { atom, RecoilState } from 'recoil'

const SignedInEmailAtom: RecoilState<string> = atom({
  key: 'SignedInEmail',
  default: '',
})
export default SignedInEmailAtom
