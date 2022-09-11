window.addEventListener("load", () => {
  fetch("./data.json").then((response) => {
    response.json().then((json) => {
      console.log(json);
      const tbody = document.getElementById("spending-chart__body");

      json.forEach((expense) => {
        tbody.innerHTML += `
            <tr>
                <th scope="row">${expense.day}</th>
                <td>${expense.amount}</td>
            </tr>
        `;
      });
    });
  });
});
