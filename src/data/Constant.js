export const sidebarLinks = [
  { name: "Dashboard", path: "/client-dashboard" },
  { name: "Stations", path: "/client-dashboard/stations" },
  { name: "Bookings", path: "/client-dashboard/bookings" },
  { name: "Payments", path: "/client-dashboard/payments" },
  { name: "Maintenance", path: "/client-dashboard/maintenance" },
  { name: "Settings", path: "/client-dashboard/settings" },
];

export const dashboardStatData = [
  {
    id: "active-bookings",
    title: "Active Bookings",
    value: "24",
    subtitle: "",
    badgeText: "+12%",
    iconType: "booking",
  },
  {
    id: "wallet-balance",
    title: "Wallet Balance",
    value: "€2,450.80",
    subtitle: "",
    badgeText: "",
    iconType: "wallet",
  },
  {
    id: "maintenance",
    title: "Maintenance",
    value: "Operational",
    subtitle: "",
    badgeText: "2 Pending",
    iconType: "maintenance",
  },
  {
    id: "energy-delivered",
    title: "Total Energy Delivered",
    value: "1.2 MW",
    subtitle: "",
    badgeText: "",
    iconType: "energy",
  },
];

export const mapStations = [
  {
    id: 1,
    name: "Station Alpha-12",
    area: "Mitte, Berlin",
    distance: "1.2km away",
    left: "34%",
    top: "27%",
  },
  {
    id: 2,
    name: "Station Beta-09",
    area: "Tiergarten, Berlin",
    distance: "2.8km away",
    left: "51%",
    top: "52%",
  },
  {
    id: 3,
    name: "Station Gamma-03",
    area: "Kreuzberg, Berlin",
    distance: "4.1km away",
    left: "75%",
    top: "66%",
  },
];

export const popularStations  = [
  {
    id: 1,
    name: "Berlin Hypercharger",
    power: "350kW",
    connector: "CCS2",
    price: "€0.45/kWh",
    badgeText: "Available",
    badgeTone: "available",
    accentText: "FAST CHARGE",
    distance: "0.8 km",
  },
  {
    id: 2,
    name: "Potsdamer Plaza",
    power: "50kW",
    connector: "Type 2",
    price: "€0.29/kWh",
    badgeText: "Busy (2/4)",
    badgeTone: "busy",
    accentText: "ECO CHARGE",
    distance: "2.1 km",
  },
];

export const recentTrips  = [
  {
    id: 1,
    title: "Airport FastCharge",
    date: "Yesterday, 14:20",
    amount: "€18.40",
    energy: "55kWh",
    status: "success",
  },
  {
    id: 2,
    title: "City Mall Level 2",
    date: "10 Jun, 09:15",
    amount: "€8.25",
    energy: "22kWh",
    status: "success",
  },
  {
    id: 3,
    title: "Highway Hub X",
    date: "08 Jun, 18:30",
    amount: "€0.00",
    energy: "Failed",
    status: "failed",
  },
];

export const vehicleHealthItems = [
  {
    id: 1,
    label: "Tire Pressure",
    value: "Optimal",
    tone: "good",
  },
  {
    id: 2,
    label: "Brake Fluid",
    value: "Due in 500km",
    tone: "warning",
  },
  {
    id: 3,
    label: "Battery Coolant",
    value: "Optimal",
    tone: "good",
  },
];



