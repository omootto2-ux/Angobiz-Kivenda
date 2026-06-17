# Estrutura do Projeto Angobiz-Kivenda

## Organização das Pastas

```
angobiz-kivenda/
│
├── src/
│   ├── pages/              # Arquivos HTML das páginas
│   │   ├── index.html
│   │   ├── home.html
│   │   ├── login.html
│   │   ├── cadastro.html
│   │   ├── mercado.html
│   │   └── ...
│   │
│   ├── styles/             # Arquivos CSS
│   │   ├── global.css      # Estilos globais
│   │   ├── home.css
│   │   ├── login.css
│   │   ├── mercado.css
│   │   └── ...
│   │
│   ├── scripts/            # Arquivos JavaScript
│   │   ├── global.js       # Funcionalidades globais
│   │   ├── api.js          # Integração com API
│   │   ├── header.js       # Componente cabeçalho
│   │   ├── footer.js       # Componente rodapé
│   │   ├── pages/          # Scripts específicos de páginas
│   │   │   ├── home_page.js
│   │   │   ├── login_page.js
│   │   │   └── ...
│   │   └── utils/          # Funções utilitárias
│   │       ├── carrinho_sync.js
│   │       ├── forms_page.js
│   │       └── ...
│   │
│   ├── components/         # Componentes reutilizáveis
│   │   ├── header.js
│   │   ├── footer.js
│   │   ├── navbar.js
│   │   └── ...
│   │
│   └── assets/             # Recursos estáticos
│       ├── images/
│       ├── icons/
│       └── fonts/
│
├── docs/                   # Documentação do projeto
│   ├── ESTRUTURA.md
│   ├── GUIA_DESENVOLVIMENTO.md
│   └── API.md
│
├── README.md               # Documentação principal
├── .gitignore
└── package.json            # (opcional) dependências do projeto
```

## Descrição das Pastas

### `src/pages/`
Contém todos os arquivos HTML das páginas da aplicação:
- `index.html` - Página inicial
- `home.html` - Página home
- `login.html` - Página de login
- `cadastro.html` - Páginas de cadastro
- `mercado.html` - Páginas de marketplace

### `src/styles/`
Todos os arquivos CSS organizados:
- `global.css` - Estilos compartilhados por toda a aplicação
- Arquivos CSS específicos para cada página

### `src/scripts/`
JavaScript organizado por funcionalidade:
- `global.js` - Código que roda em todas as páginas
- `api.js` - Comunicação com backend
- `pages/` - Scripts específicos de cada página
- `utils/` - Funções utilitárias

### `src/components/`
Componentes reutilizáveis:
- `header.js`
- `footer.js`
- Outros componentes compartilhados

### `src/assets/`
Recursos estáticos do projeto

### `docs/`
Documentação do projeto

## Próximos Passos

1. Mover os arquivos HTML para `src/pages/`
2. Mover os arquivos CSS para `src/styles/`
3. Mover os arquivos JavaScript para `src/scripts/`
4. Atualizar os caminhos nos arquivos HTML (links aos CSS e scripts)

---
**Data de criação da estrutura:** 2026-06-17
