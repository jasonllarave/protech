// Activamos el plugin ScrollTrigger
gsap.registerPlugin(ScrollTrigger);
gsap.registerPlugin(TextPlugin);


// Animación para la sección HERO
gsap.from(".panel-hero .content", {
  opacity: 0,
  y: 50,
  duration: 1,
  ease: "power2.out",
  scrollTrigger: {
    trigger: ".panel-hero",
    start: "top center",
    toggleActions: "play none none none"
  }
});

// Animación para la sección SERVICIOS
gsap.from(".panel-services .content", {
  opacity: 0,
  x: -100,
  duration: 1,
  ease: "power2.out",
  scrollTrigger: {
    trigger: ".panel-services",
    start: "top center",
    toggleActions: "play none none none"
  }
});

// Animación para la sección CONTACTO
gsap.from(".panel-contact .content", {
  opacity: 0,
  y: 100,
  duration: 1,
  ease: "power2.out",
  scrollTrigger: {
    trigger: ".panel-contact",
    start: "top center",
    toggleActions: "play none none none"
  }
});

// Función para mover el indicador
function moveIndicatorTo(targetItem) {
  const itemRect = targetItem.getBoundingClientRect();
  const parentRect = targetItem.parentElement.getBoundingClientRect();
  const indicator = document.querySelector(".indicator");
  indicator.style.left = `${itemRect.left - parentRect.left}px`;
  indicator.style.width = `${itemRect.width}px`;
}

// Detectar sección visible al cargar
function getVisibleSection() {
  const sections = ["hero", "services", "contact"];
  for (let i = 0; i < sections.length; i++) {
    const section = document.getElementById(sections[i]);
    const rect = section.getBoundingClientRect();
    if (rect.top <= window.innerHeight / 2 && rect.bottom >= window.innerHeight / 2) {
      return i;
    }
  }
  return 0; // Por defecto, hero
}

// Esperar a que todo cargue
window.addEventListener("load", () => {
  const navItems = document.querySelectorAll(".nav-item");
  const indicator = document.querySelector(".indicator");

  // Posicionar el indicador según la sección visible
  const visibleIndex = getVisibleSection();
  document.querySelector(".nav-item.active").classList.remove("active");
  navItems[visibleIndex].classList.add("active");
  moveIndicatorTo(navItems[visibleIndex]);

  // ScrollTrigger para sincronizar con scroll
  ["hero", "services", "contact"].forEach((id, index) => {
  ScrollTrigger.create({
    trigger: `#${id}`,
    start: "top 60%",
    onEnter: () => {
      document.querySelector(".nav-item.active").classList.remove("active");
      navItems[index].classList.add("active");
      moveIndicatorTo(navItems[index]);
    },
    onEnterBack: () => {
      document.querySelector(".nav-item.active").classList.remove("active");
      navItems[index].classList.add("active");
      moveIndicatorTo(navItems[index]);
    }
  });
});


  // Interceptar clics en el navbar
  navItems.forEach((item, index) => {
    const link = item.querySelector("a");
    link.addEventListener("click", () => {
      setTimeout(() => {
        document.querySelector(".nav-item.active").classList.remove("active");
        item.classList.add("active");
        moveIndicatorTo(item);
      }, 300); // Espera a que el scroll se complete
    });
  });
});




// servicios animacion



// Entrada desde los lados + flotación

// Ocultar elementos al inicio
gsap.set(".service-block, .floating-center", {
  scale: 0,
  opacity: 0,
  x: 0,
  y: 0,
  rotationY: 180,
  transformOrigin: "center center"
});

const lottieContainer = document.getElementById("loading-lottie");

const animation = lottie.loadAnimation({
  container: lottieContainer,
  renderer: "svg",
  loop: true,
  autoplay: true,
  path: "assets/animations/robot.json"
});

