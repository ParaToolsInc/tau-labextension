#!/usr/bin/env bash
$PYTHON -m pip install --no-deps --ignore-installed .

export JUPYTERLAB_DIR=$PREFIX/share/jupyter/tau_commander

# Extensions to install
export NODE_OPTIONS=--max-old-space-size=16000
# Add below the extensions you want to package
jupyter labextension install @jupyter-widgets/jupyterlab-manager --no-build
jupyter labextension install jupyterlab-plotly --no-build
jupyter labextension install jupyterlab-dash --no-build
jupyter labextension install /home/tau_labextension --no-build
jupyter lab build --debug
#jupyter lab clean
