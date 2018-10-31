

/**
 * Class untuk prority queue path findingnya petak
 * @param {Petak} petakDari
 * @param {Petak} petakKe
 * @param {int} pihak Dilihat dari pihak mana proritasnya?
 * @param {int} actualCost Cost yang dibutuhkan dari awal menuju ke petak ini
 * @param {Petak} lewat Untuk menuju petakDari, ini lewat petak mana?
 */
function PetakPriorityNode(petakDari, petakKe, cost, pihak, lewat = null) {
    this._jarak = -1;
    
    /**
     * Dari petak
     * @type {Petak}
     */
    this.petakDari = petakDari;

    /**
     * Ke petak
     * @type {Petak}
     */
    this.petakKe = petakKe;
    
    /**
     * Dari petak mana menuju petakDari?
     * @type {Petak}
     */
    this.lewat = lewat;

    /**
     * Cost sebenarnya yang dibutuhkan dari awal menuju ke petak ini
     */
    this.cost = cost;
    
    this.pihak = pihak;
    this.lawanPihak = (pihak + 1) % 2;
    
    this.tempMilikKolom = $.extend(true, [], jumlahMilikKolom);
    this.tempMilikBaris = $.extend(true, [], jumlahMilikBaris);
    this.tempMilikDiagonal = $.extend(true, [], jumlahMilikDiagonal);
    /*
    if (petakDari.diagonal != null) {
        this.tempMilikKolom[petakDari.x][pihak]--;
        this.tempMilikBaris[petakDari.y][pihak]--;
        this.tempMilikDiagonal[petakDari.diagonal][pihak]--;
    }
    */
    /**
     * Sebagai fungsi h(x), heuristiknya
     */
    this.jarakKeTujuan = function() {
        if (this._jarak == -1) {
            if (this.petakDari.diagonal != null) {
                this._jarak = this.petakDari.jarakDenganPetak(this.petakKe) * 10;
                if (this.petakDari.milik == this.pihak)
                    this._jarak -= 10;
                /*
                if (this.tempMilikKolom[this.petakDari.x][this.pihak] >= 0)
                    this._jarak -= 2;
                if (this.tempMilikBaris[this.petakDari.y][this.pihak] >= 0)
                    this._jarak -= 2;
                if (this.tempMilikDiagonal[this.petakDari.diagonal][this.pihak] >= 0)
                    this._jarak -= 2;
                
                if (this.tempMilikKolom[this.petakDari.x][this.lawanPihak] >= 0)
                    this._jarak += 2;
                if (this.tempMilikBaris[this.petakDari.y][this.lawanPihak] >= 0)
                    this._jarak += 2;
                if (this.tempMilikDiagonal[this.petakDari.diagonal][this.lawanPihak] >= 0)
                    this._jarak += 2;
                */
                this._jarak -= ((
                        this.tempMilikKolom[this.petakDari.x][this.pihak] +
                        this.tempMilikBaris[this.petakDari.y][this.pihak] +
                        this.tempMilikDiagonal[this.petakDari.diagonal][this.pihak]
                    ) - (
                        this.tempMilikKolom[this.petakDari.x][this.lawanPihak] -
                        this.tempMilikBaris[this.petakDari.y][this.lawanPihak] -
                        this.tempMilikDiagonal[this.petakDari.diagonal][this.lawanPihak]
                    )) * 2;

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

    /**
     * Sebagai fungsi f(x), dimana g(x) adalah cost, dan h(x) adalah jarakKeTujuan()
     */
    this.hitungCost = function() {
        return (this.cost * 10) + this.jarakKeTujuan();
    }
}
/**
 * Mencari jarak dari petak menuju petak
 * dilihat dari milik petaknya siapa
 * 
 * @param {Petak} dari Dari petak
 * @param {Petak} ke Menuju petak
 * @param {int} pihak Dari pihak siapa
 * @return {{cost: Number, dikunjungin: Petak[]}}
 */
function CariJarak(dari, ke, pihak) {
    var comparator = (a, b) => a.hitungCost() < b.hitungCost();
    var queue = new PriorityQueue(comparator);
        var dahDikunjungin = [dari];
    dari.tetangga.forEach(petak => {
        if (petak.milik == PIHAK_NULL)
            queue.push(new PetakPriorityNode(petak, ke, 1, pihak));
        else if (petak.milik == pihak)
            queue.push(new PetakPriorityNode(petak, ke, 0, pihak));
        dahDikunjungin.push(petak);
    });
    var nodeSekarang;
    while (!queue.isEmpty()) {
        nodeSekarang = queue.pop();
        var petakSekarang = nodeSekarang.petakDari;
        /*
        var prevColor = $(petakSekarang.element).css("background-color");
        if (pihak == PIHAK_MERAH) {
            $(petakSekarang.element).css("background-color", "orange");
        } else {
            $(petakSekarang.element).css("background-color", "cyan");
        }
        $(petakSekarang.element).css("background-color", prevColor);
        */
        if (petakSekarang == ke) {
            let cost = nodeSekarang.cost;
            var dikunjungin = [];
            while (nodeSekarang.lewat != null) {
                let petak = nodeSekarang.petakDari;
                if (petak.x != null && petak.y != null && petak.milik == PIHAK_NULL) {
                    //console.log(petak.x, petak.y, petak.milik);
                    dikunjungin.push(nodeSekarang.petakDari);
                }
                nodeSekarang = nodeSekarang.lewat;
            }
            let petak = nodeSekarang.petakDari;
            if (petak.x != null && petak.y != null && petak.milik == PIHAK_NULL)
                dikunjungin.push(nodeSekarang.petakDari);
            return {cost: cost, dikunjungin: dikunjungin};
        }
        petakSekarang.tetangga.forEach(petak => {
            if (!dahDikunjungin.includes(petak)) {
                if (petak.milik == PIHAK_NULL)
                    queue.push(new PetakPriorityNode(petak, ke, nodeSekarang.cost + 1, pihak, nodeSekarang));
                else if (petak.milik == pihak) {
                    queue.push(new PetakPriorityNode(petak, ke, nodeSekarang.cost, pihak, nodeSekarang));
                }
                dahDikunjungin.push(petak);
            }
        });
    }
    return {cost: -1, dikunjungin: []};
}
