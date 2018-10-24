function minimax_ab(node, depth, min_val, max_val, min_max){
    if (node.cekMenang() == true){
        if (this.min_max == 1)
            return 100;
        else
            return -100;
	}
    if (depth == 0)
        return heuristik(node.mapNodeSekarang,this.min_max)
    node.valueAnak = array();
    var children = node.returnAnak();
    if (this.min_max == 1){  /* max */
        valueSekarang = min_val;
        for (child in node.children){
            valueReturn = minimax_ab(child, depth-1, valueSekarang, max_val, 0);
            node.valueAnak.append(valueReturn);
            if (valueReturn > valueSekarang)
                valueSekarang = valueReturn;
            if (valueSekarang > max_val)
                return max_val;
		}
        return valueSekarang;
	}
    if (this.min_max == 0){  /* min */
        valueSekarang = max_val;
        for (child in node.children)
            valueReturn = minimax_ab(child, depth-1, min_val, valueSekarang, 1);
            node.values.append(valueReturn);
            if (valueReturn < valueSekarang)
                valueSekarang = valueReturn;
            if (valueSekarang < min_val)
               return min_val;
        return valueSekarang;
	}
}

function heuristik(node, min_max=1){
    /**
	 * pengurangan sisa petak sampai menang milik AI dan player
	 */
    var simpanMapAsli = map;
	map = node.mapYangDipakai;
	if(node.treeNode.giliran == PIHAK_MERAH){
		return CariJarak(merahStart,merahEnd,PIHAK_MERAH).cost - CariJarak(biruStart,biruEnd,PIHAK_BIRU).cost;
	}
	else if(node.treeNode.giliran == PIHAK_BIRU){
		return CariJarak(biruStart,biruEnd,PIHAK_BIRU).cost - CariJarak(merahStart,merahEnd,PIHAK_MERAH).cost;
	}
	map = simpanMapAsli;
}
function gameTree(giliran,mapNodeSekarang,x,y,anak){
    this.treeNode = MinimaxTreeNode(giliran,x,y,anak);
	this.valueAnak = [];
	/**
	 * mengembalikan sisa Petak ke goal jika node ditaruh di x dan y
	 * dan mengembalikan lokasi x dan y anak yang terbaik
	 * Note: petak.milik kembali null
	 */
    var sisaPetaDanLokasiAnak = function(){
		var x = this.treeNode.x;
		var y = this.treeNode.y;
		var petak = map[x][y];
		var sisaPetak = -1;
		var arrayLokasiAnak = null;
		if (petak.milik == PIHAK_NULL) {
			petak.milik = this.treeNode.giliran;
			
			if(this.treeNode.giliran == PIHAK_MERAH){
				arrayLokasiAnak = cariLokasiAnak(merahStart,merahEnd,PIHAK_MERAH);
				sisaPetak = CariJarak(merahStart, merahEnd, PIHAK_MERAH).cost;
			}
			else if(this.treeNode.giliran == PIHAK_BIRU){
				arrayLokasiAnak = cariLokasiAnak(biruStart,biruEnd,PIHAK_BIRU);
				sisaPetak = CariJarak(biruStart, biruEnd, PIHAK_BIRU).cost;
			}
			
			map[x][y].milik = PIHAK_NULL;
			if(sisaPetak != -1) 
				return [sisaPetak,arrayLokasiAnak];
		}
		
		return false;
	}
	
	/**
	 * mengembalikan lokasi x dan y anak yang terbaik
	 * menyimpan map tempat x dan y disimpan, lalu mengembalikan map ke kondisi awal
	 * @param dari : merahStart atau biruStart
	 * @param ke : merahEnd atau merahStart
	 */
	var cariLokasiAnak = function(dari,ke,pihak){
		simpanCariJarak = CariJarak(dari,ke,pihak).cost;	
		var simpanMapAsli = map;
		var lokasiXYAnak = array();
		map = this.mapNodeSekarang;
		for(i = 0;i<besar;i++){
			for(j = 0;j<besar;j++){
				var petak = map[j][i];
				if(petak.milik != PIHAK_NULL){
					petak.milik = pihak;
					var jarakDisini = CariJarak(dari,ke,pihak).cost;
					
					if(jarakDisini < simpanCariJarak){
						lokasiXYAnak.push([j,i]);
					}
					petak.milik = PIHAK_NULL;
				}
			}
		}
		map = simpanMapAsli;
		this.treeNode.anak = lokasiXYAnak;
		return lokasiXYAnak;
	}
	
	/**
	 * buat gameTree baru untuk anak, lalu di anaknya di return
	 * menyimpan map tempat x dan y disimpan, lalu mengembalikan map ke kondisi awal
	 * @param pihak : PIHAK_BIRU ATAU PIHAK_MERAH
	 */
	var returnAnak = function(pihak){
		var dari = null;
		var ke = null;
		var simpanMap = this.mapNodeSekarang;
		if(pihak == PIHAK_BIRU){
			dari = biruStart;
			ke = biruEnd;
		}
		else if(pihak == PIHAK_MERAH){
			dari = merahStart;
			ke = merahEnd;
		}
		var lokasiAnak = cariLokasiAnak;
		var nodeAnak = array();
		
		for (xy in lokasiAnak){
			for (koordinat in xy){
				simpanMap[koordinat[0]][koordinat[1]].milik = this.treeNode.giliran;
				var node = new gameTree(this.treeNode.giliran,simpanMap,this.treeNode.x,this.treeNode.y,null);
				nodeAnak.push(node);
				simpanMmap = this.mapNodeSekarang;
			}
		}
		this.treeNode.anak = nodeAnak;
		return this.treeNode.anak;
	}
	/**
	 * mengembalikan lokasi x dan y 1 titik
	 * @param ke : merahEnd atau merahStart
	 */
	 
	function cekMenang(){
		var simpanMapAsli = map;
		map = this.mapNodeSekarang;
		var dari = null;
		var ke = null;
		if(this.treeNode.giliran = PIHAK_MERAH){
			dari = merahStart;
			ke = merahEnd;
		}
		else if (this.treeNode.giliran == PIHAK_BIRU){
			dari = merahStart;
			ke = merahEnd;
		}
		if(CariJarak(dari,ke,this.treeNode.giliran).cost == -1){
			map = simpanMapAsli;
			return true;
		}
		map = simpanMapAsli;
		return false;
	}
	/**
	 * menyimpan lokasi semua bidak yang sudah ditaruh di papan
	 * lalu loop sampai ada titik yang bisa taruh menggunakan jembatan
	 * jika tidak ada titik yang bisa menggunakan jembatan, komputer akan return nilai x dan y random
	 * @param dari : merahStart atau biruStart
	 * @param ke : merahEnd atau merahStart
	 */
	function returnTitikSerang(){
		var posisi_bidak = array();
		for(i = 0;i < besar; i++){
			for(j = 0;j < besar; j++){
				if(map[j][i].milik == this.treeNode.giliran){
					posisi_bidak.push([x,y]);
				}
			}
		}	
        for (xy in posisi_bidak){
            for (koordinat in xy){
                var koordinat_jembatan = returnJembatan(koordinat[0], koordinat[1], this.treeNode.giliran)
                if (koordinat_jembatan != [-1,-1])
                    return bridge_cord;
			}
		}
		return titikXYRandom();
	}
	
	function titikXYRandom(){
		var simpanMapSekarang = map;
		var rand_x = Math.floor(Math.random() * besar);
		var rand_y = Math.floor(Math.random() * besar);
		while (simpanMapSekarang[rand_x][rand_y] != PIHAK_NULL){
			rand_x = Math.floor(Math.random() * besar);
			rand_y = Math.floor(Math.random() * besar);
		}
		return (rand_x, rand_y);
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
}