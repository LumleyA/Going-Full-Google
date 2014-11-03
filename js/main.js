/**************************************************************************
* Navigation
***************************************************************************/
// parent navigation object
// inherited by other objects
function Navigation () {
    // information about each level of the navigation
    this.navigationLevels = {
        Women: {
            Products: {
                One: "#one",
                Two: "#two"
            },
            Footwear: {
                One: "#one",
                Two: "#two"
            },
            Brands: {
                One: "#one",
                Two: "#two"
            },
            Collections: {
                One: "#one",
                Two: "#two"
            },
            Offers: {
                One: "#one",
                Two: "#two"
            }
        },
        Men: {
            Products: {
                One: "#one",
                Two: "#two"
            },
            Footwear: {
                One: "#one",
                Two: "#two"
            },
            Brands: {
                One: "#one",
                Two: "#two"
            },
            Collections: {
                One: "#one",
                Two: "#two"
            },
            Offers: {
                One: "#one",
                Two: "#two"
            }
        },
        Boys: {
            Products: {
                One: "#one",
                Two: "#two"
            },
            School: {
                One: "#one",
                Two: "#two"
            },
            Collections: {
                One: "#one",
                Two: "#two"
            },
            Offers: {
                One: "#one",
                Two: "#two"
            }
        },
        Girls: {
            Products: {
                One: "#one",
                Two: "#two"
            },
            School: {
                One: "#one",
                Two: "#two"
            },
            Collections: {
                One: "#one",
                Two: "#two"
            },
            Offers: {
                One: "#one",
                Two: "#two"
            }
        },
        Baby: {
            Products: {
                One: "#one",
                Two: "#two"
            }
        },
        School: {
            Products: {
                One: "#one",
                Two: "#two"
            }
        },
        Shoes: {
            Products: {
                One: "#one",
                Two: "#two"
            }
        }
    };
    this.mainNavigation = document.getElementById("main-navigation");
    this.navigationBreadcrumb = [];
    this.buildNavigation();
}

// applies a new level of the navigation
Navigation.prototype.applyNavigationLevel = function (event, nextLevel) {
    this.touchstartPosition = 0;
    this.touchendPosition = 0;
    this.takeAction = true;
    if (nextLevel) {
        this.navigationBreadcrumb.push(nextLevel);
    } else {
        this.navigationBreadcrumb.pop();
    }
    if (Nav instanceof MobileNavigation) {
        this.buildNavigation();
    } else {
        this.activateNavigationItem(event);        
        if (this.navigationBreadcrumb[0] == this.navigationBreadcrumb[1]) {
            this.navigationBreadcrumb = [];
        } else {
            this.navigationBreadcrumb = Array(this.navigationBreadcrumb.pop());
        }
        this.buildSubNavigation();
    }
}

// mobile navigation object
// inherits from Navigation
function MobileNavigation () {
    // call parent constructor
    Navigation.call(this);
    this.touchstartPosition = 0;
    this.touchendPosition = 0;
    this.takeAction = true;
    this.bindTouchEvents();
}
// create a MobileNavigation.prototype which inherits from Navigation.prototype
MobileNavigation.prototype = Object.create(Navigation.prototype);

// set the "constructor" property to refer to MobileNavigation
MobileNavigation.prototype.constructor = MobileNavigation;

// builds  a level of the navigation
MobileNavigation.prototype.buildNavigation = function () {
    var currentNavigationLevel = this.navigationLevels;
    // ensure currentNavigationLevel == the correct object within navigationLevels
    this.navigationBreadcrumb.forEach(function (p) {
        currentNavigationLevel = currentNavigationLevel[p];
    });
    var navigationHTML = "";
    // include back button and navigation level heading
    if (this.navigationBreadcrumb.length > 0) {
        navigationHTML += "<li><a onclick='Nav.applyNavigationLevel(event);'><span class='glyphicon glyphicon-chevron-left'></span> <strong style='font-size: 1.2em;'>" + this.navigationBreadcrumb[this.navigationBreadcrumb.length - 1] + "</strong></a></li>";
    }
    // build navigation items
    for (var key in currentNavigationLevel) {
        if (currentNavigationLevel.hasOwnProperty(key)) {
            navigationHTML += "<li ";
            if (Object.keys(currentNavigationLevel).length == 2) {
                navigationHTML += "><a href='" + currentNavigationLevel[key] + "'>" + key + "</a></li>";
            } else {
                navigationHTML += " onclick='Nav.applyNavigationLevel(event, \"" + key + "\");'><a>" + key + "<span class='glyphicon glyphicon-chevron-right'></a></li>";
            }
        }
    }
    this.mainNavigation.innerHTML = navigationHTML;
}

