export class NodeTree {
    walletBalance = 0;

    changeBalance(balance: number) {
        this.walletBalance = balance;
    }

    balance(): number {
        return this.walletBalance;
    }

    reverse(str: string): string {
        var newString = "";
        for (var i = str.length - 1; i >= 0; i--) {
            newString += str[i];
        }
        return newString;

    }
}

