document.addEventListener('DOMContentLoaded', () => {
    // 1. Mengambil referensi elemen-elemen dari HTML
    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    const cartItemsContainer = document.getElementById('cart-items');
    const cartTotalSpan = document.getElementById('cart-total');
    const checkoutButton = document.getElementById('checkout-button');

    // Array untuk menyimpan item-item yang ada di keranjang
    let cart = [];

    // 2. Fungsi untuk memformat angka menjadi mata uang Rupiah
    function formatRupiah(number) {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0
        }).format(number);
    }

    // 3. Fungsi untuk memperbarui tampilan keranjang belanja di HTML
    function updateCartDisplay() {
        cartItemsContainer.innerHTML = '';
        let total = 0;

        if (cart.length === 0) {
            cartItemsContainer.innerHTML = '<p>Keranjang kosong.</p>';
        } else {
            cart.forEach(item => {
                const itemElement = document.createElement('div');
                itemElement.classList.add('cart-item-display');
                itemElement.innerHTML = `
                    <span>${item.name} x ${item.quantity}</span>
                    <span>${formatRupiah(item.price * item.quantity)}</span>
                `;
                cartItemsContainer.appendChild(itemElement);
                total += item.price * item.quantity;
            });
        }
        cartTotalSpan.textContent = formatRupiah(total);
    }

    // 4. Menambahkan Event Listener ke setiap tombol "Tambahkan ke Keranjang"
    addToCartButtons.forEach(button => {
        button.addEventListener('click', (event) => {
            const menuItem = event.target.closest('.menu-item');

            if (!menuItem) {
                console.error("Elemen .menu-item tidak ditemukan.");
                return;
            }

            const itemName = menuItem.dataset.name;
            const itemPrice = parseInt(menuItem.dataset.price); 

            if (isNaN(itemPrice)) {
                console.error(`Harga untuk item "${itemName}" tidak valid. Pastikan data-price adalah angka.`);
                alert(`Maaf, terjadi kesalahan saat menambahkan item "${itemName}". Harga tidak valid.`);
                return;
            }

            const existingItem = cart.find(item => item.name === itemName);

            if (existingItem) {
                existingItem.quantity += 1;
            } else {
                cart.push({ name: itemName, price: itemPrice, quantity: 1 });
            }

            // BARIS INI (sekitar baris 75-76 atau 97 di screenshot kamu)
            alert(`${itemName} telah ditambahkan ke keranjang!`); 
            updateCartDisplay(); // Panggil fungsi pembaruan tampilan
        });
    });

    // 5. Menambahkan Event Listener untuk tombol "Checkout"
    checkoutButton.addEventListener('click', () => {
        if (cart.length === 0) {
            alert('Keranjang Anda kosong. Silakan tambahkan item terlebih dahulu.');
            return;
        }

        const totalAmount = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

        // BARIS INI (sekitar baris 97 di screenshot kamu)
        alert(`Pesanan Anda berhasil diproses!\nTotal yang harus dibayar: ${formatRupiah(totalAmount)}\nTerima kasih atas pembelian Anda!`);

        cart = [];
        updateCartDisplay();
    });

    // 6. Panggil fungsi updateCartDisplay() pertama kali saat halaman dimuat
    updateCartDisplay();
});