export const USER_ROLES = [
  "it_admin",
  "owner",
  "accountant",
  "manager",
  "receptionist"
];

export const JOB_TITLES = [
  "accountant",
  "manager",
  "receptionist",
  "housekeeping",
  "chef",
  "waiter/waitress",
  "security",
];

export const HOTEL_STATUSES = [
  "active", 
  "inactive", 
  "maintenance"
];

export const BED_TYPES = [
  "single",
  "double",
  "queen",
  "king",
  "sofa_bed"
];

export const ROOM_STATUSES = [
  "available",
  "occupied",
  "reserved",
  "cleaning",
  "maintenance",
  "out_of_service"
];

export const HOUSEKEEPING_STATUSES = [
  "clean", 
  "dirty", 
  "inspecting"
];

export const PRICE_RULE_TYPES = [
  "base", 
  "weekend", 
  "holiday", 
  "event"
];
 
export const PRICE_RULE_PRIORITY = {
  base: 0,
  weekend: 1,
  holiday: 2,
  event: 3,
};

export const DAYS_OF_WEEK = [0, 1, 2, 3, 4, 5, 6];

export const BOOKING_STATUSES = [
  "booked",
  "confirmed",
  "checked_in",
  "checked_out",
  "cancelled"
];

export const PAYMENT_STATUSES = [
  "unpaid",
  "partial_paid",
  "paid",
  "refunded",
  "failed"
];

export const BOOKING_SOURCES = [
  "website",
  "walk_in",
  "phone",
  "third_party"
];

export const CREATED_BY_TYPES = [
  "customer",
  "receptionist",
  "manager",
  "system"
];

export const CHANNELS = [
  "direct",
  "agoda",
  "booking",
  "traveloka",
  "other"
]; 

export const PAYMENT_METHODS = [
  "cash", 
  "bank", 
  "card", 
  "e-wallet", 
  "other"
];

export const PAYMENT_TYPES = [
  "deposit", 
  "full_payment", 
  "partial_payment", 
  "refund"
];