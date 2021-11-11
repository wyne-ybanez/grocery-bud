import React, { useState } from 'react'
import List from './List'
import Alert from './Alert'

function App() {
  const [name, setName] = useState('')
  const [list, setList] = useState([])
  const [isEditing, setIsEditing] = useState(false)
  const [editID, setEditID] = useState(null)
  const [alert, setAlert] = useState({
    show: false,
    msg: '',
    type: '',
  })
  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('Hello')
    // Handle empty value
    if (!name) {
      showAlert(true, 'danger', 'give me something to add 😅')
    }
    // Handle edit
    else if (name && isEditing) {
      setList(
        list.map((item) => {
          if (item.id === editID) {
            return { ...item, title: name }
          }
          return item
        })
      )
      setName('')
      setEditID(null)
      setIsEditing(false)
      showAlert(true, 'success', 'value changed 😃')
    }
    // Successfully Added
    else {
      showAlert(true, 'success', 'item added to the list 😋')
      const newItem = { id: new Date().getTime().toString(), title: name }
      setList([...list, newItem])
      setName('')
    }
  }

  const showAlert = (show = false, type = '', msg = '') => {
    setAlert({ show, type, msg }) //default values
  }

  const clearList = () => {
    showAlert(true, 'danger', 'items cleared as requested 😎')
    setList([])
  }

  const removeItem = (id) => {
    /* Display items that does not have the id we are passing through,
       hence, filter for items without the id passed in */

    showAlert(true, 'danger', 'item removed 🤔')
    setList(list.filter((item) => item.id !== id))
  }

  const editItem = (id) => {
    const specificItem = list.find((item) => item.id === id)
    setIsEditing(true)
    setEditID(id)
    setName(specificItem.title)
  }

  return (
    <section className="section-center">
      <form className="grocery-form" onSubmit={handleSubmit}>
        {alert.show && <Alert {...alert} removeAlert={showAlert} list={list} />}
        <div className="form-control">
          <input
            type="text"
            className="grocery"
            placeholder="Add your item here"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <button type="submit" className="submit-btn">
            {isEditing ? 'edit' : 'submit'}
          </button>
        </div>
      </form>
      {list.length > 0 && (
        <div className="grocery-container">
          <List items={list} removeItem={removeItem} editItem={editItem} />
          <button className="clear-btn" onClick={clearList}>
            Clear Items
          </button>
        </div>
      )}
    </section>
  )
}

export default App
