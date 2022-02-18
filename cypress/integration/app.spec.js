const {
  dueOrdersResponse,
  futureOrdersResponse,
  ordersResponse,
} = require("../../utils/mockDataResponses");

const numberOfSelections = 3;
const ordersSelected = [
  dueOrdersResponse[0],
  ...futureOrdersResponse.slice(0, numberOfSelections - 1),
];

describe("Navigation", () => {
  it("should navigate to the payment page", () => {
    // Start from the index page
    cy.visit("http://localhost:3000/");

    cy.findByText("Cuotas pagadas").click();
    cy.findByText("Cuotas pendientes").should("exist");
    cy.findByText("Cuotas futuras").should("exist");

    cy.findAllByRole("checkbox").should("have.length", 6);

    cy.findAllByRole("checkbox").each((checkbox, index) => {
      if (index < numberOfSelections) {
        checkbox.click();
      }
    });

    ordersResponse.forEach((order) => {
      cy.findByText(order.name).should("exist");
    });

    cy.findByText(/ir a pagar/i).click();

    // Get to payment page
    cy.url().should("include", "/payment");

    // Check the number of selections
    cy.findByText(`${numberOfSelections} Pagos Seleccionados`).should("exist");

    ordersSelected.forEach((order) => {
      cy.findByText(order.name).should("exist");
    });

    // Check the total payment at first
    cy.findByText("Total a pagar").should("exist");
    cy.findByText("MXN$ 15500").should("exist");

    // Remove last order
    cy.findByLabelText("Eliminar").click();

    // Last order should be removed
    cy.findByText(ordersSelected[ordersSelected.length - 1].name).should(
      "not.exist"
    );
    // Check the total payment should be reduced
    cy.findByText("Total a pagar").should("exist");
    cy.findByText("MXN$ 10500").should("exist");

    // Add last order again
    cy.findByText("Agregar otro mes para pagar").click();

    cy.findByText(ordersSelected[ordersSelected.length - 1].name).should(
      "exist"
    );

    // Check the total payment again
    cy.findByText("Total a pagar").should("exist");
    cy.findByText("MXN$ 15500").should("exist");

    // Check IR A PAGAR button
    cy.findByText(/ir a pagar/i).click();
  });
});
