import { combineReducers} from 'redux'
import authReducer from './auth'
import currentUserReducer from './currenrUser'
import questionsReducer from './questions'


export default  combineReducers({
    authReducer,currentUserReducer,questionsReducer
})