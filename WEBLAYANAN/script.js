// Utility Functions

function formatDate(date) {
    return new Date(date).toLocaleDateString('id-ID');
}

function formatDateTime(date) {
    return new Date(date).toLocaleDateString('id-ID', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });
}

// Check if user is logged in
function checkLogin() {
    const currentUser = localStorage.getItem('currentUser');
    if (!currentUser) {
        window.location.href = 'login.html';
    }
    return JSON.parse(currentUser);
}

// Initialize localStorage dengan data sample jika kosong
function initializeData() {
    // Sample users
    let users = JSON.parse(localStorage.getItem('users')) || [];
    if (users.length === 0) {
        users = [
            {
                id: 1,
                name: 'Budi Santoso',
                email: 'budi@example.com',
                phone: '08123456789',
                password: 'password123',
                alamat: 'Jl. Merdeka No. 1, Jakarta',
                role: 'user'
            },
            {
                id: 2,
                name: 'Siti Nurhaliza',
                email: 'siti@example.com',
                phone: '08987654321',
                password: 'password123',
                alamat: 'Jl. Sudirman No. 5, Bandung',
                role: 'user'
            },
            {
                id: 999,
                name: 'Administrator',
                email: 'admin@kominfo.local',
                phone: '081200000000',
                password: 'admin123',
                alamat: 'Kantor Kominfo',
                role: 'admin'
            }
        ];
        localStorage.setItem('users', JSON.stringify(users));
    } else {
        // Jika sudah ada users tetapi belum ada admin, tambahkan akun admin default
        if (!users.some(u => u.role === 'admin')) {
            users.push({
                id: 999,
                name: 'Administrator',
                email: 'admin@kominfo.local',
                phone: '081200000000',
                password: 'admin123',
                alamat: 'Kantor Kominfo',
                role: 'admin'
            });
            localStorage.setItem('users', JSON.stringify(users));
        }
    }

    // Sample reports
    if (!localStorage.getItem('laporan')) {
        const sampleReports = [
            {
                id: 1001,
                userId: 1,
                judul: 'Jalan Berlubang di Jl. Merdeka',
                kategori: 'infrastruktur',
                lokasi: 'Jl. Merdeka, Jakarta Pusat',
                tanggalKejadian: '2026-01-20',
                deskripsi: 'Jalan di area ini banyak lubang yang sangat berbahaya bagi pengguna jalan',
                bukti: '',
                kontak: '08123456789',
                tanggal: '2026-01-25T10:30:00',
                status: 'diproses'
            },
            {
                id: 1002,
                userId: 1,
                judul: 'Lampu Jalan Mati di Jl. Gatot Subroto',
                kategori: 'infrastruktur',
                lokasi: 'Jl. Gatot Subroto, Jakarta',
                tanggalKejadian: '2026-01-22',
                deskripsi: 'Lampu jalan di depan pasar tradisional mati dan tidak menyala malam hari',
                bukti: '',
                kontak: '08123456789',
                tanggal: '2026-01-24T14:15:00',
                status: 'verifikasi'
            },
            {
                id: 1003,
                userId: 2,
                judul: 'Antrian Panjang di Kantor Kelurahan',
                kategori: 'pelayanan-publik',
                lokasi: 'Kantor Kelurahan, Bandung',
                tanggalKejadian: '2026-01-23',
                deskripsi: 'Antrian pembuatan KTP terlalu panjang dan menunggu lama',
                bukti: '',
                kontak: '08987654321',
                tanggal: '2026-01-25T09:00:00',
                status: 'pending'
            }
        ];
        localStorage.setItem('laporan', JSON.stringify(sampleReports));
    }
}

// Initialize data when page loads
document.addEventListener('DOMContentLoaded', function() {
    initializeData();
});

// Export data (untuk admin/download)
function exportToJSON() {
    const laporan = JSON.parse(localStorage.getItem('laporan')) || [];
    const dataStr = JSON.stringify(laporan, null, 2);
    const dataBlob = new Blob([dataStr], {type: 'application/json'});
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'laporan_' + new Date().getTime() + '.json';
    link.click();
}

// Clear all data (untuk testing)
function clearAllData() {
    if (confirm('Apakah Anda yakin ingin menghapus semua data? Tindakan ini tidak dapat dibatalkan!')) {
        localStorage.clear();
        window.location.reload();
    }
}
