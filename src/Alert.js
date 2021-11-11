import React, { useEffect } from 'react'

const Alert = ({ type, msg, list, removeAlert }) => {
  // time out after a few seconds
  useEffect(() => {
    const timeout = setTimeout(() => {
      removeAlert()
    }, 3500)
    return () => clearTimeout(timeout)
  })
  return <p className={`alert alert-${type}`}>{msg}</p>
}

export default Alert
