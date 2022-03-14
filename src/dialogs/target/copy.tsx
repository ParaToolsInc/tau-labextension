import ReactDOM from 'react-dom';

import { Dialog } from '@jupyterlab/apputils';
import { Widget } from '@lumino/widgets';

const writeCopyBody = (targetName: string) => {
  const copyName = targetName + '_copy';

  return (
    <div>
      <label>
      Name of new target:
        <br/>
        <input className='tau-Dialog-name' type='text' name='name' defaultValue={copyName}/>
      </label>
    </div>
  )
};

class DialogBody extends Widget {
  constructor(domElement: HTMLElement) {
    super({node : domElement});
  }

  getValue() {
    const response = this.node.querySelectorAll('input');
    return Array.from(response);
  }
};

export const copyTargetDialog = (targetName: string, props: Tables.Target) => {

  const body = document.createElement('div');
  ReactDOM.render(writeCopyBody(targetName), body);

  const dialog = new Dialog({
    title: 'Copy Target',
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
        const newName = response.value![0].value;
        props.kernelExecute(`copy_target('${props.projectName}', '${targetName}', '${newName}')`)
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
