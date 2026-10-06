# L5-S1 Motion Pro — versão web / GitHub Pages

Este pacote contém a versão web do aplicativo, pronta para hospedagem estática no GitHub Pages. Não exige Android Studio, Gradle, APK, servidor de aplicação ou compilação.

## Publicar pelo navegador

1. Extraia o ZIP no computador.
2. Crie um repositório no GitHub, por exemplo `l5s1-motion-pro`. Um repositório público permite GitHub Pages no plano gratuito.
3. Abra o repositório e escolha **Add file → Upload files**.
4. Envie **os arquivos e pastas extraídos**, preservando as pastas. O `index.html` deve aparecer diretamente na raiz do repositório, no mesmo nível deste README. Não envie apenas o ZIP nem uma pasta externa contendo tudo dentro dela.
5. Confirme o envio com **Commit changes** ou **Propose changes**, conforme a opção exibida. Se o GitHub pedir uma revisão por pull request, conclua o merge para a branch `main`.
6. Abra **Settings → Pages**.
7. Em **Source**, selecione **Deploy from a branch**.
8. Selecione a branch **main** e a pasta **/ (root)**. Clique em **Save**.
9. Aguarde a publicação terminar. O próprio painel Pages mostrará o endereço do site. Geralmente ele terá o formato `https://SEU_USUARIO.github.io/l5s1-motion-pro/`.

Se a branch principal tiver outro nome, selecione esse nome em vez de `main`.

## Arquivos da raiz

- `index.html`: página de entrada.
- `styles.css`: visual e responsividade.
- `app.js`, `catalog.js`, `state-core.js`: funções, exercícios e registros.
- `media/`: as 21 demonstrações de exercícios.
- `posters/`: imagens e mapas.
- `icons/`: ícones do aplicativo web.
- `manifest.webmanifest` e `service-worker.js`: instalação e disponibilidade offline após o primeiro acesso completo.
- `.nojekyll`: instrui o GitHub Pages a publicar os arquivos estáticos sem processá-los como um site Jekyll.
- `human_refs/`: referências visuais preservadas do projeto.

Se `.nojekyll` não aparecer na seleção de envio, no GitHub use **Add file → Create new file**, dê o nome `.nojekyll`, adicione uma linha vazia e salve.

## Uso no navegador

As cinco abas, demonstrações, busca, favoritos, cronômetro, mapa, histórico, CSV e backup JSON funcionam no navegador. A voz usa as vozes disponíveis no navegador e no dispositivo.

Os registros ficam salvos neste navegador e neste dispositivo. Não há sincronização automática entre o site, o APK e outros aparelhos. Para transferir os registros, exporte e importe o backup JSON em Ajustes.

No Android com Chrome, a opção **Instalar aplicativo** ou **Adicionar à tela inicial** pode aparecer no menu do navegador. O uso offline depende do primeiro acesso e do carregamento completo dos arquivos. Esse aplicativo web instalado é uma PWA; não é um APK.

O site possui ilustrações humanas em 3D com câmera fixa. Use os exercícios conforme a orientação recebida; o aplicativo não substitui uma prescrição individual.

## Documentação oficial

- Criar um site GitHub Pages: https://docs.github.com/en/pages/getting-started-with-github-pages/creating-a-github-pages-site
- Configurar publicação: https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site
- Enviar arquivos: https://docs.github.com/en/repositories/working-with-files/managing-files/adding-a-file-to-a-repository
