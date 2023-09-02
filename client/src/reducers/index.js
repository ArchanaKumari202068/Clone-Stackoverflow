import { combineReducers} from 'redux'
import authReducer from './auth'
import currentUserReducer from './currenrUser'


export default  combineReducers({
    authReducer,currentUserReducer
})