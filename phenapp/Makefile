basic-model:
	sequelize model:generate --name $(name) user --attributes email:string
migrate:
	sequelize db:migrate
down:
	sequelize db:migrate:undo
down-all:
	sequelize db:migrate:undo:all
down-all-to:
	sequelize db:migrate:undo:all --to $(limit)
test:
	for number in $(list) ; do \
        echo $$number ; \
    done
basic-model2:
	att = "";
	for i in range(len($(attrs))) ; do \
        att = att+ attrs[i]+":"+ ; \
    done
	sequelize model:generate --name $(name) user --attributes email:string

