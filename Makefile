install: # установить зависимости
	npm ci

test: #  --watchAll
	NODE_OPTIONS=--experimental-vm-modules npx jest

test-coverage: # NODE_OPTIONS=--experimental-vm-modules npx jest -- --coverage --coverageProvider=v8
	NODE_OPTIONS=--experimental-vm-modules npx jest --coverage

publish: #  
	npm publish --dry-run

lint: # Запуск Eslint с исправлениями
	npx eslint --fix .