.PHONY: migrate data

build:
	docker compose up --build

migrate:
	docker compose exec web-api sh -c "npm run migrate"

data:
	docker compose exec web-api sh -c "npm run data"

e2e:
	docker compose exec web-api sh -c "npm run test:e2e --detectOpenHandles"
