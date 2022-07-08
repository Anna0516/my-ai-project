import React from "react"
import './ImageLinkForm.css'
import { useRecoilState } from 'recoil'
import UrlAtom from "../../atoms/UrlAtom"
import InputAtom from "../../atoms/InputAtom"
import BoxAtom from "../../atoms/BoxAtom"
import UserAtom from "../../atoms/UserAtom"


const ImageLinkForm = () => {
  const [urlInput, setUrlInput] = useRecoilState<string>(InputAtom)
  const [imageUrl, setImageUrl] = useRecoilState<string>(UrlAtom)
  const [box, setBox] = useRecoilState<object>(BoxAtom)
  const [user, setUser] = useRecoilState(UserAtom)

  const calculateFaceLocation = (data: string) => {
    const clarifaiFace = JSON.parse(data).outputs[0].data.regions[0]
      .region_info.bounding_box;
    const image: any = document.getElementById("inputimage");
    const width = Number(image.width);
    const height = Number(image.height);
    return {
      leftCol: clarifaiFace.left_col * width,
      topRow: clarifaiFace.top_row * height,
      rightCol: width - (clarifaiFace.right_col * width),
      bottomRow: height - (clarifaiFace.bottom_row * height),
    };
  }

  const displayFaceBox = (box: object) => {
    setBox(box)
  }

  function onInputChange(event: { target: { value: any; }; }) {
    setUrlInput(event.target.value)
    console.log(event.target.value)

  }
  function onButtonSubmit() {

    setImageUrl(urlInput)
    const raw = JSON.stringify({
      "user_app_id": {
        "user_id": "",
        "app_id": "77babee5850a46879e2aaa7869477ff6"
      },
      "inputs": [
        {
          "data": {
            "image": {
              "url": urlInput
            }
          }
        }
      ]
    });

    //Not the best solution with the key like that, still learning...

    const requestOptions = {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Authorization': 'Key 903498c8d0ad49b2bf2491cc9a521bf0'
      },
      body: raw
    };

    fetch("https://api.clarifai.com/v2/models/face-detection/versions/6dc7e46bc9124c5c8824be4822abe105/outputs", requestOptions)
      .then((response) => response.text())
      .then((response) => {
        if (response) {
          fetch('https://intense-citadel-42732.herokuapp.com/image', {
            method: 'put',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              id: user.id
            })
          })
            .then(response => response.json())
            .then(count => {
              setUser(Object.assign({ ...user }, { entries: count }))
            })
        }
        displayFaceBox(calculateFaceLocation(response))

      })

      .catch((error) => console.log('error', error));

  }
  return (
    <div>
      <p className="f3">
        {'This magic brain will detect faces in your pictures. Give it at try. (Sorry, will only find one face though...)'}
      </p>
      <div className="center">
        <div className="center form pa4 br3 shadow-5">
          <input className="f4 pa2 w-70 center" type='text' value={urlInput} onChange={onInputChange} />
          <button className="w-30 grow f4 link ph3 pv2 dib white bg-light-purple"
            onClick={onButtonSubmit}
          >Detect</button>
        </div>
      </div>
    </div>
  )
}
export default ImageLinkForm
