document.addEventListener('DOMContentLoaded', function () {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('nav ul li a');

    // Función para manejar el cambio de sección y estilo activo
    function changeSection(event) {
        event.preventDefault(); // Prevenir el comportamiento por defecto del enlace

        // Obtener el id de la sección a mostrar
        const targetId = event.target.getAttribute('href').substring(1);
        const targetSection = document.getElementById(targetId);

        // Eliminar la clase 'active' de todas las secciones
        sections.forEach(section => section.classList.remove('active'));

        // Mostrar la sección seleccionada
        targetSection.classList.add('active');

        // Cambiar el estilo del enlace activo
        navLinks.forEach(link => link.classList.remove('active'));
        event.target.classList.add('active');

        // Hacer scroll hacia la sección seleccionada
        targetSection.scrollIntoView({ behavior: 'smooth' });
    }

    // Agregar el evento de click para cada enlace
    navLinks.forEach(link => {
        link.addEventListener('click', changeSection);
    });

    // Activar la primera sección y enlace al cargar la página
    if (sections.length > 0) {
        sections[0].classList.add('active');
        navLinks[0].classList.add('active');
    }

    // Función para sincronizar el scroll con las secciones
    window.addEventListener('scroll', function () {
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            const scrollPosition = window.scrollY;

            // Si la posición del scroll está dentro de la sección, activamos esa sección
            if (scrollPosition >= sectionTop - 100 && scrollPosition < sectionTop + sectionHeight - 100) {
                section.classList.add('active');
                navLinks.forEach(link => link.classList.remove('active'));
                const activeLink = document.querySelector(`nav a[href="#${section.id}"]`);
                if (activeLink) activeLink.classList.add('active');
            } else {
                section.classList.remove('active');
            }
        });
    });

    // Efecto de rastro de chispas
    document.addEventListener('mousemove', function (event) {
        // Crear una nueva partícula
        const sparkle = document.createElement('div');
        sparkle.classList.add('sparkle');

        // Obtener el tamaño de la ventana
        const windowWidth = window.innerWidth;
        const windowHeight = window.innerHeight;

        // Posicionar la partícula en la ubicación del cursor
        const xPos = event.pageX;
        const yPos = event.pageY;

        // Limitar las posiciones para que no se desborden
        if (xPos < windowWidth - 10 && yPos < windowHeight - 10) {
            sparkle.style.left = `${xPos - 5}px`;  // Ajustar para centrar la partícula
            sparkle.style.top = `${yPos - 5}px`;  // Ajustar para centrar la partícula
            document.body.appendChild(sparkle);

            // Eliminar la partícula después de que termine la animación
            setTimeout(() => {
                sparkle.remove();
            }, 1000); // Tiempo de duración de la animación (coincide con la duración de la animación CSS)
        }
    });
});
