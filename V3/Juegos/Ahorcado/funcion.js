  
            // Variables
            var ctx;
            var canvas;
            var palabra;
            var letras = "QWERTYUIOPASDFGHJKLÑZXCVBNM"; //distrubucion del teclado
            var colorTecla = "#3b7852"; //color de l acajita
            var colorMargen = "blue"; //color del margen
            var inicioX = 200;
            var inicioY = 300;
            var lon = 35;
            var margen = 20;
            var pistaText = "";

            /// Arreglos 
            var teclas_array = new Array();
            var letras_array = new Array();
            var palabras_array = new Array();

            // Variables de control 
            var aciertos = 0;
            var errores = 0;
            
            //Palabras 
            palabras_array.push("TOTOABA");
            palabras_array.push("TORTUGA");
            palabras_array.push("VAQUITAMARINA");
            palabras_array.push("BALLENAAZUL");
            palabras_array.push("TORTULORA");
            palabras_array.push("LEONMARINO");
            palabras_array.push("TIBURON");
            palabras_array.push("DELFIN");
            palabras_array.push("TORTUGAGIGANTE");
            palabras_array.push("JAGUAR");
            palabras_array.push("LOBO");
           
                    
            //objetos
            function Tecla(x, y, ancho, alto, letra){
                this.x = x;
                this.y = y;
                this.ancho = ancho;
                this.alto = alto;
                this.letra = letra;
                this.dibuja = dibujaTecla;
            }
            
            function Letra(x, y, ancho, alto, letra){
                this.x = x;
                this.y = y;
                this.ancho = ancho;
                this.alto = alto;
                this.letra = letra;
                this.dibuja = dibujaCajaLetra;
                this.dibujaLetra = dibujaLetraLetra;
            }
           
            //Funciones

            //dibujando teclas
            function dibujaTecla(){
                ctx.fillStyle = colorTecla;
                ctx.strokeStyle = colorMargen;
                ctx.fillRect(this.x, this.y, this.ancho, this.alto);
                ctx.strokeRect(this.x, this.y, this.ancho, this.alto);
                
                ctx.fillStyle = "white";
                ctx.font = "bold 20px courier";
                ctx.fillText(this.letra, this.x+this.ancho/2-5, this.y+this.alto/2+5);
            }
            
            //dibujando letra y cajita
            function dibujaLetraLetra(){
                var w = this.ancho;
                var h = this.alto;
                ctx.fillStyle = "black";
                ctx.font = "bold 40px Courier";
                ctx.fillText(this.letra, this.x+w/2-12, this.y+h/2+14);
            }
            function dibujaCajaLetra(){
                ctx.fillStyle = "white";
                ctx.strokeStyle = "black";
                ctx.fillRect(this.x, this.y, this.ancho, this.alto);
                ctx.strokeRect(this.x, this.y, this.ancho, this.alto);
            }
            
            
            /// Funcion para dar una pista la usuario 
            function pistaFunction(palabra){
                let pista = ""; // Se crea la variable local pista que contendra nuestra frase de pista
                switch(palabra){  // Se crea un switch para poder controlar las pistas segun la palabra 
                    case 'TOTOABA':   // Se debera hacer un case por cada palabra 
                        pista = "SE ENCUENTRA EN EL MAR CORTES";
                        break;    
                    case 'TORTUGA':
                        pista = "TIENE CAPARAZON Y ES VERDE";
                        break;
                    case 'VAQUITAMARINA':
                        pista = "MUJE PERO ESTA EN EL MAR";
                        break;
                    case 'BALLENAAZUL':
                        pista = "LA MAS GRANDE DEL OCEANO";
                        break;
                    case'TORTUGALORA':
                        pista="VIVE EN EL OCEANO ATLANTICO"
                        break;
                    case 'LEONMARINO':
                        pista="TIENEN GRANDES COLMILLOS"
                        break;    
                    case 'TIBURON':
                        pista="TIENE GRANDES DIENTES SALE EN NEMO"
                        break;
                    case 'DELFIN':
                        pista="SON MUY INTELIGENTES"
                        break;
                    case 'TORTUGAGIGANTE':
                        pista="ES VERDE Y MUY GRANDE"
                        break;
                    case 'JAGUAR':
                        pista="ES UN FELINO CON MANCHAS"
                        break;
                    case 'LOBO':
                        pista="AULLA Y ESTA EN MANADA"
                        break;                     
                        
                }
                // Pintamos la palabra en el canvas , en este ejemplo se pinta arriba a la izquierda //
                ctx.fillStyle = "black";  // Aqui ponemos el color de la letra
                ctx.font = "bold 20px Courier";  // aqui ponemos el tipo y tamaño de la letra
                ctx.fillText(pista, 10, 15);  // aqui ponemos la frase en osea lo que esta en pista y la posicion x y posicion y
            }
                               
             //Distrubucion de teclado 
            function teclado(){
                var ren = 0;
                var col = 0;
                var letra = "";
                var miLetra;
                var x = inicioX;
                var y = inicioY;
                for(var i = 0; i < letras.length; i++){
                    letra = letras.substr(i,1);
                    miLetra = new Tecla(x, y, lon, lon, letra);
                    miLetra.dibuja();
                    teclas_array.push(miLetra);
                    x += lon  + margen;
                    col++;
                    if(col==10){
                        col = 0;
                        ren++;
                        if(ren==2){
                            x = 280;
                        } else {
                            x = inicioX;
                        }
                    }
                    y = inicioY + ren * 50;
                }
            }
            
            //se obtiene la palabra y se divide en cada letra
            function pintaPalabra(){
                var p = Math.floor(Math.random()*palabras_array.length);
                palabra = palabras_array[p];
      
                pistaFunction(palabra);
            
                var w = canvas.width;
                var len = palabra.length;
                var ren = 0;
                var col = 0;
                var y = 230;
                var lon = 50;
                var x = (w - (lon+margen) *len)/2;
                for(var i=0; i<palabra.length; i++){
                    letra = palabra.substr(i,1);
                    miLetra = new Letra(x, y, lon, lon, letra);
                    miLetra.dibuja();
                    letras_array.push(miLetra);
                    x += lon + margen;
                }
            }
            
            // imagenes del ahorcado
            function horca(errores){ 
                var imagen = new Image();
                imagen.src = "imagenes/ahorcado"+errores+".png";
                imagen.onload = function(){
                    ctx.drawImage(imagen, 390, 0, 230, 230);
                }
               
            }
            //se ajustan coordenadas
            function ajusta(xx, yy){
                var posCanvas = canvas.getBoundingClientRect();
                var x = xx-posCanvas.left;
                var y = yy-posCanvas.top;
                return{x:x, y:y}
            }
            
            // funcion para detectar la tecla y validar que si es
            function selecciona(e){
                var pos = ajusta(e.clientX, e.clientY);
                var x = pos.x;
                var y = pos.y;
                var tecla;
                var bandera = false;
                for (var i = 0; i < teclas_array.length; i++){
                    tecla = teclas_array[i];
                    if (tecla.x > 0){
                        if ((x > tecla.x) && (x < tecla.x + tecla.ancho) && (y > tecla.y) && (y < tecla.y + tecla.alto)){
                            break;
                        }
                    }
                }
                if (i < teclas_array.length){
                    for (var i = 0 ; i < palabra.length ; i++){ 
                        letra = palabra.substr(i, 1);
                        if (letra == tecla.letra){ // comparamos y vemos si acerto la letra 
                            caja = letras_array[i];
                            caja.dibujaLetra();
                            aciertos++;
                            bandera = true;
                        }
                    }
                    if (bandera == false){ // si no le a tina las veces manda a la funcion de gameover
                        errores++;
                        horca(errores);
                        if (errores == 5) gameOver(errores);
                    }
                   //borra tecla que se ha tecleado
                    ctx.clearRect(tecla.x - 1, tecla.y - 1, tecla.ancho + 2, tecla.alto + 2);
                    tecla.x - 1;
                    //verifica si se gano o no 
                    if (aciertos == palabra.length) gameOver(errores);
                }
            }
            
            //se borran todo y manda mensaje si se gano o perdio
            function gameOver(errores){
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                ctx.fillStyle = "black";

                ctx.font = "bold 50px Courier";
                if (errores < 5){
                    ctx.fillText("Muy bien, la palabra es: ", 110, 280);
                } else {
                    ctx.fillText("Lo sentimos, la palabra era: ", 110, 280);
                }
                
                ctx.font = "bold 80px Courier";
                lon = (canvas.width - (palabra.length*48))/2;
                ctx.fillText(palabra, lon, 380);
                horca(errores);
            }
            
            //detecta si es complatible con canvas
            window.onload = function(){
                canvas = document.getElementById("pantalla");
                if (canvas && canvas.getContext){
                    ctx = canvas.getContext("2d");
                    if(ctx){
                        teclado();
                        pintaPalabra();
                        horca(errores);
                        canvas.addEventListener("click", selecciona, false);
                    } else {
                        alert ("Error al cargar el contexto!");
                    }
                }
            }