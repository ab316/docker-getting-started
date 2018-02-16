@echo off

echo "Deleting existing components"

kubectl delete deployment consumer
kubectl delete deployment publisher
kubectl delete deployment rabbit
kubectl delete deployment postgres
kubectl delete service consumer
kubectl delete service rabbit
kubectl delete service postgres
kubectl delete configMap config-map
kubectl delete secret postgres

echo "Creating existing components"
kubectl create -f ./config/
kubectl create -f ./deployments/

echo "Components created successfully"

start "" http://minikube:30001

pause