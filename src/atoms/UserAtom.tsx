import { atom, RecoilState } from 'recoil'
import { UserData } from '../models/UserData'

const UserAtom: RecoilState<any> = atom<UserData[]>({
  key: 'User',
  default: [],
})
export default UserAtom
