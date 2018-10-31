class MinimaxTreeNode {
    constructor(giliran,x,y,alpha = Number.MIN_SAFE_INTEGER,beta = Number.MAX_SAFE_INTEGER) {
        this.giliran = giliran;
		this.x = x;
		this.y = y;
        this.anak = [];
        this.alpha = alpha;
        this.beta = beta;
        this.simpanCariJarak = null;
    }
    heuristik() {
        let hasil = CariJarak(biruStart,biruEnd,PIHAK_BIRU).cost;
        //debugMap();
        //console.log(hasil);
        //if (this.giliran == PIHAK_BIRU)
            return hasil;
        //else /*if (this.giliran == PIHAK_MERAH)*/ {
        //    return CariJarak(merahStart,merahEnd,PIHAK_MERAH).cost - CariJarak(biruStart,biruEnd,PIHAK_BIRU).cost;
        //}
    }
}

/**
 * Adalah fungsi minimax dengan alpha beta pruning.
 * Punyanya Agung
 * @param {MinimaxTreeNode} node 
 * @param {Number} depth berapa kedalaman yang harus diakses dari node ini?
 * @param {Number} min_val
 * @param {Number} max_val
 * @param {Number} min_max 0 untuk posisi meminimalkan, 1 untuk posisi memaksimalkan
 * @return {int} hasil heuristik dari node ini
 */
function minimax_ab(node, depth, min_val, max_val, min_max){
	if (depth == 0){
		return node.heuristik();
	}
	var dari, ke;
	if(node.giliran == PIHAK_MERAH){
		dari = merahStart;
		ke = merahEnd;
	}
	else if(node.giliran == PIHAK_BIRU){
		dari = biruStart;
		ke = biruEnd;
	}
	var cekMenang = CariJarak(dari,ke,node.giliran);
	if(cekMenang == -1){
		if(min_max == 1)
			return 100;
		else
			return -100;
    }
    
	var simpanCariJarak = CariJarak(dari,ke,node.giliran).cost;
	
	var alpha = null;
	var beta = null;
	var adaAnak = false;
	
	var giliranMusuh = 1-node.giliran;
	var ctr = 0;
	for(var i = 0;i<besar;i++){
		for(var j = 0;j<besar;j++){
			adaAnak = false;
			var petak = map[j][i];
			if(petak.milik == PIHAK_NULL){
				setMilikPetak(j,i,node.giliran);
				var jarakDisini = CariJarak(dari,ke,node.giliran).cost;
				if(jarakDisini < simpanCariJarak){
					ctr++;
					if(returnJembatan(j,i,node.giliran) != [-1,-1]){
						if(min_max == 1){  /* max */
							alpha = min_val;
							node.alpha = alpha;
							var nodeAnak = new MinimaxTreeNode(giliranMusuh,j,i,alpha,max_val);
							node.anak.push(nodeAnak);
							var valueReturn = minimax_ab(nodeAnak,0,alpha,max_val, 0);
							if(valueReturn > alpha){
								alpha = valueReturn;
								node.alpha = alpha;
								node.anak[ctr-1].beta = alpha;
							}
							if(alpha >= max_val){
								return max_val;
							}
							else
								adaAnak = true;
						}
						else if(min_max == 0){  /* min */
							beta = max_val;
							node.beta = beta;
							var nodeAnak = new MinimaxTreeNode(giliranMusuh,j,i,min_val,beta);
							node.anak.push(nodeAnak);
							var valueReturn = minimax_ab(nodeAnak,0,min_val,beta,1);
							if (valueReturn < beta){
								node.beta = valueReturn;
								beta = valueReturn;
								node.anak[ctr-1].alpha = beta;
							}
							if (beta <= min_val){
								return min_val;
							}
							else
								adaAnak = true;
						}
					}else{
						if (min_max == 1){  /* max */
							alpha = min_val;
							node.alpha = alpha;
							var child = new MinimaxTreeNode(giliranMusuh,j,i,alpha,max_val);
							node.anak.push(child);
							var valueReturn = minimax_ab(child, depth-1, alpha, max_val, 0);
							if (valueReturn > alpha){
								alpha = valueReturn;
								node.alpha = alpha;
							}
							if (alpha >= max_val){
								return max_val;
							}
							else 
								adaAnak = true;
						}
						else if (min_max == 0){  /* min */
							beta = max_val;
							node.beta = beta;
							var child = new MinimaxTreeNode(giliranMusuh,j,i,min_val,beta);
							node.anak.push(child);
							var valueReturn = minimax_ab(child, depth-1, min_val, beta, 1);
							if (valueReturn < beta){
								beta = valueReturn;
								node.beta = beta;
							}
							if (beta <= min_val){
								return min_val;
							}
							else
								adaAnak = true;
						}
					}
					if(min_max == 1 && adaAnak == false)
						return alpha;
					else if(min_max == 0 && adaAnak == false)
						return beta;
				}
				setMilikPetak(j,i,PIHAK_NULL);
				
			}
		}
	}
	
}

/**
 * Adalah fungsi minimax dengan alpha beta pruning.
 * Dan ini sangat lemot, jangan dipakai.
 * @param {MinimaxTreeNode} node 
 * @param {Number} depth berapa kedalaman yang harus diakses dari node ini?
 * @param {Boolean} min_max false untuk posisi meminimalkan, true untuk posisi memaksimalkan
 * @return {int} hasil heuristik dari node ini
 */