MobileNavigation.prototype.bindTouchEvents = function () {
    var self = this;
    this.mainNavigation.addEventListener("touchstart", function (e) {
        self.touchstartPosition = e.changedTouches[0].clientX;
    }, false);
    this.mainNavigation.addEventListener("touchmove", function (e) {
        self.touchendPosition = e.changedTouches[0].clientX;
        if (self.takeAction == false) {
            return;
        }
        if (self.touchendPosition - self.touchstartPosition > 50) {
            self.takeAction = false;
            self.applyNavigationLevel(event);
        }
    }, false);
}

// desktop navigation object
// inherits from Navigation
function DesktopNavigation () {
    // call the parent constructor
    Navigation.call(this);

    this.mainNavigationContainer = document.getElementById("main-navigation-container");
    this.subNavigationContainer = document.getElementById("sub-navigation-container");
    this.subNavigation = document.getElementById("sub-navigation");
};

// create a DesktopNavigation.prototype which inherits from Navigation.prototype
DesktopNavigation.prototype = Object.create(Navigation.prototype);

// set the "constructor" property to refer to DesktopNavigation
DesktopNavigation.prototype.constructor = DesktopNavigation;

// builds the top level navigation
DesktopNavigation.prototype.buildNavigation = function () {
    var navigationHTML = "";
    for (var key in this.navigationLevels) {
        if (this.navigationLevels.hasOwnProperty(key)) {
            navigationHTML += "<li onclick='Nav.applyNavigationLevel(event, \"" + key + "\")'><a>" + key + "</a></li>";
        }
    }
    this.mainNavigation.innerHTML = navigationHTML;
}

// builds the sub navigation
DesktopNavigation.prototype.buildSubNavigation = function () {
    var navigationHTML = "";
    if (this.navigationBreadcrumb[0] != undefined) {
        var subNavigationLevel = this.navigationLevels[this.navigationBreadcrumb[0]];
        // build the drop down menus
        for (var key in subNavigationLevel) {
            if (subNavigationLevel.hasOwnProperty(key)) {
                navigationHTML += "<li class=\"dropdown\">" +
                    "<a href=\"#\" class=\"dropdown-toggle\" data-toggle=\"dropdown\">" + key + " <span class=\"caret\"></span></a>" +
                    "<ul class=\"dropdown-menu\" role=\"menu\">";
                    var data = subNavigationLevel[key];
                    for (var key in data) {
                        navigationHTML += "<li><a href=\"" + data[key] + "\">" + key + "</a></li>";
                    }
                navigationHTML += "</ul></li>";
            }
        }
        this.showSubNavigation();
    } else {
        var self = this;
        self.hideSubNavigation();
    }
    if (navigationHTML != "") {
        this.subNavigation.innerHTML = navigationHTML;
    }
}

DesktopNavigation.prototype.showSubNavigation = function () {
    if (this.mainNavigationContainer.className.indexOf("showSubNavigation") == -1) {
        this.mainNavigationContainer.className += "showSubNavigation";
    }
    if (this.subNavigationContainer.className.indexOf("showSubNavigation") == -1) {
        this.subNavigationContainer.className += "showSubNavigation";
    }
}

DesktopNavigation.prototype.hideSubNavigation = function () {
    if (this.mainNavigationContainer.className.indexOf("showSubNavigation") != -1) {
        var classes = this.mainNavigationContainer.className.split(" ");
        classes.splice(classes.indexOf("showSubNavigation"), 1);
        this.mainNavigationContainer.className = classes.join(" ");
    }
    if (this.subNavigationContainer.className.indexOf("showSubNavigation") != -1) {
        var classes = this.subNavigationContainer.className.split(" ");
        classes.splice(classes.indexOf("showSubNavigation"), 1);
        this.subNavigationContainer.className = classes.join(" ");
    }
}

DesktopNavigation.prototype.activateNavigationItem = function (e) {
    if (e.target.parentNode.className.indexOf("active") != -1) {
        e.target.parentNode.className = "";
        return;
    }
    var active = e.target.parentNode.parentNode.getElementsByClassName("active");
    if (active.length > 0) {
        active[0].className = "";
        if (active[0] == e.target.parentNode) {
            return;
        }
    }
    e.target.parentNode.className += "active";
}

// create an instance of the correct navigation object depending on the screen size
var Nav;
if (window.matchMedia("(min-width: 768px)").matches) {
    Nav = new DesktopNavigation();
} else {
    Nav = new MobileNavigation();
}

// handles window resizing
var windowResizeTimeout;
function windowResize () {
    clearTimeout(windowResizeTimeout);
    windowResizeTimeout = setTimeout(function () {
        // create the correct navigation object depending on screen size
        if (window.matchMedia("(min-width: 768px)").matches) {
            Nav = new DesktopNavigation();
        } else {
            Nav = new MobileNavigation();
        }
    }, 500);
}

window.onresize = windowResize;