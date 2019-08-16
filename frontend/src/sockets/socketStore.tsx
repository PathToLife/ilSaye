type m_sockets = {
    _main: SocketIOClient.Socket | null,
    _private: SocketIOClient.Socket | null,
    main: SocketIOClient.Socket | null,
    private: SocketIOClient.Socket | null
}
let socketsStore: m_sockets = {
    _main: null,
    _private: null,
    set main(socket: SocketIOClient.Socket | null) {
        if (this._main !== null) this._main.close();
        this._main = socket;
    },
    set private(socket: SocketIOClient.Socket | null) {
        if (this._private !== null) this._private.close();
        this._private = socket;
    },
    get main() {
        return this._main;
    },
    get private() {
        return this._private;
    }
};

export default socketsStore