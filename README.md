Microserivce project with NodeJs and React

Frontend is server side React and Next written in typescript

Server side code is Express

Server has Microservices architecture and a service bus to transfer request. Each microservice has it's own database

Server payment method is stripe

Infra as docker and Kubernetes deplloyed with scaffold

Backend as Mongo

cache service using NATS Streaming server for events

to install it create a secret with command kubectl create secret generic jwt-secret --from-literal=jwt=**\*\***
then install skaffold and run skaffold dev
