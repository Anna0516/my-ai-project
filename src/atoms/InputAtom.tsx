import { atom, RecoilState } from 'recoil'

const InputAtom: RecoilState<string> = atom({
  key: 'Input',
  default: '',
})
export default InputAtom
