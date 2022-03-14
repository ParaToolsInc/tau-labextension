#!/usr/bin/env bash

sudo apt-get update 
sudo apt-get install -y build-essential
sudo apt-get install -y wget vim

wget --quiet https://repo.anaconda.com/miniconda/Miniconda3-latest-Linux-x86_64.sh -O ~/miniconda.sh
/bin/bash ~/miniconda.sh -b -p /home/conda

export PATH=/home/conda/bin:$PATH

#conda install -y -c conda-forge nodejs=17.4.0
#conda install -y jupyterlab=3.2.9

#jlpm
#jlpm run build

#conda install -y -c conda-forge conda-build
#conda build -c conda-forge jupyterlab_tau_commander/recipe
#cp /home/conda/conda-bld/noarch/jupyterlab_tau_commander-0.1.0-py_0.tar.bz2 /home/tau_labextension/
