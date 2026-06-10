#!/bin/bash
echo "Reloading Traefik..."
kubectl rollout restart deployment/traefik -n ordella