function minimax_ab2(node, depth, min_max){
    if (node.x != null)
        setMilikPetak(node.x, node.y, node.giliran);
    if (depth == 0) {
        let hasil = node.heuristik();
        setMilikPetak(node.x, node.y, PIHAK_NULL);
        return hasil;
    }
    var alpha = node.alpha;
    var beta = node.beta;
    let dari, ke;
    if(node.giliran == PIHAK_MERAH){
        dari = merahStart;
        ke = merahEnd;
    }
    else if(node.giliran == PIHAK_BIRU){
        dari = biruStart;
        ke = biruEnd;
    }
    node.simpanCariJarak = CariJarak(dari,ke,node.giliran);
	if (node.simpanCariJarak.cost == -1) {
        setMilikPetak(node.x, node.y, PIHAK_NULL);
		if(min_max == true)
			return Number.MIN_SAFE_INTEGER;
		else
			return Number.MAX_SAFE_INTEGER;
    }
    if(node.giliran == PIHAK_MERAH){
        node.simpanCariJarakBuatAnak = CariJarak(biruStart, biruEnd, PIHAK_BIRU);
    }
    else if(node.giliran == PIHAK_BIRU){
        node.simpanCariJarakBuatAnak = CariJarak(merahStart, merahEnd, PIHAK_MERAH);
    }
    for (var petak of node.simpanCariJarakBuatAnak.dikunjungin) {    
        var nodeBaru = new MinimaxTreeNode((node.giliran + 1) % 2, petak.x, petak.y, alpha, beta);
        node.anak.push(nodeBaru);
        let hasil = minimax_ab(nodeBaru, depth - 1, !min_max, alpha, beta);
        if (min_max == false) {
            beta = Math.min(beta, hasil);
        } else {
            alpha = Math.max(alpha, hasil);
        }
        //console.log(alpha, beta);
        if (beta <= alpha) break;
    }
    if (node.x != null)
        setMilikPetak(node.x, node.y, PIHAK_NULL);
    node.alpha = alpha;
    node.beta = beta;
    if (min_max == false)
        return beta;
    else return alpha;
}

function returnJembatan(x,y,pihak){
	if(pihak == PIHAK_MERAH){
		//tujuan kiri dan pojok kiri atas
		if(y>=1 && x>=2){
			if(map[x-1][y].milik != PIHAK_BIRU || map[x-1][y-1].milik != PIHAK_BIRU){
				if(map[x-2][y-1].milik == PIHAK_NULL || map[x-2][y].milik == PIHAK_NULL){
					return [x-2,y-1];
				}
			}
		}
		//tujuan kanan dan pojok kanan bawah
		if(y<besar-1 && x<besar-2){
			if(map[x+1][y].milik != PIHAK_BIRU || map[x+1][y+1].milik != PIHAK_BIRU){
				if(map[x+2][y+1].milik == PIHAK_NULL || map[x+2][y].milik == PIHAK_NULL){
					return [x+2,y+1];
				}
			}
		}
		//tujuan pojok kanan atas
		if(y>0 && x<besar-1){
			if(map[x+1][y].milik != PIHAK_BIRU || map[x][y-1].milik != PIHAK_BIRU){
				if(map[x+1][y-1].milik == PIHAK_NULL){
					return [x+1,y-1];
				}
			}
		}
		//tujuan pojok kiri bawah
		if(y<besar-1 && x>0){
			if(map[x-1][y].milik != PIHAK_BIRU || map[x][y+1].milik != PIHAK_BIRU){
				if(map[x-1][y+1].milik == PIHAK_NULL){
					return [x-1,y+1];
				}
			}
		}
	}
	else if(pihak == PIHAK_BIRU){
		//tujuan bawah dan pojok kanan bawah
		if(y<besar-2 && x < besar-1){
			if(map[x][y+1].milik != PIHAK_MERAH || map[x+1][y+1].milik != PIHAK_MERAH){
				if(map[x+1][y+2].milik == PIHAK_NULL || map[x][y+2].milik == PIHAK_NULL){
					return [x+1,y+2];
				}
			}
		}
		//tujuan atas dan pojok kiri 
		if(y>1 && x > 1){
			if(map[x-1][y-1].milik != PIHAK_MERAH || map[x][y-1].milik != PIHAK_MERAH){
				if(map[x-1][y-2].milik == PIHAK_NULL || map[x][y-2].milik == PIHAK_NULL){
					return [x-1,y-2];
				}
			}
		}
		//tujuan pojok kanan atas
		if(y>1 && x<besar-1){
			if(map[x+1][y].milik != PIHAK_MERAH || map[x][y-1].milik != PIHAK_MERAH){
				if(map[x+1][y-1].milik == PIHAK_NULL){
					return [x+1,y-1];
				}
			}
		}
		//tujuan pojok kiri bawah
		if(y<besar-1 && x>0){
			if(map[x-1][y].milik != PIHAK_MERAH || map[x][y+1].milik != PIHAK_MERAH){
				if(map[x-1][y+1].milik == PIHAK_NULL){
					return [x-1,y+1];
				}
			}
		}
	}
	return [-1,-1];
}



