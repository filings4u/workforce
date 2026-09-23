/**
 * Workforce subscription catalog for the shared screenings4u checkout.js.
 * Prices are stored in cents because formatTestPrice() expects minor units.
 */
"use strict";

const TEST_SERVICES = [
  {
    id: "workforce_employer_essential",
    sku: "workforce_employer_essential",
    name: "Workforce Employer Essential",
    category: "Employer Subscription",
    price: 8500,
    currency: "USD",
    orderType: "checkout",
    sourcePage: "employer-pricing.html",
    features: [
      "Employee & NON-DOT Driver management",
      "NON-DOT program management",
      "Random pool management and selections",
      "Testing orders and workflow",
      "Documents and standard reports"
    ],
    drugs: []
  },
  {
    id: "workforce_employer_professional",
    sku: "workforce_employer_professional",
    name: "Workforce Employer Professional",
    category: "Employer Subscription",
    price: 14500,
    currency: "USD",
    orderType: "checkout",
    sourcePage: "employer-pricing.html",
    features: [
      "Everything in Employer Essential",
      "Sensitive result visibility",
      "Advanced reporting and Action Center",
      "Locations and collection sites",
      "Team users, supervisor tools, and training records"
    ],
    drugs: []
  },
  {
    id: "workforce_employer_enterprise",
    sku: "workforce_employer_enterprise",
    name: "Workforce Employer Enterprise",
    category: "Employer Subscription",
    price: 24500,
    currency: "USD",
    orderType: "checkout",
    sourcePage: "employer-pricing.html",
    features: [
      "Everything in Employer Professional",
      "Unlimited employee / driver capacity",
      "Audit history and bulk employee import",
      "Integrations",
      "Branded email and white-label capability"
    ],
    drugs: []
  },
  {
    id: "workforce_ctpa_essential",
    sku: "workforce_ctpa_essential",
    name: "Workforce C/TPA Essential",
    category: "C/TPA Subscription",
    price: 12500,
    currency: "USD",
    orderType: "checkout",
    sourcePage: "ctpa-pricing.html",
    features: [
      "Employer management",
      "Employee & NON-DOT Driver management",
      "NON-DOT programs and consortium pools",
      "Random selections and testing workflow",
      "Billing tools and client invoicing"
    ],
    drugs: []
  },
  {
    id: "workforce_ctpa_professional",
    sku: "workforce_ctpa_professional",
    name: "Workforce C/TPA Professional",
    category: "C/TPA Subscription",
    price: 22500,
    currency: "USD",
    orderType: "checkout",
    sourcePage: "ctpa-pricing.html",
    features: [
      "Everything in C/TPA Essential",
      "Sensitive result visibility",
      "Advanced reporting",
      "Collection sites, locations, and team users",
      "Policy builder, employer settings, and customer portal delivery"
    ],
    drugs: []
  },
  {
    id: "workforce_ctpa_enterprise",
    sku: "workforce_ctpa_enterprise",
    name: "Workforce C/TPA Enterprise",
    category: "C/TPA Subscription",
    price: 37500,
    currency: "USD",
    orderType: "checkout",
    sourcePage: "ctpa-pricing.html",
    features: [
      "Everything in C/TPA Professional",
      "Audit history and employer import",
      "Integrations and SSO",
      "White-label capability and branded email",
      "Client payments"
    ],
    drugs: []
  }
];

function getTestService(serviceId) {
  const id = String(serviceId || "").trim().toLowerCase();
  return TEST_SERVICES.find(service => service.id === id) || null;
}

function formatTestPrice(value, currency = "USD") {
  const cents = Number(value || 0);
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: String(currency || "USD").toUpperCase(),
    minimumFractionDigits: 2
  }).format(cents / 100);
}
