.PHONY: migrate data e2e run stop

build:
	docker compose up --build

start:
	docker compose up

stop:
	docker compose down

migrate:
	docker compose exec web-api sh -c "npm run migrate"

data: migrate
	docker compose exec web-api sh -c "npm run data"

e2e:
	docker compose exec web-api sh -c "npm run test:e2e"
