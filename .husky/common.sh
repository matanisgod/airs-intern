# https://github.com/typicode/husky/issues/850#:~:text=I%20remember%20this,husky/common.sh%3A
command_exists () {
    command -v "$1" >/dev/null 2>&1
  }

# Windows 10, Git Bash and Yarn workaround
if command_exists winpty && test -t 1; then
    exec < /dev/tty
fi
