from fastapi.testclient import TestClient

class TestTasks:
    """Testes dos endpoints de tarefas."""
    
    def test_get_empty_list_tasks(self, client: TestClient) -> None:
        """GET /tasks/{username} deve retornar lista vazia inicialmente."""
        response = client.get("/tasks/" + "testuser")
        assert response.status_code == 200
        assert response.json().get("tasks") == []
    
    def test_post_create_task(self, client, example_task):
        """POST /tasks/create deve criar uma nova tarefa."""
        response = client.post("/tasks/create", json=example_task)
        assert response.status_code == 201
        
        data = response.json()
        assert data["title"] == example_task["title"]
        assert data["description"] == example_task["description"]
        assert data["priority"] == example_task["priority"]
        assert data["done"] == example_task["done"]
        assert data["pin"] == example_task["pin"]
        assert data["username"] == example_task["username"]
        assert data["date"] == example_task["date"]
    
    def test_post_update_task(self, client, example_task):
        """PUT /tasks/update/{id} deve atualizar a tarefa."""
        # Cria tarefa
        create_response = client.post("/tasks/create", json=example_task)
        task_id = create_response.json()["id"]
        
        # Atualiza tarefa
        response = client.put(
            f"/tasks/update/{task_id}",
            json={
                "title": "Updated title",
                "description": "Updated description",
                "priority": 2,
                "pin": True,
                "done": True,
                "date": "2022-01-01",
            },
        )
        assert response.status_code == 200
        assert response.json()["title"] == "Updated title"
        assert response.json()["description"] == "Updated description"
        assert response.json()["priority"] == 2
        assert response.json()["pin"] == True
        assert response.json()["done"] == True
        assert response.json()["date"] == "2022-01-01"
    
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