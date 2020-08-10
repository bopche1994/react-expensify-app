import React from 'react';
import {connect} from 'react-redux';
import ExpenseForm from './ExpenseForm';
import {startEditExpenses, startRemoveExpense} from '../actions/expenses'
const EditExpensePage = (props) => {
    // console.log(props.expense)
    return (
        <div> 
            <div className='page-header'>
                <div className='content-container'>
                    <h1 className='page-header__title'>Edit Expense</h1>
                </div>
            </div>
            <div className='content-container'>
                <ExpenseForm 
                    expense={props.expense}
                    onSubmit={(expense) => {
                        props.dispatch(startEditExpenses(props.expense.id, expense))
                        props.history.push('/dashboard')
                    }}
                />
                <button className='button button--secondary' onClick={() => {
                    props.dispatch(startRemoveExpense({id:props.expense.id}))
                    props.history.push('/dashboard')
                }}> Remove Expense</button>
            </div>
        </div>
    )
}
//  Editing the expense with id of {props.match.params.id}  <br/>
const mapStateToProps = (state, props) => {
    return {
        expense: state.expenses.find((expense) => expense.id === props.match.params.id)
    }
}
export default connect(mapStateToProps)(EditExpensePage)