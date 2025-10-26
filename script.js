// ข้อมูลปลาสวยงามไทยทั้งหมด
const products = [
    {
        id: 1,
        name: "ปลากัดหม้อไทย",
        description: "ปลากัดหม้อไทยสีสันสวยงาม ครีบยาวสวย เป็นปลากัดสายพันธุ์ดั้งเดิมของไทย",
        price: 150,
        image: "images/fighting-fish-1.jpg",
        category: "fighting",
        badge: "ยอดนิยม"
    },
    {
        id: 2,
        name: "ปลากัดคราวน์เทล",
        description: "ปลากัดคราวน์เทล ครีบเป็นหนามสวยงาม เลี้ยงง่าย เหมาะสำหรับมือใหม่",
        price: 200,
        image: "images/fighting-fish-2.jpg",
        category: "fighting",
        badge: "ใหม่"
    },
    {
        id: 3,
        name: "ปลาทองหัวสิงห์",
        description: "ปลาทองหัวสิงห์ สีส้มสวยงาม หัวมีวุ้นสวย เป็นที่นิยมในหมู่คนเลี้ยงปลา",
        price: 350,
        image: "images/goldfish-1.jpg",
        category: "goldfish",
        badge: "คลาสสิค"
    },
    {
        id: 4,
        name: "ปลาทองเรนโบว์",
        description: "ปลาทองเรนโบว์ สีสันหลากหลายสวยงาม ตัวกลมน่ารัก เลี้ยงคู่กันสวย",
        price: 400,
        image: "images/goldfish-2.jpg",
        category: "goldfish"
    },
    {
        id: 5,
        name: "ปลาหมอสี",
        description: "ปลาหมอสีไทย สีสันสดใส ดูแลง่าย นิสัยไม่ดุร้าย เหมาะสำหรับตู้ปลาชุมชน",
        price: 120,
        image: "images/native-fish-1.jpg",
        category: "native"
    },
    {
        id: 6,
        name: "ปลากระดี่นาง",
        description: "ปลากระดี่นาง ปลาพื้นเมืองไทย สีเงินแวววาว ครีบยาวสวยงาม",
        price: 80,
        image: "images/native-fish-2.jpg",
        category: "native"
    },
    {
        id: 7,
        name: "ปลาเสือตอ",
        description: "ปลาเสือตอ ปลาหายากของไทย ลวดลายสวยงามเหมือนเสือ ดูแลพิเศษ",
        price: 1200,
        image: "images/rare-fish-1.jpg",
        category: "rare",
        badge: "หายาก"
    },
    {
        id: 8,
        name: "ปลาค้างคาว",
        description: "ปลาค้างคาว ปลาหายาก ลำตัวแบน สีน้ำตาลดำ ลวดลาย独特",
        price: 800,
        image: "images/rare-fish-2.jpg",
        category: "rare",
        badge: "พิเศษ"
    },
    {
        id: 9,
        name: "ปลากัดยักษ์",
        description: "ปลากัดยักษ์ พันธุ์ใหญ่ ครีบยาวสวยงาม สีสันหลากหลาย",
        price: 500,
        image: "images/fighting-fish-3.jpg",
        category: "fighting",
        badge: "ขนาดใหญ่"
    },
    {
        id: 10,
        name: "ปลาทองตาโปน",
        description: "ปลาทองตาโปน ดวงตาสวยงามเป็นเอกลักษณ์ ตัวกลมน่ารัก",
        price: 600,
        image: "images/goldfish-3.jpg",
        category: "goldfish",
        badge: "พิเศษ"
    },
    {
        id: 11,
        name: "ปลาสลิด",
        description: "ปลาสลิดหรือปลาใบไม้ ปลาพื้นเมืองไทย สีน้ำตาลทองสวยงาม",
        price: 100,
        image: "images/native-fish-3.jpg",
        category: "native"
    },
    {
        id: 12,
        name: "ปลาหางนกยูง",
        description: "ปลาหางนกยูงไทย สีสันสดใส ขนาดเล็ก เลี้ยงง่าย ขยายพันธุ์เร็ว",
        price: 30,
        image: "images/native-fish-4.jpg",
        category: "native",
        badge: "เศรษฐกิจ"
    }
];