export const stationsList = [
  {
    id: 1,
    name: "Berlin Hypercharger",
    city: "Mitte, Berlin",
    distanceKm: 0.8,
    powerKw: 350,
    connector: "CCS2",
    pricePerKwh: 0.45,
    status: "available",
    accentLabel: "FAST CHARGE",
    actionLabel: "Details",
    mapXPercent: 18,
    mapYPercent: 35,
  },
  {
    id: 2,
    name: "Potsdamer Plaza",
    city: "Tiergarten, Berlin",
    distanceKm: 2.1,
    powerKw: 50,
    connector: "Type 2",
    pricePerKwh: 0.29,
    status: "busy",
    busySlots: "2/4",
    accentLabel: "ECO CHARGE",
    actionLabel: "Details",
    mapXPercent: 38,
    mapYPercent: 29,
  },
  {
    id: 3,
    name: "Alexanderplatz East",
    city: "Mitte, Berlin",
    distanceKm: 4.5,
    powerKw: 150,
    connector: "CCS2",
    pricePerKwh: null,
    status: "offline",
    accentLabel: "UNDER MAINTENANCE",
    actionLabel: "Locked",
    mapXPercent: 61,
    mapYPercent: 24,
  },
  {
    id: 4,
    name: "Station Alpha-12",
    city: "Prenzlauer Berg, Berlin",
    distanceKm: 1.2,
    powerKw: 350,
    connector: "CCS2",
    pricePerKwh: null,
    status: "available",
    accentLabel: "FAST CHARGE",
    actionLabel: "Details",
    mapXPercent: 25,
    mapYPercent: 66,
  },
  {
    id: 5,
    name: "Charlottenburg Hub",
    city: "Charlottenburg",
    distanceKm: 3.2,
    powerKw: 120,
    connector: "CCS2/CHAdeMO",
    pricePerKwh: null,
    status: "available",
    accentLabel: "STANDARD PLUS",
    actionLabel: "Details",
    mapXPercent: 47,
    mapYPercent: 58,
  },
  {
    id: 6,
    name: "Tempelhof Supercharger",
    city: "Tempelhof",
    distanceKm: 6.7,
    powerKw: 250,
    connector: "Tesla Plug",
    pricePerKwh: null,
    status: "busy",
    busySlots: "8/8",
    accentLabel: "WAIT TIME: 15M",
    actionLabel: "Notify Me",
    mapXPercent: 74,
    mapYPercent: 72,
  },
];

export const stationsRecentTrips = [
  {
    id: 1,
    title: "Airport FastCharge",
    dateText: "Yesterday, 14:20",
    amountText: "€18.40",
  },
  {
    id: 2,
    title: "City Mall Level 2",
    dateText: "10 Jun, 09:15",
    amountText: "€8.25",
  },
];



export const appointmentsPerPage = 5;

export const bookingAppointments = [
  {
    id: 1,
    stationName: "Station Alpha-12",
    stationLocation: "Mitte, Berlin • Plug #4",
    startDateTime: "2024-06-15T14:00:00",
    endDateTime: "2024-06-15T15:30:00",
    status: "upcoming",
    estimatedCost: 12.4,
  },
  {
    id: 2,
    stationName: "Potsdamer Plaza",
    stationLocation: "Berlin • Plug #1",
    startDateTime: "2024-06-18T09:15:00",
    endDateTime: "2024-06-18T10:00:00",
    status: "upcoming",
    estimatedCost: 8.15,
  },
  {
    id: 3,
    stationName: "Airport FastCharge",
    stationLocation: "Terminal 2 • CCS2",
    startDateTime: "2024-06-11T14:20:00",
    endDateTime: "2024-06-11T15:10:00",
    status: "completed",
    estimatedCost: 18.4,
  },
  {
    id: 4,
    stationName: "City Mall Level 2",
    stationLocation: "West Entrance • Type 2",
    startDateTime: "2024-06-10T09:15:00",
    endDateTime: "2024-06-10T11:45:00",
    status: "completed",
    estimatedCost: 8.25,
  },
  {
    id: 5,
    stationName: "Highway Hub X",
    stationLocation: "A1 Autobahn • Fast",
    startDateTime: "2024-06-08T18:30:00",
    endDateTime: "2024-06-08T18:45:00",
    status: "canceled",
    estimatedCost: 0,
  },
];



export const savedPaymentMethods = [
  {
    id: 1,
    type: "visa",
    displayName: "•••• 4242",
    subtitle: "Expires 12/26",
    isPrimary: true,
  },
  {
    id: 2,
    type: "mastercard",
    displayName: "•••• 8812",
    subtitle: "Expires 08/25",
    isPrimary: false,
  },
  {
    id: 3,
    type: "applepay",
    displayName: "Apple Pay",
    subtitle: "Connected",
    isPrimary: false,
  },
];

