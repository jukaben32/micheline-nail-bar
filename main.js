document.addEventListener('DOMContentLoaded', () => {

  // --- CURRENT YEAR ---
  const yearEl = document.getElementById('currentYear');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // --- CUSTOM CURSOR ---
  const cursor = document.getElementById('cursor');
  const cursorRing = document.getElementById('cursorRing');
  
  if (window.matchMedia("(pointer: fine)").matches) {
    let mouseX = 0, mouseY = 0;
    let ringX = 0, ringY = 0;

    window.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      
      cursor.style.left = `${mouseX}px`;
      cursor.style.top = `${mouseY}px`;
    });

    const render = () => {
      ringX += (mouseX - ringX) * 0.15;
      ringY += (mouseY - ringY) * 0.15;
      
      cursorRing.style.left = `${ringX}px`;
      cursorRing.style.top = `${ringY}px`;
      
      requestAnimationFrame(render);
    };
    requestAnimationFrame(render);

    const interactiveElements = document.querySelectorAll('a, button, input, select, textarea, .team-card');
    interactiveElements.forEach(el => {
      el.addEventListener('mouseenter', () => {
        cursor.classList.add('hovered');
        cursorRing.classList.add('hovered');
      });
      el.addEventListener('mouseleave', () => {
        cursor.classList.remove('hovered');
        cursorRing.classList.remove('hovered');
      });
    });
  }

  // --- NAVBAR SCROLL ---
  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  }, { passive: true });

  // --- SMOOTH SCROLL FOR INTEXT LINKS ---
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      if (href === '#') return;
      
      e.preventDefault();
      const target = document.querySelector(href);
      if (target) {
        const offset = 80;
        const bodyRect = document.body.getBoundingClientRect().top;
        const elementRect = target.getBoundingClientRect().top;
        const elementPosition = elementRect - bodyRect;
        const offsetPosition = elementPosition - offset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    });
  });

  // --- CHAT WIDGET (WhatsApp) ---
  const chatFab = document.getElementById('chatFab');
  const chatWindow = document.getElementById('chatWindow');
  const chatBadge = document.getElementById('chatBadge');
  const chatMessages = document.getElementById('chatMessages');
  const chatInput = document.getElementById('chatInput');
  const chatSend = document.getElementById('chatSend');
  const chatQuickBtns = document.querySelectorAll('.chat-quick-btn');
  let isChatOpen = false;

  const toggleChat = () => {
    isChatOpen = !isChatOpen;
    if (isChatOpen) {
      chatFab.classList.add('open');
      chatWindow.classList.add('open');
      if (chatBadge) chatBadge.style.display = 'none';
      setTimeout(() => chatInput.focus(), 300);
    } else {
      chatFab.classList.remove('open');
      chatWindow.classList.remove('open');
    }
  };

  chatFab.addEventListener('click', toggleChat);

  const sendMessageToWA = (text) => {
    if (!text.trim()) return;
    const phone = "18096277471";
    const encoded = encodeURIComponent(text.trim());
    window.open(`https://wa.me/${phone}?text=${encoded}`, '_blank');
    chatInput.value = '';
    toggleChat();
  };

  chatSend.addEventListener('click', () => sendMessageToWA(chatInput.value));
  chatInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessageToWA(chatInput.value);
    }
  });

  chatQuickBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const msg = btn.getAttribute('data-msg');
      sendMessageToWA(msg);
    });
  });


  // --- DYNAMIC TEAM RENDERING ---
  const teamData = [
    { id: '1', name: 'Alba', role: 'Especialista en Acrílico', initials: 'A', tags: ['Acrílicos', 'Diseño 3D', 'Manicure Ruso'], gradient: 'linear-gradient(135deg, #1a1408, #2a1f0a)' },
    { id: '2', name: 'Laura', role: 'Diseño Avanzado', initials: 'L', tags: ['Soft Gel', 'Nail Art', 'Pedi Spa'], gradient: 'linear-gradient(135deg, #0d121a, #1a2233)' },
    { id: '3', name: 'Cristina', role: 'Master en Pelo', initials: 'C', tags: ['Colorimetría', 'Corte', 'Peinados'], gradient: 'linear-gradient(135deg, #1a0f12, #331f24)' },
    { id: '4', name: 'Carmen', role: 'Depilación & Spa', initials: 'CA', tags: ['Cera', 'Faciales', 'Cejas'], gradient: 'linear-gradient(135deg, #0f1a14, #1f3328)' },
    { id: '5', name: 'María', role: 'Estilista', initials: 'M', tags: ['Secado', 'Rizos', 'Lavado Spa'], gradient: 'linear-gradient(135deg, #181a0e, #2f331c)' }
  ];

  const teamGrid = document.getElementById('teamGrid');
  let selectedSpecialist = null;

  if (teamGrid) {
    teamData.forEach(member => {
      const article = document.createElement('article');
      article.className = 'team-card reveal';
      article.innerHTML = `
        <div class="team-photo-wrap" style="background: ${member.gradient}">
          <div class="team-photo-initials">${member.initials}</div>
        </div>
        <h3 class="team-name">${member.name}</h3>
        <p class="team-role">${member.role}</p>
        <div class="team-tags">
          ${member.tags.map(tag => `<span class="team-tag">${tag}</span>`).join('')}
        </div>
        <button class="team-book-btn" data-id="${member.id}">Agendar con ${member.name}</button>
      `;
      teamGrid.appendChild(article);
    });

    const notesField = document.getElementById('notes');
    teamGrid.addEventListener('click', (e) => {
      const btn = e.target.closest('.team-book-btn');
      if (btn) {
        // Remover selección previa
        document.querySelectorAll('.team-card').forEach(c => c.classList.remove('selected'));
        const card = btn.closest('.team-card');
        card.classList.add('selected');
        
        const memberId = btn.getAttribute('data-id');
        selectedSpecialist = teamData.find(m => m.id === memberId);
        
        if (notesField && selectedSpecialist) {
          notesField.value = `¡Hola! Me gustaría atenderme con ${selectedSpecialist.name}.`;
        }

        // Scroll to booking
        document.querySelector('#booking').scrollIntoView({ behavior: 'smooth' });
      }
    });
  }

  // --- BOOKING FORM INTEGRATION WITH N8N ---
  const bookingForm = document.getElementById('appointmentForm');
  const N8N_WEBHOOK_URL = 'https://n8nsophia.duckdns.org/webhook/micheline-booking';
  
  if (bookingForm) {
    bookingForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const formData = new FormData(bookingForm);
      const data = Object.fromEntries(formData.entries());
      
      // Botón de envío para feedback
      const submitBtn = bookingForm.querySelector('button[type="submit"]');
      const originalText = submitBtn.textContent;
      submitBtn.textContent = 'Enviando...';
      submitBtn.disabled = true;
      
      try {
        // Enviar datos a n8n webhook (no bloquea si falla)
        const n8nData = {
          type: 'booking',
          source: 'landing-page-widget',
          timestamp: new Date().toISOString(),
          name: data.name,
          phone: data.phone,
          branch: data.branch,
          service: data.service,
          date: data.date,
          time: data.time,
          notes: data.notes || '',
          specialist: selectedSpecialist ? selectedSpecialist.name : 'Sin preferencia'
        };
        
        // Enviar a n8n en background (no espera respuesta)
        fetch(N8N_WEBHOOK_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(n8nData)
        }).catch(err => console.log('N8n webhook enviado (background)'));
        
        // Ir a WhatsApp después de 500ms
        setTimeout(() => {
          let phoneBranch = '18098979609';
          let message = `¡Hola Micheline!\n\nMe gustaría reservar una cita. Aquí mis datos:\n`;
          message += `*Nombre:* ${data.name}\n`;
          message += `*Teléfono:* ${data.phone}\n`;
          message += `*Sucursal:* ${data.branch}\n`;
          message += `*Servicio Principal:* ${data.service}\n`;
          message += `*Fecha y Hora:* ${data.date} a las ${data.time}\n`;
          if (data.notes) message += `*Notas:* ${data.notes}\n`;
          
          const encodedMsg = encodeURIComponent(message);
          window.open(`https://wa.me/${phoneBranch}?text=${encodedMsg}`, '_blank');
          
          bookingForm.reset();
          document.querySelectorAll('.team-card').forEach(c => c.classList.remove('selected'));
          submitBtn.textContent = originalText;
          submitBtn.disabled = false;
        }, 500);
        
      } catch (error) {
        console.error('Error:', error);
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
      }
    });
  }

  // --- NEWSLETTER INTEGRATION WITH N8N ---
  const newsletterForm = document.getElementById('newsletterForm');
  const N8N_NEWSLETTER_WEBHOOK = 'https://n8nsophia.duckdns.org/webhook/micheline-newsletter';
  
  if (newsletterForm) {
    newsletterForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const emailInput = newsletterForm.querySelector('input[type="email"]');
      const email = emailInput.value;
      const btn = newsletterForm.querySelector('button');
      const originalText = btn.textContent;
      
      try {
        // Enviar a n8n webhook
        const newsletterData = {
          type: 'newsletter_subscription',
          source: 'landing-page-widget',
          timestamp: new Date().toISOString(),
          email: email
        };
        
        // Enviar en background
        fetch(N8N_NEWSLETTER_WEBHOOK, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(newsletterData)
        }).catch(err => console.log('Newsletter webhook enviado'));
        
        // Feedback visual
        btn.textContent = '✓ ¡Suscrita!';
        btn.style.background = '#25D366';
        btn.style.color = 'white';
        
        setTimeout(() => {
          btn.textContent = originalText;
          btn.style.background = '';
          btn.style.color = '';
          newsletterForm.reset();
        }, 3000);
        
      } catch (error) {
        console.error('Error:', error);
        btn.textContent = 'Error - Intenta de nuevo';
        setTimeout(() => {
          btn.textContent = originalText;
        }, 3000);
      }
    });
  }

  // --- SOCIAL TRACKING WITH N8N ---
  const N8N_SOCIAL_WEBHOOK = 'https://n8nsophia.duckdns.org/webhook/micheline-social-click';
  
  document.querySelectorAll('.footer-socials a, .social-card').forEach(link => {
    link.addEventListener('click', (e) => {
      const platform = link.getAttribute('aria-label') || link.textContent;
      const trackingData = {
        type: 'social_click',
        source: 'landing-page-widget',
        timestamp: new Date().toISOString(),
        platform: platform,
        url: link.href
      };
      
      // Enviar a n8n en background (no bloquea)
      fetch(N8N_SOCIAL_WEBHOOK, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(trackingData)
      }).catch(err => console.log(`Social click tracked: ${platform}`));
    });
  });

  // --- SCROLL REVEAL (INTERSECTION OBSERVER) ---
  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.15
  };

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  document.querySelectorAll('.reveal').forEach(el => {
    observer.observe(el);
  });

});
