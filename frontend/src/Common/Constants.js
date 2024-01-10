export const data = [
  { id: 1, name: "John Doe", age: 25 },
  { id: 2, name: "Jane Doe", age: 30 },
  { id: 3, name: "Bob Smith", age: 22 },
];

export const columns = [
  { Header: "ID", accessor: "id" },
  { Header: "Name", accessor: "name" },
  { Header: "Age", accessor: "age" },
];

const API_KEY = "2cf67cd21e8d6cf3cba193535af37c63";

const TOKEN = "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";

export const BASE_URL = `https://${API_KEY}:${TOKEN}@dookan-dev-plus.myshopify.com`;

export const GET_PRODUCTS_URL = "/admin/api/2023-07/products.json";
