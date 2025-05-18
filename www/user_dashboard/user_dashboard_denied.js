import { LitElement, html, css } from "https://unpkg.com/lit-element@2.4.0/lit-element.js?module";

class UserDashboardDenied extends LitElement {
  render() {
    return html`
      <div class="container">
        <h1>Access Denied</h1>
        <p>You do not have access to this dashboard.</p>
        <p>Please contact your administrator for access.</p>
      </div>
    `;
  }

  static get styles() {
    return css`
      .container {
        text-align: center;
        margin-top: 50px;
      }
      h1 {
        color: red;
        font-size: 36px;
      }
      p {
        font-size: 18px;
      }
    `;
  }
}

customElements.define("user-dashboard-denied", UserDashboardDenied);
