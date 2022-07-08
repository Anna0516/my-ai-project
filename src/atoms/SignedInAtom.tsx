import { atom, RecoilState } from 'recoil'

const SignedInAtom: RecoilState<boolean> = atom({
  key: 'SignedIn',
  default: false,
})
export default SignedInAtom
