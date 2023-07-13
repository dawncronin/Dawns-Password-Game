import { useState } from 'react'
import './App.css'
import Error from './error.tsx'

export default function App() {
  const [password, setPassword] = useState("")
  const [error, setError] = useState<string[]>([])
  const [confirm, setConfirm] = useState(false)
  const [confirmPassword, setCofirmPassword] = useState("")
  let [finished, setFinished] = useState(false)

  function validatePassword(password: string) {
    let lengthError = "Password must be at least 5 characters"
    let currentErrors = false
    if (password.length < 5) {
      currentErrors = true
      if (error.length == 0 || !error.find(e => e == lengthError)) {
        setError(ce => [...ce, lengthError])
      }
    } else {
      setError((ce) => {
        return ce.filter(e => e != lengthError)
      })
    }

    let exciteError = "Password must include an !"
    if (!password.includes("!")) {
      currentErrors = true
      if (error.length == 0 || !error.find(e => e == exciteError)) {
        setError(ce => [...ce, exciteError])
      }
    } else {
      setError((ce) => {
        return ce.filter(e => e != exciteError)
      })
    }

    let monthError = "Password must include the current month"
    let today = new Date()
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]

    if (!password.includes(months[today.getMonth()])) {
      currentErrors = true
      if (error.length == 0 || !error.find(e => e == monthError)) {
        setError(ce => [...ce, monthError])
      }
    } else {
      setError((ce => {
        return ce.filter(e => e != monthError)
      }))
    }

    if (!currentErrors) {
      setConfirm(() => true)
    } else {
      setConfirm(false)
    }
  }

  function comparePasswords(confirmPassword: string) {
    if (confirmPassword != password) {
      setError(["Passwords must match"])
    } else {
      setFinished(true)
    }
  }

  return (
    <div>
      {finished ? <h1>Congrats!</h1> :
        <div>
          <h2>Choose a password:</h2>
          <div className="input">
            <input value={password} disabled={confirm} type={confirm ? "password" : "text"} onChange={(e) => {
              setPassword(e.target.value)
              validatePassword(e.target.value)
            }}>
            </input>
            <div>
              {error.length ? error.map(e => Error(e))
                : <div></div>
              }
            </div>
            <div>
              {confirm ? <div>
                <h3> Please confirm your password:</h3>
                <input value={confirmPassword} onChange={(e) => {
                  setCofirmPassword(e.target.value)
                  comparePasswords(e.target.value)
                }}></input>
              </div>
                : <div></div>}
            </div>
          </div>
        </div>}
    </div>
  )
}
