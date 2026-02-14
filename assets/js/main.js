/**
 * ========================================
 * DINERO FLUYE - LANDING PAGE
 * Mundo Holístico USA
 * JavaScript Moderno ES2026
 * ========================================
 */

'use strict';

/**
 * Clase principal de la aplicación
 * Gestiona todas las funcionalidades de la landing page
 */
class DineroFluyeApp {
    constructor() {
        this.navbar = null;
        this.navbarHeight = 0;
        this.scrollThreshold = 50;
        this.isScrolling = false;
        this.resizeTimeout = null;
        
        this.init();
    }

    /**
     * Inicializa la aplicación
     */
    init() {
        // Esperar a que el DOM esté completamente cargado
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.onDOMReady());
        } else {
            this.onDOMReady();
        }
    }

    /**
     * Se ejecuta cuando el DOM está listo
     */
    onDOMReady() {
        // Cachear elementos del DOM
        this.cachearElementosDOM();
        
        // Inicializar AOS (Animate On Scroll)
        this.inicializarAOS();
        
        // Configurar navegación
        this.configurarNavegacion();
        
        // Configurar scroll suave
        this.configurarScrollSuave();
        
        // Configurar efectos de scroll
        this.configurarEfectosScroll();
        
        // Configurar interacción de tarjetas de identificación
        this.configurarTarjetasIdentificacion();
        
        // Configurar interacción de tarjetas de audio
        this.configurarTarjetasAudio();
        
        // Configurar formularios (si hay)
        this.configurarFormularios();
        
        // Configurar lazy loading para imágenes
        this.configurarLazyLoading();
        
        // Configurar eventos de redimensionamiento
        this.configurarResize();
        
        // Precargar recursos críticos
        this.precargarRecursos();
        
        // Analítica y seguimiento
        this.inicializarAnalitica();
    }

    /**
     * Cachea elementos del DOM para mejor rendimiento
     */
    cachearElementosDOM() {
        this.navbar = document.getElementById('navegacionPrincipal');
        this.navbarHeight = this.navbar?.offsetHeight || 0;
        this.enlaces = document.querySelectorAll('a[href^="#"]');
        this.tarjetasIdentificacion = document.querySelectorAll('.tarjeta-identificacion');
        this.tarjetasAudio = document.querySelectorAll('.item-audio');
        this.botonesInscripcion = document.querySelectorAll('[href="#inscripcion"]');
    }

    /**
     * Inicializa la librería AOS (Animate On Scroll)
     */
    inicializarAOS() {
        if (typeof AOS !== 'undefined') {
            AOS.init({
                duration: 1000,
                easing: 'ease-in-out',
                once: true,
                mirror: false,
                offset: 100,
                delay: 100,
                anchorPlacement: 'top-bottom'
            });
        } else {
            console.warn('⚠️ AOS no está disponible');
        }
    }

    /**
     * Configura la navegación y el navbar sticky
     */
    configurarNavegacion() {
        if (!this.navbar) return;

        // Evento de scroll para navbar
        let ultimoScroll = 0;
        
        window.addEventListener('scroll', () => {
            if (!this.isScrolling) {
                window.requestAnimationFrame(() => {
                    const scrollActual = window.pageYOffset || document.documentElement.scrollTop;
                    
                    // Agregar clase 'scrolled' al navbar
                    if (scrollActual > this.scrollThreshold) {
                        this.navbar.classList.add('scrolled');
                    } else {
                        this.navbar.classList.remove('scrolled');
                    }
                    
                    ultimoScroll = scrollActual;
                    this.isScrolling = false;
                });
                
                this.isScrolling = true;
            }
        }, { passive: true });

        // Cerrar menú móvil al hacer clic en un enlace
        const menuOffcanvas = document.getElementById('menuOffcanvas');
        const menuHamburguesa = document.querySelector('.menu-hamburguesa');
        
        if (menuOffcanvas) {
            // Animación del botón hamburguesa cuando se abre/cierra el offcanvas
            menuOffcanvas.addEventListener('show.bs.offcanvas', () => {
                if (menuHamburguesa) {
                    menuHamburguesa.classList.add('activo');
                }
            });
            
            menuOffcanvas.addEventListener('hide.bs.offcanvas', () => {
                if (menuHamburguesa) {
                    menuHamburguesa.classList.remove('activo');
                }
            });
            
            // Cerrar offcanvas al hacer clic en un enlace
            const enlacesOffcanvas = menuOffcanvas.querySelectorAll('.menu-offcanvas-link, .btn-inscripcion-offcanvas');
            enlacesOffcanvas.forEach(enlace => {
                enlace.addEventListener('click', () => {
                    const offcanvasInstance = bootstrap.Offcanvas.getInstance(menuOffcanvas);
                    if (offcanvasInstance) {
                        offcanvasInstance.hide();
                    }
                });
            });
        }
    }

    /**
     * Configura el scroll suave para los enlaces internos
     */
    configurarScrollSuave() {
        this.enlaces.forEach(enlace => {
            enlace.addEventListener('click', (evento) => {
                const href = enlace.getAttribute('href');
                
                // Solo procesar enlaces internos
                if (href && href.startsWith('#')) {
                    const destino = document.querySelector(href);
                    
                    if (destino) {
                        evento.preventDefault();
                        
                        const offsetTop = destino.offsetTop - this.navbarHeight - 20;
                        
                        window.scrollTo({
                            top: offsetTop,
                            behavior: 'smooth'
                        });

                        // Actualizar URL sin hacer scroll
                        if (history.pushState) {
                            history.pushState(null, null, href);
                        }

                        // Enfoque para accesibilidad
                        destino.focus({ preventScroll: true });
                    }
                }
            });
        });
    }

    /**
     * Configura efectos visuales basados en scroll
     */
    configurarEfectosScroll() {
        // Observador de intersección para animaciones
        const observador = new IntersectionObserver(
            (entradas) => {
                entradas.forEach(entrada => {
                    if (entrada.isIntersecting) {
                        entrada.target.classList.add('visible');
                    }
                });
            },
            {
                threshold: 0.1,
                rootMargin: '0px 0px -50px 0px'
            }
        );

        // Observar tarjetas
        [...this.tarjetasIdentificacion, ...this.tarjetasAudio].forEach(tarjeta => {
            observador.observe(tarjeta);
        });
    }

    /**
     * Configura interacción avanzada para tarjetas de identificación
     * Agrega efectos táctiles, sonido (opcional), y contador de selección
     */
    configurarTarjetasIdentificacion() {
        if (!this.tarjetasIdentificacion || this.tarjetasIdentificacion.length === 0) {
            return;
        }

        // Contador de tarjetas activas
        let tarjetasSeleccionadas = 0;
        const maxSelecciones = 8; // Todas las tarjetas disponibles

        this.tarjetasIdentificacion.forEach((tarjeta, index) => {
            // Event delegation para mejor rendimiento
            tarjeta.addEventListener('click', (e) => {
                // Toggle de selección visual
                const estaSeleccionada = tarjeta.classList.contains('seleccionada');
                
                if (estaSeleccionada) {
                    tarjeta.classList.remove('seleccionada');
                    tarjetasSeleccionadas--;
                } else if (tarjetasSeleccionadas < maxSelecciones) {
                    tarjeta.classList.add('seleccionada');
                    tarjetasSeleccionadas++;
                }

                // Feedback háptico en dispositivos compatibles
                if ('vibrate' in navigator) {
                    navigator.vibrate(10);
                }

                // Añadir clase temporal para animación de "ripple"
                tarjeta.classList.add('ripple-effect');
                setTimeout(() => {
                    tarjeta.classList.remove('ripple-effect');
                }, 600);
            });

            // Efecto de hover mejorado con tracking del mouse (solo desktop/no-touch)
            const esTactil = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
            
            if (!esTactil) {
                tarjeta.addEventListener('mousemove', (e) => {
                    const rect = tarjeta.getBoundingClientRect();
                    const x = e.clientX - rect.left;
                    const y = e.clientY - rect.top;
                    
                    const centerX = rect.width / 2;
                    const centerY = rect.height / 2;
                    
                    const rotateX = (y - centerY) / 10;
                    const rotateY = (centerX - x) / 10;
                    
                    tarjeta.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px) scale(1.02)`;
                });

                tarjeta.addEventListener('mouseleave', () => {
                    // Reset completo del transform para evitar que se quede pegado
                    tarjeta.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0) scale(1)';
                    setTimeout(() => {
                        tarjeta.style.transform = '';
                    }, 300);
                });
            }

            // Accesibilidad: control por teclado
            tarjeta.setAttribute('tabindex', '0');
            tarjeta.setAttribute('role', 'button');
            tarjeta.setAttribute('aria-label', `Tarjeta de identificación ${index + 1}`);

            tarjeta.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    tarjeta.click();
                }
            });
        });
    }

    /**
     * Configura interacción para tarjetas de audio
     * Agrega efectos hover mejorados y accesibilidad
     */
    configurarTarjetasAudio() {
        if (!this.tarjetasAudio || this.tarjetasAudio.length === 0) {
            return;
        }

        // Detectar si es dispositivo táctil
        const esTactil = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

        this.tarjetasAudio.forEach((tarjeta, index) => {
            // Efecto de tilt en desktop (no táctil)
            if (!esTactil) {
                tarjeta.addEventListener('mousemove', (e) => {
                    const rect = tarjeta.getBoundingClientRect();
                    const x = e.clientX - rect.left;
                    const y = e.clientY - rect.top;
                    
                    const centerX = rect.width / 2;
                    const centerY = rect.height / 2;
                    
                    const rotateX = (y - centerY) / 15;
                    const rotateY = (centerX - x) / 15;
                    
                    tarjeta.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-12px) scale(1.03)`;
                });

                tarjeta.addEventListener('mouseleave', () => {
                    // Reset suave
                    tarjeta.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0) scale(1)';
                    setTimeout(() => {
                        tarjeta.style.transform = '';
                    }, 300);
                });
            } else {
                // Para dispositivos táctiles: manejar tap con efecto temporal
                tarjeta.addEventListener('touchstart', (e) => {
                    // Agregar clase de estado activo
                    tarjeta.classList.add('touch-active');
                });

                tarjeta.addEventListener('touchend', () => {
                    // Remover clase después de un breve delay
                    setTimeout(() => {
                        tarjeta.classList.remove('touch-active');
                    }, 600);
                });

                tarjeta.addEventListener('touchcancel', () => {
                    // Remover clase si se cancela el touch
                    tarjeta.classList.remove('touch-active');
                });
            }

            // Click feedback con vibración
            tarjeta.addEventListener('click', (e) => {
                if ('vibrate' in navigator) {
                    navigator.vibrate(8);
                }
                
                // En dispositivos táctiles, prevenir que se active el hover CSS
                if (esTactil) {
                    e.preventDefault();
                }
            });

            // Accesibilidad: teclado
            tarjeta.setAttribute('tabindex', '0');
            tarjeta.setAttribute('role', 'button');
            tarjeta.setAttribute('aria-label', `Audio de hipnoterapia ${index + 1}`);

            tarjeta.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    tarjeta.click();
                }
            });
        });
    }

    /**
     * Configura formularios si existen en la página
     */
    configurarFormularios() {
        const formularios = document.querySelectorAll('form');
        
        formularios.forEach(formulario => {
            formulario.addEventListener('submit', (evento) => {
                evento.preventDefault();
                this.procesarFormulario(formulario);
            });
        });

        // Validación en tiempo real
        const inputs = document.querySelectorAll('input, textarea, select');
        inputs.forEach(input => {
            input.addEventListener('blur', (evento) => {
                this.validarCampo(evento.target);
            });
        });
    }

    /**
     * Procesa el envío de formularios
     * @param {HTMLFormElement} formulario - El formulario a procesar
     */
    async procesarFormulario(formulario) {
        const datosFormulario = new FormData(formulario);
        const datos = Object.fromEntries(datosFormulario);

        try {
            // Aquí iría la lógica de envío al servidor
            // const respuesta = await fetch('/api/inscripcion', {
            //     method: 'POST',
            //     headers: { 'Content-Type': 'application/json' },
            //     body: JSON.stringify(datos)
            // });

            // Simulación de envío exitoso
            await this.simularEnvio();
            
            this.mostrarMensaje('¡Inscripción exitosa! Te contactaremos pronto.', 'success');
            formulario.reset();
            
        } catch (error) {
            console.error('❌ Error al procesar formulario:', error);
            this.mostrarMensaje('Hubo un error. Por favor, intenta nuevamente.', 'error');
        }
    }

    /**
     * Valida un campo del formulario
     * @param {HTMLInputElement} campo - El campo a validar
     */
    validarCampo(campo) {
        const valor = campo.value.trim();
        let esValido = true;
        let mensajeError = '';

        // Validaciones según el tipo de campo
        if (campo.hasAttribute('required') && !valor) {
            esValido = false;
            mensajeError = 'Este campo es obligatorio';
        } else if (campo.type === 'email' && valor) {
            const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!regexEmail.test(valor)) {
                esValido = false;
                mensajeError = 'Email inválido';
            }
        } else if (campo.type === 'tel' && valor) {
            const regexTelefono = /^[\d\s\-\+\(\)]+$/;
            if (!regexTelefono.test(valor)) {
                esValido = false;
                mensajeError = 'Teléfono inválido';
            }
        }

        // Aplicar clases de validación
        if (esValido) {
            campo.classList.remove('is-invalid');
            campo.classList.add('is-valid');
        } else {
            campo.classList.remove('is-valid');
            campo.classList.add('is-invalid');
            
            // Mostrar mensaje de error
            const feedbackDiv = campo.nextElementSibling;
            if (feedbackDiv && feedbackDiv.classList.contains('invalid-feedback')) {
                feedbackDiv.textContent = mensajeError;
            }
        }

        return esValido;
    }

    /**
     * Muestra un mensaje al usuario
     * @param {string} mensaje - El mensaje a mostrar
     * @param {string} tipo - Tipo de mensaje: 'success', 'error', 'info', 'warning'
     */
    mostrarMensaje(mensaje, tipo = 'info') {
        // Crear elemento de alerta
        const alerta = document.createElement('div');
        alerta.className = `alert alert-${tipo === 'success' ? 'success' : tipo === 'error' ? 'danger' : 'info'} alert-dismissible fade show position-fixed`;
        alerta.style.cssText = 'top: 100px; right: 20px; z-index: 9999; min-width: 300px;';
        alerta.setAttribute('role', 'alert');
        
        alerta.innerHTML = `
            ${mensaje}
            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Cerrar"></button>
        `;
        
        document.body.appendChild(alerta);

        // Auto-eliminar después de 5 segundos
        setTimeout(() => {
            alerta.classList.remove('show');
            setTimeout(() => alerta.remove(), 300);
        }, 5000);
    }

    /**
     * Simula un envío de formulario (para demostración)
     * @returns {Promise} - Promesa que se resuelve después de 2 segundos
     */
    simularEnvio() {
        return new Promise(resolve => setTimeout(resolve, 2000));
    }

    /**
     * Configura lazy loading para imágenes
     */
    configurarLazyLoading() {
        // Verificar si el navegador soporta Intersection Observer
        if ('IntersectionObserver' in window) {
            const imagenesLazy = document.querySelectorAll('img[loading="lazy"]');
            
            const observadorImagenes = new IntersectionObserver((entradas) => {
                entradas.forEach(entrada => {
                    if (entrada.isIntersecting) {
                        const img = entrada.target;
                        img.src = img.dataset.src || img.src;
                        img.classList.add('loaded');
                        observadorImagenes.unobserve(img);
                    }
                });
            });
            imagenesLazy.forEach(img => observadorImagenes.observe(img));
        }
    }

    /**
     * Configura eventos de redimensionamiento de ventana
     */
    configurarResize() {
        window.addEventListener('resize', () => {
            clearTimeout(this.resizeTimeout);
            
            this.resizeTimeout = setTimeout(() => {
                // Recalcular altura del navbar
                this.navbarHeight = this.navbar?.offsetHeight || 0;
                
                // Reinicializar AOS si es necesario
                if (typeof AOS !== 'undefined') {
                    AOS.refresh();
                }
            }, 250);
        }, { passive: true });
    }

    /**
     * Precarga recursos críticos para mejor rendimiento
     */
    precargarRecursos() {
        // Precargar imágenes críticas
        const imagenesCriticas = [
            './assets/img/isabela-tena.jpeg',
            './assets/img/logo-Mundoholistico.png'
        ];

        imagenesCriticas.forEach(src => {
            const link = document.createElement('link');
            link.rel = 'preload';
            link.as = 'image';
            link.href = src;
            document.head.appendChild(link);
        });
    }

    /**
     * Inicializa analítica y seguimiento
     */
    inicializarAnalitica() {
        // Rastrear clics en botones de inscripción
        this.botonesInscripcion.forEach(boton => {
            boton.addEventListener('click', () => {
                this.rastrearEvento('Inscripción', 'Click', 'Botón Inscripción');
            });
        });

        // Rastrear interacciones con tarjetas
        this.tarjetasIdentificacion.forEach((tarjeta, indice) => {
            tarjeta.addEventListener('click', () => {
                this.rastrearEvento('Interacción', 'Click', `Tarjeta Identificación ${indice + 1}`);
            });
        });
    }

    /**
     * Rastrea eventos personalizados
     * @param {string} categoria - Categoría del evento
     * @param {string} accion - Acción realizada
     * @param {string} etiqueta - Etiqueta descriptiva
     */
    rastrearEvento(categoria, accion, etiqueta) {
        // Aquí se integraría con Google Analytics, Meta Pixel, etc.
        // Ejemplo con Google Analytics 4:
        // if (typeof gtag !== 'undefined') {
        //     gtag('event', accion, {
        //         'event_category': categoria,
        //         'event_label': etiqueta
        //     });
        // }
    }

    /**
     * Detecta las preferencias de accesibilidad del usuario
     */
    detectarPreferenciasAccesibilidad() {
        // Detectar preferencia de animaciones reducidas
        const prefiereSinAnimaciones = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        
        if (prefiereSinAnimaciones && typeof AOS !== 'undefined') {
            AOS.init({
                duration: 0,
                once: true
            });
        }

        // Detectar preferencia de esquema de color
        const prefiereOscuro = window.matchMedia('(prefers-color-scheme: dark)').matches;
        
        if (prefiereOscuro) {
            // Aquí se aplicarían estilos de modo oscuro si estuvieran implementados
        }
    }
}

