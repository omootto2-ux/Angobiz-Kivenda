/**
 * AngoBiz Kivenda — Componente Footer Global
 * Ficheiro: script/footer.js
 */

(function () {
  const emPages = window.location.pathname.includes('/pages/');
  const root    = emPages ? '../' : '';
  const pages   = emPages ? ''    : 'pages/';

  const html = `
  <section class="newsletter">
    <div class="newsletter-inner">
      <div class="newsletter-icone"><i class="fa fa-envelope"></i></div>
      <div class="newsletter-texto">
        <h3>RECEBA OFERTAS EXCLUSIVAS</h3>
        <p>Subscreva a nossa newsletter e receba as melhores ofertas e novidades em primeira mão.</p>
      </div>
      <div class="newsletter-form">
        <input type="email" id="newsEmail" placeholder="Seu melhor e-mail" />
        <button onclick="subscreverNewsletter()">SUBSCREVER</button>
      </div>
    </div>
  </section>

  <footer class="rodape">
    <div class="rodape-inner">
      <div class="rodape-col rodape-sobre">
        <a href="${root}index.html" class="logo rodape-logo">
          <div class="logo-circulo">
            <img src="${root}img/logo.png" alt="AngoBiz Kivenda">
          </div>
          <div class="logo-texto">
            <span class="logo-angotext"><span class="logo-angotext-anго">ANGO</span><span class="logo-angotext-biz">BIZ</span></span>
            <span class="logo-kivenda">— KIVENDA —</span>
          </div>
        </a>
        <p>A AngoBiz Kivenda é a sua parceira ideal para negócios, inovação e crescimento. Oferecemos os melhores produtos e soluções para impulsionar o seu sucesso em Angola.</p>
        <div class="rodape-redes">
          <a href="https://facebook.com" target="_blank" title="Facebook"><i class="fab fa-facebook-f"></i></a>
          <a href="https://instagram.com" target="_blank" title="Instagram"><i class="fab fa-instagram"></i></a>
          <a href="https://linkedin.com" target="_blank" title="LinkedIn"><i class="fab fa-linkedin-in"></i></a>
          <a href="https://wa.me/244923456789" target="_blank" title="WhatsApp"><i class="fab fa-whatsapp"></i></a>
        </div>
      </div>

      <div class="rodape-col">
        <h4>LINKS RÁPIDOS</h4>
        <ul>
          <li><a href="${pages}mercado.html">Mercado</a></li>
          <li><a href="${pages}ango_resolve.html">Ango Resolve</a></li>
          <li><a href="${pages}parceria.html">Vender na Plataforma</a></li>
          <li><a href="${pages}sobre_nos.html">Sobre Nós</a></li>
          <li><a href="${pages}promocoes.html">Promoções</a></li>
          <li><a href="${pages}blog.html">Blog</a></li>
          <li><a href="${pages}suporte.html">Contactos</a></li>
        </ul>
      </div>

      <div class="rodape-col">
        <h4>CATEGORIAS</h4>
        <ul>
          <li><a href="${pages}mercado.html">Supermercado</a></li>
          <li><a href="${pages}eletronicos.html">Eletrónicos</a></li>
          <li><a href="${pages}escritorio.html">Escritório</a></li>
          <li><a href="${pages}industria.html">Indústria</a></li>
          <li><a href="${pages}casa&deco.html">Casa &amp; Decoração</a></li>
          <li><a href="${pages}automovel.html">Automóvel</a></li>
        </ul>
      </div>

      <div class="rodape-col">
        <h4>INFORMAÇÕES</h4>
        <ul>
          <li><a href="${pages}termos.html">Termos e Condições</a></li>
          <li><a href="${pages}politica.html">Política de Privacidade</a></li>
          <li><a href="${pages}denuncias.html">Denúncias</a></li>
          <li><a href="${pages}feedbacks.html">Feedbacks</a></li>
          <li><a href="${pages}cadastro_vendedor.html">Seja um Vendedor</a></li>
        </ul>
        <h4 style="margin-top:16px">CONTACTOS</h4>
        <ul class="rodape-contactos">
          <li><i class="fa fa-phone"></i> +244 923 456 789</li>
          <li><i class="fa fa-envelope"></i> atendimento@angobizkivenda.ao</li>
          <li><i class="fa fa-map-marker-alt"></i> Rua da Kivenda, Nº 123<br>Luanda, Angola</li>
          <li><i class="fa fa-clock"></i> Seg – Sex: 08h00 – 18h00</li>
        </ul>
      </div>
    </div>

    <div class="rodape-fundo">
      <span>© 2026 AngoBiz Kivenda. Todos os direitos reservados.</span>
      <div>
        <a href="${pages}termos.html">Termos e Condições</a>
        <a href="${pages}politica.html">Política de Privacidade</a>
        <a href="${pages}suporte.html">Suporte</a>
      </div>
    </div>
  </footer>`;

  // Injectar antes do fecho do body
  const placeholder = document.getElementById('footer-placeholder');
  if (placeholder) {
    placeholder.outerHTML = html;
  } else {
    document.body.insertAdjacentHTML('beforeend', html);
  }
})();

function subscreverNewsletter() {
  const input = document.getElementById('newsEmail');
  if (!input || !input.value.trim()) {
    UI.toast('Por favor introduza o seu email.', 'aviso');
    return;
  }
  API.subscreverNewsletter(input.value.trim()).then(r => {
    UI.toast(r.mensagem, r.sucesso ? 'sucesso' : 'erro');
    if (r.sucesso) input.value = '';
  });
}
