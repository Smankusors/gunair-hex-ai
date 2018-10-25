const PIHAK_NULL = -1;
const PIHAK_MERAH = 0;
const PIHAK_BIRU = 1;
const PIHAK_HIJAU = 2;

var giliran = PIHAK_MERAH;
var nodeSekarang = new MinimaxTreeNode(PIHAK_BIRU,null,null,null,null,null);


var nodeTerpilih = null;
function klikPetak(event) {
    var el = $(event.currentTarget);
    var data = el.data();
    setMilikPetak(data.x, data.y, giliran);
    remainingRed = CariJarak(merahStart, merahEnd, PIHAK_MERAH).cost;
    remainingBlue = CariJarak(biruStart, biruEnd, PIHAK_BIRU).cost;
    nodeSekarang = new MinimaxTreeNode(PIHAK_BIRU,null,null,null,null,null);
    minimax_ab(nodeSekarang, 5, Number.MIN_SAFE_INTEGER, Number.MAX_SAFE_INTEGER, 1);
    nodeTerpilih = null;
    nodeSekarang.anak.forEach(child => {
        if(nodeSekarang.alpha == child.beta){
            nodeTerpilih = child;
        }
    });
    setMilikPetak(nodeTerpilih.x,nodeTerpilih.y,PIHAK_BIRU);
    $("#merahR").text(remainingRed);
    $("#biruR").text(remainingBlue);
    
    if (remainingRed == -1)
        alert("Biru menang!");
    else if (remainingBlue == -1)
        alert("merah menang!");
}

/**
 * Mengeset petak pada posisi [x] dan [y] menjadi milik nya [pihak]
 * @param {int} x Posisi x petak
 * @param {int} y Posisi y petak
 * @param {int} pihak Pihak siapa ini? {PIHAK_NULL, PIHAK_MERAH, PIHAK_BIRU}
 */
function setMilikPetak(x, y, pihak){
    var petak = map[x][y];
    if (petak.milik != pihak) {
        petak.milik = pihak;
        if (pihak != PIHAK_NULL) {
            jumlahMilikKolom[x][pihak]++;
            jumlahMilikBaris[y][pihak]++;
            jumlahMilikDiagonal[petak.diagonal][pihak]++;
        } else {
            jumlahMilikKolom[x][pihak]--;
            jumlahMilikBaris[y][pihak]--;
            jumlahMilikDiagonal[petak.diagonal][pihak]--;
        }
    } else {
        console.info("Uh.. ngapain set milik jika sama?", petak, pihak);
    }
    switch (pihak) {
        case PIHAK_MERAH:
            $(petak.element).css("background-color", "red");
            break;
        case PIHAK_BIRU:
            $(petak.element).css("background-color", "blue");
            break;
        case PIHAK_HIJAU:
            $(petak.element).css("background-color", "green");
            break;
        default:
            $(petak.element).css("background-color", "");
            break;
    }
}