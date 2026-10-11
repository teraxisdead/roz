var C='roz-v2';
var FILES=['./','index.html','style.css','app.js','manifest.json','icon-192.png','icon-512.png','icon-maskable-512.png'];
self.addEventListener('install',function(e){e.waitUntil(caches.open(C).then(function(c){return c.addAll(FILES)}).then(function(){return self.skipWaiting()}))});
self.addEventListener('activate',function(e){e.waitUntil(caches.keys().then(function(ks){return Promise.all(ks.filter(function(k){return k!==C&&k!=='roz-cfg'}).map(function(k){return caches.delete(k)}))}).then(function(){return self.clients.claim()}))});
self.addEventListener('fetch',function(e){
var r=e.request;
if(r.method!=='GET'||new URL(r.url).origin!==self.location.origin)return;
e.respondWith(caches.match(r).then(function(c){
var f=fetch(r).then(function(n){if(n&&n.ok){var cp=n.clone();caches.open(C).then(function(x){x.put(r,cp)})}return n}).catch(function(){return c});
return c||f;
}));
});
self.addEventListener('push',function(e){
e.waitUntil((async function(){
var title='Roz',body='Reminder';
try{
var c=await caches.open('roz-cfg');
var rs=await c.match('roz-cfg.json');
var cfg=rs?await rs.json():null;
var sub=await self.registration.pushManager.getSubscription();
if(cfg&&cfg.url&&sub){
var m=await fetch(cfg.url+'/msg?token='+encodeURIComponent(cfg.token)+'&e='+encodeURIComponent(sub.endpoint));
var j=await m.json();
if(j&&j.title){title=j.title;body=j.body}
}
}catch(err){}
await self.registration.showNotification(title,{body:body,icon:'icon-192.png',badge:'icon-192.png',vibrate:[200,100,200],tag:'roz-'+Date.now()});
})());
});
self.addEventListener('notificationclick',function(e){
e.notification.close();
e.waitUntil(self.clients.matchAll({type:'window'}).then(function(l){if(l.length)return l[0].focus();return self.clients.openWindow('./')}));
});
