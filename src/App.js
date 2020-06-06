import React, { useState } from 'react'
import './App.css'
import Amplify, { Storage } from 'aws-amplify'
import {
  AmplifyAuthenticator,
  AmplifySignOut,
  AmplifySignIn,
  AmplifySignUp,
} from '@aws-amplify/ui-react'
import { MdSend /* MdList */ } from 'react-icons/md'
import awsConfig from './aws-exports'
Amplify.configure(awsConfig)

const App = () => {
  const [name, setName] = useState('')
  const [file, setFile] = useState('')
  const [response, setResponse] = useState('')

  const onChange = (e) => {
    e.preventDefault()
    if (e.target.files[0] !== null) {
      setFile(e.target.files[0])
      setName(e.target.files[0].name)
    }
  }

  const onSubmit = (e) => {
    e.preventDefault()
    if (file) {
      Storage.put(name, file, {
        /* level: 'protected', */
        contentType: file.type,
      })
        .then((result) => {
          console.log(result)
          setResponse(`Success uploading file: ${name}!`)
        })
        .then(() => {
          document.getElementById('file-input').value = null
          setFile(null)
        })
        .catch((err) => {
          console.log(err)
          setResponse(`Can't upload file: ${err}`)
        })
    } else {
      setResponse(`Files needed!`)
    }
  }

  return (
    <AmplifyAuthenticator>
      <AmplifySignIn
        headerText='AWS TCS Team, Sign-In with Your E-Mail Address'
        slot='sign-in'
      />
      <AmplifySignUp
        headerText='AWS TCS Team, Sign-Up with Your Valid E-Mail Address'
        slot='sign-up'
      />
      <div className='header'>
        <h2>
          <a href='/'>TCS Team Video Uploader</a>
        </h2>
      </div>
      <div className='video-uploader'>
        <form onSubmit={(e) => onSubmit(e)}>
          <p>
            <label className='select-label'>Select video: </label>
          </p>
          <p>
            <input
              className='video-input'
              type='file'
              id='file-input'
              accept='image/*, video/*'
              onChange={(e) => onChange(e)}
            />
          </p>
          <button type='submit' className='btn'>
            Submit <MdSend className='btn-icon' />
          </button>
        </form>
      </div>

      {response && (
        <div id='upload-status' className='upload-status'>
          {response}
        </div>
      )}

      <div className='sign-out'>
        <AmplifySignOut />
      </div>
    </AmplifyAuthenticator>
  )
}

export default App
