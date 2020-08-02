import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import AppRouter, { history } from './routers/AppRouter';
import configureStore from './store/configureStore';
import {startSetExpenses} from './actions/expenses';
import { login, logout} from './actions/auth';
import { getVisibleExpenses } from  './selectors/expenses'
import'normalize.css/normalize.css';
import './styles/styles.scss';
import 'react-dates/lib/css/_datepicker.css';
import { firebase } from './firebase/firebase';


  
const store = configureStore();
const jsx = (
    <Provider store={store}>
        <AppRouter/>
    </Provider>
)

let hasRendered = false;
const renderApp = () => {
    if(!hasRendered) {
        ReactDOM.render(jsx, document.getElementById('app'));
        hasRendered =  true
    }
}

ReactDOM.render(<p>Loading...</p>, document.getElementById('app'));




firebase.auth().onAuthStateChanged((user) => {
    if(user){
        // console.log('log in')
        // console.log('uid', user.uid)
        store.dispatch(login(user.uid))
        store.dispatch(startSetExpenses()).then(() => {
            renderApp()
            if(history.location.pathname === '/'){
                history.push('/dashboard')
            }
        })
    } else {
        // console.log('log out')
        store.dispatch(logout())
        renderApp()
        history.push('/')
    }
})



// import {addExpense} from './actions/expenses';
// import {setTextFilter} from './actions/filters';
// import getVisibleExpenses from './selectors/expenses'
// console.log(store.getState());
// store.subscribe(() => {
//     const state = store.getState()
//     const visibleExpenses = getVisibleExpenses(state.expenses, state.filters)
//     console.log(visibleExpenses)
// })


// const expenseOne = store.dispatch(addExpense({description: 'Water Bill', amount: 10, createdAt: 1000}));
// const expenseTwo = store.dispatch(addExpense({description: 'Gas Bill', amount: 20, createdAt: 2000}));
// const expenseThree = store.dispatch(addExpense({description: 'Rent', amount: 30, createdAt: -2000}));
// const expenseFour = store.dispatch(addExpense({description: 'Cofffee', amount: 40, createdAt: -1000}));

// store.dispatch(setTextFilter('water'))

// setTimeout(() => {
//     store.dispatch(setTextFilter('bill'))
// }, 3000)
// const state = store.getState()
// const visibleExpenses = getVisibleExpenses(state.expenses, state.filters)
// console.log(visibleExpenses)

// const jsx = (
//     <Provider store={store}>
//         <AppRouter/>
//     </Provider>
    
// )
// ReactDOM.render(jsx, document.getElementById('app'));
