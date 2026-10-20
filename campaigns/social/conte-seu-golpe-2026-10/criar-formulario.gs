/**
 * Conte o seu golpe: cria o formulário no Google Forms, já configurado.
 * Como usar: clique em Executar (função criarFormulario) e autorize uma vez.
 * O formulário não coleta e-mail e não exige login. As respostas vão para uma planilha no seu Drive.
 */
function criarFormulario() {
  var titulo = 'Conte o seu golpe';
  var existentes = DriveApp.getFilesByName(titulo);
  while (existentes.hasNext()) {
    var f = existentes.next();
    if (f.getMimeType() === MimeType.GOOGLE_FORMS && !f.isTrashed()) {
      Logger.log('Já existe: ' + FormApp.openById(f.getId()).getPublishedUrl());
      return;
    }
  }
  var form = FormApp.create(titulo);
  form.setDescription([
    'Foi vítima de golpe e nunca contou? Conta aqui, sem se identificar. A sua história vira alerta para quem ainda não recebeu a mesma mensagem.',
    'A culpa é de quem roubou, não de quem foi roubado.',
    'Não escreva nomes, CPF, telefone, endereço nem dados de banco, nem os seus nem de outra pessoa.',
    'Este formulário não substitui o boletim de ocorrência. Golpe recente? Avise o banco, conteste o Pix no aplicativo do banco e faça o boletim de ocorrência.',
    'Política de privacidade: https://zethic.net/privacidade'
  ].join('\n\n'));
  form.setCollectEmail(false);
  try { form.setEmailCollectionType(FormApp.EmailCollectionType.DO_NOT_COLLECT); } catch (e) {}
  form.setRequireLogin(false);
  form.setLimitOneResponsePerUser(false);
  form.setAllowResponseEdits(false);
  form.setShowLinkToRespondAgain(false);
  form.setPublishingSummary(false);
  form.setProgressBar(false);
  form.setConfirmationMessage([
    'Obrigada por contar. A sua história pode proteger alguém que ainda não recebeu a mesma mensagem.',
    'Se o golpe foi recente: avise o banco, conteste o Pix no aplicativo do banco e faça o boletim de ocorrência.',
    'Quer ver os alertas? Instagram @jessicagessoli.'
  ].join('\n\n'));

  form.addParagraphTextItem().setTitle('O que aconteceu?')
    .setHelpText('Conte do seu jeito: como começou, o que pediram, o que te convenceu. Sem nomes, CPF, telefone ou dados de banco.')
    .setRequired(true);
  var canal = form.addMultipleChoiceItem().setTitle('Por onde o golpe chegou?').setRequired(true);
  canal.setChoiceValues(['WhatsApp', 'Ligação', 'SMS', 'E-mail', 'Rede social', 'Site ou aplicativo de anúncios', 'Loja online', 'Pessoalmente']);
  canal.showOtherOption(true);
  form.addListItem().setTitle('Em que ano aconteceu?').setRequired(true)
    .setChoiceValues(['2026', '2025', '2024', '2023', '2022', '2021', '2020', 'Antes de 2020']);
  form.addMultipleChoiceItem().setTitle('O criminoso levou dinheiro?').setRequired(true)
    .setChoiceValues(['Não', 'Sim, até R$ 1 mil', 'Sim, de R$ 1 mil a R$ 10 mil', 'Sim, acima de R$ 10 mil', 'Prefiro não dizer']);
  form.addParagraphTextItem().setTitle('O que fez você desconfiar? Ou o que teria feito você desconfiar antes?').setRequired(false);
  form.addMultipleChoiceItem().setTitle('Você trabalha com tecnologia, segurança, finanças ou direito?').setRequired(true)
    .setChoiceValues(['Sim', 'Não', 'Prefiro não dizer']);
  form.addMultipleChoiceItem().setTitle('Como posso usar o seu relato?').setRequired(true)
    .setChoiceValues([
      'Pode virar alerta nas redes, sem me identificar. Nome, cidade, valor e detalhes que me identifiquem serão trocados.',
      'É só para a Jéssica ler. Não publicar.'
    ]);
  form.addTextItem().setTitle('Crie uma palavra-código (opcional)')
    .setHelpText('Se um dia quiser apagar o seu relato, escreva para contato@zethic.net com esta palavra. Sem ela, não há como saber qual relato é o seu.')
    .setRequired(false);
  form.addTextItem().setTitle('Quer contar a sua história no programa "Especialistas também caem"? (opcional)')
    .setHelpText('Se quiser ser convidado para uma entrevista, deixe um e-mail ou WhatsApp. Ele só será usado para esse convite. Deixe em branco para continuar sem se identificar.')
    .setRequired(false);
  var conf = form.addCheckboxItem().setTitle('Confirmações').setRequired(true);
  conf.setChoiceValues([
    'Tenho 18 anos ou mais.',
    'O relato é sobre algo que aconteceu comigo, ou tenho autorização de quem viveu.',
    'Li a política de privacidade e autorizo o uso do relato do jeito que escolhi acima.'
  ]);
  conf.setValidation(FormApp.createCheckboxValidation().requireSelectExactly(3)
    .setHelpText('Marque as três confirmações para enviar.').build());

  var planilha = SpreadsheetApp.create('Conte o seu golpe (respostas)');
  form.setDestination(FormApp.DestinationType.SPREADSHEET, planilha.getId());

  Logger.log('Formulário criado: ' + form.getPublishedUrl());
  Logger.log('Edição: ' + form.getEditUrl());
  Logger.log('Planilha: ' + planilha.getUrl());
}
