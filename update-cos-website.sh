#!/bin/zsh

# ~/bin/coscli rm cos://ysumc-club-1301539318/ -r -f

# ~/bin/coscli cp ~/Code/website/ysumc.net/docs/.vuepress/dist cos://ysumc-club-1301539318/ -r --routines 64

~/bin/coscli sync ~/Code/website/ysumc.net/docs/.vuepress/dist cos://ysumc-club-1301539318/ -r --delete --routines 64
