import React, { useState } from 'react'
import './App.css'
import Amplify, { Storage } from 'aws-amplify'
import {
  AmplifyAuthenticator,
  AmplifySignOut,
  AmplifySignIn,
  AmplifySignUp,
} from '@aws-amplify/ui-react'
import { MdSend } from 'react-icons/md'
import awsConfig from './aws-exports'
Amplify.configure(awsConfig)

const App = () => {
  const [name, setName] = useState('')
  const [file, setFile] = useState('')
  const [response, setResponse] = useState('')

  const onChange = (e) => {
    e.preventDefault()
    setFile(e.target.files[0])
    setName(e.target.files[0].name)
  }

  const onSubmit = (e) => {
    e.preventDefault()
    Storage.put(name, file, {
      contentType: file.type,
    })
      .then((result) => {
        console.log(result)
        setResponse(`Success uploading file: ${name}!`)
      })
      .catch((err) => {
        console.log(err)
        setResponse(`Can't upload file: ${err}`)
      })
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
              id='video'
              accept='image/*, video/*'
              onChange={(e) => onChange(e)}
            />
          </p>
          <button type='submit' className='btn'>
            Submit <MdSend className='btn-icon' />
          </button>
        </form>
      </div>

      {response && <div className='upload-status'>{response}</div>}

      <div className='sign-out'>
        <AmplifySignOut />
      </div>
    </AmplifyAuthenticator>
  )
}

export default App
