/**
 * Class untuk prority queue path findingnya petak
 * @param {Petak} petakDari
 * @param {Petak} petakKe
 * @param {int} cost Biaya yang dibutuhkan untuk menuju petak ini
 */
function PetakPriorityNode(petakDari, petakKe, cost) {
    this._jarak = -1;
    this.petakDari = petakDari;
    this.petakKe = petakKe;
    this.cost = cost;
    this.jarakKeTujuan = function() {
        if (this._jarak == -1)
            return this._jarak = this.petakDari.jarakDenganPetak(this.petakKe);
        return this._jarak;
    }
}

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
    var dahDikunjungin = [dari];
    dari.tetangga.forEach(petak => {
        if (petak.milik == PIHAK_NULL)
            queue.push(new PetakPriorityNode(petak, ke, 1));
        else if (petak.milik == pihak)
            queue.push(new PetakPriorityNode(petak, ke, 0));
    });
    var nodeSekarang = queue.pop();
    while (true) {
        var petakSekarang = nodeSekarang.petakDari;
        dahDikunjungin.push(petakSekarang);
        if (petakSekarang == ke) {
            return nodeSekarang.cost;
        }
        petakSekarang.tetangga.forEach(petak => {
            if (!dahDikunjungin.includes(petak)) {
                if (petak.milik == PIHAK_NULL)
                    queue.push(new PetakPriorityNode(petak, ke, nodeSekarang.cost + 1));
                else if (petak.milik == pihak)
                    queue.push(new PetakPriorityNode(petak, ke, nodeSekarang.cost));
            }
        });
        if (queue.isEmpty())
            return -1;
        nodeSekarang = queue.pop();
    }
}
