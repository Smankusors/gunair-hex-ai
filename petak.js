/**
 * Fungsi untuk menginisialisasi petak hex
 * disini, petak juga dapat dianggap sebagai kota
 */


const MILIK_TIDAKADA = 0;
const MILIK_MERAH = 1;
const MILIK_BIRU = 2;

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
    
    /**
     * Petak ini sudah diambil oleh warna apa?
     */
    this.milik = MILIK_TIDAKADA;
    
    /**
     * Dari petak ini dapat terhubung ke petak apa aja?
     */
    this.tetangga = [];

    /**
     * Element HTML untuk petak ini
     */
    this.element;
}

/**
 * Map permainan
 */
var map = [];
// Inisialisasi map
for (var x = 0; x < besar; x++) {
	map[x] = [];
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
        
        elementBaru.click(coba);
        $(".map").append(elementBaru);
        petakBaru.element = elementBaru[0];
        map[x][y] = petakBaru;
    }
}
// Inisialisasi pos mulai dan pos akhir pada masing masing warna
var merahStart = new Petak();
var merahEnd = new Petak();
merahStart.milik = merahEnd.milik = MILIK_MERAH;
var biruStart = new Petak();
var biruEnd = new Petak();
biruStart.milik = biruEnd.milik = MILIK_BIRU;
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
    map[1][1]
];
map[besar - 1][0].tetangga = [
	map[besar - 1][1],
    map[besar - 2][0]
];
map[0][besar - 1].tetangga = [
	map[0][besar - 2],
    map[1][besar - 1]
];
map[besar - 1][besar - 1].tetangga = [
	map[besar - 2][besar - 2],
    map[besar - 2][besar - 1],
    map[besar - 1][besar - 2]
];


for (var x = 1; x < besar - 1; x++) {
    // Inisialisasi tetangga untuk sisi atas kiri bawah kanan
	map[x][0].tetangga = [
    	map[x + 1][0],
        map[x + 1][1],
        map[x][1],
        map[x - 1][0]
    ];
    map[0][x].tetangga = [
    	map[0][x - 1],
        map[1][x],
        map[1][x + 1],
        map[0][x + 1]
    ];
    map[x][besar - 1].tetangga = [
    	map[x - 1][besar - 1],
        map[x - 1][besar - 2],
        map[x][besar - 2],
        map[x + 1][besar - 1]
    ];
    map[besar - 1][x].tetangga = [
    	map[besar - 1][x - 1],
        map[besar - 2][x - 1],
        map[besar - 2][x],
        map[besar - 1][x + 1]
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

function coba(event) {
    let el = $(event.currentTarget);
    let pos = el.data();
    map[pos.x][pos.y].tetangga.forEach(petak => {
        let target = $(petak.element);
        target.css("background-color", "red");
    });
}