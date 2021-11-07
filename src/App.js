import React, { useState, useEffect } from 'react'
import List from './List'
import Alert from './Alert'

function App() {
  const [item, setItem] = useState('')
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
    if (!item) {
      // display alert
      showAlert(true, 'danger', 'please enter an item')
    } else if (item && isEditing) {
      // deal with edit
    } else {
      // show alert
      showAlert(true, 'success', 'item added to the list')
      const newItem = { id: new Date().getTime().toString(), title: item }
      setList([...list, newItem])
      setItem('')
    }
  }

  const showAlert = (show = false, type = '', msg = '') => {
    setAlert({ show, type, msg }) //default values
  }

  const clearList = () => {
    showAlert(true, 'danger', 'items cleared')
    setList([])
  }

  const removeItem = (id) => {
    /* Display items that does not have the id we are passing through,
       hence, filter for items without the id passed in */

    showAlert(true, 'danger', 'item removed')
    setList(list.filter((item) => item.id !== id))
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
            value={item}
            onChange={(e) => setItem(e.target.value)}
          />
          <button type="submit" className="submit-btn">
            {isEditing ? 'edit' : 'submit'}
          </button>
        </div>
      </form>
      {list.length > 0 && (
        <div className="grocery-container">
          <List items={list} removeItem={removeItem} />
          <button className="clear-btn" onClick={clearList}>
            Clear Items
          </button>
        </div>
      )}
    </section>
  )
}

export default App
