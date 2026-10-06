# L5-S1 Motion Pro — Meu diário 7.0

Versão web do diário pessoal de exercícios. Abra pelo GitHub Pages ou por um servidor web. Todos os exercícios têm referência local: 19 imagens fornecidas pelo usuário e dois vídeos com movimento humano gravado. Não há mais demonstrações 3D anteriores.

## Usar no dia a dia

1. Em **Hoje**, toque em **Escolher meus exercícios**, selecione e ordene sua rotina. Ela se repete nos próximos dias.
2. Toque no nome do exercício para consultar a referência. Imagens são estáticas e ampliáveis. Os vídeos têm reprodução, pausa, velocidade e tela cheia.
3. Toque em **+** ao lado de um exercício para marcá-lo como feito. Ele é arquivado imediatamente. O botão **✓** permite editar esse registro.
4. Se preferir, use **Iniciar minha rotina**. O guia mostra um exercício por vez, com meta ajustável e cronômetro para exercícios com tempo. Ajuste a meta ao que você fará; tocar em concluir registra essa quantidade.
5. Em **Histórico**, escolha o dia no calendário para consultar, editar ou adicionar execuções. Séries, repetições, tempo e observação são opcionais. É possível registrar dias anteriores.
6. **Como foi seu dia?** permite anotar sintomas e observações. **Progresso** mantém os gráficos; o mapa da dor fica acessível em Hoje.
7. Em **Ajustes**, exporte um backup JSON completo. O CSV inclui exercícios, anotações diárias e sintomas das sessões.

Os dados ficam neste navegador/aparelho, sem login ou sincronização automática. APK e site têm históricos separados; use exportar/importar backup para transferir. Backups v4–v6 são aceitos e os exercícios de sessões antigas entram no arquivo diário sem inventar quantidades. A mesma chave de armazenamento foi mantida para atualização no mesmo endereço.

## Publicar no GitHub Pages

Descompacte este pacote e envie **seu conteúdo** ao repositório. `index.html` deve ficar na raiz, junto de `app.js`, `catalog.js`, `state-core.js`, `styles.css`, `media`, `posters`, `icons`, `manifest.webmanifest`, `service-worker.js` e `.nojekyll`.

Em **Settings → Pages → Build and deployment**, escolha **Deploy from a branch**, branch `main` e pasta `/(root)`. Salve. Não envie apenas o ZIP fechado nem o projeto Android para abrir como site.

Para atualizar uma versão anterior, substitua os arquivos web e remova as antigas demonstrações de `media`/`human_refs` e os antigos posters de exercícios. Preserve `posters/pain_map_realistic.jpg`, `map-front.svg` e `map-left.svg`. O cache v7 remove os caches anteriores do aplicativo após instalar os arquivos novos. Os dados locais permanecem na mesma chave, se o domínio e caminho de uso não mudarem.

Os caminhos são relativos e funcionam em subpastas de repositório. Após o primeiro acesso completo por HTTPS, o aplicativo e as referências podem abrir offline. A instalação como aplicativo depende do navegador. Não use `file://` para testar o site; use um servidor local, por exemplo `python3 -m http.server 8080` nesta pasta.

## Referências fornecidas

Os arquivos de imagem foram preservados. Os vídeos de Dead bug e Bird-dog foram recortados no tempo, mantendo o enquadramento de 640×360, sem áudio, sem zoom, sem corte espacial e sem movimento sintetizado. São referências enviadas, sem validação clínica do app.

Há avisos específicos em quatro exercícios: press-up (contato do quadril pouco claro), pranchas laterais completa e com joelhos (mão/antebraço) e ponte com marcha (variações misturadas). As ilustrações contêm afirmações próprias sobre alívio e descompressão; o aplicativo não as confirma. As quantidades e rotinas anteriores continuam disponíveis como referência, sem prescrição automática.

## Verificações desta versão

Testados em Chromium: todos os 21 materiais, fluxo diário, notas, calendário, edição/exclusão com desfazer, cronômetro e retomada, migração v6, backup/CSV, 84 combinações de telas e tamanhos em dois temas e imagens/vídeos offline, incluindo busca dentro dos vídeos em cache. Sem erros JavaScript ou arquivos ausentes. Android e aparelho físico não foram testados nesta rodada; a compilação exige Android Studio/SDK/Gradle.
