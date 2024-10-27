let income, compulsoryExpenses = [], budgetAllotmentExpenses = [], optionalExpenses = {
    mostPreferred: [],
    mediumPreferred: [],
    lessPreferred: []
}, financialGoals = {};

function openCategory(category) {
    let expenseName = prompt("Enter Expense Name:");
    let expenseAmount = parseFloat(prompt("Enter Budget for " + expenseName + ":"));
    if (category === "compulsory") {
        compulsoryExpenses.push({ name: expenseName, amount: expenseAmount });
    } else if (category === "budgetAllotment") {
        budgetAllotmentExpenses.push({ name: expenseName, amount: expenseAmount });
    } else if (category === "optional") {
        openOptionalModal();
    }
}

function openOptionalModal() {
    document.getElementById("optionalModal").style.display = "block";
}

function addExpense(preference) {
    let expenseName = prompt("Enter Expense Name:");
    let expenseAmount = parseFloat(prompt("Enter Budget for " + expenseName + ":"));
    optionalExpenses[preference].push({ name: expenseName, amount: expenseAmount });
}

function saveOptional() {
    document.getElementById("optionalModal").style.display = "none";
}

function openFinancialGoals() {
    let goalName = prompt("Enter Goal Name:");
    let goalAmount = parseFloat(prompt("Enter Amount Required for " + goalName + ":"));
    let goalPeriod = parseInt(prompt("Enter Time Period in Years for " + goalName + ":"));
    financialGoals = { name: goalName, amount: goalAmount, period: goalPeriod };
}

function analyzeBudget() {
    income = parseFloat(document.getElementById("income").value);
    
    let compulsoryTotal = compulsoryExpenses.reduce((sum, expense) => sum + expense.amount, 0);
    let budgetAllotmentTotal = budgetAllotmentExpenses.reduce((sum, expense) => sum + expense.amount, 0);
    let totalEssential = compulsoryTotal + budgetAllotmentTotal;
    
    let monthlyGoalSavings = financialGoals.amount / (financialGoals.period * 12);
    let remainingIncome = income - totalEssential - monthlyGoalSavings;

    let suggestions = `
        <h3>Budget Analysis</h3>
        <p>Monthly Savings Required for Goal: ₹${monthlyGoalSavings.toFixed(2)}</p>
        <p>Total Essential Expenses (Compulsory + Budget Allotment): ₹${totalEssential.toFixed(2)}</p>
        <p>Remaining Income for Optional Expenses: ₹${remainingIncome.toFixed(2)}</p>
        <h4>Optional Expense Suggestions:</h4>
        <ul>
            <li>Most Preferred: Max ₹${(remainingIncome * 0.5).toFixed(2)}</li>
            <li>Medium Preferred: Max ₹${(remainingIncome * 0.3).toFixed(2)}</li>
            <li>Less Preferred: Max ₹${(remainingIncome * 0.2).toFixed(2)}</li>
        </ul>
    `;
    
    document.getElementById("suggestions").innerHTML = suggestions;
}