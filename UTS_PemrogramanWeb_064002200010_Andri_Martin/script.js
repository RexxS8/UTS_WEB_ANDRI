document.addEventListener("DOMContentLoaded", function() {
    // Sembunyikan halaman 2, 3, dan 4
    var page2 = document.querySelector(".login-form");
    var headerHalaman3 = document.getElementById("header-halaman-3");
    var mainHalaman3 = document.getElementById("main-halaman-3");
    var footer = document.querySelector("footer");
    var page4 = document.querySelector(".form-container"); // Tambahkan referensi ke halaman 4

    page2.style.display = "none";
    headerHalaman3.style.display = "none";
    mainHalaman3.style.display = "none";
    page4.style.display = "none"; // Sembunyikan halaman 4 saat memuat

    // Ambil elemen tombol login
    var loginButton = document.querySelector("#login-section input[type='submit']");

    // Tambahkan event listener untuk tombol login
    loginButton.addEventListener("click", function(event) {
        // Sembunyikan halaman 1
        var page1 = document.getElementById("marketplace-section");
        var headerHalaman1 = document.getElementById("header-halaman-1"); // tambahkan ambil header halaman 1
        page1.style.display = "none";
        headerHalaman1.style.display = "none"; // sembunyikan header halaman 1

        // Tampilkan halaman 2
        page2.style.display = "block";
    });

    // Ambil form login di page 2
    var loginForm = document.querySelector(".login-form form");

    // Tambahkan event listener untuk form login
    loginForm.addEventListener("submit", function(event) {
        // Ambil nilai email dan password dari input
        var emailInput = document.getElementById("email");
        var passwordInput = document.getElementById("password");

        // Validasi email dan password
        var email = emailInput.value;
        var password = passwordInput.value;

        if (email.trim() === '' || password.trim() === '') {
            alert('Email dan password harus diisi');
            event.preventDefault(); // Hentikan pengiriman form
            return;
        }

        if (password.length < 6) {
            alert('Password harus memiliki minimal 6 karakter');
            event.preventDefault(); // Hentikan pengiriman form
            return;
        }

        // Navigasi ke halaman 3 setelah login berhasil
        page2.style.display = "none";
        headerHalaman3.style.display = "block";
        mainHalaman3.style.display = "block";
        event.preventDefault(); // Hentikan pengiriman form
    });

    // Ambil tombol Data Produk
    var dataProdukButton = document.querySelector("#main-halaman-3 #marketplace-section-2 button");

    // Tambahkan event listener untuk tombol Data Produk
    dataProdukButton.addEventListener("click", function(event) {
        // Sembunyikan halaman 3
        headerHalaman3.style.display = "none";
        mainHalaman3.style.display = "none";

        // Tampilkan halaman 4
        page4.style.display = "block";

        // Tampilkan data produk dari local storage
        var productListLocalStorage = JSON.parse(localStorage.getItem("productList")) || [];
        var productList = document.getElementById("product-list-body");

        productListLocalStorage.forEach(function(productData) {
            var newRow = document.createElement("tr");
            newRow.innerHTML = "<td>" + productData.code + "</td>" +
                               "<td>" + productData.name + "</td>" +
                               "<td>" + productData.year + "</td>" +
                               "<td>" + productData.category + "</td>" +
                               "<td>" + productData.model + "</td>" +
                               "<td>" + productData.quantity + "</td>" +
                               "<td>" + productData.price + "</td>" +
                               "<td><button class='edit-btn'>Edit</button><button class='delete-btn'>Delete</button></td>";

            productList.appendChild(newRow);
        });
    });

    // Tambahkan event listener untuk tombol Logout
    var logoutButton = document.querySelector("#main-halaman-3 nav button");
    logoutButton.addEventListener("click", function(event) {
        // Kembali ke halaman 1
        var page1 = document.getElementById("marketplace-section");
        var headerHalaman1 = document.getElementById("header-halaman-1"); // tambahkan ambil header halaman 1
        page1.style.display = "block";
        headerHalaman1.style.display = "block"; // tampilkan header halaman 1

        // Sembunyikan halaman 3
        headerHalaman3.style.display = "none";
        mainHalaman3.style.display = "none";
    });

    // Ambil form produk di halaman 4
    var productForm = document.getElementById("product-form");

    // Tambahkan event listener untuk form produk
    productForm.addEventListener("submit", function(event) {
        event.preventDefault(); // Hentikan pengiriman form

        // Ambil nilai dari setiap input
        var code = document.getElementById("code").value;
        var name = document.getElementById("name").value;
        var year = document.getElementById("year").value;
        var category = document.getElementById("category").value;
        var model = document.getElementById("model").value;
        var quantity = document.getElementById("quantity").value;
        var price = document.getElementById("price").value;

        // Buat elemen baris baru untuk tabel
        var newRow = document.createElement("tr");

        // Isi baris dengan data dari formulir
        newRow.innerHTML = "<td>" + code + "</td>" +
                           "<td>" + name + "</td>" +
                           "<td>" + year + "</td>" +
                           "<td>" + category + "</td>" +
                           "<td>" + model + "</td>" +
                           "<td>" + quantity + "</td>" +
                           "<td>" + price + "</td>" +
                           "<td><button class='edit-btn'>Edit</button><button class='delete-btn'>Delete</button></td>";

        // Masukkan baris baru ke dalam tabel
        var productList = document.getElementById("product-list-body");
        productList.appendChild(newRow);

        // Simpan data produk ke dalam local storage
        var productData = {
            code: code,
            name: name,
            year: year,
            category: category,
            model: model,
            quantity: quantity,
            price: price
        };

        var productListLocalStorage = JSON.parse(localStorage.getItem("productList")) || [];
        productListLocalStorage.push(productData);
        localStorage.setItem("productList", JSON.stringify(productListLocalStorage));

        // Tampilkan kembali div yang berisi tabel produk
        document.querySelector(".product-list-container").style.display = "block";

        // Reset formulir
        productForm.reset();
    });

    // Tambahkan event listener untuk tombol pencarian
    var searchButton = document.getElementById("search-button");
    searchButton.addEventListener("click", function() {
        var searchText = document.getElementById("search-box").value.toLowerCase(); // Ambil teks pencarian dan ubah menjadi huruf kecil
        var rows = document.querySelectorAll(".product-list tbody tr"); // Ambil semua baris dari tabel produk
        var dataNotFound = true; // Inisialisasi variabel untuk menandakan apakah data tidak ditemukan

        // Loop melalui setiap baris tabel
        rows.forEach(function(row) {
            var rowData = row.innerText.toLowerCase(); // Ambil teks pada setiap baris dan ubah menjadi huruf kecil
            if (rowData.includes(searchText)) { // Periksa apakah teks pencarian ada dalam teks baris
                row.style.display = ""; // Tampilkan baris jika cocok dengan pencarian
                dataNotFound = false; // Set variabel dataNotFound menjadi false karena data ditemukan
            } else {
                row.style.display = "none"; // Sembunyikan baris jika tidak cocok dengan pencarian
            }
        });

        // Tampilkan pesan "Data tidak ditemukan" jika tidak ada hasil pencarian yang cocok
        var noDataFoundMessage = document.getElementById("no-data-found-message");
        if (dataNotFound) {
            noDataFoundMessage.style.display = "block";
        } else {
            noDataFoundMessage.style.display = "none";
        }
    });

    // Tambahkan event listener untuk tombol Delete
    document.addEventListener('click', function(event) {
        if (event.target.classList.contains('delete-btn')) {
            var row = event.target.parentElement.parentElement;
            var codeToDelete = row.querySelector('td').textContent; // Ambil kode produk untuk dihapus dari local storage
            var productListLocalStorage = JSON.parse(localStorage.getItem("productList")) || [];
            
            // Filter ulang array produk lokal untuk menghapus produk dengan kode yang sesuai
            productListLocalStorage = productListLocalStorage.filter(function(product) {
                return product.code !== codeToDelete;
            });

            // Perbarui local storage setelah penghapusan
            localStorage.setItem("productList", JSON.stringify(productListLocalStorage));

            row.remove();
        }
    });

    // Tambahkan event listener untuk tombol Edit
    document.addEventListener('click', function(event) {
        if (event.target.classList.contains('edit-btn')) {
            var row = event.target.parentElement.parentElement;
            var cells = row.querySelectorAll('td');

            // Isi formulir dengan nilai dari baris yang ingin diedit
            document.getElementById("code").value = cells[0].textContent;
            document.getElementById("name").value = cells[1].textContent;
            document.getElementById("year").value = cells[2].textContent;
            document.getElementById("category").value = cells[3].textContent;
            document.getElementById("model").value = cells[4].textContent;
            document.getElementById("quantity").value = cells[5].textContent;
            document.getElementById("price").value = cells[6].textContent;

            // Hapus baris dari tabel
            row.remove();

            // Ambil kode produk untuk dihapus dari local storage
            var codeToDelete = cells[0].textContent;
            var productListLocalStorage = JSON.parse(localStorage.getItem("productList")) || [];
        
            // Filter ulang array produk lokal untuk menghapus produk dengan kode yang sesuai
            var updatedProductList = productListLocalStorage.filter(function(product) {
                return product.code !== codeToDelete;
            });

            // Perbarui local storage setelah penghapusan
            localStorage.setItem("productList", JSON.stringify(updatedProductList));
        }
    });

});
