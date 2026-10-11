var C='roz-v1';
var FILES=['./','index.html','style.css','app.js','manifest.json','icon-192.png','icon-512.png','icon-maskable-512.png'];
self.addEventListener('install',function(e){e.waitUntil(caches.open(C).then(function(c){return c.addAll(FILES)}).then(function(){return self.skipWaiting()}))});
self.addEventListener('activate',function(e){e.waitUntil(caches.keys().then(function(ks){return Promise.all(ks.filter(function(k){return k!==C}).map(function(k){return caches.delete(k)}))}).then(function(){return self.clients.claim()}))});
self.addEventListener('fetch',function(e){
var r=e.request;
if(r.method!=='GET'||new URL(r.url).origin!==self.location.origin)return;
e.respondWith(caches.match(r).then(function(c){
var f=fetch(r).then(function(n){if(n&&n.ok){var cp=n.clone();caches.open(C).then(function(x){x.put(r,cp)})}return n}).catch(function(){return c});
return c||f;
}));
});
self.addEventListener('notificationclick',function(e){
e.notification.close();
e.waitUntil(self.clients.matchAll({type:'window'}).then(function(l){if(l.length)return l[0].focus();return self.clients.openWindow('./')}));
});
