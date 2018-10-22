function gameTree(giliran,x,y,anak){
    this.treeNode = MinimaxTreeNode(giliran,x,y,anak);

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
	 * mengembalikan lokasi x dan y musuh yang terbaik
	 * @pihak warna pemain yang ingin mencari warna musuh
	 * Note: petak.milik kembali null
	 */
	var cariLokasiMusuh = function(pihak){
		pihak = 1 - pihak;
		if(pihak == PIHAK_BIRU){
			dari = biruStart;
			ke = biruEnd;
		}
		else if(pihak == PIHAK_MERAH){
			dari = merahStart;
			ke = biruEnd;
		}
		simpanCariJarak = CariJarak(dari,ke,pihak).cost;
		
		var simpanMap = map;
		var lokasiXYMusuh = array();
		for(i = 0;i<besar;i++){
			for(j = 0;j<besar;j++){
				var petak = map[j][i];
				if(petak.milik != PIHAK_NULL){
					petak.milik = pihak;
					var jarakDisini = CariJarak(dari,ke,pihak).cost;
					if(jarakDisini < simpanCariJarak)
						lokasiXYMusuh.push([j,i]);
					petak.milik = PIHAK_NULL;
				}
			}
		}
		map = simpanMap;
		return lokasiXYMusuh;
	}
	
	/**
	 * mengembalikan lokasi x dan y anak yang terbaik
	 * @param dari : merahStart atau biruStart
	 * @param ke : merahEnd atau merahStart
	 */
	var cariLokasiAnak = function(dari,ke,pihak){
		simpanCariJarak = CariJarak(dari,ke,pihak).cost;
		
		var simpanMap = map;
		var lokasiXYAnak = array();
		for(i = 0;i<besar;i++){
			for(j = 0;j<besar;j++){
				var petak = map[j][i];
				if(petak.milik != PIHAK_NULL){
					petak.milik = pihak;
					var jarakDisini = CariJarak(dari,ke,pihak).cost;
					
					if(jarakDisini < simpanCariJarak)
						lokasiXYAnak.push([j,i]);
					petak.milik = PIHAK_NULL;
				}
			}
		}
		map = simpanMap;
		this.treeNode.anak = lokasiXYAnak;
		return lokasiXYAnak;
	}
		
	
	var returnJembatan(x,y,pihak){
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
	}
}