/**
 * Utilidades generales
 */
const Utilidades = {
    /**
     * Debounce para optimizar eventos frecuentes
     * @param {Function} func - Función a ejecutar
     * @param {number} espera - Tiempo de espera en ms
     * @returns {Function} - Función debounced
     */
    debounce(func, espera = 300) {
        let timeout;
        return function ejecutar(...args) {
            const despues = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(despues, espera);
        };
    },

    /**
     * Throttle para limitar la frecuencia de ejecución
     * @param {Function} func - Función a ejecutar
     * @param {number} limite - Límite de tiempo en ms
     * @returns {Function} - Función throttled
     */
    throttle(func, limite = 300) {
        let enEspera = false;
        return function ejecutar(...args) {
            if (!enEspera) {
                func.apply(this, args);
                enEspera = true;
                setTimeout(() => {
                    enEspera = false;
                }, limite);
            }
        };
    },

    /**
     * Formatea un número como moneda
     * @param {number} cantidad - Cantidad a formatear
     * @param {string} moneda - Código de moneda (default: USD)
     * @returns {string} - Cantidad formateada
     */
    formatearMoneda(cantidad, moneda = 'USD') {
        return new Intl.NumberFormat('es-US', {
            style: 'currency',
            currency: moneda
        }).format(cantidad);
    },

    /**
     * Genera un ID único
     * @returns {string} - ID único
     */
    generarIdUnico() {
        return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    }
};

