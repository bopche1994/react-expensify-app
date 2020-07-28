import React from 'react';
import {Link} from 'react-router-dom'

const ExpenseListItem = ({id, description, amount, createdAt}) => (
    <div>
        <Link to={`/edit/${id}`}>
        <h3>{description}</h3>
        </Link>
        <p>{amount} - {createdAt}</p>
    </div>
)

export default ExpenseListItem


// const ExpenseListItem = (props) => (
//     <div>
//         {props.expenses.map((expense) => {
//             return <Expense expense={expense} />
//         })}
//     </div>
// )

// const Expense = (props) => (
//     <div>
//         <p>Description: {props.expense.description}</p>
//         <p> Amount: {props.expense.amount}</p>
//         <p> CreatedAt: {props.expense.createdAt}</p>

//     </div>
    
// )
// export default ExpenseListItem