#!/bin/bash

SC_VERSION=1.0.0
SC_CODENAME="wormhole"
COLOR_RESET="\033[0m"
COLOR_GREEN="\033[1;32m"
COLOR_RED="\033[1;31m"
COLOR_YELLOW="\033[1;33m"
COLOR_BLUE="\033[1;34m"
COLOR_CYAN="\033[1;36m"

function start() {
    if [ ! -d "src" ]; then
        echo -e "${COLOR_RED}src directory not found, cannot continue${COLOR_RESET}"
        exit 1
    fi

    mkdir -p public

    cp -r src/* public/
    echo -e "${COLOR_GREEN}Created public dir and copied files successfully${COLOR_RESET}"
}

function stop() {
    if [ -d "public" ]; then
        rm -rf public
        echo -e "${COLOR_GREEN}Deleted public directory${COLOR_RESET}"
    else
        echo -e "${COLOR_RED}No public directory to delete${COLOR_RESET}"
    fi
}

function help() {
    echo -e "${COLOR_GREEN}self version:${COLOR_RESET} ${COLOR_BLUE}${SC_VERSION} ${SC_CODENAME}${COLOR_RESET}"
    echo -e "${COLOR_BLUE}Usage:${COLOR_RESET} ./self [command]\n"
    echo -e "${COLOR_YELLOW}Commands:${COLOR_RESET}"
    echo -e "  ${COLOR_CYAN}help${COLOR_RESET}                  Shows this help message."
    echo -e "  ${COLOR_CYAN}start${COLOR_RESET}                 Copies files to public directory."
    echo -e "  ${COLOR_CYAN}stop${COLOR_RESET}                  Removes public directory."
}

case "$1" in
    start)
        start
        ;;
    stop)
        stop
        ;;
    help)
        help
        ;;
    *)
        echo -e "${COLOR_RED}Invalid command: $1\n${COLOR_RESET}"
        help
        exit 1
        ;;
esac