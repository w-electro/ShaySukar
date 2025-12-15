# Shay Sukar - Interactive Ordering Menu System

A complete interactive ordering menu system for the Shay Sukar tea shop, featuring a customer-facing menu and a real-time barista dashboard.

## Features

### Customer Menu (`interactive_menu.html`)
- **Beautiful Design**: Matches the original menu colors and fonts
  - Cream/beige background (#F5E6D3)
  - Dark teal sections (#1A4D5C)
  - Arabic and English typography
- **Interactive Ordering**:
  - Click any menu item to add to cart
  - Shopping cart with quantity management
  - Order summary with total
  - Table number input
- **Real-time Updates**: Orders sent instantly to barista
- **Persistent Cart**: Cart saved in localStorage
- **Responsive Design**: Works on mobile and desktop

### Barista Dashboard (`barista_dashboard.html`)
- **Real-time Order Management**:
  - Live order updates via WebSocket
  - Sound notifications for new orders
  - Order status tracking (Pending → Preparing → Ready → Completed)
- **Statistics Dashboard**:
  - Pending orders count
  - Orders in preparation
  - Ready orders
  - Completed orders
  - Total revenue
- **Order Actions**:
  - Start preparation
  - Mark as ready
  - Complete order
  - Cancel order

### Backend Server (`barista_server.js`)
- **RESTful API**:
  - `POST /api/orders` - Create new order
  - `GET /api/orders` - Get all orders
  - `GET /api/orders/pending` - Get pending orders
  - `PATCH /api/orders/:id` - Update order status
  - `DELETE /api/orders/:id` - Delete order
  - `GET /api/stats` - Get statistics
- **WebSocket Support**: Real-time bidirectional communication
- **Order Management**: Full CRUD operations
- **Status Tracking**: 5-stage order lifecycle

## Installation

1. Install Node.js (v14 or higher)

2. Install dependencies:
```bash
npm install
```

## Usage

1. Start the server:
```bash
npm start
```

2. Open the customer menu:
```
http://localhost:3000/
```

3. Open the barista dashboard:
```
http://localhost:3000/barista
```

## Menu Items

### شاي (Tea)
- شاي قزاز - 13 SR
- شاي كبير - 8 SR
- شاي صغير - 6 SR
- شاي ابريق - 20 SR

### كرك (Karak)
- كرك قزاز - 14 SR
- كرك ابريق - 30 SR
- كرك كبير - 9 SR
- كرك صغير - 7 SR

### الحلو (Sweet)
- تيشرز مجريند - 19 SR
- حبة تمر - 12 SR
- حلا أوريسو - 15 SR
- جوبكز شوكو - 7 SR
- كراشي - 8 SR

### القهوة (Coffee)
- قهوة كبير - 14 SR
- قهوة صغير - 10 SR
- دلة سعودي - 25 SR

### مخبوزات (Baked)
- مسحن - 18 SR
- خليبة - 18 SR
- ورق عنب - 15 SR
- سمبوسة - 12 SR

## Order Flow

1. **Customer** clicks menu items to add to cart
2. **Customer** enters table number and submits order
3. **Order** sent to server via REST API
4. **Server** broadcasts order to all connected barista dashboards via WebSocket
5. **Barista** receives notification and sees order in dashboard
6. **Barista** updates order status:
   - Pending → Preparing → Ready → Completed
7. **Status updates** broadcast to all connected clients in real-time

## Technology Stack

- **Frontend**: HTML5, CSS3, JavaScript (Vanilla)
- **Backend**: Node.js, Express
- **Real-time**: WebSocket (ws library)
- **Fonts**: Google Fonts (Tajawal, Dancing Script)
- **Storage**: localStorage (client-side), in-memory (server-side)

## Development

For development with auto-restart:
```bash
npm run dev
```

## Files Structure

```
.
├── interactive_menu.html      # Customer-facing menu
├── barista_dashboard.html     # Barista order management
├── barista_server.js          # Backend server
├── package.json               # Node.js dependencies
├── Menu.jpeg                  # Original menu design
├── Menu_vector.svg            # Vectorized menu (skeleton)
└── README.md                  # This file
```

## Future Enhancements

- Database integration (MongoDB, PostgreSQL)
- User authentication for barista
- Order history and analytics
- Print receipt functionality
- Multi-language support
- Payment integration
- QR code table ordering
- Customer order tracking

## License

MIT

---

**"Tea is a ritual, an art that nourishes the soul."**
