# Project NanoFighter

Jogo web de combate a bactérias para adolescentes e jovens adultos. Funciona no navegador desktop e smartphone, sem backend.

## Pré-requisitos
- Node.js (v18+)
- npm

## Instalação
```bash
npm install
```

## Execução em Desenvolvimento
Inicia o servidor HTTP local necessário para carregamento de recursos e CSVs via fetch:
```bash
npm run dev
```

## Testes
Executa a suíte de testes com Vitest:
```bash
npm test
```

Para executar em modo contínuo (watch):
```bash
npm run test:watch
```

## Build para Produção
Gera os arquivos estáticos na pasta `dist/`:
```bash
npm run build
```
Para visualizar a versão de produção:
```bash
npm run preview
```
