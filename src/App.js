import { useState } from "react";
import { MdDeleteSweep } from "react-icons/md";
import { FaRegEdit } from "react-icons/fa";
import {TiTick} from "react-icons/ti"
import "./App.css";

function App() {
  const [text, setText] = useState("");
  const [list, setList] = useState([]);

  let addItem = () => {
    if (text.trim() !== "") {
      setList([...list, { text, isEditing: false }]);
      setText("");
    } else {
      alert("Please enter a non-empty todo x.");
    }
  };
// Alldelete
  let deleteAll = () => {
    setList([]);
  };
// Remove
  const removeItem = (i) => {
    const newList = [...list];
    newList.splice(i, 1);
    setList(newList);
  };

  // Edit
  const startEditing = (i) => {
    const newList = [...list];
    newList[i].isEditing = true;
    setList(newList);
  };

  const handleEditChange = (i, newText) => {
    const newList = [...list];
    newList[i].text = newText;
    setList(newList);
  };

  const saveEdit = (i) => {
    const newList = [...list];
    newList[i].isEditing = false;
    setList(newList);
  };

  return (
    <div className="main_div row d-flex justify-content-center align-items-center m-0 p-0 w-100 ">
      <div className="todo_main col-11 col-md-9 col-lg-7 my-1 p-0  mx-0 shadow-lg">
        <div className="todo_head row d-flex justify-content-center align-items-center  text-center m-0 p-5 ">
          <h1 className="todo_heading">Todo List</h1>
          <div className="todo_input_div row d-flex justify-content-evenly align-items-center m-0 p-0 mt-3">
            {/* input field */}
            <div className="todo_input col-9 m-0 p-0 rounded-2">
              <input
                type="text"
                className="form-control shadow"
                placeholder="Write your todo list here"
                aria-label="Email"
                aria-describedby="basic-addon2"
                value={text}
                onChange={(e) => {
                  setText(e.target.value);
                }}
              />
            </div>
            {/* add button */}
            <div className=" col-3">
              <button
                type="button"
                className="
                add_btn btn btn-light px-4 px-md-5 shadow"
                onClick={addItem}
              >
                Add
              </button>
            </div>
          </div>
        </div>
        <div className="row d-flex justify-content-center align-items-center  m-0 px-2 Item_list_body   ">
          <div
            className="row d-flex justify-content-between py-1 sticky-top "
            style={{ background: "#ffffff" }}
          >
            <div className="col-8  col-lg-8 col-xl-10 d-flex justify-content-center  flex-column ">
              <h3 className="todo_list_heading">List of Item Todo</h3>
            </div>
            <div className="col-4 col-lg-4 col-xl-2 text-end d-flex justify-content-center  flex-column ">
              <text
                className={`${list.length > 0 ? "btn-nonEmpty " : "btn-empty"}`}
                onClick={deleteAll}
                disabled={list.length === 0}
              >
                Delete All
              </text>
            </div>
          </div>
          {list.map((x, i) => (
            <div
              key={i}
              className="row d-flex justify-content-center align-items-center m-2 list_item py-2 shadow-sm"
            >
              <div className="col-10">
                {x.isEditing ? (
                  <input
                    type="text"
                    value={x.text}
                    className="edit_input w-100"
                    onChange={(e) => handleEditChange(i, e.target.value)}
                  />
                ) : (
                  <p className="List_item_text">{x.text}</p>
                )}
              </div>
              <div className="col-1 text-end">
                {x.isEditing ? (
                  <button className="Edit_btn" onClick={() => saveEdit(i)}>
                    <TiTick size={25} />
                  </button>
                ) : (
                  <button
                    className="Edit_btn"
                    onClick={() => startEditing(i)}
                  >
                    <FaRegEdit size={22} />
                  </button>
                )}
              </div>
              <div className="col-1 text-end">
                <button className="dlt_btn" onClick={() => removeItem(i)}>
                  <MdDeleteSweep size={28} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
