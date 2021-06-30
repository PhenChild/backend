build:
	docker build -t postgres:12.7 .
compose:
	docker-compose up --build -d
stop:
	docker-compose stop
start:
	docker-compose start
clear:
	make stop
	docker-compose rm -f && docker volume prune -f
prune:
	docker system prune -af
logs:
	docker-compose logs -f --tail 20
restart:
	docker restart postgres_phen/ && docker logs -f postgres_phen/ --tail $(line)
