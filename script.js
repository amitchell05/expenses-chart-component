const DAYS = {
  0: "sun",
  1: "mon",
  2: "tue",
  3: "wed",
  4: "thu",
  5: "fri",
  6: "sat",
};

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
  const currentDay = new Date().getDay();

  json.forEach((expense, index) => {
    const roundedExpense = Math.round(expense.amount);

    tbody.innerHTML += `
        <tr data-id="expense-${index + 1}">
            <th scope="row">${expense.day}</th>
            <td style="--size: calc(${roundedExpense}/ ${Math.round(highestExpense)})">
              <span class="data">${expense.amount}</span>
              <span class="tooltip">$${expense.amount}</span>
            </td>
        </tr>
    `;

    if (expense.day === DAYS[currentDay]) {
      highlightCurrentDay(`expense-${index + 1}`);
    }
  });
}

function calculateHighestExpense(json) {
  // map creates an array of all of the expense amonuts
  return Math.max(...json.map((expense) => expense.amount));
}

function highlightCurrentDay(dataId) {
  const bar = document.querySelector(`tr[data-id="${dataId}"] td`);
  bar.classList.add("spending-card__current-day");
}
