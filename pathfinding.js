

/**
 * Class untuk prority queue path findingnya petak
 * @param {Petak} petakDari
 * @param {Petak} petakKe
 * @param {int} cost Biaya yang dibutuhkan untuk menuju petak ini
 * @param {int} pihak Dilihat dari pihak mana proritasnya?
 */
function PetakPriorityNode(petakDari, petakKe, cost, pihak) {
    this._jarak = -1;
    this.petakDari = petakDari;
    this.petakKe = petakKe;
    this.cost = cost;
    this.pihak = pihak;

    this.tempMilikKolom = $.extend(true, [], jumlahMilikKolom);
    this.tempMilikBaris = $.extend(true, [], jumlahMilikBaris);
    this.tempMilikDiagonal = $.extend(true, [], jumlahMilikDiagonal);
    if (petakDari.diagonal != null) {
        this.tempMilikKolom[petakDari.x][pihak]--;
        this.tempMilikBaris[petakDari.y][pihak]--;
        this.tempMilikDiagonal[petakDari.diagonal][pihak]--;
    }
    
    this.jarakKeTujuan = function() {
        if (this._jarak == -1) {
            if (this.petakDari.milik == this.pihak) {
                this._jarak = cost * 10;
            } else if (this.petakDari.diagonal != null && this.petakDari.milik != this.pihak) {
                this._jarak = this.petakDari.jarakDenganPetak(this.petakKe) * 10;
                this._jarak += cost * 10;
                if (tempMilikKolom[this.petakDari.x][this.pihak] > 0)
                    this._jarak -= 2;
                if (tempMilikBaris[this.petakDari.y][this.pihak] > 0)
                    this._jarak -= 2;
                if (tempMilikDiagonal[this.petakDari.diagonal][this.pihak] > 0)
                    this._jarak -= 2;
                var adaTetangga = false;
                for (var petakTetangga of this.petakDari.tetangga) {
                    if (petakTetangga.milik == this.pihak && petakTetangga.diagonal != null) {
                        adaTetangga = true;
                        break;   
                    }
                }
                if (adaTetangga)
                    this._jarak -= 10;
            } else this._jarak = 0;
        }
        return this._jarak;
    }
}
var tempMilikKolom, tempMilikBaris, tempMilikDiagonal;
/**
 * Mencari jarak dari petak menuju petak
 * dilihat dari milik petaknya siapa
 * 
 * @param {Petak} dari Dari petak
 * @param {Petak} ke Menuju petak
 * @param {int} pihak Dari pihak siapa
 */
function CariJarak(dari, ke, pihak) {
    var comparator = (a, b) => a.jarakKeTujuan() < b.jarakKeTujuan();
    var queue = new PriorityQueue(comparator);
    tempMilikKolom = $.extend(true, [], jumlahMilikKolom);
    tempMilikBaris = $.extend(true, [], jumlahMilikBaris);
    tempMilikDiagonal = $.extend(true, [], jumlahMilikDiagonal);
    var dahDikunjungin = [dari];
    dari.tetangga.forEach(petak => {
        if (petak.milik == PIHAK_NULL)
            queue.push(new PetakPriorityNode(petak, ke, 1, pihak));
        else if (petak.milik == pihak)
            queue.push(new PetakPriorityNode(petak, ke, 0, pihak));
        dahDikunjungin.push(petak);
    });
    var nodeSekarang = queue.pop();
    while (true) {
        var petakSekarang = nodeSekarang.petakDari;
        var prev = $(petakSekarang.element).css("background-color");
        if (pihak == PIHAK_MERAH) {
            $(petakSekarang.element).css("background-color", "orange");
        } else {
            $(petakSekarang.element).css("background-color", "cyan");
        }
        $(petakSekarang.element).css("background-color", prev);
        
        if (petakSekarang == ke) {
            return nodeSekarang.cost;
        }
        petakSekarang.tetangga.forEach(petak => {
            if (!dahDikunjungin.includes(petak)) {
                if (petak.milik == PIHAK_NULL)
                    queue.push(new PetakPriorityNode(petak, ke, nodeSekarang.cost + 1, pihak));
                else if (petak.milik == pihak) {
                    queue.push(new PetakPriorityNode(petak, ke, nodeSekarang.cost, pihak));
                }
                dahDikunjungin.push(petak);
            }
        });
        if (queue.isEmpty())
            return -1;
        nodeSekarang = queue.pop();
    }
}
