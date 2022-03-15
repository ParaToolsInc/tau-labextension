import os
import sys
from jupyterlab import labextensions


def main():
    os.environ['JUPYTERLAB_DIR'] = os.path.join(sys.prefix, 'share', 'jupyter', 'tau_commander')
    labextensions.BaseExtensionApp.app_dir.default_value = os.environ['JUPYTERLAB_DIR']
    labextensions.main()
    
if __name__ == '__main__':
    sys.exit(main())
