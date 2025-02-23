### 📌 **Documentação de Requisitos**  

#### 📝 **Requisitos Funcionais (RF)**  
- [ ] **RF01** - Deve ser possível criar um usuário.  
- [ ] **RF02** - Deve ser possível identificar o usuário entre as requisições.  
- [ ] **RF03** - Deve ser possível registrar uma refeição com as seguintes informações:  
  - [ ] Nome  
  - [ ] Descrição  
  - [ ] Data e Hora  
  - [ ] Está dentro ou não da dieta  
- [ ] **RF04** - As refeições devem ser relacionadas a um usuário.  
- [ ] **RF05** - Deve ser possível editar uma refeição, podendo alterar todos os dados.  
- [ ] **RF06** - Deve ser possível apagar uma refeição.  
- [ ] **RF07** - Deve ser possível listar todas as refeições de um usuário.  
- [ ] **RF08** - Deve ser possível visualizar uma única refeição.  
- [ ] **RF09** - Deve ser possível recuperar as métricas de um usuário, incluindo:  
  - [ ] Quantidade total de refeições registradas.  
  - [ ] Quantidade total de refeições dentro da dieta.  
  - [ ] Quantidade total de refeições fora da dieta.  
  - [ ] Melhor sequência de refeições dentro da dieta.  

---

#### 📌 **Regras de Negócio (RN)**  
- [ ] **RN01** - O usuário só pode visualizar, editar e apagar as refeições que ele mesmo criou.  

---

#### 🛠 **Requisitos Não Funcionais (RNF)**  
- [ ] **RNF01** - O sistema deve ser seguro e garantir que cada usuário só acesse suas próprias refeições.  
- [ ] **RNF02** - A identificação do usuário entre as requisições deve ser feita de forma segura (por exemplo, via autenticação com token).  
- [ ] **RNF03** - O tempo de resposta das requisições deve ser otimizado para garantir uma boa experiência do usuário.  
