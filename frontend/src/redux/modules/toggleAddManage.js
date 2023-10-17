const ADDKEYWORD = 'toggleAddManage/ADDKEYWORD';
const MANAGEKEYWORD = 'toggleAddManage/MANAGEKEYWORD';
const INDEX = 'toggleAddManage/INDEX';

export const addPage = () => ({type:ADDKEYWORD});
export const managePage = () => ({type:MANAGEKEYWORD});
export const indexPage = () => ({type:INDEX})

const InitialState = {isAddPage: false, isManagePage: false};

const toggleAdminHeader = (state=InitialState, action) => {
    switch(action.type) {
        case ADDKEYWORD:
            return {isAddPage: true, isManagePage: false};
        case MANAGEKEYWORD:
            return {isAddPage: false, isManagePage: true};
        case INDEX:
            return {isAddPage: false, isManagePage: false};
        default:
            return state;
    }
};

export default toggleAdminHeader;