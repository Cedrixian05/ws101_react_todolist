import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './list1.css';

function Title() {
  const [inputValue, setInputValue] = useState('');
  const [todos, setTodos] = useState([]);
  const [selectedTodo, setSelectedTodo] = useState(null);
  const [selectedDate, setSelectedDate] = useState(new Date());

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const addTodo = () => {
    if (inputValue.trim() === '') {
      alert("Please enter a task before adding.");
      return;
    }

    const newTodo = {
      id: Date.now(),
      text: inputValue,
      completed: false,
      date: null,
    };

    setTodos([...todos, newTodo]);
    setInputValue('');
  };

  const toggleTodo = (id) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const handleSaveClick = (id) => {
    setSelectedTodo(id);
    const todo = todos.find(todo => todo.id === id);
    if (todo && todo.date) {
      setSelectedDate(new Date(todo.date));
    } else {
      setSelectedDate(new Date());
    }
  };

  const saveDate = (date) => {
    setTodos(todos.map(todo =>
      todo.id === selectedTodo ? { ...todo, date: date } : todo
    ));
    setSelectedDate(date);
    setSelectedTodo(null);
  };

  const closeCalendarPopup = () => {
    setSelectedTodo(null);
  };

  return (
    <div className="Title">
      <section className="home" id="home">
        <section className="about" id="about">
          <div className="content">
            <div className="container-title">
              <h1>To Do List</h1>
            </div>
            <div className="container">
              <div className="inputcol">
                <textarea
                  name="text"
                  className="textarea"
                  value={inputValue}
                  onChange={handleInputChange}
                  placeholder="Enter your todo..."
                ></textarea>
                <button
                  type="button"
                  className="buttoninput"
                  onClick={addTodo}
                  aria-label="Add Todo"
                >
                  <i className="fa-solid fa-check"></i> Add Todo
                </button>
              </div>
            </div>
            <div className="todolist">
              {todos.map(todo => (
                <div key={todo.id} className="todo-container">
                  <div className={`itemall ${todo.completed ? 'checklist' : ''}`}>
                    <p
                      className="item"
                      onClick={() => toggleTodo(todo.id)}
                      title="Click to toggle completion"
                    >
                      {todo.text}
                    </p>
                    <div>
                      <button
                        onClick={() => handleSaveClick(todo.id)}
                        className="check-button"
                        aria-label="Set Due Date"
                      >
                        <i className="fa-solid fa-check"></i> Save
                      </button>
                      <button
                        onClick={() => deleteTodo(todo.id)}
                        className="trash-button"
                        aria-label="Delete Todo"
                      >
                        <i className="fa-solid fa-trash"></i> Delete
                      </button>
                    </div>
                  </div>
                  {todo.date && <p className="date">Saved Date: {new Date(todo.date).toDateString()}</p>}
                </div>
              ))}
            </div>
          </div>
        </section>
      </section>

      {selectedTodo && (
        <>
          <div className="popup-overlay active" onClick={closeCalendarPopup}></div>
          <div className="calendar-popup">
            <DatePicker
              selected={selectedDate}
              onChange={saveDate}
              inline
            />
            <button
              type="button"
              className="buttoninput"
              onClick={closeCalendarPopup}
              style={{ marginTop: '15px' }}
              aria-label="Close Calendar Popup"
            >
              Close
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default Title;
