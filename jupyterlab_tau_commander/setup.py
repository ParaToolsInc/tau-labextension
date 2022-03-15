# Copyright (c) Jupyter Development Team.
# Distributed under the terms of the Modified BSD License.

from setuptools import setup

setup_args = dict(
    name             = 'jupyterlab_tau_commander',
    description      = 'A JupyterLab Extension for Tau Commander.',
    version          = '1.0.0',
    packages         = ['jupyterlab_tau_commander', ],
    entry_points     = {'console_scripts': [
                            'tau_commander-lab = jupyterlab_tau_commander.labapp:main',
                            'tau_commander-labextension = jupyterlab_tau_commander.labextensionapp:main',
                        ]},
    author           = 'Cameron Durbin',
    author_email     = 'cfd@paratools.com',
    url              = 'https://github.com/platinumcd/jupyterlab_tau_commander',
    install_requires = ['jupyterlab', ],
    license          = 'BSD 3-Clause',
    platforms        = "Linux, Mac OS X, Windows",
    keywords         = ['jupyterlab', 'jupyter', 'conda'],
    classifiers      = [
        'Intended Audience :: Developers',
        'Intended Audience :: System Administrators',
        'Intended Audience :: Science/Research',
        'License :: OSI Approved :: BSD 3-Clause License',
        'Programming Language :: Python',
        'Programming Language :: Python :: 2.7',
        'Programming Language :: Python :: 3',
        'Programming Language :: Python :: 3.5',
        'Programming Language :: Python :: 3.6',
    ],
)

setup(**setup_args)
