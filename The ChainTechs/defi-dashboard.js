import web3 from "web3";
import Moralis from "moralis";

const app = Moralis.Web3Provider.create();

const dashboard = {
  assets: [],
  transactions: [],
  yields: [],
};

app.on("accounts", (accounts) => {
  dashboard.assets = accounts.map((account) => {
    return app.eth.getBalance(account);
  });
});

app.on("transactions", (transactions) => {
  dashboard.transactions = transactions;
});

app.on("yields", (yields) => {
  dashboard.yields = yields;
});

function renderDashboard() {
  const html = `
    <h1>DeFi Dashboard</h1>
    <h2>Assets</h2>
    <ul>
      ${dashboard.assets.map((asset) => `<li>${asset}</li>`).join("")}
    </ul>
    <h2>Transactions</h2>
    <ul>
      ${dashboard.transactions.map((transaction) => `<li>${transaction}</li>`).join("")}
    </ul>
    <h2>Yields</h2>
    <ul>
      ${dashboard.yields.map((yieldValue) => `<li>${yieldValue}</li>`).join("")}
    </ul>
  `;

  document.querySelector("body").innerHTML = html;
}
//here we rander DashBoard
renderDashboard();
