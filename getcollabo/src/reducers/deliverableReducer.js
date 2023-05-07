export const INITIAL_STATE = {
    influencer: JSON.parse(localStorage.getItem("influencer"))?._id,
    deliverable: [],
};

export const deliverableReducer = (state, action) => {
    switch (action.type) {
        case "ADD_DELIVERABLE":
            return {
                ...state,
                deliverable: [...state.deliverable, action.payload],
            };
        case "REMOVE_DELIVERABLE":
            return {
                ...state,
                deliverable: state.deliverable.filter(
                (deliverable) => deliverable._id !== action.payload
                ),
            };
        
        default:
            return state;
    };
};