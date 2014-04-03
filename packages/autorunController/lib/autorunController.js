function autorunController () {
    this._deps = {};
}

_.extend(autorunController.prototype, {
    add: function (dep) {
        var id = Meteor.uuid();
        if(this._deps[id]) {
            this._deps[id].stop();
        }
        this._deps[id] = dep;
        return id;
    },
    stop: function (id) {
        if(this._deps[id])
            this._deps[id].stop();
        delete this._deps[id];
    },
    clear: function () {
        var self = this;
        _.each(Object.keys(this._deps), function (id) {
            if(self._deps[id]) {
                self._deps[id].stop();
            }
        });
    }
});

AutorunController = autorunController;