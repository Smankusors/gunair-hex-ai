const PIHAK_NULL = 0;
const PIHAK_MERAH = 1;
const PIHAK_BIRU = 2;
const PIHAK_HIJAU = 3;

var giliran = PIHAK_MERAH;

function klikPetak(event) {
    var el = $(event.currentTarget);
    var data = el.data();
    var petak = map[data.x][data.y];
    if (petak.milik == PIHAK_NULL) {
        petak.milik = giliran;
        giliran = giliran % 2 + 1;
    }
    switch (petak.milik) {
        case PIHAK_MERAH:
            el.css("background-color", "red");
            break;
        case PIHAK_BIRU:
            el.css("background-color", "blue");
            break;
        case PIHAK_HIJAU:
            el.css("background-color", "green");
            break;
    }
    remainingRed = CariJarak(merahStart, merahEnd, PIHAK_MERAH);
    remainingBlue = CariJarak(biruStart, biruEnd, PIHAK_BIRU);
    $("#merahR").text(remainingRed);
    $("#biruR").text(remainingBlue);
}