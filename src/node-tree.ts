export class NodeTree {
    root: Branch = new Branch("N/A");
    treeStr: string[] = [];

    public create(name: string, parentName?: string): string {
        if (!parentName) {
            this.root = new Branch(name);

            return `Узел ${name} был создан!`;
        } else {

            let parent = this.findBranchByName(this.root, parentName);
            if (parent) {
                parent._children.push(new Branch(name));
                return `Узёл ${name} был создан как потомок узла ${parentName}`;
            } else {
                return `Узел потомк не был найден!`;
            }
        }
    }

    public showTree(): string[] {
        this.treeStr[0] = this.root._name;
        this.makeTreeDiagramm(this.root, 0);
        console.log(this.treeStr)
        return this.treeStr;
    }

    makeTreeDiagramm(branch: Branch, level: number) {
        level++;
        if (branch._children.length > 0) {
            for (let item of branch._children) {
                this.treeStr.push(('\n' + '__'.repeat(level) + item._name))
                this.makeTreeDiagramm(item, level)
            }
        }
    }

    public findBranchByName(parent: Branch, name: string): Branch | undefined {
        if (parent._name === name) return parent;

        if (parent._children != null) {
            for (let branch of parent._children as Branch[]) {
                if (branch._name === name) {
                    return branch;
                }
            }
            for (let branch1 of parent._children as Branch[]) {
                return this.findBranchByName(branch1, name);
            }
        }
    }
}

export class Branch {
    _name: string;
    _children: Branch[] = [];

    constructor(name: string) {
        this._name = name;
    }
}