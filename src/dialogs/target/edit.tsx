import React from 'react';
import ReactDOM from 'react-dom';

import { Dialog } from '@jupyterlab/apputils';
import { Widget } from '@lumino/widgets';

const writeEditBody = (currentRow: any) => {
  return (
    <React.Fragment>
      <form className='tau-Dialog-form'>
        <label>
          Name:
          <br/>
          <input className='tau-Dialog-name' type='text' name='name' defaultValue={currentRow['Name']} />
        </label>
        <br/><br/>
        <label>
          Host OS:
          <select defaultValue={currentRow['Host OS']} name='hostOS'>
            <option value='Darwin'>Darwin</option>
            <option value='Linux'>Linux</option>
            <option value='CNK'>CNK</option>
            <option value='CNL'>CNL</option>
            <option value='Android'>Android</option>
          </select>
        </label>
        <label>
          Host Arch:
          <select defaultValue={currentRow['Host Arch']} name='hostArch'>
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
          <select defaultValue={currentRow['Host Compilers']} name='hostCompiler'>
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
          <select defaultValue={currentRow['MPI Compilers']} name='mpiCompiler'>
            <option value='Cray'>Cray</option>
            <option value='IBM'>IBM</option>
            <option value='Intel'>Intel</option>
            <option value='System'>System</option>
          </select>
        </label>
        <label>
          SHMEM Compilers:
          <select defaultValue={currentRow['SHMEM Compilers']} name='shmemCompiler'>
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
            if (resp[1].tagName === 'INPUT') {
                const inputElem = elem as HTMLInputElement;
                if (inputElem.type === 'text') {
                        responseDict[inputElem.name] = inputElem.value;
                } else {
                        responseDict[inputElem.name] = inputElem.checked.toString();
                }
            } else {
                const selectElem = elem as HTMLSelectElement;
                responseDict[selectElem.name] = selectElem.value;
            }
        });
        return responseDict;
    }
};

export const editTargetDialog = (currentRow: any, props: Tables.Target) => {
  const body = document.createElement('div');
  ReactDOM.render(writeEditBody(currentRow), body);

  const dialog = new Dialog({
    title: `Edit Target`,
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
        const name = currentRow['Name'];
        const newName = response.value!.name;
        const hostOS = response.value!.hostOS;
        const hostArch = response.value!.hostArch;
        const hostCompiler = response.value!.hostCompiler;
        const mpiCompiler = response.value!.mpiCompiler;
        const shmemCompiler = response.value!.shmemCompiler;
        props.kernelExecute(`edit_target('${props.projectName}', '${name}', '${newName}', '${hostOS}', '${hostArch}', '${hostCompiler}', '${mpiCompiler}', '${shmemCompiler}')`)
          .then((result) => {
            if (result) {
              props.updateProject(props.projectName);
            }
          });
      }
      dialog.dispose();
    });
}

namespace Tables {
  export interface Target {
    projectName: string;
    kernelExecute: (code: string) => Promise<string>;
    updateProject: (projectName: string) => void;
    targets: {[key: string]: any};
  }
}
