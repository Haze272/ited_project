import {NodeTree} from './node-tree';

export class ITEDConsole {
    readonly history: HTMLElement;
    readonly input: HTMLElement;
    nodeTree: NodeTree;

    constructor(_input: HTMLElement) {
        this.input = _input;
        this.history = document.getElementById('history') as HTMLElement;

        this.nodeTree = new NodeTree();  //  Изменить эту строку, если в вашем классе конструктор принимает параметры
    }

    public focusAndMoveCursorToTheEnd(): void {
        this.input.focus();

        const range: Range = document.createRange();
        const selection = window.getSelection() as Selection;
        const { childNodes } = this.input;
        const lastChildNode = childNodes && childNodes.length - 1;

        range.selectNodeContents(lastChildNode === -1 ? this.input : childNodes[lastChildNode]);
        range.collapse(false);

        selection.removeAllRanges();
        selection.addRange(range);
    }

    public handleCommand(command: String): void {
        const line = document.createElement('DIV');
        line.textContent = `> ${ command }`;
        this.history.appendChild(line);

        const commandMembers = command.split(" ");

        const result: HTMLElement = document.createElement('DIV');

        switch(commandMembers[0]) {
            case 'test': {
                result.textContent = `Test command works!`;
                break;
            }
            case 'ping': {
                result.textContent = `pong`;
                break;
            }
            case 'time': {
                result.textContent = Date();
                break;
            }
            case 'reverse': {
                result.textContent = this.nodeTree.reverse(commandMembers[1]);
                break;
            }
            case 'wallet': {
                switch(commandMembers[1]) {
                    case 'balance': {
                        switch(commandMembers[2]) {
                            case 'show': {
                                result.textContent = String(this.nodeTree.balance());
                                break;
                            }
                            case 'change': {
                                this.nodeTree.changeBalance(Number(commandMembers[3]))
                                result.textContent = "Balance changed to " + String(this.nodeTree.balance());
                                break;
                            }
                        }
                        break;
                    }
                }
                break;
            }
            case 'create': {
                switch (commandMembers[1]) {
                    case 'cat': {
                        result.textContent = `Был создан кот по имени ${commandMembers[2]}`;
                        break;
                    }
                    case 'dog': {
                        result.textContent = `Был создан пёс по имени ${commandMembers[2]}`;
                        break;
                    }
                }
                break;
            }
          //  Здесь необходимо обеспечить обработку комманд
        }
        this.history.appendChild(result);
    }
}