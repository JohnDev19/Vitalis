document.addEventListener("DOMContentLoaded", () => {
  const mobileMenu = document.getElementById("mobile-menu")
  const navMenu = document.querySelector(".nav-menu")
  const body = document.body

  const menuOverlay = document.createElement("div")
  menuOverlay.className = "menu-overlay"
  document.body.appendChild(menuOverlay)

  if (mobileMenu) {
    mobileMenu.addEventListener("click", () => {
      navMenu.classList.toggle("active")
      mobileMenu.classList.toggle("active")
      menuOverlay.classList.toggle("active")
      body.classList.toggle("menu-open")

      if (mobileMenu.classList.contains("active")) {
        mobileMenu.innerHTML = '<i class="bi bi-x-lg"></i>'
      } else {
        mobileMenu.innerHTML = '<i class="bi bi-list"></i>'
      }
    })
  }

  menuOverlay.addEventListener("click", () => {
    navMenu.classList.remove("active")
    mobileMenu.classList.remove("active")
    menuOverlay.classList.remove("active")
    body.classList.remove("menu-open")
    mobileMenu.innerHTML = '<i class="bi bi-list"></i>'
  })

  const navItems = document.querySelectorAll(".nav-item a")
  navItems.forEach((item) => {
    item.addEventListener("click", () => {
      navMenu.classList.remove("active")
      mobileMenu.classList.remove("active")
      menuOverlay.classList.remove("active")
      body.classList.remove("menu-open")
      mobileMenu.innerHTML = '<i class="bi bi-list"></i>'
    })
  })

  const testimonialSlider = document.getElementById("testimonialSlider")
  if (testimonialSlider) {
    const slides = testimonialSlider.querySelectorAll(".testimonial-slide")
    const dots = document.querySelectorAll(".dot")
    const prevBtn = document.getElementById("testimonialPrev")
    const nextBtn = document.getElementById("testimonialNext")

    let currentSlide = 0
    const totalSlides = slides.length

    function showSlide(index) {
      slides.forEach((slide) => {
        slide.classList.remove("active")
      })

      dots.forEach((dot) => {
        dot.classList.remove("active")
      })

      slides[index].classList.add("active")
      dots[index].classList.add("active")

      currentSlide = index
    }

    if (nextBtn) {
      nextBtn.addEventListener("click", () => {
        currentSlide = (currentSlide + 1) % totalSlides
        showSlide(currentSlide)
      })
    }

    if (prevBtn) {
      prevBtn.addEventListener("click", () => {
        currentSlide = (currentSlide - 1 + totalSlides) % totalSlides
        showSlide(currentSlide)
      })
    }

    dots.forEach((dot, index) => {
      dot.addEventListener("click", () => {
        showSlide(index)
      })
    })

    let slideInterval = setInterval(() => {
      currentSlide = (currentSlide + 1) % totalSlides
      showSlide(currentSlide)
    }, 5000)

    testimonialSlider.addEventListener("mouseenter", () => {
      clearInterval(slideInterval)
    })

    testimonialSlider.addEventListener("mouseleave", () => {
      slideInterval = setInterval(() => {
        currentSlide = (currentSlide + 1) % totalSlides
        showSlide(currentSlide)
      }, 5000)
    })
  }

  // Back to to button
  const backToTopBtn = document.getElementById("backToTop")

  if (backToTopBtn) {
    window.addEventListener("scroll", () => {
      if (window.pageYOffset > 300) {
        backToTopBtn.classList.add("active")
      } else {
        backToTopBtn.classList.remove("active")
      }
    })

    backToTopBtn.addEventListener("click", (e) => {
      e.preventDefault()
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      })
    })
  }

  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      if (this.getAttribute("href") !== "#") {
        e.preventDefault()

        const targetId = this.getAttribute("href")
        const targetElement = document.querySelector(targetId)

        if (targetElement) {
          window.scrollTo({
            top: targetElement.offsetTop - 80,
            behavior: "smooth",
          })
        }
      }
    })
  })

  const appointmentForm = document.getElementById("appointmentForm")
  const contactForm = document.getElementById("contactForm")
  const newsletterForm = document.getElementById("newsletterForm")

  function validateForm(form) {
    let isValid = true
    const inputs = form.querySelectorAll("input, textarea, select")

    inputs.forEach((input) => {
      if (input.hasAttribute("required") && !input.value.trim()) {
        isValid = false
        input.classList.add("error")
      } else {
        input.classList.remove("error")
      }

      if (input.type === "email" && input.value.trim()) {
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        if (!emailPattern.test(input.value.trim())) {
          isValid = false
          input.classList.add("error")
        }
      }
    })

    return isValid
  }

  if (appointmentForm) {
    appointmentForm.addEventListener("submit", (e) => {
      e.preventDefault()

      if (validateForm(appointmentForm)) {
        alert("Appointment booked successfully! We will contact you shortly.")
        appointmentForm.reset()
      } else {
        alert("Please fill in all required fields correctly.")
      }
    })
  }

  if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault()

      if (validateForm(contactForm)) {
        alert("Message sent successfully! We will get back to you soon.")
        contactForm.reset()
      } else {
        alert("Please fill in all required fields correctly.")
      }
    })
  }

  if (newsletterForm) {
    newsletterForm.addEventListener("submit", (e) => {
      e.preventDefault()

      if (validateForm(newsletterForm)) {
        alert("Thank you for subscribing to our newsletter!")
        newsletterForm.reset()
      } else {
        alert("Please enter a valid email address.")
      }
    })
  }

  const statNumbers = document.querySelectorAll(".stat-number")

  function animateCounter(element) {
    const target = Number.parseInt(element.getAttribute("data-count"), 10)
    const duration = 2000 // 2 seconds
    const step = target / (duration / 16) // 60fps
    let current = 0

    element.textContent = "0"

    const timer = setInterval(() => {
      current += step
      if (current >= target) {
        clearInterval(timer)
        element.textContent = target.toLocaleString()
      } else {
        element.textContent = Math.floor(current).toLocaleString()
      }
    }, 16)
  }

if (statNumbers.length > 0) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              animateCounter(entry.target)
            }, 300)
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.2 },
    )

    statNumbers.forEach((stat) => {
      stat.textContent = "0"
      observer.observe(stat)
    })
  }

  document.querySelectorAll(".btn, .feature-card, .service-card, .doctor-card").forEach((element) => {
    element.addEventListener("mouseenter", function () {
      this.style.transition = "all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)"
    })

    element.addEventListener("mouseleave", function () {
      this.style.transition = "all 0.3s ease"
    })
  })

  const hero = document.querySelector(".hero")
  if (hero) {
    window.addEventListener("scroll", () => {
      const scrollPosition = window.scrollY
      if (scrollPosition < 600) {
        const translateY = scrollPosition * 0.2
        hero.style.backgroundPositionY = `-${translateY}px`
      }
    })
  }

  const sections = document.querySelectorAll("section[id]")

  function highlightNavLink() {
    const scrollPosition = window.scrollY + 100

    sections.forEach((section) => {
      const sectionTop = section.offsetTop
      const sectionHeight = section.offsetHeight
      const sectionId = section.getAttribute("id")
      const navLink = document.querySelector(`.nav-item a[href="#${sectionId}"]`)

      if (navLink && scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        document.querySelectorAll(".nav-item a").forEach((link) => {
          link.classList.remove("active")
        })
        navLink.classList.add("active")
      }
    })
  }

  window.addEventListener("scroll", highlightNavLink)

  highlightNavLink()
})
