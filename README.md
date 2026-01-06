# To-do List Schedule

## Bibliotecas Utilizadas

### Frontend

- react-icons: icones usados na aplicação.
- tailwindcss: framework css utilizado na aplicação.
- class-variance-authority: framework css utilizado na aplicação.

### Backend

- uvicorn: servidor web utilizado na aplicação.
- fastapi: framework utilizado na aplicação.
- sqlalchemy: ORM utilizado na aplicação.
- pydantic: framework utilizado na aplicação.c

## Checklist

- **Login**

  - [*] O usuário pode se registrar
  - [*] O usuário pode fazer login
  - [ ] O usuário pode alterar a senha

- **Usar Context Provider para fornecer informações globais**

  - [ ] Informações do usuário

- **Implementar a biblioteca para criar o layout dos componentes reutilizáveis**

  - [ ] `Button`
  - [ ] `Postits`

- **Carregamento assincrono da aplicação**

  - [ ] Construir um componente de loading para a aplicação
  - [ ] Carregar somente os comonentes de registro e login de usuários
  - [ ] Carregar componentess `Sidebar` e `Schedule` somente depois de exibir o componente de login de usuário

## Informações Extras

- `useMemo()`

  ;Guarda o último valor até que os dados sejam alterados.

  ```js
  const memoizedValue = useMemo(() => instruction(dependency), [dependency]);
  ```

- Component Suspense
  Mostra o conteudo de `fallback` enquanto o conteudo principal não carrega.

  ```js
  import { Suspense } from "react";
  <Suspense fallback={<Loading />}>
    <ProfileDetails />
  </Suspense>;
  ```
