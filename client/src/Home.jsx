import React, { useState, useEffect } from 'react';
import { FiPlus, FiTrash2, FiCheck, FiEdit2 } from "react-icons/fi";
import axios from 'axios';

function Home() {
    //const apiDomain = 'https://narugopal-todo.vercel.app';
    const currentURL = window.location.href;

    const [todoText, setTodoText] = useState({ text: "" });
   
    const [isUpdating, setUpdating] = useState("");

    const [todo, setTodo] = useState([]);

    const getTodo = async () => {
        const res = await axios.get(`${currentURL}/api`)
        const data = await res.data;
        setTodo(data);
    }

    useEffect(() => {
        getTodo();
    }, [])


    const addUpdateTodo = async () => {
        if (todoText.text === '' || todoText.text.trim() === '') {
            alert('Enter text');
        } else {
            if (isUpdating === "") {
                const { text } = todoText;
                console.log(text);
                axios.post(`${currentURL}/api`, { text }).then((res) => {
                    console.log(res.data.message);
                    setTodoText({ text: "" });
                    getTodo();
                }).catch((err) => console.log(err));
                
            } else {
                axios.patch(`${currentURL}/api`, { _id: isUpdating, todoText })
                    .then((res) => {
                        setTodoText({ text: "" });
                        setUpdating("");
                        getTodo();
                    })
                    .catch((err) => console.log(err.message));
                   
            }
        }
    }

    const deleteTodo = (_id) => {
        axios.delete(`${currentURL}/api/${_id}`)
            .then((res) => {
                console.log(res.data);
                getTodo();   
            })
            .catch((err) => console.log(err));
           
    }

    const updateTodo = (_id, text) => {
        console.log("updated");
        setUpdating(_id);
        setTodoText(() => ({
            text: text
        }));
    }

    const inputChange = (e) => {
        setTodoText(() => ({
            ...todoText, [e.target.name]: e.target.value
        }))
    }




    return (
        <>
            <section className='mainsec'>
                <div className='container'>
                    <div>
                        <div className='row justify-content-center'>
                            <div className='col-lg-4'>
                                <div className='bg-white shadow rounded-3 overflow-hidden'>
                                    <div className='bg1 p-3 text-center'>
                                        <h1 className='h4 m-0 text-white fw-bold'>Todo</h1>
                                    </div>
                                    <div className='p-3'>
                                        <form method='POST'>
                                            <div className=''>
                                                <div className='d-flex'>
                                                    <div className="flex-grow-1 ">
                                                        <input type="text" placeholder="Enter Something.." className="form-control form-rounded" name="text" value={todoText.text} onChange={inputChange} />
                                                    </div>

                                                    <div className='flex-shrink-0 ms-2'>
                                                        <button type="button" onClick={addUpdateTodo} className="btn btn-primary  btn-circle">{isUpdating ? <FiCheck /> : <FiPlus />}</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </form>
                                        {todo.length > 0 ?
                                            <div className='mt-3'>
                                                <ul className='todolist'>
                                                    {
                                                        todo.map(item => {
                                                            return (
                                                                <li key={item._id}>
                                                                    <div className='text'>
                                                                        {item.text}
                                                                    </div>
                                                                    <div className="icons">
                                                                        <button onClick={() => updateTodo(item._id, item.text)} className='btn text-danger btn-circle '><FiEdit2 /></button>
                                                                        <button onClick={() => deleteTodo(item._id)} className='btn text-danger btn-circle '><FiTrash2 /></button>
                                                                    </div>

                                                                </li>
                                                            );
                                                        })
                                                    }
                                                </ul>
                                            </div>
                                            :

                                            ''
                                        }


                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </section>
        </>
    );
}

export default Home;
