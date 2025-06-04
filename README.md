# 💸 PayFlow - Frontend

Aplicativo mobile para **gestão de transações financeiras pessoais**, desenvolvido com **React Native**, utilizando **Expo** e estilizado com **NativeWind**.

Este projeto permite que o usuário visualize, registre e gerencie suas transações, promovendo organização e controle financeiro direto no celular.

## ✨ Funcionalidades

- Autenticação com Google
- Listagem de transações pendentes
- Registro de novas transações
- Pagamento e exclusão de transações
- Tela de extrato com histórico de transações quitadas

## 🧪 Tecnologias

- [React Native](https://reactnative.dev/)
- [Expo](https://expo.dev/)
- [NativeWind](https://www.nativewind.dev/) (Tailwind CSS para React Native)
- [Zustand](https://github.com/pmndrs/zustand) (gerenciamento de estado)
- [Axios](https://axios-http.com/) (requisições HTTP)
- [React Navigation](https://reactnavigation.org/)
- [TypeScript](https://www.typescriptlang.org/)

## 🖼️ Telas

- Splash
- Login com Google
- Home (transações)
- Modal de ação (pagar/remover)
- Tela de extrato
- Formulário para nova transação

## 📦 Backend

Este app consome uma API REST desenvolvida em **Java + Spring Boot**, disponível aqui:

🔗 [Repositório Backend](https://github.com/doulgs/Back-Payflow)

## 🚀 Como rodar o projeto

1. Clone este repositório:
   ```bash
   git clone https://github.com/doulgs/Front-Payflow.git
````

2. Acesse o diretório:

   ```bash
   cd payflow-frontend
   ```

3. Instale as dependências:

   ```bash
   npm install
   ```

4. Inicie o projeto:

   ```bash
   npx expo start
   ```

## 🔐 Variáveis de ambiente

Crie um arquivo `.env` na raiz com as seguintes variáveis:

```
API_BASE_URL=http://localhost:8080
```

## 📄 Licença

Este projeto está licenciado sob a [MIT License](LICENSE).

---

Desenvolvido com 💛 por \[doulgs]

```