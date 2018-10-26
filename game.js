const PIHAK_NULL = -1;
const PIHAK_MERAH = 0;
const PIHAK_BIRU = 1;
const PIHAK_HIJAU = 2;

var giliran = PIHAK_MERAH;
var nodeSekarang = new MinimaxTreeNode(PIHAK_BIRU,null,null,null,null,null);

var gameOver = false;
var nodeTerpilih = null;
function klikPetak(event) {
    if(!gameOver){
        gantiGiliran();
        var el = $(event.currentTarget);
        var data = el.data();
        let sukses = setMilikPetak(data.x, data.y, giliran, true);
        gantiGiliran();
        if (!sukses) return;
        
        nodeSekarang = new MinimaxTreeNode(PIHAK_BIRU,null,null,null,null,null);
        minimax_ab(nodeSekarang, varDepth, Number.MIN_SAFE_INTEGER, Number.MAX_SAFE_INTEGER, 1);
        nodeTerpilih = null;
        nodeSekarang.anak.forEach(child => {
            if(nodeSekarang.alpha == child.beta){
                nodeTerpilih = child;
            }
        });
        if(nodeTerpilih == null){
            var xx = null;
            var yy = null;
            do{
                xx = Math.floor(Math.random() * besar);
                yy = Math.floor(Math.random() * besar);
            }while(returnJembatan(xx,yy,PIHAK_BIRU));
            nodeTerpilih = new MinimaxTreeNode(PIHAK_BIRU,xx,yy,null,null,null);
        }
        setMilikPetak(nodeTerpilih.x,nodeTerpilih.y,PIHAK_BIRU, true);
        remainingRed = CariJarak(merahStart, merahEnd, PIHAK_MERAH).cost;
        remainingBlue = CariJarak(biruStart, biruEnd, PIHAK_BIRU).cost;
        $("#merahR").text(remainingRed);
        $("#biruR").text(remainingBlue);
        
        if (remainingRed == -1){
            gameOver = true;
            alert("Biru menang!");
        }
        else if (remainingBlue == -1){
            alert("merah menang!");
            gameOver = true;
        }
        
    }
}
var nodeMerah = null;
var nodeBiru = null;
var timerGame = null;
var ctrxx = 0;
function duaPlayerku(){
    timerGame = setInterval(function(){
        if(ctrxx%2==0){
            gameAIMerah();
        }
        else{
            gameAIBiru();
        }
        ctrxx++;
        gantiGiliran();
    },1000);
}
function gameAIMerah(){
    nodeMerah = new MinimaxTreeNode(PIHAK_MERAH,null,null,null,null,null);
    minimax_ab(nodeMerah, varDepth, Number.MIN_SAFE_INTEGER, Number.MAX_SAFE_INTEGER, 1);
    nodeTerpilih = null;
    nodeMerah.anak.some(child => {
        if(nodeMerah.alpha == child.beta){
            nodeTerpilih = child;
            return true;
        }
    });
    if(nodeTerpilih == null){
        var xx = null;
        var yy = null;
        do{
            xx = Math.floor(Math.random() * besar);
            yy = Math.floor(Math.random() * besar);
        }while(returnJembatan(xx,yy,PIHAK_BIRU));
        nodeTerpilih = new MinimaxTreeNode(PIHAK_MERAH,xx,yy,null,null,null);
    }
    setMilikPetak(nodeTerpilih.x,nodeTerpilih.y,PIHAK_MERAH, true);
    remainingRed = CariJarak(merahStart, merahEnd, PIHAK_MERAH).cost;
    remainingBlue = CariJarak(biruStart, biruEnd, PIHAK_BIRU).cost;
    $("#merahR").text(remainingRed);
    $("#biruR").text(remainingBlue);
    if (remainingRed == -1){
        gameOver = true;
        alert("Biru menang!");
    }
    else if (remainingBlue == -1){
        gameOver = true;
        alert("merah menang!");
    }
    if(gameOver){
        clearInterval(timerGame);
        window.location.reload();
    }
}
function gameAIBiru(){
    nodeBiru = new MinimaxTreeNode(PIHAK_BIRU,null,null,null,null,null);
    minimax_ab(nodeBiru, varDepth, Number.MIN_SAFE_INTEGER, Number.MAX_SAFE_INTEGER, 1);
    nodeTerpilih = null;
    nodeBiru.anak.some(child => {
        if(nodeBiru.alpha == child.beta){
            nodeTerpilih = child;
            return true;
        }
    });
    if(nodeTerpilih == null){
        var xx = null;
        var yy = null;
        do{
            xx = Math.floor(Math.random() * besar);
            yy = Math.floor(Math.random() * besar);
        }while(returnJembatan(xx,yy,PIHAK_BIRU));
        nodeTerpilih = new MinimaxTreeNode(PIHAK_BIRU,xx,yy,null,null,null);
    }
    setMilikPetak(nodeTerpilih.x,nodeTerpilih.y,PIHAK_BIRU, true);
    
    remainingRed = CariJarak(merahStart, merahEnd, PIHAK_MERAH).cost;
    remainingBlue = CariJarak(biruStart, biruEnd, PIHAK_BIRU).cost;
    $("#merahR").text(remainingRed);
    $("#biruR").text(remainingBlue);
    if (remainingRed == -1){
        gameOver = true;
        alert("Biru menang!");
    }
    else if (remainingBlue == -1){
        gameOver = true;
        alert("merah menang!");
    }
    if(gameOver){
        clearInterval(timerGame);
        window.location.reload();
    }
}
function gameDuaPlayer(){
    nodeMerah = new MinimaxTreeNode(PIHAK_MERAH,null,null,null,null,null);
    minimax_ab(nodeMerah, varDepth, Number.MIN_SAFE_INTEGER, Number.MAX_SAFE_INTEGER, 1);
    nodeTerpilih = null;
    nodeMerah.anak.some(child => {
        if(nodeMerah.alpha == child.beta){
            nodeTerpilih = child;
            return true;
        }
    });
    if(nodeTerpilih == null){
        var xx = null;
        var yy = null;
        do{
            xx = Math.floor(Math.random() * besar);
            yy = Math.floor(Math.random() * besar);
        }while(returnJembatan(xx,yy,PIHAK_BIRU));
        nodeTerpilih = new MinimaxTreeNode(PIHAK_MERAH,xx,yy,null,null,null);
    }
    setMilikPetak(nodeTerpilih.x,nodeTerpilih.y,PIHAK_MERAH, true);

    nodeBiru = new MinimaxTreeNode(PIHAK_BIRU,null,null,null,null,null);
    minimax_ab(nodeBiru, varDepth, Number.MIN_SAFE_INTEGER, Number.MAX_SAFE_INTEGER, 1);
    nodeTerpilih = null;
    nodeBiru.anak.some(child => {
        if(nodeBiru.alpha == child.beta){
            nodeTerpilih = child;
            return true;
        }
    });
    if(nodeTerpilih == null){
        var xx = null;
        var yy = null;
        do{
            xx = Math.floor(Math.random() * besar);
            yy = Math.floor(Math.random() * besar);
        }while(returnJembatan(xx,yy,PIHAK_BIRU));
        nodeTerpilih = new MinimaxTreeNode(PIHAK_BIRU,xx,yy,null,null,null);
    }
    setMilikPetak(nodeTerpilih.x,nodeTerpilih.y,PIHAK_BIRU, true);
    remainingRed = CariJarak(merahStart, merahEnd, PIHAK_MERAH).cost;
    remainingBlue = CariJarak(biruStart, biruEnd, PIHAK_BIRU).cost;
    $("#merahR").text(remainingRed);
    $("#biruR").text(remainingBlue);
    if (remainingRed == -1){
        gameOver = true;
        alert("Biru menang!");
    }
    else if (remainingBlue == -1){
        gameOver = true;
        alert("merah menang!");
    }
    if(gameOver){
        clearInterval(timerGame);
    }
}

