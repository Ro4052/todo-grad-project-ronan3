import {
  GET_TODOS,
  CREATE_TODO,
  UPDATE_TODO,
  DELETE_TODO,
  DELETE_COMPLETED
} from '../actions';

const initialState = {
  todos: []
};

export default (state=initialState, action) => {
  switch (action.type) {
    case GET_TODOS: {
      return { ...state, todos: action.payload };
    }
    case CREATE_TODO: {
      return { ...state, todos: [...state.todos, action.payload] };
    }
    case UPDATE_TODO: {
      const todos = [...state.todos];
      todos[todos.indexOf(action.payload)] = action.payload;
      return { ...state, todos: todos };
    }
    case DELETE_TODO: {
      const todos = state.todos.filter((todo) =>
        todo.id !== action.payload
      );
      return { ...state, todos: todos };
    }
    case DELETE_COMPLETED: {
      const todos = state.todos.filter((todo) =>
          !todo.isComplete
        );
      return { ...state, todos: todos };
    }
    default:
      return state;
  }
};
