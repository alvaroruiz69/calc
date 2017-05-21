var calculadora() {
	init: function () {
			this.variableFunciones()
		}
		//se muestre el número correspondiente en la pantalla
	variableFunciones: function () {
		var self = this
		var classname = document.getElementsByClassName('tecla');

		for (var i = 0; i < classname.length; i++) {
			classname[i].addEventListener('click', function () {
				self.disminucionTecla(i);
			});
		}
		// teclas
		document.getElementById('0').addEventListener('click', function () {
			self.agregarValor(0);
		});
		document.getElementById('1').addEventListener('click', function () {
			self.agregarValor(1);
		});
		document.getElementById('2').addEventListener('click', function () {
			self.agregarValor(2);
		});
		document.getElementById('3').addEventListener('click', function () {
			self.agregarValor(3);
		});
		document.getElementById('4').addEventListener('click', function () {
			self.agregarValor(4);
		});
		document.getElementById('5').addEventListener('click', function () {
			self.agregarValor(5);
		});
		document.getElementById('6').addEventListener('click', function () {
			self.agregarValor(6);
		});
		document.getElementById('7').addEventListener('click', function () {
			self.agregarValor(7);
		});
		document.getElementById('8').addEventListener('click', function () {
			self.agregarValor(8);
		});
		document.getElementById('9').addEventListener('click', function () {
			self.agregarValor(9);
		});
		document.getElementById('punto').addEventListener('click', function () {
			self.agregarPunto();
		});
		document.getElementById('igual').addEventListener('click', function () {
			self.operacionIgual();
		});
		
		document.getElementById('mas').addEventListener('click', function () {
			self.agregarOperacion('1');
		});
		document.getElementById('menos').addEventListener('click', function () {
			self.agregarOperacion('2');
		});
		
		document.getElementById('por').addEventListener('click', function () {
			self.agregarOperacion('3');
		});
		document.getElementById('dividido').addEventListener('click', function () {
			self.agregarOperacion('4');
		});
		document.getElementById('sign').addEventListener('click', function () {
			self.agregarSigno();
		});
		document.getElementById('on').addEventListener('click', function () {
			self.limpiarDisplay();
		});


	}



}

calculadora.init();