// ข้อมูลตะกร้าสินค้า
let cart = [];

// ตัวแปรสำหรับการกรองสินค้า
let currentFilter = 'all';

// DOM Elements
const productsGrid = document.getElementById('products-grid');
const cartItems = document.getElementById('cart-items');
const cartTotal = document.getElementById('cart-total');
const emptyCartMessage = document.getElementById('empty-cart-message');
const clearCartBtn = document.getElementById('clear-cart');
const orderForm = document.getElementById('order-form');
const notification = document.getElementById('notification');
const loading = document.getElementById('loading');
const filterButtons = document.querySelectorAll('.filter-btn');
const categoryCards = document.querySelectorAll('.category-card');

// ฟังก์ชันแสดงการแจ้งเตือน
function showNotification(message, isSuccess = true) {
    notification.textContent = message;
    notification.className = isSuccess ? 'notification' : 'notification error';
    notification.style.display = 'block';
    
    setTimeout(() => {
        notification.style.display = 'none';
    }, 3000);
}

// ฟังก์ชันแสดง/ซ่อน loading
function toggleLoading(show) {
    loading.style.display = show ? 'flex' : 'none';
}

// ฟังก์ชันแสดงชื่อเพศภาษาไทย
function getGenderName(gender) {
    const genderNames = {
        'male': 'ตัวผู้',
        'female': 'ตัวเมีย'
    };
    return genderNames[gender] || 'ไม่ระบุ';
}

// ฟังก์ชันสร้าง dropdown เลือกเพศ
function createGenderSelect(productId, selectedGender = '') {
    const product = products.find(p => p.id === productId);
    
    let optionsHTML = '<option value="">-- โปรดเลือกเพศ --</option>';
    optionsHTML += '<option value="male">ตัวผู้</option>';
    optionsHTML += '<option value="female">ตัวเมีย</option>';
    
    return `
        <div class="gender-selection">
            <label class="gender-label">เลือกเพศปลา *</label>
            <select class="gender-select" data-product="${productId}" required>
                ${optionsHTML}
            </select>
        </div>
    `;
}

// ฟังก์ชันโหลดสินค้า
function loadProducts(filter = 'all') {
    toggleLoading(true);
    
    // จำลองการโหลดข้อมูล
    setTimeout(() => {
        productsGrid.innerHTML = '';
        
        const filteredProducts = filter === 'all' 
            ? products 
            : products.filter(product => product.category === filter);
        
        if (filteredProducts.length === 0) {
            productsGrid.innerHTML = '<p class="no-products">ไม่พบสินค้าในหมวดนี้</p>';
            toggleLoading(false);
            return;
        }
        
        filteredProducts.forEach(product => {
            const productCard = document.createElement('div');
            productCard.className = 'product-card';
            productCard.setAttribute('data-category', product.category);
            
            let badgeHTML = '';
            if (product.badge) {
                badgeHTML = `<div class="product-badge">${product.badge}</div>`;
            }
            
            productCard.innerHTML = `
                <div class="product-image">
                    <img src="${product.image}" alt="${product.name}" loading="lazy" onerror="this.src='images/placeholder.jpg'">
                    ${badgeHTML}
                </div>
                <div class="product-info">
                    <h3 class="product-name">${product.name}</h3>
                    <p class="product-description">${product.description}</p>
                    <div class="product-price">฿${product.price}</div>
                    ${createGenderSelect(product.id)}
                    <button class="btn btn-primary add-to-cart" data-id="${product.id}">เพิ่มลงตะกร้า</button>
                </div>
            `;
            
            productsGrid.appendChild(productCard);
        });
        
        // เพิ่ม event listeners สำหรับปุ่มเพิ่มลงตะกร้า
        document.querySelectorAll('.add-to-cart').forEach(button => {
            button.addEventListener('click', function() {
                const productId = parseInt(this.getAttribute('data-id'));
                const productCard = this.closest('.product-card');
                const genderSelect = productCard.querySelector('.gender-select');
                const selectedGender = genderSelect.value;
                
                addToCart(productId, selectedGender);
            });
        });
        
        toggleLoading(false);
    }, 800);
}

