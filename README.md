### 📌 **Documentação de Requisitos**  

#### 📝 **Requisitos Funcionais (RF)**  
- [X] **RF01** - Deve ser possível criar um usuário.  
- [X] **RF02** - Deve ser possível identificar o usuário entre as requisições.  
- [X] **RF03** - Deve ser possível registrar uma refeição com as seguintes informações:  
  - [X] Nome  
  - [X] Descrição  
  - [X] Data e Hora  
  - [X] Está dentro ou não da dieta  
- [X] **RF04** - As refeições devem ser relacionadas a um usuário.  
- [X] **RF05** - Deve ser possível editar uma refeição, podendo alterar todos os dados.  
- [X] **RF06** - Deve ser possível apagar uma refeição.  
- [X] **RF07** - Deve ser possível listar todas as refeições de um usuário.  
- [X] **RF08** - Deve ser possível visualizar uma única refeição.  
- [ ] **RF09** - Deve ser possível recuperar as métricas de um usuário, incluindo:  
  - [X] Quantidade total de refeições registradas.  
  - [X] Quantidade total de refeições dentro da dieta.  
  - [X] Quantidade total de refeições fora da dieta.  
  - [X] Melhor sequência de refeições dentro da dieta.  

---

#### 📌 **Regras de Negócio (RN)**  
- [X] **RN01** - O usuário só pode visualizar, editar e apagar as refeições que ele mesmo criou.  

---

#### 🛠 **Requisitos Não Funcionais (RNF)**  
- [X] **RNF01** - O sistema deve ser seguro e garantir que cada usuário só acesse suas próprias refeições.  
- [x] **RNF02** - A identificação do usuário entre as requisições deve ser feita de forma segura (por exemplo, via autenticação com token).  
- [x] **RNF03** - O tempo de resposta das requisições deve ser otimizado para garantir uma boa experiência do usuário.  
