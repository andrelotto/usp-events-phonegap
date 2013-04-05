var Event = Backbone.Model.extend({

    publishedDate: function() {
        return new Date(this.get('publishedDate'));
    },

    validate: function(attrs, options) {
        errors = "";

        if (!attrs.title || !_.isString(attrs.title)) {
            errors += "Título é obrigatório - ";
        }
        if (!attrs.link || !_.isString(attrs.link)) {
            errors += "Link é obrigatório - ";
        }
        if (!attrs.publishedDate || !_.isString(attrs.publishedDate)) {
            errors += "Data de publicação é obrigatório - ";
        } else if (!_.isDate(new Date(attrs.publishedDate))) {
            errors += "Data de publicação não é um formato válido - ";
        }

        if (errors.length > 0) {
            return errors;
        }
    }

});

var EventList = Backbone.Collection.extend({
    model: Event,
    localStorage: new Backbone.LocalStorage("usp-events"),

    comparator: function(an_event) {
        return (new Date(an_event.publishedDate())).getTime();
    }
});

var Settings = Backbone.Model.extend({

/*    $(".campi-unidades-lista .campus-title").each(function(){ */
    //var out = "";
    //out += "'"+$(this).text().trim()+"': {"; 
    //out += "  "+$(this).next().next().find(".unidades_evento").map(function(){ return "'"+$(this).val()+"': '"+$(this).parent().text().trim().replace(/([\\"'])/g, "\\$1").replace(/\0/g, "\\0")+"'" }).get().join(",\n");
    //out += "},";
    //console.log(out);
/*    }*/)
    eventDepartments: {
        'Bauru': {
            'ccb-coordenadoria-do-campus-de-bauru': 'CCB - Coordenadoria do Campus de Bauru',
            'centro-cultural': 'Centro Cultural',
            'fob-faculdade-de-odontologia-de-bauru': 'FOB - Faculdade de Odontologia de Bauru',
            'funcraf-bauru': 'Funcraf - Bauru',
            'hrac-hospital-de-anomalias-craniofaciais': 'HRAC - Hospital de Anomalias Craniofaciais',
            'teatro-universitario': 'Teatro Universitário'
        },
        'Capital': {
            'anfiteatro-das-colmeias': 'Anfiteatro das Colméias',
            'biblioteca-brasiliana': 'Biblioteca Brasiliana',
            'casa-de-cultura-japonesa': 'Casa de Cultura Japonesa',
            'casa-de-dona-yaya': 'Casa de Dona Yayá - CPC',
            'cce-centro-de-computacao-eletronica': 'CCE - Centro de Computação Eletrônica',
            'cedir-centro-de-descarte-e-reuso-de-residuos-de-informatica': 'CEDIR - Centro de Descarte e Reúso de Resíduos de Informática',
            'centro-de-apoio-e-pesquisa-em-pediatria-caepp': 'Centro de Apoio e Pesquisa em Pediatria (CAEPP)',
            'centro-de-estudos-amerindios-cesta': 'Centro de Estudos Ameríndios (CEstA)',
            'centro-de-visitantes': 'Centro de Visitantes',
            'centro-universitario-maria-antonia': 'Centro Universitário Maria Antonia',
            'cepe-centro-de-praticas-esportivas': 'CEPE - Centro de Práticas Esportivas',
            'cinusp-cinema-da-usp-paulo-emilio': 'Cinusp - Cinema da USP Paulo Emílio',
            'cmu-eca': 'CMU - ECA',
            'cocesp-coordenadoria-do-campus-da-capital': 'COCESP - Coordenadoria do Campus da Capital',
            'coseas-coordenadoria-de-assistencia-social': 'COSEAS - Coordenadoria de Assistência Social',
            'creche-e-pre-escola-central': 'Creche e Pré-Escola Central',
            'crechepre-escola-oeste': 'Creche/Pré-Escola Oeste',
            'cti-coordenadoria-de-tecnologia-da-informacao': 'CTI - Coordenadoria de Tecnologia da Informação',
            'each-escola-de-artes-ciencias-e-humanidades': 'EACH - Escola de Artes, Ciências e Humanidades',
            'eca-auditorio-olivier-toni': 'ECA - Auditório Olivier Toni',
            'eca-conjunto-arquitetonico-das-artes': 'ECA - Conjunto Arquitetônico das Artes',
            'eca-escola-de-comunicacao-e-artes': 'ECA - Escola de Comunicações e Artes',
            'eca-teatro-laboratorio-da-eca': 'ECA - Teatro Laboratório da ECA',
            'edusp-editora-da-usp': 'EDUSP - Editora da USP',
            'ee-escola-de-enfermagem': 'EE - Escola de Enfermagem',
            'eefe-escola-de-educacao-fisica-e-esporte': 'EEFE - Escola de Educação Física e Esporte',
            'escola-de-aplicacao': 'Escola de Aplicação',
            'fau-faculdade-de-arquitetura-e-urbanismo': 'FAU - Faculdade de Arquitetura e Urbanismo',
            'fau-maranhao-2': 'FAU Maranhão - Faculdade de Arquitetura e Urbanismo',
            'fcf-faculdade-de-ciencias-farmaceuticas': 'FCF - Faculdade de Ciências Farmacêuticas',
            'fd-faculdade-de-direito': 'FD - Faculdade de Direito',
            'fe-faculdade-de-educacao': 'FE - Faculdade de Educação',
            'fea-faculdade-de-economia-administracao-e-contabilidade': 'FEA - Faculdade de Economia, Administração e contabilidade',
            'fflch-faculdade-de-filosofia-letras-e-ciencias-humanas-departamento-de-historia': 'FFLCH - Faculdade de Filosofia Letras e Ciências Humanas - Departamento de História',
            'fflch-faculdade-de-filosofia-letras-e-ciencias-humanas': 'FFLCH - Faculdade de Filosofia, Letras e Ciências Humanas',
            'fflch-faculdade-de-filosofia-letras-e-ciencias-humanas-departamento-de-ciencia-politica': 'FFLCH - Faculdade de Filosofia, Letras e Ciências Humanas - Departamento de Ciência Política',
            'fflch-faculdade-de-filosofia-letras-e-ciencias-humanas-departamento-de-filosofia-e-ciencias-sociais': 'FFLCH - Faculdade de Filosofia, Letras e Ciências Humanas - Departamento de Filosofia e Ciências Sociais',
            'fflch-faculdade-de-filosofia-letras-e-ciencias-humanas-departamento-de-geografia': 'FFLCH - Faculdade de Filosofia, Letras e Ciências Humanas - Departamento de Geografia',
            'fflch-faculdade-de-filosofia-de-letras-e-ciencias-humanas-departamento-de-letras': 'FFLCH - Faculdade de Filosofia, Letras e Ciências Humanas - Departamento de Letras',
            'fm-faculdade-de-medicina': 'FM - Faculdade de Medicina',
            'fmvz-faculdade-de-medicina-veterinaria-e-zootecnia': 'FMVZ - Faculdade de Medicina Veterinária e Zootecnia',
            'fo-faculdade-de-odontologia': 'FO - Faculdade de Odontologia',
            'fsp-faculdade-de-saude-publica': 'FSP - Faculdade de Saúde Pública',
            'fupam-fundacao-para-a-pesquisa-em-arquitetura-e-ambiente': 'Fupam - Fundação para a Pesquisa em Arquitetura e Ambiente',
            'galpao-ponto-de-cultura-escola-da-rua': 'Galpão Ponto de Cultura Escola da Rua',
            'hospital-das-clinicas': 'Hospital das Clínicas - Ambulatórios',
            'hospital-das-clinicas-instituto-da-crianca': 'Hospital das Clínicas – Instituto da Criança',
            'hospital-universitario-hu': 'Hospital Universitário (HU)',
            'iag-instituto-de-astronomia-geofisica-e-ciencias-atmosfericas': 'IAG - Instituto de Astronomia, Geofísica e Ciências Atmosféricas',
            'ib-instituto-de-biociencias': 'IB - Instituto de Biociências',
            'icb-i-instituto-de-ciencias-biomedicas': 'ICB I – Instituto de Ciências Biomédicas',
            'icb-ii-instituto-de-ciencias-biomedicas': 'ICB II – Instituto de Ciências Biomédicas',
            'icb-iv-instituto-de-ciencias-biomedicas': 'ICB IV – Instituto de Ciências Biomédicas',
            'icb-instituto-de-ciencias-biomedicas': 'ICB lll - Instituto de Ciências Biomédicas',
            'iea-institutos-de-estudos-avancados': 'IEA - Institutos de Estudos Avançados',
            'ieb-instituto-de-estudos-brasileiros': 'IEB - Instituto de Estudos Brasileiros',
            'iee-instituto-de-eletrotecnica-e-energia': 'IEE - Instituto de Eletrotécnica e Energia',
            'if-instituto-de-fisica': 'IF - Instituto de Física',
            'igc-instituto-de-geociencias': 'IGc - Instituto de Geociências',
            'ime-instituto-de-matematica-e-estatistica': 'IME - Instituto de Matemática e Estatística',
            'inovacao-agencia-usp-inovacao': 'Inovação - Agência USP Inovação',
            'inrad-instituto-de-radiologia-do-hc': 'InRad - Instituto de Radiologia do Hospital das Clínicas da Faculdade de Medicina da USP',
            'instituto-do-coracao-incor': 'Instituto do Coração (InCor)',
            'io-instituto-oceanografico': 'IO - Instituto Oceanográfico',
            'ip-instituto-de-psicologia': 'IP - Instituto de Psicologia',
            'ipen-2': 'Ipen - Instituto de Pesquisas Energéticas e Nucleares',
            'ipq': 'IPq - Instituto de Psiquiatria',
            'iq-instituto-de-quimica': 'IQ - Instituto de Química',
            'iri-instituto-de-relacoes-internacionais': 'IRI - Instituto de Relações Internacionais',
            'livraria-joao-alexandre-barbosa': 'Livraria João Alexandre Barbosa',
            'mac-museu-de-arte-contemporanea': 'MAC - Museu de Arte Contemporânea',
            'mac-ibirapuera': 'MAC - Museu de Arte Contemporânea (Ibirapuera)',
            'mae-museu-de-arqueologia-e-etnologia': 'MAE - Museu de Arqueologia e Etnologia',
            'mp-museu-paulista': 'MP - Museu Paulista',
            'nucleo-de-estudos-da-violencia-nev': 'NEV - Núcleo de Estudos da Violência',
            'nucleo-de-extensao-e-cultura-em-artes-afro-brasileiras': 'Núcleo de Extensão e Cultura em Artes Afro-Brasileiras',
            'nupps-nucleo-de-pesquisa-em-politicas-publicas': 'NUPPs - Núcleo de Pesquisa em Políticas Públicas',
            'paco-das-artes': 'Paço das Artes',
            'poli-administracao': 'POLI - Administração',
            'poli-departamento-de-engenharia-de-materiais': 'POLI - Departamento de Engenharia de Materiais',
            'poli-departamento-de-engenharia-de-producao': 'POLI - Departamento de Engenharia de Produção',
            'poli-escola-politecnica': 'POLI - Escola Politécnica',
            'praca-do-relogio-capital': 'Praça do Relógio',
            'prceu-pro-reitoria-de-cultura-e-extensao-universitaria': 'PRCEU - Pró-Reitoria de Cultura e Extensão Universitária',
            'prolam': 'Prolam',
            'prp-pro-reitoria-de-pesquisa': 'PRP - Pró-Reitoria de Pesquisa',
            'prpg-pro-reitoria-de-pos-graduacao': 'PRPG - Pró-Reitoria de Pós-Graduação',
            'reitoria': 'Reitoria',
            'sala-do-conselho-universitario': 'Sala do Conselho Universitário',
            'sti-superintendencia-de-tecnologia-da-informacao': 'STI - Superintendência de Tecnologia da Informação',
            'tusp-teatro-da-usp': 'Tusp - Teatro da USP'
        },
        'Lorena': {
            'eel-escola-de-engenharia-de-lorena': 'EEL - Escola de Engenharia de Lorena'
        },
        'Outros': {
            'online': '#Online',
            'varios': '#Vários',
            'aberje': 'Aberje',
            'academia-nacional-de-medicina': 'Academia Nacional de Medicina',
            'aeda-associacao-dos-ex-alunos-do-colegio-dante-alighieri': 'AEDA - Associação dos Ex-Alunos do Colégio Dante Alighieri',
            'alesp': 'ALESP',
            'arena-da-barra': 'Arena da Barra',
            'associacao-comercial-de-sao-paulo-acsp': 'Associação Comercial de São Paulo (ACSP)',
            'associacao-dos-engenheiros-agronomos-de-primavera-do-leste': 'Associação dos Engenheiros Agrônomos de Primavera do Leste',
            'auditorio-claudio-santoro-campos-do-jordao': 'Auditório Claudio Santoro (Campos do Jordão)',
            'auditorio-da-canaoeste': 'Auditório da Canaoeste',
            'auditorio-da-editora-paulinas': 'Auditório da Editora Paulinas',
            'bar-sabia': 'Bar Sabiá',
            'biblioteca-de-sao-paulo': 'Biblioteca de São Paulo',
            'biblioteca-mario-de-andrade': 'Biblioteca Mario de Andrade',
            'camara-municipal-de-sao-paulo': 'Câmara Municipal de São Paulo',
            'capela-puc': 'Capela da PUC',
            'casa-da-cidade': 'Casa da Cidade',
            'casa-da-imagem': 'Casa da Imagem',
            'casa-da-madalena': 'Casa da Madalena',
            'casa-de-xilogravura': 'Casa de Xilogravura',
            'casa-do-psicologo': 'Casa do Psicólogo',
            'catavento-cultural-e-educacional': 'Catavento Cultural e Educacional',
            'cebimar': 'CEBIMar',
            'centro-brasileiro-de-analise-e-planejamento-cebrap': 'Centro Brasileiro de Análise e Planejamento (Cebrap)',
            'centro-cultural-antonio-pacheco-ferraz': 'Centro Cultural Antonio Pacheco Ferraz',
            'centro-cultural-banco-do-brasil': 'Centro Cultural Banco do Brasil',
            'celina-neves': 'Centro Cultural Celina Neves',
            'centro-cultural-intercom-jose-marques-de-melo': 'Centro Cultural Intercom José Marques de Melo',
            'centro-cultural-sao-paulo': 'Centro Cultural São Paulo',
            'centro-de-convencoes-da-faap': 'Centro de Convenções da FAAP',
            'centro-de-convencoes-de-ribeirao-preto': 'Centro de Convenções de Ribeirão Preto',
            'centro-de-convencoes-reboucas': 'Centro de Convenções Rebouças',
            'centro-de-documentacao-e-memoria-da-mogiana': 'Centro de Documentação e Memória da Mogiana',
            'centro-de-eventos-de-gramado': 'Centro de Eventos de Gramado',
            'cientec-parque-de-ciencia-e-tecnologia-da-usp': 'Cientec - Parque de Ciência e Tecnologia da USP',
            'salao-nobre-ciesp': 'CIESP',
            'cineclube-socioambiental-crisantempo': 'Cineclube Socioambiental Crisantempo',
            'cinemateca-brasileira': 'Cinemateca Brasileira',
            'cinesesc': 'CineSESC',
            'colegio-objetivo-de-osasco': 'Colégio Objetivo de Osasco',
            'colegio-santa-cruz-outros': 'Colégio Santa Cruz',
            'colegio-waldorf-micael': 'Colégio Waldorf Micael',
            'comunidade-evangelica-luterana-concordia': 'Comunidade Evangélica Luterana Concórdia',
            'concais-terminal-maritimo-de-passageiros-giusfredo-santini': 'CONCAIS - Terminal Marítimo de Passageiros Giusfredo Santini',
            'cooperativa-dos-plantadores-de-cana-do-estado-de-sao-paulo': 'Cooperativa dos Plantadores de Cana do Estado de São Paulo',
            'dan-inn-hotel': 'Dan Inn Hotel',
            'defensoria-publica-do-estado-de-sao-paulo': 'Defensoria Pública do Estado de São Paulo',
            'edificio-roberto-simonsen': 'Edifício Roberto Simonsen',
            'escola-da-cidade': 'Escola da Cidade',
            'escola-estadual-prof-dr-oscar-de-moura-lacerda': 'Escola Estadual Prof. Dr. Oscar de Moura Lacerda',
            'escola-paulista-de-magistratura': 'Escola Paulista de Magistratura',
            'espaco-bibliaspa': 'Espaço BibliASPA',
            'estacao-ciencia': 'Estação Ciência',
            'estacao-paraiso': 'Estação Paraíso',
            'estacao-republica-de-metro': 'Estação República de Metrô',
            'estacao-se-do-metro': 'Estação Sé do Metrô',
            'estudios-kaiser-de-cinema': 'Estúdios Kaiser de Cinema',
            'expo-center-norte': 'Expo Center Norte',
            'fapesp': 'Fapesp - Fundação de Amparo à Pesquisa do Estado de São Paulo',
            'fdte-fundacao-para-o-desenvolvimento-tecnologico-da-engenharia': 'FDTE - Fundação para o Desenvolvimento Tecnológico da Engenharia',
            'fecomercio-sp': 'Fecomercio SP',
            'federacao-das-industrias-do-estado-de-sao-paulo-fiesp': 'Federação das Indústrias do Estado de São Paulo (Fiesp)',
            'fgv-fundacao-getulio-vargas': 'FGV - Fundação Getúlio Vargas',
            'fnac-ribeirao-shopping': 'Fnac - Ribeirão Shopping',
            'funcraf-campo-grande': 'Funcraf - Campo Grande',
            'fundacao-ema-gordon-klabin': 'Fundação Ema Gordon Klabin',
            'fundacao-instituto-de-pesquisas-contabeis-atuariais-e-financeiras-fipecafi': 'Fundação Instituto de Pesquisas Contábeis, Atuariais e Financeiras (Fipecafi)',
            'fundacao-otorrinolaringologia': 'Fundação Otorrinolaringologia',
            'fundacao-para-o-desenvolvimento-tecnologico-da-engenharia': 'Fundação para o Desenvolvimento Tecnológico da Engenharia',
            'fundap-fundacao-do-desenvolvimento-administrativo': 'Fundap - Fundação do Desenvolvimento Administrativo',
            'fupam': 'Fupam',
            'fuvest': 'Fuvest',
            'galeria-berenice-arvani': 'Galeria Berenice Arvani',
            'galeria-gravura-brasil': 'Galeria Gravura Brasil',
            'goethe-institut-sao-paulo': 'Goethe-Institut São Paulo',
            'hospital-a-c-camargo-2': 'Hospital A.C. Camargo',
            'hotel-address-cidade-jardim': 'Hotel Address Cidade Jardim',
            'hotel-bourbon': 'Hotel Bourbon',
            'hotel-broa-golf-resort': 'Hotel Broa Golf Resort',
            'hotel-golden-tower': 'Hotel Golden Tower',
            'hotel-jp': 'Hotel JP',
            'hotel-jp-de-ribeirao-preto': 'Hotel JP de Ribeirão Preto',
            'hotel-raffain-palace': 'Hotel Raffain Palace',
            'icesp-instituto-do-cancer-do-estado-de-sao-paulo': 'ICESP - Instituto do Câncer do Estado de São Paulo',
            'igreja-da-ordem-terceira-do-carmo': 'Igreja da Ordem Terceira do Carmo',
            'igreja-do-calvario': 'Igreja do Calvário',
            'instituto-butantan': 'Instituto Butantan',
            'instituto-de-engenharia': 'Instituto de Engenharia de São Paulo',
            'nucleo-de-estudos-de-violencia-urbana-ufrj': 'Instituto de Filosofia e Ciências Sociais (UFRJ)',
            'instituto-medicina-social-ims-uerj': 'Instituto Medicina Social (IMS) - UERJ',
            'instituto-tomie-ohtake': 'Instituto Tomie Ohtake',
            'juquehy-praia-hotel': 'Juquehy Praia Hotel',
            'livraria-cortez': 'Livraria Cortez',
            'livraria-cultura-conjunto-nacional': 'Livraria Cultura (Conjunto Nacional)',
            'livraria-cultura-de-ribeirao-preto': 'Livraria Cultura de Ribeirão Preto',
            'livraria-da-travessa-ipanema': 'Livraria da Travessa (Ipanema)',
            'livraria-da-vila-lorena-outros': 'Livraria da Vila (Lorena)',
            'livraria-da-vila-vila-madelena': 'Livraria da Vila (Vila Madalena)',
            'livraria-da-vila-shopping-patio-higienopolis': 'Livraria da Vila - Shopping Pátio Higienópolis',
            'livraria-martins-fontes': 'Livraria Martins Fontes',
            'livraria-ponto-do-livro': 'Livraria Ponto do Livro',
            'livraria-saraiva-higienopolis': 'Livraria Saraiva - Higienópolis',
            'maksoud-plaza-hotel': 'Maksoud Plaza Hotel',
            'masp-museu-de-arte-de-sao-paulo': 'MASP - Museu de Arte de São Paulo',
            'memorial-da-america-latina': 'Memorial da América Latina',
            'mis-museu-de-imagem-e-som': 'MIS - Museu de Imagem e Som',
            'museu-da-cidade-de-sao-paulo': 'Museu da Cidade de São Paulo',
            'india-vanuire': 'Museu Histórico e Pedagógico Índia Vanuíre',
            'museu-republicano': 'Museu Republicano \"Convenção de Itu\"',
            'museu-universitario-de-uberlandia': 'Museu Universitário de Uberlândia',
            'nova-escola': 'Nova Escola',
            'oab-bauru': 'OAB - Bauru',
            'oam': 'Observatório Abrahão de Moraes',
            'oficina-de-paleontologia-da-fcav': 'Oficina de Paleontologia da FCAV',
            'palacio-dos-bandeirantes': 'Palácio dos Bandeirantes',
            'paroquia-sao-luis-gonzaga': 'Paróquia São Luís Gonzaga',
            'parque-de-exposicoes-do-anhembi': 'Parque de Exposições do Anhembi',
            'parque-ibirapuera': 'Parque Ibirapuera',
            'parque-villa-lobos': 'Parque Villa Lobos',
            'pateo-do-collegio': 'Pateo do Collegio',
            'pavilhao-de-exposicoes-do-anhembi': 'Pavilhão de Exposições do Anhembi',
            'pousada-santa-rita': 'Pousada Santa Rita',
            'praca-coronel-salles': 'Praça Coronel Salles',
            'riocentro': 'RioCentro',
            'ruinas-engenho-sao-jorge-dos-erasmos': 'Ruínas Engenho São Jorge dos Erasmos',
            'sala-sao-paulo': 'Sala São Paulo',
            'secretaria-de-estado-da-cultura': 'Secretaria de Estado da Cultura',
            'senai-bras': 'Senai (Brás)',
            'sepac': 'SEPAC',
            'servico-nacional-de-aprendizagem-do-cooperativismo': 'Serviço Nacional de Aprendizagem do Cooperativismo',
            'sesi-sjc': 'SESI São José dos Campos',
            'shopping-frei-caneca': 'Shopping Frei Caneca',
            'shopping-iguatemi': 'Shopping Iguatemi',
            'shopping-iguatemi-sao-carlos': 'Shopping Iguatemi São Carlos',
            'shopping-villa-lobos': 'Shopping Villa-Lobos',
            'simespi': 'SIMESPI',
            'sindicato-dos-engenheiros': 'Sindicato dos Engenheiros',
            'st-pauls-school': 'St. Paul\'s School',
            'stream-palace-hotel': 'Stream Palace Hotel',
            'teatro-alianca-francesa': 'Teatro Aliança Francesa',
            'teatro-de-arena-eugenio-kusnet': 'Teatro de Arena Eugênio Kusnet',
            'teatro-sesi': 'Teatro do SESI',
            'celina-lourdes': 'Teatro Municipal Celina Lourdes Alves Neves',
            'teatro-municipal-de-sao-carlos': 'Teatro Municipal de São Carlos',
            'teatro-municipal-dr-losso-netto': 'Teatro Municipal Dr. Losso Netto',
            'teatro-do-sesi-sao-paulo': 'Teatro Popular do Sesi',
            'teatro-procopio-ferreira': 'Teatro Procópio Ferreira',
            'templo-da-cidadania': 'Templo da Cidadania',
            'theatro-pedro': 'Theatro Pedro II',
            'tuca-teatro-da-universidade-catolica-de-sao-paulo': 'TUCA - Teatro da Universidade Católica de São Paulo',
            'ufrj-campus-praia-vermelha': 'UFRJ - Campus Praia Vermelha',
            'ufu-universidade-federal-de-uberlandia': 'UFU - Universidade Federal de Uberlândia',
            'unb-campus-universitario-darcy-ribeiro': 'UnB - Campus Universitário Darcy Ribeiro',
            'universidade-estadual-paulista-julio-de-mesquita-filho-unesp-franca': 'Unesp - Universidade Estadual Paulista Júlio de Mesquita Filho (Franca)',
            'unesp-universidade-estadual-paulista-julio-de-mesquita-filho-rio-claro': 'Unesp - Universidade Estadual Paulista Júlio de Mesquita Filho (Rio Claro)',
            'unicamp-campus-universitario-zeferino-vaz': 'Unicamp - Campus Universitario Zeferino Vaz',
            'unimep': 'Unimep',
            'uninove-vergueiro': 'Uninove (Vergueiro)',
            'unip-ribeirao-preto': 'Unip Ribeirão Preto',
            'unitau-universidade-de-taubate': 'Unitau - Universidade de Taubaté',
            'universidade-de-houston': 'Universidade de Houston',
            'universidade-de-mogi-das-cruzes-umc': 'Universidade de Mogi das Cruzes (UMC)',
            'universidade-federal-de-minas-gerais-ufmg': 'Universidade Federal de Minas Gerais - UFMG'
        },
        'Piracicaba': {
            'cclq-coordenadoria-do-campus-luiz-de-queiroz': 'CCLQ - Coordenadoria do Campus \"Luiz de Queiroz\"',
            'cena-centro-de-energia-nuclear-na-agricultura': 'CENA - Centro de Energia Nuclear na Agricultura',
            'esalq-escola-superior-de-agricultura-luiz-de-queiroz': 'ESALQ - Escola Superior de Agricultura \"Luiz de Queiroz\"',
            'fundacao-de-estudos-agrarios-luiz-de-queiroz-fealq': 'Fundação de Estudos Agrários Luiz de Queiroz (Fealq)',
            'museu-e-centro-de-ciencias-educacao-e-artes-luiz-de-queiroz-piracicaba': 'Museu e Centro de Ciências, Educação e Artes Luiz de Queiroz'
        },
        'Pirassununga': {
            'fmvz-faculdade-de-medicina-veterinaria-e-zootecnia-2': 'FMVZ - Faculdade de Medicina Veterinária e Zootecnia',
            'fzea-faculdade-de-zootecnia-e-engenharia-de-alimentos': 'FZEA - Faculdade de Zootecnia e Engenharia de Alimentos',
            'prefeitura-do-campus-de-pirassununga': 'Prefeitura do Campus de Pirassununga'
        },
        'Ribeirão Preto': {
            'agencia-usp-de-inovacao': 'Agência USP de Inovação',
            'casa-da-ciencia': 'Casa da Ciência',
            'ccrp-coordenadoria-do-campus-de-ribeirao-preto': 'CCRP - Coordenadoria do Campus de Ribeirão Preto',
            'centro-multidisciplinar-de-promocao-a-saude-e-prevencao-de-doencas': 'Centro Multidisciplinar de Promoção à Saúde e Prevenção de Doenças',
            'cirp-centro-de-informatica-de-ribeirao-preto': 'CIRP - Centro de Informática de Ribeirão Preto',
            'coral-da-usp-ribeirao-2': 'Coral da USP-Ribeirão',
            'eceu-espaco-cultural-e-de-extensao-universitaria': 'ECEU - Espaço Cultural e de Extensão Universitária',
            'eeferp-escola-de-educacao-fisica-e-esportes-de-ribeirao-preto': 'EEFERP - Escola de Educação Física e Esportes de Ribeirão Preto',
            'eerp-escola-de-enfermagem-de-ribeirao-preto': 'EERP - Escola de Enfermagem de Ribeirão Preto',
            'fcfrp-faculdade-de-ciencias-farmaceuticas-de-ribeirao-preto': 'FCFRP - Faculdade de Ciências Farmacêuticas de Ribeirão Preto',
            'fdrp-faculdade-de-direito-de-ribeirao-preto': 'FDRP - Faculdade de Direito de Ribeirão Preto',
            'fearp-faculdade-de-economia-administracao-e-contabilidade-de-ribeirao-preto': 'FEARP - Faculdade de Economia, Administração e Contabilidade de Ribeirão Preto',
            'ffclrp-anfiteatro-andre-jacquemin': 'FFCLRP - Anfiteatro André Jacquemin',
            'ffclrp-faculdade-de-filosofia-ciencias-e-letras-de-ribeirao-preto': 'FFCLRP - Faculdade de Filosofia, Ciências e Letras de Ribeirão Preto',
            'fmrp-faculdade-de-medicina-de-ribeirao-preto': 'FMRP - Faculdade de Medicina de Ribeirão Preto',
            'fmrp-hemocentro': 'FMRP - Hemocentro',
            'forp-faculdade-de-odontologia-de-ribeirao-preto': 'FORP - Faculdade de Odontologia de Ribeirão Preto',
            'iearp-instituto-de-estudos-avancados-de-ribeirao-preto': 'IEARP - Instituto de Estudos Avançados de Ribeirão Preto',
            'museu-e-laboratorio-de-ensino-de-ciencias': 'Museu e Laboratório de Ensino de Ciências',
            'unidade-de-emergencia-hospital-das-clinicas-da-fmrp': 'Unidade de Emergência - Hospital das Clínicas da FMRP'
        },
        'São Carlos': {
            'ccsc-coordenadoria-do-campus-de-sao-carlos': 'CCSC - Coordenadoria do Campus de São Carlos',
            'cdcc-centro-de-divulgacao-cientifica-e-cultural': 'CDCC - Centro de Divulgação Científica e Cultural',
            'centro-cultural-da-usp-em-sao-carlos': 'Centro Cultural da USP em São Carlos',
            'eesc-escola-de-engenharia-de-sao-carlos': 'EESC - Escola de Engenharia de São Carlos',
            'iau-instituto-de-arquitetura-e-urbanismo': 'IAU - Instituto de Arquitetura e Urbanismo',
            'icmc-instituto-de-ciencias-matematicas-e-de-computacao': 'ICMC - Instituto de Ciências Matemáticas e de Computação',
            'ifsc-instituto-de-fisica-de-sao-carlos': 'IFSC - Instituto de Física de São Carlos',
            'iqsc-instituto-de-quimica-de-sao-carlos': 'IQSC - Instituto de Química de São Carlos',
            'observatorio-dietrich-schiel': 'Observatório Dietrich Schiel'
        }
    }

    // $(".campi-unidades-lista .campus-title").map(function(){ return $(this).text().trim() }).get().join()
    // "Bauru,Capital,Lorena,Outros,Piracicaba,Pirassununga,Ribeirão Preto,São Carlos"
    //
    // Para obter esse json, execute o seguinte no console da URL http://www.eventos.usp.br/?page_id=111:
    // $(".categoria_evento").map(function(){ return $(this).val()+"': '"+$(this).parent().text().trim() }).get().join("','");
    eventTypes: {
        'cultura-e-artes': 'Cultura e artes',
        'esportes': 'Esportes',
        'evento-cientifico': 'Evento científico',
        'evento-cientifico-biologicas': 'Evento científico - biológicas',
        'evento-cientifico-exatas': 'Evento científico - exatas',
        'evento-cientifico-humanas': 'Evento científico - humanas',
        'institucional': 'Institucional',
        'outros': 'Outros'
    },

    defaults: {
        selectedEventTypes: _.keys(eventTypes)
    }
});
