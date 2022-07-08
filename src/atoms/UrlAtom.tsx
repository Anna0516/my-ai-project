import { atom, RecoilState } from 'recoil'

const UrlAtom: RecoilState<string> = atom({
  key: 'Url',
  default: '',
})
export default UrlAtom