export const paymentTransactions = [
  {
    id: 1,
    dateTime: "2024-06-14T14:20:00",
    stationName: "Airport FastCharge",
    stationMeta: "Supercharger #4",
    amount: 18.4,
    energyText: "55 kWh",
    paymentMethod: "Wallet",
    paymentMethodTone: "wallet",
    invoiceLabel: "INV-1001",
    invoiceAvailable: true,
    transactionType: "charge",
  },
  {
    id: 2,
    dateTime: "2024-06-10T09:15:00",
    stationName: "City Mall Level 2",
    stationMeta: "Wallbox #12",
    amount: 8.25,
    energyText: "22 kWh",
    paymentMethod: "Visa ••42",
    paymentMethodTone: "card",
    invoiceLabel: "INV-1002",
    invoiceAvailable: true,
    transactionType: "charge",
  },
  {
    id: 3,
    dateTime: "2024-06-05T18:45:00",
    stationName: "Potsdamer Plaza",
    stationMeta: "Rapid #2",
    amount: 12.5,
    energyText: "38 kWh",
    paymentMethod: "Wallet",
    paymentMethodTone: "wallet",
    invoiceLabel: "INV-1003",
    invoiceAvailable: true,
    transactionType: "charge",
  },
  {
    id: 4,
    dateTime: "2024-06-01T12:00:00",
    stationName: "Loyalty Reward",
    stationMeta: "Monthly Bonus",
    amount: 5,
    energyText: "Credit",
    paymentMethod: "System",
    paymentMethodTone: "system",
    invoiceLabel: "N/A",
    invoiceAvailable: false,
    transactionType: "credit",
  },
  {
    id: 5,
    dateTime: "2024-05-28T14:10:00",
    stationName: "Highway Hub X",
    stationMeta: "UltraFast #1",
    amount: 32.1,
    energyText: "85 kWh",
    paymentMethod: "Apple Pay",
    paymentMethodTone: "card",
    invoiceLabel: "INV-1005",
    invoiceAvailable: true,
    transactionType: "charge",
  },
];



export const hardwareComponents = [
  {
    id: 1,
    title: "Power Inverters",
    value: "98.4% Eff.",
    statusLabel: "OPTIMAL",
    statusTone: "optimal",
    iconType: "power",
    subtitle: "Stable high-voltage conversion",
  },
  {
    id: 2,
    title: "Cooling Pumps",
    value: "3 Active Warnings",
    statusLabel: "NEEDS ATTENTION",
    statusTone: "warning",
    iconType: "cooling",
    subtitle: "Monitor thermal circulation",
  },
  {
    id: 3,
    title: "Connector Pins",
    value: "Zero Wear",
    statusLabel: "OPTIMAL",
    statusTone: "optimal",
    iconType: "connector",
    subtitle: "No visible degradation",
  },
  {
    id: 4,
    title: "Node C-14 Gateway",
    value: "Disconnected",
    statusLabel: "OFFLINE",
    statusTone: "offline",
    iconType: "offline",
    subtitle: "Remote gateway unavailable",
  },
];

export const diagnosticChecks = [
  {
    id: 1,
    componentName: "Station Alpha-12",
    testName: "HVDC Transformer Test",
    timestampLabel: "Today, 10:45 AM",
    status: "passed",
  },
  {
    id: 2,
    componentName: "Berlin Hypercharger",
    testName: "Coolant Pressure Sweep",
    timestampLabel: "Today, 09:12 AM",
    status: "degraded",
  },
  {
    id: 3,
    componentName: "Potsdamer Plaza",
    testName: "RFID Reader Latency",
    timestampLabel: "Yesterday, 11:30 PM",
    status: "passed",
  },
  {
    id: 4,
    componentName: "Highway Hub X",
    testName: "Network Handshake",
    timestampLabel: "Yesterday, 06:15 PM",
    status: "failed",
  },
];

