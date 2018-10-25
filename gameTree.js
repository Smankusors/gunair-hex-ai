class MinimaxTreeNode {
    constructor(giliran,x,y,anak,alpha,beta) {
        this.giliran = giliran;
		this.x = x;
		this.y = y;
        this.anak = [];
        this.alpha = alpha;
        this.beta = beta;
    }
}

function minimax_ab(node, depth, min_val, max_val, min_max){
	
    
        
    var dari = "";
	var ke = "";
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
	if (depth == 0){
		if(node.x == Math.floor(besar/2) && node.y == Math.floor(besar/2) && simpanCariJarak == besar){
			return 100;
		}
		return heuristik(node,min_max);
	}
	var alpha = null;
	var beta = null;
	var adaAnak = false;
	
	var giliranMusuh = 1-node.giliran;
	var ii = 0;
	var jj = 0;
	
	if(simpanCariJarak == besar){
		do{
			ii = Math.floor(besar/2);
			jj = Math.floor(besar/2);
		}while(ii>=besar && jj>=besar);
	}
	var ctr = 0;
	for(var i = ii;i<besar;i++){
		for(var j = jj;j<besar;j++){
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
							var nodeAnak = new MinimaxTreeNode(giliranMusuh,j,i,null,alpha,max_val);
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
							var nodeAnak = new MinimaxTreeNode(giliranMusuh,j,i,null,min_val,beta);
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
							var child = new MinimaxTreeNode(giliranMusuh,j,i,null,alpha,max_val);
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
							var child = new MinimaxTreeNode(giliranMusuh,j,i,null,min_val,beta);
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
					
				}
				setMilikPetak(j,i,PIHAK_NULL);
			}
		}
	}
	if(min_max == 1 && adaAnak == false)
		return alpha;
	else if(min_max == 0 && adaAnak == false)
		return beta;
}
function heuristik(){
    /**
	 * pengurangan sisa petak sampai menang milik AI dan player
	 */
	return CariJarak(biruStart,biruEnd,PIHAK_BIRU).cost - CariJarak(merahStart,merahEnd,PIHAK_MERAH).cost;
}
function returnJembatan(x,y,pihak){
	if(pihak == PIHAK_MERAH){
		if(x%2==0){
			if(y>=1 && x>=2){
				if(map[x-1][y] != PIHAK_BIRU && map[x-1][y-1] != PIHAK_BIRU){
					if(map[x-2][y-1] == PIHAK_NULL){
						return [x-2,y-1];
					}
				}
			}
		}
		else if(x%2==1){
			if(y<=besar-2 && x >= 2){
				if(map[x-1][y] != PIHAK_BIRU && map[x-1][y+1] != PIHAK_BIRU){
					if(map[x-2][y] == PIHAK_NULL){
						return [x-2,y];
					}
				}
			}
		}
	}
	else if(pihak == PIHAK_BIRU){
		if(y%2==0){
			if(y<=besar-3 && x <= besar-2){
				if(map[x][y+1] != PIHAK_MERAH && map[x+1][y+1] != PIHAK_MERAH){
					if(map[x+1][y+2] == PIHAK_NULL){
						return [x+1,y+2];
					}
				}
			}
		}
		else if(y%2==1){
			if(y<=besar-3 && x <= besar-2){
				if(map[x][y+1] != PIHAK_MERAH && map[x+1][y+1] != PIHAK_MERAH){
					if(map[x][y+2] == PIHAK_NULL){
						return [x,y+2];
					}
				}
			}
		}
	}
	else return [-1,-1];
}



