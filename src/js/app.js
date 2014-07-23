console.log('Hello world!')

IN.Event.on(IN, "auth", onLinkedInAuth);

function onLinkedInAuth() {
  IN.API.Connections('me')
    .fields('firstName', 'lastName', 'industry')
    .params({'count':50})
    .result(function(a){console.log(a)})
}

