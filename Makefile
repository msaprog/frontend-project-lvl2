install: # установить зависимости
	npm ci

test: # запуск игры
	NODE_OPTIONS=--experimental-vm-modules npx jest

test-coverage:
	NODE_OPTIONS=--experimental-vm-modules npx jest --coverage

publish: #  
	npm publish --dry-run

lint: # Запуск Eslint с исправлениями
	npx eslint --fix .

brain-calc: # Запуск игры
	node bin/brain-cals.js

brain-even: # Запуск игры
	node bin/brain-even.js

brain-gcd: # Запуск игры
	node bin/brain-gcd.js

brain-progression: # Запуск игры
	node bin/brain-progression.js

brain-prime: # Запуск игры
	node bin/brain-prime.js