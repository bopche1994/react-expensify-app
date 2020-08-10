import React from 'react';
import {Link} from 'react-router-dom'
import moment from 'moment'
import numeral from 'numeral'

const ExpenseListItem = ({id, description, amount, createdAt}) => (

        <Link className='list-item' to={`/edit/${id}`}>
            <div>
                <h3 className='list-item__title'>{description}</h3>
                <span className='list-item__sub-title'> {moment(createdAt).format('MMMM DD, YYYY')}</span>
            </div>
            <div>
                <h3 className='list-item__data'>{numeral(amount/100).format('$0,0.00')}</h3>
            </div>
        </Link>
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