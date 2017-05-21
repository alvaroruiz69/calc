var calculadora = {
	init: function () {
		this.funcionesTeclado();
		this.limpiarDisplay();
		this.formatoBotones(".tecla");
		this.asignarEventosaFuncion();
	},
	// funciones del teclado
	funcionesTeclado: function () {
		var self = this
		var classname = document.getElementsByClassName("tecla");

		for (var i = 0; i < classname.length; i++) {
			classname[i].addEventListener('click', function () {
				self.disminucion(i);
			});
		}

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

		document.getElementById('on').addEventListener('click', function () {
			self.limpiarDisplay();
		});

		document.getElementById('punto').addEventListener('click', function () {
			self.agregarPunto();
		});

		document.getElementById('sign').addEventListener('click', function () {
			self.agregarSigno();
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

		document.getElementById('igual').addEventListener('click', function () {
			self.operacionIgual();
		});
	},

	// agrega valor al display
	agregarValor: function (valor) {
		var self = this
		var elemento = document.getElementById('display')

		if (sessionStorage.result == 1) {
			elemento.innerHTML = valor;
			sessionStorage.result = 0
		} else {
			if (elemento.innerHTML == '0') {
				elemento.innerHTML = valor;
			} else {
				var displayNew = elemento.innerHTML + valor
				var displayOptimo = self.numeroDigitos(displayNew)
				elemento.innerHTML = displayOptimo;
			}
		}
	},

	// valida que se muestren 8 numeros en display
	numeroDigitos: function (valor) {
		var valor = String(valor);
		return valor.substring(0, 8)
	},

	// limpia el display deja 0
	limpiarDisplay: function () {
		document.getElementById('display').innerHTML = '0';

		sessionStorage.valor = 0;
		sessionStorage.operacion = 0;
		sessionStorage.result = 0;
		sessionStorage.ultimoResultado = 0
		sessionStorage.operacionActiva = 0
		sessionStorage.valorGuardado = 0
		sessionStorage.countOperadorIgual = 0
	},

	// agrega punto
	agregarPunto: function () {
		var self = this
		var elemento = document.getElementById('display')
		if (elemento.innerHTML.indexOf('.') < 0) {
			var displayNew = elemento.innerHTML + '.';
			var displayOptimo = self.numeroDigitos(displayNew)
			elemento.innerHTML = displayOptimo;
		}
	},
	// agrega signo "."
	agregarSigno: function () {
		var elemento = document.getElementById('display')
		if (elemento.innerHTML.indexOf('-') < 0 && elemento.innerHTML != '0' && elemento.innerHTML != '') {
			document.getElementById('display').innerHTML = '-' + elemento.innerHTML;
		} else if (elemento.innerHTML != 0 && elemento.innerHTML != '') {
			document.getElementById('display').innerHTML = elemento.innerHTML.substring(1);
		}
	},
	// resultado operaciones
	resultado: function (val1, val2, operacion, tipo) {
		var self = this

		switch (operacion) {
			case '1':
				var resultado = (Number(val1) + Number(val2))
				break;
			case '2':
				var resultado = (Number(val1) - Number(val2))
				break;
			case '3':
				var resultado = (Number(val1) * Number(val2))
				break;
			case '4':
				var resultado = (Number(val1) / Number(val2))
				break;
		}
		resultadoValidado = self.numeroDigitos(resultado);
		sessionStorage.operacionActiva = tipo
		sessionStorage.result = 1
		sessionStorage.ultimoResultado = resultadoValidado
		return resultadoValidado;
	},

	//nueva operacion 
	agregarOperacion: function (valor) {
		var self = this
		var elemento = document.getElementById('display')
		var valorDisplay = Number(elemento.innerHTML)
		var valorOperacion = valor

		if (sessionStorage.result == 1) {
			sessionStorage.valor = sessionStorage.ultimoResultado
			sessionStorage.result = 0
		} else {
			if (sessionStorage.operacionActiva == '1') {
				sessionStorage.valor = self.resultado(sessionStorage.valor, valorDisplay, sessionStorage.operacion, 1)
				sessionStorage.result = 0

			} else {
				sessionStorage.valor = Number(valorDisplay);
			}
		}

		if (valorDisplay != '') {
			sessionStorage.valorGuardado = Number(valorDisplay);
		}

		sessionStorage.countOperadorIgual = 0
		sessionStorage.operacionActiva = 1;
		sessionStorage.operacion = valorOperacion;
		elemento.innerHTML = '';
	},
	
	// funcion igual
	operacionIgual: function () {
		var self = this
		var elemento = document.getElementById('display');
		var valorDisplay = sessionStorage.valor
		var valorOperacion = sessionStorage.operacion
		var valorDisplayNew = elemento.innerHTML

		if (valorDisplayNew == '') {
			valorDisplayNew = sessionStorage.valorGuardado
		} else if (valorDisplayNew != '' && sessionStorage.countOperadorIgual == 0) {
			sessionStorage.valor = valorDisplayNew
			sessionStorage.countOperadorIgual = 1
		}
		elemento.innerHTML = self.resultado(valorDisplay, valorDisplayNew, valorOperacion, 0)
	},

	// eventos formato de botones css
	formatoBotones: function (selector) {
		var x = document.querySelectorAll(selector);
		for (var i = 0; i < x.length; i++) {
			x[i].onmousedown = this.eventoPresionaTecla;
			x[i].onmouseup = this.eventoVuelveTecla;
		};
	},

	eventoPresionaTecla: function (event) {
		calculadora.presionaTecla(event.target);
	},

	eventoVuelveTecla: function (event) {
		calculadora.sueltaTecla(event.target);
	},

	//Formato de botones 
	presionaTecla: function (elemento) {
		var x = elemento.id;
		if (x == "1" || x == "2" || x == "3" || x == "0" || x == "igual" || x == "punto") {
			elemento.style.width = "28%";
			elemento.style.height = "62px";
		} else if (x == "mas") {
			elemento.style.width = "88%";
			elemento.style.height = "98%";
		} else {
			elemento.style.width = "21%";
			elemento.style.height = "62px";
		}
	},

	sueltaTecla: function (elemento) {
		var x = elemento.id;
		if (x == "1" || x == "2" || x == "3" || x == "0" || x == "igual" || x == "punto") {
			elemento.style.width = "29%";
			elemento.style.height = "62.91px";
		} else if (x == "mas") {
			elemento.style.width = "90%";
			elemento.style.height = "100%";
		} else {
			elemento.style.width = "22%";
			elemento.style.height = "62.91px";
		}
	}

}

calculadora.init()
