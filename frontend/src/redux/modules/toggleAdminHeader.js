const ENTER = 'toggleAdminHeader/ENTER';
const LEAVE = 'toggleAdminHeader/LEAVE';

export const enter = () => ({type:ENTER});
export const leave = () => ({type:LEAVE});

const InitialState = {isAdmin:false};

const toggleAdminHeader = (state=InitialState, action) => {
    switch(action.type) {
        case ENTER:
            return {isAdmin:true};
        case LEAVE:
            return {isAdmin:false};
        default:
            return state;
    }
};

export default toggleAdminHeader;