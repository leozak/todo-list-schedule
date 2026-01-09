from fastapi.testclient import TestClient

class TestRoot:
    """Testes do endpoint raiz."""
    
    def test_get_api_root(self, client: TestClient) -> None:
        """GET / deve retornar status 200."""
        response = client.get("/")
        data = response.json()
        assert response.status_code == 200
    
    def test_get_api_root_status(self, client: TestClient) -> None:
        """GET / deve retornar mensagem de boas-vindas."""
        response = client.get("/")
        data = response.json()
        assert data["status"] == "online"





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