export const scheduledTasks = [
  {
    id: 1,
    monthLabel: "JUN",
    dayLabel: "14",
    title: "Cable Insulation Check",
    subtitle: "Station Gamma-08",
  },
  {
    id: 2,
    monthLabel: "JUN",
    dayLabel: "18",
    title: "Firmware v4.2 Rollout",
    subtitle: "Global - Region EU West",
  },
  {
    id: 3,
    monthLabel: "JUN",
    dayLabel: "22",
    title: "HVAC Filter Swap",
    subtitle: "Substation Terminal 4",
  },
];



export const landingNavLinks = [
  { name: "Features", href: "#features" },
  { name: "Pricing", href: "#pricing" },
  { name: "Solutions", href: "#solutions" },
  { name: "Contact", href: "#contact" },
];

export const landingFAQS = [
  {
    question: "Does the system support all charger brands?",
    answer: "Yes, our system is built on open standards and supports all major OCPP-compliant charging stations, including Tesla, ChargePoint, ABB, and more."
  },
  {
    question: "How does auto-maintenance work?",
    answer: "Our AI monitor detects anomalies in real-time. If a fault is identified, the system automatically attempts a remote reset or creates a maintenance ticket for local technicians."
  },
  {
    question: "Can I integrate this with our existing billing?",
    answer: "Absolutely. We provide a robust API and pre-built integrations for major ERP and billing systems like SAP, Oracle, and Stripe."
  }
];

export const landingFeatures = [
  {
    title: "Smart Booking",
    desc: "AI-powered scheduling that optimizes for energy costs and reduces station congestion automatically."
  },
  {
    title: "Auto-Maintenance",
    desc: "Predictive diagnostics identify hardware issues before they happen, triggering automated repair tickets."
  },
  {
    title: "Real-time Analytics",
    desc: "Monitor power consumption, revenue, and usage patterns across your entire global network in real-time."
  }
];

export const landingSolutions = [
  {
    title: "For Drivers",
    desc: "Easy booking, transparent pricing, and instant station navigation."
  },
  {
    title: "For Station Owners",
    desc: "Maximize ROI with automated billing and dynamic load balancing."
  },
  {
    title: "For Network Admins",
    desc: "Full fleet visibility, security controls, and global hardware management."
  }
];

export const landingTestimonials = [
  {
    quote: "This platform transformed our charging network from a maintenance nightmare into a profit center.",
    author: "Marcus Thorne",
    role: "COO, Voltaic Solutions",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=150&h=150"
  },
  {
    quote: "The real-time monitoring is unmatched. We reduced downtime by 45% in the first quarter.",
    author: "Sarah Jenkins",
    role: "Fleet Director, PowerLogistics",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150&h=150"
  },
  {
    quote: "Finally, a charging solution that scales with our rapid expansion across the EU.",
    author: "Lukas Maeder",
    role: "Ops Manager, EcoCharge",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150&h=150"
  }
];
export const STATION_STATUS = {
  ACTIVE: 'Active & Transmitting',
  OFFLINE: 'Offline',
  MAINTENANCE: 'Maintenance',
};

export const SLOT_STATUS = {
  AVAILABLE: 'AVAILABLE',
  IN_USE: 'IN USE',
  CHARGING: 'CHARGING',
  FAULT: 'FAULT',
};

export const SIDEBAR_LINKS = [
  { id: 'stations', label: 'Stations', icon: 'Zap' },
  { id: 'schedule', label: 'Schedule', icon: 'Calendar' },
  { id: 'revenue', label: 'Revenue', icon: 'DollarSign' },
  { id: 'feedback', label: 'Feedback', icon: 'MessageSquare' },
  { id: 'settings', label: 'Settings', icon: 'Settings' },
];

export const FOOTER_LINKS = [
  { id: 'support', label: 'Support', icon: 'HelpCircle' },
  { id: 'logout', label: 'Logout', icon: 'LogOut' },
];
