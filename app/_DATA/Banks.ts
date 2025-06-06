interface Bank {
  name: string;
  tasaEA: number;
  image: string;
  id: number;
  type?: string;
  act?: boolean;
}

export const Banks: Bank[] = [
  {
    name: "Nubank",
    tasaEA: 9.25,
    image: "/nubank.webp",
    id: 1,
    type: "Cuenta de ahorros",
    act: true,
  },
  {
    name: "Bancolombia",
    type: "Cuenta de ahorros",
    tasaEA: 0.05,
    image: "/bancolombia.webp",
    id: 2,
  },
  {
    name: "Lulo Bank",
    tasaEA: 10.5,
    type: "Cuenta Lulo Pro",
    image: "/lulo.webp",
    id: 3,
    act: true,
  },
  {
    name: "Banco Finandina",
    tasaEA: 10,
    image: "/finandina.webp",
    id: 9,
    type: "Cuenta Flexidigital+",
    act: true,
  },
  {
    name: "RappiPay",
    type: "RappiCuenta",
    tasaEA: 9,
    image: "/rappi.jpg",
    id: 4,
  },
  {
    name: "Bancamia",
    tasaEA: 10.5,
    image: "/bancamia.webp",
    id: 5,
    type: "Cuenta RentaPlus",
  },
  {
    name: "Pibank",
    type: "Cuenta de ahorros",
    tasaEA: 12,
    image: "/pibank.webp",
    id: 8,
    act: true,
  },
];

export const DepositosBajoMonto: Bank[] = [
  {
    name: "Ualá",
    tasaEA: 11,
    image: "/uala.webp",
    type: "Deposito bajo monto",
    id: 6,
  },
  {
    name: "Nequi",
    tasaEA: 0.1,
    image: "/nequi.webp",
    type: "Deposito bajo monto",
    id: 7,
  },
];
