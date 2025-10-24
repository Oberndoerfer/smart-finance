// script.js - kleines Verhalten: Jahr anzeigen, mobile Menü, Formular-Feedback
document.addEventListener('DOMContentLoaded', function(){
  // Jahr im Footer
  document.getElementById('year').textContent = new Date().getFullYear();

  // Mobile nav toggle
  const navToggle = document.getElementById('nav-toggle');
  const nav = document.getElementById('main-nav');
  navToggle && navToggle.addEventListener('click', function(){
    nav.classList.toggle('open');
    const open = nav.classList.contains('open');
    navToggle.setAttribute('aria-expanded', open ? 'true' : 'false');
  });

  // Formular: client-side minimal validation + Formspree feedback
  const form = document.getElementById('contact-form');
  if(form){
    form.addEventListener('submit', async function(e){
      e.preventDefault();
      const statusEl = form.querySelector('.form-status');
      statusEl.textContent = 'Sende…';
      const data = new FormData(form);
      // POST to Formspree (change action in HTML to your Formspree endpoint)
      try{
        const resp = await fetch(form.action, {
          method: form.method,
          body: data,
          headers: { 'Accept': 'application/json' }
        });
        if(resp.ok){
          statusEl.textContent = 'Danke — Nachricht gesendet.';
          form.reset();
        } else {
          const json = await resp.json();
          statusEl.textContent = json?.error || 'Fehler beim Senden. Bitte versuche es später.';
        }
      }catch(err){
        statusEl.textContent = 'Netzwerkfehler. Bitte überprüfe deine Verbindung.';
      }
    });
  }
});
