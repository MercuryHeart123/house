const ListReducer = (state = false, action) => {
  switch (action.type) {
    case "update":
      state = action.data;
      return state;

    default:
      return state;
  }
};

export default ListReducer;
