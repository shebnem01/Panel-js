const staff = [
  {
    id: 1,
    name: "Alex Rosetta",
    email: "alexyrosetta@egmail.com",
    image: "../assets/staff-1.png",
  },
  {
    id: 2,
    name: "Maria July",
    email: "mariajuly@egmail.com",
    image: "../assets/staff-2.png",
  },
];
const services = [
  { 
    id: 1,
    name: "Oral hygiene",
    image: "../assets/service-1.jpg",
    duration: "1 hour",
    price: 50.0,
  },
  {
    id: 2,
    name: "Implants",
    image: "../assets/service-2.jpg",
    duration: "1 hour 30 minutes",
    price: 120.0,
  },
];
const dateData = ["4", "5", "6"];
const time = [
  {
    start_time: "09:00",
    end_time: "09:30",
  },
  {
    start_time: "09:30",
    end_time: "10:00",
  },
  {
    start_time: "10:00",
    end_time: "10:30",
  },
];

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
let noteData = {
  staffName: "",
  serviceName: "",
  date: "",
  time: "",
  total: 0,
};

let sendData = {
  staff_id: null,
  service_id: null,
  date: null,
  time: null,
  customer: {
    name: "",
    surname: "",
    email: "",
    phone: "",
  },
};
