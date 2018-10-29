/**
 * Fungsi untuk menginisialisasi petak hex
 * disini, petak juga dapat dianggap sebagai kota
 */


/**
 * Besar map permainan hex ini
 */
var besar = 5;

/**
 * Membuat class petak baru
 * @param {int} x Posisi x
 * @param {int} y Posisi y
 */
function Petak(x = null, y = null) {
	this.x = x;
    this.y = y;
    this.diagonal = (this.x != null && this.y != null ? (besar - x) + y : null);
    this.uniqueID = x + y * besar;
    /**
     * Petak ini sudah diambil oleh warna apa?
     */
    this.milik = PIHAK_NULL;
    
    /**
     * Dari petak ini dapat terhubung ke petak apa aja?
     * @type {Petak[]}
     */
    this.tetangga = [];

    /**
     * Element HTML untuk petak ini
     */
    this.element;

    /**
     * Mendapatkan jarak petak ini dengan petak yang dimaksud
     * @param {Petak} petak 
     */
    this.jarakDenganPetak = function(petak) {
        var dx, dy;
        if (this.x == null || petak.x == null)
            dx = 0;
        else dx = this.x - petak.x;
        if (this.y == null || petak.y == null)
            dy = 0;
        else dy = this.y - petak.y;
        if (dx == 0)
            return Math.abs(dy);
        else if (dy == 0)
            return Math.abs(dx);
        else if (Math.sign(dx) == Math.sign(dy))
            return Math.max(Math.abs(dx), Math.abs(dy));
        else return Math.abs(dx) + Math.abs(dy);
    };
}

/**
 * Map permainan
 * @type {Petak[][]}
 */
var map = [];
/**
 * Pada suatu baris X, pihak Y memiliki berapa petak?
 */
var jumlahMilikBaris = [];
/**
 * Pada suatu kolom X, pihak Y memiliki berapa petak?
 */
var jumlahMilikKolom = [];
/**
 * Pada suatu diagonal X, pihak Y memiliki berapa petak?
 */
var jumlahMilikDiagonal = [];

/**
 * Node petak tersembunyi untuk pihak merah (disebelah kiri)
 * @type {Petak}
 */
var merahStart = null;
/**
 * Node petak tersembunyi untuk pihak merah (disebelah kanan)
 * @type {Petak}
 */
var merahEnd = null;
/**
 * Node petak tersembunyi untuk pihak biru (disebelah atas)
 * @type {Petak}
 */
var biruStart = null;
/**
 * Node petak tersembunyi untuk pihak biru (disebelah bawah)
 * @type {Petak}
 */
var biruEnd = null;

function initMap() {
    // Inisialisasi besarnya elemen map
    $(".map").css("width", besar * 37);
    $(".map").css("height", besar * 56);
    
    // Inisialisasi variabel map
    for (var x = 0; x < besar; x++) {
        map[x] = [];
        jumlahMilikBaris[x] = [0, 0, 0];
        jumlahMilikKolom[x] = [0, 0, 0];
        jumlahMilikDiagonal[x * 2] = [0, 0, 0];
        jumlahMilikDiagonal[x * 2 + 1] = [0, 0, 0];
        for (var y = 0; y < besar; y++) {
            let petakBaru = new Petak(x, y);
            // Inisisialisasi posisi, trial and error.
            var posX = x * 36;
            var posY = (besar - 1 - x) * 18 + y * 40;

            var elementBaru = $(
                "<div class='petak' " +
                    "style='left:" + posX + "px; top:" + posY + "' " +
                    "data-x='" + x + "' " +
                    "data-y='" + y + "'>" +
                "</div>"
            );
            
            elementBaru.click(klikPetak);
            $(".map").append(elementBaru);
            /*
            var elementCoba = $(
                "<div class='box' " +
                    "style='left:" + x * 45 + "px; top:" + y * 40 + "px' " +
                    "data-x='" + x + "' " +
                    "data-y='" + y + "'>" +
                "</div>"
            );
            elementCoba.click(klikPetak);
            $(".mapp").append(elementCoba);
            */
            petakBaru.element = elementBaru[0];
            /*
            petakBaru.element = [
                elementCoba[0],
                elementBaru[0]
            ];
            */
            map[x][y] = petakBaru;
        }
    }
    // Inisialisasi pos mulai dan pos akhir pada masing masing warna
    merahStart = new Petak(-1, null);
    merahEnd = new Petak(besar, null);
    merahStart.milik = merahEnd.milik = PIHAK_MERAH;
    biruStart = new Petak(null, -1);
    biruEnd = new Petak(null, besar);
    biruStart.milik = biruEnd.milik = PIHAK_BIRU;
    // Inisialisasi tetangga untuk pos mulai dan pos akhir
    for (var i = 0; i < besar; i++) {
        merahStart.tetangga.push(map[0][i]);
        merahEnd.tetangga.push(map[besar-1][i]);
        biruStart.tetangga.push(map[i][0]);
        biruEnd.tetangga.push(map[i][besar-1]);
    }

    // Inisialisasi tetangga untuk petak di ujung peta
    map[0][0].tetangga = [
        map[1][0],
        map[0][1],
        map[1][1],
        merahStart,
        biruStart
    ];
    map[besar - 1][0].tetangga = [
        map[besar - 1][1],
        map[besar - 2][0],
        biruStart,
        merahEnd
    ];
    map[0][besar - 1].tetangga = [
        map[0][besar - 2],
        map[1][besar - 1],
        merahStart,
        biruEnd
    ];
    map[besar - 1][besar - 1].tetangga = [
        map[besar - 2][besar - 2],
        map[besar - 2][besar - 1],
        map[besar - 1][besar - 2],
        merahEnd,
        biruEnd
    ];

    for (var x = 1; x < besar - 1; x++) {
        // Inisialisasi tetangga untuk sisi atas kiri bawah kanan
        map[x][0].tetangga = [ //sisi atas
            map[x + 1][0],
            map[x + 1][1],
            map[x][1],
            map[x - 1][0],
            biruStart
        ];
        map[0][x].tetangga = [ //sisi kiri
            map[0][x - 1],
            map[1][x],
            map[1][x + 1],
            map[0][x + 1],
            merahStart
        ];
        map[x][besar - 1].tetangga = [ //sisi bawah
            map[x - 1][besar - 1],
            map[x - 1][besar - 2],
            map[x][besar - 2],
            map[x + 1][besar - 1],
            biruEnd
        ];
        map[besar - 1][x].tetangga = [ //sisi kanan
            map[besar - 1][x - 1],
            map[besar - 2][x - 1],
            map[besar - 2][x],
            map[besar - 1][x + 1],
            merahEnd
        ];

        // Inisialisasi tetangga untuk sisa petak petak
        for (var y = 1; y < besar - 1; y++) {
            map[x][y].tetangga = [
                map[x][y - 1],
                map[x + 1][y],
                map[x + 1][y + 1],
                map[x][y + 1],
                map[x - 1][y],
                map[x - 1][y - 1]
            ];
        }
    }
}