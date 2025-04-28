// Efecto de máquina de escribir para el texto
document.addEventListener('DOMContentLoaded', function() {
    // Función para el efecto de máquina de escribir
    class TypeWriter {
        constructor(txtElement, words, wait = 3000) {
            this.txtElement = txtElement;
            this.words = words;
            this.txt = '';
            this.wordIndex = 0;
            this.wait = parseInt(wait, 10);
            this.type();
            this.isDeleting = false;
        }

        type() {
            // Índice actual de la palabra
            const current = this.wordIndex % this.words.length;
            // Texto completo de la palabra actual
            const fullTxt = this.words[current];

            // Verificar si está eliminando
            if (this.isDeleting) {
                // Eliminar un carácter
                this.txt = fullTxt.substring(0, this.txt.length - 1);
            } else {
                // Agregar un carácter
                this.txt = fullTxt.substring(0, this.txt.length + 1);
            }

            // Insertar el texto en el elemento
            this.txtElement.innerHTML = `<span class="txt">${this.txt}</span>`;

            // Velocidad inicial para escribir
            let typeSpeed = 150;

            if (this.isDeleting) {
                typeSpeed /= 2; // Más rápido al borrar
            }

            // Si la palabra está completa
            if (!this.isDeleting && this.txt === fullTxt) {
                // Hacer una pausa al final
                typeSpeed = this.wait;
                // Establecer eliminar a verdadero
                this.isDeleting = true;
            } else if (this.isDeleting && this.txt === '') {
                this.isDeleting = false;
                // Mover al siguiente texto
                this.wordIndex++;
                // Pausa antes de empezar a escribir
                typeSpeed = 500;
            }

            setTimeout(() => this.type(), typeSpeed);
        }
    }

    // Inicializar el efecto de máquina de escribir
    function initTypeWriter() {
        const spanishText = document.getElementById('spanish-text');
        const englishText = document.getElementById('english-text');
        const welcomeText = document.getElementById('welcome-text');
        const enterButton = document.getElementById('enter-button');

        if (welcomeText) {
            setTimeout(() => {
                welcomeText.style.opacity = '1';

                // Iniciar el efecto de máquina de escribir para el texto en español
                if (spanishText) {
                    new TypeWriter(spanishText, ['Bienvenido a mi Portfolio'], 3000);

                    // Después de 4 segundos, mostrar el texto en inglés
                    setTimeout(() => {
                        spanishText.style.display = 'none';
                        if (englishText) {
                            englishText.style.display = 'block';
                            new TypeWriter(englishText, ['Welcome to my Portfolio'], 3000);

                            // Después de otros 4 segundos, mostrar el botón de entrar
                            setTimeout(() => {
                                if (enterButton) {
                                    enterButton.style.opacity = '1';
                                }
                            }, 4000);
                        }
                    }, 4000);
                }
            }, 1000);
        }
    }

    // Iniciar el efecto cuando la página esté cargada
    initTypeWriter();

    // Configurar el botón de entrar
    const enterButton = document.getElementById('enter-button');
    if (enterButton) {
        enterButton.addEventListener('click', function() {
            window.location.href = 'portfolio.html';
        });
    }
});