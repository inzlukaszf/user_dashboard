import { LitElement, html, css } from "https://unpkg.com/lit-element@2.4.0/lit-element.js?module";

class UserDashboardAdmin extends LitElement {
  static get properties() {
    return {
      hass: { type: Object },
      users: { type: Array },
      dashboards: { type: Array },
      assignments: { type: Object },
    };
  }

  constructor() {
    super();
    this.users = [];
    this.dashboards = [];
    this.assignments = {};
  }

  async firstUpdated() {
    // Fetch users
    this.users = await this.hass.callWS({ type: "config/auth/list" });

    // Fetch dashboards
    const panels = this.hass.panels;
    this.dashboards = Object.keys(panels).filter(
      (key) => panels[key].component_name === "lovelace"
    );

    // Fetch current assignments
    const response = await fetch("/api/user_dashboard/assignments");
    if (response.ok) {
      this.assignments = await response.json();
    } else {
      this.assignments = {};
    }

    this.requestUpdate();
  }

  render() {
    return html`
      <h2>User Dashboard Assignments</h2>
      <table>
        <thead>
          <tr>
            <th>User</th>
            ${this.dashboards.map((dash) => html`<th>${dash}</th>`)}
          </tr>
        </thead>
        <tbody>
          ${this.users.map(
            (user) => html`
              <tr>
                <td>${user.name}</td>
                ${this.dashboards.map((dash) => {
                  const isChecked =
                    this.assignments[dash] &&
                    this.assignments[dash].includes(user.name);
                  return html`
                    <td>
                      <input
                        type="checkbox"
                        data-user="${user.name}"
                        data-dashboard="${dash}"
                        ?checked="${isChecked}"
                      />
                    </td>
                  `;
                })}
              </tr>
            `
          )}
        </tbody>
      </table>
      <button @click="${this.saveAssignments}">Save Assignments</button>
    `;
  }

  async saveAssignments() {
    const checkboxes = this.shadowRoot.querySelectorAll("input[type='checkbox']");
    const newAssignments = {};

    checkboxes.forEach((checkbox) => {
      const user = checkbox.getAttribute("data-user");
      const dashboard = checkbox.getAttribute("data-dashboard");
      if (checkbox.checked) {
        if (!newAssignments[dashboard]) {
          newAssignments[dashboard] = [];
        }
        newAssignments[dashboard].push(user);
      }
    });

    const response = await fetch("/api/user_dashboard/assignments", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newAssignments),
    });

    if (response.ok) {
      alert("Assignments saved successfully!");
      this.assignments = newAssignments;
      this.requestUpdate();
    } else {
      alert("Failed to save assignments.");
    }
  }

  static get styles() {
    return css`
      table {
        border-collapse: collapse;
        width: 100%;
      }
      th,
      td {
        border: 1px solid #ccc;
        padding: 8px;
        text-align: center;
      }
      th {
        background-color: #f2f2f2;
      }
      input[type="checkbox"] {
        transform: scale(1.2);
      }
      button {
        margin-top: 10px;
        padding: 10px 20px;
        font-size: 16px;
      }
    `;
  }
}

customElements.define("user-dashboard-admin", UserDashboardAdmin);
