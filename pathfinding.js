/**
 * Class untuk prority queue path findingnya petak
 * @param {Petak} petakDari
 * @param {Petak} petakKe
 */
function PetakPriorityNode(petakDari, petakKe) {
    this._jarak = -1;
    this.petakDari = petakDari;
    this.petakKe = petakKe;
    this.jarakKeTujuan = function() {
        if (this._jarak == -1)
            return this._jarak = this.petakDari.jarakDenganPetak(this.petakKe);
        return this._jarak;
    }
}

/**
 * Mencari jarak dari petak menuju petak
 * 
 * @param {Petak} dari Dari petak
 * @param {Petak} ke Menuju petak
 */
function CariJarak(dari, ke) {
    var comparator = (a, b) => a.jarakKeTujuan() < b.jarakKeTujuan();
    var queue = new PriorityQueue(comparator);
    dari.tetangga.forEach(petak =>
        queue.push(new PetakPriorityNode(petak, ke))
    );
    console.log(queue);
}
