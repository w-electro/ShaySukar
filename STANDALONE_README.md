# Shay Sukar - Standalone Version (No Server Required!)

## 🎉 Super Simple Setup - Just Open the Files!

No installation, no npm, no server needed. Just double-click and start using!

## How to Use

### For Customers:
1. Open `menu_standalone.html` in your browser
2. Click menu items to add to cart
3. Click the cart icon (🛒) to view your order
4. Click "إرسال الطلب" (Send Order) to submit

### For Barista:
1. Open `barista_standalone.html` in your browser
2. You'll see all incoming orders automatically
3. Click buttons to update order status:
   - **بدء التحضير** (Start Preparing)
   - **جاهز** (Ready)
   - **تسليم** (Complete/Deliver)
   - **إلغاء** (Cancel)

## How It Works

The standalone version uses **localStorage** to store orders directly in your browser. Both the customer menu and barista dashboard read/write to the same localStorage, so they communicate in real-time!

### Opening Both Windows

For best experience:
1. Open `menu_standalone.html` in one browser window/tab
2. Open `barista_standalone.html` in another browser window/tab
3. When customers submit orders, they appear instantly on the barista dashboard!

## Features

✅ **No installation required** - Just open HTML files
✅ **Works offline** - No internet needed
✅ **Same beautiful design** - Exact colors and fonts from original menu
✅ **Real-time updates** - Orders sync via localStorage
✅ **Sound notifications** - Barista hears beep for new orders
✅ **Full order management** - Track from new → preparing → ready → completed
✅ **Statistics** - See pending, preparing, ready orders and revenue
✅ **Persistent cart** - Cart saved even if you close the browser

## Color Palette

- Background: #F5E6D3 (Cream/Beige)
- Sections: #1A4D5C (Dark Teal)
- Content: #FAF4EA (Light Cream)

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

## Tips

- **Sound Toggle**: Click 🔔 in barista dashboard to enable/disable sound
- **Cart Badge**: Shows number of items in cart
- **Auto-refresh**: Barista dashboard checks for new orders every 2 seconds
- **Clear Data**: To reset all orders, open browser console and run:
  ```javascript
  localStorage.removeItem('shaySukarOrders')
  ```

## Limitations

Since this uses localStorage:
- Orders only work on the same computer/browser
- Data clears if you clear browser cache
- No network synchronization between different devices

For multi-device/network support, use the server version instead (`interactive_menu.html` + `barista_server.js`)

## Files

- `menu_standalone.html` - Customer menu (just open this!)
- `barista_standalone.html` - Barista dashboard (just open this!)

---

**"Tea is a ritual, an art that nourishes the soul."**
