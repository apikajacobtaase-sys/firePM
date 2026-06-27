
      const loader = document.getElementById('loader');
      window.addEventListener('load', () => {
        setTimeout(() => loader.classList.add('hidden'), 700);
      });

      const menuBtn = document.getElementById('menuBtn');
      const navLinks = document.getElementById('navLinks');
      menuBtn?.addEventListener('click', () => navLinks.classList.toggle('open'));
      navLinks?.querySelectorAll('a').forEach(link => link.addEventListener('click', () => navLinks.classList.remove('open')));

      const revealItems = document.querySelectorAll('.reveal');
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) entry.target.classList.add('visible');
        });
      }, { threshold: 0.14 });
      revealItems.forEach(item => observer.observe(item));

      const counters = document.querySelectorAll('[data-count]');
      counters.forEach(counter => {
        const target = +counter.getAttribute('data-count');
        let start = 0;
        const step = Math.ceil(target / 58);
        const tick = () => {
          start += step;
          if (start > target) start = target;
          counter.textContent = start.toString();
          if (start < target) requestAnimationFrame(tick);
        };
        observer.observe(counter);
        const countObserver = new IntersectionObserver((entries) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) { tick(); countObserver.disconnect(); }
          });
        }, { threshold: 0.6 });
        countObserver.observe(counter);
      });

      const countdownDate = new Date('2026-09-20T19:00:00').getTime();
      const updateCountdown = () => {
        const now = new Date().getTime();
        const remaining = countdownDate - now;
        if (remaining <= 0) {
          document.getElementById('days').textContent = '00';
          document.getElementById('hours').textContent = '00';
          document.getElementById('minutes').textContent = '00';
          document.getElementById('seconds').textContent = '00';
          return;
        }
        const days = Math.floor(remaining / (1000 * 60 * 60 * 24));
        const hours = Math.floor((remaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((remaining % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((remaining % (1000 * 60)) / 1000);
        document.getElementById('days').textContent = days.toString().padStart(2, '0');
        document.getElementById('hours').textContent = hours.toString().padStart(2, '0');
        document.getElementById('minutes').textContent = minutes.toString().padStart(2, '0');
        document.getElementById('seconds').textContent = seconds.toString().padStart(2, '0');
      };
      updateCountdown();
      setInterval(updateCountdown, 1000);

      document.querySelectorAll('.faq-item').forEach(item => {
        item.addEventListener('click', () => {
          document.querySelectorAll('.faq-item').forEach(x => x.classList.remove('active'));
          item.classList.add('active');
        });
      });

      const cursor = document.getElementById('cursor');
      window.addEventListener('mousemove', e => {
        cursor.style.left = `${e.clientX}px`;
        cursor.style.top = `${e.clientY}px`;
      });
      document.querySelectorAll('a, button, input, textarea, .magnetic').forEach(el => {
        el.addEventListener('mouseenter', () => cursor.classList.add('active'));
        el.addEventListener('mouseleave', () => cursor.classList.remove('active'));
      });

      document.querySelectorAll('.magnetic').forEach(btn => {
        btn.addEventListener('mousemove', (e) => {
          const rect = btn.getBoundingClientRect();
          const x = e.clientX - rect.left;
          const y = e.clientY - rect.top;
          btn.style.transform = `translate(${(x - rect.width / 2) / 12}px, ${(y - rect.height / 2) / 12}px)`;
        });
        btn.addEventListener('mouseleave', () => { btn.style.transform = ''; });
      });

      document.addEventListener('click', (e) => {
        const ripple = document.createElement('span');
        ripple.className = 'ripple';
        ripple.style.left = `${e.clientX}px`;
        ripple.style.top = `${e.clientY}px`;
        document.body.appendChild(ripple);
        setTimeout(() => ripple.remove(), 700);
      });

      const style = document.createElement('style');
      style.textContent = `
        .ripple { position: fixed; width: 12px; height: 12px; border-radius: 50%; pointer-events: none; background: rgba(255,255,255,0.24); transform: translate(-50%, -50%); animation: ripple 0.7s ease-out forwards; z-index: 9998; }
        @keyframes ripple { from { transform: translate(-50%, -50%) scale(1); opacity: 0.9; } to { transform: translate(-50%, -50%) scale(16); opacity: 0; } }
      `;
      document.head.appendChild(style);