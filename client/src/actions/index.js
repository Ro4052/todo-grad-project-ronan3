import axios from 'axios';

export const GET_TODOS = 'GET_TODOS';
export const CREATE_TODO = 'CREATE_TODO';
export const UPDATE_TODO = 'UPDATE_TODO';
export const DELETE_TODO = 'DELETE_TODO';
export const DELETE_COMPLETED = 'DELETE_COMPLETED';
export const DELETE_ANIMATE = 'DELETE_ANIMATE';

const animationLength = 300;

export const getTodos = () => {
  return (dispatch) => {
    axios.get('/api/todo').then((res) => {
      if (res.status === 200) {
        dispatch({
          type: GET_TODOS,
          payload: res.data
        });
      }
    });
  }
}

export const createTodo = (newTitle) => {
  return (dispatch) => {
    const todo = {
      title: newTitle,
      isComplete: false
    }
    axios.post('/api/todo', {
      title: todo.title,
      isComplete: todo.isComplete
    }).then((res) => {
      if (res.status === 201) {
        todo.id = res.data;
        return dispatch({
          type: CREATE_TODO,
          payload: todo
        });
      }
    });
  }
}

export const updateTodo = (todo) => {
  return (dispatch) => {
    axios.put(`/api/todo/${todo.id}`, {
      title: todo.title,
      isComplete: todo.isComplete
    }).then((res) => {
      if (res.status === 201) {
        dispatch({
          type: UPDATE_TODO
        });
      }
    });
  }
}

export const deleteTodo = (id) => {
  return (dispatch, getState) => {
    axios.delete(`/api/todo/${id}`).then((res) => {
      if (res.status === 200) {
        const todos = getState().todos;
        const todo = todos.find((otherTodo) => otherTodo.id === id);
        todo.deleted = true;
        dispatch({
          type: DELETE_ANIMATE,
          payload: todo
        });
        setTimeout(() => {
          dispatch({
            type: DELETE_TODO,
            payload: id
          });
        }, animationLength);
      }
    });
  }
}

export const deleteCompleted = () => {
  return (dispatch, getState) => {
    axios.delete('/api/todo').then((res) => {
      if (res.status === 200) {
        getState().todos.forEach((todo) => {
          if (todo.isComplete) {
            todo.deleted = true;
            dispatch({
              type: DELETE_ANIMATE,
              payload: todo
            });
          }
        });
        setTimeout(() => {
          dispatch({
            type: DELETE_COMPLETED
          });
        }, animationLength);
      }
    });
  }
}