// ฟังก์ชันอัพเดทตะกร้าสินค้า
function updateCart() {
    cartItems.innerHTML = '';
    
    if (cart.length === 0) {
        emptyCartMessage.style.display = 'block';
        cartTotal.textContent = 'รวม: ฿0';
        return;
    }
    
    emptyCartMessage.style.display = 'none';
    
    let total = 0;
    
    cart.forEach((item, index) => {
        const product = products.find(p => p.id === item.id);
        const itemTotal = product.price * item.quantity;
        total += itemTotal;
        
        const cartItem = document.createElement('div');
        cartItem.className = 'cart-item';
        cartItem.innerHTML = `
            <div class="cart-item-info">
                <div class="cart-item-image">
                    <img src="${product.image}" alt="${product.name}" onerror="this.src='images/placeholder.jpg'">
                </div>
                <div class="cart-item-details">
                    <div class="cart-item-name">
                        ${product.name}
                        <span class="cart-item-gender">${getGenderName(item.gender)}</span>
                    </div>
                    <div class="cart-item-price">
                        ฿${product.price} x ${item.quantity} = ฿${itemTotal}
                    </div>
                    <select class="cart-item-gender-select" data-index="${index}">
                        <option value="male" ${item.gender === 'male' ? 'selected' : ''}>ตัวผู้</option>
                        <option value="female" ${item.gender === 'female' ? 'selected' : ''}>ตัวเมีย</option>
                    </select>
                </div>
            </div>
            <div class="cart-item-quantity">
                <button class="quantity-btn decrease" data-index="${index}">-</button>
                <span class="quantity">${item.quantity}</span>
                <button class="quantity-btn increase" data-index="${index}">+</button>
                <button class="remove-item" data-index="${index}">×</button>
            </div>
        `;
        
        cartItems.appendChild(cartItem);
    });
    
    cartTotal.textContent = `รวม: ฿${total}`;
    
    // เพิ่ม event listeners สำหรับปุ่มในตะกร้า
    document.querySelectorAll('.decrease').forEach(button => {
        button.addEventListener('click', function() {
            const index = parseInt(this.getAttribute('data-index'));
            decreaseQuantity(index);
        });
    });
    
    document.querySelectorAll('.increase').forEach(button => {
        button.addEventListener('click', function() {
            const index = parseInt(this.getAttribute('data-index'));
            increaseQuantity(index);
        });
    });
    
    document.querySelectorAll('.remove-item').forEach(button => {
        button.addEventListener('click', function() {
            const index = parseInt(this.getAttribute('data-index'));
            removeFromCart(index);
        });
    });
    
    // เพิ่ม event listeners สำหรับเปลี่ยนเพศในตะกร้า
    document.querySelectorAll('.cart-item-gender-select').forEach(select => {
        select.addEventListener('change', function() {
            const index = parseInt(this.getAttribute('data-index'));
            changeCartItemGender(index, this.value);
        });
    });
}