// Función que crea la animación completa
function playServiceAnimation() {
  // Resetear estilos
  gsap.set("#loading-lottie", {
    display: "block",
    opacity: 1,
    scale: 1
  });

  gsap.set(".service-block, .floating-center", {
    scale: 0,
    opacity: 0,
    x: 0,
    y: 0,
    rotationY: 360,
    transformOrigin: "center center"
  });

  const tl = gsap.timeline();

  // Paso 1: ocultar robot
  tl.to("#loading-lottie", {
    duration: 2.5,
    opacity: 0,
    scale: 0.8,
    ease: "power2.inOut",
    onComplete: () => {
      lottieContainer.style.display = "none";
    }
  });

  // Paso 2: bloques salen como de una caja (mantiene tu efecto original)
  tl.to(".service-block, .floating-center", {
    scale: 1.1,
    opacity: 1,
    rotationY: 0,
    x: (i) => {
      const angle = (i / 6) * Math.PI * 2;
      return Math.cos(angle) * 150;
    },
    y: (i) => {
      const angle = (i / 4) * Math.PI * 2;
      return Math.sin(angle) * 150;
    },
    duration: 1.2,
    ease: "power4.out",
    stagger: {
      each: 0.1,
      from: "center"
    }
  }, ">");

  // Paso 3: regresan a posición final
  tl.to(".service-block", {
    x: 0,
    y: 0,
    duration: 1,
    ease: "power2.inOut"
  }, ">");

  tl.to(".floating-center", {
    x: 0,
    y: 0,
    duration: 1,
    ease: "power2.inOut"
  }, "<");

  // Paso 4: efecto de escritura
  tl.to(".typewriter", {
    text: "Soluciones que se adaptan a ti",
    duration: 2.5,
    ease: "none"
  });

  // ✅ NUEVO: Efecto colgante suave según scroll (se activa después de animación)
  tl.call(() => {
    gsap.utils.toArray(".service-block, .floating-center").forEach((el) => {
      ScrollTrigger.create({
        trigger: "#services",
        start: "top bottom",
        end: "bottom top",
        scrub: true,
        onUpdate: (self) => {
          const velocity = self.getVelocity();
          const sway = Math.max(Math.min(velocity / 100, 10), -10);
          gsap.to(el, {
            rotationZ: sway * 0.4,
            x: sway * 0.5,
            duration: 0.6,
            ease: "power2.out"
          });
        }
      });
    });
  });
}

// Activar animación al entrar desde arriba o desde abajo
ScrollTrigger.create({
  trigger: "#services",
  start: "top center",
  onEnter: playServiceAnimation,
  onEnterBack: playServiceAnimation
});


//mapa

gsap.from(".ubicacion-section .section-title", {
  scrollTrigger: {
    trigger: "#ubicacion",
    start: "top 80%",
    toggleActions: "play none none reverse"
  },
  y: 50,
  opacity: 0,
  duration: 1,
  ease: "power2.out"
});

gsap.from(".map-container", {
  scrollTrigger: {
    trigger: "#ubicacion",
    start: "top 80%",
    toggleActions: "play none none reverse"
  },
  y: 100,
  opacity: 0,
  duration: 1.2,
  ease: "power2.out",
  delay: 0.2
});

ScrollTrigger.create({
  trigger: "#ubicacion",
  start: "top center",
  onEnter: () => {
    document.body.style.backgroundImage = "url('assets/bg-mapa.jpg')"; //para poner imagenes de fondo
  },
  onLeaveBack: () => {
    document.body.style.backgroundImage = "url('assets/bg-contacto.jpg')";
  }
});


//animacion instagram

gsap.from(".instagram-section .section-title", {
  scrollTrigger: {
    trigger: "#instagram",
    start: "top 80%",
    toggleActions: "play none none reverse"
  },
  y: 50,
  opacity: 0,
  duration: 1,
  ease: "power2.out"
});

gsap.from(".elfsight-app-50125a77-9471-4237-81c2-b994c236e98a", {
  scrollTrigger: {
    trigger: "#instagram",
    start: "top 80%",
    toggleActions: "play none none reverse"
  },
  y: 100,
  opacity: 0,
  duration: 1.2,
  ease: "power2.out",
  delay: 0.2
});

ScrollTrigger.create({
  trigger: "#instagram",
  start: "top center",
  onEnter: () => {
    document.body.style.backgroundImage = "url('assets/bg-instagram.jpg')"; //para poner imagenes de fondo
  },
  onLeaveBack: () => {
    document.body.style.backgroundImage = "url('assets/bg-contacto.jpg')";
  }
});

