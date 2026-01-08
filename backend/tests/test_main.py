import pytest


class TestRoot:
    """Testes do endpoint raiz."""
    
    def test_root_retorna_200(self, client):
        """GET / deve retornar status 200."""
        response = client.get("/")
        assert response.status_code == 200
    
#     def test_root_retorna_mensagem(self, client):
#         """GET / deve retornar mensagem de boas-vindas."""
#         response = client.get("/")
#         data = response.json()
#         assert "status" in data or "message" in data


# class TestTarefas:
#     """Testes dos endpoints de tarefas."""
    
#     def test_listar_tarefas_vazio(self, client):
#         """GET /tarefas deve retornar lista vazia inicialmente."""
#         response = client.get("/tarefas")
#         assert response.status_code == 200
#         assert response.json() == []
    
#     def test_criar_tarefa(self, client, tarefa_exemplo):
#         """POST /tarefas deve criar uma nova tarefa."""
#         response = client.post("/tarefas", json=tarefa_exemplo)
#         assert response.status_code == 201
        
#         data = response.json()
#         assert data["titulo"] == tarefa_exemplo["titulo"]
#         assert "id" in data
    
#     def test_buscar_tarefa_por_id(self, client, tarefa_exemplo):
#         """GET /tarefas/{id} deve retornar a tarefa."""
#         # Cria tarefa
#         create_response = client.post("/tarefas", json=tarefa_exemplo)
#         tarefa_id = create_response.json()["id"]
        
#         # Busca tarefa
#         response = client.get(f"/tarefas/{tarefa_id}")
#         assert response.status_code == 200
#         assert response.json()["titulo"] == tarefa_exemplo["titulo"]
    
#     def test_buscar_tarefa_inexistente(self, client):
#         """GET /tarefas/{id} deve retornar 404 se não existir."""
#         response = client.get("/tarefas/99999")
#         assert response.status_code == 404
    
#     def test_atualizar_tarefa(self, client, tarefa_exemplo):
#         """PATCH /tarefas/{id} deve atualizar a tarefa."""
#         # Cria tarefa
#         create_response = client.post("/tarefas", json=tarefa_exemplo)
#         tarefa_id = create_response.json()["id"]
        
#         # Atualiza tarefa
#         response = client.patch(
#             f"/tarefas/{tarefa_id}",
#             json={"done": True}
#         )
#         assert response.status_code == 200
#         assert response.json()["done"] == True
    
#     def test_deletar_tarefa(self, client, tarefa_exemplo):
#         """DELETE /tarefas/{id} deve remover a tarefa."""
#         # Cria tarefa
#         create_response = client.post("/tarefas", json=tarefa_exemplo)
#         tarefa_id = create_response.json()["id"]
        
#         # Deleta tarefa
#         response = client.delete(f"/tarefas/{tarefa_id}")
#         assert response.status_code == 204
        
#         # Verifica que foi deletada
#         get_response = client.get(f"/tarefas/{tarefa_id}")
#         assert get_response.status_code == 404


# class TestValidacoes:
#     """Testes de validação de dados."""
    
#     def test_criar_tarefa_sem_titulo(self, client):
#         """POST /tarefas sem título deve retornar erro."""
#         response = client.post("/tarefas", json={"descricao": "Sem título"})
#         assert response.status_code == 422
    
#     def test_criar_tarefa_titulo_vazio(self, client):
#         """POST /tarefas com título vazio deve retornar erro."""
#         response = client.post("/tarefas", json={"titulo": ""})
#         assert response.status_code == 422