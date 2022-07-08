import { atom, RecoilState } from 'recoil'

const RouterAtom: RecoilState<string> = atom({
  key: 'Router',
  default: '',
})
export default RouterAtom
