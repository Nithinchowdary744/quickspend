document.getElementById("expense-form").addEventListener("submit", function(event) {
  event.preventDefault();
  const amount = document.getElementById("amount").value;
  const category = document.getElementById("category").value;
  const description = document.getElementById("description").value;

  if (!amount || !category) {
    alert("Amount and Category are required.");
    return;
  }

  const expense = {
    amount: parseFloat(amount),
    category,
    description,
    date: new Date().toLocaleDateString()
  };

  const expenses = JSON.parse(localStorage.getItem("expenses") || "[]");
  expenses.push(expense);
  localStorage.setItem("expenses", JSON.stringify(expenses));
  document.getElementById("expense-form").reset();
  renderExpenses();
});

function renderExpenses() {
  const list = document.getElementById("expense-list");
  list.innerHTML = "";
  const expenses = JSON.parse(localStorage.getItem("expenses") || "[]");
  expenses
    .filter(exp => exp.date === new Date().toLocaleDateString())
    .forEach(exp => {
      const li = document.createElement("li");
      li.textContent = `${exp.amount} - ${exp.category}${exp.description ? " (" + exp.description + ")" : ""}`;
      list.appendChild(li);
    });
}

window.onload = renderExpenses;