// parte izquierda instagram

gsap.to(".instagram-info-box", {
  scrollTrigger: {
    trigger: "#instagram",
    start: "top 80%",
    toggleActions: "play none none reverse"
  },
  opacity: 1,
  x: 0,
  duration: 1,
  ease: "power2.out"
});
// Animación botones agua
function animarMedidor(medidor) {
  const agua = medidor.querySelector(".agua");
  const porcentaje = medidor.querySelector(".porcentaje");

  function iniciarAnimacion() {
    // Reset visual
    agua.style.height = "0%";
    porcentaje.textContent = "0%";

    // Animar agua
    gsap.to(agua, {
      height: "100%",
      duration: 2,
      ease: "power2.out"
    });

    // Animar número
    let contador = { valor: 0 };
    gsap.to(contador, {
      valor: 100,
      duration: 2,
      ease: "power2.out",
      onUpdate: () => {
        porcentaje.textContent = Math.round(contador.valor) + "%";
      }
    });
  }

  ScrollTrigger.create({
    trigger: medidor,
    start: "top 80%",
    onEnter: iniciarAnimacion,
    onEnterBack: iniciarAnimacion,
    onLeave: () => {
      agua.style.height = "0%";
      porcentaje.textContent = "0%";
    },
    onLeaveBack: () => {
      agua.style.height = "0%";
      porcentaje.textContent = "0%";
    }
  });
}

// Activar para todos los medidores
document.querySelectorAll(".valor-medidor").forEach(animarMedidor);

//sorteo

gsap.registerPlugin(ScrollTrigger);

function animarSorteo() {
  // Título
  ScrollTrigger.create({
    trigger: "#sorteo",
    start: "top 80%",
    onEnter: () => {
      gsap.fromTo(".sorteo-title", 
        { y: 50, opacity: 0 }, 
        { y: 0, opacity: 1, duration: 1, ease: "power2.out" }
      );
    },
    onEnterBack: () => {
      gsap.fromTo(".sorteo-title", 
        { y: 50, opacity: 0 }, 
        { y: 0, opacity: 1, duration: 1, ease: "power2.out" }
      );
    }
  });

  // Descripción
  ScrollTrigger.create({
    trigger: "#sorteo",
    start: "top 80%",
    onEnter: () => {
      gsap.fromTo(".sorteo-description", 
        { y: 50, opacity: 0 }, 
        { y: 0, opacity: 1, duration: 1, delay: 0.2, ease: "power2.out" }
      );
    },
    onEnterBack: () => {
      gsap.fromTo(".sorteo-description", 
        { y: 50, opacity: 0 }, 
        { y: 0, opacity: 1, duration: 1, delay: 0.2, ease: "power2.out" }
      );
    }
  });

  // Botón
  ScrollTrigger.create({
    trigger: "#sorteo",
    start: "top 80%",
    onEnter: () => {
      gsap.fromTo(".sorteo-button", 
        { scale: 0.8, opacity: 0 }, 
        { scale: 1, opacity: 1, duration: 0.8, delay: 0.4, ease: "back.out(1.7)" }
      );
    },
    onEnterBack: () => {
      gsap.fromTo(".sorteo-button", 
        { scale: 0.8, opacity: 0 }, 
        { scale: 1, opacity: 1, duration: 0.8, delay: 0.4, ease: "back.out(1.7)" }
      );
    }
  });

  // Imagen
  ScrollTrigger.create({
    trigger: "#sorteo",
    start: "top 80%",
    onEnter: () => {
      gsap.fromTo(".sorteo-imagen img", 
        { x: 100, opacity: 0 }, 
        { x: 0, opacity: 1, duration: 1, ease: "power2.out" }
      );
    },
    onEnterBack: () => {
      gsap.fromTo(".sorteo-imagen img", 
        { x: 100, opacity: 0 }, 
        { x: 0, opacity: 1, duration: 1, ease: "power2.out" }
      );
    }
  });
}

animarSorteo();

