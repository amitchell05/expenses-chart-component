window.addEventListener("load", () => {
  fetch("./data.json").then((response) => {
    response.json().then((json) => {
      appendChartData(json);
    });
  });
});

function appendChartData(json) {
  const tbody = document.getElementById("spending-chart__body");
  const highestExpense = calculateHighestExpense(json);

  json.forEach((expense, index) => {
    const roundedExpense = Math.round(expense.amount);

    tbody.innerHTML += `
        <tr data-id="expense-${index + 1}">
            <th scope="row">${expense.day}</th>
            <td id="expense-amount" style="--size: calc(${roundedExpense}/ ${Math.round(
      highestExpense
    )})"><span class="data">${expense.amount}</span></td>
        </tr>
    `;

    if (expense.amount === highestExpense) {
      const highestExpenseElement = document.querySelector(
        `[data-id="expense-${index + 1}"]`
      );
      const highestExpenseBar = highestExpenseElement.querySelector("#expense-amount");
      highestExpenseBar.classList.add("spending-card__highest-expense");
    }
  });
}

function calculateHighestExpense(json) {
  // map creates an array of all of the expense amonuts
  return Math.max(...json.map((expense) => expense.amount));
}
