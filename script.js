const DAYS = {
  0: "sun",
  1: "mon",
  2: "tue",
  3: "wed",
  4: "thu",
  5: "fri",
  6: "sat",
};

const width = 600;
const height = 500;
const margin = { top: 50, bottom: 50, left: 50, right: 50 };

const svg = d3
  .select("#d3-container")
  .append("svg")
  .attr("height", height - margin.top - margin.bottom)
  .attr("width", width - margin.left - margin.right)
  .attr("viewBox", [0, 0, width, height]);

d3.json("./data.json").then((expenses) => {
  createBarChart(expenses);
  highlightCurrentDay();
});

function createBarChart(expenses) {
  const x = d3
    .scaleBand()
    .domain(d3.range(expenses.length))
    .range([margin.left, width - margin.right])
    .padding(0.1);

  const y = d3
    .scaleLinear()
    .domain([0, 100])
    .range([height - margin.bottom, margin.top]);

  svg
    .append("g")
    .attr("fill", "hsl(10, 79%, 65%)")
    .selectAll("rect")
    .data(expenses)
    .join("rect")
    .attr("x", (expense, i) => x(i))
    .attr("y", (expense) => y(expense.amount))
    .attr("height", (expense) => y(0) - y(expense.amount))
    .attr("width", x.bandwidth())
    .attr("rx", "0.625rem")
    .attr("ry", "0.625rem")
    .attr("data-expense-day", (expense, i) => `${expense.day}-expense`);

  svg.append("g").call((g) => {
    g.attr("transform", `translate(0, ${height - margin.bottom})`)
      .call(d3.axisBottom(x).tickFormat((i) => expenses[i].day))
      .attr("font-size", "0.875rem");
  });

  svg.node();
}

function highlightCurrentDay() {
  const bars = document.querySelectorAll("rect[data-expense-day]");
  const currentDay = new Date().getDay();

  bars.forEach((bar) => {
    if (
      bar.getAttribute("data-expense-day") === `${DAYS[currentDay]}-expense`
    ) {
      bar.classList.add("spending-card__current-day");
    }
  });
}
