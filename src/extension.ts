import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {
  console.log('Extension "lineshift" is now active!');

  // Informa o usuário que é recomendado ativar números relativos
  vscode.window
    .showInformationMessage(
      'This extension works best with relative line numbers. Would you like to enable them?',
      'Yes',
      'Now'
    )
    .then((selection) => {
      if (selection === 'Yes') {
        vscode.workspace
          .getConfiguration('editor')
          .update('lineNumbers', 'relative', vscode.ConfigurationTarget.Global);
      }
    });

  const operators = ['+', '-', 'j', 'k'];
  // Verifica se há apenas um operador (início ou fim da string)
  const hasSingleOperator = (str: string): boolean => {
    return !(
      operators.includes(str.charAt(0)) && operators.includes(str.charAt(str.length - 1))
    );
  };
  // Regex para validar o input
  const regex = /^([+-]|[jk])?\d+([+-]|[jk])?$/i;

  // Converte o input para número
  const parseLineJump = (str: string): number => {
    const sign = str.charAt(0) || str.charAt(str.length - 1);
    switch (sign) {
      case '+':
      case 'k':
        return parseInt(str.replace(/\D/g, ''), 10);
      case '-':
      case 'j':
        return -parseInt(str.replace(/\D/g, ''), 10);
      default:
        return parseInt(str, 10);
    }
  };

  // Registra o comando principal da extensão
  const disposable = vscode.commands.registerCommand('lineshift.jump', () => {
    const editor = vscode.window.activeTextEditor;
    if (!editor) {
      return vscode.window.showInformationMessage('No active editor found!');
    }

    const currentLine = editor.selection.active.line;
    const upperBound = currentLine; // linhas acima disponíveis
    const lowerBound = editor.document.lineCount - currentLine - 1; // linhas abaixo disponíveis

    vscode.window
      .showInputBox({
        placeHolder: 'Type the number of lines you want to jump',
        validateInput(input) {
          if (input === '') return undefined; // input vazio é válido (não faz nada)

          const hasOperator =
            operators.includes(input.charAt(0)) ||
            operators.includes(input.charAt(input.length - 1));
          const lineJump = parseLineJump(input);
          const target = hasOperator ? currentLine + lineJump : lineJump;

          // Validação de formato e operadores
          if (!regex.test(input) || (hasOperator && !hasSingleOperator(input))) {
            return 'Invalid input: must be a number with at most one sign (+, -, j, k)';
          }

          // Validação de limites do documento
          if (target < 0 || target >= editor.document.lineCount) {
            return `Out of range: you can go back up to ${upperBound} lines or forward ${lowerBound} lines.`;
          }

          return undefined; // válido
        },
      })
      .then((input) => {
        if (!input) return;

        const lineJump = parseLineJump(input);
        const target =
          operators.includes(input.charAt(0)) ||
          operators.includes(input.charAt(input.length - 1))
            ? currentLine + lineJump // input relativo
            : lineJump; // input absoluto

        console.log(`Movendo cursor para a linha ${target}`);

        const newPosition = new vscode.Position(target, 0);
        editor.selection = new vscode.Selection(newPosition, newPosition);
        editor.revealRange(new vscode.Range(newPosition, newPosition));
      });
  });
  context.subscriptions.push(disposable);
}
