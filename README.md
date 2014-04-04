# Autorun Controller
Package for simplifying multiple autoruns with Meteor

## About
Autorun Controller allows you to easily keep track of autorun events and stop them at the approiate time. It was built out of necessity after the Meteor 0.8.0 release now that templates no longer call rendered every time they're updated. The alternative at the moment is to define multiple autoruns on ```template.rendered```, and stop them on ```template.destroyed``` this package allows you to more easily look after that.

## Example

```
var arController = new AutorunController();

Template.myTempl.rendered = function () {
	var ar = deps.autorun(onTmplUpdate);
	this.arId = arController.add(ar);
};

Template.myTempl.destroyed = function () {
	arController.stop(this.arId);
};

function onTmplUpdate () {
	// TODO: invoke dependencies

	// TODO: do some stuff
}
```

With the above example, every time the template is rendered an autorun is declared and is passed into the autorun controller. The ID of the controller is returned and attached to the template instance. On destroyed the autorun is stopped.