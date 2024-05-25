RUST_EXIST := $(shell command -v rustc 2> /dev/null)

run:
	@make install-rust
	@make node_modules
	@pnpm tauri dev

node_modules: package.json
	@rm -rf $@ && pnpm install

ifeq ($(RUST_EXIST),)
install-rust:
	@curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh
else
install-rust:
	@echo "skiped install rust"
endif

build:
	@make install-rust
	@make node_modules
	@pnpm tauri build

.PHONY: install-rust run
