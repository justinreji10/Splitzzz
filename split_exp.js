document.addEventListener("DOMContentLoaded", () => {
    const splitterForm = document.getElementById("splitter-form");
    const splitTableBody = document.getElementById("split-table-body");
    const totalExpenseDisplay = document.getElementById("total-expense");
    const clearAllButton = document.getElementById("clear-all");

    let expenses = [];

    // Add expense to the table
    splitterForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const name = document.getElementById("expense-name").value;
        const amount = parseFloat(document.getElementById("expense-amount").value);
        const members = document.getElementById("members").value.split(',').map(m => m.trim());

        const eachPays = (amount / members.length).toFixed(2);

        const expense = {
            id: Date.now(),
            name,
            amount,
            members,
            eachPays
        };

        expenses.push(expense);
        displayExpenses();
        updateTotalExpense();

        splitterForm.reset();
    });

    // Display expenses in the table
    function displayExpenses() {
        splitTableBody.innerHTML = "";

        expenses.forEach(expense => {
            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${expense.name}</td>
                <td>₹${expense.amount.toFixed(2)}</td>
                <td>${expense.members.join(", ")}</td>
                <td>₹${expense.eachPays}</td>
                <td>
                    <button class="edit-btn" data-id="${expense.id}">Edit</button>
                    <button class="delete-btn" data-id="${expense.id}">Delete</button>
                </td>
            `;
            splitTableBody.appendChild(row);
        });
    }

    // Update total expense
    function updateTotalExpense() {
        const total = expenses.reduce((sum, expense) => sum + expense.amount, 0);
        totalExpenseDisplay.textContent = total.toFixed(2);
    }

    // Handle edit and delete actions
    splitTableBody.addEventListener("click", (e) => {
        const id = parseInt(e.target.dataset.id);

        if (e.target.classList.contains("delete-btn")) {
            expenses = expenses.filter(expense => expense.id !== id);
            displayExpenses();
            updateTotalExpense();
        }

        if (e.target.classList.contains("edit-btn")) {
            const expense = expenses.find(expense => expense.id === id);

            document.getElementById("expense-name").value = expense.name;
            document.getElementById("expense-amount").value = expense.amount;
            document.getElementById("members").value = expense.members.join(", ");

            expenses = expenses.filter(exp => exp.id !== id);
            displayExpenses();
            updateTotalExpense();
        }
    });

    // Clear all expenses
    clearAllButton.addEventListener("click", () => {
        expenses = [];
        displayExpenses();
        updateTotalExpense();
    });
});