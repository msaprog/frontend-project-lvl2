install: # установить зависимости
	npm ci

test: # запуск игры
	NODE_OPTIONS=--experimental-vm-modules npx jest

test-coverage: # Отладить, не работает	NODE_OPTIONS=--experimental-vm-modules npx jest -- --coverage --coverageProvider=v8
	NODE_OPTIONS=--experimental-vm-modules npx jest --coverage

publish: #  
	npm publish --dry-run

lint: # Запуск Eslint с исправлениями
	npx eslint --fix .