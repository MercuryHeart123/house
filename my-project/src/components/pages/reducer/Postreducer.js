const Postreducer = ( state = false, action) => {
    switch (action.type) {
        case 'add':
            state = false;
            return state;
    
        case 'edit':
            state = action.data;
            return state;
        default:
            return state;
    }

}

export default Postreducer;