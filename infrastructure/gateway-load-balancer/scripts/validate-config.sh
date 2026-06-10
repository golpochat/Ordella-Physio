#!/bin/bash
echo "Validating Traefik configuration..."
traefik check --configFile=traefik.yml
