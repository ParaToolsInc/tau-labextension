import {
  Dialog
} from '@jupyterlab/apputils';

export const deleteTargetDialog = (targetName: string, props: Tables.Target) => {
  const dialog = new Dialog({
    title: `Delete ${targetName}`,
    body: `Are you sure you want to delete target: ${targetName}?`,
    buttons: [
      Dialog.cancelButton({ label: 'Cancel' }),
      Dialog.warnButton({ label: 'Delete' }),
    ]
  });

  dialog.launch()
    .then(response => {
      if (response.button.label === 'Delete') {
        props.kernelExecute(`delete_target('${targetName}')`)
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
