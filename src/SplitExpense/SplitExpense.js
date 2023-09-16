import React, { useState } from 'react';

function SplitExpense({ friends, onSplit, splitClick, myWallet }) {
    const [expenseName, setExpenseName] = useState('');
    const [selectedFriendName, setSelectedFriendName] = useState('');
    const [totalExpense, setTotalExpense] = useState('');
    const [myContro, setMyContro] = useState('');
    const [friendContro, setFriendContro] = useState('');
    const [editAmount, setEditAmount] = useState('');
    const [errorMessage, setErrorMessage] = useState('');


    const handleAmount = (e) => {
        const inputValue = e.target.value;

        if (inputValue === '') {
            // If the input is empty, reset all related state values
            setTotalExpense('');
            setMyContro('');
            setFriendContro('');
        } else if (!isNaN(inputValue)) {
            // If the input is a valid number, update the state
            const expense = parseFloat(inputValue);
            setTotalExpense(expense);
            const divide = expense / 2;
            setMyContro(divide);
            setFriendContro(divide);
        }
    };

    const handleEditAmount = (e, inputType) => {
        const newAmount = parseFloat(e.target.value);
        setEditAmount(newAmount);

        if (inputType === 'friendContro') {
            const newMyContro = totalExpense - newAmount;
            setMyContro(newMyContro);
        } else if (inputType === 'myContro') {
            const newFriendContro = totalExpense - newAmount;
            setFriendContro(newFriendContro);
        }
    };

    const handleSplit = () => {
        if (!expenseName) {
            setErrorMessage('Please fill the expense name field...');
            return;
        }
        if (!selectedFriendName) {
            setErrorMessage('Please select a friend.');
            return;
        }
        if (!totalExpense) {
            setErrorMessage('Please enter total expense.');
            return;
        }

        const selectedFriend = friends.find((friend) => friend.name === selectedFriendName);

        //   console.log(selectedFriend)
        if (myWallet >= myContro) {
            onSplit(selectedFriend, myContro, friendContro, totalExpense);
            setFriendContro('')
            setMyContro('')
            setTotalExpense('')
            setExpenseName('')
            setEditAmount('')
            setErrorMessage('')
            setSelectedFriendName('')
        } else {
            setErrorMessage("You dont have enough money please ask your friend to pay the bill.")
        }
    }

    return (
        splitClick ? (
            <div className='rounded p-5 bg-dark text-white'>
                <h3 className='mb-5 text-center'>SPLIT EXPENSE</h3>
                <div className='d-flex justify-content-between mb-3'>
                    <label className='fw-bold me-3'>Expense Name :</label>
                    <input
                        type='text'
                        placeholder='Enter Expense Name...'
                        value={expenseName}
                        onChange={(e) => setExpenseName(e.target.value)}
                    />
                </div>
                <div className='d-flex justify-content-between mb-3'>
                    <label className='fw-bold me-3'>Select Friend : </label>
                    <select
                        className="ms-5"
                        value={selectedFriendName}
                        onChange={(e) => setSelectedFriendName(e.target.value)}
                    >
                        <option value="select friend">Select Friend</option>
                        {friends.map((friend, i) => (
                            <option value={friend.name} key={i}>
                                {friend.name}
                            </option>
                        ))}
                    </select>
                </div>
                <div className='d-flex justify-content-between mb-3'>
                    <label className='fw-bold me-3'>Enter Total Amount :</label>
                    <input
                        type='text'
                        placeholder='Enter Total Expense...'
                        value={totalExpense}
                        onChange={(e) => handleAmount(e)}
                    />
                </div>
                <div className='d-flex justify-content-between mb-3'>
                    <label className='fw-bold me-3'>Friend Contro :</label>
                    <input
                        type='text'
                        placeholder='Enter Friend Contro...'
                        defaultValue={editAmount ? editAmount : friendContro}
                        onChange={(e) => handleEditAmount(e, 'friendContro')}
                    />
                </div>
                <div className='d-flex justify-content-between mb-3'>
                    <label className='fw-bold me-3'>My Contro :</label>
                    <input
                        type='text'
                        placeholder='Enter Your Contro...'
                        value={myContro}
                        onChange={(e) => handleEditAmount(e, 'myContro')}
                    />
                </div>
                <p className='text-danger fw-bold'>{errorMessage ? errorMessage : ""}</p>
                <div className='text-center'>
                    <button className='btn btn-primary mt-3' onClick={handleSplit}>SPLIT</button>
                </div>
            </div>
        ) : null
    );
}
export default SplitExpense;