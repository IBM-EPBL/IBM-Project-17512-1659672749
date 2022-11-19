import time
from locust import HttpUser, TaskSet, task, between


class MainClassTest(HttpUser):
    @task
    def JobsPage(self):
        self.client.get('/jobs')

    @task(2)
    def LoginPage(self):
        self.client.get('/login')
    wait_time = between(5, 10)