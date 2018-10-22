const PIHAK_NULL = -1;
const PIHAK_MERAH = 0;
const PIHAK_BIRU = 1;
const PIHAK_HIJAU = 2;

var giliran = PIHAK_MERAH;

function klikPetak(event) {
    var el = $(event.currentTarget);
    var data = el.data();
    var petak = map[data.x][data.y];
    if (petak.milik == PIHAK_NULL) {
        petak.milik = giliran;
        jumlahMilikKolom[data.x][giliran]++;
        jumlahMilikBaris[data.y][giliran]++;
        jumlahMilikDiagonal[petak.diagonal][giliran]++;
        giliran = (giliran + 1) % 2;
    }
    switch (petak.milik) {
        case PIHAK_MERAH:
            $(petak.element).css("background-color", "red");
            break;
        case PIHAK_BIRU:
            $(petak.element).css("background-color", "blue");
            break;
        case PIHAK_HIJAU:
            $(petak.element).css("background-color", "green");
            break;
    }
    remainingRed = CariJarak(merahStart, merahEnd, PIHAK_MERAH).cost;
    remainingBlue = CariJarak(biruStart, biruEnd, PIHAK_BIRU).cost;
    $("#merahR").text(remainingRed);
    $("#biruR").text(remainingBlue);
    if (remainingRed == -1)
        alert("Biru menang!");
    else if (remainingBlue == -1)
        alert("merah menang!");
}

/**
 * Membentuk class DecisionProrityNode yang digunakan untuk menentukan
 * langkah selanjutnya untuk AI.
 * @param {int} step Step keberapa ini?
 */
function DecisionProrityNode(step) {


}