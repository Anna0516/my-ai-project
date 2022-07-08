import React from "react"
import { useRecoilState } from 'recoil'
import UrlAtom from "../../atoms/UrlAtom"
import BoxAtom from "../../atoms/BoxAtom"
import './FaceRecognition.css'

const FaceRecognition = () => {

  const [imageUrl] = useRecoilState<string>(UrlAtom)
  const [box] = useRecoilState(BoxAtom)


  return (
    <div className="center ma">
      <div className="absolute mt2">
        <img id="inputimage" alt='' src={imageUrl} width="500px" height="auto" />
        <div className="bounding-box" style={{ top: box.topRow, right: box.rightCol, bottom: box.bottomRow, left: box.leftCol }}>
        </div>
      </div>

    </div>
  )
}
export default FaceRecognition
