class Navigation {
    constructor () {
        this._main = null;
    }
    set main (to) {
        this._main = to;
    }
    get main () {
        return this._main;
    }
}

export default Navigation