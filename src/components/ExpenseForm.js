import React from 'react';
import moment from 'moment';
import 'react-dates/initialize';
import {SingleDatePicker} from 'react-dates';
import 'react-dates/lib/css/_datepicker.css'

const now  = moment();
// console.log(now.format('MMM Do, YYYY'))

export default class ExpenseForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            description: props.expense ? props.expense.description : '',
            note: props.expense ? props.expense.note :'',
            amount: props.expense ? (props.expense.amount / 100).toString() :'',
            createdAt: props.expense ? moment(props.expense.createdAt) : moment(),
            calenderFocused: false,
            error:false
        }
    }
    onDescriptionChange = (e) => {
        const description = e.target.value
        this.setState(() => ({
            description
        }))
    }
    onNoteChange = (e) => {
        const note = e.target.value
        this.setState (() => ({
            note
        }))
    }
    onAmountChange = (e) => {
        const amount = e.target.value
        if(!amount || amount.match(/^\d{1,}(\.\d{0,2})?$/)){
            this.setState(() => ({
                amount
            }))
        }
    }
    onDateChange = (createdAt) => {
        if(createdAt){
            this.setState(() => ({
                createdAt
            }))
        }    
    }
    onFocusChange = ({focused}) => {
        this.setState(() => ({
            calenderFocused: focused
        }))
    }
    onSubmit = (e) => {
        e.preventDefault()
        if(!this.state.description || !this.state.amount) {
            this.setState(() => ({
                error: true
            }))
            
        }else {
            this.setState(() => ({
                error: false
            }))
            this.props.onSubmit({
                description: this.state.description,
                amount: parseFloat(this.state.amount, 10) * 100,
                createdAt: this.state.createdAt.valueOf(),
                note: this.state.note    
            })
        }
    }
    render () {
        return (
            <div>
                {this.state.error && <p>Please provide descrption and amount</p>}
                <form onSubmit={this.onSubmit}>
                    <table>
                        <tbody>
                            <tr>
                            <td>Description:</td>
                            <td>
                                <input  
                                    type='text'
                                    placeholder='Description'
                                    autoFocus
                                    value={this.state.description}
                                    onChange={this.onDescriptionChange}
                                />
                            </td>
                            </tr>
                        </tbody>
                        <tbody>
                            <tr>
                            <td>Amount:</td>
                            <td>
                                <input 
                                    type='text'
                                    placeholder='Amount'
                                    value={this.state.amount}
                                    onChange={this.onAmountChange}
                                />
                            </td>
                            </tr>
                        </tbody>
                        <tbody>
                            <tr>
                               <td>Date:</td> 
                               <td><SingleDatePicker 
                                date={this.state.createdAt}
                                onDateChange={this.onDateChange}
                                focused={this.state.calenderFocused}
                                onFocusChange={this.onFocusChange}
                                numberOfMonths={1}
                                isOutsideRange={() => false}
                               />
                               </td>
                            </tr>
                        </tbody>
                        <tbody>
                            <tr>
                            <td>Note:</td>
                            <td>
                                <textarea
                                    placeholder='Add a note for your expenses(optional)'
                                    value={this.state.note}
                                    onChange={this.onNoteChange}
                                >
                                </textarea>
                            </td>
                            </tr>
                        </tbody> 
                        <tbody>
                            <tr>
                            <td></td>
                            <td>
                                <button>Add Expense</button>
                            </td>
                            </tr>
                        </tbody>
                    </table>    
                    
                </form>

            </div>
        )
    }
}