// ฟังก์ชันเพิ่มสินค้าลงตะกร้า
function addToCart(id, gender = '') {
    const product = products.find(p => p.id === id);
    
    if (!product) {
        showNotification('ไม่พบสินค้านี้', false);
        return;
    }
    
    // ตรวจสอบว่าเลือกเพศแล้วหรือไม่
    if (!gender) {
        showNotification('กรุณาเลือกเพศปลาก่อนเพิ่มลงตะกร้า', false);
        return;
    }
    
    // ตรวจสอบว่ามีสินค้านี้ในตะกร้าแล้วหรือไม่
    const existingItemIndex = cart.findIndex(item => item.id === id && item.gender === gender);
    
    if (existingItemIndex !== -1) {
        // ถ้ามีอยู่แล้ว ให้เพิ่มจำนวน
        cart[existingItemIndex].quantity += 1;
    } else {
        // ถ้ายังไม่มี ให้เพิ่มใหม่
        cart.push({
            id: id,
            gender: gender,
            quantity: 1
        });
    }
    
    updateCart();
    showNotification(`เพิ่ม ${product.name} (${getGenderName(gender)}) ลงตะกร้าแล้ว!`);
}

// ฟังก์ชันลดจำนวนสินค้า
function decreaseQuantity(index) {
    if (cart[index].quantity > 1) {
        cart[index].quantity -= 1;
    } else {
        removeFromCart(index);
        return;
    }
    
    updateCart();
}

// ฟังก์ชันเพิ่มจำนวนสินค้า
function increaseQuantity(index) {
    cart[index].quantity += 1;
    updateCart();
}

// ฟังก์ชันเปลี่ยนเพศสินค้าในตะกร้า
function changeCartItemGender(index, newGender) {
    cart[index].gender = newGender;
    updateCart();
    showNotification('เปลี่ยนเพศปลาเรียบร้อยแล้ว');
}

// ฟังก์ชันลบสินค้าออกจากตะกร้า
function removeFromCart(index) {
    const product = products.find(p => p.id === cart[index].id);
    const genderName = getGenderName(cart[index].gender);
    cart.splice(index, 1);
    updateCart();
    showNotification(`ลบ ${product.name} (${genderName}) ออกจากตะกร้าแล้ว`);
}

// ฟังก์ชันตรวจสอบว่าสินค้าในตะกร้าครบถ้วน
function validateCartBeforeCheckout() {
    for (const item of cart) {
        if (!item.gender) {
            return false;
        }
    }
    return true;
}

// ฟังก์ชันส่งคำสั่งซื้อไปยัง Telegram
function sendOrderToTelegram(orderData) {
    // ข้อมูลสำหรับเชื่อมต่อกับ Telegram Bot
    // แทนที่ YOUR_BOT_TOKEN ด้วยโทเคนของบอทของคุณ
    // แทนที่ YOUR_CHAT_ID ด้วยรหัสแชทของคุณ
    const botToken = '8195526446:AAHYZx1miXZhPsE1kr1dduLYOrxLKdjm4aU';
    const chatId = '8151676502';
    
    // สร้างข้อความสำหรับส่ง
    let message = `🛍️ มีคำสั่งซื้อปลาสวยงามไทยใหม่!\n\n`;
    message += `👤 ชื่อ: ${orderData.name}\n`;
    message += `📞 โทร: ${orderData.phone}\n`;
    message += `🏠 ที่อยู่: ${orderData.address}\n`;
    message += `🚚 การจัดส่ง: ${orderData.shipping === 'express' ? 'จัดส่งด่วน (50 บาท)' : 'จัดส่งธรรมดา'}\n`;
    
    if (orderData.note) {
        message += `📝 หมายเหตุ: ${orderData.note}\n`;
    }
    
    message += `\n🛒 รายการปลาสวยงาม:\n`;
    
    let total = 0;
    orderData.items.forEach(item => {
        const product = products.find(p => p.id === item.id);
        const itemTotal = product.price * item.quantity;
        total += itemTotal;
        const genderName = getGenderName(item.gender);
        
        message += `- ${product.name} (${genderName})\n`;
        message += `  x${item.quantity} = ฿${itemTotal}\n`;
    });
    
    // เพิ่มค่าจัดส่งด่วน
    if (orderData.shipping === 'express') {
        total += 50;
        message += `- ค่าจัดส่งด่วน = ฿50\n`;
    }
    
    message += `\n💰 รวมทั้งหมด: ฿${total}`;
    
    // ส่งข้อความไปยัง Telegram
    const url = `https://api.telegram.org/bot${botToken}/sendMessage`;
    
    return fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            chat_id: chatId,
            text: message
        })
    });
}

