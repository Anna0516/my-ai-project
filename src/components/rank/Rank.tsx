import React from "react"
import { useRecoilState } from 'recoil'
import UserAtom from "../../atoms/UserAtom"

const Rank = () => {
  const [user] = useRecoilState(UserAtom)
  return (
    <div>
      <div className="white f3">
        {`${user.name}, your current entry count is...`}
      </div>
      <div className="white f1">
        {`${user.entries}`}
      </div>
    </div>
  )
}
export default Rank
