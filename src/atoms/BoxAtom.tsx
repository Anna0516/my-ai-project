import { atom, RecoilState } from 'recoil'
import { BoxData } from '../models/BoxData'

const BoxAtom: RecoilState<any> = atom<BoxData[]>({
  key: 'Box',
  default: [],
})
export default BoxAtom
