let users = [];
let expenses = [];

function addUser() {
  const userName = document.getElementById("userName").value.trim();
  if (userName && !users.includes(userName)) {
    users.push(userName);
    updateUserList();
    updateExpenseUserSelect();
    document.getElementById("userName").value = '';  // Clear input field
  }
}

function addExpense() {
  const expenseDescription = document.getElementById("expenseDescription").value.trim();
  const expenseAmount = parseFloat(document.getElementById("expenseAmount").value);
  const selectedUser = document.getElementById("expenseUser").value;

  if (expenseDescription && expenseAmount > 0 && selectedUser) {
    const expense = { description: expenseDescription, amount: expenseAmount, user: selectedUser };
    expenses.push(expense);
    updateBalance();
    document.getElementById("expenseDescription").value = '';
    document.getElementById("expenseAmount").value = '';
    document.getElementById("expenseUser").value = '';
  }
}

function updateUserList() {
  const userList = document.getElementById("userList");
  userList.innerHTML = '';
  users.forEach(user => {
    const li = document.createElement("li");
    li.textContent = user;
    userList.appendChild(li);
  });
}

function updateExpenseUserSelect() {
  const expenseUserSelect = document.getElementById("expenseUser");
  expenseUserSelect.innerHTML = '<option value="">Select User</option>';
  users.forEach(user => {
    const option = document.createElement("option");
    option.value = user;
    option.textContent = user;
    expenseUserSelect.appendChild(option);
  });
}

function updateBalance() {
  const balanceList = document.getElementById("balanceList");
  balanceList.innerHTML = '';

  let balances = {};

  // Calculate total expenses per user
  expenses.forEach(expense => {
    if (!balances[expense.user]) {
      balances[expense.user] = 0;
    }
    balances[expense.user] += expense.amount;
  });

  const totalExpense = expenses.reduce((sum, expense) => sum + expense.amount, 0);
  const equalShare = totalExpense / users.length;

  // Calculate balance for each user and display "Should Pay" or "Should Receive"
  users.forEach(user => {
    const userBalance = (balances[user] || 0) - equalShare;
    const li = document.createElement("li");
    
    if (userBalance > 0) {
      li.textContent = `${user}: Should Receive ₹${userBalance.toFixed(2)}`; // The person who paid more should receive
    } else {
      li.textContent = `${user}: Should Pay ₹${Math.abs(userBalance).toFixed(2)}`; // The person who paid less should pay
    }

    balanceList.appendChild(li);
  });
}
