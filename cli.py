import functools
import json
import logging
import sys
import time
import uuid
import subprocess
import os

import requests


short_name = "mermaid"
local_path = f"{os.environ['HOME']}/github.com/loicbourgois/mermaid-live-editor"


logging.basicConfig(
    format='GMT %(asctime)s %(levelname)7s | %(message)s',
    level=logging.INFO,
)
logging.Formatter.converter = time.gmtime
logger = logging.getLogger(short_name)


class formattings:
    GREEN = '\033[92m'
    RED = '\033[91m'
    BLUE = '\033[94m'
    YELLOW = '\033[93m'
    GREY = '\033[90m'
    ENDC = '\033[0m'
def grey(message):
    return f"{formattings.GREY}{message}{formattings.ENDC}"
def blue(message):
    return f"{formattings.BLUE}{message}{formattings.ENDC}"
def green(message):
    return f"{formattings.GREEN}{message}{formattings.ENDC}"
def red(message):
    return f"{formattings.RED}{message}{formattings.ENDC}"
def yellow(message):
    return f"{formattings.YELLOW}{message}{formattings.ENDC}"


def timeit(method):
    @functools.wraps(method)
    def timeit_(*args, **kw):
        spaces = ""
        frame = sys._getframe().f_back
        try:
            while frame.f_code.co_name != "<module>":
                frame = frame.f_back
                spaces += " "
        except:
            pass
        logger.debug(grey(f'{spaces}{method.__name__}() - begin - {json.dumps(args)} - {json.dumps(kw)}'))
        ts = time.time()
        result = method(*args, **kw)
        te = time.time()
        if 'log_time' in kw:
            name = kw.get('log_name', method.__name__.upper())
            kw['log_time'][name] = int(te - ts)
        else:
            logger.debug(grey(f'{spaces}{method.__name__}() - end - {(te - ts):2.3f}s'))
        return result
    return timeit_


stdouts = {}
def runcmd(command: str, quiet=False, shell=False):
    return runcmd_list(command.split(" "), quiet, shell=shell)
def runcmd_list(command: list, quiet=False, shell=False):
    if not quiet:
        for line in " ".join(command).split("\n"):
            logger.info("> " + line)
    def stream_process(process, command_id):
        go = process.poll() is None
        for line in process.stdout:
            l = os.linesep.join([s for s in line.decode("UTF8").splitlines() if s])
            if not quiet:
                logger.info(grey(l))
            stdouts[command_id].append(l)
        return go
    command_id = str(uuid.uuid4())
    stdouts[command_id] = []
    process = subprocess.Popen(command, shell=False, stdout=subprocess.PIPE, stderr=subprocess.STDOUT)
    while stream_process(process, command_id):
        time.sleep(0.1)
    assert process.returncode == 0, f"invalid returncode: expected 0, got {process.returncode} - command: {command}"
    return stdouts[command_id]


def help():
    logger.info("commands:")
    for key, command in commands.items():
        if key is not None:
            logger.info(f"    {short_name} {command['doc']}")
            if command.get("example"):
                logger.info(f"      example: {command['example']}")


def invalid_command():
    logger.error(red("invalid command")+f": {' '.join(sys.argv)}")
    help()
    sys.exit(1)


def status():
    repos = [
        {
            'path': local_path,
        },
    ]
    for repo in repos:
        runcmd(f"git -C {repo['path']} fetch --all")
        runcmd(f"git -C {repo['path']} status")


def push():
    try:
        runcmd(f"git -C {local_path} add .")
        runcmd(f"git -C {local_path} commit -m up")
        runcmd(f"git -C {local_path} push")
    except Exception as e:
        logger.error(e)


def readme():
    runcmd(f"open {local_path}/README.md")


def cli():
    runcmd(f"open {local_path}/cli.py")


def dev():
    try:
        runcmd(f"yarn --cwd {local_path} dev")
    except Exception as e:
        logger.error(e)
        logger.info("Try "+green("mermaid install"))


def init():
    runcmd(f"yarn --cwd {local_path} install")


def release():
    runcmd(f"yarn --cwd {local_path} release")


commands = {
    'help': {
        'func': help,
        'doc': 'help',
    },
    'readme': {
        'func': readme,
        'doc': 'readme',
    },
    'cli': {
        'func': cli,
        'doc': 'cli',
    },
    'status': {
        'func': status,
        'doc': 'status',
    },
    'push': {
        'func': push,
        'doc': 'push',
    },
    'init': {
        'func': init,
        'doc': 'init',
    },
    'dev': {
        'func': dev,
        'doc': 'dev',
    },
    'release': {
        'func': release,
        'doc': 'release',
    },
    None: {
        'func': invalid_command,
    }
}


@timeit
def main():
    if len(sys.argv) >= 2:
        command = sys.argv[1]
        try:
            commands[command]['func'](*sys.argv[2:])
        except Exception as e:
            logger.error(e)
            invalid_command()
    else:
        invalid_command()


if __name__ == '__main__':
    main()
