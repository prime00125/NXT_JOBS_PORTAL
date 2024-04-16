 import {useState} from 'react'
import {useNavigate, Navigate} from 'react-router-dom'
import Cookies from 'js-cookie'
import './index.css'
const LoginPage = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [showError, setShowError] = useState(false)
  const [errMsg, seterrMsg] = useState('')
  const navigate = useNavigate()
  const settingUsername = event => {
    setUsername(event.target.value)
  }
  const settingPassword = event => {
    setPassword(event.target.value)
  }
  const successSubmit = jwtToken => {
    Cookies.set('jwt_token', jwtToken, {expires: 30})
    navigate('/')
  }
  const failureSubmit = eRRORMSG => {
    seterrMsg(eRRORMSG)
    setShowError(true)
  }
  const submitForm = async event => {
    event.preventDefault()
    const userDetails = {username, password}
    const api = `https://apis.ccbp.in/login`
    const option = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(api, option)
    const data = await response.json()
    if (response.ok) successSubmit(data.jwt_token)
    else failureSubmit(data.error_msg)
  }
  return (
    <form onSubmit={submitForm} className='login'>
      <label>
        username
        <input
          type='text'
          value={username}
          onChange={settingUsername}
          placeHolder='Enter Username'
        />
      </label>
      <label>
        password
        <input
          type='password'
          value={password}
          onChange={settingPassword}
          placeHolder='enter Password'
        />
      </label>
      <button className='btnlogin'> Login </button>
      {showError ? {errMsg} : ''}
    </form>
  )
}
export default LoginPage