/*
    enggak dipake,
*/
var cekStart = false;
var cekEnd = false;
var cekApakahMenang = true;
function cekMenang(node){
    cekStart = false;
    cekEnd = false;
    var nodeBuatCek = null;
    if(node.giliran == PIHAK_MERAH){
        merahStart.tetangga.forEach(petak => {
            if (petak.milik == PIHAK_MERAH)
                cekStart = true;
        });
        merahEnd.tetangga.forEach(petak => {
            if (petak.milik == PIHAK_MERAH)
                cekEnd = true;
        });
        nodeBuatCek = merahStart;
    }
    if(node.giliran == PIHAK_BIRU){
        biruStart.tetangga.forEach(petak => {
            if (petak.milik == PIHAK_MERAH)
                cekStart = true;
        });
        biruEnd.tetangga.forEach(petak => {
            if (petak.milik == PIHAK_MERAH)
                cekEnd = true;
        });
        nodeBuatCek = biruStart;
    }
    if(cekStart && cekEnd){
        cekApakahMenang = true;
        recursiveCekMenang(nodeBuatCek);
    }
}
/*
    enggak dipake,
*/
function recursiveCekMenang(node){
    var cekTetangga = false;
    node.tetangga.some(petak => {
        if(petak.milik == node.giliran){
            cekTetangga = true;
            return true;
        }
    });
    if(cekTetangga){
        node.tetangga.forEach(petak => {
            if(petak.milik == node.giliran){
                recursiveCekMenang(petak);
            }
        });
    }
    else{
        cekApakahMenang = false;
    }
}
/**
 * Mengeset petak pada posisi [x] dan [y] menjadi milik nya [pihak]
 * @param {int} x Posisi x petak
 * @param {int} y Posisi y petak
 * @param {int} pihak Pihak siapa ini? {PIHAK_NULL, PIHAK_MERAH, PIHAK_BIRU}
 * @param {Boolean} warnai Apakah petaknya diwarnai?
 * @returns {Boolean} apakah set milik petak sukses?
 */
function setMilikPetak(x, y, pihak, warnai = false){
    var petak = map[x][y];
    if (petak.milik != pihak) {
        if (pihak != PIHAK_NULL) {
            if (petak.milik == PIHAK_NULL) {
                petak.milik = pihak;
                jumlahMilikKolom[x][pihak]++;
                jumlahMilikBaris[y][pihak]++;
                jumlahMilikDiagonal[petak.diagonal][pihak]++;
            } else return false;
        } else {
            petak.milik = PIHAK_NULL;
            jumlahMilikKolom[x][pihak]--;
            jumlahMilikBaris[y][pihak]--;
            jumlahMilikDiagonal[petak.diagonal][pihak]--;    
        }
    } else {
        console.info("Uh.. ngapain set milik jika sama?", petak, pihak);
    }
    if (warnai) {
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
    return true;
}

