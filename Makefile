.PHONY: lint format

lint:
	@echo "Running linter..."
	@cd goals
	@npm run lint
	@cd ../
	@cd server
	@bun run lint

format:
	@echo "Running formatter..."
	@cd goals
	@npm run format
	@cd ../
	@cd server
	@bun run format
