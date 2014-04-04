if (Meteor.isClient) {
    records = new Meteor.Collection(null);
    Meteor.startup(function () {
        for(var i = 0; i < 50; ++i) {
            records.insert({
                name: i
            });
        }
    });


    arController = new AutorunController();
    Template.rec.destroyed = function () {
        arController.stop(this.arID);
    };

    Template.rec.rendered = function () {
        var tmpl = this;
        var dep = Deps.autorun(function () {
            var x = records.findOne({ _id: tmpl.data._id }); // dependency
            var li = tmpl.$('li');
            if(li.hasClass('loaded')) {
                li.addClass('changed');
            } else {
                li.addClass('loaded')
            }
        });
        tmpl.arID = arController.add(dep);
    };

    Template.hello.recs = function () {
        return records.find().fetch();
    };
    Template.hello.greeting = function () {
        return "Welcome to autorunController.";
    };

    Template.hello.events({
        'click input': function () {
            // template data, if any, is available in 'this'
            if (typeof console !== 'undefined')
                console.log("You pressed the button");
        }
    });
}

if (Meteor.isServer) {
    Meteor.startup(function () {
        // code to run on server at startup
    });
}