/**
 * Manejo de errores global
 */
window.addEventListener('error', (evento) => {
    console.error('❌ Error global capturado:', evento.error);
    // Aquí se podría enviar el error a un servicio de logging
});

window.addEventListener('unhandledrejection', (evento) => {
    console.error('❌ Promise rechazada sin manejar:', evento.reason);
    // Aquí se podría enviar el error a un servicio de logging
});

/**
 * Inicializar aplicación
 */
const app = new DineroFluyeApp();

/**
 * Exportar para uso en otros módulos (si se usa módulos ES6)
 */
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { DineroFluyeApp, Utilidades };
}

// Registro de service worker para PWA (opcional, preparado para futuro)
if ('serviceWorker' in navigator && location.protocol === 'https:') {
    window.addEventListener('load', () => {
        // navigator.serviceWorker.register('/sw.js')
        //     .then(registro => console.log('✅ Service Worker registrado:', registro))
        //     .catch(error => console.error('❌ Error al registrar Service Worker:', error));
    });
}

/**
 * Función para copiar link de pago al portapapeles
 * @param {string} inputId - ID del input que contiene el link
 */
function copiarLink(inputId) {
    const input = document.getElementById(inputId);
    
    if (!input) return;
    
    // Seleccionar el texto
    input.select();
    input.setSelectionRange(0, 99999); // Para móviles
    
    // Copiar al portapapeles (método moderno)
    if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(input.value)
            .then(() => {
                // Cambiar temporalmente el botón para mostrar feedback
                const boton = event.target.closest('button');
                const textoOriginal = boton.innerHTML;
                boton.innerHTML = '<i class="fas fa-check"></i> Copiado';
                boton.classList.add('btn-success');
                
                setTimeout(() => {
                    boton.innerHTML = textoOriginal;
                    boton.classList.remove('btn-success');
                }, 2000);
            })
            .catch(() => {
                // Fallback para navegadores antiguos
                document.execCommand('copy');
                alert('Link copiado al portapapeles');
            });
    } else {
        // Fallback para navegadores muy antiguos
        document.execCommand('copy');
        alert('Link copiado al portapapeles');
    }
}

