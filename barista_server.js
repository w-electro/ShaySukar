const express = require('express');
const http = require('http');
const WebSocket = require('ws');
const fs = require('fs');
const path = require('path');

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

// Middleware
app.use(express.json());
app.use(express.static(__dirname));

// Store orders in memory (in production, use a database)
let orders = [];
let orderIdCounter = 1;

// WebSocket connections for real-time updates
let baristaClients = new Set();

// WebSocket connection handling
wss.on('connection', (ws, req) => {
    console.log('New WebSocket connection');

    ws.on('message', (message) => {
        try {
            const data = JSON.parse(message);

            if (data.type === 'barista_connect') {
                baristaClients.add(ws);
                console.log('Barista connected');

                // Send current pending orders
                ws.send(JSON.stringify({
                    type: 'initial_orders',
                    orders: orders.filter(o => o.status === 'pending')
                }));
            }
        } catch (error) {
            console.error('Error processing WebSocket message:', error);
        }
    });

    ws.on('close', () => {
        baristaClients.delete(ws);
        console.log('WebSocket connection closed');
    });
});

// Broadcast to all barista clients
function broadcastToBaristas(data) {
    const message = JSON.stringify(data);
    baristaClients.forEach(client => {
        if (client.readyState === WebSocket.OPEN) {
            client.send(message);
        }
    });
}

// API Endpoints

// Get all orders
app.get('/api/orders', (req, res) => {
    res.json(orders);
});

// Get pending orders
app.get('/api/orders/pending', (req, res) => {
    const pendingOrders = orders.filter(o => o.status === 'pending');
    res.json(pendingOrders);
});

// Create new order
app.post('/api/orders', (req, res) => {
    const { items, total, tableNumber, customerName } = req.body;

    if (!items || items.length === 0) {
        return res.status(400).json({ error: 'Order must contain at least one item' });
    }

    const newOrder = {
        id: orderIdCounter++,
        items,
        total,
        tableNumber: tableNumber || 'غير محدد',
        customerName: customerName || 'زبون',
        status: 'pending',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
    };

    orders.push(newOrder);

    // Broadcast to all barista clients
    broadcastToBaristas({
        type: 'new_order',
        order: newOrder
    });

    console.log('New order created:', newOrder);
    res.status(201).json(newOrder);
});

// Update order status
app.patch('/api/orders/:id', (req, res) => {
    const orderId = parseInt(req.params.id);
    const { status } = req.body;

    const order = orders.find(o => o.id === orderId);

    if (!order) {
        return res.status(404).json({ error: 'Order not found' });
    }

    const validStatuses = ['pending', 'preparing', 'ready', 'completed', 'cancelled'];
    if (!validStatuses.includes(status)) {
        return res.status(400).json({ error: 'Invalid status' });
    }

    order.status = status;
    order.updatedAt = new Date().toISOString();

    // Broadcast status update to all barista clients
    broadcastToBaristas({
        type: 'order_update',
        order: order
    });

    console.log(`Order ${orderId} status updated to ${status}`);
    res.json(order);
});

// Delete order
app.delete('/api/orders/:id', (req, res) => {
    const orderId = parseInt(req.params.id);
    const orderIndex = orders.findIndex(o => o.id === orderId);

    if (orderIndex === -1) {
        return res.status(404).json({ error: 'Order not found' });
    }

    orders.splice(orderIndex, 1);

    // Broadcast deletion to all barista clients
    broadcastToBaristas({
        type: 'order_deleted',
        orderId: orderId
    });

    console.log(`Order ${orderId} deleted`);
    res.status(204).send();
});

// Get order statistics
app.get('/api/stats', (req, res) => {
    const stats = {
        total: orders.length,
        pending: orders.filter(o => o.status === 'pending').length,
        preparing: orders.filter(o => o.status === 'preparing').length,
        ready: orders.filter(o => o.status === 'ready').length,
        completed: orders.filter(o => o.status === 'completed').length,
        cancelled: orders.filter(o => o.status === 'cancelled').length,
        totalRevenue: orders
            .filter(o => o.status === 'completed')
            .reduce((sum, o) => sum + o.total, 0)
    };
    res.json(stats);
});

// Health check
app.get('/health', (req, res) => {
    res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Serve the interactive menu
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'interactive_menu.html'));
});

// Serve the barista dashboard
app.get('/barista', (req, res) => {
    res.sendFile(path.join(__dirname, 'barista_dashboard.html'));
});

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
    console.log(`
╔════════════════════════════════════════════╗
║   Shay Sukar Order System Started         ║
╠════════════════════════════════════════════╣
║   Server running on port ${PORT}             ║
║   Customer Menu: http://localhost:${PORT}/   ║
║   Barista Dashboard: http://localhost:${PORT}/barista ║
╚════════════════════════════════════════════╝
    `);
});

// Graceful shutdown
process.on('SIGTERM', () => {
    console.log('SIGTERM received, closing server...');
    server.close(() => {
        console.log('Server closed');
        process.exit(0);
    });
});
