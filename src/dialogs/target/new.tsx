import React from 'react';
import ReactDOM from 'react-dom';

import { Dialog } from '@jupyterlab/apputils';
import { Widget } from '@lumino/widgets';

const writeNewBody = () => {
  return (
    <React.Fragment>
      <form className='tau-Dialog-form'>
        <label>
          Name:
          <br/>
          <input className='tau-Dialog-name' type='text' name='name' />
        </label>
        <br/><br/>
        <label>
          Host OS:
          <select defaultValue='Linux' name='hostOS'>
          <option value='Darwin'>Darwin</option>
          <option value='Linux'>Linux</option>
          <option value='CNK'>CNK</option>
          <option value='CNL'>CNL</option>
          <option value='Android'>Android</option>
          </select>
        </label>
        <label>
          Host Arch:
          <select defaultValue='x86_64' name='hostArch'>
          <option value='x86_64'>x86_64</option>
          <option value='KNC'>KNC</option>
          <option value='KNL'>KNL</option>
          <option value='BGL'>BGL</option>
          <option value='BGP'>BGP</option>
          <option value='BGQ'>BGQ</option>
          <option value='IBM64'>IBM64</option>
          <option value='ppc64'>ppc64</option>
          <option value='ppc64le'>ppc64le</option>
          <option value='aarch32'>aarch32</option>
          <option value='aarch64'>aarch64</option>
          </select>
        </label>
        <label>
          Host Compilers:
          <select defaultValue='GNU' name='hostCompiler'>
          <option value='Apple'>Apple</option>
          <option value='Arm'>Arm</option>
          <option value='bluegene'>BlueGene</option>
          <option value='Cray'>Cray</option>
          <option value='GNU'>GNU</option>
          <option value='IBM'>IBM</option>
          <option value='Intel'>Intel</option>
          <option value='PGI'>PGI</option>
          <option value='System'>System</option>
          </select>
        </label>
        <label>
          MPI Compilers:
          <select defaultValue='System' name='mpiCompiler'>
          <option value='Cray'>Cray</option>
          <option value='IBM'>IBM</option>
          <option value='Intel'>Intel</option>
          <option value='System'>System</option>
          </select>
        </label>
        <label>
          SHMEM Compilers:
          <select defaultValue='OpenSHMEM' name='shmemCompiler'>
          <option value='Cray'>Cray</option>
          <option value='OpenSHMEM'>OpenSHMEM</option>
          <option value='SOS'>SOS</option>
          </select>
        </label>
        </form>
    </React.Fragment>
  )
}

class DialogBody extends Widget {
  constructor(domElement: HTMLElement) {
    super({node : domElement});
  }

  getValue() {
    const response = this.node.querySelectorAll('input, select');
    const responseDict: { [id: string] : string } = {};
    Object.entries(response).map((resp) => {
      const elem = resp[1];
      if (elem.tagName === 'INPUT') {
        const inputElem = elem as HTMLInputElement;
        responseDict[inputElem.name] = inputElem.value;
      } else {
        const selectElem = elem as HTMLSelectElement;
        responseDict[selectElem.name] = selectElem.value;
      }
    });
    return responseDict;
  }
}

export const newTargetDialog = (props: Dashboard.Target) => {
  const body = document.createElement('div');
  ReactDOM.render(writeNewBody(), body);

  const dialog = new Dialog({
    title: `New Target`,
    body: new DialogBody(body),
    buttons: [
      Dialog.cancelButton({ label: 'Cancel' }),
      Dialog.okButton({ label: 'Submit' })
    ]
  });

  dialog.addClass('tau-Dialog-body');
  dialog.launch()
    .then(response => {
      if (response.button.label === 'Submit') {
        const name = response.value!.name;
        const hostOS = response.value!.hostOS;
        const hostArch = response.value!.hostArch;
        const hostCompiler = response.value!.hostCompiler;
        const mpiCompiler = response.value!.mpiCompiler;
        const shmemCompiler = response.value!.shmemCompiler;
        props.kernelExecute(`new_target('${props.projectName}', '${name}', '${hostOS}', '${hostArch}', '${hostCompiler}', '${mpiCompiler}', '${shmemCompiler}')`)
          .then((result) => {
            if (result) {
              props.updateProject(props.projectName);
            }
          });
      }
      dialog.dispose();
    });

}

namespace Dashboard {
  export interface Target {
    projectName: string;
    kernelExecute: (code: string) => Promise<any>;
    updateProject: (project: string) => void;
  }
}
