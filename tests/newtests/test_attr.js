assert(Attr);

var foo = document.createElement('foo');
foo.setAttribute('bar', 'baz');

assert(foo.attributes.length === 1);
assert(foo.attributes[0].name === 'bar', foo.attributes[0].name);
assert(foo.attributes[0].value === 'baz', foo.attributes[0].value);

foo.attributes[0].value = 'frotz';
// cover the didn't change short path
foo.attributes[0].value = 'frotz';
assert(foo.getAttribute('bar') === 'frotz');

foo.setAttributeNS('namespace', 'ns:foo', 'bamf');

assert(foo.attributes[1].prefix === 'ns', foo.attributes[1].prefix);
assert(foo.attributes[1].localName === 'foo', foo.attributes[1].localName);
assert(foo.attributes[1].namespaceURI === 'namespace', foo.attributes[1].namespaceURI);

assert(foo.hasAttributeNS('namespace', 'foo'));
assert(foo.getAttributeNS('namespace', 'foo') === 'bamf');
foo.removeAttributeNS('namespace', 'foo');
assert(!foo.hasAttributeNS('namespace', 'foo'));

var bar = document.createElementNS('namespace', 'element');
document.body.appendChild(bar);
assert(document.getElementsByTagNameNS('namespace', 'element').length === 1);

assertThrows(function() { document.createElementNS('', '') });
assertThrows(function() { document.createElementNS('not-xml-namespace', 'xml:foo') });
assertThrows(function() { document.createElementNS('not-xml-namespace', 'xmlns:foo') });
assertThrows(function() { document.createElementNS('http://www.w3.org/2000/xmlns/', 'notxmlns:foo') });

var htmlelm = document.createElementNS('http://www.w3.org/1999/xhtml', 'foo');


// Cover the AttrArray implementation
assert(foo.attributes[999] === undefined);
foo.attributes.bar = "baz";
assert(foo.attributes.bar === "baz");

// Here I am just covering the enumerate() implementation;
// XXX: comment out for now since it isn't asserting anything
// but is crashing node 0.5.10
//for (var i in foo.attributes) {
// }

delete foo.attributes.bar;
assert(foo.attributes.bar === undefined);

var readonly = false;
try {
    foo.attributes[foo.attributes.length] = 50;
} catch (e) {
    readonly = true;
}
assert(readonly);

// Can't delete length
delete foo.attributes.length;
assert(foo.attributes.length);

// Can't delete attrs
var attr = foo.attributes[0];
delete foo.attributes[0];
assert(attr === foo.attributes[0]);


assert(Object.getOwnPropertyNames(foo.attributes));
assert(Object.keys(foo.attributes));

// Cover the document mutation event when the node is rooted
// TODO Make sure the document mutation event fires
document.body.appendChild(foo);
foo.attributes[0].value = "hello"
assert(foo.getAttribute("bar") === "hello");

var cloned = foo.cloneNode();

assert(foo.isEqualNode(cloned));