// ฟังก์ชันกรองสินค้า
function filterProducts(category) {
    currentFilter = category;
    
    // อัพเดทปุ่มกรอง
    filterButtons.forEach(btn => {
        if (btn.getAttribute('data-filter') === category) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });
    
    // โหลดสินค้าตามหมวดหมู่
    loadProducts(category);
}

// Event Listeners
document.addEventListener('DOMContentLoaded', function() {
    // โหลดสินค้าทั้งหมดเมื่อเริ่มต้น
    loadProducts();
    
    // ตั้งค่า event listeners สำหรับปุ่มกรอง
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            const filter = this.getAttribute('data-filter');
            filterProducts(filter);
        });
    });
    
    // ตั้งค่า event listeners สำหรับการคลิกที่ประเภทสินค้า
    categoryCards.forEach(card => {
        card.addEventListener('click', function() {
            const category = this.getAttribute('data-category');
            filterProducts(category);
            
            // เลื่อนไปยังส่วนสินค้า
            document.getElementById('products').scrollIntoView({
                behavior: 'smooth'
            });
        });
    });
    
    // ล้างตะกร้า
    clearCartBtn.addEventListener('click', function() {
        if (cart.length === 0) {
            showNotification('ตะกร้าสินค้าว่างอยู่แล้ว', false);
            return;
        }
        
        cart = [];
        updateCart();
        showNotification('ล้างตะกร้าสินค้าแล้ว');
    });
    
    // ส่งแบบฟอร์มสั่งซื้อ
    orderForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        if (cart.length === 0) {
            showNotification('กรุณาเพิ่มสินค้าในตะกร้าก่อนสั่งซื้อ', false);
            return;
        }
        
        // ตรวจสอบว่าสินค้าทุกตัวเลือกเพศแล้ว
        if (!validateCartBeforeCheckout()) {
            showNotification('กรุณาเลือกเพศปลาสำหรับสินค้าทุกตัวก่อนสั่งซื้อ', false);
            return;
        }
        
        const name = document.getElementById('name').value.trim();
        const phone = document.getElementById('phone').value.trim();
        const address = document.getElementById('address').value.trim();
        const shipping = document.getElementById('shipping').value;
        const note = document.getElementById('note').value.trim();
        
        // ตรวจสอบข้อมูล
        if (!name || !phone || !address) {
            showNotification('กรุณากรอกข้อมูลให้ครบถ้วน', false);
            return;
        }
        
        const orderData = {
            name: name,
            phone: phone,
            address: address,
            shipping: shipping,
            note: note,
            items: [...cart]
        };
        
        toggleLoading(true);
        
        try {
            // ส่งคำสั่งซื้อไปยัง Telegram
            await sendOrderToTelegram(orderData);
            
            // รีเซ็ตฟอร์มและตะกร้า
            orderForm.reset();
            cart = [];
            updateCart();
            
            showNotification('สั่งซื้อสำเร็จ! เราจะติดต่อกลับไปเร็วๆ นี้');
        } catch (error) {
            console.error('เกิดข้อผิดพลาดในการส่งคำสั่งซื้อ:', error);
            showNotification('เกิดข้อผิดพลาดในการส่งคำสั่งซื้อ กรุณาลองอีกครั้ง', false);
        } finally {
            toggleLoading(false);
        }
    });
    
    // Smooth scroll สำหรับ navigation
    document.querySelectorAll('nav a').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
});